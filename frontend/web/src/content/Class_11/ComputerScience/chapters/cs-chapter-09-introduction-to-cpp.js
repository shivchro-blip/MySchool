export default {
  chapterNumber: 9,
  title: "Introduction to C++",
  subject: "Computer Science",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-history",
      title: "Introduction & History of C++",
      content: `**9.1 Introduction**

C++ is one of the most popular programming languages, supporting both procedural and Object Oriented Programming paradigms — thus C++ is called a **hybrid language**. C++ is a superset (extension) of its predecessor, the C language. Bjarne Stroustrup named his new language "C with Classes"; the name **C++** was later coined by Rick Mascitti, where ++ is the C language increment operator.

**History:** C++ was developed by Bjarne Stroustrup at AT&T Bell Laboratory during 1979. It is derived from C and influenced by languages like Simula, BCPL, Ada, ML, CLU, and ALGOL 68. Until 1983 it was called "New C" or "C with Classes"; in 1983 Rick Mascitti renamed it C++.

**Benefits of learning C++:**
- Highly portable — often the language of choice for multi-device, multi-platform app development.
- Object-oriented — includes classes, inheritance, polymorphism, data abstraction, and encapsulation.
- Has a rich function library.
- Allows exception handling, inheritance, and function overloading, which are not possible in plain C.
- Powerful, efficient, and fast — used from GUI applications to 3D graphics for games to real-time mathematical simulations.`,
      nav: { next: "character-set-tokens", nextLabel: "Next: Character Set & Tokens →" }
    },
    {
      id: "character-set-tokens",
      title: "Character Set, Keywords & Identifiers",
      content: `**9.2 Character Set**

A character set is the set of characters used to write a C++ program — any alphabet, number, or special symbol available mostly on the keyboard. C++ accepts: Alphabets (A–Z, a–z), Numeric (0–9), Special Characters (+ - * / ~ ! @ # $ % ^ & [ ] ( ) { } = < > _ \\ | ? . , : ' " ;), and White space (blank, tab, carriage return, newline, form feed). C++ can also process any of the 256 ASCII characters as data.

**9.3 Lexical Units (Tokens)**

C++ program statements are constructed from small elements — commands, variables, constants, operators, and punctuators — collectively called **Lexical units**, **Lexical elements**, or **Tokens**. The smallest individual unit in a program is a Token. C++ has these tokens: Keywords, Identifiers, Literals, Operators, and Punctuators.

**9.3.1 Keywords**

Keywords are reserved words that convey specific meaning to the C++ compiler — essential elements for constructing C++ programs. Most keywords are common to C, C++, and Java. C++ is case-sensitive, so all keywords must be in lowercase (examples: int, char, if, else, while, class, public, private, return, void, static, const, etc.). Newer revisions added keywords like using, namespace, static_cast, const_cast, dynamic_cast, true, false. Identifiers containing a double underscore are reserved for C++ implementations/standard libraries and should be avoided by users.

**9.3.2 Identifiers**

Identifiers are user-defined names given to different parts of a C++ program — variables, functions, arrays, classes, etc. — the fundamental building blocks of a program. Rules for naming an identifier:
- The first character must be an alphabet or an underscore (_).
- Only alphabets, digits, and underscore are permitted — no other special characters.
- C++ is case-sensitive — it treats uppercase and lowercase differently.
- Reserved words (keywords) cannot be used as identifier names.
- Per ANSI standards, C++ places no limit on identifier length — all characters are significant.

Examples: \`Num\`, \`NUM\`, \`_add\`, \`total_sales\`, \`tamilMark\` are all valid. But \`num-add\` is invalid (contains a special character), \`this\` is invalid (it's a keyword), and \`2myfile\` is invalid (must start with a letter or underscore). You may use an underscore to separate parts of a name (e.g., total_sales) or capitalize the first letter of subsequent words (camelCase style, e.g., tamilMark).`,
      nav: { back: "intro-history", next: "literals", nextLabel: "Next: Literals (Constants) →" }
    },
    {
      id: "literals",
      title: "Literals (Constants)",
      content: `**9.3.3 Literals (Constants)**

Literals are data items whose values do not change during program execution — hence they are called **Constants**. C++ has several kinds: Numeric Constants (Integer, Real), Boolean Constants, Character Constants, and String Literals.

**Numeric Constants:**

**(1) Integer Constants (Fixed point constants):** Whole numbers without fractions, must have at least one digit and no decimal point; may be signed or unsigned (commas and blank spaces not allowed). Three types:
- **Decimal:** any sequence of digits 0–9 (e.g., 725, -27 valid; 7,500 and 66 5 invalid due to comma/space).
- **Octal:** a sequence of digits 0–7 beginning with 0 (e.g., 012, -027 valid; 0158 invalid, since 8 is not an octal digit).
- **Hexadecimal:** a sequence of digits 0–9, A–F starting with 0x or 0X (e.g., 0x123, 0X568 valid; 0x1,A5 invalid due to comma).

The suffix L/l (long) or U/u (unsigned) added to a constant forces it to be represented as that type — e.g., 45L, 45U.

**(2) Real Constants (Floating point constants):** Numeric constants with a fractional component, written in **fractional form** (a signed/unsigned sequence of digits with a decimal point, at least one digit before and after the point) or **exponent form** (a Mantissa followed by E or e and an integer Exponent). For example, 58000000.00 may be written as 0.58E8. Example conversions: 5.864E1 = 58.64; 5864E-2 = 58.64; 0.5864E2 = 58.64.

**Boolean Literals:** Represent True or False — internally, true has value 1 and false has value 0.

**Character Constant:** Any valid single character enclosed within single quotes, e.g., 'A', '2', '$' (note: "A" with double quotes is NOT a valid character constant). Each character constant has an equivalent ASCII value — e.g., 'A' has value 65.

**Escape Sequences (Non-graphic characters):** Non-printable characters represented by a backslash followed by one or two characters — e.g., \\a (alert bell), \\b (backspace), \\f (form feed), \\n (newline), \\r (carriage return), \\t (horizontal tab), \\v (vertical tab), \\\\ (backslash), \\' (single quote), \\" (double quote), \\? (question mark), \\0 (null). Even though an escape sequence has two characters, it is enclosed in single quotes and occupies one byte in ASCII representation.

**String Literals:** Sequences of characters enclosed within double quotes. By default, a null character \\0 is automatically added at the end — so "welcome" is actually stored as "welcome\\0", occupying 8 bytes (not 7). Valid examples: "A", "Welcome", "1234". Invalid: 'Welcome', '1234' (these use single quotes, making them invalid as strings).`,
      nav: { back: "character-set-tokens", next: "operators", nextLabel: "Next: Operators →" }
    },
    {
      id: "operators",
      title: "Operators",
      content: `**9.3.4 Operators**

Symbols used to perform mathematical or logical operations are called **Operators**; the data items/values they act upon are **Operands**. Operators are classified by number of operands: **Unary** (one operand), **Binary** (two operands), **Ternary** (three operands).

**C++ Binary Operators:** Arithmetic, Relational, Logical, Assignment, and Conditional.

**(1) Arithmetic Operators:** + (Addition), − (Subtraction), * (Multiplication), / (Division — quotient), % (Modulus — remainder; e.g., 10%3=1). These require a minimum of two operands (binary).

**Increment/Decrement (Unary):** ++ adds 1 to its operand; -- subtracts 1. Can be prefix (++x, performs the operation before use) or postfix (x++, performs after use).

**(2) Relational Operators:** Determine the relationship between operands, returning a Boolean result (1=true, 0=false). C++ provides six: > (greater than), < (less than), >= (greater or equal), <= (less or equal), == (equal to), != (not equal). All are binary.

**(3) Logical Operators:** Evaluate logical/relational expressions.
- **&& (AND):** returns 1 (true) only if both expressions are true.
- **|| (OR):** returns 1 (true) if either expression is true; 0 only if both are false.
- **! (NOT):** unary — negates/inverts the truth value of a single operand.

Example (a=5, b=6, c=7): (a<b) && (b<c) = 1 (True); (a>b) && (b<c) = 0 (False); (a<b) || (b>c) = 1 (True); !(a>b) = 1 (True).

**(4) Assignment Operator:** = copies the value on the right to the variable on the left; it is binary. C++ also offers **shorthand (compound) assignment operators**: += (e.g., c = a += 5 means a = a+5), -=, *=, /=, %= — each combines the arithmetic operation with assignment.

**(5) Conditional Operator (Ternary Operator):** ?: is C++'s only ternary operator, used as an alternative to if...else.

**Other Operators:** Comma (,) strings multiple expressions together, evaluated left to right. sizeof is a compile-time operator returning the size of a variable/type in bytes. Pointer operators: * (pointer to a variable), & (address of a variable). Component selectors: . (direct), -> (indirect via pointer). Scope resolution: :: (class member access).

**Precedence of Operators (highest to lowest):** () [] → postfix ++/-- → prefix ++/-- → *, /, % → +, - → <, <=, >, >= → ==, != → && → || → ?: → = → +=,-=,*=,/= → , (comma). Operators execute in this order; the grouping of operands with operators for evaluation is called **Association**.`,
      nav: { back: "literals", next: "punctuators-io", nextLabel: "Next: Punctuators & I/O Operators →" }
    },
    {
      id: "punctuators-io",
      title: "Punctuators & I/O Operators",
      content: `**9.3.5 Punctuators**

Punctuators (also called "Separators") are symbols used as delimiters while constructing a C++ program:
- **Curly braces {}:** mark the start/end of a block of code (a "compound statement").
- **Parenthesis ():** indicate function calls and parameters.
- **Square brackets []:** indicate single/multidimensional arrays.
- **Comma (,):** separator in an expression.
- **Semicolon (;):** every executable statement must terminate with one.
- **Colon (:):** used to label a statement.
- **Comments:** // (single-line) or /* ... */ (multi-line) — ignored by the compiler.

**9.4 I/O Operators**

**9.4.1 Input Operator (>>):** Called the "Stream extraction" or "get from" operator — extracts a value typed on the keyboard and stores it in a variable. It's binary: the first operand is the pre-defined identifier **cin** (identifies the keyboard), and the second must be a variable. Example: \`cin >> num;\`. To read multiple values at once, use >> for each variable — this is called **cascading** — e.g., \`cin >> x >> y;\` reads the first value into x and the next (typed after a space) into y, using space as the separator.

**9.4.2 Output Operator (<<):** Called the "Stream insertion" or "put to" operator — sends strings/values on its right to the object on its left. It's binary: the first operand is the pre-defined identifier **cout** (identifies the monitor), and the second may be a constant, variable, or expression. Example: \`cout << "Welcome";\` sends the string "Welcome" to the screen.

**9.4.3 Cascading of I/O Operators:** Using multiple >> or << operators in a single statement. Example: \`cout << "A=" << Num;\` first sends "A=" then the value of Num. Cascading cin example: \`cin >> a >> b;\` reads two space-separated values into a and b in order.`,
      nav: { back: "operators", next: "first-program", nextLabel: "Next: First C++ Program →" }
    },
    {
      id: "first-program",
      title: "First C++ Program, Execution & Errors",
      content: `**9.5 Sample Program — A First Look**

A basic C++ program structure includes:
1. **Comments** (// ...) — ignored by the compiler, used to document code.
2. **\`#include <iostream>\`** — a preprocessor directive telling the compiler to include the iostream header file, which defines cin and cout. Without it, cin/cout will cause errors.
3. **\`using namespace std;\`** — tells the compiler to use the standard namespace, preventing naming conflicts in large projects (introduced by the ANSI C++ standards committee).
4. **\`int main() { ... }\`** — every C++ program must have a main() function; this is the starting point where execution begins. The statements between its curly braces are the executable "block of code," each terminating with a semicolon. The keyword \`return\` returns a value (e.g., 0) from main() to indicate successful completion.

**9.6 Execution of a C++ Program** — four steps:
1. **Creating Source Code:** Typing/editing valid C++ code per compiler rules.
2. **Saving with extension .cpp**
3. **Compilation:** The compiler links library files with the source code, verifies every line, and reports errors if found; if none, translates the source into a machine-readable **object file** (.obj).
4. **Execution:** The object file becomes an **executable file** (.exe), which can run independently without a compiler or IDE.

**9.7 C++ Development Environment**

An IDE (Integrated Development Environment) makes it easy to create, compile, and execute C++ programs. Many IDEs are open source and free — Dev C++, Geany, Code::Blocks, Code Lite, NetBeans, Digital Mars, Sky IDE, Eclipse. **Dev C++** is commonly used for this course — an open source, cross-platform, full-featured IDE distributed under the GNU General Public License. Basic workflow: File → New → Source File (Ctrl+N) → type and save the program (auto-adds .cpp) → Execute → Compile and Run (or F11) → view any errors in the Compile Log, or the output in the Output Window if successful.

**9.8 Types of Errors**

- **Syntax Error:** Occurs when C++'s grammatical rules are violated — e.g., a missing semicolon at the end of a statement.
- **Semantic Error (Logic Error):** The program is grammatically correct but doesn't produce the expected result, due to wrong use of variables/operators/execution order.
- **Run-time Error:** Occurs during program execution due to an illegal operation — e.g., trying to open a file that doesn't exist.`,
      nav: { back: "punctuators-io", next: "data-types", nextLabel: "Next: Data Types →" }
    },
    {
      id: "data-types",
      title: "Data Types & Memory Allocation",
      content: `**9.10–9.12 Data Types**

Every programming language has two fundamental elements: **data types** and **variables**. In a program, fields are called variables, and their stored values are called data — for example, Name (text), Age (whole number), Average_Mark (fractional number) are all different types of data. Before handling data, C++ requires the compiler to know its type.

**C++ classifies data types into three categories:**
1. **Fundamental (built-in) data types:** int, char, float, double, void.
2. **User-defined data types:** Structure, Union, Class, Enumeration.
3. **Derived data types:** Array, Function, Pointer, Reference.

**9.12.1 The Five Fundamental Data Types:**
- **int:** Accepts and returns only integer numbers; fractional values are truncated (only the integer portion is kept).
- **char:** Accepts/returns valid ASCII characters; often called an integer type since characters are internally represented by their ASCII codes — arithmetic can be performed on char values (e.g., 'A'+1 becomes 'B').
- **float:** Stores floating-point (fractional) values — can represent values between integers and a much greater range, but is slower than integer operations.
- **double:** Double-precision floating point — occupies double the space of float, allowing more precision (more significant digits), but is larger and slower than float.
- **void:** Represents an empty set of values — used as the return type for functions that return nothing.

**9.12.2 Memory Allocation (typical, compiler-dependent):**
| Data type | Bytes | Bits | Range |
|---|---|---|---|
| char | 1 | 8 | -128 to 127 |
| int | 2 (or 4 in Dev C++) | 16 (or 32) | -32,768 to 32,767 (wider in Dev C++) |
| float | 4 | 32 | 3.4×10⁻³⁸ to 3.4×10³⁸ |
| double | 8 | 64 | 1.7×10⁻³⁰⁸ to 1.7×10³⁰⁸ |

Memory allocation varies by compiler — Dev C++ gives 4 bytes to int and long (vs. 2 and 4 respectively in Turbo C++), allowing bigger integers to be handled. The **sizeof()** operator gives the size of a data type in bytes.

**9.12.3 Data Type Modifiers:** Modify (expand/reduce) the storage capacity of a fundamental type (except void) — also called **Qualifiers**. There are four: **signed**, **unsigned**, **long**, **short**. For example, unsigned int stores 0 to 65,535 (no negative values, using the sign bit for magnitude instead); long int uses 4 bytes (double that of a plain int), storing a much wider range.

**Number Suffixes:** L or l forces long representation; U or u forces unsigned; F forces floating point (e.g., 45L, 45U, 3.14F).`,
      nav: { back: "first-program", next: "variables", nextLabel: "Next: Variables →" }
    },
    {
      id: "variables",
      title: "Variables",
      content: `**9.13 Variables**

Variables are user-defined names assigned to specific memory locations where values are stored — since they are named locations, they are called **symbolic variables**, and must follow identifier naming rules. Every variable has two associated values:
- **R-value:** the data stored in the memory location.
- **L-value:** the memory address where the R-value is stored.

**9.13.1 Declaration of Variables:** Every variable must be declared before use — this instructs the compiler to allocate memory according to the specified type. Syntax: \`<data type> <variable name>;\` — e.g., \`int num1;\`. Multiple variables of the same type can be declared together, separated by commas: \`int num1, num2, sum;\`. If declared without an initial value, the memory holds an unknown "Junk" or "Garbage" value until assigned.

**9.13.2 Initialization:** Assigning an initial value during declaration — e.g., \`int num = 100;\`. This value can be changed later during execution.

**9.13.3 Dynamic Initialization:** Initializing a variable during program execution, often using the values of other variables computed at runtime — e.g., \`int sum = num1 + num2;\` (where num1, num2 were read via cin earlier in the program). This combines declaration and computed initialization into a single dynamic statement.

**9.13.4 The Access Modifier const:** The keyword **const** declares a constant — it modifies/restricts a variable's accessibility, so it's called an **Access modifier**. For example, \`const int num = 100;\` makes num's value fixed at 100 for the entire program — any attempt to modify it (e.g., \`num = num + 1;\`) causes a compile error such as "Cannot modify the const object."

**9.13.5 References:** A reference provides an **alias** (an alternate name) for a previously defined variable. Declared using the base type and an & (ampersand) symbol. Syntax: \`<type> <& reference_variable> = <original_variable>;\`. For example, \`int &temp = num;\` makes temp an alias for num — changing num also changes what temp reflects, since they refer to the same memory location.`,
      nav: { back: "data-types", next: "expressions-conversion", nextLabel: "Next: Formatting, Expressions & Type Conversion →" }
    },
    {
      id: "expressions-conversion",
      title: "Formatting Output, Expressions & Type Conversion",
      content: `**9.14 Formatting Output**

**Manipulators** format the output of a C++ program, designed to work with << and >>. Common manipulators: endl, setw, setfill, setprecision, setf. endl is a member of iostream; the others are members of the **iomanip** header file.

- **endl:** Inserts a new line and flushes the output buffer (unlike \\n, which only inserts a new line without flushing).
- **setw(n):** Sets the field width for output — the minimum number of characters written, right-aligned within the field. Syntax: \`setw(number_of_characters)\`.
- **setprecision(n):** Displays fractional numbers with a specific total number of significant digits (reading left to right). Can also control decimal places when combined with \`cout.setf(ios::fixed)\` (fixed-point notation) or \`cout.setf(ios::scientific)\` (scientific notation).

**9.15 Expression**

An expression is a combination of operators, constants, and variables arranged per C++ rules, possibly including function calls that return values. C++ has seven types of expressions:
1. **Constant Expression:** consists only of constant values (e.g., \`int num=100;\`).
2. **Integer Expression:** combination of integer values/variables with arithmetic operators, producing an integer result (e.g., \`sum=num1+num2;\`).
3. **Float Expression:** combination of floating point values/variables, producing a floating result (e.g., \`Area=3.14*r*r;\`).
4. **Relational Expression:** uses relational operators, producing a boolean result (e.g., \`x>y;\`).
5. **Logical Expression:** uses logical operators, producing a boolean result (e.g., \`(a>b)&&(c==10);\`).
6. **Bitwise Expression:** uses bitwise operators (e.g., \`x>>3;\`).
7. **Pointer Expression:** involves pointer variables, which hold memory addresses, declared with * (e.g., \`int *ptr;\`).

**9.16 Type Conversion**

Converting one fundamental data type into another. C++ offers two kinds:

**(1) Implicit Type Conversion (Automatic Conversion):** Performed automatically by the compiler when different data types are mixed in an expression — the "smaller" type is converted to the "wider" type, called **Type Promotion**. For example, if \`int a=6\` and \`float b=3.14\`, then \`a+b\` implicitly converts a to float before adding, since float is wider than int.

**(2) Explicit Type Conversion (Type Casting):** The programmer explicitly converts a variable/expression to a specific type. Syntax: \`(type-name) expression;\`. For example, \`(int) varf\` truncates a float's fractional part. Converting to a **wider** type causes no problem, but converting to a **narrower** type can lose precision or data — e.g., double→float may lose precision; float→int loses the fractional part; long→short may lose data entirely.`,
      nav: { back: "variables", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- C++ was developed by Bjarne Stroustrup at AT&T Bell Labs in 1979; it is a hybrid language supporting both procedural and object-oriented paradigms.
- The character set is the set of characters allowed in C++ programs; individual program elements are called Tokens (Keywords, Identifiers, Literals, Operators, Punctuators).
- Keywords are reserved words with specific meaning to the compiler; Identifiers are user-defined names for variables, functions, etc.
- Literals (Constants) don't change during execution — types include Integer, Real, Boolean, Character, and String literals.
- Operators (Arithmetic, Relational, Logical, Assignment, Conditional) act on operands to perform computations; Punctuators (delimiters) structure the code.
- cin (>>) reads input; cout (<<) sends output; both can be cascaded to handle multiple values in one statement.
- Every C++ program needs #include <iostream>, using namespace std;, and an int main() function as its entry point.
- Errors are of three types: Syntax, Semantic (Logic), and Run-time.
- C++ has five fundamental data types (char, int, float, double, void), each with specific memory allocation, further adjustable using modifiers (signed, unsigned, long, short).
- Variables are named memory locations (with an L-value address and R-value content) that must be declared (and can be initialized, dynamically initialized, or made constant with const, or aliased using references).
- Manipulators (endl, setw, setprecision, etc.) format output; expressions combine operators/constants/variables to produce values; type conversion (implicit or explicit) converts between data types.`,
      nav: { back: "expressions-conversion", practice: true }
    }
  ]
}
