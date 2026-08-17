export default {
  chapterNumber: 12,
  title: "Structured Query Language (SQL)",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-sql-components",
      title: "Introduction to SQL & Its Components",
      content: `**12.1 Introduction to SQL**

The Structured Query Language (**SQL**) is a standard programming language to access and manipulate databases, designed for managing/accessing data in an RDBMS. The original version was developed at IBM's Research Centre, originally called **Sequel** in the early 1970s, later renamed SQL. In 1986, **ANSI** published an SQL standard, updated in 1992; the latest is **SQL 2008**.

**12.2 Role of SQL in RDBMS**

RDBMS packages include Oracle, MySQL, MS SQL Server, IBM DB2, and Microsoft Access. SQL is the language used to access data in such databases. A database is a collection of tables storing data queried for other applications. RDBMS supports Create, Read, Update, Delete operations, collectively known as **CRUD**. Data is stored in database objects called **Tables**, made of rows and columns. A **field** is a column maintaining specific info for every record; a **record** is a row — a collection of related fields representing one entry.

**12.3 Processing Skills of SQL**
1. **Data Definition Language (DDL)** — commands for defining, deleting, and modifying relation schemas (structure), creating indexes.
2. **Data Manipulation Language (DML)** — commands to insert, delete, and modify tuples.
3. **Embedded Data Manipulation Language** — SQL embedded in high-level programming languages.
4. **View Definition** — commands for defining views of tables.
5. **Authorization** — commands for access rights to relations/views.
6. **Integrity** — forms for integrity checking using conditions.
7. **Transaction control** — commands for transactions and their control.

**Note:** SQL is a language used for accessing databases; MySQL is a database management system (an RDBMS), like SQL Server, Oracle, Informix, Postgres.

**12.4 Creating Database**
\`\`\`
CREATE DATABASE database_name;
-- Example: CREATE DATABASE stud;

USE DATABASE;
-- Example: USE stud;
\`\`\`

**12.5 Components of SQL** — SQL commands are divided into five categories:
- **DDL** — Data Definition Language
- **DML** — Data Manipulation Language
- **DCL** — Data Control Language
- **TCL** — Transaction Control Language
- **DQL** — Data Query Language

**12.5.1 DDL** — consists of statements defining the database structure/schema, used to create and modify database objects. A DDL: identifies the type of data division (item, segment, record, file); gives unique names to data items/records/files/databases; specifies proper data type; defines the size of a data item; may define value ranges; may specify privacy locks. DDL commands: **Create** (create tables), **Alter** (alter structure), **Drop** (delete tables), **Truncate** (remove all records, releasing space).

**12.5.2 DML** — a query language for adding (inserting), removing (deleting), and modifying (updating) data, without changing the schema. Two types: **Procedural DML** (specify what data is needed AND how to get it) and **Non-Procedural DML** (specify only what is needed). Commands: **Insert**, **Update**, **Delete** (deletes records but not the space they occupied).

**12.5.3 DCL** — controls access of data stored in a database (Authorization) — needed for creating sequences, views, etc. Commands: **Grant** (gives permission to perform specific tasks) and **Revoke** (withdraws access given by Grant).

**12.5.4 TCL** — manages transactions, i.e., changes made by DML statements. Commands: **Commit** (permanently saves a transaction), **Rollback** (restores to last committed state), **Savepoint** (temporarily saves a transaction so you can rollback to it).

**12.5.5 DQL** — commands to query/retrieve data. Command: **Select** (displays records from a table).`,
      nav: { next: "datatypes-create-table", nextLabel: "Next: Data Types & CREATE TABLE →" }
    },
    {
      id: "datatypes-create-table",
      title: "Data Types & Creating Tables",
      content: `**12.6 Data Types**

Data is stored based on the kind of value held — its data type. All values in a given field must be the same type. ANSI SQL recognizes only Text and Number types formally; commercial programs add types like Date and Time.

| Data Type | Description |
|---|---|
| char (Character) | Fixed-width string, enclosed in single quotes |
| varchar | Variable-width character string |
| dec (Decimal) | Fractional number; size (precision, scale) — precision = total digits, scale = digits after the decimal point (scale ≤ precision) |
| numeric | Same as decimal, but max digits cannot exceed the precision argument |
| int (Integer) | A number without a decimal point; no size argument |
| smallint | Same as int, but default size may be smaller |
| float | Floating point number in base-10 exponential notation; precision up to 64 |
| real | Same as float, but no size argument; precision up to 64 |
| double | Same as real, but precision may exceed 64 |

**12.7 SQL Commands and Their Functions**

| Term | Meaning |
|---|---|
| Keywords | Have a special meaning in SQL; understood as instructions |
| Commands | Instructions given by the user to the database, also called statements |
| Clauses | Begin with a keyword; consist of keyword + argument |
| Arguments | Values given to make a clause complete |

**12.7.1 DDL Commands — CREATE TABLE**

Every table must have at least one column.
\`\`\`
CREATE TABLE <table-name>
(<column name> <data type> [<size>],
 <column name> <data type> [<size>] ...
);
\`\`\`
Example:
\`\`\`
CREATE TABLE Student
(Admno integer,
 Name char(20),
 Gender char(1),
 Age integer,
 Place char(10)
);
\`\`\`
**Constraints** limit what type of data can go into a field, ensuring accuracy and reliability — applied at either the **column level** (Column constraint — applies to one column) or **table level** (Table constraint — applies to a group of columns).

Syntax with constraint:
\`\`\`
CREATE TABLE <table-name>
(<column name> <data type> [<size>] <column constraint>,
 ...
 <table constraint> (<column name>, ...)
);
\`\`\`

**Example — NOT NULL constraint** (field must always have a value):
\`\`\`
CREATE TABLE Student
(Admno integer NOT NULL PRIMARY KEY,
 Name char(20) NOT NULL,
 Gender char(1),
 Age integer,
 Place char(10)
);
\`\`\`

**12.7.2 Types of Constraints** — Unique, Primary Key, Default, Check.

**Unique Constraint** — ensures no two rows have the same value in a column. Can only be applied to fields also declared NOT NULL.
\`\`\`
Admno integer NOT NULL UNIQUE
\`\`\`
(Applying both NOT NULL and UNIQUE together is called **multiple constraints**.)

**Primary Key Constraint** — declares a field as uniquely identifying each record; similar to Unique except only ONE field per table can be a primary key, and it never allows NULL.
\`\`\`
Admno integer PRIMARY KEY
\`\`\`

**Default Constraint** — assigns a default value when none is given.
\`\`\`
Age integer DEFAULT 17
\`\`\`

**Check Constraint** — restricts values allowed in a field, using relational/logical operators.
\`\`\`
Age integer CHECK (Age <= 19)
\`\`\`

**Table Constraint** — applied to a group of fields, usually given at the end of the table definition.
\`\`\`
CREATE TABLE Student1
(Admno integer NOT NULL,
 Firstname char(20),
 Lastname char(20),
 Gender char(1),
 Age integer,
 Place char(10),
 PRIMARY KEY (Firstname, Lastname)
);
\`\`\``,
      nav: { back: "intro-sql-components", next: "dml-alter-drop", nextLabel: "Next: DML Commands, ALTER, TRUNCATE & DROP →" }
    },
    {
      id: "dml-alter-drop",
      title: "DML Commands & Additional DDL Commands",
      content: `**12.7.3 DML Commands**

**INSERT** — adds new records to a table.
\`\`\`
INSERT INTO <table-name> [column-list] VALUES (values);

INSERT INTO Student (Admno, Name, Gender, Age, Place)
VALUES (100, 'Ashish', 'M', 17, 'Chennai');
\`\`\`
The order of values must match the column order in CREATE TABLE. Column names are optional if data is given for ALL columns:
\`\`\`
INSERT INTO Student VALUES (102, 'Akshith', 'M', 17, 'Bangalore');
\`\`\`
Data can also be added for only SOME columns — omitted fields get their DEFAULT value if defined, or NULL otherwise:
\`\`\`
INSERT INTO Student (Admno, Name, Place) VALUES (103, 'Ayush', 'Delhi');
\`\`\`

**DELETE** — permanently removes one or more records; removes entire rows, not individual fields.
\`\`\`
DELETE FROM table-name WHERE condition;

DELETE FROM Student WHERE Admno=104;   -- removes one record
DELETE FROM Student;                    -- removes ALL rows (table remains, now empty)
\`\`\`

**UPDATE** — updates data values; specifies rows via WHERE, new data via SET.
\`\`\`
UPDATE <table-name> SET column-name = value, ... WHERE condition;

UPDATE Student SET Age = 20 WHERE Place = 'Bangalore';
UPDATE Student SET Age=18, Place='Chennai' WHERE Admno=102;   -- multiple fields
\`\`\`

**12.7.4 Additional DDL Commands**

**ALTER** — modifies table structure: adding a column, renaming, changing data type/size, or deleting a column.
\`\`\`
ALTER TABLE <table-name> ADD <column-name> <data type> <size>;
ALTER TABLE Student ADD Address char;

ALTER TABLE <table-name> MODIFY <column-name> <data type> <size>;
ALTER TABLE Student MODIFY Address char(25);

ALTER TABLE <table-name> CHANGE old-column-name new-column-name new column definition;
ALTER TABLE Student CHANGE Address City char(20);

ALTER TABLE <table-name> DROP COLUMN <column-name>;
ALTER TABLE Student DROP COLUMN City;
\`\`\`

**TRUNCATE** — deletes ALL rows from a table; the STRUCTURE remains, but space is freed.
\`\`\`
TRUNCATE TABLE table-name;
\`\`\`

**DROP TABLE** — removes a table entirely from the database (all rows AND the structure) — irreversible.
\`\`\`
DROP TABLE table-name;
\`\`\`

**DELETE vs TRUNCATE vs DROP:**

| Command | Effect |
|---|---|
| DELETE | Deletes rows based on WHERE (or all rows if no condition) — does NOT free the table's space |
| TRUNCATE | Deletes all rows; structure remains; frees the space |
| DROP | Removes the entire object (table + rows + structure) from the database — irreversible |`,
      nav: { back: "datatypes-create-table", next: "select-queries", nextLabel: "Next: SELECT Queries →" }
    },
    {
      id: "select-queries",
      title: "SELECT — Queries, DISTINCT, WHERE, ORDER BY, GROUP BY, HAVING",
      content: `**12.7.5 DQL — SELECT Command**

A **Query** is a command to get a desired result from a database table. **SELECT** retrieves data from one or more tables.
\`\`\`
SELECT <column-list> FROM <table-name>;
SELECT Admno, Name FROM Student;
SELECT * FROM STUDENT;   -- all fields and rows
\`\`\`

**12.7.5.1 DISTINCT Keyword** — eliminates duplicate rows.
\`\`\`
SELECT DISTINCT Place FROM Student;
\`\`\`
When DISTINCT is used, only one NULL value is returned even if multiple NULLs occur.

**12.7.5.2 ALL Keyword** — retains duplicates, displaying every row without elimination.
\`\`\`
SELECT ALL Place FROM Student;
\`\`\`

**WHERE clause** — specifies criteria for the desired result.
\`\`\`
SELECT <column-name>[,...] FROM <table-name> WHERE <condition>;
SELECT Admno, Name, Place FROM Student WHERE Place = 'Chennai';
\`\`\`
Relational operators (=, <, <=, >, >=, <>) compare values; logical operators (OR, AND, NOT) connect conditions:
\`\`\`
SELECT Admno, Name, Age, Place FROM Student WHERE (Age>=18 AND Place='Delhi');
\`\`\`

**12.7.5.3 BETWEEN / NOT BETWEEN** — defines a value range (inclusive upper/lower).
\`\`\`
SELECT Admno, Name, Age FROM Student WHERE Age BETWEEN 18 AND 19;
SELECT Admno, Name, Age FROM Student WHERE Age NOT BETWEEN 18 AND 19;
\`\`\`

**12.7.5.4 IN / NOT IN** — compares a column with a LIST of values (like multiple ORs).
\`\`\`
SELECT Admno, Name, Place FROM Student WHERE Place IN ('Chennai', 'Delhi');
SELECT Admno, Name, Place FROM Student WHERE Place NOT IN ('Chennai', 'Delhi');
\`\`\`

**NULL values** — searched using IS NULL (or IS NOT NULL for non-nulls).
\`\`\`
SELECT * FROM Student WHERE Age IS NULL;
\`\`\`

**12.7.5.5 ORDER BY** — sorts data ascending (default) or descending (DESC keyword; ASC for explicit ascending).
\`\`\`
SELECT <column-name>[,...] FROM <table-name> ORDER BY <column1>,... ASC|DESC;
SELECT * FROM Student ORDER BY Name;
\`\`\`
**Note:** ORDER BY does not affect the original table. Sorting can be done on multiple fields.

**12.7.5.6 WHERE with ORDER BY** — can be combined:
\`\`\`
SELECT * FROM Student WHERE Age>=18 ORDER BY Name;
SELECT * FROM Student WHERE Age>=18 ORDER BY Name DESC;
\`\`\`

**12.7.5.7 GROUP BY** — groups rows with identical values in a column, usually paired with aggregate functions for summary reports.
\`\`\`
SELECT <column-names> FROM <table-name> GROUP BY <column-name> [HAVING condition];
SELECT Gender, count(*) FROM Student GROUP BY Gender;
\`\`\`
(The \\* with COUNT includes NULL values.)

**12.7.5.8 HAVING** — used with GROUP BY to place a condition ON THE GROUPS (can include aggregate functions).
\`\`\`
SELECT Place, count(*) FROM Student GROUP BY Place HAVING Place = 'Chennai';
\`\`\``,
      nav: { back: "dml-alter-drop", next: "tcl-commands", nextLabel: "Next: TCL Commands →" }
    },
    {
      id: "tcl-commands",
      title: "Transaction Control Language (TCL) Commands",
      content: `**12.7.6 TCL Commands**

**12.7.6.1 COMMIT** — permanently saves a transaction. Changes from DML commands (INSERT, UPDATE, DELETE) are NOT permanent until COMMIT is given — once committed, changes CANNOT be rolled back.
\`\`\`
COMMIT;
\`\`\`

**12.7.6.2 ROLLBACK** — restores the database to the last committed state; used with SAVEPOINT to jump to a specific point.
\`\`\`
ROLLBACK TO savepoint_name;
\`\`\`

**12.7.6.3 SAVEPOINT** — temporarily saves a transaction so you can roll back to that point later. Different states can be saved with different names.
\`\`\`
SAVEPOINT savepoint_name;
\`\`\`

**Example — COMMIT, SAVEPOINT, ROLLBACK together:**
\`\`\`
INSERT INTO Student VALUES (107, 'Beena', 'F', 20, 'Cochin');
COMMIT;                                            -- permanently saved

UPDATE Student SET Name='Mini' WHERE Admno=105;
SAVEPOINT A;                                        -- saves this state as "A"

INSERT INTO Student VALUES (108, 'Jisha', 'F', 19, 'Delhi');
SAVEPOINT B;                                        -- saves this state as "B"

ROLLBACK TO A;   -- reverts back to the state saved at SAVEPOINT A
                  -- (undoes the Jisha insert, keeps the Mini update)
\`\`\`
This demonstrates how TCL commands let you build a transaction incrementally, marking safe checkpoints (savepoints) you can return to, while COMMIT finalizes changes that cannot later be undone.`,
      nav: { back: "select-queries", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- SQL is a language that helps create and operate relational databases; MySQL is a database management system (RDBMS).
- SQL's components: DDL, DML, DQL, TCL, DCL.
- DDL provides statements for creating/deleting tables (CREATE, ALTER, DROP, TRUNCATE); DML provides statements to insert/update/delete data (INSERT, UPDATE, DELETE); DCL provides authorization commands (GRANT, REVOKE); TCL manages transactions (COMMIT, ROLLBACK, SAVEPOINT); DQL generates queries (SELECT).
- CREATE TABLE creates a new table, with optional column-level or table-level constraints: UNIQUE, PRIMARY KEY, DEFAULT, CHECK.
- DELETE removes rows (keeps table/space); TRUNCATE removes all rows and frees space (keeps structure); DROP removes the entire table (irreversible).
- SELECT retrieves data — DISTINCT removes duplicates, ALL retains them; WHERE filters rows; BETWEEN/IN test ranges/lists; ORDER BY sorts results; GROUP BY groups rows for aggregate summaries; HAVING filters those groups.
- COMMIT permanently saves a transaction (cannot be undone); ROLLBACK restores to the last committed state or a SAVEPOINT; SAVEPOINT marks a temporary point to roll back to.`,
      nav: { back: "tcl-commands", practice: true }
    }
  ]
}
