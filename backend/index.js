import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

import productsRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import checkOutOrderRouter from "./routes/checkOutOrder.route.js";

const app = express();
const PORT = 3500;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/product", productsRouter );
app.use("/api/cart", cartRouter );
app.use("/api/checkout", checkOutOrderRouter );


app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
});
