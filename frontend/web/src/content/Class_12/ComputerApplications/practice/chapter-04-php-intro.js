// frontend/web/src/content/Class_12/ComputerApplications/practice/chapter-04-php-intro.js

export default {
  meta: {
    subject: `Computer Applications -- Class XII`,
    unit: `Chapter 4 -- PHP: Hypertext Preprocessor`,
    time: `3.00 hrs`,
    totalMarks: 47,
    instructions: `Samacheer Kalvi -- Answer all questions`,
  },

  parts: [

    // ── Part I — MCQ (20 × 1 = 20) ──────────────────────────────────────────
    {
      id: `p1`,
      navLabel: `Part I -- MCQ (20 x 1)`,
      title: `Part I -- Objective Type`,
      type: `mcq`,
      scoreMax: 20,
      marksPer: 1,
      sections: [
        {
          label: `PHP Basics`,
          questions: [
            {
              id: `q1`,
              html: `The expansion of PHP is _________`,
              options: [
                `a) PHP: Hypertext Preprocessor`,
                `b) Personal Hypertext Preprocessor`,
                `c) Pretext Home page`,
                `d) Preprocessor Home Page`,
              ],
              answer: 0,
              hint: `PHP stands for PHP: Hypertext Preprocessor — it is a recursive acronym.`,
            },
            {
              id: `q2`,
              html: `What is the extension of a PHP file?`,
              options: [
                `a) .html`,
                `b) .xml`,
                `c) .php`,
                `d) .ph`,
              ],
              answer: 2,
              hint: `PHP files are saved with the .php extension. The web server recognises this extension and passes the file to the PHP interpreter.`,
            },
            {
              id: `q3`,
              html: `The PHP script should start with _________`,
              options: [
                `a) <?php`,
                `b) <php`,
                `c) <php?`,
                `d) <:?`,
              ],
              answer: 0,
              hint: `PHP default opening tag is <?php and closing tag is ?>. Nothing else is correct for the default tag type.`,
            },
            {
              id: `q4`,
              html: `How many data types does PHP support?`,
              options: [
                `a) 18`,
                `b) 28`,
                `c) 8`,
                `d) 38`,
              ],
              answer: 2,
              hint: `PHP supports exactly 8 data types: Integer, Float, String, Boolean, Array, Object, Resource, NULL.`,
            },
            {
              id: `q5`,
              html: `Every variable name in PHP must begin with a _________ symbol.`,
              options: [
                `a) #`,
                `b) //`,
                `c) $`,
                `d) <`,
              ],
              answer: 2,
              hint: `All PHP variables start with the dollar sign ($). Example: $name, $age, $price.`,
            },
            {
              id: `q6`,
              html: `_________ in PHP are case-sensitive.`,
              options: [
                `a) Variable names`,
                `b) Keywords`,
                `c) Variable names and keywords`,
                `d) None of the above`,
              ],
              answer: 0,
              hint: `Variable names in PHP are case-sensitive. $name and $Name are completely different variables. Keywords (like echo, if) are NOT case-sensitive.`,
            },
            {
              id: `q7`,
              html: `The assignment operator is ___________`,
              options: [
                `a) =`,
                `b) ==`,
                `c) ===`,
                `d) !=`,
              ],
              answer: 0,
              hint: `= is the assignment operator (assigns a value). == is comparison (equal to). === is identical (equal value AND type).`,
            },
            {
              id: `q8`,
              html: `_________ operators perform an action to compare two values.`,
              options: [
                `a) Arithmetic`,
                `b) Comparison`,
                `c) Increment`,
                `d) Logical`,
              ],
              answer: 1,
              hint: `Comparison operators (>, <, ==, ===, !=, !==, >=, <=) compare two values and return True or False.`,
            },
            {
              id: `q9`,
              html: `Which operator is called "identical"?`,
              options: [
                `a) =`,
                `b) ==`,
                `c) ===`,
                `d) <>`,
              ],
              answer: 2,
              hint: `=== is the identical operator — it returns True only if both the value AND the data type are the same. 5 === 5.0 is False because int ≠ float.`,
            },
            {
              id: `q10`,
              html: `_________ is a data type which contains decimal numbers.`,
              options: [
                `a) Integer`,
                `b) Float`,
                `c) Boolean`,
                `d) NULL`,
              ],
              answer: 1,
              hint: `Float contains decimal numbers. Example: $price = 19.99; Integer contains whole numbers only.`,
            },
          ],
        },
        {
          label: `Operators and Syntax`,
          questions: [
            {
              id: `q11`,
              html: `PHP was created by:`,
              options: [
                `a) Bill Gates`,
                `b) Rasmus Lerdorf`,
                `c) Guido van Rossum`,
                `d) James Gosling`,
              ],
              answer: 1,
              hint: `PHP was created by Rasmus Lerdorf in 1994. Guido van Rossum created Python. James Gosling created Java.`,
            },
            {
              id: `q12`,
              html: `Which of the following is the concatenation operator in PHP?`,
              options: [
                `a) +`,
                `b) &`,
                `c) .`,
                `d) ,`,
              ],
              answer: 2,
              hint: `The dot (.) is the concatenation operator in PHP. It joins two strings. Example: \"Hello\" . \"World\" = \"HelloWorld\".`,
            },
            {
              id: `q13`,
              html: `What does the modulus operator (%) return?`,
              options: [
                `a) The quotient of division`,
                `b) The remainder after division`,
                `c) The product of multiplication`,
                `d) The square of a number`,
              ],
              answer: 1,
              hint: `% returns the remainder. 5 % 2 = 1 (because 5 ÷ 2 = 2 remainder 1).`,
            },
            {
              id: `q14`,
              html: `Which of the following is a valid variable name in PHP?`,
              options: [
                `a) $1st_name`,
                `b) $full-name`,
                `c) $full name`,
                `d) $_hidden`,
              ],
              answer: 3,
              hint: `$_hidden is valid — starts with $ and underscore is allowed. $1st_name starts with a number (invalid). $full-name has a hyphen (invalid). $full name has a space (invalid).`,
            },
            {
              id: `q15`,
              html: `PHP is an example of a:`,
              options: [
                `a) Client-side scripting language`,
                `b) Server-side scripting language`,
                `c) Compiled language`,
                `d) Machine language`,
              ],
              answer: 1,
              hint: `PHP is a server-side scripting language — code runs on the server, not in the browser. JavaScript is client-side.`,
            },
            {
              id: `q16`,
              html: `How do you add a single-line comment in PHP?`,
              options: [
                `a) <!-- comment -->`,
                `b) /* comment */`,
                `c) // comment`,
                `d) ** comment **`,
              ],
              answer: 2,
              hint: `Single-line comments use // or #. Multi-line comments use /* ... */. HTML comments use <!-- -->.`,
            },
            {
              id: `q17`,
              html: `What is the output of: $x = 5; $y = 2; echo $x % $y;`,
              options: [
                `a) 2.5`,
                `b) 2`,
                `c) 1`,
                `d) 3`,
              ],
              answer: 2,
              hint: `5 % 2 = 1. The modulus operator returns the remainder. 5 ÷ 2 = 2 with remainder 1.`,
            },
            {
              id: `q18`,
              html: `The logical AND operator in PHP is:`,
              options: [
                `a) &`,
                `b) and`,
                `c) &&`,
                `d) ||`,
              ],
              answer: 2,
              hint: `&& is the logical AND operator. It returns true only if BOTH operands are true. || is logical OR.`,
            },
            {
              id: `q19`,
              html: `What is the pre-increment operator in PHP?`,
              options: [
                `a) $a++`,
                `b) ++$a`,
                `c) $a--`,
                `d) --$a`,
              ],
              answer: 1,
              hint: `++$a is pre-increment — increments $a first, then returns the value. $a++ is post-increment — returns value first, then increments.`,
            },
            {
              id: `q20`,
              html: `Which PHP data type contains NULL value?`,
              options: [
                `a) Boolean`,
                `b) Resource`,
                `c) Object`,
                `d) NULL`,
              ],
              answer: 3,
              hint: `NULL is a special data type that contains no value (null/empty). The keyword NULL is not case-sensitive.`,
            },
          ],
        },
      ],
    },

    // ── Part II — Short Answers (5 × 2 = 10) ────────────────────────────────
    {
      id: `p2`,
      navLabel: `Part II -- Short Answers (5 x 2)`,
      title: `Part II -- Short Answer Questions`,
      type: `short-essay`,
      scoreMax: 10,
      marksPer: 2,
      questions: [
        {
          q: `What is PHP?`,
          ans: `PHP stands for PHP: Hypertext Preprocessor. It was created by Rasmus Lerdorf in 1994. PHP is a server-side scripting language, which means code is executed on the server rather than in the user's browser. It is widely used for web development to create dynamic and interactive web pages. PHP is an interpreted language — files are interpreted line by line by the web server without compilation.`,
        },
        {
          q: `What is a dynamic web page?`,
          ans: `A dynamic web page is a page whose content can change each time it is viewed. PHP is particularly suited for creating dynamic web pages because it can interact with databases efficiently. Example: Your social media feed shows different posts each time — that is a dynamic page. In contrast, a static web page has fixed content that does not change unless manually updated by the developer.`,
        },
        {
          q: `What are the different types of comments in PHP? Give an example.`,
          ans: `There are two types of comments in PHP: 1. Single-line comments — Use # or // before the comment. Example: // This is a comment OR # This is also a comment. 2. Multi-line comments — Enclose in /* ... */. Example: /* This is a multi-line comment that spans multiple lines. */ Comments are ignored by the PHP interpreter — they are used only to explain the code.`,
        },
        {
          q: `What is the 'Echo' statement used for? Give an example.`,
          ans: `The echo statement in PHP is used to output a string or other data to the screen. It is a simple and efficient way to display information to the user. Echo does not require parentheses. Examples: echo 'Hello, world!'; — outputs the string. $name = "Kumar"; echo "My name is $name"; — outputs variable value. $x = 10; $y = 20; echo $x + $y; — outputs 30. The concatenation operator (.) can be used with echo: echo "My name is" . $name;`,
        },
        {
          q: `List out any four operators in PHP.`,
          ans: `Four types of operators in PHP: 1. Arithmetic Operators — perform math operations. Examples: + (addition), - (subtraction), * (multiplication), / (division), % (modulus/remainder). 2. Comparison Operators — compare two values, return True/False. Examples: == (equal to), === (identical — same value AND type), != (not equal), > (greater than). 3. Logical Operators — perform logical operations. Examples: && (AND), || (OR), ! (NOT), xor (XOR). 4. String Operators — work with strings. Examples: . (concatenation joins strings), .= (concatenation assignment).`,
        },
      ],
    },

    // ── Part III — Brief Answers (3 × 3 = 9) ────────────────────────────────
    {
      id: `p3`,
      navLabel: `Part III -- Brief Answers (3 x 3)`,
      title: `Part III -- Brief Answer Questions`,
      type: `short-essay`,
      scoreMax: 9,
      marksPer: 3,
      questions: [
        {
          q: `What are the features of PHP?`,
          ans: `The main features of PHP are: 1. Server-side scripting language — PHP scripts execute on the server and send output to the client's browser. The client never sees the actual PHP code. This allows creating dynamic web pages that interact with databases. 2. Open-source software — PHP source code is available for anyone to view and modify freely. 3. Platform independent — PHP runs on many different operating systems including Windows, Linux, and macOS. 4. Database support — PHP easily connects to databases like MySQL, making it ideal for creating database-driven websites. 5. Interpreted language — PHP files are interpreted line by line by the web server — no compilation is needed.`,
        },
        {
          q: `Explain the types of PHP Tags.`,
          ans: `PHP supports three types of tags:\n1. PHP Default Tags — The standard way to write PHP code. Opening tag: <?php Closing tag: ?> Example: <?php // PHP code ?> Always supported in all PHP versions.\n2. Short Open Tags — An alternative to default syntax using shorter tags. Opening tag: <? Closing tag: ?> Example: <? // PHP code ?>\n3. HTML Script Embed Tags — PHP code embedded inside HTML script tags. Opening tag: <script language="php"> Closing tag: </script> Example: <script language="php"> // PHP code </script>\nThe PHP Default Tags (<?php ?>) are the most widely used and recommended approach.`,
        },
        {
          q: `Write about the rules for naming a variable in PHP.`,
          ans: `Rules for naming variables in PHP:\n1. A variable's name must start with a dollar sign ($). Example: $name.\n2. The first character after the dollar sign must be either a letter (a-z or A-Z) or an underscore (_). It CANNOT be a number.\n3. The variable name can contain a combination of letters, numbers (0-9), and underscores. Example: $my_report1.\n4. Variable names in PHP are CASE-SENSITIVE. $name and $Name are entirely different variables.\nValid names: $name, $age, $is_admin, $_hidden\nInvalid names: $1st_name (starts with number), $full-name (contains hyphen), $full name (contains space).`,
        },
      ],
    },

    // ── Part IV — Long Essays (2 × 4 = 8) ───────────────────────────────────
    {
      id: `p4`,
      navLabel: `Part IV -- Long Essays (2 x 4)`,
      title: `Part IV -- Detailed Answer Questions`,
      type: `long-essay`,
      scoreMax: 8,
      marksPer: 4,
      questions: [
        {
          q: `What are the datatypes in PHP? Explain.`,
          ans: `PHP supports 8 data types:\n\n1. Integer — Contains whole numbers (positive, negative, or zero).\nExamples: $age = 30; $count = -10;\n\n2. Float — Contains decimal numbers.\nExamples: $price = 19.99; $weight = 65.5;\n\n3. String — A sequence of characters enclosed in single or double quotes.\nExamples: $name = "Barath"; $message = 'Hello, World!';\n\n4. Boolean — Contains only True or False.\nExamples: $is_admin = true; $is_logged_in = false;\n\n5. Array — Holds multiple values under a single variable name.\nExamples: $prices = array(10, 20, 30);\n\n6. Object — Represents an instance of a class in Object-Oriented PHP.\nExamples: $user = new User();\n\n7. Resource — Represents a connection to an external resource like a file or database.\nExamples: $fp = fopen("file.txt", "r"); $conn = mysqli_connect("localhost", "user", "pass", "db");\n\n8. NULL — Contains no value. NULL means empty. The keyword NULL is not case-sensitive.\nExamples: $x = null;`,
        },
        {
          q: `Explain operators in PHP with examples.`,
          ans: `PHP supports several types of operators:\n\n1. Arithmetic Operators — Perform mathematical operations.\n+ (Addition): 5+2 = 7\n- (Subtraction): 5-2 = 3\n* (Multiplication): 5*2 = 10\n/ (Division): 5/2 = 2.5\n% (Modulus/Remainder): 5%2 = 1\n\n2. Assignment Operators — Assign values to variables.\n= assigns value: $a = 5;\nCombined: += (add & assign), -= (subtract & assign), *= (multiply & assign)\n\n3. Comparison Operators — Compare two values, return True/False.\n== (Equal): 5==5 → True\n=== (Identical — value AND type): 5===5.0 → False\n!= (Not equal): 5!=6 → True\n> (Greater than): 5>2 → True\n< (Less than): 5<2 → False\n\n4. Logical Operators — Perform logical operations.\n&& (AND): True only if BOTH are true. (5>3)&&(5>7) → False\n|| (OR): True if at least ONE is true. (5>3)||(5>7) → True\n! (NOT): Reverses result. !(5>3) → False\nxor: True if exactly ONE is true.\n\n5. Increment/Decrement Operators.\n++$a (Pre-increment): Increments first, then returns.\n$a++ (Post-increment): Returns first, then increments.\n--$a and $a-- work the same way for decrement.\n\n6. String Operators.\n. (Concatenation): "Hello" . "World" → "HelloWorld"\n.= (Concatenation assignment): $a .= $b is same as $a = $a . $b`,
        },
      ],
    },

  ],
}
