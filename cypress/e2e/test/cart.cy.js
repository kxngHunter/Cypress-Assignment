import Auth from "../page/auth.page";
import Cart from "../page/cart.page";
import { users } from "../data/user";
const validUser = users["valid"];
let products = [];
describe("Cart", () => {
  beforeEach(() => {
    products = [];
    cy.visit("/");
    Auth.login(validUser.username, validUser.password);
    cy.get(Cart.productNames).each(($product, index, $products) => {
      const productName = $product.text();
      products.push(productName);
    });
  });

  it("Add a single product to cart", () => {
    const product = products[0];
    Cart.addToCart(product);
    Cart.navigateToCart();

    cy.get(Cart.cartNotification).should("have.text", 1);
    cy.get(Cart.cartQuantity).should("have.text", 1);
    cy.get(Cart.cartItemsName).should("have.text", product);
  });

  it("Remove one item from cart", () => {
    const product = products[0];
    Cart.addToCart(product);
    Cart.navigateToCart();

    // Assert that there is 1 item in the cart then remove the item
    cy.get(Cart.cartQuantity).should("have.text", 1);
    cy.get(Cart.cartItemsName).should("have.text", product);
    Cart.removeFromCart(product);

    // Assert that the item was removed and the cart is empty
    cy.get(Cart.cartItemsName).should("not.exist");
    cy.get(Cart.removedCartItem).should("exist");
  });

  it.only("Remove one item from product list page", () => {
    const product = products[0];
    Cart.addToCart(product);

    Cart.removeFromCart(product);
  });

  it("Add multiple products to cart", () => {
    for (const [index, product] of products.entries()) {
      Cart.addToCart(product);
      Cart.navigateToCart();

      cy.get(Cart.cartNotification).should("have.text", index + 1);
      cy.get(Cart.cartItemsName).should("include.text", product);
      if (products.length !== index + 1) {
        cy.go("back");
      }
    }
  });

  it("Remove a multiple products to cart", () => {
    for (const product of products) {
      Cart.addToCart(product);
    }
    Cart.navigateToCart();
    for (const [index, product] of products.entries()) {
      Cart.removeFromCart(product);
      if (products.length == index + 1) {
        cy.get(Cart.cartItemsName).should("not.exist");
      } else {
        cy.get(Cart.cartItemsName).should("not.include.text", product);
      }
    }
    cy.get(Cart.cartNotification).should("not.exist");
  });
});
