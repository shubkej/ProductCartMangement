
let checkoutData = []; 

export const checkOutOrder = (req, res) => {
    const { firstName, lastName, address, cartItems, total } = req.body;

    if (!firstName || !lastName || !address || !Array.isArray(cartItems)) {
        return res.status(400).json({ error: 'Missing required checkout fields' });
    }

    const newOrder = {
        id: checkoutData.length + 1,
        firstName,
        lastName,
        address,
        cartItems,
        total,
        createdAt: new Date()
    };

    checkoutData.push(newOrder);
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
};

