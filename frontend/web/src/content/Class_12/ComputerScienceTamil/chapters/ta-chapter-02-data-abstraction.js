export default {
  chapterNumber: 2,
  title: "தரவு அருவமாக்கம்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-adt",
      title: "தரவு அருவமாக்கம் — அறிமுகம்",
      content: `தரவு அருவமாக்கம் (Data Abstraction) என்பது ஒரு தரவினை, அதன் உள்ளக செயல்படுத்தலின் விவரங்களை மறைத்து, அதன் பயன்பாட்டு நடத்தை (behaviour) மட்டும் தெரியும் வகையில் வழங்கும் நுட்பமாகும். இதன் மூலம், ஒரு அருவமாக்கப்பட்ட தரவு வகையை (Abstract Data Type — ADT) பயன்படுத்தும் நிரலாசிரியர், அதன் உள்ளக செயல்படுத்தல் விவரங்களை அறியத் தேவையில்லாமல் அதைப் பயன்படுத்த முடியும்.

**ADT (Abstract Data Type)** என்பது ஒரு தரவு வகையை அதன் நடத்தை (என்ன செய்கிறது) அடிப்படையில் வரையறுப்பது — அதை எவ்வாறு செயல்படுத்துகிறோம் (எப்படி செய்கிறது) என்பதைப் பொருட்படுத்தாமல்.`,
      nav: { next: "constructors-selectors", nextLabel: "அடுத்து: ஆக்கிகள் மற்றும் தெரிவுச்சிகள் →" }
    },
    {
      id: "constructors-selectors",
      title: "ஆக்கிகள் மற்றும் தெரிவுச்சிகள்",
      content: `**2.3 ஆக்கிகள் மற்றும் தெரிவுச்சிகள் (Constructors and Selectors)**

ஆக்கிகள் (Constructors) என்பன புதிய தரவுப் பொருள்களை உருவாக்கும் செயற்கூறுகள்; தெரிவுச்சிகள் (Selectors) என்பன அப்பொருள்களிலிருந்து குறிப்பிட்ட கூறுகளை மீட்டெடுக்கும் செயற்கூறுகள்.

City ஒரு அருவமாக்கப்பட்ட தரவு வகையாக (ADT) கருதுவோம்:

\`\`\`
city = makecity(name, lat, lon)
getname(city)
getlat(city)
getlon(city)
\`\`\`

இங்கு makecity ஒரு ஆக்கி (Constructor) ஆகும் — பெயர், அட்சரேகை (latitude), தீர்க்கரேகை (longitude) ஆகியவற்றை எடுத்து ஒரு city பொருளை உருவாக்குகிறது. getname, getlat, getlon ஆகியவை தெரிவுச்சிகள் (Selectors) — city பொருளிலிருந்து குறிப்பிட்ட மதிப்புகளை மீட்டெடுக்கின்றன.

**எடுத்துக்காட்டு — புள்ளி (Point) ADT:**

\`\`\`
# ஆக்கி
makepoint(x, y):
    return x, y

# தெரிவுச்சிகள்
xcoord(point):
    return point[0]
ycoord(point):
    return point[1]
\`\`\`

ஆக்கியும் தெரிவுச்சிகளும் இணைந்து, ஒரு ADT-ன் அடிப்படை இடைமுகத்தை (Interface) உருவாக்குகின்றன — பயனர் இந்த செயற்கூறுகள் மூலமே தரவைக் கையாள்வார், அதன் உள்ளக செயல்படுத்தல் விவரங்களை அறியத் தேவையில்லை.`,
      nav: { back: "intro-adt", next: "rational-numbers", nextLabel: "அடுத்து: விகிதமுறு எண்கள் மூலம் ADT →" }
    },
    {
      id: "rational-numbers",
      title: "விகிதமுறு எண்களைக் கொண்டு ADT",
      content: `**2.4 விகிதமுறு எண்களைக் கொண்டு அருவமாக்கத் தரவு வகையை உருவாக்குதல்**

விகிதமுறு எண் (Rational Number) என்பது எண் மற்றும் பகுதி (numerator, denominator) ஆகிய இரண்டையும் கொண்ட ஒரு பின்னமாகும். இதை ஒரு ADT-ஆக பின்வருமாறு வரையறுக்கலாம்:

\`\`\`
# ஆக்கி
rational(numer, denom):
    return numer, denom

# தெரிவுச்சிகள்
numer(x):
    return x[0]
denom(x):
    return x[1]
\`\`\`

எடுத்துக்காட்டு: rational(1, 2) என்பது ½ என்ற விகிதமுறு எண்ணைக் குறிக்கும். numer மற்றும் denom தெரிவுச்சிகள் மூலம் தேவைக்கேற்ப தனித்தனியாக எண் மற்றும் பகுதியை மீட்டெடுக்கலாம்.

இந்த வடிவமைப்பு, விகிதமுறு எண்களைக் கூட்டல், கழித்தல் போன்ற செயல்பாடுகளுக்கு பயன்படுத்தும்போது, உள்ளக செயல்படுத்தலை மாற்றியமைத்தாலும் (எ.கா. குறைந்த பின்னமாக்கம் சேர்த்தல்), வெளிப்புற இடைமுகம் மாறாமல் இருக்க உதவுகிறது — இதுவே தரவு அருவமாக்கத்தின் முக்கிய நன்மை.`,
      nav: { back: "constructors-selectors", next: "lists-tuples", nextLabel: "அடுத்து: List மற்றும் Tuple →" }
    },
    {
      id: "lists-tuples",
      title: "List மற்றும் Tuple",
      content: `**2.5 List, Tuples**

Python-இல் தரவு அருவமாக்கம் லிஸ்ட் (List) மற்றும் Tuple ஆகியவற்றின் மூலம் செயல்படுத்தப்படலாம்.

**2.5.1 List**

List என்பது Python-இல் மாற்றக்கூடிய (Mutable) தரவுத் தொகுப்பாகும் — சதுர அடைப்புக்குறிக்குள் [ ] எழுதப்படும், வேறுபட்ட தரவு வகைகளையும் ஒரே List-க்குள் சேமிக்கலாம்.

**2.5.1.1 விகிதமுறு எண்களை List பயன்படுத்தி உருவாக்குதல்**

\`\`\`
lst = [10, 20]   # rational number 10/20
numer(lst): return lst[0]
denom(lst): return lst[1]
\`\`\`

**2.6 கட்டமைப்பு அருவமாக்கம் (Constructor Abstraction)**

List-ஐ மற்றொரு ADT-க்குள் உறுப்பாகவும் கருதலாம் — எடுத்துக்காட்டாக, ஒரு Point-ன் List:

\`\`\`
lst = [Point1, "blue", "green"]
\`\`\`

இதை Tuple பயன்படுத்தியும் உருவாக்கலாம், நிலை/குறியீட்டு அணுகல் ([]) மூலம் அணுகமுடியும்.

**2.5.2 Tuple**

Tuple என்பது மாற்ற முடியாத (Immutable) தரவுத் தொகுப்பு — வட்ட அடைப்புக்குறிக்குள் ( ) எழுதப்படும்.

\`\`\`
colour = ('red', 'blue', 'green')
\`\`\`

எடுத்துக்காட்டு:
\`\`\`
person = ['Padmashri', 'Baskar', '994 222 1234', 'compsc@gmail.com']
\`\`\`

இங்கு ஒவ்வொரு உறுப்பையும் அதன் குறியீட்டு எண் (index) மூலம் அணுகலாம்: person[0] = 'Padmashri'.`,
      nav: { back: "rational-numbers", next: "data-abstraction-structure", nextLabel: "அடுத்து: இனக்குழு மூலம் தரவு அருவமாக்கம் →" }
    },
    {
      id: "data-abstraction-structure",
      title: "இனக்குழு (Class) மூலம் தரவு அருவமாக்கம்",
      content: `List மற்றும் Tuple மூலம் பல்வேறு தரவுகளை ஒன்றாகச் சேமிக்கலாம் என்றாலும், ஒவ்வொரு புலத்தையும் (field) பெயர் மூலம் அணுக **இனக்குழு (Class)** பயன்படுத்துவது இன்னும் தெளிவானது.

**எடுத்துக்காட்டு — Person இனக்குழு:**

\`\`\`
class Person:
    def __init__(self):
        self.firstName = ''
        self.lastName = ''
        self.id = ''
        self.email = ''
\`\`\`

Person என்பது class (multi-part data representation) — ஒரு புதிய தரவு வகையை உருவாக்கும் செயல்பாடு. firstName, lastName, id, email ஆகியவை புதிய தரவு வகைக்குரிய புலங்கள் (fields).

\`\`\`
y1 = Person()
y1.firstName = 'Padmashri'
y1.lastName = 'Baskar'
y1.id = '994 222 1234'
y1.email = 'compsc@gmail.com'

print(y1.firstName)   # வெளியீடு: Padmashri
\`\`\`

இங்கு y1.firstName என்பது புலப் பெயர் மூலம் நேரடியாக மதிப்பை அணுகும் முறையாகும் — இது List/Tuple-ன் index அணுகலை விட தெளிவாகவும் புரிந்துகொள்ளக்கூடியதாகவும் இருக்கிறது.`,
      nav: { back: "lists-tuples", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- தரவு அருவமாக்கம் (Data Abstraction) என்பது ஒரு தரவினை, அதன் உள்ளக செயல்படுத்தல் விவரங்களை மறைத்து, பயன்பாட்டு நடத்தை மட்டும் தெரியும் வகையில் வழங்குவதாகும்.
- ADT (Abstract Data Type) — ஒரு தரவு வகையை அதன் நடத்தை அடிப்படையில் வரையறுப்பது.
- ஆக்கிகள் (Constructors) புதிய தரவுப் பொருள்களை உருவாக்குகின்றன; தெரிவுச்சிகள் (Selectors) அப்பொருள்களிலிருந்து கூறுகளை மீட்டெடுக்கின்றன.
- List — மாற்றக்கூடியது (Mutable), [ ] குறியீட்டில் எழுதப்படும்.
- Tuple — மாற்ற முடியாதது (Immutable), ( ) குறியீட்டில் எழுதப்படும்.
- Class மூலம் புலப் பெயர்களைப் பயன்படுத்தி தரவை இன்னும் தெளிவாக அணுகலாம்.

**மேற்பார்வை நூல்கள்:**
1. Data structure and algorithmic thinking with python — Narasimha Karumanchi.
2. Design and Analysis of Algorithms — S. Sridhar.
3. Data Structures and Algorithms in Python — Goodrich, Tamassia & Goldwasser.
4. https://www.tutorialspoint.com`,
      nav: { back: "data-abstraction-structure", practice: true }
    },
  ],
}
