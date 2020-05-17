// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");
// the new class Intern calls back to the stock info recorded in Employee
class Intern extends Employee {
    constructor(name, id, email, school) {
    // super refers to specific properties drawn from the parent    
    super(name, id, email);
    this.school = school; 
    }

    getRole() {
        return "Intern";
    }

    getSchool() {
        return this.school;
    }
}
module.exports = Intern
