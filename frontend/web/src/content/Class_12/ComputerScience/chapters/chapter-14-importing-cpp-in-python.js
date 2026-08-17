export default {
  chapterNumber: 14,
  title: "Importing C++ Programs in Python",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-python-vs-cpp",
      title: "Python vs C++ & Scripting Languages",
      content: `**14.1 Introduction**

Python and C++ are both general-purpose programming languages, yet quite different:

| # | Python | C++ |
|---|---|---|
| 1 | Typically an "interpreted" language | Typically a "compiled" language |
| 2 | A dynamic-typed language | Compiled, statically typed language |
| 3 | Data type is not required while declaring a variable | Data type is required while declaring a variable |
| 4 | Can act as both a scripting and general-purpose language | A general-purpose language |

These two languages complement each other well. Python is mostly used as a **scripting** or "glue" language — the top-level program calls routines written in C/C++. This is useful when logic exists in already-written code (e.g., a C++ program) but needs to be called and manipulated through Python.

**14.2 Scripting Language**

A scripting language is designed for integrating and communicating with other programming languages. Widely used scripting languages: JavaScript, VBScript, PHP, Perl, Python, Ruby, ASP, Tcl. Since scripting languages are used alongside another language, they're often found with HTML, Java, or C++.

**14.2.1 Difference between Scripting and Programming Languages**

All scripting languages ARE programming languages. The theoretical difference: scripting languages don't require a compilation step and are instead interpreted. A C++ program must be compiled before running; a scripting language like JavaScript or Python need not be compiled. A scripting language requires an **interpreter**, while a programming language requires a **compiler**. Whether a given language is called "scripting" or "programming" depends on the environment it's used in.

**14.3 Applications of Scripting Languages**
1. To automate certain tasks in a program.
2. Extracting information from a data set.
3. Less code-intensive compared to traditional programming languages.
4. Can bring new functions to applications and glue complex systems together.

Python is an interpreted, high-level, general-purpose language usable on any modern OS — for processing text, numbers, images, scientific data, and more. Large applications today are increasingly written almost exclusively in Python.

**14.4 Features of Python over C++**
- Python uses **Automatic Garbage Collection**; C++ does not.
- C++ is statically typed; Python is dynamically typed.
- Python runs through an interpreter; C++ is pre-compiled.
- Python code tends to be 5 to 10 times shorter than equivalent C++ code.
- Python needs no explicit type declarations; C++ requires them.
- In Python, a function can accept an argument of any type and return multiple values without prior declaration; in C++, a return statement can return only one value.

**Note:** Garbage Collection is the process by which Python periodically frees and reclaims memory blocks that are no longer in use, automatically deleting unwanted objects (built-in types or class instances) to free memory space.`,
      nav: { next: "wrapping-mingw", nextLabel: "Next: Wrapping C++ in Python & MinGW →" }
    },
    {
      id: "wrapping-mingw",
      title: "Importing (Wrapping) C++ Files in Python",
      content: `**14.5 Importing C++ Files in Python**

Importing a C++ program into a Python program is called **wrapping up of C++ in Python**. Common interfaces for wrapping:
- **Python-C-API** — for interfacing with C programs.
- **Ctypes** — for interfacing with C programs.
- **SWIG** (Simplified Wrapper Interface Generator) — for both C and C++.
- **Cython** — a Python-like language for writing C-extensions.
- **Boost.Python** — a framework for interfacing Python and C++.
- **MinGW** (Minimalist GNU for Windows).

**14.5.1 MinGW Interface**

MinGW refers to a set of runtime header files used to compile and link C, C++, and FORTRAN code to run on Windows. **MinGW-W64** is a strong compiler choice for C++ on Windows — you need **g++** for Windows to compile and execute C++ programs. MinGW allows compiling and executing C++ programs dynamically through a Python program, using g++.

**Note:** g++ is a program that calls GCC (GNU C Compiler) and automatically links required C++ library files to the object code.

**14.5.2 Executing a C++ Program through Python**

1. Open the command prompt or run terminal.
2. Use the **cd** command to change directory (e.g., \`cd pyprg\`).
3. Syntax to execute the Python program with a C++ file:
\`\`\`
Python <filename.py> -i <C++ filename without cpp extension>
\`\`\`
Where:
- **Python** — keyword to run the Python program from the command line.
- **filename.py** — name of the Python program.
- **-i** — input mode.
- **C++ filename without cpp extension** — name of the C++ file to compile/execute.

**Example execution:**
\`\`\`
C:\\Pyprg> Python c:\\pyprg\\pycpp.py -i c:\\pyprg\\pali
Enter a positive number: 232
The reverse of the number is: 232
The number is a palindrome
\`\`\`
**Note:** In the execution command, the C++ file's extension is NOT required — just the name (e.g., "pali" instead of "pali.cpp"). Use **cls** to clear the command window screen.`,
      nav: { back: "intro-python-vs-cpp", next: "modules-sys-os-getopt", nextLabel: "Next: Modules — sys, os, getopt →" }
    },
    {
      id: "modules-sys-os-getopt",
      title: "Python Modules: sys, os, getopt",
      content: `**14.6 Python Program to Import C++**

To integrate two different languages, the Python program needs to import the modules **os**, **sys**, and **getopt**.

**14.6.1 Module**

Modular programming splits code into separate parts called **modules**, aiming to minimize dependencies between them. A module is a file containing Python statements and definitions — e.g., factorial.py, containing a function fact(). Modules break large programs into small, manageable, organized pieces, and provide code reusability (define a function once, import it anywhere, instead of copying its definition into different programs).

**14.6.2 How to Import Modules**

Use the **import** keyword:
\`\`\`
>>> import factorial
\`\`\`
Access functions inside a module using the **dot (.) operator**:
\`\`\`
<module name>.<function name>
>>> factorial.fact(5)
120
\`\`\`

**14.6.2.1 Python's sys Module**

Provides access to built-in variables used by the interpreter. **sys.argv** is a list of command-line arguments passed to the program. \`sys.argv[0]\` is the Python program's own name; \`sys.argv[1]\` is the next argument (the C++ file). To use it, \`import sys\` first.

**14.6.2.2 Python's os Module**

Provides a way to use operating-system-dependent functionality. **os.system()** executes a compiling command (a string containing shell commands) in the shell (command window):
\`\`\`
os.system('g++ ' + <variable_name1> + ' -<mode> ' + <variable_name2>)
\`\`\`
Example — compile and execute:
\`\`\`
os.system('g++ ' + cpp_file + ' -o ' + exe_file)
\`\`\`
The g++ compiler compiles cpp_file and sends the output (-o) to exe_file.

**Note:** '+' in os.system() concatenates strings — remember to include a space after each word to separate arguments correctly.

**14.6.2.3 Python's getopt Module**

Helps parse (split) command-line options and arguments, using the **getopt()** method.
\`\`\`
<opts>, <args> = getopt.getopt(argv, options, [long_options])
\`\`\`
- **argv** — the argument list to be parsed.
- **options** — a string of option letters recognized (e.g., 'i' or 'o'), followed by a colon (:) to denote it takes a value.
- **long_options** — a list of strings for long-form options (followed by '=').

getopt() returns two values: **opts** (list of split option/argument pairs) and **args** (error strings, or empty [] if no error).
\`\`\`
opts, args = getopt.getopt(argv, "i:", ['ifile='])
# opts contains [('-i', 'c:\\\\pyprg\\\\p4')]
\`\`\`

**\\_\\_name\\_\\_ (a special variable)**

Since Python has no main() function, execution starts at level-0 indentation. Before that, the interpreter defines special variables — **\\_\\_name\\_\\_** by default stores the current module's name. If the source file is run as the MAIN program, the interpreter sets \\_\\_name\\_\\_ to \`"__main__"\`.
\`\`\`
if __name__ == '__main__':
    main(sys.argv[1:])
\`\`\`
**Note:** \`sys.argv[1:]\` gets everything after the script's own name (string slicing, from Chapter 8); \`sys.argv[0]\` is the script name itself.`,
      nav: { back: "wrapping-mingw", next: "executing-cpp-errors", nextLabel: "Next: Full Example & Error Handling →" }
    },
    {
      id: "executing-cpp-errors",
      title: "Executing C++ via Python & Handling Errors",
      content: `**14.7 Python Program Executing C++ Program Using Control Statements**

**Steps:**
1. Type the C++ program in Notepad and save as \`pali_cpp.cpp\`.
2. Type the Python program and save as \`pali.py\`.
3. Open the Run Terminal / command window.
4. Type: \`Python pali.py -i pali_cpp\`

**Example — palindrome check via a wrapped C++ program:**
\`\`\`
# Python file: pali.py
import sys, os, getopt

def main(argv):
    opts, args = getopt.getopt(argv, "i:")
    for o, a in opts:
        if o in "-i":
            run(a)

def run(a):
    inp_file = a + '.cpp'
    exe_file = a + '.exe'
    os.system('g++ ' + inp_file + ' -o ' + exe_file)
    os.system(exe_file)

if __name__ == '__main__':
    main(sys.argv[1:])
\`\`\`
**How it works, line by line:**
1. \`import sys, os, getopt\` — includes the required modules.
2. \`main(argv)\` — argv contains the input mode and C++ file path, e.g., \`['-i', 'c:\\pyprg\\pali_cpp']\`.
3. \`getopt.getopt(argv, "i:")\` — splits the command into option/argument; opts holds \`[('-i', 'c:\\pyprg\\pali_cpp')]\`; since there's no error, args is empty [].
4. \`for o, a in opts:\` — unpacks the tuple: o = mode (e.g., '-i'), a = the C++ file path.
5. \`if o in ("-i"):\` — checks if the mode is 'i'; if true, calls run(a).
6. \`run(a)\` — inp_file joins the C++ filename with '.cpp'; exe_file joins it with '.exe'.
7. \`os.system('g++ ' + inp_file + ' -o ' + exe_file)\` — compiles the C++ code into an executable.
8. \`os.system(exe_file)\` — runs the resulting .exe file, displaying output.
9. \`if __name__ == '__main__':\` — ensures main() runs only when this script is executed directly, passing \`sys.argv[1:]\` (everything except the script's own name).

**Output examples:**
\`\`\`
Enter a positive number: 56765
The reverse of the number is: 56765
The number is a palindrome

Enter a positive number: 56756
The reverse of the number is: 65765
The number is not a palindrome
\`\`\`

**14.8 How Python Handles Errors in C++**

Python not only executes successful C++ programs — it also displays C++ compilation errors, if any. Example: a C++ program missing a semicolon (\`std::cout<<"hello"\` without \`;\`) run through the same Python wrapper script produces:
\`\`\`
c:\\pyprg\\hello.cpp: In function 'int main()':
c:\\pyprg\\hello.cpp:7:19: error: expected ';' before 'return'
...
'c:\\pyprg\\hello.exe' is not recognized as an internal or external command
\`\`\`
**Note:** The error is displayed along with its line number, counted from the beginning of the C++ program — this makes it easy to debug C++ code compiled via Python.`,
      nav: { back: "modules-sys-os-getopt", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- C++ is a compiler-based language; Python is an interpreter-based language.
- C++ is compiled statically; Python is interpreted dynamically.
- A static typed language (C++) requires the programmer to explicitly declare data types; a dynamic typed language (Python) does not.
- A scripting language is designed for integrating and communicating with other programming languages.
- MinGW refers to runtime header files used to compile/link C, C++, and FORTRAN code for Windows.
- The dot (.) operator accesses the functions of an imported module.
- The sys module provides access to interpreter variables and functions (e.g., sys.argv for command-line arguments).
- The os module provides a way to use operating-system-dependent functionality (e.g., os.system() to run shell commands).
- The getopt module helps parse (split) command-line options and arguments.
- __name__ is a special built-in variable that evaluates to the name of the current module — set to "__main__" when the script is run directly.`,
      nav: { back: "executing-cpp-errors", practice: true }
    }
  ]
}
