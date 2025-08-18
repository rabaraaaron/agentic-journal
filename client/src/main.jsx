import { StrictMode } from "react";
import "./index.css";
import AgenticJournal from "./components/AgenticJournal.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AgenticJournal />
  </StrictMode>
);
