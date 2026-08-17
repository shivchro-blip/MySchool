export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 8 -- Strings and String Manipulation",
    "time": "3.00 hrs",
    "totalMarks": 49,
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
          "label": "Strings and String Manipulation",
          "questions": [
            { "id": "q1", "html": "What is the output? str1=\"TamilNadu\"; print(str1[::-1])", "options": ["a) Tamilnadu", "b) Tmlau", "c) udanlimaT", "d) udaNlimaT"], "answer": 3, "hint": "A stride of -1 reverses the whole string exactly, preserving case: 'TamilNadu' reversed is 'udaNlimaT'." },
            { "id": "q2", "html": "What will be the output? str1 = \"Chennai Schools\"; str1[7] = \"-\"", "options": ["a) Chennai-Schools", "b) Chenna-School", "c) Type error", "d) Chennai"], "answer": 2, "hint": "Strings are immutable in Python -- item assignment raises a TypeError." },
            { "id": "q3", "html": "Which of the following operator is used for concatenation?", "options": ["a) +", "b) &", "c) *", "d) ="], "answer": 0, "hint": "The + operator joins (concatenates) two strings." },
            { "id": "q4", "html": "Defining strings within triple quotes allows creating:", "options": ["a) Single line Strings", "b) Multiline Strings", "c) Double line Strings", "d) Multiple Strings"], "answer": 1, "hint": "Triple quotes allow strings to span multiple lines." },
            { "id": "q5", "html": "Strings in python:", "options": ["a) Changeable", "b) Mutable", "c) Immutable", "d) flexible"], "answer": 2, "hint": "Once created, a Python string's characters cannot be changed -- it is immutable." },
            { "id": "q6", "html": "Which of the following is the slicing operator?", "options": ["a) { }", "b) [ ]", "c) < >", "d) ( )"], "answer": 1, "hint": "Square brackets [ ] are used for slicing (and indexing) strings." },
            { "id": "q7", "html": "What is stride?", "options": ["a) index value of slice operation", "b) first argument of slice operation", "c) second argument of slice operation", "d) third argument of slice operation"], "answer": 3, "hint": "Stride is the optional third argument in str[start:end:step], controlling the step size." },
            { "id": "q8", "html": "Which of the following formatting character is used to print exponential notation in upper case?", "options": ["a) %f", "b) %E", "c) %g", "d) %n"], "answer": 1, "hint": "%E prints exponential notation using an uppercase 'E'." },
            { "id": "q9", "html": "Which of the following is used as placeholders or replacement fields which get replaced along with format() function?", "options": ["a) { }", "b) < >", "c) ++", "d) ^^"], "answer": 0, "hint": "Curly braces {} act as placeholders for the format() function." },
            { "id": "q10", "html": "The subscript of a string may be:", "options": ["a) Positive", "b) Negative", "c) Both (a) and (b)", "d) Either (a) or (b)"], "answer": 2, "hint": "Python allows both positive (from 0) and negative (from -1) subscripts for strings." }
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
        { "q": "What is String?", "ans": "A String is a data type in Python used to handle an array of characters -- it is a sequence of Unicode characters (letters, numbers, or special symbols) enclosed within single, double, or triple quotes." },
        { "q": "Do you modify a string in Python?", "ans": "No, strings in Python are immutable -- once a string is defined, its individual characters cannot be modified or deleted. To 'change' it, you must assign an entirely new string value to the same variable, which overwrites the old one." },
        { "q": "How will you delete a string in Python?", "ans": "An entire string variable can be deleted using the 'del' command, e.g., del str1. After deletion, trying to access str1 again raises a NameError, since the variable no longer exists. Note that deleting a single character within a string (like del str1[2]) is NOT allowed, since strings don't support item deletion." },
        { "q": "What will be the output of: str1 = \"School\"; print(str1*3)", "ans": "The output will be 'SchoolSchoolSchool'. The * (repeating) operator, when used with a string and an integer, displays the string that many times, concatenated together with no separator." },
        { "q": "What is slicing?", "ans": "Slicing is the process of extracting a substring from a main string using the [ ] slicing operator along with index (subscript) values. The general format is str[start:end], which returns characters from index 'start' up to (but not including) index 'end'." }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Brief Answers (3 x 3)",
      "title": "Part III -- Brief Answer Questions",
      "type": "short-essay",
      "scoreMax": 9,
      "marksPer": 3,
      "instruction": "Answer in 4-6 sentences.",
      "questions": [
        { "q": "Write a short note about the following, with suitable example: (a) capitalize() (b) swapcase()", "ans": "(a) capitalize(): Returns a copy of the string with only its FIRST character converted to uppercase, and the rest unchanged (or lowercased if already mixed case). Example: 'chennai'.capitalize() returns 'Chennai'.\n\n(b) swapcase(): Returns a copy of the string with the case of EVERY character swapped -- uppercase letters become lowercase and vice versa. Example: 'tAmiL NaDu'.swapcase() returns 'TaMIl nAdU'." },
        { "q": "What will be the output of the following program? str1 = \"welcome\"; str2 = \"to school\"; str3 = str1[:2] + str2[len(str2)-2:]; print(str3)", "ans": "The output will be 'weol'. Explanation: str1[:2] takes the first 2 characters of 'welcome', which is 'we'. str2[len(str2)-2:] takes the last 2 characters of 'to school' (since len(str2)=9, this is str2[7:], giving 'ol'). Concatenating 'we' + 'ol' gives 'weol'." },
        { "q": "Write a note about count() function in python.", "ans": "The count(str, beg, end) function returns the number of times a given substring occurs within a specified range of the main string. The substring may even be a single character. The beg and end (range) arguments are optional -- if omitted, Python searches the whole string. The search is case-sensitive. Example: 'Raja Raja Chozhan'.count('Raja') returns 2, while .count('r') returns 0 (since the search is case-sensitive and only capital 'R' appears)." }
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
          "q": "Explain about string operators in python with suitable example.",
          "ans": "Python provides the following operators for string manipulation:\n\n1. Concatenation (+): Joins two or more strings together. Example: \"welcome\" + \"Python\" gives 'welcomePython'.\n\n2. Append (+=): Adds more text to the end of an existing string. Example: str1=\"Welcome to \"; str1+=\"Learn Python\" gives 'Welcome to Learn Python'.\n\n3. Repeating (*): Displays a string a given number of times. Example: str1=\"Welcome \"; print(str1*4) gives 'Welcome Welcome Welcome Welcome '.\n\n4. String Slicing ([ ]): Extracts a substring using str[start:end]. Example: str1=\"THIRUKKURAL\"; str1[0:5] gives 'THIRU'.\n\n5. Stride (third slicing argument): Skips characters while slicing, using str[start:end:step]. Example: str1[::3] takes every 3rd character across the whole string; a negative stride reverses the direction.\n\nTogether, these operators let programmers build, extend, repeat, and extract portions of strings efficiently for text processing tasks."
        },
        {
          "q": "Explain string slicing with stride, giving suitable examples.",
          "ans": "String slicing extracts a substring from a main string using the [ ] operator, with the general format str[start:end:step]. 'start' is the beginning index, 'end' is one past the last index to include (Python always stops at end-1), and 'step' (the stride) is an optional third value specifying how many characters to skip forward after each character retrieved -- the default stride is 1.\n\nExample:\nstr1 = \"Welcome to learn Python\"\nprint(str1[10:16])       # 'learn' (default stride 1)\nprint(str1[10:16:2])     # 'er' (every 2nd character in that range)\nprint(str1[::3])         # 'Wceoenyo' (every 3rd character across the whole string)\n\nA negative stride reverses the slicing direction, printing characters from right to left:\nprint(str1[::-2])        # 'nhy re teolW'\n\nThis flexibility makes slicing a powerful tool for extracting, skipping, or reversing portions of a string without needing explicit loops."
        },
        {
          "q": "Explain any five built-in string functions with examples.",
          "ans": "1. len(str): Returns the length of the string. Example: len(\"Corporation\") returns 11.\n\n2. find(sub): Returns the index of the first occurrence of a substring, or -1 if not found. Example: \"mammals\".find('ma') returns 0.\n\n3. upper() / lower(): upper() returns a copy in all uppercase; lower() returns a copy in all lowercase. Example: \"welcome\".upper() returns 'WELCOME'.\n\n4. isalpha(): Returns True if the string contains only letters (no digits or symbols). Example: 'python'.isalpha() returns True, but 'Click123'.isalpha() returns False.\n\n5. title(): Returns the string with the first letter of each word capitalized. Example: 'education department'.title() returns 'Education Department'.\n\nThese built-in functions save programmers from writing manual character-by-character logic for very common string operations, making code shorter and less error-prone."
        },
        {
          "q": "Write a program to check whether the given string is a palindrome or not, and explain its logic.",
          "ans": "str1 = input(\"Enter a string: \")\nstr2 = ''\nindex = -1\nfor i in str1:\n    str2 += str1[index]\n    index -= 1\nprint(\"The given string = {} \\n The Reversed string = {}\".format(str1, str2))\nif (str1 == str2):\n    print(\"Hence, the given string is Palindrome\")\nelse:\n    print(\"Hence, the given is not a palindrome\")\n\nExplanation: The program builds a reversed copy of the input string, str2, by iterating through str1 once for each character it contains (the for loop runs len(str1) times), but each time appending the character from str1 at the current negative index (starting at -1, the LAST character, then -2, the second-last, and so on) -- effectively reading the original string backward and building it into str2. After the loop, str2 holds the fully reversed version of str1. Finally, the program compares str1 with str2 using ==: if they are exactly equal, the original string reads the same forwards and backwards, so it is a palindrome (e.g., 'malayalam'); otherwise it is not (e.g., 'welcome' reversed is 'emoclew', which differs)."
        }
      ]
    }
  ]
}
