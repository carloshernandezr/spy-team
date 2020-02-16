//.
const inquirer = require("inquirer");
const Manager = require("./lib/manager");
let workTeam = [];

 



async function getData() {
  let finishedx = ""; 
  do {
    try {
      let response = await inquirer.prompt([
        {
          type: "list",
          message: "What is the Employee's Title?",
          name: "title",
          choices: ["Manager", "Engineer", "Intern"],
        },
        {
          type: "input",
          message: "What is the Employee's Name?",
          name: "employeeName",
        },
        {
          type: "input",
          message: "What is the Employee's ID?",
          name: "id",
          validate: validateNumber,
        },
        {
          type: "input",
          message: "What is the Employee's Email?",
          name: "email",
          validate: validateEmail,
        },
      ]);
    //   prompts questions based on the title that was selected for the employee then creates an employee object and pushes it to the teamArray
      let response2 = "";
      if (response.title === "Manager") {
        response2 = await inquirer.prompt({
          type: "input",
          message: "What is your Office Number?",
          name: "officeNumber",
          //validate: validateNumber,
        });
        const manager = new Manager(
          response.employeeName,
          response.id,
          response.email,
          response2.officeNumber,
        );
        workTeam.push(manager);
      } else if (response.title === "Engineer") {
        response2 = await inquirer.prompt({
          type: "input",
          message: "What is the Employee's GitHub Username?",
          name: "github",
        });
        const engineer = new Engineer(
          response.employeeName,
          response.id,
          response.email,
          response2.github,
        );
        workTeam.push(engineer);
      } else if (response.title === "Intern") {
        response2 = await inquirer.prompt({
          type: "input",
          message: "What is the name of your School?",
          name: "school",
        });
        const intern = new Intern(
          response.employeeName,
          response.id,
          response.email,
          response2.school,
        );
        workTeam.push(intern);
      }
    } catch (err) {
      console.log(err);
    }
    finishedx = await inquirer.prompt({
      type: "list",
      message: "Would you like to continue?",
      name: "finished",
      choices: ["Yes", "No"],
    });
  } while (finishedx.finished === "Yes");
}


getData();





function validateEmail(value) {
  let validateE = /\S+@\S+\.\S+/;
  if (value.search(validateE) !== -1 && value.length > 0) {
    return true;
  } else {
    console.log("\nEnter a valid email  ( for example: test@test.com)");
    return false;
  }
}


 
function validateNumber(value) {

  var numbers = /^[0-9]+$/;
      if(value.match(numbers))
      {
          return true;
      }
      else
      {
        console.log("\nEnter a valid number");
        return false;
      }

}
