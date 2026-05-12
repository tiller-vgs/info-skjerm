import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-tqwhitetext flex flex-col">
      {/* Overskrift og brøktekst */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-tkyellow">
          Velkommen
        </h1>
        <p className="max-w-xl text-lg md:text-xl text-tqwhitetext">
          Denne siden viser viktig informasjon for elever på Tiller VGS.
          Venligst naviger deg med menyen på toppen av siden, eller bruk
          knappene under.
        </p>
      </section>
      {/* Info */}
      <section className="grid md:grid-cols-2 gap-6 px-6 md:px-60 pb-20">
        <Paper
          sx={{ backgroundColor: "#1e2227" }}
          variant="elevation"
          elevation={24}
          square={false}
          onClick={() => navigate("/info-screen")}
          className="p-6 hover:scale-105 hover:brightness-120 hover:cursor-pointer transition"
        >
          <h3 className="text-xl font-semibold mb-3 text-tkyellow">
            Infoskjerm
          </h3>
          <p className="text-tqwhitetext">
            I Infoskjermen får elevene tilgang til klokka, dato, busstider,
            værmeldinger, TillerQuest leaderboard og kunngjøringer fra lærere.
          </p>
        </Paper>

        <Paper
          sx={{ backgroundColor: "#1e2227" }}
          variant="elevation"
          elevation={24}
          square={false}
          onClick={() => navigate("/login")}
          className="bg-tqboxes p-6 rounded-2xl shadow-lg hover:scale-105 hover:brightness-120 hover:cursor-pointer transition"
        >
          <h3 className="text-xl font-semibold mb-3 text-tkyellow">
            For lærere
          </h3>
          <p className="text-tqwhitetext">
            Som godkjent lærer kan du logge deg inn med gitt
            påloggingsinformasjon for tilgang til endring av innstilinger og
            sendeing av kunngjøringer.
          </p>
        </Paper>
      </section>
    </div>
  );
}

export default Home;
