export default {
  chapterNumber: 10,
  title: "Python Classes and Objects",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-defining-classes",
      title: "Introduction & Defining Classes",
      content: `**10.1 Introduction**

Python is an Object Oriented Programming language. **Classes** and **Objects** are the key features of OOP. Theoretical concepts of classes and objects are similar to C++, but creation and implementation is much simpler in Python.

Class is the main building block in Python. An **object** is a collection of data and functions that act on that data. A **class** is a template for the object. Objects are also called **instances** of a class. In Python, everything is an object — every integer variable is an object of class int, every string variable is an object of class string.

**10.2 Defining Classes**

A class is defined using the keyword **class**, followed by a unique name and a colon (:).

Syntax:
\`\`\`
class class_name:
    statement_1
    statement_2
    ...
    statement_n
\`\`\`
A statement in a class definition may be a variable declaration, decision control, loop, or function definition. Variables defined inside a class are called **Class Variables**; functions are called **Methods**. Class variables and methods together are the **members** of the class — accessed through objects (instances) of the class. A class can be defined anywhere in a Python program.

Example:
\`\`\`
class Sample:
    x, y = 10, 20   # class variables
\`\`\`
To access the values defined inside a class, you need an object (instance) of the class.`,
      nav: { next: "creating-accessing-objects", nextLabel: "Next: Creating Objects & Accessing Members →" }
    },
    {
      id: "creating-accessing-objects",
      title: "Creating Objects & Accessing Class Members",
      content: `**10.3 Creating Objects**

Once a class is created, an object (instance) of that class must be created — this process is called **Class Instantiation**.

Syntax:
\`\`\`
Object_name = class_name()
\`\`\`
Note: class instantiation uses function notation — class_name followed by ().

**10.4 Accessing Class Members**

Any class member (variable or method) is accessed using the object with a **dot (.) operator**.

Syntax:
\`\`\`
Object_name.class_member
\`\`\`
Example:
\`\`\`
class Sample:
    x, y = 10, 20   # class variables

S = Sample()        # class instantiation
print("Value of x = ", S.x)
print("Value of y = ", S.y)
print("Value of x and y = ", S.x + S.y)
\`\`\`
Output:
\`\`\`
Value of x = 10
Value of y = 20
Value of x and y = 30
\`\`\`
Here, Sample's class variables x and y are accessed via the object S using dot notation.`,
      nav: { back: "intro-defining-classes", next: "class-methods", nextLabel: "Next: Class Methods →" }
    },
    {
      id: "class-methods",
      title: "Class Methods",
      content: `**10.5 Class Methods**

A Python class method is very similar to an ordinary function, with one key difference — the method's FIRST parameter must be named **self**. You do NOT need to pass a value for self when calling the method — Python provides it automatically. Even a method that takes no other arguments must still be defined with self as its first parameter. If a method is defined to accept only one additional parameter, it will actually take TWO arguments: self, and the defined parameter.

When accessing a class variable WITHIN the class, the class name and dot operator should prefix it.

**Note:**
- Statements inside a class must be properly indented.
- Parameters are the variables in the function definition; arguments are the values passed to it.

Example — total and average marks using a class:
\`\`\`
class Student:
    mark1, mark2, mark3 = 45, 91, 71   # class variable

    def process(self):                 # class method
        sum = Student.mark1 + Student.mark2 + Student.mark3
        avg = sum/3
        print("Total Marks = ", sum)
        print("Average Marks = ", avg)
        return

S = Student()
S.process()
\`\`\`
Output:
\`\`\`
Total Marks = 207
Average Marks = 69.0
\`\`\`

Example — checking odd/even using a class:
\`\`\`
class Odd_Even:
    def check(self, num):
        if num%2==0:
            print(num, " is Even number")
        else:
            print(num, " is Odd number")

n = Odd_Even()
x = int(input("Enter a value: "))
n.check(x)
\`\`\`
When executed, Python accepts the user's value and passes it to the check() method through the object n.`,
      nav: { back: "creating-accessing-objects", next: "constructor-destructor", nextLabel: "Next: Constructor & Destructor →" }
    },
    {
      id: "constructor-destructor",
      title: "Constructor and Destructor in Python",
      content: `**10.6 Constructor and Destructor in Python**

A **Constructor** is a special function automatically executed when an object of a class is created. In Python, the special function **\\_\\_init\\_\\_** acts as the constructor — it must begin and end with double underscores. It works like an ordinary function, except it executes automatically upon object creation. It can be defined with or without arguments, and is used to **initialize class variables**.

General format:
\`\`\`
def __init__(self, [args...]):
    <statements>
\`\`\`
Example:
\`\`\`
class Sample:
    def __init__(self, num):
        print("Constructor of class Sample...")
        self.num = num          # instance variable
        print("The value is :", num)

S = Sample(10)
\`\`\`
Output:
\`\`\`
Constructor of class Sample...
The value is : 10
\`\`\`
The constructor executes automatically when object S is created with argument 10.

**Note:** **Instance variables** are variables whose value varies from object to object — every object gets its own separate copy. Instance variables are declared inside a method using the **self** keyword (commonly inside the constructor).

**Example — class variable to count number of objects created:**
\`\`\`
class Sample:
    num = 0                     # class variable
    def __init__(self, var):
        Sample.num += 1
        self.var = var          # instance variable
        print("The object value is = ", self.var)
        print("The count of object created = ", Sample.num)

S1 = Sample(15)
S2 = Sample(35)
S3 = Sample(45)
\`\`\`
Since num is SHARED by all objects, incrementing it via one object is reflected for all — the count increases with each new object: 1, 2, 3.

**Destructor** — a special method used to destroy objects, opposite to the constructor. In Python, **\\_\\_del\\_\\_()** is used as the destructor.
\`\`\`
class Sample:
    num = 0
    def __init__(self, var):
        Sample.num += 1
        self.var = var
        print("The object value is = ", self.var)
    def __del__(self):
        Sample.num -= 1
        print("Object with value %d is exit from the scope" % self.var)

S1 = Sample(15)
S2 = Sample(35)
S3 = Sample(45)
del S1, S2, S3
\`\`\`
**Note:** The \\_\\_del\\_\\_ method is called automatically when an object reference is deleted using del.`,
      nav: { back: "class-methods", next: "public-private", nextLabel: "Next: Public & Private Data Members →" }
    },
    {
      id: "public-private",
      title: "Public and Private Data Members",
      content: `**10.7 Public and Private Data Members**

Variables defined inside a class are **public by default** — they can be accessed anywhere in the program using the dot operator. A variable prefixed with a **double underscore (\\_\\_)** becomes **private** in nature — it can only be accessed WITHIN the class.

Example:
\`\`\`
class Sample:
    n1 = 12
    __n2 = 14
    def display(self):
        print("Class variable 1 = ", self.n1)
        print("Class variable 2 = ", self.__n2)

S = Sample()
S.display()
print("Value 1 = ", S.n1)
print("Value 2 = ", S.__n2)   # This line causes an error
\`\`\`
Here, n1 is public and n2 (\\_\\_n2) is private. The display() method (defined INSIDE the class) can successfully access both n1 and n2. But directly accessing S.\\_\\_n2 from OUTSIDE the class raises an error, since private variables cannot be accessed from outside the class.

Output:
\`\`\`
Class variable 1 = 12
Class variable 2 = 14
Value 1 = 12
AttributeError: 'Sample' object has no attribute '__n2'
\`\`\`

**Sample program — area and circumference of a circle:**
\`\`\`
class Circle:
    pi = 3.14
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return Circle.pi * (self.radius**2)
    def circumference(self):
        return 2 * Circle.pi * self.radius

r = int(input("Enter Radius: "))
C = Circle(r)
print("The Area =", C.area())
print("The Circumference =", C.circumference())
\`\`\``,
      nav: { back: "constructor-destructor", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Python is an Object Oriented Programming language; Classes and Objects are the key features of OOP.
- A class is defined using the keyword class; variables inside a class are "Class Variables", functions are "Methods".
- The process of creating an object is called "Class Instantiation" — syntax: Object_name = class_name().
- Class members are accessed via an object using the dot (.) operator.
- Every class method's first parameter must be self — Python supplies its value automatically.
- A Constructor is a special function automatically executed when an object is created; in Python, the special function __init__() is used as the Constructor, used to initialize class variables.
- Instance variables have a value that varies from object to object — each object gets its own separate copy, typically declared using self inside the constructor.
- A Destructor is a special method executed automatically when an object exits scope; in Python, __del__() is used as the destructor.
- A variable prefixed with a double underscore (__) becomes private, accessible only within the class; variables without this prefix are public by default.`,
      nav: { back: "public-private", practice: true }
    }
  ]
}
