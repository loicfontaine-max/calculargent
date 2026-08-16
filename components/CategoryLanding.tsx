import type { Metadata } from "next";
import { calculators } from "../lib/calculators";
import { categoryPages, type CategorySlug } from "../lib/categories";

export function categoryMetadata(slug: CategorySlug): Metadata {
  const category = categoryPages[slug];
  return { title: `${category.title} | CalculArgent`, description: category.description, alternates: { canonical: `/${slug}` } };
}

export function CategoryLanding({ slug }: { slug: CategorySlug }) {
  const category = categoryPages[slug];
  const tools = calculators.filter((item) => item.category === category.name);
  return <main>
    <nav className="nav"><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><div className="navLinks"><a href="/epargne">Épargne</a><a href="/dettes">Dettes</a><a href="/patrimoine">Patrimoine</a><a href="/budget">Budget</a></div><a className="back" href="/#outils">Tous les outils</a></nav>
    <div className="breadcrumb"><a href="/">Accueil</a><span>›</span><b>{category.name}</b></div>
    <header className="categoryHero"><span className="kicker dark">PARCOURS {category.name.toUpperCase()}</span><h1>{category.title}</h1><p>{category.description}</p></header>
    <section className="categoryIntro"><p>{category.intro}</p><ol>{category.steps.map((step, index) => <li key={step}><b>{index + 1}</b>{step}</li>)}</ol></section>
    <section className="categoryTools"><div className="sectionHead"><div><span className="kicker dark">OUTILS GRATUITS</span><h2>Commencez par votre question</h2></div><p>Chaque résultat affiche la formule, les limites et trois scénarios. Aucun compte n’est nécessaire.</p></div><div className="cardGrid">{tools.map((item) => <a className={`toolCard ${item.color}`} href={`/calculateur/${item.slug}`} key={item.slug}><span>{item.category}</span><h3>{item.shortTitle}</h3><p>{item.description}</p><b>Ouvrir le calculateur →</b></a>)}</div></section>
    <footer><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><p>Des repères simples pour vos décisions financières.</p><small><a href="/auteur">Auteur</a> · <a href="/methode">Méthode</a> · <a href="/contact">Contact</a> · <a href="/confidentialite">Confidentialité</a> · <a href="/mentions-legales">Mentions légales</a></small></footer>
  </main>;
}
