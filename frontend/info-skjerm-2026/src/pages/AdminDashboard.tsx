import React from "react";
import { Card, CardContent } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AdminPreferences from "../components/AdminPreferences";
import Registrer from "../components/Registrer";

export function AdminDashboard() {
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div className="flex justify-center p-30">
      <Card sx={{ minWidth: 500, maxWidth: 1250, bgcolor: "transparent" }}>
        <CardContent className="contentBox flex flex-col items-center gap-6">
          <ToggleButtonGroup
            className="bg-tqpurple "
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <p className="text-tqwhitetext">Kunngjør meldinger</p>
            </ToggleButton>
            <ToggleButton value="mid-left" aria-label="centered">
              <p className="text-tqwhitetext">Slett kunngjøringer</p>
            </ToggleButton>
            <ToggleButton value="mid-right" aria-label="centered">
              <p className="text-tqwhitetext">Preferanser</p>
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <p className="text-tqwhitetext">Registrer Adminbrukere</p>
            </ToggleButton>
          </ToggleButtonGroup>
          <div className="w-full">
            {alignment === "left" && "Kunngjør melding"}
            {alignment === "mid-left" && "Slett kunngjøring"}
            {alignment === "mid-right" && <AdminPreferences />}
            {alignment === "right" && <Registrer />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
