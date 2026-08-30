export default {
  chapterNumber: 16,
  title: "மரபுரிமம்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு XI",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro",
      title: "மரபுரிமம் — அறிமுகம்",
      content: `**மரபுரிமம் (Inheritance)** என்பது ஒரு புதிய இனக்குழு (Derived Class), ஏற்கெனவே உள்ள ஒரு இனக்குழுவின் (Base Class) பண்புகளையும் செயல்பாடுகளையும் பெறும் OOP நுட்பம் ஆகும். இது குறியீட்டு மறு பயன்பாட்டை (Reusability) அதிகரிக்கிறது.

\`\`\`cpp
class Base {
  public:
    int x;
};
class Derived : public Base {
  public:
    int y;
};
\`\`\`

**மரபுரிமத்தின் வகைகள்:**
- **Single Inheritance:** ஒரு Base Class-இலிருந்து ஒரு Derived Class.
- **Multiple Inheritance:** பல Base Class-களிலிருந்து ஒரு Derived Class.
- **Multilevel Inheritance:** A→B→C எனத் தொடர் அடுக்குகளாக மரபுரிமை.
- **Hierarchical Inheritance:** ஒரு Base Class-இலிருந்து பல Derived Class-கள்.
- **Hybrid Inheritance:** மேற்கண்ட வகைகளின் கலவை.`,
      nav: { next: "types", nextLabel: "அடுத்து: மரபுரிமத்தின் விரிவான வகைகள் →" }
    },
    {
      id: "types",
      title: "மரபுரிமத்தின் விரிவான வகைகள்",
      content: `**Single Inheritance:**

\`\`\`cpp
class A { };
class B : public A { };
\`\`\`

**Multilevel Inheritance:**

\`\`\`cpp
class A { };
class B : public A { };
class C : public B { };
\`\`\`

**Multiple Inheritance:**

\`\`\`cpp
class A { };
class B { };
class C : public A, public B { };
\`\`\`

**Hierarchical Inheritance:** ஒரு Base Class A-விலிருந்து B, C, D எனப் பல Derived Class-கள் உருவாகும்.`,
      nav: { back: "intro", next: "visibility-modes", nextLabel: "அடுத்து: பார்வைத்தன்மை முறைகள் →" }
    },
    {
      id: "visibility-modes",
      title: "மரபுரிமப் பார்வைத்தன்மை முறைகள்",
      content: `Derived Class Base Class-இன் உறுப்புகளை எவ்வாறு பெறும் என்பதை **மரபுரிமப் பார்வைத்தன்மை (Visibility Mode)** தீர்மானிக்கிறது:

| Base Class உறுப்பு | Private மரபுரிமை | Protected மரபுரிமை | Public மரபுரிமை |
|---|---|---|---|
| private | அணுக முடியாது | அணுக முடியாது | அணுக முடியாது |
| protected | private ஆகிறது | protected ஆகிறது | protected ஆகிறது |
| public | private ஆகிறது | protected ஆகிறது | public ஆகிறது |

\`\`\`cpp
class Derived : public Base { };     // public inheritance
class Derived : protected Base { };  // protected inheritance
class Derived : private Base { };    // private inheritance
\`\`\``,
      nav: { back: "types", next: "constructors-overriding", nextLabel: "அடுத்து: Constructors / Function Overriding →" }
    },
    {
      id: "constructors-overriding",
      title: "மரபுரிமத்தில் Constructors-உம் Function Overriding-உம்",
      content: `ஒரு Derived Class பொருள் உருவாகும்போது, முதலில் **Base Class-இன் Constructor**, பின்னர் **Derived Class-இன் Constructor** அழைக்கப்படும்.

\`\`\`cpp
class base {
  public:
    base() { cout << "Constructor of base class"; }
};
class derived : public base {
  public:
    derived() { cout << "Constructor of derived class"; }
};
\`\`\`

**Function Overriding:** Base Class-இல் உள்ள ஒரு செயற்கூற்றை, Derived Class-இல் அதே பெயர், அதே அளவுருக்களுடன் மீண்டும் வரையறுத்து, புதிய செயல்பாட்டைத் தருவது.

\`\`\`cpp
class base {
  public:
    void display() { cout << "Base class"; }
};
class derived : public base {
  public:
    void display() { cout << "Derived class"; } // Overriding
};
\`\`\``,
      nav: { back: "visibility-modes", practice: true }
    }
  ]
}
