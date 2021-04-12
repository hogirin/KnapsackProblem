

class Population{

    constructor(lengte, lengthPopulation){
        this.optimalSolutionScore = 0;  // Benchmark to recruit optimal solutions.
        this.optimalMembers = [];      // Best solutions encoded.
        this.optimalSolutionValues = []; // Associated values to the best encoded solutions.
        this.members = [];    // Members of the population.

        for (let i = 0; i < lengthPopulation; i++) {
            let dna = "";
            for (let j = 0; j < lengte; j++) {
                dna += Math.floor(Math.random() * 2);  // generate a 0 or a 1 in string format.
            }
            this.members.push(dna);
        }
    }

    // Arrange all current results.
    calcFitness(verzameling) {
        this.values = [];
        this.members.forEach(member => {
           let value = 0;
           for (let i = 0; i < member.length; i++) {
                if (member[i] === "1") {
                    value += parseInt(verzameling[i], 10);
                }
            }
            this.values.push(value);
       });
    }

    // Decide what to do.
    evaluate(doel){
        this.solutions = [];
        let counter = 0;

        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i] <= doel) {
                this.solutions.push(this.members[i]);
                counter++;

                // A check with the best (the best seen so far).
                if (this.values[i] > this.optimalSolutionScore) {
                    this.optimalSolutionScore = this.values[i];
                    this.optimalSolutionValues.push(this.values[i]);
                    this.optimalMembers.push(this.members[i]);
                } else if(this.values[i] === this.optimalSolutionScore) {

                    // Loop through to check if it is a unique member.
                    let uniqueMember = true;
                    for (let k = 0; k < this.optimalMembers.length; k++) {
                        if (this.optimalMembers[k] === this.members[i]) {
                            uniqueMember = false;
                        };
                    }
                    // Add if unique in encoding.
                    if (uniqueMember) {
                        this.optimalMembers.push(this.members[i]);
                        this.optimalSolutionValues.push(this.values[i]);
                    }
                }
            }
        }
    }
    
    // Next round, new opportunities!
    createNextGeneration(lengthPopulation){

        if(this.solutions.length !== 0){
            
            // Place to fill with new possible solutions.
            let nextpool = [];

            // only the best go on.
            this.solutions.forEach(solution => {

                // only mutation (discovery within existing solutions)
                    let mutatedSolution = "";
                    for (let i = 0; i < solution.length; i++) {
                        if (Math.random() < 0.15) {
                            mutatedSolution += solution[i] === "0" ? "1" : "0";
                        }else {
                            mutatedSolution += solution[i];
                        }
                    }
                    nextpool.push(mutatedSolution);
            });

            // if population is not complete yet
            while (true) {
                if (nextpool.length < lengthPopulation) {

                    // crossover (50/50). So half part of one solution and the other part of another solution.
                    let parentOne = this.solutions[Math.floor(Math.random() * this.solutions.length)];
                    let parentTwo = this.solutions[Math.floor(Math.random() * this.solutions.length)];
                    let child = this.crossover(parentOne, parentTwo);
                    nextpool.push(child);
                } else {
                    break;
                }
            }
            this.members = nextpool;
        } else {
                // No solutions found at all! So generate new candidates!
              let newMembers = [];
              for (let i = 0; i < lengthPopulation; i++) {
                  let dna = "";
                  for (let j = 0; j < this.members[0].length; j++) {
                      dna += Math.floor(Math.random() * 2);
                  }
                  newMembers.push(dna);
              }
              this.members = newMembers;
          }
    }


    // mix some offsprings.
    crossover(dnaEen, dnaTwee){
        let dnaChild = "";
        for (let i = 0; i < dnaEen.length; i++) {
            if (i > Math.floor(dnaEen.length/2)) {
                // mutate
                if (Math.random() < 0.15) {
                  dnaChild += dnaEen[i] === "0" ? "1" : "0";
                } else {
                    dnaChild += dnaEen[i];
                }
            }else {
                // mutate
                if (Math.random() < 0.15) {
                    dnaChild += dnaTwee[i] === "0" ? "1" : "0";
                  } else {
                        dnaChild += dnaTwee[i];
                  }
            }
        }
        return dnaChild;
    }

    // Get the best solutions!
    getBestSolutions(){
        let besten = [];
        let decrementor = this.optimalMembers.length - 1;
        while (decrementor > 0) {
            if (this.optimalSolutionValues[decrementor] == this.optimalSolutionScore) {
                besten.push(this.optimalMembers[decrementor]);
                decrementor--;
            } else {
                break;
            }
        }
        return besten;
    }
}