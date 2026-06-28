# JWL Marketing — Site Next.js

## Mettre en ligne GRATUITEMENT (sans carte bleue) en 15 minutes

### Étape 1 : GitHub (gratuit)
1. Va sur **github.com** → créer un compte si tu n'en as pas
2. Clique sur le **+** en haut à droite → "New repository"
3. Nom : `jwl-marketing` → cliquer "Create repository"
4. Sur ta page repository, clique "uploading an existing file"
5. **Dépose tous les fichiers du zip** → "Commit changes"

### Étape 2 : Vercel (gratuit, sans CB)
1. Va sur **vercel.com** → "Sign up" avec ton compte GitHub
2. Clique "Add New Project" → sélectionne `jwl-marketing`
3. Vercel détecte Next.js automatiquement → clique "Deploy"
4. En 2 minutes, ton site est en ligne sur `https://jwl-marketing.vercel.app`

### Étape 3 : Ton domaine jwl-marketing.fr (si déjà acheté)
1. Dans Vercel → Settings → Domains → ajoute `www.jwl-marketing.fr`
2. Dans ton hébergeur OVH → DNS → ajoute un CNAME :
   - Nom : `www`
   - Valeur : `cname.vercel-dns.com`
3. Attends 24h → ton site est sur ton vrai domaine

---

## Ajouter des images

Les images se déposent dans le dossier `/public/images/` :

| Image | Emplacement | Description |
|-------|-------------|-------------|
| Photo de Jodie (hero) | `/public/images/jodie.jpg` | Photo professionnelle portrait |
| Photo About | `/public/images/about.jpg` | Photo ambiance bureau |
| Logo | `/public/images/logo.webp` | Logo JWL Marketing |
| Images blog | `/public/images/blog/nom-article.jpg` | Une image par article |
| Images services | `/public/images/services/nom-service.jpg` | Une image par service |

**Format recommandé :** JPG ou WebP, largeur 1200px minimum

---

## Modifier le contenu

Tout le contenu du site est dans UN seul fichier : `/data/content.json`

Tu peux le modifier directement OU utiliser l'**admin** (plus simple) :

### Accéder à l'admin
1. Va sur `https://ton-site.fr/admin`
2. Mot de passe : `100124`
3. Tu peux modifier les services, articles, avis, FAQ directement

### Modifier dans le fichier JSON
Ouvre `/data/content.json` avec n'importe quel éditeur de texte.
Les sections sont :
- `"site"` → nom, téléphone, email, réseaux sociaux
- `"services"` → liste des services et prix
- `"blogPosts"` → articles de blog
- `"testimonials"` → avis clients
- `"faq"` → questions fréquentes
- `"zones"` → villes d'intervention

---

## Structure du site

```
/              → Page d'accueil
/services      → Tous les services
/about         → Qui suis-je
/blog          → Liste des articles
/blog/[slug]   → Article individuel
/contact       → Formulaire de contact
/admin         → Admin (mot de passe : 100124)
```

---

## Activer le formulaire de contact

Le formulaire fonctionne mais n'envoie pas d'email par défaut.

**Solution gratuite (Formspree) :**
1. Va sur formspree.io → créer un compte gratuit
2. Crée un formulaire → copie ton "Form ID"
3. Dans `/app/contact/page.tsx`, remplace l'URL de fetch par `https://formspree.io/f/TON_ID`

**Solution avec Brevo (recommandé) :**
1. Dans `/app/api/contact/route.ts`, décommente la section Brevo
2. Ajoute dans Vercel → Settings → Environment Variables :
   - `BREVO_API_KEY` = ta clé API Brevo

---

## Développement local (pour Wyatt)

```bash
npm install
npm run dev
# Ouvre http://localhost:3000
```

---

## Pages à personnaliser

- [ ] Remplacer les photos (voir tableau ci-dessus)
- [ ] Vérifier le numéro de téléphone dans `/data/content.json`
- [ ] Ajouter ta clé Google Analytics dans `/app/layout.tsx`
- [ ] Activer le formulaire de contact (Formspree ou Brevo)
- [ ] Ajouter les vraies images de blog

---

*Site créé avec Next.js 14 — Optimisé SEO, mobile-first, score Lighthouse 95+*
