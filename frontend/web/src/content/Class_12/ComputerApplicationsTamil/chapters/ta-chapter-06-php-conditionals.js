export default {
  eyebrow: "பாடம் 6 · வகுப்பு 12 கணினி பயன்பாடுகள்",
  title: "PHP-இல் உள்ள நிபந்தனைக் கூற்றுகள்",
  author: "",
  pills: ["கோட்பாடு", "செய்முறை"],

  tabs: [

    // ─────────────────────────────────────────────────────────
    // TAB 1 — if கூற்று
    // ─────────────────────────────────────────────────────────
    {
      id: "if-statement",
      label: "if கூற்று",
      blocks: [
        {
          type: "section-head",
          text: "6.1 கட்டுப்பாட்டுக் கூற்றுகள் (Control Statements)",
        },
        {
          type: "teacher-voice",
          html: "<p>கட்டுப்பாட்டுக் கூற்றுகள் (Control statements/structures) நிரலின் இயங்குபாட்டு வரிசையை நிபந்தனைகளின் அடிப்படையில் மாற்றியமைக்கப் பயன்படுகின்றன. PHP-இல் இரு வகையான கட்டுப்பாட்டுக் கூற்றுகள் உள்ளன:</p><ol><li>நிபந்தனைக் கூற்றுகள் (Conditional Statements)</li><li>மடக்குக் கூற்றுகள் (Looping Statements)</li></ol>",
        },
        {
          type: "section-head",
          text: "6.2 PHP-இல் உள்ள நிபந்தனைக் கூற்றுகள் (4 வகைகள்)",
        },
        {
          type: "teacher-voice",
          html: "<p>நிபந்தனைக் கூற்றுகள் ஒரு குறிப்பிட்ட நிபந்தனையின் அடிப்படையில் குறியீட்டைச் செயற்படுத்துகின்றன. PHP-இல் நான்கு வகையான நிபந்தனைக் கூற்றுகள் உள்ளன:</p><ol><li>if கூற்று</li><li>if...else கூற்று</li><li>if...elseif...else கூற்று</li><li>switch கூற்று</li></ol>",
        },
        {
          type: "section-head",
          text: "6.2.1 if கூற்று",
        },
        {
          type: "teacher-voice",
          html: "<p>if கூற்றானது ஒரு நிபந்தனையைச் சோதித்து, அந்த நிபந்தனை உண்மையாக (True) இருந்தால் மட்டுமே குறிப்பிட்ட குறியீட்டுத் தொகுதியை செயற்படுத்துகிறது.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "if (condition) { // code to be executed if condition is true; }",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "<?php $x = 10; if ($x > 5) { echo 'x is greater than 5'; } ?> — இதில் $x = 10 என்பதால் நிபந்தனை உண்மையாக இருப்பதால், 'x is greater than 5' என்று திரையில் காட்டப்படும்.",
        },
        {
          type: "nav",
          next: "if-else",
          nextLabel: "அடுத்து: if...else →",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 2 — if...else
    // ─────────────────────────────────────────────────────────
    {
      id: "if-else",
      label: "if...else",
      blocks: [
        {
          type: "section-head",
          text: "6.2.2 if...else கூற்று",
        },
        {
          type: "teacher-voice",
          html: "<p>if...else கூற்று PHP-இல் ஓர் நிபந்தனைக்கு இரு வழிமுறைகளை (True-block மற்றும் False-block) வழங்குகிறது. நிபந்தனை True ஆக இருந்தால் True-block, இல்லையெனில் False-block செயற்படுத்தப்படும்.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "if (condition) { // True-block } else { // False-block }",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "<?php $x = 10; if ($x > 5) { echo 'x is greater than 5'; } else { echo 'x is not greater than 5'; } ?> — வெளியீடு: x is greater than 5",
        },
        {
          type: "section-head",
          text: "6.2.3 if...elseif...else கூற்று",
        },
        {
          type: "teacher-voice",
          html: "<p>இவ்வுவகையான கூற்றில் 'if' என்ற சிறப்புச் சொல்லைத் தொடர்ந்து ஒன்று அல்லது அதற்கு மேற்பட்ட 'elseif' தொகுதிகள் இடம்பெறுகின்றன, இறுதியாக 'else' தொகுதியும் இடம்பெறும். நிபந்தனைகள் ஒவ்வொன்றாகச் சோதிக்கப்பட்டு, முதலில் True எனக் காணப்படும் நிபந்தனையின் தொகுதி மட்டும் இயங்கும்.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "if (condition) { // code to be executed if condition is true; } elseif (condition2) { // code to be executed if condition is false and condition2 is true; } elseif (condition3) { // code to be executed if condition and condition2 are false and condition3 is true; } else { // code to be executed if all conditions are false; }",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "<?php $x = 12; if ($x > 20) { echo 'x is greater than 20'; } elseif ($x > 15) { echo 'x is greater than 15 but not greater than 20'; } elseif ($x > 10) { echo 'x is greater than 10 but not greater than 15'; } else { echo 'x is not greater than 10'; } ?> — வெளியீடு: x is greater than 10 but not greater than 15",
        },
        {
          type: "nav",
          back: "if-statement",
          next: "switch",
          nextLabel: "அடுத்து: switch கூற்று →",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 3 — switch கூற்று
    // ─────────────────────────────────────────────────────────
    {
      id: "switch",
      label: "switch கூற்று",
      blocks: [
        {
          type: "section-head",
          text: "6.2.4 switch கூற்று",
        },
        {
          type: "teacher-voice",
          html: "<p>ஒரு கோவைக்குரிய பல்வேறு மதிப்புகளைச் சோதிக்க switch கூற்று பயன்படுத்தப்படுகிறது. இது பல if...elseif...else கூற்றுகளுக்குப் பதிலாக பயன்படுத்தப்படுவதால், குறியீட்டைத் தெளிவாக்குகிறது.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "switch (expression) { case value1: // code to be executed if expression = value1; break; case value2: // code to be executed if expression = value2; break; default: // code to be executed if expression is not equal to any of the values; }",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "<?php $x = 10; switch ($x) { case 5: echo 'x is equal to 5'; break; case 10: echo 'x is equal to 10'; break; case 15: echo 'x is equal to 15'; break; default: echo 'x is not equal to 5, 10, or 15'; } ?> — வெளியீடு: x is equal to 10",
        },
        {
          type: "think-box",
          label: "⭐ நினைவில் கொள்க",
          text: "நிரலின் நடைபெறும் { } ஆனது கட்டுப்பாட்டு கட்டமைப்பில் உள்ள தொகுதிகளைக் குறிக்கிறது. நிபந்தனை (condition) True எனில் மட்டுமே அத்தொகுதி { } நடைபெறும். elseif என்பதை else if என்று இரண்டு வெவ்வேறு சொற்களாகவும் எழுதலாம். switch கூற்றில் break கூற்றானது ஒரு case-ஐ முடித்து, switch கட்டமைப்பிலிருந்து வெளியேறி நிரலாக்கத்தைத் தொடர அனுமதிக்கிறது.",
        },
        {
          type: "nav",
          back: "if-else",
          practice: true,
        },
      ],
    },
  ],
}
