// frontend/web/src/content/Class_12/ComputerApplications/chapters/chapter-07-php-loops.js

export default {
  eyebrow: "Chapter 7 · Class 12 Computer Applications",
  title: "Loops in PHP",
  author: "",
  pills: ["Theory", "Programming", "Board Exam Important"],

  tabs: [

    // ── TAB 1 — for & while loops ────────────────────────────────────────────
    {
      id: "for-while",
      label: "for & while",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Imagine printing numbers 1 to 100. Would you write echo 100 times? No! A loop does the job in 3 lines. A loop executes a block of code repeatedly until a condition is met. This chapter covers 4 loop types — all appear in board exam Part III and Part IV questions!</p>",
        },
        {
          type: "section-head",
          text: "7.1 Loops in PHP — 4 Types",
        },
        {
          type: "gloss-row",
          word: "Loop",
          def: "A control structure that executes a set of instructions (a block of code) repeatedly for a certain number of times or until a certain condition is met.",
        },
        {
          type: "gloss-row",
          word: "4 Types of Loops",
          def: "1. for loop, 2. while loop, 3. do...while loop, 4. foreach loop.",
        },
        {
          type: "section-head",
          text: "7.2 for Loop",
        },
        {
          type: "gloss-row",
          word: "for loop",
          def: "Called the entry-check loop. Used to execute a block of code a SPECIFIC NUMBER of times. The condition is checked BEFORE each iteration.",
        },
        {
          type: "quote-block",
          quote: "for (initialization; condition; increment/decrement) { //code to be executed; }",
          context: "",
        },
        {
          type: "gloss-row",
          word: "initialization",
          def: "Executed ONLY ONCE at the beginning. Used to initialize the loop variable. Example: $i = 1",
        },
        {
          type: "gloss-row",
          word: "condition",
          def: "Evaluated BEFORE EACH iteration. If true, code block executes. If false, loop terminates. Example: $i <= 5",
        },
        {
          type: "gloss-row",
          word: "increment/decrement",
          def: "Executed AFTER EACH iteration. Updates the loop variable. Example: $i++ (increment) or $i-- (decrement)",
        },
        {
          type: "gloss-row",
          word: "Example 1 — Ascending",
          def: "for ($i = 1; $i <= 5; $i++) { echo $i . \"<br>\"; } Output: 1 2 3 4 5",
        },
        {
          type: "gloss-row",
          word: "Example 2 — Descending",
          def: "for ($i = 5; $i >= 1; $i--) { echo $i . \"<br>\"; } Output: 5 4 3 2 1",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "for ($i = 1; $i <= 10; $i++) { echo \"Student \" . $i; } — Prints Student 1 through Student 10 automatically. Without a loop, you'd need 10 separate echo statements!",
        },
        {
          type: "section-head",
          text: "7.3 while Loop",
        },
        {
          type: "gloss-row",
          word: "while loop",
          def: "Called the entry-check loop. Executes a block of code WHILE a condition is true. Condition is checked BEFORE each iteration. May not execute at all if condition is false from the start.",
        },
        {
          type: "quote-block",
          quote: "while (condition) { //code to be executed; }",
          context: "",
        },
        {
          type: "gloss-row",
          word: "Example",
          def: "$i = 1; while ($i <= 5) { echo $i . \"<br>\"; $i++; } Output: 1 2 3 4 5",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Both for and while are entry-check loops — they check the condition BEFORE executing the code. The key difference: for loop is used when you know the exact number of iterations. while loop is used when you don't know in advance how many times to loop.",
        },
        {
          type: "nav",
          next: "dowhile-foreach",
          nextLabel: "Next: do...while & foreach →",
        },
      ],
    },

    // ── TAB 2 — do...while & foreach ────────────────────────────────────────
    {
      id: "dowhile-foreach",
      label: "do...while & foreach",
      blocks: [
        {
          type: "section-head",
          text: "7.4 do...while Loop",
        },
        {
          type: "gloss-row",
          word: "do...while loop",
          def: "Called the exit-check loop. Similar to while, but the code block is ALWAYS executed at least ONCE, even if the condition is false. Condition is checked AFTER each iteration.",
        },
        {
          type: "quote-block",
          quote: "do { //code to be executed; } while (condition);",
          context: "",
        },
        {
          type: "gloss-row",
          word: "Example",
          def: "$i = 1; do { echo $i . \"<br>\"; $i++; } while ($i <= 5); Output: 1 2 3 4 5",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "Think of a vending machine: do { dispense item; } while (more coins inserted). The machine always dispenses at least once before checking if more coins are added.",
        },
        {
          type: "section-head",
          text: "7.4.1 while vs do...while — Key Differences",
        },
        {
          type: "gloss-row",
          word: "Execution Order",
          def: "while: checks condition FIRST, then executes. do...while: executes FIRST, then checks condition.",
        },
        {
          type: "gloss-row",
          word: "Minimum Iterations",
          def: "while: may execute ZERO times if condition is false from the start. do...while: ALWAYS executes at least ONCE, even if condition is false.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "while = entry-check loop (condition checked first). do...while = exit-check loop (condition checked after). The difference in minimum iterations is the most asked distinction in Part III questions.",
        },
        {
          type: "section-head",
          text: "7.5 foreach Loop",
        },
        {
          type: "gloss-row",
          word: "foreach loop",
          def: "Used specifically to iterate over elements of an ARRAY. Automatically goes through each element one by one. Cannot be used with non-array variables.",
        },
        {
          type: "quote-block",
          quote: "foreach ($array as $value) { //code to be executed; }",
          context: "",
        },
        {
          type: "gloss-row",
          word: "Example — Indexed Array",
          def: "$array = array(1, 2, 3, 4, 5); foreach ($array as $value) { echo $value . \"<br>\"; } Output: 1 2 3 4 5",
        },
        {
          type: "gloss-row",
          word: "foreach with Associative Array",
          def: "foreach ($array as $key => $value) { echo $key . \" => \" . $value . \"<br>\"; } — iterates over both keys and values.",
        },
        {
          type: "gloss-row",
          word: "Example — Associative Array",
          def: "$array = array(\"a\"=>1, \"b\"=>2, \"c\"=>3); foreach ($array as $key => $value) { echo $key . \" => \" . $value; } Output: a=>1, b=>2, c=>3",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "foreach is the ONLY loop designed specifically for arrays. It is simpler than using a for loop with array indexes. Use foreach when you need to process every element in an array. For associative arrays use: foreach ($arr as $key => $value).",
        },
        {
          type: "section-head",
          text: "Summary of All 4 Loops",
        },
        {
          type: "gloss-row",
          word: "for loop",
          def: "Entry-check. Known number of iterations. Syntax: for (init; condition; increment).",
        },
        {
          type: "gloss-row",
          word: "while loop",
          def: "Entry-check. Unknown number of iterations. Syntax: while (condition).",
        },
        {
          type: "gloss-row",
          word: "do...while loop",
          def: "Exit-check. Always runs at least once. Syntax: do { } while (condition);",
        },
        {
          type: "gloss-row",
          word: "foreach loop",
          def: "For arrays only. Automatically iterates all elements. Syntax: foreach ($array as $value).",
        },
        {
          type: "nav",
          back: "for-while",
          practice: true,
        },
      ],
    },

  ],
}
