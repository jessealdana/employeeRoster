// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");
// the class Engineer callsback to the stock info in the class Employee
class Engineer extends Employee {
    constructor(name, id, email, github) {
        // super refers to properties drawn from the parent
        super(name, id, email);
        this.github = github;
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }

}

module.exports = Engineer;