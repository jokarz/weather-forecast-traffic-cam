# Weather Forecast and Traffic Cam App

Simple frontend application displaying images taking by traffic camera in Singapore and weather forecast in the area 

# Demo

<p align="center">
<img src="https://github.com/jokarz/weather-forecast-traffic-cam/blob/master/demo/demo.gif"/>
</p>

# Getting Started

* Made sure [Node.js](https://nodejs.org/en/download/) is installed
* Clone this repository
* Head on to the terminal (set directory at the root directory of this repo) and type ```npm i```
* Edit .env to specify which reverse geocoding api to use.
```txt
REACT_APP_REVGEO=gmap
```
Enter ```gmap``` for Google Map, ```onemap``` for One Map
*  Thereafter input in their respective token in .env as well
```txt
REACT_APP_GMAP_TOKEN=your Google Map api key here
REACT_APP_ONEMAP_TOKEN=your One Map token here
```
If you intend to use Google Map, you can leave One Map's one blank, vice versa
* There after in terminal type ```npm run serve```
* To run development version use ```npm run start```


# Other NPM scripts

* ```npm run test``` - To run test suit
* ```npm run format``` -  To prettify and format src folder


# Components Structure

The components are structured in this way:

```txt
├───atoms
│   │   atoms.scss
│   │
│   ├───footer
│   │       index.js
│   │
│   └───imageplaceholder
│           index.js
│           index.module.scss
│
├───molecules
│   │   molecules.scss
│   │
│   ├───datepicker
│   │       index.js
│   │
│   ├───locationitem
│   │       index.js
│   │
│   ├───modal
│   │       index.js
│   │       index.module.scss
│   │
│   └───timepicker
│           index.js
│
├───organisms
│   │   organisms.scss
│   │
│   ├───datetime
│   │       index.js
│   │
│   └───locationpicker
│           index.js
│           index.module.scss
│
└───pages
    └───main
            index.js
            processResData.js
```

Following the design and principle of [atomic design](https://dev.to/giteden/atomic-design-with-react-and-bit-simplify-a-complex-ui-1k1f), creating complex UI by build up from smaller and simpler components

# Endpoints used

Traffic camera: https://api.data.gov.sg/v1/transport/traffic-images

Weather forecast: https://api.data.gov.sg/v1/environment/2-hour-weather-forecast

Google Map: https://maps.googleapis.com/maps/api/geocode/json

One Map: https://developers.onemap.sg/privateapi/commonsvc/revgeocode

