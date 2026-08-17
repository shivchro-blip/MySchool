export default {
  chapterNumber: 15,
  title: "Data Manipulation through SQL",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-sqlite-setup",
      title: "Introduction, SQLite & Creating Tables",
      content: `**15.1 Introduction**

A database is an organized collection of data. "Database" can refer to the data itself, or the database management system. A DBMS is application software mediating between users and databases — users need not be human; they can be other programs and applications too. This chapter covers how a Python program can interact as a user of an SQL database.

**15.2 SQLite**

**SQLite** is a simple relational database system that saves data in regular data files within the computer's internal memory. It's designed to be **embedded** in applications, rather than using a separate database server program (like MySQL or Oracle). SQLite is fast, rigorously tested, and flexible. Python has a native library for SQLite.

**Using SQLite — three steps:**
\`\`\`
Step 1: import sqlite3
Step 2: create a connection using connect() method, passing the database filename
Step 3: set the cursor object: cursor = connection.cursor()
\`\`\`
- **Connecting** (step 2): if the database already exists, the connection opens it; otherwise Python creates a new database file with that name.
- **Cursor** (step 3): a control structure used to traverse and fetch records — ALL commands are executed using the cursor object.

To create a table, write the SQL command as a string and execute it via the cursor. Changes to record values must be saved with **commit()** before closing the connection.

**15.3 Creating a Database Using SQLite**
\`\`\`
import sqlite3
connection = sqlite3.connect("Academy.db")
cursor = connection.cursor()
\`\`\`
This creates a database named "Academy" — similar to \`CREATE DATABASE Academy;\` in SQL server. If \`sqlite3.connect('Academy.db')\` is used again elsewhere, it simply opens the already-created database.

**15.3.1 Creating a Table**

SQL commands are defined using **triple-quoted strings** in Python, since table values might themselves contain single or double quotes.
\`\`\`
sql_command = """
CREATE TABLE Student (
Rollno INTEGER PRIMARY KEY,
Sname VARCHAR(20),
Grade CHAR(1),
gender CHAR(1),
Average DECIMAL(5,2),
birth_date DATE);"""
\`\`\`
**Note:** If a column is declared \`INTEGER PRIMARY KEY\`, whenever NULL is inserted for it, SQLite automatically converts it to an integer one larger than the highest value used so far in that column (or 1, if the table is empty) — i.e., auto-increment behaviour.

**15.3.2 Adding Records**

The **INSERT** command populates the table; **execute()** runs the SQL command.
\`\`\`
import sqlite3
connection = sqlite3.connect("Academy.db")
cursor = connection.cursor()
sql_command = """CREATE TABLE Student (...);"""
cursor.execute(sql_command)
sql_command = """INSERT INTO Student (Rollno, Sname, Grade, gender, Average, birth_date)
    VALUES (NULL, "Akshay", "B", "M", "87.8", "2001-12-12");"""
cursor.execute(sql_command)
connection.commit()   # never forget this, to save changes
connection.close()
\`\`\`
For inserting from an existing Python list, use \`format_str.format()\` to substitute placeholders:
\`\`\`
student_data = [("BASKAR", "C", "M", "75.2", "1998-05-17"), ...]
for p in student_data:
    format_str = """INSERT INTO Student (Rollno, Sname, Grade, gender, Average, birth_date)
    VALUES (NULL, "{name}", "{gr}", "{gender}", "{avg}", "{birthdate}");"""
    sql_command = format_str.format(name=p[0], gr=p[1], gender=p[2], avg=p[3], birthdate=p[4])
    cursor.execute(sql_command)
connection.commit()
\`\`\``,
      nav: { next: "select-fetch-methods", nextLabel: "Next: SELECT Query & Fetch Methods →" }
    },
    {
      id: "select-fetch-methods",
      title: "SELECT Queries & Fetch Methods",
      content: `**15.4 SQL Query Using Python**

**15.4.1 SELECT Query**

SELECT retrieves data from a table, returned as a list of tuples:
\`\`\`
cursor.execute("SELECT * FROM Student")
ans = cursor.fetchall()
for i in ans:
    print(i)
\`\`\`

**15.4.1.1 fetchall()** — fetches ALL rows from the table.
\`\`\`
cursor.execute("SELECT * FROM student")
result = cursor.fetchall()
for r in result:
    print(r)
\`\`\`

**15.4.1.2 fetchone()** — returns the NEXT row of a query result, or None if no rows remain.
\`\`\`
cursor.execute("SELECT * FROM student")
res = cursor.fetchone()
print(res)   # (1, 'Akshay', 'B', 'M', 87.8, '2001-12-12')
\`\`\`

**15.4.1.3 Displaying all records using fetchone() in a loop:**
\`\`\`
result = cursor.fetchone()
while result is not None:
    print(result)
    result = cursor.fetchone()
\`\`\`

**15.4.1.4 fetchmany(n)** — returns the next n rows of the result set.
\`\`\`
result = cursor.fetchmany(3)
print(result)
# or without a loop:
print(*result, sep="\\n")   # * unpacks a tuple/list for display
\`\`\`
**Note:** \`sep="\\n"\` prints elements on new lines; \`sep=","\` separates with commas.`,
      nav: { back: "intro-sqlite-setup", next: "clauses-operators", nextLabel: "Next: SQL Clauses & Operators via Python →" }
    },
    {
      id: "clauses-operators",
      title: "SQL Clauses, AND/OR/NOT & Date Queries",
      content: `**15.4.2 Clauses in SQL (via Python)**

Frequently used clauses: **DISTINCT**, **WHERE**, **GROUP BY**, **ORDER BY**, **HAVING** — almost all work seamlessly with SQLite through the cursor.

**15.4.2.1 DISTINCT** — avoids duplicate values in a column.
\`\`\`
cursor.execute("SELECT DISTINCT (Grade) FROM student")
result = cursor.fetchall()
\`\`\`

**15.4.2.2 WHERE** — extracts only records meeting a condition.
\`\`\`
cursor.execute("SELECT DISTINCT (Grade) FROM student where gender='M'")
\`\`\`

**15.4.2.3 GROUP BY** — groups records into summary rows, often with aggregate functions.
\`\`\`
cursor.execute("SELECT gender, count(gender) FROM student Group BY gender")
# Output: ('F', 2), ('M', 5)
\`\`\`

**15.4.2.4 ORDER BY** — sorts the result set (ascending by default).
\`\`\`
cursor.execute("SELECT Rollno, sname FROM student Order BY sname")
\`\`\`

**15.4.2.5 HAVING** — filters data based on GROUP results (similar to WHERE, but only usable with group functions — group functions cannot be used directly in WHERE).
\`\`\`
cursor.execute("SELECT GENDER, COUNT(GENDER) FROM Student GROUP BY GENDER HAVING COUNT(GENDER)>3")
co = [i[0] for i in cursor.description]   # column names
print(co)   # ['gender', 'COUNT(GENDER)']
\`\`\`

**15.5 The SQL AND, OR, NOT Operators**

The WHERE clause combines with AND, OR, NOT to filter on multiple conditions.
\`\`\`
# NOT: students who did NOT score A or B
cursor.execute("SELECT * FROM student where NOT Grade='A' and NOT Grade='B'")

# AND: average between 80 and 90 (inclusive)
cursor.execute("SELECT Rollno, Sname, Average FROM student WHERE (Average>=80 AND Average<=90)")

# OR: average NOT between 60 and 70
cursor.execute("SELECT Rollno, Sname FROM student WHERE (Average<60 OR Average>70)")
\`\`\`

**15.6 Querying a Date Column**
\`\`\`
cursor.execute("SELECT Rollno, Sname, grade FROM student WHERE(Birth_date>='2001-01-01' AND Birth_date<='2001-12-31')")
\`\`\`
This retrieves students born in the year 2001, comparing dates as strings in 'YYYY-MM-DD' format.`,
      nav: { back: "select-fetch-methods", next: "aggregate-update-delete", nextLabel: "Next: Aggregate Functions, UPDATE & DELETE →" }
    },
    {
      id: "aggregate-update-delete",
      title: "Aggregate Functions, UPDATE, DELETE & User Input",
      content: `**15.7 Aggregate Functions** — operate on a column's values, returning a SINGLE value: **COUNT()**, **SUM()**, **AVG()**, **MAX()**, **MIN()**.

**15.7.1 COUNT()** — returns the number of matching rows (0 if none match; NULLs not counted).
\`\`\`
cursor.execute("SELECT COUNT(*) FROM student")
\`\`\`

**15.7.2 AVG()** — average of a column (NULLs ignored).
\`\`\`
cursor.execute("SELECT AVG(AVERAGE) FROM student")
\`\`\`

**15.7.3 SUM()** — sum of a column (NULLs ignored).
\`\`\`
cursor.execute("SELECT SUM(AVERAGE) FROM student")
\`\`\`

**15.7.4 MAX() and MIN()** — largest/smallest value of a column.
\`\`\`
cursor.execute("SELECT sname, max(AVERAGE) FROM student")
cursor.execute("SELECT sname, min(AVERAGE) FROM student")
\`\`\`

**15.8 Updating a Record**
\`\`\`
conn = sqlite3.connect("Academy.db")
conn.execute("UPDATE Student SET sname ='Priyanka' where Rollno='6'")
conn.commit()
print("Total number of rows updated :", conn.total_changes)
\`\`\`

**15.9 Deletion Operation**
\`\`\`
conn.execute("DELETE from Student where Rollno='2'")
conn.commit()
print("Total number of rows deleted :", conn.total_changes)
\`\`\`

**15.10 Data Input by User**

Data can be accepted via input() at runtime and inserted into a table:
\`\`\`
con = sqlite3.connect("Academy.db")
cur = con.cursor()
cur.execute("create table person (name, age, id)")
who = [input() for i in range(5)]
age = [int(input()) for i in range(5)]
p_id = [int(input()) for i in range(5)]
n = len(who)
for i in range(n):
    cur.execute("insert into person values (?, ?, ?)", (who[i], age[i], p_id[i]))
\`\`\`
**Note:** \`execute(sql[, parameters])\` executes a single SQL statement, optionally parametrized using placeholders — either question marks **?** ("qmark style") or named placeholders **:name** ("named style").`,
      nav: { back: "clauses-operators", next: "joining-csv-export", nextLabel: "Next: Joining Tables & Exporting to CSV →" }
    },
    {
      id: "joining-csv-export",
      title: "Querying Multiple Tables & Integrating with CSV",
      content: `**15.11 Using Multiple Tables for Querying**

Python allows querying multiple tables by joining them.
\`\`\`
sql_command = """CREATE TABLE Appointment(rollno int primary key, Duty varchar(10), age int)"""
cursor.execute(sql_command)
# ... insert records into Appointment ...
cursor.execute("""SELECT student.rollno, student.sname, Appointment.Duty, Appointment.Age
    FROM student, Appointment WHERE student.rollno=Appointment.rollno""")
co = [i[0] for i in cursor.description]   # column headings
print(co)
result = cursor.fetchall()
for r in result:
    print(r)
\`\`\`
**Note:** \`cursor.description\` contains details of each column heading, stored as a tuple, with index 0 referring to the column name.

**15.12 Integrating Query With CSV File**

The result of an SQL query can be written into a CSV file for tabular display.
\`\`\`
import sqlite3, csv
d = open('c:/pyprg/sql.csv', 'w', newline='')
c = csv.writer(d)
connection = sqlite3.connect("Academy.db")
cursor = connection.cursor()
cursor.execute("SELECT * FROM student ORDER BY GENDER DESC, SNAME")
co = [i[0] for i in cursor.description]
c.writerow(co)                       # write column headings
data = cursor.fetchall()
for item in data:
    c.writerow(item)
d.close()
# Reading the CSV back
with open('c:/pyprg/sql.csv', "r") as fd:
    for line in fd:
        line = line.replace("\\n", "")
        print(line)
\`\`\`
**Note:** By default, each written CSV record ends with \\n (newline); replace() removes it when re-reading for cleaner display. File paths in Python can use forward slash '/' or backslash '\\\\' — e.g., 'c:/pyprg/sql.csv' or 'c:\\\\pyprg\\\\sql.csv'.

**15.3 (Table List) — Listing All Tables**
\`\`\`
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cursor.fetchall())
# [('Student',), ('Appointment',), ('Person',)]
\`\`\`
The master table holding key information about all database tables is called **sqlite_master**.`,
      nav: { back: "aggregate-update-delete", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- A database is an organized collection of data; its users can be human, other programs, or applications.
- SQLite is a simple relational database system that saves data in regular data files, designed to be embedded in applications.
- Cursor is a control structure used to traverse and fetch records — all SQL commands are executed using the cursor object.
- SQL commands in Python are typically written as triple-quoted strings, since table data might contain single or double quotes.
- SELECT is the most commonly used SQL statement, used to retrieve data from a table.
- GROUP BY groups records into summary rows; ORDER BY sorts the result set; HAVING filters based on group functions (unlike WHERE, which cannot use group functions).
- The WHERE clause can combine with AND, OR, and NOT operators to filter records on multiple conditions.
- Aggregate functions (COUNT, AVG, SUM, MAX, MIN) operate on column values and return a single summary value.
- sqlite_master is the master table holding key information about all tables in a database.
- File paths in Python can be represented using either '/' or '\\\\'.`,
      nav: { back: "joining-csv-export", practice: true }
    }
  ]
}
