import React from "react";
{
  /* Henter ferdige bokser og knapper fra Material UI-biblioteket */
}
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function AdminPreferences() {
  const [age, setAge] = React.useState("");

  {
    /* Denne funksjonen kjører når noen bytter tidsformat i menyen */
  }
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div className="w-full">
      {/* Klokke */}
      <div className="flex justify-center gap-5 items-center w-full">
        <p className="text-tqwhitetext w-48 text-right">Klokke: </p>

        {/* Denne div-en passer på at dropdown-menyen starter på nøyaktig samme
        sted slider */}
        <div className="w-[300px] flex justify-start">
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
      {/* Nytt */}
      <div className="flex justify-center gap-5 items-center w=full">
        <p className="text-tqwhitetext w-48 text-right">
          Kunngjøringbyttetid:{" "}
        </p>
        <Box sx={{ width: 300 }}>
          <Slider
            min={0}
            max={20}
            size="small"
            defaultValue={12}
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
            max={20}
            size="small"
            defaultValue={12.0}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </Box>
      </div>

      {/*Antall busser per stopp*/}
      <div className="flex justify-center gap-5 items-center w-full">
        <p className="text-tqwhitetext w-48 text-right">
          {" "}
          Antall busser per stopp:{" "}
        </p>
        <Box sx={{ width: 300 }}>
          <Slider
            min={0}
            max={15}
            size="small"
            defaultValue={5}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </Box>
      </div>
    </div>
  );
}

export default AdminPreferences;
