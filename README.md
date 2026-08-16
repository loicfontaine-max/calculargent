# CalculArgent

[![Site](https://img.shields.io/badge/site-calculargent.fr-0a7b61)](https://calculargent.fr)
[![CI](https://github.com/loicfontaine-max/calculargent/actions/workflows/ci.yml/badge.svg)](https://github.com/loicfontaine-max/calculargent/actions/workflows/ci.yml)

Une collection de calculateurs financiers gratuits, rapides et sans inscription pour mieux comprendre son épargne, ses dettes et son patrimoine.

**Site en production : [calculargent.fr](https://calculargent.fr)**

## Calculateurs disponibles

- intérêts composés ;
- objectif d'épargne ;
- rendement après inflation ;
- fonds d'urgence ;
- durée et coût d'un remboursement de dette ;
- remboursement anticipé ;
- taux d'endettement ;
- patrimoine net ;
- objectif d'indépendance financière.

Chaque calculateur possède sa propre URL, des paramètres partageables, une explication de la formule, un exemple et une FAQ structurée pour le référencement.

## Principes du projet

- calculs exécutés dans le navigateur ;
- aucune inscription et aucun stockage des montants saisis ;
- hypothèses centralisées dans `lib/calculators.ts` ;
- pages SEO générées depuis un moteur commun ;
- sitemap, robots.txt, données structurées et métadonnées sociales ;
- intégration Google AdSense avec `ads.txt` et pages de transparence.

Les résultats sont pédagogiques et indicatifs. Ils ne constituent pas un conseil financier personnalisé.

## Stack

- React 19 et TypeScript ;
- vinext / Vite ;
- déploiement edge compatible Cloudflare Workers ;
- CSS natif responsive.

## Développement local

Prérequis : Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Le site est ensuite accessible sur l'URL indiquée dans le terminal.

## Configuration

Copiez `.env.example` vers `.env.local`, puis renseignez uniquement les variables nécessaires :

```env
SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_ADSENSE_SLOT_HOME=
NEXT_PUBLIC_ADSENSE_SLOT_CONTENT=
```

Les fichiers `.env*` sont ignorés par Git, à l'exception de `.env.example`.

## Vérifications

```bash
npm test
npm run lint
```

La CI GitHub exécute le test de build à chaque push et pull request.

## Structure utile

- `app/` : routes, pages éditoriales et métadonnées ;
- `app/calculateur/[slug]/` : page dynamique des calculateurs ;
- `components/` : moteur d'interface et emplacements publicitaires ;
- `lib/calculators.ts` : contenu, hypothèses et formules centralisés ;
- `tests/` : contrôle du rendu de production.

## Contribution

Les signalements de bugs et propositions de nouveaux calculateurs sont bienvenus via les issues GitHub.

## Propriété

© Loïc Fontaine. Aucun droit d'utilisation n'est accordé en dehors de la consultation du code, sauf autorisation explicite.
