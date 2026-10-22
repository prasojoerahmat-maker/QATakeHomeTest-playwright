class CartPage {
    constructor(page) {
      this.page = page;
      this.cartTitle = page.getByText('Your Cart', {
        exact: true
      });
      this.checkoutButton = page.getByRole('button', {
        name: 'Checkout'
      });
      this.cartItems = page.locator('.cart_item');
    }
  
    async proceedToCheckout() {
      await this.checkoutButton.click();
    }
  }
  
  module.exports = { CartPage };
  