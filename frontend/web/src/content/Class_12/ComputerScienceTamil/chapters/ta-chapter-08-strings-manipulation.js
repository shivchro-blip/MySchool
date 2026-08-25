export default {
  chapterNumber: 8,
  title: "சரங்கள் மற்றும் சரங்களைக் கையாளுதல்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-creating",
      title: "அறிமுகம் & சரம் உருவாக்குதல்",
      content: `**8.1 அறிமுகம்**

Python-ல் தொடர்ச்சியான எழுத்துக்களின் தொகுப்பு **சரம் (String)** என அழைக்கப்படுகிறது.

**8.2 சரம் உருவாக்குதல் (Creating Strings)**

\`\`\`
str1 = 'Welcome to learning Python'
str2 = "Welcome to learning Python"
str3 = '''Welcome to learning Python'''
\`\`\`

**முக்கியம்: Python-ல் சரங்கள் மாற்ற முடியாதவை (Immutable)** — ஒரு சரத்தை உருவாக்கியப் பிறகு, அதன் உள்ளடக்கத்தை நேரடியாக மாற்ற முடியாது.

\`\`\`
>>> str1 = "Strings"
>>> str1[0] = 'P'
TypeError: 'str' object does not support item assignment
\`\`\`

புதிய மதிப்பை வேண்டுமெனில், ஒரு புதிய சரமே உருவாக்க வேண்டும் — பழைய சரத்தை மாற்ற முடியாது.`,
      nav: { next: "accessing-modifying", nextLabel: "அடுத்து: துணைச்சரங்களை அணுகுதல் →" }
    },
    {
      id: "accessing-modifying",
      title: "துணைச்சரங்களை அணுகுதல் & மாற்றுதல்",
      content: `**8.3 சரத்தில் உள்ள துணைச்சரங்களை அணுகுதல்**

ஒவ்வொரு எழுத்துக்கும் ஒரு குறியீட்டு எண் (Index) உள்ளது — நேர்நோக்கிய குறியீடு 0-லிருந்தும், எதிர்நோக்கிய குறியீடு -1-லிருந்தும் தொடங்கும்.

எடுத்துக்காட்டு (நேர்நோக்கிய குறியீடு):
\`\`\`
str1 = input('Enter a string: ')
index = 0
for i in str1:
    print("Subscript[", index, "]: ", i)
    index += 1
\`\`\`
வெளியீடு: Subscript[0]: w, Subscript[1]: e, Subscript[2]: l...

எடுத்துக்காட்டு (எதிர்நோக்கிய குறியீடு):
\`\`\`
str1 = input('Enter a string: ')
index = -1
while abs(index) <= len(str1):
    print("Subscript[", index, "]: ", str1[index])
    index += -1
\`\`\`

**8.4 சரம் திருத்துதல் (Modifying Strings)**

சரங்கள் மாற்ற முடியாதவை என்பதால், ஒரு எழுத்தை நேரடியாக மாற்ற முடியாது; ஒரு புதிய சரத்தையே மறு-ஒதுக்கீடு (Re-assign) செய்ய வேண்டும்.

\`\`\`
>>> x1 = 'How are you'
>>> x1[0] = 'I'
TypeError: 'str' object does not support item assignment

>>> x1 = 'How about you'   # புதிய சரம் ஒதுக்கீடு
>>> print(x1)
How about you
\`\`\`

**replace() செயற்கூறு:** ஒரு எழுத்து/சொல்லை மற்றொன்றால் மாற்றி, ஒரு புதிய சரத்தை உருவாக்கும் — மூல சரம் மாறாது.

\`\`\`
>>> x1 = 'How are you'
>>> print(x1.replace('are', 'were'))
How were you
\`\`\`

**del கூற்று:** ஒரு சரம் மாறியை முழுவதுமாக நீக்கும் (ஒரு எழுத்தை மட்டும் நீக்க முடியாது).
\`\`\`
>>> del str1
>>> print(str1)
NameError: name 'str1' is not defined
\`\`\``,
      nav: { back: "intro-creating", next: "string-operators", nextLabel: "அடுத்து: சர செயற்குறிகள் & Slicing →" }
    },
    {
      id: "string-operators",
      title: "சர செயற்குறிகள் & Slicing",
      content: `**8.6 சர செயற்குறிகள் (String Operators)**

**8.6.1 இணைத்தல் (Concatenation +)**
\`\`\`
'welcome' + 'Python'   # 'welcomePython'
\`\`\`

**8.6.2 சேர்த்தல் (Append +=)**
\`\`\`
str1 = 'welcome'
str1 += 'Python'   # 'welcomePython'
\`\`\`

**8.6.3 மறுபடி (Repeating *)**
\`\`\`
str1 = 'Welcome'
print(str1 * 4)
\`\`\`
வெளியீடு: WelcomeWelcomeWelcomeWelcome

**8.5 சரத்தை துண்டு-பிரித்தல் (Slicing)**

\`str1[start:end:step]\` — start தொடக்க இடம், end இறுதி இடம் (சேர்க்கப்படாது), step படிமுறை அளவு.

\`\`\`
str1 = 'THEKKURAI'
print(str1[0])        # T
print(str1[0:5])      # THEKK
print(str1[0:8:3])    # TKR
print(str1[3:])       # KKURAI
print(str1[::-1])     # IARUKKEHT (reversed)
\`\`\`

**8.6 துன்றல் (Stride) — எதிர்மறை படிமுறை**

\`\`\`
str1 = 'Welcome to learn Python'
print(str1[10:18:1])    # 'learn'
print(str1[18:10:-1])   # 'nrael' (பின்நோக்கி)
\`\`\``,
      nav: { back: "accessing-modifying", next: "formatting", nextLabel: "அடுத்து: சர வடிவூட்டம் →" }
    },
    {
      id: "formatting",
      title: "சர வடிவூட்டச் செயற்குறிகள் & format()",
      content: `**8.7 சரவடிவூட்டச் செயற்குறிகள் (String Formatting Operators)**

\`\`\`
"String to be displayed with %s1 and %s2" % (val1, val2)
\`\`\`

எடுத்துக்காட்டு:
\`\`\`
name = 'Rajarajan'
mark = 98
print("Name: %s and Marks: %d" % (name, mark))
\`\`\`
வெளியீடு: Name: Rajarajan and Marks: 98

**8.8 வடிவமைப்பு குறியீடுகள் (Format Specifiers)**

| குறியீடு | விளக்கம் |
|---|---|
| %c | எழுத்து |
| %d | முழு எண் (decimal) |
| %s | சரம் |
| %u | குறியில்லா decimal |
| %o | octal எண் |
| %x/%X | hex எண் |
| %e/%E | அறிவியல் குறியீடு |
| %f | தசம எண் |

**8.9 விடுபடு தொடர் (Escape Sequences)**

\\n (புதிய வரி), \\t (தத்தல்), \\\\ (backslash), \\' (ஒற்றை மேற்கோள்), \\" (இரட்டை மேற்கோள்).

\`\`\`
print("They said, \\"What's there?\\"")
\`\`\`
வெளியீடு: They said, "What's there?"

**8.10 format() செயற்குறி**

\`\`\`
num1 = 34
num2 = 34
print("The sum of {} and {} is {}".format(num1, num2, num1+num2))
\`\`\`
வெளியீடு: The sum of 34 and 34 is 68`,
      nav: { back: "string-operators", next: "builtin-functions", nextLabel: "அடுத்து: உள்ளிணைந்த சரச் செயற்கூறுகள் →" }
    },
    {
      id: "builtin-functions",
      title: "உள்ளிணைந்த சரச் செயற்கூறுகள்",
      content: `**8.11 உள்ளிணைந்த சரச் செயற்கூறுகள் (Built-in String Functions)**

| செயற்கூறு | விளக்கம் | எடுத்துக்காட்டு |
|---|---|---|
| len(str) | சரத்தின் நீளம் | len('AI Corporation') → 14 |
| capitalize() | முதல் எழுத்தை பெரிதாக்கும் | 'chennai'.capitalize() → 'Chennai' |
| center(width, fillchar) | நடுவில் சீரமைக்கும் | 'welcome'.center(15,'*') → '****welcome****' |
| find(sub) | துணைச்சரத்தின் இடத்தைக் கண்டுபிடிக்கும் | 'India'.find('n') → 1 |
| isalnum() | எழுத்து+எண் மட்டும் உள்ளதா எனச் சரிபார்க்கும் | 'Save Earth'.isalnum() → False |
| isalpha() | எழுத்துக்கள் மட்டும் உள்ளதா எனச் சரிபார்க்கும் | 'India'.isalpha() → True |
| isdigit() | எண்கள் மட்டும் உள்ளதா எனச் சரிபார்க்கும் | '12345'.isdigit() → True |
| lower() | சிற்றெழுத்தாக்கும் | 'INDIA'.lower() → 'india' |
| upper() | பேரெழுத்தாக்கும் | 'india'.upper() → 'INDIA' |
| title() | ஒவ்வொரு சொல்லின் முதலெழுத்தையும் பெரிதாக்கும் | 'tamil nadu'.title() → 'Tamil Nadu' |
| swapcase() | பெரிய/சிறிய எழுத்துக்களை மாற்றும் | 'Tamil Nadu'.swapcase() → 'tAMIL nADU' |
| count(str) | சரம்/எழுத்து எத்தனை முறை உள்ளது என எண்ணும் | 'chennai'.count('n') → 2 |
| ord(char) | எழுத்தின் ASCII எண்ணைத் தரும் | ord('A') → 65 |
| chr(ASCII) | ASCII எண்ணிற்குரிய எழுத்தைத் தரும் | chr(87) → 'W' |

இந்த செயற்கூறுகள் அனைத்தும் சர.செயற்கூறு() (str.function()) என்ற வடிவில் அழைக்கப்படுகின்றன.`,
      nav: { back: "formatting", next: "example-programs", nextLabel: "அடுத்து: முழுமையான எடுத்துக்காட்டுகள் →" }
    },
    {
      id: "example-programs",
      title: "முழுமையான எடுத்துக்காட்டு நிரல்கள்",
      content: `**சரங்களைப் பயன்படுத்தும் எடுத்துக்காட்டு நிரல்கள்**

**1. ஒரு சரத்தில் உள்ள ஒவ்வொரு எழுத்தையும் அச்சிடுதல்:**
\`\`\`
str1 = 'COMPUTER'
index = 0
for i in str1:
    print(str1[0:index+1])
    index += 1
\`\`\`
வெளியீடு: C, CO, COM, COMP, COMPU, COMPUT, COMPUTE, COMPUTER

**2. ஒரு சரத்தை பின்நோக்கி அச்சிடுதல்:**
\`\`\`
str1 = 'Welcome to learn Python'
print(str1[::-1])
\`\`\`
வெளியீடு: nohtyP nrael ot emocleW

**3. பெயரும் மதிப்பெண்ணும் வடிவமைத்து அச்சிடுதல்:**
\`\`\`
name = 'Rajarajan'
mark = 98
print("Name: %s and Marks: %d" % (name, mark))
\`\`\`
வெளியீடு: Name: Rajarajan and Marks: 98`,
      nav: { back: "builtin-functions", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- சரம் (String) என்பது Python-ல் தொடர்ச்சியான எழுத்துக்களின் தொகுப்பு.
- Python-ல் சரங்கள் மாற்ற முடியாதவை (Immutable) — உருவாக்கியப் பிறகு மாற்ற முடியாது, புதிய சரமாக மறு-ஒதுக்கீடு செய்ய வேண்டும்.
- நேர்நோக்கிய குறியீடு 0-லிருந்தும், எதிர்நோக்கிய குறியீடு -1-லிருந்தும் தொடங்கும்.
- Slicing (str[start:end:step]) மூலம் சரத்தின் துணைப்பகுதிகளை எடுக்கலாம்.
- +, +=, * ஆகியவை சர செயற்குறிகள் — இணைத்தல், சேர்த்தல், மறுபடி செய்தல்.
- format() மற்றும் % ஆகியவை சர வடிவூட்டத்திற்குப் பயன்படும்.
- len(), capitalize(), find(), upper(), lower(), count() போன்றவை உள்ளிணைந்த சரச் செயற்கூறுகள்.`,
      nav: { back: "example-programs", practice: true }
    },
  ],
}
