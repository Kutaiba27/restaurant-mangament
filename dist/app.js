"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const db_connection_1 = require("./configurations/db.connection");
const admin_router_1 = require("./routes/admin.router");
const vindor_router_1 = require("./routes/vindor.router");
const apierror_1 = require("./utility/apierror");
const error_middleware_1 = require("./middlewares/error.middleware");
const shopping_router_1 = require("./routes/shopping.router");
const cutomer_router_1 = require("./routes/cutomer.router");
const cart_router_1 = require("./routes/cart.router");
const order_router_1 = require("./routes/order.router");
dotenv_1.default.config({ path: 'config.env' });
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/admin', admin_router_1.AdminRouter);
app.use('/vindor', vindor_router_1.VindorRouter);
app.use('/customer', cutomer_router_1.CustomerRouter);
app.use('/cart', cart_router_1.CartRouter);
app.use('/order', order_router_1.OrderRouter);
app.use(shopping_router_1.ShoppingRouter);
app.use('*', (req, res, next) => {
    next(new apierror_1.ApiError("the route not found", 404));
});
app.use(error_middleware_1.globalError);
db_connection_1.dbConnection.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`the server is running ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log("there are an error an connicion to database ", error);
});
