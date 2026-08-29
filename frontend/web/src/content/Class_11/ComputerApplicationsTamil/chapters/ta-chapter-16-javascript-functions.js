export default {
  eyebrow: "பாடம் 16 · வகுப்பு 11 கணினி பயன்பாடுகள்",
  title: "ஜாவா எழுத்துவடிவ செயற்கூறுகள்",
  author: "",
  pills: ["செயல்முறை", "செப்டம்பர் பாடத்திட்டம்"],
  tabs: [
    {
      id: "predefined",
      label: "முன்வரையறுக்கப்பட்ட சார்புகள்",
      blocks: [
        { type: "section-head", text: "16.1 முன்வரையறுக்கப்பட்ட செயற்கூறுகள் (Pre-defined Functions)" },
        { type: "teacher-voice", html: "<p>JavaScript ஏற்கெனவே பல <b>முன்வரையறுக்கப்பட்ட செயற்கூறுகளை (Pre-defined/Built-in Functions)</b> வழங்குகிறது, குறிப்பாக string-களைக் கையாள:</p><table><tr><th>செயற்கூறு</th><th>விளக்கம்</th><th>எடுத்துக்காட்டு</th></tr><tr><td>toUpperCase()</td><td>எழுத்துகளை பெரிய எழுத்தாக மாற்றும்</td><td>\"java\".toUpperCase() → \"JAVA\"</td></tr><tr><td>toLowerCase()</td><td>எழுத்துகளை சிறிய எழுத்தாக மாற்றும்</td><td>\"JAVA\".toLowerCase() → \"java\"</td></tr><tr><td>length</td><td>சரத்தின் நீளத்தைத் தரும்</td><td>\"India\".length → 5</td></tr><tr><td>charAt(n)</td><td>n-வது இடத்தில் உள்ள எழுத்தைத் தரும்</td><td>\"India\".charAt(1) → \"n\"</td></tr><tr><td>indexOf()</td><td>ஒரு எழுத்து/சொல் முதலில் தோன்றும் இடத்தைத் தரும்</td><td>\"India\".indexOf(\"d\") → 2</td></tr><tr><td>parseInt()</td><td>சரத்தை முழு எண்ணாக மாற்றும்</td><td>parseInt(\"25\") → 25</td></tr><tr><td>parseFloat()</td><td>சரத்தை தசம எண்ணாக மாற்றும்</td><td>parseFloat(\"25.5\") → 25.5</td></tr></table>" },
        { type: "gloss-row", word: "🔤 toUpperCase() / toLowerCase()", def: "சரத்தின் (String) எழுத்துகளை முறையே பெரிய/சிறிய எழுத்தாக மாற்றும் முன்வரையறுக்கப்பட்ட செயற்கூறுகள்." },
        { type: "gloss-row", word: "📏 length", def: "ஒரு சரத்தில் உள்ள எழுத்துகளின் எண்ணிக்கையைத் தரும் பண்பு (Property)." },
        { type: "gloss-row", word: "🔢 parseInt() / parseFloat()", def: "ஒரு சரத்தை முறையே முழு எண்ணாக/தசம எண்ணாக மாற்றும் செயற்கூறுகள்." },
        { type: "nav", next: "user-defined", nextLabel: "அடுத்து: பயனாளர் வரையறுத்த செயற்கூறுகள் →" }
      ]
    },
    {
      id: "user-defined",
      label: "பயனாளர் செயற்கூறுகள்",
      blocks: [
        { type: "section-head", text: "16.3 பயனாளர் வரையறுத்த செயற்கூறுகள் (User-defined Functions)" },
        { type: "teacher-voice", html: "<p>ஒரு குறிப்பிட்ட பணியைச் செய்யும் நிரல் தொகுதியை மீண்டும் மீண்டும் பயன்படுத்த <b>Function</b> எழுதப்படுகிறது.</p><p><b>Function உருவாக்கும் தொடரமைப்பு:</b></p><p>function functionName(parameter_list) { Executable statements; }</p><p><b>Function-ஐ அழைக்கும் (Calling) முறை:</b> functionName(arguments);</p><p>எடுத்துக்காட்டு:</p><p>function sum(x,y) { var s = x+y; return s; }</p><p>document.write(sum(5,3)); // 8 எனக் காட்டும்</p><p><b>முக்கியக் கருத்துக்கள்:</b></p><ul><li>Function ஒரு முறை எழுதப்பட்டு, பல முறை அழைக்கப்படலாம் (Code Reusability).</li><li>Parameter List மூலம் Function-க்கு வெளியிலிருந்து மதிப்புகளை அனுப்பலாம்.</li><li>return கட்டளை மூலம் Function ஒரு மதிப்பைத் திருப்பி அனுப்பும்.</li></ul>" },
        { type: "gloss-row", word: "🧩 Function", def: "ஒரு குறிப்பிட்ட பணியைச் செய்யும், மீண்டும் மீண்டும் அழைக்கக்கூடிய நிரல் தொகுதி." },
        { type: "gloss-row", word: "📥 Parameter", def: "Function-க்கு வெளியிலிருந்து மதிப்புகளை அனுப்ப பயன்படும் மாறிகளின் பட்டியல்." },
        { type: "gloss-row", word: "↩️ return", def: "Function ஒரு மதிப்பைத் திருப்பி அனுப்ப பயன்படுத்தும் கட்டளை." },
        { type: "think-box", label: "நினைவில் கொள்ள 🔁", text: "Function-இன் முக்கிய நன்மை Code Reusability — ஒரு முறை எழுதி, தேவைப்படும் இடங்களில் எல்லாம் மீண்டும் மீண்டும் அழைக்கலாம்; நிரலின் நீளத்தையும் குறைக்கும், பராமரிப்பையும் எளிதாக்கும்." },
        { type: "nav", back: "predefined", practice: true }
      ]
    }
  ]
}
