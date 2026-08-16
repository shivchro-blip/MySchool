export default {
  chapterNumber: 14,
  title: "Classes and Objects",
  subject: "Computer Science",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-class-declaration",
      title: "Introduction to Classes & Declaration",
      content: `**14.1 Introduction to Classes**

The most important feature of C++ is the **Class** — its significance is highlighted by Bjarne Stroustrup initially naming his language "C with Classes." Classes provide the four features commonly present in OOP languages: Abstraction, Encapsulation, Inheritance, and Polymorphism.

**14.1.1 Need for Class**

A class is a way to bind data and its associated functions together. Classes are needed to represent real-world entities that have both data-type properties and associated operations — used to create a user-defined data type.

**14.1.2 Declaration of a Class**

A class is defined using the keyword **class** followed by the class name. The body is defined inside curly braces, terminated by a semicolon (or a list of declarations).

**Note:** The only difference between a structure and a class is that structure members are **public by default**, whereas class members are **private by default**.

General form:
\`\`\`
class class_name
{
private:
    variable declaration;
    function declaration;
protected:
    variable declaration;
    function declaration;
public:
    variable declaration;
    function declaration;
};
\`\`\`
The class body contains declarations of its members (Data members and Member functions), and has three access specifiers (visibility labels).`,
      nav: { next: "access-specifiers", nextLabel: "Next: Access Specifiers →" }
    },
    {
      id: "access-specifiers",
      title: "Class Access Specifiers & Members",
      content: `**14.1.3 Class Access Specifiers**

**Data hiding** is an important OOP feature that prevents functions of a program from directly accessing a class's internal representation. Access restriction is specified using **public**, **private**, and **protected** sections within the class body — these keywords are called **access specifiers**. The default access specifier for members is **private**.

- **Public Members:** Accessible from anywhere outside the class, but within the program. You can set/get public data members even without a member function.
- **Private Members:** Cannot be accessed from outside the class — only the class's own member functions can access them. By default, all class members are private.
- **Protected Members:** Similar to private, but with one additional benefit — they can be accessed in child (derived/inherited) classes.

**Note:** If all members of a class are private, an object of that class cannot access anything from it directly from outside.

**14.1.4 Definition of Class Members**

A class comprises **members**, classified as **Data Members** and **Member Functions**. Data members are the data variables representing a class's features/properties (also called **attributes**). Member functions perform specific tasks in a class (also called **methods**). Member functions of a class can access ALL members, irrespective of their access specifier.

**14.1.5 Defining Methods of a Class**

Without defining its methods, a class definition is incomplete. Member functions can be defined in two ways:

**(1) Inside the class definition:** When defined inside the class, a member function behaves like an **inline function** — called an **Inline member function**. (Note: declaring a member function with a loop, switch, or goto statement as inline is not advisable.)

**(2) Outside the class definition:** Defined just like a normal function, using the **scope resolution operator (::)** — called an **outline** (or non-inline) member function. Syntax:
\`\`\`
return_type class_name::function_name(parameter list)
{
    function definition
}
\`\`\`
For example, \`void Box::setWidth(double w) { width = w; }\` defines setWidth() outside the Box class. Note that the absence of an access specifier at the top of a class means those members are **private by default**.`,
      nav: { back: "intro-class-declaration", next: "creating-objects", nextLabel: "Next: Creating Objects & Memory Allocation →" }
    },
    {
      id: "creating-objects",
      title: "Creating Objects & Memory Allocation",
      content: `**14.2 Creating Objects**

A class specification only defines the *properties* of a class. To use a class, variables of that type must be declared — these variables are called **objects** (also **instances** of the class). For example, \`student s;\` makes s an instance of class student.

Objects can be created in two ways:
- **(1) Global Object:** Declared outside all function bodies (or immediately after the closing brace of the class declaration) — usable by any function in the program.
- **(2) Local Object:** Declared within a function — it cannot be accessed from outside that function.

**14.3 Memory Allocation of Objects**

Member *functions* are placed in memory only once, as part of the class specification — since all objects of a class share the same member function code, no separate space is allocated per object for functions. Memory for member *variables*, however, IS allocated separately for each object, since each object holds its own distinct data values. For example, two objects p1, p2 of a class with an int, int, and float member (4+4+4=12 bytes with Dev C++) will each individually report \`sizeof(p1)\` = \`sizeof(p2)\` = 12 — but the class's member functions exist only once in a shared "common pool" that both objects' method calls use.

**Note:** Members are allocated memory space only after the class-type object is actually created.

**14.4 Referencing Class Members**

Class members are referenced (accessed) using the object's name, followed by the **dot (membership) operator**, followed by the member name. General syntax for calling a member function:
\`\`\`
Object_name.function_name(actual parameters);
\`\`\`
For example, \`stud.execute();\` calls the execute() member function on the object stud.

**Note:** An array of objects can also be created for a class, declared like any other array type — e.g., \`student s[10];\` creates 10 objects of the student class.`,
      nav: { back: "access-specifiers", next: "constructors-intro", nextLabel: "Next: Introduction to Constructors →" }
    },
    {
      id: "constructors-intro",
      title: "Introduction to Constructors",
      content: `**14.5 Introduction to Constructors**

Defining a class only creates a new user-defined data type; instances of that type must be **instantiated** (created and initialized). Instantiating an object is done using a **constructor**.

**14.5.1 Need for Constructors**

Arrays and structures in C++ can be initialized at the time of declaration (e.g., \`int arr[]={1,2,3};\` or \`sum s1={1,1};\`). However, a class-type object CANNOT be initialized this way at declaration time (e.g., \`add a1={0,0};\` throws a compilation error), because class members have associated access specifiers (private/protected/public) that restrict this kind of direct initialization. Therefore, classes include special member functions called **constructors** — the constructor function initializes the class object.

**14.6 Declaration and Definition**

When an instance of a class comes into scope, a special function called the **constructor** gets executed automatically. The constructor's name is exactly the same as the class name. Constructors return **nothing** and are not associated with any data type. They can be defined either inside or outside the class definition.

**14.6.1 Functions of a Constructor**

A constructor is a special initialization member function, called automatically whenever an instance of a class is declared/created. Its main functions are:
1. To allocate memory space to the object.
2. To initialize the data members of the class object.

There is an alternate way to initialize class objects, but in that case, the member function must be called explicitly.`,
      nav: { back: "creating-objects", next: "constructor-types", nextLabel: "Next: Types & Invocation of Constructors →" }
    },
    {
      id: "constructor-types",
      title: "Types & Invocation of Constructors",
      content: `**14.7 Types of Constructors**

- **Default Constructor:** A constructor that accepts no parameters (e.g., \`Data::Data()\`). If a class does not have an explicit (user-defined) constructor, the compiler automatically generates a default constructor.
- **Parameterized Constructor:** A constructor that can take arguments — allows creating objects with different initial values by passing parameters. Example: \`Data::Data(int, int);\`.
- **Copy Constructor:** A constructor with a reference to an already existing object of its own class — usually of the form \`Data(Data&)\`. Called: (1) when an object is passed as a parameter to a member function; (2) when a member function returns an object; (3) when an object is passed by reference to an instance of its own class, e.g., \`Data d1, d2(d1);\` — here \`d2(d1)\` calls the copy constructor.

**14.8 Invocation of Constructors**

There are two ways to create an object using a parameterized constructor:

**14.8.1 Implicit Call:** The parameterized constructor is invoked automatically when an object is created. Example: \`simple s1(10,20);\`.

**14.8.2 Explicit Call:** The constructor's name is explicitly given to invoke it, creating and initializing the object. Example: \`simple s1 = simple(10,20);\`. This is the most suitable method, as it creates a **temporary object** (living in memory only as long as it's used in an expression, then destroyed) — reducing the chance of data loss.

**14.9 Dynamic Initialization of Objects**

When initial values are supplied during runtime (e.g., from user input) rather than fixed at compile time, this is called **dynamic initialization**. For example, reading values via cin and then constructing an object \`X x(a, b);\` using those runtime values.

**14.10 Characteristics of Constructors**
- The constructor's name must be the same as the class name.
- No return type can be specified for a constructor.
- A constructor can have a parameter list.
- The constructor function can be overloaded (multiple constructors with different parameter lists).
- Constructors cannot be inherited, but a derived class can call the base class's constructor.
- The compiler generates a default constructor in the absence of a user-defined one — it is a public member function.
- The constructor is executed automatically when the object is created.
- A constructor can also be used explicitly to create a new object of its class type.`,
      nav: { back: "constructors-intro", next: "destructors", nextLabel: "Next: Destructors →" }
    },
    {
      id: "destructors",
      title: "Destructors",
      content: `**14.11 Destructors**

When a class object goes out of scope, a special function called the **destructor** gets executed. The destructor has the same name as the class tag, prefixed with a **tilde (~)**. Like the constructor, it returns nothing and is not associated with any data type.

**14.11.1 Need for Destructors**

The purpose of a destructor is to free the resources an object may have acquired during its lifetime — a destructor function removes/deallocates the memory of an object that was allocated by the constructor when the object was created.

**14.11.2 Declaration and Definition**

A destructor is a special member function called when an object's lifetime ends, destroying the object constructed by the constructor. It is normally declared under **public**. Example: for a class \`simple\`, its destructor is written \`~simple() { cout << "Destructor is executed"; }\` — automatically called when the object goes out of scope (e.g., at the end of main()).

**14.12 Characteristics of Destructors**
- The destructor has the same name as the class, prefixed with the tilde character '~'.
- The destructor cannot have arguments.
- It has no return type.
- Destructors cannot be overloaded (only one destructor per class).
- In the absence of a user-defined destructor, one is generated automatically by the compiler.
- The destructor is executed automatically when control reaches the end of the class object's scope, destroying the object.
- Destructors cannot be inherited.`,
      nav: { back: "constructor-types", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- A class binds data and associated functions together, making a user-defined data type from which objects can be created.
- A class declaration includes data members, member functions, access specifiers, and a class tag name.
- Member functions can be defined inside the class (inline) or outside the class (outline, using the scope resolution operator ::).
- Public members can be accessed outside the class directly via an object; private/protected members enforce data hiding.
- When a member function is called by another member function of the same class, it is called nesting of member functions.
- When an instance of a class comes into scope, a special function called the constructor gets executed — it allocates memory and initializes the class object.
- When a class object goes out of scope, a special function called the destructor gets executed — it frees resources the object acquired.
- The constructor and destructor both share the same name as the class (destructor prefixed with ~); both return nothing and are not associated with any data type.
- A constructor without parameters is called a default constructor; parameterized and copy constructors also exist.
- Objects can be initialized dynamically, using values determined at runtime.`,
      nav: { back: "destructors", practice: true }
    }
  ]
}
