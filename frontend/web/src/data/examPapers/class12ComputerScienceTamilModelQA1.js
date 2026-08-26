// frontend/web/src/data/examPapers/class12ComputerScienceTamilModelQA1.js

export const class12ComputerScienceTamilModelQA1 = {
  paperId:      "class12-computer-science-tamil-model-qa-1",
  title:        "மாதிரி வினா-விடை 1",
  classLabel:   "வகுப்பு 12",
  subject:      "கணினி அறிவியல் (தமிழ்)",
  duration:     "3.00 மணி நேரம்",
  maximumMarks: 90,
  totalPages:   6,

  pages: [
    {
      pageNumber: 1,
      blocks: [
        { type: "paper_header", content: "வகுப்பு XII — கணினி அறிவியல்\nமாதிரி வினாத்தாள் — தொகுப்பு 1" },
        { type: "metadata_row", duration: "3.00 மணி நேரம்", maximumMarks: 90, totalPages: 6 },
        { type: "instructions", content: "அனைத்து வினாக்களுக்கும் விடையளிக்கவும். ஓரங்களில் உள்ள எண்கள் முழு மதிப்பெண்களைக் குறிக்கும்." },
        { type: "part_heading", content: "பகுதி - I" },
        { type: "section_heading", content: "சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக (20 × 1 = 20)" },

        { type: "mcq_question", questionId: "1", marks: 1, content: "குறிப்பிட்ட செயலை மீண்டும் மீண்டும் செய்யப் பயன்படும் சிறிய நிரல் தொகுதி எவ்வாறு அழைக்கப்படுகிறது?", options: ["செயற்கூறு", "சொற்றொடர்", "போலிக் குறிமுறை", "தொகுப்பு"] },
        { type: "mcq_question", questionId: "2", marks: 1, content: "செயற்கூறு வரையறையில் உள்ள மாறிகள் என்று அழைக்கப்படுவது எது?", options: ["செயலுருபுக்கள்", "அளபுருக்கள்", "மாறிலிகள்", "கோவைகள்"] },
        { type: "mcq_question", questionId: "3", marks: 1, content: "பக்க விளைவுகள் இல்லாத, Deterministic ஆன செயற்கூறு எவ்வாறு அழைக்கப்படுகிறது?", options: ["Impure செயற்கூறு", "Dynamic செயற்கூறு", "Pure செயற்கூறு", "Partial செயற்கூறு"] },
        { type: "mcq_question", questionId: "4", marks: 1, content: "புதிய தரவுப் பொருள்களை உருவாக்கப் பயன்படுவது எது?", options: ["Constructors (ஆக்கிகள்)", "Destructors", "Recursive functions", "None"] },
        { type: "mcq_question", questionId: "5", marks: 1, content: "விகிதமுறு எண்கள் பொதுவாக எதன் மூலம் குறிக்கப்படுகின்றன?", options: ["Built-in", "List", "Tuple", "Abstract Data"] },
        { type: "mcq_question", questionId: "6", marks: 1, content: "ஒரு தரவு வகையின் நடத்தை மட்டும் அடிப்படையாகக் கொண்டு வரையறுப்பது எவ்வாறு அழைக்கப்படுகிறது?", options: ["Built-in Data Type", "Concrete Data Type", "Abstract Data Type (ADT)", "Primitive Data Type"] },
        { type: "mcq_question", questionId: "7", marks: 1, content: "மாறியின் பெயரை ஒரு பொருளுடன் பிணைக்கும் செயல்முறை என்ன எனப்படும்?", options: ["Binding மட்டும்", "Mapping", "Scoping", "Referencing"] },
        { type: "mcq_question", questionId: "8", marks: 1, content: "LEGB விதிமுறையில் மாறிகள் தேடப்படும் வரிசை எது?", options: ["Global → Local → Enclosed → Built-in", "Local → Enclosed → Global → Built-in", "Built-in → Global → Enclosed → Local", "Enclosed → Local → Built-in → Global"] },
        { type: "mcq_question", questionId: "9", marks: 1, content: "செயற்கூறுக்குள் மட்டும் வரையறுக்கப்பட்ட மாறி எந்த வரையெல்லையைச் சேர்ந்தது?", options: ["Global Scope", "Local Scope", "Built-in Scope", "Enclosed Scope"] },
        { type: "mcq_question", questionId: "10", marks: 1, content: "தொடர்புடைய செயற்கூறுகள், மாறிகள், வகுப்புகளை ஒன்றாகக் கொண்ட Python கோப்பு என்ன எனப்படும்?", options: ["Package", "Module", "Library", "Class"] },
        { type: "mcq_question", questionId: "11", marks: 1, content: "ஒரு நெறிமுறையின் மோசமான நிலையை (Worst case) குறிக்கப் பயன்படுவது எது?", options: ["Big Ω", "Big Θ", "Big O", "Big S"] },
        { type: "mcq_question", questionId: "12", marks: 1, content: "Binary Search-ஐ செயல்படுத்துவதற்கு பட்டியல் எவ்வாறு இருக்க வேண்டும்?", options: ["வரிசைப்படுத்தப்படாமல்", "வரிசைப்படுத்தப்பட்டு", "குறுகியதாக", "நீளமாக"] },
        { type: "mcq_question", questionId: "13", marks: 1, content: "Binary Search-ன் நேரச் சிக்கல்தன்மை என்ன?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"] },
        { type: "mcq_question", questionId: "14", marks: 1, content: "பட்டியலை இரு பாதிகளாகப் பிரித்து, வரிசைப்படுத்தி, மீண்டும் ஒன்றிணைக்கும் வரிசைப்படுத்தும் நுட்பம் எது?", options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort"] },
        { type: "mcq_question", questionId: "15", marks: 1, content: "இயங்கு நிரலாக்க வழிமுறையில் முன்பு கணக்கிடப்பட்ட மதிப்புகளைச் சேமிக்கும் நுட்பம் எது?", options: ["Recursion", "Memoization", "Iteration", "Abstraction"] },
        { type: "mcq_question", questionId: "16", marks: 1, content: "ஒற்றை உறுப்பு Tuple-ஐ உருவாக்க என்ன தேவை?", options: ["அடைப்புக்குறி மட்டும்", "trailing comma (,)", "semi-colon", "எதுவும் தேவையில்லை"] },
        { type: "mcq_question", questionId: "17", marks: 1, content: "நெறிமுறையின் பண்புகளில் ஒவ்வொரு படியும் அடிப்படையானதாக இருக்க வேண்டும் என்பது எந்தப் பண்பு?", options: ["தெளிவுத்தன்மை", "திறன் (Effectiveness)", "முடிவு", "உள்ளீடு"] },
        { type: "mcq_question", questionId: "18", marks: 1, content: "இயங்கு நிரலாக்க வழிமுறையில் Fibonacci எண்களைக் கணக்கிடும்போது நேரச் சிக்கல்தன்மை O(2ⁿ)-ல் இருந்து எதற்குக் குறையும்?", options: ["O(n²)", "O(n)", "O(log n)", "O(1)"] },
        { type: "mcq_question", questionId: "19", marks: 1, content: "செயற்கூறு தன் வரையெல்லைக்கு வெளியே உள்ள மாறியை மாற்றினால் அது என்ன எனப்படும்?", options: ["Pure தன்மை", "பக்க விளைவு (Side Effect)", "இடைமுகம்", "தரப்படுத்தல்"] },
        { type: "mcq_question", questionId: "20", marks: 1, content: "Python-ல் C++ கோப்பை .exe ஆக Compile செய்யப் பயன்படும் கருவி எது?", options: ["Python", "g++", "getopt", "sys"] },

        { type: "footer_note", content: "[ மேல் பக்கம் காண்க" },
      ],
    },
    {
      pageNumber: 2,
      blocks: [
        { type: "part_heading", content: "பகுதி - II" },
        { type: "section_heading", content: "சிறு விடை வினாக்கள் (5 × 2 = 10)" },

        { type: "question", questionId: "21", marks: 2, content: "துணை நிரல் (Subroutine) என்றால் என்ன?" },
        { type: "question", questionId: "22", marks: 2, content: "Pair என்றால் என்ன? எடுத்துக்காட்டு தருக." },
        { type: "question", questionId: "23", marks: 2, content: "வாழ்நாள் (Life Time) என்றால் என்ன?" },
        { type: "question", questionId: "24", marks: 2, content: "நெறிமுறை (Algorithm) என்றால் என்ன?" },
        { type: "question", questionId: "25", marks: 2, content: "Linear Search மற்றும் Binary Search-ஐ வேறுபடுத்துக." },

        { type: "part_heading", content: "பகுதி - III" },
        { type: "section_heading", content: "குறு விடை வினாக்கள் (5 × 3 = 15)" },

        { type: "question", questionId: "26", marks: 3, content: "Pure மற்றும் Impure செயற்கூறுகளுக்கு இடையேயான வேறுபாட்டை விளக்குக." },
        { type: "question", questionId: "27", marks: 3, content: "List-லிருந்து Tuple-ஐ உருவாக்கப் பயன்படும் tuple() செயற்கூறை எடுத்துக்காட்டுடன் விளக்குக." },
        { type: "question", questionId: "28", marks: 3, content: "LEGB விதிமுறையின் நான்கு நிலைகளையும் விவரி." },
        { type: "question", questionId: "29", marks: 3, content: "Selection Sort-ன் படிநிலைகளை எடுத்துக்காட்டுடன் விளக்குக." },
        {
          type: "or_question", questionId: "30", marks: 3,
          optionA: { content: "தொகுதிகளின் (Modules) இரு வகைகளையும் விளக்குக." },
          optionB: { content: "Set-ன் நான்கு அடிப்படை செயல்பாடுகளையும் பட்டியலிடுக." },
        },

        { type: "part_heading", content: "பகுதி - IV" },
        { type: "section_heading", content: "விரிவான வினாக்கள் (5 × 9 = 45)" },

        { type: "question", questionId: "31", marks: 9, content: "அளபுருக்கள் (Parameters) பற்றி விரிவாக விளக்குக — தரவு வகை இல்லா அளபுருக்கள் மற்றும் தரவு வகையுடன் கூடிய அளபுருக்கள் ஆகிய இரண்டையும் எடுத்துக்காட்டுகளுடன் விவரிக்கவும்." },
        {
          type: "or_question", questionId: "31", marks: 9,
          optionA: { content: "Pure மற்றும் Impure செயற்கூறுகளுக்கு இடையேயான வேறுபாட்டை அட்டவணை வடிவில் விரிவாக விளக்குக." },
          optionB: { content: "Memoization மற்றும் Associative (Monochromatic) செயற்கூறுகள் பற்றி விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "32", marks: 9, content: "தரவு அருவமாக்கம் எவ்வாறு செயல்படுத்தப்படுகிறது? எடுத்துக்காட்டுடன் விளக்குக." },
        {
          type: "or_question", questionId: "32", marks: 9,
          optionA: { content: "List என்றால் என்ன? ஏன் List, Pairs என்று அழைக்கப்படுகிறது? எடுத்துக்காட்டுடன் விவரி." },
          optionB: { content: "Concrete Data Type மற்றும் Abstract Data Type (ADT) இவற்றை ஒப்பிட்டு விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "33", marks: 9, content: "LEGB விதிமுறையை ஒரு முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "33", marks: 9,
          optionA: { content: "நான்கு வகையான வரையெல்லைகளையும் (Local, Global, Enclosed, Built-in) எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
          optionB: { content: "மேப்பிங் (Mapping) மற்றும் வாழ்நாள் (Life Time) கருத்துருக்களை உதாரணங்களுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "34", marks: 9, content: "Binary Search நுட்பத்தை படிநிலைகளாகவும் ஒரு முழுமையான எடுத்துக்காட்டுடனும் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "34", marks: 9,
          optionA: { content: "வரிசைப்படுத்தும் நுட்பங்களான Bubble Sort, Selection Sort, Insertion Sort ஆகியவற்றை எடுத்துக்காட்டுகளுடன் ஒப்பிட்டு விரிவாக விளக்குக." },
          optionB: { content: "இயங்கு நிரலாக்க வழிமுறையை Fibonacci எண்களின் எடுத்துக்காட்டுடன் விரிவாக விளக்குக." },
        },

        { type: "question", questionId: "35", marks: 9, content: "List-ல் உறுப்புகளைச் சேர்க்கும் (append, extend, insert) மற்றும் நீக்கும் (remove, pop, clear, del) செயற்கூறுகளை எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
        {
          type: "or_question", questionId: "35", marks: 9,
          optionA: { content: "Tuple-ன் சிறப்பியல்புகளையும் (Immutability) Packing/Unpacking கருத்துருவையும் எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக." },
          optionB: { content: "நெறிமுறையை பகுப்பாய்வு செய்வது ஏன் முக்கியம்? Time மற்றும் Space Complexity கருத்துருக்களுடன் விரிவாக விளக்குக." },
        },

        { type: "footer_note", content: "- o O o -" },
      ],
    },
  ],

  practice: {
    meta: {
      subject:      "கணினி அறிவியல் (தமிழ்) — வகுப்பு 12",
      unit:         "மாதிரி வினா-விடை 1 — முழுப் பாடத்திட்டம்",
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
              { id: "q1", html: "குறிப்பிட்ட செயலை மீண்டும் மீண்டும் செய்யப் பயன்படும் சிறிய நிரல் தொகுதி எவ்வாறு அழைக்கப்படுகிறது?", options: ["அ) செயற்கூறு", "ஆ) சொற்றொடர்", "இ) போலிக் குறிமுறை", "ஈ) தொகுப்பு"], answer: 0, officialKey: "அ" },
              { id: "q2", html: "செயற்கூறு வரையறையில் உள்ள மாறிகள் என்று அழைக்கப்படுவது எது?", options: ["அ) செயலுருபுக்கள்", "ஆ) அளபுருக்கள்", "இ) மாறிலிகள்", "ஈ) கோவைகள்"], answer: 1, officialKey: "ஆ" },
              { id: "q3", html: "பக்க விளைவுகள் இல்லாத, Deterministic ஆன செயற்கூறு எவ்வாறு அழைக்கப்படுகிறது?", options: ["அ) Impure செயற்கூறு", "ஆ) Dynamic செயற்கூறு", "இ) Pure செயற்கூறு", "ஈ) Partial செயற்கூறு"], answer: 2, officialKey: "இ" },
              { id: "q4", html: "புதிய தரவுப் பொருள்களை உருவாக்கப் பயன்படுவது எது?", options: ["அ) Constructors (ஆக்கிகள்)", "ஆ) Destructors", "இ) Recursive functions", "ஈ) None"], answer: 0, officialKey: "அ" },
              { id: "q5", html: "விகிதமுறு எண்கள் பொதுவாக எதன் மூலம் குறிக்கப்படுகின்றன?", options: ["அ) Built-in", "ஆ) List", "இ) Tuple", "ஈ) Abstract Data"], answer: 2, officialKey: "இ" },
              { id: "q6", html: "ஒரு தரவு வகையின் நடத்தை மட்டும் அடிப்படையாகக் கொண்டு வரையறுப்பது எவ்வாறு அழைக்கப்படுகிறது?", options: ["அ) Built-in Data Type", "ஆ) Concrete Data Type", "இ) Abstract Data Type (ADT)", "ஈ) Primitive Data Type"], answer: 2, officialKey: "இ" },
              { id: "q7", html: "மாறியின் பெயரை ஒரு பொருளுடன் பிணைக்கும் செயல்முறை என்ன எனப்படும்?", options: ["அ) Binding மட்டும்", "ஆ) Mapping", "இ) Scoping", "ஈ) Referencing"], answer: 1, officialKey: "ஆ" },
              { id: "q8", html: "LEGB விதிமுறையில் மாறிகள் தேடப்படும் வரிசை எது?", options: ["அ) Global → Local → Enclosed → Built-in", "ஆ) Local → Enclosed → Global → Built-in", "இ) Built-in → Global → Enclosed → Local", "ஈ) Enclosed → Local → Built-in → Global"], answer: 1, officialKey: "ஆ" },
              { id: "q9", html: "செயற்கூறுக்குள் மட்டும் வரையறுக்கப்பட்ட மாறி எந்த வரையெல்லையைச் சேர்ந்தது?", options: ["அ) Global Scope", "ஆ) Local Scope", "இ) Built-in Scope", "ஈ) Enclosed Scope"], answer: 1, officialKey: "ஆ" },
              { id: "q10", html: "தொடர்புடைய செயற்கூறுகள், மாறிகள், வகுப்புகளை ஒன்றாகக் கொண்ட Python கோப்பு என்ன எனப்படும்?", options: ["அ) Package", "ஆ) Module", "இ) Library", "ஈ) Class"], answer: 1, officialKey: "ஆ" },
              { id: "q11", html: "ஒரு நெறிமுறையின் மோசமான நிலையை (Worst case) குறிக்கப் பயன்படுவது எது?", options: ["அ) Big Ω", "ஆ) Big Θ", "இ) Big O", "ஈ) Big S"], answer: 2, officialKey: "இ" },
              { id: "q12", html: "Binary Search-ஐ செயல்படுத்துவதற்கு பட்டியல் எவ்வாறு இருக்க வேண்டும்?", options: ["அ) வரிசைப்படுத்தப்படாமல்", "ஆ) வரிசைப்படுத்தப்பட்டு", "இ) குறுகியதாக", "ஈ) நீளமாக"], answer: 1, officialKey: "ஆ" },
              { id: "q13", html: "Binary Search-ன் நேரச் சிக்கல்தன்மை என்ன?", options: ["அ) O(n)", "ஆ) O(n²)", "இ) O(log n)", "ஈ) O(1)"], answer: 2, officialKey: "இ" },
              { id: "q14", html: "பட்டியலை இரு பாதிகளாகப் பிரித்து, வரிசைப்படுத்தி, மீண்டும் ஒன்றிணைக்கும் வரிசைப்படுத்தும் நுட்பம் எது?", options: ["அ) Bubble Sort", "ஆ) Selection Sort", "இ) Insertion Sort", "ஈ) Merge Sort"], answer: 3, officialKey: "ஈ" },
              { id: "q15", html: "இயங்கு நிரலாக்க வழிமுறையில் முன்பு கணக்கிடப்பட்ட மதிப்புகளைச் சேமிக்கும் நுட்பம் எது?", options: ["அ) Recursion", "ஆ) Memoization", "இ) Iteration", "ஈ) Abstraction"], answer: 1, officialKey: "ஆ" },
              { id: "q16", html: "ஒற்றை உறுப்பு Tuple-ஐ உருவாக்க என்ன தேவை?", options: ["அ) அடைப்புக்குறி மட்டும்", "ஆ) trailing comma (,)", "இ) semi-colon", "ஈ) எதுவும் தேவையில்லை"], answer: 1, officialKey: "ஆ" },
              { id: "q17", html: "நெறிமுறையின் பண்புகளில் ஒவ்வொரு படியும் அடிப்படையானதாக இருக்க வேண்டும் என்பது எந்தப் பண்பு?", options: ["அ) தெளிவுத்தன்மை", "ஆ) திறன் (Effectiveness)", "இ) முடிவு", "ஈ) உள்ளீடு"], answer: 1, officialKey: "ஆ" },
              { id: "q18", html: "இயங்கு நிரலாக்க வழிமுறையில் Fibonacci எண்களைக் கணக்கிடும்போது நேரச் சிக்கல்தன்மை O(2ⁿ)-ல் இருந்து எதற்குக் குறையும்?", options: ["அ) O(n²)", "ஆ) O(n)", "இ) O(log n)", "ஈ) O(1)"], answer: 1, officialKey: "ஆ" },
              { id: "q19", html: "செயற்கூறு தன் வரையெல்லைக்கு வெளியே உள்ள மாறியை மாற்றினால் அது என்ன எனப்படும்?", options: ["அ) Pure தன்மை", "ஆ) பக்க விளைவு (Side Effect)", "இ) இடைமுகம்", "ஈ) தரப்படுத்தல்"], answer: 1, officialKey: "ஆ" },
              { id: "q20", html: "Python-ல் C++ கோப்பை .exe ஆக Compile செய்யப் பயன்படும் கருவி எது?", options: ["அ) Python", "ஆ) g++", "இ) getopt", "ஈ) sys"], answer: 1, officialKey: "ஆ" },
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
          { q: "துணை நிரல் (Subroutine) என்றால் என்ன?", ans: "துணை நிரல் என்பது ஒரு குறிப்பிட்ட செயலை மீண்டும் மீண்டும் செய்யப் பயன்படும் சிறிய நிரல் தொகுதியாகும். நிரலாக்க மொழிகளில் இவை செயற்கூறுகள் (Functions) என்று அழைக்கப்படுகின்றன.", officialKey: "பாடம் 1" },
          { q: "Pair என்றால் என்ன? எடுத்துக்காட்டு தருக.", ans: "Pair என்பது இரு மதிப்புகளை ஒன்றாக இணைக்கும் எளிய கூட்டுத் தரவு அமைப்பு. எடுத்துக்காட்டு: rational number-ன் numer, denom ஒரு Pair ஆகக் குறிக்கப்படலாம்.", officialKey: "பாடம் 2" },
          { q: "வாழ்நாள் (Life Time) என்றால் என்ன?", ans: "ஒரு மாறி குறிமுறையில் பயன்படும் நேரமே அதனுடைய வாழ்நாள் (Life Time) எனப்படும்.", officialKey: "பாடம் 3" },
          { q: "நெறிமுறை (Algorithm) என்றால் என்ன?", ans: "நெறிமுறை என்பது ஒரு குறிப்பிட்ட பணியைச் செய்ய பயன்படும் தெளிவான வழிமுறைகளின் தொடர்ச்சி ஆகும்.", officialKey: "பாடம் 4" },
          { q: "Linear Search மற்றும் Binary Search-ஐ வேறுபடுத்துக.", ans: "Linear Search ஒவ்வொரு உறுப்பையும் வரிசையாக ஒப்பிடும். Binary Search வரிசைப்படுத்தப்பட்ட பட்டியலில் மட்டும் செயல்படும், நடுப்புள்ளியை ஒப்பிட்டு தேடல் வரம்பை பாதியாகக் குறைக்கும்.", officialKey: "பாடம் 4" },
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
          { q: "Pure மற்றும் Impure செயற்கூறுகளுக்கு இடையேயான வேறுபாட்டை விளக்குக.", ans: "Pure செயற்கூறுகள் பக்க விளைவுகள் இல்லாதவை, Deterministic ஆனவை — அதே உள்ளீட்டிற்கு எப்போதும் அதே வெளியீட்டைத் தரும். Impure செயற்கூறுகள் பக்க விளைவுகள் கொண்டவை, Non-deterministic ஆக இருக்கலாம்.", officialKey: "பாடம் 1" },
          { q: "List-லிருந்து Tuple-ஐ உருவாக்கப் பயன்படும் tuple() செயற்கூறை எடுத்துக்காட்டுடன் விளக்குக.", ans: "tuple() செயற்கூறு ஒரு List-ஐ Tuple ஆக மாற்றும். எடுத்துக்காட்டு: MyTup5 = tuple([23,45,90]); print(MyTup5) — வெளியீடு: (23,45,90).", officialKey: "பாடம் 9" },
          { q: "LEGB விதிமுறையின் நான்கு நிலைகளையும் விவரி.", ans: "1. Local — தற்போதைய செயற்கூறுக்குள் முதலில் தேடப்படும். 2. Enclosed — உள்ளடங்கிய செயற்கூறின் வெளிப்புற செயற்கூறுக்குள் தேடப்படும். 3. Global — தொகுதி மட்டத்தில் தேடப்படும். 4. Built-in — Python-ன் முன்பே வரையறுக்கப்பட்ட பெயர்கள் கடைசியாகத் தேடப்படும்.", officialKey: "பாடம் 3" },
          { q: "Selection Sort-ன் படிநிலைகளை எடுத்துக்காட்டுடன் விளக்குக.", ans: "1. பட்டியலில் மிகச்சிறிய உறுப்பைக் கண்டுபிடித்து, முதல் இடத்துடன் இடமாற்றம் செய்யவும். 2. மீதமுள்ள பட்டியலில் மிகச்சிறிய உறுப்பைக் கண்டுபிடித்து, இரண்டாம் இடத்துடன் இடமாற்றம் செய்யவும். 3. இதைத் தொடர்ந்து அனைத்து உறுப்புகளும் வரிசைப்படுத்தப்படும் வரை செய்யவும்.", officialKey: "பாடம் 4" },
          { q: "தொகுதிகளின் (Modules) இரு வகைகளையும் விளக்குக.", ans: "1. உள்ளமைந்த தொகுதிகள் (Built-in Modules) — Python மொழியுடன் வரும் தொகுதிகள் (math, random). 2. பயனர் வரையறுத்த தொகுதிகள் (User-defined Modules) — நிரலாசிரியர் தானே எழுதும் தொகுதிகள்.", officialKey: "பாடம் 3" },
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
            q: "அளபுருக்கள் (Parameters) பற்றி விரிவாக விளக்குக — தரவு வகை இல்லா அளபுருக்கள் மற்றும் தரவு வகையுடன் கூடிய அளபுருக்கள் ஆகிய இரண்டையும் எடுத்துக்காட்டுகளுடன் விவரிக்கவும்.",
            ans: "அளபுருக்கள் என்பது செயற்கூறு வரையறையில் உள்ள மாறிகள் ஆகும். இவை இரு வகைப்படும்:\n\n1. தரவு வகை இல்லா அளபுருக்கள்:\nlet rec pow a b:= if b=0 then 1 else a * pow a (b-1)\n\n2. தரவு வகையுடன் கூடிய அளபுருக்கள்:\nlet rec pow (a: int) (b: int) : int:= if b=0 then 1 else a * pow b (a-1)\n\nதரவு வகையுடன் கூடிய அளபுருக்கள், செயற்கூறு எதிர்பார்க்கும் உள்ளீட்டு வகையை தெளிவாக்கி, குறியீட்டுப் பிழைகளை முன்கூட்டியே கண்டறிய உதவுகின்றன.",
            officialKey: "பாடம் 1",
          },
          {
            q: "தரவு அருவமாக்கம் எவ்வாறு செயல்படுத்தப்படுகிறது? எடுத்துக்காட்டுடன் விளக்குக.",
            ans: "தரவு அருவமாக்கம் ஆக்கிகள் (Constructors) மற்றும் தெரிவுச்சிகள் (Selectors) மூலம் செயல்படுத்தப்படுகிறது.\n\nஎடுத்துக்காட்டு — City ADT:\ncity = makecity(name, lat, lon)\ngetname(city), getlat(city), getlon(city)\n\nmakecity ஒரு புதிய city பொருளை உருவாக்கும் ஆக்கி. getname/getlat/getlon ஆகியவை அப்பொருளிலிருந்து மதிப்புகளை மீட்டெடுக்கும் தெரிவுச்சிகள். இதனால் நிரலாசிரியர், city எப்படி உள்ளூர் ரீதியாக சேமிக்கப்பட்டுள்ளது என அறியத் தேவையில்லாமல் அதைப் பயன்படுத்த முடியும்.",
            officialKey: "பாடம் 2",
          },
          {
            q: "LEGB விதிமுறையை ஒரு முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக.",
            ans: "LEGB விதிமுறை Local → Enclosed → Global → Built-in வரிசையில் மாறிகளைத் தேடும்.\n\nஎடுத்துக்காட்டு:\nx = 'outer x variable'\ndef display():\n    x = 'inner x variable'\n    print(x)\nprint(x)\ndisplay()\n\nவெளியீடு: outer x variable, inner x variable.\n\nமுதல் print(x) செயற்கூறுக்கு வெளியே இயங்குவதால், x-ன் Global மதிப்பு அச்சிடப்படுகிறது. display() அழைக்கப்படும்போது, அதற்குள் ஒரு புதிய Local x உருவாக்கப்பட்டு 'inner x variable' என அச்சிடப்படுகிறது.",
            officialKey: "பாடம் 3",
          },
          {
            q: "Binary Search நுட்பத்தை படிநிலைகளாகவும் ஒரு முழுமையான எடுத்துக்காட்டுடனும் விரிவாக விளக்குக.",
            ans: "Binary Search வரிசைப்படுத்தப்பட்ட பட்டியலில், நடுப்புள்ளியுடன் (mid) ஒப்பிட்டு தேடல் வரம்பைப் பாதியாகக் குறைத்துக்கொண்டே செல்லும் நுட்பமாகும்.\n\nபடிநிலைகள்:\n1. low=0, high=n-1 எனத் தொடங்கவும்.\n2. mid=(low+high)/2 எனக் கணக்கிடவும்.\n3. target=values[mid] எனில் கிடைத்தது.\n4. target<values[mid] எனில் high=mid-1.\n5. target>values[mid] எனில் low=mid+1.\n6. low>high ஆகும் வரை தொடரவும்.\n\nBinary Search-ன் நேரச் சிக்கல்தன்மை O(log n) — Linear Search-ன் O(n)-ஐ விட வேகமானது.",
            officialKey: "பாடம் 4",
          },
          {
            q: "List-ல் உறுப்புகளைச் சேர்க்கும் (append, extend, insert) மற்றும் நீக்கும் (remove, pop, clear, del) செயற்கூறுகளை எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.",
            ans: "சேர்க்கும் செயற்கூறுகள்:\n1. append(element) — இறுதியில் ஒரு உறுப்பைச் சேர்க்கும்.\n2. extend([elements]) — பல உறுப்புகளைச் சேர்க்கும்.\n3. insert(position, element) — குறிப்பிட்ட இடத்தில் செருகும்.\n\nநீக்கும் செயற்கூறுகள்:\n1. del List[index] — குறிப்பிட்ட இடத்தில் உள்ள உறுப்பை நீக்கும்.\n2. remove(value) — மதிப்பின் மூலம் நீக்கும்.\n3. pop([index]) — உறுப்பை நீக்கி, மதிப்பையும் திருப்பித்தரும்.\n4. clear() — அனைத்து உறுப்புகளையும் நீக்கும்.\n\nஎடுத்துக்காட்டு: MyList=[12,89,34]; MyList.remove(89); print(MyList) — [12,34].",
            officialKey: "பாடம் 9",
          },
        ],
      },
    ],
  },
}

export default class12ComputerScienceTamilModelQA1
