class Authentication {
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

  get itemNames() {
    return ".inventory_item_name";
  }

  get mainMenuBtn() {
    return "#react-burger-menu-btn";
  }
  get logOutBtn() {
    return "#logout_sidebar_link";
  }

  get errMsg() {
    return ".error>h3";
  }
  get dogImgs() {
    return `img[src="/static/media/sl-404.168b1cce.jpg"]`;
  }
  //#endregion

  //#region Methods
  login(username, password) {
    cy.get(this.userNameField).type(username);
    cy.get(this.passwordField).type(password);
    cy.get(this.loginBtn).click();
  }

  logout() {
    cy.get(this.mainMenuBtn).click();
    cy.get(this.logOutBtn).click();
  }
  //#endregion
}
module.exports = new Authentication();
