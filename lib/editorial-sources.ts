import type { CalculatorSlug } from "./calculators";

export type EditorialSource = { label: string; publisher: string; url: string };

const amfCapitalisation: EditorialSource = {
  label: "Diversification, horizon et effet de capitalisation",
  publisher: "Autorité des marchés financiers",
  url: "https://www.amf-france.org/fr/espace-epargnants/lexique-simulateurs-et-outils-pratiques/mon-zoom-epargne/bien-diversifier-son-epargne-pour-atteindre-ses-objectifs",
};
const amfObjective: EditorialSource = {
  label: "Définir son objectif et son horizon d’épargne",
  publisher: "Autorité des marchés financiers",
  url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/definir-son-objectif",
};
const amfReturn: EditorialSource = {
  label: "Rendement réel, inflation et risque des placements",
  publisher: "Autorité des marchés financiers",
  url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/rendement-et-risque-des-placements-en-actions-0",
};
const inseeInflation: EditorialSource = {
  label: "Définition et mesure de l’inflation",
  publisher: "Insee",
  url: "https://www.insee.fr/fr/metadonnees/definition/c1473",
};
const budgetGuide: EditorialSource = {
  label: "Informations pratiques pour gérer budget et épargne",
  publisher: "Ministère de l’Économie",
  url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/gerer-mon-budget-et-mon-epargne",
};
const personalSavings: EditorialSource = {
  label: "Adapter l’épargne à sa situation personnelle",
  publisher: "Ministère de l’Économie",
  url: "https://www.economie.gouv.fr/facileco/epargner-en-fonction-de-sa-situation-personnelle",
};
const mortgageGuide: EditorialSource = {
  label: "Coût, capacité d’emprunt et taux d’effort d’un crédit immobilier",
  publisher: "Ministère de l’Économie",
  url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/emprunter-et-sassurer/credit-immobilier-comment-ca-marche",
};
const hcsfDebt: EditorialSource = {
  label: "Mesure relative à l’octroi des crédits immobiliers",
  publisher: "Haut Conseil de stabilité financière",
  url: "https://www.economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers",
};
const consumerCredit: EditorialSource = {
  label: "Crédit à la consommation et remboursement anticipé",
  publisher: "Service-Public.fr",
  url: "https://www.service-public.fr/particuliers/vosdroits/F2440",
};
const banqueDeFranceDebt: EditorialSource = {
  label: "Prévenir et traiter une situation de surendettement",
  publisher: "Banque de France",
  url: "https://www.banque-france.fr/fr/a-votre-service/particuliers/dossier-surendettement",
};
const mortgagePublicService: EditorialSource = {
  label: "Démarches et simulateurs relatifs au crédit immobilier",
  publisher: "Service-Public.fr",
  url: "https://www.service-public.fr/particuliers/vosdroits/F34966/2?idFicheParent=F10871",
};
const retirementSavings: EditorialSource = {
  label: "Épargne retraite et horizon de long terme",
  publisher: "Autorité des marchés financiers",
  url: "https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/supports-dinvestissement/epargne-retraite-le",
};

export const editorialSources: Record<CalculatorSlug, EditorialSource[]> = {
  "interets-composes": [amfCapitalisation, amfReturn],
  "objectif-epargne": [amfObjective, personalSavings],
  "rendement-apres-inflation": [inseeInflation, amfReturn],
  "fonds-urgence": [amfObjective, budgetGuide],
  "remboursement-dette": [consumerCredit, banqueDeFranceDebt],
  "remboursement-anticipe": [consumerCredit, mortgagePublicService],
  "taux-endettement": [hcsfDebt, mortgageGuide],
  "patrimoine-net": [budgetGuide, amfCapitalisation],
  "independance-financiere": [retirementSavings, amfCapitalisation],
  "mensualite-pret": [mortgageGuide, mortgagePublicService],
  "budget-50-30-20": [budgetGuide, personalSavings],
  "comparaison-epargne": [amfReturn, amfCapitalisation],
};
