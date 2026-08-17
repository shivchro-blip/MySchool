export default {
  chapterNumber: 3,
  title: "Scoping",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-mapping",
      title: "Introduction, Variable Scope & Mapping",
      content: `**3.1 Introduction**

**Scope** refers to the accessibility of a variable within one part of a program to another part of the same program.

**3.2 Variable Scope**

To understand variable scope, it's important to learn what variables really are — essentially, they're addresses to an object in memory. When you assign a variable with := to an instance (object), you're binding (or **mapping**) the variable to that instance. Multiple variables can be mapped to the same instance.

**Note:** The process of binding a variable name with an object is called **mapping**. The = (equal to) sign is used in programming languages to map the variable and object.

Programming languages keep track of these mappings with **namespaces**. Namespaces are containers for mapping names of variables to objects — think of them as dictionaries, containing a list of words and their meanings. Words are mapped to meanings in dictionaries, whereas names are mapped to objects (name = object) in programming languages. This allows access to objects by names you choose to assign to them.

**Example:**
\`\`\`
1. a := 5
2. b := a
\`\`\`
Here, 'a' is first mapped to the integer 5. 'a' is the variable name; the integer value 5 is the object. Then 'b' is set equal to 'a' — meaning b is now bound to the same integer value as a, which is 5.

**Extending the example:**
\`\`\`
1. a := 5
2. b := a
3. a := 3
\`\`\`
If you then change 'a' to be equal to 3, a budding programmer might expect 'b' to also become 3 — but that is NOT the case. 'b' is still mapped (pointing) to the integer value 5. Only 'a' changed, now mapped to the integer value 3.

**The scope of a variable** is that part of the code where it is visible — to refer to it, you don't need any prefixes. Example:
\`\`\`
1. Disp():
2.     a := 7
\`\`\`
When you try to display the value of 'a' outside the procedure, the program flags the error "name 'a' is not defined" — because the **lifetime** of the variable is only until the end of the procedure. The duration for which a variable is alive is called its **lifetime**.`,
      nav: { next: "legb-rule", nextLabel: "Next: The LEGB Rule →" }
    },
    {
      id: "legb-rule",
      title: "The LEGB Rule",
      content: `**3.3 LEGB Rule**

Scope also defines the order in which variables have to be mapped to the object, in order to obtain the value. Example:
\`\`\`
1. x := 'outer x variable'
2. display():
3.     x := 'inner x variable'
4.     print x
5. print x
6. display()
\`\`\`
When executed, statement (4) and (5) display:
\`\`\`
outer x variable
inner x variable
\`\`\`
These statements give different outputs because the same variable name x resides in different scopes — one inside the function display(), and one at the upper level. 'outer x variable' is printed when x is referenced outside the function definition; 'inner x variable' is printed when display() executes, referring to x's value inside the function definition. This shows there is a rule followed to decide from which scope a variable is picked.

The **LEGB rule** decides the order in which scopes are searched for scope resolution. The scopes, listed from highest to lowest hierarchy:

| Scope | Description |
|---|---|
| **Local (L)** | Defined inside function/class |
| **Enclosed (E)** | Defined inside enclosing functions (nested function concept) |
| **Global (G)** | Defined at the uppermost level |
| **Built-in (B)** | Reserved names in built-in functions (modules) |

The search order goes: Local → Enclosed → Global → Built-in (from narrowest/innermost to widest/outermost).`,
      nav: { back: "intro-mapping", next: "types-of-scope", nextLabel: "Next: Types of Variable Scope →" }
    },
    {
      id: "types-of-scope",
      title: "Types of Variable Scope",
      content: `**3.4 Types of Variable Scope**

There are 4 types of variable scope:

**3.4.1 Local Scope**

Local scope refers to variables defined in the current function. A function always first looks up a variable name in its local scope; only if not found there are outer scopes checked. Example:
\`\`\`
Disp():
    a := 7
    print a
Disp()
\`\`\`
Output: **7** — because 'a' is defined and available in the local scope.

**3.4.2 Global Scope**

A variable declared outside all functions in a program is known as a **global variable**. It can be accessed inside or outside of all the functions in a program. Example:
\`\`\`
1. a := 10
2. Disp():
3.     a := 7
4.     print a
5. Disp()
6. print a
\`\`\`
On execution: the variable 'a' defined inside the function displays **7** for the function call Disp(), and then displays **10**, because that outer 'a' is defined in global scope.

**3.4.3 Enclosed Scope**

All programming languages permit functions to be nested — a function (method) defined within another function is called a **nested function**. A variable declared inside a function that contains another (inner) function definition can also be accessed by that inner function — this scope is called **enclosed scope**. When a compiler/interpreter searches for a variable, it first searches Local, then Enclosing scopes. Example:
\`\`\`
Disp():
    a := 10
    Disp1():
        print a
    Disp1()
    print a
Disp()
\`\`\`
Output: **10** (from Disp1's print a), then **10** (from Disp's print a) — Disp1() is defined within Disp(); the variable 'a' defined in Disp() can be used by Disp1() since it is also a member of Disp().

**3.4.4 Built-in Scope**

The widest scope. Built-in scope has all the names pre-loaded into the program scope when the compiler/interpreter starts. Any variable or function defined in the modules of a programming language has built-in (module) scope — they are loaded as soon as the library files are imported into the program. Normally only Functions or modules come along with the software as packages, so they fall under Built-in scope.`,
      nav: { back: "legb-rule", next: "modules", nextLabel: "Next: Module →" }
    },
    {
      id: "modules",
      title: "Module & Modular Programming",
      content: `**3.5 Module**

A **module** is a part of a program. Programs are composed of one or more independently developed modules. A single module can contain one or several statements closely related to each other. Modules work perfectly at the individual level, and can be integrated with other modules. A software program can be divided into modules to ease the job of programming and debugging. A program can be divided into small functional modules that work together to produce the output. The process of subdividing a computer program into separate sub-programs is called **Modular programming**. Examples of modules are procedures, subroutines, and functions.

**3.5.1 Characteristics of Modules**
1. Modules contain instructions, processing logic, and data.
2. Modules can be separately compiled and stored in a library.
3. Modules can be included in a program.
4. Module segments can be used by invoking a name and some parameters.
5. Module segments can be used by other modules.

**3.5.2 Benefits of Using Modular Programming**
- Less code needs to be written.
- A single procedure can be developed for reuse, eliminating the need to retype the code many times.
- Programs can be designed more easily, because a small team deals with only a small part of the entire code.
- Modular programming allows many programmers to collaborate on the same application.
- The code is stored across multiple files.
- Code is short, simple, and easy to understand.
- Errors can easily be identified, as they are localized to a subroutine or function.
- The same code can be used in many applications.
- The scoping of variables can easily be controlled.`,
      nav: { back: "types-of-scope", next: "access-control", nextLabel: "Next: Access Control →" }
    },
    {
      id: "access-control",
      title: "Access Control",
      content: `**3.5.3 Access Control**

**Access control** is a security technique that regulates who or what can view or use resources in a computing environment. It is a fundamental security concept that minimizes risk to the object — in other words, access control is a selective restriction of access to data.

In Object Oriented programming languages, access control is implemented through **access modifiers**. Classical object-oriented languages such as C++ and Java control access to class members via the **public**, **private**, and **protected** keywords.

- **Private members** of a class are denied access from outside the class — they can be handled only from within the class.
- **Public members** (generally methods declared in a class) are accessible from outside the class — the object of the same class is required to invoke a public method. This arrangement of private instance variables and public methods ensures the principle of **data encapsulation**.
- **Protected members** of a class are accessible from within the class and are also available to its sub-classes. No other process is permitted access to it. This enables specific resources of the parent class to be inherited by the child class.

**Python's approach:** Python doesn't have any mechanism that effectively restricts access to any instance variable or method. Python instead prescribes a **convention** of prefixing the name of the variable/method with a single or double underscore to emulate the behaviour of protected and private access specifiers.

**Key comparison:** All members in a Python class are **public by default**, whereas by default in **C++ and Java, they are private**. Any member can be accessed from outside the class environment in Python — this is NOT possible in C++ and Java by default.`,
      nav: { back: "modules", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Scope refers to the visibility of variables, parameters, and functions in one part of a program to another part of the same program.
- The process of binding a variable name with an object is called mapping; := (or = in some languages) is used to map the variable and object.
- Namespaces are containers for mapping names of variables to objects.
- The LEGB rule decides the order in which scopes are searched for scope resolution: Local → Enclosed → Global → Built-in.
- Local scope refers to variables defined in the current function; a global variable is declared outside all functions; enclosed scope allows an inner (nested) function to access the outer function's variables; built-in scope has all names pre-loaded when the interpreter starts.
- A module is a part of a program; the process of subdividing a program into separate sub-programs is called Modular programming.
- Access control is a security technique regulating who/what can view or use resources — implemented via public, private, and protected access modifiers in classical OOP languages like C++ and Java.
- Public members are accessible from outside the class; protected members are accessible within the class and its sub-classes; private members are accessible only within the class itself.
- Python uses a naming convention (single/double underscore prefix) instead of strict access modifiers; all Python class members are public by default, whereas C++/Java members are private by default.`,
      nav: { back: "access-control", practice: true }
    }
  ]
}
