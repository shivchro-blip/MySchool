export default {
  chapterNumber: 12,
  title: "அணிகள் மற்றும் கட்டுருக்கள்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு XI",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "array-intro",
      title: "அணிகள் — அறிமுகம் (1D Array)",
      content: `**அணி (Array)** என்பது ஒரே தரவு வகையைச் சேர்ந்த பல மதிப்புகளை, தொடர்ச்சியான நினைவக இடங்களில் சேமிக்கும் ஒரு தரவு அமைப்பு (Data Structure) ஆகும்.

**ஒரு பரிமாண அணி (1D Array) அறிவிப்பு:**

\`\`\`cpp
int num[5];   // 5 முழு எண்களைச் சேமிக்கக்கூடிய அணி
int num[5] = {10,20,30,40,50};   // தொடக்க மதிப்புகளுடன்
\`\`\`

அணியின் ஒவ்வொரு உறுப்பையும் அதன் **இண்டெக்ஸ் (Index — 0-இலிருந்து தொடங்கும்)** மூலம் அணுகலாம் (உ.ம். num[0], num[1]...).

**Traverse:** அணியின் ஒவ்வொரு உறுப்பையும் ஒரு loop மூலம் வரிசையாக அணுகுவது.

\`\`\`cpp
for (int i=0; i<5; i++)
    cout << num[i] << " ";
\`\`\``,
      nav: { next: "array-ops", nextLabel: "அடுத்து: அணிச் செயல்பாடுகள் →" }
    },
    {
      id: "array-ops",
      title: "அணிச் செயல்பாடுகள் (Insertion, Search)",
      content: `**புகுத்தல் (Insertion):** ஒரு புதிய மதிப்பை அணியில் ஒரு குறிப்பிட்ட இடத்தில் செருகுதல்; அதற்குப் பின்னுள்ள உறுப்புகளை ஒரு இடம் நகர்த்த வேண்டியிருக்கும்.

**நேரியல் தேடல் (Linear Search):** அணியின் ஒவ்வொரு உறுப்பையும் தொடர்ச்சியாகச் சோதித்து, தேடும் மதிப்பைக் கண்டறியும் எளிய தேடல் முறை.

\`\`\`cpp
for (int i=0; i<n; i++)
{
    if (arr[i] == val)
    {
        cout << "Value found at position " << i;
        break;
    }
}
\`\`\``,
      nav: { back: "array-intro", next: "array-2d", nextLabel: "அடுத்து: இரு பரிமாண அணிகள் →" }
    },
    {
      id: "array-2d",
      title: "இரு பரிமாண அணிகள் (2D Array)",
      content: `**இரு பரிமாண அணி (2D Array)** வரிசைகளும் (Rows) நெடுவரிசைகளும் (Columns) கொண்ட, அணிகளுக்குள் அணிகளாக அமைந்த தரவு அமைப்பு — அணிகளின் அணி (Array of Arrays) என்றும் அழைக்கப்படும்.

\`\`\`cpp
int matrix[3][3];
matrix[0][0]=10; matrix[0][1]=20; matrix[0][2]=30;
\`\`\`

**வரிசை வரிசையான வரிசை (Row Major Order):** ஒரு வரிசையின் அனைத்து உறுப்புகளும் தொடர்ச்சியாக நினைவகத்தில் சேமிக்கப்படும் முறை. **நெடுவரிசை வரிசையான வரிசை (Column Major Order):** ஒரு நெடுவரிசையின் அனைத்து உறுப்புகளும் தொடர்ச்சியாக சேமிக்கப்படும் முறை.

இரு பரிமாண அணிகள் அணிமட்டு அணிக் கணக்கீடுகளுக்கும் (Matrix Addition), அட்டவணைத் தரவுகளுக்கும் பயன்படுகின்றன.`,
      nav: { back: "array-ops", next: "char-arrays", nextLabel: "அடுத்து: எழுத்து அணிகள் (Strings) →" }
    },
    {
      id: "char-arrays",
      title: "எழுத்து அணிகள் — சரங்கள் (Strings)",
      content: `C++-இல் ஒரு **சரம் (String)** என்பது எழுத்துகளின் ஒரு அணி (Array of Characters), இறுதியில் **NULL ('\\\\0')** எழுத்தால் முடிவடையும்.

\`\`\`cpp
char str[10] = "India";
\`\`\`

**Palindrome சோதனை:** ஒரு சொல் அல்லது தொடர் முன்னும் பின்னும் ஒரே மாதிரி இருக்கிறதா எனச் சரிபார்க்க எழுத்து அணிகள் பயன்படுத்தப்படுகின்றன — எடுத்துக்காட்டு: "madam".`,
      nav: { back: "array-2d", next: "structures", nextLabel: "அடுத்து: கட்டுருக்கள் (Structures) →" }
    },
    {
      id: "structures",
      title: "கட்டுருக்கள் (Structures)",
      content: `**கட்டுரு (Structure)** என்பது வெவ்வேறு தரவு வகைகளைச் சேர்ந்த பல உறுப்புகளை (Members) ஒரே பெயரின் கீழ் ஒருங்கிணைக்கும் ஒரு பயனாளர் வரையறுத்த தரவு வகை ஆகும்.

\`\`\`cpp
struct Student
{
    long rollno;
    int age;
    float weight;
};
\`\`\`

**கட்டுரு மாறி அறிவிப்பும் அணுகலும்:**

\`\`\`cpp
struct Student s1;
s1.rollno = 101;
s1.age = 16;
cout << s1.rollno;
\`\`\`

புள்ளி (.) குறியீடு மூலம் கட்டுருவின் உறுப்புகளை அணுகலாம்.`,
      nav: { back: "char-arrays", next: "structures-advanced", nextLabel: "அடுத்து: கட்டுருக்களின் அணி →" }
    },
    {
      id: "structures-advanced",
      title: "கட்டுருக்களின் அணியும் கூடு கட்டுருக்களும்",
      content: `**கட்டுருக்களின் அணி (Array of Structures):** ஒரே கட்டுரு வகையைச் சேர்ந்த பல மதிப்புகளைச் சேமிக்க.

\`\`\`cpp
struct Student s[50];
s[0].rollno = 101;
s[1].rollno = 102;
\`\`\`

**கூடு கட்டுரு (Nested Structure):** ஒரு கட்டுருவின் உறுப்பு இன்னொரு கட்டுரு வகையாக இருப்பது.

\`\`\`cpp
struct Date { int day, month, year; };
struct Student {
    long rollno;
    Date dob;   // Nested Structure
};
\`\`\`

இதன் மூலம் ஒரு மாணவரின் பிறந்த தேதியை s1.dob.day, s1.dob.month எனக் குறிப்பிடலாம்.`,
      nav: { back: "structures", practice: true }
    }
  ]
}
