export default {
  chapterNumber: 15,
  title: "SQL மூலம் தரவுகளைக் கையாளுதல்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-sqlite-setup",
      title: "அறிமுகம் & SQLite அட்டவணை உருவாக்கம்",
      content: `**15.1 அறிமுகம்**

Python மொழியிலிருந்தே ஒரு தரவுதளத்தை உருவாக்கவும், தரவுகளை சேமிக்கவும், அணுகவும், புதுப்பிக்கவும் SQL பயன்படுத்தப்படுகிறது.

**15.3.3 SQLite**

SQLite என்பது ஒரு லேசான (Lightweight), Server-less தரவுதள மேலாண்மை அமைப்பாகும் — Python-ல் sqlite3 தொகுதி built-in ஆக உள்ளது. SQLite ஒரு ஒற்றைக் கோப்பு தரவுதளமாக இயங்குகிறது.

**15.3.1 தரவுதளத்துடன் இணைப்பை நிறுவுதல்**

\`\`\`python
import sqlite3
connection = sqlite3.connect('AcademyDB')
cursor = connection.cursor()
\`\`\`

**அட்டவணையை உருவாக்குதல்:**

\`\`\`python
sql_command = """CREATE TABLE STUDENT (
    Rollno INTEGER PRIMARY KEY,
    Sname VARCHAR(20),
    Grade CHAR(1),
    Gender CHAR(1),
    Average DECIMAL(3,2),
    birth_date DATE);"""
cursor.execute(sql_command)
\`\`\`

**15.3.2.2 பதிவுகளைச் செருகுதல் (INSERT)**

\`\`\`python
student_data = [
    ('BASKAR', 'C', 'M', 75.2, '1998-05-17'),
    ('SAJINI', 'A', 'F', 86.4, '2002-11-01'),
    ('VARUN', 'B', 'M', 86.0, '2001-03-14')
]
for p in student_data:
    format_str = """INSERT INTO Student (Rollno, Sname, Grade, gender, Average, birth_date)
                     VALUES (NULL, '{name}', '{grd}', '{gender}', '{avg}', '{birthdate}');"""
    sql_command = format_str.format(name=p[0], grd=p[1], gender=p[2], avg=p[3], birthdate=p[4])
    cursor.execute(sql_command)

connection.commit()
connection.close()
print('RECORDS ADDED TO STUDENT TABLE')
\`\`\``,
      nav: { next: "select-fetch-methods", nextLabel: "அடுத்து: SELECT வினவல்கள் & Fetch முறைகள் →" }
    },
    {
      id: "select-fetch-methods",
      title: "SELECT வினவல்கள் & Fetch முறைகள்",
      content: `**15.4 SELECT கூற்று**

SELECT ஆனது SQL-ல் மிக அதிகமாகப் பயன்படுத்தப்படும் கூற்றாகும் — அட்டவணையிலிருந்து தரவை தேர்வு செய்யப் பயன்படும்.

**15.4.1 fetchall() — அனைத்து பதிவுகளையும் பெறுதல்**

\`\`\`python
import sqlite3
connection = sqlite3.connect('Academy.db')
cursor = connection.cursor()
cursor.execute('SELECT * FROM Student')
result = cursor.fetchall()
for i in result:
    print(i)
\`\`\`

**15.4.1.2 fetchone() — ஒரே ஒரு பதிவை மட்டும் பெறுதல்**

fetchone() ஒரே ஒரு பதிவை மட்டும் திருப்பித் தரும் — அடுத்த முறை அழைக்கும்போது அடுத்த பதிவை திருப்பித் தரும்.

\`\`\`python
cursor.execute('SELECT * FROM student')
print(cursor.fetchone())
\`\`\`

**15.4.1.3 fetchmany(n) — குறிப்பிட்ட எண்ணிக்கையிலான பதிவுகளைப் பெறுதல்**

\`\`\`python
cursor.execute('SELECT * FROM student')
result = cursor.fetchmany(3)   # முதல் 3 பதிவுகள்
for row in result:
    print(row)
\`\`\``,
      nav: { back: "intro-sqlite-setup", next: "clauses-operators", nextLabel: "அடுத்து: SQL Clauses & AND/OR/NOT →" }
    },
    {
      id: "clauses-operators",
      title: "SQL Clauses, AND/OR/NOT & தேதி வினவல்கள்",
      content: `**15.4.2 SQL-ல் தணைவகைகள் (Clauses)**

DISTINCT, WHERE, GROUP BY, ORDER BY, HAVING.

**DISTINCT:** மீண்டும் வரும் மதிப்புகளை நீக்கும்.
\`\`\`python
cursor.execute('SELECT DISTINCT(Grade) FROM student')
\`\`\`

**WHERE:** நிபந்தனையின்படி வடிகட்டும்.
\`\`\`python
cursor.execute("SELECT DISTINCT(Grade) FROM student WHERE gender='M'")
\`\`\`

**GROUP BY:** ஒத்த மதிப்புகளைத் தொகுக்கும், COUNT/MAX/MIN/SUM/AVG உடன் இணைந்து பயன்படும்.
\`\`\`python
cursor.execute("SELECT gender, count(gender) FROM student GROUP BY gender")
# வெளியீடு: ('F', 2), ('M', 3)
\`\`\`

**ORDER BY:** முடிவுகளை வரிசைப்படுத்தும் (இயல்பாக ஏறுவரிசை).
\`\`\`python
cursor.execute("SELECT Rollno, sname FROM student ORDER BY sname")
\`\`\`

**HAVING:** GROUP BY-க்குப் பிறகு தொகுக்கப்பட்ட முடிவுகளுக்கு நிபந்தனை வைக்கும்.
\`\`\`python
cursor.execute("SELECT gender, COUNT(GENDER) FROM student GROUP BY gender HAVING count(gender) > 2")
\`\`\`

**15.5.5 AND, OR, NOT செயற்குறிகள்**

\`\`\`python
cursor.execute("SELECT * FROM student WHERE Grade='C' AND Gender='M'")
cursor.execute("SELECT * FROM student WHERE Average>60 OR Average>90")
\`\`\`

**தேதி வினவல் (Date Query):**
\`\`\`python
cursor.execute("SELECT Rollno,sname,grade FROM student WHERE birth_date > '2001-01-01' AND birth_date < '2001-12-31'")
\`\`\``,
      nav: { back: "select-fetch-methods", next: "aggregate-update-delete", nextLabel: "அடுத்து: திரட்டல் செயற்கூறுகள், UPDATE, DELETE →" }
    },
    {
      id: "aggregate-update-delete",
      title: "திரட்டல் செயற்கூறுகள், UPDATE, DELETE",
      content: `**15.7 திரட்டல் செயற்கூறுகள் (Aggregate Functions)**

COUNT(), AVG(), SUM(), MAX(), MIN().

\`\`\`python
cursor.execute("SELECT COUNT(*) FROM student")     # [(7,)]
cursor.execute("SELECT AVG(AVERAGE) FROM student")  # சராசரி
cursor.execute("SELECT SUM(AVERAGE) FROM student")  # கூட்டுத்தொகை
cursor.execute("SELECT sname, MAX(AVERAGE) FROM student")  # அதிகபட்ச மதிப்பு
cursor.execute("SELECT sname, MIN(AVERAGE) FROM student")  # குறைந்தபட்ச மதிப்பு
\`\`\`

**குறிப்பு:** NULL மதிப்புகள் COUNT(), AVG() போன்ற திரட்டல் செயற்கூறுகளால் கணக்கிடப்படாது.

**15.8 பதிவுகளைப் புதுப்பித்தல் (UPDATE)**

\`\`\`python
import sqlite3
conn = sqlite3.connect('AcademyDB')
conn.execute("UPDATE Student SET sname='Priyanka' WHERE RollNo=6")
conn.commit()
print("Total number of rows updated:", conn.total_changes)
for row in conn.execute("SELECT * FROM student"):
    print(row)
conn.close()
\`\`\`

**15.9 பதிவுகளை நீக்குதல் (DELETE)**

\`\`\`python
import sqlite3
conn = sqlite3.connect('AcademyDB')
conn.execute("DELETE FROM Student WHERE RollNo=2")
conn.commit()
print("Total number of rows deleted:", conn.total_changes)
cursor = conn.execute("SELECT * FROM Student")
for row in cursor:
    print(row)
conn.close()
\`\`\`

**15.10 பயனரிடமிருந்து உள்ளீடு பெறுதல்**

\`\`\`python
import sqlite3
con = sqlite3.connect('Academydb')
cur = con.cursor()
cur.execute("CREATE TABLE Person(name, age, id)")
for i in range(5):
    name = input("Enter name: ")
    age = int(input("Enter age: "))
    cur.execute("INSERT INTO Person VALUES (?,?,?)", (name, age, i+1))
con.commit()
cur.execute("SELECT * FROM Person")
print(cur.fetchall())
\`\`\``,
      nav: { back: "clauses-operators", next: "joining-csv-export", nextLabel: "அடுத்து: பல அட்டவணைகள் & CSV ஒருங்கிணைப்பு →" }
    },
    {
      id: "joining-csv-export",
      title: "பல அட்டவணைகளை வினவுதல் & CSV ஒருங்கிணைப்பு",
      content: `**15.11 பல அட்டவணைகளைப் பயன்படுத்தி வினவுதல்**

இரு அட்டவணைகளிலிருந்தும் தொடர்புடைய தரவை ஒன்றாகப் பெற, அட்டவணைகளை இணைத்து (Join) வினவலாம்.

\`\`\`python
import sqlite3
connection = sqlite3.connect('Academy.db')
cursor = connection.cursor()

sql_command = """CREATE TABLE Appointment (
    Rollno INTEGER, Duty VARCHAR(10), age INT);"""
cursor.execute(sql_command)

cursor.execute("INSERT INTO Appointment (Rollno,Duty,age) VALUES (1,'Prefect',17)")
cursor.execute("INSERT INTO Appointment (Rollno,Duty,age) VALUES (2,'Secretary',16)")
connection.commit()

cursor.execute("""SELECT student.Rollno, student.Sname, Appointment.Duty, Appointment.age
                   FROM student, Appointment
                   WHERE student.Rollno = Appointment.Rollno""")
result = cursor.fetchall()
for row in result:
    print(row)
\`\`\`
வெளியீடு: (1, 'Akshay', 'Prefect', 17), (2, 'Aravind', 'Secretary', 16)

**15.12 CSV கோப்புகளுடன் ஒருங்கிணைப்பு**

SQL வினவலின் (Query) முடிவுகளை நேரடியாக ஒரு CSV கோப்பாக ஏற்றுமதி செய்யலாம் — இதன் மூலம் SQL தரவுதளத் தகவலை பிற அமைப்புகளுடன் எளிதாகப் பகிர்ந்துகொள்ளலாம். csv.writer() மற்றும் SQL fetchall() ஆகியவற்றை இணைத்துப் பயன்படுத்தி, தேவைப்பட்ட வினவல் முடிவுகளை CSV வடிவில் சேமிக்கலாம்.`,
      nav: { back: "aggregate-update-delete", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- Python-ன் sqlite3 தொகுதி SQLite தரவுதளங்களை உருவாக்கவும், கையாளவும் பயன்படுகிறது.
- cursor.execute() ஒரு SQL கட்டளையை இயக்கும்; fetchall(), fetchone(), fetchmany(n) ஆகியவை முடிவுகளைப் பெறும் முறைகள்.
- DISTINCT, WHERE, GROUP BY, ORDER BY, HAVING ஆகியவை SQL தணைவகைகள்.
- AND, OR, NOT ஆகியவை பல நிபந்தனைகளை இணைக்க பயன்படும்.
- COUNT(), AVG(), SUM(), MAX(), MIN() ஆகியவை திரட்டல் செயற்கூறுகள்.
- connection.commit() மாற்றங்களை நிரந்தரமாக்கும்; connection.close() இணைப்பை மூடும்.
- பல அட்டவணைகளையும் இணைத்து (WHERE condition மூலம்) ஒன்றாக வினவலாம்.`,
      nav: { back: "joining-csv-export", practice: true }
    },
  ],
}
