import Auth from "../page/auth.page";
import Cart from "../page/cart.page";
import Product from "../page/product.page";
import { users } from "../data/user";
const validUser = users["valid"];
let products = [];
let prices = [];
const sort = {
  "A to Z": "az",
  "Z to A": "za",
  "Low to High": "lohi",
  "High to Low": "hilo",
};
describe("Sort", () => {
  beforeEach(() => {
    products = [];
    prices = [];
    cy.visit("/");
    Auth.login(validUser.username, validUser.password);
    cy.get(Cart.productNames).each(($product, index, $products) => {
      const productName = $product.text();
      products.push(productName);
    });
    cy.get(Product.productPrices).each(($price, index, $prices) => {
      const productName = $price.text();
      prices.push(productName);
    });
  });

  it("should sort product list from A-Z", () => {
    Product.selectSort(sort["A to Z"]);

    // Sort data list based on name, from A to Z
    let sortedProducts = products.sort();

    cy.get(Product.itemsName).each(($elem, index) => {
      expect($elem.text()).equal(sortedProducts[index]);
    });
  });

  it("should sort product list from Z-A", () => {
    Product.selectSort(sort["Z to A"]);

    // Sort data list based on name, from Z to A
    let sortedProducts = products.sort().reverse();

    cy.get(Product.itemsName).each(($elem, index) => {
      expect($elem.text()).equal(sortedProducts[index]);
    });
  });

  it("should sort product list from low to high", () => {
    Product.selectSort(sort["Low to High"]);

    // Sort data list based on price, from low to high
    let sortedPrices = [];
    for (const price of prices) {
      sortedPrices.push(price.replace("$", ""));
    }
    sortedPrices = sortedPrices.sort(function (a, b) {
      return a - b;
    });

    cy.get(Product.itemsPrice).each(($elem, index) => {
      expect($elem.text()).equal(`$${sortedPrices[index]}`);
    });
  });

  it("should sort product list from high to low", () => {
    Product.selectSort(sort["High to Low"]);

    // Sort data list based on price, from high to low
    let sortedPrices = [];
    for (const price of prices) {
      sortedPrices.push(price.replace("$", ""));
    }
    sortedPrices = sortedPrices.sort(function (a, b) {
      return b - a;
    });

    cy.get(Product.itemsPrice).each(($elem, index) => {
      expect($elem.text()).equal(`$${sortedPrices[index]}`);
    });
  });
});
