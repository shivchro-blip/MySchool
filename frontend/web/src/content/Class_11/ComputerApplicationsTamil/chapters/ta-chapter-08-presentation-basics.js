export default {
  eyebrow: "பாடம் 8 · வகுப்பு 11 கணினி பயன்பாடுகள்",
  title: "நிகழ்த்துதல் (Basics)",
  author: "",
  pills: ["செயல்முறை", "ஆகஸ்ட் பாடத்திட்டம்"],
  tabs: [
    {
      id: "intro",
      label: "அறிமுகம்",
      blocks: [
        { type: "section-head", text: "8.1 நிகழ்த்துதல் மென்பொருள் — அறிமுகம் (Presentation Software)" },
        { type: "teacher-voice", html: "<p><b>நிகழ்த்துதல் மென்பொருள் (Presentation Software)</b> என்பது சொற்கள், படங்கள், அட்டவணைகள், வரைபடங்களைக் கொண்ட ஸ்லைடுகளின் (Slides) தொகுப்பாக ஒரு காட்சிப் பொருளை உருவாக்கப் பயன்படும் மென்பொருள் ஆகும். எடுத்துக்காட்டுகள்: <b>Microsoft PowerPoint</b>, <b>OpenOffice Impress</b>, <b>Keynote</b>.</p><p>இப்பாடத்தில் <b>OpenOffice Impress</b> பயன்படுத்தப்படுகிறது — திறத்தல்: Start → All Programs → OpenOffice → OpenOffice Impress.</p><p>Impress திறக்கும்போது <b>Presentation Wizard</b> தோன்றி, மூன்று வழிகளில் புதிய காட்சிப் பொருளை உருவாக்க வழிகாட்டும்:</p><ol><li><b>Empty Presentation:</b> வெற்று ஸ்லைடுகளிலிருந்து தொடங்குதல்.</li><li><b>From Template:</b> முன்பே வடிவமைக்கப்பட்ட Template-ஐப் பயன்படுத்துதல்.</li><li><b>Open Existing Presentation:</b> ஏற்கெனவே சேமிக்கப்பட்ட காட்சிப் பொருளைத் திறத்தல்.</li></ol>" },
        { type: "gloss-row", word: "🎞️ நிகழ்த்துதல் (Presentation)", def: "ஸ்லைடுகளின் தொகுப்பாக ஒரு தலைப்பை காட்சிப்படுத்தும் ஆவணம்." },
        { type: "gloss-row", word: "🧙 Presentation Wizard", def: "Impress திறக்கும்போது தோன்றி, Empty/Template/Existing எனும் மூன்று வழிகளில் காட்சிப் பொருளை உருவாக்க வழிகாட்டும் கருவி." },
        { type: "nav", next: "views", nextLabel: "அடுத்து: காட்சி வகைகள் →" }
      ]
    },
    {
      id: "views",
      label: "காட்சி வகைகள்",
      blocks: [
        { type: "section-head", text: "8.2 Impress-இன் காட்சி வகைகள் (Views)" },
        { type: "teacher-voice", html: "<p>View மெனுவின் கீழ் Impress பல்வேறு காட்சி வகைகளை வழங்குகிறது:</p><ul><li><b>Normal View:</b> ஒரு ஸ்லைடை தட்டச்சு செய்யவும், வடிவமைக்கவும் பயன்படும் இயல்பு நிலைக் காட்சி.</li><li><b>Outline View:</b> அனைத்து ஸ்லைடுகளின் உரையையும் ஒரு கோட்டு வடிவில் (Outline) காட்டும்; உள்ளடக்கத்தை விரைவாக ஒழுங்குபடுத்த உதவும்.</li><li><b>Notes View:</b> ஒவ்வொரு ஸ்லைடுக்கும் கீழே பேச்சாளர் குறிப்புகளை (Speaker Notes) சேர்க்க உதவும்.</li><li><b>Handout View:</b> ஒரு பக்கத்தில் பல ஸ்லைடுகளை அச்சிட ஏற்ற வடிவில் காட்டும்.</li><li><b>Slide Sorter View:</b> அனைத்து ஸ்லைடுகளையும் சிறு உருவங்களாக (Thumbnails) காட்டி, வரிசையை மாற்றவும், நகல் எடுக்கவும், நீக்கவும் எளிதாக்கும்.</li></ul>" },
        { type: "gloss-row", word: "🗂️ Slide Sorter View", def: "அனைத்து ஸ்லைடுகளையும் சிறு உருவங்களாகக் காட்டி, வரிசைமாற்றம், நகல், நீக்குதலை எளிதாக்கும் காட்சி." },
        { type: "gloss-row", word: "📝 Notes View", def: "ஒவ்வொரு ஸ்லைடுக்கும் கீழே பேச்சாளர் குறிப்புகளைச் சேர்க்க உதவும் காட்சி." },
        { type: "nav", back: "intro", next: "slide-management", nextLabel: "அடுத்து: ஸ்லைடு மேலாண்மை →" }
      ]
    },
    {
      id: "slide-management",
      label: "ஸ்லைடு மேலாண்மை",
      blocks: [
        { type: "section-head", text: "8.3 ஸ்லைடு மேலாண்மை (Slide Management)" },
        { type: "teacher-voice", html: "<p><b>புதிய ஸ்லைடு சேர்க்க:</b> Slide → New Slide, அல்லது Slides பேனலில் வலது கிளிக் செய்து New Slide தேர்ந்தெடுக்கவும்.</p><p><b>ஸ்லைடு நகலெடுக்க:</b> Slide → Duplicate Slide.</p><p><b>ஸ்லைடு நீக்க:</b> Slide → Delete Slide, அல்லது Delete விசை.</p><p><b>Layout (அமைப்பு):</b> ஒவ்வொரு ஸ்லைடிற்கும் Title, Content, Two Content போன்ற பல்வேறு Layout-களைத் தேர்வு செய்யலாம் — Layouts Properties பேனலில் இருந்து.</p>" },
        { type: "gloss-row", word: "➕ New Slide", def: "காட்சிப் பொருளில் ஒரு புதிய ஸ்லைடைச் சேர்க்கும் கட்டளை; Slide → New Slide வழியாகச் செய்யலாம்." },
        { type: "gloss-row", word: "📐 Layout", def: "ஒரு ஸ்லைடில் தலைப்பு, உரை, படம் போன்றவை எவ்வாறு அமைக்கப்படும் என்பதைக் குறிக்கும் வடிவமைப்பு." },
        { type: "nav", back: "views", next: "master-slide", nextLabel: "அடுத்து: மாஸ்டர் ஸ்லைடு →" }
      ]
    },
    {
      id: "master-slide",
      label: "மாஸ்டர் ஸ்லைடு",
      blocks: [
        { type: "section-head", text: "8.4 மாஸ்டர் ஸ்லைடு (Master Slide)" },
        { type: "teacher-voice", html: "<p><b>மாஸ்டர் ஸ்லைடு (Master Slide)</b> என்பது அனைத்து ஸ்லைடுகளுக்கும் பொதுவான வடிவமைப்பைத் (பின்னணி, எழுத்துரு, லோகோ) தீர்மானிக்கும் \"முதன்மை வார்ப்புரு\" ஆகும். மாஸ்டர் ஸ்லைடில் ஒரு மாற்றத்தைச் செய்தால், அது காட்சிப் பொருளின் அனைத்து ஸ்லைடுகளிலும் தானாகப் பிரதிபலிக்கும்.</p><p><b>திறக்க:</b> View → Master → Slide Master. மீண்டும் Normal View-க்குத் திரும்ப Close Master View பொத்தானைச் சொடுக்கவும்.</p>" },
        { type: "gloss-row", word: "🎨 Master Slide", def: "அனைத்து ஸ்லைடுகளுக்கும் பொதுவான பின்னணி, எழுத்துரு போன்றவற்றைத் தீர்மானிக்கும் முதன்மை வார்ப்புரு." },
        { type: "think-box", label: "நினைவில் கொள்ள 🎯", text: "Master Slide-இல் செய்யும் ஒரு மாற்றம் — உ.ம். லோகோ சேர்த்தல் — காட்சிப்பொருளின் ஒவ்வொரு ஸ்லைடிலும் தானாகத் தோன்றும்; ஒவ்வொரு ஸ்லைடிலும் தனித்தனியாகச் செய்யத் தேவையில்லை." },
        { type: "nav", back: "slide-management", next: "inserting-objects", nextLabel: "அடுத்து: பொருள்கள் செருகுதல் →" }
      ]
    },
    {
      id: "inserting-objects",
      label: "பொருள்கள் செருகுதல்",
      blocks: [
        { type: "section-head", text: "8.5 உரை, வடிவங்கள், படங்கள் செருகுதல்" },
        { type: "teacher-voice", html: "<p><b>Text Box:</b> Insert → Text Box — ஸ்லைடில் ஒரு புதிய உரைப் பெட்டியைச் செருகும்.</p><p><b>Drawing Toolbar:</b> கோடு, செவ்வகம், நீள்வட்டம், அம்புக்குறி, Basic Shapes, Flowcharts, Callouts, Stars ஆகிய வடிவங்களை வரைய உதவும்.</p><p><b>படங்கள் செருக:</b> Insert → Picture → From File — கணினியில் சேமிக்கப்பட்ட படத்தைச் ஸ்லைடில் செருகும்.</p><p><b>அட்டவணை செருக:</b> Insert → Table — வரிசைகள், நெடுவரிசைகள் எண்ணிக்கையைக் குறிப்பிட்டு அட்டவணை உருவாக்கலாம்.</p>" },
        { type: "gloss-row", word: "🖼️ Insert Picture", def: "Insert → Picture → From File — கணினியில் சேமிக்கப்பட்ட படத்தை ஸ்லைடில் செருகும் கட்டளை." },
        { type: "gloss-row", word: "✏️ Drawing Toolbar", def: "கோடு, செவ்வகம், அம்புக்குறி போன்ற வடிவங்களை ஸ்லைடில் வரைய உதவும் கருவிப்பட்டை." },
        { type: "nav", back: "master-slide", next: "animation", nextLabel: "அடுத்து: அசைவூட்டமும் நகர்வும் →" }
      ]
    },
    {
      id: "animation",
      label: "அசைவூட்டம் / நகர்வு",
      blocks: [
        { type: "section-head", text: "8.6 நிகழ்த்துதல் அசைவூட்டமும் ஸ்லைடு நகர்வும் (Animation & Transition)" },
        { type: "teacher-voice", html: "<p><b>ஸ்லைடு நகர்வு (Slide Transition):</b> ஒரு ஸ்லைடிலிருந்து அடுத்த ஸ்லைடிற்கு மாறும்போது தோன்றும் விளைவு. Slide → Slide Transition — விளைவு, வேகம், ஒலி ஆகியவற்றைத் தேர்வு செய்யலாம்.</p><p><b>தனிப்பயன் அசைவூட்டம் (Custom Animation):</b> ஸ்லைடிலுள்ள ஒவ்வொரு பொருளுக்கும் (உரை, படம்) தனித்தனியே அசைவூட்ட Slide Show → Custom Animation பயன்படுகிறது.</p>" },
        { type: "gloss-row", word: "🔄 Slide Transition", def: "ஒரு ஸ்லைடிலிருந்து அடுத்ததற்கு மாறும்போது தோன்றும் காட்சி விளைவு." },
        { type: "gloss-row", word: "✨ Custom Animation", def: "ஸ்லைடிலுள்ள ஒரு குறிப்பிட்ட பொருளுக்கு (உரை/படம்) தனித்தனியே அசைவூட்டும் அம்சம்." },
        { type: "nav", back: "inserting-objects", next: "save-run", nextLabel: "அடுத்து: சேமித்தலும் இயக்குதலும் →" }
      ]
    },
    {
      id: "save-run",
      label: "சேமித்தல் / இயக்குதல்",
      blocks: [
        { type: "section-head", text: "8.7 சேமித்தலும் ஸ்லைடுஷோவை இயக்குதலும்" },
        { type: "teacher-voice", html: "<p><b>சேமித்தல் (Save):</b> File → Save (Ctrl+S). Save As மூலம் .odp (OpenOffice), .pptx (PowerPoint) அல்லது .pdf வடிவங்களில் சேமிக்கலாம்.</p><p><b>Export as PDF:</b> ஸ்லைடுகளை நேரடியாக PDF கோப்பாக ஏற்றுமதி செய்யும் விரைவு கருவி.</p><p><b>ஸ்லைடுஷோவை இயக்க:</b> F5 விசை (தொடக்கத்திலிருந்து) அல்லது F9 (தற்போதைய ஸ்லைடிலிருந்து) அழுத்தவும்; அல்லது Slide Show → Start from First Slide.</p><p><b>அச்சிடுதல் (Print):</b> File → Print (Ctrl+P) — Slides, Handouts, Notes, அல்லது Outline வடிவில் அச்சிடலாம்.</p>" },
        { type: "gloss-row", word: "📤 Export as PDF", def: "ஸ்லைடுகளை நேரடியாக PDF கோப்பாக ஏற்றுமதி செய்யும் விரைவு கருவி." },
        { type: "gloss-row", word: "▶️ Slide Show (F5 / F9)", def: "F5 — முதல் ஸ்லைடிலிருந்து ஸ்லைடுஷோவைத் தொடங்கும்; F9 — தற்போதைய ஸ்லைடிலிருந்து தொடங்கும்." },
        { type: "nav", back: "animation", practice: true }
      ]
    }
  ]
}
