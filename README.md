# Project Description

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9).

## Table of contents

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Commands](#commands)
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Getting Started

### Prerequisites

You need to have nodejs installed on your computer to run this project, you can download it [here](https://nodejs.org/en/download/).

Next, you need to install the dependencies with command:

```bash
npm install
```

You need to create a firebase project, if you need help with this, check out this [documentation](https://cloud.google.com/firestore/docs/create-database-web-mobile-client-library?hl=es-419).
Then you need to create a .env.local file in the root of the project and add the following environment variables:

```bash
NEXT_PUBLIC_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

### Commands
Once you have all set up, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

or if you want to build the project run:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

then run the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Github repo](https://github.com/Robertron624/interactive-comments)
- Live Site URL: [Netlify Live Site](https://melodic-lamington-1297e9.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [DaisyUI](https://daisyui.com/) - Tailwindcss component library
- [TypeScript](https://www.typescriptlang.org/) - For type checking
- [Firebase](https://firebase.google.com/) - For storing comments
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction/) - For toast notifications

### What I learned

With this project at fitst I learned a lot about state management and how to use zustand with React, it's still my favorite global state management tool. but I made a fullstack version using firebase for storing comments instead of using localStorage. I also learned how to use TypeScript with React and Next.js. I also learned a lot about tailwindcss with Next.js and how to add custom fonts and colors to tailwindcss. I also learned a lot of firebase, I learned how to use firebase authentication and firestore database operations like adding, updating and removing documents.

### Continued development

I want to keep using Next.js for creating mid-large projects that require routing, I prefer pure css or scss but I want to keep learning tailwindcss since it speeds up the styling process. I also want to keep working on fullstack projects with firebase and Next.js when possible, and maybe start using other databases like MongoDB (I would need to develop my own API).

### Useful resources

- [How to setup Vue & Tailwindcss with Google Fonts and HSL color palette](https://medium.com/@saulchelewani/how-to-setup-vue-tailwindcss-with-custom-fonts-and-hsl-color-palette-cda43bf64fea#:~:text=According%20to%20Tailwind%20docs%2C%20we,color%20palette%20the%20framework%20offers.&text=We%20are%20taking%20that%20customization,Hue%2DSaturation%2DLightness) - This helped me to add custom fonts and colors to tailwindcss.

- [Tailwind css official docs](https://tailwindcss.com/docs/) - This is essential for learning tailwindcss.

- [Tailwind responsive design](https://tailwindcss.com/docs/responsive-design) - This helped me to make the site responsive with tailwind that follows the mobile-first design.

- [DaisyUI - Modal](https://daisyui.com/components/modal/) - This is a tailwindcss component library that I used to style the remove comment modal.

- [Firebase docs](https://firebase.google.com/docs) - This is essential for learning firebase.

## Author

- Personal Website - [Robert Ramirez](https://robert-ramirez.netlify.app)
- Frontend Mentor User- [@Robertron624](https://www.frontendmentor.io/profile/Robertron624)
- Twitter - [@robertdowny](https://www.twitter.com/robertdowny)

