export default {
  "meta": {
    "subject": "கணினி அறிவியல் -- வகுப்பு XI",
    "unit": "பாடம் 14 -- இனக்குழுக்கள் மற்றும் பொருள்கள்",
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
          "label": "இனக்குழுக்கள்",
          "questions": [
            { "id": "q1", "html": "இயல்புநிலை அணுகல் மட்டம் எது?", "options": ["அ) public", "ஆ) private", "இ) protected", "ஈ) global"], "answer": 1, "hint": "Class-இன் default access." },
            { "id": "q2", "html": "வெளியிலிருந்தும் அணுகக்கூடிய மட்டம் எது?", "options": ["அ) private", "ஆ) protected", "இ) public", "ஈ) local"], "answer": 2, "hint": "Public members." },
            { "id": "q3", "html": "இனக்குழுவுக்கு வெளியே செயற்கூறு வரையறுக்க பயன்படும் குறியீடு எது?", "options": ["அ) ::", "ஆ) .", "இ) ->", "ஈ) &&"], "answer": 0, "hint": "Scope Resolution Operator." },
            { "id": "q4", "html": "ஒரு பொருள் உருவாகும்போது தானாக அழைக்கப்படும் செயற்கூறு எது?", "options": ["அ) Destructor", "ஆ) Constructor", "இ) Member Function", "ஈ) main()"], "answer": 1, "hint": "Class பெயருடன் அதே பெயர்." },
            { "id": "q5", "html": "அளவுருக்கள் இல்லாத Constructor எது?", "options": ["அ) Parameterized", "ஆ) Default", "இ) Copy", "ஈ) Static"], "answer": 1, "hint": "Non-Parameterized." },
            { "id": "q6", "html": "ஏற்கெனவே உள்ள பொருளின் மதிப்புகளை நகலெடுக்கும் Constructor எது?", "options": ["அ) Default", "ஆ) Parameterized", "இ) Copy", "ஈ) Destructor"], "answer": 2, "hint": "Copy Constructor." },
            { "id": "q7", "html": "பொருள் அழிக்கப்படும்போது தானாக அழைக்கப்படும் செயற்கூறு எது?", "options": ["அ) Constructor", "ஆ) Destructor", "இ) Static Function", "ஈ) Friend Function"], "answer": 1, "hint": "~classname()." },
            { "id": "q8", "html": "செயற்கூற்றுக்கு வெளியே அறிவிக்கப்படும் பொருள் எது?", "options": ["அ) Local Object", "ஆ) Global Object", "இ) Static Object", "ஈ) Private Object"], "answer": 1, "hint": "Global Object." },
            { "id": "q9", "html": "ஒரே இனக்குழுவைச் சேர்ந்த பல பொருள்களைச் சேமிக்க பயன்படுவது எது?", "options": ["அ) Structure", "ஆ) Array of Objects", "இ) Function", "ஈ) Pointer"], "answer": 1, "hint": "பொருள்களின் அணி." },
            { "id": "q10", "html": "மரபுரிமைப் பெறும் இனக்குழுக்களுக்குள்ளும் அணுகக்கூடிய மட்டம் எது?", "options": ["அ) private", "ஆ) protected", "இ) public", "ஈ) local"], "answer": 1, "hint": "Protected members." }
          ]
        }
      ]
    },
    {
      "id": "p2", "navLabel": "பகுதி - ஆ (5 x 2)", "title": "பகுதி - ஆ: குறு வினா",
      "type": "short-essay", "scoreMax": 10, "marksPer": 2,
      "questions": [
        { "q": "இனக்குழு (Class) என்றால் என்ன?", "ans": "தரவு உறுப்புகளையும் செயற்கூறுகளையும் கொண்ட ஒரு பயனாளர் வரையறுத்த தரவு வகையே Class ஆகும்." },
        { "q": "private, protected, public அணுகல் மட்டங்களை வேறுபடுத்துக.", "ans": "private — Class-க்குள் மட்டும். protected — Class மற்றும் மரபுரிமைப் பெறும் Class-க்குள். public — வெளியிலிருந்தும் அணுகக்கூடியது." },
        { "q": "Constructor என்றால் என்ன?", "ans": "பொருள் உருவாகும்போது தானாக அழைக்கப்படும், Class பெயருடன் அதே பெயர் கொண்ட சிறப்புச் செயற்கூறே Constructor ஆகும்." },
        { "q": "Default Constructor மற்றும் Parameterized Constructor வேறுபடுத்துக.", "ans": "Default Constructor அளவுருக்கள் இல்லாதது. Parameterized Constructor தொடக்க மதிப்புகளை அளவுருக்களாகப் பெறுவது." },
        { "q": "Destructor என்றால் என்ன?", "ans": "பொருள் அழிக்கப்படும்போது தானாக அழைக்கப்பட்டு நினைவகத்தை விடுவிக்கும் செயற்கூறே Destructor ஆகும் (~classname())." }
      ]
    },
    {
      "id": "p3", "navLabel": "பகுதி - இ (4 x 3)", "title": "பகுதி - இ: சிறு வினா",
      "type": "short-essay", "scoreMax": 12, "marksPer": 3,
      "questions": [
        { "q": "Inline மற்றும் Outline உறுப்புச் செயற்கூறுகளை வேறுபடுத்துக.", "ans": "Inline — Class-க்குள்ளேயே செயற்கூறு வரையறுக்கப்படும். Outline — Class-க்கு வெளியே, Scope Resolution Operator (::) பயன்படுத்தி வரையறுக்கப்படும்." },
        { "q": "மூன்று வகை Constructor-களை (Default, Parameterized, Copy) விளக்குக.", "ans": "1. Default — அளவுருக்கள் இல்லை.\n2. Parameterized — தொடக்க மதிப்புகளை அளவுருவாகப் பெறும்.\n3. Copy — ஏற்கெனவே உள்ள பொருளிலிருந்து மதிப்புகளை நகலெடுக்கும்." },
        { "q": "Global Object மற்றும் Local Object வேறுபடுத்துக.", "ans": "Global Object செயற்கூற்றுக்கு வெளியே அறிவிக்கப்பட்டு நிரல் முழுவதும் அணுகக்கூடியது. Local Object ஒரு செயற்கூற்றுக்குள் மட்டும் அணுகக்கூடியது." },
        { "q": "பொருள்களின் அணியை (Array of Objects) எடுத்துக்காட்டுடன் விளக்குக.", "ans": "class Student{public: int rollno; float avg;};\nStudent s[3];\nஇது ஒரே Class-இன் பல பொருள்களை ஒரு அணியில் சேமிக்க உதவுகிறது; ஒவ்வொரு s[i] ஒரு தனி பொருள்." }
      ]
    },
    {
      "id": "p4", "navLabel": "பகுதி - ஈ (4 x 5)", "title": "பகுதி - ஈ: பெரு வினா",
      "type": "long-essay", "scoreMax": 20, "marksPer": 5,
      "questions": [
        { "q": "இனக்குழு வரையறையையும் அணுகல் மட்டங்களையும் (private, protected, public) குறியீட்டு எடுத்துக்காட்டுடன் விரிவாக விளக்குக.", "ans": "class Box {\nprivate: double width;\npublic: void setWidth(double w){ width=w; }\nvoid printWidth(){ cout<<width; }\n};\n\nprivate — Class-க்குள் மட்டும் அணுகக்கூடியது. protected — மரபுரிமை Class-க்கும். public — வெளியிலும் அணுகக்கூடியது." },
        { "q": "மூன்று வகை Constructor-களையும் Destructor-ஐயும் குறியீட்டு எடுத்துக்காட்டுடன் விரிவாக விளக்குக.", "ans": "class Data {\npublic:\n  int x;\n  Data(){ x=0; } // Default\n  Data(int a){ x=a; } // Parameterized\n  Data(Data &d){ x=d.x; } // Copy\n  ~Data(){ cout<<\"Destroyed\"; } // Destructor\n};\n\nConstructor பொருள் உருவாகும்போதும், Destructor அழிக்கப்படும்போதும் தானாக அழைக்கப்படும்." },
        { "q": "Inline மற்றும் Outline உறுப்புச் செயற்கூறுகளை குறியீட்டு எடுத்துக்காட்டுடன் விரிவாக விளக்குக.", "ans": "Inline:\nclass Box{ public: void show(){ cout<<\"Box\"; } };\n\nOutline:\nclass Box{ public: void show(); };\nvoid Box::show(){ cout<<\"Box\"; }\n\nInline வேகமானது சிறு செயற்கூறுகளுக்கு ஏற்றது; Outline பெரிய செயற்கூறுகளை தனித்து ஒழுங்குபடுத்த உதவும்." },
        { "q": "பொருள்களின் அணியை (Array of Objects) ஒரு முழு எடுத்துக்காட்டுடன் விரிவாக விளக்குக.", "ans": "class Student {\npublic:\n  int rollno;\n  float avg;\n};\n\nint main() {\n  Student s[3];\n  for(int i=0;i<3;i++) {\n    cout<<\"Enter Roll No and Avg: \";\n    cin>>s[i].rollno>>s[i].avg;\n  }\n  for(int i=0;i<3;i++)\n    cout<<s[i].rollno<<\" \"<<s[i].avg<<endl;\n}\n\nஇது 3 மாணவர்களின் தரவை ஒரே அணியில் தனித்தனி பொருள்களாகச் சேமித்து காட்டுகிறது." }
      ]
    }
  ]
}
