export default {
  chapterNumber: 16,
  title: "Inheritance",
  subject: "Computer Science",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-need-types",
      title: "Introduction, Need & Types of Inheritance",
      content: `**16.1 Introduction to Inheritance**

Inheritance is one of the most important features of Object Oriented Programming — it enables a new class and its objects to take on the properties of existing classes. A class used as the basis for creating a new class is called a **superclass** or **base class**. A class that inherits from a superclass is called a **subclass** or **derived class**.

**16.2 Need for Inheritance**

Inheritance is used for **code reusability** — it is the process of creating new classes (derived classes) from existing classes (base classes). Inheritance allows inheriting ALL code of one class into another (except members declared as private). The class to be inherited is the **base/parent class**; the class that inherits is the **derived/child class**. A derived class is a "power-packed" class, as it can add additional attributes and methods, enhancing its functionality.

**Main advantages of inheritance:**
- It represents real-world relationships well.
- It provides reusability of code.
- It supports transitivity.

**16.3 Types of Inheritance**

1. **Single Inheritance:** A derived class inherits from only ONE base class.
2. **Multiple Inheritance:** A derived class inherits from MULTIPLE base classes.
3. **Hierarchical Inheritance:** More than one derived class is created from a SINGLE base class.
4. **Multilevel Inheritance:** A class is derived from a class which is itself a derived class — reflecting the *transitive* nature of inheritance (like a grandfather → father → child relationship). The level of inheritance can extend to any number of levels.
5. **Hybrid Inheritance:** A combination of more than one type of inheritance — e.g., Multilevel + Multiple, or Hierarchical + Multilevel, or all three combined.`,
      nav: { next: "derived-base-syntax", nextLabel: "Next: Defining a Derived Class →" }
    },
    {
      id: "derived-base-syntax",
      title: "Derived Class Syntax & Examples",
      content: `**16.4 Derived Class and Base Class**

When defining a derived class, it must identify the class it derives from. Points to observe:
i. The keyword **class** must be used.
ii. The name of the derived class follows the keyword class.
iii. A single **colon (:)**.
iv. The **type of derivation** (visibility mode) — private, public, or protected. If unspecified, the default visibility mode is **private**.
v. The name of the **base class** (parent class) — if more than one, separated by commas.

Syntax:
\`\`\`
class derived_class_name : visibility_mode base_class_name
{
    // members of derived class
};
\`\`\`

**16.4.1 Single Inheritance Example**

\`\`\`
class student           // base class
{
private:
    char name[20];
    int rno;
public:
    void acceptname() { ... }
    void displayname() { ... }
};
class exam : public student   // derived class, single base class
{
public:
    int mark1, mark2, ...;
    void acceptmark() { ... }
    void displaymark() { ... }
};
\`\`\`
Here, "exam" inherits all members of "student", but only has access privilege to the base class's **non-private** members. An object of exam (e.g., \`exam e1;\`) can call both its own functions AND the inherited base class functions like \`e1.acceptname()\` and \`e1.displayname()\`.

**16.4.3 Multilevel Inheritance Example**

\`\`\`
class student { ... };                    // base class
class exam : public student { ... };      // derived from student
class result : public exam { ... };       // derived from exam (which is derived from student)
\`\`\`
Here, "result" is derived from "exam", which is itself derived from "student" — a chain of inheritance. An object of result can call functions from ALL THREE classes (its own, exam's, and student's). Multilevel inheritance can extend to any number of levels, similar to a grandfather–father–child relationship.

**Note:** A class with no declared members still has a size — e.g., \`class x{};\` occupies 1 byte.`,
      nav: { back: "intro-need-types", next: "visibility-modes", nextLabel: "Next: Visibility Modes →" }
    },
    {
      id: "visibility-modes",
      title: "Visibility Modes",
      content: `**16.5 Visibility Modes**

An important feature of inheritance is knowing which base-class members the derived class will acquire — controlled by **visibility modes**. The three visibility modes are **private**, **protected**, and **public**; the default is **private**.

**Key distinction:** Access specifiers control accessibility of members WITHIN a class; visibility modes control the access of INHERITED members within the derived class.

**16.5.1 Private Visibility Mode:** When a base class is inherited with private visibility, the base class's **public and protected** members become **private** members of the derived class.

**16.5.2 Protected Visibility Mode:** When inherited with protected visibility, the base class's **protected and public** members become **protected** members of the derived class.

**16.5.3 Public Visibility Mode:** When inherited with public visibility, the base class's **protected** members remain **protected**, and its **public** members remain **public** in the derived class.

**Tip:** Regardless of visibility mode (public, protected, or private), the **private members of the base class are never inherited** — they continue to exist in the derived class's memory layout but cannot be accessed directly by the derived class.

**Choosing a visibility mode:**
- **Private inheritance:** Use when base class features should be available to the derived class, but NOT to classes further derived from it.
- **Protected inheritance:** Use when base class features should be available only to derived class members, but NOT to the outside world.
- **Public inheritance:** Use when base class features should be available to derived class members AND to the outside world.`,
      nav: { back: "derived-base-syntax", next: "constructors-overriding", nextLabel: "Next: Constructors, Destructors & Overriding →" }
    },
    {
      id: "constructors-overriding",
      title: "Constructors, Destructors & Overriding in Inheritance",
      content: `**16.6 Inheritance and Constructors/Destructors**

When an object of a derived class is created, the compiler first calls the **base class constructor**, then the **derived class constructor** — because the derived class is built up on the base class's members. When a derived class object expires, the **derived class destructor** is invoked FIRST, followed by the **base class destructor** (reverse order).

For a three-level chain (base → derived → derived1), the execution order is:
\`\`\`
Constructor of base class...
Constructor of derived...
Constructor of derived1...
[object used]
Destructor of derived1...
Destructor of derived...
Destructor of base class...
\`\`\`

**Notes:**
- Constructors execute in the order of inheritance (base → derived); destructors execute in the reverse order.
- The size of a derived class object = size of all base class data members + size of all derived class data members.

**16.7 Overriding / Shadowing Base Class Functions in Derived Class**

When a base class and a derived class have member functions with the **same name**, calling that function on a derived class object can confuse the compiler about which version to invoke. The **derived class's member function has higher priority**, and shadows (hides) the base class's same-named function — this situation is called **function overriding**.

This is resolved using the **scope resolution operator (::)** along with the base class name, e.g., \`Employee::display();\` explicitly calls the base class's version of display() from within the derived class's own display() function — allowing the derived version to first invoke (and extend) the base version rather than completely replacing it.

Example: if both \`Employee\` and \`staff\` (derived from Employee) define \`getdata()\` and \`display()\`, then inside \`staff::display()\`, calling \`Employee::display();\` first prints the base class's fields (name, code), before staff's own display() adds its extra field (experience) — combining both outputs cleanly.`,
      nav: { back: "visibility-modes", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- The mechanism of deriving a new class from an existing class is called inheritance; its main advantage is reusability of code.
- The derived class inherits all properties of the base class and can add its own additional attributes/methods.
- Types of inheritance: Single, Multiple, Hierarchical, Multilevel (reflects transitive nature), and Hybrid (combination of types).
- In multiple inheritance, base classes are constructed in the order they appear in the derived class's declaration.
- A sub-class can derive itself publicly, privately, or protectedly (visibility mode) — the private members of a base class are never inherited.
- Public visibility: base's public stays public, protected stays protected in the derived class. Private visibility: base's public and protected both become private in the derived class. Protected visibility: base's public and protected both become protected in the derived class.
- Constructors and destructors of the base class are not themselves "inherited," but the base class constructor is automatically invoked when a derived class object is created.
- Constructors execute base-to-derived; destructors execute derived-to-base (reverse order).
- The size of a derived class object = size of all base class data members + size of all derived class data members.
- Overriding of same-named member functions between base and derived classes is resolved using the scope resolution operator (::).
- The \`this\` pointer is used to refer to the current object's own members.`,
      nav: { back: "constructors-overriding", practice: true }
    }
  ]
}
