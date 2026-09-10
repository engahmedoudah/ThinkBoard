import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
