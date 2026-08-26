export default {
  chapterNumber: 10,
  title: "பைத்தான் இனக்குழுக்கள் மற்றும் பொருள்கள்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-defining-classes",
      title: "அறிமுகம் & இனக்குழு வரையறை",
      content: `**10.1 அறிமுகம்**

Python ஒரு பொருள் நோக்கு நிரலாக்க மொழி (Object Oriented Programming Language — OOPL) ஆகும் — இனக்குழு (Class) மற்றும் பொருள் (Object) கருத்துருக்களைக் கொண்டு அமைந்தது. C++, Java போன்ற மொழிகளைப் போலவே Python-லும் இதே கருத்துக்கள் பயன்படுத்தப்படுகின்றன.

**10.2 இனக்குழுவை வரையறுத்தல்**

\`\`\`
class class_name:
    statement_1
    statement_2
    ....
\`\`\`

**10.2.1 இனக்குழு வரையறை நிரல்**

\`\`\`
class Sample:
    x, y = 10, 20   # class variables
\`\`\`

**10.3 பொருள்களை உருவாக்குதல் (Creating Objects)**

\`\`\`
Object_name = class_name()
\`\`\`

**10.4 இனக்குழு உறுப்புகளை அணுகுதல்**

\`\`\`
Object_name.class_member
\`\`\``,
      nav: { next: "creating-accessing-objects", nextLabel: "அடுத்து: பொருள்களை உருவாக்குதல் & அணுகுதல் →" }
    },
    {
      id: "creating-accessing-objects",
      title: "பொருள்களை உருவாக்குதல் & அணுகுதல்",
      content: `**10.5 இனக்குழு முறைகள் (Class Methods)**

இனக்குழுவிற்குள் வரையறுக்கப்படும் செயற்கூறு **'முறை' (Method)** எனப்படும். \`self\` என்பது ஒவ்வொரு Method-ன் முதல் அளபுருவாகவும் இருக்க வேண்டும் — அது தற்போதைய பொருளைக் (current object) குறிக்கும்.

**எடுத்துக்காட்டு (Student Class):**

\`\`\`
class Student:
    def process(self):
        mark1, mark2, mark3 = 69, 71, 74
        sum = mark1 + mark2 + mark3
        avg = sum / 3
        print("Total Marks =", sum)
        print("Average Marks =", avg)

S = Student()
S.process()
\`\`\`
வெளியீடு: Total Marks = 214, Average Marks = 71.33...

**10.5.1 Odd/Even சரிபார்க்கும் Method எடுத்துக்காட்டு:**

\`\`\`
class Odd_Even:
    def check(self, num):
        if num % 2 == 0:
            print(num, "is Even number")
        else:
            print(num, "is Odd number")

x = Odd_Even()
x1 = int(input("Enter a value: "))
x.check(x1)
\`\`\``,
      nav: { back: "intro-defining-classes", next: "class-methods", nextLabel: "அடுத்து: வடிவாக்கிகள் & அழிப்பான்கள் →" }
    },
    {
      id: "class-methods",
      title: "வடிவாக்கிகள் (Constructor) & அழிப்பான்கள் (Destructor)",
      content: `**10.6 வடிவாக்கிகள் மற்றும் அழிப்பான்கள் (Constructors and Destructors)**

**வடிவாக்கி (Constructor):** \`__init__()\` முறை — ஒரு பொருள் உருவாக்கப்படும்போது தானாகவே அழைக்கப்படும்.

\`\`\`
class Sample:
    def __init__(self, var):
        print("Constructor of class Sample...")
        self.num = var
        print("The value is:", var)

S = Sample(10)
\`\`\`
வெளியீடு: Constructor of class Sample..., The value is: 10

**பொருள்களை எண்ணும் எடுத்துக்காட்டு:**

\`\`\`
class Sample:
    num = 0
    def __init__(self, var):
        Sample.num = Sample.num + 1
        self.var = var
        print("The object value is:", self.var)
        print("The count of object created:", Sample.num)

S1 = Sample(15)
S2 = Sample(25)
S3 = Sample(45)
\`\`\`
வெளியீடு: object 1-க்கு count=1, object 2-க்கு count=2, object 3-க்கு count=3.`,
      nav: { back: "creating-accessing-objects", next: "constructor-destructor", nextLabel: "அடுத்து: __del__() அழிப்பான் →" }
    },
    {
      id: "constructor-destructor",
      title: "__del__() அழிப்பான் (Destructor)",
      content: `**10.6.1 __del__() அழிப்பான்**

**அழிப்பான் (Destructor):** \`__del__()\` முறை — ஒரு பொருள் அழிக்கப்படும்போது (del கூற்று மூலமோ, திட்ட முடிவிலோ) தானாகவே அழைக்கப்படும்.

\`\`\`
class Sample:
    num = 0
    def __init__(self, var):
        Sample.num = Sample.num + 1
        self.var = var
        print("The object value is:", self.var)
        print("The count of object created:", Sample.num)
    def __del__(self):
        Sample.num = Sample.num - 1
        print("The value 'The object with value %d is exit from the scope'" % (self.var))

S1 = Sample(15)
S2 = Sample(25)
S3 = Sample(45)
del S1, S2, S3
\`\`\`

del கூற்று ஒவ்வொரு பொருளுக்கும் \`__del__()\` முறையை தானியங்கியாக அழைத்து, count-ஐ ஒவ்வொரு முறையும் குறைக்கும்.`,
      nav: { back: "class-methods", next: "public-private", nextLabel: "அடுத்து: Public & Private உறுப்பினர்கள் →" }
    },
    {
      id: "public-private",
      title: "Public & Private உறுப்பினர்கள்",
      content: `**10.7 Public மற்றும் Private அறிமுகம்**

Python-ல் \`self.attribute\` மூலம் வரையறுக்கப்படும் மாறிகள் இயல்பாக **public** ஆகும் — இனக்குழுவுக்கு வெளியேயும் நேரடியாக அணுகக்கூடியவை. ஒரு உறுப்பினரை **private** ஆக்க, பெயருக்கு முன் இரட்டை அடிக்கோடு (\`__\`) இடப்படும்.

\`\`\`
class Sample:
    x1 = 1
    __x2 = 14
    def display(self):
        print("Class variable x1 =", self.x1)
        print("Class variable x2 =", self.__x2)

S = Sample()
print("Value 1 =", S.x1)      # சரியாக வேலை செய்யும்
print("Value 2 =", S.__x2)    # பிழை!
\`\`\`

வெளியீடு:
\`\`\`
Value 1 = 1
Traceback (most recent call last):
AttributeError: 'Sample' object has no attribute '__x2'
\`\`\`

**10.8 முழுமையான எடுத்துக்காட்டு — Circle Class**

\`\`\`
class Circle:
    pi = 3.14
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return (self.radius ** 2) * Circle.pi
    def circumference(self):
        return 2 * self.radius * Circle.pi

C = Circle(radius=5)
print("Circle Radius", C.radius)
print("The Area of Circle:", C.area())
print("The Circumference of Circle:", C.circumference())
\`\`\`
வெளியீடு: Circle Radius 5, The Area of Circle: 78.5, The Circumference of Circle: 31.4`,
      nav: { back: "constructor-destructor", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- Python ஒரு பொருள் நோக்கு நிரலாக்க மொழி — Class மற்றும் Object கருத்துருக்களைக் கொண்டது.
- class class_name: மூலம் இனக்குழு வரையறுக்கப்படும்; Object_name = class_name() மூலம் பொருள் உருவாக்கப்படும்.
- இனக்குழுவிற்குள் வரையறுக்கப்படும் செயற்கூறு 'முறை' (Method) எனப்படும்; self முதல் அளபுருவாக இருக்க வேண்டும்.
- __init__() வடிவாக்கி (Constructor) — பொருள் உருவாக்கப்படும்போது தானாகவே அழைக்கப்படும்.
- __del__() அழிப்பான் (Destructor) — பொருள் அழிக்கப்படும்போது தானாகவே அழைக்கப்படும்.
- self.attribute இயல்பாக public; பெயருக்கு முன் __ (இரட்டை அடிக்கோடு) இட்டால் private ஆகும்.`,
      nav: { back: "public-private", practice: true }
    },
  ],
}
