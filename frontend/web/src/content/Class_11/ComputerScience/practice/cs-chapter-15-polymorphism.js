export default {
  "meta": {
    "subject": "Computer Science -- Class XI",
    "unit": "Chapter 15 -- Polymorphism",
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
          "label": "Polymorphism",
          "questions": [
            {
              "id": "q1",
              "html": "Which of the following refers to a function having more than one distinct meaning?",
              "options": ["a) Function Overloading", "b) Member overloading", "c) Operator overloading", "d) Operations overloading"],
              "answer": 0,
              "hint": "A function with more than one distinct meaning (same name, different signatures) is an overloaded function."
            },
            {
              "id": "q2",
              "html": "Which of the following reduces the number of comparisons in a program?",
              "options": ["a) Operator overloading", "b) Operations overloading", "c) Function Overloading", "d) Member overloading"],
              "answer": 2,
              "hint": "Function overloading reduces comparisons and makes programs execute faster."
            },
            {
              "id": "q3",
              "html": "void dispchar(char ch='$', int size=10) { for(int i=1;i<=size;i++) cout<<ch; } How will you invoke dispchar() to print $ for 10 times?",
              "options": ["a) dispchar();", "b) dispchar(ch,size);", "c) dispchar($,10);", "d) dispchar('$',10 times);"],
              "answer": 0,
              "hint": "Since both parameters already have matching default values ('$' and 10), calling with no arguments uses the defaults."
            },
            {
              "id": "q4",
              "html": "Which of the following is NOT true with respect to function overloading?",
              "options": ["a) The overloaded functions must differ in their signature.", "b) The return type is also considered for overloading a function.", "c) The default arguments of overloaded functions are not considered for overloading.", "d) Destructor function cannot be overloaded."],
              "answer": 1,
              "hint": "Return type is NOT considered for function overloading — this statement is false, making it the correct answer to 'which is NOT true'."
            },
            {
              "id": "q5",
              "html": "Which of the following is an invalid prototype for function overloading?",
              "options": ["a) void fun(int x); void fun(char ch);", "b) void fun(int x); void fun(int y);", "c) void fun(double d); void fun(char ch);", "d) void fun(double d); void fun(int y);"],
              "answer": 1,
              "hint": "void fun(int x) and void fun(int y) have IDENTICAL signatures (both take a single int) — parameter names don't count as different signatures."
            },
            {
              "id": "q6",
              "html": "Which of the following operators CANNOT be overloaded in C++?",
              "options": ["a) +", "b) ==", "c) sizeof", "d) <<"],
              "answer": 2,
              "hint": "sizeof is one of the operators that cannot be overloaded, along with ::, ., *, and ?:."
            },
            {
              "id": "q7",
              "html": "A class can have overloaded constructors, but the ______ function cannot be overloaded.",
              "options": ["a) member", "b) destructor", "c) data", "d) friend"],
              "answer": 1,
              "hint": "A class can have only ONE destructor — it cannot be overloaded, unlike constructors."
            },
            {
              "id": "q8",
              "html": "Which of the following is a restriction on operator overloading?",
              "options": ["a) New operators can be created", "b) Overloaded operators can have default arguments", "c) Precedence and associativity of an operator cannot be changed", "d) Any operand type can appear on the left of a binary overloaded operator"],
              "answer": 2,
              "hint": "One of the key restrictions is that you cannot change an operator's precedence or associativity — only give it additional meaning."
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
              "html": "What is function overloading?",
              "answer": "Function overloading is the ability of a function to process data in more than one form — two or more functions in the same scope share the same name but have different parameters (a different signature). The compiler determines which version to call based on the arguments used in the call.",
              "hint": "Two or more functions share the same name but have different parameter signatures (number/type of arguments)."
            },
            {
              "id": "q10",
              "html": "List the operators that cannot be overloaded.",
              "answer": "The operators that cannot be overloaded in C++ are: Scope resolution operator (::), sizeof, Member selector (.), Member pointer selector (*), and the Ternary/conditional operator (?:).",
              "hint": "::, sizeof, . (dot), * (member pointer selector), and ?: (ternary)."
            },
            {
              "id": "q11",
              "html": "class add{int x; public: add(int);}; Write an outline definition for the constructor.",
              "answer": "add::add(int a)\n{\n    x = a;\n}\n\nThis defines the constructor OUTSIDE the class body, using the scope resolution operator (::) to indicate it belongs to the 'add' class.",
              "hint": "ClassName::ClassName(int a) { x = a; } — using the :: scope resolution operator since it's defined outside the class."
            },
            {
              "id": "q12",
              "html": "Does the return type of a function help in overloading a function?",
              "answer": "No, the return type of a function does NOT help in overloading a function. Overload resolution is based purely on the number and/or data types of the function's parameters (its signature) — two functions with the same name, the same parameter list, but different return types are NOT valid overloads and would cause a compile error.",
              "hint": "No — overloading depends only on the parameter list (number/type), not the return type."
            },
            {
              "id": "q13",
              "html": "What is the use of overloading a function?",
              "answer": "Overloading a function is useful because it lets a single, meaningful function name be reused to perform a similar action on different types or numbers of data — avoiding the difficulty of inventing many distinct names for essentially the same operation (e.g., using a single name 'area' instead of area_circle, area_triangle, area_rectangle). It also reduces the number of comparisons in a program, makes execution faster, and reduces the number of function names a programmer needs to remember.",
              "hint": "Lets one meaningful name serve multiple related purposes; reduces comparisons, speeds execution, and reduces names to remember."
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
              "html": "What are the rules for function overloading?",
              "answer": "The rules for function overloading in C++ are: (1) Overloaded functions must differ in the number of arguments, or in the data types of their arguments; (2) The return type of a function is NOT considered for overloading purposes — two functions with the same name and same parameter list but different return types are not valid overloads; (3) Default arguments of overloaded functions are not considered as part of the parameter list when determining overload validity.",
              "hint": "Must differ in number or type of arguments; return type doesn't count; default arguments don't count toward the signature."
            },
            {
              "id": "q15",
              "html": "What is operator overloading? Give some examples of operators which can be overloaded.",
              "answer": "Operator overloading means giving additional functionality to a normal C++ operator, allowing it to perform user-defined operations on objects of a class — it is a type of polymorphism. For example, the '+' operator can be overloaded to add two complex number objects together, or to concatenate two string objects. Examples of operators that CAN be overloaded include: +, -, *, /, ++, --, +=, -=, ==, <, >, and << (among most others); operators that CANNOT be overloaded include ::, sizeof, ., *,  and ?:.",
              "hint": "Definition: giving user-defined meaning to existing operators for a class. Examples that CAN be overloaded: +, -, ==, <<, ++, etc."
            },
            {
              "id": "q16",
              "html": "Discuss the benefits of constructor overloading.",
              "answer": "Constructor overloading provides flexibility in creating multiple types of objects for a single class. Benefits include: (1) it allows objects to be created with different initial states — using a default constructor (no initial values), a parameterized constructor (custom initial values passed as arguments), or a copy constructor (values copied from an existing object) — all for the same class; (2) it makes the class more versatile and convenient to use, since the programmer can choose whichever construction style best fits each specific situation in the program, without needing separate classes or extra initialization functions for each case.",
              "hint": "Allows multiple ways to construct objects (default/parameterized/copy) for the same class, giving flexibility without needing separate classes."
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
              "html": "What are the rules (restrictions) for operator overloading?",
              "answer": "The restrictions to keep in mind while implementing operator overloading in C++ are:\n\n1. The precedence and associativity of an operator cannot be changed — overloading '+' still respects its usual precedence relative to other operators.\n\n2. No new operators can be created — only EXISTING C++ operators can be given overloaded (additional) meanings; you cannot invent a brand-new symbol as an operator.\n\n3. The built-in meaning of an operator's basic behaviour on fundamental types cannot be redefined — for example, you cannot change how two plain integers are added using '+'. Overloading only gives ADDITIONAL functionality for user-defined types (classes).\n\n4. Overloaded operators cannot have default arguments.\n\n5. When binary operators are overloaded, the left-hand operand must be an object of the class in which the operator is being overloaded (the operator function is typically a member function of that class).\n\nThese restrictions ensure operator overloading extends the language safely, without breaking existing behaviour for built-in types or violating the language's fixed grammar/precedence rules.",
              "hint": "Cover all 5: precedence/associativity fixed, no new operators, can't redefine built-in-type behaviour, no default arguments, left operand must be of the relevant class."
            },
            {
              "id": "q18",
              "html": "Given the class Book with Function1 (constructor, no args), Function2 (display), Function3 (destructor), and Function4 (a constructor prototype with 3 parameters): (i) What are Function1 and Function4 together called? (ii) Which concept does Function3 illustrate, and when is it invoked? (iii) What is the use of Function3? (iv) Write statements in main() to invoke Function1 and Function2. (v) Write the definition for Function4.",
              "answer": "(i) Function1 (the no-argument constructor) and Function4 (the 3-parameter constructor prototype) together are called CONSTRUCTOR OVERLOADING — since the same class has more than one constructor with different signatures.\n\n(ii) Function3 (~Book()) illustrates the concept of a DESTRUCTOR. It is invoked automatically when an object of the Book class goes out of scope (e.g., when the program/function using it ends, or the object is explicitly deleted).\n\n(iii) The use of Function3 (the destructor) is to free/release any resources that the Book object may have acquired during its lifetime, and to perform any necessary cleanup just before the object is destroyed.\n\n(iv) Statements in main() to invoke Function1 (constructor) and Function2 (display):\n\nBook b1;          // invokes Function1 (default constructor)\nb1.display(500);  // invokes Function2 (display), passing 500 as the required float argument\n\n(v) Definition for Function4 (the parameterized constructor with 3 parameters):\n\nBook::Book(int SC, char S[], float F)\n{\n    BookCode = SC;\n    strcpy(Bookname, S);\n    fees = F;\n}",
              "hint": "(i) Constructor overloading. (ii) Destructor — invoked when object goes out of scope. (iii) Frees resources/cleanup. (iv) Book b1; b1.display(500);. (v) Book::Book(int SC,char S[],float F){...} using strcpy for the char array."
            },
            {
              "id": "q19",
              "html": "Write the output of the following program: class Seminar { int Time; public: Seminar(){Time=30; cout<<\"Seminar starts now\"<<endl;} void Lecture(){cout<<\"Lectures in the seminar on\"<<endl;} Seminar(int Duration){Time=Duration; cout<<\"Welcome to Seminar \"<<endl;} Seminar(Seminar &D){Time=D.Time; cout<<\"Recap of Previous Seminar Content \"<<endl;} ~Seminar(){cout<<\"Vote of thanks\"<<endl;} }; int main(){ Seminar s1,s2(2),s3(s2); s1.Lecture(); return 0; }",
              "answer": "The output will be:\n\nSeminar starts now\nWelcome to Seminar \nRecap of Previous Seminar Content \nLectures in the seminar on\nVote of thanks\nVote of thanks\nVote of thanks\n\nExplanation: The three objects are constructed in declaration order: s1 (no-argument constructor, prints 'Seminar starts now'), s2(2) (parameterized constructor with Duration=2, prints 'Welcome to Seminar'), s3(s2) (copy constructor, since it takes a reference to an existing Seminar object s2, prints 'Recap of Previous Seminar Content'). Then s1.Lecture(); prints 'Lectures in the seminar on'. Finally, when main() ends, the three local objects are destroyed — the destructor ~Seminar() runs once for EACH object (typically in reverse order of construction: s3, then s2, then s1), printing 'Vote of thanks' three times in total.",
              "hint": "Construction order: s1 (default), s2(2) (parameterized), s3(s2) (copy constructor, since it takes a Seminar& reference) — each prints its own message. Then Lecture() prints its line. Finally, all 3 destructors run (3× 'Vote of thanks')."
            },
            {
              "id": "q20",
              "html": "Based on this program: class comp { public: char s[10]; void getstring(char str[10]){strcpy(s,str);} void operator==(comp); }; void comp::operator==(comp ob){ if(strcmp(s,ob.s)==0) cout<<\"Strings are Equal\"; else cout<<\"Strings are not Equal\"; } int main(){ comp ob, ob1; ...; ob==ob1; return 0; } Answer: (i) Which objects have scope till the end of the program? (ii) Which object gets destroyed in between? (iii) Which operator is overloaded, and which statement invokes it? (iv) Write the prototype of the overloaded member function. (v) What types of operands are used for the overloaded operator?",
              "answer": "(i) Both objects, ob and ob1, have scope till the end of the program — neither is explicitly destroyed early; both remain in scope as local variables of main() until the program (and main()'s block) ends.\n\n(ii) No object gets destroyed in between the program in this code — the question's premise (from a general template) doesn't strictly apply here, since no object is deliberately scoped to end early; both ob and ob1 persist for the entire duration of main().\n\n(iii) The '==' operator is overloaded. It is invoked by the statement: ob==ob1;\n\n(iv) Prototype of the overloaded member function: void operator==(comp);\n\n(v) The overloaded operator uses OBJECT (class type) operands — specifically, both operands are of type 'comp' (the left-hand operand ob is the implicit calling object, and the right-hand operand ob1 is passed explicitly as the comp-type parameter).",
              "hint": "(i) ob and ob1 both persist to the end of main(). (ii) None is destroyed early in this code. (iii) '==' overloaded, invoked by 'ob==ob1;'. (iv) void operator==(comp);. (v) Both operands are objects of the comp class type."
            }
          ]
        }
      ]
    }
  ]
}
