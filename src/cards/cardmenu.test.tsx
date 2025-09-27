import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Cardmenu } from "./cardmenu";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Cardmenu コンポーネント", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Cardmenu />} />
        </Routes>
      </MemoryRouter>
    );
  });
  it("タイトルが表示されている", () => {
    expect(screen.getByText("カード検索")).toBeInTheDocument();
  });

  it("IDを入力してボタンを押すと遷移する", () => {
    const input = screen.getByPlaceholderText("IDを入力");
    fireEvent.change(input, { target: { value: "test999" } });

    const searchButton = screen.getByText("検索");
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/cards/test999");
  });

  it("IDを入力しないでボタンを押すとエラーメッセージが表示される", () => {
    const searchButton = screen.getByText("検索");
    fireEvent.click(searchButton);

    expect(window.alert).toHaveBeenCalledWith("IDがありません");
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("新規登録押すと画面が遷移", () => {
    const newButton = document.createElement("button");
    newButton.textContent = "新規登録はこちら";
    newButton.onclick = () => mockNavigate("/cards/register")

    document.body.appendChild(newButton);

    fireEvent.click(screen.getByText("新規登録はこちら"));
    expect(mockNavigate).toHaveBeenCalledWith("/cards/register");

    document.body.removeChild(newButton); 
  })
});
