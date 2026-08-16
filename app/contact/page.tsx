import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | CalculArgent",
  description: "Contacter CalculArgent pour signaler une erreur, proposer une amélioration ou exercer un droit.",
  robots: { index: false, follow: true },
  openGraph: { title: "Contact | CalculArgent", description: "Signaler une erreur ou proposer une amélioration.", images: [] },
  twitter: { title: "Contact | CalculArgent", description: "Signaler une erreur ou proposer une amélioration.", images: [] },
};

export default function ContactPage() {
  return <main>
    <nav className="nav"><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><a className="back" href="/">← Accueil</a></nav>
    <article className="legalPage">
      <span className="kicker dark">CONTACT</span>
      <h1>Une question ou une erreur à signaler&nbsp;?</h1>
      <p className="standfirst">CalculArgent est maintenu publiquement. Les demandes peuvent être déposées dans l’espace de suivi du projet.</p>
      <h2>Nous contacter</h2>
      <p>Pour signaler un calcul incorrect, proposer une amélioration, demander une correction ou exercer un droit, ouvrez une demande sur le dépôt public CalculArgent.</p>
      <p><a className="contactButton" href="https://github.com/loicfontaine-max/calculargent/issues/new" rel="noreferrer">Ouvrir une demande sur GitHub <span>→</span></a></p>
      <h2>Informations à fournir</h2>
      <p>Indiquez l’adresse de la page concernée, le comportement observé et, si utile, un exemple avec des montants arrondis. Ne publiez jamais de nom complet, d’adresse, de numéro de compte ou de document confidentiel.</p>
      <h2>Délai de traitement</h2>
      <p>Les demandes sont examinées dans la mesure des disponibilités du responsable de publication. Les erreurs susceptibles d’affecter un résultat sont traitées en priorité.</p>
    </article>
    <footer><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><p>Des repères simples pour vos décisions financières.</p><small><a href="/mentions-legales">Mentions légales</a> · <a href="/confidentialite">Confidentialité</a></small></footer>
  </main>;
}
