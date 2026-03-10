# Portfolio — Joseph Haccandy
## Structure des fichiers

```
portfolio/
│
├── app.py                          ← Serveur Flask (remplace ton app.py actuel)
│
├── templates/
│   └── index.html                  ← Page principale (remplace ton templates/index.html)
│
├── static/
│   ├── css/
│   │   └── style.css               ← Styles (nouveau fichier à créer)
│   ├── js/
│   │   └── main.js                 ← Scripts (nouveau fichier à créer)
│   └── cv/
│       └── joseph_haccandy_cv.pdf  ← TON CV PDF (copier le fichier fourni ici)
│
└── README.md
```

## Instructions d'installation

### 1. Copier les fichiers
- `index.html`  → `templates/index.html`
- `style.css`   → `static/css/style.css`
- `main.js`     → `static/js/main.js`
- `app.py`      → `app.py`
- `joseph_haccandy_cv.pdf` → `static/cv/joseph_haccandy_cv.pdf`

### 2. Créer les dossiers manquants
```bash
mkdir -p static/css static/js static/cv
```

### 3. Lancer le serveur
```bash
python app.py
```

### 4. Accéder au portfolio
Ouvrir http://localhost:5000 dans le navigateur.

## Ce que contient le portfolio

- **Hero** — Présentation avec animations et badges flottants
- **Profil** — Bio + carte code Python + statistiques animées
- **Expériences** — Timeline verticale interactive (3 postes)
- **Formation** — 3 cartes avec hover effects (EPSI, IA School, Ghana)
- **Compétences** — Barres de progression animées + soft skills + langues
- **Loisirs** — 5 cartes illustrées (Basket, Tennis, Lecture, Voyages, Humanitaire)
- **Contact + CV** — Liens cliquables + bouton téléchargement CV

## Polices utilisées (Google Fonts)
- Syne (titres) — chargée automatiquement depuis Google Fonts
- DM Sans (corps de texte) — chargée automatiquement depuis Google Fonts

## Notes techniques
- Aucune dépendance JS externe (Vanilla JS uniquement)
- Animations via IntersectionObserver (performances optimales)
- Entièrement responsive (mobile, tablette, desktop)
- Thème dark premium (#050d1a base)
