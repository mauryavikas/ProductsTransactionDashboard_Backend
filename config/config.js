import 'dotenv/config'

export const PORT = process.env.PORT || 3004;
export const MONGODB_URI = process.env.MONGODB_URI;
export const THIRD_PARTY_DATA_API = process.env.THIRD_PARTY_DATA_API;
const BACKEND_DOMAIN=process.env.BACKEND_DOMAIN; // or mention ip address in env variable
export const BACKEND_URL = `${BACKEND_DOMAIN}:${PORT}`;

// Api End Points 

export const productApi = {
    productTrasaction:`${BACKEND_URL}/api/product/searchTransaction`,
    monthlystatistis:`${BACKEND_URL}/api/product/statistisMonthly`,
    monthlyBarChart:`${BACKEND_URL}/api/product/barChartMonthly`,
    monthlyPieChart:`${BACKEND_URL}/api/product/pieChartMonthly`,
}
