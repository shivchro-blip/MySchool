export default {
  eyebrow: "பாடம் 14 · வகுப்பு 11 கணினி பயன்பாடுகள்",
  title: "ஜாவாஸ்கிரிப்ட்டின் அறிமுகம்",
  author: "",
  pills: ["செயல்முறை", "செப்டம்பர் பாடத்திட்டம்"],
  tabs: [
    {
      id: "intro",
      label: "அறிமுகம்",
      blocks: [
        { type: "section-head", text: "14.1 ஜாவாஸ்கிரிப்ட் — ஓர் அறிமுகம்" },
        { type: "teacher-voice", html: "<p><b>JavaScript</b> என்பது வலைப்பக்கங்களை <b>ஊடாடும் தன்மை (Interactive)</b> கொண்டதாக ஆக்கப் பயன்படும் <b>Client-side Scripting Language</b> ஆகும். இது 1995-இல் Netscape நிறுவனத்தில் Brendan Eich என்பவரால் உருவாக்கப்பட்டது.</p><p><b>JavaScript-இன் நன்மைகள்:</b></p><ul><li>பயனாளர் உள்ளீட்டை உடனடியாகச் சரிபார்க்க முடியும் (Form Validation).</li><li>சேவையகத்துடன் (Server) தொடர்பு கொள்ளாமலேயே பக்கத்தில் மாற்றங்களைச் செய்யலாம்.</li><li>HTML-உடன் எளிதாக இணைக்கலாம்.</li></ul><p><b>HTML-இல் JavaScript சேர்க்கும் முறை:</b> &lt;script&gt;...&lt;/script&gt; ஒட்டு &lt;head&gt; அல்லது &lt;body&gt;-க்குள் பயன்படுத்தப்படும். type=\"text/javascript\" பண்புக்கூறையும் சேர்க்கலாம்.</p><p>எடுத்துக்காட்டு: &lt;script&gt;document.write(\"Hello World\");&lt;/script&gt;</p>" },
        { type: "gloss-row", word: "📜 JavaScript", def: "வலைப்பக்கங்களை ஊடாடும் தன்மை கொண்டதாக ஆக்கும் Client-side Scripting Language." },
        { type: "gloss-row", word: "🖋️ document.write()", def: "வலைப்பக்கத்தில் நேரடியாக உள்ளடக்கத்தை வெளியிடப் பயன்படும் JavaScript கட்டளை." },
        { type: "nav", next: "variables", nextLabel: "அடுத்து: மாறிகள் →" }
      ]
    },
    {
      id: "variables",
      label: "மாறிகள்",
      blocks: [
        { type: "section-head", text: "14.2 மாறிகள் (Variables)" },
        { type: "teacher-voice", html: "<p><b>மாறி (Variable)</b> என்பது ஒரு மதிப்பைச் சேமிக்கப் பயன்படும் பெயரிடப்பட்ட நினைவகக் கூடு. JavaScript-இல் <b>var</b> அல்லது <b>let</b> பயன்படுத்தி மாறியை அறிவிக்கலாம்.</p><p>எடுத்துக்காட்டு: var num1 = 125; var name = \"Priya\";</p><p><b>மாறிப் பெயரிடல் விதிகள் (Rules for Naming Variables):</b></p><ul><li>எழுத்து அல்லது அடிக்கோட்டால் (_) தொடங்க வேண்டும், எண்ணால் அல்ல.</li><li>வெற்றிடங்கள் (Spaces) அனுமதிக்கப்படாது.</li><li>JavaScript ஒதுக்கப்பட்ட சொற்களை (Reserved Words — உ.ம். var, function) பெயராகப் பயன்படுத்தக் கூடாது.</li><li>Case-sensitive — பெரிய/சிறிய எழுத்துகள் வேறுபடும் (Num மற்றும் num வெவ்வேறு).</li></ul><p><b>மாறியின் நோக்கம் (Scope of Variable):</b> Global Scope (முழு நிரலிலும் அணுகக்கூடியது) மற்றும் Local Scope (ஒரு செயற்கூற்றுக்குள் மட்டும் அணுகக்கூடியது) என இரு வகை.</p>" },
        { type: "gloss-row", word: "📦 மாறி (Variable)", def: "ஒரு மதிப்பைச் சேமிக்கப் பயன்படும் பெயரிடப்பட்ட நினைவகக் கூடு; var/let மூலம் அறிவிக்கப்படும்." },
        { type: "gloss-row", word: "🌐 Global / Local Scope", def: "Global Scope — முழு நிரலிலும் அணுகக்கூடிய மாறி; Local Scope — ஒரு செயற்கூற்றுக்குள் மட்டும் அணுகக்கூடிய மாறி." },
        { type: "nav", back: "intro", next: "operators", nextLabel: "அடுத்து: செயலிகள் →" }
      ]
    },
    {
      id: "operators",
      label: "செயலிகள்",
      blocks: [
        { type: "section-head", text: "14.3 JavaScript செயலிகள் (Operators)" },
        { type: "teacher-voice", html: "<p><b>எண்கணிதச் செயலிகள் (Arithmetic Operators):</b> + (கூட்டல்), − (கழித்தல்), * (பெருக்கல்), / (வகுத்தல்), % (மீதி — Remainder).</p><p><b>ஒதுக்கீட்டுச் செயலிகள் (Assignment Operators):</b> = , += , −= , *= , /= (உ.ம். x += 5 என்பது x = x + 5 என்பதற்குச் சமம்; Shorthand Operator).</p><p><b>ஒப்பீட்டுச் செயலிகள் (Comparison Operators):</b> == (சமமா), != (சமமில்லையா), &gt; (பெரியதா), &lt; (சிறியதா), &gt;= , &lt;= — இவை true அல்லது false மதிப்பைத் தரும்.</p><p><b>தர்க்கரீதியான செயலிகள் (Logical Operators):</b> && (AND — இரண்டும் true ஆக இருந்தால் மட்டும் true), || (OR — ஏதேனும் ஒன்று true ஆக இருந்தால் true), ! (NOT — மதிப்பைத் தலைகீழாக்கும்).</p><p><b>அதிகரிப்பு/குறைப்புச் செயலிகள் (Increment/Decrement):</b> ++ (1 கூட்டும்), −− (1 கழிக்கும்).</p>" },
        { type: "gloss-row", word: "➕ Shorthand Assignment (+=, -=)", def: "x += 5 என்பது x = x + 5 என்பதற்குச் சமம்; குறுகிய வடிவில் மதிப்பை மாற்றும் செயலிகள்." },
        { type: "gloss-row", word: "🔀 && / || / !", def: "&& (AND — இரண்டும் true), || (OR — ஏதேனும் ஒன்று true), ! (NOT — தலைகீழாக்கும்) — தர்க்கரீதியான செயலிகள்." },
        { type: "gloss-row", word: "🔢 typeof Operator", def: "ஒரு மாறியின் தரவு வகையை (number/string/boolean) கண்டறியப் பயன்படும் செயலி." },
        { type: "nav", back: "variables", next: "dialog-boxes", nextLabel: "அடுத்து: உரையாடல் பெட்டிகள் →" }
      ]
    },
    {
      id: "dialog-boxes",
      label: "உரையாடல் பெட்டிகள்",
      blocks: [
        { type: "section-head", text: "14.7 JavaScript-இல் Popup உரையாடல் பெட்டிகள் (Dialog Boxes)" },
        { type: "teacher-voice", html: "<p>பயனாளருடன் தொடர்பு கொள்ள JavaScript மூன்று வகையான Popup பெட்டிகளை வழங்குகிறது:</p><ul><li><b>Alert Dialog Box:</b> ஒரு தகவலை மட்டும் காட்ட; alert(\"Message\");</li><li><b>Confirm Dialog Box:</b> OK/Cancel தேர்வுடன் பயனாளரிடம் உறுதிப்படுத்த; confirm(\"Message\");</li><li><b>Prompt Dialog Box:</b> பயனாளரிடமிருந்து உள்ளீட்டைப் பெற; prompt(\"Message\", \"defaultText\");</li></ul><p><b>கருத்துரைகள் (Comments in JavaScript):</b> // ஒரு வரிக் கருத்துரைக்கு; /* ... */ பல வரிக் கருத்துரைகளுக்கு.</p>" },
        { type: "gloss-row", word: "⚠️ alert()", def: "ஒரு தகவலை மட்டும் காட்டும் Popup பெட்டியை உருவாக்கும் JavaScript செயலி." },
        { type: "gloss-row", word: "❓ confirm() / prompt()", def: "confirm() OK/Cancel மூலம் உறுதிப்படுத்த; prompt() பயனாளரிடமிருந்து உள்ளீட்டைப் பெற பயன்படும் Dialog Box-கள்." },
        { type: "think-box", label: "நினைவில் கொள்ள 💬", text: "// ஒற்றை வரி கருத்துரை; /* ... */ பல வரி கருத்துரை — இரண்டும் நிரலின் இயக்கத்தை பாதிக்காது, உலாவியில் தோன்றாது." },
        { type: "nav", back: "operators", practice: true }
      ]
    }
  ]
}
