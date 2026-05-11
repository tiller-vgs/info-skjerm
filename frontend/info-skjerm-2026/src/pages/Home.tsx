// import Footer from "../components/Footer";

// function Home() {
//   return (
//     <div className="pt-40">
//       <h2>Velkommen!</h2>
//       <p>Denne siden viser viktig informasjon for elever på Tiller VGS</p>
//       <p>
//         Er du en godkjent lærer? Venligst logg inn med gitt
//         påloggingsinformasjon for flere valg
//       </p>
//       <Footer />
//     </div>
//   );
// }

// export default Home;
import Footer from "../components/Footer";
import { Navigate } from "react-router";

function Home() {
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
        <div
          onClick={() => <Navigate to="/info-screen" />}
          className="bg-tqboxes p-6 rounded-2xl shadow-lg hover:scale-105 hover:brightness-120 transition"
        >
          <h3 className="text-xl font-semibold mb-3 text-tkyellow">
            Infoskjerm
          </h3>
          <p className="text-tqwhitetext">
            I Infoskjermen får elevene tilgang til klokka, dato, busstider,
            værmeldinger, TillerQuest leaderboard og kunngjøringer fra lærere.
          </p>
        </div>

        <div
          onClick={() => <Navigate to="/login" />}
          className="bg-tqboxes p-6 rounded-2xl shadow-lg hover:scale-105 hover:brightness-120 transition"
        >
          <h3 className="text-xl font-semibold mb-3 text-tkyellow">
            For lærere
          </h3>
          <p className="text-tqwhitetext">
            Som godkjent lærer kan du logge deg inn med gitt
            påloggingsinformasjon for tilgang til endring av innstilinger og
            sendeing av kunngjøringer.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
