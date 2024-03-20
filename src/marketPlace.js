const cartInPage1 = ProductCart.getInstance();
const cartInPage2 = ProductCart.getInstance();
const cartInPageN = ProductCart.getInstance();
const tableProduct = ProductFactory.createProduct('table', 'Samsung Table 12', '190');
const phoneProduct = ProductFactory.createProduct('phone', 'Iphone 15 pro max', '1599');
const laptopProduct = ProductFactory.createProduct('laptop', 'Macbook pro 13 air', '999');

cartInPage1.addToCart(tableProduct);
cartInPage1.addToCart(phoneProduct);
cartInPage2.addToCart(laptopProduct);

const allCartProductOrders = cartInPageN.getAllCartProductOrders();

processOrders(allCartProductOrders);

async function processOrders(allCartProductOrders) {
    for (let orderProduct of allCartProductOrders) {
        if (orderProduct.getProduct().sale) {
            console.log(orderProduct.describeCurrentOrderState());
            await new Promise(resolve => setTimeout(resolve, 1000));

            while (orderProduct.nextOrderStep()) {
                console.log(orderProduct.describeCurrentOrderState());
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
}