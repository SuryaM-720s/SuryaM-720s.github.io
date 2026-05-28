## Surya Prakash Murugavvel — Portfolio
Personal portfolio website built with React, TypeScript, and Vite.

## Tech Stack
- React 18 + TypeScript + Vite
- Framer Motion (motion/react) for all animations
- Tailwind CSS v4

## Features
- Yu-Gi-Oh themed design with Algerian font, gold (#FFD700) and black palette
- Scroll-snap navigation between Intro and Home sections
- Animated "It's Time To Duel" intro that slides in/out on every scroll
- Home page card back that bobs to invite scrolling, scrolls to section on click, then flips to reveal a random Yu-Gi-Oh monster card on subsequent clicks
- Projects section with "Summon Exodia" card spread — all 5 project cards deal in from centre, with tech stack pills appearing at the bottom on hover
- Resume section with inline PDF preview and download button
- Contact section with socials and mailto form

## Random Card Generator
The card flip feature on the home page uses the **YGOProDeck API** — a free, open Yu-Gi-Oh card database.

- API docs: [https://ygoprodeck.com/api-guide/](https://ygoprodeck.com/api-guide/)
- Endpoint: `https://db.ygoprodeck.com/api/v7/cardinfo.php`
- Filters to monster-only cards (Effect, Normal, Fusion, Synchro, XYZ, Pendulum, and more) — no Spell, Trap, or Link cards
- Full credit to the YGOProDeck team for maintaining this incredible free resource

## Credits
- Card artwork and Yu-Gi-Oh card assets © Konami
- YGOProDeck API — [https://ygoprodeck.com](https://ygoprodeck.com)
