const express = require('express');
const { userAuthRoutes } = require('./userAuth/routes');
const { productRoutes } = require('./productInfo/routes');
const routes = express.Router();

routes.use('/api', userAuthRoutes);
routes.use('/api', productRoutes);


module.exports = routes;