# Tato Art

A minimal artwork gallery built with Astro and Decap CMS (formerly Netlify CMS).

## Local development

```sh
npm install
npm run dev
```

The site runs at `http://localhost:4321`. To edit content through the CMS locally, run `npx decap-server` in another terminal and open `http://localhost:4321/admin/`.

## Deploying to Netlify

1. Push the repository to GitHub or GitLab and import it into Netlify. The build settings are already in `netlify.toml`.
2. In Netlify, enable **Identity**, then set registration to **Invite only**.
3. Under Identity → Services, enable **Git Gateway**.
4. Invite the artist from the Identity tab.
5. Replace `https://example.com` in `astro.config.mjs` and `public/admin/config.yml`, and replace `studio@example.com` in `src/pages/index.astro`.
6. The artist can sign in at `/admin/`, upload artwork, enter its description and price, and publish. Each publish triggers a new site build.

Artwork files live in `src/content/artworks`; uploads are stored in `src/assets/uploads` and optimized during the site build.
# tato-art
