export const class12ComputerScienceModelQA3 = {
  paperId:      "class12-computer-science-model-qa-3",
  title:        "Model Q&A 3",
  classLabel:   "Class 12",
  subject:      "Computer Science",
  duration:     "3.00 Hours",
  maximumMarks: 90,
  totalPages:   6,

  pages: [
    {
      pageNumber: 1,
      blocks: [
        { type: "paper_header", content: "CLASS XII — COMPUTER SCIENCE\nMODEL QUESTION PAPER — SET 3" },
        { type: "metadata_row", duration: "3.00 Hours", maximumMarks: 90, totalPages: 6 },
        { type: "instructions", content: "Answer all questions. Figures in the margin indicate full marks." },
        { type: "part_heading", content: "PART - I" },
        { type: "section_heading", content: "Choose the correct answer (20 × 1 = 20)" },

        { type: "mcq_question", questionId: "1", marks: 1, content: "Which function is used to find the square root of a number in Python (needs importing math)?", options: ["sqrt()", "root()", "pow(0.5)", "square()"] },
        { type: "mcq_question", questionId: "2", marks: 1, content: "A list in Python is enclosed within which brackets?", options: ["{ }", "( )", "[ ]", "< >"] },
        { type: "mcq_question", questionId: "3", marks: 1, content: "Which method adds a single element at the end of a list?", options: ["extend()", "append()", "insert()", "add()"] },
        { type: "mcq_question", questionId: "4", marks: 1, content: "A tuple is enclosed within which brackets?", options: ["{ }", "( )", "[ ]", "< >"] },
        { type: "mcq_question", questionId: "5", marks: 1, content: "A single-element tuple must include a trailing:", options: ["Semicolon", "Comma", "Colon", "Period"] },
        { type: "mcq_question", questionId: "6", marks: 1, content: "A Set in Python does NOT allow:", options: ["Mixed data types", "Duplicate elements", "Union operations", "Membership testing"] },
        { type: "mcq_question", questionId: "7", marks: 1, content: "In a dictionary, keys and values are separated by:", options: ["Comma", "Semicolon", "Colon", "Hyphen"] },
        { type: "mcq_question", questionId: "8", marks: 1, content: "Which keyword defines a class in Python?", options: ["struct", "class", "object", "type"] },
        { type: "mcq_question", questionId: "9", marks: 1, content: "The special first parameter of every class method in Python is called:", options: ["this", "self", "obj", "cls"] },
        { type: "mcq_question", questionId: "10", marks: 1, content: "Which special method acts as the constructor in Python?", options: ["__new__()", "__init__()", "__start__()", "__create__()"] },
        { type: "mcq_question", questionId: "11", marks: 1, content: "A variable prefixed with a double underscore in a class becomes:", options: ["Public", "Protected", "Private", "Global"] },
        { type: "mcq_question", questionId: "12", marks: 1, content: "In database terms, a row is also called a:", options: ["Attribute", "Relation", "Tuple", "Field"] },
        { type: "mcq_question", questionId: "13", marks: 1, content: "In database terms, a column is also called an:", options: ["Attribute", "Relation", "Tuple", "Record"] },
        { type: "mcq_question", questionId: "14", marks: 1, content: "Which data model represents data as tables?", options: ["Hierarchical", "Relational", "Network", "Object"] },
        { type: "mcq_question", questionId: "15", marks: 1, content: "The relational model was first proposed by:", options: ["Chen", "E.F. Codd", "Guido Van Rossum", "Bjarne Stroustrup"] },
        { type: "mcq_question", questionId: "16", marks: 1, content: "The symbol used for the PROJECT operation in relational algebra is:", options: ["σ", "Π", "∪", "∩"] },
        { type: "mcq_question", questionId: "17", marks: 1, content: "Which type of relationship allows one row in table A to link to many rows in table B?", options: ["One-to-One", "One-to-Many", "Many-to-One", "None of these"] },
        { type: "mcq_question", questionId: "18", marks: 1, content: "RDBMS reduces data redundancy through:", options: ["Encryption", "Normalization", "Compression", "Duplication"] },
        { type: "mcq_question", questionId: "19", marks: 1, content: "Which of the following is an example of RDBMS?", options: ["Dbase", "FoxPro", "MySQL", "Notepad"] },
        { type: "mcq_question", questionId: "20", marks: 1, content: "Instance variables in a Python class are typically declared using which keyword?", options: ["this", "self", "var", "instance"] },

        { type: "footer_note", content: "[ Turn over" },
      ],
    },
    {
      pageNumber: 2,
      blocks: [
        { type: "part_heading", content: "PART - II" },
        { type: "section_heading", content: "Short Answer Questions (5 × 2 = 10)" },

        { type: "question", questionId: "21", marks: 2, content: "How do you create a new list using a range() function? Give an example." },
        { type: "question", questionId: "22", marks: 2, content: "Differentiate list and tuple." },
        { type: "question", questionId: "23", marks: 2, content: "What is class instantiation? Give the syntax." },
        { type: "question", questionId: "24", marks: 2, content: "What is a Primary Key constraint?" },
        { type: "question", questionId: "25", marks: 2, content: "What is the PROJECT operation in relational algebra?" },

        { type: "part_heading", content: "PART - III" },
        { type: "section_heading", content: "Brief Answer Questions (5 × 3 = 15)" },

        { type: "question", questionId: "26", marks: 3, content: "Explain the set operations: Union, Intersection, Difference." },
        { type: "question", questionId: "27", marks: 3, content: "Explain how to access and modify elements of a dictionary." },
        { type: "question", questionId: "28", marks: 3, content: "Explain constructors in Python with an example." },
        { type: "question", questionId: "29", marks: 3, content: "Explain the components of DBMS." },
        {
          type: "or_question", questionId: "30", marks: 3,
          optionA: { content: "Explain public and private data members in a Python class." },
          optionB: { content: "Explain the types of DBMS users." },
        },

        { type: "part_heading", content: "PART - IV" },
        { type: "section_heading", content: "Long Essay Questions (5 × 9 = 45)" },

        { type: "question", questionId: "31", marks: 9, content: "Explain how to create, access, modify, and delete elements of a List, with examples." },
        {
          type: "or_question", questionId: "31", marks: 9,
          optionA: { content: "Explain Tuples — creation, accessing, and tuple assignment, with examples." },
          optionB: { content: "Explain Sets and their operations (Union, Intersection, Difference, Symmetric Difference) with examples." },
        },

        { type: "question", questionId: "32", marks: 9, content: "Explain Dictionaries in Python — creation, accessing, adding, modifying, and deleting elements, with examples." },
        {
          type: "or_question", questionId: "32", marks: 9,
          optionA: { content: "Differentiate List and Dictionary." },
          optionB: { content: "Explain list comprehension with examples." },
        },

        { type: "question", questionId: "33", marks: 9, content: "Explain classes and objects in Python, with class methods and the self keyword." },
        {
          type: "or_question", questionId: "33", marks: 9,
          optionA: { content: "Explain constructor and destructor in Python with suitable examples." },
          optionB: { content: "Explain public and private data members with suitable examples." },
        },

        { type: "question", questionId: "34", marks: 9, content: "Explain the different types of data models with examples: Hierarchical, Relational, Network, ER, and Object model." },
        {
          type: "or_question", questionId: "34", marks: 9,
          optionA: { content: "Explain the different types of relationships in a database with examples." },
          optionB: { content: "Differentiate DBMS and RDBMS." },
        },

        { type: "question", questionId: "35", marks: 9, content: "Explain the operators in Relational Algebra: SELECT, PROJECT, UNION, DIFFERENCE, INTERSECTION, CARTESIAN PRODUCT." },
        {
          type: "or_question", questionId: "35", marks: 9,
          optionA: { content: "Explain the characteristics of RDBMS." },
          optionB: { content: "Explain the components of DBMS with a diagram description." },
        },

        { type: "footer_note", content: "- o O o -" },
      ],
    },
  ],

  practice: {
    meta: {
      subject:      "Computer Science — Class 12",
      unit:         "Model Q&A 3 — Full Syllabus",
      time:         "3.00 hrs",
      totalMarks:   90,
      instructions: "Answer all questions",
      answerSource: "Model answers prepared from Tamil Nadu Samacheer Kalvi Class 12 Computer Science textbook (2024 Edition).",
    },
    parts: [
      {
        id: "p1",
        navLabel: "Part I — MCQ (20 × 1)",
        title: "Part I — Objective Type",
        type: "mcq",
        scoreMax: 20,
        marksPer: 1,
        instruction: "Choose the correct answer.",
        sections: [
          {
            label: "All Chapters",
            questions: [
              { id: "q1", html: "Which function is used to find the square root of a number in Python (needs importing math)?", options: ["a) sqrt()", "b) root()", "c) pow(0.5)", "d) square()"], answer: 0, officialKey: "a" },
              { id: "q2", html: "A list in Python is enclosed within which brackets?", options: ["a) { }", "b) ( )", "c) [ ]", "d) < >"], answer: 2, officialKey: "c" },
              { id: "q3", html: "Which method adds a single element at the end of a list?", options: ["a) extend()", "b) append()", "c) insert()", "d) add()"], answer: 1, officialKey: "b" },
              { id: "q4", html: "A tuple is enclosed within which brackets?", options: ["a) { }", "b) ( )", "c) [ ]", "d) < >"], answer: 1, officialKey: "b" },
              { id: "q5", html: "A single-element tuple must include a trailing:", options: ["a) Semicolon", "b) Comma", "c) Colon", "d) Period"], answer: 1, officialKey: "b" },
              { id: "q6", html: "A Set in Python does NOT allow:", options: ["a) Mixed data types", "b) Duplicate elements", "c) Union operations", "d) Membership testing"], answer: 1, officialKey: "b" },
              { id: "q7", html: "In a dictionary, keys and values are separated by:", options: ["a) Comma", "b) Semicolon", "c) Colon", "d) Hyphen"], answer: 2, officialKey: "c" },
              { id: "q8", html: "Which keyword defines a class in Python?", options: ["a) struct", "b) class", "c) object", "d) type"], answer: 1, officialKey: "b" },
              { id: "q9", html: "The special first parameter of every class method in Python is called:", options: ["a) this", "b) self", "c) obj", "d) cls"], answer: 1, officialKey: "b" },
              { id: "q10", html: "Which special method acts as the constructor in Python?", options: ["a) __new__()", "b) __init__()", "c) __start__()", "d) __create__()"], answer: 1, officialKey: "b" },
              { id: "q11", html: "A variable prefixed with a double underscore in a class becomes:", options: ["a) Public", "b) Protected", "c) Private", "d) Global"], answer: 2, officialKey: "c" },
              { id: "q12", html: "In database terms, a row is also called a:", options: ["a) Attribute", "b) Relation", "c) Tuple", "d) Field"], answer: 2, officialKey: "c" },
              { id: "q13", html: "In database terms, a column is also called an:", options: ["a) Attribute", "b) Relation", "c) Tuple", "d) Record"], answer: 0, officialKey: "a" },
              { id: "q14", html: "Which data model represents data as tables?", options: ["a) Hierarchical", "b) Relational", "c) Network", "d) Object"], answer: 1, officialKey: "b" },
              { id: "q15", html: "The relational model was first proposed by:", options: ["a) Chen", "b) E.F. Codd", "c) Guido Van Rossum", "d) Bjarne Stroustrup"], answer: 1, officialKey: "b" },
              { id: "q16", html: "The symbol used for the PROJECT operation in relational algebra is:", options: ["a) σ", "b) Π", "c) ∪", "d) ∩"], answer: 1, officialKey: "b" },
              { id: "q17", html: "Which type of relationship allows one row in table A to link to many rows in table B?", options: ["a) One-to-One", "b) One-to-Many", "c) Many-to-One", "d) None of these"], answer: 1, officialKey: "b" },
              { id: "q18", html: "RDBMS reduces data redundancy through:", options: ["a) Encryption", "b) Normalization", "c) Compression", "d) Duplication"], answer: 1, officialKey: "b" },
              { id: "q19", html: "Which of the following is an example of RDBMS?", options: ["a) Dbase", "b) FoxPro", "c) MySQL", "d) Notepad"], answer: 2, officialKey: "c" },
              { id: "q20", html: "Instance variables in a Python class are typically declared using which keyword?", options: ["a) this", "b) self", "c) var", "d) instance"], answer: 1, officialKey: "b" },
            ],
          },
        ],
      },
      {
        id: "p2",
        navLabel: "Part II — Short Answers (5 × 2)",
        title: "Part II — Short Answer Questions",
        type: "short-essay",
        scoreMax: 10,
        marksPer: 2,
        instruction: "Answer in 2–3 sentences.",
        questions: [
          { q: "How do you create a new list using a range() function? Give an example.", ans: "A list can be created from range() by wrapping it in the list() function. Example: Even_List = list(range(2,11,2)); print(Even_List) gives [2, 4, 6, 8, 10].", officialKey: "Chapter 9" },
          { q: "Differentiate list and tuple.", ans: "A list's elements are mutable (can be changed after creation) and enclosed in square brackets []. A tuple's elements are immutable (cannot be changed once assigned) and enclosed in parentheses (); iterating a tuple is generally faster than a list.", officialKey: "Chapter 9" },
          { q: "What is class instantiation? Give the syntax.", ans: "Class instantiation is the process of creating an object (instance) of a class. Syntax: Object_name = class_name() — note it uses function-call notation with the class name.", officialKey: "Chapter 10" },
          { q: "What is a Primary Key constraint?", ans: "A Primary Key constraint declares a field as uniquely identifying each record in a table. Only one field per table can be a primary key, and it never allows NULL values.", officialKey: "Chapter 12" },
          { q: "What is the PROJECT operation in relational algebra?", ans: "PROJECT (symbol Π) eliminates all attributes of a relation except those mentioned in the projection list, returning a VERTICAL subset of the relation (specific columns), with duplicate rows removed.", officialKey: "Chapter 11" },
        ],
      },
      {
        id: "p3",
        navLabel: "Part III — Brief Answers (5 × 3)",
        title: "Part III — Brief Answer Questions",
        type: "short-essay",
        scoreMax: 15,
        marksPer: 3,
        instruction: "Answer in 4–6 sentences.",
        questions: [
          { q: "Explain the set operations: Union, Intersection, Difference.", ans: "Union (| or union()) includes all elements from both sets, eliminating duplicates. Intersection (& or intersection()) includes only elements common to both sets. Difference (- or difference()) includes elements present in the first set but NOT in the second. Example: set_A={2,4,6,8}; set_B={4,6,10}; set_A|set_B gives all unique elements; set_A&set_B gives {4,6}; set_A-set_B gives {2,8}.", officialKey: "Chapter 9" },
          { q: "Explain how to access and modify elements of a dictionary.", ans: "Access: use the key inside square brackets, e.g., MyDict['Reg_No'] retrieves that key's value. Adding/Modifying: assign a value to a key using dictionary_name[key]=value — if the key already exists, its value is overwritten (modified); if it doesn't exist, a new key-value pair is added.", officialKey: "Chapter 9" },
          { q: "Explain constructors in Python with an example.", ans: "A constructor is a special function automatically executed when an object is created, used to initialize the object's data. In Python, __init__() serves as the constructor. Example: class Sample: def __init__(self, num): self.num=num — creating Sample(10) automatically sets self.num to 10 without an explicit call.", officialKey: "Chapter 10" },
          { q: "Explain the components of DBMS.", ans: "DBMS has five major components: (1) Hardware — the computer and physical storage; (2) Software — the program interpreting database commands; (3) Data — the actual resource being stored; (4) Procedures/Methods — instructions for using the DBMS (installation, backups); (5) Database Access Languages — languages used to access, insert, update, and delete data.", officialKey: "Chapter 11" },
          { q: "Explain public and private data members in a Python class.", ans: "Variables in a class are PUBLIC by default, accessible from anywhere via the object and dot operator. A variable prefixed with a double underscore (__) becomes PRIVATE, accessible only from WITHIN the class (typically via its own methods) — attempting to access it directly from outside raises an AttributeError.", officialKey: "Chapter 10" },
        ],
      },
      {
        id: "p4",
        navLabel: "Part IV — Long Essays (5 × 9)",
        title: "Part IV — Long Essay Questions",
        type: "long-essay",
        scoreMax: 45,
        marksPer: 9,
        instruction: "Answer in detail.",
        questions: [
          {
            id: "l1",
            q: "Explain how to create, access, modify, and delete elements of a List, with examples.",
            ans: "Creating: Variable = [element-1, element-2, ...]. Example: Marks = [10,23,41,75].\n\nAccessing: Elements have positive (from 0) or negative (from -1) index values. Example: Marks[0] gives 10; Marks[-1] gives 75. Loops (while/for) can access all elements sequentially.\n\nModifying: Since lists are mutable, use assignment: MyList[2]=6 changes the 3rd element; MyList[0:5]=2,4,6,8,10 changes a range.\n\nAdding elements: append(element) adds one element at the end; extend([elements]) adds multiple; insert(position,element) inserts at a specific position, shifting later elements right.\n\nDeleting: del List[index] removes a specific element (or del List[from:to] for a range, or del List for the whole list); remove(value) deletes by value; pop(index) deletes AND returns an element (last element if no index given); clear() empties the list but keeps it existing.\n\nTogether, these operations give complete control over building and maintaining a Python list throughout a program's execution.",
            officialKey: "Chapter 9",
          },
          {
            id: "l2",
            q: "Explain Dictionaries in Python — creation, accessing, adding, modifying, and deleting elements, with examples.",
            ans: "Creating: Dictionary_Name = {Key_1: Value_1, Key_2: Value_2, ...}. Example: Dict_Stud = {'RollNo':'1234', 'Name':'Murali'}.\n\nAccessing: Use the key inside square brackets. Example: print(MyDict['Reg_No']) retrieves the value for key 'Reg_No'. print(MyDict) alone shows all key-value pairs.\n\nAdding: Assign a value to a new key: MyDict['Class']='XII-A' — since 'Class' didn't exist before, this ADDS a new pair.\n\nModifying: Assigning to an EXISTING key overwrites its old value — the syntax is identical to adding, Python determines add vs. modify based on whether the key already exists.\n\nDeleting: del dictionary_name[key] removes one specific pair; dictionary_name.clear() removes ALL pairs (dictionary still exists, now empty); del dictionary_name removes the entire dictionary variable.\n\nDictionaries are especially useful when data needs to be looked up by a meaningful key (like a name or ID) rather than a numeric position, unlike lists/tuples which use only positional indices.",
            officialKey: "Chapter 9",
          },
          {
            id: "l3",
            q: "Explain classes and objects in Python, with class methods and the self keyword.",
            ans: "A class is a template (blueprint) for creating objects, defined with the keyword 'class', containing class variables (data) and methods (functions). An object is an instance of a class, created via Class Instantiation: Object_name = class_name().\n\nExample:\nclass Sample:\n    x, y = 10, 20\nS = Sample()\nprint(S.x, S.y)   # 10 20\n\nClass Methods: Similar to ordinary functions, but their FIRST parameter must always be 'self' — Python supplies this automatically when the method is called on an object, referring to that specific object. Even a method needing no other input must declare self.\n\nExample:\nclass Student:\n    def process(self):\n        print('Processing...')\nS = Student()\nS.process()   # self is passed automatically as S\n\nThe self keyword lets a method access that particular object's own data (via self.variable_name), distinguishing between different objects created from the same class — essential when multiple objects of a class exist simultaneously, each with potentially different data.",
            officialKey: "Chapter 10",
          },
          {
            id: "l4",
            q: "Explain the different types of data models with examples: Hierarchical, Relational, Network, ER, and Object model.",
            ans: "1. Hierarchical Model: Developed by IBM. Data represented as a tree-like structure with a one-to-many (parent-child) relationship. Used mainly in IBM Mainframe computers.\n\n2. Relational Model: Proposed by E.F. Codd in 1970 — the most widespread model today. Data stored as tables (relations), with a relation key uniquely identifying each row (tuple).\n\n3. Network Model: An extension of the hierarchical model, allowing a child record to have MULTIPLE parent nodes (many-to-many relationships), enabling faster, more flexible data access.\n\n4. Entity Relationship (ER) Model: Developed by Chen in 1976. Divides data into entities (rectangles) and attributes (ellipses), with relationships shown as diamonds — useful for conceptual database design.\n\n5. Object Model: Stores data as objects, attributes, methods, classes, and inheritance — used for complex applications like GIS or engineering design, providing a clear, modular structure.\n\nEach model represents a different balance of simplicity, structure, and flexibility, suited to different kinds of applications and data relationships encountered in real-world database design.",
            officialKey: "Chapter 11",
          },
          {
            id: "l5",
            q: "Explain the operators in Relational Algebra: SELECT, PROJECT, UNION, DIFFERENCE, INTERSECTION, CARTESIAN PRODUCT.",
            ans: "1. SELECT (σ): Filters ROWS of a relation based on a condition. Example: σ(course='Big Data') applied to STUDENT returns only matching rows.\n\n2. PROJECT (Π): Filters COLUMNS, returning specified attributes only (a vertical subset), removing duplicate rows. Example: Πcourse(STUDENT).\n\n3. UNION (∪): Combines all tuples from two relations, eliminating duplicates.\n\n4. SET DIFFERENCE (−): A−B returns tuples present in A but NOT in B.\n\n5. INTERSECTION (∩): A∩B returns tuples common to BOTH A and B (must be union-compatible).\n\n6. CARTESIAN PRODUCT (X): Combines every row of relation A with every row of relation B (different attributes) — if A has 3 rows and B has 2, A x B has 6 rows, useful for merging columns from two relations before further filtering.\n\nTogether, these six operators form the mathematical foundation underlying how SQL queries process, filter, and combine relational data — every SQL SELECT statement is ultimately expressible in terms of these relational algebra operations.",
            officialKey: "Chapter 11",
          },
        ],
      },
    ],
  },
}

export default class12ComputerScienceModelQA3
