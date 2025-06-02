
let cart = [];

export const getCart = (req, res) => {
    res.json(cart);
};

export const addToCart = (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ message: "productId and quantity are required" });
    }

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    res.status(201).json(cart);
};

export const updateCartItem = (req, res) => {
    const productId = req.params.productId.toString();
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "quantity must be at least 1" });
    }

    const item = cart.find(i => i.productId.toString() === productId);
    if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    res.json(cart);
};

export const removeFromCart = (req, res) => {
    const productId = req.params.productId;

    cart = cart.filter(item => item.productId.toString() !== productId.toString());

    res.json(cart);
};

export const clearCart = (req, res) => {
    cart = [];
    res.json({ message: "Cart cleared" });
};

