module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      //"../node_modules/web3_extended/index.js",
      "javascripts/app.js",
      "javascripts/ipfs.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/",
    "css/": "css/",
    "fonts/": "fonts/",
    "js/": "js/",
  },
  deploy: [
    "SupplyChain"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
