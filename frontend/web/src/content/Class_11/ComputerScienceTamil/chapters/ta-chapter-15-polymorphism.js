export default {
  chapterNumber: 15,
  title: "பல்லுருவாக்கம்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு XI",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro",
      title: "பல்லுருவாக்கம் — அறிமுகம்",
      content: `**பல்லுருவாக்கம் (Polymorphism)** என்பது "பல வடிவங்கள்" எனப் பொருள்படும்; ஒரே பெயர் கொண்ட செயற்கூறு அல்லது செயலி, வெவ்வேறு சூழல்களில் வெவ்வேறு வகையில் செயல்படும் திறன் ஆகும்.

**வகைகள்:**
- **தொகுத்தல் நேரப் பல்லுருவாக்கம் (Compile-time Polymorphism):** செயற்கூறு மிகைப்படுத்தல் (Function Overloading), செயலி மிகைப்படுத்தல் (Operator Overloading).
- **இயக்க நேரப் பல்லுருவாக்கம் (Run-time Polymorphism):** Virtual Functions மூலம் (மேல்நிலைப் பாடத்தில் விரிவாகக் கற்பீர்கள்).`,
      nav: { next: "function-overloading", nextLabel: "அடுத்து: செயற்கூறு மிகைப்படுத்தல் →" }
    },
    {
      id: "function-overloading",
      title: "செயற்கூறு மிகைப்படுத்தல் (Function Overloading)",
      content: `**Function Overloading:** ஒரே பெயர் கொண்ட பல செயற்கூறுகளை, வெவ்வேறு அளவுருக்களின் எண்ணிக்கை அல்லது தரவு வகையுடன் வரையறுப்பது.

\`\`\`cpp
int add(int a, int b) {
    return a + b;
}
float add(float a, float b) {
    return a + b;
}
int add(int a, int b, int c) {
    return a + b + c;
}
\`\`\`

தொகுப்பாளர் (Compiler) அழைக்கப்படும் செயற்கூற்றின் அளவுருக்களைப் பொருத்து, சரியான செயற்கூற்றைத் தானாகத் தேர்ந்தெடுக்கும்.

**கட்டுப்பாடுகள் (Restrictions on Overloading):** return type மட்டும் மாறினால் Overloading சாத்தியமில்லை; அளவுருக்களின் எண்ணிக்கை அல்லது வகை மாற வேண்டும்.`,
      nav: { back: "intro", next: "operator-overloading", nextLabel: "அடுத்து: செயலி மிகைப்படுத்தல் →" }
    },
    {
      id: "operator-overloading",
      title: "செயலி மிகைப்படுத்தல் (Operator Overloading)",
      content: `**Operator Overloading:** C++-இல் ஏற்கெனவே உள்ள செயலிகளுக்கு (+, -, ==) பயனாளர் வரையறுத்த இனக்குழுக்களுக்கான புதிய பொருள் கொடுப்பது.

\`\`\`cpp
class complex {
  public:
    int real, imag;
    complex operator + (complex c2) {
        complex c3;
        c3.real = real + c2.real;
        c3.imag = imag + c2.imag;
        return c3;
    }
};
\`\`\`

**தொடரமைப்பு (Operator Function Syntax):**

\`\`\`
ReturnType classname :: operator Symbol (arguments)
{
    // function body
}
\`\`\`

இதன் மூலம் இரு complex எண்களை c3 = c1 + c2 என நேரடியாகக் கூட்டலாம்.`,
      nav: { back: "function-overloading", practice: true }
    }
  ]
}
