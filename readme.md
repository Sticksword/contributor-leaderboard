
Setup and explanation:

I tried to do a bare bones as possible approach.
I have documented the tools and process here for convenience and reference.
Although I used some tooling, I kept everything code-wise to only ES6.

Tools:
* webpack
* babel
* npm

Folder setup:


NPM scripts:
* `npm start`: gets things going, I have prebuilt things already
* `npm install --dev`: sets up the dev environment and allows for tampering and rebuilding of src code

NPM Webpack scripts explanation:
* webpack for building once for development
* webpack -p for building once for production (minification)
* webpack --watch for continuous incremental build in development (fast!)
* webpack -d to include source maps
