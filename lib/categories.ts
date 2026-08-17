import type { Calculator } from "./calculators";

export type CategorySlug = "epargne" | "dettes" | "patrimoine" | "budget";

export const categoryPages: Record<CategorySlug, { name: Calculator["category"]; title: string; description: string; intro: string; steps: string[]; insights: { title: string; body: string }[]; faq: { q: string; a: string }[] }> = {
  epargne: {
    name: "Épargne",
    title: "Calculateurs d’épargne gratuits pour vos projets",
    description: "Des outils gratuits pour fixer un objectif, mesurer l’inflation et comparer vos stratégies d’épargne.",
    intro: "Une projection utile ne cherche pas à deviner l’avenir. Elle rend visibles l’effort mensuel, la durée et l’hypothèse de rendement afin de tester plusieurs trajectoires.",
    steps: ["Constituez d’abord une réserve disponible.", "Fixez un objectif et une échéance.", "Testez un rendement prudent, puis un scénario plus favorable."],
    insights: [{ title: "Commencer par l’horizon", body: "Une somme nécessaire dans deux ans ne doit pas être traitée comme une épargne de retraite. La durée détermine la disponibilité nécessaire et le risque que le projet peut supporter." }, { title: "Comparer des hypothèses nettes", body: "Un rendement brut ne suffit pas. Frais, fiscalité et inflation réduisent la progression réellement disponible. Testez toujours une hypothèse basse et une durée réaliste." }],
    faq: [{ q: "Quel calculateur d’épargne choisir en premier ?", a: "Commencez par l’objectif d’épargne si vous avez une somme et une date précises. Utilisez les intérêts composés pour explorer une trajectoire de long terme." }, { q: "Les rendements simulés sont-ils garantis ?", a: "Non. Ils sont constants uniquement pour rendre les scénarios comparables et ne reproduisent pas les variations réelles d’un placement." }],
  },
  dettes: {
    name: "Dettes",
    title: "Calculateurs de crédit et remboursement",
    description: "Estimez une mensualité, votre taux d’endettement et l’effet d’un remboursement plus rapide.",
    intro: "Le coût d’une dette dépend du capital, du taux, de la durée et des frais. Ces outils donnent un ordre de grandeur avant de vérifier les conditions exactes du contrat.",
    steps: ["Relevez le capital restant et le taux nominal.", "Gardez une marge dans votre budget mensuel.", "Vérifiez les frais, l’assurance et les pénalités dans le contrat."],
    insights: [{ title: "Mensualité et coût total", body: "Allonger un crédit peut réduire l’échéance tout en augmentant fortement les intérêts cumulés. Comparez toujours la durée, la mensualité, le TAEG et le montant total dû." }, { title: "La marge budgétaire compte", body: "Un taux d’effort ne résume pas la situation. Le reste à vivre, la stabilité des revenus et l’épargne de précaution indiquent si le budget peut absorber un imprévu." }],
    faq: [{ q: "Le taux nominal suffit-il pour comparer deux crédits ?", a: "Non. Le TAEG intègre davantage de coûts nécessaires au crédit et constitue un indicateur plus complet pour comparer les offres." }, { q: "Un taux d’endettement inférieur à 35 % garantit-il un prêt ?", a: "Non. Il s’agit d’un critère de principe pour le crédit immobilier, mais le prêteur reste libre d’analyser et de refuser le dossier." }],
  },
  patrimoine: {
    name: "Patrimoine",
    title: "Patrimoine net et indépendance : calculateurs",
    description: "Faites le point sur vos actifs, vos dettes, votre patrimoine net et un objectif théorique de capital à long terme.",
    intro: "Le patrimoine net est une photographie, pas un score. Le suivre régulièrement aide surtout à voir la direction et à relier épargne, dettes et projets de long terme.",
    steps: ["Valorisez les actifs avec prudence.", "Retranchez tous les capitaux restant dus.", "Répétez le calcul à intervalles réguliers avec la même méthode."],
    insights: [{ title: "Une photographie cohérente", body: "Le patrimoine net compare la valeur de marché estimée des actifs aux capitaux restant dus. Utilisez la même méthode à chaque bilan pour distinguer une vraie progression d’un changement de convention." }, { title: "Suivre les causes, pas seulement le total", body: "Une hausse peut provenir de l’épargne, du remboursement d’un prêt ou de la revalorisation d’un actif. Séparer ces effets donne une lecture plus utile de la trajectoire." }],
    faq: [{ q: "La résidence principale entre-t-elle dans le patrimoine net ?", a: "Oui, à sa valeur de marché estimée, tandis que le capital restant dû du crédit apparaît dans les passifs." }, { q: "À quelle fréquence calculer son patrimoine ?", a: "Une mise à jour trimestrielle ou semestrielle suffit généralement. Une fréquence stable facilite la comparaison dans le temps." }],
  },
  budget: {
    name: "Budget",
    title: "Budget mensuel : calculateurs et méthode 50/30/20",
    description: "Répartissez vos revenus, vos dépenses et votre épargne avec des repères adaptables.",
    intro: "Un budget lisible distingue les dépenses indispensables, les choix ajustables et l’argent consacré aux projets. Les pourcentages sont des repères, jamais une obligation.",
    steps: ["Partez des revenus réellement disponibles.", "Classez les dépenses sans minimiser les irrégulières.", "Ajustez progressivement plutôt que de viser une répartition parfaite."],
    insights: [{ title: "Rendre visibles les dépenses annuelles", body: "Assurance, entretien, impôts et vacances déséquilibrent les mois où ils sont payés. Les diviser par douze permet de constituer une enveloppe régulière et d’éviter un faux surplus." }, { title: "Un repère n’est pas une règle", body: "La répartition 50/30/20 aide à classer les dépenses, mais le logement, le revenu et le foyer imposent souvent d’autres pourcentages. Le premier objectif reste un solde soutenable." }],
    faq: [{ q: "Comment commencer un budget quand les dépenses varient ?", a: "Moyennez au moins trois mois, annualisez les dépenses irrégulières puis partez d’un revenu prudent si vos encaissements changent." }, { q: "Faut-il respecter exactement la règle 50/30/20 ?", a: "Non. Elle sert de grille de lecture. Adaptez-la à vos contraintes et privilégiez une progression réaliste." }],
  },
};

export const categorySlugs = Object.keys(categoryPages) as CategorySlug[];
