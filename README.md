# LIUT.ME — Programme Autonomie & Sécurité

Site vitrine pour le programme d'accompagnement stratégique « Offre Disparition » destiné aux dirigeants industriels.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- Hébergé sur **Cloudflare Pages**

## Développement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Le dossier `dist/` contient le site statique prêt à déployer.

## Déploiement (Cloudflare Pages)

Le déploiement est automatique à chaque push sur `main` via Cloudflare Pages.

Settings dans le dashboard :

| Paramètre | Valeur |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
