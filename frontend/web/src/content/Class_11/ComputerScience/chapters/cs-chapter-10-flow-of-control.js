export default {
  chapterNumber: 10,
  title: "Flow of Control",
  subject: "Computer Science",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "statements-intro",
      title: "Statements & Control Statements",
      content: `**10.1 Introduction**

Generally a program executes its statements sequentially from beginning to end. However, strict sequential ordering is restrictive — often, the code block executed should depend on a certain condition. In such situations, the flow of control jumps from one part of the code to another; program statements that cause such jumps are called **Control flow**. This chapter covers **Selection**, **Iteration**, and **Jump** statements.

**10.2 Statements**

A program is a set of statements/instructions to perform a specific task — variable declarations, expression evaluations, assignments, decision making, looping, etc. There are two kinds of statements in C++:

**10.2.1 Null Statement:** The "null or empty statement" contains only a semicolon (\`;\`). It's commonly used as a placeholder in iteration statements, or to attach labels at the end of compound statements or functions.

**10.2.2 Compound (Block) Statement:** C++ allows a group of statements enclosed by a pair of braces {}, called a **compound statement** or **block**:
\`\`\`
{
    statement1;
    statement2;
    statement3;
}
\`\`\`
A block is treated as a single unit and may appear anywhere in the program.

**10.3 Control Statements**

Control statements alter the sequence of flow of instructions. Statements may execute **sequentially**, **selectively**, or **iteratively**:

- **Sequence statement:** Statements executed one after another, only once, from top to bottom, without altering flow — each ends with a semicolon.
- **Selection statement:** Execution depends on a condition — if true, a "true block" executes; if false, a "false block" executes. Also called a decision statement, since it helps decide which set of statements to run.
- **Iteration statement:** A set of statements repetitively executed based on a condition — if true, the "true block" (loop body) executes again and again; once the condition becomes false, repetition stops. Also called a looping statement. The condition governing execution/exit is the **exit-condition** or **test-condition**.

**Note:** In C++, any non-zero value is treated as true (including negative numbers); zero is treated as false.`,
      nav: { next: "selection-if", nextLabel: "Next: if / if-else Statements →" }
    },
    {
      id: "selection-if",
      title: "if, if-else & Nested if",
      content: `**10.4 Selection Statements**

Decisions in C++ are made mainly with **if...else**, which chooses between two alternatives, and **switch**, which creates branches for multiple alternatives based on a single variable's value.

**10.4.1 if Statement**

Evaluates a condition; if true, the "true-block" executes; otherwise it's skipped.
\`\`\`
if (expression)
    true-block;
statement-x;
\`\`\`
If the expression is true (nonzero), the true-block executes, followed by statement-x. If false, control passes directly to statement-x. The true-block may be a single statement, a compound statement, or empty.

**10.4.2 if-else Statement**

Allows an alternative course of action when the condition is false:
\`\`\`
if (expression)
{
    True-block;
}
else
{
    False-block;
}
statement-x;
\`\`\`
If the expression is true, the true-block executes and the false-block is skipped; if false, the false-block executes and the true-block is skipped.

**10.4.3 Nested if**

An if statement containing another if statement is called a **nested if**. Three forms: (1) if nested inside the if part, (2) if nested inside the else part, (3) if nested inside both the if part and the else part. In form (1): expression-1 is evaluated; if false, control passes to statement-m. Otherwise, expression-2 is evaluated — if true, the Nested-True-block executes (then statement-n); if false, the Nested-False-block executes (then statement-n and statement-m).`,
      nav: { back: "statements-intro", next: "selection-ladder-switch", nextLabel: "Next: if-else Ladder, Ternary & switch →" }
    },
    {
      id: "selection-ladder-switch",
      title: "if-else Ladder, Conditional Operator & switch",
      content: `**10.4.4 if-else-if Ladder**

A multi-path decision-making statement — 'if' is followed by one or more 'else if' statements, ending with a final 'else':
\`\`\`
if (expression1)
    Statement-1
else if (expression2)
    Statement-2
else if (expression3)
    Statement-3
else
    Statement-4
\`\`\`
When a condition becomes true, its associated statement executes and the rest of the ladder is bypassed. If none are true, the final else statement executes.

**10.4.5 The ?: Conditional (Ternary) Operator**

An alternative to if...else, taking three arguments:
\`\`\`
expression1 ? expression2 : expression3
\`\`\`
expression1 (the condition) is evaluated; if true (non-zero), control transfers to expression2; otherwise, to expression3. Example: \`largest = (a>b) ? a : b;\` stores the larger of a and b.

**10.4.6 switch Statement**

A multi-way branch statement dispatching execution based on the value of an expression, often replacing a long if-else sequence:
\`\`\`
switch(expression)
{
    case constant1:
        statement(s);
        break;
    case constant2:
        statement(s);
        break;
    default:
        statement(s);
}
\`\`\`
The expression is evaluated; if it matches a case's constant, that block executes; otherwise, the default block executes.

**Rules:**
1. The switch expression must evaluate to a constant value.
2. Duplicate case values are not allowed.
3. The default statement is optional.
4. break terminates the switch — control jumps to the line after the switch.
5. break is optional — if omitted, execution "falls through" into subsequent cases until a break is reached.
6. Nesting of switch statements is allowed.

**10.4.7 switch vs if-else**

| # | if-else | switch |
|---|---|---|
| 1 | Condition decides if/else block | Expression decides which case to run |
| 2 | Uses multiple conditions for multiple choices | Uses a single expression for multiple choices |
| 3 | Checks equality and logical expressions | Checks only for equality |
| 4 | Evaluates int, char, pointer, float, or bool | Evaluates only char or int |
| 5 | False → else block runs | No match → default runs |

The if statement is more flexible than the switch statement overall.`,
      nav: { back: "selection-if", next: "iteration-for", nextLabel: "Next: Iteration & the for Loop →" }
    },
    {
      id: "iteration-for",
      title: "Iteration Statements & the for Loop",
      content: `**10.5 Iteration Statements**

An iteration (looping) is a sequence of statements repeatedly executed until a condition is satisfied — reducing code length, execution time, and memory. C++ supports three iteration types: **for**, **while**, **do-while**. All repeat statements as long as a specified condition (the **loop control**) remains true; a nonzero value is true, zero is false.

**10.5.1 Parts of a Loop** — every loop has four elements:
- **Initialization expression(s):** initializes the control variable(s), executed once at the start.
- **Test expression:** decides whether the loop body executes; if true (nonzero), the body executes, otherwise the loop terminates. In an **entry-controlled** loop, this is checked *before* entering the loop; in an **exit-controlled** loop, *after* the body runs at least once.
- **Update expression:** changes the loop variable's value, executed at the end of each iteration.
- **The body of the loop:** the repeated statement(s).

**10.5.2 for Loop**

An **entry-controlled** loop, the easiest looping statement — contains initialization, test-expression, and update expression(s) in one line, separated by semicolons:
\`\`\`
for (initialization(s); test-expression; update expression(s))
{
    Statement1;
    Statement2;
}
statement-x;
\`\`\`
Flow: initialize once → evaluate test-expression → if false, jump to statement-x; if true, execute the loop body → execute update expression → re-evaluate test-expression → repeat.

**Variations of the for loop:**
- **Multiple initialization/update expressions:** separated by commas, e.g., \`for(i=0, j=10; i<j; i++, j--)\` — evaluated in sequential order.
- **Prefer prefix over postfix** for standalone increment/decrement in update expressions, since prefix operators execute faster when used alone.
- **Optional expressions:** all three parts (initialization, test, update) are optional. If the initialization or update is omitted, a semicolon placeholder is still required; e.g., \`for(; i<=n;)\`.
- **Infinite loop:** occurs if the test-expression is omitted, e.g., \`for(i=0;;++i)\` — runs forever.
- **Empty loop:** a loop with no body statement, e.g., \`for(i=0; i<=5; ++i);\` (note the trailing semicolon making the body a null statement). If a semicolon is placed right after a for loop header and a block follows separately, that block will NOT be treated as the loop body and won't repeat.
- **Declaring a variable within a for loop:** e.g., \`for(int i=0; i<=5; ++i)\` — the variable i's scope is limited to the loop body (in modern C++, effectively the enclosing block); a variable declared inside main()'s block, however, is accessible throughout main().`,
      nav: { back: "selection-ladder-switch", next: "iteration-while-nested", nextLabel: "Next: while, do-while & Nested Loops →" }
    },
    {
      id: "iteration-while-nested",
      title: "while Loop, do-while Loop & Nested Loops",
      content: `**10.5.3 while Loop**

An **entry-controlled** loop — the test-expression is evaluated before entering the loop:
\`\`\`
while (Test expression)
{
    Body of the loop;
}
statement-x;
\`\`\`
If the test expression is true, the loop body executes and control returns to re-test the condition; once false, control passes to statement-x.

**while loop variations:** Can be an **empty loop** (body contains only a null statement — e.g., a time-delay loop like \`while(++i < 10000);\`), or an **infinite loop** if no update statement changes the test condition inside the loop body.

**10.5.4 do-while Loop**

An **exit-controlled** loop — the condition is evaluated at the *bottom*, after the loop body executes, meaning the body always runs **at least once**, even if the condition is false on the first check:
\`\`\`
do
{
    Body of the loop;
} while (condition);
\`\`\`

**10.5.5 Nesting of Loops**

A loop containing another loop is called a **nested loop** — for loops, while loops, and do-while loops can all be nested (including mixed combinations). Nested for loops are commonly used to generate patterns or tables, such as a multiplication table, where the outer loop controls rows and the inner loop controls columns.`,
      nav: { back: "iteration-for", next: "jump-statements", nextLabel: "Next: Jump Statements →" }
    },
    {
      id: "jump-statements",
      title: "Jump Statements: goto, break & continue",
      content: `**10.6 Jump Statements**

Jump statements interrupt the normal flow of a program. C++ has three: **goto**, **break**, **continue**.

**10.6.1 goto Statement**

Transfers control from one place to another *unconditionally*, using a labeled target:
\`\`\`
goto label;
...
label:
...
\`\`\`
(or the label can appear before the goto, for a "backward jump"). When \`goto label;\` executes, control jumps directly to \`label:\` and continues from there.

**10.6.2 break Statement**

Terminates the execution of a loop (or switch) immediately — control transfers to the statement right after the loop/switch body. Used inside for, while, do-while, and switch. When break executes, the enclosing loop stops entirely, regardless of the loop's normal test condition.

**10.6.3 continue Statement**

Similar to break, but instead of terminating the loop, it skips the remaining code in the current iteration and forces the loop to proceed to its **next** iteration (re-checking the test condition, or running the update expression first in a for loop).

**Difference between break and continue:**

| Break | Continue |
|---|---|
| Terminates execution of the loop | Does NOT terminate the loop |
| Breaks the iteration entirely | Skips only the current iteration |
| Control exits the loop, moves to the statement after it | Control jumps to the next iteration of the loop |
| Used with loops as well as switch | Used only in loops, not in switch |`,
      nav: { back: "iteration-while-nested", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- A computer program is a set of statements/instructions to perform a specific task.
- There are two kinds of statements in C++: Null (empty) and Compound (block) statements.
- Control statements alter the sequence of flow — the three kinds are Sequence, Selection, and Iteration statements.
- if and switch are Selection statements; the Conditional (?:) Operator is an alternative to if-else; switch is a multi-way branching statement.
- Iteration (looping) statements execute a set of statements repeatedly until a condition is satisfied — C++ supports three: for, while, do-while.
- for and while are entry-controlled loops (test-expression checked before the body runs); do-while is exit-controlled (body runs at least once, tested after).
- Three Jump statements are used in C++: goto, break, and continue — break terminates a loop entirely; continue skips to the next iteration.`,
      nav: { back: "jump-statements", practice: true }
    }
  ]
}
