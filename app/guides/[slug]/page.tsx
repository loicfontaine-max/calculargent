import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "../../../components/AdSlot";
import { assumptions, getCalculator } from "../../../lib/calculators";
import { getGuide, guides } from "../../../lib/guides";

export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  const title = `${guide.shortTitle} | CalculArgent`;
  return { title, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` }, openGraph: { title, description: guide.description, url: `/guides/${guide.slug}`, type: "article", images: [] }, twitter: { card: "summary", title, description: guide.description, images: [] } };
}

function sectionId(title: string) { return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const calculator = getCalculator(guide.calculatorSlug);
  if (!calculator) notFound();
  const siteUrl = process.env.SITE_URL || "https://calculargent.fr";
  const related = guides.filter((item) => item.slug !== guide.slug).sort((a, b) => Number(b.category === guide.category) - Number(a.category === guide.category)).slice(0, 3);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, datePublished: "2026-08-17", dateModified: assumptions.updatedAtIso, inLanguage: "fr-FR", isAccessibleForFree: true, mainEntityOfPage: `${siteUrl}/guides/${guide.slug}`, author: { "@type": "Person", name: "Loïc Fontaine", url: `${siteUrl}/auteur` }, publisher: { "@type": "Organization", name: "CalculArgent", url: siteUrl } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides` }, { "@type": "ListItem", position: 3, name: guide.shortTitle, item: `${siteUrl}/guides/${guide.slug}` }] },
  ];
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="nav"><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><div className="navLinks"><a href="/guides">Tous les guides</a><a href="/lexique">Lexique</a><a href="#methode">Méthode</a><a href="#faq">FAQ</a></div><a className="back" href="/guides">← Guides</a></nav>
    <div className="breadcrumb"><a href="/">Accueil</a><span>›</span><a href="/guides">Guides</a><span>›</span><b>{guide.shortTitle}</b></div>
    <header className="guideHero"><span className="kicker dark">{guide.category.toUpperCase()} · GUIDE PRATIQUE · {guide.readingTime.toUpperCase()}</span><h1>{guide.title}</h1><p>{guide.intro}</p><div className="guideByline">Écrit et vérifié par <a href="/auteur">Loïc Fontaine</a> · Mis à jour le {assumptions.updatedAt}</div></header>
    <nav className="guideToc" aria-label="Sommaire"><b>Dans ce guide</b><ol>{guide.sections.map((section, index) => <li key={section.title}><a href={`#${sectionId(section.title)}`}>{index + 1}. {section.title}</a></li>)}<li><a href="#methode">Plan d’action</a></li><li><a href="#faq">Questions fréquentes</a></li></ol></nav>
    <section className="guideBody">{guide.sections.map((section, index) => <section className="guideSection" id={sectionId(section.title)} key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</section>
    <section className="guideExample"><div><span className="kicker dark">EXEMPLE CHIFFRÉ</span><h2>{guide.example.title}</h2></div><div><p>{guide.example.body}</p><small>{guide.example.note}</small></div></section>
    <section className="guideTableWrap"><h2>{guide.comparison.title}</h2><div className="tableScroll"><table className="guideTable"><thead><tr>{guide.comparison.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{guide.comparison.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section>
    <section className="guideChecklist" id="methode"><div><span className="kicker">PLAN D’ACTION</span><h2>À faire dans l’ordre</h2></div><ol>{guide.checklist.map((item, index) => <li key={item}><b>{index + 1}</b>{item}</li>)}</ol></section>
    <section className="guideCta"><div><span className="kicker dark">PASSEZ À VOS CHIFFRES</span><h2>{calculator.shortTitle}</h2><p>{calculator.description}</p></div><a className="primary" href={`/calculateur/${calculator.slug}`}>Ouvrir le calculateur <span>→</span></a></section>
    <AdSlot placement="content" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT} />
    <section className="guideSources"><div><span className="kicker dark">SOURCES OFFICIELLES</span><h2>Pour vérifier et approfondir</h2><p>Les sources éclairent les notions générales. Elles ne valident pas une décision personnelle.</p></div><ul>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><b>{source.label}</b><span>{source.publisher} ↗</span></a></li>)}</ul></section>
    <section className="faq guideFaq" id="faq"><span className="kicker dark">QUESTIONS FRÉQUENTES</span><h2>Les réponses courtes</h2>{guide.faq.map((item) => <details key={item.q}><summary>{item.q}<b>+</b></summary><p>{item.a}</p></details>)}</section>
    <section className="related guideRelated"><div className="sectionHead"><div><span className="kicker dark">CONTINUER</span><h2>Trois guides complémentaires</h2></div><p>Une décision financière devient plus claire lorsqu’on relie budget, sécurité, dette et horizon.</p></div><div className="guideMiniGrid">{related.map((item) => <a href={`/guides/${item.slug}`} key={item.slug}><span>{item.category} · {item.readingTime}</span><h3>{item.shortTitle}</h3><b>Lire →</b></a>)}</div></section>
    <footer><a className="brand" href="/"><span>Calcul</span><b>Argent</b></a><p>Contenu pédagogique, pas un conseil financier personnalisé.</p><small><a href="/a-propos">À propos</a> · <a href="/auteur">Auteur</a> · <a href="/methode">Méthode</a> · <a href="/confidentialite">Confidentialité</a> · <a href="/publicite">Publicité</a></small></footer>
  </main>;
}
