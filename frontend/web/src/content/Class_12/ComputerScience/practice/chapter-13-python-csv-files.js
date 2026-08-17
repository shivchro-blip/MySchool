export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 13 -- Python and CSV Files",
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
          "label": "Python and CSV Files",
          "questions": [
            { "id": "q1", "html": "A CSV file is also known as a ....", "options": ["a) Flat File", "b) 3D File", "c) String File", "d) Random File"], "answer": 0, "hint": "A CSV file is also called a Flat File." },
            { "id": "q2", "html": "The expansion of CRLF is", "options": ["a) Control Return and Line Feed", "b) Carriage Return and Form Feed", "c) Control Router and Line Feed", "d) Carriage Return and Line Feed"], "answer": 3, "hint": "CRLF stands for Carriage Return and Line Feed." },
            { "id": "q3", "html": "Which of the following module is provided by Python to do several operations on the CSV files?", "options": ["a) py", "b) xls", "c) csv", "d) os"], "answer": 2, "hint": "The csv module provides functions for reading/writing CSV files." },
            { "id": "q4", "html": "Which of the following mode is used when dealing with non-text files like image or exe files?", "options": ["a) Text mode", "b) Binary mode", "c) xls mode", "d) csv mode"], "answer": 1, "hint": "Binary mode ('b') handles non-text files like images correctly." },
            { "id": "q5", "html": "The command used to skip a row in a CSV file is", "options": ["a) next()", "b) skip()", "c) omit()", "d) bounce()"], "answer": 0, "hint": "next(reader) advances past a row, commonly used to skip the header." },
            { "id": "q6", "html": "Which of the following is a string used to terminate lines produced by writer() method of csv module?", "options": ["a) Line Terminator", "b) Enter key", "c) Form feed", "d) Data Terminator"], "answer": 0, "hint": "The lineterminator parameter defines the string used to terminate lines." },
            { "id": "q7", "html": "What is the output of: d=csv.reader(open('city.csv')); next(d); for row in d: print(row) -- if city.csv contains 'chennai,mylapore' then 'mumbai,andheri'?", "options": ["a) chennai,mylapore", "b) mumbai,andheri", "c) chennai\\nmumbai", "d) chennai,mylapore\\nmumbai,andheri"], "answer": 1, "hint": "next(d) skips the first row (chennai,mylapore), so only the second row (mumbai,andheri) is printed." },
            { "id": "q8", "html": "Which of the following creates an object which maps data to a dictionary?", "options": ["a) listreader()", "b) reader()", "c) tuplereader()", "d) DictReader()"], "answer": 3, "hint": "DictReader() maps CSV rows into dictionaries using the header row as keys." },
            { "id": "q9", "html": "Making some changes in the data of the existing file or adding more data is called", "options": ["a) Editing", "b) Appending", "c) Modification", "d) Alteration"], "answer": 2, "hint": "Changing existing data or adding new data to a file is called modification." },
            { "id": "q10", "html": "What will be written inside test.csv using: D=[['Exam'],['Quarterly'],['Halfyearly']]; csv.register_dialect('M',lineterminator='\\n'); writer writes D with dialect M?", "options": ["a) Exam Quarterly Halfyearly (one line)", "b) Exam Quarterly Halfyearly (one line, spaced)", "c) E / Q / H (single letters)", "d) Exam, / Quarterly, / Halfyearly, (each on its own line)"], "answer": 3, "hint": "Each inner list is one row; writerows writes each on its own line (with a trailing comma from the single-element row), using \\n as the line terminator." }
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
        { "q": "What is CSV File?", "ans": "A CSV (Comma Separated Values) file is a human-readable plain text file where each line has a number of fields separated by commas or another delimiter. Each line can be thought of as a row, and each field as a column -- it is also known as a Flat File." },
        { "q": "Mention the two ways to read a CSV file using Python.", "ans": "The two ways to read a CSV file in Python are: (1) using the csv module's reader() function, which returns each row as a list; and (2) using the DictReader class, which maps each row's data into a dictionary, using the header row as the keys." },
        { "q": "Mention the default modes of the File.", "ans": "The default mode for opening a file is 'r' (read mode), and the default type mode is 't' (text mode) -- so simply calling open('filename') is equivalent to open('filename', 'rt')." },
        { "q": "What is use of next() function?", "ans": "The next() function is used to skip a row while reading a CSV file with the reader() or DictReader object -- most commonly used to skip the header row before processing or sorting the actual data rows." },
        { "q": "How will you sort more than one column from a csv file? Give an example statement.", "ans": "Sorting by more than one column is done using operator.itemgetter() with multiple column index arguments. Example: sortedlist = sorted(data, key=operator.itemgetter(1,2)) -- this sorts primarily by column index 1, then by column index 2 for any ties." }
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
        { "q": "Write a note on open() function of python. What is the difference between the two methods?", "ans": "The open() function is Python's built-in function used to open a file, returning a file object (handle) used to read or modify the file. It takes the filename/path and an optional mode ('r','w','a','x', combined with 't' or 'b'). There are two ways to close a file afterward: (1) explicitly calling f.close() after performing operations -- but this is unsafe, since an exception during file operations could skip the close() call, leaving the file open; (2) using the 'with' statement (with open(...) as f:), which automatically closes the file once the block exits, even if an exception occurs -- making it the safer, recommended method." },
        { "q": "Write a Python program to modify an existing file.", "ans": "import csv\nrow = ['3', 'Meena', 'Bangalore']\nwith open('student.csv', 'r', newline='') as readFile:\n    reader = csv.reader(readFile)\n    lines = list(reader)\n    lines[3] = row\nwith open('student.csv', 'w') as writeFile:\n    writer = csv.writer(writeFile)\n    writer.writerows(lines)\n\nThis reads all rows into a list, replaces the desired row (index 3) with new data, then writes the entire updated list back to the file, overwriting the original content." },
        { "q": "Write a Python program to read a CSV file with default delimiter comma (,).", "ans": "import csv\nwith open('c:\\\\pyprg\\\\sample1.csv', 'r', newline='') as F:\n    reader = csv.reader(F)\n    for row in reader:\n        print(row)\n\nThis opens the CSV file in read mode, creates a csv.reader object (which uses comma as the delimiter by default), and prints each row of the file as a Python list of its column values." }
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
          "q": "Differentiate Excel file and CSV file.",
          "ans": "Excel (XLS/XLSX): A binary file holding information about all worksheets in a file, including both content AND formatting (fonts, colours, formulas, charts). It can only be read/written by applications specifically written to understand its format (like MS Excel). Consumes more memory while importing data, and cannot be opened or edited by plain text editors.\n\nCSV: A plain text format containing a series of values separated by commas (or another delimiter). It can be opened with ANY text editor (Notepad, MS Excel, OpenOffice, etc.) since it's just readable text. Importing CSV data is faster and consumes less memory, but it CANNOT store charts, graphs, formatting, formulas, or macros -- only raw tabular data itself.\n\nIn short, CSV trades Excel's rich formatting and feature set for simplicity, universal compatibility, and lightweight, fast processing -- making it ideal for simple data exchange between different programs and systems."
        },
        {
          "q": "Tabulate the different file modes with their meaning.",
          "ans": "| Mode | Meaning |\n| 'r' | Open a file for reading (default) |\n| 'w' | Open a file for writing; creates a new file if it doesn't exist, or truncates (overwrites) it if it does |\n| 'x' | Open for exclusive creation; the operation FAILS if the file already exists |\n| 'a' | Open for appending at the end of the file without truncating existing content; creates a new file if it doesn't exist |\n| 't' | Open in text mode (default) |\n| 'b' | Open in binary mode, used for non-text files like images or executables |\n| '+' | Open a file for updating -- both reading and writing |\n\nThese modes can be combined, e.g., 'rt' (read text, the default), 'wb' (write binary), or 'r+b' (read and write binary)."
        },
        {
          "q": "Write the different methods to read a File in Python.",
          "ans": "There are several ways to read the content of a file in Python:\n\n1. Using open() with explicit close(): f = open('file.txt'); data = f.read(); f.close() -- reads the entire content, but requires manually closing the file (unsafe if an exception occurs mid-operation).\n\n2. Using the 'with' statement: with open('file.txt') as f: data = f.read() -- automatically closes the file when the block ends, even if an error occurs; this is the recommended, safer approach.\n\n3. For CSV files specifically, using csv.reader(): reads each line as a list of column values, iterated with a for loop.\n\n4. For CSV files, using csv.DictReader(): reads each line into a dictionary, using the header row as keys, letting you access values by column name instead of position.\n\nEach method serves different needs -- simple text reading uses read()/with, while structured tabular (CSV) data is best handled with the specialized csv.reader() or csv.DictReader() classes."
        },
        {
          "q": "Write a Python program to write a CSV File with custom quotes.",
          "ans": "import csv\ncsvData = [['SNO','Items'], ['1','Pen'], ['2','Book'], ['3','Pencil']]\ncsv.register_dialect('myDialect', delimiter='|', quotechar='\"', quoting=csv.QUOTE_ALL)\nwith open('c:\\\\pyprg\\\\quote.csv', 'w', newline='') as csvFile:\n    writer = csv.writer(csvFile, dialect='myDialect')\n    writer.writerows(csvData)\nprint('writing completed')\n\nExplanation: A custom dialect named 'myDialect' is registered, specifying pipe (|) as the delimiter, double-quote (\") as the quote character, and QUOTE_ALL to ensure every field is wrapped in quotes. writer.writerows(csvData) then writes all rows of csvData into 'quote.csv' following this custom dialect, producing output where every value is quoted and separated by pipes, e.g.: \"SNO\"|\"Items\" then \"1\"|\"Pen\", and so on."
        }
      ]
    }
  ]
}
