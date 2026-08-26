export default {
  chapterNumber: 12,
  title: "வினவல் அமைப்பு மொழி (SQL)",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-sql-components",
      title: "SQL அறிமுகம் & கூறுகள்",
      content: `**12.1 அறிமுகம்**

SQL (Structured Query Language) என்பது தரவுதள மேலாண்மை அமைப்புகளுடன் தொடர்பு கொள்ளப் பயன்படும் தரப்படுத்தப்பட்ட மொழியாகும் — American National Standard Institute (ANSI) 1986-இல் தரப்படுத்தியது, ISO 1987-இல் ஏற்றுக்கொண்டது. Oracle, MySQL, MS SQL Server, IBM DB2 போன்ற RDBMS-கள் SQL-ஐப் பயன்படுத்துகின்றன.

**12.1.2 SQL-ன் கூறுகள் (Components of SQL)**

1. **தரவு வரையறை மொழி (DDL — Data Definition Language):** அட்டவணைகளை உருவாக்குதல், மாற்றுதல்.
2. **தரவு கையாளும் மொழி (DML — Data Manipulation Language):** பதிவுகளைச் செருகுதல், நீக்குதல், மாற்றியமைத்தல்.
3. **தரவுக் கட்டுப்பாட்டு மொழி (DCL — Data Control Language):** அணுகல் அனுமதி வழங்குதல்/திரும்பப் பெறுதல்.
4. **முரண்பாட்டுக் கட்டுப்பாடு (TCL — Transaction Control Language):** தரவுதள மாற்றங்களை உறுதிப்படுத்துதல்/திரும்பப்பெறுதல்.

**12.1.5 SQL-ன் வகைகள்**

DDL (தரவு வரையறை மொழி), DML (தரவு கையாளும் மொழி), TCL (முரண்பாட்டுக் கட்டுப்பாடு), DQL (தரவு வினவல் மொழி).

**தரவுதளத்தை உருவாக்குதல்:**
\`\`\`sql
CREATE DATABASE database_name;
USE database_name;
\`\`\``,
      nav: { next: "datatypes-create-table", nextLabel: "அடுத்து: தரவு வகைகள் & CREATE TABLE →" }
    },
    {
      id: "datatypes-create-table",
      title: "தரவு வகைகள் & CREATE TABLE",
      content: `**12.6 SQL தரவு வகைகள்**

| தரவு வகை | விளக்கம் |
|---|---|
| char(size) | நிலையான நீளம் கொண்ட எழுத்துச் சேர்க்கை |
| varchar(size) | மாறும் நீளம் கொண்ட எழுத்துச் சேர்க்கை |
| int | முழு எண் |
| smallint | சிறிய அளவு முழு எண் |
| dec/numeric | தசம எண் (துல்லிய இடங்களுடன்) |
| float/real | தசம எண் (approximate) |
| double | இரட்டை துல்லியம் கொண்ட தசம எண் |

**12.7.1 CREATE TABLE கட்டளை**

\`\`\`sql
CREATE TABLE <table_name> (
  <column_name1> <data type>(<size>),
  <column_name2> <data type>(<size>)
  ....
);
\`\`\`

எடுத்துக்காட்டு:
\`\`\`sql
CREATE TABLE Student (
  Adno integer,
  Name char(20),
  Gender char(1),
  Age integer,
  Place char(20)
);
\`\`\`

**12.7.2 கட்டுப்பாடுகளின் வகைகள் (Constraints)**

- **NOT NULL:** ஒரு நெடுவரிசைக்கு NULL மதிப்பு அனுமதிக்கப்படாது.
- **UNIQUE:** ஒரு நெடுவரிசையின் மதிப்புகள் தனித்துவமாக இருக்க வேண்டும்.
- **PRIMARY KEY:** ஒவ்வொரு வரிசையையும் தனித்துவமாக அடையாளப்படுத்தும், NOT NULL + UNIQUE இணைந்தது.
- **DEFAULT:** மதிப்பு கொடுக்கப்படாவிட்டால் ஒரு இயல்பு மதிப்பை அமைக்கும்.
- **CHECK:** ஒரு நிபந்தனையை பூர்த்தி செய்யும் மதிப்புகளை மட்டும் அனுமதிக்கும்.

எடுத்துக்காட்டு:
\`\`\`sql
CREATE TABLE Student (
  Adno integer PRIMARY KEY,
  Name char(20) NOT NULL,
  Gender char(1),
  Age integer CHECK (Age >= 0),
  Place char(20)
);
\`\`\``,
      nav: { back: "intro-sql-components", next: "dml-alter-drop", nextLabel: "அடுத்து: DML கட்டளைகள் & ALTER/DROP →" }
    },
    {
      id: "dml-alter-drop",
      title: "DML கட்டளைகள் & ALTER/TRUNCATE/DROP",
      content: `**12.7.3 DML கட்டளைகள்**

**INSERT கட்டளை:**
\`\`\`sql
INSERT INTO <table_name> [column-list] VALUES (<values>);
\`\`\`
\`\`\`sql
INSERT INTO Student (Adno, Name, Gender, Age, Place)
VALUES (100, 'Ashvik', 'M', 17, 'Chennai');
\`\`\`

**DELETE கட்டளை:**
\`\`\`sql
DELETE FROM <table_name> WHERE condition;
\`\`\`
\`\`\`sql
DELETE FROM Student WHERE Adno=104;
\`\`\`

**UPDATE கட்டளை:**
\`\`\`sql
UPDATE <table_name> SET column_name=value WHERE condition;
\`\`\`
\`\`\`sql
UPDATE Student SET Age=18 WHERE Place='Bangalore';
\`\`\`

**12.7.4 கூடுதல் DDL கட்டளைகள்**

**ALTER TABLE:** அட்டவணையின் அமைப்பை மாற்றியமைக்கும்.
\`\`\`sql
ALTER TABLE Student ADD column_name data_type;
ALTER TABLE Student MODIFY column_name data_type;
ALTER TABLE Student CHANGE old_col new_col data_type;
\`\`\`

**TRUNCATE TABLE:** அட்டவணையின் தரவுகளை மட்டும் நீக்கும் (கட்டமைப்பு அப்படியே இருக்கும்).
\`\`\`sql
TRUNCATE TABLE Student;
\`\`\`

**DROP TABLE:** அட்டவணை மற்றும் அதன் தரவுகளையும் முழுவதுமாக நீக்கும்.
\`\`\`sql
DROP TABLE Student;
\`\`\`

| கட்டளை | செயல் |
|---|---|
| DELETE | குறிப்பிட்ட வரிசைகளை மட்டும் நீக்கும் (WHERE உடன்) |
| TRUNCATE | அனைத்து வரிசைகளையும் நீக்கும், கட்டமைப்பு இருக்கும் |
| DROP | அட்டவணை முழுவதையும் நீக்கும் |`,
      nav: { back: "datatypes-create-table", next: "select-queries", nextLabel: "அடுத்து: SELECT — WHERE, ORDER BY, GROUP BY →" }
    },
    {
      id: "select-queries",
      title: "SELECT — WHERE, DISTINCT, ORDER BY, GROUP BY, HAVING",
      content: `**12.7.5 DQL — SELECT கட்டளை**

\`\`\`sql
SELECT column-name1, [column-name2, ...] FROM table-name [WHERE condition];
\`\`\`
\`\`\`sql
SELECT * FROM STUDENT;
SELECT Adno, Name FROM Student;
\`\`\`

**DISTINCT:** மீண்டும் வரும் மதிப்புகளை நீக்கி, தனித்துவமான மதிப்புகளை மட்டும் தரும்.
\`\`\`sql
SELECT DISTINCT Place FROM Student;
\`\`\`

**WHERE clause:** நிபந்தனையின்படி வரிசைகளை வடிகட்டும்.
\`\`\`sql
SELECT Adno, Name, Place FROM Student WHERE Place='Chennai';
SELECT Adno, Name, Age FROM Student WHERE Age >= 18;
\`\`\`

**BETWEEN / NOT BETWEEN:**
\`\`\`sql
SELECT Adno, Name, Age FROM Student WHERE Age BETWEEN 18 AND 19;
\`\`\`

**IN / NOT IN:**
\`\`\`sql
SELECT Adno, Name, Place FROM Student WHERE Place IN ('Chennai', 'Delhi');
\`\`\`

**NULL சோதனை:**
\`\`\`sql
SELECT * FROM Student WHERE column IS NULL;
\`\`\`

**ORDER BY clause:** முடிவுகளை ஏறு (ASC — இயல்பு) அல்லது இறங்கு (DESC) வரிசையில் வரிசைப்படுத்தும்.
\`\`\`sql
SELECT * FROM Student ORDER BY Name;
SELECT * FROM Student WHERE Age>=18 ORDER BY Name DESC;
\`\`\`

**GROUP BY clause:** ஒத்த மதிப்புகளைத் தொகுத்து சுருக்கமான தகவலை உருவாக்கும்.
\`\`\`sql
SELECT Gender, count(*) FROM Student GROUP BY Gender;
\`\`\`
வெளியீடு: M → 5, F → 3

**HAVING clause:** GROUP BY உடன் இணைந்து, தொகுக்கப்பட்ட முடிவுகளுக்கு நிபந்தனை வைக்கும்.
\`\`\`sql
SELECT Place, count(*) FROM Student GROUP BY Place HAVING Place='Chennai';
\`\`\``,
      nav: { back: "dml-alter-drop", next: "tcl-commands", nextLabel: "அடுத்து: TCL கட்டளைகள் →" }
    },
    {
      id: "tcl-commands",
      title: "TCL கட்டளைகள் (Transaction Control)",
      content: `**12.7.6 TCL கட்டளைகள் (Transaction Control Language)**

**12.7.6.1 COMMIT கட்டளை**

COMMIT கட்டளை, தரவுதளத்தில் நடந்த மாற்றங்களை (INSERT, UPDATE, DELETE) நிரந்தரமாக்கும்.

\`\`\`sql
COMMIT;
\`\`\`

**12.7.6.2 ROLLBACK கட்டளை**

ROLLBACK கட்டளை, கடைசி COMMIT முதல் ஏற்பட்ட மாற்றங்களைத் திரும்பப் பெறும் — SAVEPOINT வரையிலும் திரும்பப் பெறலாம்.

\`\`\`sql
ROLLBACK;
ROLLBACK TO savepoint_name;
\`\`\`

**12.7.6.3 SAVEPOINT கட்டளை**

SAVEPOINT கட்டளை ஒரு தற்காலிக புள்ளியை நிர்ணயிக்கும் — பின்னர் ROLLBACK-ஐ அந்த புள்ளிக்கு மட்டும் திரும்பப் பெறலாம் (முழுமையாக அல்ல).

\`\`\`sql
SAVEPOINT savepoint_name;
INSERT INTO Student VALUES (107, 'Reena', 'F', 20, 'Cochin');
COMMIT;
\`\`\`

இந்த மூன்று TCL கட்டளைகளும் இணைந்து, தரவுதள பரிமாற்றங்களை (Transactions) பாதுகாப்பாகவும் கட்டுப்படுத்தப்பட்ட முறையிலும் நிர்வகிக்க உதவுகின்றன.`,
      nav: { back: "select-queries", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- SQL (Structured Query Language) தரவுதள மேலாண்மை அமைப்புகளுடன் தொடர்பு கொள்ளப் பயன்படும் தரப்படுத்தப்பட்ட மொழி.
- SQL-ன் நான்கு கூறுகள்: DDL, DML, DCL, TCL.
- DDL கட்டளைகள்: CREATE, ALTER, DROP, TRUNCATE.
- DML கட்டளைகள்: INSERT, UPDATE, DELETE.
- SELECT கட்டளை DQL-ஐச் சேர்ந்தது — WHERE, DISTINCT, BETWEEN, IN, ORDER BY, GROUP BY, HAVING ஆகிய clauses-உடன் பயன்படுத்தப்படும்.
- NOT NULL, UNIQUE, PRIMARY KEY, DEFAULT, CHECK ஆகியவை முக்கிய கட்டுப்பாடுகள் (Constraints).
- TCL கட்டளைகள் (COMMIT, ROLLBACK, SAVEPOINT) தரவுதள பரிமாற்றங்களை நிர்வகிக்கும்.`,
      nav: { back: "tcl-commands", practice: true }
    },
  ],
}
