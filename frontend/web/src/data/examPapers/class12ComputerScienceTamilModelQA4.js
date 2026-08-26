// frontend/web/src/data/examPapers/class12ComputerScienceTamilModelQA4.js

export const class12ComputerScienceTamilModelQA4 = {
  paperId:      "class12-computer-science-tamil-model-qa-4",
  title:        "மாதிரி வினா-விடை 4",
  classLabel:   "வகுப்பு 12",
  subject:      "கணினி அறிவியல் (தமிழ்)",
  duration:     "3.00 மணி நேரம்",
  maximumMarks: 90,
  totalPages:   6,

  pages: [
    {
      pageNumber: 1,
      blocks: [
        { type: "paper_header", content: "வகுப்பு XII — கணினி அறிவியல்\nமாதிரி வினாத்தாள் — தொகுப்பு 4" },
        { type: "metadata_row", duration: "3.00 மணி நேரம்", maximumMarks: 90, totalPages: 6 },
        { type: "instructions", content: "அனைத்து வினாக்களுக்கும் விடையளிக்கவும்." },
        { type: "part_heading", content: "பகுதி - I" },
        { type: "section_heading", content: "சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக (20 × 1 = 20)" },

        { type: "mcq_question", questionId: "1", marks: 1, content: "CSV-ன் விரிவாக்கம் என்ன?", options: ["Comma Separated Values", "Column Separated Values", "Character Separated Values", "Common Separated Values"] },
        { type: "mcq_question", questionId: "2", marks: 1, content: "CSV கோப்புகள் எவ்வகை கோப்பாகும்?", options: ["Binary", "Plain Text", "Image", "Executable"] },
        { type: "mcq_question", questionId: "3", marks: 1, content: "CSV கோப்பிலிருந்து தரவைப் படிக்க பயன்படும் Python தொகுதி எது?", options: ["file", "csv", "read", "io"] },
        { type: "mcq_question", questionId: "4", marks: 1, content: "ஒவ்வொரு வரிசையையும் Dictionary வடிவில் படிக்கப் பயன்படும் செயற்கூறு எது?", options: ["csv.reader()", "csv.DictReader()", "csv.writer()", "csv.load()"] },
        { type: "mcq_question", questionId: "5", marks: 1, content: "CSV கோப்பில் ஒரு புதிய வரிசையை எழுத பயன்படும் csv.writer() செயற்கூறு எது?", options: ["writerow()", "writerline()", "addrow()", "insertrow()"] },
        { type: "mcq_question", questionId: "6", marks: 1, content: "Scripting மொழி எவ்வாறு இயங்கும்?", options: ["Compiled", "Interpreted", "Assembled", "Linked"] },
        { type: "mcq_question", questionId: "7", marks: 1, content: "C++ எந்த வகை தரவு வகைப்படுத்தலைக் கொண்டது?", options: ["Dynamically Typed", "Statically Typed", "Untyped", "Weakly Typed"] },
        { type: "mcq_question", questionId: "8", marks: 1, content: "C++ கோப்பை .exe ஆக Compile செய்யப் பயன்படும் கருவி எது?", options: ["Python", "g++", "getopt", "sys"] },
        { type: "mcq_question", questionId: "9", marks: 1, content: "கட்டளை வரி அளபுருக்களைக் கையாள பயன்படும் தொகுதி எது?", options: ["os", "sys", "getopt", "csv"] },
        { type: "mcq_question", questionId: "10", marks: 1, content: "OS கட்டளையை நேரடியாக இயக்கப் பயன்படும் செயற்கூறு எது?", options: ["os.getcwd()", "os.chdir()", "os.system()", "os.run()"] },
        { type: "mcq_question", questionId: "11", marks: 1, content: "Python-ல் SQLite தரவுதளத்தைக் கையாள பயன்படும் தொகுதி எது?", options: ["mysql", "sqlite3", "db", "pandas"] },
        { type: "mcq_question", questionId: "12", marks: 1, content: "அனைத்து பதிவுகளையும் ஒரே முறையில் பெற பயன்படும் செயற்கூறு எது?", options: ["fetchone()", "fetchall()", "fetchmany()", "fetch()"] },
        { type: "mcq_question", questionId: "13", marks: 1, content: "ஒரே ஒரு பதிவை மட்டும் பெற பயன்படும் செயற்கூறு எது?", options: ["fetchone()", "fetchall()", "fetchmany()", "fetch()"] },
        { type: "mcq_question", questionId: "14", marks: 1, content: "மாற்றங்களை தரவுதளத்தில் நிரந்தரமாக்கப் பயன்படும் செயற்கூறு எது?", options: ["connection.close()", "connection.commit()", "connection.save()", "connection.update()"] },
        { type: "mcq_question", questionId: "15", marks: 1, content: "அட்டவணையில் உள்ள மொத்த பதிவுகளின் எண்ணிக்கையைத் தரும் திரட்டல் செயற்கூறு எது?", options: ["SUM()", "COUNT()", "AVG()", "MAX()"] },
        { type: "mcq_question", questionId: "16", marks: 1, content: "2D தரவை வரைபடமாகக் காண்பிக்கப் பயன்படும் Python தொகுதி எது?", options: ["matplotlib.pyplot", "matplotlib.pip", "matplotlib.pib", "matplotlib.py"] },
        { type: "mcq_question", questionId: "17", marks: 1, content: "ஒரு எளிய தரவை கோட்டு வரைபடமாக வரைய பயன்படும் செயற்கூறு எது?", options: ["plt.bar()", "plt.plot()", "plt.pie()", "plt.hist()"] },
        { type: "mcq_question", questionId: "18", marks: 1, content: "தனித்தனியான வகைகளுக்கிடையேயான ஒப்பீட்டைக் காட்சிப்படுத்த பயன்படும் செயற்கூறு எது?", options: ["plt.plot()", "plt.bar()", "plt.pie()", "plt.line()"] },
        { type: "mcq_question", questionId: "19", marks: 1, content: "ஒரு மொத்தத்தில் ஒவ்வொரு பகுதியின் விகிதாசாரத்தைக் காட்ட பயன்படும் வரைபடம் எது?", options: ["Line Chart", "Bar Chart", "Pie Chart", "Histogram"] },
        { type: "mcq_question", questionId: "20", marks: 1, content: "Histogram மற்றும் Bar Graph-க்கிடையேயான வேறுபாட்டில் சரியானது எது?", options: ["Histogram தனித்தனி வகைகளைக் காட்டும்", "Bar Graph தொடர்ச்சியான தரவைக் காட்டும்", "Histogram தொடர்ச்சியான தரவைக் காட்டும்", "இரண்டும் ஒரே மாதிரி"] },

        { type: "footer_note", content: "[ மேல் பக்கம் காண்க" },
      ],
    },
    {
      pageNumber: 2,
      blocks: [
        { type: "part_heading", content: "பகுதி - II" },
        { type: "section_heading", content: "சிறு விடை வினாக்கள் (5 × 2 = 10)" },

        { type: "question", questionId: "21", marks: 2, content: "CSV கோப்பு என்றால் என்ன?" },
        { type: "question", questionId: "22", marks: 2, content: "Scripting மொழி என்றால் என்ன?" },
        { type: "question", questionId: "23", marks: 2, content: "sys தொகுதியின் பயன் என்ன?" },
        { type: "question", questionId: "24", marks: 2, content: "SQLite என்றால் என்ன?" },
        { type: "question", questionId: "25", marks: 2, content: "Matplotlib என்றால் என்ன?" },

        { type: "part_heading", content: "பகுதி - III" },
        { type: "section_heading", content: "குறு விடை வினாக்கள் (5 × 3 = 15)" },

        { type: "question", questionId: "26", marks: 3, content: "csv.reader() மற்றும் csv.DictReader() ஐ வேறுபடுத்துக." },
        { type: "question", questionId: "27", marks: 3, content: "C++ கோப்பை Python மூலம் இயக்கும் படிநிலைகளை விளக்குக." },
        { type: "question", questionId: "28", marks: 3, content: "fetchall() மற்றும் fetchone() ஐ வேறுபடுத்துக." },
        { type: "question", questionId: "29", marks: 3, content: "Matplotlib-ல் உள்ள கருவிப்பட்டையின் (Toolbar) பொத்தான்களை விவரி." },
        {
          type: "or_question", questionId: "30", marks: 3,
          optionA: { content: "csv.writer() மூலம் ஒரு புதிய CSV கோப்பில் தரவை எழுதும் நிரலை எழுதுக." },
          optionB: { content: "UPDATE கட்டளையை ஒரு எடுத்துக்காட்டுடன் விளக்குக." },
        },

        { type: "part_heading", content: "பகுதி - IV" },
        { type: "section_heading", content: "விரிவான வினாக்கள் (5 × 9 = 45)" },

        { type: "question", questionId: "31", marks: 9, content: "CSV கோப்பினை பைத்தான் மூலம் படிக்கும் மூன்று முறைகளையும் (csv.reader, csv.DictReader, குறிப்பிட்ட நெடுவரிசைகள்) எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "31", marks: 9,
          optionA: { content: "csv.writer() மூலம் CSV கோப்பில் தரவை எழுதும் முழுமையான நிரலை (writerow, writerows) விரிவாக விளக்குக." },
          optionB: { content: "CSV கோப்பு வடிவமைப்பில் சிறப்பு எழுத்துக்களை (காற்புள்ளி, மேற்கோள், வரி முறிவு) கையாளும் விதிகளை விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "32", marks: 9, content: "C++ மற்றும் Python-ஐ ஒப்பிட்டு, ஒவ்வொரு மொழியின் தனிச் சிறப்பியல்புகளை விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "32", marks: 9,
          optionA: { content: "sys, os, getopt ஆகிய மூன்று தொகுதிகளையும் ஒரு முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
          optionB: { content: "பாலிண்ட்ரோம் சரிபார்க்கும் C++ நிரலை Python wrapper மூலம் இயக்கும் முழுமையான செயல்முறையை விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "33", marks: 9, content: "Python-ல் SQLite தரவுதளத்தை உருவாக்கி, அட்டவணையை உருவாக்கி, பதிவுகளைச் செருகும் முழுமையான நிரலை விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "33", marks: 9,
          optionA: { content: "fetchall(), fetchone(), fetchmany(n) ஆகிய மூன்று fetch முறைகளையும் ஒவ்வொன்றுக்கும் எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
          optionB: { content: "SQL தணைவகைகளான (WHERE, GROUP BY, ORDER BY, HAVING) ஒவ்வொன்றையும் Python-sqlite3 எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "34", marks: 9, content: "Matplotlib-ஐப் பயன்படுத்தி கோட்டு வரைபடம், பட்டை வரைபடம், வட்ட வரைபடம் ஆகிய மூன்றையும் ஒவ்வொன்றுக்கும் முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "34", marks: 9,
          optionA: { content: "மூன்று வரிசைகள் (multiple bars) கொண்ட ஒரு பட்டை வரைபடத்தை Matplotlib மூலம் உருவாக்கும் முழுமையான நிரலை விரிவாக விளக்குக." },
          optionB: { content: "Histogram மற்றும் Bar Graph-ஐ ஒப்பிட்டு, ஒவ்வொன்றுக்கும் பொருத்தமான பயன்பாட்டு சூழலையும் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "35", marks: 9, content: "பல அட்டவணைகளை இணைத்து வினவும் முறையையும், UPDATE/DELETE செயல்பாடுகளையும் முழுமையான எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "35", marks: 9,
          optionA: { content: "Python-ஐ C++-டன் இணைக்கும் கருவிகளை (Python C API, Ctypes, SWIG, Cython, Boost.Python) ஒவ்வொன்றுக்கும் சுருக்கமாக விரிவாக விளக்குக." },
          optionB: { content: "தரவு காட்சிப்படுத்தலின் (Data Visualization) நன்மைகளையும் அதன் பல்வேறு வகைகளையும் விரிவாக விளக்குக." },
        },

        { type: "footer_note", content: "- o O o -" },
      ],
    },
  ],

  practice: {
    meta: {
      subject:      "கணினி அறிவியல் (தமிழ்) — வகுப்பு 12",
      unit:         "மாதிரி வினா-விடை 4 — முழுப் பாடத்திட்டம்",
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
              { id: "q1", html: "CSV-ன் விரிவாக்கம் என்ன?", options: ["அ) Comma Separated Values", "ஆ) Column Separated Values", "இ) Character Separated Values", "ஈ) Common Separated Values"], answer: 0, officialKey: "அ" },
              { id: "q2", html: "CSV கோப்புகள் எவ்வகை கோப்பாகும்?", options: ["அ) Binary", "ஆ) Plain Text", "இ) Image", "ஈ) Executable"], answer: 1, officialKey: "ஆ" },
              { id: "q3", html: "CSV கோப்பிலிருந்து தரவைப் படிக்க பயன்படும் Python தொகுதி எது?", options: ["அ) file", "ஆ) csv", "இ) read", "ஈ) io"], answer: 1, officialKey: "ஆ" },
              { id: "q4", html: "ஒவ்வொரு வரிசையையும் Dictionary வடிவில் படிக்கப் பயன்படும் செயற்கூறு எது?", options: ["அ) csv.reader()", "ஆ) csv.DictReader()", "இ) csv.writer()", "ஈ) csv.load()"], answer: 1, officialKey: "ஆ" },
              { id: "q5", html: "CSV கோப்பில் ஒரு புதிய வரிசையை எழுத பயன்படும் csv.writer() செயற்கூறு எது?", options: ["அ) writerow()", "ஆ) writerline()", "இ) addrow()", "ஈ) insertrow()"], answer: 0, officialKey: "அ" },
              { id: "q6", html: "Scripting மொழி எவ்வாறு இயங்கும்?", options: ["அ) Compiled", "ஆ) Interpreted", "இ) Assembled", "ஈ) Linked"], answer: 1, officialKey: "ஆ" },
              { id: "q7", html: "C++ எந்த வகை தரவு வகைப்படுத்தலைக் கொண்டது?", options: ["அ) Dynamically Typed", "ஆ) Statically Typed", "இ) Untyped", "ஈ) Weakly Typed"], answer: 1, officialKey: "ஆ" },
              { id: "q8", html: "C++ கோப்பை .exe ஆக Compile செய்யப் பயன்படும் கருவி எது?", options: ["அ) Python", "ஆ) g++", "இ) getopt", "ஈ) sys"], answer: 1, officialKey: "ஆ" },
              { id: "q9", html: "கட்டளை வரி அளபுருக்களைக் கையாள பயன்படும் தொகுதி எது?", options: ["அ) os", "ஆ) sys", "இ) getopt", "ஈ) csv"], answer: 1, officialKey: "ஆ" },
              { id: "q10", html: "OS கட்டளையை நேரடியாக இயக்கப் பயன்படும் செயற்கூறு எது?", options: ["அ) os.getcwd()", "ஆ) os.chdir()", "இ) os.system()", "ஈ) os.run()"], answer: 2, officialKey: "இ" },
              { id: "q11", html: "Python-ல் SQLite தரவுதளத்தைக் கையாள பயன்படும் தொகுதி எது?", options: ["அ) mysql", "ஆ) sqlite3", "இ) db", "ஈ) pandas"], answer: 1, officialKey: "ஆ" },
              { id: "q12", html: "அனைத்து பதிவுகளையும் ஒரே முறையில் பெற பயன்படும் செயற்கூறு எது?", options: ["அ) fetchone()", "ஆ) fetchall()", "இ) fetchmany()", "ஈ) fetch()"], answer: 1, officialKey: "ஆ" },
              { id: "q13", html: "ஒரே ஒரு பதிவை மட்டும் பெற பயன்படும் செயற்கூறு எது?", options: ["அ) fetchone()", "ஆ) fetchall()", "இ) fetchmany()", "ஈ) fetch()"], answer: 0, officialKey: "அ" },
              { id: "q14", html: "மாற்றங்களை தரவுதளத்தில் நிரந்தரமாக்கப் பயன்படும் செயற்கூறு எது?", options: ["அ) connection.close()", "ஆ) connection.commit()", "இ) connection.save()", "ஈ) connection.update()"], answer: 1, officialKey: "ஆ" },
              { id: "q15", html: "அட்டவணையில் உள்ள மொத்த பதிவுகளின் எண்ணிக்கையைத் தரும் திரட்டல் செயற்கூறு எது?", options: ["அ) SUM()", "ஆ) COUNT()", "இ) AVG()", "ஈ) MAX()"], answer: 1, officialKey: "ஆ" },
              { id: "q16", html: "2D தரவை வரைபடமாகக் காண்பிக்கப் பயன்படும் Python தொகுதி எது?", options: ["அ) matplotlib.pyplot", "ஆ) matplotlib.pip", "இ) matplotlib.pib", "ஈ) matplotlib.py"], answer: 0, officialKey: "அ" },
              { id: "q17", html: "ஒரு எளிய தரவை கோட்டு வரைபடமாக வரைய பயன்படும் செயற்கூறு எது?", options: ["அ) plt.bar()", "ஆ) plt.plot()", "இ) plt.pie()", "ஈ) plt.hist()"], answer: 1, officialKey: "ஆ" },
              { id: "q18", html: "தனித்தனியான வகைகளுக்கிடையேயான ஒப்பீட்டைக் காட்சிப்படுத்த பயன்படும் செயற்கூறு எது?", options: ["அ) plt.plot()", "ஆ) plt.bar()", "இ) plt.pie()", "ஈ) plt.line()"], answer: 1, officialKey: "ஆ" },
              { id: "q19", html: "ஒரு மொத்தத்தில் ஒவ்வொரு பகுதியின் விகிதாசாரத்தைக் காட்ட பயன்படும் வரைபடம் எது?", options: ["அ) Line Chart", "ஆ) Bar Chart", "இ) Pie Chart", "ஈ) Histogram"], answer: 2, officialKey: "இ" },
              { id: "q20", html: "Histogram மற்றும் Bar Graph-க்கிடையேயான வேறுபாட்டில் சரியானது எது?", options: ["அ) Histogram தனித்தனி வகைகளைக் காட்டும்", "ஆ) Bar Graph தொடர்ச்சியான தரவைக் காட்டும்", "இ) Histogram தொடர்ச்சியான தரவைக் காட்டும்", "ஈ) இரண்டும் ஒரே மாதிரி"], answer: 2, officialKey: "இ" },
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
          { q: "CSV கோப்பு என்றால் என்ன?", ans: "CSV (Comma Separated Values) என்பது தரவை காற்புள்ளியால் பிரித்து சேமிக்கும் ஒரு எளிய, உரை அடிப்படையிலான கோப்பு வடிவம்.", officialKey: "பாடம் 13" },
          { q: "Scripting மொழி என்றால் என்ன?", ans: "Scripting மொழி என்பது ஒரு இயங்குதளத்தால் நேரடியாக இயக்கப்படும், Interpreted வடிவில் இயங்கும் மொழியாகும்.", officialKey: "பாடம் 14" },
          { q: "sys தொகுதியின் பயன் என்ன?", ans: "sys தொகுதி கட்டளை வரி அளபுருக்களைக் (command-line arguments) கையாள உதவும் — sys.argv மூலம் அளபுருக்களை அணுகலாம்.", officialKey: "பாடம் 14" },
          { q: "SQLite என்றால் என்ன?", ans: "SQLite என்பது ஒரு லேசான (Lightweight), Server-less தரவுதள மேலாண்மை அமைப்பு — Python-ல் sqlite3 தொகுதி built-in ஆக உள்ளது.", officialKey: "பாடம் 15" },
          { q: "Matplotlib என்றால் என்ன?", ans: "Matplotlib என்பது Python-ல் தரவு காட்சிப்படுத்தலுடன் தொடர்புடைய அனைத்து செயற்பாடுகளையும் கொண்ட ஒரு தொகுதி (Library) ஆகும்.", officialKey: "பாடம் 16" },
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
          { q: "csv.reader() மற்றும் csv.DictReader() ஐ வேறுபடுத்துக.", ans: "csv.reader() ஒவ்வொரு வரிசையையும் ஒரு பட்டியலாக (List) படிக்கும். csv.DictReader() ஒவ்வொரு வரிசையையும் Dictionary வடிவில் (column headers key ஆக) படிக்கும்.", officialKey: "பாடம் 13" },
          { q: "C++ கோப்பை Python மூலம் இயக்கும் படிநிலைகளை விளக்குக.", ans: "1. C++ கோப்பை g++ கம்பைலர் மூலம் .exe ஆக compile செய்ய வேண்டும். 2. os.system() மூலம் அந்த .exe கோப்பை Python நிரலிலிருந்து இயக்க வேண்டும்.", officialKey: "பாடம் 14" },
          { q: "fetchall() மற்றும் fetchone() ஐ வேறுபடுத்துக.", ans: "fetchall() அனைத்து பதிவுகளையும் ஒரே முறையில் பெறும். fetchone() ஒரே ஒரு பதிவை மட்டும் பெறும் — அடுத்த முறை அழைக்கும்போது அடுத்த பதிவைத் தரும்.", officialKey: "பாடம் 15" },
          { q: "Matplotlib-ல் உள்ள கருவிப்பட்டையின் (Toolbar) பொத்தான்களை விவரி.", ans: "முகப்புப் பொத்தான் (Home), பான் ஆக்சிஸ் பொத்தான் (Pan Axis), Zoom-in பொத்தான், Save Figure பொத்தான் ஆகியவை.", officialKey: "பாடம் 16" },
          { q: "csv.writer() மூலம் ஒரு புதிய CSV கோப்பில் தரவை எழுதும் நிரலை எழுதுக.", ans: "with open('sample.csv','w',newline='') as f:\n    writer = csv.writer(f)\n    writer.writerow(['Item','Cost'])\n    writer.writerow(['Keyboard',400])", officialKey: "பாடம் 13" },
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
            q: "CSV கோப்பினை பைத்தான் மூலம் படிக்கும் மூன்று முறைகளையும் (csv.reader, csv.DictReader, குறிப்பிட்ட நெடுவரிசைகள்) எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.",
            ans: "1. csv.reader() — ஒவ்வொரு வரிசையையும் பட்டியலாகப் படித்தல்:\nwith open('sample.csv') as f:\n    reader = csv.reader(f)\n    for row in reader: print(row)\n\n2. csv.DictReader() — ஒவ்வொரு வரிசையையும் Dictionary வடிவில் படித்தல்:\nreader = csv.DictReader(f)\nfor row in reader: print(row['Name'])\n\n3. குறிப்பிட்ட நெடுவரிசைகளை மட்டும் படித்தல்:\nnext(reader)\nfor row in reader: print(row[0], row[2])",
            officialKey: "பாடம் 13",
          },
          {
            q: "C++ மற்றும் Python-ஐ ஒப்பிட்டு, ஒவ்வொரு மொழியின் தனிச் சிறப்பியல்புகளை விரிவாக விளக்குக.",
            ans: "C++: Statically Typed — compile time-ல் தரவு வகை தீர்மானிக்கப்படும், Manual Memory Management. Python: Dynamically Typed — runtime-ல் தரவு வகை தீர்மானிக்கப்படும், Garbage Collection மூலம் தானியங்கி நினைவக நிர்வாகம். இரு மொழிகளின் பலத்தையும் இணைக்க, C++ நிரல்களை Python-லிருந்து அழைக்கும் நுட்பம் பயன்படுத்தப்படுகிறது.",
            officialKey: "பாடம் 14",
          },
          {
            q: "Python-ல் SQLite தரவுதளத்தை உருவாக்கி, அட்டவணையை உருவாக்கி, பதிவுகளைச் செருகும் முழுமையான நிரலை விரிவாக விளக்குக.",
            ans: "import sqlite3\nconnection = sqlite3.connect('AcademyDB')\ncursor = connection.cursor()\ncursor.execute('''CREATE TABLE STUDENT (Rollno INTEGER PRIMARY KEY, Sname VARCHAR(20));''')\ncursor.execute(\"INSERT INTO Student VALUES (1,'Baskar')\")\nconnection.commit()\nconnection.close()\n\nஇந்த நிரல் தரவுதளத்துடன் இணைந்து, அட்டவணையை உருவாக்கி, பதிவைச் செருகி, commit() மூலம் மாற்றங்களை நிரந்தரமாக்குகிறது.",
            officialKey: "பாடம் 15",
          },
          {
            q: "Matplotlib-ஐப் பயன்படுத்தி கோட்டு வரைபடம், பட்டை வரைபடம், வட்ட வரைபடம் ஆகிய மூன்றையும் ஒவ்வொன்றுக்கும் முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக.",
            ans: "1. கோட்டு வரைபடம்: plt.plot(years, population); plt.show()\n2. பட்டை வரைபடம்: plt.bar(y_positions, usage); plt.xticks(y_positions, labels); plt.show()\n3. வட்ட வரைபடம்: plt.pie(sizes, labels=labels, autopct='%.1f'); plt.show()\n\nஒவ்வொரு வரைபடமும் வெவ்வேறு நோக்கத்திற்கு ஏற்றது — போக்கு, ஒப்பீடு, விகிதாசாரம்.",
            officialKey: "பாடம் 16",
          },
          {
            q: "பல அட்டவணைகளை இணைத்து வினவும் முறையையும், UPDATE/DELETE செயல்பாடுகளையும் முழுமையான எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.",
            ans: "SELECT student.Rollno, student.Sname, Appointment.Duty FROM student, Appointment WHERE student.Rollno = Appointment.Rollno — இரு அட்டவணைகளையும் பொதுவான நெடுவரிசை மூலம் இணைக்கும்.\n\nUPDATE: conn.execute(\"UPDATE Student SET sname='Priyanka' WHERE RollNo=6\"); conn.commit()\nDELETE: conn.execute(\"DELETE FROM Student WHERE RollNo=2\"); conn.commit()\n\nஒவ்வொரு மாற்றத்தையும் commit() மூலம் நிரந்தரமாக்க வேண்டும்.",
            officialKey: "பாடம் 15",
          },
        ],
      },
    ],
  },
}

export default class12ComputerScienceTamilModelQA4
