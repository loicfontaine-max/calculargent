import type { Metadata } from "next";
import { glossaryTerms } from "../../lib/glossary";

export const metadata: Metadata = {
  title: "Lexique financier : définitions utiles | CalculArgent",
  description: "Capital, TAEG, inflation, rendement réel, taux d’effort et patrimoine net : des définitions claires reliées aux bons calculateurs.",
  alternates: { canonical: "/lexique" },
  openGraph: { title: "Lexique financier | CalculArgent", description: "Les notions utiles pour comprendre une simulation d’épargne, de crédit ou de patrimoine.", url: "/lexique", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Lexique financier | CalculArgent", description: "Les notions utiles pour comprendre une simulation financière.", images: ["/og.png"] },
};

export default function GlossaryPage() {
  const siteUrl = process.env.SITE_URL || "https://calculargent.fr";
  const structuredData = [
    { "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Lexique financier CalculArgent", description: "Définitions pédagogiques des notions utilisées dans les calculateurs CalculArgent.", url: `${siteUrl}/lexique`, inLanguage: "fr-FR", hasDefinedTerm: glossaryTerms.map((item) => ({ "@type": "DefinedTerm", name: item.term, description: item.definition, url: `${siteUrl}/lexique#${item.id}`, inDefinedTermSet: `${siteUrl}/lexique` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Lexique financier", item: `${siteUrl}/lexique` }] },
  ];
  const initials = [...new Set(glossaryTerms.map(({ term }) => term[0]))];
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="nav"><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><div className="navLinks"><a href="/#outils">Calculateurs</a><a href="/guides">Guides</a><a href="/lexique">Lexique</a><a href="/methode">Méthode</a></div><a className="back" href="/">← Accueil</a></nav>
    <header className="glossaryHero"><span className="kicker dark">LES MOTS DERRIÈRE LES CALCULS</span><h1>Lexique<br /><em>financier.</em></h1><p>Des définitions courtes pour lire une simulation sans jargon. Chaque notion renvoie vers une explication ou un calculateur utile.</p><nav aria-label="Accès alphabétique">{initials.map((initial) => <a href={`#lettre-${initial}`} key={initial}>{initial}</a>)}</nav></header>
    <section className="glossaryList">{glossaryTerms.map((item, index) => <article id={item.id} key={item.id}>{(index === 0 || glossaryTerms[index - 1].term[0] !== item.term[0]) && <span className="glossaryLetter" id={`lettre-${item.term[0]}`}>{item.term[0]}</span>}<div><h2>{item.term}</h2><p className="glossaryDefinition">{item.definition}</p><p>{item.detail}</p><a href={item.href}>{item.linkLabel} →</a></div></article>)}</section>
    <section className="guidePromise"><div><span className="kicker">UNE NOTION MANQUE ?</span><h2>Le lexique évolue<br />avec les outils.</h2></div><p>Les définitions sont alignées avec les formules du site et les sources institutionnelles citées dans les guides. Une correction peut être proposée depuis la page de contact.</p></section>
    <footer><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><p>Des repères simples pour vos décisions financières.</p><small><a href="/guides">Guides</a> · <a href="/methode">Méthode</a> · <a href="/contact">Proposer une correction</a></small></footer>
  </main>;
}
