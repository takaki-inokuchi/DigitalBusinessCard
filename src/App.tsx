import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SampleId } from "./cards/sample-id";
import { Register } from "./cards/register";
import { Cardmenu } from "./cards/cardmenu";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/cards/:id" element={<SampleId />} />
          <Route path="/" element={<Cardmenu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
