import Footer from "../components/Footer";

function Home() {
  return (
    <div className="pt-40">
      <h2>Velkommen!</h2>
      <p>Denne siden viser viktig informasjon for elever på Tiller VGS</p>
      <p>
        Er du en godkjent lærer? Venligst logg inn med gitt
        påloggingsinformasjon for flere valg
      </p>
      <Footer />
    </div>
  );
}

export default Home;
