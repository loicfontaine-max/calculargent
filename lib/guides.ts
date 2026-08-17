import type { CalculatorSlug } from "./calculators";

export type Guide = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: "Épargne" | "Dettes" | "Patrimoine" | "Budget";
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
  {
    slug: "calcul-mensualite-pret",
    title: "Calculer une mensualité de prêt et comprendre le coût du crédit",
    shortTitle: "Calculer une mensualité de prêt",
    description: "Comprenez la mensualité, les intérêts, l’assurance et le coût total avant de comparer plusieurs durées ou offres de crédit.",
    category: "Dettes",
    readingTime: "8 min",
    calculatorSlug: "mensualite-pret",
    intro: "Une mensualité ne dépend pas seulement du montant emprunté. Le taux, la durée et l’assurance modifient à la fois l’effort mensuel et le coût cumulé. Une échéance plus faible peut donc cacher un crédit sensiblement plus cher.",
    sections: [
      { title: "Comment se forme une mensualité", paragraphs: ["Pour un prêt amortissable à taux fixe, chaque échéance rembourse une part d’intérêts et une part de capital. Au début, le capital restant dû est élevé : la part des intérêts est donc plus importante. Elle diminue ensuite à mesure que le capital est remboursé.", "La formule du calculateur transforme le taux annuel en taux mensuel et répartit le remboursement sur le nombre total d’échéances. L’assurance est estimée séparément, car son mode de calcul peut dépendre du capital initial ou du capital restant dû."] },
      { title: "Mensualité basse ou coût total faible", paragraphs: ["Allonger la durée réduit généralement l’échéance, mais les intérêts courent plus longtemps. Comparez toujours la mensualité et le montant total dû, pas seulement le taux nominal.", "Testez plusieurs durées avec une marge pour les charges courantes. Une mensualité théoriquement supportable ne doit pas supprimer l’épargne de précaution ni rendre le budget fragile au moindre imprévu."] },
      { title: "Pourquoi regarder le TAEG", paragraphs: ["Le taux annuel effectif global rassemble les intérêts et les frais nécessaires à l’obtention du crédit, notamment certains frais de dossier, garanties et assurances obligatoires. Il sert à comparer des offres établies sur une base commune.", "Le calculateur n’est pas un calcul réglementaire du TAEG. Il donne une estimation à partir du taux nominal et d’une assurance simplifiée ; l’offre du prêteur reste la référence pour les frais exacts."] },
    ],
    checklist: ["Relever le capital réellement emprunté", "Distinguer taux nominal et TAEG", "Ajouter le coût de l’assurance", "Comparer au moins deux durées", "Vérifier le coût total et la marge budgétaire"],
    example: { title: "200 000 € sur 20 ans à 3,5 %", body: "Sans assurance, la mensualité théorique est proche de 1 160 €. À 0,30 % d’assurance calculée sur le capital initial, environ 50 € s’ajoutent chaque mois. Le coût final dépend encore des frais de dossier, de garantie et des conventions exactes du contrat.", note: "Une différence de quelques dixièmes de point ou de plusieurs années change fortement le coût cumulé. Comparez les offres à durée et montant identiques." },
    comparison: { title: "Les chiffres à comparer dans une offre", headers: ["Indicateur", "Ce qu’il mesure", "Limite"], rows: [["Taux nominal", "Intérêts du prêt", "N’inclut pas tous les frais"], ["TAEG", "Coût annuel tout compris réglementaire", "Dépend des éléments obligatoires de l’offre"], ["Mensualité", "Effort de paiement périodique", "Une faible échéance peut allonger le coût"], ["Montant total dû", "Somme cumulée à rembourser", "À lire avec la durée et les conditions"]] },
    faq: [{ q: "L’assurance est-elle incluse dans la mensualité ?", a: "Elle peut être prélevée avec l’échéance, mais son mode de calcul varie. Vérifiez le coût total, la quotité et si la cotisation repose sur le capital initial ou restant dû." }, { q: "Pourquoi la banque obtient-elle un autre résultat ?", a: "Les dates de déblocage, arrondis, frais, différés, garanties et conventions d’assurance peuvent créer un écart avec une simulation pédagogique." }, { q: "Une durée plus longue est-elle plus avantageuse ?", a: "Elle réduit généralement la mensualité, mais augmente souvent le coût total. L’avantage dépend surtout de la marge budgétaire nécessaire et des conditions du prêt." }],
    sources: [{ label: "Crédit immobilier : fonctionnement et comparaison des offres", publisher: "Ministère de l’Économie", url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/emprunter-et-sassurer/credit-immobilier-comment-ca-marche" }, { label: "Ce que comprend le taux annuel effectif global", publisher: "Ministère de l’Économie", url: "https://www.economie.gouv.fr/particuliers/emprunter-et-sassurer/credit-quoi-correspond-le-taux-annuel-effectif-global-taeg" }],
  },
  {
    slug: "calculer-patrimoine-net",
    title: "Calculer son patrimoine net : actifs, dettes et méthode de suivi",
    shortTitle: "Calculer son patrimoine net",
    description: "Dressez un bilan personnel cohérent, valorisez vos actifs avec prudence et retranchez les capitaux restant dus.",
    category: "Patrimoine",
    readingTime: "7 min",
    calculatorSlug: "patrimoine-net",
    intro: "Le patrimoine net est la différence entre ce que vous détenez et ce que vous devez encore. C’est une photographie à une date donnée, utile pour suivre une trajectoire, mais ce n’est ni un revenu disponible ni une mesure de votre valeur personnelle.",
    sections: [
      { title: "Recenser les actifs sans les surestimer", paragraphs: ["Additionnez les liquidités, placements financiers, biens immobiliers et actifs professionnels que vous détenez réellement. Pour un bien coté, utilisez une valeur récente ; pour l’immobilier, retenez une estimation de marché prudente et documentée.", "Les biens d’usage comme une voiture peuvent être inclus s’ils ont une valeur de revente significative. Utilisez la même convention à chaque mise à jour afin que la comparaison dans le temps reste lisible."] },
      { title: "Retrancher tous les passifs", paragraphs: ["Déduisez le capital restant dû des prêts immobiliers, crédits à la consommation et autres dettes. Ne retranchez pas le total des mensualités futures : les intérêts qui ne sont pas encore dus ne constituent pas le capital restant.", "Une résidence achetée à crédit figure donc pour sa valeur estimée dans les actifs, tandis que le capital du prêt restant figure dans les passifs."] },
      { title: "Interpréter l’évolution", paragraphs: ["Une hausse peut venir de l’épargne, du remboursement des dettes ou de la revalorisation des actifs. Distinguez ces trois causes : une hausse de marché peut s’inverser, alors qu’un capital remboursé est une dette effectivement réduite.", "Mettez le bilan à jour trimestriellement ou semestriellement, sans réagir à chaque fluctuation. Le suivi doit aider à décider, pas créer une illusion de précision quotidienne."] },
    ],
    checklist: ["Choisir une date de référence", "Valoriser les actifs à leur prix de marché prudent", "Noter tous les capitaux restant dus", "Conserver la même convention de calcul", "Comparer l’évolution et ses causes"],
    example: { title: "265 000 € d’actifs et 145 000 € de dettes", body: "Avec 15 000 € de liquidités, 30 000 € de placements et un logement estimé à 220 000 €, les actifs atteignent 265 000 €. Après déduction de 145 000 € de capital restant dû, le patrimoine net est de 120 000 €.", note: "Une estimation immobilière n’est pas un prix de vente garanti. Les frais de cession et la fiscalité ne sont pas déduits par défaut." },
    comparison: { title: "Ce qui entre dans le bilan", headers: ["Élément", "Catégorie", "Valeur à retenir"], rows: [["Compte et livret", "Actif financier", "Solde à la date du bilan"], ["Placement coté", "Actif financier", "Valeur de marché"], ["Bien immobilier", "Actif non financier", "Estimation de vente prudente"], ["Crédit en cours", "Passif", "Capital restant dû"]] },
    faq: [{ q: "La résidence principale compte-t-elle dans le patrimoine ?", a: "Oui, à sa valeur de marché estimée. Le capital restant dû du crédit associé doit apparaître séparément dans les dettes." }, { q: "Faut-il inclure les droits à la retraite ?", a: "Le calcul personnel simplifié ne les valorise généralement pas comme un actif disponible. Vous pouvez les suivre séparément comme un revenu futur estimé." }, { q: "Patrimoine net et patrimoine financier sont-ils identiques ?", a: "Non. Le patrimoine financier net se limite aux actifs et passifs financiers, tandis que le patrimoine net inclut aussi les actifs non financiers comme l’immobilier." }],
    sources: [{ label: "Définition du patrimoine net des ménages", publisher: "Insee", url: "https://www.insee.fr/fr/metadonnees/definition/c2248" }, { label: "Définition et valorisation d’un compte de patrimoine", publisher: "Insee", url: "https://www.insee.fr/fr/metadonnees/definition/c1724" }],
  },
  {
    slug: "budget-50-30-20",
    title: "Budget 50/30/20 : méthode, exemple et adaptations utiles",
    shortTitle: "Comprendre le budget 50/30/20",
    description: "Utilisez la règle 50/30/20 comme grille de lecture, classez vos dépenses et adaptez les pourcentages à votre situation réelle.",
    category: "Budget",
    readingTime: "7 min",
    calculatorSlug: "budget-50-30-20",
    intro: "La méthode 50/30/20 répartit le revenu disponible entre besoins, envies et épargne ou remboursement de dettes. C’est un repère simple, pas une norme : le coût du logement, la composition du foyer et le niveau de revenu peuvent imposer une autre répartition.",
    sections: [
      { title: "Classer avant de calculer", paragraphs: ["Les besoins regroupent les dépenses difficiles à éviter à court terme : logement, énergie, alimentation de base, transport nécessaire, assurances et échéances obligatoires. Les envies correspondent aux dépenses ajustables sans compromettre immédiatement le fonctionnement du foyer.", "La troisième enveloppe rassemble l’épargne, l’investissement et les remboursements supplémentaires. Une mensualité minimale obligatoire peut rester dans les besoins, tandis qu’un versement anticipé volontaire rejoint l’effort de désendettement."] },
      { title: "Pourquoi les pourcentages peuvent différer", paragraphs: ["Un loyer élevé peut faire dépasser 50 % de besoins sans mauvaise gestion. À l’inverse, un revenu confortable peut permettre plus de 20 % d’épargne sans réduire les loisirs.", "Utilisez la grille pour identifier les postes, puis fixez une trajectoire progressive. Le premier objectif peut simplement être de retrouver un solde positif et de constituer une petite réserve."] },
      { title: "Traiter les dépenses irrégulières", paragraphs: ["Divisez par douze les dépenses annuelles prévisibles : assurances, entretien, impôts, rentrée ou vacances. Les ignorer donne un budget artificiellement équilibré pendant certains mois.", "Créez des enveloppes mensuelles séparées. Une dépense annuelle financée à l’avance n’est ni une urgence ni un accident budgétaire."] },
    ],
    checklist: ["Partir du revenu net réellement disponible", "Moyenner les dépenses irrégulières", "Distinguer obligatoire et ajustable", "Mesurer le solde avant de viser un ratio", "Réviser les enveloppes après trois mois"],
    example: { title: "2 800 € de revenu mensuel", body: "Le repère théorique donne 1 400 € pour les besoins, 840 € pour les envies et 560 € pour l’épargne ou le désendettement. Si les besoins réels atteignent 1 650 €, l’objectif n’est pas de nier l’écart mais de décider où récupérer progressivement de la marge.", note: "Les pourcentages ne sont pas une obligation. Un budget est utile lorsqu’il reflète vos dépenses réelles et permet des décisions soutenables." },
    comparison: { title: "Bien classer quelques dépenses", headers: ["Dépense", "Classement fréquent", "Question à poser"], rows: [["Loyer et énergie", "Besoins", "Peut-on les réduire à court terme ?"], ["Restaurant", "Envies", "Est-ce ajustable ce mois-ci ?"], ["Mensualité minimale", "Besoins", "Est-elle contractuellement obligatoire ?"], ["Remboursement supplémentaire", "Épargne / dette", "Accélère-t-il un objectif ?"]] },
    faq: [{ q: "La règle 50/30/20 est-elle adaptée aux petits revenus ?", a: "Elle peut servir de diagnostic, mais les dépenses essentielles occupent souvent une part plus élevée. Commencez par le solde et une petite marge réaliste plutôt que par un ratio impossible." }, { q: "Où classer les remboursements de crédit ?", a: "La mensualité obligatoire peut être classée parmi les besoins ; un remboursement volontaire supplémentaire rejoint l’effort d’épargne et de désendettement." }, { q: "Faut-il calculer sur le salaire avant impôt ?", a: "Pour gérer le budget courant, partez du revenu réellement disponible après les prélèvements qui ne peuvent pas être dépensés." }],
    sources: [{ label: "Informations pratiques pour gérer son budget", publisher: "Ministère de l’Économie", url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/gerer-mon-budget-et-mon-epargne" }, { label: "Adapter son épargne à sa situation personnelle", publisher: "Ministère de l’Économie", url: "https://www.economie.gouv.fr/facileco/epargner-en-fonction-de-sa-situation-personnelle" }],
  },
  {
    slug: "rendement-reel-inflation",
    title: "Rendement réel : mesurer l’effet de l’inflation sur son épargne",
    shortTitle: "Calculer un rendement après inflation",
    description: "Distinguez rendement nominal, rendement réel et pouvoir d’achat afin d’interpréter correctement la progression d’un placement.",
    category: "Épargne",
    readingTime: "7 min",
    calculatorSlug: "rendement-apres-inflation",
    intro: "Voir un capital augmenter ne signifie pas nécessairement pouvoir acheter davantage. Le rendement réel corrige le rendement nominal de la hausse générale des prix et donne une lecture plus proche de l’évolution du pouvoir d’achat.",
    sections: [
      { title: "Nominal et réel ne répondent pas à la même question", paragraphs: ["Le rendement nominal mesure la progression en euros courants. Le rendement réel cherche à mesurer ce qu’il reste une fois l’inflation prise en compte.", "Une approximation consiste à soustraire l’inflation au rendement. La formule exacte divise le facteur de croissance du placement par celui des prix : (1 + rendement nominal) ÷ (1 + inflation) − 1."] },
      { title: "Pourquoi l’inflation personnelle peut différer", paragraphs: ["L’indice des prix à la consommation mesure une variation moyenne sur un panier de biens et services. La composition réelle de vos dépenses peut évoluer différemment selon le logement, le transport, l’énergie ou la santé.", "La simulation utilise donc un taux d’inflation choisi par l’utilisateur. Testez plusieurs hypothèses plutôt que de supposer que le dernier chiffre publié restera constant pendant toute la durée."] },
      { title: "Ajouter les frais et la fiscalité", paragraphs: ["Pour une comparaison complète, partez d’un rendement après frais et, lorsque c’est pertinent, après fiscalité. Les prélèvements réduisent la croissance avant même la correction de l’inflation.", "Un rendement réel positif n’efface pas le risque du placement. L’horizon, la disponibilité et la possibilité de perte restent déterminants."] },
    ],
    checklist: ["Partir d’un rendement net de frais", "Choisir plusieurs hypothèses d’inflation", "Utiliser la formule exacte", "Observer le pouvoir d’achat final", "Conserver une hypothèse prudente"],
    example: { title: "5 % de rendement et 2 % d’inflation", body: "La simple soustraction donne 3 %. La formule exacte produit environ 2,94 % de rendement réel annuel. Sur 10 ans, 20 000 € progresseraient théoriquement vers environ 26 700 € de pouvoir d’achat constant, avant fiscalité.", note: "Les taux constants simplifient la réalité. Rendement et inflation varient d’une année à l’autre et le résultat dépend de leur enchaînement." },
    comparison: { title: "Trois lectures d’un même placement", headers: ["Mesure", "Prend en compte", "Question"], rows: [["Rendement brut", "Performance annoncée", "Combien produit le support avant coûts ?"], ["Rendement net", "Frais et éventuellement fiscalité", "Combien reste-t-il réellement ?"], ["Rendement réel", "Inflation en plus", "Le pouvoir d’achat progresse-t-il ?"]] },
    faq: [{ q: "Peut-on simplement soustraire l’inflation ?", a: "C’est une approximation acceptable pour de petits taux. La formule exacte tient compte de la composition des deux variations." }, { q: "Quel taux d’inflation choisir ?", a: "Testez plusieurs hypothèses cohérentes avec la durée, sans prolonger automatiquement le dernier taux observé. L’IPC reste une moyenne nationale." }, { q: "Un rendement réel négatif signifie-t-il une perte en euros ?", a: "Pas nécessairement. Le capital nominal peut augmenter tout en perdant du pouvoir d’achat si les prix progressent plus vite." }],
    sources: [{ label: "Définition de l’indice des prix à la consommation", publisher: "Insee", url: "https://www.insee.fr/fr/metadonnees/definition/c1557" }, { label: "Rendement réel, inflation et risque des placements", publisher: "Autorité des marchés financiers", url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/rendement-et-risque-des-placements-en-actions-0" }],
  },
];

export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }
export function getGuidesForCalculator(slug: CalculatorSlug) { return guides.filter((guide) => guide.calculatorSlug === slug); }
export const guideSlugs = guides.map(({ slug }) => slug);
