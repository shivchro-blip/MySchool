export default {
  chapterNumber: 13,
  title: "CSS \u2014 Cascading Style Sheets",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction to CSS",
      content: `**CSS (Cascading Style Sheets)** is used to control the presentation and appearance of HTML documents. CSS was invented by **Hakon Wium Lie on October 10, 1994** and is maintained through the **CSS Working Group** within the W3C.

CSS is easy to learn but provides powerful control over the presentation of HTML documents. It is most commonly combined with HTML or XHTML.

**Types of Style Sheets:**

**1. Internal Style Sheets (Page-Level Styles):**
Defined within the \`<style>\` tag in the \`<head>\` section of an HTML document. The \`<style>\` tag controls the presentation styles of that particular document. Professional web developers generally do not use internal styles.

\`\`\`
<head>
  <style type="text/css">
    p { color: red; font-size: 14px; }
  </style>
</head>
\`\`\`

**2. External Style Sheets (Sitewide Style Sheets / CSS files):**
Style definitions saved in a separate file with a **.css extension**. Used across multiple web pages — change the CSS file and all linked pages update. The \`<link>\` tag in the \`<head>\` section connects the CSS file to the HTML document.

General format of \`<link>\` tag:
\`<link rel="stylesheet" type="text/css" href="CSS_filename.css">\`

**3. Inline Styles:**
Style defined for a specific tag anywhere in the HTML document using the \`style\` attribute. Used for one-off formatting.
\`<p style="color:blue; font-size:16px;">Text</p>\`

**CSS Comments:** \`/* This is a CSS comment */\``,
      nav: { next: "syntax", nextLabel: "CSS Syntax and Properties \u2192" }
    },
    {
      id: "syntax",
      title: "CSS Syntax and Declaration",
      content: `A CSS style declaration has two major parts: **Selector** and **Declaration**.

- **Selector:** Refers to the HTML tag in which you want to apply styles.
- **Declaration:** A block of code containing style definitions, surrounded by **curly braces \`{ }\`**.
- Each property is separated by a **semicolon \`;\`**
- Property name and value are separated by a **colon \`:\`**

\`\`\`
Selector {
  property: value;
  property: value;
}
\`\`\`

Example:
\`\`\`
p {
  font-size: 16pt;
  color: red;
  font-weight: bold;
}
\`\`\`

This applies the style to every \`<p>\` tag. Each declaration must end with a semicolon.

**Creating a CSS file:**
1. Open Notepad.
2. Type the style properties and values.
3. Save with a **.css** extension (e.g., mystyle.css).

**Linking CSS to HTML:**
\`\`\`
<link rel="stylesheet" type="text/css" href="mystyle.css">
\`\`\`

Place this in the \`<head>\` section. The attributes \`rel="stylesheet"\` and \`type="text/css"\` must always be included. The \`href\` attribute points to the CSS file name.`,
      nav: { back: "intro", next: "properties", nextLabel: "CSS Properties \u2192" }
    },
    {
      id: "properties",
      title: "CSS Text and Background Properties",
      content: `**CSS Text Formatting Properties:**

| Formatting | Property | Values | Example |
|-----------|----------|--------|---------|
| Text Colour | \`color\` | Colour name | \`p { color: pink; }\` |
| Text Alignment | \`text-align\` | center / left / right / justify | \`p { text-align: center; }\` |
| Font Type | \`font-family\` | Font name | \`p { font-family: "Times New Roman"; }\` |
| Font Style | \`font-style\` | normal / italic | \`p { font-style: italic; }\` |
| Font Weight (Bold) | \`font-weight\` | normal / bold | \`p { font-weight: bold; }\` |
| Font Size | \`font-size\` | size in pixels (px) | \`p { font-size: 14px; }\` |
| Background Colour | \`background-color\` | Colour name | \`body { background-color: violet; }\` |
| Border | \`border\` | thickness style colour | \`h2 { border: 2px solid red; }\` |

HTML supports nearly **140 colour names**.

**Background Image Properties:**

| Property | Values | Description |
|----------|--------|-------------|
| \`background-image\` | url("image.gif") | Sets background image |
| \`background-repeat\` | norepeat | Prevents image from tiling |
| \`background-position\` | direction (e.g., right top) | Positions the image |

Example:
\`\`\`
body {
  background-image: url("Flower.gif");
  background-repeat: norepeat;
  background-position: right top;
}
\`\`\`

**Margin Properties:**
\`margin-top\`, \`margin-bottom\`, \`margin-left\`, \`margin-right\` — all take values in pixels.

Example:
\`\`\`
p {
  margin-top: 50px;
  margin-left: 50px;
}
\`\`\``,
      nav: { back: "syntax", practice: true }
    }
  ]
}
