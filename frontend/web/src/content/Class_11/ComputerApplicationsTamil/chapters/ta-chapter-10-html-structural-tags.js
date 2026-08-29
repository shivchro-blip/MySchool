export default {
  eyebrow: "பாடம் 10 · வகுப்பு 11 கணினி பயன்பாடுகள்",
  title: "HTML - கட்டமைப்பு ஒட்டுகள்",
  author: "",
  pills: ["செயல்முறை", "ஆகஸ்ட் பாடத்திட்டம்"],
  tabs: [
    {
      id: "intro",
      label: "HTML அறிமுகம்",
      blocks: [
        { type: "section-head", text: "10.1 HTML — ஓர் அறிமுகம்" },
        { type: "teacher-voice", html: "<p><b>HTML (Hyper Text Markup Language)</b> என்பது வலைப்பக்கங்களை உருவாக்கப் பயன்படும் Markup மொழி ஆகும். இது SGML (Standard Generalized Markup Language)-இலிருந்து உருவானது.</p><p>HTML ஆவணத்தின் அடிப்படை அமைப்பு:</p><ul><li><b>&lt;html&gt;...&lt;/html&gt;:</b> முழு ஆவணத்தையும் சூழும் தலைமை ஒட்டு.</li><li><b>&lt;head&gt;...&lt;/head&gt;:</b> ஆவணத்தின் தலைப்பு, மெட்டாடேட்டா போன்ற தகவல்களைக் கொண்டது; இதன் உள்ளடக்கம் உலாவியில் நேரடியாகத் தோன்றாது.</li><li><b>&lt;title&gt;...&lt;/title&gt;:</b> உலாவியின் தலைப்புப் பட்டையில் தோன்றும் தலைப்பு.</li><li><b>&lt;body&gt;...&lt;/body&gt;:</b> உலாவியில் நேரடியாகத் தோன்றும் உள்ளடக்கம் (உரை, படங்கள்).</li></ul><p><b>வலைப்பக்கத்தை உருவாக்குதல் (Notepad-இல்):</b> Notepad-ஐத் திறந்து HTML குறியீட்டை எழுதி, .html நீட்சியுடன் சேமிக்கவும் (உ.ம். mypage.html). பின்பு அதை உலாவியில் திறந்தால் வெளியீட்டைப் பார்க்கலாம்.</p>" },
        { type: "gloss-row", word: "🏷️ HTML (Hyper Text Markup Language)", def: "வலைப்பக்கங்களை உருவாக்கப் பயன்படும் Markup மொழி." },
        { type: "gloss-row", word: "📄 &lt;head&gt; / &lt;body&gt;", def: "&lt;head&gt; ஆவணத் தகவல்களைக் கொண்டது (உலாவியில் தோன்றாது); &lt;body&gt; உலாவியில் நேரடியாகத் தோன்றும் உள்ளடக்கத்தைக் கொண்டது." },
        { type: "nav", next: "attributes", nextLabel: "அடுத்து: பண்புக்கூறுகள் →" }
      ]
    },
    {
      id: "attributes",
      label: "பண்புக்கூறுகள்",
      blocks: [
        { type: "section-head", text: "10.2 &lt;body&gt; ஒட்டின் பண்புக்கூறுகள் (Body Tag Attributes)" },
        { type: "teacher-voice", html: "<p>&lt;body&gt; ஒட்டில் பல்வேறு பண்புக்கூறுகளைச் (Attributes) சேர்த்து பக்கத்தின் தோற்றத்தை மாற்றலாம்:</p><ul><li><b>bgcolor:</b> பக்கத்தின் பின்னணி நிறத்தை அமைக்க. உ.ம். &lt;body bgcolor=\"yellow\"&gt;</li><li><b>text:</b> பக்கத்தில் உள்ள உரையின் நிறத்தை அமைக்க.</li><li><b>background:</b> பின்னணியாக ஒரு படத்தைச் சேர்க்க. உ.ம். &lt;body background=\"flower.gif\"&gt;</li></ul><p>நிறங்களை பெயரால் (உ.ம். \"red\") அல்லது பதினறு எண் குறியீட்டால் (Hexadecimal, உ.ம். #FF0000) குறிப்பிடலாம்.</p>" },
        { type: "gloss-row", word: "🎨 bgcolor", def: "&lt;body&gt; ஒட்டின் பண்புக்கூறு; பக்கத்தின் பின்னணி நிறத்தை அமைக்கப் பயன்படும்." },
        { type: "gloss-row", word: "🖼️ background", def: "&lt;body&gt; ஒட்டின் பண்புக்கூறு; பின்னணியாக ஒரு படத்தைச் சேர்க்கப் பயன்படும்." },
        { type: "gloss-row", word: "#️⃣ Hexadecimal Color Code", def: "நிறங்களை # குறியீட்டுடன் கூடிய 6-இலக்க பதினறு எண்ணால் குறிப்பிடும் முறை (உ.ம். #FF0000 = சிவப்பு)." },
        { type: "nav", back: "intro", next: "headings", nextLabel: "அடுத்து: தலைப்புகளும் பத்திகளும் →" }
      ]
    },
    {
      id: "headings",
      label: "தலைப்பு / பத்தி",
      blocks: [
        { type: "section-head", text: "10.3 தலைப்பு ஒட்டுகளும் (Headings) பத்தி ஒட்டுகளும் (Paragraph)" },
        { type: "teacher-voice", html: "<p><b>தலைப்பு ஒட்டுகள் (Headings):</b> &lt;h1&gt; முதல் &lt;h6&gt; வரை ஆறு நிலைகளில் தலைப்புகளை உருவாக்கலாம்; &lt;h1&gt; மிகப் பெரியது, &lt;h6&gt; மிகச் சிறியது.</p><p><b>பத்தி ஒட்டு (Paragraph):</b> &lt;p&gt;...&lt;/p&gt; — உரையை ஒரு பத்தியாகக் காட்டும்.</p><p><b>சீரமைப்பு (align):</b> &lt;h1 align=\"center\"&gt; — left, center, right மதிப்புகளை align பண்புக்கூறில் கொடுக்கலாம்.</p><p><b>வரிமாற்று ஒட்டு (Line Break):</b> &lt;br&gt; — ஒரு புதிய வரிக்குச் செல்ல; இது ஒரு Empty Element (மூடும் ஒட்டு தேவையில்லை).</p>" },
        { type: "gloss-row", word: "🔠 &lt;h1&gt;...&lt;h6&gt;", def: "தலைப்புகளை ஆறு நிலைகளில் காட்டும் ஒட்டுகள்; h1 மிகப்பெரியது, h6 மிகச்சிறியது." },
        { type: "gloss-row", word: "↵ &lt;br&gt;", def: "ஒரு புதிய வரிக்குச் செல்ல பயன்படும் Empty Element ஒட்டு (மூடும் ஒட்டு தேவையில்லை)." },
        { type: "nav", back: "attributes", next: "other-tags", nextLabel: "அடுத்து: பிற ஒட்டுகள் →" }
      ]
    },
    {
      id: "other-tags",
      label: "பிற ஒட்டுகள்",
      blocks: [
        { type: "section-head", text: "10.4 கிடைமட்டக் கோடும் (Horizontal Rule) கருத்துரையும் (Comments)" },
        { type: "teacher-voice", html: "<p><b>&lt;hr&gt;:</b> ஒரு கிடைமட்டக் கோட்டை (Horizontal Rule) சேர்த்து பகுதிகளைப் பிரிக்கப் பயன்படும் Empty Element.</p><p><b>கருத்துரை (Comments):</b> &lt;!-- இது ஒரு கருத்துரை --&gt; — HTML குறியீட்டில் குறிப்புகள் எழுத பயன்படும்; உலாவியில் தோன்றாது.</p><p><b>Container Elements vs Empty Elements:</b></p><ul><li><b>Container Element:</b> தொடக்க ஒட்டும் முடிவு ஒட்டும் கொண்டது (உ.ம். &lt;p&gt;...&lt;/p&gt;).</li><li><b>Empty Element:</b> முடிவு ஒட்டு தேவையில்லாதது (உ.ம். &lt;br&gt;, &lt;hr&gt;, &lt;img&gt;).</li></ul>" },
        { type: "gloss-row", word: "➖ &lt;hr&gt;", def: "ஒரு கிடைமட்டக் கோட்டைச் சேர்த்து பகுதிகளைப் பிரிக்கும் Empty Element ஒட்டு." },
        { type: "gloss-row", word: "💬 HTML Comment", def: "&lt;!-- ... --&gt; — உலாவியில் தோன்றாத, குறியீட்டில் குறிப்புகள் எழுத பயன்படும் வரிகள்." },
        { type: "gloss-row", word: "📦 Container / Empty Element", def: "Container Element தொடக்க/முடிவு ஒட்டு இரண்டும் கொண்டது; Empty Element முடிவு ஒட்டு தேவையில்லாதது." },
        { type: "think-box", label: "நினைவில் கொள்ள 🏷️", text: "HTML5 அமைப்பினால் அங்கீகரிக்கப்பட்ட அண்மைப் பதிப்பு; W3C (www-க்கான பன்னாட்டு தர அமைப்பு) HTML தரநிலைகளை நிர்வகிக்கிறது." },
        { type: "nav", back: "headings", practice: true }
      ]
    }
  ]
}
