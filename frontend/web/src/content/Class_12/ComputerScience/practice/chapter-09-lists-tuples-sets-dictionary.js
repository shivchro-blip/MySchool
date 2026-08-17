export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 9 -- Lists, Tuples, Sets and Dictionary",
    "time": "3.00 hrs",
    "totalMarks": 52,
    "instructions": "Samacheer Kalvi -- Answer all questions"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "Part I -- MCQ (10 x 1)",
      "title": "Part I -- Choose the Correct Answer",
      "type": "mcq",
      "scoreMax": 10,
      "marksPer": 1,
      "sections": [
        {
          "label": "Lists, Tuples, Sets and Dictionary",
          "questions": [
            { "id": "q1", "html": "Pick odd one in connection with collection data type", "options": ["a) List", "b) Tuple", "c) Dictionary", "d) Loop"], "answer": 3, "hint": "List, Tuple, and Dictionary are collection data types; Loop is a control structure." },
            { "id": "q2", "html": "Let list1=[2,4,6,8,10], then print(list1[-2]) will result in", "options": ["a) 10", "b) 8", "c) 4", "d) 6"], "answer": 1, "hint": "Negative index -2 refers to the second-last element, which is 8." },
            { "id": "q3", "html": "Which of the following function is used to count the number of elements in a list?", "options": ["a) count()", "b) find()", "c) len()", "d) index()"], "answer": 2, "hint": "len() returns the number of elements in a list." },
            { "id": "q4", "html": "If List=[10,20,30,40,50] then List[2]=35 will result", "options": ["a) [35,10,20,30,40,50]", "b) [10,20,30,40,50,35]", "c) [10,20,35,40,50]", "d) [10,35,30,40,50]"], "answer": 2, "hint": "Index 2 (the third element, 30) is replaced with 35." },
            { "id": "q5", "html": "If List=[17,23,41,10] then List.append(32) will result", "options": ["a) [32,17,23,41,10]", "b) [17,23,41,10,32]", "c) [10,17,23,32,41]", "d) [41,32,23,17,10]"], "answer": 1, "hint": "append() adds the new element at the END of the list." },
            { "id": "q6", "html": "Which of the following Python function can be used to add more than one element within an existing list?", "options": ["a) append()", "b) append_more()", "c) extend()", "d) more()"], "answer": 2, "hint": "extend() adds multiple elements (given as a list) at once." },
            { "id": "q7", "html": "What will be the result of the following Python code? S=[x**2 for x in range(5)]; print(S)", "options": ["a) [0,1,2,4,5]", "b) [0,1,4,9,16]", "c) [0,1,4,9,16,25]", "d) [1,4,9,16,25]"], "answer": 1, "hint": "range(5) gives 0,1,2,3,4; squaring each gives 0,1,4,9,16." },
            { "id": "q8", "html": "What is the use of type() function in python?", "options": ["a) To create a Tuple", "b) To know the type of an element in tuple", "c) To know the data type of python object", "d) To create a list"], "answer": 2, "hint": "type() returns the data type of any given Python object." },
            { "id": "q9", "html": "Which of the following statement is not correct?", "options": ["a) A list is mutable", "b) A tuple is immutable", "c) The append() function is used to add an element", "d) The extend() function is used in tuple to add elements in a list"], "answer": 3, "hint": "extend() is a LIST method, not applicable to tuples (which are immutable) -- this statement is false." },
            { "id": "q10", "html": "Let setA = {3,6,9}, setB = {1,3,9}. What will be the result of print(setA|setB)?", "options": ["a) {3,6,9,1,3,9}", "b) {3,9}", "c) {1}", "d) {1,3,6,9}"], "answer": 3, "hint": "The | operator gives the union -- all unique elements from both sets: {1,3,6,9}." }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "Part II -- Short Answers (5 x 2)",
      "title": "Part II -- Short Answer Questions",
      "type": "short-essay",
      "scoreMax": 10,
      "marksPer": 2,
      "instruction": "Answer in 2-3 sentences.",
      "questions": [
        { "q": "What is List in Python?", "ans": "A list in Python is a 'sequence data type' -- an ordered collection of values enclosed within square brackets []. Each value is called an element, which can be of any type, and elements are mutable (can be changed, added, or removed)." },
        { "q": "How will you access the list elements in reverse order?", "ans": "List elements can be accessed in reverse order using negative index values -- Python assigns -1 to the last element, -2 to the second-last, and so on. A loop starting at index -1 and decreasing (i = i + -1) while testing i >= -(length of list) can print all elements in reverse." },
        { "q": "What will be the value of x in the following code? List1=[2,4,6,[1,3,5]]; x=len(List1)", "ans": "The value of x will be 4. Even though the nested list [1,3,5] contains three elements, len() counts it as ONE single element of List1 (alongside 2, 4, and 6) -- it does not count the inner list's own elements separately." },
        { "q": "Differentiate del with remove() function of List.", "ans": "del is a statement that deletes an element (or range of elements, or the entire list) using its INDEX position -- you must know where the element is. remove() is a function that deletes an element by its VALUE -- you don't need to know its index, only what value to remove." },
        { "q": "What is set in Python?", "ans": "A Set in Python is a mutable, unordered collection of elements without duplicates -- created by placing elements separated by commas within curly brackets {}, or using the set() function. It is commonly used for membership testing and eliminating duplicate values." }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Brief Answers (4 x 3)",
      "title": "Part III -- Brief Answer Questions",
      "type": "short-essay",
      "scoreMax": 12,
      "marksPer": 3,
      "instruction": "Answer in 4-6 sentences.",
      "questions": [
        { "q": "What are the differences between list and Tuples?", "ans": "List elements are mutable (can be changed after creation); Tuple elements are immutable (cannot be changed once assigned) -- this is the key difference. Lists are enclosed within square brackets []; Tuples are enclosed within parentheses (). Additionally, iterating through a tuple is generally faster than iterating through a list of the same size." },
        { "q": "Write a short note about sort().", "ans": "sort() arranges the elements of a list in order, directly modifying (affecting) the original list. It takes two optional arguments: reverse (if set to True, sorts in descending order; the default, False, gives ascending order) and key (the name of a user-defined function specifying custom sorting criteria). Example: MyList.sort() sorts ascending; MyList.sort(reverse=True) sorts descending." },
        { "q": "What will be the output of the following code? list = [2**x for x in range(5)]; print(list)", "ans": "The output will be [1, 2, 4, 8, 16]. This is a list comprehension where x takes values 0,1,2,3,4 (from range(5)), and each is used as the exponent of 2: 2**0=1, 2**1=2, 2**2=4, 2**3=8, 2**4=16." },
        { "q": "Explain the difference between del and clear() in dictionary with an example.", "ans": "del dictionary_name[key] removes a SPECIFIC key-value pair from the dictionary, or del dictionary_name removes the ENTIRE dictionary (making the variable name undefined afterward). dictionary_name.clear() removes ALL key-value pairs, but the dictionary variable itself still exists afterward, now as an empty dictionary {}. Example: if Dict={'a':1,'b':2}, del Dict['a'] leaves {'b':2}, whereas Dict.clear() leaves {} (still usable), and del Dict removes Dict entirely (using it afterward raises a NameError)." }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Explain in Detail (4 x 5)",
      "title": "Part IV -- Long Answer Questions",
      "type": "long-essay",
      "scoreMax": 20,
      "marksPer": 5,
      "instruction": "Answer in detail.",
      "questions": [
        {
          "q": "What are the different ways to insert an element in a list? Explain with suitable example.",
          "ans": "Python provides three ways to add elements to an existing list:\n\n1. append(element): Adds a SINGLE element at the END of the list. Example: MyList=[34,45,48]; MyList.append(90) gives [34,45,48,90].\n\n2. extend([elements]): Adds MULTIPLE elements (given as a list) at the end. Example: MyList.extend([71,32,29]) appends all three values in order.\n\n3. insert(position_index, element): Inserts an element at a SPECIFIC position within the list -- existing elements from that position onward shift one place to the right. Example: MyList=[34,98,47,'Kannan']; MyList.insert(3,'Ramakrishnan') places 'Ramakrishnan' at index 3, pushing 'Kannan' and later items one position to the right.\n\nThese three methods give flexibility -- append() and extend() for adding at the end, and insert() for adding at any chosen position."
        },
        {
          "q": "What is the purpose of range()? Explain with an example.",
          "ans": "The range() function generates a series of numeric values, commonly used to control loop iterations or to build lists of sequential numbers. Its syntax is range(start_value, end_value, step_value) -- start defaults to 0, end is exclusive (Python includes only up to end-1), and step (optional) controls the increment between values.\n\nExample -- generating first 10 even numbers:\nfor x in range(2, 11, 2):\n    print(x)\n# Output: 2 4 6 8 10\n\nrange() is also used together with list() to directly build a list of values:\nEven_List = list(range(2,11,2))\nprint(Even_List)   # [2, 4, 6, 8, 10]\n\nThis avoids manually typing out every number in a sequence, making range() essential for writing loops that need to run a specific number of times or generate structured numeric sequences."
        },
        {
          "q": "What is nested tuple? Explain with an example.",
          "ans": "A nested tuple is a tuple defined inside another tuple -- each inner tuple is treated as a single element of the outer tuple. This is useful for representing structured, grouped data, such as records with multiple fields per entry.\n\nExample:\nToppers = ((\"Vinodini\", \"XII-F\", 98.7), (\"Soundarya\", \"XII-H\", 97.5), (\"Tharani\", \"XII-F\", 95.3), (\"Saisri\", \"XII-G\", 93.8))\nfor i in Toppers:\n    print(i)\n\nOutput:\n('Vinodini', 'XII-F', 98.7)\n('Soundarya', 'XII-H', 97.5)\n('Tharani', 'XII-F', 95.3)\n('Saisri', 'XII-G', 93.8)\n\nHere, the outer tuple Toppers contains four elements, and each of those elements is itself a 3-item tuple (name, class, percentage). A for loop is used to access each inner tuple one at a time, which is the typical way to process nested tuples."
        },
        {
          "q": "Explain the different set operations supported by python with suitable example.",
          "ans": "Python supports four mathematical set operations:\n\n1. Union (| or union()): Includes ALL elements from both sets, without duplication.\nset_A={2,4,6,8}; set_B={'A','B','C','D'}\nprint(set_A | set_B)   # all 8 elements combined\n\n2. Intersection (& or intersection()): Includes only elements common to BOTH sets.\nset_A={'A',2,4,'D'}; set_B={'A','B','C','D'}\nprint(set_A & set_B)   # {'A', 'D'}\n\n3. Difference (- or difference()): Includes elements present in the FIRST set but NOT in the second.\nprint(set_A - set_B)   # {2, 4} -- elements only in set_A\n\n4. Symmetric Difference (^ or symmetric_difference()): Includes elements present in EITHER set, but NOT common to both.\nprint(set_A ^ set_B)   # {2, 4, 'B', 'C'}\n\nThese operations mirror standard set theory from mathematics, and are useful for tasks like comparing collections, finding overlaps, or identifying unique items across datasets."
        }
      ]
    }
  ]
}
