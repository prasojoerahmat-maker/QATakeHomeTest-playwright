const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Complete checkout for Sauce Labs Onesie', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(inventoryPage.inventoryTitle).toBeVisible();

  // 2. Add Sauce Labs Onesie to cart
  await inventoryPage.addItemToCart('Sauce Labs Onesie');

  // 3. Open cart
  await inventoryPage.openCart();

  await expect(cartPage.cartTitle).toBeVisible();
  await expect(cartPage.cartItems).toHaveCount(1);
  await expect(cartPage.cartItems).toContainText('Sauce Labs Onesie');

  // 4. Proceed to checkout
  await cartPage.proceedToCheckout();

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // 5. Enter customer information
  await checkoutPage.fillCustomerInformation(
    'Test',
    'Customer',
    '12345'
  );

  // 6. Verify checkout overview
  await expect(checkoutPage.summaryTitle).toBeVisible();
  await expect(page.locator('.cart_item'))
    .toContainText('Sauce Labs Onesie');

  // 7. Finish the order
  await checkoutPage.finishOrder();

  // 8. Verify successful order completion
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(checkoutPage.completeTitle).toBeVisible();
  await expect(checkoutPage.confirmationMessage).toBeVisible();
});
