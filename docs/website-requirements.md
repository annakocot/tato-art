# Website requirements and acceptance criteria

- Polish site at `/`, English at `/en/`; navigation, status labels, page text, artwork metadata and image descriptions are localized. Language switches retain the equivalent route.
- Homepage follows the supplied reference: light-grey header/hero; editable title, subtitle, description, gallery button, uploaded hero artwork with title and series; four selected works with title, series and price; editable artist introduction, image and about button.
- `/artworks/` and `/en/artworks/` list all works. Every artwork has a static, directly loadable URL based on its unique artwork ID; changing a title does not change its URL. Details retain full-image viewing and previous/next navigation.
- Buying guide contains editable introduction, ordered steps for selection, contact/payment, packaging and certificate, plus a contact CTA. Initial copy asks buyers to confirm details with the artist rather than promising unconfirmed terms.
- Decap CMS exposes Polish and English page entries and artwork translation fields, shared image/price/availability, series, selection and ordering.
- Existing artwork images, prices, availability, descriptions and contact details are preserved. English translations are initial editable copy. Existing series assignments are unknown and remain blank until entered by the artist.
- Validate Astro types/build, generated routes and internal links, locale coverage, responsive layout, language switching and artwork lightbox where browser tooling is available.
