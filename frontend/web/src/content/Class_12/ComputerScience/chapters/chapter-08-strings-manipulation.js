export default {
  chapterNumber: 8,
  title: "Strings and String Manipulation",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-creating",
      title: "Introduction & Creating Strings",
      content: `**8.1 Introduction**

A **string** is a data type in Python used to handle an array of characters — a sequence of Unicode characters (letters, numbers, or special symbols) enclosed within single, double, or triple quotes.
\`\`\`
'Welcome to learning Python'
"Welcome to learning Python"
'''Welcome to learning Python'''
\`\`\`
In Python, strings are **immutable** — once defined, a string cannot be changed during execution.

**8.2 Creating Strings**

A string can be created using single, double, or triple quotes. A string in single quotes cannot hold another single-quoted string inside it (the interpreter can't tell where it starts/ends) — use double quotes to overcome this. Strings containing double quotes should be defined within triple quotes, which also allow creation of multi-line strings.

\`\`\`
>>> print('Greater Chennai Corporation')
Greater Chennai Corporation

>>> print('Greater Chennai Corporation's student')
SyntaxError: invalid syntax

>>> print("Computer Science")
Computer Science

>>> print(''' "Computer Science" ''')
"Computer Science"

>>> print(''' "Strings are immutable in 'Python',
      which means you can't make any changes
      once you declared" ''')
"Strings are immutable in 'Python', which means you can't make any changes once you declared"
\`\`\``,
      nav: { next: "accessing-modifying", nextLabel: "Next: Accessing, Modifying & Deleting Strings →" }
    },
    {
      id: "accessing-modifying",
      title: "Accessing, Modifying & Deleting Strings",
      content: `**8.3 Accessing Characters in a String**

Python allocates an index value (**subscript**) for each character — positive or negative. Positive subscript 0 is the first character, and n-1 is the last (n = string length). Negative index starts from -1 for the last character, going backward.

Example — "SCHOOL":
| String | S | C | H | O | O | L |
|---|---|---|---|---|---|---|
| Positive subscript | 0 | 1 | 2 | 3 | 4 | 5 |
| Negative subscript | -6 | -5 | -4 | -3 | -2 | -1 |

**Accessing with positive subscript:**
\`\`\`
str1 = input("Enter a string: ")
index = 0
for i in str1:
    print("Subscript[", index, "] : ", i)
    index += 1
\`\`\`

**Accessing with negative subscript:**
\`\`\`
str1 = input("Enter a string: ")
index = -1
while index >= -(len(str1)):
    print("Subscript[", index, "] : " + str1[index])
    index += -1
\`\`\`

**8.4 Modifying and Deleting Strings**

Since strings are immutable, modification or deletion of individual characters is NOT allowed:
\`\`\`
>>> str1 = "How are you"
>>> str1[0] = "A"
TypeError: 'str' object does not support item assignment
\`\`\`
To "modify" a string, you must reassign a completely new string to the variable:
\`\`\`
>>> str1 = "How are you"
>>> str1 = "How about you"
\`\`\`

The **replace()** function temporarily changes all occurrences of a character (without affecting the original string):
\`\`\`
replace("char1", "char2")
>>> str1 = "How are you"
>>> print(str1.replace("o", "e"))
Hew are yeu
\`\`\`

Deleting a single character is not allowed:
\`\`\`
>>> str1 = "How are you"
>>> del str1[2]
TypeError: 'str' object doesn't support item deletion
\`\`\`
But an entire string variable CAN be deleted using **del**:
\`\`\`
>>> str1 = "How about you"
>>> del str1
>>> print(str1)
NameError: name 'str1' is not defined
\`\`\``,
      nav: { back: "intro-creating", next: "string-operators", nextLabel: "Next: String Operators & Slicing →" }
    },
    {
      id: "string-operators",
      title: "String Operators & Slicing",
      content: `**8.5 String Operators**

**(i) Concatenation (+)** — joining two or more strings:
\`\`\`
>>> "welcome" + "Python"
'welcomePython'
\`\`\`

**(ii) Append (+=)** — adding more strings at the end of an existing string:
\`\`\`
>>> str1 = "Welcome to "
>>> str1 += "Learn Python"
>>> print(str1)
Welcome to Learn Python
\`\`\`

**(iii) Repeating (*)** — displays a string multiple times:
\`\`\`
>>> str1 = "Welcome "
>>> print(str1*4)
Welcome Welcome Welcome Welcome
\`\`\`

**(iv) String Slicing** — a slice is a substring taken from the original string using the [ ] (slicing) operator with index/subscript values.

General format: \`str[start:end]\` — start is the beginning index, end is one past the last index desired (Python considers only up to end−1).
\`\`\`
str1 = "THIRUKKURAL"
print(str1[0])       # T (single character)
print(str1[0:5])     # THIRU (indices 0 to 4)
print(str1[:5])      # THIRU (start omitted, defaults to 0)
print(str1[6:])      # KURAL (end omitted, goes to the end)
\`\`\`

**(v) Stride when slicing** — a third argument specifying how many characters to skip forward after retrieving the first. Default stride is 1.
\`\`\`
str1 = "Welcome to learn Python"
print(str1[10:16])      # learn
print(str1[10:16:4])    # r  (every 4th character within range)
print(str1[10:16:2])    # er
print(str1[::3])        # Wceoenyo (whole string, every 3rd char)
\`\`\`
A negative stride reverses the direction, printing in reverse order:
\`\`\`
print(str1[::-2])   # nhy re teolW
\`\`\``,
      nav: { back: "accessing-modifying", next: "formatting", nextLabel: "Next: Formatting Strings →" }
    },
    {
      id: "formatting",
      title: "String Formatting Operators & the format() Function",
      content: `**8.6 String Formatting Operators**

The formatting operator **%** constructs strings, replacing parts with data stored in variables.

Syntax:
\`\`\`
("String to display with %val1 and %val2" % (val1, val2))
\`\`\`
Example:
\`\`\`
name = "Rajarajan"
mark = 98
print("Name: %s and Marks: %d" % (name, mark))
# Output: Name: Rajarajan and Marks: 98
\`\`\`

**8.7 Formatting Characters**

| Character | Usage |
|---|---|
| %c | Character |
| %d or %i | Signed decimal integer |
| %s | String |
| %u | Unsigned decimal integer |
| %o | Octal integer |
| %x or %X | Hexadecimal integer (x=a-f, X=A-F) |
| %e or %E | Exponential notation |
| %f | Floating point numbers |
| %g or %G | Short numbers in float/exponential notation |

**Escape sequences** start with a backslash and are interpreted specially — single quotes inside single-quoted strings, and double quotes inside double-quoted strings, must be escaped.
\`\`\`
>>> print('''They said, "What's there?"''')
They said, "What's there?"
>>> print('They said, "What\\'s there?"')
They said, "What's there?"
\`\`\`

| Escape Sequence | Description |
|---|---|
| \\\\newline | Backslash and newline ignored |
| \\\\\\\\ | Backslash |
| \\\\' | Single quote |
| \\\\" | Double quote |
| \\\\a | ASCII Bell |
| \\\\b | ASCII Backspace |
| \\\\f | ASCII Form feed |
| \\\\n | ASCII Linefeed |
| \\\\r | ASCII Carriage Return |
| \\\\t | ASCII Horizontal Tab |
| \\\\v | ASCII Vertical Tab |
| \\\\ooo | Character with octal value ooo |
| \\\\xHH | Character with hexadecimal value HH |

**8.8 The format() Function**

A versatile, powerful function for formatting strings. Curly braces {} act as placeholders/replacement fields.
\`\`\`
num1 = int(input("Number 1: "))
num2 = int(input("Number 2: "))
print("The sum of { } and { } is { }".format(num1, num2, (num1+num2)))
# Output: The sum of 34 and 54 is 88
\`\`\``,
      nav: { back: "string-operators", next: "builtin-functions", nextLabel: "Next: Built-in String Functions →" }
    },
    {
      id: "builtin-functions",
      title: "Built-in String Functions",
      content: `**8.9 Built-in String Functions**

| Function | Description | Example |
|---|---|---|
| len(str) | Length of the string | len("Corporation") → 11 |
| capitalize() | Capitalizes first character | "chennai".capitalize() → "Chennai" |
| center(width, fillchar) | Centers the string within a width, padding with fillchar | "Welcome".center(15,'*') → "****Welcome****" |
| find(sub[,start[,end]]) | Returns index of first occurrence, or -1 if not found | "mammals".find('ma') → 0 |
| isalnum() | True if string contains only letters and digits | "Save1Earth".isalnum() → True |
| isalpha() | True if string contains only letters | "python".isalpha() → True |
| isdigit() | True if string contains only numbers | "Save Earth".isdigit() → False |
| lower() | Returns copy in lowercase | "SAVE EARTH".lower() → "save earth" |
| islower() | True if string is entirely lowercase | "welcome".islower() → True |
| isupper() | True if string is entirely uppercase | "welcome".isupper() → False |
| upper() | Returns copy in uppercase | "welcome".upper() → "WELCOME" |
| title() | Returns string in title case | "education department".title() → "Education Department" |
| swapcase() | Swaps upper/lowercase of every character | "tAmiL NaDu".swapcase() → "TaMIl nAdU" |
| count(str,beg,end) | Number of occurrences of a substring in a range | "Raja Raja Chozhan".count('Raja') → 2 |
| ord(char) | ASCII code of a character | ord('A') → 65 |
| chr(ASCII) | Character for an ASCII value | chr(97) → 'a' |

**8.10 Membership Operators**

The **in** and **not in** operators determine whether a string is present within another string — called **Membership Operators**.
\`\`\`
str1 = input("Enter a string: ")
str2 = "chennai"
if str2 in str1:
    print("Found")
else:
    print("Not Found")
\`\`\``,
      nav: { back: "formatting", next: "example-programs", nextLabel: "Next: Example String Programs →" }
    },
    {
      id: "example-programs",
      title: "Example Programs Using Strings",
      content: `**8.11 Programs Using Strings**

**Check if a string is a palindrome:**
\`\`\`
str1 = input("Enter a string: ")
str2 = ' '
index = -1
for i in str1:
    str2 += str1[index]
    index -= 1
print("The given string = { } \\n The Reversed string = { }".format(str1, str2))
if (str1 == str2):
    print("Hence, the given string is Palindrome")
else:
    print("Hence, the given is not a palindrome")
\`\`\`

**Print a triangular pattern of asterisks:**
\`\`\`
str1 = ' * '
i = 1
while i <= 5:
    print(str1*i)
    i += 1
\`\`\`

**Count vowels and consonants:**
\`\`\`
str1 = input("Enter a string: ")
str2 = "aAeEiIoOuU"
v, c = 0, 0
for i in str1:
    if i in str2:
        v += 1
    elif i.isalpha():
        c += 1
print("The given string contains { } vowels and { } consonants".format(v, c))
\`\`\`

**Abecedarian series** (elements in alphabetical order):
\`\`\`
str1 = "ABCDEFGH"
str2 = "ate"
for i in str1:
    print((i+str2), end='\\t')
# Output: Aate  Bate  Cate  Date  Eate  Fate  Gate  Hate
\`\`\`

**Remove vowels from a string:**
\`\`\`
def rem_vowels(s):
    temp_str = ''
    for i in s:
        if i in "aAeEiIoOuU":
            pass
        else:
            temp_str += i
    print("The string without vowels: ", temp_str)
str1 = input("Enter a String: ")
rem_vowels(str1)
\`\`\`

**Count occurrences of a character:**
\`\`\`
def count(s, c):
    c1 = 0
    for i in s:
        if i == c:
            c1 += 1
    return c1
str1 = input("Enter a String: ")
ch = input("Enter a character to be searched: ")
cnt = count(str1, ch)
print("The given character {} occurs {} times in the given string".format(ch, cnt))
\`\`\``,
      nav: { back: "builtin-functions", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- String is a data type in Python used to handle a sequence of Unicode characters.
- Strings are immutable — once defined, they cannot be changed during execution.
- Defining strings within triple quotes allows creation of multiline strings.
- Python allocates an index value (subscript) for each character in a string — positive or negative.
- Slice is a substring of a main string, extracted using the [ ] slicing operator; stride is the optional third argument in a slice.
- Escape sequences start with a backslash and are interpreted specially.
- The format() function is a versatile, powerful function for formatting strings, using {} as placeholders.
- The 'in' and 'not in' operators (Membership Operators) determine whether a string is present within another string.`,
      nav: { back: "example-programs", practice: true }
    }
  ]
}
