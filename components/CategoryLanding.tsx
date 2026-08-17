import type { Metadata } from "next";
import { calculators } from "../lib/calculators";
import { categoryPages, type CategorySlug } from "../lib/categories";
import { guides } from "../lib/guides";

export function categoryMetadata(slug: CategorySlug): Metadata {
  const category = categoryPages[slug];
  const title = `${category.title} | CalculArgent`;
  return { title, description: category.description, alternates: { canonical: `/${slug}` }, openGraph: { title, description: category.description, url: `/${slug}`, type: "website", images: ["/og.png"] }, twitter: { card: "summary_large_image", title, description: category.description, images: ["/og.png"] } };
}

export function CategoryLanding({ slug }: { slug: CategorySlug }) {
  const category = categoryPages[slug];
  const tools = calculators.filter((item) => item.category === category.name);
  const categoryGuides = guides.filter((item) => item.category === category.name);
  const siteUrl = process.env.SITE_URL || "https://calculargent.fr";
  const structuredData = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: category.title, description: category.description, url: `${siteUrl}/${slug}`, inLanguage: "fr-FR", isAccessibleForFree: true, mainEntity: { "@type": "ItemList", itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.shortTitle, url: `${siteUrl}/calculateur/${tool.slug}` })) } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl }, { "@type": "ListItem", position: 2, name: category.name, item: `${siteUrl}/${slug}` }] },
  ];
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="nav"><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><div className="navLinks"><a href="/epargne">Épargne</a><a href="/dettes">Dettes</a><a href="/patrimoine">Patrimoine</a><a href="/budget">Budget</a><a href="/guides">Guides</a></div><a className="back" href="/#outils">Tous les outils</a></nav>
    <div className="breadcrumb"><a href="/">Accueil</a><span>›</span><b>{category.name}</b></div>
    <header className="categoryHero"><span className="kicker dark">PARCOURS {category.name.toUpperCase()}</span><h1>{category.title}</h1><p>{category.description}</p></header>
    <section className="categoryIntro"><p>{category.intro}</p><ol>{category.steps.map((step, index) => <li key={step}><b>{index + 1}</b>{step}</li>)}</ol></section>
    <section className="categoryTools"><div className="sectionHead"><div><span className="kicker dark">OUTILS GRATUITS</span><h2>Commencez par votre question</h2></div><p>Chaque résultat affiche la formule, les limites et trois scénarios. Aucun compte n’est nécessaire.</p></div><div className="cardGrid">{tools.map((item) => <a className={`toolCard ${item.color}`} href={`/calculateur/${item.slug}`} key={item.slug}><span>{item.category}</span><h3>{item.shortTitle}</h3><p>{item.description}</p><b>Ouvrir le calculateur →</b></a>)}</div></section>
    {categoryGuides.length > 0 && <section className="categoryGuides"><div className="sectionHead"><div><span className="kicker dark">ALLER PLUS LOIN</span><h2>Comprendre avant de décider</h2></div><p>Des exemples, des points de vigilance et des références officielles pour interpréter les résultats.</p></div><div className="guideMiniGrid">{categoryGuides.map((guide) => <a href={`/guides/${guide.slug}`} key={guide.slug}><span>{guide.category} · {guide.readingTime}</span><h3>{guide.shortTitle}</h3><b>Lire le guide →</b></a>)}</div></section>}
    <footer><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><p>Des repères simples pour vos décisions financières.</p><small><a href="/auteur">Auteur</a> · <a href="/methode">Méthode</a> · <a href="/contact">Contact</a> · <a href="/confidentialite">Confidentialité</a> · <a href="/mentions-legales">Mentions légales</a></small></footer>
  </main>;
}
