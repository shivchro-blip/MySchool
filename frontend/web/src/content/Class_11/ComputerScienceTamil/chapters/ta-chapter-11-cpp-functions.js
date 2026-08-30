export default {
  chapterNumber: 11,
  title: "C++ - ன் செயற்கூறுகள்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு XI",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro",
      title: "செயற்கூறுகள் — அறிமுகம்",
      content: `**செயற்கூறு (Function)** என்பது ஒரு குறிப்பிட்ட பணியைச் செய்யும், பெயரிடப்பட்ட நிரல் தொகுதி ஆகும். C++ இரு வகைச் செயற்கூறுகளை வழங்குகிறது:

- **உள்ளமைந்த செயற்கூறுகள் (Built-in / Library Functions):** ஏற்கெனவே வரையறுக்கப்பட்டவை (உ.ம். sqrt(), pow()).
- **பயனாளர் வரையறுத்த செயற்கூறுகள் (User-defined Functions):** நிரலாளரால் உருவாக்கப்படுபவை.

**கணிதச் செயற்கூறுகள் (Math Functions — &lt;cmath&gt;):**

\`\`\`cpp
#include <iostream>
#include <cmath>
using namespace std;
int main()
{
    double x = 625;
    cout << "sqrt(" << x << ") = " << sqrt(x);
    return 0;
}
\`\`\`

sqrt() (வர்க்க மூலம்), pow(base,exp) (அடுக்கு), abs() (Absolute Value) ஆகியவை பொதுவான கணிதச் செயற்கூறுகள்.`,
      nav: { next: "string-functions", nextLabel: "அடுத்து: string செயற்கூறுகள் →" }
    },
    {
      id: "string-functions",
      title: "சரம் (String) செயற்கூறுகள்",
      content: `**&lt;cstring&gt;** தலைப்புக் கோப்பில் பல உள்ளமைந்த சரம் செயற்கூறுகள் உள்ளன:

| செயற்கூறு | பயன் |
|---|---|
| strcpy(target, source) | source-ஐ target-க்கு நகலெடுக்கும் |
| strcat(str1, str2) | str2-ஐ str1-இன் இறுதியில் இணைக்கும் |
| strcmp(str1, str2) | இரு சரங்களையும் ஒப்பிடும் (0 = சமம்) |
| strlen(str) | சரத்தின் நீளத்தைத் தரும் |
| toupper(ch) / tolower(ch) | ஒரு எழுத்தை பெரிய/சிறிய எழுத்தாக மாற்றும் |

\`\`\`cpp
#include <iostream>
#include <cstring>
using namespace std;
int main()
{
    char source[] = "Computer Science";
    char target[20] = "";
    strcpy(target, source);
    cout << "String in Target Copied :" << target;
    return 0;
}
\`\`\``,
      nav: { back: "intro", next: "user-defined", nextLabel: "அடுத்து: பயனாளர் வரையறுத்த செயற்கூறுகள் →" }
    },
    {
      id: "user-defined",
      title: "பயனாளர் வரையறுத்த செயற்கூறுகள்",
      content: `**செயற்கூறு வரையறை (Function Definition):**

\`\`\`cpp
return_type function_name(parameter list)
{
    // function body
    return expression;
}
\`\`\`

**செயற்கூறு முன்னறிவிப்பு (Function Prototype):** செயற்கூறு அழைக்கப்படுவதற்கு முன்பே அதன் வகை, பெயர், அளவுருக்கள் பற்றி தொகுப்பாளருக்குத் தெரிவிக்கும் கூற்று.

**இயல்புநிலை அளவுருக்கள் (Default Arguments):** அழைக்கும்போது ஒரு அளவுரு தரப்படவில்லையெனில், முன் வரையறுக்கப்பட்ட இயல்புநிலை மதிப்பு பயன்படுத்தப்படும்.

\`\`\`cpp
void display(int a, float c = 5.0);
\`\`\``,
      nav: { back: "string-functions", next: "parameter-passing", nextLabel: "அடுத்து: அளவுருக்கள் அனுப்புதல் →" }
    },
    {
      id: "parameter-passing",
      title: "அளவுருக்கள் அனுப்பும் முறைகள்",
      content: `செயற்கூற்றை அழைக்கும்போது மதிப்புகளை அனுப்பும் இரு முறைகள்:

**Call by Value:** மாறியின் மதிப்பு மட்டும் நகலெடுக்கப்பட்டு அனுப்பப்படும்; செயற்கூற்றுக்குள் மாற்றங்கள் அசல் மாறியைப் பாதிக்காது.

**Call by Reference:** மாறியின் நினைவக முகவரி அனுப்பப்படும் (& குறியீடு பயன்படுத்தி); செயற்கூற்றுக்குள் செய்யப்படும் மாற்றங்கள் அசல் மாறியையும் பாதிக்கும்.

\`\`\`cpp
void swap(int &a, int &b)
{
    int t = a;
    a = b;
    b = t;
}
\`\`\`

**Actual Parameters:** செயற்கூற்றை அழைக்கும்போது கொடுக்கப்படும் மதிப்புகள். **Formal Parameters:** செயற்கூறு வரையறையில் உள்ள அளவுருக்கள்.`,
      nav: { back: "user-defined", next: "return-recursive", nextLabel: "அடுத்து: Return வகைகள் / தற்சுழற்சி →" }
    },
    {
      id: "return-recursive",
      title: "Return வகைகளும் தற்சுழற்சிச் செயற்கூறும்",
      content: `செயற்கூறு ஒரு மதிப்பைத் திருப்பி அனுப்ப **return** கூற்று பயன்படுகிறது. return_type-ஐப் பொருத்து int, float, char, double, void (எதையும் திருப்பாதது) என வெவ்வேறு வகைகள் இருக்கலாம்.

\`\`\`cpp
int add(int a, int b)
{
    return a + b;
}
\`\`\`

**தற்சுழற்சிச் செயற்கூறு (Recursive Function):** ஒரு செயற்கூறு தன்னைத்தானே அழைத்துக்கொள்வது.

\`\`\`cpp
int factorial(int n)
{
    if (n <= 1) return 1;
    else return n * factorial(n-1);
}
\`\`\``,
      nav: { back: "parameter-passing", next: "scope-storage", nextLabel: "அடுத்து: மாறிகளின் எல்லையும் Storage Class-உம் →" }
    },
    {
      id: "scope-storage",
      title: "மாறிகளின் எல்லையும் (Scope) Storage Class-உம்",
      content: `**Local Variable:** ஒரு செயற்கூற்றுக்குள் மட்டும் வரையறுக்கப்பட்டு, அதற்குள் மட்டும் அணுகக்கூடிய மாறி.

**Global Variable:** நிரல் முழுவதும் அணுகக்கூடிய மாறி; அனைத்துச் செயற்கூறுகளுக்கும் வெளியே வரையறுக்கப்படும்.

\`\`\`cpp
int x = 10;  // Global Variable x
void local() {
    int x = 5;  // Local Variable x
    cout << "Value of local x is " << x;
}
\`\`\`

**Storage Classes:** ஒரு மாறியின் வாழ்நாள் (Lifetime) மற்றும் எல்லையை (Scope) தீர்மானிக்கும் — auto, static, extern, register.`,
      nav: { back: "return-recursive", practice: true }
    }
  ]
}
