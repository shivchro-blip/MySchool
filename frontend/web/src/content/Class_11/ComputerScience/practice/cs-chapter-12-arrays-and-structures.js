export default {
  "meta": {
    "subject": "Computer Science -- Class XI",
    "unit": "Chapter 12 -- Arrays and Structures",
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
          "label": "Arrays and Structures",
          "questions": [
            {
              "id": "q1",
              "html": "Which of the following is a collection of variables of the same type that can be referenced by a common name?",
              "options": ["a) int", "b) float", "c) Array", "d) class"],
              "answer": 2,
              "hint": "An array is defined as a collection of same-type variables referenced by a common name."
            },
            {
              "id": "q2",
              "html": "int age[]={6,90,20,18,2}; How many elements are there in this array?",
              "options": ["a) 2", "b) 5", "c) 6", "d) 4"],
              "answer": 1,
              "hint": "Count the values listed inside the braces: 6, 90, 20, 18, 2 — that's 5 values."
            },
            {
              "id": "q3",
              "html": "cin >> n[3]; To which element does this statement accept the value (i.e., which position, counting from 1)?",
              "options": ["a) 2", "b) 3", "c) 4", "d) 5"],
              "answer": 2,
              "hint": "Since subscripts start at 0, n[3] is the 4th element of the array."
            },
            {
              "id": "q4",
              "html": "By default, a string ends with which character?",
              "options": ["a) \\0", "b) \\t", "c) \\n", "d) \\b"],
              "answer": 0,
              "hint": "Every C++ string (character array) is terminated by the null character \\0."
            },
            {
              "id": "q5",
              "html": "Structure definition is terminated by:",
              "options": ["a) :", "b) }", "c) ;", "d) ::"],
              "answer": 2,
              "hint": "A struct declaration ends with a closing brace followed by a semicolon: };"
            },
            {
              "id": "q6",
              "html": "What will happen when the structure is declared (but no variables of that type are created)?",
              "options": ["a) It will not allocate any memory", "b) It will allocate the memory", "c) It will be declared and initialized", "d) It will be only declared"],
              "answer": 0,
              "hint": "Declaring a struct type alone (without creating a variable of that type) does not allocate memory — memory is allocated only when a variable/object of that type is created."
            },
            {
              "id": "q7",
              "html": "struct Time { int hours; int minutes; int seconds; } t; Using this declaration, which of the following refers to seconds?",
              "options": ["a) Time.seconds", "b) Time::seconds", "c) seconds", "d) t.seconds"],
              "answer": 3,
              "hint": "Members are accessed via the object (variable) name, not the structure tag — so t.seconds is correct."
            },
            {
              "id": "q8",
              "html": "Which of the following is a properly defined structure?",
              "options": ["a) struct {int num;}", "b) struct sum {int num;}", "c) struct sum int sum;", "d) struct sum {int num;};"],
              "answer": 3,
              "hint": "A valid named structure definition needs a tag name and must end with a semicolon: struct sum {int num;};"
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
              "html": "What is Traversal in an Array?",
              "answer": "Traversal is the process of visiting (accessing) each element of an array exactly once, typically to read, print, or process every value it contains. It is commonly implemented using a loop (like a for loop) that iterates through the array's subscripts from the first index to the last.",
              "hint": "Visiting/accessing every element of an array once, usually via a loop, to read or process each value."
            },
            {
              "id": "q10",
              "html": "What is a String?",
              "answer": "A string is a sequence of characters (letters, numbers, or symbols), where each character occupies one byte of memory. In C++, a string is implemented as a one-dimensional character array, and every string is terminated by a null character (\\0) appended automatically at the end.",
              "hint": "A sequence of characters, implemented as a one-dimensional character array, terminated by \\0."
            },
            {
              "id": "q11",
              "html": "What is the syntax to declare a two-dimensional array?",
              "answer": "The syntax is: data-type array_name[row-size][col-size]; — for example, int A[3][4]; declares a 2D array named A with 3 rows and 4 columns, capable of holding 12 elements total.",
              "hint": "data-type array_name[row-size][col-size]; e.g., int A[3][4];"
            },
            {
              "id": "q12",
              "html": "Define structure. What is its use?",
              "answer": "A structure is a user-defined data type that combines data items of different data types into a single logical unit, declared using the keyword 'struct'. Its use is to group related but differently-typed variables (e.g., a student's roll number, age, and weight) together as one cohesive record, stored adjacently in memory — something an array alone cannot do, since arrays require all elements to be the same type.",
              "hint": "A user-defined type grouping mixed-type data items together, used to represent a single logical record (e.g., a student's details)."
            },
            {
              "id": "q13",
              "html": "What is the error in the following structure definition? struct employee{ in teno;char ename[20];char dept;} Employee e1,e2;",
              "answer": "There are two errors: (1) 'in teno' should be 'int eno' — the data type keyword is misspelled/split incorrectly (it should read 'int eno;' as a single properly-typed member declaration). (2) The structure declaration is missing its closing semicolon after the closing brace '}' before the variable declarations begin — it should read '} Employee e1,e2;' only if this closing brace/variable-list combination itself ends with a semicolon, i.e., '...} e1, e2;' directly (declaring objects at the point of the struct's closing brace), OR the struct itself should end with '};' and e1,e2 declared as separate statements 'employee e1, e2;' using the lowercase tag name.",
              "hint": "The type 'in' is invalid (should be 'int'), and the member name is garbled ('teno' likely meant to be 'eno') — fix the data type keyword and clean up the member declaration syntax."
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
              "html": "Define an Array. What are its types?",
              "answer": "An array is a collection of variables of the same data type that are referenced by a common name, with each element accessed via a numeric subscript (index) starting from 0. It is a derived data type in C++. There are three types of arrays: (1) One-dimensional arrays — values stored in a single row/column; (2) Two-dimensional arrays — values stored in rows and columns (like a matrix); (3) Multi-dimensional arrays — arrays with more than two dimensions/indices.",
              "hint": "Collection of same-type variables under one name, indexed from 0. Types: One-dimensional, Two-dimensional, Multi-dimensional."
            },
            {
              "id": "q15",
              "html": "Write a note on Array of strings.",
              "answer": "An array of strings is implemented in C++ as a two-dimensional character array. The first index (rows) represents the number of separate strings stored, and the second index (columns) represents the maximum length of each individual string, including space for its null terminator (\\0). For example, char Name[6][10]; can hold 6 strings, each up to 9 characters long. All the strings are stored in continuous memory, and each row can be accessed and treated as an individual C-style string (e.g., Name[2] refers to the third string stored in the array).",
              "hint": "A 2D character array — rows = number of strings, columns = max length of each string (including \\0); each row acts as one string."
            },
            {
              "id": "q16",
              "html": "How to access members of a structure? Give an example.",
              "answer": "Members of a structure are accessed using the dot (.) operator, placed between the structure variable (object) name and the member name, in the form: objectName.memberName. For example, given 'struct Student { long rollno; int age; float weight; } balu;', the individual members are accessed as balu.rollno, balu.age, and balu.weight — each usable exactly like a normal variable of its respective type, for both reading and assigning values.",
              "hint": "objectName.memberName — e.g., for 'struct Student {...} balu;', access balu.rollno, balu.age, balu.weight."
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
              "html": "Write a C++ program to find the difference between two matrices.",
              "answer": "#include <iostream>\nusing namespace std;\nint main()\n{\n    int row, col, m1[10][10], m2[10][10], diff[10][10];\n    cout << \"Enter the number of rows: \";\n    cin >> row;\n    cout << \"Enter the number of columns: \";\n    cin >> col;\n\n    cout << \"Enter the elements of first matrix:\\n\";\n    for (int i = 0; i < row; i++)\n        for (int j = 0; j < col; j++)\n            cin >> m1[i][j];\n\n    cout << \"Enter the elements of second matrix:\\n\";\n    for (int i = 0; i < row; i++)\n        for (int j = 0; j < col; j++)\n            cin >> m2[i][j];\n\n    cout << \"Difference (Matrix1 - Matrix2):\\n\";\n    for (int i = 0; i < row; i++)\n    {\n        for (int j = 0; j < col; j++)\n        {\n            diff[i][j] = m1[i][j] - m2[i][j];\n            cout << diff[i][j] << \" \";\n        }\n        cout << endl;\n    }\n    return 0;\n}\n\nExplanation: The program reads the dimensions and elements of two matrices into 2D arrays m1 and m2 using nested for loops (outer loop for rows, inner loop for columns). It then computes the element-wise difference (m1[i][j] - m2[i][j]) for every corresponding position and stores/prints the result in the diff matrix, again using nested loops matching the same row/column structure.",
              "hint": "Read row/col dimensions, fill two 2D arrays via nested loops, then subtract element-wise (diff[i][j]=m1[i][j]-m2[i][j]) using matching nested loops."
            },
            {
              "id": "q18",
              "html": "Write a C++ program to add two distances using the structure definition: struct Distance{ int feet; float inch; } d1, d2, sum;",
              "answer": "#include <iostream>\nusing namespace std;\nstruct Distance\n{\n    int feet;\n    float inch;\n} d1, d2, sum;\n\nint main()\n{\n    cout << \"Enter feet and inches for first distance: \";\n    cin >> d1.feet >> d1.inch;\n    cout << \"Enter feet and inches for second distance: \";\n    cin >> d2.feet >> d2.inch;\n\n    sum.feet = d1.feet + d2.feet;\n    sum.inch = d1.inch + d2.inch;\n\n    // Carry over if inches reach or exceed 12\n    if (sum.inch >= 12.0)\n    {\n        sum.inch -= 12.0;\n        sum.feet += 1;\n    }\n\n    cout << \"\\nSum of distances = \" << sum.feet << \" feet \" << sum.inch << \" inches\";\n    return 0;\n}\n\nExplanation: The program declares Distance structure objects d1, d2, and sum globally (as given). It reads feet and inches for both distances using the dot operator to access each structure's members, then separately sums the feet components and the inch components. Since 12 inches equal 1 foot, the program checks if the summed inches reach or exceed 12, and if so, carries over 1 to the feet total while subtracting 12 from the inches — producing a correctly normalised final distance.",
              "hint": "Sum feet and inch members separately using the dot operator, then handle the inch-to-feet carry (if inch>=12, subtract 12 and add 1 to feet)."
            },
            {
              "id": "q19",
              "html": "Write the output of the following C++ program: struct books { char name[20], author[20]; } a[2]; ... (program fills a[0] and a[1] with book details via strcpy and prints a formatted table).",
              "answer": "Given the program logic (strcpy(a[0].name,\"Programming \"), strcpy(a[0].author,\"Dromy\"), strcpy(a[1].name,\"C++programming\"), strcpy(a[1].author,\"BjarneStroustrup \")), the output will be:\n\nDetails of Book No 1\n------------------------\nBook Name :Programming \nBook Author :Dromy\n\nDetails of Book No 2\n------------------------\nBook Name :C++programming\nBook Author :BjarneStroustrup \n\n\n================================================\n S.No\t| Book Name\t|author\n====================================================\n 1\t|Programming \t| Dromy\n 2\t|C++programming\t| BjarneStroustrup \n=================================================\n\nExplanation: Each strcpy() call both copies the given string INTO the structure array element's member AND returns that same copied string as its result — so cout can print the just-copied value directly as part of the same statement. The final for loop then iterates through both array elements (a[0] and a[1]) and prints their name and author fields in a simple tabular format using tab characters (\\t) for alignment.",
              "hint": "strcpy() both copies the string and returns it, so each cout prints the just-assigned name/author immediately; the closing loop then re-prints both records in a tab-separated table."
            },
            {
              "id": "q20",
              "html": "Write the output of the following C++ program: struct student { int roll_no; char name[10]; long phone_number; }; int main(){ student p1 = {1,\"Brown\",123443}, p2; p2.roll_no=2; strcpy(p2.name,\"Sam\"); p2.phone_number=1234567822; ... prints both students' details. }",
              "answer": "The output will be:\n\nFirst Student\nroll no : 1\nname : Brown\nphone no : 123443\nSecond Student\nroll no : 2\nname : Sam\nphone no : 1234567822\n\nExplanation: p1 is initialized directly at declaration using brace-initialization {1,\"Brown\",123443}, assigning roll_no=1, name=\"Brown\", and phone_number=123443 in one step, matching the member declaration order in the struct. p2, in contrast, is declared without initial values and then has each of its members assigned individually afterward: p2.roll_no=2 via direct assignment, p2.name set using strcpy() (since character arrays cannot be assigned directly with '=' after declaration), and p2.phone_number=1234567822 via direct assignment. The program then prints both students' roll number, name, and phone number in sequence, exactly as assigned.",
              "hint": "p1 is brace-initialized in one step (1, Brown, 123443); p2's members are set individually afterward (direct assignment for numbers, strcpy for the char array name) — print both in order."
            }
          ]
        }
      ]
    }
  ]
}
