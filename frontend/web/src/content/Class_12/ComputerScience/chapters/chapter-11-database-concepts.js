export default {
  chapterNumber: 11,
  title: "Database Concepts",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-data-database",
      title: "Data, Information, Database & DBMS",
      content: `**Introduction**

A **database** is an organized collection of data, generally stored and accessed electronically from a computer system. The term "database" is often used casually to refer to both the database and the DBMS used to manipulate it. A school class register (names arranged alphabetically) is an example of a database. Here we focus on electronic databases.

**11.1 Data** — raw facts stored in a computer. Data may contain any character, text, word, or number. Example: 600006, DPI Campus, SCERT, Chennai, College Road.

**11.2 Information** — processed data, which allows it to be utilized in a significant way. When the above data is processed, organized, and formatted, it gives meaningful information about (for example) the SCERT institution's contact address.

**11.3 Database** — a repository collection of related data organized so it can be easily accessed, managed, and updated. A database can be software or hardware based, with the sole purpose of storing data.

**11.4 Database Management System (DBMS)**

A DBMS is software that allows creating, defining, and manipulating a database — letting users store, process, and analyze data easily. It provides an interface/tool to create databases, store and update data, etc. DBMS also provides protection, security, and maintains data consistency for multiple users. Examples: Foxpro, dbase.

**11.4.1 Relational Database Management System (RDBMS)**

RDBMS is an advanced version of DBMS, storing and manipulating data as **tables**. Examples: MySQL, Oracle, MS-Access.

**11.4.2 Characteristics of RDBMS**
1. **Ability to manipulate data** — store, modify, and delete data.
2. **Reduced Redundancy** — follows Normalisation, minimizing unnecessary data repetition.
3. **Data Consistency** — maintains consistency even as live data is continuously updated.
4. **Support Multiple User and Concurrent Access** — multiple users can update/insert/delete simultaneously while maintaining consistency.
5. **Query Language** — a simple language to fetch, insert, delete, and update data.
6. **Security** — protects data via user accounts with different access permissions.
7. **DBMS Supports Transactions** — manages data integrity in real-world multi-threaded applications.

**11.4.3 Advantages of RDBMS**
- Segregation of application program.
- Minimal data duplication (redundancy).
- Easy retrieval of data using the Query Language.
- Reduced development time and maintenance.

**11.4.4 Components of DBMS** — five major components:
1. **Hardware** — computer, hard disk, I/O channels for data, and physical storage components.
2. **Software** — the program controlling everything; understands Database Access Languages and interprets them into database commands.
3. **Data** — the resource for which DBMS is designed, to be stored and utilized.
4. **Procedures/Methods** — general instructions for using a DBMS (installation, backups, report generation, etc.).
5. **Database Access Languages** — languages used to write commands to access, insert, update, and delete data. Examples of popular DBMS: Dbase, FoxPro.`,
      nav: { next: "database-structure-datamodel", nextLabel: "Next: Database Structure & Data Models →" }
    },
    {
      id: "database-structure-datamodel",
      title: "Database Structure & Data Models",
      content: `**11.5 Database Structure**

A **Table** is the entire collection of related data, referred to as a File or Table, organized as rows and columns. Each **row** represents a **record** — a set of data for each entry. Each **column** represents a **Field**, grouping each item of data among the records into specific categories (e.g., StuNo, StuName, StuAge, StuClass, StuSec).

- A Table is known as a **RELATION**
- A Row is known as a **TUPLE**
- A Column is known as an **ATTRIBUTE**

**11.6 Data Model**

A data model describes how data can be represented and accessed after implementation — a simple abstraction of a complex real-world data environment. Its main purpose is to give an idea of what the final system/software will look like once developed.

**11.6.1 Types of Data Model**

**1. Hierarchical Model** — developed by IBM (as Information Management System). Data is represented as a tree-like structure, representing a one-to-many (parent-child) relationship — one child has only one parent, but one parent can have many children. Mainly used in IBM Mainframe computers.

**2. Relational Model** — first proposed by **E.F. Codd** in 1970; today the most widespread data model for database applications. Basic structure is tables (relations) — all information of a particular type is stored in rows of that table. A **relation key** is an attribute uniquely identifying a particular tuple (row).

**3. Network Model** — an extended form of the hierarchical model. Difference: in the hierarchical model, a child has only ONE parent node; in the network model, a child may have MANY parent nodes (many-to-many relationships). Easier and faster to access data.

**4. Entity Relationship Model (ER Model)** — developed by **Chen** in 1976. Relationships are created by dividing objects into **entities** and their characteristics into **attributes**. Useful for conceptual database design — simple and easy to design a logical view of data.
- Rectangle → represents entities (e.g., Doctor, Patient)
- Ellipse → represents attributes (e.g., D-id, D-name)
- Diamond → represents the relationship (e.g., Doctor diagnosis Patient)

**5. Object Model** — stores data as objects, attributes, methods, classes, and inheritance. Handles complex applications (GIS, scientific experiments, engineering design). Used in File Management Systems. Provides a clear, modular structure that's easy to maintain and modify. Example: Shape (base) with Circle, Rectangle, Triangle (each inheriting from Shape, with their own attributes like radius, length/breadth, base/height).

**11.6.2 Types of DBMS Users**
- **Database Administrators (DBA)** — manage the complete DBMS: security, license keys, user accounts and access.
- **Application Programmers / Software Developers** — develop and design parts of the DBMS.
- **End User** — stores, retrieves, updates, and deletes data via applications.
- **Database Designers** — identify data to be stored and choose appropriate structures to represent and store it.`,
      nav: { back: "intro-data-database", next: "dbms-vs-rdbms", nextLabel: "Next: DBMS vs RDBMS & Types of Relationships →" }
    },
    {
      id: "dbms-vs-rdbms",
      title: "DBMS vs RDBMS & Types of Relationships",
      content: `**11.7 Difference between DBMS and RDBMS**

| Basis | DBMS | RDBMS |
|---|---|---|
| Expansion | Database Management System | Relational Database Management System |
| Data storage | Navigational model (linked records) | Relational model (tables — rows and columns) |
| Data redundancy | Present | Not Present |
| Normalization | Not performed | Uses normalization to reduce redundancy |
| Data access | Consumes more time | Faster, compared to DBMS |
| Keys and indexes | Does not use | Used to establish relationships |
| Transaction management | Inefficient, error prone, insecure | Efficient and secure |
| Distributed Databases | Not supported | Supported |
| Example | Dbase, FoxPro | SQL Server, Oracle, MySQL, MariaDB, SQLite, MS Access |

**Note:** Database normalization was first proposed by **Dr. Edgar F Codd** as an integral part of RDBMS, to reduce data redundancy and improve data integrity — these rules are known as **E F Codd Rules**.

**11.8 Types of Relationships**

**1. One-to-One Relationship** — one entity is related to only one other entity. One row in a table links to only one row in another table, and vice versa. Example: A student has only one exam number.

**2. One-to-Many Relationship** — one entity relates to many other entities. One row in table A links to many rows in table B, but one row in B links to only one row in A. Example: One Department has many staff members.

**3. Many-to-One Relationship** — many entities relate to only one entity in the other table. Multiple rows in one table relate to only one row in the other. Example: Multiple staff members work in one Department.

**4. Many-to-Many Relationship** — multiple records in one table associate with multiple records in another. Example: Customers can purchase various products, and products can be purchased by many customers. Another example: A student can register for many courses, and a course may include many students.`,
      nav: { back: "database-structure-datamodel", next: "relational-algebra", nextLabel: "Next: Relational Algebra →" }
    },
    {
      id: "relational-algebra",
      title: "Relational Algebra",
      content: `**11.9 Relational Algebra in DBMS**

**Relational Algebra** was first created by **Edgar F Codd** at IBM. It was used for modeling data stored in relational databases and defining queries on it — a procedural query language used to query database tables using SQL. Operations are performed recursively on a relation (table) to yield an output — a new relation, possibly formed from one or more input relations.

Relational Algebra is divided into groups:

**Unary Relational Operations:**
- **SELECT** (symbol: σ)
- **PROJECT** (symbol: Π)

**Relational Algebra Operations from Set Theory:**
- **UNION** (∪)
- **INTERSECTION** (∩)
- **DIFFERENCE** (−)
- **CARTESIAN PRODUCT** (X)

**SELECT (σ)** — General form: σ꜀(R), with relation R and condition C on R's attributes. SELECT filters out all tuples that do NOT satisfy C — selecting a subset of rows matching a condition.

Example: σ (course = "Big Data") applied to STUDENT — returns only the rows where course equals "Big Data".

**PROJECT (Π)** — Eliminates all attributes of the input relation EXCEPT those mentioned in the projection list — defines a relation containing a VERTICAL subset of the relation (specific columns).

Example: Πcourse(STUDENT) returns just the Course column values, with duplicate rows removed.
Example: Πstudno,course(STUDENT) returns just those two columns for every row.

**UNION (∪)** — Includes all tuples that are in table A OR in table B, eliminating duplicates. A ∪ B.

**SET DIFFERENCE (−)** — A − B is a relation including all tuples that are in A but NOT in B. Attribute names of A must match those in B.

**INTERSECTION (∩)** — A ∩ B defines a relation with tuples that are in BOTH A and B. A and B must be union-compatible.

**PRODUCT / CARTESIAN PRODUCT (X)** — A x B combines two relations, where A and B have different attributes — the result contains every combination of a row from A with a row from B. If Table A has 3 rows and Table B has 2 rows, A x B has 3 x 2 = 6 rows. Useful for merging columns from two relations.`,
      nav: { back: "dbms-vs-rdbms", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- DBMS is a computer-based record keeping system; Data is unprocessed and has no meaning by itself; Information is processed, organized, and formatted data.
- Examples of RDBMS: MySQL, Oracle, SQL Server, IBM DB2.
- Redundancy means duplication of data; Data Consistency means data values are the same across all instances of a database; Data Integrity is protection from unauthorized users.
- A Table is a Relation; a Row is a Tuple; a Column is an Attribute.
- Types of data models: Hierarchical, Relational, Network, ER, and Object model.
- Hierarchical model = tree-like, one-to-many parent-child relationship. Relational model = data as relations/tables. Network model = similar to hierarchical but allows a record to have more than one parent. ER model = entities, attributes, and relationships. Object model = data as objects, attributes, methods, classes, and inheritance.
- Normalization reduces data redundancy and improves data integrity; proposed by Dr. Edgar F Codd.
- Types of relationships: one-to-one, one-to-many, many-to-one, many-to-many.
- Relational Algebra is used for modeling data in relational databases and defining queries on it — SELECT (σ), PROJECT (Π), UNION (∪), INTERSECTION (∩), DIFFERENCE (−), and CARTESIAN PRODUCT (X).`,
      nav: { back: "relational-algebra", practice: true }
    }
  ]
}
