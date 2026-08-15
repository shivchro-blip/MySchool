export default {
  "meta": {
    "subject": "Computer Science -- Class XI",
    "unit": "Chapter 2 -- Number Systems",
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
          "label": "Number Systems, Boolean Algebra & Logic Gates",
          "questions": [
            {
              "id": "q1",
              "html": "Which refers to the number of bits processed by a computer's CPU?",
              "options": ["a) Byte", "b) Nibble", "c) Word length", "d) Bit"],
              "answer": 2,
              "hint": "Word length is the number of bits a CPU processes in a single instruction."
            },
            {
              "id": "q2",
              "html": "How many bytes does 1 KiloByte contain?",
              "options": ["a) 1000", "b) 8", "c) 4", "d) 1024"],
              "answer": 3,
              "hint": "In the binary system, 1 KB = 2^10 = 1024 bytes."
            },
            {
              "id": "q3",
              "html": "The 1's complement of 00100110 is:",
              "options": ["a) 00100110", "b) 11011001", "c) 11010001", "d) 00101001"],
              "answer": 1,
              "hint": "Invert every bit: change each 0 to 1 and each 1 to 0."
            },
            {
              "id": "q4",
              "html": "Which of the following is not a valid Octal number?",
              "options": ["a) 645", "b) 234", "c) 876", "d) 123"],
              "answer": 2,
              "hint": "Octal digits range only from 0 to 7 — the digit 8 in 876 is invalid."
            },
            {
              "id": "q5",
              "html": "Which is a basic electronic circuit that operates on one or more signals to produce an output signal?",
              "options": ["a) Boolean algebra", "b) Gate", "c) Fundamental gates", "d) Derived gates"],
              "answer": 1,
              "hint": "This is the general definition of a logic gate."
            },
            {
              "id": "q6",
              "html": "Which gate is called the logical inverter?",
              "options": ["a) AND", "b) OR", "c) NOT", "d) XNOR"],
              "answer": 2,
              "hint": "The NOT gate has one input and always outputs the complement of that input."
            },
            {
              "id": "q7",
              "html": "The NOR gate is a combination of:",
              "options": ["a) NOT(OR)", "b) NOT(AND)", "c) NOT(NOT)", "d) NOT(NOR)"],
              "answer": 0,
              "hint": "NOR = an OR gate followed by a NOT (inverter)."
            },
            {
              "id": "q8",
              "html": "NAND is called a(n) ______ gate.",
              "options": ["a) Fundamental Gate", "b) Derived Gate", "c) Logical Gate", "d) Universal Gate"],
              "answer": 3,
              "hint": "NAND (and NOR) can be used to realise every other logic gate — hence 'Universal Gate'."
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
              "html": "What is data?",
              "answer": "Data comes from the word 'datum', meaning a raw fact. It is a fact about people, places, or objects — for example, Name='Rajesh', Age=16. On its own, data conveys no meaningful message until it is processed.",
              "hint": "Raw, unprocessed facts about people, places, or objects."
            },
            {
              "id": "q10",
              "html": "Convert (46)10 into a Binary number.",
              "answer": "Using repeated division by 2: 46÷2=23 r0, 23÷2=11 r1, 11÷2=5 r1, 5÷2=2 r1, 2÷2=1 r0, 1÷2=0 r1. Reading remainders from bottom (MSB) to top (LSB): (46)10 = (101110)2.",
              "hint": "Repeated division by 2, reading the remainders from last to first."
            },
            {
              "id": "q11",
              "html": "We cannot find the 1's complement for (28)10. State the reason.",
              "answer": "1's Complement representation applies only to negative numbers — that is, numbers whose sign bit (MSB) is 1. Since 28 is a positive number, it does not have a 1's complement form; 1's complement is defined specifically to represent negative binary values.",
              "hint": "1's complement is defined only for negative numbers (MSB = 1)."
            },
            {
              "id": "q12",
              "html": "List the encoding systems that represent characters in memory.",
              "answer": "The main character encoding systems are: BCD (Binary Coded Decimal), EBCDIC (Extended Binary Coded Decimal Interchange Code), ASCII (American Standard Code for Information Interchange), ISCII (Indian Standard Code for Information Interchange), and Unicode.",
              "hint": "BCD, EBCDIC, ASCII, ISCII, Unicode."
            },
            {
              "id": "q13",
              "html": "Write a short note on the NAND gate.",
              "answer": "The NAND gate is a combination of the AND and NOT gates — an AND gate followed by an inverter. The output is 'false' (0) only when both inputs are 'true' (1); otherwise the output is 'true'. Its algebraic expression is Y = (A.B)', read as 'NOT of A AND B'. NAND is a Universal Gate, since any other logic gate can be built using only NAND gates.",
              "hint": "AND + NOT; output is 0 only when both inputs are 1; Universal Gate."
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
              "html": "What is the radix of a number system? Give an example.",
              "answer": "The radix (or base) of a number system is the count of the number of digits used in that system — it is the general idea behind a positional numbering system. For example, the Decimal system has a radix of 10 (digits 0–9), the Binary system has a radix of 2 (digits 0,1), the Octal system has a radix of 8 (digits 0–7), and the Hexadecimal system has a radix of 16 (digits 0–9 and A–F).",
              "hint": "Radix = base = count of digits used; give one example system with its radix."
            },
            {
              "id": "q15",
              "html": "Convert (150)10 into Binary, then convert that Binary number to Octal.",
              "answer": "Decimal to Binary (repeated division by 2): 150÷2=75 r0, 75÷2=37 r1, 37÷2=18 r1, 18÷2=9 r0, 9÷2=4 r1, 4÷2=2 r0, 2÷2=1 r0, 1÷2=0 r1. Reading MSB to LSB: (150)10 = (10010110)2.\n\nBinary to Octal: group into 3s from right: 010 010 110 → 2 2 6 → (10010110)2 = (226)8.",
              "hint": "Decimal→Binary by repeated division by 2, then Binary→Octal by grouping in 3s."
            },
            {
              "id": "q16",
              "html": "Write a short note on ISCII.",
              "answer": "ISCII (Indian Standard Code for Information Interchange) is the system used to handle characters of Indian local languages. It is an 8-bit coding system, so it can handle 256 (2^8) characters. It was formulated by the Department of Electronics in India during 1986–88 and is recognized by the Bureau of Indian Standards (BIS). ISCII is now integrated with the Unicode coding system.",
              "hint": "8-bit code for Indian languages; formulated 1986–88; now integrated with Unicode."
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
              "html": "(a) Write the procedure to convert a fractional Decimal number to Binary. (b) Convert (98.46)10 to Binary.",
              "answer": "(a) Procedure: Convert the integer part using repeated division by 2 as usual. For the fractional part, use repeated multiplication by 2: multiply the fraction by 2 and note the integer part (0 or 1); discard that integer part and multiply the remaining fraction by 2 again; repeat until the fraction terminates (becomes 0) or starts repeating. The final answer is written from the first integer part obtained to the last.\n\n(b) Integer part: 98 → 98=64+32+0+0+0+0+0+0+0 → 1100010; check: 64+32+2=98, so 98=1100010(2) (1100010 = 64+32+2=98). Fraction part: 0.46×2=0.92(0), 0.92×2=1.84(1), 0.84×2=1.68(1), 0.68×2=1.36(1), 0.36×2=0.72(0)... approx (0.46)10 ≈ (0.01110)2 to 5 places.\n\nCombining: (98.46)10 ≈ (1100010.01110)2 (rounded to 5 fractional bits, since the fraction is non-terminating).",
              "hint": "Integer part: repeated division by 2. Fraction part: repeated multiplication by 2, keeping the integer digit each time."
            },
            {
              "id": "q18",
              "html": "Find the 1's Complement and 2's Complement for the following decimal numbers: (a) −98  (b) −135",
              "answer": "(a) −98: Binary of 98 (8-bit) = 01100010. 1's complement (invert all bits) = 10011101. 2's complement = 1's complement + 1 = 10011110.\n\n(b) −135: 135 needs more than 8 bits, so use 9-bit representation. Binary of 135 = 010000111. 1's complement = 101111000. 2's complement = 1's complement + 1 = 101111001.",
              "hint": "Convert magnitude to binary, invert all bits for 1's complement, then add 1 for 2's complement."
            },
            {
              "id": "q19",
              "html": "(a) Add 1101010(2) + 101101(2).  (b) Subtract 1101011(2) − 111010(2).",
              "answer": "(a) 1101010 + 0101101 (padded to equal length): adding with carries propagating gives 1101010 + 0101101 = 10011111(2).\n\n(b) 1101011 − 0111010 (padded to equal length): subtracting with borrows gives 1101011 − 0111010 = 0110001(2).",
              "hint": "Align bit widths first, then apply the binary addition/subtraction tables column by column, carrying/borrowing as needed."
            },
            {
              "id": "q20",
              "html": "Explain the fundamental logic gates (AND, OR, NOT) with their expression and truth table.",
              "answer": "AND Gate: Output is true only when both inputs are true. Expression: Y = A.B. Truth table — (0,0)→0, (0,1)→0, (1,0)→0, (1,1)→1.\n\nOR Gate: Output is true if at least one input is true. Expression: Y = A+B. Truth table — (0,0)→0, (0,1)→1, (1,0)→1, (1,1)→1.\n\nNOT Gate: Has a single input; output is always the complement (inverse) of the input. Expression: Y = A' (also written Ā). Truth table — 0→1, 1→0.\n\nThese three gates are called fundamental gates because all other gates (NAND, NOR, XOR, XNOR) can be derived from combinations of them.",
              "hint": "Give the expression and full 4-row (or 2-row for NOT) truth table for each of AND, OR, and NOT."
            }
          ]
        }
      ]
    }
  ]
}
