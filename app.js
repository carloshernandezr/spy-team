//.
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "                   ",
      message: "What is your user name?",
      name: "username"
    },
    {
      type: "",
      message: "",
      name: ""
    },

  ])
  .then(function(response) {

    if (response.confirm === response.password) {
      console.log("Success!");
    }
    else {
      console.log(" !");
    }
  });



