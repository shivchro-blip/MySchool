export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 11 -- Database Concepts",
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
          "label": "Database Concepts",
          "questions": [
            { "id": "q1", "html": "What is the acronym of DBMS?", "options": ["a) DataBase Management Symbol", "b) Database Managing System", "c) DataBase Management System", "d) DataBasic Management System"], "answer": 2, "hint": "DBMS stands for DataBase Management System." },
            { "id": "q2", "html": "A table is known as", "options": ["a) tuple", "b) attribute", "c) relation", "d) entity"], "answer": 2, "hint": "In relational database terminology, a table is called a relation." },
            { "id": "q3", "html": "Which database model represents parent-child relationship?", "options": ["a) Relational", "b) Network", "c) Hierarchical", "d) Object"], "answer": 2, "hint": "The Hierarchical model represents a tree-like, parent-child (one-to-many) relationship." },
            { "id": "q4", "html": "Relational database model was first proposed by", "options": ["a) E F Codd", "b) E E Codd", "c) E F Cadd", "d) E F Codder"], "answer": 0, "hint": "E.F. Codd first proposed the relational database model in 1970." },
            { "id": "q5", "html": "What type of relationship does hierarchical model represent?", "options": ["a) one-to-one", "b) one-to-many", "c) many-to-one", "d) many-to-many"], "answer": 1, "hint": "The hierarchical model represents a one-to-many (parent-child) relationship." },
            { "id": "q6", "html": "Who is called Father of Relational Database from the following?", "options": ["a) Chris Date", "b) Hugh Darween", "c) Edgar Frank Codd", "d) Edgar Frank Cadd"], "answer": 2, "hint": "Edgar Frank Codd is regarded as the Father of the Relational Database." },
            { "id": "q7", "html": "Which of the following is an RDBMS?", "options": ["a) Dbase", "b) Foxpro", "c) Microsoft Access", "d) Microsoft Excel"], "answer": 2, "hint": "Microsoft Access is an RDBMS; Dbase and Foxpro are DBMS, and Excel is a spreadsheet." },
            { "id": "q8", "html": "What symbol is used for SELECT statement (relational algebra)?", "options": ["a) σ", "b) Π", "c) X", "d) Ω"], "answer": 0, "hint": "The symbol σ (sigma) represents the SELECT operation in relational algebra." },
            { "id": "q9", "html": "A tuple is also known as", "options": ["a) table", "b) row", "c) attribute", "d) field"], "answer": 1, "hint": "A tuple is another name for a row in a relation (table)." },
            { "id": "q10", "html": "Who developed ER model?", "options": ["a) Chen", "b) EF Codd", "c) Chend", "d) Chand"], "answer": 0, "hint": "The Entity-Relationship (ER) model was developed by Chen in 1976." }
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
        { "q": "Mention few examples of a DBMS.", "ans": "Examples of DBMS software include Dbase and FoxPro. These are simpler database systems that use a navigational (linked record) storage model, without the relational/table structure of an RDBMS." },
        { "q": "List some examples of RDBMS.", "ans": "Examples of RDBMS include MySQL, Oracle, MS-Access, SQL Server, IBM DB2, MariaDB, and SQLite. These systems store and manipulate data in the form of related tables." },
        { "q": "What is data consistency?", "ans": "Data consistency means that data values remain the same at all instances of a database -- when data is updated in one place, all related references to that data reflect the same, correct value, avoiding conflicting or contradictory information within the database." },
        { "q": "What is the difference between Hierarchical and Network data model?", "ans": "In the Hierarchical model, a child record has only ONE parent node, forming a strict tree structure with a one-to-many relationship. In the Network model, a child record may have MANY parent nodes, representing many-to-many relationships -- making it an extended, more flexible form of the hierarchical model that is easier and faster to access." },
        { "q": "What is normalization?", "ans": "Normalization is the process of organizing data in a database to reduce data redundancy and improve data integrity, first proposed by Dr. Edgar F Codd as an integral part of RDBMS. It divides data across tables in a structured way (following E F Codd Rules) so that repetition of the same data is minimized." }
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
        { "q": "What is the difference between Select and Project command?", "ans": "SELECT (symbol σ) is a relational algebra operation that filters ROWS of a relation according to a given condition -- it returns a HORIZONTAL subset of the table (only tuples satisfying the condition). PROJECT (symbol Π) is an operation that filters COLUMNS -- it eliminates all attributes except those specified, returning a VERTICAL subset of the relation (specific columns only), with duplicate rows removed from the result." },
        { "q": "What is the role of DBA?", "ans": "The Database Administrator (DBA) is responsible for managing the complete database management system. This includes taking care of the security of the DBMS, managing license keys, and managing user accounts and their access permissions -- ensuring the database runs smoothly, securely, and remains available to authorized users." },
        { "q": "Explain Cartesian Product with a suitable example.", "ans": "The Cartesian Product (symbol X) combines two relations by pairing every row of the first relation with every row of the second relation, where the two relations have different attributes. If Table A has 3 rows and Table B has 2 rows, then A x B produces 3 x 2 = 6 rows in the result, containing all possible row combinations from both tables. For example, combining a 3-row Student table with a 2-row Subject table using Cartesian Product would produce 6 combined rows, pairing each student with each subject." }
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
          "q": "Explain the different types of data model.",
          "ans": "1. Hierarchical Model: Developed by IBM. Represents data as a tree-like structure with a one-to-many (parent-child) relationship -- one child has only one parent, but a parent can have many children. Used mainly in IBM Mainframe computers.\n\n2. Relational Model: Proposed by E.F. Codd in 1970. The most widespread model today, representing data as tables (relations), with a relation key uniquely identifying each tuple (row).\n\n3. Network Model: An extension of the hierarchical model, allowing a child record to have MULTIPLE parent nodes (many-to-many relationships), making data access easier and faster.\n\n4. Entity Relationship (ER) Model: Developed by Chen in 1976. Divides objects into entities and attributes, using rectangles (entities), ellipses (attributes), and diamonds (relationships) in ER diagrams -- useful for conceptual database design.\n\n5. Object Model: Stores data as objects, attributes, methods, classes, and inheritance. Handles complex applications like GIS and engineering design, providing a clear, modular, easy-to-maintain structure.\n\nEach model offers a different balance of simplicity, flexibility, and suitability for particular kinds of applications and data relationships."
        },
        {
          "q": "Explain the different types of relationship mapping.",
          "ans": "1. One-to-One Relationship: One entity relates to only ONE other entity -- one row in a table links to exactly one row in another table, and vice versa. Example: A student has only one exam number.\n\n2. One-to-Many Relationship: One entity relates to MANY other entities -- one row in table A links to many rows in table B, but each row in B links back to only one row in A. Example: One Department has many staff members.\n\n3. Many-to-One Relationship: MANY entities relate to only ONE entity in the other table -- multiple rows in one table relate to a single row in another. Example: Many staff members work in one Department (the reverse view of one-to-many).\n\n4. Many-to-Many Relationship: MULTIPLE records in one table associate with MULTIPLE records in another. Example: Students can register for many courses, and each course can include many students; similarly, Customers can purchase various products, and products can be purchased by many customers.\n\nThese relationship types model how real-world entities connect to each other, and choosing the correct type when designing a database ensures data is structured accurately and efficiently."
        },
        {
          "q": "Differentiate DBMS and RDBMS.",
          "ans": "DBMS (Database Management System) stores data using a navigational model, i.e., data stored as linked records, with data redundancy typically PRESENT and no normalization performed. Data access tends to consume more time, it does not use keys/indexes to establish relationships, transaction management is inefficient/error-prone/insecure, and it does NOT support distributed databases. Examples: Dbase, FoxPro.\n\nRDBMS (Relational Database Management System) stores data using a relational model, i.e., data organized in tables as rows and columns, with data redundancy NOT present (reduced through normalization). Data access is faster compared to DBMS, keys and indexes ARE used to establish relationships between tables, transaction management is efficient and secure, and distributed databases ARE supported. Examples: SQL Server, Oracle, MySQL, MariaDB, SQLite, MS Access.\n\nIn short, RDBMS is a more advanced, structured, and secure evolution of the basic DBMS concept, built specifically around the relational (table-based) model."
        },
        {
          "q": "Explain the different operators in Relational algebra with suitable examples.",
          "ans": "Relational Algebra provides operators to query and manipulate relations (tables):\n\n1. SELECT (σ): Filters ROWS based on a condition. Example: σ(course=\"Big Data\") applied to STUDENT returns only rows where course equals 'Big Data'.\n\n2. PROJECT (Π): Filters COLUMNS, returning only specified attributes (a vertical subset), removing duplicate rows. Example: Πcourse(STUDENT) returns just the distinct Course values.\n\n3. UNION (∪): Combines all tuples from two relations A and B, eliminating duplicates. Example: Table A ∪ Table B, combining student records from both tables into one, with no repeated rows.\n\n4. SET DIFFERENCE (−): A − B returns tuples that are in A but NOT in B. Example: comparing two student lists to find students only in the first list.\n\n5. INTERSECTION (∩): A ∩ B returns tuples common to BOTH A and B (they must be union-compatible). Example: finding students present in both of two class lists.\n\n6. CARTESIAN PRODUCT (X): Combines every row of relation A with every row of relation B, where A and B have DIFFERENT attributes. If A has 3 rows and B has 2, A x B produces 3x2=6 rows, useful for merging columns from two relations before further filtering.\n\nTogether, these operators form the mathematical foundation underlying SQL query processing in relational databases."
        }
      ]
    }
  ]
}
