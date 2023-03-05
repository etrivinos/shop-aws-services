export interface IProduct {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
      rate: number,
      count: number
    }
};

export interface IProductStock {
  product_id: string,
  count: number
};


export type IProductWithStock = IProduct & IProductStock;