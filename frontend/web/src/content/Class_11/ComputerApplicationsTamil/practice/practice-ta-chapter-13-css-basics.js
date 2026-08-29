export default {
  "meta": {
    "subject": "கணினி பயன்பாடுகள் -- வகுப்பு XI",
    "unit": "பாடம் 13 -- CSS – தொடரும் பணி தாள்கள்",
    "time": "3.00 மணி நேரம்",
    "totalMarks": 47,
    "instructions": "சமச்சீர் கல்வி -- அனைத்து வினாக்களுக்கும் விடையளிக்கவும்"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "பகுதி - அ (10 x 1)",
      "title": "பகுதி - அ: சரியான விடையைத் தேர்ந்தெடுக்கவும்",
      "type": "mcq",
      "scoreMax": 10,
      "marksPer": 1,
      "sections": [
        {
          "label": "CSS",
          "questions": [
            { "id": "q1", "html": "CSS-இன் விரிவாக்கம் __________", "options": ["அ) Colour Style Sheets", "ஆ) Cascading Style Sheets", "இ) Computer Style Sheets", "ஈ) Cascading Sheet Style"], "answer": 1, "hint": "தொடரும் பணி தாள்கள்." },
            { "id": "q2", "html": "CSS-ஐ தரப்படுத்திய அமைப்பு __________", "options": ["அ) ICANN", "ஆ) W3C", "இ) ISP", "ஈ) DNS"], "answer": 1, "hint": "www-க்கான தர அமைப்பு." },
            { "id": "q3", "html": "ஒரு HTML ஒட்டின் style பண்புக்கூறில் நேரடியாகச் சேர்க்கும் CSS வகை __________", "options": ["அ) External CSS", "ஆ) Internal CSS", "இ) Inline CSS", "ஈ) Embedded CSS"], "answer": 2, "hint": "நேரடியாகச் சேர்ப்பது." },
            { "id": "q4", "html": "பல பக்கங்களுக்கும் பொதுவாகப் பயன்படுத்தக்கூடிய CSS வகை __________", "options": ["அ) Inline CSS", "ஆ) Internal CSS", "இ) External CSS", "ஈ) Embedded CSS"], "answer": 2, "hint": ".css தனிக் கோப்பு." },
            { "id": "q5", "html": "&lt;head&gt;-க்குள் &lt;style&gt; ஒட்டில் சேர்க்கப்படும் CSS வகை __________", "options": ["அ) Inline CSS", "ஆ) Internal CSS", "இ) External CSS", "ஈ) Root CSS"], "answer": 1, "hint": "அந்த பக்கத்திற்கு மட்டும்." },
            { "id": "q6", "html": "எழுத்துருவின் பெயரைக் குறிக்கும் CSS பண்பு __________", "options": ["அ) font-size", "ஆ) font-family", "இ) font-style", "ஈ) font-weight"], "answer": 1, "hint": "Arial, Times New Roman." },
            { "id": "q7", "html": "உரையின் நிறத்தைக் குறிக்கும் CSS பண்பு __________", "options": ["அ) background-color", "ஆ) color", "இ) border-color", "ஈ) text-color"], "answer": 1, "hint": "color property." },
            { "id": "q8", "html": "எழுத்தை Bold ஆக்க பயன்படும் பண்பு __________", "options": ["அ) font-style", "ஆ) font-weight", "இ) font-size", "ஈ) text-align"], "answer": 1, "hint": "font-weight: bold." },
            { "id": "q9", "html": "External CSS கோப்பை இணைக்கப் பயன்படும் ஒட்டு __________", "options": ["அ) &lt;style&gt;", "ஆ) &lt;link&gt;", "இ) &lt;css&gt;", "ஈ) &lt;a&gt;"], "answer": 1, "hint": "rel=\"stylesheet\"." },
            { "id": "q10", "html": "பின்னணிப் படத்தை அமைக்கும் CSS பண்பு __________", "options": ["அ) background-color", "ஆ) background-image", "இ) border", "ஈ) color"], "answer": 1, "hint": "பின்னணிப் படம்." }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "பகுதி - ஆ (5 x 2)",
      "title": "பகுதி - ஆ: குறுகிய விடையளி",
      "type": "short-essay",
      "scoreMax": 10,
      "marksPer": 2,
      "instruction": "2-3 வாக்கியங்களில் விடையளிக்கவும்.",
      "questions": [
        { "q": "CSS என்றால் என்ன?", "ans": "CSS (Cascading Style Sheets) என்பது HTML ஆவணங்களின் தோற்றத்தை (நிறம், எழுத்துரு) கட்டுப்படுத்தப் பயன்படும் பாணி மொழி ஆகும்." },
        { "q": "CSS-இன் இரு நன்மைகளைத் தருக.", "ans": "1. பராமரிப்பு எளிது — ஒரு CSS கோப்பை மாற்றினால் பல பக்கங்களின் தோற்றமும் தானாக மாறும்.\n2. தோற்றத்தையும் உள்ளடக்கத்தையும் தனித்தனியாக வைத்திருக்கலாம்." },
        { "q": "Inline CSS மற்றும் Internal CSS வேறுபடுத்துக.", "ans": "Inline CSS ஒரு HTML ஒட்டின் style பண்புக்கூறில் நேரடியாகச் சேர்க்கப்படும். Internal CSS &lt;head&gt;-க்குள் &lt;style&gt; ஒட்டில் சேர்க்கப்பட்டு, அந்த பக்கத்திற்கு மட்டும் பொருந்தும்." },
        { "q": "CSS தொடரமைப்பை (Syntax) விளக்குக.", "ans": "CSS விதி selector { property: value; } என்ற வடிவில் இருக்கும். Selector எந்த ஒட்டிற்குப் பொருந்துமெனக் குறிக்கும்; property/value மாற்ற வேண்டிய பண்பையும் மதிப்பையும் குறிக்கும்." },
        { "q": "border பண்பின் பயன் யாது?", "ans": "border CSS பண்பு ஒரு உறுப்பின் விளிம்புக் கோட்டின் தடிமன், பாணி, நிறத்தை அமைக்கப் பயன்படுகிறது (உ.ம். border: 2px solid blue;)." }
      ]
    },
    {
      "id": "p3",
      "navLabel": "பகுதி - இ (3 x 3)",
      "title": "பகுதி - இ: சுருக்கமாக விடையளி",
      "type": "short-essay",
      "scoreMax": 9,
      "marksPer": 3,
      "instruction": "5-6 வாக்கியங்களில் விடையளிக்கவும்.",
      "questions": [
        { "q": "CSS சேர்க்கும் மூன்று வழிகளை (Inline, Internal, External) விளக்குக.", "ans": "1. Inline CSS — ஒட்டின் style பண்புக்கூறில் நேரடியாக.\n2. Internal CSS — &lt;head&gt;-க்குள் &lt;style&gt; ஒட்டில்; அந்தப் பக்கத்திற்கு மட்டும்.\n3. External CSS — தனி .css கோப்பில் எழுதி &lt;link&gt; மூலம் இணைத்தல்; பல பக்கங்களுக்கும் பொதுவானது." },
        { "q": "CSS உரை வடிவூட்டல் பண்புகளை (color, font-family, font-size, font-weight) விளக்குக.", "ans": "1. color — உரையின் நிறம்.\n2. font-family — எழுத்துரு பெயர்.\n3. font-size — எழுத்தளவு.\n4. font-weight — Normal/Bold." },
        { "q": "CSS-இன் நன்மைகளை விவரிக்க.", "ans": "1. பராமரிப்பு எளிது — ஒரு கோப்பு மாற்றத்தில் பல பக்கங்கள் புதுப்பிக்கப்படும்.\n2. தோற்றத்தையும் உள்ளடக்கத்தையும் பிரித்து வைக்கலாம்.\n3. பக்கம் ஏற்றும் வேகம் அதிகரிக்கும்." }
      ]
    },
    {
      "id": "p4",
      "navLabel": "பகுதி - ஈ (3 x 6)",
      "title": "பகுதி - ஈ: விரிவாக விடையளி",
      "type": "long-essay",
      "scoreMax": 18,
      "marksPer": 6,
      "instruction": "விரிவாக, குறியீடு எடுத்துக்காட்டுகளுடன் விடையளிக்கவும்.",
      "questions": [
        { "q": "CSS-ஐ HTML ஆவணத்தில் சேர்க்கும் மூன்று வழிகளையும் குறியீட்டு எடுத்துக்காட்டுடன் விரிவாக விளக்குக.", "ans": "1. Inline: &lt;p style=\"color:red;\"&gt;Text&lt;/p&gt;\n\n2. Internal:\n&lt;head&gt;\n&lt;style&gt;\np { color: blue; font-size: 12pt; }\n&lt;/style&gt;\n&lt;/head&gt;\n\n3. External:\nstyle.css கோப்பில்: p { color: green; }\nHTML-இல்: &lt;link rel=\"stylesheet\" href=\"style.css\"&gt;\n\nExternal CSS பராமரிப்புக்கு சிறந்தது, ஏனெனில் ஒரு .css கோப்பை மாற்றினால் இணைக்கப்பட்ட அனைத்துப் பக்கங்களும் தானாக புதுப்பிக்கப்படும்." },
        { "q": "CSS-இன் அடிக்கடி பயன்படும் பண்புகளை (text, background, border) குறியீட்டு எடுத்துக்காட்டுடன் விரிவாக விளக்குக.", "ans": "p {\ncolor: blue;\nfont-family: Arial;\nfont-size: 14pt;\nfont-weight: bold;\ntext-align: center;\nbackground-color: yellow;\nborder: 2px solid black;\n}\n\ncolor/font-family/font-size/font-weight/text-align — உரை வடிவூட்டலுக்கு. background-color/background-image — பின்னணிக்கு. border — விளிம்புக் கோட்டிற்கு." },
        { "q": "CSS-இன் நன்மைகளையும் CSS தொடரமைப்பையும் (Selector, Property, Value) விரிவாக விளக்குக.", "ans": "CSS தொடரமைப்பு: selector { property: value; }\nஎடுத்துக்காட்டு: p { color: blue; font-size: 12pt; }\n\nSelector — எந்த ஒட்டிற்குப் பாணி பொருந்துமெனக் குறிக்கும் (உ.ம். p, h1).\nProperty — மாற்ற வேண்டிய பண்பு (உ.ம். color).\nValue — அந்தப் பண்பின் மதிப்பு (உ.ம். blue).\n\nநன்மைகள்: பராமரிப்பு எளிது, உள்ளடக்கம்/தோற்றம் பிரிக்கப்படுகிறது, பக்கம் ஏற்றும் வேகம் அதிகரிக்கும்." }
      ]
    }
  ]
}
