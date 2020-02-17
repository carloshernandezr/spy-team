//.
const inquirer = require("inquirer");
const Manager = require("./lib/manager");
let workTeamArray = [];
const fs = require("fs");

 
const util = require("util");
const html = require("./templates/generateHTML");
const writeFile = util.promisify(fs.writeFile);

const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern"); 
let CardTeamStr = "";


 



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
          validate: validateNumber,
        });
        const manager = new Manager(
          response.employeeName,
          response.id,
          response.email,
          response2.officeNumber,
        );
        workTeamArray.push(manager);
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
        workTeamArray.push(engineer);
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
        workTeamArray.push(intern);
      }
    } catch (err) {
      console.log(err);
    }
    finishedx = await inquirer.prompt({
      type: "list",
      message: "Would you like add a new Member?",
      name: "finished",
      choices: ["Yes", "No"],
    });
  } while (finishedx.finished === "Yes");
}


//getData();


async function init() {
  try {
    //   wait to retrieve data from user input
    await getData();

    // loops through each employee title in teamArray and assigns related info to each employee per their title
    workTeamArray.forEach(employee => {
     
      let titleInfo;
      let fficon;

      if (employee.title === "Manager") {
        titleInfo = `Office Number: ${employee.officeNumber}`;
        fficon = `<i class="fab fa-black-tie"></i>`;
      } else if (employee.title === "Engineer") {
        titleInfo = `GitHub Username: ${employee.github}`;
        fficon = `<i class="far fa-hand-spock"></i>`;
      } else if (employee.title === "Intern") {
        titleInfo = `School: ${employee.school}`;
        fficon = `<i class="fas fa-user-graduate"></i>`;
      }  
 
    //   creates an html card for each employee in array
      CardTeamStr =
        CardTeamStr +

        // 142    <li class="subtitle is-capitalized"><h2><i class="far fa-user fa-2x"></i>  ${employee.name}</h2></li>
        `<div class="column is-4">
                    <div class="card has-shadow">
                        <header class="header text-left">
                        <h1 class="title is-capitalized ">  &nbsp;${employee.name}</h2> 
                        <h1 class="title is-uppercase m-b-lg">&nbsp;${fficon} ${employee.title}</h1> </header>
                    
                        <div class="card-content">
                        <ul>
                         
                            <li class="subtitle">ID:  ${employee.id}</li>
                            <li class="subtitle">Email:  ${employee.email}</li>
                            <li class="subtitle is-capitalized"> ${titleInfo}</li>
                        </ul>
                        </div>
                    </div>
                </div>`;
    });

    const HTMLpass = html.generateHTML(CardTeamStr);
    // creates final html file and assigns it to the output folder
    writeFile("./output/index.html", HTMLpass);
  } catch (err) {
    console.log(err);
  }
}




//validate




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
// call init function to run program
init();
