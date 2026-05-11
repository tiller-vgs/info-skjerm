import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

function AdminPreferences() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div className="w-full">
      <div className="flex justify-center gap-5 items-center w=full">
        <p className="text-tqwhitetext">Klokke: </p>
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
    </div>
  );
}

export default AdminPreferences;
