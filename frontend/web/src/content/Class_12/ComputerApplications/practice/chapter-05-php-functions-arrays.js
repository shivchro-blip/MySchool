// frontend/web/src/content/Class_12/ComputerApplications/practice/chapter-05-php-functions-arrays.js

export default {
  meta: {
    subject: `Computer Applications -- Class XII`,
    unit: `Chapter 5 -- Functions and Arrays in PHP`,
    time: `3.00 hrs`,
    totalMarks: 47,
    instructions: `Samacheer Kalvi -- Answer all questions`,
  },

  parts: [

    // ── Part I — MCQ (20 × 1 = 20) ──────────────────────────────────────────
    {
      id: `p1`,
      navLabel: `Part I -- MCQ (20 x 1)`,
      title: `Part I -- Objective Type`,
      type: `mcq`,
      scoreMax: 20,
      marksPer: 1,
      sections: [
        {
          label: `Functions`,
          questions: [
            {
              id: `q1`,
              html: `A _________ is a block of code that performs a specific task.`,
              options: [
                `a) parameter`,
                `b) function`,
                `c) class`,
                `d) label`,
              ],
              answer: 1,
              hint: `A function is a block of code that performs a specific task. It allows code reuse — write once, call many times.`,
            },
            {
              id: `q2`,
              html: `Pre-defined functions are also called _________.`,
              options: [
                `a) user-defined functions`,
                `b) recursive functions`,
                `c) built-in functions`,
                `d) lambda functions`,
              ],
              answer: 2,
              hint: `Built-in functions are pre-defined in the PHP language. User-defined functions are created by the programmer.`,
            },
            {
              id: `q3`,
              html: `Which one of the following is the right way of defining a function in PHP?`,
              options: [
                `a) function functionname() { // code to be executed }`,
                `b) function() {}`,
                `c) def myFunction():`,
                `d) None of the above`,
              ],
              answer: 0,
              hint: `PHP functions use the 'function' keyword followed by the name and parentheses. 'def' is Python syntax, not PHP.`,
            },
            {
              id: `q4`,
              html: `A user-defined function in PHP starts with the keyword _________.`,
              options: [
                `a) function`,
                `b) def`,
                `c) defined`,
                `d) funct`,
              ],
              answer: 0,
              hint: `The 'function' keyword is used to define a user-defined function in PHP. 'def' is used in Python.`,
            },
            {
              id: `q5`,
              html: `Which of the following is a correct way to call a function in PHP?`,
              options: [
                `a) functionName();`,
                `b) call functionName;`,
                `c) execute functionName;`,
                `d) run functionName();`,
              ],
              answer: 0,
              hint: `A function is called by using its name followed by parentheses: functionName(); Arguments can be passed inside the parentheses.`,
            },
            {
              id: `q6`,
              html: `Function names in PHP are:`,
              options: [
                `a) Case-sensitive`,
                `b) NOT case-sensitive`,
                `c) Must be in uppercase`,
                `d) Must be in lowercase`,
              ],
              answer: 1,
              hint: `Function names in PHP are NOT case-sensitive. greet() and GREET() refer to the same function. Note: variable names ARE case-sensitive.`,
            },
            {
              id: `q7`,
              html: `The term used for actual values passed when calling a function is:`,
              options: [
                `a) Parameters`,
                `b) Arguments`,
                `c) Variables`,
                `d) Constants`,
              ],
              answer: 1,
              hint: `Arguments are the actual values passed during a function CALL. Parameters are the variable names used in the function DEFINITION.`,
            },
            {
              id: `q8`,
              html: `What is the output of: function addNumbers($x, $y) { echo $x + $y; } addNumbers(10, 40);`,
              options: [
                `a) 10`,
                `b) 40`,
                `c) 50`,
                `d) 1040`,
              ],
              answer: 2,
              hint: `addNumbers(10, 40) calls the function with $x=10 and $y=40. The function echoes $x + $y = 10 + 40 = 50.`,
            },
            {
              id: `q9`,
              html: `Which of the following is an advantage of using functions in PHP?`,
              options: [
                `a) Code reuse`,
                `b) Easier testing and debugging`,
                `c) Modularity`,
                `d) All of the above`,
              ],
              answer: 3,
              hint: `All three are advantages of functions: Code reuse (write once, call many times), easier testing/debugging, and modularity (smaller manageable pieces).`,
            },
            {
              id: `q10`,
              html: `A function name in PHP must start with:`,
              options: [
                `a) A number`,
                `b) A letter or underscore`,
                `c) A dollar sign`,
                `d) A hash sign`,
              ],
              answer: 1,
              hint: `Function names must start with a letter or underscore — same rule as variable names (except variables also need $ prefix).`,
            },
          ],
        },
        {
          label: `Arrays`,
          questions: [
            {
              id: `q11`,
              html: `What is an array in PHP?`,
              options: [
                `a) An array is a special data type`,
                `b) It can hold many values under a single variable name`,
                `c) An array element can be any type of data`,
                `d) All of the above`,
              ],
              answer: 3,
              hint: `All three statements are correct. An array is a special data type that holds many values under a single variable name, and elements can be of any type.`,
            },
            {
              id: `q12`,
              html: `How many types of arrays are there in PHP?`,
              options: [
                `a) 2`,
                `b) 3`,
                `c) 4`,
                `d) 5`,
              ],
              answer: 1,
              hint: `There are 3 types of arrays in PHP: Indexed array, Associative array, and Multi-dimensional array.`,
            },
            {
              id: `q13`,
              html: `What is the index of the first element in an indexed array in PHP?`,
              options: [
                `a) 0`,
                `b) 1`,
                `c) 2`,
                `d) 3`,
              ],
              answer: 0,
              hint: `Indexed arrays in PHP start at index 0. First element = index 0, second element = index 1, and so on.`,
            },
            {
              id: `q14`,
              html: `What is the index of the third element in an indexed array in PHP with 5 elements?`,
              options: [
                `a) 2`,
                `b) 3`,
                `c) 4`,
                `d) 5`,
              ],
              answer: 0,
              hint: `Third element = index 2 (because indexing starts at 0). First=0, Second=1, Third=2, Fourth=3, Fifth=4.`,
            },
            {
              id: `q15`,
              html: `How do you create an indexed array in PHP?`,
              options: [
                `a) By enclosing a comma-separated list of values in square brackets`,
                `b) By using the array() function`,
                `c) By enclosing a comma-separated list of values in curly braces`,
                `d) Both A and B`,
              ],
              answer: 3,
              hint: `Indexed arrays can be created using square brackets [ ] or the array() function. Curly braces { } are not used for arrays in PHP.`,
            },
            {
              id: `q16`,
              html: `How do you access the elements of an indexed array in PHP?`,
              options: [
                `a) By using the array index in square brackets`,
                `b) By using the array key in square brackets`,
                `c) By using the array index in curly braces`,
                `d) By using the array key in curly braces`,
              ],
              answer: 0,
              hint: `Indexed array elements are accessed using the numeric index in square brackets. Example: $fruits[0] gives the first element.`,
            },
            {
              id: `q17`,
              html: `In an associative array, keys are also called:`,
              options: [
                `a) Indexes`,
                `b) Labels`,
                `c) Numbers`,
                `d) Pointers`,
              ],
              answer: 1,
              hint: `In an associative array, keys are also called "labels" because they label or identify the corresponding values.`,
            },
            {
              id: `q18`,
              html: `What is the correct way to create an associative array in PHP?`,
              options: [
                `a) $arr = array("Name" = "Ram");`,
                `b) $arr = array("Name" => "Ram");`,
                `c) $arr = array("Name" : "Ram");`,
                `d) $arr = array("Name" == "Ram");`,
              ],
              answer: 1,
              hint: `Associative arrays use => (double arrow) to separate keys from values. "Name" => "Ram" means the key "Name" has value "Ram".`,
            },
            {
              id: `q19`,
              html: `A multidimensional array is also known as:`,
              options: [
                `a) Indexed array`,
                `b) Associative array`,
                `c) Nested array`,
                `d) Linked array`,
              ],
              answer: 2,
              hint: `A multidimensional array is also called a nested array — it contains one or more arrays as its elements (array of arrays).`,
            },
            {
              id: `q20`,
              html: `In PHP, unlike traditional programming languages, array elements:`,
              options: [
                `a) Must all be the same data type`,
                `b) Can be of any data type`,
                `c) Must all be integers`,
                `d) Must all be strings`,
              ],
              answer: 1,
              hint: `In PHP, array elements can be of ANY data type — integers, strings, floats, booleans mixed together. Traditional languages restrict all elements to the same type.`,
            },
          ],
        },
      ],
    },

    // ── Part II — Short Answers (5 × 2 = 10) ────────────────────────────────
    {
      id: `p2`,
      navLabel: `Part II -- Short Answers (5 x 2)`,
      title: `Part II -- Short Answer Questions`,
      type: `short-essay`,
      scoreMax: 10,
      marksPer: 2,
      questions: [
        {
          q: `What is a function?`,
          ans: `A function is a block of code that performs a specific task. Functions allow code reuse — you write the code once and call it whenever needed without rewriting it. There are two types of functions in PHP: Built-in functions (pre-defined in PHP) and User-defined functions (created by the programmer using the 'function' keyword).`,
        },
        {
          q: `What are the different types of functions in PHP?`,
          ans: `There are two types of functions in PHP: 1. Built-in Functions — These are pre-defined in the PHP language and can be used directly without defining them. They perform a variety of common tasks such as calculating the length of a string (strlen()) or sorting an array (sort()). 2. User-defined Functions — These are functions that the programmer creates to perform specific tasks. They are defined using the 'function' keyword followed by the function name and parentheses.`,
        },
        {
          q: `What is an array in PHP and what are its main types?`,
          ans: `An array is a special data type in PHP that can hold many values under a single variable name. An array element can be of any data type (unlike traditional languages where all elements must be the same type). The three main types of arrays in PHP are: 1. Indexed Array — uses numeric index (0, 1, 2...) to access elements. 2. Associative Array — uses string keys (labels) to access values. 3. Multi-dimensional Array — an array that contains one or more arrays as its elements (also called a nested array).`,
        },
        {
          q: `How do you create an indexed array in PHP?`,
          ans: `An indexed array can be created in PHP in two ways: Method 1 — Using square brackets: $fruits = ['apple', 'banana', 'orange']; Method 2 — Using the array() function: $fruits = array('apple', 'banana', 'orange'); In both cases, the index starts at 0. So $fruits[0] = 'apple', $fruits[1] = 'banana', $fruits[2] = 'orange'. You can access any element using its numeric index in square brackets: echo $fruits[0]; // outputs apple`,
        },
        {
          q: `Write short notes on built-in functions in PHP.`,
          ans: `Built-in functions are pre-defined functions in the PHP language that can be used directly without any definition. They are designed to perform common tasks efficiently, saving programmers time and effort. Examples: strlen() — calculates the length of a string. sort() — sorts an array in ascending order. strtolower() — converts a string to lowercase. array_push() — adds an element to the end of an array. Built-in functions are ready to use — you just call them with the required arguments without writing any function definition.`,
        },
      ],
    },

    // ── Part III — Brief Answers (3 × 3 = 9) ────────────────────────────────
    {
      id: `p3`,
      navLabel: `Part III -- Brief Answers (3 x 3)`,
      title: `Part III -- Brief Answer Questions`,
      type: `short-essay`,
      scoreMax: 9,
      marksPer: 3,
      questions: [
        {
          q: `What are the advantages of using functions in PHP?`,
          ans: `The three main advantages of using functions in PHP are:\n1. Code Reuse — Functions allow us to reuse code without rewriting it. Once a function is defined, it can be called multiple times anywhere in the program. This saves time and effort when writing and maintaining code.\n2. Testing and Debugging — Functions allow us to test and debug code more easily. We can test individual functions separately from the rest of the code, making it easier to find and fix errors.\n3. Modularity — Functions allow us to break down code into smaller, modular pieces. This makes the code easier to understand, maintain, and modify. Each function has a specific task, making the overall program structure cleaner and more organized.`,
        },
        {
          q: `What is the syntax for defining a function in PHP?`,
          ans: `The general syntax for creating (defining) a function in PHP is:\nfunction functionName([parameter list])\n{\n// code to be executed\n}\nBreaking this down:\n- The 'function' keyword is mandatory — it tells PHP you are defining a function.\n- functionName is the name of the function. It can be any valid PHP identifier that is not a reserved word. Function names are NOT case-sensitive.\n- parameter list is an optional comma-separated list of variables the function receives as input. You can have as many or as few parameters as needed.\n- Inside the curly braces { }, you write the code the function will execute — PHP statements, loops, conditions, etc.\nExample: function greet($name) { echo \"Hello, $name!\"; }`,
        },
        {
          q: `Write short notes on an Associative array.`,
          ans: `An associative array is a data structure in PHP that stores a collection of key-value pairs. The keys (also called labels) are used to identify the corresponding values. Values can be of any data type.\nCreating an associative array:\nMethod 1: $student = ["Name"=>"Ram", "Age"=>25, "Place"=>"Trichy"];\nMethod 2: $student = array("Name"=>"Ram", "Age"=>25, "Place"=>"Trichy");\nAccessing elements: Use the key in square brackets.\necho $student["Name"]; // outputs Ram\necho $student["Age"]; // outputs 25\nAssociative arrays are useful when you want to identify values by meaningful names (like "Name", "Age") rather than numeric indexes. Example: A student's marks stored as $marks["Tamil"]=95, $marks["English"]=80.`,
        },
      ],
    },

    // ── Part IV — Long Essays (2 × 4 = 8) ───────────────────────────────────
    {
      id: `p4`,
      navLabel: `Part IV -- Long Essays (2 x 4)`,
      title: `Part IV -- Detailed Answer Questions`,
      type: `long-essay`,
      scoreMax: 8,
      marksPer: 4,
      questions: [
        {
          q: `Explain the user-defined function with suitable examples.`,
          ans: `A user-defined function is a function created by the programmer to perform a specific task using the 'function' keyword.\n\nSyntax:\nfunction functionName([parameter list])\n{\n// code to be executed\n}\n\nCalling a function:\nfunctionName(); OR functionName(argument1, argument2);\n\nNote: Parameters are used in the function definition. Arguments are the actual values passed during the function call.\n\nExamples:\n\n(a) Function with no parameters:\n<?php\nfunction printGreeting()\n{\necho "Hello, world!";\n}\nprintGreeting();\n// Output: Hello, world!\n?>\n\n(b) Function with 1 parameter:\n<?php\nfunction greet($name)\n{\necho "Hello, $name!";\n}\ngreet("Barath");\n// Output: Hello, Barath!\n?>\n\n(c) Function with 2 parameters:\n<?php\nfunction addNumbers($x, $y)\n{\necho $x + $y;\n}\naddNumbers(10, 40);\n// Output: 50\n?>\n\nAdvantages: Code reuse, easier testing, and modularity.`,
        },
        {
          q: `Explain indexed array and associative array in PHP.`,
          ans: `INDEXED ARRAY:\nAn indexed array uses a numeric index starting from 0 to access its elements.\n\nCreating an indexed array:\nMethod 1: $fruits = ['apple', 'banana', 'orange'];\nMethod 2: $fruits = array('apple', 'banana', 'orange');\n\nAccessing elements (use index in square brackets):\necho $fruits[0]; // Output: apple\necho $fruits[1]; // Output: banana\necho $fruits[2]; // Output: orange\n\nMore examples:\n$numbers = array(1, 2, 3, 4, 5);\n$colours = array("red", "green", "blue");\n\nNote: Index always starts at 0. The third element has index 2, not 3.\n\nASSOCIATIVE ARRAY:\nAn associative array stores key-value pairs. Keys (labels) are strings used to identify values.\n\nCreating an associative array:\nMethod 1: $student = ["Name"=>"Ram", "Age"=>25, "Place"=>"Trichy"];\nMethod 2: $student = array("Name"=>"Ram", "Age"=>25, "Place"=>"Trichy");\n\nAccessing elements (use key in square brackets):\necho $student["Name"]; // Output: Ram\necho $student["Age"]; // Output: 25\necho $student["Place"]; // Output: Trichy\n\nExample with marks:\n$marks = array("Tamil"=>95, "English"=>80, "Computer Applications"=>97);\necho $marks["Tamil"]; // Output: 95\n\nKey Difference: Indexed arrays use numbers (0,1,2...) as keys. Associative arrays use meaningful string labels ("Name", "Age"...) as keys.`,
        },
      ],
    },

  ],
}
