// frontend/web/src/data/examPapers/class12ComputerScienceTamilModelQA2.js

export const class12ComputerScienceTamilModelQA2 = {
  paperId:      "class12-computer-science-tamil-model-qa-2",
  title:        "மாதிரி வினா-விடை 2",
  classLabel:   "வகுப்பு 12",
  subject:      "கணினி அறிவியல் (தமிழ்)",
  duration:     "3.00 மணி நேரம்",
  maximumMarks: 90,
  totalPages:   6,

  pages: [
    {
      pageNumber: 1,
      blocks: [
        { type: "paper_header", content: "வகுப்பு XII — கணினி அறிவியல்\nமாதிரி வினாத்தாள் — தொகுப்பு 2" },
        { type: "metadata_row", duration: "3.00 மணி நேரம்", maximumMarks: 90, totalPages: 6 },
        { type: "instructions", content: "அனைத்து வினாக்களுக்கும் விடையளிக்கவும்." },
        { type: "part_heading", content: "பகுதி - I" },
        { type: "section_heading", content: "சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக (20 × 1 = 20)" },

        { type: "mcq_question", questionId: "1", marks: 1, content: "Python-ஐ உருவாக்கியவர் யார்?", options: ["டெனிஸ் ரிட்ச்சி", "Guido van Rossum", "பில் கேட்ஸ்", "சுந்தர் பிச்சை"] },
        { type: "mcq_question", questionId: "2", marks: 1, content: "பைத்தான் கூட்டறைப் பயன்முறையில் (Interactive Mode) கட்டளைகளை ஏற்றுக்கொள்ளத் தயார் என்பதைக் குறிக்கும் குறியீடு எது?", options: [">>>", "<<<", "#", "<<"] },
        { type: "mcq_question", questionId: "3", marks: 1, content: "LEGB விதிமுறையில் L என்பது எதைக் குறிக்கிறது?", options: ["Long", "Local", "Linear", "Logical"] },
        { type: "mcq_question", questionId: "4", marks: 1, content: "Python-இல் எத்தனை வகையான நிபந்தனைக் கூற்றுகள் உள்ளன?", options: ["2", "3", "4", "5"] },
        { type: "mcq_question", questionId: "5", marks: 1, content: "நிபந்தனை True எனில் மட்டும் தொகுதியை இயக்கும் கூற்று எது?", options: ["while", "if", "for", "break"] },
        { type: "mcq_question", questionId: "6", marks: 1, content: "range(2,10,2) எத்தனை உறுப்புகளைத் தரும்?", options: ["3", "4", "5", "8"] },
        { type: "mcq_question", questionId: "7", marks: 1, content: "கூறிலிருந்து முழுவதுமாக வெளியேறப் பயன்படும் Jump Statement எது?", options: ["continue", "break", "pass", "return"] },
        { type: "mcq_question", questionId: "8", marks: 1, content: "Python-இல் எத்தனை வகையான செயற்கூறுகள் உள்ளன?", options: ["2", "3", "4", "5"] },
        { type: "mcq_question", questionId: "9", marks: 1, content: "பயனர் வரையறுத்த செயற்கூறை உருவாக்க பயன்படும் சிறப்புச் சொல் எது?", options: ["function", "def", "lambda", "create"] },
        { type: "mcq_question", questionId: "10", marks: 1, content: "பொருள் உருவாக்கப்படும்போது தானாகவே அழைக்கப்படும் Method எது?", options: ["__del__()", "__init__()", "__new__()", "__create__()"] },
        { type: "mcq_question", questionId: "11", marks: 1, content: "பெயரில்லாத, ஒற்றை வரிக் கோவை கொண்ட செயற்கூறு எது?", options: ["Built-in Function", "Recursive Function", "Lambda Function", "User-defined Function"] },
        { type: "mcq_question", questionId: "12", marks: 1, content: "Python-ல் சரங்கள் (Strings) எவ்வாறு வகைப்படுத்தப்படுகின்றன?", options: ["Mutable", "Immutable", "Static", "Dynamic"] },
        { type: "mcq_question", questionId: "13", marks: 1, content: "ஒரு சரத்தின் முதல் எழுத்தின் நேர்நோக்கிய குறியீட்டு எண் என்ன?", options: ["1", "0", "-1", "-0"] },
        { type: "mcq_question", questionId: "14", marks: 1, content: "இரு சரங்களை இணைக்கப் பயன்படும் செயற்குறி எது?", options: ["*", "+", "-", "%"] },
        { type: "mcq_question", questionId: "15", marks: 1, content: "str1[::-1] என்பதன் பயன் என்ன?", options: ["சரத்தை பெரிதாக்கும்", "சரத்தை பின்நோக்கி திருப்பும்", "சரத்தை நீக்கும்", "சரத்தை எண்ணாக மாற்றும்"] },
        { type: "mcq_question", questionId: "16", marks: 1, content: "ஒரு சரத்தின் நீளத்தைப் பெறப் பயன்படும் செயற்கூறு எது?", options: ["size()", "length()", "len()", "count()"] },
        { type: "mcq_question", questionId: "17", marks: 1, content: "self.attribute மூலம் வரையறுக்கப்படும் மாறி இயல்பாக என்ன வகை?", options: ["private", "protected", "public", "static"] },
        { type: "mcq_question", questionId: "18", marks: 1, content: "ஒரு உறுப்பினரை private ஆக்க பெயருக்கு முன் என்ன இடப்பட வேண்டும்?", options: ["ஒற்றை அடிக்கோடு (_)", "இரட்டை அடிக்கோடு (__)", "@ குறியீடு", "# குறியீடு"] },
        { type: "mcq_question", questionId: "19", marks: 1, content: "இனக்குழுவிற்குள் வரையறுக்கப்படும் செயற்கூறு என்ன எனப்படும்?", options: ["Function", "Method", "Procedure", "Module"] },
        { type: "mcq_question", questionId: "20", marks: 1, content: "மீண்டும் வரும் மதிப்புகளை நீக்கி தனித்துவமான மதிப்புகளை மட்டும் தரும் SQL சிறப்புச் சொல் எது?", options: ["ALL", "DISTINCT", "UNIQUE", "ONLY"] },

        { type: "footer_note", content: "[ மேல் பக்கம் காண்க" },
      ],
    },
    {
      pageNumber: 2,
      blocks: [
        { type: "part_heading", content: "பகுதி - II" },
        { type: "section_heading", content: "சிறு விடை வினாக்கள் (5 × 2 = 10)" },

        { type: "question", questionId: "21", marks: 2, content: "Python-ல் input() செயற்கூறின் பயன் என்ன?" },
        { type: "question", questionId: "22", marks: 2, content: "for மற்றும் while மடக்குகளை வேறுபடுத்துக." },
        { type: "question", questionId: "23", marks: 2, content: "return கூற்றின் பயன் என்ன?" },
        { type: "question", questionId: "24", marks: 2, content: "Slicing என்றால் என்ன? எடுத்துக்காட்டு தருக." },
        { type: "question", questionId: "25", marks: 2, content: "__init__() Method-ன் பயன் என்ன?" },

        { type: "part_heading", content: "பகுதி - III" },
        { type: "section_heading", content: "குறு விடை வினாக்கள் (5 × 3 = 15)" },

        { type: "question", questionId: "26", marks: 3, content: "if-elif-else கூற்று எவ்வாறு செயல்படுகிறது என்பதை விளக்குக." },
        { type: "question", questionId: "27", marks: 3, content: "*args மூலம் மாறு நீள செயலுருபுகளை எடுத்துக்காட்டுடன் விளக்குக." },
        { type: "question", questionId: "28", marks: 3, content: "சர செயற்குறிகளான +, +=, * ஆகியவற்றை எடுத்துக்காட்டுகளுடன் விளக்குக." },
        { type: "question", questionId: "29", marks: 3, content: "Public மற்றும் Private உறுப்பினர்களை ஓர் எடுத்துக்காட்டுடன் விளக்குக." },
        {
          type: "or_question", questionId: "30", marks: 3,
          optionA: { content: "while மற்றும் do-while (do...while) மடக்குகளுக்கு இடையேயான வேறுபாட்டை விளக்குக." },
          optionB: { content: "Global சிறப்புச் சொல்லின் பயன்பாட்டை ஓர் எடுத்துக்காட்டுடன் விளக்குக." },
        },

        { type: "part_heading", content: "பகுதி - IV" },
        { type: "section_heading", content: "விரிவான வினாக்கள் (5 × 9 = 45)" },

        { type: "question", questionId: "31", marks: 9, content: "பைத்தான் நிரலாக்க முறைகளான கூட்டறைப் பயன்முறை (Interactive Mode) மற்றும் ஸ்கிரிப்ட் பயன்முறை (Script Mode) ஆகியவற்றை எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "31", marks: 9,
          optionA: { content: "Python Tokens-ன் ஐந்து வகைகளையும் எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
          optionB: { content: "Python-இல் உள்ள செயற்குறி வகைகளை (Arithmetic, Relational, Logical, Assignment) ஒவ்வொன்றுக்கும் எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "32", marks: 9, content: "Python-இல் உள்ள மூன்று மாற்று/கிளை கூற்றுகளையும் (if, if-else, if-elif-else) கட்டளை அமைப்புடனும் எடுத்துக்காட்டுகளுடனும் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "32", marks: 9,
          optionA: { content: "while மடக்கு மற்றும் for மடக்கை ஒப்பிட்டு, ஒவ்வொன்றுக்கும் முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
          optionB: { content: "break, continue, pass ஆகிய மூன்று Jump Statements-ஐயும் ஒவ்வொன்றுக்கும் முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "33", marks: 9, content: "Python-இல் உள்ள நான்கு வகையான செயலுருபுகளையும் (Function Arguments) எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "33", marks: 9,
          optionA: { content: "மறுநிகழ்வு செயற்கூறை (Recursive Function) Factorial எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
          optionB: { content: "Python-இல் மாறிகளின் வரையெல்லையை (Scope — Local, Global) global சிறப்புச் சொல்லுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "34", marks: 9, content: "Slicing (துண்டு-பிரித்தல்) நுட்பத்தை str1[start:end:step] அமைப்புடன் பல எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "34", marks: 9,
          optionA: { content: "சர வடிவூட்டச் செயற்குறிகளை (% மற்றும் format()) எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
          optionB: { content: "Python-இல் உள்ள முக்கிய உள்ளிணைந்த சரச் செயற்கூறுகளை (len, capitalize, find, upper, lower, count) எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "35", marks: 9, content: "Python-இல் Class மற்றும் Object கருத்துருக்களை, ஒரு முழுமையான Circle Class எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "35", marks: 9,
          optionA: { content: "வடிவாக்கியையும் (Constructor) அழிப்பானையும் (Destructor) பொருள் எண்ணிக்கையைக் கண்காணிக்கும் ஒரு முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
          optionB: { content: "Public மற்றும் Private தரவு உறுப்பினர்களை ஒரு முழுமையான எடுத்துக்காட்டுடன் ஒப்பிட்டு விரிவாக விளக்குக." },
        },

        { type: "footer_note", content: "- o O o -" },
      ],
    },
  ],

  practice: {
    meta: {
      subject:      "கணினி அறிவியல் (தமிழ்) — வகுப்பு 12",
      unit:         "மாதிரி வினா-விடை 2 — முழுப் பாடத்திட்டம்",
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
              { id: "q1", html: "Python-ஐ உருவாக்கியவர் யார்?", options: ["அ) டெனிஸ் ரிட்ச்சி", "ஆ) Guido van Rossum", "இ) பில் கேட்ஸ்", "ஈ) சுந்தர் பிச்சை"], answer: 1, officialKey: "ஆ" },
              { id: "q2", html: "பைத்தான் கூட்டறைப் பயன்முறையில் (Interactive Mode) கட்டளைகளை ஏற்றுக்கொள்ளத் தயார் என்பதைக் குறிக்கும் குறியீடு எது?", options: ["அ) >>>", "ஆ) <<<", "இ) #", "ஈ) <<"], answer: 0, officialKey: "அ" },
              { id: "q3", html: "LEGB விதிமுறையில் L என்பது எதைக் குறிக்கிறது?", options: ["அ) Long", "ஆ) Local", "இ) Linear", "ஈ) Logical"], answer: 1, officialKey: "ஆ" },
              { id: "q4", html: "Python-இல் எத்தனை வகையான நிபந்தனைக் கூற்றுகள் உள்ளன?", options: ["அ) 2", "ஆ) 3", "இ) 4", "ஈ) 5"], answer: 2, officialKey: "இ" },
              { id: "q5", html: "நிபந்தனை True எனில் மட்டும் தொகுதியை இயக்கும் கூற்று எது?", options: ["அ) while", "ஆ) if", "இ) for", "ஈ) break"], answer: 1, officialKey: "ஆ" },
              { id: "q6", html: "range(2,10,2) எத்தனை உறுப்புகளைத் தரும்?", options: ["அ) 3", "ஆ) 4", "இ) 5", "ஈ) 8"], answer: 1, officialKey: "ஆ" },
              { id: "q7", html: "கூறிலிருந்து முழுவதுமாக வெளியேறப் பயன்படும் Jump Statement எது?", options: ["அ) continue", "ஆ) break", "இ) pass", "ஈ) return"], answer: 1, officialKey: "ஆ" },
              { id: "q8", html: "Python-இல் எத்தனை வகையான செயற்கூறுகள் உள்ளன?", options: ["அ) 2", "ஆ) 3", "இ) 4", "ஈ) 5"], answer: 2, officialKey: "இ" },
              { id: "q9", html: "பயனர் வரையறுத்த செயற்கூறை உருவாக்க பயன்படும் சிறப்புச் சொல் எது?", options: ["அ) function", "ஆ) def", "இ) lambda", "ஈ) create"], answer: 1, officialKey: "ஆ" },
              { id: "q10", html: "பொருள் உருவாக்கப்படும்போது தானாகவே அழைக்கப்படும் Method எது?", options: ["அ) __del__()", "ஆ) __init__()", "இ) __new__()", "ஈ) __create__()"], answer: 1, officialKey: "ஆ" },
              { id: "q11", html: "பெயரில்லாத, ஒற்றை வரிக் கோவை கொண்ட செயற்கூறு எது?", options: ["அ) Built-in Function", "ஆ) Recursive Function", "இ) Lambda Function", "ஈ) User-defined Function"], answer: 2, officialKey: "இ" },
              { id: "q12", html: "Python-ல் சரங்கள் (Strings) எவ்வாறு வகைப்படுத்தப்படுகின்றன?", options: ["அ) Mutable", "ஆ) Immutable", "இ) Static", "ஈ) Dynamic"], answer: 1, officialKey: "ஆ" },
              { id: "q13", html: "ஒரு சரத்தின் முதல் எழுத்தின் நேர்நோக்கிய குறியீட்டு எண் என்ன?", options: ["அ) 1", "ஆ) 0", "இ) -1", "ஈ) -0"], answer: 1, officialKey: "ஆ" },
              { id: "q14", html: "இரு சரங்களை இணைக்கப் பயன்படும் செயற்குறி எது?", options: ["அ) *", "ஆ) +", "இ) -", "ஈ) %"], answer: 1, officialKey: "ஆ" },
              { id: "q15", html: "str1[::-1] என்பதன் பயன் என்ன?", options: ["அ) சரத்தை பெரிதாக்கும்", "ஆ) சரத்தை பின்நோக்கி திருப்பும்", "இ) சரத்தை நீக்கும்", "ஈ) சரத்தை எண்ணாக மாற்றும்"], answer: 1, officialKey: "ஆ" },
              { id: "q16", html: "ஒரு சரத்தின் நீளத்தைப் பெறப் பயன்படும் செயற்கூறு எது?", options: ["அ) size()", "ஆ) length()", "இ) len()", "ஈ) count()"], answer: 2, officialKey: "இ" },
              { id: "q17", html: "self.attribute மூலம் வரையறுக்கப்படும் மாறி இயல்பாக என்ன வகை?", options: ["அ) private", "ஆ) protected", "இ) public", "ஈ) static"], answer: 2, officialKey: "இ" },
              { id: "q18", html: "ஒரு உறுப்பினரை private ஆக்க பெயருக்கு முன் என்ன இடப்பட வேண்டும்?", options: ["அ) ஒற்றை அடிக்கோடு (_)", "ஆ) இரட்டை அடிக்கோடு (__)", "இ) @ குறியீடு", "ஈ) # குறியீடு"], answer: 1, officialKey: "ஆ" },
              { id: "q19", html: "இனக்குழுவிற்குள் வரையறுக்கப்படும் செயற்கூறு என்ன எனப்படும்?", options: ["அ) Function", "ஆ) Method", "இ) Procedure", "ஈ) Module"], answer: 1, officialKey: "ஆ" },
              { id: "q20", html: "மீண்டும் வரும் மதிப்புகளை நீக்கி தனித்துவமான மதிப்புகளை மட்டும் தரும் SQL சிறப்புச் சொல் எது?", options: ["அ) ALL", "ஆ) DISTINCT", "இ) UNIQUE", "ஈ) ONLY"], answer: 1, officialKey: "ஆ" },
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
          { q: "Python-ல் input() செயற்கூறின் பயன் என்ன?", ans: "input() செயற்கூறு விசைப்பலகையிலிருந்து உள்ளீட்டைப் பெறப் பயன்படும் — இது எப்போதும் ஒரு சரம் (String) மதிப்பையே திருப்பித் தரும்.", officialKey: "பாடம் 5" },
          { q: "for மற்றும் while மடக்குகளை வேறுபடுத்துக.", ans: "for மடக்கு ஒரு தொடர்வரிசையின் மீது மறுநிகழ்வு செய்யும். while மடக்கு நிபந்தனை True ஆக இருக்கும் வரை மீண்டும் மீண்டும் இயங்கும்.", officialKey: "பாடம் 6" },
          { q: "return கூற்றின் பயன் என்ன?", ans: "return கூற்று செயற்கூறை உடனடியாக முடித்து, ஒரு மதிப்பை அழைத்த இடத்திற்குத் திருப்பித் தரும்.", officialKey: "பாடம் 7" },
          { q: "Slicing என்றால் என்ன? எடுத்துக்காட்டு தருக.", ans: "Slicing என்பது str[start:end:step] என்ற வடிவில் ஒரு சரத்தின் துணைப்பகுதியை எடுக்கும் நுட்பம். எடுத்துக்காட்டு: str1='THEKKURAI'; str1[0:5] → 'THEKK'.", officialKey: "பாடம் 8" },
          { q: "__init__() Method-ன் பயன் என்ன?", ans: "__init__() ஒரு வடிவாக்கி (Constructor) ஆகும் — பொருள் உருவாக்கப்படும்போது தானாகவே அழைக்கப்பட்டு, தொடக்க மதிப்புகளை அமைக்கும்.", officialKey: "பாடம் 10" },
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
          { q: "if-elif-else கூற்று எவ்வாறு செயல்படுகிறது என்பதை விளக்குக.", ans: "if-elif-else கூற்றில் முதல் நிபந்தனை சோதிக்கப்படும்; False எனில் அடுத்த elif நிபந்தனை சோதிக்கப்படும். எந்த ஒரு நிபந்தனை True எனக் காணப்பட்டாலும், அதன் தொகுதி மட்டும் இயங்கும்.", officialKey: "பாடம் 6" },
          { q: "*args மூலம் மாறு நீள செயலுருபுகளை எடுத்துக்காட்டுடன் விளக்குக.", ans: "*args மூலம் ஒரு செயற்கூறு எத்தனை செயலுருபுகள் வேண்டுமானாலும் ஏற்கலாம். எடுத்துக்காட்டு: def printinfo(*var): for i in var: print(i). printinfo(1,2,3) — வெளியீடு 1 2 3.", officialKey: "பாடம் 7" },
          { q: "சர செயற்குறிகளான +, +=, * ஆகியவற்றை எடுத்துக்காட்டுகளுடன் விளக்குக.", ans: "+ (Concatenation) இரு சரங்களை இணைக்கும். += (Append) சரத்துடன் சேர்க்கும். * (Repeating) சரத்தை மறுபடி செய்யும் — 'Welcome'*4.", officialKey: "பாடம் 8" },
          { q: "Public மற்றும் Private உறுப்பினர்களை ஓர் எடுத்துக்காட்டுடன் விளக்குக.", ans: "class Sample: x1=1 (public); __x2=14 (private). S=Sample(); print(S.x1) வேலை செய்யும்; print(S.__x2) AttributeError தரும்.", officialKey: "பாடம் 10" },
          { q: "while மற்றும் do-while (do...while) மடக்குகளுக்கு இடையேயான வேறுபாட்டை விளக்குக.", ans: "while மடக்கில் நிபந்தனை முதலில் சோதிக்கப்படும். do...while மடக்கில் code block முதலில் இயங்கி, பிறகு நிபந்தனை சரிபார்க்கப்படும் — குறைந்தது ஒரு முறையேனும் நிச்சயம் இயங்கும்.", officialKey: "பாடம் 6" },
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
            q: "பைத்தான் நிரலாக்க முறைகளான கூட்டறைப் பயன்முறை (Interactive Mode) மற்றும் ஸ்கிரிப்ட் பயன்முறை (Script Mode) ஆகியவற்றை எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.",
            ans: "கூட்டறைப் பயன்முறை: >>> prompt-இல் ஒரு கூற்றை உள்ளிட்டு, உடனடியாக விடையைப் பெறும் முறை. >>> print('Welcome') → Welcome.\n\nஸ்கிரிப்ட் பயன்முறை: File > New File மூலம் புதிய Editor திறந்து, பல கூற்றுகள் கொண்ட நிரலை எழுதி, .py கோப்பாக சேமித்து, Run > Run Module மூலம் இயக்கும் முறை.\n\nகூட்டறை முறை விரைவான சோதனைக்கு ஏற்றது; ஸ்கிரிப்ட் முறை பெரிய, மீண்டும் பயன்படுத்தக்கூடிய நிரல்களுக்கு ஏற்றது.",
            officialKey: "பாடம் 5",
          },
          {
            q: "Python-இல் உள்ள மூன்று மாற்று/கிளை கூற்றுகளையும் (if, if-else, if-elif-else) கட்டளை அமைப்புடனும் எடுத்துக்காட்டுகளுடனும் விரிவாக விளக்குக.",
            ans: "1. Simple if: if <condition>: statements-block1.\n2. if-else: if <condition>: block1 else: block2.\n3. if-elif-else: if <c1>: b1 elif <c2>: b2 else: bn.\n\nஎடுத்துக்காட்டு (Grade கணக்கீடு): if avg>=90: print('A') elif avg>=80: print('B') else: print('C').",
            officialKey: "பாடம் 6",
          },
          {
            q: "Python-இல் உள்ள நான்கு வகையான செயலுருபுகளையும் (Function Arguments) எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.",
            ans: "1. தேவைப்படும் செயலுருபுகள்: printinfo('Hello').\n2. சாவிச்சொல் செயலுருபுகள்: printdata(age=25,name='Ram').\n3. இயல்பு செயலுருபுகள்: printinfo(name,salary=3500).\n4. மாறு நீள செயலுருபுகள் (*args): printinfo(*var): for i in var: print(i).\n\nஒவ்வொரு வகையும் செயற்கூறுகளை நெகிழ்வாக (Flexible) அழைக்க உதவுகின்றன.",
            officialKey: "பாடம் 7",
          },
          {
            q: "Slicing (துண்டு-பிரித்தல்) நுட்பத்தை str1[start:end:step] அமைப்புடன் பல எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.",
            ans: "str1 = 'THEKKURAI'\n\n1. str1[0] → 'T'\n2. str1[0:5] → 'THEKK'\n3. str1[0:8:3] → 'TKR'\n4. str1[3:] → 'KKURAI'\n5. str1[::-1] → 'IARUKKEHT' (பின்நோக்கி)\n\nSlicing, சரத்தின் மூலத்தை மாற்றாமல் புதிய துணைச்சரத்தை உருவாக்குகிறது — ஏனெனில் சரங்கள் Immutable.",
            officialKey: "பாடம் 8",
          },
          {
            q: "Python-இல் Class மற்றும் Object கருத்துருக்களை, ஒரு முழுமையான Circle Class எடுத்துக்காட்டுடன் விரிவாக விளக்குக.",
            ans: "class Circle:\n    pi = 3.14\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return (self.radius**2)*Circle.pi\n    def circumference(self):\n        return 2*self.radius*Circle.pi\n\nC = Circle(radius=5)\nprint(C.area())  # 78.5\nprint(C.circumference())  # 31.4\n\nCircle ஒரு class; C ஒரு object; radius ஒரு attribute; area(), circumference() methods.",
            officialKey: "பாடம் 10",
          },
        ],
      },
    ],
  },
}

export default class12ComputerScienceTamilModelQA2
