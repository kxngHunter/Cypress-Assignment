import Auth from "../page/auth.page";
import routesData from "../data/routes";
import { users } from "../data/user";
describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  for (const user in users) {
    if (Object.hasOwnProperty.call(users, user)) {
      const loginInfo = users[user];
      it(`${
        user != "lockedOutUser" ? "Login" : "Shouldn't Login"
      } with a ${user} user`, () => {
        Auth.login(loginInfo.username, loginInfo.password);
        switch (user) {
          case "valid":
            cy.get(Auth.itemNames).should("be.visible");
            cy.url().should("contain", routesData.product);

            break;
          case "lockedOutUser":
            cy.get(Auth.errMsg)
              .should("be.visible")
              .and("contain.text", loginInfo.errorMsg);
            break;
          case "problemUser":
            cy.url().should("contain", routesData.product);
            cy.get(Auth.dogImgs).should("have.length", 6);
            break;
          case "performanceGlitchUser":
            cy.get(Auth.itemNames, { timeout: 5000 }).should("be.visible");
            cy.url().should("contain", routesData.product);
            break;
          default:
            break;
        }
      });
    }
  }
});
