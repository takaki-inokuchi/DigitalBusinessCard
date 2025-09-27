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

afterEach(() => {
  jest.clearAllMocks();
});

describe("Registerページ", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it("タイトルが表示される", async () => {
    expect(await screen.findByText("新規名刺登録")).toBeInTheDocument();
  });

  it("全項目入力して登録ボタンを押すと/に遷移する", async () => {
    fireEvent.change(screen.getByLabelText("好きなid"), {
      target: { value: "test123" },
    });
    fireEvent.change(screen.getByLabelText("お名前"), {
      target: { value: "井ノ口孝輝" },
    });
    fireEvent.change(screen.getByLabelText("自己紹介"), {
      target: { value: "自己紹介テキスト" },
    });
    fireEvent.change(screen.getByLabelText("github_id"), {
      target: { value: "GithubTest" },
    });
    fireEvent.change(screen.getByLabelText("qiita_id"), {
      target: { value: "QiitaTest" },
    });
    fireEvent.change(screen.getByLabelText("x_id"), {
      target: { value: "TwitterTest" },
    });

    fireEvent.click(screen.getByRole("button", { name: /登録/i }));

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

    fireEvent.click(screen.getByRole("button", { name: /登録/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
  });
});
