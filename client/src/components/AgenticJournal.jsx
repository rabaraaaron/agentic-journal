import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import GradientCircularProgress from "./GradientCircularProgress";

function AgenticJournal() {
  const navigate = useNavigate();

  const [muiDate, setMuiDate] = useState(dayjs(new Date()));
  const inputRef = useRef("");
  const [rating, setRating] = useState(10);
  const [moods, setMoods] = useState([]);
  const [responseData, setResponseData] = useState(null); // State to store the fetched data
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [error, setError] = useState(null); // State to store any errors

  if (
    localStorage.getItem("token") === undefined ||
    localStorage.getItem("token") == null
  ) {
    navigate("/login");
  }

  const isAuthenticated = async () => {
    const response = await fetch(
      import.meta.env.VITE_SERVER_BASE_URL + "/user/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({}),
      }
    );
    return response.status === 200;
  };

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
    setRating(10);
    inputRef.current.value = "";
  };

  const validateEntry = () => {
    const errors = [];
    const dateToValidate = dayjs(muiDate);
    if (!dateToValidate.isValid()) {
      errors.push(
        "How did you manage to mess up the date format??? It's supposed to be MM/DD/YYYY..."
      );
    }
    if (inputRef.current.value.length === 0) {
      errors.push(
        "I don't like empty messages. How am I supposed to know how you feel. That's kind of the point of this all..."
      );
    }
    if (rating < 1 || rating > 10) {
      errors.push("How did you manage to enter a range outside of 1-10?!?!");
    }
    if (moods.length > 14) {
      errors.push(
        "Alright that's too many moods. Surely you can't be feeling that many things at once..."
      );
    }
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (!isAuthenticated()) {
        navigate("/login");
        return;
      }
      setLoading(true);
      const response = await fetch(
        import.meta.env.VITE_SERVER_BASE_URL + "/user/entry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            date_selected: muiDate.format("YYYY-MM-DD"),
            message: inputRef.current.value,
            moods: moods,
            email: "rabara777@outlook.com",
          }),
        }
      );

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
      handleClearAll();
    }
  };

  return (
    <MyContext.Provider value={{ moods, setMoods }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1 className="title">Tell Me How You Really Feel</h1>
        {loading ? (
          <GradientCircularProgress />
        ) : (
          <>
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
                onClick={() => {
                  if (!validateEntry()) {
                    return;
                  }
                  handleSubmit();
                }}
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
          </>
        )}
      </LocalizationProvider>
    </MyContext.Provider>
  );
}

export default AgenticJournal;
