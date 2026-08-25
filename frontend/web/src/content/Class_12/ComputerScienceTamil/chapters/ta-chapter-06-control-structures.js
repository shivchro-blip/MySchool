export default {
  chapterNumber: 6,
  title: "கட்டுப்பாட்டு கட்டமைப்புகள்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-sequential",
      title: "அறிமுகம் & வரிசை முறை கூற்றுகள்",
      content: `**6.1 அறிமுகம்**

நிரல் என்பது வரிசையாக இயங்கும் கூற்றுகளின் தொகுப்பாகும். **6.2 கட்டுப்பாட்டு கட்டமைப்புகள் (Control Structures)** என்பவை, நிரலின் இயக்கம் எந்த வரிசையில் நடைபெறும் என்பதைக் கட்டுப்படுத்தும் கூறுகளாகும். Python-ல் மூன்று வகையான கட்டுப்பாட்டு கட்டமைப்புகள் உள்ளன:

1. **வரிசை முறை கூற்றுகள் (Sequential Statements)**
2. **மாற்று அல்லது கிளை கூற்றுகள் (Alternative or Branching Statements)**
3. **மறுநிகழ்வு அல்லது கூறு கூற்றுகள் (Iterative or Looping Statements)**

**6.2.1 வரிசை முறை கூற்றுகள் (Sequential Statements)**

இக்கூற்றுகள் எழுதப்பட்ட வரிசையில் ஒன்றன்பின் ஒன்றாக இயங்கும்.

\`\`\`
print("Hello! This is Shyam")
print("A1, Second Lane, North Car Street, TN")
\`\`\`

வெளியீடு:
\`\`\`
Hello! This is Shyam
A1, Second Lane, North Car Street, TN
\`\`\``,
      nav: { next: "if-statements", nextLabel: "அடுத்து: மாற்று/கிளை கூற்றுகள் →" }
    },
    {
      id: "if-statements",
      title: "மாற்று / கிளை கூற்றுகள் (if, if-else, if-elif-else)",
      content: `**6.2.2 மாற்று அல்லது கிளை கூற்றுகள் (Alternative/Branching Statements)**

**6.2.2.1 Simple if கூற்று**

\`\`\`
if <condition>:
    statements-block1
\`\`\`

எடுத்துக்காட்டு:
\`\`\`
age = int(input("Enter your age: "))
if age >= 18:
    print("You are eligible for voting")
\`\`\`
வெளியீடு:
\`\`\`
Enter your age: 24
You are eligible for voting
\`\`\`

**6.2.2.2 if...else கூற்று**

\`\`\`
if <condition>:
    statements-Block 1
else:
    statements-Block 2
\`\`\`

எடுத்துக்காட்டு:
\`\`\`
n = int(input("Enter any number: "))
if n % 2 == 0:
    print(n, "is an even number")
else:
    print(n, "is an odd number")
\`\`\`
வெளியீடு:
\`\`\`
Enter any number: 56
56 is an even number
\`\`\`

நிபந்தனை/மும்ம சுருக்க வடிவம்: \`variable = variable1 if condition else variable2\`

**6.2.2.3 if...elif...else கூற்று**

\`\`\`
if <condition-1>:
    statements-block-1
elif <condition-2>:
    statements-block-2
...
else:
    statements-block-n
\`\`\`

condition-1 True எனில் statements-block-1 இயங்கும். False எனில், condition-2 சோதிக்கப்படும் — இப்படி வரிசையாக ஒவ்வொரு நிபந்தனையும் சோதிக்கப்படும்.

எடுத்துக்காட்டு (Grade கணக்கீடு):
\`\`\`
avg = int(input("Enter average mark: "))
if avg >= 90 and avg <= 100:
    print("Grade: A")
elif avg >= 80 and avg < 90:
    print("Grade: B")
elif avg >= 70 and avg < 80:
    print("Grade: C")
elif avg >= 60 and avg < 70:
    print("Grade: D")
else:
    print("Grade: E")
\`\`\``,
      nav: { back: "intro-sequential", next: "while-loop", nextLabel: "அடுத்து: while மடக்கு →" }
    },
    {
      id: "while-loop",
      title: "மறுநிகழ்வு கூற்றுகள் — while மடக்கு",
      content: `**6.2.3 மறுநிகழ்வு அல்லது கூறு கூற்றுகள் (Iterative/Looping Statements)**

**6.2.3.1 while கூற்று**

\`\`\`
while <condition>:
    statement block 1
else:
    statement block 2
\`\`\`

while கூற்று, நிபந்தனை True ஆக இருக்கும் வரை தொகுதியை மீண்டும் மீண்டும் இயக்கும்.

எடுத்துக்காட்டு:
\`\`\`
i = 10
while (i <= 14):
    print(i, end=' ')
    i = i + 1
\`\`\`
வெளியீடு: 10 11 12 13 14

else பிரிவுடன்:
\`\`\`
i = 10
while (i <= 14):
    print(i, end=' ')
    i = i + 1
else:
    print("\\nValue of i when the loop exit", i)
\`\`\`
வெளியீடு: 10 11 12 13 14, Value of i when the loop exit 15`,
      nav: { back: "if-statements", next: "for-loop", nextLabel: "அடுத்து: for மடக்கு & நேர்த்தப்பட்ட கூறுகள் →" }
    },
    {
      id: "for-loop",
      title: "for மடக்கு & நேர்த்தப்பட்ட கூறுகள்",
      content: `**6.2.3.2 for கூற்று**

\`\`\`
for iterator_variable in sequence:
    statements-block 1
[else:
    statements-block 2]
\`\`\`

**range() செயற்குறி:** \`range(start, stop, step)\` — start (தொடக்க எண், இயல்பாக 0), stop (எல்லை, இது சேர்க்கப்படாது), step (அடுத்த மதிப்புக்கு தாவும் அளவு, இயல்பாக 1).

எடுத்துக்காட்டு (சரம் மீது மறுநிகழ்வு):
\`\`\`
for i in "Hello World":
    print(i, end=" ")
\`\`\`
வெளியீடு: H e l l o   W o r l d

எடுத்துக்காட்டு (range() step உடன்):
\`\`\`
for i in range(2, 10, 2):
    print(i, end=" ")
\`\`\`
வெளியீடு: 2 4 6 8

எடுத்துக்காட்டு (கூட்டுத்தொகை கணக்கிடல்):
\`\`\`
n = 100
sum = 0
for counter in range(1, n+1):
    sum = sum + counter
print("Sum of 1 until", n, ":", sum)
\`\`\`
வெளியீடு: Sum of 1 until 100 : 5050

**6.2.3.3 நேர்த்தப்பட்ட கூறு கூற்றுகள் (Nested Loops)**

ஒரு கூறின் உள்ளே மற்றொரு கூறை வைக்கலாம் — while-க்குள் for, for-க்குள் while என பலவகையில் நேர்த்தலாம்.

எடுத்துக்காட்டு:
\`\`\`
i = 1
while (i < 4):
    for j in range(1, i):
        print(j, end=" ")
    print(end="\\n")
    i = i + 1
\`\`\`
வெளியீடு:
\`\`\`

1
1 2
\`\`\``,
      nav: { back: "while-loop", next: "jump-statements", nextLabel: "அடுத்து: Jump கூற்றுகள் →" }
    },
    {
      id: "jump-statements",
      title: "Jump கூற்றுகள் — break, continue, pass",
      content: `**6.2.4 மறுநிகழ்வு கூற்றுகளின் Jump கூற்றுகள்**

Python-ல் மூன்று வகையான Jump Statements உள்ளன: **break, continue, pass**.

**6.2.4.1 break கூற்று**

break கூற்று ஒரு கூறின் (loop) இயக்கத்தை உடனடியாக நிறுத்தி, கூறிலிருந்து முழுவதுமாக வெளியேறப் பயன்படும்.

எடுத்துக்காட்டு:
\`\`\`
for word in "Jump Statement":
    if word == 'S':
        break
    print(word, end='')
\`\`\`
வெளியீடு: Jump Sta

**6.2.4.2 continue கூற்று**

continue கூற்று, break-ஐப் போல் இல்லாமல், மீதமுள்ள தொகுதியைத் தவிர்த்துவிட்டு அடுத்த சுற்றுக்கு நேரடியாகச் செல்லும்.

எடுத்துக்காட்டு:
\`\`\`
for word in "Jump Statement":
    if word == 's':
        continue
    print(word, end='')
else:
    print("\\nEnd of the program")
\`\`\`
வெளியீடு: Jump tatement, End of the program

**6.2.4.3 pass கூற்று**

pass ஒரு Null கூற்று ஆகும் — எந்த செயலையும் செய்யாது, வெறும் இட நிரப்பியாக (Placeholder) பயன்படுத்தப்படும், பின்னர் குறியீட்டை நிரப்ப திட்டமிடும்போது பயனுள்ளதாக இருக்கும்.

எடுத்துக்காட்டு:
\`\`\`
for val in "Computer":
    pass
print("End of the loop, the loop structure will be built in future")
\`\`\``,
      nav: { back: "for-loop", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- நிரல் என்பது வரிசையாக இயங்கும் கூற்றுகளின் தொகுப்பு.
- கட்டுப்பாட்டு கட்டமைப்பு, நிரலின் இயக்க வரிசையைக் கட்டுப்படுத்தும் கூறுகளின் தொகுப்பு.
- Simple if, if-else, if-elif-else ஆகியவை மாற்று (Branching) கட்டமைப்புகள்.
- while மற்றும் for கூறுகள் மறுநிகழ்வு (Iterative) கட்டமைப்புகள்.
- range() ஒரு வரிசையான எண் தொடரை வழங்குகிறது.
- for கூறு அணிகள், சரங்கள் போன்ற தொடர்வரிசைப் பொருள்கள் மீது மறுநிகழ்வு செய்யப் பயன்படும்.
- break, continue, pass ஆகிய மூன்று வகையான Jump Statements உள்ளன.
- break கூறிலிருந்து முழுவதுமாக வெளியேறும்; continue அடுத்த சுற்றுக்குச் செல்லும்; pass எந்த செயலும் செய்யாது.`,
      nav: { back: "jump-statements", practice: true }
    },
  ],
}
