export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 15 -- Data Manipulation through SQL",
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
          "label": "Data Manipulation through SQL",
          "questions": [
            { "id": "q1", "html": "Which of the following is an organized collection of data?", "options": ["a) Database", "b) DBMS", "c) Information", "d) Records"], "answer": 0, "hint": "A database is defined as an organized collection of data." },
            { "id": "q2", "html": "SQLite falls under which database system?", "options": ["a) Flat file database system", "b) Relational Database system", "c) Hierarchical database system", "d) Object oriented Database system"], "answer": 1, "hint": "SQLite is a simple relational database system." },
            { "id": "q3", "html": "Which of the following is a control structure used to traverse and fetch the records of the database?", "options": ["a) Pointer", "b) Key", "c) Cursor", "d) Insertion point"], "answer": 2, "hint": "A Cursor traverses and fetches records; all SQL commands go through the cursor object." },
            { "id": "q4", "html": "Any changes made in the values of the record should be saved by the command", "options": ["a) Save", "b) Save As", "c) Commit", "d) Oblige"], "answer": 2, "hint": "commit() permanently saves changes made by DML operations." },
            { "id": "q5", "html": "Which of the following executes the SQL command to perform some action?", "options": ["a) execute()", "b) key()", "c) cursor()", "d) run()"], "answer": 0, "hint": "execute() runs a given SQL command via the cursor." },
            { "id": "q6", "html": "Which of the following function retrieves the average of a selected column of rows in a table?", "options": ["a) Add()", "b) SUM()", "c) AVG()", "d) AVERAGE()"], "answer": 2, "hint": "AVG() computes the average of a column's values." },
            { "id": "q7", "html": "The function that returns the largest value of the selected column is", "options": ["a) MAX()", "b) LARGE()", "c) HIGH()", "d) MAXIMUM()"], "answer": 0, "hint": "MAX() returns the largest value in a column." },
            { "id": "q8", "html": "Which of the following is called the master table?", "options": ["a) sqlite_master", "b) sql_master", "c) main_master", "d) master_main"], "answer": 0, "hint": "sqlite_master holds key information about all tables in an SQLite database." },
            { "id": "q9", "html": "The most commonly used statement in SQL is", "options": ["a) cursor", "b) select", "c) execute", "d) commit"], "answer": 1, "hint": "SELECT is described as the most commonly used SQL statement." },
            { "id": "q10", "html": "Which of the following keyword avoids duplicate values?", "options": ["a) Distinct", "b) Remove", "c) Where", "d) GroupBy"], "answer": 0, "hint": "DISTINCT eliminates duplicate values from query results." }
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
        { "q": "Mention the users who use the Database.", "ans": "Users of a database don't have to be human -- they can be human users, as well as other programs and applications that interact with the database (for example, a Python program acting as a user of an SQL database)." },
        { "q": "Which method is used to connect a database? Give an example.", "ans": "The connect() method of the sqlite3 module is used to connect to a database. Example: connection = sqlite3.connect(\"Academy.db\") -- this either opens the existing 'Academy.db' database, or creates a new one if it doesn't already exist." },
        { "q": "What is the advantage of declaring a column as 'INTEGER PRIMARY KEY'?", "ans": "The advantage is auto-increment behaviour: whenever a NULL value is inserted for that column, SQLite automatically converts it into an integer one larger than the highest value used so far in that column (or 1, if the table is empty) -- eliminating the need to manually track and assign unique ID values." },
        { "q": "Write the command to populate a record in a table. Give an example.", "ans": "The INSERT command populates (adds) a record to a table. Example: sql_command = \"\"\"INSERT INTO Student (Rollno, Sname, Grade) VALUES (NULL, \"Akshay\", \"B\");\"\"\"; cursor.execute(sql_command); connection.commit()" },
        { "q": "Which method is used to fetch all rows from the database table?", "ans": "The fetchall() method is used to fetch ALL rows from a database table's query result at once, returning them as a list of tuples." }
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
        { "q": "What is SQLite? What is its advantage?", "ans": "SQLite is a simple relational database system that saves its data in regular data files within the computer's internal memory, rather than requiring a separate database server program like MySQL or Oracle. It is designed to be embedded directly into applications. Its advantages include being fast, rigorously tested, flexible, and easy to work with -- Python even has a native library (sqlite3) for using it directly, without needing to install or configure any separate database server software." },
        { "q": "Mention the difference between fetchone() and fetchmany().", "ans": "fetchone() returns only the NEXT single row of a query result set (or None if no rows are left) -- each call retrieves one more row in sequence. fetchmany(n) returns the next n rows of the result set at once, as a list -- letting you retrieve a specified batch of rows in a single call, rather than one at a time." },
        { "q": "What is the use of Where Clause? Give a python statement using the where clause.", "ans": "The WHERE clause is used to extract only those records from a table that satisfy a specified condition, filtering out rows that don't match. Example Python statement:\ncursor.execute(\"SELECT * FROM student WHERE gender='M'\")\nThis retrieves only the records of students where the gender column equals 'M'." }
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
          "q": "Write in brief about SQLite and the steps used to use it.",
          "ans": "SQLite is a simple, lightweight relational database system that stores its data in regular files within the computer's memory, designed to be embedded directly in applications rather than requiring a separate server. Python provides native support for SQLite via the sqlite3 module.\n\nSteps to use SQLite in Python:\n\nStep 1: Import the module -- import sqlite3\n\nStep 2: Create a connection to the database, passing the database filename -- connection = sqlite3.connect(\"Academy.db\") (opens the file if it exists, or creates a new one if it doesn't)\n\nStep 3: Create a cursor object from the connection -- cursor = connection.cursor() (the cursor is used to execute ALL SQL commands and traverse/fetch results)\n\nAfter this setup, SQL commands (CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, etc.) are executed using cursor.execute(sql_command). Any changes made via DML commands must be saved with connection.commit() before the connection is closed with connection.close(), or they will not be permanently saved to the database file."
        },
        {
          "q": "Write the Python script to display all the records of a table (Icode, ItemName, Rate) using fetchmany().",
          "ans": "import sqlite3\nconnection = sqlite3.connect(\"Inventory.db\")\ncursor = connection.cursor()\ncursor.execute(\"SELECT * FROM Item\")\nprint(\"Displaying all records:\")\nresult = cursor.fetchmany(5)\nprint(*result, sep=\"\\n\")\nconnection.close()\n\nExplanation: This assumes a table 'Item' with columns Icode, ItemName, Rate already exists and is populated with 5 records. fetchmany(5) retrieves exactly 5 rows from the result set (matching the number of records in the table), and print(*result, sep=\"\\n\") unpacks the list and prints each row on its own line."
        },
        {
          "q": "What is the use of HAVING clause? Give an example python script.",
          "ans": "The HAVING clause is used to filter data based on the results of GROUP functions (aggregate functions like COUNT, SUM, AVG) -- it is similar to the WHERE clause, but can ONLY be used with grouped/aggregate results, since group functions themselves cannot be used directly inside a WHERE clause.\n\nExample Python script:\nimport sqlite3\nconnection = sqlite3.connect(\"Academy.db\")\ncursor = connection.cursor()\ncursor.execute(\"SELECT GENDER, COUNT(GENDER) FROM Student GROUP BY GENDER HAVING COUNT(GENDER)>3\")\nresult = cursor.fetchall()\nprint(result)\n\nThis groups students by gender, counts how many belong to each gender group, and then HAVING filters to show ONLY those gender groups where the count exceeds 3 -- something WHERE could not do directly, since COUNT() is an aggregate/group function."
        },
        {
          "q": "Write a Python script to create a table called ITEM (database ABC) with Icode (integer, primary key), ItemName (char 25), Rate (integer). Add one record: 1008, Monitor, 15000.",
          "ans": "import sqlite3\nconnection = sqlite3.connect(\"ABC.db\")\ncursor = connection.cursor()\n\nsql_command = \"\"\"\nCREATE TABLE Item (\nIcode INTEGER PRIMARY KEY,\nItemName CHAR(25),\nRate INTEGER);\"\"\"\ncursor.execute(sql_command)\n\nsql_command = \"\"\"INSERT INTO Item (Icode, ItemName, Rate)\nVALUES (1008, \"Monitor\", 15000);\"\"\"\ncursor.execute(sql_command)\n\nconnection.commit()\nconnection.close()\nprint(\"ITEM TABLE CREATED AND RECORD ADDED\")\n\nExplanation: The script connects to (or creates) the 'ABC' database, defines the Item table with the three specified fields (Icode as the primary key), executes the CREATE TABLE command, then inserts the single specified record using an INSERT statement. connection.commit() saves these changes permanently before the connection is closed."
        }
      ]
    }
  ]
}
