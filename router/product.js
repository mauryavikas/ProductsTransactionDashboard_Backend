import express from 'express';
import * as productController from '../controller/products.js';

const productRouter=express.Router();

// routes and  controllers;
productRouter.route("/test").get(productController.testRoute);
productRouter.route("/seedData").get(productController.SeedDataBase);
productRouter.route("/searchTransaction").get(productController.searchTransaction);
productRouter.route("/statisticsMonthly").get(productController.statisticsMonthly);
productRouter.route("/barChartMonthly").get(productController.barChartMonthly);
productRouter.route("/pieChartMonthly").get(productController.pieChartMonthly);
productRouter.route("/allMonthlyData").get(productController.allMonthlyData);



export {productRouter};
