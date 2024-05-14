#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.green("/////////////") +
    chalk.bold.italic.blue("Welcome to Fariha's Treasure Hunter Adventures Game...") +
    chalk.bold.green("/////////////"));
let name = await inquirer.prompt({
    name: "userName",
    type: "input",
    message: chalk.bold.red("Enter your name?"),
});
console.log(chalk.bold.italic.yellow("Hey") +
    chalk.bold.italic.green(`${name.userName}`) +
    chalk.bold.italic.yellow(", Imagine you are in the jungle."));
let items = await inquirer.prompt({
    name: "items",
    type: "checkbox",
    message: chalk.bold.red("kindly mark what you are going to take with you?"),
    choices: [
        "water bottle",
        "food items",
        "knife",
        "scissor",
        "bag",
        "rope",
        "map of treasure",
        "suit",
        "shoes",
        "watch",
    ],
});
console.log(chalk.bold.italic.yellow("You have selected these items:") +
    chalk.bold.italic.green(`${items.items.join(" , ")}`));
console.log(chalk.bold.italic.green(`${name.userName}`) +
    chalk.bold.italic.yellow(", now you are entering the jungle."));
let condition = true;
while (condition === true) {
    let direction = await inquirer.prompt({
        name: "direction",
        type: "list",
        message: chalk.bold.red("Select the direction where you want to go?"),
        choices: ["NORTH", "SOUTH", "EAST", "WEST", "EXIT"],
    });
    if (direction.direction === "NORTH") {
        console.log(chalk.bold.italic.yellow("Warning! There are dangerous animals which can harm you."));
        let side1 = await inquirer.prompt({
            name: "side1",
            type: "confirm",
            message: chalk.bold.red("Do you want to go back?"),
            default: true,
        });
        if (side1.side1 === true) {
            console.log(direction);
        }
        else {
            console.log(chalk.bold.italic.yellow("You trapped with dangerous animals."));
            condition = false;
            console.log(chalk.bold.italic.green(`${name.userName}`) +
                chalk.bold.italic.yellow("You lose the game. Better luck next time."));
        }
    }
    else if (direction.direction === "SOUTH") {
        console.log(chalk.bold.italic.yellow("You fall down in a deep ditch."));
        let availableItem = items.items;
        let ditch = await inquirer.prompt({
            name: "ditch",
            type: "list",
            message: chalk.bold.red("What thing you want to use for come out?"),
            choices: availableItem,
        });
        if (ditch.ditch === "rope") {
            console.log(chalk.bold.italic.yellow(`You are playing very well.`));
            let side2 = await inquirer.prompt({
                name: "side2",
                type: "confirm",
                message: chalk.bold.red("Do you want to go back?"),
                default: true,
            });
            if (side2.side2 == true) {
                console.log(direction.direction);
            }
            else {
                condition = false;
                console.log(chalk.bold.italic.green(`${name.userName}`) +
                    chalk.bold.italic.yellow(", You lose the game. Better luck next time."));
            }
        }
        else {
            console.log(chalk.bold.italic.yellow("You selected wrong item. you need a rope to come out from ditch."));
            condition = false;
            console.log(chalk.bold.italic.green(`${name.userName}`) +
                chalk.bold.italic.yellow(", You lose the game. Better luck next time."));
        }
    }
    else if (direction.direction === "EAST") {
        console.log(chalk.bold.italic.yellow("It is almost night, infront of you there is a cave."));
        let side3 = await inquirer.prompt({
            name: "side3",
            type: "confirm",
            message: chalk.bold.red("Do you want to stay in cave for tonight?"),
            default: "yes",
        });
        if (side3.side3 == true) {
            console.log(chalk.bold.italic.yellow("In a cave you found a door infront of you."));
            let door = await inquirer.prompt({
                name: "door",
                type: "confirm",
                message: chalk.bold.red("Do you want to go in?"),
                default: true,
            });
            if (door.door === true) {
                console.log(chalk.bold.italic.yellow("You must guess a number between 1-10 for unlock the door."));
                console.log(chalk.bold.italic.yellow("Remember you have just 3 chance to unlock the door."));
                let guess = Math.floor(Math.random() * 5 + 1);
                let attempts = 0;
                let condition2 = false;
                while (attempts < 3 && !condition2) {
                    attempts++;
                    const answer = await inquirer.prompt([
                        {
                            name: "userGuessedNumber",
                            type: "number",
                            message: chalk.bold.red("Please guess a number between 1-10:"),
                        },
                    ]);
                    if (answer.userGuessedNumber === guess) {
                        console.log(chalk.bold.italic.yellow("Congratulations!") +
                            chalk.bold.italic.green(`${name.userName}`) +
                            chalk.bold.italic.yellow(", You won the game. Here is your treasure."));
                        condition2 = true;
                        let again = await inquirer.prompt({
                            name: "again",
                            type: "confirm",
                            message: chalk.bold.red("Do you want to play again?"),
                            default: false,
                        });
                        if (again.again === false) {
                            condition = false;
                            console.log(chalk.bold.green("/////////////") +
                                chalk.bold.italic.red(`${name.userName}`) +
                                chalk.bold.italic.blue(", Hope you enjoyed Treasure Hunt Adventures Game. Good Bye....") +
                                chalk.bold.green("/////////////"));
                        }
                    }
                    else {
                        console.log("Try Again...");
                        console.log(chalk.bold.italic.green(`${name.userName}`) +
                            chalk.bold.italic.yellow(", You lose the game. Better luck next time."));
                        condition = false;
                    }
                }
            }
            else {
                condition = false;
                console.log(chalk.bold.italic.green(`${name.userName}`) +
                    chalk.bold.italic.yellow(", You lose the game. Better luck next time."));
            }
        }
    }
    else if (direction.direction === "WEST") {
        console.log(chalk.bold.italic.yellow("Hey") +
            chalk.bold.italic.green(`${name.userName}`) +
            chalk.bold.italic.yellow(", you went on difficult maze. You can't come out from here."));
        console.log(chalk.bold.italic.green(`${name.userName}`) +
            chalk.bold.italic.yellow(", You lose the game. Better luck next time."));
        condition = false;
    }
    else {
        direction.direction === "EXIT";
        let exit = await inquirer.prompt({
            name: "exit",
            type: "confirm",
            message: chalk.bold.red("Are you sure you want to Exit?"),
            default: true,
        });
        if (exit.exit === true) {
            condition = !condition;
            console.log(chalk.bold.green("/////////////") +
                chalk.bold.italic.red(`${name.userName}`) +
                chalk.bold.italic.blue(", Hope you enjoyed Treasure Hunt Adventures Game. Good Bye....") +
                chalk.bold.green("/////////////"));
        }
    }
}
