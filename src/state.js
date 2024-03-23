class ProductOrder {
    constructor(product) {
        this.product = product;
        this.orderState = new CartState;
    }

    getProduct() {
        return this.product;
    }

    getCurrentStateOrder() {
        return this.orderState.describeState();
    }

    nextOrderStep() {
        this.orderState = this.orderState.nextState();
        return this.orderState;
    }

    describeCurrentOrderState() {
        return `${this.product.productDescribe()} ${this.getCurrentStateOrder()}`;
    }

}

class OrderState {
    nextState() {
        throw new Error("Need override nextState method.");
    }

    describeState() {
        throw new Error("Need to override describeState method.");
    }

}

class CartState extends OrderState {
    nextState() {
        return new OrderedState();
    }

    describeState() {
        return "Product in CART";
    }
}

class OrderedState extends OrderState {
    nextState() {
        return new DeliveredState();
    }

    describeState() {
        return "Product is ORDER";
    }
}

class DeliveredState extends OrderState {
    nextState() {
        return new ComplectedState();
    }

    describeState() {
        return "Product is DELIVERED";
    }
}

class ComplectedState extends OrderState {
    nextState() {
        return null;
    }

    describeState() {
        return "Order is SUCCESSFUL APPLY";
    }

}


