export default {
  "meta": {
    "subject": "Computer Science -- Class XI",
    "unit": "Chapter 7 -- Composition and Decomposition",
    "time": "2.30 hrs",
    "totalMarks": 47,
    "instructions": "Samacheer Kalvi -- Answer all questions"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "Part I -- MCQ (8 x 1)",
      "title": "Part I -- Choose the Correct Answer",
      "type": "mcq",
      "scoreMax": 8,
      "marksPer": 1,
      "sections": [
        {
          "label": "Composition and Decomposition",
          "questions": [
            {
              "id": "q1",
              "html": "Suppose u, v = 10, 5 before the assignment. What are the values of u and v after the sequence: (1) u := v  (2) v := u ?",
              "options": ["a) u, v = 5, 5", "b) u, v = 5, 10", "c) u, v = 10, 5", "d) u, v = 10, 10"],
              "answer": 0,
              "hint": "These are sequential (not simultaneous) assignments. Line 1: u := v makes u = 5 (v unchanged). Line 2: v := u uses u's NEW value (5), so v also becomes 5. Result: u, v = 5, 5."
            },
            {
              "id": "q2",
              "html": "Which property is true after the assignment at line 3? (1) -- i, j = 0, 0  (2) i, j := i+1, j-1  (3) -- ?",
              "options": ["a) i+j > 0", "b) i+j < 0", "c) i+j = 0", "d) i = j"],
              "answer": 2,
              "hint": "i becomes 1, j becomes -1, so i+j = 1 + (-1) = 0."
            },
            {
              "id": "q3",
              "html": "If C1 is false and C2 is true, which statement executes? (1) if C1 (2) S1 (3) else (4) if C2 (5) S2 (6) else (7) S3",
              "options": ["a) S1", "b) S2", "c) S3", "d) none"],
              "answer": 1,
              "hint": "Since C1 is false, control goes to the nested if C2; since C2 is true, S2 executes."
            },
            {
              "id": "q4",
              "html": "If C is false just before the loop (1) S1 (2) while C (3) S2 (4) S3, the control flows through:",
              "options": ["a) S1 ; S3", "b) S1 ; S2 ; S3", "c) S1 ; S2 ; S2 ; S3", "d) S1 ; S2 ; S2 ; S2 ; S3"],
              "answer": 0,
              "hint": "If C is false before the loop even starts, the loop body S2 never executes — only S1 then S3 run."
            },
            {
              "id": "q5",
              "html": "How many times is the loop iterated? i := 0; while i ≠ 5: i := i + 1",
              "options": ["a) 4", "b) 5", "c) 6", "d) 0"],
              "answer": 1,
              "hint": "i goes 0→1→2→3→4→5, stopping when i=5 — that's 5 iterations of the loop body."
            },
            {
              "id": "q6",
              "html": "A programming language, unlike pseudo code, must:",
              "options": ["a) Use informal English freely", "b) Obey the grammar of the language exactly", "c) Never be translated", "d) Avoid using variables"],
              "answer": 1,
              "hint": "Programming languages are formal — programs must exactly follow the language's grammar, including punctuation."
            },
            {
              "id": "q7",
              "html": "In a flowchart, a diamond-shaped box represents:",
              "options": ["a) A simple statement", "b) An input or output", "c) A condition", "d) The start or end of execution"],
              "answer": 2,
              "hint": "Diamond-shaped boxes in flowcharts represent conditions, with true/false outgoing arrows."
            },
            {
              "id": "q8",
              "html": "Case analysis generalises which type of statement to multiple, exhaustive, disjoint cases?",
              "options": ["a) Sequential statement", "b) Alternative statement", "c) Iterative statement", "d) Assignment statement"],
              "answer": 1,
              "hint": "Case analysis extends the two-way alternative (if/else) statement to multiple cases."
            }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "Part II -- Very Short Answers (5 x 2)",
      "title": "Part II -- Very Short Answers",
      "type": "short_answer",
      "scoreMax": 10,
      "marksPer": 2,
      "sections": [
        {
          "label": "Very Short Answers",
          "questions": [
            {
              "id": "q9",
              "html": "Distinguish between a condition and a statement.",
              "answer": "A condition is a phrase that describes a test of the state — it evaluates to true or false and is used to decide the flow of control (e.g., in alternative or iterative statements). A statement is a phrase that commands the computer to perform an action, such as an assignment statement that changes a variable's value.",
              "hint": "Condition = a true/false test of state; Statement = a command that performs an action."
            },
            {
              "id": "q10",
              "html": "Both conditional statement and iterative statement have a condition and a statement. How do they differ?",
              "answer": "A conditional statement ('if C then S') tests the condition C only once — if true, S executes once; if false, nothing happens, and control moves on. An iterative statement ('while C do S') repeatedly tests C and executes S as many times as C remains true, only stopping (and moving on) once C becomes false.",
              "hint": "Conditional: tests once, executes S at most once. Iterative: tests and executes repeatedly until C becomes false."
            },
            {
              "id": "q11",
              "html": "What is the difference between an algorithm and a program?",
              "answer": "An algorithm is a general sequence of instructions to solve a problem, which can be expressed in different notations (pseudo code, flowchart, or programming language). A program is specifically an algorithm expressed in a formal programming language (like C++ or Python), which a computer can actually execute after translation.",
              "hint": "Algorithm = general step-by-step solution (notation-independent); Program = algorithm written in a specific programming language."
            },
            {
              "id": "q12",
              "html": "Why is a function an abstraction?",
              "answer": "A function is an abstraction because it hides the details of how a sub-problem is solved, exposing only its specification (input property and input-output relation) to the user. Users of the function only need to know what it does, not how it is implemented internally — it can be used as a 'black box'.",
              "hint": "It hides implementation details, exposing only its specification (what it does, not how)."
            },
            {
              "id": "q13",
              "html": "How do we refine a statement?",
              "answer": "We refine a statement by expanding it into a more detailed sequence of smaller steps. Each of these steps can then be further expanded into even finer steps, and this expansion can be repeated at successive levels until the steps are simple enough to execute directly or be expressed as a program.",
              "hint": "By expanding it into a more detailed sequence of smaller sub-steps, repeated at successive levels of detail."
            }
          ]
        }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Short Answers (3 x 3)",
      "title": "Part III -- Short Answers",
      "type": "brief_answer",
      "scoreMax": 9,
      "marksPer": 3,
      "sections": [
        {
          "label": "Short Answers",
          "questions": [
            {
              "id": "q14",
              "html": "For the flowchart: condition C, true→S1, false→S2 (both leading to the box after), write the pseudo code.",
              "answer": "The pseudo code for this alternative control flow is:\n\nif C\n    S1\nelse\n    S2\n\nThis means: test condition C; if it is true, execute statement S1; if it is false, execute statement S2. After either branch, control continues to the statement following the alternative statement.",
              "hint": "if C: S1, else: S2 — the standard alternative statement structure."
            },
            {
              "id": "q15",
              "html": "If C is false in line 2, trace the control flow: (1) S1 (2) -- C is false (3) if C (4) S2 (5) else (6) S3 (7) S4",
              "answer": "Since C is false at line 3, the alternative statement executes the else branch. Control flow: S1 executes first (line 1). Then the condition C at line 3 is tested and found false, so S2 (line 4) is skipped, and S3 (line 6, the else branch) executes instead. Finally, S4 (line 7) executes after the alternative statement completes. So the overall execution order is: S1, S3, S4.",
              "hint": "S1 always runs first; since C is false, the else branch S3 runs (not S2); then S4 runs after."
            },
            {
              "id": "q16",
              "html": "What is case analysis?",
              "answer": "Case analysis is a control flow technique that generalises the alternative (if/else) statement to multiple cases. It splits a problem into an exhaustive set of disjoint cases (case C1, case C2, case C3, else), and for each case, the problem is solved independently with its own statement. The conditions are evaluated in order, and the statement corresponding to the first true condition is executed; if none are true, a default (else) case executes.",
              "hint": "Generalises if/else to multiple exhaustive, disjoint cases, executing the statement for the first true condition."
            }
          ]
        }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Explain in Detail (4 x 5)",
      "title": "Part IV -- Explain in Detail",
      "type": "long_essay",
      "scoreMax": 20,
      "marksPer": 5,
      "sections": [
        {
          "label": "Long Answers",
          "questions": [
            {
              "id": "q17",
              "html": "Exchange the contents: Given two glasses A (apple drink) and B (grape drink). Write the specification for exchanging the contents, and write a sequence of assignments to satisfy the specification.",
              "answer": "Specification:\nexchange_contents\n-- inputs: A = apple, B = grape\n-- outputs: A = grape, B = apple\n\nSequence of assignments (using a temporary variable temp, since two variables cannot be directly swapped without an intermediate, in a strictly sequential — not simultaneous — assignment style):\n\n1. -- A, B = apple, grape\n2. temp := A\n3. -- temp, A, B = apple, apple, grape\n4. A := B\n5. -- temp, A, B = apple, grape, grape\n6. B := temp\n7. -- temp, A, B = apple, grape, apple\n\nAfter this sequence, A = grape and B = apple, achieving the desired output relation. (Alternatively, if simultaneous assignment is allowed, a single statement A, B := B, A achieves the same result directly, since both right-side values are read using the OLD values of A and B before either is updated.)",
              "hint": "Use a temp variable: temp:=A; A:=B; B:=temp — or the single simultaneous assignment A,B:=B,A."
            },
            {
              "id": "q18",
              "html": "Circulate the contents: Write the specification and construct an algorithm to circulate the contents of variables A, B and C, where B gets the value of A, C gets the value of B, and A gets the value of C.",
              "answer": "Specification:\ncirculate(A, B, C)\n-- inputs: A = A0, B = B0, C = C0\n-- outputs: A = C0, B = A0, C = B0\n\nAlgorithm using simultaneous assignment (all right-side expressions evaluated using OLD values before any variable is updated):\n\nA, B, C := C, A, B\n\nThis correctly circulates the values in one step: the new A gets the old C, the new B gets the old A, and the new C gets the old B — matching the desired output relation exactly.",
              "hint": "A, B, C := C, A, B in one simultaneous assignment statement (uses old values of all three)."
            },
            {
              "id": "q19",
              "html": "Decanting problem: Given three bottles of capacities 5L, 8L and 3L. The 8L bottle is filled with oil, the other two are empty. Divide the oil into two equal quantities (4L each). Represent the state, give the initial and final states, and describe the process using assignments.",
              "answer": "Let the state be represented by three variables x, y, z holding the amount of oil in the 8L, 5L, and 3L bottles respectively.\n\nInitial state: x, y, z = 8, 0, 0\nFinal state (goal): x, y, z = 4, 4, 0 (oil split equally into the 8L and 5L bottles)\n\nDecanting from one bottle to another is modeled by an assignment that transfers oil up to the receiving bottle's capacity or until the source is empty, whichever comes first. A sequence of pours to reach the goal:\n\n1. -- x, y, z = 8, 0, 0\n2. Pour 8L→5L (fill the 5L bottle): x, y, z := 3, 5, 0\n3. Pour 5L→3L (fill the 3L bottle): x, y, z := 3, 2, 3\n4. Pour 3L→8L (empty 3L into 8L): x, y, z := 6, 2, 0\n5. Pour 5L→3L (empty 5L into 3L): x, y, z := 6, 0, 2\n6. Pour 8L→5L (fill the 5L bottle): x, y, z := 1, 5, 2\n7. Pour 5L→3L (top up the 3L bottle from 2L to its 3L capacity, taking 1L from the 5L bottle): x, y, z := 1, 4, 3\n8. Pour 3L→8L (empty 3L into 8L): x, y, z := 4, 4, 0\n\nThis reaches the goal state x, y, z = 4, 4, 0, with the oil split equally between the 8L and 5L bottles.",
              "hint": "State = (oil in 8L, oil in 5L, oil in 3L); initial (8,0,0), goal (4,4,0); pour oil step-by-step respecting bottle capacities."
            },
            {
              "id": "q20",
              "html": "Trace the step-by-step execution of the algorithm for factorial(4): f, i := 1, 1; while i ≤ n: f, i := f × i, i + 1",
              "answer": "For factorial(4), n = 4. Tracing the loop, where each row shows the values at the end of an iteration:\n\nInitial (before loop): f, i = 1, 1\n\nIteration 1: condition (i ≤ n) = (1 ≤ 4) true → f, i := f×i, i+1 = 1×1, 2 = 1, 2\nIteration 2: condition (2 ≤ 4) true → f, i := 1×2, 3 = 2, 3\nIteration 3: condition (3 ≤ 4) true → f, i := 2×3, 4 = 6, 4\nIteration 4: condition (4 ≤ 4) true → f, i := 6×4, 5 = 24, 5\nCheck: condition (5 ≤ 4) false → loop ends\n\nFinal result: f = 24, i = 5. Since 4! = 4×3×2×1 = 24, the algorithm correctly computes factorial(4) = 24.",
              "hint": "Trace f,i through each iteration: (1,1)→(1,2)→(2,3)→(6,4)→(24,5), loop ends when i>4, giving f=24=4!."
            }
          ]
        }
      ]
    }
  ]
}
