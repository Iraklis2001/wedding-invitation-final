# Digital Wedding Invitation

**Live site: [wedding-invitation-final-plum.vercel.app](https://wedding-invitation-final-plum.vercel.app)**

Single-page digital wedding invitation. Guests open the invitation, see a live countdown to the
ceremony, find each location on a map, and RSVP directly from the page.

## Features

- Video intro that plays on the first interaction
- Live countdown to the ceremony date and time
- Google Maps links for the groom's house, the bride's house, the church and the reception venue
- RSVP form capturing name, phone number and number of guests, saved to a Supabase table
- Responsive layout styled with Tailwind CSS

## Stack

React · Vite · Tailwind CSS · Supabase · Vercel

## Getting started

```bash
npm install
npm run dev
```

The Supabase project URL and key live in `src/supabaseClient.js`; point them at your own
Supabase project and create a table for the RSVP entries.

## Production build

```bash
npm run build
npm run preview
```
