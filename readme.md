# D3.js Map Data Across the Globe

> A zoomable world map showing meteorites landed

This is my D3 map for freeCodeCamp's [last D3.js challenge](https://www.freecodecamp.com/challenges/map-data-across-the-globe).

![Meteorites](/preview.gif?raw=true&sanitize=true)

## User Stories

- [x] I can see where all Meteorites landed on a world map.
- [x] I can tell the relative size of the meteorite, just by looking at the way it's represented on the map.
- [x] I can mouse over the meteorite's data point for additional data.

## Todo

- [ ] Add rolling zoom and pan
- [ ] Position map to user's location on page load

## Tools Used

- D3.js version 4
- Webpack module bundler
- Babel.js compiler
- ESLint linter with Airbnb's config
- Sass with PostCSS' Autoprefixer

## Install and Build

You need to have either [`yarn`](https://yarnpkg.com/lang/en/docs/install/) or [`npm`](https://www.npmjs.com/) installed on your computer.

#### Clone this repo

```bash
git clone https://github.com/zsoltime/d3-map-data.git <new-folder-name>
cd <new-folder-name>
```

#### Install dependencies

```bash
yarn
# OR
npm install
```

#### Build dev bundle

It builds the app to the `dist` folder. It creates the JavaScript bundle without uglifying it, and compiles Sass to CSS.

```bash
yarn build:dev
# OR
npm run build:dev
```

#### Start dev server

Once you built the dev bundle you can start the dev server. Open [http://localhost:8080](http://localhost:8080) to view it in browser.

```bash
yarn start
# OR
npm start
```

#### Build production bundle

It builds the app to the `dist` folder. It creates the JavaScript bundle, uglifies it, compiles Sass to CSS and minifies it - ready to deploy.

```bash
yarn build:dist
# OR
npm run build:dist
```
