# Murat Özçelik — Portfolio

Personal portfolio for **Murat Özçelik**, focused on film, software development and music production.

Live site: https://muratozcelik.vercel.app/

## Highlights

- bilingual Turkish / English interface
- responsive mobile navigation
- featured project section led by Puresteel
- short-film embeds with privacy-enhanced YouTube URLs
- awards and selections
- education and selected certifications
- interactive Web Audio playground
- SEO, Open Graph and structured-data metadata
- Vercel deployment

## Structure

```text
.
├── index.html
├── about.html
├── assets/
│   ├── style.css
│   └── main.js
├── 404.html
├── robots.txt
├── sitemap.xml
└── vercel.json
```

The site intentionally stays framework-free. It uses plain HTML, CSS and JavaScript so it remains lightweight and easy to maintain.

## Local preview

Any simple static server is enough:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

The repository is connected to Vercel. Commits to the production branch are deployed automatically by Vercel.
