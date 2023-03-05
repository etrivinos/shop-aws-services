import { getAllItems, getItemById } from "@libs/dynamo";
import { IProduct, IProductStock, IProductWithStock } from "@models/product.model";
import { mergeById } from "./utils";

export const getProductWithStock = async (id: string): Promise<IProductWithStock> => {
  const product: IProduct = await getItemById<IProduct>(process.env.PRODUCTS_TABLE, { id } );
  if(!product) return null;

  const product_stock: IProductStock = await getItemById<IProductStock>(process.env.STOCKS_TABLE, { product_id: id });
  return {...product, ...product_stock}
}

export const getAllProductsWithStock = async (): Promise<IProductWithStock[]> => {
  const products: IProduct[] = await getAllItems(process.env.PRODUCTS_TABLE);
  const stocks: IProductStock[] = await getAllItems(process.env.STOCKS_TABLE);

  return mergeById(products, stocks);
}
  