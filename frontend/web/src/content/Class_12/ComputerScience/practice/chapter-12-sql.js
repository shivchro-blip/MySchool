export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 12 -- Structured Query Language (SQL)",
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
          "label": "Structured Query Language (SQL)",
          "questions": [
            { "id": "q1", "html": "Which commands provide definitions for creating table structure, deleting relations, and modifying relation schemas?", "options": ["a) DDL", "b) DML", "c) DCL", "d) DQL"], "answer": 0, "hint": "DDL (Data Definition Language) defines/modifies the database structure itself." },
            { "id": "q2", "html": "Which command lets to change the structure of the table?", "options": ["a) SELECT", "b) ORDER BY", "c) MODIFY", "d) ALTER"], "answer": 3, "hint": "ALTER TABLE is used to change a table's structure (add/rename/modify/drop columns)." },
            { "id": "q3", "html": "The command to delete a table including the structure is", "options": ["a) DROP", "b) DELETE", "c) DELETE ALL", "d) ALTER TABLE"], "answer": 0, "hint": "DROP TABLE removes both the data and the table structure entirely." },
            { "id": "q4", "html": "Queries can be generated using", "options": ["a) SELECT", "b) ORDER BY", "c) MODIFY", "d) ALTER"], "answer": 0, "hint": "SELECT is the DQL command used to query/retrieve data." },
            { "id": "q5", "html": "The clause used to sort data in a database", "options": ["a) SORT BY", "b) ORDER BY", "c) GROUP BY", "d) SELECT"], "answer": 1, "hint": "ORDER BY sorts query results in ascending or descending order." },
            { "id": "q6", "html": "Which constraint ensures a field uniquely identifies a record and never allows NULL?", "options": ["a) UNIQUE", "b) DEFAULT", "c) CHECK", "d) PRIMARY KEY"], "answer": 3, "hint": "PRIMARY KEY uniquely identifies each record and never permits NULL values." },
            { "id": "q7", "html": "Which command is used to permanently save a transaction to the database?", "options": ["a) SAVEPOINT", "b) ROLLBACK", "c) COMMIT", "d) GRANT"], "answer": 2, "hint": "COMMIT permanently saves changes made by DML statements." },
            { "id": "q8", "html": "Which keyword eliminates duplicate rows in the result of a SELECT query?", "options": ["a) ALL", "b) DISTINCT", "c) UNIQUE", "d) ONLY"], "answer": 1, "hint": "DISTINCT removes duplicate rows from the query result." },
            { "id": "q9", "html": "Which clause is used with GROUP BY to filter the resulting groups?", "options": ["a) WHERE", "b) ORDER BY", "c) HAVING", "d) BETWEEN"], "answer": 2, "hint": "HAVING places conditions on grouped results, unlike WHERE which filters individual rows." },
            { "id": "q10", "html": "Which command withdraws the access permission given by the GRANT statement?", "options": ["a) REVOKE", "b) DENY", "c) DROP", "d) DELETE"], "answer": 0, "hint": "REVOKE withdraws permissions previously given by GRANT." }
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
        { "q": "Write a query that selects all students whose age is less than 18 in order wise.", "ans": "SELECT * FROM Student WHERE Age < 18 ORDER BY Name;\n\nThis selects all fields for students younger than 18, sorted alphabetically by Name (ORDER BY sorts in ascending order by default)." },
        { "q": "Differentiate Unique and Primary Key constraint.", "ans": "The UNIQUE constraint ensures no two rows have the same value in a field, but the field CAN still allow one NULL value, and a table can have MULTIPLE unique fields. The PRIMARY KEY constraint also ensures uniqueness, but it NEVER allows NULL values, and only ONE field per table can be declared as the primary key." },
        { "q": "Write the difference between table constraint and column constraint?", "ans": "A column constraint applies only to an INDIVIDUAL column, restricting the values that single field can hold. A table constraint applies to a GROUP of one or more columns together, and is usually specified at the end of the table definition (e.g., a composite PRIMARY KEY across two columns)." },
        { "q": "Which component of SQL lets insert values in tables and which lets to create a table?", "ans": "DML (Data Manipulation Language) lets you insert values into tables, using the INSERT command. DDL (Data Definition Language) lets you create a table, using the CREATE TABLE command." },
        { "q": "What is the difference between SQL and MySQL?", "ans": "SQL (Structured Query Language) is the standard LANGUAGE used to access and manipulate relational databases. MySQL is a specific DATABASE MANAGEMENT SYSTEM (RDBMS software) -- like SQL Server or Oracle -- that implements and uses SQL as its query language." }
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
        { "q": "What is a constraint? Write a short note on Primary key constraint.", "ans": "A constraint is a condition applicable on a field or set of fields, used to limit the type of data that can be entered into a table, ensuring accuracy and reliability. The Primary Key constraint declares a field as the primary key of a table, which helps to uniquely identify each record -- similar to a Unique constraint, but only ONE field per table can be a primary key, and it never allows NULL values. Example: Admno integer PRIMARY KEY." },
        { "q": "Write any three DDL commands.", "ans": "Three DDL (Data Definition Language) commands are: CREATE (creates tables/database objects), ALTER (modifies an existing table's structure -- adding, renaming, or removing columns), and DROP (deletes an entire table, including its structure, from the database)." },
        { "q": "Write the use of Savepoint command with an example.", "ans": "The SAVEPOINT command is used to temporarily mark a point within a transaction, so you can later ROLLBACK to that exact point if needed, without undoing the entire transaction. Example:\nUPDATE Student SET Name='Mini' WHERE Admno=105;\nSAVEPOINT A;\nINSERT INTO Student VALUES (108,'Jisha','F',19,'Delhi');\nROLLBACK TO A;\nHere, the ROLLBACK TO A undoes the insertion of Jisha but keeps the earlier update of the Name to 'Mini', since that change was already saved at savepoint A." }
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
          "q": "Write the different types of constraints and their functions.",
          "ans": "SQL constraints ensure database integrity by limiting the data that can go into a table:\n\n1. UNIQUE Constraint: Ensures no two rows have the same value in the specified column(s). Can only be applied to fields also declared NOT NULL. Example: Admno integer NOT NULL UNIQUE;\n\n2. PRIMARY KEY Constraint: Declares a field as uniquely identifying each record -- similar to UNIQUE, but only one field per table can be the primary key, and it never allows NULL. Example: Admno integer PRIMARY KEY;\n\n3. DEFAULT Constraint: Assigns a default value to a field when no value is provided during insertion. Example: Age integer DEFAULT 17;\n\n4. CHECK Constraint: Restricts the values allowed in a field, using relational or logical operators. Example: Age integer CHECK (Age <= 19);\n\n5. TABLE Constraint: Applied to a GROUP of columns together (rather than one column alone), typically declared at the end of the table definition, e.g., a composite PRIMARY KEY spanning two fields: PRIMARY KEY (Firstname, Lastname).\n\nTogether, these constraints protect the accuracy, consistency, and reliability of data stored in the database."
        },
        {
          "q": "Consider an employee table with fields EMP_CODE, NAME, DESIG, PAY, ALLOWANCE. Write SQL commands to: (i) display employees in descending order of pay (ii) display employees with allowance between 5000 and 7000 (iii) remove employees who are Mechanic (iv) add a new row (v) display all employees who are Operators.",
          "ans": "(i) To display employees in descending order of pay:\nSELECT * FROM Employee ORDER BY PAY DESC;\n\n(ii) To display employees whose allowance is between 5000 and 7000:\nSELECT * FROM Employee WHERE ALLOWANCE BETWEEN 5000 AND 7000;\n\n(iii) To remove employees who are Mechanic:\nDELETE FROM Employee WHERE DESIG = 'Mechanic';\n\n(iv) To add a new row:\nINSERT INTO Employee (EMP_CODE, NAME, DESIG, PAY, ALLOWANCE) VALUES ('T1006', 'Kumar', 'Technician', 15000, 6000);\n\n(v) To display all employees who are Operators:\nSELECT * FROM Employee WHERE DESIG = 'Operator';"
        },
        {
          "q": "What are the components of SQL? Write the commands in each.",
          "ans": "SQL has five components:\n\n1. DDL (Data Definition Language): Defines/modifies the database structure. Commands: CREATE, ALTER, DROP, TRUNCATE.\n\n2. DML (Data Manipulation Language): Inserts, updates, and deletes data without changing the schema. Commands: INSERT, UPDATE, DELETE.\n\n3. DCL (Data Control Language): Controls access/permissions on the database. Commands: GRANT, REVOKE.\n\n4. TCL (Transaction Control Language): Manages transactions made by DML statements. Commands: COMMIT, ROLLBACK, SAVEPOINT.\n\n5. DQL (Data Query Language): Retrieves data from the database. Command: SELECT.\n\nTogether these five components cover every aspect of working with a relational database -- from defining its structure, to populating and modifying its data, controlling who can access it, managing changes safely, and finally querying the stored data."
        },
        {
          "q": "Construct SQL statements for the student table using: (i) SELECT with GROUP BY clause (ii) SELECT with ORDER BY clause.",
          "ans": "(i) SELECT statement using GROUP BY clause -- to count the number of male and female students:\nSELECT Gender, count(*) FROM Student GROUP BY Gender;\n\nThis groups all rows sharing the same Gender value together, and count(*) returns how many rows fall into each group -- giving separate counts for 'M' and 'F' students.\n\n(ii) SELECT statement using ORDER BY clause -- to display students sorted alphabetically by name:\nSELECT * FROM Student ORDER BY Name;\n\nThis displays every field of every student record, sorted in ascending alphabetical order by the Name column (the default sort direction; DESC could be added for descending order instead). Note that ORDER BY does not permanently change the order of rows stored in the actual table -- it only affects how the result of THIS particular query is displayed."
        }
      ]
    }
  ]
}
