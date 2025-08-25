import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AgenticJournal from "./components/AgenticJournal";
import SignUp from "./components/sign-up/SignUp";
import Login from "./components/sign-in/SignIn";
import MyAppBar from "./components/MyAppBar";

import "./App.css";

function About() {
  return <h1>About Page</h1>;
}

function Insight() {
  return <h1>Insight Page</h1>;
}

function AppContent() {
  const location = useLocation();
  const signupOrSignin = ["/signup", "/login"];
  return (
    <>
      {!signupOrSignin.includes(location.pathname) && (
        <div className="appbar">
          <MyAppBar />
        </div>
      )}

      <div className="main-body">
        <Routes>
          <Route path="/" element={<AgenticJournal />} />
          <Route path="/home" element={<AgenticJournal />} />
          <Route path="/about" element={<About />} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
