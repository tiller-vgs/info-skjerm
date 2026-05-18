import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function AdminPreferences() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div className="w-full">
      {/* Klokke */}
      <div className="flex justify-center gap-5 items-center w-full">
        <div className="w-48 flex justify-end">
          <p className="text-tqwhitetext w-48 text-right">Klokke: </p>
        </div>
        <FormControl
          variant="filled"
          className="bg-tqwhitetext rounded"
          sx={{ m: 0, minWidth: 120 }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Tidsformat
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value={10}>12 timer</MenuItem>
            <MenuItem value={20}>24 timer</MenuItem>
          </Select>
        </FormControl>
      </div>
      <p>Skrevet i desisekund. (1/10) av et sekund</p>
      {/* Nytt */}
      <div className="flex justify-center gap-5 items-center w=full">
        <p className="text-tqwhitetext w-48 text-right">
          Kunngjøringbyttetid:{" "}
        </p>
        <Box sx={{ width: 300 }}>
          <Slider
            min={0}
            max={20.0}
            size="small"
            defaultValue={12.0}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </Box>
      </div>
      <div className="flex justify-center gap-5 items-center w=full">
        <p className="text-tqwhitetext w-48 text-right"> Bussbyttetid: </p>
        <Box sx={{ width: 300 }}>
          <Slider
            min={0}
            max={20.0}
            size="small"
            defaultValue={12.0}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </Box>
      </div>
    </div>
  );
}

export default AdminPreferences;
