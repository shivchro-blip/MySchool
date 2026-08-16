export default {
  "meta": {
    "subject": "Computer Science -- Class XI",
    "unit": "Chapter 6 -- Specification and Abstraction",
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
          "label": "Specification and Abstraction",
          "questions": [
            {
              "id": "q1",
              "html": "Which of the following activities is algorithmic in nature?",
              "options": ["a) Assemble a bicycle", "b) Describe a bicycle", "c) Label the parts of a bicycle", "d) Explain how a bicycle works"],
              "answer": 0,
              "hint": "Assembling involves a step-by-step sequence of instructions — the definition of an algorithm."
            },
            {
              "id": "q2",
              "html": "Which of the following activities is NOT algorithmic in nature?",
              "options": ["a) Multiply two numbers", "b) Draw a kolam", "c) Walk in the park", "d) Swapping of two numbers"],
              "answer": 2,
              "hint": "Walking in the park (with no defined steps or goal) has no step-by-step procedure to follow, unlike the others."
            },
            {
              "id": "q3",
              "html": "Omitting details inessential to the task and representing only the essential features of the task is known as:",
              "options": ["a) Specification", "b) Abstraction", "c) Composition", "d) Decomposition"],
              "answer": 1,
              "hint": "Ignoring irrelevant details and modeling only essential features is the definition of abstraction."
            },
            {
              "id": "q4",
              "html": "Stating the input property and the input-output relation of a problem is known as:",
              "options": ["a) Specification", "b) Statement", "c) Algorithm", "d) Definition"],
              "answer": 0,
              "hint": "The specification of an algorithm is exactly the input property plus the desired input-output relation."
            },
            {
              "id": "q5",
              "html": "Ensuring the input-output relation is:",
              "options": ["a) the responsibility of the algorithm and the right of the user", "b) the responsibility of the user and the right of the algorithm", "c) the responsibility of the algorithm but not the right of the user", "d) the responsibility of both the user and the algorithm"],
              "answer": 0,
              "hint": "The designer/algorithm is responsible for the input-output relation, which is a right the user can expect."
            },
            {
              "id": "q6",
              "html": "If i = 5 before the assignment i := i - 1, after the assignment, the value of i is:",
              "options": ["a) 5", "b) 4", "c) 3", "d) 2"],
              "answer": 1,
              "hint": "i - 1 = 5 - 1 = 4."
            },
            {
              "id": "q7",
              "html": "If 0 < i before the assignment i := i - 1, after the assignment we can conclude that:",
              "options": ["a) 0 < i", "b) 0 ≤ i", "c) i = 0", "d) 0 ≥ i"],
              "answer": 1,
              "hint": "If i was at least 1 before (since 0 < i means i ≥ 1 for integers), then i-1 is at least 0, so 0 ≤ i afterward."
            },
            {
              "id": "q8",
              "html": "The assignment operator := is different from the equality operator = because it:",
              "options": ["a) States a mathematical equality", "b) Changes the value of a variable", "c) Never involves variables", "d) Only works with numbers"],
              "answer": 1,
              "hint": "Assignment changes/stores a value into a variable — it does not merely state that two things are equal."
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
              "html": "Define an algorithm.",
              "answer": "An algorithm is a sequence of instructions to accomplish a task or solve a problem. When the instructions are executed, a process evolves which accomplishes the intended task or solves the given problem.",
              "hint": "A sequence of instructions to accomplish a task or solve a problem."
            },
            {
              "id": "q10",
              "html": "Distinguish between an algorithm and a process.",
              "answer": "An algorithm is the sequence of instructions itself — a static description of steps to solve a problem, like a recipe. A process is what evolves when those instructions are executed — the dynamic activity of carrying out the algorithm, like the act of cooking following the recipe.",
              "hint": "Algorithm = the static sequence of instructions (recipe); Process = the dynamic execution/activity (cooking)."
            },
            {
              "id": "q11",
              "html": "Initially, farmer, goat, grass, wolf = L, L, L, L, and the farmer crosses the river with the goat. Model the action with an assignment statement.",
              "answer": "The action can be modeled as: farmer, goat := R, R. This assignment changes only the farmer's and the goat's side to R (right), while grass and wolf remain unchanged at L.",
              "hint": "farmer, goat := R, R (both cross together; grass and wolf are unaffected)."
            },
            {
              "id": "q12",
              "html": "Specify a function to find the minimum of two numbers.",
              "answer": "minimum(a, b)\n-- inputs: a, b\n-- outputs: result = a ↓ b   (where a ↓ b denotes the minimum of a and b)",
              "hint": "Name, inputs (a, b), and outputs (result equals the smaller of a and b)."
            },
            {
              "id": "q13",
              "html": "If √2 = 1.414, and the square_root() function returns -1.414, does it violate the specification: square_root(x) -- inputs: x is a real number, x ≥ 0 -- outputs: y is a real number such that y² = x?",
              "answer": "No, it does not violate the specification. The specification only requires that y² = x — it does not state that the output must specifically be the positive square root. Since (-1.414)² = 2, returning -1.414 satisfies the given output relation, even though it is the negative root.",
              "hint": "The spec only requires y² = x, not that y be positive — so the negative root also satisfies it."
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
              "html": "When do you say that a problem is algorithmic in nature?",
              "answer": "A problem is said to be algorithmic in nature when its solution involves the construction of an algorithm — that is, a sequence of instructions that, when executed with given input data, produces the desired output data satisfying a specified input-output relation. Some algorithmic problems don't require constructing a new algorithm; instead, an algorithm is provided and we must prove some of its properties.",
              "hint": "Its solution involves constructing an algorithm (a step-by-step procedure) to reach a specified goal."
            },
            {
              "id": "q15",
              "html": "What is the format of the specification of an algorithm?",
              "answer": "The specification of an algorithm follows a standard three-part format: (1) the name of the algorithm and its inputs; (2) the Input — the property of the inputs, written as a comment starting with '-- inputs:'; (3) the Output — the desired input-output relation, written as a comment starting with '-- outputs:'.",
              "hint": "Name+inputs, then '-- inputs: <property>', then '-- outputs: <relation>'."
            },
            {
              "id": "q16",
              "html": "What is abstraction?",
              "answer": "Abstraction is the process of ignoring or hiding details that are irrelevant to solving a problem, and modeling the problem only by its essential features. It is the most effective mental tool for managing complexity — without adequate abstraction, we risk dealing with unnecessary details that over-complicate the solution.",
              "hint": "Ignoring irrelevant details; modeling only essential features to manage complexity."
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
              "html": "Write the specification of an algorithm hypotenuse whose inputs are the lengths of the two shorter sides of a right-angled triangle, and the output is the length of the third side.",
              "answer": "hypotenuse(a, b)\n-- inputs: a and b are the lengths of the two shorter sides of a right-angled triangle, a > 0, b > 0\n-- outputs: c is a real number such that c² = a² + b² (c is the length of the hypotenuse)\n\nThis specification states that given two positive real numbers representing the shorter sides of a right-angled triangle, the algorithm must produce a value c satisfying the Pythagorean relation c² = a² + b², which is the length of the third side (hypotenuse).",
              "hint": "Name + inputs (a, b > 0), then '-- outputs: c such that c² = a² + b²' following the Pythagorean theorem."
            },
            {
              "id": "q18",
              "html": "Suppose you want to solve the quadratic equation ax² + bx + c = 0 by an algorithm quadratic_solve(a, b, c). You intend to use the formula x = (-b ± √(b²-4ac)) / 2a and are prepared to handle only real number roots. Write a suitable specification.",
              "answer": "quadratic_solve(a, b, c)\n-- inputs: a, b, c are real numbers, a ≠ 0, and b² - 4ac ≥ 0\n-- outputs: x1 and x2 are real numbers such that a×x1² + b×x1 + c = 0 and a×x2² + b×x2 + c = 0\n\nThe input condition a ≠ 0 ensures the equation is genuinely quadratic (not linear), and b² - 4ac ≥ 0 ensures the discriminant is non-negative so the roots are real numbers (as specified, we only handle real roots, not complex ones). The output states that both x1 and x2 must satisfy the original quadratic equation.",
              "hint": "Inputs must ensure a≠0 (truly quadratic) and discriminant ≥0 (real roots); outputs are x1, x2 satisfying the equation."
            },
            {
              "id": "q19",
              "html": "Exchange the contents: Given two glasses marked A and B. Glass A is full of apple drink and glass B is full of grape drink. For exchanging the contents of glasses A and B, represent the state by suitable variables, and write the specification of the algorithm.",
              "answer": "We represent the state of the process by two variables, A and B, holding the drink currently in each glass.\n\nexchange_contents\n-- inputs: A = apple, B = grape\n-- outputs: A = grape, B = apple\n\nThis specification states that if glass A initially contains apple drink and glass B initially contains grape drink, the algorithm must finish with glass A containing grape drink and glass B containing apple drink — their contents fully swapped. (Solving this typically requires a third, empty glass as temporary storage, since directly assigning A,B := B,A on physical glasses isn't possible without an intermediate container — though the specification only concerns the desired input-output relation, not how it's achieved.)",
              "hint": "Variables A, B for glass contents; inputs A=apple,B=grape; outputs A=grape,B=apple (values swapped)."
            },
            {
              "id": "q20",
              "html": "Circulate the contents: Write the specification and construct an algorithm to circulate the contents of variables A, B and C such that B gets the value of A, C gets the value of B, and A gets the value of C.",
              "answer": "Specification:\ncirculate(A, B, C)\n-- inputs: A = A0, B = B0, C = C0 (initial values)\n-- outputs: A = C0, B = A0, C = B0\n\nAlgorithm (using simultaneous assignment, which evaluates all right-side expressions using the OLD values before any variable is updated):\n\nA, B, C := C, A, B\n\nThis single simultaneous assignment statement correctly circulates the values: A receives the old value of C, B receives the old value of A, and C receives the old value of B — matching the required output relation exactly, because in a simultaneous (multi-variable) assignment, all expressions on the right are evaluated first using the current values, before any of the left-side variables are updated.",
              "hint": "Use one simultaneous assignment: A, B, C := C, A, B — since it uses OLD values for all three on the right before updating."
            }
          ]
        }
      ]
    }
  ]
}
