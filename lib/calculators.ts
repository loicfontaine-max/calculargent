export const assumptions = {
  savingsAnnualReturn: 0.05,
  inflation: 0.02,
  updatedAt: "16 août 2026",
};

export type CalculatorSlug = "epargne" | "dettes" | "patrimoine";
export type Field = { key: string; label: string; defaultValue: number; min: number; max: number; step: number; suffix: string };
export type Calculator = {
  slug: CalculatorSlug;
  category: string;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  fields: Field[];
  explanation: string;
  faq: { q: string; a: string }[];
};

export const calculators: Calculator[] = [
  {
    slug: "epargne", category: "Épargne", shortTitle: "Projection d’épargne", title: "Combien votre épargne peut-elle devenir ?", color: "mint",
    description: "Projetez votre capital selon votre mise de départ, vos versements et la durée.",
    fields: [
      { key: "capital", label: "Épargne de départ", defaultValue: 10000, min: 0, max: 100000, step: 1000, suffix: "€" },
      { key: "monthly", label: "Versement mensuel", defaultValue: 250, min: 0, max: 2000, step: 50, suffix: "€" },
      { key: "years", label: "Durée", defaultValue: 10, min: 1, max: 40, step: 1, suffix: "ans" },
    ],
    explanation: "Le calcul applique des intérêts composés mensuellement aux versements. Le rendement est une hypothèse, pas une promesse de performance.",
    faq: [{ q: "Quel rendement est utilisé ?", a: "Le scénario central utilise 5 % par an, avant fiscalité et frais." }, { q: "Les intérêts sont-ils garantis ?", a: "Non. Le résultat est une simulation pédagogique et dépend du placement choisi." }],
  },
  {
    slug: "dettes", category: "Dettes", shortTitle: "Durée de remboursement", title: "Quand votre dette sera-t-elle remboursée ?", color: "coral",
    description: "Estimez la durée et le coût total des intérêts de votre crédit.",
    fields: [
      { key: "balance", label: "Capital restant dû", defaultValue: 12000, min: 500, max: 100000, step: 500, suffix: "€" },
      { key: "rate", label: "Taux annuel", defaultValue: 6, min: 0, max: 25, step: 0.1, suffix: "%" },
      { key: "payment", label: "Mensualité", defaultValue: 350, min: 50, max: 3000, step: 25, suffix: "€" },
    ],
    explanation: "La mensualité est appliquée chaque mois après calcul des intérêts. Si elle ne couvre pas les intérêts, le remboursement n’est pas possible.",
    faq: [{ q: "Puis-je simuler un remboursement anticipé ?", a: "Augmentez la mensualité pour mesurer l’effet d’un effort supplémentaire régulier." }, { q: "Les frais sont-ils inclus ?", a: "Non. L’assurance et les éventuelles pénalités ne sont pas intégrées." }],
  },
  {
    slug: "patrimoine", category: "Patrimoine", shortTitle: "Patrimoine net", title: "Quel est votre patrimoine net aujourd’hui ?", color: "yellow",
    description: "Additionnez ce que vous possédez, soustrayez ce que vous devez.",
    fields: [
      { key: "cash", label: "Épargne disponible", defaultValue: 15000, min: 0, max: 500000, step: 1000, suffix: "€" },
      { key: "investments", label: "Placements", defaultValue: 30000, min: 0, max: 1000000, step: 1000, suffix: "€" },
      { key: "property", label: "Immobilier", defaultValue: 220000, min: 0, max: 2000000, step: 5000, suffix: "€" },
      { key: "debts", label: "Dettes restantes", defaultValue: 145000, min: 0, max: 1000000, step: 1000, suffix: "€" },
    ],
    explanation: "Le patrimoine net est une photo à un instant donné : valeur de vos actifs moins vos dettes. Utilisez des valeurs de revente réalistes.",
    faq: [{ q: "Ma résidence principale compte-t-elle ?", a: "Oui, à sa valeur de marché estimée, en retranchant le crédit encore dû." }, { q: "Dois-je inclure ma voiture ?", a: "Vous pouvez l’ajouter aux placements si sa valeur de revente est significative pour vous." }],
  },
];

export function getCalculator(slug: string) { return calculators.find((calculator) => calculator.slug === slug); }

export function calculate(slug: CalculatorSlug, values: Record<string, number>) {
  if (slug === "epargne") {
    const months = values.years * 12;
    const monthlyRate = assumptions.savingsAnnualReturn / 12;
    const total = values.capital * (1 + monthlyRate) ** months + values.monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate);
    return { headline: total, label: "Capital estimé", detail: `${Math.max(0, total - values.capital - values.monthly * months).toFixed(0)} € d’intérêts estimés` };
  }
  if (slug === "dettes") {
    const monthlyRate = values.rate / 100 / 12;
    const monthlyInterest = values.balance * monthlyRate;
    if (values.payment <= monthlyInterest) return { headline: Infinity, label: "Mensualité insuffisante", detail: "Elle ne couvre pas les intérêts mensuels." };
    const months = monthlyRate === 0 ? values.balance / values.payment : -Math.log(1 - monthlyRate * values.balance / values.payment) / Math.log(1 + monthlyRate);
    return { headline: Math.ceil(months), label: "Mois de remboursement", detail: `${Math.max(0, values.payment * Math.ceil(months) - values.balance).toFixed(0)} € d’intérêts environ` };
  }
  const net = values.cash + values.investments + values.property - values.debts;
  return { headline: net, label: "Patrimoine net", detail: `${(values.cash + values.investments + values.property).toFixed(0)} € d’actifs au total` };
}
