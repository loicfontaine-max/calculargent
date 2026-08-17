import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CalculatorEngine } from "../../../components/CalculatorEngine";
import { AdSlot } from "../../../components/AdSlot";
import { HelpfulFeedback } from "../../../components/HelpfulFeedback";
import { assumptions, calculators, canonicalSlug, getCalculator } from "../../../lib/calculators";
import { editorialSources } from "../../../lib/editorial-sources";
import { getGuidesForCalculator } from "../../../lib/guides";

export function generateStaticParams() { return calculators.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) return {};
  const title = `${calculator.shortTitle} : calculateur gratuit | CalculArgent`;
  return {
    title, description: calculator.description,
    alternates: { canonical: `/calculateur/${calculator.slug}` },
    openGraph: { title, description: calculator.description, url: `/calculateur/${calculator.slug}`, type: "website", images: [] },
    twitter: { card: "summary", title, description: calculator.description, images: [] },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonical = canonicalSlug(slug);
  if (canonical !== slug) permanentRedirect(`/calculateur/${canonical}`);
  const calculator = getCalculator(slug);
  if (!calculator) notFound();
  const siteUrl = process.env.SITE_URL || "https://calculargent.fr";
  const categoryRoute = { Épargne: "epargne", Dettes: "dettes", Patrimoine: "patrimoine", Budget: "budget" }[calculator.category];
  const sources = editorialSources[calculator.slug];
  const calculatorGuides = getGuidesForCalculator(calculator.slug);
  const related = calculators.filter((item) => item.slug !== calculator.slug).sort((a, b) => Number(b.category === calculator.category) - Number(a.category === calculator.category)).slice(0, 3);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "WebPage", name: calculator.title, description: calculator.description, url: `${siteUrl}/calculateur/${calculator.slug}`, dateModified: assumptions.updatedAtIso, inLanguage: "fr-FR", isAccessibleForFree: true, author: { "@type": "Person", name: "Loïc Fontaine", url: `${siteUrl}/auteur` } },
    { "@context": "https://schema.org", "@type": "WebApplication", name: calculator.shortTitle, description: calculator.description, applicationCategory: "FinanceApplication", operatingSystem: "Tout navigateur", url: `${siteUrl}/calculateur/${calculator.slug}`, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, author: { "@type": "Person", name: "Loïc Fontaine", url: `${siteUrl}/auteur` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: calculator.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl }, { "@type": "ListItem", position: 2, name: calculator.category, item: `${siteUrl}/${categoryRoute}` }, { "@type": "ListItem", position: 3, name: calculator.shortTitle, item: `${siteUrl}/calculateur/${calculator.slug}` }] },
  ];

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="nav"><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><div className="navLinks"><a href="/#outils">Calculateurs</a><a href="#comprendre">Comprendre</a><a href="/lexique">Lexique</a><a href="#faq">FAQ</a></div><a className="back" href="/#outils">← Tous les outils</a></nav>
    <div className="breadcrumb"><a href="/">Accueil</a><span>›</span><a href={`/${categoryRoute}`}>{calculator.category}</a><span>›</span><b>{calculator.shortTitle}</b></div>
    <header className="detailHero"><span className="kicker dark">{calculator.category.toUpperCase()} · CALCULATEUR GRATUIT</span><h1>{calculator.title}</h1><p>{calculator.description} Modifiez les données : le résultat se met à jour instantanément. Le partage reste volontaire.</p></header>
    <section className="engineWrap"><CalculatorEngine calculator={calculator} /><p className="calculatorDisclaimer">Simulation indicative, avant fiscalité et frais sauf mention contraire. Elle ne constitue ni une prévision ni un conseil financier.</p></section>
    <AdSlot placement="content" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} />

    <article className="seoArticle" id="comprendre">
      <div className="articleLead"><span className="kicker dark">COMPRENDRE LE CALCUL</span><h2>{calculator.shortTitle}, simplement.</h2><p>{calculator.explanation}</p></div>
      <section className="formulaBox"><span>La formule utilisée</span><p>{calculator.formula}</p></section>
      <section className="howTo"><div><span className="kicker dark">MODE D’EMPLOI</span><h2>Obtenez une estimation en quatre étapes.</h2></div><ol>{calculator.howTo.map((step, index) => <li key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol></section>
      <section className="exampleBox"><span className="kicker dark">EXEMPLE CONCRET</span><h2>Pour donner un ordre de grandeur</h2><p>{calculator.example}</p><small>Chaque situation est différente. Utilisez vos propres chiffres dans le calculateur.</small></section>
      <section className="sourceBox"><div><span className="kicker dark">SOURCES INSTITUTIONNELLES</span><h2>Repères vérifiables</h2><p>Ces ressources éclairent les notions et précautions utilisées dans cette page. Elles ne valident pas une simulation personnelle et ne remplacent pas les conditions d’un contrat.</p></div><ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><b>{source.label}</b><span>{source.publisher} ↗</span></a></li>)}</ul></section>
      <section className="faq" id="faq"><span className="kicker dark">QUESTIONS FRÉQUENTES</span><h2>Ce qu’il faut savoir</h2>{calculator.faq.map((item) => <details key={item.q}><summary>{item.q}<b>+</b></summary><p>{item.a}</p></details>)}</section>
    </article>

    {calculatorGuides.length > 0 && <section className="calculatorGuideCta"><div><span className="kicker dark">POUR INTERPRÉTER LE RÉSULTAT</span><h2>{calculatorGuides[0].shortTitle}</h2><p>{calculatorGuides[0].description}</p></div><a className="primary" href={`/guides/${calculatorGuides[0].slug}`}>Lire le guide <span>→</span></a></section>}

    <section className="related"><div className="sectionHead"><div><span className="kicker dark">POURSUIVRE VOTRE CALCUL</span><h2>Trois outils complémentaires</h2></div><p>Reliez vos décisions d’épargne, de dette et de patrimoine pour obtenir une vision plus complète.</p></div><div className="cardGrid">{related.map((item) => <a className={`toolCard compact ${item.color}`} href={`/calculateur/${item.slug}`} key={item.slug}><span>{item.category}</span><h3>{item.shortTitle}</h3><p>{item.description}</p><b>Ouvrir le calculateur →</b></a>)}</div></section>
    <section className="methodNote"><b>Méthodologie transparente</b><p>Calcul et références vérifiés le {assumptions.updatedAt} par <a className="textLink" href="/auteur">Loïc Fontaine</a>. Les formules sont visibles afin que vous puissiez comprendre les limites de chaque estimation. Retrouvez les notions utilisées dans le <a className="textLink" href="/lexique">lexique financier</a>.</p></section>
    <section className="feedbackWrap"><HelpfulFeedback title={calculator.shortTitle} /></section>
    <footer><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><p>Des repères simples pour vos décisions financières.</p><small><a href="/a-propos">À propos</a> · <a href="/auteur">Auteur</a> · <a href="/methode">Méthode</a> · <a href="/contact">Contact</a> · <a href="/confidentialite">Confidentialité</a> · <a href="/cookies">Cookies</a> · <a href="/publicite">Publicité</a> · <a href="/mentions-legales">Mentions légales</a></small></footer>
  </main>;
}
