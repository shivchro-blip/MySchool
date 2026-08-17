export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 1 -- Function",
    "time": "3.00 hrs",
    "totalMarks": 52,
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
          "label": "Function",
          "questions": [
            { "id": "q1", "html": "The small sections of code that are used to perform a particular task is called", "options": ["a) Subroutines", "b) Files", "c) Pseudo code", "d) Modules"], "answer": 0, "hint": "Subroutines are reusable small sections of code performing a particular task." },
            { "id": "q2", "html": "Which of the following is a unit of code that is often defined within a greater code structure?", "options": ["a) Subroutines", "b) Function", "c) Files", "d) Modules"], "answer": 1, "hint": "A function is specifically defined as a unit of code within a greater code structure." },
            { "id": "q3", "html": "Which of the following is a distinct syntactic block?", "options": ["a) Subroutines", "b) Function", "c) Definition", "d) Modules"], "answer": 2, "hint": "Definitions are distinct syntactic blocks -- not expressions themselves." },
            { "id": "q4", "html": "The variables in a function definition are called as", "options": ["a) Subroutines", "b) Function", "c) Definition", "d) Parameters"], "answer": 3, "hint": "Parameters are the variables listed in a function definition." },
            { "id": "q5", "html": "The values which are passed to a function definition are called", "options": ["a) Arguments", "b) Subroutines", "c) Function", "d) Definition"], "answer": 0, "hint": "Arguments are the actual values passed when a function is called." },
            { "id": "q6", "html": "Which of the following are mandatory to write the type annotations in the function definition?", "options": ["a) { }", "b) ( )", "c) [ ]", "d) < >"], "answer": 1, "hint": "Parentheses are mandatory when writing type annotations for parameters." },
            { "id": "q7", "html": "Which of the following defines what an object can do?", "options": ["a) Operating System", "b) Compiler", "c) Interface", "d) Interpreter"], "answer": 2, "hint": "An interface defines what an object can do, without carrying out the action itself." },
            { "id": "q8", "html": "Which of the following carries out the instructions defined in the interface?", "options": ["a) Operating System", "b) Compiler", "c) Implementation", "d) Interpreter"], "answer": 2, "hint": "Implementation carries out the actual instructions defined by the interface." },
            { "id": "q9", "html": "The functions which will give exact result when same arguments are passed are called", "options": ["a) Impure functions", "b) Partial Functions", "c) Dynamic Functions", "d) Pure functions"], "answer": 3, "hint": "Pure functions always give the same result for the same arguments." },
            { "id": "q10", "html": "The functions which cause side effects to the arguments passed are called", "options": ["a) impure function", "b) Partial Functions", "c) Dynamic Functions", "d) Pure functions"], "answer": 0, "hint": "Impure functions may cause side effects, including modifying arguments passed to them." }
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
        { "q": "What is a subroutine?", "ans": "A subroutine is a small section of code used to perform a particular task that can be used repeatedly. Subroutines are the basic building blocks of computer programs, and in programming languages these are called functions." },
        { "q": "Define Function with respect to Programming language.", "ans": "A function is a unit of code that is often defined within a greater code structure. Specifically, a function contains a set of code that works on many kinds of inputs, like variables and expressions, and produces a concrete output." },
        { "q": "Write the inference you get from X := (78).", "ans": "X := (78) is not an expression but a function definition. Definitions bind values to names -- here the value 78 is bound to the name X. Definitions are distinct syntactic blocks, different from expressions." },
        { "q": "Differentiate interface and implementation.", "ans": "Interface just defines what an object can do, but won't actually do it -- it is a description of all functions available. Implementation carries out the instructions defined in the interface -- it is where the actual work happens." },
        { "q": "Which of the following is a normal function definition and which is recursive: (i) let sum x y: return x+y (ii) let disp: print 'welcome' (iii) let rec sum num: if(num!=0) then return num+sum(num-1) else return num", "ans": "(i) 'let sum x y' is a normal (non-recursive) function definition, since it does not use the 'rec' keyword and does not call itself. (ii) 'let disp' is also a normal function definition. (iii) 'let rec sum num' is a recursive function definition, since it uses the 'rec' keyword and calls itself (sum(num-1)) within its own body." }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Brief Answers (4 x 3)",
      "title": "Part III -- Brief Answer Questions",
      "type": "short-essay",
      "scoreMax": 12,
      "marksPer": 3,
      "instruction": "Answer in 4-6 sentences.",
      "questions": [
        { "q": "Mention the characteristics of Interface.", "ans": "The characteristics of an interface are: (1) The class template specifies the interfaces to enable an object to be created and operated properly; (2) An object's attributes and behaviour are controlled by sending functions to the object. An interface only defines WHAT an object can do, without specifying how it is actually carried out -- that is left to the implementation." },
        { "q": "Why is strlen called a pure function?", "ans": "strlen is called a pure function because it takes one variable as a parameter and accesses it only to find its length -- it reads external memory (the string) but does not change it, and the value it returns derives purely from that memory content. Since it doesn't modify anything and always returns the same length for the same string, calling it repeatedly with the same argument always gives the same result, satisfying the definition of a pure function." },
        { "q": "What is the side effect of an impure function? Give an example.", "ans": "The side effect of an impure function is that it has observable interaction with the outside world -- commonly, it modifies a variable that exists OUTSIDE the function's own definition. Example: y:=0; let inc(x:int):int := y:=y+x; return(y) -- here, calling inc() modifies the external variable y each time, so the function's effect (and result) depends on this external state rather than solely on its argument x." },
        { "q": "Differentiate pure and impure functions.", "ans": "A pure function's return value depends solely on its arguments -- calling it repeatedly with the same arguments always gives the same return value, and it has no side effects, nor does it modify the arguments passed to it. An impure function's return value does NOT solely depend on its arguments -- calling it with the same arguments might give different return values (e.g., random(), Date()), and it may modify the arguments or other external variables when called." }
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
          "q": "What are called Parameters? Write a note on (i) Parameter without Type (ii) Parameter with Type.",
          "ans": "Parameters are the variables used in a function definition, into which argument values are passed when the function is called.\n\n(i) Parameter without Type: In this form, no data type is explicitly mentioned for the parameters -- the compiler infers the type based on how the parameter is used within the function body. Example:\n(requires: b>=0)\n(returns: a to the power of b)\nlet rec pow a b :=\n    if b = 0 then 1\n    else a * pow a (b-1)\nHere, since b is compared using = with 0 and a is multiplied with itself using *, both a and b are inferred to be of type int.\n\n(ii) Parameter with Type: Here, explicit type annotations are written for each parameter, enclosed in mandatory parentheses. Example:\n(requires: b>=0)\n(returns: a to the power of b)\nlet rec pow (a: int) (b: int) : int :=\n    if b = 0 then 1\n    else a * pow a (b-1)\nExplicit typing is useful when debugging confusing compiler type-error messages, even though it is often unnecessary since the compiler can usually infer types on its own."
        },
        {
          "q": "Identify the following in the program: let rec gcd a b := if b <> 0 then gcd b (a mod b) else return a -- (i) Name of the function (ii) Statement showing it is recursive (iii) Name of the argument variable(s) (iv) Statement which invokes the function recursively (v) Statement which terminates the recursion.",
          "ans": "(i) Name of the function: gcd\n\n(ii) Statement showing it is recursive: 'let rec gcd a b :=' -- the keyword 'rec' indicates this is a recursive function definition.\n\n(iii) Name of the argument variables: a and b (the parameters of gcd)\n\n(iv) Statement which invokes the function recursively: 'gcd b (a mod b)' -- this calls gcd again with new arguments b and (a mod b).\n\n(v) Statement which terminates the recursion: 'else return a' -- when the condition 'b <> 0' becomes false (i.e., b equals 0), the function stops recursing and returns the value of a, which is the GCD."
        },
        {
          "q": "Explain with example Pure and impure functions.",
          "ans": "Pure functions are functions which give the exact same result when the same arguments are passed, and have no side effects. Example:\nlet square x :=\n    return: x * x\nCalling square(5) always returns 25, no matter how many times or in what context it is called, since it depends only on its argument x and modifies nothing external.\n\nImpure functions may give different results even with the same arguments, because they depend on or modify something outside their own definition. Example:\nlet randomnumber :=\n    a := random()\n    if a > 10 then\n        return: a\n    else\n        return: 10\nHere, random() can return a different value each time it's called, so randomnumber() is impure -- its result is unpredictable across calls, unlike a pure function such as square(x).\n\nAnother impure example, modifying an external variable:\ny := 0\nlet inc (x: int): int :=\n    y := y + x\n    return (y)\nEach call to inc(x) changes the external variable y, so calling inc(5) twice in a row gives two DIFFERENT results (5, then 10) -- demonstrating the side effect that makes this function impure."
        },
        {
          "q": "Explain with an example interface and implementation.",
          "ans": "An interface is a set of actions that an object can do -- it defines WHAT an object can do, without specifying HOW it is done. Implementation carries out the actual instructions defined by that interface -- it defines HOW the action is performed.\n\nExample -- the car analogy: When a driver wants to increase a car's speed, they simply press the accelerator. The function call would be Speed(70) -- this is the INTERFACE: the driver only needs to know that pressing the accelerator increases speed, without knowing any internal details.\n\nInternally, the engine performs all the real work -- combining fuel, air, pressure, and electricity to generate power and increase speed. This internal mechanism is the IMPLEMENTATION -- it is completely separated from the driver's experience, who only interacts through the simple interface (the accelerator).\n\nIn Object Oriented Programming, classes serve as the interface (defining what operations/methods are available), while the actual code inside those methods -- how the object is processed and executed -- is the implementation. This separation allows implementation details to change internally without affecting how other parts of the program use the interface."
        }
      ]
    }
  ]
}
