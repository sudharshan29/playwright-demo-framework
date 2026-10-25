const { test, expect } = require('../../fixtures');
const users = require('../../data/users');

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('standard user can log in', async ({ page, loginPage }) => {
    await loginPage.login(users.standard);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut);
    await expect(loginPage.error).toContainText('this user has been locked out');
  });

  test('wrong password is rejected', async ({ loginPage }) => {
    await loginPage.login({ username: users.standard.username, password: 'wrong' });
    await expect(loginPage.error).toContainText('do not match any user');
  });

  test('username is required', async ({ loginPage }) => {
    await loginPage.login({ username: '', password: users.standard.password });
    await expect(loginPage.error).toContainText('Username is required');
  });

  test('password is required', async ({ loginPage }) => {
    await loginPage.login({ username: users.standard.username, password: '' });
    await expect(loginPage.error).toContainText('Password is required');
  });
});
