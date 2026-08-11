// frontend/web/src/content/Class_12/ComputerApplications/chapters/chapter-06-php-conditionals.js

export default {
  eyebrow: "Chapter 6 · Class 12 Computer Applications",
  title: "Conditional Statements in PHP",
  author: "",
  pills: ["Theory", "Programming", "Board Exam Important"],

  tabs: [

    // ── TAB 1 — Control Structures & if ─────────────────────────────────────
    {
      id: "if-statement",
      label: "if Statement",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Think about this: if it rains, carry an umbrella. Otherwise, don't. This is exactly how a conditional statement works in PHP — your program makes decisions based on conditions. This chapter covers all 4 types of conditional statements — they appear in Part I, III, and IV of the board exam every year!</p>",
        },
        {
          type: "section-head",
          text: "6.1 Control Statements / Control Structures",
        },
        {
          type: "gloss-row",
          word: "Control Statement / Control Structure",
          def: "Statements that cause a jump of control from one part of a script to another. Two major categories: Conditional statements and Looping statements.",
        },
        {
          type: "think-box",
          label: "Tamil Word Help 🔤",
          text: "Control structure = கட்டுப்பாட்டு அமைப்பு. It decides WHICH part of your code runs and WHEN.",
        },
        {
          type: "section-head",
          text: "6.2 PHP Conditional Statements (4 Types)",
        },
        {
          type: "gloss-row",
          word: "4 Types",
          def: "1. if statement, 2. if...else statement, 3. if...elseif...else statement, 4. switch statement.",
        },
        {
          type: "section-head",
          text: "6.2.1 if Statement",
        },
        {
          type: "gloss-row",
          word: "if statement",
          def: "The simplest conditional statement. A block of code is executed ONLY if a certain condition is true. If the condition is false, the code block is skipped.",
        },
        {
          type: "quote-block",
          quote: "if (condition) { // code to be executed if condition is true; }",
          context: "",
        },
        {
          type: "gloss-row",
          word: "Example",
          def: "$x = 10; if ($x > 5) { echo \"x is greater than 5\"; } Output: x is greater than 5 (because 10 > 5 is true)",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "if (you have enough money) { buy the book; } — If the condition is true, the action happens. If not, nothing happens.",
        },
        {
          type: "nav",
          next: "if-else",
          nextLabel: "Next: if...else Statement →",
        },
      ],
    },

    // ── TAB 2 — if...else & if...elseif...else ───────────────────────────────
    {
      id: "if-else",
      label: "if...else",
      blocks: [
        {
          type: "section-head",
          text: "6.2.2 if...else Statement",
        },
        {
          type: "gloss-row",
          word: "if...else statement",
          def: "Executes one block of code if a condition is true, and ANOTHER block if the condition is false. Two possible outcomes.",
        },
        {
          type: "quote-block",
          quote: "if (condition) { // True-block; } else { // False-block; }",
          context: "",
        },
        {
          type: "gloss-row",
          word: "Example",
          def: "$x = 10; if ($x > 5) { echo \"x is greater than 5\"; } else { echo \"x is not greater than 5\"; } Output: x is greater than 5",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "if (mark >= 35) { echo \"Pass\"; } else { echo \"Fail\"; } — Every student either passes or fails. Two paths, one is always taken.",
        },
        {
          type: "section-head",
          text: "6.2.3 if...elseif...else Statement",
        },
        {
          type: "gloss-row",
          word: "if...elseif...else statement",
          def: "Checks MULTIPLE conditions one by one. Starts with 'if', followed by one or more 'elseif', ends with 'else'. Only ONE block executes — the first condition that is true. If all conditions are false, the 'else' block executes.",
        },
        {
          type: "quote-block",
          quote: "if (condition1) { // executes if condition1 is true } elseif (condition2) { // executes if condition1 false, condition2 true } else { // executes if all conditions are false }",
          context: "",
        },
        {
          type: "gloss-row",
          word: "Example",
          def: "$x = 12; if ($x > 20) { echo \"greater than 20\"; } elseif ($x > 15) { echo \"greater than 15\"; } elseif ($x > 10) { echo \"greater than 10 but not 15\"; } else { echo \"not greater than 10\"; } Output: x is greater than 10 but not greater than 15",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "In if...elseif...else: Only ONE block runs — the first true condition wins. If no condition is true, the else block runs. elseif can also be written as two words: else if. These rules are asked in Part II questions.",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "Grading: if (mark >= 90) { grade = A+; } elseif (mark >= 75) { grade = A; } elseif (mark >= 60) { grade = B; } else { grade = C; } Only ONE grade is assigned.",
        },
        {
          type: "nav",
          back: "if-statement",
          next: "switch",
          nextLabel: "Next: switch Statement →",
        },
      ],
    },

    // ── TAB 3 — switch Statement ─────────────────────────────────────────────
    {
      id: "switch",
      label: "switch Statement",
      blocks: [
        {
          type: "section-head",
          text: "6.2.4 switch Statement",
        },
        {
          type: "gloss-row",
          word: "switch statement",
          def: "A multiple branching statement — control is transferred to one of many possible points based on a condition. Used when you need to check one variable against many possible values. More efficient than a long if...elseif...else chain for this purpose.",
        },
        {
          type: "quote-block",
          quote: "switch (expression) { case value1: //code if expression = value1; break; case value2: //code if expression = value2; break; default: //code if expression matches no case; }",
          context: "",
        },
        {
          type: "gloss-row",
          word: "break statement",
          def: "Used to TERMINATE each case and exit the switch statement. If break is missing, execution continues into the next case (called fall-through) — which is usually not wanted.",
        },
        {
          type: "gloss-row",
          word: "default case",
          def: "Optional. Executes if NONE of the other case values match the expression. Like the 'else' in an if...elseif...else chain.",
        },
        {
          type: "gloss-row",
          word: "Example",
          def: "$x = 10; switch ($x) { case 5: echo \"x is 5\"; break; case 10: echo \"x is 10\"; break; case 15: echo \"x is 15\"; break; default: echo \"x is not 5, 10, or 15\"; } Output: x is equal to 10",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "switch ($day) { case \"Monday\": echo \"Start of week\"; break; case \"Friday\": echo \"End of week\"; break; default: echo \"Middle of week\"; } Each day maps to a different output.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "switch vs if...elseif: Both test conditions. switch is used when one expression is tested against many fixed values. The break statement is CRITICAL in switch — without it, all subsequent cases also execute. default is optional but good practice.",
        },
        {
          type: "section-head",
          text: "Key Rules to Remember",
        },
        {
          type: "gloss-row",
          word: "Rule 1",
          def: "Curly braces { } separate the blocks of statements within a control structure.",
        },
        {
          type: "gloss-row",
          word: "Rule 2",
          def: "Condition/expression must be enclosed in parentheses ( ).",
        },
        {
          type: "gloss-row",
          word: "Rule 3",
          def: "elseif can also be written as two separate words: else if.",
        },
        {
          type: "gloss-row",
          word: "Rule 4",
          def: "The break statement in a switch terminates the case and exits the switch.",
        },
        {
          type: "nav",
          back: "if-else",
          practice: true,
        },
      ],
    },

  ],
}
