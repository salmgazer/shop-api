// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

async function updateSellingPrice(context) {
  try {
    const ProductService = context.app.service('products');
    await ProductService.patch(context.data.productId, {
      sellingPricePerUnit: parseFloat(context.data.amount)
    });
    return context;
  } catch (err) {
    return err;
  }
}

module.exports = updateSellingPrice;