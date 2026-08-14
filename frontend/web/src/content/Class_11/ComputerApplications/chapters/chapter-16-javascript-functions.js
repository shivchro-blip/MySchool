export default {
  chapterNumber: 16,
  title: "JavaScript Functions",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction to Functions",
      content: `A **function** is a block of JavaScript code that is **defined once** but may be **executed (invoked) any number of times**.

Functions are used to:
- **Encapsulate** code that performs a specific task.
- **Avoid repetition** — write once, use many times.
- **Enhance reusability and program clarity** — keep task-specific code in one place.

For large programs (that occupy more memory and take longer to execute), the program is divided into smaller programs called **modules**.

**JavaScript supports two types of functions:**
1. **Pre-defined (Library) Functions** — already defined in the JavaScript library.
2. **User-defined Functions** — created by the programmer.

---

**Parameterized vs Non-Parameterized Functions:**
- A **parameterized function** includes a list of identifiers (**parameters**) that act as local variables in the function body. When called, values (**arguments**) are passed for these parameters.
- A **non-parameterized function** takes no parameters.
- Functions often use argument values to compute and **return** a value.`,
      nav: { next: "predefined", nextLabel: "Pre-defined Functions \u2192" }
    },
    {
      id: "predefined",
      title: "Pre-defined (Library) Functions",
      content: `**Pre-defined functions** are already defined in the JavaScript library. They are also called **Library functions**.

Examples: \`isNaN()\`, \`toUpperCase()\`, \`toLowerCase()\`, \`length()\`, \`alert()\`, \`prompt()\`, \`write()\`, \`parseInt()\`, \`parseFloat()\`.

**Common Pre-defined Functions:**

| Function | Description | Example | Result |
|----------|-------------|---------|--------|
| \`toUpperCase()\` | Converts string to uppercase | \`"java".toUpperCase()\` | "JAVA" |
| \`toLowerCase()\` | Converts string to lowercase | \`"JAVA".toLowerCase()\` | "java" |
| \`length\` | Finds length of a string | \`"JAVA".length\` | 4 |
| \`parseInt()\` | Converts float to integer | \`parseInt(34.234)\` | 34 |
| \`parseFloat()\` | Converts string to float number | \`parseFloat("34.23")\` | 34.23 |
| \`isNaN()\` | Returns true if value is NOT a number | \`isNaN("A")\` | true |

**isNaN() example:**
\`\`\`
function checknum() {
  var n = document.form1.text1.value;
  if (isNaN(n) == true) {
    document.form1.text2.value = "Not a Number : " + n;
  } else {
    document.form1.text2.value = "It is Number : " + n;
  }
}
\`\`\`

**Note:** \`getElementById()\` method returns the element that has the ID attribute with the specified value. \`elements[0]\` indicates the first option in the element.`,
      nav: { back: "intro", next: "userdefined", nextLabel: "User-defined Functions \u2192" }
    },
    {
      id: "userdefined",
      title: "User-defined Functions",
      content: `**User-defined functions** allow the programmer to **modularise** a program by dividing large programs into smaller, manageable modules.

**Function Definition Format:**
\`\`\`
function function-name(parameter list) {
  // Declaration of variables
  // Executable statements
}
\`\`\`

**Rules:**
- The function-name must be any valid identifier (e.g., \`sum\`).
- The parameter list contains one or more variable names, separated by commas (e.g., \`function sum(x, y)\`).
- The function body must be enclosed in **curly braces \`{ }\`**.

**Example: Sum function**
\`\`\`
function sum(x, y) {
  var m = x + y;
  return m;
}
\`\`\`

**Complete program using a function:**
\`\`\`
<html>
<head>
  <title>Function Example</title>
  <script type="text/JavaScript">
    var input1 = window.prompt("Enter Value1:", "0");
    var input2 = window.prompt("Enter Value2:", "0");
    var v1 = parseInt(input1);
    var v2 = parseInt(input2);
    var s = sum(v1, v2);
    document.writeln("First No: " + v1 + " Second No: " + v2 + " Sum = " + s);

    function sum(x, y) {
      var s = x + y;
      return s;
    }
  </script>
</head>
<body></body>
</html>
\`\`\`

**Online Quiz using function:**
Functions can be used to check a user's answer in a quiz application. The \`checkAnswer()\` function compares the user's radio button selection to the correct answer using \`getElementById()\`:

\`\`\`
function checkAnswer() {
  if (document.getElementById("myQuiz").elements[0].checked)
    alert("Congratulations, Your Answer is correct");
  else
    alert("Your Answer is incorrect, Please try Again");
}
\`\`\`

The form triggers the function on submit: \`<form id="myQuiz" action="JavaScript:checkAnswer()">\``,
      nav: { back: "predefined", practice: true }
    }
  ]
}
