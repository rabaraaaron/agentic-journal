import MyContext from "../context";
import { useContext } from "react";
import { getCategoryColors, getAllMoodsCustomOrder } from "../util/moods.js";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const moodList = getAllMoodsCustomOrder();

function getStyles(mood, moods, theme) {
  return {
    fontWeight: moods.includes(mood)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultiSelect({ handleChange }) {
  const theme = useTheme();

  const { moods, setMoods } = useContext(MyContext);

  return (
    <div>
      <FormControl sx={{ m: 1, width: "70vw" }}>
        <InputLabel id="demo-multiple-chip-label">Moods</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={moods}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  style={{
                    backgroundColor: getCategoryColors(value),
                    color: "#fff",
                    fontWeight: "500",
                    fontSize: "0.85rem",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  sx={{
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    },
                    "&:active": {
                      transform: "translateY(0px)",
                    },
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {moodList.map((mood) => (
            <MenuItem
              key={mood}
              value={mood}
              style={getStyles(mood, moods, theme)}
            >
              {mood}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
