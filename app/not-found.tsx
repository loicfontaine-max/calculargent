import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page introuvable | CalculArgent", robots: { index: false, follow: true } };

export default function NotFound() {
  return <main>
    <nav className="nav"><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><a className="back" href="/">← Accueil</a></nav>
    <section className="notFound"><span className="kicker dark">ERREUR 404</span><h1>Ce calcul<br />n’existe pas.</h1><p>L’adresse est peut-être incomplète ou la page a été déplacée. Retrouvez les outils et explications depuis les entrées principales.</p><div><a className="primary" href="/#outils">Voir les calculateurs <span>→</span></a><a href="/guides">Parcourir les guides</a><a href="/lexique">Consulter le lexique</a></div></section>
  </main>;
}
