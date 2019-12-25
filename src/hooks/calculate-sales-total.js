// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const knexRaw = require('../knexRaw');

async function calculateSalesTotal(context) {
  try {
    const updatedContext = context;
    let totalCostPrice = 0.00;
    let totalSellingPrice = 0.00;
    
    const salesObjects = updatedContext.data.products;
    // const customer = await knexRaw('customers').where({ id: updatedContext.data.customerId }).first();
    // console.log(customer);
    for (let i = 0; i < salesObjects.length; i++) {
      const salesObject = salesObjects[i];
      const product = await knexRaw('products').where(salesObject.products).first();
      salesObject.costPricePerUnit = product.costPricePerUnit;
      salesObject.sellingPricePerUnit = product.sellingPricePerUnit;
      if (salesObject.quantity && !salesObject.length) {
        await knexRaw('products').where(salesObject.products).update({ quantity: product.quantity - salesObject.quantity });
        totalCostPrice += product.costPricePerUnit * salesObject.quantity;
        totalSellingPrice += product.sellingPricePerUnit * salesObject.quantity;
      } else if (salesObject.length && !salesObject.quantity) {
        await knexRaw('products').where(salesObject.products).update({ length: product.length - salesObject.length });
        totalCostPrice += product.costPricePerUnit * salesObject.length;
        totalSellingPrice += product.sellingPricePerUnit * salesObject.length;
      }
    }  

    const profit = totalSellingPrice - totalCostPrice;
    updatedContext.data.totalCostPrice = totalCostPrice;
    updatedContext.data.totalSellingPrice = totalSellingPrice;
    updatedContext.data.profit = profit;
    updatedContext.data.salesPerson = updatedContext.params.user.email;
    return updatedContext;
  } catch (err) {
    return err;
  }
}

module.exports = calculateSalesTotal;