export default {
  chapterNumber: 15,
  title: "Control Structure in JavaScript",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "branching",
      title: "Branching Statements",
      content: `**Control Structures** alter the normal sequence of execution. Two types:
- **Branching / Selection:** Execute different code based on a condition.
- **Looping / Repetitive:** Execute code multiple times.

---

**Branching Statements:**
A branch transfers control from the current statement to another. Types: \`if\`, \`if...else\`, \`else if\`, \`switch\`.

---

**if Statement:**
Executes a block only if the condition is true.
\`\`\`
if (condition) {
  // true block
}
\`\`\`
Example: Check voting eligibility
\`\`\`
var age = prompt("Please enter your Age:", "0");
if (age >= 16) {
  alert("You Are Eligible to Vote....");
}
\`\`\`

---

**if...else Statement:**
Executes one block if true, another if false.
\`\`\`
if (expression) {
  // statements if true
} else {
  // statements if false
}
\`\`\`
Example: Driving licence eligibility
\`\`\`
var age = prompt("Please enter your Age:", "0");
if (age >= 18) {
  alert("You Are Eligible to get Driving Licence..");
} else {
  alert("You Are Not Eligible to get Driving Licence..");
}
\`\`\`

---

**else if Statement:**
Tests multiple conditions in sequence. When the first condition is false, the next \`else if\` is checked.
\`\`\`
if (marks > 90) {
  document.write("Your Grade is Outstanding..");
} else if ((marks > 70) && (marks <= 90)) {
  document.write("Your Grade is Excellent..");
} else if ((marks > 50) && (marks <= 70)) {
  document.write("Your Grade is Good..");
} else if ((marks > 40) && (marks <= 50)) {
  document.write("Your Grade is Satisfactory..");
} else {
  document.write("Your Grade is Poor and have to re-appear Exam..");
}
\`\`\`

---

**switch Statement:**
An alternative to \`if...else\` when testing all possible results of an expression.
\`\`\`
switch (expression) {
  case label1:
    statements1;
    break;
  case label2:
    statements2;
    break;
  default:
    statements;
}
\`\`\`

**break** exits the switch once a matching case executes. Without break, execution falls through to the next case.

**default** executes when no case label matches the expression.`,
      nav: { next: "looping", nextLabel: "Looping Statements \u2192" }
    },
    {
      id: "looping",
      title: "Looping Statements",
      content: `Loops execute the same portion of code repeatedly with slightly different values. JavaScript supports three loop types: \`for\`, \`while\`, \`do...while\`.

---

**for Loop:**
A rigid, flexible structure that loops a pre-set number of times.
\`\`\`
for (initialization; condition; increment/decrement) {
  // body of the loop
}
\`\`\`

Three parts (separated by semicolons):
1. **Initialization:** Declare and initialise the control variable.
2. **Condition:** Determines how many times the loop iterates.
3. **Increment/Decrement:** Changes the control variable each iteration.

Example: Print multiplication table
\`\`\`
var no1 = prompt("Please enter Table You want:", "0");
for (var no2 = 0; no2 <= 10; no2++) {
  document.write(no1 + " x " + no2 + " = " + no1 * no2 + "<br>");
}
\`\`\`

---

**break Statement:** Terminates the loop early when a condition is met.
\`\`\`
for (var n = 0; n <= 10; n++) {
  if (n == 5) { break; }
  document.write(n + " ");
}
// Output: 0 1 2 3 4
\`\`\`

**continue Statement:** Skips the current iteration and continues with the next.
\`\`\`
for (var n = 0; n <= 10; n++) {
  if (n == 5) { continue; }
  document.write(n + " ");
}
// Output: 0 1 2 3 4 6 7 8 9 10 (5 is skipped)
\`\`\`

---

**while Loop:**
Executes a block repeatedly as long as a condition is true. Condition is evaluated **before** each iteration.
\`\`\`
while (condition) {
  // body of the loop
}
\`\`\`
Example:
\`\`\`
var no2 = 0;
while (no2 <= 5) {
  document.write(no2 + " ");
  no2 = no2 + 1;
}
// Output: 0 1 2 3 4 5
\`\`\`

---

**do...while Loop:**
Like \`while\`, but the condition is evaluated **after** each iteration. The body always executes **at least once**.
\`\`\`
do {
  // body of the loop
} while (expression);
\`\`\`
Example:
\`\`\`
var no2 = 0;
do {
  document.write(no2 + " ");
  no2 = no2 + 2;
} while (no2 <= 10);
// Output: 0 2 4 6 8 10
\`\`\`

**Key difference:** In \`while\`, if the condition is false initially, the body never runs. In \`do...while\`, the body always runs at least once before the condition is checked.`,
      nav: { back: "branching", practice: true }
    }
  ]
}
