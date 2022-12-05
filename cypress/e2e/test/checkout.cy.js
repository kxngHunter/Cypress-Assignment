import routesData from "../data/routes";
import Auth from "../page/auth.page";
import Cart from "../page/cart.page";
import Checkout from "../page/checkout.page";
import { users } from "../data/user";
const validUser = users["valid"];
let products = [];
describe("Checkout", () => {
  beforeEach(() => {
    products = [];
    cy.visit("/");
    Auth.login(validUser.username, validUser.password);
    cy.get(Cart.productNames).each(($product, index, $products) => {
      const productName = $product.text();
      products.push(productName);
    });
  });

  it("Checkout a single item", () => {
    const product = products[0];
    Cart.addToCart(product);
    Cart.navigateToCart();
    cy.get(Cart.checkOutBtn).click();
    cy.get(Checkout.checkoutOverviewTitle).should(
      "include.text",
      "Your Information"
    );
    Checkout.fillForm(validUser.firstName, validUser.lastName, validUser.zip);
    cy.get(Checkout.checkoutOverviewTitle).should("include.text", "Overview");
    cy.get(Cart.cartItemsName).should("have.length", 1);
    cy.get(Cart.cartItemsName).should("include.text", product);
    cy.get(Cart.cartQuantity).should("have.text", 1);
    cy.get(Checkout.finishBtn).should("be.visible");
    cy.get(Checkout.finishBtn).click();
    cy.get(Checkout.checkoutOverviewTitle).should("include.text", "Complete");
    cy.url().should("contain", routesData.complete);
  });
  it("Should not checkout a single item with missing checkout information [Last Name]", () => {
    const product = products[0];
    Cart.addToCart(product);
    Cart.navigateToCart();
    cy.get(Cart.checkOutBtn).click();
    cy.get(Checkout.checkoutOverviewTitle).should(
      "include.text",
      "Your Information"
    );
    Checkout.fillForm(validUser.firstName, "", validUser.zip);
    cy.get(Checkout.errorMsg).should("be.visible");
    cy.get(Checkout.errorMsg).should("include.text", "Last Name is required");
  });
  it("Should not checkout a single item with missing checkout information [First Name]", () => {
    const product = products[0];
    Cart.addToCart(product);
    Cart.navigateToCart();
    cy.get(Cart.checkOutBtn).click();
    cy.get(Checkout.checkoutOverviewTitle).should(
      "include.text",
      "Your Information"
    );
    Checkout.fillForm("", validUser.lastName, validUser.zip);

    cy.get(Checkout.errorMsg).should("be.visible");
    cy.get(Checkout.errorMsg).should("include.text", "First Name is required");
  });
  it("Should not checkout a single item with missing checkout information [Zip Code]", () => {
    const product = products[0];
    Cart.addToCart(product);
    Cart.navigateToCart();
    cy.get(Cart.checkOutBtn).click();
    cy.get(Checkout.checkoutOverviewTitle).should(
      "include.text",
      "Your Information"
    );
    Checkout.fillForm(validUser.firstName, validUser.lastName, "");

    cy.get(Checkout.errorMsg).should("be.visible");
    cy.get(Checkout.errorMsg).should("include.text", "Postal Code is required");
  });
});
