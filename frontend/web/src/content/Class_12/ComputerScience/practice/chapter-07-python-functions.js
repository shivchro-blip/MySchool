export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 7 -- Python Functions",
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
          "label": "Python Functions",
          "questions": [
            { "id": "q1", "html": "A named blocks of code that are designed to do one specific job is called as", "options": ["a) Loop", "b) Branching", "c) Function", "d) Block"], "answer": 2, "hint": "A function is defined as a named block of code designed for a specific job." },
            { "id": "q2", "html": "A Function which calls itself is called as", "options": ["a) Built-in", "b) Recursion", "c) Lambda", "d) return"], "answer": 1, "hint": "A function calling itself is recursion." },
            { "id": "q3", "html": "Which function is called anonymous un-named function", "options": ["a) Lambda", "b) Recursion", "c) Function", "d) define"], "answer": 0, "hint": "Lambda functions are anonymous, defined without a name." },
            { "id": "q4", "html": "Which of the following keyword is used to begin the function block?", "options": ["a) define", "b) for", "c) finally", "d) def"], "answer": 3, "hint": "Function blocks begin with the keyword 'def'." },
            { "id": "q5", "html": "Which of the following keyword is used to exit a function block?", "options": ["a) define", "b) return", "c) finally", "d) def"], "answer": 1, "hint": "The return statement exits a function." },
            { "id": "q6", "html": "While defining a function which of the following symbol is used.", "options": ["a) ; (semicolon)", "b) . (dot)", "c) : (colon)", "d) $ (dollar)"], "answer": 2, "hint": "A colon (:) follows the function header, before the indented block." },
            { "id": "q7", "html": "In which arguments the correct positional order is passed to a function?", "options": ["a) Required", "b) Keyword", "c) Default", "d) Variable-length"], "answer": 0, "hint": "Required arguments must be passed in the exact positional order defined." },
            { "id": "q8", "html": "Read the statements: (I) In Python, you don't have to mention specific data types while defining a function. (II) Python keywords can be used as function name. Choose the correct statement(s).", "options": ["a) I is correct and II is wrong", "b) Both are correct", "c) I is wrong and II is correct", "d) Both are wrong"], "answer": 0, "hint": "Python doesn't require explicit data types for parameters (I true), but keywords cannot be used as function names (II false)." },
            { "id": "q9", "html": "Pick the correct one to execute the given statement successfully: if ____ : print(x, \" is a leap year\")", "options": ["a) x%2=0", "b) x%4==0", "c) x/4=0", "d) x%4=0"], "answer": 1, "hint": "A basic leap year check uses the equality comparison x%4==0 (== not =)." },
            { "id": "q10", "html": "Which of the following keyword is used to define the function testpython(): ?", "options": ["a) define", "b) pass", "c) def", "d) while"], "answer": 2, "hint": "Functions are defined using the 'def' keyword." }
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
        { "q": "What is function?", "ans": "A function is a named block of code that is designed to do one specific job. Functions are a group of related statements that perform a specific task, and can be called by name whenever that task needs to be performed." },
        { "q": "Write the different types of function.", "ans": "Python functions are of four types: User-defined functions (defined by the user), Built-in functions (inbuilt within Python), Lambda functions (anonymous, un-named functions), and Recursion functions (functions that call themselves)." },
        { "q": "What are the main advantages of function?", "ans": "The main advantages of functions are: (1) they avoid repetition and allow a high degree of code reuse; (2) they provide better modularity for the application, dividing a program into manageable pieces." },
        { "q": "What is meant by scope of variable? Mention its types.", "ans": "Scope of a variable refers to the part of the program where it is accessible -- the area where you can refer to (use) it. There are two types: Local scope (accessible only within the function where declared) and Global scope (accessible anywhere in the program)." },
        { "q": "What is base condition in recursive function?", "ans": "The base condition is the condition applied in a recursive function that stops the recursive calls and causes the function to return a meaningful result. A base condition is a must in every recursive function -- without it, the function would continue calling itself indefinitely, like an infinite loop." }
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
        { "q": "Write the rules of local variable.", "ans": "The rules of a local variable are: (1) a variable with local scope can be accessed only within the function it is created in; (2) when a variable is created inside a function, it becomes local to that function; (3) a local variable only exists while the function is executing; (4) the formal parameters of a function are also local to it." },
        { "q": "Write the basic rules for global keyword in python.", "ans": "The basic rules are: (1) a variable defined outside a function is global by default -- no keyword is needed just to define it; (2) the 'global' keyword is required specifically to MODIFY the value of a global variable from inside a function; (3) using the global keyword outside a function has no effect." },
        { "q": "Differentiate ceil() and floor() function.", "ans": "math.floor(x) returns the largest integer LESS THAN OR EQUAL TO x -- it always rounds DOWN (towards negative infinity). For example, math.floor(26.7) is 26, and math.floor(-26.7) is -27. math.ceil(x) returns the smallest integer GREATER THAN OR EQUAL TO x -- it always rounds UP (towards positive infinity). For example, math.ceil(26.7) is 27, and math.ceil(-26.7) is -26." }
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
          "q": "Explain the different types of function with an example.",
          "ans": "Python has four types of functions:\n\n1. User-defined functions: Created by the programmer for a specific task. Example: def add(a,b): return a+b\n\n2. Built-in functions: Already available in Python, like print(), abs(), len(), sqrt(). Example: print(abs(-10)) gives 10.\n\n3. Lambda functions: Anonymous functions defined using the lambda keyword instead of def, typically for small one-time use. Example: sum = lambda a,b: a+b; print(sum(3,4)) gives 7.\n\n4. Recursion functions: Functions that call themselves, used for problems that can be broken into smaller versions of themselves. Example: def fact(n): return 1 if n==0 else n*fact(n-1); this computes factorial by calling itself with a smaller n until the base case n==0 is reached."
        },
        {
          "q": "Explain the scope of variables with an example.",
          "ans": "Scope of a variable refers to the part of the program where it can be accessed. Python has two scope types:\n\n1. Local scope: A variable declared inside a function's body -- accessible only within that function, and exists only while the function executes. Example:\ndef loc():\n    y = 0\n    print(y)\nloc()   # prints 0; accessing y outside loc() gives NameError\n\n2. Global scope: A variable declared outside any function -- accessible anywhere in the program. Reading a global variable inside a function works without any keyword, but MODIFYING it requires the 'global' keyword. Example:\nx = 0\ndef add():\n    global x\n    x = x + 5\n    print(x)   # 5\nadd()\nprint(x)   # 5 (modified globally, since 'global x' was declared)\n\nWithout the global keyword, trying to modify x inside add() would raise an UnboundLocalError, since Python would treat x as a new local variable instead."
        },
        {
          "q": "Explain the following built-in functions: (a) id() (b) chr() (c) round() (d) type() (e) pow()",
          "ans": "(a) id(): Returns the 'identity' of an object -- essentially its address in memory. Example: x=15; print(id(x)) shows a numeric memory address (which may vary by system).\n\n(b) chr(): Returns the Unicode character for a given ASCII/Unicode value -- the inverse of ord(). Example: chr(65) returns 'A'.\n\n(c) round(): Returns the value rounded to the nearest integer, or to a specified number of decimal digits if a second argument (ndigits) is given. Example: round(17.9) gives 18; round(17.89, 1) gives 17.9.\n\n(d) type(): Returns the type of a given object. Example: type(15.2) returns <class 'float'>; type('a') returns <class 'str'>.\n\n(e) pow(): Returns the value of a raised to the power of b, i.e., a**b. Example: pow(5,2) returns 25; pow(2,3.0) returns 8.0."
        },
        {
          "q": "Explain recursive function with an example.",
          "ans": "A recursive function is a function that calls itself to solve a problem by breaking it into smaller instances of the same problem. Recursion works like a loop, but is sometimes more natural to express certain problems. Every recursive function must have a base condition -- a stopping point -- otherwise it will call itself indefinitely, like an infinite loop, eventually causing a Recursion Error once Python's default recursion depth limit (1000 calls) is exceeded (this limit can be changed using sys.setrecursionlimit()).\n\nExample -- factorial using recursion:\ndef fact(n):\n    if n == 0:\n        return 1\n    else:\n        return n * fact(n-1)\nprint(fact(5))   # 120\n\nHere, the base condition is n==0, which returns 1 directly. For any other n, the function calls itself with fact(n-1), and multiplies the result by n. So fact(5) = 5*fact(4) = 5*4*fact(3) = ... = 5*4*3*2*1*fact(0) = 5*4*3*2*1*1 = 120, unwinding back up the chain of calls once the base case is reached."
        }
      ]
    }
  ]
}
