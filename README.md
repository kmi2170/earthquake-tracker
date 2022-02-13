# Earthquake Tracker 
An  app to track earthquake information all over the world,
powered by [USGS](https://earthquake.usgs.gov/fdsnws/event/1/).

## Features

- Track Earthquake events up to 30 days, dispalyed on the map and listed in the table.
- Each earthquake event is shown on the map
as a cirecle with its radius and color varied according to the magnitudei.
- Hovering cursor over the circles on the map triggers a pop-up window that shows some detailed information.
- The table can be sortable by magnitude, time, in ascending or descending order.
- By clicking events in the table, the map view shifts and zooms in to the epicenter of the event, with animation effect.

## Technicals

This project is built with 
- [Next.js](https://nextjs.org/)
- TypeScript 
- [React Query](https://react-query.tanstack.com/) (for fetching data and state management)
- [React Leaflet](https://react-leaflet.js.org/) (for map)
- [Material-UI](https://mui.com/).

### API Calls
- [USGS](https://earthquake.usgs.gov/fdsnws/event/1/)

Free. No app-key is required.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
