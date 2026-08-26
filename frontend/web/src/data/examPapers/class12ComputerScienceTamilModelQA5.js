// frontend/web/src/data/examPapers/class12ComputerScienceTamilModelQA5.js

export const class12ComputerScienceTamilModelQA5 = {
  paperId:      "class12-computer-science-tamil-model-qa-5",
  title:        "மாதிரி வினா-விடை 5",
  classLabel:   "வகுப்பு 12",
  subject:      "கணினி அறிவியல் (தமிழ்)",
  duration:     "3.00 மணி நேரம்",
  maximumMarks: 90,
  totalPages:   6,

  pages: [
    {
      pageNumber: 1,
      blocks: [
        { type: "paper_header", content: "வகுப்பு XII — கணினி அறிவியல்\nமாதிரி வினாத்தாள் — தொகுப்பு 5" },
        { type: "metadata_row", duration: "3.00 மணி நேரம்", maximumMarks: 90, totalPages: 6 },
        { type: "instructions", content: "அனைத்து வினாக்களுக்கும் விடையளிக்கவும்." },
        { type: "part_heading", content: "பகுதி - I" },
        { type: "section_heading", content: "சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக (20 × 1 = 20)" },

        { type: "mcq_question", questionId: "1", marks: 1, content: "செயற்கூறு எடுக்கும் அளபுருக்களையும் அது வழங்கும் விடையின் வகையையும் குறிப்பது எது?", options: ["செயல்படுத்துதல் (Implementation)", "இடைமுகம் (Interface)", "பக்க விளைவு", "தரப்படுத்தல்"] },
        { type: "mcq_question", questionId: "2", marks: 1, content: "ஆக்கிகள் (Constructors) என்பன எவற்றை உருவாக்குகின்றன?", options: ["பழைய பொருள்கள்", "புதிய தரவுப் பொருள்கள்", "தெரிவுச்சிகள்", "மதிப்பிலா பொருள்கள்"] },
        { type: "mcq_question", questionId: "3", marks: 1, content: "பெயருக்கு முன் இரட்டை அடிக்கோடு (__) இட்டு குறிக்கப்படும் அணுகல் நிலை எது?", options: ["public", "protected", "private", "global"] },
        { type: "mcq_question", questionId: "4", marks: 1, content: "நேரச் சிக்கல்தன்மை (Time Complexity) என்பது எதைக் குறிக்கிறது?", options: ["நிரலின் நீளம்", "நிரல் இயங்குவதற்கு எடுத்துக்கொள்ளும் நேரம்", "நிரலின் அளவு", "நிரலின் பிழைகள்"] },
        { type: "mcq_question", questionId: "5", marks: 1, content: "Python-இல் print() செயற்குறிக்குக் கொடுக்கப்பட்ட அளபுருக்கள் இயல்பாக எதனால் பிரிக்கப்படும்?", options: ["காற்புள்ளி", "வெற்றிடம் (Space)", "அரைப்புள்ளி", "தத்தல்"] },
        { type: "mcq_question", questionId: "6", marks: 1, content: "Python-இல் ஒரு செயற்கூறை வரையறை செய்வதற்கான சரியான கட்டளை எது?", options: ["function functionname(){ }", "def functionname():", "def myFunction(){}", "மேற்கண்ட எதுவுமில்லை"] },
        { type: "mcq_question", questionId: "7", marks: 1, content: "இயங்கு நிரலாக்க வழிமுறையில் மறுபடியும் கணக்கிடுவதைத் தவிர்க்க பயன்படும் நுட்பம் எது?", options: ["Recursion", "Memoization", "Sorting", "Searching"] },
        { type: "mcq_question", questionId: "8", marks: 1, content: "Python-இல் Boolean தரவு வகை எந்த இரு மதிப்புகளில் ஒன்றை மட்டும் கொண்டிருக்கும்?", options: ["0/1", "True/False", "Yes/No", "High/Low"] },
        { type: "mcq_question", questionId: "9", marks: 1, content: "நேர்நோக்கிய குறியீட்டு எண் மற்றும் எதிர்நோக்கிய குறியீட்டு எண் தொடங்கும் மதிப்புகள் எவை?", options: ["0, 1", "1, -1", "0, -1", "-1, 0"] },
        { type: "mcq_question", questionId: "10", marks: 1, content: "Set-ல் மீண்டும் மீண்டும் வரும் மதிப்புகள் எவ்வாறு கையாளப்படுகின்றன?", options: ["அப்படியே வைக்கப்படும்", "தானாக நீக்கப்படும்", "பிழை ஏற்படும்", "மறுபடி காட்டப்படும்"] },
        { type: "mcq_question", questionId: "11", marks: 1, content: "Python-இல் Class மற்றும் Object பற்றி பேசும் பாடநெறி என்ன வகை மொழியைக் குறிக்கிறது?", options: ["Procedural", "Object Oriented Programming Language", "Functional", "Assembly"] },
        { type: "mcq_question", questionId: "12", marks: 1, content: "தொடர்பு மாதிரியில் தரவு எவ்வாறு சேமிக்கப்படுகிறது?", options: ["மரம் போன்று", "வலைப்பின்னலாக", "அட்டவணைகளாக", "பட்டியலாக"] },
        { type: "mcq_question", questionId: "13", marks: 1, content: "SQL-இல் ஒரு நெடுவரிசைக்கு NULL மதிப்பு அனுமதிக்கப்படாது என்பதைக் குறிக்கும் கட்டுப்பாடு எது?", options: ["UNIQUE", "DEFAULT", "NOT NULL", "CHECK"] },
        { type: "mcq_question", questionId: "14", marks: 1, content: "CSV கோப்பில் தரவு மதிப்புகளுக்கிடையேயான பிரிப்புக் குறியீடு எது (இயல்பாக)?", options: ["அரைப்புள்ளி (;)", "காற்புள்ளி (,)", "தத்தல் (Tab)", "சுழி (|)"] },
        { type: "mcq_question", questionId: "15", marks: 1, content: "Python-ஆனது நினைவகத்தை தானாகவே நிர்வகிக்கும் நுட்பம் என்ன எனப்படும்?", options: ["Compilation", "Garbage Collection", "Linking", "Wrapping"] },
        { type: "mcq_question", questionId: "16", marks: 1, content: "SQLite எந்த வகை தரவுதள மேலாண்மை அமைப்பு?", options: ["Lightweight, Server-less", "Heavyweight, Server-based", "Cloud-only", "Distributed"] },
        { type: "mcq_question", questionId: "17", marks: 1, content: "வரைபடத்தை காப்பாற்ற (Save) பயன்படும் Matplotlib கருவிப்பட்டை பொத்தான் எது?", options: ["Home Button", "Pan Axis Button", "Save Figure Button", "Zoom Button"] },
        { type: "mcq_question", questionId: "18", marks: 1, content: "Python-இல் while மடக்கு எந்த வகை மடக்கு?", options: ["நுழைவு சோதிப்பு loop", "வெளியேறும் சோதிப்பு loop", "foreach loop", "சுற்று loop"] },
        { type: "mcq_question", questionId: "19", marks: 1, content: "பட்டியலில் ஒரு உறுப்பு இருக்கிறதா எனச் சரிபார்க்க, பட்டியலை வரிசைப்படுத்தும் தேவை இல்லாத தேடல் நுட்பம் எது?", options: ["Linear Search", "Binary Search", "Merge Sort", "Selection Sort"] },
        { type: "mcq_question", questionId: "20", marks: 1, content: "Python-இல் ஒரு செயற்கூறு தன்னைத்தானே அழைத்துக்கொள்வது என்ன எனப்படுகிறது?", options: ["Composition", "Recursion", "Iteration", "Abstraction"] },

        { type: "footer_note", content: "[ மேல் பக்கம் காண்க" },
      ],
    },
    {
      pageNumber: 2,
      blocks: [
        { type: "part_heading", content: "பகுதி - II" },
        { type: "section_heading", content: "சிறு விடை வினாக்கள் (5 × 2 = 10)" },

        { type: "question", questionId: "21", marks: 2, content: "இடைமுகத்திற்கும் (Interface) செயல்படுத்துதலுக்கும் (Implementation) உள்ள வேறுபாட்டைக் கூறு." },
        { type: "question", questionId: "22", marks: 2, content: "நெறிமுறையின் ஆறு பண்புகளையும் பெயரிடுக." },
        { type: "question", questionId: "23", marks: 2, content: "மறுநிகழ்வு செயற்கூறு (Recursive Function) என்றால் என்ன?" },
        { type: "question", questionId: "24", marks: 2, content: "Pair என்றால் என்ன?" },
        { type: "question", questionId: "25", marks: 2, content: "தரவுதளக் கூறுகளை (Components of Database) பட்டியலிடுக." },

        { type: "part_heading", content: "பகுதி - III" },
        { type: "section_heading", content: "குறு விடை வினாக்கள் (5 × 3 = 15)" },

        { type: "question", questionId: "26", marks: 3, content: "public, protected, மற்றும் private அணுகல் நிலைகளை வேறுபடுத்துக." },
        { type: "question", questionId: "27", marks: 3, content: "Asymptotic குறியீடுகளை (Big O, Big Omega, Big Theta) விளக்குக." },
        { type: "question", questionId: "28", marks: 3, content: "Python-ல் உள்ள பல்வேறு செயற்குறிகளை (Arithmetic, Relational, Logical, Assignment) பட்டியலிடுக." },
        { type: "question", questionId: "29", marks: 3, content: "DBMS-க்கும் RDBMS-க்கும் இடையேயான வேறுபாடுகளை விளக்குக." },
        {
          type: "or_question", questionId: "30", marks: 3,
          optionA: { content: "Escape Sequences (விடுபடு தொடர்) என்றால் என்ன? இரு எடுத்துக்காட்டுகள் தருக." },
          optionB: { content: "MinGW/g++ கம்பைலரின் பயனை விளக்குக." },
        },

        { type: "part_heading", content: "பகுதி - IV" },
        { type: "section_heading", content: "விரிவான வினாக்கள் (5 × 9 = 45)" },

        { type: "question", questionId: "31", marks: 9, content: "gcd (Greatest Common Divisor) செயற்கூறை பின்வருமாறு கருதுக: let rec gcd a b := if b <> 0 then gcd b (a mod b) else a. இதன் (அ) செயற்கூறு விவரக்குறிப்பு (ஆ) மீளாக்க செயல்பாடு (இ) இடைமுகம் மற்றும் செயல்படுத்துதல் ஆகியவற்றை விவரி." },
        {
          type: "or_question", questionId: "31", marks: 9,
          optionA: { content: "Python-இல் உள்ள செயற்குறி வகைகளை (Arithmetic, Relational, Logical, Assignment) ஒவ்வொன்றுக்கும் எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
          optionB: { content: "Python-இல் உள்ள நான்கு வகையான செயலுருபுகளையும் (Function Arguments) எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "32", marks: 9, content: "Public மற்றும் Private தரவு உறுப்பினர்களை ஒரு முழுமையான எடுத்துக்காட்டுடன் ஒப்பிட்டு விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "32", marks: 9,
          optionA: { content: "Class Methods-ஐ Student class-ன் மதிப்பெண் கணக்கீடு எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
          optionB: { content: "நெறிமுறையை பகுப்பாய்வு செய்வது ஏன் முக்கியம்? Time மற்றும் Space Complexity கருத்துருக்களுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "33", marks: 9, content: "தரவுதள மாதிரிகளை (Hierarchical, Network, Relational, ER, Object) விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "33", marks: 9,
          optionA: { content: "உறவுநிலை இயற்கணிதத்தில் SELECT (σ) மற்றும் PROJECT (Π) செயல்பாடுகளை ஒரு முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
          optionB: { content: "SQL-ன் நான்கு கூறுகளையும் (DDL, DML, DCL, TCL) அவற்றின் கட்டளைகளுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "34", marks: 9, content: "sys, os, getopt ஆகிய மூன்று தொகுதிகளையும் ஒரு முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "34", marks: 9,
          optionA: { content: "CSV கோப்பினை உருவாக்கும் இரு வழிமுறைகளையும் (Notepad, MS Excel) வடிவமைப்பு விதிகளுடன் விரிவாக விளக்குக." },
          optionB: { content: "Python-ஐ C++-டன் இணைக்கும் கருவிகளை (Python C API, Ctypes, SWIG, Cython, Boost.Python) ஒவ்வொன்றுக்கும் சுருக்கமாக விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "35", marks: 9, content: "Matplotlib-ஐப் பயன்படுத்தி கோட்டு வரைபடம், பட்டை வரைபடம், வட்ட வரைபடம் ஆகிய மூன்றையும் ஒவ்வொன்றுக்கும் முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "35", marks: 9,
          optionA: { content: "Python-ல் SQLite தரவுதளத்தை உருவாக்கி, அட்டவணையை உருவாக்கி, பதிவுகளைச் செருகும் முழுமையான நிரலை விரிவாக விளக்குக." },
          optionB: { content: "Histogram மற்றும் Bar Graph-ஐ ஒப்பிட்டு, ஒவ்வொன்றுக்கும் பொருத்தமான பயன்பாட்டு சூழலையும் விரிவாக விளக்குக." },
        },

        { type: "footer_note", content: "- o O o -" },
      ],
    },
  ],

  practice: {
    meta: {
      subject:      "கணினி அறிவியல் (தமிழ்) — வகுப்பு 12",
      unit:         "மாதிரி வினா-விடை 5 — முழுப் பாடத்திட்டம்",
      time:         "3.00 மணி நேரம்",
      totalMarks:   90,
      instructions: "அனைத்து வினாக்களுக்கும் விடையளிக்கவும்",
      answerSource: "தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 12 கணினி அறிவியல் (தமிழ் வழி) பாடநூலிலிருந்து தயாரிக்கப்பட்ட மாதிரி விடைகள் (2024 பதிப்பு).",
    },
    parts: [
      {
        id: "p1",
        navLabel: "பகுதி I — பலவுள் தேர்வு (20 × 1)",
        title: "பகுதி I — புறவயமான வினாக்கள்",
        type: "mcq",
        scoreMax: 20,
        marksPer: 1,
        instruction: "சரியான விடையைத் தேர்ந்தெடுக்கவும்.",
        sections: [
          {
            label: "அனைத்துப் பாடங்கள்",
            questions: [
              { id: "q1", html: "செயற்கூறு எடுக்கும் அளபுருக்களையும் அது வழங்கும் விடையின் வகையையும் குறிப்பது எது?", options: ["அ) செயல்படுத்துதல் (Implementation)", "ஆ) இடைமுகம் (Interface)", "இ) பக்க விளைவு", "ஈ) தரப்படுத்தல்"], answer: 1, officialKey: "ஆ" },
              { id: "q2", html: "ஆக்கிகள் (Constructors) என்பன எவற்றை உருவாக்குகின்றன?", options: ["அ) பழைய பொருள்கள்", "ஆ) புதிய தரவுப் பொருள்கள்", "இ) தெரிவுச்சிகள்", "ஈ) மதிப்பிலா பொருள்கள்"], answer: 1, officialKey: "ஆ" },
              { id: "q3", html: "பெயருக்கு முன் இரட்டை அடிக்கோடு (__) இட்டு குறிக்கப்படும் அணுகல் நிலை எது?", options: ["அ) public", "ஆ) protected", "இ) private", "ஈ) global"], answer: 2, officialKey: "இ" },
              { id: "q4", html: "நேரச் சிக்கல்தன்மை (Time Complexity) என்பது எதைக் குறிக்கிறது?", options: ["அ) நிரலின் நீளம்", "ஆ) நிரல் இயங்குவதற்கு எடுத்துக்கொள்ளும் நேரம்", "இ) நிரலின் அளவு", "ஈ) நிரலின் பிழைகள்"], answer: 1, officialKey: "ஆ" },
              { id: "q5", html: "Python-இல் print() செயற்குறிக்குக் கொடுக்கப்பட்ட அளபுருக்கள் இயல்பாக எதனால் பிரிக்கப்படும்?", options: ["அ) காற்புள்ளி", "ஆ) வெற்றிடம் (Space)", "இ) அரைப்புள்ளி", "ஈ) தத்தல்"], answer: 1, officialKey: "ஆ" },
              { id: "q6", html: "Python-இல் ஒரு செயற்கூறை வரையறை செய்வதற்கான சரியான கட்டளை எது?", options: ["அ) function functionname(){ }", "ஆ) def functionname():", "இ) def myFunction(){}", "ஈ) மேற்கண்ட எதுவுமில்லை"], answer: 1, officialKey: "ஆ" },
              { id: "q7", html: "இயங்கு நிரலாக்க வழிமுறையில் மறுபடியும் கணக்கிடுவதைத் தவிர்க்க பயன்படும் நுட்பம் எது?", options: ["அ) Recursion", "ஆ) Memoization", "இ) Sorting", "ஈ) Searching"], answer: 1, officialKey: "ஆ" },
              { id: "q8", html: "Python-இல் Boolean தரவு வகை எந்த இரு மதிப்புகளில் ஒன்றை மட்டும் கொண்டிருக்கும்?", options: ["அ) 0/1", "ஆ) True/False", "இ) Yes/No", "ஈ) High/Low"], answer: 1, officialKey: "ஆ" },
              { id: "q9", html: "நேர்நோக்கிய குறியீட்டு எண் மற்றும் எதிர்நோக்கிய குறியீட்டு எண் தொடங்கும் மதிப்புகள் எவை?", options: ["அ) 0, 1", "ஆ) 1, -1", "இ) 0, -1", "ஈ) -1, 0"], answer: 2, officialKey: "இ" },
              { id: "q10", html: "Set-ல் மீண்டும் மீண்டும் வரும் மதிப்புகள் எவ்வாறு கையாளப்படுகின்றன?", options: ["அ) அப்படியே வைக்கப்படும்", "ஆ) தானாக நீக்கப்படும்", "இ) பிழை ஏற்படும்", "ஈ) மறுபடி காட்டப்படும்"], answer: 1, officialKey: "ஆ" },
              { id: "q11", html: "Python-இல் Class மற்றும் Object பற்றி பேசும் பாடநெறி என்ன வகை மொழியைக் குறிக்கிறது?", options: ["அ) Procedural", "ஆ) Object Oriented Programming Language", "இ) Functional", "ஈ) Assembly"], answer: 1, officialKey: "ஆ" },
              { id: "q12", html: "தொடர்பு மாதிரியில் தரவு எவ்வாறு சேமிக்கப்படுகிறது?", options: ["அ) மரம் போன்று", "ஆ) வலைப்பின்னலாக", "இ) அட்டவணைகளாக", "ஈ) பட்டியலாக"], answer: 2, officialKey: "இ" },
              { id: "q13", html: "SQL-இல் ஒரு நெடுவரிசைக்கு NULL மதிப்பு அனுமதிக்கப்படாது என்பதைக் குறிக்கும் கட்டுப்பாடு எது?", options: ["அ) UNIQUE", "ஆ) DEFAULT", "இ) NOT NULL", "ஈ) CHECK"], answer: 2, officialKey: "இ" },
              { id: "q14", html: "CSV கோப்பில் தரவு மதிப்புகளுக்கிடையேயான பிரிப்புக் குறியீடு எது (இயல்பாக)?", options: ["அ) அரைப்புள்ளி (;)", "ஆ) காற்புள்ளி (,)", "இ) தத்தல் (Tab)", "ஈ) சுழி (|)"], answer: 1, officialKey: "ஆ" },
              { id: "q15", html: "Python-ஆனது நினைவகத்தை தானாகவே நிர்வகிக்கும் நுட்பம் என்ன எனப்படும்?", options: ["அ) Compilation", "ஆ) Garbage Collection", "இ) Linking", "ஈ) Wrapping"], answer: 1, officialKey: "ஆ" },
              { id: "q16", html: "SQLite எந்த வகை தரவுதள மேலாண்மை அமைப்பு?", options: ["அ) Lightweight, Server-less", "ஆ) Heavyweight, Server-based", "இ) Cloud-only", "ஈ) Distributed"], answer: 0, officialKey: "அ" },
              { id: "q17", html: "வரைபடத்தை காப்பாற்ற (Save) பயன்படும் Matplotlib கருவிப்பட்டை பொத்தான் எது?", options: ["அ) Home Button", "ஆ) Pan Axis Button", "இ) Save Figure Button", "ஈ) Zoom Button"], answer: 2, officialKey: "இ" },
              { id: "q18", html: "Python-இல் while மடக்கு எந்த வகை மடக்கு?", options: ["அ) நுழைவு சோதிப்பு loop", "ஆ) வெளியேறும் சோதிப்பு loop", "இ) foreach loop", "ஈ) சுற்று loop"], answer: 0, officialKey: "அ" },
              { id: "q19", html: "பட்டியலில் ஒரு உறுப்பு இருக்கிறதா எனச் சரிபார்க்க, பட்டியலை வரிசைப்படுத்தும் தேவை இல்லாத தேடல் நுட்பம் எது?", options: ["அ) Linear Search", "ஆ) Binary Search", "இ) Merge Sort", "ஈ) Selection Sort"], answer: 0, officialKey: "அ" },
              { id: "q20", html: "Python-இல் ஒரு செயற்கூறு தன்னைத்தானே அழைத்துக்கொள்வது என்ன எனப்படுகிறது?", options: ["அ) Composition", "ஆ) Recursion", "இ) Iteration", "ஈ) Abstraction"], answer: 1, officialKey: "ஆ" },
            ],
          },
        ],
      },
      {
        id: "p2",
        navLabel: "பகுதி II — சிறு விடை வினாக்கள் (5 × 2)",
        title: "பகுதி II — சிறு விடை வினாக்கள்",
        type: "short-essay",
        scoreMax: 10,
        marksPer: 2,
        instruction: "2-3 வாக்கியங்களில் விடையளிக்கவும்.",
        questions: [
          { q: "இடைமுகத்திற்கும் (Interface) செயல்படுத்துதலுக்கும் (Implementation) உள்ள வேறுபாட்டைக் கூறு.", ans: "இடைமுகம் என்பது ஒரு செயற்கூறு எடுக்கும் அளபுருக்களையும் அது வழங்கும் விடையின் வகையையும் குறிக்கும். செயல்படுத்துதல் என்பது அந்த விடையை எவ்வாறு கணக்கிடுகிறது என்ற உள் தர்க்கத்தைக் குறிக்கும்.", officialKey: "பாடம் 1" },
          { q: "நெறிமுறையின் ஆறு பண்புகளையும் பெயரிடுக.", ans: "தெளிவுத்தன்மை, நுழைவு, உள்ளீடு, வெளியீடு, திறன், முடிவு ஆகிய ஆறு பண்புகள்.", officialKey: "பாடம் 4" },
          { q: "மறுநிகழ்வு செயற்கூறு (Recursive Function) என்றால் என்ன?", ans: "மறுநிகழ்வு செயற்கூறு என்பது தன்னைத்தானே அழைத்துக்கொள்ளும் ஒரு செயற்கூறாகும் — Base Case மற்றும் Recursive Case ஆகிய இரு கூறுகளையும் கொண்டிருக்கும்.", officialKey: "பாடம் 7" },
          { q: "Pair என்றால் என்ன?", ans: "Pair என்பது இரு மதிப்புகளை ஒன்றாக இணைக்கும் எளிய கூட்டுத் தரவு அமைப்பு ஆகும்.", officialKey: "பாடம் 2" },
          { q: "தரவுதளக் கூறுகளை (Components of Database) பட்டியலிடுக.", ans: "வன்பொருள் (Hardware), மென்பொருள் (Software), தரவு (Data), நடைமுறைகள் (Procedures), தரவுதள மொழிகள் (Query, DML, DDL).", officialKey: "பாடம் 11" },
        ],
      },
      {
        id: "p3",
        navLabel: "பகுதி III — குறு விடை வினாக்கள் (5 × 3)",
        title: "பகுதி III — குறு விடை வினாக்கள்",
        type: "short-essay",
        scoreMax: 15,
        marksPer: 3,
        instruction: "4-6 வாக்கியங்களில் விடையளிக்கவும்.",
        questions: [
          { q: "public, protected, மற்றும் private அணுகல் நிலைகளை வேறுபடுத்துக.", ans: "public உறுப்பினர் வெளியேயும் நேரடியாக அணுகக்கூடியது. protected (_) வகுப்பு/துணை வகுப்பிற்குள் மட்டும் அணுகப்பட வேண்டும் என்பதைக் குறிக்கும் மரபு. private (__) வகுப்புக்கு வெளியே அணுகலைத் தவிர்க்கும் மரபு.", officialKey: "பாடம் 3" },
          { q: "Asymptotic குறியீடுகளை (Big O, Big Omega, Big Theta) விளக்குக.", ans: "Big O — மோசமான நிலையின் மேல் எல்லை. Big Omega — சிறந்த நிலையின் கீழ் எல்லை. Big Theta — சராசரி நிலையின் இரு எல்லைகளையும் குறிக்கும்.", officialKey: "பாடம் 4" },
          { q: "Python-ல் உள்ள பல்வேறு செயற்குறிகளை (Arithmetic, Relational, Logical, Assignment) பட்டியலிடுக.", ans: "கணித செயற்குறிகள் (+,-,*,/,%,**,//), ஒப்பீட்டு செயற்குறிகள் (==,!=,>,<), தருக்க செயற்குறிகள் (and,or,not), மதிப்பீட்டுச் செயற்குறிகள் (=,+=,-=).", officialKey: "பாடம் 5" },
          { q: "DBMS-க்கும் RDBMS-க்கும் இடையேயான வேறுபாடுகளை விளக்குக.", ans: "DBMS தரவை பொதுவான கோப்பு அமைப்பில் சேமிக்கும். RDBMS தரவை அட்டவணைகளாக, திறவுகோல்கள் மூலம் தொடர்புடன் சேமிக்கும்.", officialKey: "பாடம் 11" },
          { q: "Escape Sequences (விடுபடு தொடர்) என்றால் என்ன? இரு எடுத்துக்காட்டுகள் தருக.", ans: "Escape Sequences சிறப்புப் பொருள் கொண்ட எழுத்துச் சேர்க்கைகள், \\\\ குறியீட்டுடன் தொடங்கும். எடுத்துக்காட்டுகள்: \\n (புதிய வரி), \\t (தத்தல்).", officialKey: "பாடம் 8" },
        ],
      },
      {
        id: "p4",
        navLabel: "பகுதி IV — விரிவான வினாக்கள் (5 × 9)",
        title: "பகுதி IV — விரிவான வினாக்கள்",
        type: "long-essay",
        scoreMax: 45,
        marksPer: 9,
        instruction: "விரிவாக விடையளிக்கவும்.",
        questions: [
          {
            q: "gcd (Greatest Common Divisor) செயற்கூறை பின்வருமாறு கருதுக: let rec gcd a b := if b <> 0 then gcd b (a mod b) else a. இதன் (அ) செயற்கூறு விவரக்குறிப்பு (ஆ) மீளாக்க செயல்பாடு (இ) இடைமுகம் மற்றும் செயல்படுத்துதல் ஆகியவற்றை விவரி.",
            ans: "(அ) செயற்கூறு விவரக்குறிப்பு: gcd இரண்டு எண்களான a, b-ஐ எடுத்து, அவற்றின் மீப்பெரு பொது வகுத்தியை வழங்கும் மீளாக்க செயற்கூறு.\n\n(ஆ) மீளாக்க செயல்பாடு: b பூஜ்யமாக இல்லாதவரை gcd b (a mod b) என அழைத்துக்கொண்டே செல்லும் — யூக்ளிடின் வழிமுறை.\n\n(இ) இடைமுகம்/செயல்படுத்துதல்: இடைமுகம் — இரண்டு முழு எண்களை எடுத்து ஒரு முழு எண்ணை (GCD) திருப்பித் தரும். செயல்படுத்துதல் — mod செயலி மற்றும் மீளாக்கம் மூலம் GCD-ஐ கணக்கிடும் தர்க்கம்.",
            officialKey: "பாடம் 1",
          },
          {
            q: "Public மற்றும் Private தரவு உறுப்பினர்களை ஒரு முழுமையான எடுத்துக்காட்டுடன் ஒப்பிட்டு விரிவாக விளக்குக.",
            ans: "class Sample:\n    x1 = 1        # public\n    __x2 = 14     # private\n    def display(self):\n        print(self.x1, self.__x2)\n\nS = Sample()\nprint(S.x1)      # வேலை செய்யும்: 1\nprint(S.__x2)    # AttributeError!\nS.display()      # class-க்குள் இருந்து அணுகலாம்\n\npublic உறுப்பினர்களை class-க்கு வெளியேயும் உள்ளேயும் அணுகலாம். private உறுப்பினர்களை class-க்குள் உள்ள methods மூலம் மட்டுமே அணுக முடியும்.",
            officialKey: "பாடம் 10",
          },
          {
            q: "தரவுதள மாதிரிகளை (Hierarchical, Network, Relational, ER, Object) விரிவாக விளக்குக.",
            ans: "1. படிநிலை மாதிரி: மரம் போன்ற பெற்றோர்-குழந்தை உறவு.\n2. வலைப்பின்னல் மாதிரி: ஒரு பதிவு பல பெற்றோர்களைக் கொண்டிருக்கலாம்.\n3. தொடர்பு மாதிரி: E.F.Codd உருவாக்கியது, அட்டவணைகளாக சேமிக்கும்.\n4. ER மாதிரி: உறுப்பொருள்களுக்கிடையேயான உறவுகளை வரைபடமாகக் காட்டும்.\n5. பொருள் நோக்கு மாதிரி: inheritance அடிப்படையிலானது.",
            officialKey: "பாடம் 11",
          },
          {
            q: "sys, os, getopt ஆகிய மூன்று தொகுதிகளையும் ஒரு முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக.",
            ans: "sys — கட்டளை வரி அளபுருக்களைக் கையாளும் (sys.argv). os — இயங்குதள கட்டளைகளை இயக்கும் (os.system, os.getcwd, os.chdir). getopt — கட்டளை வரி அளபுருக்களைப் பாகுபடுத்தும் (getopt.getopt).\n\nஎடுத்துக்காட்டு:\nimport sys, os, getopt\ndef main(argv):\n    opts, args = getopt.getopt(argv, 'i:')\n    for o, a in opts:\n        if o == '-i':\n            run(a)\ndef run(a):\n    os.system('g++ ' + a + '.cpp -o ' + a + '.exe')\n    os.system(a + '.exe')",
            officialKey: "பாடம் 14",
          },
          {
            q: "Matplotlib-ஐப் பயன்படுத்தி கோட்டு வரைபடம், பட்டை வரைபடம், வட்ட வரைபடம் ஆகிய மூன்றையும் ஒவ்வொன்றுக்கும் முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக.",
            ans: "1. கோட்டு வரைபடம் (plt.plot()): காலப்போக்கிலான மாற்றத்தைக் காட்ட.\nplt.plot(years, population); plt.show()\n\n2. பட்டை வரைபடம் (plt.bar()): தனித்தனி வகைகளுக்கிடையேயான ஒப்பீட்டைக் காட்ட.\nplt.bar(y_positions, usage); plt.xticks(y_positions, labels); plt.show()\n\n3. வட்ட வரைபடம் (plt.pie()): மொத்தத்தில் ஒவ்வொரு பகுதியின் விகிதாசாரத்தைக் காட்ட.\nplt.pie(sizes, labels=labels, autopct='%.1f'); plt.show()\n\nஒவ்வொரு வரைபடமும் குறிப்பிட்ட வகை தரவுக்கும் நோக்கத்திற்கும் ஏற்ப தேர்ந்தெடுக்கப்படுகிறது.",
            officialKey: "பாடம் 16",
          },
        ],
      },
    ],
  },
}

export default class12ComputerScienceTamilModelQA5
