export default {
  chapterNumber: 2,
  title: "Number Systems",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: `The word *data* comes from *datum*, meaning a raw fact. Data is a fact about people, places, or objects. When data is processed, it becomes information.

Computers handle all data in the form of **0** and **1** — called **binary digits** or **bits**. Any number, alphabet, or special character must be converted into 0s and 1s for the computer to understand. This is called **Machine Language**.`
    },
    {
      id: "data-representation",
      title: "Data Representations",
      content: `**Units of Data:**

| Unit | Size |
|------|------|
| Bit | 0 or 1 (basic unit) |
| Nibble | 4 bits |
| Byte | 8 bits (basic unit of memory measurement) |
| Kilobyte (KB) | 1024 bytes (2¹⁰) |
| Megabyte (MB) | 1024 KB (2²⁰) |
| Gigabyte (GB) | 1024 MB (2³⁰) |
| Terabyte (TB) | 1024 GB (2⁴⁰) |
| Petabyte (PB) | 2⁵⁰ bytes |
| Exabyte (EB) | 2⁶⁰ bytes |
| Zettabyte (ZB) | 2⁷⁰ bytes |
| Yottabyte (YB) | 2⁸⁰ bytes |

**Word length** refers to the number of bits processed by a CPU in a single instruction. Modern computers use 32-bit or 64-bit word lengths. A 64-bit computer can process 64-bit numbers in one operation; a 32-bit computer must break them into smaller pieces, making it slower.`
    },
    {
      id: "number-systems",
      title: "Types of Number Systems",
      content: `A number system is a way of representing numbers. Each is identified by its **base value (radix)** — the count of digits used.

| System | Base | Digits Used |
|--------|------|-------------|
| Decimal | 10 | 0–9 |
| Binary | 2 | 0, 1 |
| Octal | 8 | 0–7 |
| Hexadecimal | 16 | 0–9, A–F |

In hexadecimal: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.

**Positional Notation:** Each digit's value depends on its position. Every position is a power of the base.

Example (Decimal): (123)₁₀ = 1×10² + 2×10¹ + 3×10⁰ = 100 + 20 + 3 = 123

Example (Binary): (1101)₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = (13)₁₀

In binary, the leftmost bit is the **Most Significant Bit (MSB)** and the rightmost is the **Least Significant Bit (LSB)**.`
    },
    {
      id: "conversions",
      title: "Number System Conversions",
      content: `**Decimal to Binary (Repeated Division by 2):**
Divide the number repeatedly by 2 and collect remainders from bottom to top (MSB to LSB).

Example: (65)₁₀ → 65÷2=32 R1, 32÷2=16 R0, 16÷2=8 R0, 8÷2=4 R0, 4÷2=2 R0, 2÷2=1 R0, stop.
Reading remainders bottom to top: **(1000001)₂**

**Decimal to Octal (Repeated Division by 8):**
Same method but divide by 8.
Example: (65)₁₀ → 65÷8=8 R1, 8÷8=1 R0, stop → **(101)₈**

**Decimal to Hexadecimal (Repeated Division by 16):**
Same method but divide by 16.
Example: (31)₁₀ → 31÷16=1 R15(F) → **(1F)₁₆**

---

**Decimal Fraction to Binary (Repeated Multiplication by 2):**
Multiply the fractional part by 2 and collect the integer parts from top to bottom.
Example: (0.2)₁₀ → 0.2×2=0.4(0), 0.4×2=0.8(0), 0.8×2=1.6(1), 0.6×2=1.2(1), 0.2×2=0.4(0)… → **(0.00110011…)₂**

---

**Binary to Decimal (Positional Notation):**
Multiply each bit by its positional weight (power of 2) and add.
Example: (111011)₂ = 32+16+8+0+2+1 = **(59)₁₀**

**Binary to Octal:**
Group binary digits in sets of 3 from right. Convert each group.
Example: (11010110)₂ → 011 010 110 → 3 2 6 → **(326)₈**

**Binary to Hexadecimal:**
Group binary digits in sets of 4 from right. Convert each group.
Example: (1111010110)₂ → 0011 1101 0110 → 3 D 6 → **(3D6)₁₆**

---

**Octal to Decimal:** Use positional notation with powers of 8.
Example: (1265)₈ = 1×8³ + 2×8² + 6×8¹ + 5×8⁰ = 512+128+48+5 = **(693)₁₀**

**Octal to Binary:** Write 3-bit binary equivalent for each octal digit.
Example: (6213)₈ → 110 010 001 011 → **(110010001011)₂**

**Hexadecimal to Decimal:** Use positional notation with powers of 16.
Example: (25F)₁₆ = 2×16² + 5×16¹ + 15×16⁰ = 512+80+15 = **(607)₁₀**

**Hexadecimal to Binary:** Write 4-bit binary equivalent for each hex digit.
Example: (8BC)₁₆ → 1000 1011 1100 → **(100010111100)₂**`
    },
    {
      id: "signed-numbers",
      title: "Binary Representation for Signed Numbers",
      content: `Computers represent both positive (unsigned) and negative (signed) numbers. There are three methods:

**1. Signed Magnitude Representation**
The leftmost bit (MSB) is the sign bit: **0 = positive, 1 = negative**. The remaining 7 bits hold the magnitude (value).

Example:
- +43 → 0 0101011
- −43 → 1 0101011

**2. 1's Complement**
Used for negative numbers. Steps:
1. Convert the decimal number to 8-bit binary.
2. Invert all bits (change 0→1 and 1→0).

Example: 1's complement of (−24)₁₀:
- Binary of 24 = 00011000
- Invert → **11100111**

**3. 2's Complement**
Steps:
1. Find the 1's complement.
2. Add 1 to the LSB.

Example: 2's complement of (−24)₁₀:
- 1's complement of 24 = 11100111
- Add 1 → **11101000**`
    },
    {
      id: "binary-arithmetic",
      title: "Binary Arithmetic",
      content: `**Binary Addition Rules:**

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

When 1+1=10: sum is 0 and carry 1 moves to the next position.

Example: 1011₂ + 1001₂ = 10100₂ (which equals 20 in decimal: 11 + 9 = 20)

**Adding Signed Numbers (using 2's Complement):**
Example: (−21)₁₀ + (5)₁₀
- 2's complement of −21 = 11101011
- Binary of 5 = 00000101
- Add → 11110000 (ignore carry out) = (−16)₁₀ ✓

---

**Binary Subtraction Rules:**

| A | B | Difference | Borrow |
|---|---|-----------|--------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |

When subtracting 1 from 0, borrow 1 from the next more significant bit that contains 1; all 0s up to that point become 1s.`
    },
    {
      id: "character-encoding",
      title: "Representing Characters in Memory",
      content: `All input data must be in a format the computer can understand. Characters (26 uppercase, 26 lowercase, digits 0–9, special characters) are represented by numbers using an **encoding system**.

**BCD (Binary Coded Decimal):** A 6-bit encoding system; can handle only 64 characters. No longer in use.

**ASCII (American Standard Code for Information Interchange):** Most popular encoding; recognized by the United States. 7-bit system → 128 characters (0–127). Extended ASCII-8 uses 8 bits → 256 characters. Handles English characters only.
- Uppercase A–Z: ASCII values 65–90
- Lowercase a–z: ASCII values 97–122
- Digits 0–9: ASCII values 48–57
- Blank space: ASCII value 32

**EBCDIC (Extended Binary Coded Decimal Interchange Code):** 8-bit system; can handle 256 characters. Developed by IBM. Can be converted to/from ASCII.

**ISCII (Indian Standard Code for Information Interchange):** 8-bit system handling 256 Indian language characters. Developed by the Department of Electronics in India (1986–88); now integrated with Unicode.

**Unicode:** Modern standard used in most computers. 16-bit code → can handle 65,536 characters. Covers all universal languages including Tamil, Malayalam, Telugu, and Kannada. Represented by hexadecimal numbers.`
    }
  ]
}
