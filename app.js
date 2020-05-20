const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "main.html");
const outputPathCss = path.join(OUTPUT_DIR, "style.css");

const render = require("./lib/htmlRenderer");
const renderCSS = require("./lib/cssRenderer");

const employeeRoster = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function appMenu () {
    function createManager() {
        console.log("Let's build your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the name of the manager?",
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the id of the manager?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the email address of the manager?",
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the number of the manager's office?"
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            employeeRoster.push(manager);
            createTeam();
        });
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which kind of employee would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "Our employee roster is up to date."
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern ();
                    break;
                default:
                    buildTeam();
                    createCss();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the name of the new Engineer?",
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the id of the new Engineer?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the email address of the new Engineer?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the Github username of the new Engineer?"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            employeeRoster.push(engineer);
            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the name of the new Intern?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is the id of the new Intern?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the email address of the new intern?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "Where does the Intern go to school?"
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            employeeRoster.push(intern);
            createTeam();
        });
    }


    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array (employeeRoster) containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(employeeRoster), "utf-8");
    }

    function createCss() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPathCss, renderCSS());
    }

    createManager();
}

appMenu();




// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
