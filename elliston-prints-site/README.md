
# Elliston Prints — Static Photo Website

This is a **complete, ready-to-deploy** static site for your photography brand. It includes a home page, galleries, dynamic album viewer with a lightbox, pricing, about, and contact/booking.

## How to use
1. Open `index.html` to preview locally.
2. To add photos:
   - Put images into `assets/photos/<album-slug>/`.
   - Edit `data/albums.json` to list the new images and their album.
3. To change text, update the HTML files (they're small and simple).
4. To change colors or spacing, edit `assets/css/styles.css`.

## Deploy (fast)
- **Netlify:** Drag this whole folder into Netlify Drop, or connect a GitHub repo. (Forms can be switched to Netlify Forms if you want server-side handling.)
- **Vercel / GitHub Pages:** Works out of the box — it's static HTML/CSS/JS.

## Optional: real contact form
Right now the booking form uses `mailto:` so it works anywhere. If you want server handling, replace the `<form>` with a service like Netlify Forms or Formspree.

## Albums data format
`data/albums.json` is an array of albums:
```json
[
  {
    "slug": "weddings-lakeview",
    "title": "Lakeview Wedding",
    "category": "Weddings",
    "cover": "assets/photos/weddings-lakeview/cover.jpg",
    "images": ["assets/photos/weddings-lakeview/1.jpg", "..."],
    "date": "2025-01-01",
    "download": false,
    "price": 0
  }
]
```
Add as many albums as you like.

Enjoy!
