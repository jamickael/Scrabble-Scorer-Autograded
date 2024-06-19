// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";
 
   for (let i = 0; i < word.length; i++) {
     for (const pointValue in oldPointStructure) {
       if (oldPointStructure[pointValue].includes(word[i])) {
         letterPoints += `Points for '${word[i]}': ${pointValue}\n`
       }
     }
   }
   return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let scoredWord = "Julie";

function initialPrompt() {
   console.log("Let's play some scrabble! \n");
   scoredWord = input.question("Enter a word to score: ");
   console.log("\n");
   return scoredWord;
};

let newPointStructure = transform(oldPointStructure);

function simpleScorer (simpleWord) {
   let score = 0;
   let printOut = "";

   for (let i = 0; i < simpleWord.length; i++) {
      score += 1;
      printOut += `Points for '${simpleWord[i]}': 1 \n`;
   }
   console.log(printOut);
   return score;
}

function vowelBonusScorer (vowelWord) {
   let score = 0;
   let printOut = "";
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   for (let i = 0; i < vowelWord.length; i++) {
      if (vowels.includes(vowelWord[i].toUpperCase())) {
         score += 3;
         printOut += `Points for '${vowelWord[i]}': 3 \n`;
      } else {
         score += 1;
         printOut += `Points for '${vowelWord[i]}': 1 \n`;
      }
   }
   console.log(printOut);
   return score;
}

function scrabbleScorer (scrabbleWord) {
   scrabbleWord = scrabbleWord.toLowerCase();
   let printOut = "";
   let score = 0
   
   for (let i = 0; i < scrabbleWord.length; i++) {
     for (item in newPointStructure) {
       if (item === (scrabbleWord[i])) {
         printOut += `Points for '${scrabbleWord[i]}': ${newPointStructure[item]}\n`;
         score += Number(newPointStructure[item]);
       } else if (item === ' ') {
         printOut += `Points for '${scrabbleWord[i]}': 0 }\n`;
       }
     }
   }
   console.log(printOut);
   return score;
 }


let simpleScrabble = {
   name : "Simple Score",
   description : "Each letter is worth 1 point.",
   scorerFunction : simpleScorer
}

let vowelScrabble = {
   name : "Bonus Vowels",
   description : "Vowels are 3 points, consonants are 1 point.",
   scorerFunction : vowelBonusScorer
}

let scrabbleScrabble = {
   name : "Scrabble",
   description : "The traditional scoring algorithm.",
   scorerFunction : scrabbleScorer
};

const scoringAlgorithms = [simpleScrabble, vowelScrabble, scrabbleScrabble];

function scorerPrompt(word) {
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} : ${scoringAlgorithms[i].name}`);
   }
   let response = input.question("\nWhich of the above scoring methods would you like to use? : ");
   if (response > 2 || response < 0) {
      console.log("\nERROR: That was not a valid entry.\n");
      return scorerPrompt(word);
   }
   console.log(`Your score for "${word}" is : ${scoringAlgorithms[Number(response)].scorerFunction(word)}`);
}

function transform(oldPointSystem) {
   let newScoreSystem = {};
   for (item in oldPointSystem) {
      let currentPointArray = oldPointSystem[item].slice();
      for (let i = 0; i < currentPointArray.length; i++) {
         newScoreSystem[currentPointArray[i].toLowerCase()] = Number(item);
      }
   }
   return newScoreSystem;
};

function runProgram() {
   scoredWord = initialPrompt();
   scorerPrompt(scoredWord);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};