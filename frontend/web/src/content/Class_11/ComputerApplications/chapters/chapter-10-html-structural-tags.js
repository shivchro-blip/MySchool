export default {
  chapterNumber: 10,
  title: "HTML — Structural Tags",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction to HTML",
      content: `**HTML (Hyper Text Markup Language)** is a special markup language used to create web pages. It tells browsers how to display text, images, animations, and other content, and how to make a document interactive through hyperlinks.

HTML is **not** a word processing tool or a programming language. It is a markup (page layout and hyperlink specification) language that describes the structure of a document.

HTML was originally derived from SGML (Standard Generalized Markup Language). To learn HTML, knowledge of SGML is not required.

**HTML is made up of:**
- **Tags (Elements):** HTML keywords that indicate how content should be formatted and displayed. Tags are specified within angle brackets: **< >**. HTML is **not case-sensitive** — \`<HTML>\` and \`<html>\` are identical.
- **Attributes:** Special words inside a tag that provide additional information (e.g., colour, alignment). Attributes improve the appearance of an HTML document. You cannot create your own tags.

**Types of Tags:**
- **Container Elements:** Require both an opening and closing tag. Example: \`<html>.....</html>\`, \`<p>...</p>\`
- **Empty Elements:** Only an opening tag — no closing tag. Example: \`<br>\``,
      nav: { next: "structure", nextLabel: "HTML Document Structure →" }
    },
    {
      id: "structure",
      title: "HTML Document Structure and Structural Tags",
      content: `Every HTML document must follow this general format:

\`\`\`
<html>
<head>
  <title> My First Web Page </title>
</head>
<body>
  This is my First Web Page
</body>
</html>
\`\`\`

**How tags work:** Opening tags turn ON a feature (e.g., \`<h1>\`); closing tags (same name preceded by /) turn it OFF (e.g., \`</h1>\`). Every HTML document is bounded within \`<html>\` and \`</html>\`.

Every web document has two sections:
- **Head Section:** Contains the title of the page (shown in the browser's title bar/tab). Begins with \`<head>\` and ends with \`</head>\`. The \`<title>\` tag specifies the page title.
- **Body Section:** Contains the main content displayed in the browser window. Enclosed within \`<body>\` and \`</body>\`.

**The Four Structural Tags:**

| Tag | Closing Tag | Description |
|-----|-------------|-------------|
| \`<html>\` | \`</html>\` | Identifies the document as HTML. All documents begin and end with this tag. |
| \`<head>\` | \`</head>\` | Contains document information — title, scripts, style definitions. |
| \`<title>\` | \`</title>\` | Contains the page title; shown in browser title bar/tab. Must be inside \`<head>\`. |
| \`<body>\` | \`</body>\` | Encloses all content displayed on the web page. Placed below \`</head>\`. |

**HTML Writing Tools:** A text editor (Notepad for Windows; Getit for Linux) and a browser are all that is needed — no web server or internet connection required.

**Creating a Webpage:**
1. Open Notepad (Start → All Programs → Accessories → Notepad).
2. Type the HTML code.
3. Save: File → Save → type filename with **.htm** or **.html** extension → select "All Files" from "Save as type" → Save.

**Viewing in a Browser:**
- File → Open File (Ctrl+O) → browse to the HTML file → Open.

**Viewing Source File:** View → Page Source (Firefox/Chrome) or View → Source (IE) or press **Ctrl+U** in any browser.

**Editing Source File:** Right-click the HTML file → Open With → Notepad → edit → save (Ctrl+S). Then refresh the browser with **Ctrl+R** or **F5** to see changes.`,
      nav: { back: "intro", next: "attributes", nextLabel: "HTML Attributes →" }
    },
    {
      id: "attributes",
      title: "HTML Attributes and Body Tag",
      content: `Attributes are special words placed **inside the opening tag** to specify additional information. Multiple attributes in a tag are separated by spaces.

**Attributes of \`<html>\` tag:**

| Attribute | Values | Description |
|-----------|--------|-------------|
| \`dir\` | \`ltr\` (default) / \`rtl\` | Text direction: left-to-right or right-to-left (rtl for Arabic). Global attribute. |
| \`lang\` | \`en\`, \`ta\`, \`ml\`, \`hi\`, \`fr\`, etc. | Language of the document. |

**Attributes of \`<body>\` tag:**

**(i) Background Colour — \`bgcolor\`:**
Default background is white. Change with: \`<body bgcolor=color_name/color_code>\`

Colours in HTML are represented as **6-digit hexadecimal values (RGB)**: first 2 digits = Red, next 2 = Green, last 2 = Blue. Range: 00–FF.
- #000000 = Black, #FFFFFF = White, #FF0000 = Red, #0000FF = Blue, #FFFF00 = Yellow
- Modern browsers support ~140 colour names. Hexadecimal values must be prefixed with **#**.
- Example: \`<body bgcolor=yellow>\` or \`<body bgcolor=#FFFF00>\`

**(ii) Body Text Colour — \`text\`:**
Default text colour is black. Change with: \`<body text=color_name/color_code>\`

**(iii) Background Image — \`background\`:**
Apply an image as background: \`<body background="image_name.gif">\`
- If the image is small, the browser repeats it to fill the window.
- If the HTML file and image are in different folders, specify the full path.

**(iv) Margins — \`leftmargin\` and \`topmargin\`:**
Set blank space from left or top edge: \`<body leftmargin=50 topmargin=50>\`
- Value is in **pixels** (72 pixels = 1 inch).

**Combined example:**
\`<body bgcolor=Lime text=blue leftmargin=72 topmargin=72>\``,
      nav: { back: "structure", next: "headings-paragraphs", nextLabel: "Headings and Paragraphs →" }
    },
    {
      id: "headings-paragraphs",
      title: "Headings, Paragraphs, Comments and Tags",
      content: `**Headings:** HTML has six levels: \`<h1>\` to \`<h6>\`. \`<h1>\` is largest/boldest; \`<h6>\` is smallest. All are container tags.

Syntax: \`<h#> Heading text </h#>\`

**Align attribute for headings:** \`<h# align=center/right/justify>\`
Left is default (not supported in latest HTML). Justify is not supported by older browsers.

---

**Line Breaks and Paragraphs:**

Browsers ignore multiple spaces, tabs, and line returns — all text appears on one line. Use HTML tags to control layout:

- **\`<br>\` (Line Break):** Empty tag; no closing tag or attributes. Placed at the end of a line to force a new line.
- **\`<p>\` (Paragraph):** Container tag. Content between \`<p>\` and \`</p>\` is displayed as a paragraph with spacing. Browsers do not recognise the Enter key as a paragraph break.

**Paragraph alignment:** \`<p align=right/center/justify>\` (left is default).

---

**Comments:** Used to describe the page or indicate its status. Not displayed by the browser.

Syntax: \`<! comment text >\`

Comments can be placed anywhere in an HTML document.

---

**Summary of Key Tags:**

| Tag | Type | Function | Attributes |
|-----|------|----------|------------|
| \`<html>\` | Container | Identifies HTML document | dir, lang |
| \`<head>\` | Container | Document header | — |
| \`<title>\` | Container | Document title in browser bar | — |
| \`<body>\` | Container | Main content area | bgcolor, text, background, leftmargin, topmargin |
| \`<h1>\`–\`<h6>\` | Container | Six levels of headings | align |
| \`<p>\` | Container | Paragraph of text | align |
| \`<br>\` | Empty | Line break | — |`,
      nav: { back: "attributes", practice: true }
    }
  ]
}
