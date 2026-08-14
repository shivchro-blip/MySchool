export default {
  chapterNumber: 14,
  title: "Introduction to JavaScript",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction and Advantages",
      content: `**JavaScript** was jointly introduced by **Netscape and Sun Inc. on December 4, 1995** as JavaScript 1.0. It bridged the gap between the simple world of HTML and complex CGI (Common Gateway Interface) programs on the server.

JavaScript provides a common scripting language for web developers to **design, test, and deploy Internet applications**.

**Advantages of JavaScript:**
- Develops **Dynamic Web Pages** (interactive pages) — static HTML pages are not interactive.
- **Data validation** — user-entered data in a form can be validated before sending to the server, reducing server load.
- **Rich Interface** — includes Textboxes, Buttons, drag-and-drop components and sliders.

**Using JavaScript in HTML — \`<script>\` tag:**
JavaScript is implemented using \`<script>.....</script>\` tags. Best placed in \`<head>\`.

\`\`\`
<script language="javascript" type="text/javascript">
  JavaScript code here
</script>
\`\`\`

**Two attributes of \`<script>\`:**
- \`language\` — specifies the scripting language (value: "javascript"). Optional in modern HTML.
- \`type\` — indicates the scripting language (value: "text/javascript").

**Steps to write a JavaScript program:**
1. Open a text editor and enter HTML + JavaScript code.
2. Save the file.
3. Open in any browser (Internet Explorer, Chrome, etc.).
4. To reload: use Refresh or press **F5**.

**First JavaScript Program:**
\`\`\`
<Html>
<Head>
  <Title>My First JavaScript Program</Title>
  <script language="javascript" type="text/javascript">
    document.write("Hello World!")
  </script>
</Head>
<Body></Body>
</Html>
\`\`\`

**DHTML** = Dynamic Hyper Text Markup Language — JavaScript embedded in HTML.`,
      nav: { next: "variables", nextLabel: "Variables and Data Types \u2192" }
    },
    {
      id: "variables",
      title: "Variables, Data Types and Literals",
      content: `**Lexical Structure of JavaScript:**
- JavaScript is **case-sensitive**. Good practice: type commands in lowercase.
- **Ignores spaces** between tokens.
- **Single-line comments:** \`// comment\`
- **Multi-line comments:** \`/* comment */\`
- Statements separated by **semicolons \`;\`**
- **Literal:** A data value that appears directly in a program.
- **Identifier:** A name for variables, functions, or loop labels.
- **Reserved words** cannot be used as identifiers.

---

**Variables:** A variable is a memory location where a value can be stored. Declared using the **\`var\`** keyword.

\`\`\`
var no;
var no1, no2;
var no1=50, no2=5065;
\`\`\`

**Rules for naming variables:**
1. First character must be a **letter or underscore (\_)**. Not a number.
2. Rest can include letters, numbers, or underscore. No spaces, symbols, or punctuation.
3. Variable names are **case-sensitive** (RegisterNumber ≠ registernumber).
4. No limit on length.
5. **Reserved words** cannot be variable names.

**Scope of Variables:**
- **Global variable:** Defined outside functions; accessible everywhere in the code.
- **Local variable:** Declared inside a function; only accessible within that function.

---

**Basic Data Types:**
- **String:** A list of characters in single or double quotes. Can contain whitespace, special characters (\\n = newline).
- **Number:** Integer or floating-point value.
- **Boolean:** Only two values: \`true\` or \`false\`.

JavaScript variables are **untyped (dynamically typed)** — no need to declare the data type. You can assign a number then later assign a string to the same variable.

**Literals:**
\`\`\`
var int_const = 250;        // Integer
var float_const = 250.85;   // Float
var char_const = 'A';       // Character
var string_const = "Raman"; // String
var boolean_const = true;   // Boolean
\`\`\`

**Assigning values:**
\`\`\`
var numericData1 = 522;
var stringData = "JavaScript has strings";
var booleanData = true;
\`\`\`

**document.write() syntax:**
\`document.write("string " + variable);\`

**Type Casting:** Converting one data type to another (also called casting).
- **Implicit:** Automatically by JavaScript when the data type changes.
- **Explicit:** Manual conversion using functions like \`parseInt()\`, \`parseFloat()\`.`,
      nav: { back: "intro", next: "operators", nextLabel: "Operators \u2192" }
    },
    {
      id: "operators",
      title: "Operators and Expressions",
      content: `An **operator** combines values of operands and evaluates to a new value. An **expression** is a code fragment that evaluates to some data type.

**Three types of expressions:** Arithmetic, Relational, Logical.

---

**Arithmetic Operators:**

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`+\` | Addition | 20 + 120 | 140 |
| \`-\` | Subtraction | 20 \u2013 120 | -100 |
| \`*\` | Multiplication | 10 * 100 | 1000 |
| \`/\` | Division | 100/522 | 5.22 |
| \`%\` | Modulus (remainder) | 100 % 522 | 22 |

**Shorthand Arithmetic Operators:** \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`
Example: \`sum += 20;\` is same as \`sum = sum + 20;\`

---

**Assignment Operator \`=\`:** Assigns a value to a variable.
\`\`\`
var number1 = 10;
var m = n = z = 25; // all three set to 25
var x = 102 + 5 - 50; // x = 57
\`\`\`

---

**Relational (Comparison) Operators:** Compare two values; result is true or false.

| Operator | Meaning | Example (x=10, y=20) | Result |
|----------|---------|----------------------|--------|
| \`==\` | Equality | x==y | false |
| \`!=\` | Inequality | x!=y | true |
| \`<\` | Less than | x<y | true |
| \`>\` | Greater than | x>y | false |
| \`<=\` | Less than or equal | x<=y | true |
| \`>=\` | Greater than or equal | x>=y | false |

---

**Logical Operators:** Combine or invert boolean values.

| Operator | Meaning | Result |
|----------|---------|--------|
| \`&&\` | Logical AND | true if both operands true |
| \`||\` | Logical OR | true if either operand true |
| \`!\` | Logical NOT | true if operand is false |

---

**String Operator (\`+\`):** The \`+\` operator also serves as **string concatenation**. If any operand is a string, \`+\` concatenates instead of adds.
\`var String3 = "Java" + "Script";\` → "JavaScript"

---

**Increment and Decrement Operators:**
- \`++\` (increment): Adds 1 to the operand.
  - **Pre-increment (\`++m\`):** Increments first, then evaluates.
  - **Post-increment (\`m++\`):** Evaluates first, then increments.
- \`--\` (decrement): Subtracts 1 from the operand.

\`\`\`
var m = 1, n = ++m; // m = 2, n = 2 (pre-increment)
var m = 1, n = m++; // m = 2, n = 1 (post-increment)
\`\`\`

---

**typeof Operator:** Returns the data type of a variable as a string.
Returns: "number", "boolean", "string", "function", "undefined".
\`document.write(typeof(value1));\`

---

**Conditional (Ternary) Operator \`?:\`:** Requires three operands.
\`var variablename = (condition) ? value1 : value2;\`
If condition is true → value1; if false → value2.
\`var result = (10 > 15) ? 100 : 150;\` → result = 150 (condition false)`,
      nav: { back: "variables", next: "dialogs", nextLabel: "Dialog Boxes and Comments \u2192" }
    },
    {
      id: "dialogs",
      title: "Dialog Boxes and Comments",
      content: `**JavaScript Popup (Dialog) Boxes:** Three types, also called popup boxes.

**1. Alert Dialog Box:**
Gives a **warning message** to users. Only one button: **OK**.
\`\`\`
alert("Name is compulsory entry");
// or
window.alert("Name is compulsory entry");
\`\`\`

**2. Confirm Dialog Box:**
Takes user's **consent**. Has two buttons: **OK** (returns true) and **Cancel** (returns false).
\`\`\`
confirm("Do you want to continue?");
// or
window.confirm("Do you want to continue?");
\`\`\`

**3. Prompt Dialog Box:**
**Gets user input** — pops up a text box. User fills in text and clicks OK. Has two parameters: (i) label to display, (ii) default string in text box. Returns entered value on OK; returns null on Cancel.
\`\`\`
prompt("Enter Your Name:", "Name");
// or
window.prompt("Enter Your Name:", "Name");
\`\`\`

---

**Comments in JavaScript:**
Comments are ignored by the JavaScript interpreter. Two types:

- **Single-line comment:** Begins with \`//\` — ignores everything to end of line.
\`// This is a single line comment\`

- **Multi-line comment:** Begins with \`/*\` and ends with \`*/\`.
\`/* This is a
multi-line comment */\``,
      nav: { back: "operators", practice: true }
    }
  ]
}
