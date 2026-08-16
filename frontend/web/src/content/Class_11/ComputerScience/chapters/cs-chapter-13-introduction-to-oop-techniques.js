export default {
  chapterNumber: 13,
  title: "Introduction to Object Oriented Programming Techniques",
  subject: "Computer Science",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-paradigms",
      title: "Introduction & Programming Paradigms",
      content: `**13.1 Introduction**

**Object-Oriented Programming (OOP)** describes a programming approach based on classes and objects. It allows software to be organised as a collection of objects that consist of both data and behaviour — in contrast to conventional functional programming, which loosely connects data and behaviour. Since the 1980s, "object" has appeared in programming languages, and almost all languages developed since 1990 have object-oriented features.

**13.2 Programming Paradigms**

A **paradigm** means the organising principle of a program — an approach to programming. There are three main approaches: **Procedural**, **Modular**, and **Object Oriented** programming.

**13.2.1 Procedural Programming**

A list of instructions given to the computer to do something, emphasising *procedures* — doing things.

**Features:**
- Programs are organised as subroutines/sub-programs.
- All data items are global.
- Suitable for small-sized software applications.
- Difficult to maintain and enhance — any change in a data type must be propagated to all subroutines using that type, which is time-consuming.
- Examples: FORTRAN, COBOL.

**13.2.2 Modular Programming**

A list of instructions organised into multiple **modules**, each containing a set of related functions; data is *hidden* under the modules, and can only be changed by modifying the module itself.

**Features:**
- Emphasis on algorithm rather than data.
- Programs divided into individual modules.
- Modules are independent of each other, with their own local data.
- Modules can work with their own data as well as data passed to them.
- Examples: Pascal, C.

**13.2.3 Object Oriented Programming**

Emphasises *data* rather than algorithm, implementing programs using **classes** and **objects**.

- **Class:** A construct in C++ used to bind data and its associated functions together into a single unit, using the encapsulation concept. A class is a user-defined data type, representing a group of similar objects — also defined as a template or blueprint representing a group of objects that share common properties and relationships.
- **Object:** Represents data and its associated functions together as a single unit — the basic unit of OOP. An object is created from (an instance of) a class, also called a class variable. An identifiable entity with characteristics and behaviour is called an object.

**Features of OOP:**
- Emphasises data rather than algorithm.
- Introduces data abstraction, in addition to procedural abstraction.
- Data and its associated operations are grouped into a single unit.
- Programs are designed around the data being operated on.
- Relationships can be created between similar yet distinct data types.
- Examples: C++, Java, VB.Net, Python.`,
      nav: { next: "oop-concepts", nextLabel: "Next: Basic Concepts of OOP →" }
    },
    {
      id: "oop-concepts",
      title: "Basic Concepts of OOP",
      content: `**13.3 Basic Concepts of OOP**

OOP was developed to overcome the drawbacks of procedural and modular programming, and is widely accepted as the most important and powerful way of creating software. It mainly encourages:
- **Modularisation:** a program can be decomposed into modules.
- **Software re-use:** a program can be composed from existing and new modules.

**Main Features of OOP:** Data Abstraction, Encapsulation, Modularity, Inheritance, Polymorphism.

**13.3.1 Encapsulation**

The mechanism by which data and functions are bound together into a single unit — it implements abstraction. Encapsulation is about binding data variables and functions together in a class (also called data binding), and is the most striking feature of a class. The data is not accessible to the outside world — only functions wrapped within the class can access it. These functions provide the interface between the object's data and the program. This encapsulation of data from direct access is called **data hiding** or **information hiding**.

**13.3.2 Data Abstraction**

Showing only essential features without revealing background details. Classes use abstraction to define a list of abstract attributes and functions that operate on them, encapsulating all essential properties of the object to be created. The attributes are called **data members** (they hold information); the functions that operate on them are called **methods** or **member functions**.

**13.3.3 Modularity**

Designing a system divided into a set of functional units (named modules) that can be composed into a larger application.

**13.3.4 Inheritance**

The technique of building new classes (**derived class**) from an existing class (**base class**). Its most important advantage is **code reusability**.

**13.3.5 Polymorphism**

The ability of a message or function to be displayed in more than one form.`,
      nav: { back: "intro-paradigms", next: "advantages-disadvantages", nextLabel: "Next: Advantages & Disadvantages of OOP →" }
    },
    {
      id: "advantages-disadvantages",
      title: "Advantages & Disadvantages of OOP",
      content: `**13.4 Advantages of OOP**

- **Re-usability:** "Write once and use it multiple times" — achieved using classes.
- **Redundancy (reduction):** Inheritance helps avoid duplicated code — if the same functionality is needed in multiple classes, a common class can be written once and inherited by sub-classes.
- **Easy Maintenance:** Easy to maintain and modify existing code, since new objects can be created with small differences from existing ones.
- **Security:** Using data hiding and abstraction, only necessary data is exposed, maintaining data security.

**13.5 Disadvantages of OOP**

- **Size:** Object Oriented Programs are much larger than other programs.
- **Effort:** They require significant effort to create.
- **Speed:** They tend to run slower than other programs, largely because of their size.`,
      nav: { back: "oop-concepts", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- A paradigm means the organising principle of a program — an approach to programming.
- Procedural/Modular programming means giving a list of instructions telling the computer to do something; Procedural programming organises code into subroutines, while Modular programming combines related procedures into modules and hides data under them.
- Object Oriented Programming emphasises data rather than algorithm, implementing programs using classes and objects.
- A class is a user-defined data type representing a group of similar objects; objects are the basic unit of OOP, representing data and associated functions together as a single unit.
- Encapsulation is the mechanism by which data and functions are bound together into a single unit — it implements abstraction.
- Abstraction refers to showing only essential features without revealing background details.
- Modularity is designing a system divided into functional units that compose into a larger application.
- Polymorphism is the ability of a message or function to be displayed in more than one form.
- Inheritance is the technique of building new (derived) classes from an existing (base) class — its main advantage is code reusability, and inheritance is transitive in nature.`,
      nav: { back: "advantages-disadvantages", practice: true }
    }
  ]
}
