# IG 74 Étanchéité Services — Site web

Site vitrine statique (HTML / CSS / JavaScript vanilla, sans framework ni build) pour **IG 74 Étanchéité Services**, entreprise d'étanchéité, de rénovation et d'aménagement extérieur basée à Sciez (74140), intervenant à Thonon-les-Bains, Évian-les-Bains, dans le Chablais, et plus largement en Haute-Savoie et en Savoie.

## Structure du projet

```
06_SITE_IG74/
├── index.html                          Accueil
├── etancheite-toiture.html             Page service
├── etancheite-terrasse.html            Page service
├── etancheite-sous-sol.html            Page service
├── recherche-de-fuite.html             Page service
├── renovation-entreprise-generale.html Page service
├── veranda-pergola.html                Page service
├── amenagement-exterieur.html          Page service
├── realisations.html                   Galerie de réalisations
├── contact.html                        Contact / formulaire de devis
├── mentions-legales.html               Mentions légales
├── politique-de-confidentialite.html   Politique de confidentialité
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/                            base.css, home.css, service.css, form.css
│   └── js/                             site.js, site-config.js, tracking.js, quote-form.js
├── images/                             favicon (SVG)
└── media/
    ├── realisations/                   Photos de chantiers réels (autorisées par le client)
    └── services/                       Visuels d'illustration des services (voir note ci-dessous)
```

Aucun framework, aucune étape de build : les pages peuvent être servies telles quelles par n'importe quel hébergement statique (GitHub Pages, Netlify, etc.).

### Note sur `media/services/`

Les images de ce dossier (recherche de fuite, rénovation, véranda & pergola) sont des **visuels d'illustration** des prestations, et non des photographies documentaires de chantiers IG 74. Elles ne figurent pas dans `realisations.html` et ne sont associées à aucune localisation de chantier.

## Configuration centralisée

Les informations d'identité et de contact (téléphone, e-mail, domaine) sont centralisées dans `assets/js/site-config.js` (`window.IG74_CONFIG`). Modifier ce fichier suffit à mettre à jour l'ensemble du site.

## Éléments restant à configurer avant mise en production

Ces éléments n'ont **volontairement pas été renseignés ni inventés** ; ils doivent être fournis par le client avant le lancement du site :

- **Nom de domaine définitif** — actuellement un placeholder `https://DOMAINE-A-DEFINIR.exemple` dans les balises `canonical`, Open Graph, `sitemap.xml` et `robots.txt`.
- **Numéro de téléphone** — à renseigner dans `assets/js/site-config.js` (`phone: null`) ainsi que dans `mentions-legales.html`.
- **Adresse e-mail** — à renseigner dans `assets/js/site-config.js` (`email: null`) ainsi que dans `mentions-legales.html`.
- **Destination du formulaire de devis** (`contact.html`) — le formulaire est fonctionnel (étapes, validation) mais n'envoie rien pour l'instant. Une fois un service d'envoi choisi (ex. Formspree), renseigner `action="..."` sur `#devisform` et passer `data-endpoint-ready="true"`.
- **Hébergeur du site** — à renseigner dans `mentions-legales.html`.
- **Outils d'analyse / tracking (GTM, GA4, etc.)** — volontairement absents. `assets/js/tracking.js` prépare déjà les événements dans `window.dataLayer` sans appel réseau ; à connecter à un conteneur validé par le client si souhaité.

## Développement local

Un petit serveur statique (`serve.js`, Node.js sans dépendance) est inclus pour la prévisualisation locale :

```bash
node serve.js
```

Le site est alors accessible sur `http://localhost:4173`.
