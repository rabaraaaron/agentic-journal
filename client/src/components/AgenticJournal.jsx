import { useState, useRef } from "react";
import "./AgenticJournal.css";
import MyContext from "../context";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

import MultiSelect from "./MultiSelect";

function AgenticJournal() {
  const [muiDate, setMuiDate] = useState(dayjs(new Date()));
  const inputRef = useRef("");
  const [rating, setRating] = useState(10);
  const [moods, setMoods] = useState([]);
  const [responseData, setResponseData] = useState(null); // State to store the fetched data
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [error, setError] = useState(null); // State to store any errors

  const handleMoodsChanged = (event) => {
    const {
      target: { value },
    } = event;
    setMoods(typeof value === "string" ? value.split(",") : value);
  };

  const handleMuiDateChange = (newDate) => {
    setMuiDate(newDate);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleClearAll = () => {
    setMoods([]);
    setMuiDate(null);
  };

  const handleSubmit = async () => {
    const message = inputRef.current.value;
    console.log("Date: ", muiDate);
    console.log("Input value:", message);
    console.log("Rating: ", rating);
    console.log("Moods: ", moods);
    try {
      const response = await fetch("http://localhost:8000/health", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const response = await fetch("http://server:8000/user/entry", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     date_selected: muiDate.format("YYYY-MM-DD"),
      //     message: message,
      //     moods: moods,
      //     email: "rabara777@outlook.com",
      //   }),
      // });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      setResponseData(`Success: ${JSON.stringify(res)}`);
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error("Error during POST request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyContext.Provider value={{ moods, setMoods }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1 className="title">Tell Me How You Really Feel</h1>
        <DatePicker value={muiDate} onChange={handleMuiDateChange} />
        <div className="width-container">
          <TextField
            id="fullWidth"
            label="Message"
            multiline
            rows={4}
            defaultValue=""
            inputRef={inputRef}
            fullWidth
          />
        </div>
        <div className="width-container horizontal">
          <p className="mood-label">Mood: </p>
          <Slider
            aria-label="Mood Rating"
            defaultValue={10}
            valueLabelDisplay="auto"
            shiftStep={1}
            step={1}
            min={1}
            max={10}
            value={rating}
            onChange={handleRatingChange}
          />
        </div>
        <div className="width-container row">
          <MultiSelect handleChange={handleMoodsChanged} />
        </div>
        <div className="width-container row">
          <Button
            className="my-button"
            variant="contained"
            color="success"
            style={{ margin: "0px 10px 0px 10px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            className="my-button"
            variant="outlined"
            color="error"
            style={{ margin: "0px 10px 0px 10px" }}
            onClick={handleClearAll}
          >
            Clear
          </Button>
        </div>
      </LocalizationProvider>
    </MyContext.Provider>
  );
}

export default AgenticJournal;
