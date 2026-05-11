// import React from "react";
// import { Card, CardContent } from "@mui/material";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import AdminPreferences from "../components/AdminPreferences";

// export function AdminDashboard() {
//   const [alignment, setAlignment] = React.useState<string | null>("left");

//   const handleAlignment = (
//     _event: React.MouseEvent<HTMLElement>,
//     newAlignment: string | null,
//   ) => {
//     if (newAlignment !== null) {
//       setAlignment(newAlignment);
//     }
//   };

//   return (
//     <div className="flex justify-center p-30">
//       <Card sx={{ minWidth: 500, maxWidth: 1250, bgcolor: "transparent" } }>
//         <CardContent className="contentBox flex flex-col items-center gap-6">
//           <ToggleButtonGroup
//             className="bg-tkyellow"
//             value={alignment}
//             exclusive
//             onChange={handleAlignment}
//             aria-label="text alignment"
//           >
//             <ToggleButton value="left" aria-label="left aligned">
//               <p className="text-black font-bold">Kunngjør meldinger</p>
//             </ToggleButton>
//             <ToggleButton value="mid-left" aria-label="centered">
//               <p className="text-black font-bold">Slett kunngjøringer</p>
//             </ToggleButton>
//             <ToggleButton value="mid-right" aria-label="centered">
//               <p className="text-black font-bold">Preferanser</p>
//             </ToggleButton>
//             <ToggleButton value="right" aria-label="right aligned">
//               <p className="text-black font-bold">Registrer Adminbrukere</p>
//             </ToggleButton>
//           </ToggleButtonGroup>
//           <div className="w-full">
//             {alignment === "left" && "Kunngjør melding"}
//             {alignment === "mid-left" && "Slett kunngjøring"}
//             {alignment === "mid-right" && <AdminPreferences />}
//             {alignment === "right" && "Registrer Adminbrukere"}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default AdminDashboard;

import * as React from "react";
import ToggleButton, { toggleButtonClasses } from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AdminPreferences from "../components/AdminPreferences";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: "2rem",
  [`& .${toggleButtonClasses.root}`]: {
    backgroundColor: "#fade29",
    color: "black",
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: "#eab308",
    },

    "&.Mui-selected": {
      backgroundColor: "#ca8a04",
      color: "#fff",
    },

    "&.Mui-selected:hover": {
      backgroundColor: "#a16207",
    },
  },

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

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="flex justify-center p-30">
      {" "}
      <Card sx={{ minWidth: 500, maxWidth: 1250, bgcolor: "transparent" }}>
        {" "}
        <CardContent className="contentBox flex flex-col items-center gap-6">
          <StyledToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <p className="text-black font-bold">Kunngjør meldinger</p>
            </ToggleButton>
            <ToggleButton value="mid-left" aria-label="centered">
              <p className="text-black font-bold">Slett kunngjøringer</p>
            </ToggleButton>
            <ToggleButton value="mid-right" aria-label="centered">
              <p className="text-black font-bold">Preferanser</p>
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <p className="text-black font-bold">Registrer Adminbrukere</p>
            </ToggleButton>
          </StyledToggleButtonGroup>
          <div className="w-full">
            {alignment === "left" && "Kunngjør melding"}
            {alignment === "mid-left" && "Slett kunngjøring"}
            {alignment === "mid-right" && <AdminPreferences />}
            {alignment === "right" && "Registrer Adminbrukere"}{" "}
          </div>{" "}
        </CardContent>{" "}
      </Card>{" "}
    </div>
  );
}
