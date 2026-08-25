export default {
  chapterNumber: 5,
  title: "பைத்தான் அறிமுகம் – மாறிகள் மற்றும் செயற்குறிகள்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-python",
      title: "பைத்தான் அறிமுகம்",
      content: `**5.1 அறிமுகம்**

Python ஒரு உயர்நிலை, பொதுப்பயன் நிரலாக்க மொழியாகும் — Guido van Rossum என்பவரால் உருவாக்கப்பட்டது. இது இன்று உலகின் மிகவும் பிரபலமான நிரலாக்க மொழிகளில் ஒன்றாகும்.

**5.2 பைத்தானின் சிறப்பியல்புகள்**

- **பொது நோக்க மொழி:** வலை மேம்பாடு, தரவு அறிவியல், செயற்கை நுண்ணறிவு உள்ளிட்ட பல்வேறு துறைகளில் பயன்படுத்தப்படுகிறது.
- **இலவசமும் திறந்த மூலமும்:** யாரும் இலவசமாகப் பயன்படுத்தலாம், மாற்றியமைக்கலாம்.
- **எளிய தொடரியல் (Syntax):** எளிதாகக் கற்கக்கூடிய, படிக்கக்கூடிய குறியீட்டு அமைப்பு.
- **இயக்கக் கருவி மொழி (Interpreted Language):** குறியீட்டை வரிக்கு வரி இயக்கும்.
- **பல தளங்களில் இயங்கும் (Portable):** Windows, Linux, macOS ஆகிய அனைத்திலும் இயங்கும்.`,
      nav: { next: "programming-modes", nextLabel: "அடுத்து: நிரலாக்க முறைகள் →" }
    },
    {
      id: "programming-modes",
      title: "IDLE — கூட்டறை & ஸ்கிரிப்ட் முறைகள்",
      content: `**5.3 பைத்தான் நிரலாக்க முறைகள்**

**5.3.1 IDLE (Integrated Development Learning Environment)**

IDLE பைத்தானுடன் இணைந்து வரும் ஒரு ஒருங்கிணைந்த மேம்பாட்டு சூழல் (Integrated Development Environment) ஆகும்.

**5.3.1.1 IDLE-க்குள் நுழைதல்:** Start → All Programs → Python 3.x → IDLE (Python 3.x)

**5.3.1.2 கூட்டறைப் பயன்முறை (Interactive Mode)**

\`>>>\` எனும் குறியீடு (prompt) தோன்றி, ஒரு நேரத்தில் ஒரு கூற்றை உள்ளிட்டு, உடனடியாக விடையைப் பெறலாம்.

\`\`\`
>>> 15 + 13
28
>>> 5 * 10 * 50
2500
\`\`\`

\`\`\`
>>> print("Python Programming Language")
Python Programming Language
>>> x = 10
>>> x = x + 2
>>> print(x)
12
>>> print("The Sum", x)
The Sum 12
\`\`\`

**5.3.2 ஸ்கிரிப்ட் பயன்முறை (Script Mode)**

**5.3.2.1 ஸ்கிரிப்ட் எழுதுதல்:** File → New File (Ctrl+N) மூலம் புதிய Untitled Editor திறக்கப்படும்.

\`\`\`
a = 100
b = 350
c = a - b
print("The Name", c)
\`\`\`

**5.3.2.2 ஸ்கிரிப்ட் சேமித்தல்:** File → Save As (Ctrl+S) — .py நீட்சிப் பெயருடன் சேமிக்கப்படும்.

**5.3.2.3 ஸ்கிரிப்ட் இயக்குதல்:** Run → Run Module (F5) மூலம் ஸ்கிரிப்ட் இயக்கப்படும், விடை Shell சாளரத்தில் காண்பிக்கப்படும்.`,
      nav: { back: "intro-python", next: "io-functions", nextLabel: "அடுத்து: உள்ளீடு/வெளியீடு செயற்குறிகள் →" }
    },
    {
      id: "io-functions",
      title: "உள்ளீடு மற்றும் வெளியீடு செயற்குறிகள்",
      content: `**5.4 உள்ளீடு மற்றும் வெளியீடு செயற்குறிகள்**

**5.4.1 print() செயற்குறி**

\`\`\`
print("string to be displayed as output.")
print(variable)
print("String to be displayed as output", variable)
print("String1", variable1, "String2", variable2, ...)
\`\`\`

எடுத்துக்காட்டு:
\`\`\`
>>> print("Welcome to Python Programming!")
Welcome to Python Programming!
>>> x = 5
>>> y = 6
>>> a = x + y
>>> print(a)
11
>>> print("The sum is", a)
The sum is 11
>>> print("The sum of", x, "and", y, "is", a)
The sum of 5 and 6 is 11
\`\`\`

print() செயற்குறிக்குக் கொடுக்கப்பட்ட ஒவ்வொரு அளபுருவும் இயல்பாக ஒற்றை வெற்றிடத்தால் (space) பிரிக்கப்பட்டு காண்பிக்கப்படும்.

**5.4.2 input() செயற்குறி**

\`\`\`
Variable = input("prompt string")
\`\`\`

input() செயற்குறி விசைப்பலகையிலிருந்து உள்ளீட்டைப் பெறப் பயன்படுகிறது. இது எப்போதும் ஒரு சரம் (String) தரவு வகை மதிப்பையே திருப்பித் தரும்.

எடுத்துக்காட்டு 1:
\`\`\`
>>> city = input("Enter Your City: ")
Enter Your City: Madurai
>>> print("I am from", city)
I am from Madurai
\`\`\`

எடுத்துக்காட்டு 2 (எண் உள்ளீடு — int() மாற்றம் தேவை):
\`\`\`
x = int(input("Enter Number 1: "))
y = int(input("Enter Number 2: "))
print("The sum =", x + y)
\`\`\`
வெளியீடு:
\`\`\`
Enter Number 1: 34
Enter Number 2: 90
The sum = 124
\`\`\``,
      nav: { back: "programming-modes", next: "comments-tokens", nextLabel: "அடுத்து: குறிப்புரைகள் & விவரக்குறிகள் →" }
    },
    {
      id: "comments-tokens",
      title: "குறிப்புரைகள், உள்தள்ளல் & விவரக்குறிகள்",
      content: `**5.5 குறிப்புரைகள் (Comments)**

\`# இது ஒரு வரிக் குறிப்புரை\` — # குறியீட்டுக்குப் பிறகு உள்ளது யாவும் புறக்கணிக்கப்படும்.

\`\`\`
'''
இது பலவரிக் குறிப்புரை
'''
\`\`\`

**5.6 உள்தள்ளல் (Indentation)**

பைத்தானில், வெற்றிடங்கள் (Spaces) மற்றும் தத்தல் (Tabs) கொண்டு நிரலின் தொகுதிகள் (blocks) பிரிக்கப்படுகின்றன — இது பிற மொழிகளின் {} அடைப்புக்குறிகளுக்குப் பதிலாகப் பயன்படுகிறது.

**5.7 விவரக்குறிகள் (Tokens)**

நிரலின் மிகச்சிறிய கூறுகள் (Lexical Components) Tokens எனப்படும். ஐந்து வகை Tokens உள்ளன:

1. அடையாளங்கள் (Identifiers)
2. சாவிச்சொற்கள் (Keywords)
3. செயற்குறிகள் (Operators)
4. வரம்புக்குறிகள் (Delimiters)
5. நிலைத்தரங்கள் (Literals)

**5.7.1 அடையாளங்கள் (Identifiers)**

மாறிகள், செயற்கூறுகள், வகுப்புகள் (Class) அல்லது பிற பொருள்களை அடையாளம் காணப் பயன்படும் பெயர்கள்.

விதிகள்:
- எழுத்துக்களால் (A-Z அல்லது a-z) அல்லது அடிக்கோட்டால் (_) தொடங்க வேண்டும்.
- எண்களை (0-9) சேர்க்கலாம், ஆனால் தொடக்கத்தில் அல்ல.
- Case-sensitive — Sum மற்றும் sum வேறுபட்டவை.
- எந்த நீளமும் இருக்கலாம்.
- Python keyword-ஐ அடையாளமாகப் பயன்படுத்த முடியாது.

சரியான எடுத்துக்காட்டுகள்: Sum, total, marks, regno, name1
தவறான எடுத்துக்காட்டுகள்: 12Name, sum#3, total-marks, continue (இது keyword)

**5.7.2 சாவிச்சொற்கள் (Keywords)**

Python மொழியால் ஏற்கனவே ஒதுக்கப்பட்ட, சிறப்பு அர்த்தம் கொண்ட சொற்கள் — இவற்றை மாறி/செயற்கூறு பெயராகப் பயன்படுத்த முடியாது.

எடுத்துக்காட்டுகள் (35 keywords): False, None, True, and, as, assert, break, class, continue, def, del, elif, else, except, finally, for, from, global, if, import, in, is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield`,
      nav: { back: "io-functions", next: "operators", nextLabel: "அடுத்து: செயற்குறிகள் →" }
    },
    {
      id: "operators",
      title: "செயற்குறிகள் (Operators)",
      content: `**5.7.3 செயற்குறிகள் (Operators)**

**5.7.3.1 கணித செயற்குறிகள் (Arithmetic Operators)**

a = 100, b = 90 எனில்:

| செயற்குறி | எடுத்துக்காட்டு | விடை |
|---|---|---|
| + (கூட்டல்) | a+b | 190 |
| − (கழித்தல்) | a−b | 10 |
| * (பெருக்கல்) | a*b | 9000 |
| / (வகுத்தல்) | a/b | 1.11 |
| % (மீதி) | a%b | 10 |
| ** (அடுக்கு) | a**2 | 10000 |
| // (முழு எண் வகுத்தல்) | a//b | 1 |

**5.7.3.2 ஒப்பீட்டு செயற்குறிகள் (Relational Operators)**

==, !=, >, <, >=, <= — இவை True அல்லது False மதிப்பைத் தரும்.

\`\`\`
a = 100, b = 90
a == b  → False
a != b  → True
a > b   → True
a < b   → False
a >= b  → True
a <= b  → False
\`\`\`

**5.7.3.3 தருக்க செயற்குறிகள் (Logical Operators)**

or, and, not — நிபந்தனைகளை இணைக்கப் பயன்படும்.

**5.7.3.4 மதிப்பீட்டுச் செயற்குறிகள் (Assignment Operators)**

=, +=, −=, *=, /=, %=, **=, //= — மதிப்பை மாறிக்கு ஒதுக்கவும், அதே நேரத்தில் கணிதச் செயலையும் செய்யவும் பயன்படும்.

**5.7.3.5 நிபந்தனை செயற்குறி (Conditional/Ternary Expression)**

\`\`\`
Variable_Name = [on_true] if [Test_expression] else [on_false]
\`\`\`

எடுத்துக்காட்டு:
\`\`\`
min = a if a < b else b
\`\`\``,
      nav: { back: "comments-tokens", next: "delimiters-literals", nextLabel: "அடுத்து: வரம்புக்குறிகள் & நிலைத்தரங்கள் →" }
    },
    {
      id: "delimiters-literals",
      title: "வரம்புக்குறிகள் & நிலைத்தரங்கள்",
      content: `**5.7.4 வரம்புக்குறிகள் (Delimiters)**

பைத்தான், சொற்றொடர்களை, பட்டியல்களை, செயற்குறித் தொகுதிகளை பிரிக்கப் பயன்படுத்தும் குறியீடுகள்: ( ) [ ] { } , : . ' = ; += −= *= /= //= %= **=

**5.7.5 நிலைத்தரங்கள் (Literals)**

**5.7.5.1 எண் நிலைத்தரங்கள் (Numeric Literals):** Integer, Float, Complex
\`\`\`
Integer Literal: 10, 100, 200
Float Literal: 15.20, 3.14
Complex Literal: 3.14j
\`\`\`

**5.7.5.2 சர நிலைத்தரங்கள் (String Literals):** ஒற்றை மேற்கோள் (' '), இரட்டை மேற்கோள் (" "), முப்படை மேற்கோள் (''' ''') மூலம் எழுதப்படும்.
\`\`\`
strings = "This is Python"
char = 'C'
multiline_str = '''This is a multiline string with more than one line code.'''
\`\`\`

**5.7.5.3 முன்னிலை நிலைத்தரங்கள் (Boolean Literals):** True, False

**5.7.5.4 விடுபடு தொடர் (Escape Sequences):** \\n (புதிய வரி), \\t (தத்தல்) போன்றவை.
\`\`\`
print("It's raining")
\`\`\`

**5.8 கையாளும் தரவு வகைகள் (Data Types)**

**5.8.1 எண் தரவு வகை (Number):** int (Decimal, Octal, Hexadecimal, Long), float (123.34), complex

**5.8.2 முன்னிலை தரவு வகை (Boolean):** True/False

**5.8.3 சர தரவு வகை (String):**
\`\`\`
Char_data = 'A'
String_data = "Computer Science"
Multiline_data = """String data can be enclosed with single quote or double quote or triple quote."""
\`\`\``,
      nav: { back: "operators", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- Python, Guido van Rossum என்பவரால் உருவாக்கப்பட்ட ஒரு பொதுப்பயன் நிரலாக்க மொழி.
- Python, கூட்டறை முறை (Interactive Mode) மற்றும் ஸ்கிரிப்ட் முறை (Script Mode) என்று இரு வழிகளில் செயல்படுத்தப்படும்.
- Python-ல் வெற்றிடம் (உள்தள்ளல்) கொண்டு நிரலின் தொகுதிகள் பிரிக்கப்படுகின்றன.
- Tokens, வெற்றிடத்தால் பிரிக்கப்படும் நிரலின் மிகச்சிறிய கூறுகள்.
- print() மற்றும் input() ஆகியவை வெளியீடு மற்றும் உள்ளீட்டுக்கான அடிப்படைச் செயற்குறிகள்.
- Python-ன் ஒவ்வொரு தரவு வகையும் அடிப்படை மொழித் தொகுதிகளாகப் பிரிக்கப்படும், அவை நிலைத்தரங்கள் (Literals) எனப்படும்.
- சிறப்புச் சொற்கள் (Keywords) மூலம் Python வரிமொழி நிரலின் அமைப்பை அறிந்துகொள்ளும்.`,
      nav: { back: "delimiters-literals", practice: true }
    },
  ],
}
