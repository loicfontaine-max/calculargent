"use client";

import { useMemo, useState } from "react";
import { calculators } from "../lib/calculators";
import { AdSlot } from "../components/AdSlot";

const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export default function Home() {
  const [capital, setCapital] = useState(10000);
  const [monthly, setMonthly] = useState(250);
  const [years, setYears] = useState(10);
  const result = useMemo(() => {
    const rate = 0.05 / 12;
    const months = years * 12;
    return capital * Math.pow(1 + rate, months) + monthly * ((Math.pow(1 + rate, months) - 1) / rate);
  }, [capital, monthly, years]);

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "CalculArgent", alternateName: "Calcul Argent", description: "Des calculateurs simples et gratuits pour l’épargne, les dettes et le patrimoine.", inLanguage: "fr-FR" }) }} />
      <nav className="nav"><a className="brand" href="#top"><span>Calcul</span><b>Argent</b></a><div className="navLinks"><a href="#outils">Calculateurs</a><a href="/epargne">Épargne</a><a href="/dettes">Dettes</a><a href="#methode">Méthode</a></div><a className="navCta" href="#outils">Commencer</a></nav>
    <section className="hero" id="top">
      <div className="eyebrow"><i /> Finance simple, décisions éclairées</div>
      <h1>Voyez plus clair dans<br />votre <em>argent.</em></h1>
      <p>Des calculateurs rapides, gratuits et sans inscription pour comprendre votre épargne, vos dettes et votre patrimoine.</p>
      <div className="heroActions"><a className="primary" href="#outils">Explorer les calculateurs <span>→</span></a><span className="trust">Aucune donnée enregistrée</span></div>
      <div className="proof"><div><b>{calculators.length}</b><span>outils essentiels</span></div><div><b>&lt; 1 min</b><span>pour un résultat</span></div><div><b>100%</b><span>gratuit</span></div></div>
    </section>
    <AdSlot placement="home" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} />
    <section className="demo" id="calculateurs">
      <div className="demoIntro"><span className="kicker">CALCULATEUR VEDETTE</span><h2>Projetez votre épargne</h2><p>Trois chiffres suffisent. Le calcul utilise une hypothèse de rendement annuel moyen de 5 %.</p></div>
      <div className="calculator">
        <div className="inputs">
          <label>Épargne de départ <span>{euros.format(capital)}</span><input aria-label="Épargne de départ" type="range" min="0" max="100000" step="1000" value={capital} onChange={(e) => setCapital(+e.target.value)} /></label>
          <label>Versement mensuel <span>{euros.format(monthly)}</span><input aria-label="Versement mensuel" type="range" min="0" max="2000" step="50" value={monthly} onChange={(e) => setMonthly(+e.target.value)} /></label>
          <label>Durée <span>{years} ans</span><input aria-label="Durée" type="range" min="1" max="40" value={years} onChange={(e) => setYears(+e.target.value)} /></label>
        </div>
        <div className="result"><span>Votre capital estimé</span><strong>{euros.format(result)}</strong><small>dont {euros.format(result - capital - monthly * years * 12)} d’intérêts estimés</small><div className="bars"><i style={{height: `${Math.max(28, Math.min(92, years * 2.2))}%`}} /><i style={{height: `${Math.max(18, Math.min(72, monthly / 10))}%`}} /><i style={{height: "100%"}} /></div></div>
      </div>
    </section>
    <section className="collection" id="outils"><div className="sectionHead"><div><span className="kicker dark">LES ESSENTIELS</span><h2>Un calculateur.<br />Une réponse claire.</h2></div><p>Commencez par la question qui vous occupe aujourd’hui. Chaque outil explique son calcul et ses hypothèses.</p></div><div className="categoryLinks"><a href="/epargne">Parcours Épargne →</a><a href="/dettes">Parcours Dettes →</a><a href="/patrimoine">Parcours Patrimoine →</a><a href="/budget">Parcours Budget →</a></div><div className="cardGrid">{calculators.map((item, index) => <a className={`toolCard ${item.color}`} href={`/calculateur/${item.slug}`} key={item.slug}><span>{String(index + 1).padStart(2, "0")} · {item.category}</span><h3>{item.shortTitle}</h3><p>{item.description}</p><b>Calculer maintenant →</b></a>)}</div></section>
    <section className="method" id="methode"><span className="kicker">NOTRE MÉTHODE</span><h2>Vos chiffres restent<br />vos chiffres.</h2><div className="methodGrid"><p>Pas de compte à créer, pas de données personnelles collectées. Les calculs se font directement dans votre navigateur.</p><p>Les hypothèses sont visibles, prudentes et mises à jour au même endroit pour tous les calculateurs.</p><p>Les résultats donnent un ordre de grandeur pédagogique. Ils ne remplacent pas un conseil personnalisé.</p></div></section>
    <footer><a className="brand" href="#top"><span>Calcul</span><b>Argent</b></a><p>Des repères simples pour vos décisions financières.</p><small><a href="/a-propos">À propos</a> · <a href="/auteur">Auteur</a> · <a href="/methode">Méthode</a> · <a href="/contact">Contact</a> · <a href="/confidentialite">Confidentialité</a> · <a href="/cookies">Cookies</a> · <a href="/publicite">Publicité</a> · <a href="/mentions-legales">Mentions légales</a></small></footer>
  </main>;
}
