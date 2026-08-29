export default {
  eyebrow: "பாடம் 7 · வகுப்பு 11 கணினி பயன்பாடுகள்",
  title: "ஓபன் ஆஃபீஸ் கால்க்-ல் வேலை செய்தல் (Basics)",
  author: "",
  pills: ["செயல்முறை", "ஜூலை பாடத்திட்டம்"],
  tabs: [
    {
      id: "intro",
      label: "அறிமுகம்",
      blocks: [
        { type: "section-head", text: "7.1 விரிதாள் — ஓர் அறிமுகம் (Spreadsheet)" },
        { type: "teacher-voice", html: "<p><b>விரிதாள் (Spreadsheet)</b> என்பது எண்கள், தரவுகளை வரிசைகளாகவும் (Rows) நெடுவரிசைகளாகவும் (Columns) அமைத்து, கணக்கீடுகள், பகுப்பாய்வு செய்யப் பயன்படும் மென்பொருள் ஆகும். எடுத்துக்காட்டுகள்: <b>MS Excel</b>, <b>OpenOffice Calc</b>, <b>Lotus 1-2-3</b>.</p><p>OpenOffice Calc-இன் திறத்தல்: Start → All Programs → OpenOffice → OpenOffice Calc.</p><p>Calc சாளரத்தின் முக்கியக் கூறுகள்:</p><ul><li><b>Name Box:</b> தற்போது தேர்ந்தெடுக்கப்பட்ட கலத்தின் முகவரியைக் காட்டும்.</li><li><b>Formula Bar:</b> கலத்தில் உள்ள தரவு அல்லது சூத்திரத்தைக் காட்டும்/உள்ளிட உதவும்.</li><li><b>Column Heading (A, B, C...) மற்றும் Row Heading (1, 2, 3...):</b> கலங்களை அடையாளம் காண உதவும்.</li><li><b>Sheet Tabs:</b> ஒரு பணிப்புத்தகத்தில் (Workbook) பல தாள்களுக்கு (Sheets) இடையே மாற உதவும்.</li></ul><p><b>கலம் (Cell):</b> வரிசையும் நெடுவரிசையும் சந்திக்கும் இடம்; ஒவ்வொரு கலத்திற்கும் ஒரு தனித்துவ முகவரி (உ.ம். A1, B2) உண்டு.</p>" },
        { type: "gloss-row", word: "📊 விரிதாள் (Spreadsheet)", def: "எண்கள், தரவுகளை வரிசை/நெடுவரிசையாக அமைத்து கணக்கீடு செய்யப் பயன்படும் மென்பொருள் (உ.ம். OpenOffice Calc, MS Excel)." },
        { type: "gloss-row", word: "🔲 கலம் (Cell)", def: "வரிசையும் நெடுவரிசையும் சந்திக்கும் இடம்; தனித்துவ முகவரி கொண்டது (உ.ம். A1)." },
        { type: "gloss-row", word: "📛 Name Box", def: "தற்போது தேர்ந்தெடுக்கப்பட்ட கலத்தின் முகவரியைக் காட்டும் பெட்டி." },
        { type: "nav", next: "cell-basics", nextLabel: "அடுத்து: கலம் / தரவு வகைகள் →" }
      ]
    },
    {
      id: "cell-basics",
      label: "கலம் / தரவு வகைகள்",
      blocks: [
        { type: "section-head", text: "7.2 கல முகவரியிடலும் தரவு வகைகளும் (Cell Referencing & Data Types)" },
        { type: "teacher-voice", html: "<p>Calc-இல் மூன்று முக்கிய தரவு வகைகள் உள்ளன: <b>உரை (Text)</b>, <b>எண் (Number)</b>, <b>தேதி/நேரம் (Date/Time)</b>.</p><p><b>கல முகவரியிடல் (Cell Referencing):</b></p><ul><li><b>தொடர்புடைய முகவரி (Relative Reference):</b> உ.ம். A1 — சூத்திரத்தை நகலெடுக்கும்போது தானாக மாறும்.</li><li><b>முழுமையான முகவரி (Absolute Reference):</b> உ.ம். $A$1 — சூத்திரத்தை நகலெடுத்தாலும் மாறாது (Dollar குறியீடு $ பயன்படுத்தப்படுகிறது).</li></ul><p><b>வரம்பு (Range):</b> ஒரு தொகுதி கலங்களைக் குறிக்க பயன்படும் (உ.ம். A2:A5).</p>" },
        { type: "gloss-row", word: "🔗 Relative Reference", def: "சூத்திரத்தை நகலெடுக்கும்போது தானாக மாறும் கல முகவரி (உ.ம். A1)." },
        { type: "gloss-row", word: "📌 Absolute Reference", def: "$ குறியீட்டுடன் கூடிய, நகலெடுத்தாலும் மாறாத நிலையான கல முகவரி (உ.ம். $A$1)." },
        { type: "gloss-row", word: "📏 Range", def: "ஒரு தொகுதி கலங்களைக் குறிக்கும் குறியீடு (உ.ம். A2:A5)." },
        { type: "think-box", label: "நினைவில் கொள்ள 💲", text: "$ குறியீடு எந்தப் பகுதியை \"பூட்டுகிறது\" என நினைவில் கொள்ளுங்கள்: $A$1 (நெடுவரிசையும் வரிசையும் பூட்டப்பட்டது), A$1 (வரிசை மட்டும் பூட்டப்பட்டது), $A1 (நெடுவரிசை மட்டும் பூட்டப்பட்டது)." },
        { type: "nav", back: "intro", next: "formulas", nextLabel: "அடுத்து: சூத்திரங்கள் / சார்புகள் →" }
      ]
    },
    {
      id: "formulas",
      label: "சூத்திரங்கள் / சார்புகள்",
      blocks: [
        { type: "section-head", text: "7.3 சூத்திரங்களும் சார்புகளும் (Formulas & Functions)" },
        { type: "teacher-voice", html: "<p>ஒவ்வொரு சூத்திரமும் (Formula) <b>=</b> குறியீட்டுடன் தொடங்கும். எடுத்துக்காட்டு: =A1+B1.</p><p><b>செயலிகள் (Operators):</b></p><ul><li><b>எண்கணிதம் (Arithmetic):</b> + (கூட்டல்), − (கழித்தல்), * (பெருக்கல்), / (வகுத்தல்), ^ (அடுக்கு).</li><li><b>ஒப்பீட்டு (Relational):</b> = , &gt; , &lt; , &gt;= , &lt;= , &lt;&gt; (சமமில்லை).</li></ul><p><b>பொதுவான சார்புகள் (Common Functions):</b></p><table><tr><th>சார்பு</th><th>பயன்</th></tr><tr><td>SUM(range)</td><td>கூட்டுத்தொகையைக் கணக்கிடும்</td></tr><tr><td>AVERAGE(range)</td><td>சராசரியைக் கணக்கிடும்</td></tr><tr><td>MAX(range) / MIN(range)</td><td>அதிகபட்ச/குறைந்தபட்ச மதிப்பைக் காட்டும்</td></tr><tr><td>POWER(base,exponent)</td><td>அடுக்கு மதிப்பைக் கணக்கிடும்</td></tr><tr><td>COUNT(range)</td><td>எண் மதிப்புகள் உள்ள கலங்களை எண்ணும்</td></tr></table><p><b>Function Wizard:</b> Insert → Function Wizard — சார்புகளை வகைப்படி (Mathematical, Statistical, Text, Date&Time, Logical) தேடி, படிப்படியாகப் பயன்படுத்த உதவும் கருவி.</p>" },
        { type: "gloss-row", word: "🧮 SUM()", def: "குறிப்பிட்ட கல வரம்பின் கூட்டுத்தொகையைக் கணக்கிடும் சார்பு." },
        { type: "gloss-row", word: "🧙 Function Wizard", def: "சார்புகளை வகைப்படி தேடி, படிப்படியாக உள்ளிட உதவும் Calc-இன் கருவி." },
        { type: "nav", back: "cell-basics", next: "formatting", nextLabel: "அடுத்து: வடிவூட்டலும் Fill Series-ம் →" }
      ]
    },
    {
      id: "formatting",
      label: "வடிவூட்டல்",
      blocks: [
        { type: "section-head", text: "7.4 கல வடிவூட்டலும் Fill Series-ம்" },
        { type: "teacher-voice", html: "<p><b>எண் வடிவூட்டல் (Number Format):</b> Format → Cells — Currency, Percentage, Date, Decimal Places போன்ற வடிவங்களில் எண்களைக் காட்டலாம்.</p><p><b>Fill Handle:</b> கலத்தின் வலது கீழ் மூலையில் இருக்கும் சிறிய சதுரம்; இழுத்து இழுத்து அருகில் உள்ள கலங்களுக்குச் சூத்திரத்தை/வடிவத்தைப் பரப்பலாம் (Auto Fill).</p><p><b>Fill Series:</b> Edit → Fill → Series — எண் வரிசை (1,2,3...), தேதி வரிசை, அல்லது வளர்ச்சி வரிசையை (Growth) தானாக உருவாக்க உதவும்.</p><p><b>வரிசைகள்/நெடுவரிசைகள் செருகுதல்/நீக்குதல்:</b> வலது கிளிக் → Insert Rows/Columns அல்லது Delete Rows/Columns.</p>" },
        { type: "gloss-row", word: "🖱️ Fill Handle", def: "கலத்தின் வலது கீழ் மூலையில் இருக்கும் சிறிய சதுரம்; இழுத்து Auto Fill செய்யப் பயன்படும்." },
        { type: "gloss-row", word: "🔢 Fill Series", def: "எண்/தேதி வரிசைகளைத் தானாக உருவாக்க உதவும் Calc-இன் அம்சம்." },
        { type: "nav", back: "formulas", next: "sort-filter", nextLabel: "அடுத்து: வரிசைப்படுத்தல் / வடிகட்டுதல் →" }
      ]
    },
    {
      id: "sort-filter",
      label: "வரிசை / வடிகட்டல்",
      blocks: [
        { type: "section-head", text: "7.5 தரவு வரிசைப்படுத்தலும் வடிகட்டுதலும் (Sorting & Filtering)" },
        { type: "teacher-voice", html: "<p><b>வரிசைப்படுத்தல் (Sorting):</b> Data → Sort — தரவை ஏறுவரிசையில் (Ascending) அல்லது இறங்குவரிசையில் (Descending) அமைக்கலாம்; ஒரே நேரத்தில் பல நெடுவரிசைகளின்படியும் (Multi-level Sort) வரிசைப்படுத்தலாம்.</p><p><b>வடிகட்டுதல் (Filtering):</b></p><ul><li><b>AutoFilter:</b> Data → AutoFilter — ஒவ்வொரு நெடுவரிசைத் தலைப்பிலும் ஒரு கீழிறங்கு பட்டியல் (Dropdown) தோன்றி, குறிப்பிட்ட நிபந்தனைக்கேற்ப தரவை வடிகட்ட உதவும்.</li><li><b>Standard Filter:</b> Data → Standard Filter — பல நிபந்தனைகளை (AND/OR) ஒருங்கிணைத்து மேம்பட்ட வடிகட்டல் செய்ய உதவும்.</li></ul>" },
        { type: "gloss-row", word: "🔀 Sort Ascending / Descending", def: "தரவை ஏறுவரிசையில் (சிறியது→பெரியது) அல்லது இறங்குவரிசையில் (பெரியது→சிறியது) அமைக்கும் கட்டளை." },
        { type: "gloss-row", word: "🔍 AutoFilter", def: "நெடுவரிசைத் தலைப்பில் கீழிறங்கு பட்டியல் மூலம் விரைவாக தரவை வடிகட்ட உதவும் Calc அம்சம்." },
        { type: "nav", back: "formatting", next: "charts", nextLabel: "அடுத்து: விளக்கப்படங்கள் →" }
      ]
    },
    {
      id: "charts",
      label: "விளக்கப்படங்கள்",
      blocks: [
        { type: "section-head", text: "7.6 விளக்கப்படங்கள் (Charts) உருவாக்குதல்" },
        { type: "teacher-voice", html: "<p>தரவை காட்சிப்படுத்த <b>Chart Wizard</b> பயன்படுகிறது: Insert → Chart. நான்கு படிநிலைகள்:</p><ol><li><b>Chart Type:</b> Column, Bar, Pie, Line போன்ற வகைகளிலிருந்து தேர்வு செய்யவும்.</li><li><b>Data Range:</b> விளக்கப்படத்திற்குத் தேவையான கல வரம்பைத் தேர்வு செய்யவும்.</li><li><b>Data Series:</b> ஒவ்வொரு தரவுத் தொடரையும் உறுதிப்படுத்தவும்.</li><li><b>Chart Elements:</b> தலைப்பு (Title), Legend, Axis labels ஆகியவற்றைச் சேர்க்கவும்.</li></ol><p>விளக்கப்படம் உருவான பின்பு, Format மெனு வழியாக நிறங்கள், 3D Look போன்ற பாணிகளை மாற்றலாம்.</p>" },
        { type: "gloss-row", word: "📈 Chart Wizard", def: "படிப்படியாக விளக்கப்படத்தை உருவாக்க உதவும் Calc-இன் கருவி; Insert → Chart வழியாகத் திறக்கப்படும்." },
        { type: "gloss-row", word: "🏷️ Legend", def: "விளக்கப்படத்தில் ஒவ்வொரு தரவுத் தொடரும் எதைக் குறிக்கிறது எனக் காட்டும் விவரப்பட்டியல்." },
        { type: "nav", back: "sort-filter", practice: true }
      ]
    }
  ]
}
