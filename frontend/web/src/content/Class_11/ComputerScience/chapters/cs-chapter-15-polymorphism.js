export default {
  chapterNumber: 15,
  title: "Polymorphism",
  subject: "Computer Science",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-function-overloading",
      title: "Introduction & Function Overloading",
      content: `**15.1 Introduction**

The word **polymorphism** means "many forms" (poly = many, morph = shapes). Polymorphism is the ability of a message or function to be displayed in more than one form. In C++, it is achieved through **function overloading** and **operator overloading**. **Overloading** means a name having two or more distinct meanings — an "overloaded function" refers to a function having more than one distinct meaning.

**15.2 Function Overloading**

The ability of a function to process a message/data in more than one form is called function overloading. Two or more functions in the same scope share the same name but have *different parameters*. The number and types of a function's parameters is called its **signature**. When an overloaded function is called, the compiler determines the most appropriate definition by comparing the argument types used in the call against the parameter types in each definition — this process is called **overload resolution**.

**15.2.1 Need for Function Overloading**

It's often hard to find many meaningful distinct names for a similar action. For example, instead of writing separate functions like \`area_circle(radius)\`, \`area_triangle(half, base, height)\`, \`area_rectangle(length, breadth)\`, they can all be rewritten using a single overloaded name: \`area(radius)\`, \`area(half, base, height)\`, \`area(length, breadth)\`.

**Tip:** Function overloading not only implements polymorphism but also reduces the number of comparisons in a program (making it execute faster), and helps programmers by reducing the number of function names to remember.

**15.2.2 Rules for Function Overloading**
1. Overloaded functions must differ in the *number* of arguments or their *data types*.
2. The *return type* of overloaded functions is NOT considered for overloading (two functions with the same name, same parameters, but different return types are NOT valid overloads).
3. *Default arguments* of overloaded functions are not considered part of the parameter list for overloading purposes.`,
      nav: { next: "constructor-overloading", nextLabel: "Next: Constructor Overloading →" }
    },
    {
      id: "constructor-overloading",
      title: "Constructor Overloading",
      content: `**15.3 Constructor Overloading**

Function overloading can be applied to constructors, since constructors are special functions of classes. A class can have more than one constructor, each with a different signature — providing the flexibility of creating multiple types of objects for a class. The compiler identifies which overloaded constructor to use based on its name and parameter list.

For example, a class might define:
- A **default (no-parameter) constructor**: initializes members to 0.
- A **parameterized constructor**: accepts two values to initialize members directly.
- A **copy constructor**: takes a reference to an existing object of the same class, copying its values.

When an object is created, the compiler examines how many/what type of arguments are supplied and automatically invokes the matching constructor. For example: \`add a, b(10, 20), c(b);\` — \`a\` uses the default constructor, \`b\` uses the parameterized constructor with values 10 and 20, and \`c\` uses the copy constructor (copying from b).

**Note:** Since multiple constructors may exist, the appropriate arguments must be passed while creating each object, so the compiler can determine which constructor to invoke.`,
      nav: { back: "intro-function-overloading", next: "operator-overloading", nextLabel: "Next: Operator Overloading →" }
    },
    {
      id: "operator-overloading",
      title: "Operator Overloading",
      content: `**15.4 Operator Overloading**

**Operator overloading** means giving additional functionality to normal C++ operators (+, ++, -, --, +=, -=, *, <, >, etc.) — also a type of polymorphism, where an operator is given user-defined meaning. For example, '+' can be overloaded to perform addition on various data types, like Integers or String concatenation.

Almost all operators can be overloaded, EXCEPT:
- Scope resolution operator (::)
- sizeof
- Member selector (.)
- Member pointer selector (*)
- Ternary/conditional operator (?:)

**Operator Overloading Syntax:**
\`\`\`
ReturnType classname::operator OperatorSymbol(argument list)
{
    // Function body
}
\`\`\`

**15.4.1 Restrictions on Operator Overloading**
1. The precedence and associativity of an operator cannot be changed.
2. No new operators can be created — only *existing* operators can be overloaded.
3. The fundamental meaning of an operator's built-in behaviour cannot be redefined (e.g., you cannot change how plain integers are added) — only *additional* functionality can be given for a user-defined type.
4. Overloaded operators cannot have default arguments.
5. When binary operators are overloaded, the left-hand object must be an object of the relevant (overloading) class.

**Examples:**
- **Binary operator overloading with '+':** A \`complex\` class can overload \`+\` (e.g., \`complex operator+(complex c2) {...}\`) so that \`c3 = c1 + c2;\` adds two complex numbers by combining their real and imaginary parts.
- **String concatenation via '+':** A \`strings\` class can overload \`+\` (e.g., \`void operator+(strings ob) {...}\`) so that \`ob1 + ob2;\` concatenates the character arrays stored in each object, using \`strcat()\` internally.

**Note:** A class can have overloaded constructors, but a **destructor function cannot be overloaded** — a class has only one destructor.`,
      nav: { back: "constructor-overloading", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- In C++, polymorphism is achieved through function overloading and operator overloading.
- Overloading means a name having two or more distinct meanings; an overloaded function has more than one distinct meaning.
- Overloaded functions share the same name but different signatures (number and type of arguments).
- A function's argument list is known as its signature.
- Two functions cannot be overloaded when the only difference is that one takes a reference parameter and the other takes a normal call-by-value parameter.
- Both ordinary functions and member functions can be overloaded.
- A class can have overloaded constructors, but a destructor cannot be overloaded.
- Operator overloading gives special meaning to an operator, using the keyword 'operator' followed by the operator symbol.
- Almost all C++ operators can be overloaded, except: scope resolution (::), sizeof(), the conditional operator (?:), member selection (.), and member pointer selector (*).`,
      nav: { back: "operator-overloading", practice: true }
    }
  ]
}
