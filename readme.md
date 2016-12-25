
### Setup and explanation:

I tried to do a bare bones as possible approach.
I have documented the tools and process here for convenience and reference.
Although I used some tooling, I kept everything code-wise to only ES6.
First run `npm install` and then `npm start`.
Alternatively, you can just go to the `www` directory and open `index.html`.
I think having a server serve the html is cooler :p

#### Tools:
* webpack
* babel
* npm

#### Folder setup:
* src: all the JS source files
* www: public directory with bundled js

#### NPM scripts:
* `npm install`: first installs express in order to have a server for the html files
* `npm start`: gets things going, I have prebuilt things already
* `npm run build`: builds `bundle.js` via webpack

##### NPM Webpack scripts explanation:
* webpack for building once for development
* webpack -p for building once for production (minification)
* webpack --watch for continuous incremental build in development (fast!)
* webpack -d to include source maps
