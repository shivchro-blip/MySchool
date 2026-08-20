export default {
  eyebrow: "பாடம் 8 · வகுப்பு 12 கணினி பயன்பாடுகள்",
  title: "படிவங்கள் மற்றும் கோப்புகள்",
  author: "",
  pills: ["கோட்பாடு", "செய்முறை"],

  tabs: [

    // ─────────────────────────────────────────────────────────
    // TAB 1 — HTML படிவங்கள்
    // ─────────────────────────────────────────────────────────
    {
      id: "html-forms",
      label: "HTML படிவங்கள்",
      blocks: [
        {
          type: "section-head",
          text: "8.1 HTML படிவங்கள் (HTML Forms)",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP மற்றும் HTML படிவ உறுப்புகளை (form elements) ஒன்றாகப் பயன்படுத்தி பயனரிடமிருந்து தரவைப் பெறலாம். பயனரிடமிருந்து தரவைப் பெறுவதற்குப் பயன்படுத்தப்படும் அடிப்படை HTML படிவ கட்டுப்பாடுகள் (form controls) பின்வருமாறு:</p>",
        },
        {
          type: "gloss-row",
          word: "உரை உள்ளீடு (Text Entry)",
          def: "பயனர் ஒரு வரி உரையை உள்ளிட <input type='text'> பயன்படுத்தப்படுகிறது.",
        },
        {
          type: "gloss-row",
          word: "கடவுச்சொல் உள்ளீடு (Password box)",
          def: "பயனரின் கடவுச்சொல்லை மறைத்துக் காட்ட <input type='password'> பயன்படுத்தப்படுகிறது.",
        },
        {
          type: "gloss-row",
          word: "தேர்வு பொத்தான் (Radio Buttons)",
          def: "பல தேர்வுகளில் ஒன்றை மட்டும் தேர்வு செய்ய <input type='radio'> பயன்படுத்தப்படுகிறது.",
        },
        {
          type: "gloss-row",
          word: "செக் பாக்ஸ் (Checkbox)",
          def: "பல தேர்வுகளில் ஒன்று அல்லது அதற்கு மேற்பட்டவற்றைத் தேர்வு செய்ய <input type='checkbox'> பயன்படுத்தப்படுகிறது.",
        },
        {
          type: "gloss-row",
          word: "தேர்வுப் பட்டியல் (Select)",
          def: "கீழிறங்கும் பட்டியலிலிருந்து ஒரு தேர்வைத் தேர்ந்தெடுக்க <select> உறுப்பு பயன்படுத்தப்படுகிறது.",
        },
        {
          type: "gloss-row",
          word: "Reset & Submit பொத்தான்கள்",
          def: "Reset பொத்தான் படிவத்தை அதன் தொடக்க நிலைக்கு மீட்டமைக்கும். Submit பொத்தான் படிவத்தில் நிரப்பப்பட்ட தரவை சேவையகத்திற்கு அனுப்பும்.",
        },
        {
          type: "gloss-row",
          word: "படிவக் குழு (Form Tag)",
          def: "<form> டேக் அனைத்து படிவக் கட்டுப்பாடுகளையும் ஒன்றாகக் குழுவாக்கி, தரவு எங்கு, எவ்வாறு அனுப்பப்பட வேண்டும் என்பதை (action, method) குறிப்பிடுகிறது.",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 2 — சரிபார்ப்பு & கோப்புகள்
    // ─────────────────────────────────────────────────────────
    {
      id: "validation-files",
      label: "சரிபார்ப்பு & கோப்புகள்",
      blocks: [
        {
          type: "section-head",
          text: "8.1.1 PHP அடிப்படைப் படிவக் கையாளுதல் (PHP Basic Form Handling)",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP படிவ உறுப்புகளின் மதிப்பை உள்ளிணைந்த $_GET மற்றும் $_POST என்ற சிறப்பு மாறிகள் (superglobals) மூலம் பெறுகிறது. Action பண்புக்கூறு படிவத் தரவு எங்கு அனுப்பப்பட வேண்டும் என்பதைக் குறிப்பிடுகிறது; Method பண்புக்கூறு தரவு எவ்வாறு அனுப்பப்பட வேண்டும் (GET அல்லது POST) என்பதைக் குறிப்பிடுகிறது.</p>",
        },
        {
          type: "gloss-row",
          word: "GET முறை",
          def: "URL முகவரி வழியாக GET முறை மூலம் தரவு அனுப்பப்படுகிறது (query string வடிவில்) — URLல் தெரியும் என்பதால் பாதுகாப்பற்றது, சிறிய அளவு தரவுக்கு மட்டும் ஏற்றது.",
        },
        {
          type: "gloss-row",
          word: "POST முறை",
          def: "HTTP கோரிக்கையின் (request) உடலில் தரவை மறைத்து அனுப்புகிறது — URLல் தெரியாது, எனவே அதிக அளவு தரவுக்கும் பாதுகாப்புத் தேவைப்படும் தரவுக்கும் (எ.கா. கடவுச்சொல்) ஏற்றது.",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "<html><body><form action='welcome.php' method='post'>Name: <input type='text' name='name'><br>E-mail: <input type='text' name='email'><br><input type='submit'></form></body></html> — welcome.php-ல்: Welcome &lt;?php echo $_POST['name']; ?&gt;&lt;br&gt;Your email address is: &lt;?php echo $_POST['email']; ?&gt;",
        },
        {
          type: "section-head",
          text: "8.1.2 PHP படிவச் சரிபார்ப்பு (PHP Form Validation)",
        },
        {
          type: "teacher-voice",
          html: "<p>படிவச் சரிபார்ப்பு (Form Validation) என்பது பயனர் உள்ளிட்ட தரவு சரியானதா, முழுமையானதா என சேவையகத்தில் (Server-side) அல்லது வாடிக்கையாளர் கணினியில் (Client-side) சரிபார்க்கும் செயல்முறையாகும். PHP-ல் required பண்புக்கூறு மூலம் ஒரு புலம் கட்டாயமாக நிரப்பப்பட வேண்டும் என்பதைக் குறிப்பிடலாம்.</p>",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "<form action='welcome.php' method='post'> Username: <input type='text' name='name' required><br> <input type='submit'></form> — 'required' பண்புக்கூறு இருந்தால், அப்புலம் காலியாக இருக்கும் போது படிவம் சமர்ப்பிக்கப்படாது.",
        },
        {
          type: "section-head",
          text: "8.2 PHP-இல் கோப்பு கையாளுதல் (File Handling in PHP)",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP-ல் கோப்புகளை உருவாக்க, திறக்க, படிக்க, எழுத, மற்றும் மூட பின்வரும் செயற்கூறுகள் பயன்படுத்தப்படுகின்றன.</p>",
        },
        {
          type: "gloss-row",
          word: "fopen() — கோப்பைத் திறத்தல்",
          def: "$file = fopen('filename', 'mode'); — கோப்பை திறக்கப் பயன்படும். File modes: r (Read — படிக்க மட்டும்), w (Write — எழுத, ஏற்கனவே உள்ள உள்ளடக்கத்தை அழிக்கும்), a (Append — இறுதியில் சேர்க்க), x (புதிய கோப்பை உருவாக்க).",
        },
        {
          type: "gloss-row",
          word: "fclose() — கோப்பை மூடுதல்",
          def: "fclose($file_Object); — திறக்கப்பட்ட கோப்பை மூடி, அதனுடன் தொடர்புடைய வளங்களை (resources) விடுவிக்க பயன்படுகிறது.",
        },
        {
          type: "gloss-row",
          word: "fread() — கோப்பிலிருந்து படித்தல்",
          def: "fread($file_Object, filesize('filename')); — திறக்கப்பட்ட கோப்பிலிருந்து குறிப்பிட்ட எண்ணிக்கையிலான எழுத்துக்களைப் படிக்கப் பயன்படுகிறது.",
        },
        {
          type: "gloss-row",
          word: "fwrite() — கோப்பில் எழுதுதல்",
          def: "fwrite($myfile, $txt); — திறக்கப்பட்ட கோப்பில் தரவை எழுதப் பயன்படுகிறது.",
        },
        {
          type: "gloss-row",
          word: "முழு எடுத்துக்காட்டு",
          def: "$myfile = fopen('student.txt', 'r'); // some code to be executed... fclose($myfile); — இங்கு student.txt என்ற கோப்பு படிக்கும் (read) பயன்முறையில் திறக்கப்பட்டு, பணி முடிந்தபின் மூடப்படுகிறது.",
        },
        {
          type: "think-box",
          label: "⭐ நினைவில் கொள்க",
          text: "HTML (HyperText Markup Language) — வலைப்பக்க அமைப்புகளை உருவாக்கப் பயன்படும் மொழி. FORM VALIDATION (படிவச் சரிபார்ப்பு) — HTML படிவங்கள் மூலம் உள்ளிடப்பட்ட தரவு சரியானதா எனச் சரிபார்க்கும் செயல்முறை. கோப்பு கையாளுதல் (File Handling) — கோப்புகளை உருவாக்க, திறக்க, படிக்க, எழுத மற்றும் மூட பயன்படும் செயல்முறை.",
        },
      ],
    },
  ],
}
