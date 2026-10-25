const { test, expect } = require('../../fixtures');

const customer = { firstName: 'Test', lastName: 'User', postalCode: '641001' };

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('completes an order end to end', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails(customer);
    await checkoutPage.finish();
    await expect(checkoutPage.confirmation).toHaveText('Thank you for your order!');
  });

  test('first name is required', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails({ ...customer, firstName: undefined });
    await expect(checkoutPage.error).toContainText('First Name is required');
  });

  test('postal code is required', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails({ ...customer, postalCode: undefined });
    await expect(checkoutPage.error).toContainText('Postal Code is required');
  });
});
