const express = require("express");
const app = express();
const port = 3020;
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, '../Client')));

app.all('/api/photos', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3005"
      });
} )

app.all('/api/reservations/*', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3001"
      });
} )


app.all('/api/recommendations', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3030"
      });
} )

app.all('/*', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3002"
      });
} )


app.listen(port, () => console.log(`Proxy server running on port ${port}`));