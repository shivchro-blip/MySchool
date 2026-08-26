export default {
  chapterNumber: 11,
  title: "தரவுதள கருத்துருக்கள்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-data-database",
      title: "தரவு, தகவல் & தரவுதள மேலாண்மை அமைப்பு",
      content: `**11.1 – 11.3 தரவு, தகவல் — அறிமுகம்**

**தரவு (Data):** செயலாக்கப்படாத மூலப் புள்ளிவிவரங்கள் — எடுத்துக்காட்டு: 600000, LVI, SGLKZ போன்ற தனித்த மதிப்புகள்.

**தகவல் (Information):** செயலாக்கப்பட்ட, அர்த்தமுள்ள வடிவில் அமைந்த தரவு — முடிவெடுக்க உதவும்.

**11.4 தரவுதள மேலாண்மை அமைப்பு (DBMS)**

DBMS என்பது தரவுகளையும் தகவல்களையும் ஒழுங்கமைந்த முறையில் சேமிக்கவும், நிர்வகிக்கவும், அணுகவும் பயன்படும் மென்பொருள் அமைப்பாகும்.

**11.4.1 RDBMS (Relational Database Management System)**

RDBMS-ல் பொதுவான கலைச்சொற்கள்: அட்டவணை (Table), வரிசை/பதிவு (Row/Record), புலம்/நெடுவரிசை (Field/Column), டொமைன் (Domain), கட்டுப்பாடு (Constraint), முதன்மை திறவுகோல் (Primary Key).

**11.5 தரவுதளக் கூறுகள்**

1. வன்பொருள் (Hardware)
2. மென்பொருள் (Software)
3. தரவு (Data)
4. நடைமுறைகள் (Procedures)
5. தரவுதள மொழிகள் (Query, DML, DDL)`,
      nav: { next: "database-structure-datamodel", nextLabel: "அடுத்து: தரவுதள அமைப்பு & மாதிரிகள் →" }
    },
    {
      id: "database-structure-datamodel",
      title: "தரவுதள மாதிரிகள்",
      content: `**11.6 தரவு அமைப்பு (Data Models)**

**11.6.1 படிநிலை மாதிரி (Hierarchical Model)**

தரவை மரம் போன்ற (Tree) படிநிலை அமைப்பில் — பெற்றோர்-குழந்தை (Parent-Child) உறவாக ஒழுங்கமைக்கும் மாதிரி.

\`\`\`
School
├── Course
│   ├── Theory
│   └── Lab
└── Resources
\`\`\`

**11.6.2 வலைப்பின்னல் மாதிரி (Network Model)**

படிநிலை மாதிரியின் விரிவாக்கம் — ஒரு பதிவு பல பெற்றோர்களைக் கொண்டிருக்கலாம் (Many-to-Many உறவு உருவாக்கலாம்).

\`\`\`
School
├── Library
├── Office
├── Staff Room
└── Student
\`\`\`

**11.6.3 தொடர்பு மாதிரி (Relational Model)**

E.F. Codd 1970-இல் உருவாக்கியது — தரவுகளை அட்டவணைகளாக (Tables) சேமிக்கும் மாதிரி, இன்று மிகவும் பரவலாகப் பயன்படுத்தப்படுகிறது.

| Std_id | Name | Age |
|---|---|---|
| 1 | Malar | 17 |
| 2 | Suresh | 16 |

**ER மாதிரி (Entity Relationship Model)**

Doctor — treats — Patient — has — Diagnosis போன்ற உறுப்பொருள்களுக்கிடையேயான உறவுகளை வரைபடமாகக் காட்டும்.

**பொருள் நோக்கு தரவுதள மாதிரி (Object Model)**

Shape (get_perimeter()) → Circle, Rectangle, Triangle போன்ற பொருள் வழி-தோன்றல் (Inheritance) கருத்துருவை அடிப்படையாகக் கொண்டது.`,
      nav: { back: "intro-data-database", next: "dbms-vs-rdbms", nextLabel: "அடுத்து: DBMS vs RDBMS & உறவு வகைகள் →" }
    },
    {
      id: "dbms-vs-rdbms",
      title: "DBMS vs RDBMS & உறவு வகைகள்",
      content: `**11.6.2 DBMS பயனாளர் வகைகள்**

**தரவுதள நிர்வாகி (DBA — Database Administrator):** தரவுதளத்தை நிர்வகிக்கும், பாதுகாப்பு மற்றும் அணுகல் உரிமைகளை வழங்கும் பொறுப்பு கொண்டவர்.

**11.7 DBMS-க்கும் RDBMS-க்கும் இடையேயான வேறுபாடு**

| ஒப்பீடு | DBMS | RDBMS |
|---|---|---|
| விளக்கம் | தரவுதள மேலாண்மை அமைப்பு | உறவு நிலை தரவுதள மேலாண்மை அமைப்பு |
| தரவு சேமிப்பு | கோப்பு அமைப்பில் | அட்டவணைகளாக |
| தரவு தொடர்பு | குறைவு | முதன்மை/வெளிக் திறவுகோல் மூலம் தொடர்பு |
| உதாரணம் | Dbase, FoxPro | MySQL, Oracle, SQL Server, PostgreSQL |

**11.8 உறவுகளின் வகைகள் (Types of Relationships)**

1. **ஒற்றை-ஒற்றை உறவு (One-to-One):** ஒரு உறுப்பொருள் மற்றொரு உறுப்பொருளுடன் மட்டும் தொடர்புடையது.
2. **ஒற்றை-பல உறவு (One-to-Many):** ஒரு உறுப்பொருள் பல உறுப்பொருள்களுடன் தொடர்புடையது (எ.கா. ஒரு மாணவர் — பல தேர்வு எண்கள்).
3. **பல-ஒற்றை உறவு (Many-to-One):** பல உறுப்பொருள்கள் ஒரு உறுப்பொருளுடன் தொடர்புடையது.
4. **பல-பல உறவு (Many-to-Many):** பல உறுப்பொருள்கள் பல உறுப்பொருள்களுடன் தொடர்புடையது (எ.கா. Staff — Department).`,
      nav: { back: "database-structure-datamodel", next: "relational-algebra", nextLabel: "அடுத்து: உறவுநிலை இயற்கணிதம் →" }
    },
    {
      id: "relational-algebra",
      title: "உறவுநிலை இயற்கணிதம் (Relational Algebra)",
      content: `**11.9 உறவுநிலை இயற்கணிதம் என்றால் என்ன?**

உறவுநிலை இயற்கணிதம் (Relational Algebra) என்பது அட்டவணைகளின் (Relations/Tables) மீது செயல்படும் செயல்பாடுகளின் தொகுப்பாகும் — இது தரவுதள வினவல்களின் கோட்பாட்டு அடிப்படையாகும்.

**11.9.1 SELECT (σ)**

கொடுக்கப்பட்ட நிபந்தனையின்படி, ஒரு அட்டவணையிலிருந்து குறிப்பிட்ட வரிசைகளை (Tuples) மட்டும் தேர்வு செய்யப் பயன்படும் — SQL-ன் WHERE clause போன்றது.

\`\`\`
σ Course="Big Data" (STUDENT)
\`\`\`

STUDENT அட்டவணை:
| Studno | Name | Course | Year |
|---|---|---|---|
| cs1 | Kannan | Big Data | II |
| cs2 | Gowri Shankar | R Language | I |
| cs3 | Lenin | Big Data | II |
| cs4 | Padmaja | Python Programming | I |

வெளியீடு (σ Course="Big Data"):
| Studno | Name | Course | Year |
|---|---|---|---|
| cs1 | Kannan | Big Data | II |
| cs3 | Lenin | Big Data | II |

**11.9.2 PROJECT (Π)**

கொடுக்கப்பட்ட நெடுவரிசைகளை (Columns/Attributes) மட்டும் தேர்வு செய்யப் பயன்படும்.

\`\`\`
Π Course (STUDENT)
\`\`\`
வெளியீடு: Big Data, R Language, Python Programming (தனித்துவமான Course மதிப்புகள்)

**Set தேற்றங்கள் (Set Operators)**

Union (∪), Intersection, Difference, Cartesian Product ஆகிய கணிதவியல் Set செயல்பாடுகளும் இரு அட்டவணைகளுக்கிடையே பயன்படுத்தப்படலாம் — அட்டவணைகளின் அமைப்பு (Schema) ஒத்திருக்க வேண்டும்.`,
      nav: { back: "dbms-vs-rdbms", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- தரவு (Data) செயலாக்கப்படாத மூலப் புள்ளிவிவரம்; தகவல் (Information) செயலாக்கப்பட்ட, அர்த்தமுள்ள வடிவம்.
- DBMS தரவுகளை ஒழுங்கமைந்த முறையில் சேமிக்கவும், நிர்வகிக்கவும் பயன்படும் மென்பொருள்.
- தரவுதள மாதிரிகள்: படிநிலை (Hierarchical), வலைப்பின்னல் (Network), தொடர்பு (Relational), ER மாதிரி, பொருள் நோக்கு (Object) மாதிரி.
- RDBMS தரவை அட்டவணைகளாக சேமித்து, திறவுகோல்கள் மூலம் தொடர்பை நிலைநாட்டும்.
- உறவுகளின் நான்கு வகைகள்: ஒற்றை-ஒற்றை, ஒற்றை-பல, பல-ஒற்றை, பல-பல.
- உறவுநிலை இயற்கணிதத்தில் SELECT (σ) வரிசைகளைத் தேர்வு செய்யும், PROJECT (Π) நெடுவரிசைகளைத் தேர்வு செய்யும்.`,
      nav: { back: "relational-algebra", practice: true }
    },
  ],
}
