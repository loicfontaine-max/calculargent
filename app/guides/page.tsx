import type { Metadata } from "next";
import { guides } from "../../lib/guides";

export const metadata: Metadata = {
  title: "Guides sur l’épargne, le budget et le crédit | CalculArgent",
  description: "Des guides financiers clairs, sourcés et reliés à des calculateurs gratuits pour passer de la question à une estimation concrète.",
  alternates: { canonical: "/guides" },
  openGraph: { title: "Guides pratiques | CalculArgent", description: "Comprendre avant de calculer : épargne, budget, crédit et sécurité financière.", url: "/guides", type: "website" },
  twitter: { card: "summary_large_image", title: "Guides pratiques | CalculArgent", description: "Comprendre avant de calculer : épargne, budget, crédit et sécurité financière." },
};

export default function GuidesPage() {
  const siteUrl = process.env.SITE_URL || "https://calculargent.fr";
  const structuredData = [{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Guides CalculArgent", url: `${siteUrl}/guides`, inLanguage: "fr-FR", isAccessibleForFree: true }, { "@context": "https://schema.org", "@type": "ItemList", itemListElement: guides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: `${siteUrl}/guides/${guide.slug}` })) }];
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="nav"><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><div className="navLinks"><a href="/#outils">Calculateurs</a><a href="/guides">Guides</a><a href="/lexique">Lexique</a><a href="/methode">Méthode</a></div><a className="back" href="/">← Accueil</a></nav>
    <header className="guideHubHero"><span className="kicker dark">COMPRENDRE · DÉCIDER · CALCULER</span><h1>Les guides<br /><em>CalculArgent.</em></h1><p>Des réponses structurées, des exemples chiffrés et des sources institutionnelles. Chaque guide se prolonge par un calculateur gratuit.</p></header>
    <section className="guideGrid">{guides.map((guide, index) => <article className="guideCard" key={guide.slug}><span>{String(index + 1).padStart(2, "0")} · {guide.category} · {guide.readingTime}</span><h2><a href={`/guides/${guide.slug}`}>{guide.shortTitle}</a></h2><p>{guide.description}</p><div><a href={`/guides/${guide.slug}`}>Lire le guide →</a><a href={`/calculateur/${guide.calculatorSlug}`}>Calculer</a></div></article>)}</section>
    <section className="guidePromise"><div><span className="kicker">LIGNE ÉDITORIALE</span><h2>Ni recette magique,<br />ni promesse de rendement.</h2></div><p>Nos guides distinguent les formules, les repères institutionnels et les choix personnels. Les limites sont visibles et les sources sont accessibles depuis chaque page.</p></section>
    <footer><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><p>Des repères simples pour vos décisions financières.</p><small><a href="/a-propos">À propos</a> · <a href="/auteur">Auteur</a> · <a href="/methode">Méthode</a> · <a href="/confidentialite">Confidentialité</a> · <a href="/publicite">Publicité</a></small></footer>
  </main>;
}
