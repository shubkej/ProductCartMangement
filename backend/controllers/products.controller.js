import {products} from '../data/productList.js'

export const getProducts = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            data: products,
        });
        
    } catch (e) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};