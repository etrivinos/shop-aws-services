export const mergeById = (products, stocks) => {
    return products.map(product => ({
        ...stocks.find((stock) => (stock.product_id === product.id) && stock),
        ...product
    }));
}

export const logRequest = (event: Record<string, any>) => {
    return [
        `PATH: ${event.path}`,
        `METHOD: ${event.httpMethod}`,
        `PATH PARAMETERS: ${event.pathParameters}`,
        `BODY: ${JSON.parse(event.body as any)}`,
    ].join('\n');
}
