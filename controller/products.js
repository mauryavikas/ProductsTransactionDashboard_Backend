import { productServices } from "../services/productServices.js";
import * as config from "../config/config.js"


// route : /test
export const testRoute =(req,res)=>{
    res.json({
        msg:" testing controller and routes are running "
    })
};

// route : /seedData
export const SeedDataBase = async(req,res)=>{
    try {
        await productServices.seedDataFromUrl(config.THIRD_PARTY_DATA_API)
        res.status(200).json({ message: 'Seed data added to the database.' });
      } catch (error) {
        console.error('Error seeding data:', error);
        res.status(500).json({ error: 'An error occurred while seeding data.' });
      }
};

// route : /searchTransaction
export const searchTransaction = async(req,res)=>{
  try {
      console.log("query-->",req.query);// query object {search,page,month}
      const data =await productServices.transactionsByQuery(req.query);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'An error occurred while Error searching products.' });
    }
};

//statistisMonthly
export const statisticsMonthly = async(req,res)=>{
  try {
      console.log("query-->",req.query);// query object {month}
      const data =await productServices.statisticsMonthly(req.query);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'An error occurred while searching products.' });
    }
};

//barChartMonthly
export const barChartMonthly = async(req,res)=>{
  try {
      console.log("query-->",req.query);// query object {month}
      const data =await productServices.barChartMonthly(req.query);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error perparing Monthly barChart:', error);
      res.status(500).json({ error: 'An error occurred while perparing Monthly barChart.' });
    }
};

//pieChartMonthly
export const pieChartMonthly = async(req,res)=>{
  try {
      console.log("query-->",req.query);// query object {month}
      const data =await productServices.pieChartMonthly(req.query);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error perparing Monthly pieChar:', error);
      res.status(500).json({ error: 'An error occurred while perparing Monthly pie Chart.' });
    }
};

//allMonthlyData
export const allMonthlyData = async(req,res)=>{
  try {
      console.log("query-->",req.query);// query object {month}
      const data =await productServices.allMonthlyData(req.query);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching Monthly allMonthlyData:', error);
      res.status(500).json({ error: 'An error occurred while fetching allMonthlyData.' });
    }
};