class ProductCart {
    allProductOrders = [];

    //private constructor
    constructor() {
        if (ProductCart.instance) {
            throw new Error('Error - use ProductCart.getInstance()');
        }
    }

    //singleton instance manager
    static getInstance() {
        if (!ProductCart.instance) {
            ProductCart.instance = new ProductCart();
        }
        return ProductCart.instance;
    }

    getAllCartProductOrders() {
        return this.allProductOrders;
    }

    addToCart(product) {
        this.allProductOrders.push(new ProductOrder(product));
    }

    removeFromCart(itemId) {
        this.allProductOrders = this.allProductOrders.filter(order => order.getProduct().id !== itemId)
    }
}
