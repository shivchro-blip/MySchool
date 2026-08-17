export default {
  chapterNumber: 1,
  title: "Function",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: `The most important criteria in writing and evaluating an algorithm is the time it takes to complete a task. The duration of computation time must be independent of the programming language, compiler, and computer used. Algorithms are expressed using statements of a programming language. If a bulk of statements needs to be repeated many times, **subroutines** are used to finish the task.

**Subroutines** are the basic building blocks of computer programs — small sections of code used to perform a particular task that can be used repeatedly. In programming languages, these subroutines are called **Functions**.

**1.2 Function with Respect to Programming Language**

A **function** is a unit of code that is often defined within a greater code structure. Specifically, a function contains a set of code that works on many kinds of inputs — like variables and expressions — and produces a concrete output.

**1.2.1 Function Specification**

Consider the example \`a := (24)\`. This has an expression in it, but (24) is not itself an expression — it is a **function definition**. Definitions bind values to names — here, the value 24 is bound to the name 'a'. Definitions are not expressions, and expressions are not definitions — they are distinct syntactic blocks, though definitions can have expressions nested inside them and vice-versa.`,
      nav: { next: "function-specification", nextLabel: "Next: Parameters, Arguments & Syntax →" }
    },
    {
      id: "function-specification",
      title: "Parameters, Arguments & Function Syntax",
      content: `**1.2.2 Parameters and Arguments**

**Parameters** are the variables in a function definition; **arguments** are the values which are passed to a function definition.

**1. Parameter without Type**

Example function definition:
\`\`\`
(requires: b>=0)
(returns: a to the power of b)
let rec pow a b :=
    if b = 0 then 1
    else a * pow a (b-1)
\`\`\`
Here, variable 'b' is the parameter, and the value passed to 'b' is the argument. The precondition (**requires**) and postcondition (**returns**) of the function are given. Note that no types (data types) were mentioned — some compilers solve this type-inference problem algorithmically, but some require the type to be explicitly stated.

In the above definition, since the if-expression can return 1 in the then-branch, and the entire if-expression has type int, the function's return type is also 'int'. Since 'b' is compared to 0 with the equality operator, 'b' is also of type 'int'. Since 'a' is multiplied using the * operator, 'a' must be an int too.

**2. Parameter with Type**

Rewriting the same function with explicit types:
\`\`\`
(requires: b>=0)
(returns: a to the power of b)
let rec pow (a: int) (b: int) : int :=
    if b = 0 then 1
    else a * pow a (b-1)
\`\`\`
When writing type annotations, the parentheses are mandatory. Generally these can be left out, letting the compiler infer them — but explicitly annotating types can help debug confusing type-error messages from the compiler.

**Function Definition Syntax**

The syntax for defining functions is close to mathematical usage: the definition is introduced by the keyword **let**, followed by the function name and its arguments; then the formula that computes the result is written after a **:=** sign. To define a recursive function, use **"let rec"** instead of just **"let"**.

Syntax:
\`\`\`
let rec fn a1 a2 ... an := k
\`\`\`
Here 'fn' is the function name, 'a1' to 'an' are variables used as parameters, and the keyword 'rec' is required only if 'fn' is to be a recursive function — otherwise it is omitted.

**Note:** A function definition which calls itself is called a **recursive function**. Example — finding the factorial of a number:
\`\`\`
(Requires: n >= 0)
let rec fact n :=
    if n = 0 then 1
    else n * fact(n-1)
\`\`\`

**Function Types (Syntax)**
\`\`\`
x → y
x1 → x2 → y
x1 → ... → xn → y
\`\`\`
'x' and 'y' represent types. The type x→y is the type of a function that takes an input of type 'x' and returns an output of type 'y'. x1→x2→y is a function taking two inputs (types x1 and x2) and returning output of type 'y'. Likewise, x1→...→xn→y takes n arguments and returns type 'y' as output.

**Note:** All functions are static definitions — there is no dynamic function definition.`,
      nav: { back: "intro", next: "interface-implementation", nextLabel: "Next: Interface vs Implementation →" }
    },
    {
      id: "interface-implementation",
      title: "Interface vs Implementation",
      content: `**1.3 Interface vs Implementation**

An **interface** is a set of actions that an object can do. For example, when you press a light switch, the light goes on — you may not have cared how it splashed the light. In Object Oriented Programming, an interface is a description of all functions. Anything that "acts like" a light should have function definitions like turn_on() and turn_off(). The purpose of an interface is to allow the computer to enforce the properties of the class.

**Interface vs Implementation:**

| Interface | Implementation |
|---|---|
| Just defines what an object can do, but won't actually do it | Carries out the instructions defined in the interface |

In object oriented programs, classes are the interface, and how the object is processed and executed is the implementation.

**Example — the car analogy:** The person who drives the car doesn't care about the internal working. To increase speed, they just press the accelerator to get the desired behaviour. Here, the accelerator is the interface between the driver (the calling/invoking object) and the engine (the called object). The function call would be Speed(70) — this is the interface. Internally, the engine does all the work — fuel, air, pressure, and electricity come together to create power. All of this is separated from the driver, who just wants to go faster. Thus, we separate interface from implementation.

**Example — minimum of three arguments (implementation):**
\`\`\`
let min x y z :=
    if x < y then
        if x < z then x else z
    else
        if y < z then y else z
\`\`\`

**1.3.1 Characteristics of Interface**
- The class template specifies the interfaces to enable an object to be created and operated properly.
- An object's attributes and behaviour are controlled by sending functions to the object.`,
      nav: { back: "function-specification", next: "pure-functions", nextLabel: "Next: Pure Functions →" }
    },
    {
      id: "pure-functions",
      title: "Pure Functions & Side Effects",
      content: `**1.4 Pure Functions**

**Pure functions** are functions which give the exact same result when the same arguments are passed. For example, the mathematical function sin(0) always results in 0 — every time you call the function with the same arguments, you always get the same result. A function can be pure provided it does not have any external variable which alters its behaviour.

Example:
\`\`\`
let square x :=
    return: x * x
\`\`\`
The function square is pure because it will not give different results for the same input.

One theoretical advantage of pure functions: if a function is pure and called several times with the same arguments, the compiler only needs to actually call the function once. Example:
\`\`\`
let length s :=
    i := 0
    if i < strlen(s) then
        -- Do something which doesn't affect s
        ++i
\`\`\`
If compiled naively, strlen(s) is called each time and must iterate over the whole of 's'. But if the compiler is smart enough to know strlen is a pure function and 's' isn't updated in the loop, it can remove the redundant extra calls and run the loop only once. From this, we understand strlen is a pure function — it takes one variable as a parameter and accesses it to find its length; it reads external memory but doesn't change it, and the returned value derives from that memory.

**Note:** Evaluation of pure functions does not cause any side effects to its output.

**1.4.1 Impure Functions**

Variables used inside a function may cause side effects even when the function isn't passed any arguments — such a function is called **impure**. When a function depends on variables or functions outside its own definition block, you can never be sure it will behave the same every time it's called. Example: the mathematical function random() gives different outputs for the same call.
\`\`\`
let randomnumber :=
    a := random()
    if a > 10 then
        return: a
    else
        return: 10
\`\`\`
Here, Random is impure since we can't be sure of the result each time it's called.

**1.4.2 Side-Effects (Impure Functions)**

A function has **side effects** when it has observable interaction with the outside world. Side effects are not necessarily bad — sometimes they are useful (especially outside the functional programming paradigm).

**Modifying a variable outside a function:** One of the most popular side effects.
\`\`\`
y := 0
let inc (x: int): int :=
    y := y + x
    return (y)
\`\`\`
Here, the value of y changes inside the function definition, so the result changes each time. The side effect of inc() is that it changes the data of the external visible variable 'y'.

**Pure vs Impure Functions — Comparison:**

| Pure Function | Impure Function |
|---|---|
| Return value depends solely on its arguments passed. Calling with the same arguments always gives the same return value. | Return value does not solely depend on its arguments. Calling with the same arguments might give different return values (e.g., random(), Date()). |
| Do not have any side effects. | May modify the arguments which are passed to them. |
| Do not modify the arguments which are passed to them | — |

**Example — pure function to find GCD of two positive integers:**
\`\`\`
let rec gcd a b :=
    if b <> 0 then gcd b (a mod b)
    else
    return a
\`\`\`
Output: gcd 13 27 → 1; gcd 20536 7826 → 2. Here 'gcd' is recursively called until 'b' becomes 0. 'b' and '(a mod b)' are the two arguments passed to 'a' and 'b' of the gcd function on each recursive call.`,
      nav: { back: "interface-implementation", next: "chameleons-example", nextLabel: "Next: Chameleons of Chromeland Using Functions →" }
    },
    {
      id: "chameleons-example",
      title: "Chameleons of Chromeland — Using Functions",
      content: `**1.4.3 Chameleons of Chromeland Problem Using Function**

Recall the Chameleons of Chromeland problem from Class XI: suppose two types of chameleons are equal in number. Construct an algorithm that arranges meetings between these two types so that they change colour to the third type, until all display the same colour.

Let a, b, c represent the number of chameleons of each type, with initial values A, B, C respectively. Let a=b be the input property. The input-output relation is a=b=0 and c=A+B+C. Name the algorithm **monochromatize**:

\`\`\`
monochromatize (a, b, c)
-- inputs  : a = A, b = B, c = C, a = b
-- outputs : a = b = 0, c = A+B+C
\`\`\`

In each iterative step, two chameleons of the two types (equal in number) meet and change colour to the third type. For example, if A,B,C = 4,4,6, the meetings proceed:

| iteration | a | b | c |
|---|---|---|---|
| 0 | 4 | 4 | 6 |
| 1 | 3 | 3 | 8 |
| 2 | 2 | 2 | 10 |
| 3 | 1 | 1 | 12 |
| 4 | 0 | 0 | 14 |

In each meeting, a and b each decrease by 1, while c increases by 2. This can be expressed as an iterative algorithm:
\`\`\`
monochromatize (a, b, c)
-- inputs : a = A, b = B, c = C, a = b
-- outputs : a = b = 0, c = A+B+C
    while a > 0
        a, b, c := a-1, b-1, c+2
\`\`\`

**Writing this algorithm using a function:**
\`\`\`
let rec monochromatize a b c :=
    if a > 0 then
        a, b, c := a-1, b-1, c+2
    else
        monochromatize a b c
    return a, b, c
\`\`\`
This demonstrates recursion — the function repeatedly calls itself with reduced values of a and b (and increased c), until the base condition (a=0) is reached, at which point the final values are returned.`,
      nav: { back: "pure-functions", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Algorithms are expressed using statements of a programming language.
- Subroutines are small sections of code used to perform a particular task that can be used repeatedly.
- A function is a unit of code often defined within a greater code structure, containing code that works on many kinds of inputs and produces a concrete output.
- Definitions are distinct syntactic blocks; parameters are the variables in a function definition, and arguments are the values passed to it.
- When writing type annotations, the parentheses are mandatory in the function definition.
- An interface is a set of actions that an object can do — it defines what an object can do but won't actually do it; implementation carries out the instructions defined in the interface.
- Pure functions give the exact same result when the same arguments are passed, and have no side effects.
- Impure functions may cause side effects — their variables may depend on or alter something outside the function's own definition block, so results can differ between calls even with the same arguments.`,
      nav: { back: "chameleons-example", practice: true }
    }
  ]
}
