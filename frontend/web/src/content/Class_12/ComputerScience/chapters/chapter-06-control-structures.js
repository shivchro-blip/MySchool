export default {
  chapterNumber: 6,
  title: "Control Structures",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-sequential",
      title: "Introduction & Sequential Statements",
      content: `**6.1 Introduction**

Programs contain sets of statements — executable segments that yield results. Generally, statements execute **sequentially**, one after another. Sometimes we need to skip a segment and execute another based on a condition — called **alternative or branching**. We may also need to execute a set of statements multiple times — called **iteration or looping**.

**6.2 Control Structures**

A program statement that causes a jump of control from one part of a program to another is called a **control structure** or **control statement** — compound statements used to alter the control flow of a process depending on its state.

There are three important control structures:
- **Sequential**
- **Alternative or Branching**
- **Iterative or Looping**

**6.2.1 Sequential Statement**

Composed of a sequence of statements executed one after another. Example:
\`\`\`
# Program to print your name and address - example for sequential statement
print("Hello! This is Shyam")
print("43, Second Lane, North Car Street, TN")
\`\`\`
Output:
\`\`\`
Hello! This is Shyam
43, Second Lane, North Car Street, TN
\`\`\``,
      nav: { next: "if-statements", nextLabel: "Next: if, if-else & elif Statements →" }
    },
    {
      id: "if-statements",
      title: "Alternative (Branching) Statements",
      content: `**6.2.2 Alternative or Branching Statement**

Python provides three types: **Simple if**, **if..else**, and **if..elif**.

**(i) Simple if Statement**

Syntax:
\`\`\`
if <condition>:
    statements-block1
\`\`\`
If the condition is true, statements-block1 executes.
\`\`\`
x = int(input("Enter your age :"))
if x >= 18:
    print("You are eligible for voting")
\`\`\`
If age < 18, nothing is printed — the program does not check any alternative when the condition fails.

**(ii) if..else Statement**

Syntax:
\`\`\`
if <condition>:
    statements-block 1
else:
    statements-block 2
\`\`\`
Provides two possibilities — the condition determines which block executes.
\`\`\`
a = int(input("Enter any number :"))
if a % 2 == 0:
    print(a, " is an even number")
else:
    print(a, " is an odd number")
\`\`\`

**Alternate (single-line) if..else:**
\`\`\`
variable = variable1 if condition else variable2
\`\`\`
If the condition is true, variable1's value is stored; otherwise variable2's value is used.
\`\`\`
a = int(input("Enter any number :"))
x = "even" if a%2==0 else "odd"
print(a, " is ", x)
\`\`\`

**(iii) Nested if..elif..else Statement**

When constructing a chain of if statements, use **elif** instead of nested if..else.

Syntax:
\`\`\`
if <condition-1>:
    statements-block 1
elif <condition-2>:
    statements-block 2
else:
    statements-block n
\`\`\`
condition-1 is tested; if true, statements-block1 executes. Otherwise condition-2 is checked; if true, statements-block2 executes. If all fail, the else block executes. Multiple if..else statements can be combined into one if..elif..else. There is no limit on the number of elif clauses, but an else clause (if used) must be placed at the end.

**Example — grading:**
\`\`\`
m1 = int(input("Enter mark in first subject : "))
m2 = int(input("Enter mark in second subject : "))
avg = (m1+m2)/2
if avg >= 80:
    print("Grade : A")
elif avg >= 70 and avg < 80:
    print("Grade : B")
elif avg >= 60 and avg < 70:
    print("Grade : C")
elif avg >= 50 and avg < 60:
    print("Grade : D")
else:
    print("Grade : E")
\`\`\`

**Note:** In Python, indentation (typically 4 spaces) is REQUIRED to indicate which block of code a statement belongs to — unlike other languages where indentation is merely cosmetic.

**Using 'in' and 'not in' in if statements:**
\`\`\`
ch = input("Enter a character :")
if ch in ('a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U'):
    print(ch, ' is a vowel')
if ch not in ('a', 'b', 'c'):
    print(ch, ' the letter is not a/b/c')
\`\`\``,
      nav: { back: "intro-sequential", next: "while-loop", nextLabel: "Next: while Loop →" }
    },
    {
      id: "while-loop",
      title: "Iteration: the while Loop",
      content: `**6.2.3 Iteration or Looping Constructs**

Loops execute a block of code multiple times, or until a condition is satisfied. Python provides two looping constructs: **while loop** and **for loop**.

**(i) while Loop**

Syntax:
\`\`\`
while <condition>:
    statements block 1
[else:
    statements block2]
\`\`\`
The condition is any valid Boolean expression. statements-block1 executes as long as the condition is True. The **else** part is optional, and executes when the condition tests False. The while loop is an **entry-check** loop — it is not executed even once if the condition is False at the start.

**Example — print numbers 10 to 15:**
\`\`\`
i = 10                    # initializing the control variable
while (i <= 15):          # test condition
    print(i, end='\\t')   # statements-block 1
    i = i + 1              # update the control variable
\`\`\`
Output: \`10 11 12 13 14 15\`

**Note:** print() supports \`end\` and \`sep\` as parameters — \`end\` can hold escape sequences like '\\t' (tab) or '\\n' (newline); \`sep\` can specify separators like comma or semicolon between values.

**Example — with else part:**
\`\`\`
i = 10
while (i <= 15):
    print(i, end='\\t')
    i = i + 1
else:
    print("\\nValue of i when the loop exit ", i)
\`\`\`
Output: \`10 11 12 13 14 15\` then \`Value of i when the loop exit 16\``,
      nav: { back: "if-statements", next: "for-loop", nextLabel: "Next: for Loop & Nested Loops →" }
    },
    {
      id: "for-loop",
      title: "Iteration: the for Loop & Nested Loops",
      content: `**(ii) for Loop**

The for loop is known as a **definite loop**, since the number of iterations is known in advance.

Syntax:
\`\`\`
for counter_variable in sequence:
    statements-block 1
[else:                     # optional
    statements-block 2]
\`\`\`
The \`for...in\` statement iterates over a sequence of objects — the control variable accesses each item until it reaches the last item.

\`\`\`
for x in "Hello World":
    print(x, end=' ')
# Output: H e l l o   W o r l d (each character)

for x in (1,2,3,4,5):
    print("Hello World")
# Output: Hello World printed 5 times
\`\`\`

**range() function** — generates a series of values between two numeric intervals.
\`\`\`
range(start, stop, [step])
\`\`\`
- start: initial value; stop: final value (range works till stop−1); step: increment (optional).

Examples:
- \`range(1,30,1)\` → 1 to 29
- \`range(2,30,2)\` → 2 to 28
- \`range(30,3,-3)\` → 30 down to 6
- \`range(20)\` → 0 to 19 (stop as upper limit, start defaults to 0)

**Example — even single-digit numbers:**
\`\`\`
for i in range(2,10,2):
    print(i, end=' ')
# Output: 2 4 6 8
\`\`\`

**Example — with else part:**
\`\`\`
for i in range(2,10,2):
    print(i, end=' ')
else:
    print("\\nEnd of the loop")
\`\`\`

**Example — sum of 1 to 100:**
\`\`\`
n = 100
sum = 0
for counter in range(1, n+1):
    sum = sum + counter
print("Sum of 1 until %d: %d" % (n, sum))
# Output: Sum of 1 until 100: 5050
\`\`\`
Note: the for loop iterates from 1 to n+1−1 = n, so range(1,n+1) is used to include n itself.

**for loop with strings:**
\`\`\`
for word in 'Computer':
    print(word, end=' ')
else:
    print("\\nEnd of the loop")
\`\`\`

**(iii) Nested Loop Structure**

A loop placed within another loop is called a **nested loop**. One can nest while within while, for within for, for within while, or while within for.

**Example — for within while, printing a triangular pattern:**
\`\`\`
i = 1
while (i <= 6):
    for j in range(1, i):
        print(j, end='\\t')
    print(end='\\n')
    i += 1
\`\`\`
Output:
\`\`\`
1
1  2
1  2  3
1  2  3  4
1  2  3  4  5
\`\`\``,
      nav: { back: "while-loop", next: "jump-statements", nextLabel: "Next: Jump Statements →" }
    },
    {
      id: "jump-statements",
      title: "Jump Statements: break, continue & pass",
      content: `**6.2.4 Jump Statements in Python**

Jump statements unconditionally transfer control from one part of the program to another. Python has three keywords: **break**, **continue**, **pass**.

**(i) break Statement**

Terminates the loop containing it; control transfers to the statement right after the loop's body. If inside a nested loop, break terminates only the **innermost** loop.

Syntax: \`break\`

\`\`\`
for word in "Jump Statement":
    if word == "e":
        break
    print(word, end=' ')
# Output: Jump Stat
\`\`\`
**Important:** if a loop is exited via break, the loop's **else** part is NOT executed.
\`\`\`
for word in "Jump Statement":
    if word == "e":
        break
    print(word, end=' ')
else:
    print("End of the loop")
print("\\n End of the program")
# Output: Jump Stat
#         End of the program   (else part skipped)
\`\`\`

**(ii) continue Statement**

Unlike break, continue skips the remaining part of the current iteration and moves to the **next** iteration.

Syntax: \`continue\`

\`\`\`
for word in "Jump Statement":
    if word == "e":
        continue
    print(word, end=' ')
print("\\n End of the program")
# Output: Jump Statmnt   (all letters except 'e')
#         End of the program
\`\`\`

**(iii) pass Statement**

A **null statement** — when executed, it is completely ignored; nothing happens (no operation). Used in an if clause or loop when no statements should execute in that block.

Syntax: \`pass\`

\`\`\`
a = int(input("Enter any number :"))
if (a==0):
    pass
else:
    print("non zero value is accepted")
\`\`\`
**Note:** pass is generally used as a **placeholder** — when a loop or function is to be implemented later but can't have an empty body (which would raise an interpreter error), pass fills that gap.
\`\`\`
for val in "Computer":
    pass
print("End of the loop, loop structure will be built in future")
\`\`\``,
      nav: { back: "for-loop", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Programs consist of statements executed in sequence; control statements alter this flow.
- A program statement that causes a jump of control from one part of the program to another is called a control structure or control statement.
- Three types of flow of control: Sequencing, Branching (Alternative), and Iteration.
- In Python, branching is done using various forms of 'if' structures (simple if, if..else, if..elif..else).
- Indentation plays a vital role in Python programming — it is the indentation that groups statements, with no need for {}. The interpreter throws an error for indentation mistakes.
- To accept input at runtime, modern Python versions use input().
- print() supports escape sequences to format output.
- range() is used to supply a range of values in a for loop.
- break, continue, pass act as jump statements in Python — break terminates the innermost loop entirely; continue skips to the next iteration; pass is a null statement, generally used as a placeholder.`,
      nav: { back: "jump-statements", practice: true }
    }
  ]
}
