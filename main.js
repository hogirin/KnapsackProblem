window.onload=function(){ 

    // Collection, a place for holding values you insert in the first place.
    let collection = [];
    document.getElementById("confirm").addEventListener("click", createkHTMLBlock);
    let inputElement = document.getElementById("inputElement");
    let hasCalculateButton = 0;

    function createkHTMLBlock(){
        
        // check for input value
        if (inputElement && inputElement.value) {
            
            // setup for some dynamic generated HTML
            let container = document.getElementById("container");
            var div = document.createElement("div");
            div.setAttribute("class","block");

            var textnode = document.createTextNode(inputElement.value);
            collection.push(inputElement.value);
            div.appendChild(textnode);
            container.appendChild(div);
            hasCalculateButton++;

        if (hasCalculateButton == 1) {
            generateCalculateButton();
            document.getElementById("calculateIt").addEventListener("click", thinkInSolutions);
        }


        // clear input
        inputElement.value= '';
        }
        
    }

    // Button to calculate buttons associated with the number of items in the collection.
    function generateCalculateButton(){
        var btn = document.createElement("button");
        btn.setAttribute("id", "calculateIt");
        btn.innerHTML = "calculate!";
        document.body.appendChild(btn);    
    }

    // Genetic algorithm doing the thinking.
    function thinkInSolutions(){
        let targetElement = document.getElementById("max");
        
        if (targetElement && targetElement.value) {
            let population = new Population(collection.length, collection.length * 4);
            population.calcFitness(collection);
            population.evaluate(parseInt(targetElement.value, 10));


            for (let i = 0; i < collection.length * 4; i++) { 
                population.createNextGeneration(20, collection);
                population.calcFitness(collection);
                population.evaluate(parseInt(targetElement.value, 10));
            }

            let bestOnes = population.getBestSolutions();

            /* 
            // A moment for verfication. To see all solutions generated.
            // This moment only one solution is shown.
            bestOnes.forEach(lid => {
                console.log(lid);
            });*/


            let blocks = document.getElementsByClassName("block");

            // Clear the yellow ones.
            for (let i = 0; i < blocks.length; i++) {
                blocks[i].style.backgroundColor = "white";;
            }

            // Paint the blocks containing a part of the solutions yellow.
            if (bestOnes.length > 0) {
                for (let i = 0; i < bestOnes[0].length; i++) {
                    if (bestOnes[0][i] == "1") {
                        blocks[i].style.backgroundColor = "yellow";
                    }
                }
            } else {
                console.log("No solutions available!");
            }
        } else {
            alert("Please, insert a max value! (Yes, it is necessary).");
        }
    }




  }

