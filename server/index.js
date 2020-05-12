const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 9001;
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/:id', express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../public')));

app.use('/product/:id', createProxyMiddleware({target: 'http://localhost:4200', changeOrigin: true}));
app.use('/reviews/:id', createProxyMiddleware({target: 'http://localhost:5000', changeOrigin: true}));
app.use('/products/:id', createProxyMiddleware({target: 'http://localhost:4000', changeOrigin: true}));
app.use('/api/carousel/:id', createProxyMiddleware({target: 'http://localhost:9000', changeOrigin: true}));
app.use('/api/carouselEnlarged/:id', createProxyMiddleware({target: 'http://localhost:9000', changeOrigin: true}));

app.listen(port, () => {
  console.log(`Proxy running at http://localhost:${port}`);
});