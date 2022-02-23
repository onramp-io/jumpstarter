## Getting Started

TODO: Refactor this section once everything's been wired up

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About this App

- TODO: Briefly explain what our app is about

## Features

- TODO: Add list of features (by priority or otherwise)

## Wireframes & UI Development Process

- TODO: Add Screenshots of Lo-fi Wireframes
- TODO: Add relevant Screenrecordings as needed

## RESTful API

- TODO: Add URL to Swagger Docs
- TODO: Add Swagger Docs Screenshot / Preview

## Key Design Decisions

- TODO: Add to this section as we go

### Frontend

- Considerations for **Responsive Design**:
  - Added **Responsive mobile, desktop, and in-between breakpoints** to make content easy to consume regardless of screen resolution
- Considerations for **Accessibility**:
  - Added **a11yTitle on Grommet UI Components** wherever possible (**adds aria-labels for screenreaders**)
  - Added global media query to **lessen animations** for users with **'prefers-reduced-motion' enabled** on browser settings
  - Added **CSS reset** for **consistent baseline styles** across different clients/browsers
  - Used **semantic markup** wherever possible
  - Used **NextJS** for SSR, to make static markup available on demand
    - Better for screenreaders (and SEO) since the HTML, which provides structure, is made available on the first server response
- Added **UI animations** with Framer Motion for **better visual feedback & clarity of user intent**
- Created **Reusable, Modular Components** and composed them together as needed in NextPages
- Added **classNames & CSS for scoping custom styles** not built-into Grommet UI Components

### Backend

- Refactored backend to **use TypeORM** instead of Prisma

## App Architecture

- TODO: Briefly explain MVC
- **Model**
  - TODO: Briefly explain TypeORM + Postgres + Data Model
- **View**
  - TODO: Briefly explain React + Context API
- **Controller**
  - TODO: Briefly explain NextJS & How we use it to modify our Model (via NextJS API) & View (with SSR)

## Database Model / Schema

- TODO: Add diagrams for each table & corresponding relations

## Development Process & Timeline

- TODO: Add overall timeline
- TODO: Add videos/screenrecordings of development process as needed

## Optimizations & Future Nice-to-Haves

- TODO: Add to this as we go

- Add aria-hidden="true" tag attribute [as necessary](https://www.scottohara.me/blog/2018/05/05/hidden-vs-none.html#:~:text=A%20general%20rule%20to%20follow,%3A%20none%20or%20visibility%3A%20hidden%20.)
- Add **selective query-caching layer** with Redis or Memcached
