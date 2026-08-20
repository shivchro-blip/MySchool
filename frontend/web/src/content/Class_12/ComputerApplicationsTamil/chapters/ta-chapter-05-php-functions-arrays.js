export default {
  eyebrow: "பாடம் 5 · வகுப்பு 12 கணினி பயன்பாடுகள்",
  title: "PHP செயற்கூறுகள் மற்றும் அணிகள்",
  author: "",
  pills: ["கோட்பாடு", "செய்முறை"],

  tabs: [

    // ─────────────────────────────────────────────────────────
    // TAB 1 — செயற்கூறுகள்
    // ─────────────────────────────────────────────────────────
    {
      id: "functions",
      label: "செயற்கூறுகள்",
      blocks: [
        {
          type: "section-head",
          text: "5.1 PHP-இல் செயற்கூறுகள் (Functions in PHP)",
        },
        {
          type: "teacher-voice",
          html: "<p>செயற்கூறு என்பது ஒரு குறிப்பிட்ட பணியைச் செய்யும் குறியீட்டின் தொகுதியாகும். இதைப் பயன்படுத்துவதால் பின்வரும் நன்மைகள் கிடைக்கின்றன:</p>",
        },
        {
          type: "gloss-row",
          word: "குறியீட்டு மறுபயன்பாடு (Code reuse)",
          def: "செயற்கூறாகவும் குறியீடு எழுதப்பட்டால், அதே குறியீட்டை பல முறை மீண்டும் எழுதாமல், தேவைப்படும் இடங்களில் மறுபயன்படுத்தலாம்.",
        },
        {
          type: "gloss-row",
          word: "சோதித்தல் மற்றும் பிழைத் திருத்தம் (Testing and debugging)",
          def: "செயற்கூறுகளாகப் பிரிக்கப்பட்ட குறியீட்டை தனித்தனியாக சோதிப்பதும் பிழைத் திருத்துவதும் எளிதாகிறது.",
        },
        {
          type: "gloss-row",
          word: "தொகுதிகளாகப் பிரித்தல் (Modularity)",
          def: "குறியீட்டைச் சிறு தொகுதிகளாகப் பிரிப்பதால் நிரலானது எளிதில் புரிந்துகொள்ளக்கூடியதாகவும் மேலாண்மை செய்யக்கூடியதாகவும் மாறுகிறது.",
        },
        {
          type: "section-head",
          text: "5.2 PHP-இல் உள்ள செயற்கூறுகளின் வகைகள்",
        },
        {
          type: "gloss-row",
          word: "1. உள்ளிணைந்த செயற்கூறுகள் (Built-in functions)",
          def: "PHP-ல் முன்பே வரையறுக்கப்பட்ட செயற்கூறுகள் — echo, strlen(), array() போன்றவை உள்ளிணைந்த செயற்கூறுகள் எனப்படும்.",
        },
        {
          type: "gloss-row",
          word: "2. பயனர் வரையறுத்த செயற்கூறுகள் (User-defined functions)",
          def: "பயனரால் ஒரு குறிப்பிட்ட பணிக்காக புதிதாக எழுதப்படும் செயற்கூறுகள்.",
        },
        {
          type: "section-head",
          text: "5.2.1 பயனர் வரையறுத்த செயற்கூறு உருவாக்குதல்",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP-ல் பயனர் வரையறுத்த செயற்கூறு <code>function</code> என்ற சிறப்புச் சொல்லுடன் தொடங்க வேண்டும்.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "function functionName(parameter list) { // code to be executed }",
        },
        {
          type: "teacher-voice",
          html: "<p>functionName என்பது செயற்கூறின் பெயர்; parameter list என்பது செயற்கூறுக்குள் தேவைப்படும் மதிப்புகள் (இது விருப்பத்திற்குரியது — parameter இல்லாமலும் செயற்கூறை உருவாக்கலாம்).</p>",
        },
        {
          type: "section-head",
          text: "5.2.2 செயற்கூறை அழைத்தல் (Calling a Function)",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "functionName(); அல்லது functionName(argument list);",
        },
        {
          type: "gloss-row",
          word: "(அ) அளபுருக்கள் இல்லாத செயற்கூறு",
          def: "<?php function printGreeting() { echo 'Hello, world!'; } printGreeting(); // Output will be 'Hello, world!' ?>",
        },
        {
          type: "gloss-row",
          word: "(ஆ) ஓர் அளபுருவுடன் கூடிய செயற்கூறு",
          def: "<?php function greet($name) { echo 'Hello, ' . $name . '!'; } greet('Harsh'); // Output will be 'Hello, Harsh!' ?>",
        },
        {
          type: "gloss-row",
          word: "(இ) இரண்டு அளபுருக்களுடன் கூடிய செயற்கூறு",
          def: "<?php function addNumbers($x, $y) { echo $x + $y; } addNumbers(10, 40); // Output will be '50' ?>",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 2 — அணிகள்
    // ─────────────────────────────────────────────────────────
    {
      id: "arrays",
      label: "அணிகள்",
      blocks: [
        {
          type: "section-head",
          text: "5.3 அணி (Array)",
        },
        {
          type: "teacher-voice",
          html: "<p>அணி என்பது ஒரு மாறியில் ஒன்றுக்கு மேற்பட்ட மதிப்புகளைச் சேமிக்கப் பயன்படும் ஒரு சிறப்பு மாறி வகையாகும். PHP-ல் மூன்று வகையான அணிகள் உள்ளன:</p><ol><li>குறியீட்டு எண் அணி (Indexed array)</li><li>தொடர்புபடுத்த அணி (Associative array)</li><li>பல பரிமாண அணி (Multidimensional array)</li></ol>",
        },
        {
          type: "think-box",
          label: "⭐ தேர்வுக் குறிப்பு",
          text: "அணியின் உறுப்புகள் வெவ்வேறு தரவு வகைகளைக் (Mixed data types) கொண்டிருக்கலாம் — இது PHP அணியின் ஒரு முக்கிய சிறப்பியல்பு.",
        },
        {
          type: "section-head",
          text: "5.3.1 குறியீட்டு எண் அணி (Indexed array)",
        },
        {
          type: "teacher-voice",
          html: "<p>குறியீட்டு எண் அணியில், ஒவ்வொரு உறுப்புக்கும் தானாகவே ஒரு எண் குறியீடு (Index) ஒதுக்கப்படுகிறது — இது 0 என்ற எண்ணிலிருந்து தொடங்குகிறது.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "$arrayVariable = [ element1, element2, element3, ... elementN]; (அல்லது) $arrayVariable = array( element1, element2, element3, ... elementN);",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "$fruits = ['apple', 'banana', 'orange']; $fruits = array('apple', 'banana', 'orange'); — Numbers = array(1, 2, 3, 4, 5); Colours = array('red', 'green', 'blue');",
        },
        {
          type: "gloss-row",
          word: "உறுப்புகளை அணுகுதல் (Accessing elements)",
          def: "குறியீட்டு எண்ணைப் பயன்படுத்தி அணியின் உறுப்புகளை அணுகலாம் — subscript எப்போதும் 0-லிருந்து தொடங்கும். எடுத்துக்காட்டு: echo $fruits[0]; // Output will be 'apple'. echo $fruits[1]; // Output will be 'banana'. echo $fruits[2]; // Output will be 'orange'.",
        },
        {
          type: "section-head",
          text: "5.3.2 தொடர்புபடுத்த அணி (Associative Array)",
        },
        {
          type: "teacher-voice",
          html: "<p>தொடர்புபடுத்த அணியில் ஒவ்வொரு உறுப்பிற்கும் நீங்களே ஒரு பெயரிடப்பட்ட திறவுகோலை (Key) கொடுக்கலாம் — இதனால் தரவை மேலும் விவரணமாக அணுக முடியும். PHP-ல் திறவுகோல் மற்றும் மதிப்பு (Key-value) இணைகளாக இது சேமிக்கப்படுகிறது.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "$arrayVariable = [ 'key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3', ... 'keyN' => 'valueN' ]; (அல்லது) array( 'key1' => 'value1', ... );",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "$student = [ 'Name' => 'Ram', 'Age' => 25, 'Place' => 'Trichy' ]; $marks = [ 'studentName' => 'Ravi', 'ExamNo' => 13425, 'Tamil' => 95, 'English' => 80, 'Computer Applications' => 99 ];",
        },
        {
          type: "gloss-row",
          word: "உறுப்புகளை அணுகுதல்",
          def: "திறவுகோலை மூலம் தொடர்புபடுத்த அணியின் உறுப்புகளை அணுகலாம். echo $arrayVariable['key1']; // Output will be 'value1'. echo $Ages['Arun']; // Output will be 25.",
        },
        {
          type: "section-head",
          text: "5.3.3 பல பரிமாண அணி (Multidimensional Array)",
        },
        {
          type: "teacher-voice",
          html: "<p>ஒன்று அல்லது அதற்கு மேற்பட்ட அணிகளை ஒரு அணிக்குள் சேமித்தால் அது பல பரிமாண அணி எனப்படும் — அதாவது ஒரு அணிக்குள் இன்னொரு அணி (nested array).</p>",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "$arr = array( array(1, 2, 3), array(4, 5, 6), array(7, 8, 9) ); echo $arr[1][2]; // Output will be 6.",
        },
      ],
    },
  ],
}
