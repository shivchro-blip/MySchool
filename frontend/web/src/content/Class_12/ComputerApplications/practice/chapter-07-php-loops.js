// frontend/web/src/content/Class_12/ComputerApplications/practice/chapter-07-php-loops.js

export default {
  meta: {
    subject: `Computer Applications -- Class XII`,
    unit: `Chapter 7 -- Loops in PHP`,
    time: `3.00 hrs`,
    totalMarks: 47,
    instructions: `Samacheer Kalvi -- Answer all questions`,
  },

  parts: [
    {
      id: `p1`,
      navLabel: `Part I -- MCQ (20 x 1)`,
      title: `Part I -- Objective Type`,
      type: `mcq`,
      scoreMax: 20,
      marksPer: 1,
      sections: [
        {
          label: `Loops`,
          questions: [
            {
              id: `q1`,
              html: `Which of the following is NOT a type of loop statement in PHP?`,
              options: [`a) for`, `b) if...else`, `c) while`, `d) do...while`],
              answer: 1,
              hint: `if...else is a conditional statement, not a loop. The 4 loop types in PHP are: for, while, do...while, and foreach.`,
            },
            {
              id: `q2`,
              html: `What type of loop is "for loop" in PHP?`,
              options: [`a) Entry-Check Loop`, `b) Exit-Check Loop`, `c) Counter Loop`, `d) Iteration Loop`],
              answer: 0,
              hint: `The for loop is an entry-check loop — it checks the condition BEFORE executing the code block each time.`,
            },
            {
              id: `q3`,
              html: `What is the correct syntax for a for loop in PHP?`,
              options: [
                `a) for(initialization; condition; increment) { // code }`,
                `b) foreach(initialization; condition; decrement) { // code }`,
                `c) while(condition)`,
                `d) do{...}while(condition)`,
              ],
              answer: 0,
              hint: `for loop syntax: for(initialization; condition; increment) { // code }. Three parts separated by semicolons inside the parentheses.`,
            },
            {
              id: `q4`,
              html: `What are the three parts of the for loop syntax in PHP?`,
              options: [
                `a) initialization, condition, increment`,
                `b) initialization, code block, condition`,
                `c) code block, condition, increment`,
                `d) condition, initialization, code block`,
              ],
              answer: 0,
              hint: `The three parts of a for loop are: initialization (runs once), condition (checked before each iteration), increment/decrement (runs after each iteration).`,
            },
            {
              id: `q5`,
              html: `When is the 'initialization' part of a for loop executed?`,
              options: [
                `a) Before each iteration`,
                `b) After each iteration`,
                `c) Only once at the beginning of the loop`,
                `d) Only once at the end of the loop`,
              ],
              answer: 2,
              hint: `The initialization part runs ONLY ONCE at the very beginning of the loop. It sets up the loop variable.`,
            },
            {
              id: `q6`,
              html: `What is the purpose of the 'increment' part of a for loop?`,
              options: [
                `a) To initialize variables`,
                `b) To update variables`,
                `c) To check the condition`,
                `d) To execute the code block`,
              ],
              answer: 1,
              hint: `The increment/decrement part runs AFTER each iteration and is used to update the loop variable (e.g., $i++ increases $i by 1).`,
            },
            {
              id: `q7`,
              html: `What type of loop is "while loop" in PHP?`,
              options: [`a) Entry-Check Loop`, `b) Exit-Check Loop`, `c) Counter Loop`, `d) Iteration Loop`],
              answer: 0,
              hint: `The while loop is an entry-check loop — like the for loop, it checks the condition BEFORE executing the code block.`,
            },
            {
              id: `q8`,
              html: `What type of loop is "do...while loop" in PHP?`,
              options: [`a) Entry-Check Loop`, `b) Exit-Check Loop`, `c) Counter Loop`, `d) Iteration Loop`],
              answer: 1,
              hint: `The do...while loop is an exit-check loop — it checks the condition AFTER executing the code block (so it always runs at least once).`,
            },
            {
              id: `q9`,
              html: `Which looping structure should be used to iterate over elements of an array in PHP?`,
              options: [`a) for loop`, `b) while loop`, `c) do...while loop`, `d) foreach loop`],
              answer: 3,
              hint: `foreach is specifically designed for iterating over arrays. It automatically goes through each element without needing an index.`,
            },
            {
              id: `q10`,
              html: `What is the output of: $array = array(1, 2, 3, 4, 5); foreach ($array as $value) { echo $value; }`,
              options: [`a) 1 2 3 4 5`, `b) 5 4 3 2 1`, `c) 12345`, `d) None of the above`],
              answer: 2,
              hint: `foreach iterates through the array in order. echo $value outputs each element without spaces. So output is 12345 (no spaces between numbers).`,
            },
            {
              id: `q11`,
              html: `The minimum number of times a do...while loop executes is:`,
              options: [`a) 0`, `b) 1`, `c) 2`, `d) Depends on condition`],
              answer: 1,
              hint: `do...while always executes at least ONCE because the code block runs BEFORE the condition is checked.`,
            },
            {
              id: `q12`,
              html: `The minimum number of times a while loop executes is:`,
              options: [`a) 0`, `b) 1`, `c) 2`, `d) Depends on loop variable`],
              answer: 0,
              hint: `A while loop may execute ZERO times if the condition is false from the very beginning — the code block is skipped entirely.`,
            },
            {
              id: `q13`,
              html: `In a for loop, when is the condition evaluated?`,
              options: [
                `a) Only once at the beginning`,
                `b) Before each iteration`,
                `c) After each iteration`,
                `d) Only at the end`,
              ],
              answer: 1,
              hint: `The condition is evaluated BEFORE EACH iteration. If true, the code executes. If false, the loop stops.`,
            },
            {
              id: `q14`,
              html: `What is the output of: for ($i = 1; $i <= 5; $i++) { echo $i; }`,
              options: [`a) 12345`, `b) 54321`, `c) 1 2 3 4 5`, `d) 0 1 2 3 4`],
              answer: 0,
              hint: `The loop starts at $i=1, runs while $i<=5, increments $i after each iteration. echo outputs each value without spaces. Output: 12345.`,
            },
            {
              id: `q15`,
              html: `In a while loop, what happens when the condition becomes false?`,
              options: [
                `a) The loop executes one more time`,
                `b) The loop is terminated`,
                `c) The loop restarts from the beginning`,
                `d) The program terminates`,
              ],
              answer: 1,
              hint: `When the condition is false in a while loop, the loop is TERMINATED — execution moves to the next statement after the loop.`,
            },
            {
              id: `q16`,
              html: `Which loop is most suitable when you know exactly how many times to repeat?`,
              options: [`a) while loop`, `b) do...while loop`, `c) for loop`, `d) foreach loop`],
              answer: 2,
              hint: `The for loop is best when you know the exact number of iterations in advance. while is better for unknown iterations.`,
            },
            {
              id: `q17`,
              html: `The foreach loop iterates over:`,
              options: [`a) Numbers only`, `b) Strings only`, `c) Array elements`, `d) Integer ranges`],
              answer: 2,
              hint: `foreach is specifically designed to iterate over array elements. It works with both indexed and associative arrays.`,
            },
            {
              id: `q18`,
              html: `In a do...while loop, where is the condition checked?`,
              options: [
                `a) Before the code block executes`,
                `b) After the code block executes`,
                `c) During code execution`,
                `d) Never checked`,
              ],
              answer: 1,
              hint: `In do...while, the condition is checked AFTER the code block executes. This is why it's called an exit-check loop.`,
            },
            {
              id: `q19`,
              html: `To print numbers from 5 to 1 in descending order using a for loop, which is correct?`,
              options: [
                `a) for ($i = 1; $i <= 5; $i++)`,
                `b) for ($i = 5; $i >= 1; $i--)`,
                `c) for ($i = 5; $i <= 1; $i++)`,
                `d) for ($i = 1; $i >= 5; $i--)`,
              ],
              answer: 1,
              hint: `Start at $i=5, continue while $i>=1, decrement $i-- after each step. This goes from 5 down to 1.`,
            },
            {
              id: `q20`,
              html: `In foreach with an associative array, the syntax foreach($arr as $key => $value) gives:`,
              options: [
                `a) Only the values`,
                `b) Only the keys`,
                `c) Both keys and values`,
                `d) The array length`,
              ],
              answer: 2,
              hint: `foreach($arr as $key => $value) provides both the key and the value for each element. Use this for associative arrays.`,
            },
          ],
        },
      ],
    },

    {
      id: `p2`,
      navLabel: `Part II -- Short Answers (5 x 2)`,
      title: `Part II -- Short Answer Questions`,
      type: `short-essay`,
      scoreMax: 10,
      marksPer: 2,
      questions: [
        {
          q: `What is the purpose of a loop in PHP?`,
          ans: `A loop is a control structure in PHP that executes a set of instructions (a block of code) repeatedly for a certain number of times or until a certain condition is met. Loops are used to avoid writing the same code multiple times. PHP supports four types of loops: for loop, while loop, do...while loop, and foreach loop. Example: To print numbers 1 to 100, instead of writing 100 echo statements, you use a loop to do it in 3 lines.`,
        },
        {
          q: `Write the syntax for a 'for' loop in PHP.`,
          ans: `Syntax for the for loop in PHP:\nfor (initialization; condition; increment/decrement)\n{\n//code to be executed;\n}\nThree parts: 1. initialization — executed only once at the beginning, used to set up the loop variable (e.g., $i = 1). 2. condition — evaluated before each iteration; if true the code runs, if false the loop stops (e.g., $i <= 5). 3. increment/decrement — executed after each iteration to update the loop variable (e.g., $i++).`,
        },
        {
          q: `Write the syntax for a 'while' loop in PHP.`,
          ans: `Syntax for the while loop in PHP:\nwhile (condition)\n{\n//code to be executed;\n}\nThe condition is evaluated at the BEGINNING of each iteration. If the condition is true, the code block executes. If the condition is false, the loop terminates. The while loop is an entry-check loop. If the condition is false from the start, the code block may not execute at all (minimum 0 iterations).`,
        },
        {
          q: `How is the 'condition' in a while loop evaluated?`,
          ans: `In a while loop, the condition is evaluated at the BEGINNING of each iteration (before the code block executes). If the condition is true, the code block inside the curly braces executes. After execution, the condition is evaluated again. This continues until the condition becomes false, at which point the loop terminates. If the condition is false from the very beginning, the code block is never executed — the while loop may run zero times.`,
        },
        {
          q: `What is the output of: $i = 1; while ($i <= 5) { echo $i . "<br>"; $i++; }`,
          ans: `Output:\n1\n2\n3\n4\n5\nExplanation: $i starts at 1. The while condition checks if $i <= 5. Since 1 <= 5 is true, it prints 1 and increments $i to 2. This continues until $i becomes 6, when 6 <= 5 is false and the loop terminates. Each number is followed by a <br> HTML tag (line break), so each number appears on a new line.`,
        },
      ],
    },

    {
      id: `p3`,
      navLabel: `Part III -- Brief Answers (3 x 3)`,
      title: `Part III -- Brief Answer Questions`,
      type: `short-essay`,
      scoreMax: 9,
      marksPer: 3,
      questions: [
        {
          q: `Describe the three parts of a for loop in PHP (initialization, condition and increment) and explain their purpose.`,
          ans: `The three parts of a for loop in PHP:\n\n1. Initialization: Executed ONLY ONCE at the very beginning of the loop. Used to initialize the loop variable before the loop starts. Example: $i = 1 sets the starting value.\n\n2. Condition: Evaluated BEFORE EACH iteration of the loop. If the condition is true, the code block executes. If the condition is false, the loop terminates immediately. Example: $i <= 5 — the loop runs as long as $i is 5 or less.\n\n3. Increment/Decrement: Executed AFTER EACH iteration. Used to update the loop variable so the loop makes progress toward the termination condition. Example: $i++ increases $i by 1 after each iteration. Without this, the loop would run forever (infinite loop).`,
        },
        {
          q: `Write a PHP code to print 1 to 10 numbers in ascending order using for loop.`,
          ans: `PHP code to print 1 to 10 in ascending order:\n\n<?php\nfor ($i = 1; $i <= 10; $i++)\n{\necho $i . "<br>";\n}\n?>\n\nOutput:\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n\nExplanation: $i starts at 1. Condition $i <= 10 is checked before each iteration. If true, $i is printed followed by a line break. $i++ increments $i by 1. Loop runs until $i becomes 11, when the condition is false.`,
        },
        {
          q: `Explain the difference between while loop and do...while loop in PHP.`,
          ans: `Differences between while and do...while loops:\n\n1. Execution Order:\nwhile loop: First evaluates the condition. If true, executes the code block. If false, terminates without executing.\ndo...while loop: First executes the code block. Then evaluates the condition. If true, repeats. If false, terminates.\n\n2. Minimum Number of Iterations:\nwhile loop: May execute ZERO times if the condition is false from the beginning.\ndo...while loop: ALWAYS executes at least ONCE, even if the condition is false — because the code runs before the condition is checked.\n\n3. Classification:\nwhile = entry-check loop (condition at entry/start).\ndo...while = exit-check loop (condition at exit/end).\n\nExample showing the difference: If $i = 10 and condition is $i <= 5:\nwhile ($i <= 5) { echo $i; } → Output: nothing (condition false from start).\ndo { echo $i; } while ($i <= 5); → Output: 10 (runs once before checking).`,
        },
      ],
    },

    {
      id: `p4`,
      navLabel: `Part IV -- Long Essays (2 x 4)`,
      title: `Part IV -- Detailed Answer Questions`,
      type: `long-essay`,
      scoreMax: 8,
      marksPer: 4,
      questions: [
        {
          q: `Explain 'for' loop with example.`,
          ans: `The for loop is called an entry-check loop. It is used to execute a block of code a specific number of times.\n\nSyntax:\nfor (initialization; condition; increment/decrement)\n{\n//code to be executed;\n}\n\nHow it works:\n1. initialization runs once at the start.\n2. condition is checked before each iteration — if true, code runs; if false, loop stops.\n3. increment/decrement runs after each iteration.\n\nExample 1 — Print 1 to 5 in ascending order:\n<?php\nfor ($i = 1; $i <= 5; $i++)\n{\necho $i . "<br>";\n}\n?>\nOutput: 1 2 3 4 5 (each on a new line)\n\nExample 2 — Print 5 to 1 in descending order:\n<?php\nfor ($i = 5; $i >= 1; $i--)\n{\necho $i . "<br>";\n}\n?>\nOutput: 5 4 3 2 1\n\nTrace for Example 1:\n- $i=1: 1<=5 true → print 1 → $i becomes 2\n- $i=2: 2<=5 true → print 2 → $i becomes 3\n- ... continues ...\n- $i=5: 5<=5 true → print 5 → $i becomes 6\n- $i=6: 6<=5 false → loop terminates`,
        },
        {
          q: `Explain 'foreach' loop with examples.`,
          ans: `The foreach loop is used specifically to iterate over elements of an array. It is the simplest way to process every element in an array without needing index management.\n\nSyntax for indexed arrays:\nforeach ($array as $value)\n{\n//code to be executed;\n}\n\nSyntax for associative arrays:\nforeach ($array as $key => $value)\n{\n//code to be executed;\n}\n\nHow it works: The foreach loop automatically assigns each element's value to $value (and key to $key for associative arrays) in each iteration. It stops automatically when all elements are processed.\n\nExample 1 — Iterate indexed array:\n<?php\n$array = array(1, 2, 3, 4, 5);\nforeach ($array as $value)\n{\necho $value . "<br>";\n}\n?>\nOutput: 1 2 3 4 5 (each on a new line)\n\nExample 2 — Iterate associative array:\n<?php\n$array = array("a" => 1, "b" => 2, "c" => 3);\nforeach ($array as $key => $value)\n{\necho $key . " => " . $value . "<br>";\n}\n?>\nOutput:\na => 1\nb => 2\nc => 3\n\nWhy use foreach? It is simpler than a for loop for arrays — no need to track index or array length. Particularly useful for performing actions on each element such as printing, summing, or modifying values.`,
        },
      ],
    },
  ],
}
