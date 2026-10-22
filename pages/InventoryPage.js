class InventoryPage {
    constructor(page) {
      this.page = page;
      this.inventoryTitle = page.getByText('Products', {
        exact: true
      });
      this.cartLink = page.locator('.shopping_cart_link');
    }
  
    async addItemToCart(itemName) {
      const item = this.page
        .locator('.inventory_item')
        .filter({ hasText: itemName });
  
      await item.getByRole('button', {
        name: 'Add to cart'
      }).click();
    }
  
    async openCart() {
      await this.cartLink.click();
    }
  }
  
  module.exports = { InventoryPage };
  