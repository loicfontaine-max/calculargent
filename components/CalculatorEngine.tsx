"use client";

import { useMemo, useState } from "react";
import { calculate, type Calculator } from "../lib/calculators";

const number = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export function CalculatorEngine({ calculator }: { calculator: Calculator }) {
  const initial = Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue]));
  const [values, setValues] = useState<Record<string, number>>(initial);
  const result = useMemo(() => calculate(calculator.slug, values), [calculator.slug, values]);
  const displayed = Number.isFinite(result.headline) ? number.format(result.headline) : "—";

  return <div className="engine">
    <div className="engineFields">
      {calculator.fields.map((field) => <label key={field.key}>
        <span>{field.label}</span>
        <div className="numberInput"><input aria-label={field.label} type="number" min={field.min} max={field.max} step={field.step} value={values[field.key]} onChange={(e) => setValues((current) => ({ ...current, [field.key]: Number(e.target.value) }))} /><b>{field.suffix}</b></div>
        <input aria-hidden="true" tabIndex={-1} type="range" min={field.min} max={field.max} step={field.step} value={values[field.key]} onChange={(e) => setValues((current) => ({ ...current, [field.key]: Number(e.target.value) }))} />
      </label>)}
    </div>
    <div className={`engineResult ${calculator.color}`}><span>{result.label}</span><strong>{displayed}{calculator.slug !== "dettes" && Number.isFinite(result.headline) ? " €" : ""}</strong><p>{result.detail}</p><div className="resultRule" /><small>Résultat instantané · données non enregistrées</small></div>
  </div>;
}
