# vsantele.dev

Personal website of Victor Santelé built with [Astro](https://astro.build/).

## 🚀 Features

- **Multi-language support**: French (default) and English
- **MDX blog posts**: Write blog posts with JSX components
- **JSON Resume**: Dynamic resume page powered by JSON Resume standard
- **Responsive design**: Works on all devices with dark mode support
- **Analytics**: Plausible Analytics integration
- **SEO-friendly**: Automatic sitemap generation

## 📁 Project Structure

```
/
├── public/          # Static assets (images, logos)
├── src/
│   ├── components/  # Reusable Astro components
│   ├── content/     # Blog posts (MDX) and content collections
│   ├── data/        # JSON Resume data files
│   ├── layouts/     # Page layouts
│   └── pages/       # File-based routing
├── astro.config.mjs # Astro configuration
└── package.json
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🔄 Migration from Hugo

This site was previously built with Hugo and has been migrated to Astro. Key benefits of the migration:

- Better MDX support with full JSX component integration
- Simpler content management with Astro Content Collections
- Modern build tooling with Vite
- More flexible component architecture
- Easier to maintain and extend

## 📝 Content

### Blog Posts

Blog posts are located in `src/content/posts/` and use MDX format. Each post includes:
- Frontmatter with metadata (title, date, description, categories, etc.)
- MDX content with support for custom components (Figure, Notice)
- Automatic routing based on slug

### Resume

Resume data is stored in `src/data/` following the [JSON Resume](https://jsonresume.org/) standard:
- `fr.json` - French version
- `en.json` - English version

The resume pages (`src/pages/resume.astro` and `src/pages/en/resume.astro`) dynamically render this data.

## 🌐 Deployment

The site is automatically deployed to a VPS using GitHub Actions when changes are pushed to the `main` branch.

## 👨‍💻 Author

Victor Santelé - [@vsantele](https://github.com/vsantele)
