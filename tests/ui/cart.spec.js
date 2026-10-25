const { test, expect } = require('../../fixtures');

test.describe('Cart', () => {
  test('badge counts items added', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('added item appears in the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText(['Sauce Labs Backpack']);
  });

  test('removing the only item empties the badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.removeFromCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
