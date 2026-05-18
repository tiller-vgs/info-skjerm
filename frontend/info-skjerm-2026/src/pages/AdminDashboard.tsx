import * as React from "react";
import ToggleButton, { toggleButtonClasses } from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import AdminPreferences from "../components/AdminPreferences";
import Paper from "@mui/material/Paper";
import Registrer from "../components/Registrer";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: "2rem",

  [`& .${toggleButtonClasses.root}`]: {
    backgroundColor: "#fade29",
    color: "black",
    fontWeight: "bold",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#eacb00",
    },

    "&.Mui-selected": {
      backgroundColor: "#9a7a00",
      color: "#fff",
    },

    "&.Mui-selected:hover": {
      backgroundColor: "#7a6100",
    },
  },

  // Siden knappene er et StyledToggleButtonGroup fra MUI, må dette gjøres for at tomrommet mellom knappene også blir farget, og for å rounde buttone ordentlig
  [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
      borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
    },
  [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
  [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
    {
      borderLeft: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
    },
}));

export default function HorizontalSpacingToggleButton() {
  const [alignment, setAlignment] = React.useState<string | null>("left");

  // Liste over info som trengs for å mappe admin knappene
  const adminButtons = [
    {
      text: "Kunngjør meldinger",
      value: "left",
      aria: "left aligned",
    },
    {
      text: "Slett kunngjøringer",
      value: "mid-left",
      aria: "mid-left aligned",
    },
    {
      text: "Preferanser",
      value: "mid-right",
      aria: "mid-right aligned",
    },
    {
      text: "Registrer Adminbrukere",
      value: "right",
      aria: "right aligned",
    },
  ];
  console.log(adminButtons);

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="flex justify-center p-30">
      <Paper
        sx={{
          backgroundColor: "#1e2227",
          minWidth: 500,
          maxWidth: 1250,
          padding: "20px",
        }}
        variant="elevation"
        elevation={24}
        square={false}
      >
        <div className="flex flex-col text-tqwhitetext items-center gap-6">
          <StyledToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            {adminButtons.map((button) => (
              <ToggleButton
                key={button.value}
                value={button.value}
                aria-label={button.aria}
              >
                <p className="text-black font-bold">{button.text}</p>
              </ToggleButton>
            ))}
          </StyledToggleButtonGroup>
          <div className="w-full">
            {alignment === "left" && "Kunngjør melding"}
            {alignment === "mid-left" && "Slett kunngjøring"}
            {alignment === "mid-right" && <AdminPreferences />}
            {alignment === "right" && <Registrer />}
          </div>
        </div>
      </Paper>
    </div>
  );
}
