"use client";

import { useEffect, useMemo, useState } from "react";
import { buildScenarios, calculate, type Calculator } from "../lib/calculators";

const number = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

export function CalculatorEngine({ calculator }: { calculator: Calculator }) {
  const defaults = useMemo(() => Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue])), [calculator.fields]);
  const [values, setValues] = useState<Record<string, number>>(defaults);
  const [status, setStatus] = useState<"link" | "result" | null>(null);
  const result = useMemo(() => calculate(calculator.slug, values), [calculator.slug, values]);
  const scenarios = useMemo(() => buildScenarios(calculator.slug, values), [calculator.slug, values]);
  const maxSeries = Math.max(1, ...result.series.map((point) => Number.isFinite(point.value) ? point.value : 0));

  useEffect(() => {
    if (!window.location.hash.startsWith("#simulation=")) return;
    let frame = 0;
    try {
      const shared = JSON.parse(decodeURIComponent(window.location.hash.slice(12))) as Record<string, unknown>;
      frame = window.requestAnimationFrame(() => setValues(Object.fromEntries(calculator.fields.map((field) => {
          const parsed = Number(shared[field.key]);
          return [field.key, Number.isFinite(parsed) && Object.hasOwn(shared, field.key) ? Math.min(field.max, Math.max(field.min, parsed)) : field.defaultValue];
        }))));
    } catch { window.history.replaceState(null, "", window.location.pathname); }
    return () => window.cancelAnimationFrame(frame);
  }, [calculator.fields]);

  async function copyText(text: string) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  async function copyLink() {
    const compactValues = Object.fromEntries(calculator.fields.map((field) => [field.key, values[field.key]]));
    const url = `${window.location.origin}${window.location.pathname}#simulation=${encodeURIComponent(JSON.stringify(compactValues))}`;
    await copyText(url);
    setStatus("link");
    window.setTimeout(() => setStatus(null), 1800);
  }

  async function copyResult() {
    const formatted = Number.isFinite(result.headline) ? `${number.format(result.headline)} ${result.unit}`.trim() : "résultat non calculable";
    await copyText(`${calculator.shortTitle} — ${result.label} : ${formatted}. ${result.detail} — CalculArgent.fr`);
    setStatus("result");
    window.setTimeout(() => setStatus(null), 1800);
  }

  function reset() {
    setValues(Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue])));
    window.history.replaceState(null, "", window.location.pathname);
  }

  return <div className="engine">
    <div className="engineFields">
      {calculator.fields.map((field) => <label key={field.key}>
        <span>{field.label}</span>
        <div className="numberInput"><input aria-label={field.label} type="number" min={field.min} max={field.max} step={field.step} value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: Number(event.target.value) }))} /><b>{field.suffix}</b></div>
        <input aria-label={`Ajuster ${field.label.toLowerCase()}`} type="range" min={field.min} max={field.max} step={field.step} value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: Number(event.target.value) }))} />
      </label>)}
    </div>
    <div className={`engineResult ${calculator.color}`} aria-live="polite">
      <span>{result.label}</span><strong>{Number.isFinite(result.headline) ? number.format(result.headline) : "—"}<small>{result.unit}</small></strong><p>{result.detail}</p>
      {result.series.length > 0 && <div className="miniChart" aria-label="Visualisation du résultat">{result.series.map((point, index) => <div className="chartItem" key={`${point.label}-${index}`}><i style={{ height: `${Math.max(5, (Math.max(0, point.value) / maxSeries) * 100)}%` }} /><span>{point.label}</span></div>)}</div>}
      <div className="scenarioGrid" aria-label="Scénarios comparatifs">{scenarios.map((scenario) => <div key={scenario.label}><span>{scenario.label}</span><b>{Number.isFinite(scenario.value) ? number.format(scenario.value) : "—"} <small>{scenario.unit}</small></b></div>)}</div>
      <div className="engineActions"><button className="shareButton" type="button" onClick={copyResult}>{status === "result" ? "Résultat copié ✓" : "Copier le résultat"}</button><button className="shareButton" type="button" onClick={copyLink}>{status === "link" ? "Lien copié ✓" : "Copier le lien"}</button><button className="resetButton" type="button" onClick={reset}>Réinitialiser</button></div>
      <small className="privacyNote">Calcul local · vos montants restent dans cet onglet. Un lien partagé place les chiffres après #, hors des requêtes serveur.</small>
    </div>
  </div>;
}
