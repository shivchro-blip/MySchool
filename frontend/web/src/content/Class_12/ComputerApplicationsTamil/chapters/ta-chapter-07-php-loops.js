export default {
  eyebrow: "பாடம் 7 · வகுப்பு 12 கணினி பயன்பாடுகள்",
  title: "PHP-இல் மடக்குகள்",
  author: "",
  pills: ["கோட்பாடு", "செய்முறை"],

  tabs: [

    // ─────────────────────────────────────────────────────────
    // TAB 1 — for & while
    // ─────────────────────────────────────────────────────────
    {
      id: "for-while",
      label: "for & while",
      blocks: [
        {
          type: "section-head",
          text: "7.1 PHP-இல் மடக்குகள் (Loops in PHP)",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP-இல் மடக்கு (loop) என்பது ஒரு குறியீட்டைத் திரும்பத்திரும்ப, தடவைகள் தொடர்ந்து, செயற்படுத்துவதற்கான ஒரு கட்டமைப்பாகும். PHP-இல் நான்கு வகையான மடக்குகள் உள்ளன:</p><ol><li>for மடக்கு</li><li>while மடக்கு</li><li>do...while மடக்கு</li><li>foreach மடக்கு</li></ol>",
        },
        {
          type: "section-head",
          text: "7.2 for மடக்கு",
        },
        {
          type: "teacher-voice",
          html: "<p>for மடக்கு நுழைவு சோதிப்பு (entry-check) மடக்கு ஆகும் — குறியீட்டுத் தொகுதி இயங்குவதற்கு முன் நிபந்தனை சோதிக்கப்படும். எத்தனை முறை மடக்கு இயங்க வேண்டும் எனத் தெரிந்திருக்கும்போது for மடக்கு பயன்படுத்தப்படுகிறது.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "for (initialization; condition; increment/decrement) { // code block; }",
        },
        {
          type: "teacher-voice",
          html: "<p>Initialization (தொடக்க நிலை) பகுதி ஒரே ஒரு முறை மட்டும் செயல்படுத்தப்படும். condition (நிபந்தனை) ஒவ்வொரு சுற்றின் தொடக்கத்திலும் சரிபார்க்கப்படும் — உண்மையாக இருந்தால் மட்டும் code block இயங்கும். increment/decrement பகுதி ஒவ்வொரு சுற்று முடிவிலும் செயல்படுத்தப்படும்.</p>",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு 1 — 5 வரை உள்ள எண்களை ஏறுவரிசையில் அச்சிடுதல்",
          def: "for ($i = 1; $i <= 5; $i++) { echo $i . '<br>'; } — வெளியீடு: 1 2 3 4 5",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு 2 — 5 வரை உள்ள எண்களை இறங்குவரிசையில் அச்சிடுதல்",
          def: "for ($i = 5; $i >= 1; $i--) { echo $i . '<br>'; } — வெளியீடு: 5 4 3 2 1",
        },
        {
          type: "section-head",
          text: "7.3 while மடக்கு",
        },
        {
          type: "teacher-voice",
          html: "<p>while மடக்கும் நுழைவு சோதிப்பு (entry-check) மடக்கு ஆகும் — code block இயங்குவதற்கு முன் நிபந்தனை சோதிக்கப்படும்.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "while (condition) { //to be executed }",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு — 5 வரை உள்ள எண்களை அச்சிடுதல்",
          def: "$i = 1; while ($i <= 5) { echo $i . '<br>'; $i++; } — வெளியீடு: 1 2 3 4 5",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 2 — do...while & foreach
    // ─────────────────────────────────────────────────────────
    {
      id: "dowhile-foreach",
      label: "do...while & foreach",
      blocks: [
        {
          type: "section-head",
          text: "7.4 do...while மடக்கு",
        },
        {
          type: "teacher-voice",
          html: "<p>do...while மடக்கு வெளியேறும் சோதிப்பு (exit-check) மடக்கு ஆகும் — code block ஒருமுறை இயக்கப்பட்ட பிறகே நிபந்தனை சோதிக்கப்படும்.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "do { // to be executed } while (condition);",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு — 5 வரை உள்ள எண்களை அச்சிடுதல்",
          def: "$i = 1; do { echo $i . '<br>'; $i++; } while ($i <= 5); — வெளியீடு: 1 2 3 4 5",
        },
        {
          type: "section-head",
          text: "7.4.1 while மடக்கு மற்றும் do...while மடக்கு — முக்கிய வேறுபாடுகள்",
        },
        {
          type: "gloss-row",
          word: "இயக்க வரிசை (Execution order)",
          def: "while மடக்கில், முதலில் நிபந்தனை (condition) சரிபார்க்கப்பட்டு, பிறகு code block இயக்கப்படும். do...while மடக்கில், முதலில் code block இயக்கப்பட்டு, பிறகு நிபந்தனை சரிபார்க்கப்படும்.",
        },
        {
          type: "gloss-row",
          word: "சுற்றுகளின் எண்ணிக்கை (Number of iterations)",
          def: "while மடக்கில், நிபந்தனை தொடக்கத்திலேயே பொய் (False) எனில், code block ஒருமுறை கூட இயங்காமல் போகலாம். do...while மடக்கில், நிபந்தனை பொய் எனினும், code block குறைந்தது ஒரு முறையேனும் இயங்கும்.",
        },
        {
          type: "section-head",
          text: "7.5 foreach மடக்கு",
        },
        {
          type: "teacher-voice",
          html: "<p>foreach மடக்கு அணிகளின் (Array) ஒவ்வொரு உறுப்பையும் தொடர்ந்து அணுகி இயக்கப் பயன்படுகிறது.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "foreach ($array as $value) { // to be executed; }",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "$array = array(1, 2, 3, 4, 5); foreach ($array as $value) { echo $value . '<br>'; } — வெளியீடு: 1 2 3 4 5",
        },
        {
          type: "gloss-row",
          word: "திறவுகோலுடன் கூடிய foreach (Key => Value)",
          def: "foreach ($array as $key => $value) { // to be executed; } — எடுத்துக்காட்டு: $array = array('a'=>1, 'b'=>2, 'c'=>3); foreach ($array as $key => $value) { echo $key . ' => ' . $value . '<br>'; } — வெளியீடு: a => 1, b => 2, c => 3.",
        },
        {
          type: "think-box",
          label: "⭐ நினைவில் கொள்க",
          text: "மடக்கு (loop) என்பது ஒரு குறியீட்டைத் திரும்பத்திரும்ப செயற்படுத்துவதற்கான கட்டமைப்பு. for மற்றும் while மடக்குகள் நுழைவு சோதிப்பு (entry-check) மடக்குகள். do...while மடக்கு வெளியேறும் சோதிப்பு (exit-check) மடக்கு. foreach மடக்கு அணிகளை (arrays) இயக்கச் செய்யப் பயன்படுகிறது.",
        },
      ],
    },
  ],
}
