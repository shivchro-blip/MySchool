export default {
  chapterNumber: 2,
  title: "Data Abstraction",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-adt",
      title: "Introduction to Data Abstraction & ADT",
      content: `**2.1 Data Abstraction — Introduction**

Data abstraction is a powerful concept in computer science that allows programmers to treat code as objects — for example, car objects, pencil objects, people objects. Programmers need not worry about how code is implemented; they only need to know what it does.

This is especially important when several people are working on a project. With data abstraction, your group members won't have to read through every line of your code to understand it — they can just assume that it works. Abstraction provides **modularity** (splitting a program into many modules). Classes (structures) are the representation for **Abstract Data Types (ADT)**.

**2.2 Abstract Data Types**

An **Abstract Data Type (ADT)** is a type for objects whose behaviour is defined by a set of values and operations. The definition of an ADT only mentions what operations are to be performed, but not how these operations will be implemented — it does not specify how data will be organised in memory or what algorithms will be used to implement the operations. It is called "abstract" because it gives an implementation-independent view. The process of providing only the essentials and hiding the details is known as **abstraction**.

These definitions do not specify how the ADT will be represented or how its operations will be carried out. There can be different ways to implement an ADT — for example, a List ADT can be implemented using a singly linked list or a doubly linked list. Similarly, Stack ADT and Queue ADT can be implemented using lists.

Data abstraction replicates how we think about the world. For example, when you drive a car, you don't need to know how the engine was built or what material the tires are made of — you just need to know how to drive. To facilitate data abstraction, you need two types of functions: **constructors** and **selectors**.`,
      nav: { next: "constructors-selectors", nextLabel: "Next: Constructors and Selectors →" }
    },
    {
      id: "constructors-selectors",
      title: "Constructors and Selectors",
      content: `**2.3 Constructors and Selectors**

**Constructors** are functions that build the abstract data type. **Selectors** are functions that retrieve information from the data type.

**Example — City ADT:** Suppose you have an ADT called city, holding the city's name, latitude, and longitude. To create a city object:
\`\`\`
city := makecity(name, lat, lon)
\`\`\`
To extract information from a city object, you'd use functions like:
- getname(city)
- getlat(city)
- getlon(city)

**Pseudo code to compute distance between two city objects:**
\`\`\`
distance(city1, city2):
    lt1, lg1 := getlat(city1), getlon(city1)
    lt2, lg2 := getlat(city2), getlon(city2)
    return ((lt1-lt2)**2 + (lg1-lg2)**2)**(1/2)
\`\`\`
Here \`lt1, lg1 := getlat(city1), getlon(city1)\` is read as: "lt1 becomes the value of getlat(city1) and lg1 becomes the value of getlon(city1)." Read := as "assigned as" or "becomes."

You don't need to know how these functions were implemented — you assume someone else has already defined them. It's okay if the end user doesn't know how a function was implemented, but the functions still have to be defined by SOMEONE.

In the pseudo code above, \`makecity(name, lat, lon)\` is the **constructor** which creates the object city, while \`getname(city)\`, \`getlat(city)\`, and \`getlon(city)\` are the **selectors** that extract information from the city object.

**Example — Point/Slope (using -- for comments):**
\`\`\`
-- constructor
makepoint(x, y):
    return x, y
-- selector
xcoord(point):
    return point[0]
-- selector
ycoord(point):
    return point[1]
\`\`\`

**Note:** Data abstraction is used to define an Abstract Data Type (ADT), which is a collection of constructors and selectors. Constructors create an object, bundling together different pieces of information; selectors extract individual pieces of information from the object.`,
      nav: { back: "intro-adt", next: "rational-numbers", nextLabel: "Next: Representing ADTs Using Rational Numbers →" }
    },
    {
      id: "rational-numbers",
      title: "Representation of ADT Using Rational Numbers",
      content: `**2.4 Representation of Abstract Data Type Using Rational Numbers**

The basic idea of data abstraction is to structure programs so they operate on abstract data — programs should make as few assumptions about the data as possible. At the same time, a concrete data representation is defined as an independent part of the program.

**Note:** A concrete data type is a data type whose representation is known.

Any program consists of two parts: the part that operates on abstract data, and the part that defines a concrete representation — connected by a small set of functions that implement abstract data in terms of the concrete representation.

**Example:** A rational number is a ratio of integers, forming an important sub-class of real numbers. A rational number such as 8/3 or 19/23 is typically written as \`<numerator>/<denominator>\`, where both parts are placeholders for integer values — both are needed to exactly characterize the value, since dividing integers directly produces a float approximation, losing exact precision (e.g., 8/3 = 2.6666666666666665).

You can create an exact representation for rational numbers by combining the numerator and denominator together. We use the strategy of **'wishful thinking'** — assuming we already have a way of constructing a rational number from numerator/denominator, and a way of selecting its numerator/denominator, before we've said how it's actually represented or implemented.

**Note:** Wishful thinking is the formation of beliefs and decisions according to what might be pleasing to imagine, instead of by appealing to reality.

**Example — An ADT for rational numbers:**
\`\`\`
-- constructor
-- constructs a rational number with numerator x, denominator y
rational(x, y)
-- selector
numer(x) → returns the numerator of rational number x
denom(y) → returns the denominator of rational number y
\`\`\`
Here, rational() is the constructor; numer() and denom() are both selectors. Selectors are declared inside the constructor, but not defined.

**Pseudo code representation, using the constructor and selector:**
\`\`\`
x, y := 8, 3
rational(x, y)
numer(x)/denom(y)
-- output: 2.6666666666666665
\`\`\``,
      nav: { back: "constructors-selectors", next: "lists-tuples", nextLabel: "Next: Lists and Tuples →" }
    },
    {
      id: "lists-tuples",
      title: "Lists and Tuples",
      content: `**2.5 Lists, Tuples**

To implement data abstraction, programming languages like Python provide a compound structure called **Pair**, made up of a List or Tuple. The first way to implement pairs is with the List construct.

**2.5.1 List**

A List is constructed by placing expressions within square brackets, separated by commas. Such an expression is called a **list literal**. A list can store multiple values, each of which can be of any type, and can even be another list.

**Example:** \`[10, 20]\`

**Accessing List Elements — Two ways:**

1. **Multiple assignment:** Unpacks a list into its elements and binds each element to a different name:
\`\`\`
lst := [10, 20]
x, y := lst
\`\`\`
Here x becomes 10 and y becomes 20.

2. **Element selection operator:** A square-brackets expression directly following another expression does not evaluate to a list value, but selects an element from the preceding expression's value:
\`\`\`
lst[0]
10
lst[1]
20
\`\`\`

Mathematically, a list can be represented similar to a set: \`lst[(0,10), (1,20)]\` — index-value pairs.

Any way of bundling two values together into one can be considered a **pair**. Lists are a common method to do so — therefore, a List can be called a Pair.

**Representing Rational Numbers Using List:** A rational number can be represented as a pair of two integers:
\`\`\`
rational(n, d):
    return [n, d]
numer(x):
    return x[0]
denom(x):
    return x[1]
\`\`\`

**2.5.2 Tuple**

A pair is a compound data type holding two other pieces of data — we've now seen two ways to represent a pair: List and Tuple.

A **Tuple** is a comma-separated sequence of values surrounded with parentheses, similar to a list. The key difference: you **cannot** change the elements of a tuple once it is assigned, whereas in a list, elements can be changed.

**Example:** \`colour = ('red', 'blue', 'Green')\`

**Representation of Tuple as a Pair:**
\`\`\`
nums := (1, 2)
nums[0]
1
nums[1]
2
\`\`\`
The square-bracket notation is used to access data stored in the pair — nums[0] accesses the first element, nums[1] the second.`,
      nav: { back: "rational-numbers", next: "data-abstraction-structure", nextLabel: "Next: Data Abstraction in Structure →" }
    },
    {
      id: "data-abstraction-structure",
      title: "Data Abstraction in Structure (Class)",
      content: `**2.6 Data Abstraction in Structure**

Lists allow data abstraction in that you can give a name to a set of memory cells. For instance, in the game Mastermind, you must keep track of a list of four colors the player guesses. Instead of using four separate variables (color1, color2, color3, color4), you can use a single variable 'Predict':
\`\`\`
Predict := ['red', 'blue', 'green', 'green']
\`\`\`
What lists do NOT allow is naming the various parts of a multi-item object. For something simple like Predict, you don't really need to name the parts — using an index to get to each color suffices.

But for something more complex, like a person, we have a multi-item object where each 'item' is a named thing: the firstName, lastName, id, and email. One could use a list to represent a person:
\`\`\`
person := ['Padmashri', 'Baskar', '994-222-1234', 'compsci@gmail.com']
\`\`\`
But such a representation doesn't explicitly specify what each part represents.

For this problem, instead of a list, you can use the **structure construct** (in OOP languages, called the **class construct**) to represent multi-part objects where each part is named. Consider the following pseudo code:
\`\`\`
class Person:
    creation()
        firstName := " "
        lastName := " "
        id := " "
        email := " "
\`\`\`
The new data type Person is pictorially represented with: **Person** (class name — multi-part data representation), containing **creation()** (a function belonging to the new data type), and **firstName, lastName, id, email** (variables/fields belonging to the new data type).

**Using it in main():**
\`\`\`
p1 := Person()             -- statement creates the object
firstName := "Padmashri"   -- setting a field called firstName with value Padmashri
lastName := "Baskar"       -- setting a field called lastName with value Baskar
id := "994-222-1234"       -- setting a field called id with value 994-222-1234
email := "compsci@gmail.com"  -- setting a field called email with value compsci@gmail.com
-- output of firstName: Padmashri
\`\`\`
The class (structure) construct defines the form for multi-part objects that represent a person. Its definition adds a new data type — here, a type named Person. Once defined, we can create new variables (**instances**) of the type. Person is referred to as a **class** or a **type**, while p1 is referred to as an **object** or an **instance**. You can think of class Person as a cookie cutter, and p1 as a particular cookie — using the cookie cutter you can make many cookies; likewise, using a class you can create many objects of that type.

A class is not just data — it has functions defined within it too. Such functions are called **subordinate to the class**, because their job is to do things with the data of the class (e.g., to modify or analyze the data of a Person object). We can therefore define a **class as bundled data and the functions that work on that data**. The beauty of data abstraction is that we can treat complex data in a very simple way.`,
      nav: { back: "lists-tuples", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Abstract Data Type (ADT) is a type (or class) for objects whose behaviour is defined by a set of values and a set of operations.
- The definition of ADT only mentions what operations are to be performed, not how they will be implemented; it does not specify data organisation in memory or the algorithms used.
- Constructors are functions that build the abstract data type; selectors are functions that retrieve information from the data type.
- Concrete data types (CDTs) are direct implementations of a relatively simple concept; ADTs offer a high-level view (and use) of a concept independent of its implementation.
- A concrete data type is a data type whose representation is known; in an abstract data type, the representation is unknown.
- A Pair is a compound structure made up of a List or Tuple. A List is constructed by placing expressions within square brackets, separated by commas.
- List elements can be accessed via multiple assignment or the element selection operator.
- Bundling two values together into one can be considered a pair.
- Lists do not allow naming the various parts of a multi-item object — a class (structure) construct is used instead, defining named fields for such multi-part objects.`,
      nav: { back: "data-abstraction-structure", practice: true }
    }
  ]
}
