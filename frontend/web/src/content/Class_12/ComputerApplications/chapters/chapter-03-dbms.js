export default {
  eyebrow: "Chapter 3 · Class 12 Computer Applications",
  title: "Introduction to Database Management System",
  author: "",
  pills: ["Theory", "SQL", "Board Exam Important"],

  tabs: [

    // ── TAB 1 — DBMS Basics ─────────────────────────────────────────────────
    {
      id: "intro",
      label: "DBMS Basics",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Imagine your school keeps records of all students — names, marks, addresses, attendance. How do they store and find information quickly? That is where a Database Management System (DBMS) comes in. This chapter is very important — SQL commands and DBMS concepts appear in every board exam!</p>",
        },
        {
          type: "section-head",
          text: "3.1 Introduction to DBMS",
        },
        {
          type: "gloss-row",
          word: "Data",
          def: "Meaningful information — from simple facts like your name and favourite colour, to complex astronomical data. Everything that can be stored and processed is data.",
        },
        {
          type: "gloss-row",
          word: "Database",
          def: "A place where we store, retrieve, and manage data. Related data is grouped together in a structure called a table.",
        },
        {
          type: "gloss-row",
          word: "DBMS (Database Management System)",
          def: "System software for creating and managing databases. It provides users and programmers with a systematic way to create, retrieve, update and manage data. Popular DBMS: MySQL, Oracle.",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "Your school's student database stores name, roll number, marks, and address. The software that manages all this — allows searching, updating, deleting — is the DBMS.",
        },
        {
          type: "section-head",
          text: "3.1.2 Evolution of DBMS — File System Limitations",
        },
        {
          type: "teacher-voice",
          html: "<p>Before DBMS, data was stored in files (called file systems). File systems had serious problems that led to the creation of database systems:</p>",
        },
        {
          type: "gloss-row",
          word: "Data Duplication",
          def: "Same data stored in multiple files by different users — wastes storage space and causes inconsistency.",
        },
        {
          type: "gloss-row",
          word: "High Maintenance",
          def: "Access control and verifying data consistency required high cost and effort.",
        },
        {
          type: "gloss-row",
          word: "Poor Security",
          def: "File systems provided less security to data compared to DBMS.",
        },
        {
          type: "section-head",
          text: "3.1.3 DBMS Concepts",
        },
        {
          type: "gloss-row",
          word: "ACID Properties",
          def: "Stands for Atomicity, Consistency, Isolation, Durability — the four basic properties that guarantee database transactions are reliable.",
        },
        {
          type: "gloss-row",
          word: "Atomicity",
          def: "\"All or Nothing\" rule. A transaction either fully commits (succeeds) or fully aborts (fails). No partial updates.",
        },
        {
          type: "gloss-row",
          word: "Consistency",
          def: "Ensures data value changes remain constant and valid at any given moment.",
        },
        {
          type: "gloss-row",
          word: "Isolation",
          def: "When multiple users access the same data at the same time (concurrent transactions), each transaction is isolated from others to prevent conflicts. Also known as Degree of Consistency.",
        },
        {
          type: "gloss-row",
          word: "Durability",
          def: "The system's ability to recover all committed transactions after storage failure or system crash.",
        },
        {
          type: "gloss-row",
          word: "Concurrency Control and Locking",
          def: "DBMS mechanism for safe data sharing among multiple users. Locking controls which user can change a data item at a given time.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "ACID = Atomicity, Consistency, Isolation, Durability. This expansion and the meaning of each property is asked in Part II (short answer) every year. Remember: Atomicity = All or Nothing.",
        },
        {
          type: "nav",
          next: "db-models",
          nextLabel: "Next: Database Models →",
        },
      ],
    },

    // ── TAB 2 — Database Models ─────────────────────────────────────────────
    {
      id: "db-models",
      label: "Database Models",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Just like there are different ways to organize a library (by subject, by author, by year), there are different models to organize a database. There are 4 major models — know each one's name, example, advantage, and limitation.</p>",
        },
        {
          type: "section-head",
          text: "3.2.1 Hierarchical Database Model",
        },
        {
          type: "gloss-row",
          word: "Hierarchical Model",
          def: "Each record has a parent/child relationship — like a tree structure. Collection of records = record types (equivalent to tables). Individual records = rows. Famous example: IMS (Information Management System) by IBM.",
        },
        {
          type: "gloss-row",
          word: "Hierarchical — Advantages",
          def: "Less redundant data, efficient search, data integrity and security.",
        },
        {
          type: "gloss-row",
          word: "Hierarchical — Limitations",
          def: "Complex to implement. Difficulty in handling many-to-many relationships.",
        },
        {
          type: "section-head",
          text: "3.2.2 Network Model",
        },
        {
          type: "gloss-row",
          word: "Network Model",
          def: "Similar to Hierarchical but each member can have MORE THAN ONE owner. Handles many-to-many relationships better. First developed: IDS (Integrated Data Store) at Honeywell. Three components: Network Schema, Sub Schema, Language.",
        },
        {
          type: "gloss-row",
          word: "Network — Advantages",
          def: "Handles more relationship types, easy data access, data integrity and independence.",
        },
        {
          type: "gloss-row",
          word: "Network — Limitations",
          def: "Difficulty in design and maintenance.",
        },
        {
          type: "section-head",
          text: "3.2.3 Relational Model",
        },
        {
          type: "gloss-row",
          word: "Relational Model",
          def: "A database organized based on the relational data model. Any database whose logical organization is based on this model is a Relational Database. Examples: MySQL, Oracle, DB2, MS SQL Server, MS Access. RDBMS is the basis for SQL.",
        },
        {
          type: "gloss-row",
          word: "Instance",
          def: "A table consisting of rows and columns.",
        },
        {
          type: "gloss-row",
          word: "Schema",
          def: "Specifies the structure of the database — including the name and type of each column.",
        },
        {
          type: "gloss-row",
          word: "Relation",
          def: "A table in the relational model. Consists of unique attributes (columns) and tuples (rows).",
        },
        {
          type: "section-head",
          text: "3.2.4 Object-Oriented Database Model",
        },
        {
          type: "gloss-row",
          word: "Object-Oriented Model",
          def: "Combines Object-Oriented Programming (OOP) concepts with database technologies. Uses small reusable software units called Objects stored in the database. Efficiently manages large numbers of different data types and complex behaviours.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "4 Database Models: Hierarchical (tree/parent-child, IMS/IBM), Network (many owners, IDS/Honeywell), Relational (tables, MySQL/Oracle), Object-Oriented (OOP concepts). Know the first example of each: IMS for Hierarchical, IDS for Network.",
        },
        {
          type: "section-head",
          text: "3.4 RDBMS Jargons (Key Terms)",
        },
        {
          type: "gloss-row",
          word: "Table",
          def: "Collection of data organized in rows and columns. Simple representation of relations. True relations cannot have duplicate rows, but tables can.",
        },
        {
          type: "gloss-row",
          word: "Column / Attribute",
          def: "Vertical entity in a table. Each column holds values of the same type (Attribute Domain). Example: the Name column holds only characters, not numbers.",
        },
        {
          type: "gloss-row",
          word: "Row / Record / Tuple",
          def: "Horizontal entity in a table. A single entry in a table. Set of related data represented together.",
        },
        {
          type: "gloss-row",
          word: "Primary Key",
          def: "The candidate key chosen to uniquely identify each tuple (row). Every tuple must have a unique primary key value. A primary key made of more than one attribute = Composite Primary Key.",
        },
        {
          type: "gloss-row",
          word: "Foreign Key",
          def: "A copy of a primary key exported from one table to another to represent a relationship between them. Foreign key values do not have to be unique and can be null.",
        },
        {
          type: "gloss-row",
          word: "Super Key",
          def: "An attribute or group of attributes sufficient to uniquely identify every tuple in a relation. Each super key is a candidate key.",
        },
        {
          type: "gloss-row",
          word: "Composite Key",
          def: "A key with more than one attribute used to identify rows uniquely. Also known as Compound Key.",
        },
        {
          type: "nav",
          back: "intro",
          next: "er-model",
          nextLabel: "Next: ER Model →",
        },
      ],
    },

    // ── TAB 3 — ER Model ────────────────────────────────────────────────────
    {
      id: "er-model",
      label: "ER Model",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Before building a database, we draw a diagram to plan it — like an architect drawing a house plan before building. This diagram is called an Entity-Relationship (ER) Diagram. ER Model questions appear in Part IV (detail) every year.</p>",
        },
        {
          type: "section-head",
          text: "3.5 ER Model Basics",
        },
        {
          type: "gloss-row",
          word: "ER Model",
          def: "A collection of entities (real-world objects) where each entity is interconnected with others through conditions and dependencies. Used to plan database design.",
        },
        {
          type: "gloss-row",
          word: "Three Basic Concepts",
          def: "1. Entity or Entity Type, 2. Attributes, 3. Relationship.",
        },
        {
          type: "section-head",
          text: "3.5.2 Entity Types",
        },
        {
          type: "gloss-row",
          word: "Entity",
          def: "Any real-world object that is easily identifiable. Represented by a rectangular box. Example: Employee, Manager, HR in a company database.",
        },
        {
          type: "gloss-row",
          word: "Strong Entity",
          def: "An entity that does NOT depend on any other entity. Has its own primary key (unique id). Represented by ONE rectangle.",
        },
        {
          type: "gloss-row",
          word: "Weak Entity",
          def: "An entity that DEPENDS on another entity. Does NOT have its own primary key. Represented by DOUBLE rectangle. Example: Marks (depends on Student entity — no unique marks id).",
        },
        {
          type: "gloss-row",
          word: "Entity Instance",
          def: "The category values for a given entity. Example: if Animals is the entity, instances are Dog, Cat, Cow, Lion.",
        },
        {
          type: "section-head",
          text: "3.5.4 Types of Attributes",
        },
        {
          type: "gloss-row",
          word: "Key Attribute",
          def: "Describes a unique characteristic of an entity. Identifies each entity uniquely.",
        },
        {
          type: "gloss-row",
          word: "Simple Attribute",
          def: "Cannot be subdivided. Has a single value. Example: First Name, Last Name.",
        },
        {
          type: "gloss-row",
          word: "Composite Attribute",
          def: "Can be subdivided into simple attributes without losing meaning. Example: Name → First Name + Last Name.",
        },
        {
          type: "gloss-row",
          word: "Single Valued Attribute",
          def: "Contains only ONE value for the attribute. Example: Age (a person has only one age). Represented by a single ellipse.",
        },
        {
          type: "gloss-row",
          word: "Multi Valued Attribute",
          def: "Has MORE THAN ONE value. Example: Degree (a person can hold B.Tech, MBA, etc.). Represented by a double ellipse.",
        },
        {
          type: "section-head",
          text: "3.5.5 Relationship Types",
        },
        {
          type: "gloss-row",
          word: "One-to-One (1:1)",
          def: "0 or 1 instance of entity A is associated with 0 or 1 instance of entity B. Example: Person drives Vehicle — one person drives one vehicle.",
        },
        {
          type: "gloss-row",
          word: "One-to-Many (1:N)",
          def: "1 instance of entity A is associated with many instances of entity B, but 1 instance of B is associated with only 1 instance of A. Example: Customer places many Orders.",
        },
        {
          type: "gloss-row",
          word: "Many-to-Many (M:N)",
          def: "Many instances of A are associated with many instances of B. Example: Students register many Courses; each Course is registered by many Students. In relational databases, M:N relationships are converted into 1:N.",
        },
        {
          type: "gloss-row",
          word: "Degree of Relationship",
          def: "The number of entity types involved. Unary (1 entity — e.g. Manager manages Employees), Binary (2 entities), Ternary (3 entities).",
        },
        {
          type: "gloss-row",
          word: "Cardinality",
          def: "The number of entities in one set mapped with the number of entities of another set via the relationship. Three types: 1:1, 1:N, M:N.",
        },
        {
          type: "section-head",
          text: "3.6 ER Diagram Notations",
        },
        {
          type: "gloss-row",
          word: "Strong Entity",
          def: "Simple rectangular box.",
        },
        {
          type: "gloss-row",
          word: "Weak Entity",
          def: "Double rectangular box.",
        },
        {
          type: "gloss-row",
          word: "Relationship (Strong)",
          def: "Rhombus (diamond) symbol.",
        },
        {
          type: "gloss-row",
          word: "Relationship (Weak)",
          def: "Rhombus within a rhombus (double diamond).",
        },
        {
          type: "gloss-row",
          word: "Attribute",
          def: "Ellipse connected to the entity.",
        },
        {
          type: "gloss-row",
          word: "Key Attribute",
          def: "Attribute name underlined inside the ellipse.",
        },
        {
          type: "gloss-row",
          word: "Derived Attribute",
          def: "Dotted ellipse inside the main ellipse.",
        },
        {
          type: "gloss-row",
          word: "Multi-valued Attribute",
          def: "Double ellipse.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "ER Diagram notations are asked in Part III and Part IV. Know the symbol for each: Strong Entity = single rectangle, Weak Entity = double rectangle, Relationship = diamond, Key Attribute = underlined in ellipse, Multi-valued = double ellipse.",
        },
        {
          type: "nav",
          back: "db-models",
          next: "mysql-sql",
          nextLabel: "Next: MySQL & SQL →",
        },
      ],
    },

    // ── TAB 4 — MySQL & SQL ─────────────────────────────────────────────────
    {
      id: "mysql-sql",
      label: "MySQL & SQL",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>MySQL is the most popular database in the world. SQL (Structured Query Language) is the language we use to talk to MySQL. This section has the most exam marks — SQL commands, DDL, DML, DQL, TCL, DCL are asked in Part I, Part II, Part III, and Part IV.</p>",
        },
        {
          type: "section-head",
          text: "3.7 Introduction to MySQL",
        },
        {
          type: "gloss-row",
          word: "MySQL",
          def: "An open source relational database management system. Name = 'My' (daughter of founder Monty Widenius) + 'SQL'. Runs on Windows, Linux, macOS. Fast, scalable, and reliable. Most commonly used database in the world.",
        },
        {
          type: "gloss-row",
          word: "SQL (Structured Query Language)",
          def: "A standardized language used to access and manipulate databases. Declared as standard by ANSI (1986) and ISO (1987). Current SQL standard version: 2003.",
        },
        {
          type: "think-box",
          label: "Tamil Word Help 🔤",
          text: "SQL = தரவுத்தளத்துடன் பேசும் மொழி (the language we use to communicate with the database). MySQL = அந்த மொழியை ஆதரிக்கும் மென்பொருள் (the software that supports that language).",
        },
        {
          type: "section-head",
          text: "3.7.2 Web Databases",
        },
        {
          type: "gloss-row",
          word: "Heavy Databases",
          def: "Support desktop applications. Examples: Oracle, DB2.",
        },
        {
          type: "gloss-row",
          word: "Light / Web Databases",
          def: "Support web applications and handle network issues efficiently. Examples: MySQL, SQLite, PostgreSQL. MySQL is the most commonly used web database.",
        },
        {
          type: "section-head",
          text: "3.8 MySQL Administration",
        },
        {
          type: "gloss-row",
          word: "DBA (Database Administrator)",
          def: "Manages configuration, installation, performance, security, and data backup. Skills: database design, SQL, RDBMS, networking. Primary task: create new users and assign access rights.",
        },
        {
          type: "gloss-row",
          word: "FLUSH PRIVILEGES",
          def: "A command executed after creating a new user account. Similar to rebooting the server so that the new account and privileges are updated without manual reboot.",
        },
        {
          type: "gloss-row",
          word: "Password Encryption",
          def: "MySQL uses the PASSWORD() function to encrypt stored passwords. Example: 'guest123' is stored as an encrypted hash like 'j2gd6vxd1bj3k13g4'.",
        },
        {
          type: "section-head",
          text: "3.9 MySQL Admin Tools",
        },
        {
          type: "gloss-row",
          word: "PHPMyAdmin (Web Admin)",
          def: "A web application written in PHP. Most popular for web hosting administration. Features: web interface, import from CSV, export to various formats, live monitoring charts.",
        },
        {
          type: "gloss-row",
          word: "MySQL Workbench (Desktop)",
          def: "Used by developers and DBAs for data modeling, SQL development, server configuration and backup. Basic version 5.0, current version 8.0.",
        },
        {
          type: "gloss-row",
          word: "HeidiSQL (Desktop)",
          def: "Open source tool for database administration. Supports GUI for monitoring server host, databases, tables, views, triggers, and events.",
        },
        {
          type: "section-head",
          text: "3.11 Types of SQL Commands",
        },
        {
          type: "gloss-row",
          word: "DDL — Data Definition Language",
          def: "Used to define and modify database structure. Commands: CREATE, ALTER, DROP, RENAME, TRUNCATE.",
        },
        {
          type: "gloss-row",
          word: "DML — Data Manipulation Language",
          def: "Used to manipulate data in the database. Commands: INSERT, UPDATE, DELETE.",
        },
        {
          type: "gloss-row",
          word: "DQL — Data Query Language",
          def: "Used to retrieve/fetch data. Commands: SELECT (the only DQL command).",
        },
        {
          type: "gloss-row",
          word: "TCL — Transaction Control Language",
          def: "Used to manage transactions. Commands: COMMIT, ROLLBACK, SET TRANSACTION, SAVEPOINT.",
        },
        {
          type: "gloss-row",
          word: "DCL — Data Control Language",
          def: "Used to implement security on database objects. Commands: GRANT, REVOKE.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "5 SQL command types — DDL (CREATE/ALTER/DROP/RENAME/TRUNCATE), DML (INSERT/UPDATE/DELETE), DQL (SELECT), TCL (COMMIT/ROLLBACK/SAVEPOINT), DCL (GRANT/REVOKE). The command-to-category mapping is asked in MCQ and Part II every year.",
        },
        {
          type: "nav",
          back: "er-model",
          next: "sql-commands",
          nextLabel: "Next: SQL Commands →",
        },
      ],
    },

    // ── TAB 5 — SQL Commands ────────────────────────────────────────────────
    {
      id: "sql-commands",
      label: "SQL Commands",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>This is the most practical section of the chapter. Learn each SQL command's syntax and example — these appear in Part III and Part IV questions. All SQL queries end with a semicolon (;).</p>",
        },
        {
          type: "section-head",
          text: "Administrative Commands",
        },
        {
          type: "gloss-row",
          word: "USE database",
          def: "Selects a database to work with. Syntax: mysql > use test; Output: Database changed.",
        },
        {
          type: "gloss-row",
          word: "SHOW databases",
          def: "Lists all databases on the server. Syntax: mysql > show databases;",
        },
        {
          type: "gloss-row",
          word: "SHOW tables",
          def: "Lists all tables in the current database. Syntax: mysql > show tables;",
        },
        {
          type: "gloss-row",
          word: "SHOW COLUMNS FROM tablename",
          def: "Lists all attributes, their types, Null permission, key, and default values for a given table. Syntax: mysql > show columns from sports;",
        },
        {
          type: "gloss-row",
          word: "SHOW INDEX FROM tablename",
          def: "Shows all indexes for the given table. Syntax: mysql > show indexes from sports;",
        },
        {
          type: "section-head",
          text: "Database Commands",
        },
        {
          type: "gloss-row",
          word: "CREATE DATABASE",
          def: "Creates a new database. Syntax: CREATE database databasename; Example: mysql>create database studentDB;",
        },
        {
          type: "gloss-row",
          word: "DROP DATABASE",
          def: "Deletes an existing database. Syntax: DROP database databasename; Example: mysql>DROP database studentDB;",
        },
        {
          type: "gloss-row",
          word: "USE DATABASE",
          def: "Selects a database for use. Syntax: USE databasename; Example: mysql>USE studentDB;",
        },
        {
          type: "section-head",
          text: "Record Commands",
        },
        {
          type: "gloss-row",
          word: "INSERT INTO",
          def: "Adds new rows into a table. Syntax 1: INSERT INTO tablename (col1, col2) VALUES (val1, val2); Syntax 2: INSERT INTO tablename VALUES (val1, val2); Example: mysql>INSERT INTO Biodata (firstname, lastname, age) VALUES (Krishna, Sam, 10);",
        },
        {
          type: "gloss-row",
          word: "SELECT",
          def: "Retrieves data from a table. SELECT * retrieves all columns. SELECT col1, col2 retrieves specific columns. Syntax: SELECT * FROM tablename; or SELECT col1, col2 FROM tablename;",
        },
        {
          type: "gloss-row",
          word: "DELETE",
          def: "Removes records from a table. With WHERE clause: deletes specific rows. Without WHERE: deletes ALL data. Syntax: DELETE FROM tablename WHERE columnname='value';",
        },
        {
          type: "gloss-row",
          word: "UPDATE",
          def: "Modifies existing records. Syntax: UPDATE tablename SET column1='new value' WHERE column2='value'; Example: mysql>UPDATE Biodata SET age=13 WHERE firstname='Krishna';",
        },
        {
          type: "section-head",
          text: "Clauses and Operators",
        },
        {
          type: "gloss-row",
          word: "WHERE Clause",
          def: "Used in SELECT and UPDATE to specify selection criteria. Operators used: =, !=, >, >=, <, <=.",
        },
        {
          type: "gloss-row",
          word: "ORDER BY",
          def: "Sorts query results. ORDER BY columnname = Ascending (default). ORDER BY columnname DESC = Descending.",
        },
        {
          type: "gloss-row",
          word: "GROUP BY",
          def: "Groups identical data together. Often used with aggregate functions like SUM(). Example: SELECT Rollno, SUM(Marks) FROM Exams GROUP BY Rollno;",
        },
        {
          type: "gloss-row",
          word: "JOIN",
          def: "Retrieves data from two or more tables by referencing columns that hold identical values. Example: SELECT Name, Hobby, SUM(Marks) FROM Profile, Exams WHERE Profile.Rollno = Exams.Rollno GROUP BY Name;",
        },
        {
          type: "gloss-row",
          word: "MySQL Operators",
          def: "Arithmetic: +, -, *, /, %. Comparison: =, !=, <, >, <>, >=, <=. Logical: AND, OR, NOT, IN, LIKE, BETWEEN, EXISTS, ANY, UNIQUE.",
        },
        {
          type: "think-box",
          label: "⚠️ Common Mistakes",
          text: "DELETE without WHERE deletes ALL records — always use WHERE if you want to delete specific rows. UPDATE without WHERE updates ALL rows — always specify the condition. All SQL commands end with semicolon (;).",
        },
        {
          type: "section-head",
          text: "TCL Commands",
        },
        {
          type: "gloss-row",
          word: "COMMIT",
          def: "Permanently saves changes made by a transaction into the database.",
        },
        {
          type: "gloss-row",
          word: "ROLLBACK",
          def: "Restores the database to its state at the last COMMIT. Used to undo uncommitted changes.",
        },
        {
          type: "gloss-row",
          word: "SAVEPOINT",
          def: "Temporarily saves a transaction so you can rollback to that specific point later.",
        },
        {
          type: "gloss-row",
          word: "SET TRANSACTION",
          def: "Sets transaction properties such as read-write or read-only access.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "\"Which command makes changes permanent?\" Answer: COMMIT. \"Which command undoes changes?\" Answer: ROLLBACK. These are asked every year in MCQ and Part II.",
        },
        {
          type: "nav",
          back: "mysql-sql",
          practice: true,
        },
      ],
    },

  ],
}
