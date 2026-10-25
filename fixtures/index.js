const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const users = require('../data/users');

/**
 * Page objects are injected into tests as fixtures, so specs stay short and
 * every test gets its own isolated browser context (safe for parallel runs).
 * `inventoryPage` is already logged in as the standard user.
 */
const test = base.test.extend({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  inventoryPage: async ({ page, loginPage }, use) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await base.expect(page).toHaveURL(/inventory\.html/);
    await use(new InventoryPage(page));
  },
});

module.exports = { test, expect: base.expect };
