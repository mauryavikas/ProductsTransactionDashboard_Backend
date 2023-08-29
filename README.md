# ProductsTransactionDashboard_Backend

## Note: Configure MongoDb connection and other configuration in .env file

## To install dependencies

```console
npm intall
```

## To start Development Server

```console
npm run dev
```

## API End Points
### Seed Data from third party api to mongodb (configure api and mongoDb in .env file)
* #### seedData:`   GET: /api/product/seedData`

### pass month , page , and search in query
* #### productList:`   GET: /api/product/searchTransaction?month=3&page=1&search=""`,
### pass month as query 
* #### monthlystatistics:`  GET: /api/product/statisticsMonthly?month=3`,
* #### monthlyBarChart:`    GET: /api/product/barChartMonthly?month=3`,
* #### monthlyPieChart:`    GET: /api/product/pieChartMonthly?month=3`,


* #### allMonthlyData:`     GET: /api/product/allMonthlyData?month=3`,
