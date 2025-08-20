import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AgenticJournal from "./components/AgenticJournal";
import SignUp from "./components/sign-up/SignUp";
import MyAppBar from "./components/MyAppBar";

import "./App.css";

function About() {
  return <h1>About Page</h1>;
}

function Insight() {
  return <h1>Insight Page</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="appbar">
        <MyAppBar />
      </div>
      <div className="main-body">
        <Routes>
          <Route path="/" element={<AgenticJournal />} />
          <Route path="/about" element={<About />} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
