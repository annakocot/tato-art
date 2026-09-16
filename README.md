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
5. Replace `https://example.com` in `astro.config.mjs` and `public/admin/config.yml`, and review the contact details in the CMS.
6. The artist can sign in at `/admin/`, upload artwork, enter its description and price, and publish. Each publish triggers a new site build.

Artwork files live in `src/content/artworks`; uploads are stored in `src/assets/uploads` and optimized during the site build.
# tato-art

## Pages, languages and editing

The default site is Polish (`/`); English lives at `/en/`. The language switch keeps the current page or artwork. The gallery is at `/artworks/` and `/en/artworks/`. The buying guide is at `/buy/` and `/en/buy/`.

In **Strony**, edit the **Polski** and **English** entries for the homepage, buying guide, artist profile and contact page. Both versions are prepopulated. Each homepage has editable text, button labels, uploaded hero image/title/series and artist introduction/image. Buttons automatically link to the correct language. Buying steps can be edited, reordered, added and removed. Confirm the starter buying copy with the artist before publishing final purchasing terms.

In **Dzieła**, the main text fields are Polish; **English translation** contains the corresponding English fields. Images, IDs, dimensions, price, availability and ordering are shared. Existing English translations are editable starter translations. Series are left blank where not previously documented; cards display the artwork ID in that case. Select **Pokaż na stronie głównej** to include a work in the homepage snapshot: the first four selected works by display order appear.

Artwork URLs use the lowercased **artworkId** (`/artworks/dk-2026-002/`, `/en/artworks/dk-2026-002/`). Keep this ID unique and stable. Changing a title leaves its URL intact; changing an ID requires a redirect if the old URL has already been shared. Duplicate IDs fail the build.

Set the real public domain in `astro.config.mjs` and `public/admin/config.yml` before deployment so canonical and language-alternate URLs use your domain. Contact links use the corresponding CMS contact entry. Content changes appear on the public site after the deployment build completes.

Implementation acceptance criteria are in `docs/website-requirements.md`.
