// frontend/web/src/content/Class_12/ComputerApplications/chapters/chapter-05-php-functions-arrays.js

export default {
  eyebrow: "Chapter 5 · Class 12 Computer Applications",
  title: "Functions and Arrays in PHP",
  author: "",
  pills: ["Theory", "Programming", "Board Exam Important"],

  tabs: [

    // ── TAB 1 — Functions ───────────────────────────────────────────────────
    {
      id: "functions",
      label: "Functions",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Imagine you have a set of instructions to make tea. Every time you want tea, instead of writing all the steps again, you just say \"make tea\". A PHP function works exactly like this — you write code once and call it whenever needed. Functions save time and reduce repetition!</p>",
        },
        {
          type: "section-head",
          text: "5.1 Functions in PHP",
        },
        {
          type: "gloss-row",
          word: "Function",
          def: "A block of code that performs a specific task. Functions allow code reuse — write once, call many times.",
        },
        {
          type: "gloss-row",
          word: "Advantages of Functions",
          def: "1. Code Reuse — reuse code without rewriting it. 2. Testing and Debugging — test individual functions separately. 3. Modularity — break code into smaller, manageable pieces.",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "Think of a function like a vending machine. You press a button (call the function), give money (pass arguments), and get a snack (get the return value). You don't need to know what happens inside — you just use it!",
        },
        {
          type: "section-head",
          text: "5.2 Types of Functions in PHP",
        },
        {
          type: "gloss-row",
          word: "Built-in Functions",
          def: "Pre-defined functions in the PHP language. Ready to use — no definition needed. Examples: strlen() calculates string length, sort() sorts an array.",
        },
        {
          type: "gloss-row",
          word: "User-defined Functions",
          def: "Functions created by the programmer to perform specific tasks. Defined using the 'function' keyword. Function names are NOT case-sensitive. Function name must start with a letter or underscore.",
        },
        {
          type: "section-head",
          text: "5.2.1 Defining a User-defined Function",
        },
        {
          type: "quote-block",
          quote: "function functionName([parameter list]) { // code to be executed }",
          context: "",
        },
        {
          type: "gloss-row",
          word: "function keyword",
          def: "Used to define a function.",
        },
        {
          type: "gloss-row",
          word: "functionName",
          def: "Any valid PHP identifier (not a reserved word). Function names are NOT case-sensitive.",
        },
        {
          type: "gloss-row",
          word: "parameter list",
          def: "Optional comma-separated list of variables that the function receives as input. Parameters are used inside the function definition.",
        },
        {
          type: "section-head",
          text: "5.2.2 Calling a Function",
        },
        {
          type: "quote-block",
          quote: "functionName(); OR functionName(argument1, argument2);",
          context: "",
        },
        {
          type: "gloss-row",
          word: "Parameters vs Arguments",
          def: "Parameters — used in the function DEFINITION. Arguments — used in the function CALL. Example: function greet($name) — $name is a parameter. greet(\"Barath\") — \"Barath\" is an argument.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Parameters vs Arguments: Parameters are in the function definition. Arguments are the actual values passed when calling. This distinction is asked in Part II questions.",
        },
        {
          type: "section-head",
          text: "Function Examples",
        },
        {
          type: "gloss-row",
          word: "Function with no parameters",
          def: "function printGreeting() { echo \"Hello, world!\"; } Call: printGreeting(); Output: Hello, world!",
        },
        {
          type: "gloss-row",
          word: "Function with 1 parameter",
          def: "function greet($name) { echo \"Hello, $name!\"; } Call: greet(\"Barath\"); Output: Hello, Barath!",
        },
        {
          type: "gloss-row",
          word: "Function with 2 parameters",
          def: "function addNumbers($x, $y) { echo $x + $y; } Call: addNumbers(10, 40); Output: 50",
        },
        {
          type: "nav",
          next: "arrays",
          nextLabel: "Next: Arrays →",
        },
      ],
    },

    // ── TAB 2 — Arrays ──────────────────────────────────────────────────────
    {
      id: "arrays",
      label: "Arrays",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>An array is like a row of lockers in school — each locker has a number (index) and stores something inside. Instead of creating 10 separate variables for 10 marks, you can store all 10 in one array. Arrays are very important — they appear in Part III and Part IV questions every year!</p>",
        },
        {
          type: "section-head",
          text: "5.3 Arrays in PHP",
        },
        {
          type: "gloss-row",
          word: "Array",
          def: "A special data type that holds many values under a single variable name. An array element can be of any data type. Note: In traditional languages, all array elements must be the same type — but PHP has no such restriction.",
        },
        {
          type: "gloss-row",
          word: "Three Types of Arrays",
          def: "1. Indexed Array, 2. Associative Array, 3. Multi-dimensional Array.",
        },
        {
          type: "section-head",
          text: "5.3.1 Indexed Array",
        },
        {
          type: "gloss-row",
          word: "Indexed Array",
          def: "An array that uses a NUMERIC INDEX to access its elements. Index starts at 0 for the first element and increases by 1 for each element.",
        },
        {
          type: "gloss-row",
          word: "Creating an Indexed Array — Method 1",
          def: "$fruits = ['apple', 'banana', 'orange']; (square brackets)",
        },
        {
          type: "gloss-row",
          word: "Creating an Indexed Array — Method 2",
          def: "$fruits = array('apple', 'banana', 'orange'); (array() function)",
        },
        {
          type: "gloss-row",
          word: "Accessing Indexed Array Elements",
          def: "Use the index in square brackets. $fruits[0] → 'apple', $fruits[1] → 'banana', $fruits[2] → 'orange'. Index starts at 0!",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Index of first element = 0. Index of second element = 1. Index of Nth element = N-1. Example: in an array with 5 elements, the third element has index 2. Very common MCQ question!",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "Think of an indexed array like seats on a school bus. Seat 0 = first student, Seat 1 = second student, and so on. You find a student by their seat number (index).",
        },
        {
          type: "section-head",
          text: "5.3.2 Associative Array",
        },
        {
          type: "gloss-row",
          word: "Associative Array",
          def: "A data structure that stores key-value pairs. Keys (also called labels) are used to identify values. Keys can be strings, not just numbers.",
        },
        {
          type: "gloss-row",
          word: "Creating Associative Array — Method 1",
          def: "$student = [\"Name\" => \"Ram\", \"Age\" => 25, \"Place\" => \"Trichy\"];",
        },
        {
          type: "gloss-row",
          word: "Creating Associative Array — Method 2",
          def: "$student = array(\"Name\" => \"Ram\", \"Age\" => 25, \"Place\" => \"Trichy\");",
        },
        {
          type: "gloss-row",
          word: "Accessing Associative Array Elements",
          def: "Use the key in square brackets. echo $student[\"Name\"]; → Ram. echo $student[\"Age\"]; → 25.",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "An associative array is like a school ID card — Name: Ram, Age: 25, Place: Trichy. Instead of using numbers, you use the label (key) to find the information.",
        },
        {
          type: "section-head",
          text: "5.3.3 Multidimensional Array",
        },
        {
          type: "gloss-row",
          word: "Multidimensional Array",
          def: "An array that contains one or more arrays as its elements. Also called a nested array (array of arrays). Access elements using TWO sets of square brackets — first for the row, second for the column.",
        },
        {
          type: "gloss-row",
          word: "Example",
          def: "$arr = array(array(1,2,3), array(4,5,6), array(7,8,9)); echo $arr[1][2]; → Output: 6 (row 1, column 2).",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Indexed Array = numeric keys (0,1,2...). Associative Array = string keys (\"Name\", \"Age\"...). Multidimensional = array inside array (matrix/table structure). Know how to CREATE and ACCESS each type.",
        },
        {
          type: "nav",
          back: "functions",
          practice: true,
        },
      ],
    },

  ],
}
