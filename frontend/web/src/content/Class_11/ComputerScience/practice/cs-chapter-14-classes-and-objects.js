export default {
  "meta": {
    "subject": "Computer Science -- Class XI",
    "unit": "Chapter 14 -- Classes and Objects",
    "time": "2.30 hrs",
    "totalMarks": 47,
    "instructions": "Samacheer Kalvi -- Answer all questions"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "Part I -- MCQ (8 x 1)",
      "title": "Part I -- Choose the Correct Answer",
      "type": "mcq",
      "scoreMax": 8,
      "marksPer": 1,
      "sections": [
        {
          "label": "Classes and Objects",
          "questions": [
            {
              "id": "q1",
              "html": "The variables declared inside the class are known as:",
              "options": ["a) data", "b) inline", "c) method", "d) attributes"],
              "answer": 3,
              "hint": "Data variables inside a class representing its properties are called attributes (data members)."
            },
            {
              "id": "q2",
              "html": "State True/False: (i) A member function can call another member function directly, without using the dot operator. (ii) Member functions can access the private data of the class.",
              "options": ["a) i)True, ii)True", "b) i)False, ii)True", "c) i)True, ii)False", "d) i)False, ii)False"],
              "answer": 0,
              "hint": "Both are true: this is called nesting of member functions, and member functions can freely access all members, including private data."
            },
            {
              "id": "q3",
              "html": "A member function can call another member function directly, without using the dot operator — this is called:",
              "options": ["a) sub function", "b) sub member", "c) nesting of member function", "d) sibling of member function"],
              "answer": 2,
              "hint": "This is called nesting of member functions."
            },
            {
              "id": "q4",
              "html": "The member function defined within the class behaves like ______ functions.",
              "options": ["a) inline", "b) Non inline", "c) Outline", "d) Data"],
              "answer": 0,
              "hint": "Member functions defined inside the class body behave like inline functions."
            },
            {
              "id": "q5",
              "html": "Which of the following access specifiers protects data from inadvertent modifications?",
              "options": ["a) Private", "b) Protected", "c) Public", "d) Global"],
              "answer": 0,
              "hint": "Private members are the most restrictive, accessible only within the class itself, protecting data from outside modification."
            },
            {
              "id": "q6",
              "html": "class x { int y; public: x(int z){y=z;} } x1[4]; int main(){ x x2(10); return 0;} How many objects are created for the above program?",
              "options": ["a) 10", "b) 14", "c) 5", "d) 2"],
              "answer": 2,
              "hint": "x1[4] creates 4 objects (a global array), plus x2 creates 1 more object in main() — total 5."
            },
            {
              "id": "q7",
              "html": "State True/False about constructors: (i) Constructors should be declared in the private section. (ii) Constructors are invoked automatically when the objects are created.",
              "options": ["a) True, True", "b) True, False", "c) False, True", "d) False, False"],
              "answer": 2,
              "hint": "(i) is False — constructors are typically declared public, not private, so objects can be created from outside the class. (ii) is True — construction is automatic."
            },
            {
              "id": "q8",
              "html": "Which of the following constructor is executed for the prototype: add display(add &); (add is a class name)",
              "options": ["a) Default constructor", "b) Parameterized constructor", "c) Copy constructor", "d) Non-Parameterized constructor"],
              "answer": 2,
              "hint": "A constructor taking a reference to its own class type (add &) is the copy constructor."
            }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "Part II -- Very Short Answers (5 x 2)",
      "title": "Part II -- Very Short Answers",
      "type": "short_answer",
      "scoreMax": 10,
      "marksPer": 2,
      "sections": [
        {
          "label": "Very Short Answers",
          "questions": [
            {
              "id": "q9",
              "html": "What are called members?",
              "answer": "The components that make up a class — Data Members (variables representing the class's features/properties, also called attributes) and Member Functions (functions performing specific tasks in the class, also called methods) — are together called members of the class.",
              "hint": "Data Members (attributes) and Member Functions (methods) together form the members of a class."
            },
            {
              "id": "q10",
              "html": "Differentiate structure and class, though both are user-defined data types.",
              "answer": "The only key difference between a structure and a class in C++ is their default access specifier: structure members are public by default, meaning they are accessible from outside the structure without any explicit access specifier being written. Class members, on the other hand, are private by default, meaning they cannot be accessed from outside the class unless explicitly declared public (or accessed via member functions).",
              "hint": "Struct members default to public; class members default to private — that is the only fundamental difference."
            },
            {
              "id": "q11",
              "html": "What is the difference between a class and an object in terms of OOP?",
              "answer": "A class is a user-defined data type that acts as a blueprint or template — it defines the properties (data members) and behaviours (member functions) that a group of similar entities will share, but by itself does not represent any specific real entity. An object is an actual instance created from that class — it is a concrete entity in memory, with its own real data values for the properties the class defines, and access to the class's functions.",
              "hint": "Class = blueprint/template (definition only); Object = actual instance created from the class, with real data."
            },
            {
              "id": "q12",
              "html": "Why is it considered good practice to define a constructor even though the compiler can automatically generate one?",
              "answer": "It is good practice to define a constructor explicitly because the compiler-generated default constructor only allocates memory — it does NOT meaningfully initialize the data members with sensible starting values (they may be left with garbage/unknown values). Defining your own constructor lets the programmer ensure that every object starts in a valid, predictable, properly initialized state, avoiding bugs caused by uninitialized data.",
              "hint": "The compiler-generated constructor only allocates memory; it doesn't set data members to sensible initial values — a user-defined constructor ensures proper initialization every time."
            },
            {
              "id": "q13",
              "html": "Write down the importance of a destructor.",
              "answer": "The destructor's importance lies in freeing the resources that an object may have acquired during its lifetime — such as memory that was allocated by the constructor when the object was created. It is automatically executed when the object goes out of scope, ensuring that resources are properly released and preventing memory leaks or resource wastage in a program.",
              "hint": "Frees/releases resources (e.g., memory) acquired by the object during its life, automatically, when the object goes out of scope — preventing resource leaks."
            }
          ]
        }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Short Answers (3 x 3)",
      "title": "Part III -- Short Answers",
      "type": "brief_answer",
      "scoreMax": 9,
      "marksPer": 3,
      "sections": [
        {
          "label": "Short Answers",
          "questions": [
            {
              "id": "q14",
              "html": "Explain the three types of constructors in C++.",
              "answer": "C++ has three types of constructors: (1) Default Constructor — takes no parameters, e.g., Data::Data(); if a class has no user-defined constructor, the compiler generates one automatically. (2) Parameterized Constructor — accepts arguments, allowing objects to be created with different initial values, e.g., Data::Data(int, int). (3) Copy Constructor — takes a reference to an already existing object of the same class, usually written as Data(Data&); it is invoked when an object is passed as a parameter, when a function returns an object, or when one object is initialized directly from another of the same type (e.g., Data d2(d1);).",
              "hint": "Default (no params), Parameterized (takes arguments for custom init values), Copy (Data&, initializes from an existing object)."
            },
            {
              "id": "q15",
              "html": "Explain the class access specifiers in C++.",
              "answer": "C++ has three access specifiers controlling visibility of class members: Private members cannot be accessed from outside the class — only the class's own member functions can access them; this is the default if no specifier is given. Protected members behave like private members, but with the added benefit that they CAN be accessed by derived (child) classes. Public members can be accessed from anywhere outside the class, within the program — they can even be read/set directly without needing a member function.",
              "hint": "Private (class-only access, default), Protected (class + derived classes), Public (accessible from anywhere in the program)."
            },
            {
              "id": "q16",
              "html": "Explain how memory is allocated for objects of a class.",
              "answer": "Member functions of a class are placed into memory only ONCE, as part of the class specification itself — since every object of that class shares the same function code, no separate memory is allocated per object for the functions (they live in a shared 'common pool'). However, memory for member VARIABLES (data members) is allocated separately for EACH object, because different objects hold different data values. For example, two objects of a class with an int, int, and float member would each individually report the same sizeof() value (covering just their own data members), while both share the same underlying function code.",
              "hint": "Member functions: allocated ONCE, shared by all objects. Member (data) variables: allocated SEPARATELY for each object, since each holds different values."
            }
          ]
        }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Explain in Detail (4 x 5)",
      "title": "Part IV -- Explain in Detail",
      "type": "long_essay",
      "scoreMax": 20,
      "marksPer": 5,
      "sections": [
        {
          "label": "Long Answers",
          "questions": [
            {
              "id": "q17",
              "html": "Mention the differences between constructor and destructor.",
              "answer": "Constructor: has the same name as the class (no prefix); can accept parameters (parameterized/default/copy variants); can be overloaded (a class may have multiple constructors); is called automatically when an object is CREATED; its main job is to allocate memory and initialize the object's data members.\n\nDestructor: has the same name as the class but PREFIXED with a tilde (~); CANNOT accept any parameters; CANNOT be overloaded (only one destructor per class); is called automatically when an object goes OUT OF SCOPE (is destroyed); its main job is to free/release resources (like memory) that the object acquired during its lifetime.\n\nBoth constructors and destructors: return nothing and are not associated with any data type; are automatically generated by the compiler if not explicitly user-defined; and cannot be inherited by derived classes (though a derived class can call the base class's constructor).",
              "hint": "Same name (constructor) vs ~name (destructor); can take params/be overloaded (constructor) vs cannot (destructor); called on creation vs on going out of scope; allocates/initializes vs frees resources."
            },
            {
              "id": "q18",
              "html": "Define a class RESORT in C++ with the following description: Private members: Rno (room number), Name (user name), Charges (per day charge), Days (number of days); Compute() — calculates total amount as Days*Charges, and if it exceeds 11000, applies 1.02*Days*Charges instead. Public members: GetInfo() — reads name, room no, charges, days; DispInfo() — displays all entered details and the computed total amount.",
              "answer": "#include <iostream>\nusing namespace std;\n\nclass RESORT\n{\n    private:\n        int Rno;\n        char Name[20];\n        float Charges;\n        int Days;\n        float Total;\n\n        void Compute()\n        {\n            Total = Days * Charges;\n            if (Total > 11000)\n                Total = 1.02 * Days * Charges;\n        }\n\n    public:\n        void GetInfo()\n        {\n            cout << \"\\nEnter Room Number: \";\n            cin >> Rno;\n            cout << \"Enter Name: \";\n            cin >> Name;\n            cout << \"Enter Charges per day: \";\n            cin >> Charges;\n            cout << \"Enter Number of Days: \";\n            cin >> Days;\n        }\n\n        void DispInfo()\n        {\n            Compute();\n            cout << \"\\nRoom No : \" << Rno;\n            cout << \"\\nName    : \" << Name;\n            cout << \"\\nCharges : \" << Charges;\n            cout << \"\\nDays    : \" << Days;\n            cout << \"\\nTotal Amount : \" << Total;\n        }\n};\n\nint main()\n{\n    RESORT r;\n    r.GetInfo();\n    r.DispInfo();\n    return 0;\n}\n\nExplanation: Compute() is declared private since it's an internal calculation helper, called automatically from within DispInfo() (a public member function) rather than being called directly by the user — this matches the description where Compute() is listed among private members but its result must be shown via DispInfo().",
              "hint": "Private: Rno, Name, Charges, Days, and a private Compute() with the conditional surcharge logic. Public: GetInfo() (reads input) and DispInfo() (calls Compute() internally, then displays all details + total)."
            },
            {
              "id": "q19",
              "html": "Write the output of the following program: class student { int rno, marks; public: student(int r,int m) { cout<<\"Constructor \"<<endl; rno=r; marks=m; } void printdet() { marks=marks+30; cout<<\"Name: Bharathi\"<<endl; cout<<\"Roll no : \"<<rno<<\"\\n\"; cout<<\"Marks : \"<<marks<<endl; } }; int main() { student s(14,70); s.printdet(); cout<<\"Back to Main\"; return 0; }",
              "answer": "The output will be:\n\nConstructor\nName: Bharathi\nRoll no : 14\nMarks : 100\nBack to Main\n\nExplanation: When 'student s(14,70);' executes, it implicitly calls the parameterized constructor student(int r, int m), which first prints \"Constructor\", then sets rno=14 and marks=70. Next, 's.printdet();' is called: it first updates marks by adding 30 (marks = 70+30 = 100), then prints \"Name: Bharathi\", followed by \"Roll no : 14\", followed by \"Marks : 100\". Finally, control returns to main(), which prints \"Back to Main\" before the program ends.",
              "hint": "Constructor runs first (implicit call via student s(14,70);) printing 'Constructor' and setting rno=14, marks=70. Then printdet() adds 30 to marks (→100) and prints the details. Finally 'Back to Main' prints."
            },
            {
              "id": "q20",
              "html": "Explain the concept of dynamic initialization of objects with a suitable example.",
              "answer": "Dynamic initialization of objects means providing the initial values for an object's data members at RUNTIME (based on user input or other computed values), rather than fixing them at compile time. This is achieved by using a parameterized constructor and passing runtime values (like variables read via cin) as its arguments when the object is created.\n\nExample:\n\nclass X\n{\n    int n;\n    float avg;\n    public:\n        X(int p, float q) { n=p; avg=q; }\n        void disp() { cout<<\"Roll number:- \"<<n; cout<<\"\\nAverage :- \"<<avg; }\n};\nint main()\n{\n    int a; float b;\n    cout<<\"Enter the Roll Number\"; cin>>a;\n    cout<<\"Enter the Average\"; cin>>b;\n    X x(a,b);   // dynamic initialization\n    x.disp();\n    return 0;\n}\n\nHere, the object x is not created with fixed, hardcoded values like X x(1201, 98.6); at compile time. Instead, the values a and b are first read from the user during program execution, and only THEN is the object x constructed using those runtime values — X x(a,b); — making this a dynamic initialization, since the exact values used depend on what the user enters when the program runs.",
              "hint": "Initial values are supplied at runtime (e.g., via cin) rather than hardcoded at compile time, then passed to a parameterized constructor to create the object — illustrate with a roll-number/average example."
            }
          ]
        }
      ]
    }
  ]
}
