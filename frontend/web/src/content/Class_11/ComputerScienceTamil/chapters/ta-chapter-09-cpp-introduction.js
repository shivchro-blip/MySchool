export default {
  chapterNumber: 9,
  title: "C++ ஓர் அறிமுகம்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு XI",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro",
      title: "C++ — அறிமுகம்",
      content: `**C++** என்பது 1979-இல் Bjarne Stroustrup என்பவரால் AT&T Bell ஆய்வகத்தில் உருவாக்கப்பட்ட ஒரு **பொருள்நோக்கு நிரலாக்க மொழி (Object-Oriented Programming Language)** ஆகும். இது C மொழியின் வளர்ச்சி வடிவமாகும்.

**C++ நிரலின் அடிப்படை அமைப்பு:**

\`\`\`
#include <iostream>
using namespace std;
int main()
{
    // executable statements
    return 0;
}
\`\`\`

- **#include <iostream>:** உள்ளீடு/வெளியீட்டுச் செயல்பாடுகளுக்கான தலைப்புக் கோப்பு.
- **using namespace std:** Standard நேம்ஸ்பேஸைப் பயன்படுத்த.
- **int main():** நிரலின் இயக்கம் தொடங்கும் முதன்மைச் செயற்கூறு.
- **return 0:** நிரல் வெற்றிகரமாக முடிவடைந்தது எனக் காட்ட.`,
      nav: { next: "tokens", nextLabel: "அடுத்து: குறியீடுகளும் மாறிலிகளும் →" }
    },
    {
      id: "tokens",
      title: "C++ குறியீடுகளும் (Tokens) மாறிலிகளும்",
      content: `C++ நிரலின் மிகச் சிறிய அர்த்தமுள்ள கூறு **குறியீடு (Token)** ஆகும். ஐந்து வகைக் குறியீடுகள்:

- **Keywords (ஒதுக்கப்பட்ட சொற்கள்):** int, float, if, else, for, while போன்றவை; பயனாளர் மாறிப் பெயராகப் பயன்படுத்த முடியாது.
- **Identifiers (அடையாளங்கள்):** மாறிகள், செயற்கூறுகளுக்கான பெயர்கள்; எழுத்து அல்லது அடிக்கோட்டால் தொடங்க வேண்டும்.
- **Constants (மாறிலிகள்):** மதிப்பு மாறாத எண்கள் அல்லது சின்னங்கள் (உ.ம். 123, 'A', "Hello").
- **Operators (செயலிகள்):** +, −, *, /, ==, && போன்றவை.
- **Punctuators (நிறுத்தற்குறிகள்):** {}, (), ;, , போன்றவை.

**ASCII (American Standard Code for Information Interchange):** ஒவ்வொரு எழுத்துக்கும் 0-255 வரையிலான ஒரு எண் மதிப்பைத் தரும் குறியீட்டு முறை.`,
      nav: { back: "intro", next: "operators", nextLabel: "அடுத்து: செயலிகள் →" }
    },
    {
      id: "operators",
      title: "C++ செயலிகள் (Operators)",
      content: `C++ பல வகையான செயலிகளை (Operators) வழங்குகிறது:

- **எண்கணிதச் செயலிகள் (Arithmetic):** + (கூட்டல்), − (கழித்தல்), * (பெருக்கல்), / (வகுத்தல்), % (மீதி).
- **உறவுச் செயலிகள் (Relational):** > , < , >= , <= , == , != — true/false தரும்.
- **தர்க்கரீதியான செயலிகள் (Logical):** && (AND), || (OR), ! (NOT).
- **ஒதுக்கீட்டுச் செயலிகள் (Assignment):** = , += , −= , *= , /= .
- **நிபந்தனைச் செயலி (Conditional / Ternary):** condition ? value1 : value2 — ஒரு வரியில் if-else-க்குச் சமமான முடிவை அளிக்கும்.

**செயலிகளின் முன்னுரிமை (Precedence of Operators):** () → * / % → + − → உறவுச் செயலிகள் → தர்க்கரீதியான செயலிகள் → =.`,
      nav: { back: "tokens", next: "io-statements", nextLabel: "அடுத்து: உள்ளீடு / வெளியீட்டுக் கூற்றுகள் →" }
    },
    {
      id: "io-statements",
      title: "உள்ளீடு / வெளியீட்டுக் கூற்றுகள்",
      content: `**cout (Console Output):** வெளியீட்டைத் திரையில் காட்ட; << (Insertion Operator) பயன்படுத்தப்படும். எடுத்துக்காட்டு: \`cout << "Welcome to C++";\`

**cin (Console Input):** பயனாளரிடமிருந்து உள்ளீட்டைப் பெற; >> (Extraction Operator) பயன்படுத்தப்படும். எடுத்துக்காட்டு: \`cin >> num;\`

**Cascading:** ஒரே வரியில் பல << அல்லது >> ஐ இணைக்கலாம். எடுத்துக்காட்டு: \`cout << "The Area: " << area;\`

**Escape Sequences:** \\n (புதிய வரி), \\t (Tab), \\\\ (Backslash) போன்றவை — சிறப்புப் பொருள் கொண்ட எழுத்துத் தொடர்கள்.`,
      nav: { back: "operators", next: "dev-cpp", nextLabel: "அடுத்து: Dev C++ IDE மற்றும் பிழைகள் →" }
    },
    {
      id: "dev-cpp",
      title: "Dev C++ IDE-உம் பிழை வகைகளும்",
      content: `**Dev C++** ஒரு இலவச, திறந்த மூல C++ Integrated Development Environment (IDE) ஆகும். File → New → Source File மூலம் புதிய .cpp கோப்பை உருவாக்கி, Compile செய்து (F9/F11) இயக்கலாம்.

**பிழை வகைகள் (Types of Errors):**
- **Syntax Error:** மொழி இலக்கண விதிகளை மீறும் பிழை (உ.ம். ; இல்லாமை).
- **Semantic Error:** தர்க்கரீதியாகச் சரியில்லாத பிழை (உ.ம். பொருந்தாத தரவு வகைகளுக்கிடையேயான செயல்பாடு).
- **Run-time Error:** நிரல் இயங்கும்போது நிகழும் பிழை (உ.ம். பூஜ்ஜியத்தால் வகுத்தல்).`,
      nav: { back: "io-statements", next: "data-types", nextLabel: "அடுத்து: தரவு வகைகள் →" }
    },
    {
      id: "data-types",
      title: "தரவு வகைகள் (Data Types)",
      content: `C++-இல் மூன்று வகையான தரவு வகைகள்:

- **அடிப்படைத் தரவு வகைகள் (Fundamental):** int (முழு எண்), float (தசம எண்), char (எழுத்து), double (துல்லியமான தசம எண்), bool (true/false), void.
- **வழிநிரல் தரவு வகைகள் (Derived):** array, pointer, function, reference.
- **பயனாளர் வரையறுத்த தரவு வகைகள் (User-defined):** structure, union, class, enumeration.

**தரவு வகைகளின் நினைவக அளவு (Memory Size)** தொகுப்பாளர் (Compiler — Turbo C++ vs Dev C++) அடிப்படையில் மாறுபடலாம்; \`sizeof()\` செயலி மூலம் நினைவக அளவைக் கண்டறியலாம்.

**Type Conversion:** Implicit (தானாக நடக்கும்) மற்றும் Explicit (Type Casting மூலம் வெளிப்படையாகச் செய்யப்படும்) என இரு வகை.`,
      nav: { back: "dev-cpp", practice: true }
    }
  ]
}
