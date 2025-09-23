import { Button } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SampleId } from "./cards/sample-id";

function App() {
  return (
    <div>
      <h1>React!!!!!!!!!!!</h1>
      <Button>ボタン</Button>
      <BrowserRouter>
        <Routes>
          <Route path="/cards/:id" element={<SampleId />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
