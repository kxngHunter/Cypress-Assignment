class Checkout {
  //#region Selectors

  get firstNameField() {
    return "#first-name";
  }
  get lastNameField() {
    return "#last-name";
  }
  get zipField() {
    return "#postal-code";
  }
  get continueBtn() {
    return "#continue";
  }

  get finishBtn() {
    return "#finish";
  }

  get checkoutOverviewTitle() {
    return ".title";
  }

  get checkOutBtn() {
    return "#checkout";
  }
  get errorMsg() {
    return "h3[data-test='error']";
  }
  //#endregion

  //#region Methods
  fillForm(firstName, lastName, zip) {
    firstName ? cy.get(this.firstNameField).type(firstName) : null;
    lastName ? cy.get(this.lastNameField).type(lastName) : null;
    zip ? cy.get(this.zipField).type(zip) : null;
    cy.get(this.continueBtn).should("be.visible");
    cy.get(this.continueBtn).click();
  }
}
module.exports = new Checkout();
