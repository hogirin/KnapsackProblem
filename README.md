# About the Knapsack problem

The knapsack problem is a problem where the amount of items and their sum of values are weighed up. 
This balance needs to fulfil a limit.  
You can compare it like a journey through the dessert for a couple of days and you are limited to a certain weight you can carry.
The next question arises: How many items can I carry? Supposing you want the biggest amount of items.

# About the Genetic Algorithm

The mechanism I built to solve the problem is written in Javascript.
I used a genetic algorithm to do the job. This is a algorithm that searches for solutions (on my terms, not just one!). 
By creating possible solutions, mix some solutions with eachother (crossover function) or alter some parts of a solution (mutate function). 
It is said the innerworkings of this kind of algorithms is copied from biological processes in nature (like viruses). 

# About my work and interest
Since I decided to take multiple equal solutions into account, I decided to give just one of the possible solutions (when pressing "Calculate!").
The solutions are fine-tuned to reach the limit, but if this is not possible, the next best solution is calculated.
The mutation rate is 15% and crossover is one half of one solution and the other half of another solution (50/50).
Tested on combinations of 6 items with a population of 20 and iteration count of 10. The chances to get a solution from a pool with all possible solutions is about 70% (executed the program about 1000 times).
I like the way the algorithm, like this one, can solve problems that are not obvious for human thinking (like A.I). Especially when the algorithm comes up with a solution you did not think of.

I hope you like it!

