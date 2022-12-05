class Product {
  //#region Selectors
  get userNameField() {
    return "#user-name";
  }
  get passwordField() {
    return "#password";
  }
  get loginBtn() {
    return "#login-button";
  }

  get itemsName() {
    return ".inventory_item_name";
  }
  get itemsPrice() {
    return ".inventory_item_price";
  }

  get selectSortDropDown() {
    return ".product_sort_container";
  }
  get productPrices() {
    return ".inventory_item_price";
  }
  //#endregion

  //#region Methods
  selectSort(sort) {
    cy.get(this.selectSortDropDown).select(sort);
  }
  //#endregion
}
module.exports = new Product();
