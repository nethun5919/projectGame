var readlineSync = require('readline-sync');
var hitpoints = 100;
var items = [];
var monsterHealth = 0;
var healthleft = 0;
var input = "";
const name = readlineSync.question('What is your name warrior? ');

console.log('Welcome ' + name + '!');
userPrompt(name);

function attacked(random) {
  if (random <= 8) {
    monsterHealth = 30;
    monster = "goblin";
    return "goblin";
  } else if (random >= 9 && random <= 16){
    monsterHealth = 20;
    monster = "orc";
    return "orc";
  } else {
    monsterHealth = 10;
    monster = "troll";
    return "troll";
  }
}

function printStats() {
  console.log("Name: " + name + "\n" + "Hit Points: " + hitpoints + "\n" + "Items:" + items + "\n");
  userPrompt(name);
}

function userPrompt(name) {
    let input = readlineSync.question("Enter a 'w' to walk or 'print' to view stats: ");
    if (input == 'w') {
        let random = Math.random() * 40 + 1; 
        if (random <= 33) {
        let monster = attacked(random);
        healthleft = monsterHealth;
        console.log("You are being attacked by a " + monster + "!");
        let input = readlineSync.question(name + " would you like to 'attack' or 'run' from the " + monster + "? " );
        battle(monster, input, healthleft);
        } else if(random > 33) {
        console.log(name + " has moved deeper into the forest.");
        userPrompt(name);
        } 
    } else if(input == "print") {
        printStats();
    } else userPrompt(name);
}

function randomItem() {
    let random = Math.random() * 100 + 1; 
    if (random <= 33) {
        console.log("You have collected a ruby");
        items.push(" Ruby");
        userPrompt(name); 
    } else if(random > 33 && random <= 66) {
        console.log("You have collected a diamond");
        items.push(" Diamond");
        userPrompt(name); 
    } else if(random > 66) {
        console.log("You have collected a gem");
        items.push(" Gem");
        userPrompt(name); 
    }
}

function didNotEscape(monster, input, healthleft) {
    console.log("\n" + "You did not escape from the " + monster + "!")
    let damage = Math.ceil(Math.random() * 20 + 1); 
    console.log("He hits you for " + damage + " damage!");
    hitpoints = hitpoints - damage;
    console.log("Your hitpoints remaining: " + hitpoints + "\n");
    if (hitpoints <= 0) {
        console.log("YOU ARE DEAD GAME OVER!");
    } else {
        let input = readlineSync.question(name + " would you like to 'attack' or 'run' from the " + monster + "? " ); 
        battle(monster, input, healthleft);
    }
}

function battle(monster, input, healthleft) {
    if (input == "attack") {
        let damage = Math.ceil(Math.random() * 20 + 1);
        console.log("\n" + "You attack for " + damage + " damage!");
        healthleft = healthleft - damage;
        console.log("The " + monster + " has " + healthleft + " hit points remaining!");
        if (healthleft <= 0) {
            console.log("You have slayed the " + monster + "!");
            randomItem();
            userPrompt();
        } else {
            let damage = Math.ceil(Math.random() * 10 + 1);
            hitpoints = hitpoints - damage;
            console.log("He hits you for " + damage + " damage!");
            console.log("Your hit points remaining: " + hitpoints  + "\n");
            if (hitpoints <= 0) {
                console.log("YOU ARE DEAD GAME OVER!");
            } else {
                let input = readlineSync.question(name + " would you like to 'attack' or 'run' from the " + monster + "? " ); 
                if (input == "attack") {
                    damage = Math.ceil(Math.random() * 20 + 1);
                    console.log("\n" + "You attack for " + damage + " damage!");
                    healthleft = healthleft - damage;
                    console.log("The " + monster + " has " + healthleft + " hit points remaining!");
                    if (healthleft <= 0) {
                        console.log("You have slayed the " + monster + "!");
                        randomItem();
                        userPrompt();
                    } else {
                        hitpoints = hitpoints - damage;
                        console.log("He hits you for " + damage + " damage!");
                        console.log("Your hit points remaining: " + hitpoints + "\n");
                        if (hitpoints <= 0) {
                            console.log("YOU ARE DEAD GAME OVER!");
                        } else {
                            input = readlineSync.question(name + " would you like to 'attack' or 'run' from the " + monster + "? " );   
                            battle(monster, input, healthleft);   
                        }
                    }
                } else if(input == "run"){
                    let random = Math.random() * 100 + 1;
                    if (random > 50) {
                        console.log("You have escaped from the " + monster + "!" + "\n");
                        userPrompt(name);
                    } else {
                        didNotEscape(monster, input, healthleft);
                    }
                } else {
                    let input = readlineSync.question(name + " would you like to 'attack' or 'run' from the " + monster + "? " ); 
                    battle(monster, input, healthleft);
                }      
            }
        }
    } else if(input == "run"){
        let random = Math.random() * 100 + 1;
        if (random > 50) {
            console.log("You have escaped from the " + monster + "!");
            userPrompt(name);
        } else {
            didNotEscape(monster, input, healthleft);
        }
    } else {
        let input = readlineSync.question(name + " would you like to 'attack' or 'run' from the " + monster + "? " ); 
        battle(monster, input, healthleft);
    }
}