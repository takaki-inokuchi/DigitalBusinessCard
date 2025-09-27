import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SampleId } from "./sample-id";
import { mockUser } from "../tests/mockUser";
jest.mock("../../supabaseClient", () => {
  return {
    supabase: {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockUser, error: null }),
      in: jest
        .fn()
        .mockResolvedValue({ data: [{ id: 1, name: "React" }], error: null }),
    },
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SampleIdページ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("SampleId コンポーネント", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/cards/test123"]}>
          <Routes>
            <Route path="/cards/:id" element={<SampleId />} />
          </Routes>
        </MemoryRouter>
      );
    }); //MemoryRouterはURLを扱う機能をモックするためのRouter initialEntriesでテスト開始時の URLを指定

    it("名前が表示される", async () => {
      expect(await screen.findByText(mockUser.name)).toBeInTheDocument();
    });

    it("自己紹介が表示される", async () => {
      expect(await screen.findByText(mockUser.description)).toBeInTheDocument();
    });

    it("技術が表示される", async () => {
      expect(await screen.findByText("React")).toBeInTheDocument();
    });

    it("Githubアイコンが表示される", async () => {
      expect(
        await screen.findByRole("link", { name: /github/i })
      ).toBeInTheDocument();
    });

    it("Qiitaアイコンが表示される", async () => {
      expect(
        await screen.findByRole("link", { name: /qiita/i })
      ).toBeInTheDocument();
    });

    it("Twitterアイコンが表示される", async () => {
      expect(
        await screen.findByRole("link", { name: /twitter/i })
      ).toBeInTheDocument();
    });

    it("戻るボタンで/に遷移する", async () => {
      const backButton = await screen.findByRole("button", { name: /戻る/i });
      fireEvent.click(backButton);
      expect(mockNavigate).toHaveBeenLastCalledWith("/");
    });
  });
});
