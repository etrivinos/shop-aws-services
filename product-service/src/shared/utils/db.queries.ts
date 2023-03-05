import { getAllItems, getItemById, insertItem } from "@libs/dynamo";
import { IProduct } from "@models/product.model";
import { mergeById } from "./utils";

export const getProductWithStock = async (id: string): Promise<IProduct> => {
  const product: IProduct = await getItemById<IProduct>(process.env.PRODUCTS_TABLE, { id } );
  if(!product) return null;

  const product_stock: IProduct = await getItemById<IProduct>(process.env.STOCKS_TABLE, { product_id: id });
  return {...product, ...product_stock}
}

export const getAllProductsWithStock = async (): Promise<IProduct[]> => {
  const products: IProduct[] = await getAllItems(process.env.PRODUCTS_TABLE);
  const stocks: IProduct[] = await getAllItems(process.env.STOCKS_TABLE);

  return mergeById(products, stocks);
}

export const insertProduct = async (product: IProduct): Promise<IProduct> => {
  const result = await insertItem(process.env.PRODUCTS_TABLE, product);
  return result;
}
