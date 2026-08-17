import type { Metadata } from "next";
import { assumptions } from "../../lib/calculators";

export const metadata: Metadata = {
  title: "Journal des mises à jour éditoriales | CalculArgent",
  description: "Historique daté des évolutions importantes apportées aux calculateurs, aux guides, aux sources et à la méthodologie CalculArgent.",
  alternates: { canonical: "/journal-des-mises-a-jour" },
  openGraph: { title: "Journal des mises à jour | CalculArgent", description: "Les changements importants des outils et contenus CalculArgent.", url: "/journal-des-mises-a-jour", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Journal des mises à jour | CalculArgent", description: "Les changements importants des outils et contenus CalculArgent.", images: ["/og.png"] },
};

const updates = [
  { date: "17 août 2026", title: "Architecture éditoriale et couverture des intentions de recherche", details: ["Publication de neuf guides pratiques reliés aux calculateurs.", "Création d’un lexique financier central et de sommaires internes.", "Enrichissement des parcours Épargne, Dettes, Patrimoine et Budget."] },
  { date: "17 août 2026", title: "Sources et responsabilité éditoriale", details: ["Ajout d’au moins deux références institutionnelles sur chaque calculateur et chaque guide.", "Publication de la méthode de vérification, de la page auteur et des limites pédagogiques.", "Harmonisation des dates de contrôle et des données structurées."] },
  { date: "17 août 2026", title: "Calculateurs, scénarios et partage", details: ["Passage à douze calculateurs couvrant épargne, crédit, budget et patrimoine.", "Ajout de trois scénarios comparatifs, de la copie du résultat et des liens préremplis.", "Renforcement des tests numériques sur les taux nuls et cas limites."] },
  { date: "17 août 2026", title: "Préparation de la monétisation", details: ["Création de deux emplacements AdSense distincts pour l’accueil et les contenus.", "Maintien d’une séparation visible entre publicité, résultat et contenu éditorial.", "Publication des politiques de confidentialité, cookies, publicité et affiliations futures."] },
];

export default function UpdatesPage() {
  const siteUrl = process.env.SITE_URL || "https://calculargent.fr";
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Journal des mises à jour CalculArgent", description: "Historique des évolutions importantes du site.", url: `${siteUrl}/journal-des-mises-a-jour`, dateModified: assumptions.updatedAtIso, inLanguage: "fr-FR", isAccessibleForFree: true, author: { "@type": "Person", name: "Loïc Fontaine", url: `${siteUrl}/auteur` } };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <nav className="nav"><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><div className="navLinks"><a href="/methode">Méthode</a><a href="/auteur">Auteur</a><a href="/journal-des-mises-a-jour">Mises à jour</a></div><a className="back" href="/">← Accueil</a></nav>
    <header className="updatesHero"><span className="kicker dark">TRANSPARENCE ÉDITORIALE</span><h1>Journal des<br /><em>mises à jour.</em></h1><p>Les changements susceptibles d’améliorer l’exactitude, la compréhension ou la transparence des outils sont consignés ici. Les petites corrections typographiques ne sont pas détaillées.</p></header>
    <section className="updatesList">{updates.map((update, index) => <article key={`${update.date}-${update.title}`}><div><time dateTime="2026-08-17">{update.date}</time><span>{String(index + 1).padStart(2, "0")}</span></div><div><h2>{update.title}</h2><ul>{update.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}</section>
    <section className="methodNote"><b>Proposer une correction</b><p>Une formule, une source ou une explication vous semble inexacte ? Utilisez la <a className="textLink" href="/contact">page de contact</a>. Les corrections substantielles seront datées dans ce journal.</p></section>
    <footer><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><p>Des repères simples pour vos décisions financières.</p><small><a href="/methode">Méthode</a> · <a href="/auteur">Auteur</a> · <a href="/a-propos">À propos</a></small></footer>
  </main>;
}
