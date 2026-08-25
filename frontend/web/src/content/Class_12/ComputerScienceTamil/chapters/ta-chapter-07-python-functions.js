export default {
  chapterNumber: 7,
  title: "பைத்தான் செயற்கூறுகள்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-types",
      title: "அறிமுகம் & செயற்கூறு வகைகள்",
      content: `**7.1 அறிமுகம்**

Python-ல் நான்கு வகையான செயற்கூறுகள் உள்ளன:

1. **உள்ளிணைந்த செயற்கூறுகள் (Built-in Functions)** — Python மொழியிலேயே முன்பே வரையறுக்கப்பட்டவை (print(), len() போன்றவை).
2. **பயனர் வரையறுத்த செயற்கூறுகள் (User-defined Functions)** — நிரலாசிரியரால் புதிதாக உருவாக்கப்படுபவை.
3. **தன்னிச்சையான செயற்கூறுகள் (Anonymous/Lambda Functions)** — பெயரில்லாத, ஒற்றை-வரி செயற்கூறுகள்.
4. **மறுநிகழ்வு செயற்கூறுகள் (Recursive Functions)** — தன்னைத்தானே அழைத்துக்கொள்ளும் செயற்கூறுகள்.

**7.2 செயற்கூறு அமைப்பு விளக்கம்**

செயற்கூறு அழைப்பு நடக்கும்போது, வரையறுக்கப்பட்ட செயற்கூறு இயக்கப்பட்டு, return கூற்று மூலம் மதிப்பு திரும்பத் தரப்படும் (return கூற்று இல்லையெனில் None திரும்பும்).

**7.2.1 பயனர் வரையறுத்த செயற்கூறு உருவாக்கம்**

\`\`\`
def function_name(parameter1, parameter2....):
    <Block of Statements>
    return <expression / None>
\`\`\`

**செயற்கூறை அழைத்தல்:**
\`\`\`
function_name(argument1, argument2....)
\`\`\`

எடுத்துக்காட்டு:
\`\`\`
def hello():
    print("hello, Python")
hello()
\`\`\`
வெளியீடு: hello, Python`,
      nav: { next: "defining-calling", nextLabel: "அடுத்து: செயற்கூறு அளபுருக்கள் →" }
    },
    {
      id: "defining-calling",
      title: "செயற்கூறு அளபுருக்கள் & அழைத்தல்",
      content: `**7.4 செயற்கூறு அளபுருக்கள் (Function Parameters)**

\`\`\`
def function_name(parameter(s) separated by comma):
    ...
\`\`\`

**7.5 செயற்கூறு செயலுருபுகள் (Function Arguments)**

Python-ல் நான்கு வகையான செயலுருபுகள் உள்ளன:

1. தேவைப்படும் செயலுருபுகள் (Required Arguments)
2. சாவிச்சொல் செயலுருபுகள் (Keyword Arguments)
3. இயல்பு செயலுருபுகள் (Default Arguments)
4. மாறு நீள செயலுருபுகள் (Variable-length Arguments)

**7.5.1 தேவைப்படும் செயலுருபுகள் (Required Arguments)**

\`\`\`
def printinfo(str):
    print(str)
    return
printinfo("Example - Required arguments")
\`\`\`
வெளியீடு: Example - Required arguments

(printinfo() அளபுரு இல்லாமல் அழைத்தால் TypeError ஏற்படும்.)

**7.5.2 சாவிச்சொல் செயலுருபுகள் (Keyword Arguments)**

\`\`\`
def printdata(name, age):
    print("Name:", name)
    print("Age:", age)
    return
printdata(age=25, name='Ram')
\`\`\`
வெளியீடு: Name: Ram, Age: 25 (அளபுருக்களின் வரிசை மாறினாலும் பெயர் மூலம் சரியாக ஒதுக்கப்படும்.)`,
      nav: { back: "intro-types", next: "parameters-arguments", nextLabel: "அடுத்து: இயல்பு & மாறு நீள செயலுருபுகள் →" }
    },
    {
      id: "parameters-arguments",
      title: "இயல்பு & மாறு நீள செயலுருபுகள்",
      content: `**7.5.3 இயல்பு செயலுருபுகள் (Default Arguments)**

\`\`\`
def printinfo(name, salary=3500):
    print("Name:", name)
    print("Salary:", salary)
    return
printinfo(name='Mani')
\`\`\`
வெளியீடு: Name: Mani, Salary: 3500 (salary குறிப்பிடவில்லை என்பதால் இயல்பு மதிப்பு பயன்படுத்தப்பட்டது.)

\`\`\`
printinfo(name="Ram", salary=2000)
\`\`\`
வெளியீடு: Name: Ram, Salary: 2000 (இயல்பு மதிப்பு புதிய மதிப்பால் மாற்றப்பட்டது.)

**7.5.4 மாறு நீள செயலுருபுகள் (Variable-length Arguments)**

\`\`\`
def function_name(*args):
    function_body
    return_statement
\`\`\`

\`*args\` மூலம் எத்தனை செயலுருபுகள் வேண்டுமானாலும் அனுப்பலாம்.

\`\`\`
def printinfo(*var):
    for i in var:
        print(i)
printinfo(1, 2)
printinfo(10, 20, 30)
\`\`\`
வெளியீடு: 1 2, 10 20 30`,
      nav: { back: "defining-calling", next: "anonymous-return", nextLabel: "அடுத்து: Lambda செயற்கூறுகள் & return →" }
    },
    {
      id: "anonymous-return",
      title: "Lambda செயற்கூறுகள் & return கூற்று",
      content: `**7.6 பெயரிலா செயற்கூறுகள் (Anonymous/Lambda Functions)**

\`\`\`
lambda arguments: expression
\`\`\`

Lambda செயற்கூறுகள் பெயரில்லாத, ஒற்றை-வரிக் கோவையை மட்டும் கொண்ட செயற்கூறுகள்.

எடுத்துக்காட்டு:
\`\`\`
sum = lambda arg1, arg2: arg1 + arg2
print("The Sum is", sum(20, 30))
print("The Sum is", sum(-10, 40))
\`\`\`
வெளியீடு: The Sum is 50, The Sum is 30

**7.7 return கூற்று**

return கூற்று செயற்கூறை உடனடியாக முடித்து, ஒரு மதிப்பை அழைத்த இடத்திற்குத் திருப்பித் தரும். return கூற்று இல்லையெனில் செயற்கூறு None மதிப்பைத் திருப்பித் தரும்.

எடுத்துக்காட்டு:
\`\`\`
def var_abs(a):
    if a < 0:
        return -a
    else:
        return a

a = int(input("Enter a number: "))
print(var_abs(a))
\`\`\`
வெளியீடு: Enter a number: -25, 25`,
      nav: { back: "parameters-arguments", next: "scope", nextLabel: "அடுத்து: மாறிகளின் வரையெல்லை →" }
    },
    {
      id: "scope",
      title: "மாறிகளின் வரையெல்லை",
      content: `**7.8 மாறிகளின் வரையெல்லை (Scope of Variables)**

**7.8.1 உள்ளக வரையெல்லை (Local Scope)**

ஒரு செயற்கூறுக்குள் அறிவிக்கப்பட்ட மாறிகள் அந்த செயற்கூறுக்குள் மட்டுமே அணுகக்கூடியவை — பிற செயற்கூறுகளால் அணுக முடியாது.

\`\`\`
def foo():
    y = 0   # local variable
    print(y)
foo()
\`\`\`

**7.8.2 புறமுறையான வரையெல்லை (Global Scope)**

செயற்கூறுகளுக்கு வெளியே அறிவிக்கப்பட்ட மாறிகள் நிரலின் அனைத்துப் பகுதிகளாலும் அணுகக்கூடியவை.

**7.8.3 global சிறப்புச் சொல்**

ஒரு செயற்கூறுக்குள் இருந்து, புறமுறை மாறியை மாற்றியமைக்க \`global\` சிறப்புச் சொல் பயன்படுத்தப்படுகிறது.

\`\`\`
c = 1   # global variable

def add():
    global c
    c = c + 2   # increment c by 2
    print(c)

add()
\`\`\`
வெளியீடு: 3 (global மூலம் புறமுறை c-ன் மதிப்பு மாற்றப்பட்டது)`,
      nav: { back: "anonymous-return", next: "builtin-math-functions", nextLabel: "அடுத்து: உள்ளிணைந்த & கணித செயற்கூறுகள் →" }
    },
    {
      id: "builtin-math-functions",
      title: "உள்ளிணைந்த & கணித செயற்கூறுகள்",
      content: `**7.9 உள்ளிணைந்த மற்றும் கணித செயற்கூறுகள்**

| செயற்கூறு | விளக்கம் | எடுத்துக்காட்டு |
|---|---|---|
| abs(x) | முழுமதிப்பு | abs(-25.1230) → 25.123 |
| ceil(x) | மேல் நோக்கி முழுமைப்படுத்தும் (import math தேவை) | math.ceil(26.7) → 27 |
| floor(x) | கீழ் நோக்கி முழுமைப்படுத்தும் (import math தேவை) | math.floor(26.7) → 26 |
| chr(x) | ASCII எண்ணிற்குரிய எழுத்து | chr(97) → 'a' |
| hex(x) | பதினாறு அடிப்படை மாற்றம் | hex(97) → '0x61' |
| type(x) | தரவு வகையைத் தரும் | type(15.2) → <class 'float'> |
| id(x) | பொருளின் நினைவக முகவரி | id(x) |
| min(list) | பட்டியலின் மிகச்சிறிய மதிப்பு | min([21,76,98,23]) → 21 |
| max(list) | பட்டியலின் மிகப்பெரிய மதிப்பு | max([21,76,98,23]) → 98 |
| sum(list) | பட்டியலின் கூட்டுத்தொகை | sum([21,76,98,23]) → 218 |
| round(number, ndigits) | குறிப்பிட்ட தசம இடங்களுக்கு முழுமைப்படுத்தும் | round(17.9) → 18 |
| pow(a,b) | a-ன் b-வது அடுக்கு | pow(5,2) → 25 |

**7.9.2 அமைப்பு (Composition)**

ஒரு செயற்கூறின் வெளியீட்டை மற்றொரு செயற்கூறின் உள்ளீடாகப் பயன்படுத்துவது 'அமைப்பு' (Composition) எனப்படும்.

\`\`\`
>>> x = sqrt(x)
\`\`\`
வெளியீடு: 5.477225575051661`,
      nav: { back: "scope", next: "recursion", nextLabel: "அடுத்து: மறுநிகழ்வு செயற்கூறுகள் →" }
    },
    {
      id: "recursion",
      title: "மறுநிகழ்வு செயற்கூறுகள் (Recursion)",
      content: `**7.10 மறுநிகழ்வு செயற்கூறுகள் (Recursive Functions)**

ஒரு செயற்கூறு தன்னைத்தானே அழைத்துக்கொள்வதற்கு மறுநிகழ்வு (Recursion) எனப்படும்.

**Factorial (n!) எடுத்துக்காட்டு:**

\`\`\`
def fact(n):
    if n == 0:
        return 1
    else:
        return n * fact(n-1)

print(fact(6))
\`\`\`
வெளியீடு: 720

இங்கு fact(6) என்பது 6 * fact(5), fact(5) என்பது 5 * fact(4), இப்படித் தொடர்ந்து n=0 வரை மறுநிகழ்வு நடைபெறும் — n=0 ஆனதும் base case 1 என்ற மதிப்பைத் திரும்பத் தந்து, மீளாக்கம் முடிவடையும்.

மறுநிகழ்வு செயற்கூறுகளில் இரு முக்கியக் கூறுகள் இருக்க வேண்டும்:
1. **Base Case:** மறுநிகழ்வை நிறுத்தும் நிலைமை (இங்கு n==0).
2. **Recursive Case:** செயற்கூறு தன்னைத்தானே சிறிய உள்ளீட்டுடன் அழைத்துக்கொள்ளும் பகுதி.`,
      nav: { back: "builtin-math-functions", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- செயற்கூறு என்பது ஒரு குறிப்பிட்ட செயலைச் செய்யவும், தேவைக்கேற்ப மீண்டும் மீண்டும் அழைக்கவும் பயன்படுகிறது.
- பயனர் வரையறுத்த, உள்ளிணைந்த, Lambda (Anonymous) மற்றும் மறுநிகழ்வு செயற்கூறுகள் என நான்கு வகைகள் உள்ளன.
- செயலுருபுகள் நான்கு வகைப்படும்: தேவைப்படும், சாவிச்சொல், இயல்பு, மாறு நீள.
- return கூற்று மதிப்பைத் திரும்பத் தரும்; இல்லையெனில் None திரும்பும்.
- உள்ளக வரையெல்லை மற்றும் புறமுறை வரையெல்லை மாறிகளின் அணுகலை வரையறுக்கும். global சிறப்புச் சொல் புறமுறை மாறியை செயற்கூறுக்குள் மாற்ற உதவும்.
- ஒரு செயற்கூறு தன்னைத்தானே அழைத்துக்கொள்வதை மறுநிகழ்வு செயற்கூறு (Recursive Function) என அழைக்கின்றனர்.`,
      nav: { back: "recursion", practice: true }
    },
  ],
}
