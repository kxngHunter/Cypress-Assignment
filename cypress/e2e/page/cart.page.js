class Cart {
  get productNames() {
    return ".inventory_item_name";
  }
  get cartIcon() {
    return ".shopping_cart_link";
  }
  get cartNotification() {
    return ".shopping_cart_badge";
  }

  get cartItemsName() {
    return ".inventory_item_name";
  }
  get cartQuantity() {
    return ".cart_quantity";
  }

  get removedCartItem() {
    return ".removed_cart_item";
  }

  get checkOutBtn() {
    return "#checkout";
  }

  addToCart(itemName) {
    let addToCartBtn = `[name='add-to-cart-${this.applySelectorFormat(
      itemName
    )}']`;

    cy.get(addToCartBtn).should("be.visible");
    cy.get(addToCartBtn).click();
  }

  removeFromCart(itemName) {
    let removeFromCartBtn = `[name='remove-${this.applySelectorFormat(
      itemName
    )}']`;

    cy.get(removeFromCartBtn).should("be.visible");
    cy.get(removeFromCartBtn).click();
  }

  navigateToCart() {
    cy.get(this.cartIcon).click();
  }

  applySelectorFormat(itemName) {
    return itemName.toLowerCase().replaceAll(" ", "-");
  }
}
module.exports = new Cart();
