import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SampleId } from "./cards/sample-id";
import { Register } from "./cards/register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/cards/:id" element={<SampleId />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
