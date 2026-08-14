export default {
  "meta": {
    "subject": "Computer Applications -- Class XI",
    "unit": "Chapter 15 -- Control Structure in JavaScript",
    "time": "2.30 hrs",
    "totalMarks": 47,
    "instructions": "Samacheer Kalvi -- Answer all questions"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "Part I -- MCQ (11 x 1)",
      "title": "Part I -- Choose the Correct Answer",
      "type": "mcq",
      "scoreMax": 11,
      "marksPer": 1,
      "sections": [
        {
          "label": "Control Structure in JavaScript",
          "questions": [
            {
              "id": "q1",
              "html": "Which conditional statement is used to transfer control from current statement to another?",
              "options": [
                "a) Branching",
                "b) Sequencing",
                "c) Looping",
                "d) Iterating"
              ],
              "answer": 0,
              "hint": "Branching transfers control from the current statement to another statement or construct, altering the execution sequence."
            },
            {
              "id": "q2",
              "html": "_______ statement can be used as an alternative to the if-else statement.",
              "options": [
                "a) While",
                "b) If",
                "c) Else-if",
                "d) Switch"
              ],
              "answer": 3,
              "hint": "The switch statement is an alternative to if-else, especially when testing all possible results of an expression."
            },
            {
              "id": "q3",
              "html": "Which statement in switch case is used to exit the statement once the appropriate choice is found?",
              "options": [
                "a) Exit",
                "b) Default",
                "c) Case",
                "d) Break"
              ],
              "answer": 3,
              "hint": "The break statement exits the switch case once a matching case has been executed."
            },
            {
              "id": "q4",
              "html": "Which of the following is NOT a looping statement?",
              "options": [
                "a) Switch",
                "b) While",
                "c) Do-While",
                "d) For"
              ],
              "answer": 0,
              "hint": "Switch is a branching statement, not a looping statement. The three loops in JavaScript are for, while, and do-while."
            },
            {
              "id": "q5",
              "html": "Which part of the for loop determines the number of times the loop will be iterated?",
              "options": [
                "a) First (initialization)",
                "b) Second (condition)",
                "c) Third (increment/decrement)",
                "d) Final"
              ],
              "answer": 1,
              "hint": "The second part of the for loop (the condition) determines how many times the loop will iterate."
            },
            {
              "id": "q6",
              "html": "Which of the following is NOT a branching statement?",
              "options": [
                "a) Loop",
                "b) If-else",
                "c) Switch",
                "d) For"
              ],
              "answer": 0,
              "hint": "Loop (for, while, do-while) is a repetitive/looping statement, not a branching statement. If-else and switch are branching statements."
            },
            {
              "id": "q7",
              "html": "What will be the output for: for(var n=0; n&lt;10; n++) { if(n==3) { break; } document.write(n); }",
              "options": [
                "a) 0 1 2",
                "b) 0 1 2 3",
                "c) 0 1 2 3 4",
                "d) 0, 1, 3"
              ],
              "answer": 0,
              "hint": "The loop prints n=0, 1, 2. When n=3, break executes and the loop exits. So output is 0 1 2."
            },
            {
              "id": "q8",
              "html": "In which loop is the condition evaluated BEFORE executing a statement?",
              "options": [
                "a) While",
                "b) Do-while",
                "c) Break",
                "d) Continue"
              ],
              "answer": 0,
              "hint": "In the while loop, the condition is evaluated BEFORE each iteration. In do-while, the condition is checked AFTER executing the body."
            },
            {
              "id": "q9",
              "html": "The _______ statement is especially useful when testing all the possible results of an expression.",
              "options": [
                "a) While",
                "b) Do-while",
                "c) Switch",
                "d) If"
              ],
              "answer": 2,
              "hint": "The switch statement tests all possible results of an expression using case labels."
            },
            {
              "id": "q10",
              "html": "In the _______ loop, the body is always executed at least once before the condition is evaluated.",
              "options": [
                "a) For",
                "b) While",
                "c) If",
                "d) Do-while"
              ],
              "answer": 3,
              "hint": "In the do-while loop, the body executes first, then the condition is checked. So the body always runs at least once."
            },
            {
              "id": "q11",
              "html": "x = 6 + '3'; document.write(x); What will be the output?",
              "options": [
                "a) 6",
                "b) 9",
                "c) 63",
                "d) Error"
              ],
              "answer": 2,
              "hint": "When + is used with a string ('3') and a number (6), JavaScript concatenates them. 6 + '3' = '63' (string concatenation)."
            }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "Part II -- Very Short (5 x 2)",
      "title": "Part II -- Very Short Answers",
      "type": "short_answer",
      "scoreMax": 10,
      "marksPer": 2,
      "sections": [
        {
          "label": "Very Short Answers",
          "questions": [
            {
              "id": "q12",
              "html": "What are the different types of control statements used in JavaScript?",
              "answer": "JavaScript has two types of control statements:\n\n1. Branching / Selection: Execute or skip statements based on a condition. Types: if, if-else, else-if, and switch. A branch transfers control from the current statement to another, altering the normal execution sequence.\n\n2. Looping / Repetitive: Execute the same block of code multiple times. Types: for loop, while loop, and do-while loop. Used when the same portion of code needs to execute repeatedly with slightly different values.",
              "hint": "Two types: Branching (if, if-else, else-if, switch) and Looping (for, while, do-while)."
            },
            {
              "id": "q13",
              "html": "What is meant by conditional statements in JavaScript?",
              "answer": "Conditional statements in JavaScript are statements that execute or skip one or more statements depending on the value of a specified conditional expression. They allow programs to make decisions and follow different execution paths based on whether a condition is true or false.\n\nConditional statements help alter the normal sequential execution of a program. Without them, programs execute line by line from top to bottom. With conditional statements, the program can branch to different code blocks based on conditions.\n\nTypes: if, if-else, else-if, switch.",
              "hint": "Conditional statements execute or skip code depending on a condition. They allow decision-making and alter normal sequential execution. Types: if, if-else, else-if, switch."
            },
            {
              "id": "q14",
              "html": "List out the various branching statements in JavaScript.",
              "answer": "The four branching statements in JavaScript are:\n\n1. if statement: Executes a block of code only if the condition is true.\n2. if-else statement: Executes one block if the condition is true, another block if false.\n3. else-if statement: Tests multiple conditions sequentially; used when there are more than two possible outcomes.\n4. switch statement: Tests an expression against multiple case labels; an alternative to if-else when testing all possible results of an expression. Includes break (exits case) and default (executes if no case matches).",
              "hint": "Four branching statements: if, if-else, else-if, switch. Switch uses case labels, break to exit, and default for no match."
            },
            {
              "id": "q15",
              "html": "Write the general syntax for the switch statement.",
              "answer": "General syntax of the switch statement:\n\nswitch (expression) {\n  case label1:\n    statements1;\n    break;\n  case label2:\n    statements2;\n    break;\n  case labeln:\n    statementsN;\n    break;\n  default:\n    statements;\n}\n\nHow it works: The expression is evaluated. The result is compared with each case label. If a match is found, that case's statements execute. The break statement exits the switch. If no case matches, the default block executes.",
              "hint": "switch(expr) { case label1: statements; break; case label2: statements; break; default: statements; }. Break exits the switch. Default = no match."
            },
            {
              "id": "q16",
              "html": "Differentiate the break and continue statements.",
              "answer": "break statement:\n- Terminates the loop (or switch) ENTIRELY and immediately.\n- Control jumps to the first statement after the loop.\n- The remaining iterations are skipped.\n- Example: In a for loop from 0 to 10, if break is executed when n==5, output is 0 1 2 3 4 (loop stops at 5).\n\ncontinue statement:\n- Skips the rest of the current iteration and jumps back to the loop condition check to start the next iteration.\n- The loop itself continues — only the current iteration is skipped.\n- Example: In a for loop from 0 to 10, if continue is executed when n==5, output is 0 1 2 3 4 6 7 8 9 10 (5 is skipped but loop continues).",
              "hint": "break = exits loop entirely (stops completely). continue = skips current iteration, goes to next iteration (loop still runs)."
            }
          ]
        }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Short (4 x 3)",
      "title": "Part III -- Short Answers",
      "type": "brief_answer",
      "scoreMax": 12,
      "marksPer": 3,
      "sections": [
        {
          "label": "Short Answers",
          "questions": [
            {
              "id": "q17",
              "html": "What is if statement? Write its types.",
              "answer": "The if statement is the fundamental control statement in JavaScript that allows making decisions and executing statements conditionally.\n\nTypes:\n\n1. if statement (simple): Executes a block only if the condition is true. No action when false.\nSyntax: if (condition) { true block; }\n\n2. if-else statement: Executes one block if true, the else block if false.\nSyntax: if (expression) { true block; } else { false block; }\n\n3. else-if statement: Tests multiple conditions in a chain. Each else-if checks a new condition if the previous was false. Ends with an optional else.\nSyntax: if (cond1) { } else if (cond2) { } else if (cond3) { } else { }",
              "hint": "if = executes if condition true. if-else = two paths (true/false). else-if = multiple conditions in chain. Include syntax for each."
            },
            {
              "id": "q18",
              "html": "What is called a loop and what are its types?",
              "answer": "A loop is a programming construct that executes the same portion of code repeatedly — usually with slightly different values each time — as long as a condition remains true.\n\nJavaScript supports three types of loops:\n\n1. for loop: A rigid, pre-determined structure that loops a set number of times. Has three parts: initialization (sets control variable), condition (when to stop), and increment/decrement (changes control variable).\nSyntax: for (init; condition; incr/decr) { body; }\n\n2. while loop: Executes a block repeatedly as long as the condition is true. Condition is evaluated BEFORE each iteration. If the condition is initially false, the body never executes.\nSyntax: while (condition) { body; }\n\n3. do-while loop: Similar to while, but the condition is evaluated AFTER each iteration. The body always executes at least once.\nSyntax: do { body; } while (condition);",
              "hint": "Loop = repeated execution of a code block. Three types: for (pre-set count, 3 parts), while (condition before), do-while (condition after, runs at least once)."
            },
            {
              "id": "q19",
              "html": "Differentiate between while and do-while statements.",
              "answer": "while loop:\n- Condition is evaluated BEFORE executing the loop body.\n- If the condition is false at the start, the body NEVER executes.\n- Syntax: while (condition) { body; }\n- Example: var n=0; while(n<=5) { document.write(n+' '); n++; }\n  (If n=6 initially, nothing prints)\n\ndo-while loop:\n- Condition is evaluated AFTER executing the loop body.\n- The body ALWAYS executes at least ONCE, even if the condition is initially false.\n- Syntax: do { body; } while (condition);\n- Example: var n=0; do { document.write(n+' '); n+=2; } while(n<=10);\n  (Always prints at least the first value)\n\nKey difference: In while, condition first — body may never run. In do-while, body first — guaranteed to run at least once.",
              "hint": "while: condition BEFORE body (may not execute at all). do-while: condition AFTER body (executes at least once). Show code example for each."
            },
            {
              "id": "q20",
              "html": "If age is given as 20, what message will be displayed for: if(age>=18) { alert('Eligible'); } else { alert('Not Eligible'); }",
              "answer": "If age = 20:\n\nThe condition age >= 18 is evaluated: 20 >= 18 is TRUE.\n\nTherefore, the if block executes and the message displayed is:\n'You are eligible to get Driving licence'\n\nThe else block is skipped entirely because the if condition was true.\n\nExplanation of how if-else works:\n- The expression (age >= 18) is evaluated.\n- Since 20 >= 18 evaluates to true, control enters the if block.\n- The alert in the if block fires with the eligibility message.\n- The else block is not executed at all.",
              "hint": "age=20. Condition: 20>=18 = true. So the if block executes → 'You are eligible to get Driving licence'. The else block is skipped."
            }
          ]
        }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Long (2 x 7)",
      "title": "Part IV -- Explain in Detail",
      "type": "long_essay",
      "scoreMax": 14,
      "marksPer": 7,
      "sections": [
        {
          "label": "Long Answers",
          "questions": [
            {
              "id": "q21",
              "html": "Explain the for loop with example.",
              "answer": "The for loop is a flexible, rigid structure that loops for a pre-set number of times. It is the most commonly used loop in JavaScript.\n\nSyntax:\nfor (initialization; condition; increment/decrement) {\n  body of the loop;\n}\n\nThree parts (separated by semicolons):\n1. Initialization: Declares and initialises the control variable. Executed once before the loop starts.\n2. Condition: Evaluated before each iteration. If true, the body executes. If false, the loop ends.\n3. Increment/Decrement: Executed at the end of each iteration. Changes the control variable.\n\nExecution flow: Initialize → Check condition → If true: execute body → Increment/Decrement → Check condition again → ... → If false: exit loop.\n\nExample: Print multiplication table\n<script language='javascript' type='text/javascript'>\nvar no1 = prompt('Please enter Table You want:', '0');\ndocument.write('<h2> Multiplication for your need </h2>');\nfor (var no2 = 0; no2 <= 10; no2++) {\n  document.write(no1 + ' x ' + no2 + ' = ' + no1 * no2 + '<br>');\n}\n</script>\n\nOutput (if user enters 3):\n3 x 0 = 0\n3 x 1 = 3\n3 x 2 = 6 ... 3 x 10 = 30\n\nbreak and continue: break exits the loop entirely; continue skips the current iteration and goes to the next.",
              "hint": "for(init; condition; incr) { body; }. Three parts: initialization, condition (how many times), increment/decrement. Show execution flow. Write full multiplication table program with output."
            },
            {
              "id": "q22",
              "html": "Explain the switch case statement with example.",
              "answer": "The switch statement is an alternative to if-else, especially useful when testing all possible results of an expression.\n\nSyntax:\nswitch (expression) {\n  case label1:\n    statements1;\n    break;\n  case label2:\n    statements2;\n    break;\n  default:\n    statements;\n}\n\nHow it works:\n1. The expression is evaluated.\n2. The result is compared against each case label.\n3. If a match is found, that case's statements execute.\n4. The break statement exits the switch (without it, execution falls through to the next case).\n5. The default case executes if no case matches.\n\nExample: Grade using switch\n<script language='javascript' type='text/javascript'>\nvar grade = 0;\nvar marks = prompt('Please enter your marks/100:', '0');\nif (marks > 90) { grade = 1; }\nelse if (marks > 70) { grade = 2; }\nelse if (marks > 50) { grade = 3; }\nelse if (marks > 40) { grade = 4; }\nelse { grade = 5; }\n\nswitch (grade) {\n  case 1: document.write('Your Grade is Outstanding..'); break;\n  case 2: document.write('Your Grade is Excellent..'); break;\n  case 3: document.write('Your Grade is Good..'); break;\n  case 4: document.write('Your Grade is Satisfactory..'); break;\n  default: document.write('Your Grade is Poor -- re-appear Exam..');\n}\n</script>\n\nIf marks = 98, grade = 1, output: 'Your Grade is Outstanding..'",
              "hint": "switch(expr) evaluates expression, matches against case labels, executes matching block, break exits. default = no match. Write full grade program: prompt marks, set grade with if-else, use switch to display grade message."
            }
          ]
        }
      ]
    }
  ]
}
