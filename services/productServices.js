import fetch from "node-fetch";
import { mogoDbConnect, mongoDbConnectionCheck } from "../Database/dbConnect.js";
import { productModel } from "../model/product.js";
import { productApi } from "../config/config.js";

function getPriceRange(SelectedRange) {
    let priceRanges = [
        { items: 0, range: '0-100' },
        { items: 0, range: '101-200' },
        { items: 0, range: '201-300' },
        { items: 0, range: '301-400' },
        { items: 0, range: '401-500' },
        { items: 0, range: '501-600' },
        { items: 0, range: '601-700' },
        { items: 0, range: '701-800' },
        { items: 0, range: '801-900' },
        { items: 0, range: '901-above' }
    ]
    SelectedRange.forEach((item) => {
        for (let elm of priceRanges) {
            if (item.range == elm.range) {
                elm.items = item.items
            }
        }
    })

    return priceRanges
}





export const productServices = {

    seedDataFromUrl: async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        await mogoDbConnect();
        await mongoDbConnectionCheck();
        // Insert the fetched data into the database
        await productModel.create(data);
    },
    // the data from all the 3 APIs
    allMonthlyData: async (query) => {
        const searchMonth = query.month || 0;
        const statistisMonthly = await fetch(productApi.monthlystatistis + `?month=${searchMonth}`);
        const statistisMonthlyData = await statistisMonthly.json();
        const barChartMonthly = await fetch(productApi.monthlyBarChart + `?month=${searchMonth}`);
        const barChartMonthlyData = await barChartMonthly.json();
        const pieChartMonthly = await fetch(productApi.monthlyPieChart + `?month=${searchMonth}`);
        const pieChartMonthlyData = await pieChartMonthly.json();
        return {
            statistisMonthlyData,
            barChartMonthlyData: barChartMonthlyData?.priceRangeCount || {},
            pieChartMonthlyData: pieChartMonthlyData?.categoryCount || {},
        };
    },

    transactionsByQuery: async (query) => {
        const ITEMS_PER_PAGE = 10;
        const search = query.search || '';
        const searchMonth = parseInt(query.month) || 0;
        const page = parseInt(query.page) || 1;

        const searchRegex = new RegExp(search, 'i');

        const totalItems = await productModel.countDocuments({

            $and: [
                {
                    $or: [
                        { title: searchRegex },
                        { description: searchRegex },
                        { price: parseInt(search) || 0 },
                    ],
                },
                {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, searchMonth]
                    }
                }
            ]
        });

        const products = await productModel.find(
            {
                $and: [
                    {
                        $or: [
                            { title: searchRegex },
                            { description: searchRegex },
                            { price: parseInt(search) || 0 },
                        ],
                    },
                    {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, searchMonth]
                        }
                    }
                ]
            }, { _id: 0 })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);

        return {
            products,
            currentPage: page,
            totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
        }
    },

    statisticsMonthly: async (query) => {

        const searchMonth = parseInt(query.month) || 0;
        // Total sale amount of selected month
        const totalSaleAmount = await productModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$dateOfSale" }, searchMonth] },
                            { $eq: ["$sold", true] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: "$price" }
                }
            }
        ]);

        //  Total number of sold items of selected month
        const totalSoldItem = await productModel.countDocuments({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$dateOfSale" }, searchMonth] },
                    { $eq: ["$sold", true] }
                ]
            }
        });

        //  Total number of not sold items of selected month
        const totalUnsoldItem = await productModel.countDocuments({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$dateOfSale" }, searchMonth] },
                    { $eq: ["$sold", false] }
                ]
            }
        });


        return {
            totalSaleAmount: totalSaleAmount[0]?.totalSum || 0,
            totalSoldItem,
            totalUnsoldItem
        }

    },

    barChartMonthly: async (query) => {

        const searchMonth = parseInt(query.month) || 0;

        const priceRangeCount = await productModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, searchMonth]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $switch:
                        {
                            branches: [
                                {
                                    case: {
                                        $and: [
                                            { $gte: ['$price', 0] },
                                            { $lt: ['$price', 100] }]
                                    },
                                    then: "0-100"
                                },
                                {
                                    case: {
                                        $and: [
                                            { $gte: ['$price', 101] },
                                            { $lt: ['$price', 200] }]
                                    },
                                    then: "101-200"
                                },
                                {
                                    case: {
                                        $and: [
                                            { $gte: ['$price', 201] },
                                            { $lt: ['$price', 300] }]
                                    },
                                    then: "201-300"
                                },
                                {
                                    case: {
                                        $and: [
                                            { $gte: ['$price', 301] },
                                            { $lt: ['$price', 400] }]
                                    },
                                    then: "301-400"
                                },
                                {
                                    case: {
                                        $and: [
                                            { $gte: ['$price', 401] },
                                            { $lt: ['$price', 500] }]
                                    },
                                    then: "401-500"
                                },
                                {
                                    case: {
                                        $and: [
                                            { $gte: ['$price', 501] },
                                            { $lt: ['$price', 600] }]
                                    },
                                    then: "501-600"
                                },
                                {
                                    case: {
                                        $and: [
                                            { $gte: ['$price', 601] },
                                            { $lt: ['$price', 700] }]
                                    },
                                    then: "601-700"
                                },
                                {
                                    case: {
                                        $and: [
                                            { $gte: ['$price', 701] },
                                            { $lt: ['$price', 800] }]
                                    },
                                    then: "701-800"
                                },
                                {
                                    case: {
                                        $and: [
                                            { $gte: ['$price', 801] },
                                            { $lt: ['$price', 900] }]
                                    },
                                    then: "201-300"
                                },
                            ],
                            default: "901-above"
                        }
                    },
                    items: { $count: {} }
                    // count: { $sum: 1 }
                }
            },
            { $project: { range: "$_id", items: 1, _id: 0 } }
        ]);


        // // if key value pair required
        // const priceRangeData = priceRangeCount.map((elm) => ({ [elm.range]: elm.count }));
        const priceRangeData=getPriceRange(priceRangeCount);
        // console.log("New Price rance data->",priceRangeData);
        return { priceRangeData }
    },

    pieChartMonthly: async (query) => {
        const searchMonth = parseInt(query.month) || 0;
        const categoryCount = await productModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, searchMonth]
                    }
                }
            },
            {
                $group:
                {
                    _id: "$category",
                    items: { $count: {} },
                }
            },
            { $project: { category: "$_id", _id: 0, items: 1 } }
        ]);
        // if key value pair required
        const categoryCountData = categoryCount.map((elm) => ({ [elm.category]: elm.items }));
        return { categoryCount }
    }
}