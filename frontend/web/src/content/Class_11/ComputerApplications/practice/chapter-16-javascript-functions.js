export default {
  "meta": {
    "subject": "Computer Applications -- Class XI",
    "unit": "Chapter 16 -- JavaScript Functions",
    "time": "2.30 hrs",
    "totalMarks": 47,
    "instructions": "Samacheer Kalvi -- Answer all questions"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "Part I -- MCQ (5 x 1)",
      "title": "Part I -- Choose the Correct Answer",
      "type": "mcq",
      "scoreMax": 5,
      "marksPer": 1,
      "sections": [
        {
          "label": "JavaScript Functions",
          "questions": [
            {
              "id": "q1",
              "html": "The parameters in a function work as:",
              "options": [
                "a) Local variable",
                "b) Global Variable",
                "c) File variable",
                "d) Block variable"
              ],
              "answer": 0,
              "hint": "Parameters in a function work as local variables — they are only accessible within the body of that function."
            },
            {
              "id": "q2",
              "html": "Predefined functions are also called as:",
              "options": [
                "a) Library functions",
                "b) Storage functions",
                "c) Instructions",
                "d) Commands"
              ],
              "answer": 0,
              "hint": "Predefined functions are also called Library functions because they are already defined in the JavaScript library."
            },
            {
              "id": "q3",
              "html": "Larger programs are divided into smaller programs called:",
              "options": [
                "a) Modules",
                "b) Block",
                "c) Sets",
                "d) Group"
              ],
              "answer": 0,
              "hint": "Large programs are divided into smaller programs called modules. User-defined functions allow programmers to modularise programs."
            },
            {
              "id": "q4",
              "html": "Which of the following is used to enhance reusability and program clarity?",
              "options": [
                "a) Functions",
                "b) Modules",
                "c) Sets",
                "d) Instructions"
              ],
              "answer": 0,
              "hint": "Functions keep task-specific code in one place, enhancing reusability (use once, call many times) and program clarity."
            },
            {
              "id": "q5",
              "html": "Which of the following allows the programmer to modularise a program?",
              "options": [
                "a) Library functions",
                "b) User-defined functions",
                "c) Normal functions",
                "d) Ordinary functions"
              ],
              "answer": 1,
              "hint": "User-defined functions allow programmers to modularise programs by dividing large programs into smaller, manageable modules."
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
              "id": "q6",
              "html": "What is a function in JavaScript?",
              "answer": "A function in JavaScript is a block of JavaScript code that is defined once but may be executed (invoked) any number of times. Functions are used to encapsulate code that performs a specific task. They avoid repetition by writing code once and calling it whenever needed. More generally, functions keep code that performs a particular job in one place to enhance reusability and program clarity. JavaScript supports two types: Pre-defined (Library) functions and User-defined functions.",
              "hint": "Function = defined once, invoked many times. Encapsulates code. Avoids repetition. Enhances reusability and clarity. Two types: pre-defined and user-defined."
            },
            {
              "id": "q7",
              "html": "What is the use of a function?",
              "answer": "Uses of a function in JavaScript:\n1. Avoid repetition: Write code once and call it multiple times instead of typing the same statements repeatedly.\n2. Modularisation: Divide large programs into smaller, manageable modules (functions), making the program easier to develop, test, and maintain.\n3. Reusability: A function written for one purpose can be reused in the same program or in other programs.\n4. Program clarity: Keeping task-specific code in one place makes the program easier to read and understand.\n5. Return values: Functions can compute and return values to the calling code.",
              "hint": "5 uses: avoid repetition, modularisation (large to small modules), reusability, program clarity (readable code), return values."
            },
            {
              "id": "q8",
              "html": "Write a note on Library functions.",
              "answer": "Library functions (also called Pre-defined functions) are functions that are already defined in the JavaScript library. Programmers can directly call them without defining them. They perform commonly needed operations.\n\nExamples and descriptions:\n- toUpperCase(): Converts a string to uppercase. 'java'.toUpperCase() = 'JAVA'\n- toLowerCase(): Converts a string to lowercase. 'JAVA'.toLowerCase() = 'java'\n- length: Finds the length of a string. 'JAVA'.length = 4\n- parseInt(): Converts a float to integer. parseInt(34.234) = 34\n- parseFloat(): Converts a string to a float number. parseFloat('34.23') = 34.23\n- isNaN(): Returns true if value is NOT a number. isNaN('A') = true\n- alert(), prompt(), confirm(): Dialog box functions",
              "hint": "Pre-defined/Library functions: already in JavaScript library, no definition needed. Examples: toUpperCase(), toLowerCase(), length, parseInt(), parseFloat(), isNaN(). Give description and example result for each."
            },
            {
              "id": "q9",
              "html": "Write a note on user-defined functions.",
              "answer": "User-defined functions are functions created by the programmer to perform specific tasks. They allow the programmer to modularise a program by dividing large programs into smaller, reusable modules.\n\nFunction Definition Format:\nfunction function-name(parameter list) {\n  // variable declarations\n  // executable statements\n}\n\nRules:\n- The function-name must be a valid identifier.\n- Parameters are local variables within the function body.\n- Multiple parameters are separated by commas.\n- The function body must be enclosed in curly braces { }.\n- Use return statement to return a value.\n\nExample:\nfunction sum(x, y) {\n  var m = x + y;\n  return m;\n}\n// Calling: var result = sum(5, 3); // result = 8",
              "hint": "User-defined = programmer-created. Format: function name(params) { body; }. Rules: valid identifier, params are local vars, body in { }, return for value. Give example function."
            },
            {
              "id": "q10",
              "html": "Write the syntax of a function in JavaScript.",
              "answer": "The syntax (format) of a function definition in JavaScript:\n\nfunction function-name(parameter list) {\n  // Declaration of variables\n  // Executable statements\n  return value; // optional\n}\n\nExample with no parameters:\nfunction displayMessage() {\n  document.write('Hello, World!');\n}\n\nExample with parameters and return value:\nfunction sum(x, y) {\n  var s = x + y;\n  return s;\n}\n\nCalling a function:\nvar result = sum(10, 20); // result = 30\ndisplayMessage(); // calls the no-parameter function\n\nNote: Parameters are optional. The return statement is also optional — if not used, the function returns undefined.",
              "hint": "function name(params) { declarations; statements; return value; }. Show example with and without parameters. Show how to call the function."
            }
          ]
        }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Short (4 x 4)",
      "title": "Part III -- Short Answers",
      "type": "brief_answer",
      "scoreMax": 16,
      "marksPer": 4,
      "sections": [
        {
          "label": "Short Answers",
          "questions": [
            {
              "id": "q11",
              "html": "Write a JavaScript program to find the cube of a number using a function.",
              "answer": "JavaScript program to find the cube of a number:\n\n<html>\n<head>\n  <title>Cube of a Number using Function</title>\n  <script type='text/javascript'>\n    var input = window.prompt('Enter a number:', '0');\n    var num = parseInt(input);\n    var result = cube(num);\n    document.write('<h3>Cube of ' + num + ' is: ' + result + '</h3>');\n\n    function cube(x) {\n      var c = x * x * x;\n      return c;\n    }\n  </script>\n</head>\n<body>\n</body>\n</html>\n\nExplanation:\n- The user is prompted to enter a number.\n- parseInt() converts the string input to an integer.\n- The cube() function is called with the number as an argument.\n- Inside the function, x*x*x calculates the cube.\n- The return statement sends the result back.\n- document.write() displays the output.\n\nExample output: Cube of 3 is: 27",
              "hint": "Define function cube(x) { return x*x*x; }. Use prompt() to get number, parseInt() to convert, call cube(), display with document.write()."
            },
            {
              "id": "q12",
              "html": "Write a JavaScript program to find the sum of two numbers using a function.",
              "answer": "JavaScript program to find the sum of two numbers:\n\n<html>\n<head>\n  <title>Sum of Two Numbers using Function</title>\n  <script type='text/javascript'>\n    var input1 = window.prompt('Enter Value1:', '0');\n    var input2 = window.prompt('Enter Value2:', '0');\n    var v1 = parseInt(input1);\n    var v2 = parseInt(input2);\n    var s = sum(v1, v2);\n    document.writeln('<br><h4>Example for Function</h4>');\n    document.writeln('First No: ' + v1 +\n                     '<br>Second No: ' + v2 +\n                     '<br>The Sum = ' + s);\n\n    function sum(x, y) {\n      var s = x + y;\n      return s;\n    }\n  </script>\n</head>\n<body>\n</body>\n</html>\n\nExplanation:\n- Two prompts get the two numbers from the user.\n- parseInt() converts string inputs to integers.\n- sum(v1, v2) calls the function with two arguments.\n- The function adds x + y and returns the result.\n- document.writeln() displays all three values.\n\nExample: Input 10 and 20 → Output: First No: 10, Second No: 20, Sum = 30",
              "hint": "Define function sum(x,y) { return x+y; }. Use two prompts, parseInt(), call sum(v1,v2), display First No, Second No, and Sum with document.writeln()."
            },
            {
              "id": "q13",
              "html": "Explain the isNaN() function with an example program.",
              "answer": "isNaN() (is Not a Number) is a pre-defined JavaScript function that checks whether a given value or variable is a valid number. It returns true if the value is NOT a number, and false if it IS a number.\n\nSyntax: isNaN(value)\n\nExample: isNaN('12') returns false (because '12' can be converted to a number)\nExample: isNaN('A') returns true (because 'A' cannot be converted to a number)\n\nProgram using isNaN():\n<html>\n<head></head>\n<body>\n  <h4>Program to test isNaN() Function</h4>\n  <script language='JavaScript'>\n    function checknum() {\n      var n = document.form1.text1.value;\n      if (isNaN(n) == true) {\n        document.form1.text2.value = 'Not a Number: ' + n;\n      } else {\n        document.form1.text2.value = 'It is a Number: ' + n;\n      }\n    }\n  </script>\n  <form name='form1'>\n    Enter a Number: <input type='text' name='text1' size=10>\n    <br><br>\n    <input type='button' value='Click to Check' onClick='checknum()'>\n    <input type='text' name='text2' size=30>\n  </form>\n</body>\n</html>",
              "hint": "isNaN() = returns true if NOT a number, false if IS a number. Write program with form, text input, button onClick=checknum(), function using isNaN() to display 'Not a Number' or 'It is a Number'."
            },
            {
              "id": "q14",
              "html": "Explain the getElementById() method used in JavaScript functions.",
              "answer": "The getElementById() method is a pre-defined JavaScript function that returns the HTML element that has a specific ID attribute value.\n\nSyntax: document.getElementById('elementID')\n\nIt is used to access form elements, input fields, and other HTML elements from JavaScript.\n\nelements[n] is used to access the nth element (0-indexed) within a form or element group. elements[0] = first element, elements[1] = second element, etc.\n\nExample — Online Quiz using getElementById():\n<html>\n<head>\n  <script type='text/JavaScript'>\n    function checkAnswer() {\n      if (document.getElementById('myQuiz').elements[0].checked)\n        alert('Congratulations, Your Answer is correct');\n      else\n        alert('Your Answer is incorrect, Please try Again');\n    }\n  </script>\n</head>\n<body>\n  <form id='myQuiz' action='JavaScript:checkAnswer()'>\n    <p>Which is not a Programming Language?<br>\n      <input type='radio' name='radiobutton' value='Word'> MS-Word\n      <input type='radio' name='radiobutton' value='Cobol'> COBOL\n      <input type='radio' name='radiobutton' value='CPP'> C++\n    </p>\n    <input type='submit' value='Submit'>\n  </form>\n</body>\n</html>\n\nHere, getElementById('myQuiz') gets the form element with id='myQuiz'. elements[0].checked checks if the first radio button (MS-Word) is selected.",
              "hint": "getElementById('id') returns element with that ID. elements[0] = first element (0-indexed). Write online quiz program: radio buttons, form with id='myQuiz', function checks elements[0].checked, alert correct/incorrect."
            }
          ]
        }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Long (2 x 8)",
      "title": "Part IV -- Explain in Detail",
      "type": "long_essay",
      "scoreMax": 16,
      "marksPer": 8,
      "sections": [
        {
          "label": "Long Answers",
          "questions": [
            {
              "id": "q15",
              "html": "Explain the types of functions in JavaScript with examples.",
              "answer": "JavaScript supports two types of functions:\n\nTYPE 1: Pre-defined (Library) Functions\nAlready defined in the JavaScript library. Called directly without definition.\n\nCommon pre-defined functions:\n- toUpperCase(): Converts string to uppercase. 'java'.toUpperCase() = 'JAVA'\n- toLowerCase(): Converts string to lowercase. 'JAVA'.toLowerCase() = 'java'\n- length: String length. 'JAVA'.length = 4\n- parseInt(): Float to integer. parseInt(34.234) = 34\n- parseFloat(): String to float. parseFloat('34.23') = 34.23\n- isNaN(): True if not a number. isNaN('A') = true\n- alert(), prompt(), confirm(): Dialog boxes\n\nTYPE 2: User-defined Functions\nCreated by the programmer for specific tasks. Allows modularisation.\n\nDefinition format:\nfunction function-name(parameter list) {\n  var declarations;\n  executable statements;\n  return value;\n}\n\nExample program using user-defined function:\n<html>\n<head>\n  <title>Function Example</title>\n  <script type='text/JavaScript'>\n    var input1 = window.prompt('Enter Value1:', '0');\n    var input2 = window.prompt('Enter Value2:', '0');\n    var v1 = parseInt(input1);\n    var v2 = parseInt(input2);\n    var s = sum(v1, v2);\n    document.writeln('First No: ' + v1 + ' Second No: ' + v2 + ' Sum = ' + s);\n\n    function sum(x, y) {\n      var s = x + y;\n      return s;\n    }\n  </script>\n</head>\n<body></body>\n</html>\n\nThis program uses:\n- window.prompt() (pre-defined) to get inputs\n- parseInt() (pre-defined) to convert strings\n- sum() (user-defined) to add two numbers\n- document.writeln() (pre-defined) to display output",
              "hint": "Two types: Pre-defined (library) and User-defined. For pre-defined: list toUpperCase, toLowerCase, length, parseInt, parseFloat, isNaN with results. For user-defined: definition format, rules, complete sum program using both types."
            },
            {
              "id": "q16",
              "html": "Write a complete JavaScript program that displays a menu and accepts a choice to perform calculations using functions.",
              "answer": "JavaScript program with menu and functions:\n\n<html>\n<head>\n  <title>Menu-Driven Calculator</title>\n  <script type='text/JavaScript'>\n    function sumToLimit() {\n      var n = parseInt(prompt('Enter the limit (N):', '0'));\n      var total = 0;\n      for (var i = 1; i <= n; i++) {\n        total += i;\n      }\n      document.write('<p>Sum of numbers from 1 to ' + n + ' = ' + total + '</p>');\n    }\n\n    function sumRange() {\n      var start = parseInt(prompt('Enter starting number:', '0'));\n      var end = parseInt(prompt('Enter ending number:', '0'));\n      var total = 0;\n      for (var i = start; i <= end; i++) {\n        total += i;\n      }\n      document.write('<p>Sum from ' + start + ' to ' + end + ' = ' + total + '</p>');\n    }\n\n    var choice = prompt(\n      'MENU\\n1. Sum of numbers up to a limit\\n2. Sum of numbers from start to end\\nEnter choice (1 or 2):',\n      '1'\n    );\n\n    if (choice == '1') {\n      sumToLimit();\n    } else if (choice == '2') {\n      sumRange();\n    } else {\n      alert('Invalid choice!');\n    }\n  </script>\n</head>\n<body>\n</body>\n</html>\n\nExplanation:\n- sumToLimit(): Uses for loop to sum numbers from 1 to N.\n- sumRange(): Uses for loop to sum numbers from start to end.\n- A menu prompt shows the two options.\n- if-else selects and calls the correct function based on user's choice.",
              "hint": "Define two functions: sumToLimit() and sumRange(). Show menu with prompt. Use if-else to call correct function. Each function uses for loop for summation and document.write() to show result."
            }
          ]
        }
      ]
    }
  ]
}
