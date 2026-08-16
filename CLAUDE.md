# CLAUDE.md — CalculArgent

> Point d'entrée pour tout LLM/agent. Lire ce fichier avant de modifier le code. Dernière mise à jour : 2026-08-16.

## Identité du projet

- **Quoi** : collection de 9 calculateurs financiers gratuits (intérêts composés, épargne, inflation, fonds d'urgence, retraite, etc.) sans inscription, axés sur la clarté et le SEO.
- **Live** : https://calculargent.fr (Cloudflare Pages, projet `calculargent`).
- **Repo** : `loicfontaine-max/calculargent` (GitHub, **public**).
- **Stack** : React 19, Next.js / Vinext, TypeScript, Tailwind CSS v4, Cloudflare Pages & Wrangler.

## Commandes essentielles

- **Dev** : `npm run dev`
- **Build** : `npm run build`
- **Test** : `npm run build && node --test tests/rendered-html.test.mjs` (ou `npm test`)
- **Lint** : `npm run lint`

## Règles d'or & Architecture

1. **Simplicité & Confidentialité** : 100% côté client ou rendu statique. Aucune donnée financière utilisateur n'est persistée sur des serveurs tiers sans consentement.
2. **Formules transparentes** : Chaque calculateur doit expliquer mathématiquement le calcul effectué et proposer une FAQ claire.
3. **SEO & Performance** : Chaque outil a sa page dédiée, ses meta tags OpenGraph / Twitter et des paramètres d'URL partageables (`?capital=...`).
4. **Toujours `git pull --rebase` avant de pousser**.
