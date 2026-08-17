import type { CalculatorSlug } from "./calculators";

export type Guide = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: "Épargne" | "Dettes" | "Budget";
  readingTime: string;
  calculatorSlug: CalculatorSlug;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
  checklist: string[];
  example: { title: string; body: string; note: string };
  comparison: { title: string; headers: string[]; rows: string[][] };
  faq: { q: string; a: string }[];
  sources: { label: string; publisher: string; url: string }[];
};

export const guides: Guide[] = [
  {
    slug: "interets-composes",
    title: "Intérêts composés : comprendre et calculer l’effet du temps",
    shortTitle: "Guide des intérêts composés",
    description: "Comprenez comment le capital, les versements, la durée et le rendement se combinent, avec un exemple et un calculateur gratuit.",
    category: "Épargne",
    readingTime: "7 min",
    calculatorSlug: "interets-composes",
    intro: "Les intérêts composés correspondent aux gains qui produisent eux-mêmes de nouveaux gains. L’effet paraît modeste au début, puis devient plus visible avec le temps. Une simulation reste toutefois une trajectoire mathématique : elle ne garantit aucun rendement futur.",
    sections: [
      { title: "Le mécanisme en une phrase", paragraphs: ["À chaque période, le rendement s’applique au capital de départ et aux gains déjà accumulés. Avec des versements réguliers, chaque versement commence aussi à capitaliser à partir de sa date d’investissement.", "Les quatre leviers sont donc le capital initial, le montant versé régulièrement, la durée et le rendement net de frais et de fiscalité. La durée est le seul levier qui n’exige pas d’augmenter immédiatement l’effort d’épargne."] },
      { title: "Pourquoi un taux constant est une simplification", paragraphs: ["Les marchés ne progressent pas de façon régulière. Une moyenne annuelle lissée masque les années de hausse, de baisse et l’ordre dans lequel elles surviennent.", "Testez plusieurs rendements, dont une hypothèse basse. Pour un projet à court terme ou une somme qui doit rester disponible, privilégiez la sécurité et la liquidité plutôt qu’un rendement théorique élevé."] },
      { title: "Les frais, la fiscalité et l’inflation", paragraphs: ["Un écart apparemment faible entre rendement brut et rendement net se cumule lui aussi pendant toute la durée. Les frais récurrents, les prélèvements et l’inflation réduisent la valeur réellement disponible.", "Le résultat du calculateur est donc un ordre de grandeur avant fiscalité et frais, sauf indication contraire. Comparez toujours des hypothèses nettes cohérentes."] },
    ],
    checklist: ["Définir l’objectif et sa date", "Conserver une épargne de précaution disponible", "Utiliser au moins trois hypothèses de rendement", "Intégrer les frais et la fiscalité dans la décision finale", "Réévaluer le plan une fois par an"],
    example: { title: "10 000 € puis 250 € par mois", body: "Sur 10 ans, 10 000 € de départ et 250 € versés chaque mois représentent 40 000 € réellement versés. À 5 % par an dans un modèle lissé, le capital théorique approche 55 000 € : environ 15 000 € proviendraient de la capitalisation.", note: "Le rendement de 5 % est une hypothèse pédagogique, pas une promesse. Le résultat exact dépend des dates de versement, des frais, de la fiscalité et des variations réelles." },
    comparison: { title: "Ce qui change vraiment le résultat", headers: ["Levier", "Effet", "Point de vigilance"], rows: [["Commencer plus tôt", "Allonge la capitalisation", "Le temps ne compense pas tous les risques"], ["Verser davantage", "Augmente directement le capital", "Préserver un budget soutenable"], ["Viser plus de rendement", "Accélère la projection", "Implique généralement plus de risque"], ["Réduire les frais", "Améliore le rendement net", "Comparer les frais récurrents et ponctuels"]] },
    faq: [{ q: "Les intérêts composés fonctionnent-ils aussi avec des pertes ?", a: "Oui. Après une baisse, la base de capitalisation est plus faible. Une perte de 20 % exige ensuite une hausse de 25 % pour revenir au niveau initial." }, { q: "Faut-il verser en début ou en fin de mois ?", a: "Un versement plus tôt commence à capitaliser plus tôt, mais l’écart mensuel reste généralement secondaire face à la régularité, la durée, les frais et le risque." }, { q: "Quel rendement choisir dans la simulation ?", a: "Utilisez plusieurs hypothèses compatibles avec le support envisagé, dont une hypothèse prudente. Aucun rendement élevé ne doit être présenté comme garanti." }],
    sources: [{ label: "Rendement, risque, inflation et horizon", publisher: "Autorité des marchés financiers", url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/rendement-et-risque-des-placements-en-actions-0" }, { label: "Définir son objectif d’épargne", publisher: "Autorité des marchés financiers", url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/definir-son-objectif" }],
  },
  {
    slug: "combien-epargner-par-mois",
    title: "Combien épargner par mois sans déséquilibrer son budget ?",
    shortTitle: "Combien épargner chaque mois ?",
    description: "Une méthode concrète pour déterminer un montant d’épargne mensuel réaliste à partir de votre budget, de votre sécurité et de vos objectifs.",
    category: "Budget",
    readingTime: "6 min",
    calculatorSlug: "objectif-epargne",
    intro: "Il n’existe pas de pourcentage valable pour tout le monde. Le bon montant est celui qui protège les dépenses essentielles, constitue une réserve disponible et permet d’avancer vers un objectif sans provoquer de découvert le mois suivant.",
    sections: [
      { title: "Partir de la capacité réelle, pas d’un pourcentage", paragraphs: ["Calculez la moyenne de vos revenus nets réguliers, puis retranchez les dépenses indispensables, les échéances de dette et une enveloppe réaliste pour les dépenses variables. La marge restante fixe un plafond, pas une obligation.", "Une règle comme 50/30/20 peut servir de point de comparaison, mais le logement, la composition du foyer et l’irrégularité des revenus rendent souvent nécessaire une autre répartition."] },
      { title: "Donner un rôle à chaque euro épargné", paragraphs: ["Commencez par une réserve de précaution immédiatement disponible. Séparez ensuite les projets à court terme des objectifs à moyen ou long terme, car ils n’acceptent ni la même indisponibilité ni le même risque.", "Automatiser un virement juste après le revenu aide à maintenir la régularité. Gardez toutefois une marge sur le compte courant pour ne pas financer les imprévus par du crédit coûteux."] },
      { title: "Ajuster plutôt qu’abandonner", paragraphs: ["Si l’objectif mensuel est trop élevé, allongez la durée, réduisez la cible ou commencez par un montant plus modeste. Une épargne soutenable et régulière est plus utile qu’un effort maximal interrompu après deux mois.", "Révisez le montant après un changement de salaire, de logement, de crédit ou de situation familiale."] },
    ],
    checklist: ["Moyenner trois mois de revenus et dépenses", "Isoler les échéances obligatoires", "Prévoir une marge pour les dépenses irrégulières", "Automatiser un montant soutenable", "Augmenter progressivement après trois mois stables"],
    example: { title: "Objectif de 12 000 € dans quatre ans", body: "Sans capital de départ ni rendement, il faut mettre de côté 250 € par mois. Avec déjà 2 000 € disponibles, l’effort tombe à environ 208 € par mois. Un rendement éventuel ne doit pas servir à masquer un effort irréaliste.", note: "Pour une échéance courte, la disponibilité et la sécurité peuvent être plus importantes que la recherche de rendement." },
    comparison: { title: "Trois façons de fixer le virement", headers: ["Méthode", "Utile quand", "Limite"], rows: [["Montant fixe", "Les revenus sont réguliers", "À réviser si les charges changent"], ["Pourcentage du revenu", "Le revenu varie", "Peut ignorer un socle de charges élevé"], ["Solde de fin de mois", "Le budget est encore instable", "L’épargne risque de devenir irrégulière"]] },
    faq: [{ q: "Faut-il épargner avant de rembourser ses dettes ?", a: "Conservez d’abord une réserve minimale pour les imprévus, puis comparez le coût certain de chaque dette au rendement net et au risque de l’épargne." }, { q: "20 % du revenu est-il obligatoire ?", a: "Non. C’est un repère budgétaire courant, pas une règle juridique ni une recommandation adaptée à toutes les situations." }, { q: "Que faire avec un revenu irrégulier ?", a: "Basez les charges fixes sur un revenu prudent, puis épargnez un pourcentage des encaissements supplémentaires dans des enveloppes séparées." }],
    sources: [{ label: "Gérer son budget et son épargne", publisher: "Ministère de l’Économie", url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/gerer-mon-budget-et-mon-epargne" }, { label: "Organiser son épargne selon ses objectifs", publisher: "Autorité des marchés financiers", url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/comment-organiser-son-epargne" }],
  },
  {
    slug: "rembourser-credit-ou-epargner",
    title: "Rembourser un crédit ou épargner : comment arbitrer ?",
    shortTitle: "Crédit ou épargne ?",
    description: "Comparez le coût de votre dette, la sécurité disponible, les frais de remboursement et le rendement incertain d’un placement.",
    category: "Dettes",
    readingTime: "8 min",
    calculatorSlug: "remboursement-anticipe",
    intro: "Rembourser une dette procure une économie d’intérêts généralement prévisible. Épargner conserve de la liquidité et peut produire un rendement, mais celui-ci peut être incertain. La décision dépend donc davantage du risque et de la disponibilité que d’une simple comparaison de deux taux.",
    sections: [
      { title: "Sécuriser les imprévus avant d’accélérer", paragraphs: ["Utiliser toute son épargne pour rembourser un prêt peut obliger à reprendre un crédit plus coûteux au premier imprévu. Conservez une réserve adaptée à vos dépenses et à la stabilité de vos revenus.", "Les crédits renouvelables et découverts présentent souvent un coût élevé : leur remboursement est généralement prioritaire, sous réserve de conserver cette réserve minimale."] },
      { title: "Comparer un coût certain à un rendement net", paragraphs: ["Le taux pertinent côté crédit inclut les coûts réellement évités par le remboursement. Côté épargne, raisonnez après frais, fiscalité et inflation, puis tenez compte du risque de perte.", "Un rendement espéré supérieur au taux du prêt ne suffit pas si l’horizon est court, si le capital peut baisser ou si vous aurez besoin de l’argent rapidement."] },
      { title: "Lire le contrat avant toute décision", paragraphs: ["Vérifiez les indemnités éventuelles, le montant minimal de remboursement anticipé, la possibilité de réduire la durée ou la mensualité et les conséquences sur l’assurance.", "Demandez au prêteur un décompte précis. Une simulation permet de préparer la discussion, mais seul ce document contractuel chiffre l’économie réelle."] },
    ],
    checklist: ["Conserver une réserve disponible", "Classer les dettes par coût total", "Demander le décompte de remboursement", "Comparer au rendement net et non au taux publicitaire", "Choisir entre réduire la durée ou la mensualité"],
    example: { title: "18 000 € restant dus à 7 %", body: "Avec une mensualité de 400 €, ajouter 100 € par mois raccourcit sensiblement la durée et réduit les intérêts futurs. L’économie est prévisible, tandis qu’un placement à 7 % ne serait ni garanti ni nécessairement disponible.", note: "Les frais de remboursement anticipé et l’assurance peuvent modifier le résultat. Utilisez les chiffres du contrat et du décompte du prêteur." },
    comparison: { title: "Les critères qui font pencher la décision", headers: ["Situation", "Priorité possible", "Pourquoi"], rows: [["Dette coûteuse", "Remboursement", "Économie certaine d’intérêts"], ["Aucune réserve", "Épargne liquide", "Éviter un nouveau crédit à l’imprévu"], ["Prêt peu coûteux et long horizon", "Arbitrage", "La liquidité et le risque deviennent déterminants"], ["Projet proche", "Épargne sécurisée", "Le capital doit rester disponible"]] },
    faq: [{ q: "Le remboursement anticipé est-il toujours gratuit ?", a: "Non. Selon le type de crédit et le contrat, une indemnité peut s’appliquer dans les limites prévues par la réglementation. Demandez un décompte au prêteur." }, { q: "Faut-il rembourser le prêt immobilier ou investir ?", a: "Comparez le coût réellement évité au rendement net après frais et fiscalité, sans oublier que le remboursement est certain alors que le rendement d’un placement risqué ne l’est pas." }, { q: "Réduire la durée ou la mensualité ?", a: "Réduire la durée maximise généralement l’économie d’intérêts. Réduire la mensualité améliore plutôt la marge budgétaire mensuelle." }],
    sources: [{ label: "Remboursement anticipé d’un crédit à la consommation", publisher: "Service-Public.fr", url: "https://www.service-public.fr/particuliers/vosdroits/F2440" }, { label: "Rendement et risque sont indissociables", publisher: "Autorité des marchés financiers", url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/rendement-et-risque-deux-inseparables" }],
  },
  {
    slug: "calcul-taux-endettement",
    title: "Comment calculer son taux d’endettement et son reste à vivre ?",
    shortTitle: "Calculer son taux d’endettement",
    description: "La formule du taux d’effort, les charges et revenus à examiner, le repère de 35 % et l’importance du reste à vivre.",
    category: "Dettes",
    readingTime: "6 min",
    calculatorSlug: "taux-endettement",
    intro: "Le taux d’endettement rapporte les charges de crédit et certaines charges durables aux revenus retenus. Il aide à mesurer la place des échéances dans le budget, mais ne résume ni la décision d’une banque ni la santé financière d’un foyer.",
    sections: [
      { title: "La formule de base", paragraphs: ["Divisez les charges mensuelles retenues par les revenus mensuels retenus, puis multipliez par 100. Une mensualité de 1 100 € pour 3 500 € de revenus donne environ 31,4 %.", "Pour une demande de crédit immobilier, l’établissement applique ses règles de prise en compte des revenus, des loyers, de l’assurance emprunteur et des crédits en cours. Votre estimation personnelle peut donc différer."] },
      { title: "Ce que signifie réellement le repère de 35 %", paragraphs: ["La décision du HCSF encadre en principe le taux d’effort des nouveaux crédits immobiliers à 35 %, assurance comprise, avec une marge de flexibilité attribuée aux établissements.", "Être sous 35 % ne crée aucun droit au crédit. La stabilité des revenus, l’apport, la tenue des comptes, le projet et le reste à vivre restent examinés."] },
      { title: "Toujours calculer le reste à vivre", paragraphs: ["Deux foyers ayant le même taux peuvent disposer de marges très différentes après leurs échéances. Soustrayez les charges de logement et de crédit aux revenus, puis confrontez le solde aux dépenses courantes réelles.", "Faites aussi un test avec une dépense imprévue ou une baisse temporaire de revenu. Un budget robuste doit absorber autre chose que le scénario moyen."] },
    ],
    checklist: ["Utiliser des revenus nets réguliers et justifiables", "Inclure les assurances de prêt", "Recenser tous les crédits en cours", "Calculer le reste à vivre", "Tester une marge de sécurité"],
    example: { title: "3 500 € de revenus et 1 100 € de charges", body: "Le taux obtenu est de 31,4 % et le reste avant dépenses courantes est de 2 400 €. Ce seul résultat ne dit pas si ce solde suffit : il faut considérer la taille du foyer, le logement, les transports et les dépenses régulières.", note: "Le calculateur donne un repère pédagogique. La banque conserve sa propre analyse des revenus, des charges et du risque." },
    comparison: { title: "Deux indicateurs complémentaires", headers: ["Indicateur", "Calcul", "Ce qu’il montre"], rows: [["Taux d’effort", "Charges ÷ revenus", "Poids relatif des échéances"], ["Reste à vivre", "Revenus − charges", "Montant disponible après échéances"], ["Épargne résiduelle", "Revenus − toutes les dépenses", "Capacité réelle à absorber un imprévu"]] },
    faq: [{ q: "Le taux d’endettement maximal est-il toujours de 35 % ?", a: "Pour le crédit immobilier, 35 % est le critère de principe du HCSF, assurance comprise. Les établissements disposent d’une marge de flexibilité limitée et restent libres de refuser un dossier." }, { q: "Quels revenus locatifs faut-il compter ?", a: "Les établissements appliquent souvent une pondération et leurs propres justificatifs. Pour une estimation prudente, n’intégrez pas automatiquement 100 % d’un loyer attendu." }, { q: "Le loyer actuel compte-t-il ?", a: "Cela dépend notamment de sa persistance après l’opération. S’il demeure à votre charge, il doit être pris en compte dans votre budget." }],
    sources: [{ label: "Mesure relative à l’octroi des crédits immobiliers", publisher: "Haut Conseil de stabilité financière", url: "https://www.economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers" }, { label: "Capacité d’emprunt et taux d’effort", publisher: "Ministère de l’Économie", url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/emprunter-et-sassurer/credit-immobilier-comment-ca-marche" }],
  },
  {
    slug: "construire-fonds-urgence",
    title: "Construire son fonds d’urgence étape par étape",
    shortTitle: "Construire son fonds d’urgence",
    description: "Déterminez une réserve de sécurité adaptée, choisissez où la conserver et constituez-la sans bloquer tous vos autres projets.",
    category: "Épargne",
    readingTime: "6 min",
    calculatorSlug: "fonds-urgence",
    intro: "Le fonds d’urgence finance une dépense imprévue ou une baisse temporaire de revenu sans recourir immédiatement au crédit. Il doit être disponible, compréhensible et séparé des dépenses prévues comme les vacances ou les impôts.",
    sections: [
      { title: "Fixer une cible adaptée au risque", paragraphs: ["Partez de vos dépenses essentielles mensuelles : logement, alimentation, énergie, transport, assurances et échéances obligatoires. Multipliez-les par un nombre de mois adapté à la stabilité des revenus et aux responsabilités du foyer.", "L’AMF évoque un repère de deux à trois mois de revenus pour l’épargne de précaution. Une personne indépendante, seule source de revenu du foyer ou propriétaire d’un bien coûteux à entretenir peut choisir davantage."] },
      { title: "Choisir la disponibilité avant le rendement", paragraphs: ["Cette réserve doit pouvoir être mobilisée rapidement sans risque important de perte. Elle n’a pas le même rôle qu’un investissement de long terme.", "Séparez-la sur un support identifié pour éviter de la dépenser au quotidien, tout en vérifiant les conditions de retrait, les plafonds et la garantie applicable."] },
      { title: "La construire par paliers", paragraphs: ["Visez d’abord un petit coussin capable d’absorber une facture urgente, puis un mois de dépenses, puis la cible complète. Automatisez le versement et affectez une partie des revenus exceptionnels si votre budget le permet.", "Après utilisation, reconstituez progressivement la réserve. Réévaluez la cible lors d’un déménagement, d’une naissance, d’un changement d’emploi ou d’une nouvelle dette."] },
    ],
    checklist: ["Lister uniquement les dépenses essentielles", "Évaluer la stabilité des revenus", "Choisir une cible en mois", "Conserver la réserve disponible et séparée", "Définir un virement automatique de reconstitution"],
    example: { title: "1 800 € de dépenses essentielles", body: "Une cible de quatre mois représente 7 200 €. Avec 3 000 € déjà disponibles, il reste 4 200 € à constituer. À 200 € par mois, l’écart serait comblé en 21 mois, hors intérêts éventuels.", note: "Le nombre de mois est un choix de sécurité personnel, pas une obligation. Adaptez-le à votre emploi, votre foyer et vos autres protections." },
    comparison: { title: "Une cible selon la situation", headers: ["Situation", "Cible à tester", "Raison"], rows: [["Revenus stables, deux revenus", "2 à 3 mois", "Risque de baisse temporaire plus mutualisé"], ["Un seul revenu", "3 à 6 mois", "Dépendance plus forte à une source"], ["Revenus irréguliers", "6 mois ou davantage", "Variations et délais d’encaissement"], ["Dépense prévue", "Enveloppe séparée", "Ce n’est pas une urgence"]] },
    faq: [{ q: "Le fonds d’urgence doit-il être investi ?", a: "Sa priorité est la disponibilité et la préservation du capital. Un placement volatil peut être en baisse précisément au moment où vous avez besoin de l’argent." }, { q: "Trois mois suffisent-ils toujours ?", a: "Non. C’est un repère. La stabilité de l’emploi, le nombre de revenus, les personnes à charge, le logement et les assurances peuvent justifier une cible différente." }, { q: "Faut-il continuer à l’alimenter une fois la cible atteinte ?", a: "Vous pouvez alors rediriger le virement vers un projet, tout en réévaluant la cible chaque année et en la reconstituant après une utilisation." }],
    sources: [{ label: "Épargne de précaution et définition de l’objectif", publisher: "Autorité des marchés financiers", url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/definir-son-objectif" }, { label: "Gérer son budget et son épargne", publisher: "Ministère de l’Économie", url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/gerer-mon-budget-et-mon-epargne" }],
  },
];

export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }
export function getGuidesForCalculator(slug: CalculatorSlug) { return guides.filter((guide) => guide.calculatorSlug === slug); }
export const guideSlugs = guides.map(({ slug }) => slug);
