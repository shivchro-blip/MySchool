export default {
  "meta": {
    "subject": "கணினி அறிவியல் -- வகுப்பு 12",
    "unit": "பாடம் 9 -- தொகுப்பு தரவினங்கள் (List, Tuples, Set மற்றும் Dictionary)",
    "time": "3.00 மணி நேரம்",
    "totalMarks": 52,
    "instructions": "சமச்சீர் கல்வி -- அனைத்து வினாக்களுக்கும் விடையளிக்கவும்"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "பகுதி I -- பலவுள் தேர்வு (10 x 1)",
      "title": "பகுதி I -- சரியான விடையைத் தேர்ந்தெடுத்து எழுதுக",
      "type": "mcq",
      "scoreMax": 10,
      "marksPer": 1,
      "sections": [
        {
          "label": "List, Tuple, Set, Dictionary",
          "questions": [
            { "id": "q1", "html": "List-ஐக் குறிக்கப் பயன்படும் அடைப்புக்குறி எது?", "options": ["அ) ( )", "ஆ) [ ]", "இ) { }", "ஈ) < >"], "answer": 1, "hint": "List [ ] குறியீட்டுக்குள் எழுதப்படும்." },
            { "id": "q2", "html": "List மாற்றக்கூடியதா (Mutable) அல்லது மாற்ற முடியாததா (Immutable)?", "options": ["அ) Mutable", "ஆ) Immutable", "இ) Static", "ஈ) None"], "answer": 0, "hint": "List மாற்றக்கூடியது (Mutable)." },
            { "id": "q3", "html": "Tuple-ஐக் குறிக்கப் பயன்படும் அடைப்புக்குறி எது?", "options": ["அ) [ ]", "ஆ) ( )", "இ) { }", "ஈ) < >"], "answer": 1, "hint": "Tuple ( ) குறியீட்டுக்குள் எழுதப்படும்." },
            { "id": "q4", "html": "Tuple மாற்றக்கூடியதா அல்லது மாற்ற முடியாததா?", "options": ["அ) Mutable", "ஆ) Immutable", "இ) Static", "ஈ) None"], "answer": 1, "hint": "Tuple மாற்ற முடியாதது (Immutable)." },
            { "id": "q5", "html": "ஒற்றை உறுப்பு Tuple-ஐ உருவாக்க என்ன தேவை?", "options": ["அ) அடைப்புக்குறி மட்டும்", "ஆ) trailing comma (,)", "இ) semi-colon", "ஈ) எதுவும் தேவையில்லை"], "answer": 1, "hint": "ஒற்றை உறுப்பு Tuple-க்கு (10,) போல் trailing comma தேவை." },
            { "id": "q6", "html": "Set-ஐக் குறிக்கப் பயன்படும் அடைப்புக்குறி எது?", "options": ["அ) [ ]", "ஆ) ( )", "இ) { }", "ஈ) < >"], "answer": 2, "hint": "Set { } குறியீட்டுக்குள் எழுதப்படும்." },
            { "id": "q7", "html": "Set-ல் மீண்டும் மீண்டும் வரும் மதிப்புகள் எவ்வாறு கையாளப்படுகின்றன?", "options": ["அ) அப்படியே வைக்கப்படும்", "ஆ) தானாக நீக்கப்படும்", "இ) பிழை ஏற்படும்", "ஈ) மறுபடி காட்டப்படும்"], "answer": 1, "hint": "Set தனித்துவமான உறுப்புகளை மட்டும் கொண்டிருக்கும்." },
            { "id": "q8", "html": "இரு Set-களுக்கிடையேயான பொதுவான உறுப்புகளைத் தரும் செயல்பாடு எது?", "options": ["அ) Union", "ஆ) Intersection", "இ) Difference", "ஈ) Symmetric Difference"], "answer": 1, "hint": "Intersection (வெட்டு) பொதுவான உறுப்புகளைத் தரும்." },
            { "id": "q9", "html": "Dictionary எவ்வாறு தரவை சேமிக்கிறது?", "options": ["அ) Index மூலம் மட்டும்", "ஆ) Key-Value இணைகளாக", "இ) வரிசை இல்லாமல் மட்டும்", "ஈ) File-ஆக"], "answer": 1, "hint": "Dictionary Key-Value இணைகளாக தரவை சேமிக்கும்." },
            { "id": "q10", "html": "List-லிருந்து Tuple-ஐ உருவாக்கப் பயன்படும் செயற்கூறு எது?", "options": ["அ) list()", "ஆ) tuple()", "இ) set()", "ஈ) dict()"], "answer": 1, "hint": "tuple() List-லிருந்து Tuple உருவாக்கும்." }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "பகுதி II -- சிறு விடை வினாக்கள் (5 x 2)",
      "title": "பகுதி II -- சிறு விடை வினாக்கள்",
      "type": "short-essay",
      "scoreMax": 10,
      "marksPer": 2,
      "instruction": "2-3 வாக்கியங்களில் விடையளிக்கவும்.",
      "questions": [
        { "q": "List என்றால் என்ன?", "ans": "List என்பது [ ] குறியீட்டுக்குள் காற்புள்ளியால் பிரிக்கப்பட்ட உறுப்புகளின் தொகுப்பு — மாற்றக்கூடியது (Mutable)." },
        { "q": "Tuple மற்றும் List-ஐ வேறுபடுத்துக.", "ans": "List [ ] குறியீட்டுக்குள் எழுதப்படும், மாற்றக்கூடியது. Tuple ( ) குறியீட்டுக்குள் எழுதப்படும், மாற்ற முடியாதது (Immutable)." },
        { "q": "Set என்றால் என்ன?", "ans": "Set என்பது வரிசையற்ற, தனித்துவமான உறுப்புகளின் தொகுப்பு — { } குறியீட்டுக்குள் எழுதப்படும்." },
        { "q": "Dictionary என்றால் என்ன?", "ans": "Dictionary என்பது Key-Value இணைகளின் தொகுப்பு, { key:value } வடிவில் எழுதப்படும், Mutable-ஆனது." },
        { "q": "List-ல் append() மற்றும் insert() ஐ வேறுபடுத்துக.", "ans": "append() ஒரு உறுப்பை List-ன் இறுதியில் சேர்க்கும். insert(position, element) குறிப்பிட்ட இடத்தில் உறுப்பைச் செருகும்." }
      ]
    },
    {
      "id": "p3",
      "navLabel": "பகுதி III -- குறு விடை வினாக்கள் (4 x 3)",
      "title": "பகுதி III -- குறு விடை வினாக்கள்",
      "type": "short-essay",
      "scoreMax": 12,
      "marksPer": 3,
      "instruction": "4-6 வாக்கியங்களில் விடையளிக்கவும்.",
      "questions": [
        { "q": "List-லிருந்து உறுப்புகளை நீக்கும் மூன்று வழிமுறைகளை (del, remove, pop) விளக்குக.", "ans": "del List[index] குறிப்பிட்ட இடத்தில் உள்ள உறுப்பை நீக்கும். List.remove(value) மதிப்பின் மூலம் உறுப்பை நீக்கும். List.pop([index]) கடைசி (அல்லது குறிப்பிட்ட) உறுப்பை நீக்கி, அதன் மதிப்பையும் திருப்பித்தரும்." },
        { "q": "Set-ன் நான்கு அடிப்படை செயல்பாடுகளைப் பட்டியலிடுக.", "ans": "1. ஒன்றிணைப்பு (Union — |), 2. வெட்டு (Intersection — &), 3. வேறுபாடு (Difference — −), 4. சமச்சீரற்ற வேறுபாடு (Symmetric Difference — ^)." },
        { "q": "Dictionary உறுப்புகளை அணுகும் மற்றும் சேர்க்கும் முறையை எடுத்துக்காட்டுடன் விளக்குக.", "ans": "அணுகல்: MyDict['Name'] — key மூலம் மதிப்பைப் பெறலாம். சேர்த்தல்: MyDict['Class']='XII-A' — புதிய key-value இணையை உடனடியாகச் சேர்க்கும்." },
        { "q": "List Comprehension என்றால் என்ன? எடுத்துக்காட்டு தருக.", "ans": "List Comprehension என்பது [expression for variable in range] என்ற சுருக்க வடிவில் புதிய List-ஐ உருவாக்கும் நுட்பம். எடுத்துக்காட்டு: squares=[x**2 for x in range(1,11)]." }
      ]
    },
    {
      "id": "p4",
      "navLabel": "பகுதி IV -- விரிவான வினாக்கள் (4 x 5)",
      "title": "பகுதி IV -- விரிவான வினாக்கள்",
      "type": "long-essay",
      "scoreMax": 20,
      "marksPer": 5,
      "instruction": "விரிவாக விடையளிக்கவும்.",
      "questions": [
        {
          "q": "List-ல் உறுப்புகளைச் சேர்க்கும் (append, extend, insert) மற்றும் நீக்கும் (remove, pop, clear, del) செயற்கூறுகளை எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.",
          "ans": "சேர்க்கும் செயற்கூறுகள்:\n1. append(element) — இறுதியில் ஒரு உறுப்பைச் சேர்க்கும். MyList.append(50)\n2. extend([elements]) — பல உறுப்புகளைச் சேர்க்கும். MyList.extend([21,32,29])\n3. insert(position, element) — குறிப்பிட்ட இடத்தில் செருகும். MyList.insert(3,'Karaikkudi')\n\nநீக்கும் செயற்கூறுகள்:\n1. del List[index] — குறிப்பிட்ட இடத்தில் உள்ள உறுப்பை நீக்கும்.\n2. remove(value) — மதிப்பின் மூலம் நீக்கும்.\n3. pop([index]) — உறுப்பை நீக்கி, அதன் மதிப்பையும் திருப்பித்தரும்.\n4. clear() — அனைத்து உறுப்புகளையும் நீக்கும்.\n5. del List — முழு List மாறியையும் நீக்கும்.\n\nஎடுத்துக்காட்டு:\nMyList = [12,89,34,'Kannan']\nMyList.remove(89)\nprint(MyList)  # [12,34,'Kannan']\nprint(MyList.pop())  # 'Kannan' திரும்பும், நீக்கப்படும்"
        },
        {
          "q": "Tuple-ன் சிறப்பியல்புகளையும் (Immutability), Packing/Unpacking கருத்துருவையும் எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.",
          "ans": "Tuple-ன் சிறப்பியல்புகள்:\n- ( ) குறியீட்டுக்குள் எழுதப்படும்.\n- மாற்ற முடியாதது (Immutable) — உருவாக்கியப் பிறகு உறுப்புகளை மாற்ற முடியாது.\n- ஒற்றை உறுப்பு Tuple-க்கு trailing comma தேவை: (10,) — இல்லையெனில் அது ஒரு int ஆகக் கருதப்படும்.\n- இரு Tuples-ஐ + மூலம் இணைத்து புதிய Tuple உருவாக்கலாம்: Tup1+Tup2\n- del Tuple_name மூலம் முழு Tuple-ஐயும் நீக்கலாம், ஆனால் தனிப்பட்ட உறுப்பை நீக்க முடியாது.\n\nPacking & Unpacking:\nPacking — பல மதிப்புகளை ஒரு Tuple-ஆகக் குழுவாக்குதல்:\nmy_tuple = 34, 90, 76  # Packing\n\nUnpacking — Tuple-ன் மதிப்புகளை தனித்தனி மாறிகளுக்கு ஒதுக்குதல்:\na, b, c = (34, 90, 76)  # Unpacking\nprint(a, b, c)  # 34 90 76\n\nஇந்த Immutable தன்மையால், Tuples பாதுகாப்பான, மாறாத தரவுகளுக்கு (எ.கா. coordinates, RGB values) ஏற்றவை."
        },
        {
          "q": "Set-ன் நான்கு செயல்பாடுகளையும் (Union, Intersection, Difference, Symmetric Difference) ஒவ்வொன்றுக்கும் எடுத்துக்காட்டுடன் விரிவாக விளக்குக.",
          "ans": "1. ஒன்றிணைப்பு (Union — | அல்லது .union()): இரு Set-களின் அனைத்து தனித்துவ உறுப்புகளையும் தரும்.\nset_A={1,2,6,8}; set_B={'A','B','C','D'}\nprint(set_A | set_B)  # {1,2,6,8,'A','B','C','D'}\n\n2. வெட்டு (Intersection — & அல்லது .intersection()): இரு Set-களிலும் பொதுவாக உள்ள உறுப்புகளை மட்டும் தரும்.\nset_A={1,2,4,'D'}; set_B={'A','B','C','D'}\nprint(set_A.intersection(set_B))  # {'D'}\n\n3. வேறுபாடு (Difference — − அல்லது .difference()): set_A-ல் மட்டும் இருந்து, set_B-ல் இல்லாத உறுப்புகளைத் தரும்.\nset_A={'A','1','D'}; set_B={'A','B','C','D'}\nprint(set_A.difference(set_B))  # {'1'}\n\n4. சமச்சீரற்ற வேறுபாடு (Symmetric Difference — ^): இரு Set-களில் ஒன்றில் மட்டும் இருக்கும் உறுப்புகளைத் தரும் (பொதுவானவை நீக்கப்பட்டு).\n\nஇந்த நான்கு செயல்பாடுகளும் கணிதவியல் Set கோட்பாட்டை நேரடியாக Python-ல் பயன்படுத்த உதவுகின்றன — தரவு ஒப்பீடு, தனித்துவமான உறுப்பினர்களைக் கண்டறிதல் போன்ற பணிகளுக்கு பயனுள்ளதாக இருக்கும்."
        },
        {
          "q": "Dictionary-ன் உருவாக்கம், அணுகல், புதுப்பித்தல் மற்றும் நீக்குதலை ஒரு முழுமையான எடுத்துக்காட்டுடன் விரிவாக விளக்குக.",
          "ans": "Dictionary உருவாக்கம்:\nMyDict = {'Reg_No':'1221', 'Name':'Tamilselvi', 'School':'CGHSS', 'Address':'Roter St., Chennai 117'}\n\nஉறுப்புகளை அணுகுதல்:\nprint('Register Number:', MyDict['Reg_No'])  # 1221\nprint('Name:', MyDict['Name'])  # Tamilselvi\n\nபுதிய மதிப்பைச் சேர்த்தல்:\nMyDict['Class'] = 'XII-A'\nprint(MyDict['Class'])  # XII-A\n\nஏற்கனவே உள்ள மதிப்பை மாற்றுதல்:\nMyDict['Name'] = 'Meena'  # Name புலத்தின் மதிப்பு மாற்றப்படும்\n\nஉறுப்புகளை நீக்குதல்:\ndel MyDict['Class']  # ஒரு குறிப்பிட்ட key-value இணையை நீக்கும்\nMyDict.clear()  # அனைத்து உறுப்புகளையும் நீக்கும், Dictionary காலியாகும் {}\ndel MyDict  # முழு Dictionary மாறியையும் நினைவகத்திலிருந்து நீக்கும்\n\nDictionary Comprehension மூலம் சுருக்கமாகவும் உருவாக்கலாம்:\nDict = {x:x*2 for x in range(1,11)}\n# {1:2, 2:4, 3:6, ..., 10:20}\n\nDictionary, key-value அமைப்பு காரணமாக, பெயரிடப்பட்ட தரவை வேகமாகவும் தெளிவாகவும் அணுக உதவுகிறது — index எண்ணை நினைவில் வைத்திருக்க வேண்டிய தேவை இல்லாமல்."
        }
      ]
    }
  ]
}
