export default {
  chapterNumber: 9,
  title: "தொகுப்பு தரவினங்கள் (List, Tuples, Set மற்றும் Dictionary)",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-lists",
      title: "List அறிமுகம் & அணுகுதல்",
      content: `**9.1 List அறிமுகம்**

List என்பது [ ] குறியீட்டுக்குள் காற்புள்ளியால் பிரிக்கப்பட்ட உறுப்புகளின் தொகுப்பாகும் — List-ன் உறுப்புகள் மாற்றக்கூடியவை (Mutable).

\`\`\`
Marks = [10, 23, 41, 75]
Fruits = ['Apple', 'Orange', 'Mango', 'Banana']
MyList = []
\`\`\`

பொதுவடிவம்: \`List_Variable = [#0, #1, #2, ...., #n]\`

**9.1.2.1 List உறுப்புகளை அணுகுதல் (Accessing List Elements)**

\`\`\`
Marks = [10, 23, 41, 75]
print(Marks[0])   # 10
\`\`\`

**9.1.2.2 எதிர்நோக்கு அணுகல் (Reverse Indexing)**

\`\`\`
Marks = [10, 23, 41, 75]
i = -1
while i >= -4:
    print(Marks[i])
    i = i - 1
\`\`\`
வெளியீடு: 75, 41, 23, 10

**9.1.3 List-ன் நீளம் (len())**

\`\`\`
MySubjects = ['Tamil', 'English', 'Comp.Science', 'Maths']
print(len(MySubjects))   # 4
\`\`\`

**9.1.4 for/while மூலம் List அணுகல்**

\`\`\`
i = 0
while i < len(MySubjects):
    print(MySubjects[i])
    i = i + 1
\`\`\`
வெளியீடு: Tamil, English, Comp.Science, Maths`,
      nav: { next: "modifying-lists", nextLabel: "அடுத்து: List மாற்றுதல், சேர்த்தல், நீக்குதல் →" }
    },
    {
      id: "modifying-lists",
      title: "List மாற்றுதல், சேர்த்தல் & நீக்குதல்",
      content: `**9.1.5 List உறுப்புகளை மாற்றுதல் (Updating)**

\`\`\`
MyList = [2, 4, 3, 6, 10]
MyList[0] = 4
print(MyList)
\`\`\`
வெளியீடு: [4, 4, 3, 6, 10]

**9.1.6 List-க்கு உறுப்புகளைச் சேர்த்தல்**

- \`List.append(element)\` — ஒரு உறுப்பைச் சேர்க்கும்.
- \`List.extend([elements])\` — பல உறுப்புகளைச் சேர்க்கும்.

\`\`\`
>>> MyList.extend([21, 32, 29])
>>> print(MyList)
[4, 4, 3, 6, 10, 21, 32, 29]
\`\`\`

**9.1.7 List-க்கு உறுப்புகளைச் செருகுதல்**

\`List.insert(position, element)\` — குறிப்பிட்ட இடத்தில் உறுப்பைச் செருகும்.

\`\`\`
>>> MyList.insert(3, 'Karaikkudi')
\`\`\`

**9.1.8 List-லிருந்து உறுப்புகளை நீக்குதல்**

- \`del List[index]\` — குறிப்பிட்ட இடத்தில் உள்ள உறுப்பை நீக்கும்.
- \`del List[start:end]\` — வரம்பிலுள்ள உறுப்புகளை நீக்கும்.
- \`del List\` — முழு List-ஐயும் நீக்கும்.

\`\`\`
>>> MySubjects = ['Tamil', 'Hindi', 'Telugu', 'Maths']
>>> del MySubjects[1]
>>> print(MySubjects)
['Tamil', 'Telugu', 'Maths']
\`\`\`

**9.1.9 remove(), pop(), clear()**

- \`List.remove(element)\` — மதிப்பின் மூலம் நீக்கும்.
- \`List.pop([index])\` — கடைசி (அல்லது குறிப்பிட்ட) உறுப்பை நீக்கி திருப்பித் தரும்.
- \`List.clear()\` — அனைத்து உறுப்புகளையும் நீக்கும்.

\`\`\`
>>> MyList = [12, 89, 34, 'Kannan', 'Gowrisankar', 'Lenin']
>>> MyList.remove(89)
>>> print(MyList)
[12, 34, 'Kannan', 'Gowrisankar', 'Lenin']
>>> print(MyList.pop())
Lenin
>>> MyList.clear()
>>> print(MyList)
[]
\`\`\``,
      nav: { back: "intro-lists", next: "list-range-functions", nextLabel: "அடுத்து: range(), List Comprehension & பிற செயற்கூறுகள் →" }
    },
    {
      id: "list-range-functions",
      title: "range(), List Comprehension & பிற செயற்கூறுகள்",
      content: `**9.1.10 List மற்றும் range() செயற்கூறு**

\`range(start, end, step)\` — start (இயல்பாக 0), end (சேர்க்கப்படாது), step (இயல்பாக 1).

\`\`\`
for x in range(1, 11):
    print(x)
\`\`\`
வெளியீடு: 1 முதல் 10 வரை.

\`\`\`
for x in range(2, 11, 2):
    print(x)
\`\`\`
வெளியீடு: 2 4 6 8 10

**range()-ஐப் பயன்படுத்தி List உருவாக்குதல்:**
\`\`\`
Even_List = list(range(2, 11, 2))
print(Even_List)   # [2, 4, 6, 8, 10]
\`\`\`

**9.2 List கூறு-தேர்வு (List Comprehension)**

\`List = [expression for variable in range]\`

\`\`\`
squares = [x**2 for x in range(1, 11)]
print(squares)
\`\`\`
வெளியீடு: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

**9.1.11 பிற முக்கியமான List செயற்கூறுகள்**

| செயற்கூறு | விளக்கம் |
|---|---|
| copy() | List-ன் நகல் ஒன்றை உருவாக்கும் |
| count(value) | ஒரு மதிப்பு எத்தனை முறை உள்ளது என்று எண்ணும் |
| index(element) | உறுப்பின் இடத்தைத் தரும் |
| reverse() | List-ஐ பின்நோக்கித் திருப்பும் |
| sort() | List-ஐ வரிசைப்படுத்தும் |`,
      nav: { back: "modifying-lists", next: "tuples", nextLabel: "அடுத்து: Tuple →" }
    },
    {
      id: "tuples",
      title: "Tuple",
      content: `**9.2 Tuples அறிமுகம்**

Tuples என்பவை List-ஐப் போலவே ஒரு தொடர்வரிசைப் பொருள், ஆனால் List-க்கு மாறாக **மாற்ற முடியாதவை (Immutable)**.

**9.2.1 Tuples உருவாக்கும் தொடரியல்**

\`\`\`
Empty_Tuple = ()
Tuple_Name = (E1, E2, E3, ..., En)
Tuple_Name = E1, E2, E3, ..., En   # அடைப்புக்குறி இல்லாமலும்
\`\`\`

\`\`\`
>>> MyTup1 = (23, 36, 89, 'A', 'B', 'T', 'TamilP')
>>> print(MyTup1)
(23, 36, 89, 'A', 'B', 'T', 'TamilP')
\`\`\`

**List-லிருந்து Tuple உருவாக்குதல்:** \`tuple(List)\`

\`\`\`
>>> MyTup5 = tuple([23, 45, 90])
>>> print(MyTup5)
(23, 45, 90)
\`\`\`

**முக்கியம் — ஒற்றை உறுப்பு Tuple:** ஒற்றை உறுப்பு Tuple-ல் கண்டிப்பாக காற்புள்ளி (,) இருக்க வேண்டும்.
\`\`\`
>>> MyTup4 = (10)
>>> type(MyTup4)
<class 'int'>         # இது Tuple அல்ல!

>>> MyTup4 = (10,)
>>> type(MyTup4)
<class 'tuple'>       # இப்போது இது Tuple
\`\`\`

**9.2.4 Tuples-ஐப் புதுப்பித்தல் மற்றும் நீக்குதல்**

Tuple-க்குள் ஒரு உறுப்பை மாற்ற முடியாது. இருப்பினும், இரு Tuples-ஐ இணைத்து புதிய Tuple உருவாக்கலாம்:
\`\`\`
Tup1 = (2, 4, 6, 8, 10)
Tup2 = (1, 3, 5, 7, 9)
Tup3 = Tup1 + Tup2
print(Tup3)
\`\`\`
வெளியீடு: (2, 4, 6, 8, 10, 1, 3, 5, 7, 9)

\`del Tuple_name\` — முழு Tuple-ஐயும் நீக்கும் (குறிப்பிட்ட உறுப்பை மட்டும் நீக்க முடியாது).

**9.2.6 Packing & Unpacking**

\`\`\`
a, b, c = (34, 90, 76)
print(a, b, c)   # 34 90 76
\`\`\``,
      nav: { back: "list-range-functions", next: "sets", nextLabel: "அடுத்து: Set →" }
    },
    {
      id: "sets",
      title: "Set",
      content: `**9.3 Set அறிமுகம்**

Set என்பது எந்த குறிப்பிட்ட வரிசையும் இல்லாத, தனித்துவமான (Unique) உறுப்புகளின் தொகுப்பு.

\`\`\`
Set_Variable = {E1, E2, E3, ..., En}
\`\`\`

\`\`\`
>>> S1 = {1, 2, 3, 'A', 'B', 5, 1}
>>> print(S1)
{1, 2, 3, 'A', 'B', 5}   # மீண்டும் வந்த 1 தானாக நீக்கப்பட்டது
\`\`\`

**List/Tuple-ஐ Set-ஆக மாற்றுதல்:** \`set(List)\`
\`\`\`
MyList = [2, 4, 6, 8, 10]
MySet = set(MyList)
print(MySet)   # {2, 4, 6, 8, 10}
\`\`\`

**9.3.3 Set செயற்பாடுகள் (Set Operations)**

**1. ஒன்றிணைப்பு (Union — | அல்லது .union())**
\`\`\`
set_A = {1, 2, 6, 8}
set_B = {'A', 'B', 'C', 'D'}
print(set_A | set_B)
\`\`\`
வெளியீடு: {1, 2, 6, 8, 'A', 'B', 'C', 'D'}

**2. வெட்டு (Intersection — & அல்லது .intersection())**
\`\`\`
set_A = {1, 2, 4, 'D'}
set_B = {'A', 'B', 'C', 'D'}
print(set_A.intersection(set_B))
\`\`\`
வெளியீடு: {'D'}

**3. வேறுபாடு (Difference — − அல்லது .difference())**
\`\`\`
set_A = {'A', '1', 'D'}
set_B = {'A', 'B', 'C', 'D'}
print(set_A.difference(set_B))
\`\`\`
வெளியீடு: {'1'}

**4. சமச்சீரற்ற வேறுபாடு (Symmetric Difference — ^ அல்லது .symmetric_difference())**

இரு Set-களில் ஒன்றில் மட்டும் இருக்கும் உறுப்புகளைத் தரும் (பொதுவான உறுப்புகள் நீக்கப்பட்டு).`,
      nav: { back: "tuples", next: "dictionaries", nextLabel: "அடுத்து: Dictionary →" }
    },
    {
      id: "dictionaries",
      title: "Dictionary",
      content: `**9.4 Dictionary அறிமுகம்**

Dictionary என்பது ஒழுங்கமைக்கப்பட்ட, மாற்றக்கூடிய (Mutable), **திறவுகோல்-மதிப்பு (Key-Value)** இணைகளின் தொகுப்பாகும்.

\`\`\`
Dictionary_Name = { Key_1:Value_1, Key_2:Value_2, ..., Key_n:Value_n }
\`\`\`

**9.4.1 Dictionary உருவாக்குதல்**
\`\`\`
Dict1 = {}
Dict_Stud = {'Regd':1234, 'Name':'Murali', 'Class':'XII', 'Marks':451}
\`\`\`

**9.4.2 Dictionary Comprehension**
\`\`\`
Dict = {expression for variable in sequence [if condition]}
\`\`\`
\`\`\`
Dict = {x:x*2 for x in range(1,11)}
\`\`\`
வெளியீடு: {1:2, 2:4, 3:6, ..., 10:20}

**9.4.3 Dictionary உறுப்புகளை அணுகுதல்**
\`\`\`
MyDict = {'Reg_No':'1221', 'Name':'Tamilselvi', 'School':'CGHSS', 'Address':'Roter St., Chennai 117'}
print('Register Number:', MyDict['Reg_No'])
print('Name of the Student:', MyDict['Name'])
\`\`\`
வெளியீடு: Register Number: 1221, Name of the Student: Tamilselvi

**புதிய மதிப்பைச் சேர்த்தல்:**
\`\`\`
MyDict['Class'] = 'XII-A'
\`\`\`

**Dictionary உறுப்புகளை நீக்குதல்:**
\`\`\`
del Dict['Mark1']   # குறிப்பிட்ட key-value இணையை நீக்கும்
Dict.clear()        # அனைத்து உறுப்புகளையும் நீக்கும்
del Dict            # முழு Dictionary-ஐயும் நீக்கும்
\`\`\``,
      nav: { back: "sets", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- List — [ ] குறியீட்டுக்குள் காற்புள்ளியால் பிரிக்கப்பட்ட, மாற்றக்கூடிய (Mutable) தரவினத் தொகுப்பு.
- Tuple — ( ) குறியீட்டுக்குள், மாற்ற முடியாத (Immutable) தரவினத் தொகுப்பு. ஒற்றை உறுப்பு Tuple-க்கு trailing comma தேவை.
- Set — { } குறியீட்டுக்குள், வரிசையற்ற, தனித்துவமான உறுப்புகளின் தொகுப்பு. Union, Intersection, Difference, Symmetric Difference ஆகிய செயல்பாடுகளைக் கொண்டது.
- Dictionary — { key:value } இணைகளின் தொகுப்பு, Mutable, திறவுகோல் மூலம் அணுகப்படும்.
- range() செயற்குறி வரிசையான எண் தொடரை உருவாக்கும்.
- List Comprehension மற்றும் Dictionary Comprehension ஆகியவை சுருக்கமாக புதிய List/Dictionary உருவாக்க உதவும்.
- append(), extend(), insert(), remove(), pop(), clear() ஆகியவை List-ஐக் கையாள்பவை.`,
      nav: { back: "dictionaries", practice: true }
    },
  ],
}
