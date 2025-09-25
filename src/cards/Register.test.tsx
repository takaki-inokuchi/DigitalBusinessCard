// __tests__/Register.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Register } from "./register";

// Supabase モック
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

  it("タイトルが表示される", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("新規名刺登録")).toBeInTheDocument();
  });

  it("全項目入力して登録ボタンを押すと/に遷移する", async () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("好きなid"), { target: { value: "test123" } });
    fireEvent.change(screen.getByLabelText("お名前"), { target: { value: "井ノ口孝輝" } });
    fireEvent.change(screen.getByLabelText("自己紹介"), { target: { value: "自己紹介テキスト" } });
    fireEvent.change(screen.getByLabelText("GithubId"), { target: { value: "GithubTest" } });
    fireEvent.change(screen.getByLabelText("QiitaId"), { target: { value: "QiitaTest" } });
    fireEvent.change(screen.getByLabelText("TwitterId"), { target: { value: "TwitterTest" } });

    fireEvent.click(screen.getByRole("button", { name: /登録/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
  });

  it("必須項目が未入力の場合はバリデーションエラーが表示される", async () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /登録/i }));

    await screen.findByText("英単語は必須です");
    await screen.findByText("名前は必須です");
  });

  it("IDフィールドに英字以外が入力された場合はバリデーションエラーが表示される", async () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("GithubId"), { target: { value: "abc123" } });
    fireEvent.click(screen.getByRole("button", { name: /登録/i }));

    await screen.findByText("GithubIDは英字のみで入力して下さい");
  });
});
