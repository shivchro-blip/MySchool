export default {
  "meta": {
    "subject": "கணினி பயன்பாடுகள் -- வகுப்பு XI",
    "unit": "பாடம் 10 -- HTML - கட்டமைப்பு ஒட்டுகள்",
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
          "label": "HTML அடிப்படைகள்",
          "questions": [
            { "id": "q1", "html": "HTML-இன் விரிவாக்கம் __________", "options": ["அ) Hyper Transfer Markup Language", "ஆ) Hyper Text Markup Language", "இ) High Text Markup Language", "ஈ) Hyper Text Making Language"], "answer": 1, "hint": "Markup மொழி." },
            { "id": "q2", "html": "உலாவியின் தலைப்புப் பட்டையில் தோன்றும் ஒட்டு __________", "options": ["அ) &lt;head&gt;", "ஆ) &lt;title&gt;", "இ) &lt;body&gt;", "ஈ) &lt;html&gt;"], "answer": 1, "hint": "browser title bar." },
            { "id": "q3", "html": "உலாவியில் நேரடியாகத் தோன்றும் உள்ளடக்கத்தைக் கொண்ட ஒட்டு __________", "options": ["அ) &lt;head&gt;", "ஆ) &lt;title&gt;", "இ) &lt;body&gt;", "ஈ) &lt;html&gt;"], "answer": 2, "hint": "காணக்கூடிய உள்ளடக்கம்." },
            { "id": "q4", "html": "பக்கத்தின் பின்னணி நிறத்தை அமைக்கும் பண்புக்கூறு __________", "options": ["அ) text", "ஆ) bgcolor", "இ) background", "ஈ) align"], "answer": 1, "hint": "body tag attribute." },
            { "id": "q5", "html": "மிகப் பெரிய தலைப்பு ஒட்டு __________", "options": ["அ) &lt;h6&gt;", "ஆ) &lt;h1&gt;", "இ) &lt;h3&gt;", "ஈ) &lt;p&gt;"], "answer": 1, "hint": "level 1 heading." },
            { "id": "q6", "html": "ஒரு புதிய வரிக்குச் செல்ல பயன்படும் ஒட்டு __________", "options": ["அ) &lt;p&gt;", "ஆ) &lt;hr&gt;", "இ) &lt;br&gt;", "ஈ) &lt;title&gt;"], "answer": 2, "hint": "Line Break." },
            { "id": "q7", "html": "கிடைமட்டக் கோட்டைச் சேர்க்கும் ஒட்டு __________", "options": ["அ) &lt;br&gt;", "ஆ) &lt;hr&gt;", "இ) &lt;p&gt;", "ஈ) &lt;head&gt;"], "answer": 1, "hint": "Horizontal Rule." },
            { "id": "q8", "html": "மூடும் ஒட்டு தேவையில்லாத ஒட்டு வகை __________", "options": ["அ) Container Element", "ஆ) Empty Element", "இ) Text Element", "ஈ) Body Element"], "answer": 1, "hint": "&lt;br&gt;, &lt;hr&gt; போன்றவை." },
            { "id": "q9", "html": "HTML கருத்துரையின் (Comment) வடிவம் __________", "options": ["அ) // comment", "ஆ) # comment", "இ) &lt;!-- comment --&gt;", "ஈ) /* comment */"], "answer": 2, "hint": "உலாவியில் தோன்றாது." },
            { "id": "q10", "html": "HTML தரநிலைகளை நிர்வகிக்கும் அமைப்பு __________", "options": ["அ) ISP", "ஆ) DNS", "இ) W3C", "ஈ) ICANN"], "answer": 2, "hint": "www-க்கான பன்னாட்டு தர அமைப்பு." }
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
        { "q": "HTML என்றால் என்ன?", "ans": "HTML (Hyper Text Markup Language) என்பது வலைப்பக்கங்களை உருவாக்கப் பயன்படும் Markup மொழி ஆகும்." },
        { "q": "&lt;head&gt; மற்றும் &lt;body&gt; வேறுபடுத்துக.", "ans": "&lt;head&gt; ஆவணத் தலைப்பு போன்ற தகவல்களைக் கொண்டது, உலாவியில் தோன்றாது. &lt;body&gt; உலாவியில் நேரடியாகத் தோன்றும் உள்ளடக்கத்தைக் கொண்டது." },
        { "q": "Container Element மற்றும் Empty Element வேறுபடுத்துக.", "ans": "Container Element தொடக்க/முடிவு ஒட்டு இரண்டையும் கொண்டது (உ.ம். &lt;p&gt;...&lt;/p&gt;). Empty Element முடிவு ஒட்டு தேவையில்லாதது (உ.ம். &lt;br&gt;, &lt;hr&gt;)." },
        { "q": "bgcolor மற்றும் background பண்புக்கூறுகளை வேறுபடுத்துக.", "ans": "bgcolor பக்கத்தின் பின்னணி நிறத்தை அமைக்கும். background பின்னணியாக ஒரு படத்தைச் சேர்க்கும்." },
        { "q": "HTML கருத்துரையின் (Comment) பயன் என்ன?", "ans": "HTML குறியீட்டில் குறிப்புகள் எழுத கருத்துரை பயன்படுகிறது; இது உலாவியில் தோன்றாது, &lt;!-- ... --&gt; வடிவில் எழுதப்படும்." }
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
        { "q": "HTML ஆவணத்தின் அடிப்படை அமைப்பை (html/head/title/body) விளக்குக.", "ans": "1. &lt;html&gt;...&lt;/html&gt; — முழு ஆவணத்தையும் சூழும் தலைமை ஒட்டு.\n2. &lt;head&gt;...&lt;/head&gt; — ஆவணத் தகவல்கள், உலாவியில் தோன்றாது.\n3. &lt;title&gt;...&lt;/title&gt; — உலாவியின் தலைப்புப் பட்டையில் தோன்றும்.\n4. &lt;body&gt;...&lt;/body&gt; — உலாவியில் நேரடியாகத் தோன்றும் உள்ளடக்கம்." },
        { "q": "தலைப்பு ஒட்டுகளையும் (h1-h6) பத்தி ஒட்டையும் (p) விளக்குக.", "ans": "&lt;h1&gt; முதல் &lt;h6&gt; வரை ஆறு நிலைகளில் தலைப்புகள்; h1 மிகப்பெரியது, h6 மிகச்சிறியது. &lt;p&gt;...&lt;/p&gt; உரையை ஒரு பத்தியாகக் காட்டும். align பண்புக்கூறு மூலம் இடது/நடு/வலது சீரமைக்கலாம்." },
        { "q": "வலைப்பக்கத்தை Notepad-இல் உருவாக்கி உலாவியில் பார்வையிடும் முறையை விளக்குக.", "ans": "1. Notepad-ஐத் திறந்து HTML குறியீட்டை எழுதவும்.\n2. .html நீட்சியுடன் சேமிக்கவும் (உ.ம். mypage.html).\n3. சேமிக்கப்பட்ட கோப்பை Double-click செய்து அல்லது உலாவியில் File → Open மூலம் திறந்து வெளியீட்டைப் பார்க்கலாம்." }
      ]
    },
    {
      "id": "p4",
      "navLabel": "பகுதி - ஈ (3 x 6)",
      "title": "பகுதி - ஈ: விரிவாக விடையளி",
      "type": "long-essay",
      "scoreMax": 18,
      "marksPer": 6,
      "instruction": "விரிவாக, HTML குறியீடு எடுத்துக்காட்டுகளுடன் விடையளிக்கவும்.",
      "questions": [
        { "q": "HTML ஆவணத்தின் அடிப்படை அமைப்பையும் &lt;body&gt; பண்புக்கூறுகளையும் (bgcolor, text, background) HTML குறியீட்டு எடுத்துக்காட்டுடன் விரிவாக விளக்குக.", "ans": "அடிப்படை அமைப்பு:\n&lt;html&gt;\n&lt;head&gt;&lt;title&gt;My Page&lt;/title&gt;&lt;/head&gt;\n&lt;body bgcolor=\"yellow\" text=\"blue\"&gt;\nThis is my page\n&lt;/body&gt;\n&lt;/html&gt;\n\nbgcolor — பின்னணி நிறம். text — உரையின் நிறம். background — பின்னணிப் படம் (உ.ம். background=\"flower.gif\"). நிறங்களை பெயராலோ Hex குறியீட்டாலோ (#FF0000) குறிப்பிடலாம்." },
        { "q": "தலைப்பு ஒட்டுகள், பத்தி ஒட்டு, வரிமாற்று, கிடைமட்டக் கோடு ஆகியவற்றை எடுத்துக்காட்டுடன் விரிவாக விளக்குக.", "ans": "&lt;h1&gt; Welcome &lt;/h1&gt;\n&lt;h3 align=\"center\"&gt; About Us &lt;/h3&gt;\n&lt;p&gt; This is a paragraph. &lt;/p&gt;\n&lt;br&gt;\n&lt;hr&gt;\n\n&lt;h1&gt;-&lt;h6&gt; ஆறு நிலைகளில் தலைப்புகள். &lt;p&gt; பத்தியைக் காட்ட. &lt;br&gt; புதிய வரிக்குச் செல்ல (Empty Element). &lt;hr&gt; கிடைமட்டக் கோடு சேர்க்க (Empty Element), பகுதிகளைப் பிரிக்கப் பயன்படும்." },
        { "q": "Container Element மற்றும் Empty Element ஆகியவற்றை வேறுபாடுகளுடன், எடுத்துக்காட்டுகளுடன் விரிவாக விளக்குக.", "ans": "Container Element — தொடக்க ஒட்டும் முடிவு ஒட்டும் கொண்டது; உள்ளடக்கத்தை சூழும். எடுத்துக்காட்டு: &lt;p&gt;...&lt;/p&gt;, &lt;h1&gt;...&lt;/h1&gt;, &lt;title&gt;...&lt;/title&gt;.\n\nEmpty Element — முடிவு ஒட்டு தேவையில்லாதது, தானாகவே முழுமையானது. எடுத்துக்காட்டு: &lt;br&gt;, &lt;hr&gt;, &lt;img&gt;.\n\nஇவ்வேறுபாட்டை அறிவது சரியான HTML குறியீடு எழுத அவசியம்." }
      ]
    }
  ]
}
