class Product {
    constructor(id, name, price, sale) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.sale = sale;
    }

    productDescribe() {
        return `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Sale: ${this.sale}`;
    }

}

class Table extends Product {
    type = 'Table';

    constructor(name, price, sale) {
        super('1', name, price, sale);
    }
}

class Phone extends Product {
    type = 'Phone';

    constructor(name, price, sale) {
        super('2', name, price, sale);
    }
}

class Laptop extends Product {
    type = 'Laptop';

    constructor(name, price, sale) {
        super('3', name, price, sale);
    }
}

class ProductFactory {

    static createProduct(type, name, price) {

        const sale = ProductFactory.getSaleStatus(price, type, name);
        switch (type) {
            case 'table': {
                return new Table(name, price, sale);
            }
            case 'phone': {
                return new Phone(name, price, sale);
            }
            case 'laptop': {
                return new Laptop(name, price, sale);
            }
            default:
                throw new Error(`Invalid product type - ${type} with name - ${name}`);
        }

    }

    static getSaleStatus(price, type, name) {
        price = Number(price);
        if (isNaN(price)) {
            throw new Error(`Invalid price - ${price} for the product with type - ${type} and name - ${name}`);
        }
        return price < 1000;
    }


}
