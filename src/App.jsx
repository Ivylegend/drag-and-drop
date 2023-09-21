import "./App.css";
import SignIn from "../src/pages/SignIn";
import Landing from "../src/pages/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewUser from "./pages/NewUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<NewUser/>} />
          <Route path="/home" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
