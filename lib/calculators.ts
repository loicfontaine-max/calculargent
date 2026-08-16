export const assumptions = { inflation: 0.02, safeWithdrawalRate: 0.04, updatedAt: "16 août 2026" };

export type CalculatorSlug = "interets-composes" | "objectif-epargne" | "rendement-apres-inflation" | "fonds-urgence" | "remboursement-dette" | "remboursement-anticipe" | "taux-endettement" | "patrimoine-net" | "independance-financiere";
export type Field = { key: string; label: string; defaultValue: number; min: number; max: number; step: number; suffix: string };
export type Calculator = {
  slug: CalculatorSlug; category: "Épargne" | "Dettes" | "Patrimoine"; title: string; shortTitle: string; description: string; color: "mint" | "coral" | "yellow";
  fields: Field[]; explanation: string; formula: string; example: string; howTo: string[]; faq: { q: string; a: string }[];
};
export type CalculationResult = { headline: number; label: string; detail: string; unit: string; series: { label: string; value: number }[] };

export const calculators: Calculator[] = [
  {
    slug: "interets-composes", category: "Épargne", shortTitle: "Intérêts composés", title: "Calculez la croissance de votre épargne", color: "mint",
    description: "Estimez votre capital final avec des versements mensuels et un rendement régulier.",
    fields: [
      { key: "initial_capital", label: "Capital initial", defaultValue: 10000, min: 0, max: 500000, step: 1000, suffix: "€" },
      { key: "monthly_savings", label: "Épargne mensuelle", defaultValue: 100, min: 0, max: 5000, step: 25, suffix: "€" },
      { key: "investment_horizon", label: "Horizon de placement", defaultValue: 20, min: 1, max: 50, step: 1, suffix: "ans" },
      { key: "interest_rate", label: "Rendement annuel", defaultValue: 5, min: 0, max: 15, step: 0.1, suffix: "%" },
    ],
    explanation: "Les intérêts composés produisent eux-mêmes des intérêts. La simulation convertit le taux annuel en taux mensuel et considère que chaque versement est investi en fin de mois.",
    formula: "Capital final = capital initial × (1 + taux mensuel)ⁿ + versement mensuel × ((1 + taux mensuel)ⁿ − 1) ÷ taux mensuel.",
    example: "Avec 10 000 € au départ, 100 € versés chaque mois pendant 20 ans et un rendement de 5 %, le capital estimé dépasse 67 000 € avant frais et fiscalité.",
    howTo: ["Indiquez le capital déjà disponible.", "Ajoutez l’effort d’épargne mensuel envisagé.", "Choisissez la durée et un rendement annuel prudent.", "Comparez les versements cumulés aux intérêts estimés."],
    faq: [{ q: "Quel rendement choisir ?", a: "Utilisez un scénario prudent cohérent avec votre support. Un livret, un fonds euros et des actions n’ont ni le même potentiel ni le même risque." }, { q: "Le résultat tient-il compte des impôts ?", a: "Non. La fiscalité, les frais et les variations réelles du marché ne sont pas inclus." }, { q: "Pourquoi les dernières années comptent-elles autant ?", a: "Le capital déjà accumulé continue de produire des intérêts : l’effet devient donc plus visible avec le temps." }],
  },
  {
    slug: "objectif-epargne", category: "Épargne", shortTitle: "Objectif d’épargne", title: "Combien épargner chaque mois pour atteindre votre objectif ?", color: "yellow",
    description: "Calculez le versement mensuel nécessaire pour financer un projet à une date donnée.",
    fields: [
      { key: "target", label: "Objectif à atteindre", defaultValue: 50000, min: 1000, max: 1000000, step: 1000, suffix: "€" },
      { key: "capital", label: "Capital déjà épargné", defaultValue: 5000, min: 0, max: 500000, step: 500, suffix: "€" },
      { key: "years", label: "Temps disponible", defaultValue: 8, min: 1, max: 40, step: 1, suffix: "ans" },
      { key: "rate", label: "Rendement annuel estimé", defaultValue: 3, min: 0, max: 12, step: 0.1, suffix: "%" },
    ],
    explanation: "Le calcul part du montant final visé, retranche la croissance estimée de votre capital actuel, puis répartit l’effort restant sur les versements mensuels.",
    formula: "Versement mensuel = (objectif − capital actuel capitalisé) × taux mensuel ÷ ((1 + taux mensuel)ⁿ − 1).",
    example: "Pour viser 50 000 € dans 8 ans avec 5 000 € déjà placés à 3 %, il faut épargner environ 400 € par mois.",
    howTo: ["Définissez un objectif chiffré.", "Indiquez votre épargne déjà mobilisable.", "Fixez une échéance réaliste.", "Testez plusieurs durées avant d’augmenter le rendement supposé."],
    faq: [{ q: "Que faire si l’effort mensuel est trop élevé ?", a: "Allonger la durée, réduire l’objectif ou augmenter le capital initial sont les trois leviers les plus directs." }, { q: "Puis-je mettre un rendement à zéro ?", a: "Oui, pour obtenir une projection sans intérêts et volontairement conservatrice." }, { q: "L’inflation est-elle incluse ?", a: "Non. Pour un projet lointain, pensez à augmenter votre objectif afin de préserver son pouvoir d’achat." }],
  },
  {
    slug: "rendement-apres-inflation", category: "Épargne", shortTitle: "Rendement après inflation", title: "Quel est le rendement réel de votre placement ?", color: "coral",
    description: "Mesurez ce qu’il reste de votre rendement une fois l’inflation prise en compte.",
    fields: [
      { key: "capital", label: "Capital investi", defaultValue: 20000, min: 100, max: 1000000, step: 1000, suffix: "€" },
      { key: "gross_rate", label: "Rendement nominal", defaultValue: 5, min: -5, max: 20, step: 0.1, suffix: "%" },
      { key: "inflation", label: "Inflation annuelle", defaultValue: 2, min: 0, max: 15, step: 0.1, suffix: "%" },
      { key: "years", label: "Durée", defaultValue: 10, min: 1, max: 40, step: 1, suffix: "ans" },
    ],
    explanation: "Soustraire simplement l’inflation au rendement donne une approximation. La formule exacte compare les deux évolutions de manière composée.",
    formula: "Rendement réel = (1 + rendement nominal) ÷ (1 + inflation) − 1.",
    example: "Avec 5 % de rendement nominal et 2 % d’inflation, le rendement réel est d’environ 2,94 % par an.",
    howTo: ["Renseignez le rendement affiché par votre placement.", "Indiquez une hypothèse d’inflation.", "Choisissez la durée d’observation.", "Lisez la valeur finale en euros d’aujourd’hui."],
    faq: [{ q: "Pourquoi ne pas simplement faire 5 % − 2 % ?", a: "Cette soustraction est proche sur une année, mais la formule composée est plus juste sur une longue durée." }, { q: "Où trouver l’inflation ?", a: "Utilisez une moyenne de long terme ou un scénario prudent, plutôt qu’un seul chiffre mensuel." }, { q: "La fiscalité est-elle prise en compte ?", a: "Non. Un rendement net de fiscalité serait encore inférieur." }],
  },
  {
    slug: "fonds-urgence", category: "Épargne", shortTitle: "Fonds d’urgence", title: "Combien garder dans votre fonds d’urgence ?", color: "mint",
    description: "Estimez votre réserve de sécurité à partir de vos dépenses essentielles.",
    fields: [
      { key: "expenses", label: "Dépenses essentielles mensuelles", defaultValue: 1800, min: 100, max: 15000, step: 100, suffix: "€" },
      { key: "months", label: "Mois de sécurité souhaités", defaultValue: 4, min: 1, max: 18, step: 1, suffix: "mois" },
      { key: "current", label: "Réserve déjà disponible", defaultValue: 3000, min: 0, max: 100000, step: 500, suffix: "€" },
    ],
    explanation: "Un fonds d’urgence couvre les dépenses incompressibles en cas d’imprévu. Il doit rester disponible rapidement et sans risque important de perte.",
    formula: "Fonds cible = dépenses essentielles mensuelles × nombre de mois de sécurité.",
    example: "Avec 1 800 € de dépenses essentielles et quatre mois de sécurité, la cible est de 7 200 €.",
    howTo: ["Isolez uniquement vos dépenses indispensables.", "Choisissez trois à six mois selon la stabilité de vos revenus.", "Déduisez votre réserve déjà disponible.", "Programmez un virement mensuel pour combler l’écart."],
    faq: [{ q: "Trois ou six mois de dépenses ?", a: "Trois mois peuvent convenir à des revenus très stables ; six mois ou davantage offrent plus de marge aux revenus irréguliers." }, { q: "Où placer cette réserve ?", a: "Privilégiez un support liquide, simple et peu risqué plutôt qu’un investissement volatil." }, { q: "Dois-je inclure les loisirs ?", a: "Le calcul de base retient surtout logement, alimentation, transport, assurances et charges obligatoires." }],
  },
  {
    slug: "remboursement-dette", category: "Dettes", shortTitle: "Durée de remboursement", title: "Quand votre dette sera-t-elle remboursée ?", color: "coral",
    description: "Estimez la durée de remboursement et le coût total des intérêts de votre dette.",
    fields: [
      { key: "balance", label: "Capital restant dû", defaultValue: 12000, min: 500, max: 500000, step: 500, suffix: "€" },
      { key: "rate", label: "Taux annuel", defaultValue: 6, min: 0, max: 25, step: 0.1, suffix: "%" },
      { key: "payment", label: "Mensualité", defaultValue: 350, min: 50, max: 5000, step: 25, suffix: "€" },
    ],
    explanation: "Chaque mois, les intérêts sont calculés sur le capital restant puis la mensualité vient réduire la dette. Une mensualité trop faible peut ne jamais amortir le capital.",
    formula: "Durée = −log(1 − taux mensuel × capital ÷ mensualité) ÷ log(1 + taux mensuel).",
    example: "Une dette de 12 000 € à 6 % remboursée 350 € par mois dure environ 38 mois et coûte près de 1 200 € d’intérêts.",
    howTo: ["Saisissez le capital restant sur votre relevé.", "Utilisez le taux annuel du contrat.", "Indiquez la mensualité réellement consacrée à la dette.", "Testez une mensualité supérieure pour mesurer le gain."],
    faq: [{ q: "Les frais et l’assurance sont-ils inclus ?", a: "Non. Le calcul porte sur le capital et les intérêts, hors assurance, frais et pénalités éventuelles." }, { q: "Pourquoi la mensualité peut-elle être insuffisante ?", a: "Si elle ne couvre pas les intérêts du mois, le capital ne diminue pas." }, { q: "Quelle dette rembourser en premier ?", a: "La méthode avalanche cible généralement le taux le plus élevé ; la méthode boule de neige cible le plus petit solde." }],
  },
  {
    slug: "remboursement-anticipe", category: "Dettes", shortTitle: "Remboursement anticipé", title: "Combien pouvez-vous économiser en remboursant plus vite ?", color: "yellow",
    description: "Comparez votre échéancier actuel avec une mensualité augmentée.",
    fields: [
      { key: "balance", label: "Capital restant dû", defaultValue: 18000, min: 500, max: 500000, step: 500, suffix: "€" },
      { key: "rate", label: "Taux annuel", defaultValue: 7, min: 0, max: 25, step: 0.1, suffix: "%" },
      { key: "payment", label: "Mensualité actuelle", defaultValue: 400, min: 50, max: 5000, step: 25, suffix: "€" },
      { key: "extra", label: "Effort mensuel supplémentaire", defaultValue: 100, min: 0, max: 3000, step: 25, suffix: "€" },
    ],
    explanation: "Une mensualité supplémentaire réduit immédiatement le capital sur lequel les intérêts futurs sont calculés. L’économie dépend surtout du taux et de la durée restante.",
    formula: "Gain = coût de l’échéancier actuel − coût de l’échéancier avec mensualité augmentée.",
    example: "Ajouter 100 € chaque mois à une dette de 18 000 € à 7 % peut raccourcir le remboursement de plus d’un an.",
    howTo: ["Renseignez votre échéancier actuel.", "Ajoutez un effort mensuel réaliste.", "Comparez les deux durées.", "Vérifiez les pénalités éventuelles dans votre contrat."],
    faq: [{ q: "Faut-il toujours rembourser plus vite ?", a: "Pas nécessairement : conservez d’abord une réserve de sécurité et comparez le taux de la dette aux autres usages possibles de votre argent." }, { q: "Les indemnités sont-elles incluses ?", a: "Non. Consultez votre contrat pour connaître les éventuels frais de remboursement anticipé." }, { q: "Puis-je simuler un versement unique ?", a: "Cette version compare des mensualités régulières. Un calculateur dédié aux versements ponctuels pourra être ajouté." }],
  },
  {
    slug: "taux-endettement", category: "Dettes", shortTitle: "Taux d’endettement", title: "Quel est votre taux d’endettement ?", color: "mint",
    description: "Rapportez vos mensualités de crédit à vos revenus nets mensuels.",
    fields: [
      { key: "income", label: "Revenus nets mensuels", defaultValue: 3500, min: 100, max: 50000, step: 100, suffix: "€" },
      { key: "housing", label: "Crédit immobilier ou loyer retenu", defaultValue: 900, min: 0, max: 10000, step: 50, suffix: "€" },
      { key: "loans", label: "Autres mensualités de crédit", defaultValue: 200, min: 0, max: 10000, step: 50, suffix: "€" },
    ],
    explanation: "Le taux d’endettement met en rapport vos charges de crédit mensuelles avec vos revenus nets. Les établissements examinent aussi le reste à vivre et la stabilité des revenus.",
    formula: "Taux d’endettement = charges de crédit mensuelles ÷ revenus nets mensuels × 100.",
    example: "Avec 3 500 € de revenus et 1 100 € de charges retenues, le taux d’endettement est d’environ 31 %.",
    howTo: ["Additionnez les revenus nets récurrents du foyer.", "Ajoutez toutes les mensualités de crédit.", "Calculez le ratio obtenu.", "Complétez l’analyse avec votre reste à vivre."],
    faq: [{ q: "Le seuil de 35 % est-il absolu ?", a: "Non. Il sert de repère courant, mais la décision dépend aussi du dossier, du reste à vivre et des règles du prêteur." }, { q: "Le loyer doit-il être inclus ?", a: "Pour un projet immobilier, le traitement du loyer dépend de la situation. Ici, vous pouvez l’inclure pour mesurer votre charge actuelle." }, { q: "Quels revenus retenir ?", a: "Privilégiez les revenus nets réguliers et vérifiables." }],
  },
  {
    slug: "patrimoine-net", category: "Patrimoine", shortTitle: "Patrimoine net", title: "Quel est votre patrimoine net aujourd’hui ?", color: "yellow",
    description: "Additionnez vos actifs et retranchez l’ensemble de vos dettes.",
    fields: [
      { key: "cash", label: "Épargne disponible", defaultValue: 15000, min: 0, max: 500000, step: 1000, suffix: "€" },
      { key: "investments", label: "Placements financiers", defaultValue: 30000, min: 0, max: 2000000, step: 1000, suffix: "€" },
      { key: "property", label: "Valeur de l’immobilier", defaultValue: 220000, min: 0, max: 5000000, step: 5000, suffix: "€" },
      { key: "debts", label: "Dettes restantes", defaultValue: 145000, min: 0, max: 3000000, step: 1000, suffix: "€" },
    ],
    explanation: "Le patrimoine net est une photographie de votre situation financière. Utilisez la valeur de revente réaliste de vos actifs, pas leur prix d’achat.",
    formula: "Patrimoine net = liquidités + placements + immobilier + autres actifs − dettes.",
    example: "Avec 265 000 € d’actifs et 145 000 € de dettes, le patrimoine net est de 120 000 €.",
    howTo: ["Recensez vos liquidités.", "Ajoutez vos placements à leur valeur actuelle.", "Estimez prudemment votre immobilier.", "Retranchez tous les capitaux restant dus."],
    faq: [{ q: "La résidence principale compte-t-elle ?", a: "Oui, à sa valeur de marché estimée, tandis que le crédit restant figure dans les dettes." }, { q: "Dois-je inclure ma voiture ?", a: "Vous pouvez l’ajouter si sa valeur de revente est significative, mais évitez de surestimer les biens qui se déprécient." }, { q: "À quelle fréquence refaire le calcul ?", a: "Une mise à jour trimestrielle ou semestrielle suffit généralement pour suivre la tendance." }],
  },
  {
    slug: "independance-financiere", category: "Patrimoine", shortTitle: "Indépendance financière", title: "Quel capital viser pour devenir financièrement indépendant ?", color: "coral",
    description: "Estimez le capital susceptible de financer durablement vos dépenses annuelles.",
    fields: [
      { key: "monthly_expenses", label: "Dépenses mensuelles visées", defaultValue: 2500, min: 500, max: 20000, step: 100, suffix: "€" },
      { key: "withdrawal_rate", label: "Taux de retrait annuel", defaultValue: 4, min: 2, max: 7, step: 0.1, suffix: "%" },
      { key: "current_portfolio", label: "Capital déjà investi", defaultValue: 100000, min: 0, max: 5000000, step: 5000, suffix: "€" },
    ],
    explanation: "La règle de retrait transforme un niveau de dépenses en objectif de capital. Elle repose sur des hypothèses de rendement, d’inflation et de durée qui restent incertaines.",
    formula: "Capital cible = dépenses annuelles ÷ taux de retrait annuel.",
    example: "Pour financer 2 500 € par mois avec un taux de retrait de 4 %, la cible théorique est de 750 000 €.",
    howTo: ["Estimez vos dépenses futures après impôts.", "Choisissez un taux de retrait prudent.", "Comparez le capital cible à votre portefeuille actuel.", "Ajoutez une marge pour les imprévus et la fiscalité."],
    faq: [{ q: "La règle des 4 % est-elle garantie ?", a: "Non. C’est un repère historique, sensible à la durée, aux marchés, aux frais, à la fiscalité et à votre allocation." }, { q: "Dois-je compter ma résidence principale ?", a: "Uniquement si elle peut réellement financer vos dépenses, par exemple via une vente ou des revenus." }, { q: "Comment choisir un taux plus prudent ?", a: "Un taux de 3 à 3,5 % augmente le capital cible mais laisse davantage de marge pour une longue retraite." }],
  },
];

const aliases: Record<string, CalculatorSlug> = { epargne: "interets-composes", dettes: "remboursement-dette", patrimoine: "patrimoine-net" };
export function canonicalSlug(slug: string) { return aliases[slug] || slug; }
export function getCalculator(slug: string) { const canonical = canonicalSlug(slug); return calculators.find((calculator) => calculator.slug === canonical); }

function loanMonths(balance: number, annualRate: number, payment: number) {
  const rate = annualRate / 100 / 12;
  if (payment <= balance * rate) return Infinity;
  return rate === 0 ? balance / payment : -Math.log(1 - rate * balance / payment) / Math.log(1 + rate);
}
function timeline(finalValue: number, points = 6) { return Array.from({ length: points }, (_, i) => ({ label: `${Math.round((i / (points - 1)) * 100)} %`, value: finalValue * (i / (points - 1)) ** 1.35 })); }

export function calculate(slug: CalculatorSlug, v: Record<string, number>): CalculationResult {
  if (slug === "interets-composes") {
    const months = v.investment_horizon * 12, rate = v.interest_rate / 100 / 12;
    const growth = (1 + rate) ** months;
    const total = v.initial_capital * growth + (rate === 0 ? v.monthly_savings * months : v.monthly_savings * (growth - 1) / rate);
    return { headline: total, label: "Capital final estimé", unit: "€", detail: `${Math.max(0, total - v.initial_capital - v.monthly_savings * months).toFixed(0)} € d’intérêts estimés`, series: timeline(total) };
  }
  if (slug === "objectif-epargne") {
    const months = v.years * 12, rate = v.rate / 100 / 12, growth = (1 + rate) ** months;
    const monthly = Math.max(0, rate === 0 ? (v.target - v.capital) / months : (v.target - v.capital * growth) * rate / (growth - 1));
    return { headline: monthly, label: "Effort mensuel nécessaire", unit: "€/mois", detail: `${Math.max(0, monthly * months).toFixed(0)} € de versements futurs`, series: timeline(v.target) };
  }
  if (slug === "rendement-apres-inflation") {
    const realRate = (1 + v.gross_rate / 100) / (1 + v.inflation / 100) - 1;
    const realCapital = v.capital * (1 + realRate) ** v.years;
    return { headline: realRate * 100, label: "Rendement réel annuel", unit: "%", detail: `${realCapital.toFixed(0)} € de pouvoir d’achat après ${v.years} ans`, series: timeline(realCapital) };
  }
  if (slug === "fonds-urgence") {
    const target = v.expenses * v.months, gap = Math.max(0, target - v.current);
    return { headline: target, label: "Fonds de sécurité cible", unit: "€", detail: gap > 0 ? `${gap.toFixed(0)} € restent à constituer` : "Votre objectif est déjà couvert", series: [{ label: "Déjà disponible", value: v.current }, { label: "Objectif", value: target }] };
  }
  if (slug === "remboursement-dette") {
    const months = loanMonths(v.balance, v.rate, v.payment);
    return { headline: Number.isFinite(months) ? Math.ceil(months) : Infinity, label: Number.isFinite(months) ? "Durée de remboursement" : "Mensualité insuffisante", unit: Number.isFinite(months) ? "mois" : "", detail: Number.isFinite(months) ? `${Math.max(0, v.payment * Math.ceil(months) - v.balance).toFixed(0)} € d’intérêts environ` : "La mensualité ne couvre pas les intérêts.", series: Number.isFinite(months) ? timeline(v.balance).reverse().map((p, i) => ({ label: `${i}`, value: p.value })) : [] };
  }
  if (slug === "remboursement-anticipe") {
    const currentMonths = loanMonths(v.balance, v.rate, v.payment), fasterMonths = loanMonths(v.balance, v.rate, v.payment + v.extra);
    const savedMonths = Number.isFinite(currentMonths) && Number.isFinite(fasterMonths) ? Math.max(0, Math.ceil(currentMonths) - Math.ceil(fasterMonths)) : 0;
    const savedInterest = Number.isFinite(currentMonths) && Number.isFinite(fasterMonths) ? Math.max(0, v.payment * Math.ceil(currentMonths) - (v.payment + v.extra) * Math.ceil(fasterMonths)) : 0;
    return { headline: savedMonths, label: "Temps gagné", unit: "mois", detail: `${savedInterest.toFixed(0)} € d’intérêts potentiellement économisés`, series: [{ label: "Durée actuelle", value: currentMonths }, { label: "Avec effort", value: fasterMonths }] };
  }
  if (slug === "taux-endettement") {
    const rate = v.income > 0 ? (v.housing + v.loans) / v.income * 100 : Infinity;
    return { headline: rate, label: "Taux d’endettement", unit: "%", detail: `${Math.max(0, v.income - v.housing - v.loans).toFixed(0)} € de reste mensuel avant dépenses courantes`, series: [{ label: "Charges", value: v.housing + v.loans }, { label: "Reste", value: Math.max(0, v.income - v.housing - v.loans) }] };
  }
  if (slug === "patrimoine-net") {
    const assets = v.cash + v.investments + v.property, net = assets - v.debts;
    return { headline: net, label: "Patrimoine net", unit: "€", detail: `${assets.toFixed(0)} € d’actifs et ${v.debts.toFixed(0)} € de dettes`, series: [{ label: "Actifs", value: assets }, { label: "Dettes", value: v.debts }, { label: "Net", value: Math.max(0, net) }] };
  }
  const target = v.monthly_expenses * 12 / (v.withdrawal_rate / 100), gap = Math.max(0, target - v.current_portfolio);
  return { headline: target, label: "Capital cible théorique", unit: "€", detail: gap > 0 ? `${gap.toFixed(0)} € restent à constituer` : "Votre capital dépasse cette cible théorique", series: [{ label: "Capital actuel", value: v.current_portfolio }, { label: "Objectif", value: target }] };
}
