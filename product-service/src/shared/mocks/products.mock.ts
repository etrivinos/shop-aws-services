import { faker } from '@faker-js/faker';
import { IProduct } from 'src/shared/models/product.model';

function getRandomProducts() : IProduct[] {
  const products: IProduct[] = [];

  Array.from({ length: 10 }).forEach((_value, index): void => {
    const randomProduct = {
      id: ++index,
      name: faker.commerce.product(),
      price: +faker.commerce.price(),
      image: faker.image.food()
    };
    products.push(randomProduct);
  });

  return products;
}

export default getRandomProducts();
