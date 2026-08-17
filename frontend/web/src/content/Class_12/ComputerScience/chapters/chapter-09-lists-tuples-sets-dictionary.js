export default {
  chapterNumber: 9,
  title: "Lists, Tuples, Sets and Dictionary",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-lists",
      title: "Introduction to Lists",
      content: `**9.1 Introduction to List**

Python has four collection data types: **List, Tuple, Set, Dictionary**. A list is a "sequence data type" like strings — an ordered collection of values enclosed in square brackets **[ ]**. Each value is called an **element**, which can be any type (numbers, characters, strings, even nested lists). Elements are **mutable** — they can be replaced, added, or removed. Each element's position is indexed with numbers beginning at zero. Lists are similar to arrays learned in Class 11.

**9.1.1 Create a List**

Syntax:
\`\`\`
Variable = [element-1, element-2, ..., element-n]
\`\`\`
Example:
\`\`\`
Marks = [10, 23, 41, 75]
Fruits = ["Apple", "Orange", "Mango", "Banana"]
MyList = []
\`\`\`
Elements need not be homogeneous:
\`\`\`
Mylist = ["Welcome", 3.14, 10, [2, 4, 6]]
\`\`\`
A list containing another list as an element is called a **Nested List**.

**9.1.2 Accessing List Elements**

Python assigns an automatic index (positive or negative) to each element, starting at zero.
\`\`\`
Marks = [10, 23, 41, 75]
# Positive index: 0  1  2  3
# Negative index: -4 -3 -2 -1
\`\`\`
Positive index counts from the beginning; negative index counts backward from the end.
\`\`\`
print(Marks[0])    # 10
print(Marks[-1])   # 75 (negative index for reverse access)
\`\`\`

**Accessing all elements with a loop:**
\`\`\`
Marks = [10, 23, 41, 75]
i = 0
while i < 4:
    print(Marks[i])
    i = i + 1
\`\`\`
**Reverse Indexing** — Python sets -1 as the index for the last element, -2 for the preceding one, and so on:
\`\`\`
Marks = [10, 23, 41, 75]
i = -1
while i >= -4:
    print(Marks[i])
    i = i + -1
# Output: 75, 41, 23, 10
\`\`\`

**9.1.3 List Length** — len() returns the number of elements. If a list contains another list, len() counts that inner list as a single element.
\`\`\`
MySubject = ["Tamil", "English", "Comp. Science", "Maths"]
len(MySubject)   # 4
\`\`\`

**9.1.4 Accessing Elements Using for Loop**

Syntax:
\`\`\`
for index_var in list:
    print(index_var)
\`\`\`
Example:
\`\`\`
Marks = [23, 45, 67, 78, 98]
for x in Marks:
    print(x)
\`\`\``,
      nav: { next: "modifying-lists", nextLabel: "Next: Modifying, Adding & Deleting List Elements →" }
    },
    {
      id: "modifying-lists",
      title: "Modifying, Adding & Deleting List Elements",
      content: `**9.1.5 Changing List Elements**

Lists are mutable. Use the assignment operator = to change an element or range of elements.

Syntax:
\`\`\`
List_Variable[index of element] = Value to be changed
List_Variable[index from : index to] = Values to be changed
\`\`\`
\`\`\`
MyList = [2, 4, 5, 8, 10]
MyList[2] = 6                 # single value change
# MyList becomes [2, 4, 6, 8, 10]

MyList = [1, 3, 5, 7, 9]
MyList[0:5] = 2, 4, 6, 8, 10   # range change
\`\`\`

**9.1.6 Adding More Elements**

- **append(element)** — adds a SINGLE element at the end.
- **extend([elements])** — adds MULTIPLE elements (given as a list) at the end.
\`\`\`
MyList = [34, 45, 48]
MyList.append(90)          # [34, 45, 48, 90]
MyList.extend([71, 32, 29])  # [34, 45, 48, 90, 71, 32, 29]
\`\`\`

**9.1.7 Inserting Elements**

append() only adds at the end. To insert at a specific position, use **insert(position_index, element)** — existing elements shift one position to the right.
\`\`\`
MyList = [34, 98, 47, 'Kannan', 'Gowrisankar', 'Lenin', 'Sreenivasan']
MyList.insert(3, 'Ramakrishnan')
# [34, 98, 47, 'Ramakrishnan', 'Kannan', 'Gowrisankar', 'Lenin', 'Sreenivasan']
\`\`\`

**9.1.8 Deleting Elements**

- **del List[index]** — deletes one element by known index.
- **del List[from:to]** — deletes a range of elements.
- **del List** — deletes the entire list (list no longer exists).
- **remove(element)** — deletes an element by VALUE (index not needed).
- **pop(index)** — deletes AND returns the element at a given index; if no index given, removes/returns the LAST element.
- **clear()** — removes all elements, but the (now empty) list itself still exists.

\`\`\`
MySubjects = ['Tamil', 'Hindi', 'Telugu', 'Maths']
del MySubjects[1]        # ['Tamil', 'Telugu', 'Maths']
del MySubjects[1:3]      # ['Tamil']  -- deletes 2nd and 3rd elements
del MySubjects           # entire list deleted; using it now raises NameError

MyList = [12, 89, 34, 'Kannan', 'Gowrisankar', 'Lenin']
MyList.remove(89)        # removes value 89
MyList.pop(1)            # removes & returns element at index 1
MyList.clear()           # MyList becomes [] (still exists, just empty)
\`\`\``,
      nav: { back: "intro-lists", next: "list-range-functions", nextLabel: "Next: range(), Comprehensions & Other List Functions →" }
    },
    {
      id: "list-range-functions",
      title: "range(), List Comprehensions & Other List Functions",
      content: `**9.1.9 List and range() Function**

range() generates a series of values.

Syntax:
\`\`\`
range(start value, end value, step value)
\`\`\`
start defaults to 0; end is exclusive (Python takes end−1 as the upper limit); step is optional.

To convert a range() result into a list, use **list()**:
\`\`\`
Even_List = list(range(2, 11, 2))
print(Even_List)   # [2, 4, 6, 8, 10]
\`\`\`
Building a list of squares:
\`\`\`
squares = []
for x in range(1, 11):
    s = x ** 2
    squares.append(s)
print(squares)   # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
\`\`\`

**9.1.10 List Comprehensions**

A simple, shortcut way to create a sequence of elements satisfying a condition.

Syntax:
\`\`\`
List = [expression for variable in range]
\`\`\`
\`\`\`
squares = [x ** 2 for x in range(1, 11)]
print(squares)   # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
\`\`\`

**9.1.11 Other Important List Functions**

| Function | Description | Example Result |
|---|---|---|
| copy() | Returns a copy of the list | MyList.copy() |
| count(value) | Number of times value occurs | [36,12,12].count(12) → 2 |
| index(element) | Index of first occurrence | [36,12,12].index(12) → 1 |
| reverse() | Reverses the order of elements in place | [36,23,12] → [12,23,36] |
| sort(reverse=True\\|False, key=myFunc) | Sorts elements (ascending by default; affects the original list) | sort() then sort(reverse=True) |
| max(list) | Maximum value | max([21,76,98,23]) → 98 |
| min(list) | Minimum value | min([21,76,98,23]) → 21 |
| sum(list) | Sum of values | sum([21,76,98,23]) → 218 |

**9.1.12 Sample Program — numbers 1–20 divisible by 4:**
\`\`\`
divBy4 = []
for i in range(21):
    if (i%4==0):
        divBy4.append(i)
print(divBy4)   # [0, 4, 8, 12, 16, 20]
\`\`\`

**Deleting while iterating (using enumerate):**
\`\`\`
Num = []
for x in range(1,11):
    Num.append(x)
for index, i in enumerate(Num):
    if(i%2==0):
        del Num[index]
print(Num)
\`\`\`

**Fibonacci series in a list:**
\`\`\`
a, b = -1, 1
n = int(input("Enter no. of terms: "))
i, sum, Fibo = 0, 0, []
while i < n:
    s = a + b
    Fibo.append(s)
    sum += s
    a = b
    b = s
    i += 1
print("Fibonacci series:", Fibo)
print("Sum:", sum)
\`\`\``,
      nav: { back: "modifying-lists", next: "tuples", nextLabel: "Next: Tuples →" }
    },
    {
      id: "tuples",
      title: "Tuples",
      content: `**9.2 Introduction to Tuples**

A **tuple** consists of values separated by commas, enclosed within parentheses — similar to a list, but elements CANNOT be changed once assigned.

**9.2.1 Comparison of Tuples and Lists**
1. List elements are mutable (changeable); tuple elements are immutable (unchangeable) — the key difference.
2. Lists use square brackets []; tuples use parentheses ().
3. Iterating tuples is faster than lists.

**9.2.2 Creating Tuples**
\`\`\`
Tuple_Name = ()                        # Empty tuple
Tuple_Name = (E1, E2, ..., En)         # with elements
Tuple_Name = E1, E2, E3, ..., En       # even without parentheses
\`\`\`
**tuple() function** — converts a list into a tuple: \`tuple([list elements])\`.

**Creating a single-element (Singleton) tuple:** a comma is REQUIRED at the end, otherwise Python treats it as an ordinary type, not a tuple.
\`\`\`
MyTup4 = (10)    # type is int, NOT a tuple
MyTup5 = (10,)   # type is tuple (Singleton tuple)
\`\`\`

**9.2.3 Accessing Values in a Tuple**

Like lists, each element has an index from zero, and can be sliced:
\`\`\`
Tup1 = (12, 78, 91, "Tamil", "Telugu", 3.14, 69.48)
print(Tup1[2:5])   # (91, 'Tamil', 'Telugu')
print(Tup1[:5])    # from start to index 4
print(Tup1[4:])    # from index 4 to end
print(Tup1[:])     # entire tuple
\`\`\`

**9.2.4 Update and Delete a Tuple**

Since tuples are immutable, individual elements can't be changed — but you CAN join two tuples (using +), or delete the ENTIRE tuple using **del**.
\`\`\`
Tup1 = (2,4,6,8,10)
Tup2 = (1,3,5,7,9)
Tup3 = Tup1 + Tup2   # (2,4,6,8,10,1,3,5,7,9)

del Tup1   # deletes the entire tuple
\`\`\`

**9.2.5 Tuple Assignment**

Allows a tuple variable on the left to be assigned values from the right — each value goes to its respective variable.
\`\`\`
(a, b, c) = (34, 90, 76)
print(a,b,c)   # 34 90 76
\`\`\`
Expressions on the right are evaluated BEFORE assignment. The number of values on both sides must match, or Python raises an error.

**9.2.6 Returning Multiple Values in Tuples**

A function can technically return only one value, but Python can group multiple values into a tuple and return them together.
\`\`\`
def Min_Max(n):
    a = max(n)
    b = min(n)
    return(a, b)
Num = (12, 65, 84, 1, 18, 85, 99)
(Max_Num, Min_Num) = Min_Max(Num)
\`\`\`

**9.2.7 Nested Tuples** — a tuple defined inside another tuple; each inner tuple is treated as one element.
\`\`\`
Toppers = (("Vinodini", "XII-F", 98.7), ("Soundarya", "XII-H", 97.5))
for i in Toppers:
    print(i)
\`\`\`
**Note:** Some functions used with lists are also applicable to tuples.

**9.2.8 Programs Using Tuples — swap two values:**
\`\`\`
a = int(input("Enter value of A: "))
b = int(input("Enter value of B: "))
(a, b) = (b, a)
print("Value of A = ", a, "\\n Value of B = ", b)
\`\`\``,
      nav: { back: "list-range-functions", next: "sets", nextLabel: "Next: Sets →" }
    },
    {
      id: "sets",
      title: "Sets",
      content: `**9.3 Introduction to Sets**

A **Set** is a mutable, unordered collection of elements WITHOUT duplicates — the elements within a set cannot be repeated. This is used for membership testing and eliminating duplicate elements.

**9.3.1 Creating a Set** — elements separated by commas within curly brackets, or using the set() function.
\`\`\`
S1 = {1, 2, 3, 'A', 3.14}
print(S1)   # {1, 2, 3, 3.14, 'A'}

S2 = {1, 2, 2, 'A', 3.14}
print(S2)   # {1, 2, 'A', 3.14}  -- duplicate 2 is automatically removed
\`\`\`
**Note:** Printing a set may show elements in a different order each time.

**9.3.2 Creating a Set from a List or Tuple** — use set(list_or_tuple_variable).
\`\`\`
MyList = [2,4,6,8,10]
MySet = set(MyList)
print(MySet)   # {2, 4, 6, 8, 10}
\`\`\`

**9.3.3 Set Operations**

**(i) Union** — all elements from two or more sets. Operator **|**, or function **union()**.
\`\`\`
set_A={2,4,6,8}; set_B={'A','B','C','D'}
set_A | set_B          # or set_A.union(set_B)
\`\`\`

**(ii) Intersection** — common elements in two sets. Operator **&**, or function **intersection()**.
\`\`\`
set_A={'A',2,4,'D'}; set_B={'A','B','C','D'}
set_A & set_B          # {'A', 'D'}
\`\`\`

**(iii) Difference** — elements in set A but NOT in set B. Operator **-**, or function **difference()**.
\`\`\`
set_A - set_B          # elements only in set_A
\`\`\`

**(iv) Symmetric Difference** — elements in either set, but NOT common to both. Operator **^**, or function **symmetric_difference()**.
\`\`\`
set_A ^ set_B
\`\`\`

**9.3.4 Sample Program — primes, evens, and set operations:**
\`\`\`
even = set([x*2 for x in range(1,11)])
primes = set()
for i in range(2,20):
    j, f = 2, 0
    while j <= i/2:
        if i%j==0:
            f = 1
        j += 1
    if f==0:
        primes.add(i)
print("Union: ", even.union(primes))
print("Intersection: ", even.intersection(primes))
print("Difference: ", even.difference(primes))
print("Symmetric Difference: ", even.symmetric_difference(primes))
\`\`\``,
      nav: { back: "tuples", next: "dictionaries", nextLabel: "Next: Dictionaries →" }
    },
    {
      id: "dictionaries",
      title: "Dictionaries",
      content: `**9.4 Introduction to Dictionaries**

A **dictionary** stores a **key** along with its element (value) — a mixed collection, unlike lists/tuples. Keys and values are separated by a colon (**:**); pairs are separated by commas; the whole thing is enclosed in curly braces **{ }**.

Syntax:
\`\`\`
Dictionary_Name = { Key_1: Value_1, Key_2: Value_2, ..., Key_n: Value_n }
\`\`\`
Keys must be unique, case-sensitive, and can be any valid Python type.

**9.4.1 Creating a Dictionary**
\`\`\`
Dict1 = {}    # Empty dictionary
Dict_Stud = {'RollNo': '1234', 'Name':'Murali', 'Class':'XII', 'Marks':'451'}
\`\`\`

**9.4.2 Dictionary Comprehensions**

Syntax:
\`\`\`
Dict = { expression for variable in sequence [if condition] }
\`\`\`
The if condition is optional — filters which values are included.
\`\`\`
Dict = { x : 2 * x for x in range(1,10) }
# {1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12, 7: 14, 8: 16, 9: 18}
\`\`\`

**9.4.3 Accessing, Adding, Modifying & Deleting**

Access all values with print(); access a specific value with square brackets + key:
\`\`\`
MyDict = {'Reg_No':'1221', 'Name':'Tamilselvi', 'School':'CGHSS', 'Address':'Chennai 112'}
print(MyDict['Reg_No'])   # 1221
\`\`\`
**Adding a new key-value pair:**
\`\`\`
dictionary_name[key] = value/element
MyDict['Class'] = 'XII - A'
\`\`\`
**Modifying** works the same way — assigning to an existing key simply overwrites its old value.

**Deleting:**
\`\`\`
del dictionary_name[key]     # delete one element
dictionary_name.clear()      # delete all elements (dictionary itself remains, now empty)
del dictionary_name          # delete the entire dictionary
\`\`\`

**9.4.4 Difference Between List and Dictionary**
1. A list is an ordered set of elements; a dictionary matches one element (Key) with another (Value).
2. Lists use numeric index values; dictionaries use a KEY as the index — a key may be a number or a string.
3. Lists are used to look up a value directly; a dictionary is used to take one value (the key) and look up another (the value).`,
      nav: { back: "sets", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Python has four collection data types: List, Tuple, Set, and Dictionary.
- A list is a "sequence data type"; each element has a unique index beginning at zero, and both positive and negative index values are allowed.
- append(), extend(), and insert() add elements to a list; del, remove(), and pop() delete elements.
- The range() function generates a series of values; combined with list(), it can create a list of values.
- A tuple consists of values separated by commas, enclosed in parentheses — elements are immutable (unlike list elements). A single-element tuple needs a trailing comma.
- A Set is a mutable, unordered collection without duplicates, supporting Union (|), Intersection (&), Difference (-), and Symmetric Difference (^) operations.
- A dictionary is a mixed collection storing key-value pairs, enclosed in curly braces, with keys separated from values by a colon.
- Lists use numeric indices; dictionaries use keys (which can be any valid type) as their index.`,
      nav: { back: "dictionaries", practice: true }
    }
  ]
}
