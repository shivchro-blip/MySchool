export default {
  "meta": {
    "subject": "Computer Applications -- Class XI",
    "unit": "Chapter 11 -- HTML: Formatting Text, Tables, Lists and Links",
    "time": "2.30 hrs",
    "totalMarks": 47,
    "instructions": "Samacheer Kalvi -- Answer all questions"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "Part I -- MCQ (10 x 1)",
      "title": "Part I -- Choose the Correct Answer",
      "type": "mcq",
      "scoreMax": 10,
      "marksPer": 1,
      "sections": [
        {
          "label": "HTML Formatting, Tables, Lists and Links",
          "questions": [
            {
              "id": "q1",
              "html": "Which of the following tags are called Physical Style Tags?",
              "options": [
                "a) &lt;html&gt;, &lt;b&gt;, &lt;br&gt;",
                "b) &lt;b&gt;, &lt;br&gt;, &lt;u&gt;",
                "c) &lt;A&gt;, &lt;b&gt;, &lt;i&gt;",
                "d) &lt;b&gt;, &lt;i&gt;, &lt;u&gt;"
              ],
              "answer": 3,
              "hint": "Physical Style Tags directly apply visual formatting: <b> (bold), <i> (italic), <u> (underline)."
            },
            {
              "id": "q2",
              "html": "Which feature is used to call attention to the reader in HTML?",
              "options": [
                "a) Highlight",
                "b) Bold",
                "c) Italics",
                "d) Underline"
              ],
              "answer": 0,
              "hint": "The <mark> tag is used to highlight text, calling attention to important information (default: yellow)."
            },
            {
              "id": "q3",
              "html": "The tags &lt;sub&gt; and &lt;sup&gt; are used for:",
              "options": [
                "a) Subject and Super",
                "b) Subscript and Super",
                "c) Subject and Superscript",
                "d) Subscript and Superscript"
              ],
              "answer": 3,
              "hint": "<sub> = Subscript (text below baseline, e.g., H₂O). <sup> = Superscript (text above baseline, e.g., (a+b)²)."
            },
            {
              "id": "q4",
              "html": "A named set of certain style of characters and numbers is called:",
              "options": [
                "a) Style",
                "b) Character",
                "c) Font",
                "d) List"
              ],
              "answer": 2,
              "hint": "A font is a named set of a certain style of characters and numbers (e.g., Arial, Times New Roman)."
            },
            {
              "id": "q5",
              "html": "Pick the odd one from the list of table tags:",
              "options": [
                "a) &lt;tr&gt;",
                "b) &lt;th&gt;",
                "c) &lt;dh&gt;",
                "d) &lt;td&gt;"
              ],
              "answer": 2,
              "hint": "<tr> (row), <th> (heading cell), <td> (data cell) are valid table tags. <dh> does not exist in HTML."
            },
            {
              "id": "q6",
              "html": "Match: (a) tfoot → (b) start → (c) href → (d) mark. The correct match is:",
              "options": [
                "a) 4, 1, 2, 3",
                "b) 1, 4, 3, 2",
                "c) 4, 3, 2, 1",
                "d) 1, 2, 4, 3"
              ],
              "answer": 0,
              "hint": "tfoot = Table (4), start = Ordered list attribute (1), href = Hyperlink (2), mark = Highlight (3). Match: 4,1,2,3."
            },
            {
              "id": "q7",
              "html": "A definition list has how many parts?",
              "options": [
                "a) 5",
                "b) 4",
                "c) 3",
                "d) 2"
              ],
              "answer": 3,
              "hint": "A definition list has 2 parts per item: the definition term (<dt>) and the definition description (<dd>)."
            },
            {
              "id": "q8",
              "html": "A list block defined inside another list is called:",
              "options": [
                "a) Inner List",
                "b) Nested List",
                "c) Outer List",
                "d) Listing List"
              ],
              "answer": 1,
              "hint": "When a list is defined inside another list, it is called a Nested List."
            },
            {
              "id": "q9",
              "html": "HREF is abbreviated as:",
              "options": [
                "a) Hypertext Reference File",
                "b) Hypertext Markup File",
                "c) Hypertext Reference",
                "d) HyperLink Reference"
              ],
              "answer": 2,
              "hint": "HREF = Hypertext Reference. It is the attribute of the <a> tag used to specify the URL or file path to link to."
            },
            {
              "id": "q10",
              "html": "To create an internal link, which attribute should be used with the &lt;a&gt; tag?",
              "options": [
                "a) link",
                "b) name",
                "c) local",
                "d) inter"
              ],
              "answer": 1,
              "hint": "The 'name' attribute of <a> creates a named anchor for internal links. The href then uses #anchorName to link to it."
            }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "Part II -- Very Short (8 x 2)",
      "title": "Part II -- Very Short Answers",
      "type": "short_answer",
      "scoreMax": 16,
      "marksPer": 2,
      "sections": [
        {
          "label": "Very Short Answers",
          "questions": [
            {
              "id": "q11",
              "html": "Write a short note on (i) &lt;strong&gt; (ii) &lt;em&gt;",
              "answer": "(i) <strong>: The <strong> tag is a phrase tag used to define important text. It displays the text in bold — similar to the <b> tag — but technically its meaning is 'important' rather than simply bold. It is a container tag.\n\n(ii) <em>: The <em> tag is used to emphasise text. It displays the text in italics — similar to the <i> tag — but technically its meaning is 'emphasis' rather than simply italic. It is a container tag.\n\nVisually, <strong> and <b> look the same, and <em> and <i> look the same. The difference is in semantic meaning: <strong> and <em> convey importance/emphasis to browsers and screen readers.",
              "hint": "<strong> = important text, displays as bold. <em> = emphasised text, displays as italic. Both have semantic meaning unlike <b> and <i>."
            },
            {
              "id": "q12",
              "html": "What is the use of the &lt;mark&gt; tag?",
              "answer": "The <mark> tag is used to highlight text in HTML. It is a container tag. Whatever text is placed between <mark> and </mark> will be displayed with a highlight (default colour: yellow), drawing attention to important information. Example: A Computer is an <mark>electronic</mark> device. The word 'electronic' would appear highlighted in yellow.",
              "hint": "<mark> tag highlights text (default: yellow). Container tag. Used to draw reader's attention to key information."
            },
            {
              "id": "q13",
              "html": "Write the following equation as HTML notation: Pd = 2s – Q²",
              "answer": "HTML code to write Pd = 2s – Q²:\n\n<html>\n<head>\n  <title> Equation </title>\n</head>\n<body>\n  Pd = 2s &ndash; Q<sup>2</sup>\n</body>\n</html>\n\nThe <sup> tag is used to make '2' appear as a superscript above the normal line, displaying as Q².",
              "hint": "Use <sup> for superscript: Q<sup>2</sup> displays as Q². The ² appears above the normal text line."
            },
            {
              "id": "q14",
              "html": "Write about any two attributes of the &lt;font&gt; tag.",
              "answer": "(1) face: The face attribute is used to set the font style (typeface). The name of the font with multiple words should be specified within double quotes. Example: <font face=\"Times New Roman\">. Multiple fonts can be listed with commas — the browser uses the first supported font.\n\n(2) size: The size attribute sets the size of the text. It can have an absolute value from 1 to 7 (virtual size). Each virtual size is approximately 20% larger than the previous one. Size 3 is the default. Example: <font size=5>.\n\n(3) color: (bonus) Sets the text colour using a colour name or hexadecimal code.",
              "hint": "Two of: face (font style, e.g., Arial), size (1-7, each 20% larger), color (text colour). Include example for each."
            },
            {
              "id": "q15",
              "html": "What is a thematic break in HTML?",
              "answer": "The <hr> tag (Horizontal Rule) is known as a 'Thematic Break' in HTML. It separates sections of an HTML document visually by producing a horizontal line spread across the width of the browser window. It is an empty tag — no closing tag is required. The default horizontal line is displayed in 3D, spans the full browser width (100%), is 3 pixels thick, and is gray in colour. These defaults can be changed using the size, width, noshade, and color attributes.",
              "hint": "<hr> = Horizontal Rule = Thematic Break. Draws a horizontal line to separate sections. Empty tag. Default: 3D, full width, 3px, gray."
            },
            {
              "id": "q16",
              "html": "What is a pixel?",
              "answer": "A pixel (short for 'picture element') is one of the tiny dots that make up the display on a computer screen. The size attribute of the <hr> tag is given in terms of pixels. Generally, 72 pixels is equal to one inch. Pixel is usually referred to as 'points' in HTML. For example, <hr size=72> displays a horizontal line with a thickness of 1 inch.",
              "hint": "Pixel = smallest unit of display (picture element). 72 pixels = 1 inch. Used for size measurements in HTML."
            },
            {
              "id": "q17",
              "html": "What are the types of lists in HTML?",
              "answer": "HTML supports three types of lists: (1) Ordered List (Numbered List) — created with <ol>...</ol>; displays items in numerical or alphabetical order using <li> tags. Can use type attribute to change numbering style (1, a, A, i, I) and start attribute to set the starting number. (2) Unordered List (Bulleted List) — created with <ul>...</ul>; each item is prefixed with a bullet symbol. Type attribute changes bullet style (disc, square, circle). (3) Definition List — created with <dl>...</dl>; each item has two parts: definition term (<dt>) and definition description (<dd>).",
              "hint": "Three types: Ordered (<ol> — numbered), Unordered (<ul> — bulleted), Definition (<dl> — term + description)."
            },
            {
              "id": "q18",
              "html": "How will you define a numbered list in HTML?",
              "answer": "A numbered list (Ordered List) is defined using the <ol> tag pair. Each list item is defined with the <li> tag (closing </li> is usually omitted). The list items are automatically numbered.\n\nExample:\n<ol>\n  <li> Tamil\n  <li> English\n  <li> Computer Application\n</ol>\n\nAttributes: type (changes numbering: 1=Arabic, a=lowercase letters, A=uppercase letters, i=lowercase Roman, I=uppercase Roman) and start (sets starting number/letter).",
              "hint": "Ordered list: <ol>...<li> items...</ol>. Items get automatic numbers. type attribute changes style; start attribute changes starting point."
            }
          ]
        }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Short (3 x 3)",
      "title": "Part III -- Short Answers",
      "type": "brief_answer",
      "scoreMax": 9,
      "marksPer": 3,
      "sections": [
        {
          "label": "Short Answers",
          "questions": [
            {
              "id": "q19",
              "html": "Briefly explain the attributes of the &lt;hr&gt; tag.",
              "answer": "The <hr> (Horizontal Rule) tag has four attributes:\n\n1. size: Sets the thickness of the horizontal line in pixels. Default is 3 pixels. Example: <hr size=72> creates a 1-inch thick line (72px = 1 inch).\n\n2. width: Sets the horizontal width of the ruler line. Value can be pixels or a percentage. Default is 100% (full browser width). Example: <hr width=50%> draws a half-width line.\n\n3. noshade: A Boolean attribute that turns off the 3D appearance, making the line appear flat (2D). Default is the 3D view. Example: <hr noshade>.\n\n4. color: Changes the colour of the horizontal line. Default is gray. Value can be a colour name or hexadecimal code. Example: <hr color=green>.\n\nNote: All <hr> attributes are not supported in HTML5.",
              "hint": "Four attributes: size (thickness in pixels), width (pixels or %), noshade (2D instead of 3D), color (line colour). Note: not supported in HTML5."
            },
            {
              "id": "q20",
              "html": "What are the core tags used to create a table in HTML?",
              "answer": "There are five core tags used to create a table in HTML. All are container tags:\n\n1. <table> — Creates the table structure. Used with attributes like border, cellspacing, cellpadding, align, bgcolor.\n\n2. <tr> (Table Row) — Defines each row of the table. All cells in a row are placed inside <tr>...</tr>.\n\n3. <th> (Table Heading) — Defines column headings. Text inside <th> is automatically displayed as bold and centred.\n\n4. <td> (Table Data) — Specifies the data content of a cell. Regular table data goes inside <td>...</td>.\n\n5. <caption> — Defines a title/caption for the entire table. Displayed above the table by default.\n\nAdditional optional tags: <tbody> (table body), <thead> (table head), <tfoot> (table footer) — used to control sections of the table.",
              "hint": "Five core tags: <table> (creates table), <tr> (row), <th> (heading cell, bold+centred), <td> (data cell), <caption> (title). All are container tags."
            },
            {
              "id": "q21",
              "html": "What is a link in HTML? Write an HTML code to provide a hyperlink to https://www.w3schools.com",
              "answer": "A link (hyperlink) in HTML is used to connect web resources — HTML documents, external webpages, or multimedia content. Two things are needed: (1) the URL or file path to link to, and (2) the clickable text.\n\nThe <a> (anchor) tag is used with the href (Hypertext Reference) attribute to create links.\n\nSyntax: <a href=\"URL\"> Clickable Text </a>\n\nHTML code to link to www.w3schools.com:\n<html>\n<head>\n  <title> Hyperlink Example </title>\n</head>\n<body>\n  <h2> Web Resources </h2>\n  <p> Click the link below to visit W3Schools: </p>\n  <a href=\"https://www.w3schools.com\"> W3Schools - Online Web Tutorials </a>\n</body>\n</html>\n\nWhen clicked, the browser opens https://www.w3schools.com.",
              "hint": "Link = connects web resources. Uses <a href='URL'>text</a>. Show full HTML with link to w3schools.com."
            }
          ]
        }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Long (3 x 4)",
      "title": "Part IV -- Explain in Detail",
      "type": "long_essay",
      "scoreMax": 12,
      "marksPer": 4,
      "sections": [
        {
          "label": "Long Answers",
          "questions": [
            {
              "id": "q22",
              "html": "Explain the attributes used with the &lt;table&gt; tag in HTML.",
              "answer": "The <table> tag has several attributes to improve the layout and appearance of a table:\n\n1. border: Specifies the thickness of border lines around the table in pixels. Zero (default in most browsers) means no border. Example: <table border=2> draws a 2-pixel border.\n\n2. cellspacing: Sets the space between cells in pixels. Controls the gap between adjacent cells. Example: <table cellspacing=5>.\n\n3. cellpadding: Sets the space between the cell content and its border in pixels. Creates padding inside each cell. Example: <table cellpadding=10>.\n\n4. bordercolor: Applies colour to the border lines of the table. Example: <table bordercolor=blue>.\n\n5. align: Sets the position of the table within the browser window. Default is left. Values: left, right, center. Example: <table align=center>.\n\n6. bgcolor: Applies a background colour to the entire table. Example: <table bgcolor=yellow>.\n\n7. height and width: Specify the height and width of the table in pixels or percentage. Example: <table width=80% height=200>.\n\nExample combining attributes:\n<table cellspacing=5 cellpadding=15 border=4 bordercolor=blue align=center bgcolor=yellow>",
              "hint": "Seven attributes: border (thickness), cellspacing (space between cells), cellpadding (space inside cells), bordercolor, align (position), bgcolor (background), height/width."
            },
            {
              "id": "q23",
              "html": "Explain the types of lists with suitable HTML code.",
              "answer": "HTML supports three types of lists:\n\n1. Ordered List (Numbered): Items appear in numerical/alphabetical order.\n<ol type=A start=1>\n  <li> Computer Science\n  <li> Physics\n  <li> Chemistry\n</ol>\nDisplays: A. Computer Science, B. Physics, C. Chemistry\n\n2. Unordered List (Bulleted): Items appear with bullet symbols.\n<ul type=square>\n  <li> Chennai\n  <li> Madurai\n  <li> Coimbatore\n</ul>\nDisplays square bullets before each city name.\n\n3. Definition List: Items have a term and a description.\n<dl>\n  <dt> HTML: </dt>\n  <dd> Hyper Text Markup Language </dd>\n  <dt> CSS: </dt>\n  <dd> Cascading Style Sheets </dd>\n</dl>\nThe term is left-aligned; the description is indented below it.\n\n4. Nested List: A list inside another list.\n<ol>\n  <li> South India\n    <ul type=circle>\n      <li> Tamil Nadu\n      <li> Kerala\n    </ul>\n</ol>",
              "hint": "Three types: Ordered (<ol>, type=1/a/A/i/I, start), Unordered (<ul>, type=disc/square/circle), Definition (<dl>, <dt> term, <dd> description). Include code for each. Add nested list as bonus."
            },
            {
              "id": "q24",
              "html": "What is a Link? Explain the types of links in HTML.",
              "answer": "A link (hyperlink) in HTML connects web resources. Two things needed: (1) the URL or file path, and (2) the clickable text. The <a> anchor tag is used with the href (Hypertext Reference) attribute.\n\nSyntax: <a href=\"URL or path\"> Clickable Text </a>\n\nTypes of Links:\n\n1. Internal Links: Link to a section within the same document.\n   Step 1: Create a named anchor at the target: <a name=\"section1\"> Section Heading </a>\n   Step 2: Create the link: <a href=\"#section1\"> Go to Section 1 </a>\n   The # symbol indicates an internal target.\n   Use case: Long documents with a table of contents.\n\n2. External Links: Link to a page on an external website.\n   Syntax: <a href=\"http://www.tnscert.org\"> SCERT Tamilnadu </a>\n   When clicked, the browser opens the specified URL.\n\n3. Local File Links: Link to another HTML file in the same folder.\n   Syntax: <a href=\"writer.htm\"> OpenOffice Writer </a>\n   Used to create multi-page websites.\n\nHTML Link Colours (default):\n- Unvisited link: underlined and blue\n- Visited link: underlined and purple\n- Active link: underlined and red",
              "hint": "Links use <a href>. Types: Internal (#anchorName — same page), External (http:// URL — different website), Local (filename.htm — same folder). Default colours: unvisited=blue, visited=purple, active=red."
            }
          ]
        }
      ]
    }
  ]
}
