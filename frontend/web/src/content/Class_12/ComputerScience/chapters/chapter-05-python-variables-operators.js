export default {
  chapterNumber: 5,
  title: "Python - Variables and Operators",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-python",
      title: "Introduction & Key Features of Python",
      content: `**5.1 Introduction**

Python is a general purpose programming language created by **Guido Van Rossum** from CWI (Centrum Wiskunde & Informatica), a National Research Institute for Mathematics and Computer Science in the Netherlands. The language was released in **1991**. Python got its name from a BBC comedy series from the seventies — "Monty Python's Flying Circus". Python supports both **Procedural** and **Object Oriented** programming approaches.

**5.2 Key Features of Python**
- It is a general purpose programming language that can be used for both scientific and non-scientific programming.
- It is a platform independent programming language.
- Programs written in Python are easily readable and understandable.

The version 3.x of **Python IDLE** (Integrated Development Learning Environment) is used to develop and run Python code. It can be downloaded from www.python.org.`,
      nav: { next: "programming-modes", nextLabel: "Next: Interactive & Script Mode →" }
    },
    {
      id: "programming-modes",
      title: "Interactive Mode & Script Mode",
      content: `**5.3 Programming in Python**

In Python, programs can be written in two ways: **Interactive mode** and **Script mode**.

**5.3.1 Interactive Mode Programming**

Interactive mode allows writing code directly in the Python command prompt (\`>>>\`), and the interpreter displays results immediately — it can also be used as a simple calculator.

**Invoking Python IDLE (Windows):** Start → All Programs → Python 3.x → IDLE (Python 3.x), or click the Python icon on the Desktop. The prompt \`>>>\` indicates the interpreter is ready to accept instructions.

Examples as a calculator:
\`\`\`
>>> 5 + 10
15
>>> 5 + 50 * 10
505
>>> 5 ** 2
25
>>> print("Python Programming Language")
Python Programming Language
>>> x = 10
>>> y = 20
>>> z = x + y
>>> print("The Sum", z)
The Sum = 30
\`\`\`

**5.3.2 Script Mode Programming**

A **script** is a text file containing Python statements. Python scripts are reusable code — once created, they can be executed repeatedly without retyping, and are editable.

**Creating a script:** File → New File (or Ctrl+N) → type code in the script editor:
\`\`\`
a = 100
b = 350
c = a + b
print("The Sum=", c)
\`\`\`

**Saving:** File → Save (or Ctrl+S) → in the Save As dialog, choose a location and file name; Python files are saved with the **.py** extension by default (no need to type the extension yourself).

**Executing:** Run → Run Module (or press **F5**). Errors appear in red in the IDLE window with a description of the error type — correct them in the editor, save (Ctrl+S), and run again. Error-free code shows its output in the IDLE window.`,
      nav: { back: "intro-python", next: "io-functions", nextLabel: "Next: Input & Output Functions →" }
    },
    {
      id: "io-functions",
      title: "Input and Output Functions",
      content: `**5.4 Input and Output Functions**

A program needs to interact with the user — achieved using Input-Output functions. The **input()** function enters data at run time; the **print()** function displays results on the screen.

**5.4.1 The print() function**

Syntax:
\`\`\`
print("string to be displayed as output")
print(variable)
print("String to be displayed as output", variable)
print("String1", variable, "String2", variable, "String3" ...)
\`\`\`
Example:
\`\`\`
>>> print("Welcome to Python Programming")
Welcome to Python Programming
>>> x = 5
>>> y = 6
>>> z = x + y
>>> print(z)
11
>>> print("The sum = ", z)
The sum =  11
>>> print("The sum of ", x, " and ", y, " is ", z)
The sum of  5  and  6  is  11
\`\`\`
print() evaluates the expression before printing it. Comma (,) is used as a separator in print() to print more than one item.

**5.4.2 input() function**

Syntax:
\`\`\`
Variable = input("prompt string")
\`\`\`
The prompt string is a message telling the user what input to give. If given, it's displayed on the monitor; the user then provides data. If no prompt string is given, no message is displayed, so the user won't know what to type.

**Example with prompt string:**
\`\`\`
>>> city = input("Enter Your City: ")
Enter Your City: Madurai
>>> print("I am from ", city)
I am from  Madurai
\`\`\`
**Example without prompt string:**
\`\`\`
>>> city = input()
Rajarajan
>>> print("I am from", city)
I am from Rajarajan
\`\`\`
Without a prompt string, the user won't know what's expected — leading to unexpected input, so always provide a prompt string to make programs more interactive.

**Important:** input() accepts all data as **string**, not as numbers. If a numeric value is needed, it must be explicitly converted using the **int()** function (or similar).
\`\`\`
x = int(input("Enter Number 1: "))
y = int(input("Enter Number 2: "))
print("The sum = ", x+y)
\`\`\`
Output: Enter Number 1: 34, Enter Number 2: 56, The sum = 90

**Alternate method (multiple assignment):**
\`\`\`
x, y = int(input("Enter Number 1 :")), int(input("Enter Number 2:"))
print("X = ", x, " Y = ", y)
\`\`\``,
      nav: { back: "programming-modes", next: "comments-tokens", nextLabel: "Next: Comments, Indentation & Tokens →" }
    },
    {
      id: "comments-tokens",
      title: "Comments, Indentation, Identifiers & Keywords",
      content: `**5.5 Comments in Python**

Comments begin with a hash symbol (**#**). Lines beginning with # are ignored by the interpreter. Comments may be single-line, or multi-line (enclosed within triple quotes \`''' '''\`):
\`\`\`
# It is a single line comment
''' It is a multiline comment
which contains more than one line '''
\`\`\`

**5.6 Indentation**

Python uses whitespace (spaces and tabs) to define program blocks, whereas languages like C, C++, and Java use curly braces {}. The number of whitespaces in indentation is not fixed, but ALL statements within a block must be indented with the SAME amount of spaces.

**5.7 Tokens**

Python breaks each logical line into a sequence of elementary lexical components called **Tokens**. The normal token types are: (1) Identifiers, (2) Keywords, (3) Operators, (4) Delimiters, (5) Literals. Whitespace separation is necessary between tokens.

**5.7.1 Identifiers**

An identifier is a name used to identify a variable, function, class, module, or object.
- Must start with an alphabet (A-Z, a-z) or underscore (_).
- May contain digits (0-9).
- Are case-sensitive — uppercase and lowercase are distinct.
- Must not be a Python keyword.
- Cannot contain punctuation characters like %, $, @, etc.

Valid: Sum, total_marks, regno, num1
Invalid: 12Name, name$, total-mark, continue (a keyword)

**5.7.2 Keywords**

Keywords are special reserved words used by the Python interpreter to recognize the structure of a program — they cannot be used for any other purpose (e.g., as identifiers).

Python's Keywords: False, None, True, and, as, assert, break, class, continue, def, del, elif, else, except, finally, for, from, global, if, import, in, is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield.`,
      nav: { back: "io-functions", next: "operators", nextLabel: "Next: Operators →" }
    },
    {
      id: "operators",
      title: "Operators",
      content: `**5.7.3 Operators**

Operators are special symbols representing computations, conditional matching, etc. The values used with an operator are called **operands**. Operators are categorized as Arithmetic, Relational, Logical, Assignment, and Conditional (Ternary).

**(i) Arithmetic Operators** (assume a=100, b=10):

| Operator | Operation | Example | Result |
|---|---|---|---|
| + | Addition | a + b | 110 |
| - | Subtraction | a - b | 90 |
| * | Multiplication | a * b | 1000 |
| / | Division | a / b | 10.0 |
| % | Modulus | a % 30 | 10 |
| ** | Exponent | a ** 2 | 10000 |
| // | Floor Division | a // 30 | 3 |

**(ii) Relational (Comparative) Operators** — check the relationship between two operands, returning True or False (assume a=100, b=35):

| Operator | Operation | Example | Result |
|---|---|---|---|
| == | Equal | a == b | False |
| > | Greater than | a > b | True |
| < | Less than | a < b | False |
| >= | Greater or equal | a >= b | True |
| <= | Less or equal | a <= b | False |
| != | Not equal | a != b | True |

**(iii) Logical Operators** — used on relational expressions: **and**, **or**, **not** (assume a=97, b=35):

| Operator | Example | Result |
|---|---|---|
| or | a>b or a==b | True |
| and | a>b and a==b | False |
| not | not a>b | False (i.e., Not True) |

**(iv) Assignment Operators** — \`=\` assigns the right operand to the left variable, e.g., \`a, b = 5, 10\` assigns 5 to a and 10 to b. Compound assignment operators: **+=, -=, *=, /=, %=, **=, //=** — each combines an operation with assignment (e.g., \`x += 20\` means \`x = x + 20\`).

**(v) Conditional Operator (Ternary)** — evaluates something based on a condition, replacing a multi-line if-else with a compact single line.

Syntax:
\`\`\`
Variable Name = [on_true] if [Test expression] else [on_false]
\`\`\`
Example:
\`\`\`
min = 49 if 49<50 else 50   # min = 49
a, b = 30, 20
min = a if a < b else b
print("The Minimum of A and B is ", min)   # Output: 20
\`\`\``,
      nav: { back: "comments-tokens", next: "delimiters-literals", nextLabel: "Next: Delimiters & Literals →" }
    },
    {
      id: "delimiters-literals",
      title: "Delimiters & Literals",
      content: `**5.7.4 Delimiters**

Delimiters are sequences of one or more characters used to specify the boundary between separate, independent regions in text or data streams. Python uses these as delimiters in expressions, lists, dictionaries, and strings:
\`\`\`
(  )  [  ]  {  }  ,  :  .  '  =  ;
\`\`\`

**5.7.5 Literals**

A literal is raw data given to a variable or constant. Python has three types: Numeric, String, and Boolean.

**(i) Numeric Literals** — digits, immutable, belonging to Integer, Float, or Complex types.
\`\`\`
a = 0b1010    # Binary Literal
b = 100       # Decimal Literal
c = 0o310     # Octal Literal
d = 0x12c     # Hexadecimal Literal
float_1 = 10.5
float_2 = 1.5e2
x = 1 + 3.14j  # Complex Literal — x.imag=3.14, x.real=1.0
\`\`\`

**(ii) String Literals** — a sequence of characters surrounded by quotes; Python supports single, double, and triple quotes. A character literal is a single character in single/double quotes. Triple quotes (\`''' '''\`) give a multi-line string literal.
\`\`\`
strings = "This is Python"
char = "C"
multiline_str = '''This is a multiline string with more than one line code.'''
\`\`\`

**(iii) Boolean Literals** — either **True** or **False**.
\`\`\`
boolean_1 = True
boolean_2 = False
\`\`\`

**(iv) Escape Sequences** — the backslash \`\\\` is the "escape" character, used for special whitespace characters: \`\\t\` (tab), \`\\n\` (newline), \`\\r\` (carriage return). Example: \`print("It\\'s raining")\` outputs \`It's raining\`. Other escape sequences: \`\\\\\` (backslash), \`\\'\` (single quote), \`\\"\` (double quote).`,
      nav: { back: "operators", next: "data-types", nextLabel: "Next: Python Data Types →" }
    },
    {
      id: "data-types",
      title: "Python Data Types",
      content: `**5.8 Python Data Types**

All data values in Python are objects, and each object has a type. Python has Built-in/Fundamental data types: Number, String, Boolean, tuples, lists, sets, and dictionaries.

**5.8.1 Number Data Type**

Built-in number objects support integers, floating point numbers, and complex numbers.
- Integer data can be decimal, octal, or hexadecimal. Octal uses 0 followed by 'o'; hexadecimal uses 0X (or 0x); L (uppercase) denotes long integers.
\`\`\`
102, 4567, 567      # Decimal integers
0o102, 0o876        # Octal integers
0X102, 0X876        # Hexadecimal integers
34L, 523L           # Long decimal integers
\`\`\`
- A floating point number includes a decimal point; an exponent has a decimal digit part, decimal point, exponent part, and digits.
\`\`\`
123.34, 456.23      # Floating point data
12.E04, 24.e04      # Exponent data
\`\`\`
- A complex number is made up of two floating point values — one each for the real and imaginary parts.

**5.8.2 Boolean Data Type** — can have any of two values: **True** or **False**.
\`\`\`
Bool_var1 = True
Bool_var2 = False
\`\`\`

**5.8.3 String Data Type** — enclosed in single, double, or triple quotes.
\`\`\`
Char_data = 'A'
String_data = "Computer Science"
Multiline_data = """String data can be enclosed in single quotes or
double quotes or triple quotes."""
\`\`\``,
      nav: { back: "delimiters-literals", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Python is a general purpose programming language created by Guido Van Rossum.
- Python shell can be used in two ways: Interactive mode and Script mode.
- Python uses whitespace (spaces and tabs) to define program blocks.
- Whitespace separation is necessary between tokens, identifiers, or keywords.
- Input-Output functions (input(), print()) let a program interact with the user.
- Python breaks each logical line into a sequence of elementary lexical components known as Tokens.
- Keywords are special words used by the Python interpreter to recognize program structure.
- Operators (Arithmetic, Relational, Logical, Assignment, Conditional/Ternary) act on operands to compute results.
- Literals are raw data assigned to variables — Numeric, String, and Boolean are the three types in Python.`,
      nav: { back: "data-types", practice: true }
    }
  ]
}
