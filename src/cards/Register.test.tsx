import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Register } from "./register";

jest.mock("../../supabaseClient", () => ({
  supabase: {
    from: jest.fn().mockImplementation(() => ({
      insert: jest.fn().mockResolvedValue({ data: [{}], error: null }),
    })),
  },
}));

// useNavigate のモック
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Registerページ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Registerテスト", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/cards/test123"]}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      );
    });
  });

  it("タイトルが表示される", async () => {
    expect(await screen.getByText("新規名刺登録")).toBeInTheDocument();
  });

  it("全項目入力して登録ボタンを押すと/に遷移する", async () => {
    // フィールドに値を入力
    fireEvent.change(screen.getByLabelText("好きなid"), {
      target: { value: "test123" },
    });
    fireEvent.change(screen.getByLabelText("お名前"), {
      target: { value: "井ノ口孝輝" },
    });
    fireEvent.change(screen.getByLabelText("自己紹介"), {
      target: { value: "自己紹介テキスト" },
    });
    fireEvent.change(screen.getByLabelText("GithubId"), {
      target: { value: "GithubTest" },
    });
    fireEvent.change(screen.getByLabelText("QiitaId"), {
      target: { value: "QiitaTest" },
    });
    fireEvent.change(screen.getByLabelText("TwitterId"), {
      target: { value: "TwitterTest" },
    });

    // 登録ボタンを押す
    const registerButton = await screen.findByRole("button", { name: /登録/i });
    fireEvent.click(registerButton);

    // 遷移が呼ばれるのを待つ
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
  });

  it("必須項目が未入力の場合はバリデーションエラーが表示される", async () => {
    fireEvent.click(screen.getByRole("button", { name: /登録/i }));

    await screen.findByText("英単語は必須です");
    await screen.findByText("名前は必須です");
    await screen.findByText("自己紹介は必須です");
  });

  it("オプションを入力しなくても登録ができる", async () => {
    fireEvent.change(screen.getByLabelText("好きなid"), {
      target: { value: "test999" },
    });

    fireEvent.change(screen.getByLabelText("お名前"), {
      target: { value: "テスト太郎" },
    });

    fireEvent.change(screen.getByLabelText("自己紹介"), {
      target: { value: "自己紹介テキスト" },
    });

    const noOptionButton = await screen.findByRole("button", { name: /登録/i });
    fireEvent.click(noOptionButton);
  });
});
