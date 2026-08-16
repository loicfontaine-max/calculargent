import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorEngine } from "../../../components/CalculatorEngine";
import { assumptions, calculators, getCalculator } from "../../../lib/calculators";

export function generateStaticParams() { return calculators.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) return {};
  const title = `Calculateur ${calculator.shortTitle.toLowerCase()} gratuit — Plume`;
  return { title, description: calculator.description, openGraph: { title, description: calculator.description, images: [] }, twitter: { card: "summary", title, description: calculator.description, images: [] } };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) notFound();
  return <main>
    <nav className="nav"><a className="brand" href="/"><span>plum</span><b>e</b></a><a className="back" href="/#outils">← Tous les calculateurs</a></nav>
    <header className="detailHero"><span className="kicker dark">{calculator.category.toUpperCase()} · GRATUIT</span><h1>{calculator.title}</h1><p>{calculator.description}</p></header>
    <section className="engineWrap"><CalculatorEngine calculator={calculator} /></section>
    <section className="editorial" id="methode"><div><span className="kicker dark">COMMENT ÇA MARCHE</span><h2>Un calcul transparent,<br />sans jargon.</h2></div><div><p>{calculator.explanation}</p><p className="assumption">Hypothèses mises à jour le {assumptions.updatedAt}.</p></div></section>
    <section className="faq"><span className="kicker dark">QUESTIONS FRÉQUENTES</span>{calculator.faq.map((item) => <details key={item.q}><summary>{item.q}<b>+</b></summary><p>{item.a}</p></details>)}</section>
    <footer><a className="brand" href="/"><span>plum</span><b>e</b></a><p>Des repères simples pour vos décisions financières.</p><small>Outil pédagogique — ne constitue pas un conseil financier.</small></footer>
  </main>;
}
