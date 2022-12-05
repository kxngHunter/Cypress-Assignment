const users = {
  valid: {
    username: "standard_user",
    password: "secret_sauce",
    firstName: "Test",
    lastName: "Test",
    zip: "00000",
  },
  lockedOutUser: {
    username: "locked_out_user",
    password: "secret_sauce",
    errorMsg: "Sorry, this user has been locked out.",
  },
  problemUser: {
    username: "problem_user",
    password: "secret_sauce",
  },
  performanceGlitchUser: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
};
module.exports = { users };
