export default {
  chapterNumber: 14,
  title: "இனக்குழுக்கள் மற்றும் பொருள்கள்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு XI",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro",
      title: "இனக்குழு வரையறை",
      content: `**இனக்குழு (Class)** ஒரு பயனாளர் வரையறுத்த தரவு வகை; தரவு உறுப்புகளையும் (Data Members) செயற்கூறுகளையும் (Member Functions) கொண்டது.

\`\`\`cpp
class class_name
{
  private:
    // data members
  protected:
    // data members
  public:
    // member functions
};
\`\`\`

**அணுகல் மட்ட வகைப்படுத்திகள் (Access Specifiers):**
- **private:** இனக்குழுவுக்குள் மட்டுமே அணுகக்கூடியது (இயல்புநிலை).
- **protected:** இனக்குழுவுக்குள்ளும், அதன் மரபுரிமைப் பெறும் இனக்குழுக்களுக்குள்ளும் அணுகக்கூடியது.
- **public:** வெளியிலிருந்தும் அணுகக்கூடியது.`,
      nav: { next: "member-functions", nextLabel: "அடுத்து: உறுப்புச் செயற்கூறுகள் →" }
    },
    {
      id: "member-functions",
      title: "உறுப்புச் செயற்கூறுகள் (Member Functions)",
      content: `இனக்குழுவின் உறுப்புச் செயற்கூறுகளை இரு வழிகளில் வரையறுக்கலாம்:

**Inline (இனக்குழுவுக்குள்ளேயே வரையறை):**

\`\`\`cpp
class Box {
  public:
    double width;
    void printWidth() {
        cout << "Width: " << width;
    }
};
\`\`\`

**Outline (இனக்குழுவுக்கு வெளியே, Scope Resolution Operator :: பயன்படுத்தி):**

\`\`\`cpp
void Box::printWidth() {
    cout << "Width: " << width;
}
\`\`\`

**பொருள்கள் (Objects):** Global Object (செயற்கூற்றுக்கு வெளியே அறிவிக்கப்பட்டது) மற்றும் Local Object (ஒரு செயற்கூற்றுக்குள் மட்டும் அணுகக்கூடியது) என இரு வகை.`,
      nav: { back: "intro", next: "constructors", nextLabel: "அடுத்து: Constructors →" }
    },
    {
      id: "constructors",
      title: "Constructors",
      content: `**Constructor** என்பது இனக்குழுவின் பெயருடன் அதே பெயர் கொண்ட, ஒரு பொருள் உருவாகும்போது தானாக அழைக்கப்படும் ஒரு சிறப்புச் செயற்கூறு; return type இருக்காது.

**வகைகள்:**
- **Default Constructor:** அளவுருக்கள் இல்லாதது.
- **Parameterized Constructor:** தொடக்க மதிப்புகளை அளவுருக்களாகப் பெறுவது.
- **Copy Constructor:** ஏற்கெனவே உள்ள ஒரு பொருளின் மதிப்புகளை நகலெடுத்து புதிய பொருளை உருவாக்குவது.

\`\`\`cpp
class Data {
  public:
    int x, y;
    Data() { cout << "Non Parameterized constructor"; }
    Data(int a, int b) { x=a; y=b; }
};
\`\`\`

**Destructor:** ~class_name() எனும் பெயருடன், பொருள் அழிக்கப்படும்போது தானாக அழைக்கப்படும் செயற்கூறு; நினைவகத்தை விடுவிக்கப் பயன்படும்.`,
      nav: { back: "member-functions", next: "array-of-objects", nextLabel: "அடுத்து: பொருள்களின் அணி →" }
    },
    {
      id: "array-of-objects",
      title: "பொருள்களின் அணி",
      content: `ஒரே இனக்குழுவைச் சேர்ந்த பல பொருள்களை ஒரு அணியில் சேமிக்கலாம் — **பொருள்களின் அணி (Array of Objects)**.

\`\`\`cpp
class Student {
  public:
    int rollno;
    float avg;
};

int main() {
    Student s[3];
    for(int i=0;i<3;i++) {
        cin >> s[i].rollno >> s[i].avg;
    }
}
\`\`\`

இது பல மாணவர்களின் தரவை ஒரே அணியில், ஒவ்வொருவருக்கும் தனி Object-ஆக சேமிக்க உதவுகிறது.`,
      nav: { back: "constructors", practice: true }
    }
  ]
}
