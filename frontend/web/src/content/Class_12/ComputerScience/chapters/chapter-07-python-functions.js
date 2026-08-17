export default {
  chapterNumber: 7,
  title: "Python Functions",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-types",
      title: "Introduction & Types of Functions",
      content: `**7.1 Introduction**

Functions are named blocks of code designed to do a specific job. Calling a function's name runs the code inside it, avoiding repeated typing when a task is needed multiple times throughout a program. Functions make programs easier to write, read, test, and fix.

**Note:** Functions are nothing but a group of related statements that perform a specific task.

**Main advantages of functions:**
- Avoids repetition and enables a high degree of code reuse.
- Provides better modularity for the application.

**7.1.1 Types of Functions**

| Function | Description |
|---|---|
| User-defined functions | Functions defined by the users themselves |
| Built-in functions | Functions inbuilt within Python |
| Lambda functions | Anonymous, un-named functions |
| Recursion functions | Functions that call themselves |`,
      nav: { next: "defining-calling", nextLabel: "Next: Defining & Calling Functions →" }
    },
    {
      id: "defining-calling",
      title: "Defining and Calling Functions",
      content: `**7.2 Defining Functions**

Functions must be defined before use. When defining functions:
- Function blocks begin with keyword **def** followed by the function name and parentheses ().
- If input parameters are present, they're placed within the parentheses.
- The code block comes after a colon (:) and is indented.
- The statement **return [expression]** exits a function, optionally passing back a value. A bare "return" (no arguments) is the same as "return None".

**Note:** Python keywords should not be used as function names.

**7.2.1 Syntax for User-defined Function**
\`\`\`
def function_name([parameter1, parameter2...]):
    <Block of Statements>
    return <expression / None>
\`\`\`
(The text in square brackets [] is optional.)

**Block/Nested Block:** A block is one or more lines of code grouped together as one sequence, using indentation (usually 4 spaces) at the same level. A **block within a block** is called a nested block — the second block indents by double the tab spacing of the first.

Example:
\`\`\`
def Do_Something():
    value = 1       # Assignment Statement
    return value    # Return Statement
\`\`\`

**7.2.2 Advantages of User-defined Functions**
1. Help divide a program into modules, making the code easier to manage.
2. Implement code reuse — every time a sequence of statements is needed, simply call the function.
3. Allow easy changes to functionality, and different programmers can work on different functions.

**7.3 Calling a Function**
\`\`\`
def hello():
    print("hello - Python")
    return
hello()
\`\`\`
Output: \`hello – Python\`

Calling within print():
\`\`\`
def hello():
    print("hello - Python")
    return
print(hello())
\`\`\`
If \`return\` has no argument, "None" is also displayed:
\`\`\`
hello – Python
None
\`\`\``,
      nav: { back: "intro-types", next: "parameters-arguments", nextLabel: "Next: Parameters & Function Arguments →" }
    },
    {
      id: "parameters-arguments",
      title: "Parameters & Function Arguments",
      content: `**7.4 Passing Parameters in Functions**

Syntax:
\`\`\`
def function_name(parameter(s) separated by comma):
\`\`\`
Example:
\`\`\`
def area(w, h):
    return w * h
print(area(3, 5))    # Output: 15
\`\`\`

**Note:** Parameters and arguments are often used interchangeably, but parameters are the variables used in the function *definition*, while arguments are the values passed to those parameters.

**7.5 Function Arguments**

There are 4 types: **Required**, **Keyword**, **Default**, **Variable-length**.

**7.5.1 Required Arguments** — passed in the correct positional order; the number of arguments must exactly match the function definition.
\`\`\`
def printstring(str):
    print("Example - Required arguments ")
    print(str)
    return
printstring()   # ERROR: missing 1 required positional argument: 'str'
printstring("Welcome")   # Works correctly
\`\`\`

**7.5.2 Keyword Arguments** — invoke the function by matching parameter names, so arguments can be given out of order.
\`\`\`
def printdata(name, age):
    print("Name :", name)
    print("Age :", age)
    return
printdata(age=25, name="Gshan")   # Order doesn't matter with keyword args
\`\`\`
If a non-existent keyword is used (e.g., name1= instead of name=), Python raises: \`TypeError: ...got an unexpected keyword argument\`.

**7.5.3 Default Arguments** — take a default value if none is provided in the call.
\`\`\`
def printinfo(name, salary=3500):
    print("Name: ", name)
    print("Salary: ", salary)
    return
printinfo("Mani")           # Salary: 3500 (default used)
printinfo("Ram", 2000)      # Salary: 2000 (default overridden)
\`\`\`

**7.5.4 Variable-Length Arguments** — used when more arguments are needed than specified in the definition; not fixed in the definition, marked with an asterisk (*).

Passing more than the fixed number causes an error:
\`\`\`
def sum(x, y, z):
    print("sum of three nos :", x+y+z)
sum(5,10,15,20,25)   # TypeError: sum() takes 3 positional arguments but 5 were given
\`\`\`

**Syntax:**
\`\`\`
def function_name(*args):
    function_body
    return_statement
\`\`\`
Example:
\`\`\`
def printnos(*nos):
    for n in nos:
        print(n)
    return
printnos(1, 2)          # Two values
printnos(10, 20, 30)    # Three values
\`\`\`
Variable-length arguments can be passed via two methods: **Non-keyword variable arguments** (stored internally as a tuple) or **Keyword variable arguments** (beyond this book's scope). Python's own print() function is itself an example supporting variable-length arguments.`,
      nav: { back: "defining-calling", next: "anonymous-return", nextLabel: "Next: Anonymous Functions & return Statement →" }
    },
    {
      id: "anonymous-return",
      title: "Anonymous (Lambda) Functions & the return Statement",
      content: `**7.6 Anonymous Functions**

An **anonymous function** is a function defined without a name — using the **lambda** keyword instead of def. Hence, anonymous functions are also called **lambda functions**.

**Uses:**
- Mostly used for creating small, one-time anonymous functions.
- Mainly used in combination with functions like filter(), map(), and reduce() (beyond this book's scope).

A lambda function can take any number of arguments but must return exactly one value, expressed as a single expression. It can only access global variables and variables in its own parameter list.

**7.6.1 Syntax**
\`\`\`
lambda [argument(s)] : expression
\`\`\`
Example:
\`\`\`
sum = lambda arg1, arg2: arg1 + arg2
print('The Sum is :', sum(30,40))   # 70
print('The Sum is :', sum(-30,40))  # 10
\`\`\`

**7.7 The return Statement**

- Causes the function to exit and returns a value to its caller. Functions generally take inputs and return something.
- Only ONE return statement executes at run time, even if a function contains multiple return statements — any number of return statements are allowed in the definition, but only one executes per call.

**7.7.1 Syntax**
\`\`\`
return [expression list]
\`\`\`
If there is no expression, or no return statement at all, the function returns **None**.

Example:
\`\`\`
def usr_abs(n):
    if n >= 0:
        return n
    else:
        return -n
x = int(input("Enter a number :"))
print(usr_abs(x))
\`\`\`
Output for -25: \`25\``,
      nav: { back: "parameters-arguments", next: "scope", nextLabel: "Next: Scope of Variables →" }
    },
    {
      id: "scope",
      title: "Scope of Variables",
      content: `**7.8 Scope of Variables**

Scope refers to the part of the program where a variable is accessible. There are two types: **Local scope** and **Global scope**.

**7.8.1 Local Scope**

A variable declared inside a function's body is a **local variable**.

**Rules:**
- Accessible only within the function it is created in.
- Becomes local the moment it's created inside the function.
- Exists only while the function is executing.
- Formal parameters are also local to the function.

\`\`\`
def loc():
    y = 0    # local scope
    print(y)
loc()   # Output: 0
\`\`\`
Trying to access it outside gives an error:
\`\`\`
def loc():
    y = "local"
loc()
print(y)   # NameError: name 'y' is not defined
\`\`\`

**7.8.2 Global Scope**

A variable with global scope can be used anywhere in the program — created by defining a variable outside the scope of any function.

**Rules for the global keyword:**
- A variable defined outside a function is global by default — no keyword needed.
- The **global** keyword is needed to MODIFY a global variable from INSIDE a function.
- Using global outside a function has no effect.

**Accessing (reading) a global variable from inside a function works fine without the keyword:**
\`\`\`
c = 1    # global variable
def add():
    print(c)
add()   # Output: 1
\`\`\`
**Modifying a global variable WITHOUT the global keyword fails:**
\`\`\`
c = 1
def add():
    c = c + 2   # UnboundLocalError: local variable 'c' referenced before assignment
    print(c)
add()
\`\`\`
**Modifying a global variable WITH the global keyword works:**
\`\`\`
x = 0
def add():
    global x
    x = x + 5
    print("Inside add() function x value is :", x)
add()
print("In main x value is :", x)
# Output: Inside add() function x value is : 5
#         In main x value is : 5
\`\`\`

**7.8.3 Global and Local Variables Together**

\`\`\`
x = 8              # global variable
def loc():
    global x
    y = "local"
    x = x * 2
    print(x)       # 16
    print(y)       # local
loc()
\`\`\`

**Global and local variable with the same name:**
\`\`\`
x = 5
def loc():
    x = 10
    print("local x:", x)
loc()
print("global x:", x)
# Output: local x: 10
#         global x: 5
\`\`\`
Since 'x' is declared in both scopes (local inside loc(), global outside), each print refers to the version visible in its own scope.`,
      nav: { back: "anonymous-return", next: "builtin-math-functions", nextLabel: "Next: Built-in & Mathematical Functions →" }
    },
    {
      id: "builtin-math-functions",
      title: "Built-in, Mathematical Functions & Composition",
      content: `**7.9 Functions Using Libraries**

**7.9.1 Built-in and Mathematical Functions**

| Function | Description | Example |
|---|---|---|
| abs(x) | Returns absolute value | abs(-23.2) → 23.2 |
| ord(c) | Returns ASCII value of a character | ord('a') → 97 |
| chr(i) | Returns character for an ASCII value (inverse of ord()) | chr(65) → 'A' |
| bin(i) | Returns binary string prefixed with "0b" | bin(15) → '0b1111' |
| type(object) | Returns the type of the object | type(15.2) → \`<class 'float'>\` |
| id(object) | Returns the identity (memory address) of an object | id(x) |
| min(list) | Returns minimum value in a list | min([21,76,98,23]) → 21 |
| max(list) | Returns maximum value in a list | max([21,76,98,23]) → 98 |
| sum(list) | Returns sum of values in a list | sum([21,76,98,23]) → 218 |
| format(value, format_spec) | Formats output — binary ('b'), octal ('o'), fixed-point ('f') | format(14,'b') → '1110' |
| round(number [, ndigits]) | Rounds to the nearest integer, or to given decimal digits | round(17.9) → 18; round(17.89,1) → 17.9 |
| pow(a, b) | Returns aᵇ | pow(5,2) → 25 |

**Note:** \`import math\` must be specified before using mathematical functions like floor, ceil, sqrt.

| Function | Description | Example |
|---|---|---|
| math.floor(x) | Largest integer ≤ x | math.floor(26.7) → 26; math.floor(-26.7) → -27 |
| math.ceil(x) | Smallest integer ≥ x | math.ceil(26.7) → 27; math.ceil(-26.7) → -26 |
| math.sqrt(x) | Square root of x (x must be > 0) | math.sqrt(49) → 7.0 |

**7.9.2 Composition in Functions**

The value returned by a function may be used as an argument for another function, in a nested manner — this is called **composition**. Example: using input() to get a string, then eval() to evaluate its value.
\`\`\`
n1 = eval(input("Enter a number: "))
# Enter a number: 234 → n1 = 234
n2 = eval(input("Enter an arithmetic expression: "))
# Enter an arithmetic expression: 12.0+13.0*2 → n2 = 38.0
\`\`\``,
      nav: { back: "scope", next: "recursion", nextLabel: "Next: Recursive Functions →" }
    },
    {
      id: "recursion",
      title: "Python Recursive Functions",
      content: `**7.10 Python Recursive Functions**

When a function calls itself, it is known as **recursion**. Recursion works like a loop, but sometimes it makes more sense to use recursion than a loop — any loop can be converted to recursion. A recursive function calling itself indefinitely (without a stopping condition) is called **infinite iteration**. The condition applied in a recursive function to stop it is called the **base condition** — a base condition is a MUST in every recursive function, otherwise it continues like an infinite loop.

**Overview of how recursion works:**
1. Recursive function is called by some external code.
2. If the base condition is met, the program gives meaningful output and exits.
3. Otherwise, the function does required processing and calls itself to continue recursion.

**Example — factorial:**
\`\`\`
def fact(n):
    if n == 0:
        return 1
    else:
        return n * fact(n-1)
print(fact(0))   # 1
print(fact(5))   # 120
\`\`\`

**Recursion depth limit:** \`print(fact(2000))\` gives a "Recursion Error" after the maximum recursion depth is exceeded — Python stops calling a recursive function after 1000 calls by default. This limit can be changed using \`sys.setrecursionlimit(limit_value)\`.
\`\`\`
import sys
sys.setrecursionlimit(3000)
def fact(n):
    if n == 0:
        return 1
    else:
        return n * fact(n-1)
print(fact(2000))
\`\`\``,
      nav: { back: "builtin-math-functions", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Functions are named blocks of code designed to do one specific job.
- Types of functions: User-defined, Built-in, Lambda (anonymous), and Recursion.
- Function blocks begin with the keyword "def" followed by the function name and parentheses ().
- A "return" with no arguments is the same as "return None"; the return statement is optional in Python.
- Statements in a block must begin with consistent indentation; a block within a block is a nested block.
- There are 4 types of function arguments: Required, Keyword, Default, and Variable-length.
- Required arguments are passed in correct positional order; Keyword arguments are matched by parameter name; Default arguments use a preset value if omitted; Variable-length arguments (marked with *) accept any number of extra arguments.
- Anonymous (lambda) functions are defined without a name, using the lambda keyword.
- Scope of a variable refers to the part of the program where it is accessible — Local scope (inside a function) or Global scope (outside all functions).
- The global keyword is required to modify (not just read) a global variable from inside a function.
- Composition is using the value returned by one function as the argument for another, in a nested manner.
- A function which calls itself is known as recursion; every recursive function must have a base condition to terminate.`,
      nav: { back: "recursion", practice: true }
    }
  ]
}
