export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 6 -- Control Structures",
    "time": "3.00 hrs",
    "totalMarks": 49,
    "instructions": "Samacheer Kalvi -- Answer all questions"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "Part I -- MCQ (10 x 1)",
      "title": "Part I -- Choose the Correct Answer",
      "type": "mcq",
      "scoreMax": 10,
      "marksPer": 1,
      "sections": [
        {
          "label": "Control Structures",
          "questions": [
            { "id": "q1", "html": "How many important control structures are there in Python?", "options": ["a) 3", "b) 4", "c) 5", "d) 6"], "answer": 0, "hint": "Sequential, Alternative (Branching), and Iterative -- three control structures." },
            { "id": "q2", "html": "elif can be considered to be abbreviation of", "options": ["a) nested if", "b) if..else", "c) else if", "d) if..elif"], "answer": 2, "hint": "elif is short for 'else if'." },
            { "id": "q3", "html": "What plays a vital role in Python programming?", "options": ["a) Statements", "b) Control", "c) Structure", "d) Indentation"], "answer": 3, "hint": "Indentation defines code blocks in Python, replacing curly braces." },
            { "id": "q4", "html": "Which statement is generally used as a placeholder?", "options": ["a) continue", "b) break", "c) pass", "d) goto"], "answer": 2, "hint": "pass is a null statement used as a placeholder when a block must exist but do nothing yet." },
            { "id": "q5", "html": "The condition in the if statement should be in the form of", "options": ["a) Arithmetic or Relational expression", "b) Arithmetic or Logical expression", "c) Relational or Logical expression", "d) Arithmetic"], "answer": 2, "hint": "if-condition must evaluate to True/False, so it uses Relational or Logical expressions." },
            { "id": "q6", "html": "Which of the following is known as definite loop?", "options": ["a) do..while", "b) while", "c) for", "d) if..elif"], "answer": 2, "hint": "for is a definite loop since the number of iterations is known in advance." },
            { "id": "q7", "html": "What is the output? i=1; while True: if i%3==0: break; print(i,end=' '); i+=1", "options": ["a) 1 2", "b) 1 2 3", "c) 1 2 3 4", "d) 1 2 4"], "answer": 0, "hint": "i=1 prints, i=2 prints, i=3 triggers break before printing -- output is '1 2'." },
            { "id": "q8", "html": "What is the output? T=1; while T: print(True); break", "options": ["a) False", "b) True", "c) 0", "d) 1"], "answer": 1, "hint": "T=1 is truthy, so the loop runs once printing True, then breaks." },
            { "id": "q9", "html": "Which amongst this is not a jump statement?", "options": ["a) for", "b) pass", "c) continue", "d) break"], "answer": 0, "hint": "for is a looping construct, not a jump statement -- break, continue, pass are the jump statements." },
            { "id": "q10", "html": "Which punctuation should be used in the blank? if <condition>_  statements-block 1  else: statements-block 2", "options": ["a) ;", "b) :", "c) ::", "d) !"], "answer": 1, "hint": "A colon (:) follows the if condition, just like after else." }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "Part II -- Short Answers (5 x 2)",
      "title": "Part II -- Short Answer Questions",
      "type": "short-essay",
      "scoreMax": 10,
      "marksPer": 2,
      "instruction": "Answer in 2-3 sentences.",
      "questions": [
        { "q": "List the control structures in Python.", "ans": "The three control structures in Python are: Sequential (statements executed one after another), Alternative or Branching (if, if-else, if-elif-else), and Iterative or Looping (while loop, for loop)." },
        { "q": "Write a note on break statement.", "ans": "The break statement terminates the loop containing it, transferring control to the statement immediately after the loop's body. If used inside a nested loop, break terminates only the innermost loop. Note that if a loop is exited via break, its optional else part is not executed." },
        { "q": "Write the syntax of if..else statement.", "ans": "if <condition>:\n    statements-block 1\nelse:\n    statements-block 2\n\nIf the condition is true, statements-block 1 executes; otherwise statements-block 2 executes." },
        { "q": "Define control structure.", "ans": "A control structure (or control statement) is a program statement that causes a jump of control from one part of the program to another. These are compound statements used to alter the normal sequential flow of a process, depending on its state." },
        { "q": "Write a note on range() in loop.", "ans": "range() is a built-in function used to generate a series of values between two numeric intervals, commonly used with the for loop. Its syntax is range(start, stop, [step]) -- start is the initial value, stop is the final value (the range works up to stop-1), and step is an optional increment value." }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Brief Answers (3 x 3)",
      "title": "Part III -- Brief Answer Questions",
      "type": "short-essay",
      "scoreMax": 9,
      "marksPer": 3,
      "instruction": "Answer in 4-6 sentences.",
      "questions": [
        { "q": "Write a program to display: A / A B / A B C / A B C D / A B C D E", "ans": "s = 'ABCDE'\nfor i in range(len(s)):\n    for j in range(i+1):\n        print(s[j], end=' ')\n    print()\n\nExplanation: The outer loop controls how many letters appear on each line (from 1 up to 5). The inner loop prints letters from the string s, from index 0 up to the current outer index i, building up one more letter per line." },
        { "q": "Write a note on if..else structure.", "ans": "The if..else statement provides two possibilities of execution -- if the condition is true, statements-block 1 (the 'if' body) executes; if false, statements-block 2 (the 'else' body) executes instead. Only one of the two blocks ever runs for a given execution, and the condition determines which one. Python also allows a compact single-line form: variable = variable1 if condition else variable2." },
        { "q": "Using if..else..elif statement write a suitable program to display largest of 3 numbers.", "ans": "a = int(input('Enter first number: '))\nb = int(input('Enter second number: '))\nc = int(input('Enter third number: '))\nif a>=b and a>=c:\n    print('Largest is', a)\nelif b>=a and b>=c:\n    print('Largest is', b)\nelse:\n    print('Largest is', c)\n\nThis checks each number against both others using and, and the first true elif branch found determines the largest; if neither a nor b qualifies, c must be the largest by elimination." }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Explain in Detail (4 x 5)",
      "title": "Part IV -- Long Answer Questions",
      "type": "long-essay",
      "scoreMax": 20,
      "marksPer": 5,
      "instruction": "Answer in detail.",
      "questions": [
        {
          "q": "Write a detailed note on for loop.",
          "ans": "The for loop is known as a definite loop, because the programmer knows exactly how many times the loop will execute. Syntax:\n\nfor counter_variable in sequence:\n    statements-block 1\n[else:\n    statements-block 2]\n\nThe for...in statement iterates over a sequence of objects (a string, tuple, list, or range) -- the control variable takes each item of the sequence in turn, executing the block, until the last item is reached.\n\nThe range() function is commonly used to generate sequences: range(start, stop, [step]). For example, range(2,10,2) generates 2,4,6,8. The optional else part executes once after the loop finishes normally (i.e., not via a break).\n\nExample -- sum of numbers 1 to 100:\nn = 100\nsum = 0\nfor counter in range(1, n+1):\n    sum = sum + counter\nprint('Sum:', sum)   # 5050\n\nfor loops can also be nested -- a loop placed within another loop -- commonly used to generate patterns like triangles or tables, where the outer loop controls rows and the inner loop controls columns."
        },
        {
          "q": "Write a detailed note on if..else..elif statement with suitable example.",
          "ans": "The if..elif..else construct is used to build a chain of conditions, avoiding deeply nested if statements. Syntax:\n\nif <condition-1>:\n    statements-block 1\nelif <condition-2>:\n    statements-block 2\nelse:\n    statements-block n\n\ncondition-1 is evaluated first; if true, statements-block1 runs and the rest is skipped. If false, condition-2 is checked, and so on. If none of the conditions are true, the final else block runs. There is no limit to the number of elif clauses, but the else clause (if present) must come last.\n\nExample -- grading system:\nm1 = int(input('Mark 1: '))\nm2 = int(input('Mark 2: '))\navg = (m1+m2)/2\nif avg>=80:\n    print('Grade: A')\nelif avg>=70:\n    print('Grade: B')\nelif avg>=60:\n    print('Grade: C')\nelif avg>=50:\n    print('Grade: D')\nelse:\n    print('Grade: E')\n\nThis is similar to the nested if statement used in C++, but Python's elif keyword makes multi-branch decisions cleaner and more readable."
        },
        {
          "q": "Write a program to display all 3-digit odd numbers.",
          "ans": "for num in range(100, 1000):\n    if num % 2 != 0:\n        print(num, end=' ')\n\nExplanation: The for loop iterates through every integer from 100 to 999 (the full range of 3-digit numbers, since range(100,1000) excludes 1000 itself). The if condition (num % 2 != 0) checks whether each number is odd (leaves a remainder when divided by 2) -- only odd numbers are printed, using end=' ' to keep them on one line separated by spaces."
        },
        {
          "q": "Write a program to display the multiplication table for a given number.",
          "ans": "n = int(input('Enter a number: '))\nfor i in range(1, 11):\n    print(n, 'x', i, '=', n*i)\n\nExplanation: The program first reads a number n from the user. The for loop then iterates i from 1 to 10 (range(1,11) covers 1 through 10). In each iteration, it prints a line showing n multiplied by i, displaying the standard multiplication table format 'n x i = product' for all ten multiples, from n*1 up to n*10."
        }
      ]
    }
  ]
}
