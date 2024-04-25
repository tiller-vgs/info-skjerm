import Link from "next/link";

export default function NotFound() {
  return (
    <main className=" pt-24 justify-center text-center">
      <div>
        <h1 className="text-3xl pb-20">404 – Side ikke funnet</h1>
        <h2 className="text-3xl">
          Det var et problem med å finne siden du leter etter
        </h2>
      </div>
      <div>
        <p>
          Gå tilbake til <Link href="/">Hjemmesiden</Link>
        </p>
      </div>
    </main>
  );
}
