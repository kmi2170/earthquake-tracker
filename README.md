# Earthquake Tracker 
An  app to track earthquake events all over the world,
using data from [USGS](https://earthquake.usgs.gov/fdsnws/event/1/)

## Features

- Earthquake events during periods (3, 7, 30, 60, 90 days) from any date, dispalyed on the map and listed in the table.
- On the map, each earthquake events is shown as a cirecle
  - The radius is corresponding to the magnitude
  - The color is categorized by the magnitude range.
- Relative size of radius and magniture range shown on the map are adjustable with slide bars
- Hovering cursor over (or touch, if mobile mode) circles on the map triggers a pop-up window that shows detailed information of the event.
- The table can be sortable by magnitude, time, in ascending or descending order.
- By clicking events in the table, the map view shifts and zooms in to the epicenter of the event, with animation effect.

## Techs

Built with Next.js, Typescript, Tanstack Query, React Leaflet (Map), Material UI 

### API Calls
- [USGS](https://earthquake.usgs.gov/fdsnws/event/1/) (Free. No app-key is required)

## Getting Started
- Local enviroment
  - yarn dev, or yarn start (after yarn build) 

Open http://localhost:3000 (or appropriate address) with your browser to see the result.
