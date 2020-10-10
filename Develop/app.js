const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = []
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//function to choose what type of employee to add
function addPerson() {
    const addPerson = [{
        type: "list",
        message: "What type of employee do you want to add? ",
        name: "employeeType",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
        ]
    }]
    inquirer.prompt(addPerson)
        .then(responses => {
            if (responses.employeeType === "Manager") {
                addManager();
            } else if (responses.employeeType === "Engineer") {
                addEngineer();
            } else {
                addIntern();
            }
        });
};
addPerson();

//questions to use to add a manager card

function addManager() {
    const managerInfo = [
        {
            type: "input",
            message: "What is your name? ",
            name: "name",
        },
        {
            type: "input",
            message: "What is your ID? ",
            name: "id",
        },
        {
            type: "input",
            message: "What is your email? ",
            name: "email",
        },
        {
            type: "input",
            message: "What is your office number? ",
            name: "officeNumber",
        },
    ];
    inquirer.prompt(managerInfo)
        .then(responses => {
            const manager = new Manager(responses.name, responses.id, responses.email, responses.officeNumber)
            team.push(manager);
            keepGoing();
        })
};

//questions to use to add an engineer card

function addEngineer() {
    const engineerInfo = [{
        type: "input",
        message: "What is your name? ",
        name: "name",
    },
    {
        type: "input",
        message: "What is your ID? ",
        name: "id",
    },
    {
        type: "input",
        message: "What is your email? ",
        name: "email",
    },
    {
        type: "input",
        message: "What is your Github username? ",
        name: "github",
    },
    ];
    inquirer.prompt(engineerInfo)
        .then(responses => {
            const engineer = new Engineer(responses.name, responses.id, responses.email, responses.github)
            team.push(engineer);
            keepGoing();
        })
};

//questions to use to add an intern card

function addIntern() {
    const internInfo = [{
        type: "input",
        message: "What is your name? ",
        name: "name",
    },
    {
        type: "input",
        message: "What is your ID? ",
        name: "id",
    },
    {
        type: "input",
        message: "What is your email? ",
        name: "email",
    },
    {
        type: "input",
        message: "What is your school name? ",
        name: "school",
    },
    ];
    inquirer.prompt(internInfo)
        .then(responses => {
            const intern = new Intern(responses.name, responses.id, responses.email, responses.school)
            team.push(intern);
            keepGoing();
        })
};

//calls the render function to take the info and create an html with it

function myTeam() {
    const teamHTML = render(team);
    fs.writeFile(outputPath, teamHTML, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("team.html created");
        }
    });
};

//this function runs at the end of each function to determine if the user needs to add another person

function keepGoing() {
    const keepGoing = [{
        type: "confirm",
        message: "Do you want to add another? ",
        name: "another",
    },
    ];
    inquirer.prompt(keepGoing)
        .then(responses => {
            if (responses.another === true) {
                addPerson();
            } else {
                console.log(team)
                myTeam();
            }
        });
};