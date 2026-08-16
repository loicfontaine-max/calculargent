"use client";

import { useEffect, useMemo, useState } from "react";
import { calculate, type Calculator } from "../lib/calculators";

const number = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

export function CalculatorEngine({ calculator }: { calculator: Calculator }) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const params = typeof window === "undefined" ? null : new URLSearchParams(window.location.search);
    return Object.fromEntries(calculator.fields.map((field) => {
      const parsed = Number(params?.get(field.key));
      return [field.key, Number.isFinite(parsed) && params?.has(field.key) ? Math.min(field.max, Math.max(field.min, parsed)) : field.defaultValue];
    }));
  });
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => calculate(calculator.slug, values), [calculator.slug, values]);
  const maxSeries = Math.max(1, ...result.series.map((point) => Number.isFinite(point.value) ? point.value : 0));

  useEffect(() => {
    const params = new URLSearchParams();
    calculator.fields.forEach((field) => params.set(field.key, String(values[field.key])));
    window.history.replaceState(null, "", `${window.location.pathname}?${params}`);
  }, [calculator.fields, values]);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
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
      <button className="shareButton" type="button" onClick={copyLink}>{copied ? "Lien copié ✓" : "Partager cette simulation"}</button>
      <small className="privacyNote">Calcul local · aucune donnée enregistrée</small>
    </div>
  </div>;
}
