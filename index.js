import * as config from "./config/config.js";
import express from 'express';
import cors from 'cors';
import { productRouter } from './router/product.js';
import { mogoDbConnect ,mongoDbConnectionCheck } from './Database/dbConnect.js';

const Server = express();


//MiddleWare
// allows sharing resources across cross domains //{ Credential: "true", origin: "http://localhost:3000" }
Server.use(cors());
// Server.use(helmet());// secures the resources by setting up headers
// Server.use(express.json()); // pare the request into json

// Route: Api/Product/{controllerRoute}
Server.use("/api/product",productRouter);


async function run() {
  try { 
    mogoDbConnect();
    mongoDbConnectionCheck();
  } 
  catch(error){
    console.log(error)
  }
}
run()


Server.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`)
})

