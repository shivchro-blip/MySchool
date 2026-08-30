export default {
  "meta": {
    "subject": "கணினி அறிவியல் -- வகுப்பு XI",
    "unit": "பாடம் 15 -- பல்லுருவாக்கம்",
    "time": "3.00 மணி நேரம்",
    "totalMarks": 52,
    "instructions": "சமச்சீர் கல்வி -- அனைத்து வினாக்களுக்கும் விடையளிக்கவும்"
  },
  "parts": [
    {
      "id": "p1", "navLabel": "பகுதி - அ (10 x 1)", "title": "பகுதி - அ: சரியான விடையைத் தேர்ந்தெடுக்கவும்",
      "type": "mcq", "scoreMax": 10, "marksPer": 1,
      "sections": [
        {
          "label": "பல்லுருவாக்கம்",
          "questions": [
            { "id": "q1", "html": "Polymorphism என்ற சொல்லின் பொருள் என்ன?", "options": ["அ) ஒரு வடிவம்", "ஆ) பல வடிவங்கள்", "இ) வடிவமில்லாதது", "ஈ) மாறாத வடிவம்"], "answer": 1, "hint": "\"பல வடிவங்கள்\"." },
            { "id": "q2", "html": "ஒரே பெயர் கொண்ட பல செயற்கூறுகளை வெவ்வேறு அளவுருக்களுடன் வரையறுப்பது எது?", "options": ["அ) Inheritance", "ஆ) Function Overloading", "இ) Encapsulation", "ஈ) Abstraction"], "answer": 1, "hint": "செயற்கூறு மிகைப்படுத்தல்." },
            { "id": "q3", "html": "Function Overloading-இல் மட்டும் மாறினால் போதாதது எது?", "options": ["அ) அளவுருக்களின் எண்ணிக்கை", "ஆ) அளவுருக்களின் வகை", "இ) return type மட்டும்", "ஈ) செயற்கூற்றின் பெயர்"], "answer": 2, "hint": "Return type மட்டும் மாற்றினால் போதாது." },
            { "id": "q4", "html": "ஏற்கெனவே உள்ள செயலிகளுக்கு புதிய பொருள் கொடுப்பது எது?", "options": ["அ) Function Overloading", "ஆ) Operator Overloading", "இ) Inheritance", "ஈ) Encapsulation"], "answer": 1, "hint": "செயலி மிகைப்படுத்தல்." },
            { "id": "q5", "html": "Operator Overloading-க்கு பயன்படும் keyword எது?", "options": ["அ) virtual", "ஆ) operator", "இ) friend", "ஈ) static"], "answer": 1, "hint": "operator + (...)." },
            { "id": "q6", "html": "தொகுத்தல் நேரப் பல்லுருவாக்கத்தின் (Compile-time) எடுத்துக்காட்டு எது?", "options": ["அ) Virtual Function", "ஆ) Function Overloading", "இ) Inheritance", "ஈ) Destructor"], "answer": 1, "hint": "Compile-time Polymorphism." },
            { "id": "q7", "html": "இயக்க நேரப் பல்லுருவாக்கத்திற்கு (Run-time) பயன்படுவது எது?", "options": ["அ) Function Overloading", "ஆ) Virtual Functions", "இ) Constructor", "ஈ) Structure"], "answer": 1, "hint": "Run-time Polymorphism." },
            { "id": "q8", "html": "int add(int,int) மற்றும் float add(float,float) — இது எதற்கான எடுத்துக்காட்டு?", "options": ["அ) Inheritance", "ஆ) Function Overloading", "இ) Constructor", "ஈ) Destructor"], "answer": 1, "hint": "வெவ்வேறு தரவு வகை." },
            { "id": "q9", "html": "complex operator + (complex c2) — இது எதற்கான தொடரமைப்பு?", "options": ["அ) Function Overloading", "ஆ) Operator Overloading", "இ) Constructor", "ஈ) Inheritance"], "answer": 1, "hint": "செயலி மிகைப்படுத்தல் தொடரமைப்பு." },
            { "id": "q10", "html": "Function Overloading-ஐ தேர்ந்தெடுக்க பயன்படுவது யார்?", "options": ["அ) பயனாளர்", "ஆ) தொகுப்பாளர் (Compiler)", "இ) இயக்க அமைப்பு", "ஈ) வன்பொருள்"], "answer": 1, "hint": "Compiler தானாகத் தேர்வு செய்யும்." }
          ]
        }
      ]
    },
    {
      "id": "p2", "navLabel": "பகுதி - ஆ (5 x 2)", "title": "பகுதி - ஆ: குறு வினா",
      "type": "short-essay", "scoreMax": 10, "marksPer": 2,
      "questions": [
        { "q": "Polymorphism என்றால் என்ன?", "ans": "ஒரே பெயர் கொண்ட செயற்கூறு/செயலி, வெவ்வேறு சூழல்களில் வெவ்வேறு வகையில் செயல்படும் திறனே Polymorphism ஆகும்." },
        { "q": "Function Overloading என்றால் என்ன?", "ans": "ஒரே பெயர் கொண்ட பல செயற்கூறுகளை, வெவ்வேறு அளவுருக்களின் எண்ணிக்கை/வகையுடன் வரையறுப்பதே Function Overloading ஆகும்." },
        { "q": "Operator Overloading என்றால் என்ன?", "ans": "C++-இல் ஏற்கெனவே உள்ள செயலிகளுக்கு பயனாளர் வரையறுத்த Class-களுக்கான புதிய பொருள் கொடுப்பதே Operator Overloading ஆகும்." },
        { "q": "Compile-time மற்றும் Run-time Polymorphism வேறுபடுத்துக.", "ans": "Compile-time Polymorphism Function/Operator Overloading மூலம். Run-time Polymorphism Virtual Functions மூலம் நிகழும்." },
        { "q": "Function Overloading-இன் கட்டுப்பாட்டைத் (Restriction) தருக.", "ans": "return type மட்டும் மாறினால் Function Overloading சாத்தியமில்லை; அளவுருக்களின் எண்ணிக்கை அல்லது வகை மாற வேண்டும்." }
      ]
    },
    {
      "id": "p3", "navLabel": "பகுதி - இ (4 x 3)", "title": "பகுதி - இ: சிறு வினா",
      "type": "short-essay", "scoreMax": 12, "marksPer": 3,
      "questions": [
        { "q": "Function Overloading-ஐ எடுத்துக்காட்டுடன் விளக்குக.", "ans": "int add(int a,int b){return a+b;}\nfloat add(float a,float b){return a+b;}\n\nஇரு செயற்கூறுகளும் \"add\" எனும் ஒரே பெயரைக் கொண்டவை, ஆனால் தரவு வகை வேறுபடுகிறது; Compiler அழைப்பின் அளவுருவைப் பொருத்து சரியானதைத் தேர்வு செய்யும்." },
        { "q": "Operator Overloading-ஐ எடுத்துக்காட்டுடன் விளக்குக.", "ans": "complex operator+(complex c2){ complex c3; c3.real=real+c2.real; return c3; }\n\nஇது + செயலிக்கு புதிய பொருள் கொடுத்து, இரு complex பொருள்களை நேரடியாகக் கூட்ட உதவுகிறது." },
        { "q": "Polymorphism-இன் இரு வகைகளை (Compile-time, Run-time) விளக்குக.", "ans": "Compile-time Polymorphism — Function/Operator Overloading; தொகுக்கும் நேரத்திலேயே தீர்மானிக்கப்படும்.\nRun-time Polymorphism — Virtual Functions மூலம்; நிரல் இயங்கும்போது தீர்மானிக்கப்படும்." },
        { "q": "Function Overloading எப்போது செல்லுபடியாகாது என்பதை விளக்குக.", "ans": "Return type மட்டும் மாறி, அளவுருக்களின் எண்ணிக்கையும் வகையும் மாறாவிட்டால் Function Overloading செல்லுபடியாகாது; தொகுப்பாளர் இதனை பிழையாகக் கருதும்." }
      ]
    },
    {
      "id": "p4", "navLabel": "பகுதி - ஈ (4 x 5)", "title": "பகுதி - ஈ: பெரு வினா",
      "type": "long-essay", "scoreMax": 20, "marksPer": 5,
      "questions": [
        { "q": "Function Overloading-ஐ மூன்று வெவ்வேறு எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.", "ans": "int add(int a, int b) { return a+b; }\nfloat add(float a, float b) { return a+b; }\nint add(int a, int b, int c) { return a+b+c; }\n\nமூன்று செயற்கூறுகளும் \"add\" எனும் ஒரே பெயர்; முதலாவது/இரண்டாவது தரவு வகையால் வேறுபடும், மூன்றாவது அளவுருக்களின் எண்ணிக்கையால் வேறுபடும். Compiler அழைப்பின் வடிவத்தைப் பொருத்து சரியான செயற்கூற்றைத் தேர்வு செய்யும்." },
        { "q": "Operator Overloading-ஐ complex எண் கூட்டல் எடுத்துக்காட்டுடன் விரிவாக விளக்குக.", "ans": "class complex {\npublic:\n  int real, imag;\n  complex operator + (complex c2) {\n    complex c3;\n    c3.real = real + c2.real;\n    c3.imag = imag + c2.imag;\n    return c3;\n  }\n};\n\nint main() {\n  complex c1, c2, c3;\n  c1.real=2; c1.imag=3;\n  c2.real=4; c2.imag=5;\n  c3 = c1 + c2; // Operator Overloading\n  cout << c3.real << \" \" << c3.imag;\n}" },
        { "q": "Compile-time மற்றும் Run-time Polymorphism-ஐ ஒப்பிட்டு விரிவாக விளக்குக.", "ans": "Compile-time Polymorphism — தொகுக்கும் நேரத்திலேயே எந்த செயற்கூறு/செயலி அழைக்கப்பட வேண்டும் என தீர்மானிக்கப்படும்; Function Overloading, Operator Overloading இதன் எடுத்துக்காட்டுகள்.\n\nRun-time Polymorphism — நிரல் இயங்கும்போது தீர்மானிக்கப்படும்; Virtual Functions மூலம் (உயர்நிலைப் பாடத்தில் விரிவாகக் கற்கப்படும்)." },
        { "q": "Polymorphism ஏன் OOP-இன் முக்கிய அம்சம் என்பதை எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.", "ans": "Polymorphism ஒரே பெயரைக் கொண்டு பல்வேறு தரவு வகைகளுக்கும், சூழல்களுக்கும் பொருந்தக்கூடிய நிரலை எழுத அனுமதிக்கிறது — இது குறியீட்டை சுருக்கமாகவும் படிக்க எளிதாகவும் ஆக்குகிறது. உ.ம், ஒரே \"add\" செயற்கூறு int, float, multiple values-க்கும் வேலை செய்யும்; ஒரே \"+\" செயலி எண்களுக்கும் complex objects-க்கும் பயன்படும். இது reusability-ஐயும் flexibility-ஐயும் அதிகரிக்கிறது." }
      ]
    }
  ]
}
