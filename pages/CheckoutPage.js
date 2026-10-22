class CheckoutPage {
    constructor(page) {
      this.page = page;
  
      this.firstNameInput = page.getByPlaceholder('First Name');
      this.lastNameInput = page.getByPlaceholder('Last Name');
      this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
  
      this.continueButton = page.getByRole('button', {
        name: 'Continue'
      });
  
      this.finishButton = page.getByRole('button', {
        name: 'Finish'
      });
  
      this.summaryTitle = page.getByText('Checkout: Overview', {
        exact: true
      });
  
      this.completeTitle = page.getByText('Checkout: Complete!', {
        exact: true
      });
  
      this.confirmationMessage = page.getByText(
        'Thank you for your order!',
        { exact: true }
      );
    }
  
    async fillCustomerInformation(firstName, lastName, postalCode) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
      await this.continueButton.click();
    }
  
    async finishOrder() {
      await this.finishButton.click();
    }
  }
  
  module.exports = { CheckoutPage };