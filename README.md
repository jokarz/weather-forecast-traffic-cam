# Weather Forecast and Traffic Cam App

Simple frontend application displaying images taking by traffic camera in Singapore and weather forecast in the area 

# Launching locally

* Made sure [Node,js](https://nodejs.org/en/download/) is installed
* Clone the repo
* Head on to the terminal (set directory at the root directory of this repo) and type ```npm i```
* To run production version use ```npm run serve```
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

