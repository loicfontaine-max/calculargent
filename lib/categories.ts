import type { Calculator } from "./calculators";

export type CategorySlug = "epargne" | "dettes" | "patrimoine" | "budget";

export const categoryPages: Record<CategorySlug, { name: Calculator["category"]; title: string; description: string; intro: string; steps: string[] }> = {
  epargne: {
    name: "Épargne",
    title: "Calculateurs d’épargne : projeter, comparer, décider",
    description: "Des outils gratuits pour fixer un objectif, mesurer l’inflation et comparer vos stratégies d’épargne.",
    intro: "Une projection utile ne cherche pas à deviner l’avenir. Elle rend visibles l’effort mensuel, la durée et l’hypothèse de rendement afin de tester plusieurs trajectoires.",
    steps: ["Constituez d’abord une réserve disponible.", "Fixez un objectif et une échéance.", "Testez un rendement prudent, puis un scénario plus favorable."],
  },
  dettes: {
    name: "Dettes",
    title: "Calculateurs de crédit et de remboursement",
    description: "Estimez une mensualité, votre taux d’endettement et l’effet d’un remboursement plus rapide.",
    intro: "Le coût d’une dette dépend du capital, du taux, de la durée et des frais. Ces outils donnent un ordre de grandeur avant de vérifier les conditions exactes du contrat.",
    steps: ["Relevez le capital restant et le taux nominal.", "Gardez une marge dans votre budget mensuel.", "Vérifiez les frais, l’assurance et les pénalités dans le contrat."],
  },
  patrimoine: {
    name: "Patrimoine",
    title: "Calculateurs de patrimoine et d’indépendance financière",
    description: "Faites le point sur vos actifs, vos dettes et un objectif théorique de capital.",
    intro: "Le patrimoine net est une photographie, pas un score. Le suivre régulièrement aide surtout à voir la direction et à relier épargne, dettes et projets de long terme.",
    steps: ["Valorisez les actifs avec prudence.", "Retranchez tous les capitaux restant dus.", "Répétez le calcul à intervalles réguliers avec la même méthode."],
  },
  budget: {
    name: "Budget",
    title: "Calculateurs de budget pour retrouver de la marge",
    description: "Répartissez vos revenus, vos dépenses et votre épargne avec des repères adaptables.",
    intro: "Un budget lisible distingue les dépenses indispensables, les choix ajustables et l’argent consacré aux projets. Les pourcentages sont des repères, jamais une obligation.",
    steps: ["Partez des revenus réellement disponibles.", "Classez les dépenses sans minimiser les irrégulières.", "Ajustez progressivement plutôt que de viser une répartition parfaite."],
  },
};

export const categorySlugs = Object.keys(categoryPages) as CategorySlug[];
