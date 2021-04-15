import faker from 'faker';

export const fakerProducts = (numProducts = 10) => {
    
    if (numProducts == 0) return 'No hay productos';
    const products = [];
    
    for(let i = 0; i < numProducts; i++) {
        const product = {
            title:faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        }
        products.push(product);
    }
    return products;
};

