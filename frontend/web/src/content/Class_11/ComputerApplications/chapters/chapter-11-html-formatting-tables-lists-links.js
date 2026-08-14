export default {
  chapterNumber: 11,
  title: "HTML — Formatting Text, Tables, Lists and Links",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "text-formatting",
      title: "Text Formatting Tags",
      content: `**Physical Style Tags** (apply visual formatting directly):

| Tag | Closing | Effect |
|-----|---------|--------|
| \`<b>\` | \`</b>\` | Bold text |
| \`<i>\` | \`</i>\` | Italic text |
| \`<u>\` | \`</u>\` | Underlined text |
| \`<tt>\` | \`</tt>\` | Fixed-width typewriter font |

All are container tags.

**Semantic Tags** (carry meaning, not just style):
- \`<strong>\` — Defines important text; displays as bold (same look as \`<b>\` but means "important").
- \`<em>\` — Emphasised text; displays as italic (same look as \`<i>\` but means "emphasis").

**Size Tags:**
- \`<big>\` — Text larger than normal size.
- \`<small>\` — Text smaller than normal size.

**Highlighting:** \`<mark>\` — Highlights text in default yellow. Example: \`A <mark>computer</mark> is an electronic device.\`

**Subscript and Superscript:**
- \`<sub>\` — Displays text below the normal line. Example: H\`<sub>2</sub>\`O → H₂O
- \`<sup>\` — Displays text above the normal line. Example: (a+b)\`<sup>2</sup>\` → (a+b)²

**Inserted and Deleted Text:**
- \`<ins>\` — Shows text as underlined (marked as inserted).
- \`<del>\` — Shows text as strikethrough (marked as deleted).
- \`<s>\` — Strikethrough (to mark wrong/incorrect text).

**Comparison of similar tags:**

| Tag | Usage | Equivalent | Final Look |
|-----|-------|-----------|------------|
| \`<b>\` | Show text bold | \`<strong>\` (important) | Bold |
| \`<i>\` | Show text italic | \`<em>\` (emphasis) | Italic |
| \`<u>\` | Underline | \`<ins>\` (inserted text) | Underline |
| \`<s>\` | Wrong text | \`<del>\` (deleted text) | Strikethrough |

Use the appropriate tag based on its semantic meaning.

**Center Tag:** \`<center>\` — Centres non-paragraph text content. Container tag.

**Font Tag:** \`<font face="name" size=value color=color>\` — Changes style, size, and colour of text.
- **face:** Font name (use double quotes for multi-word names).
- **size:** Virtual size 1–7 (each size is ~20% larger than previous; 3 is default).
- **color:** Colour name or hexadecimal code.
- Multiple fonts: \`<font face="Arial, Times New Roman">\` — browser tries each in order.
- Note: \`<font>\` tag is not supported in HTML5.

**Section Break — \`<hr>\` (Horizontal Rule):** Separates sections with a horizontal line. Empty tag.

Attributes: \`<hr size=value width=value noshade color=color>\`
- **size:** Thickness in pixels (default: 3px; 72px = 1 inch).
- **width:** Width as pixels or percentage (default: 100%).
- **noshade:** Turns off 3D appearance, shows flat 2D line (Boolean attribute).
- **color:** Line colour (default: gray).
- Note: All \`<hr>\` attributes are not supported in HTML5.`,
      nav: { next: "tables", nextLabel: "Tables in HTML →" }
    },
    {
      id: "tables",
      title: "Tables in HTML",
      content: `Tables (officially introduced in HTML 3.2) are grids of rows and columns used to display tabular data.

**Core Table Tags (all container tags):**

| Tag | Purpose |
|-----|---------|
| \`<table>\` | Creates the table |
| \`<tr>\` | Defines a table row |
| \`<th>\` | Defines a column heading (bold + centred by default) |
| \`<td>\` | Specifies data in a cell |
| \`<caption>\` | Defines a title for the table |
| \`<tbody>\`, \`<thead>\`, \`<tfoot>\` | Define and control table sections |

**Basic Table Structure:**
\`\`\`
<table border=1>
  <caption> Title </caption>
  <tr>
    <th> Heading 1 </th>
    <th> Heading 2 </th>
  </tr>
  <tr>
    <td> Data 1 </td>
    <td> Data 2 </td>
  </tr>
</table>
\`\`\`

**Attributes of \`<table>\`:**

| Attribute | Description |
|-----------|-------------|
| \`border\` | Thickness of border lines in pixels (0 = no border, default) |
| \`cellspacing\` | Space between cells in pixels |
| \`cellpadding\` | Space between cell content and its border in pixels |
| \`bordercolor\` | Colour of the border lines |
| \`align\` | Position of table: left (default), right, center |
| \`bgcolor\` | Background colour of the table |
| \`height\`, \`width\` | Table dimensions in pixels or percentage |

**Attributes of \`<td>\`, \`<th>\`, \`<tr>\`:**

| Attribute | Description |
|-----------|-------------|
| \`align\` | Horizontal alignment: left (default), right, center |
| \`valign\` | Vertical alignment: bottom (default), top, middle |
| \`width\` | Cell width in pixels or percentage |
| \`bgcolor\` | Background colour of a cell |
| \`background\` | Background image for a cell |
| \`rowspan\` | Merge cells vertically across rows |
| \`colspan\` | Merge cells horizontally across columns |`,
      nav: { back: "text-formatting", next: "lists", nextLabel: "Lists in HTML →" }
    },
    {
      id: "lists",
      title: "Lists in HTML",
      content: `HTML supports three types of lists:

**1. Ordered List (Numbered List) — \`<ol>\`...\`</ol>\`**
Items are numbered or lettered in sequence. Each item uses the \`<li>\` tag (closing \`</li>\` is usually omitted).

Attributes of \`<ol>\`:
- **type** — Numbering style:

| Type | Style |
|------|-------|
| \`1\` | 1, 2, 3, 4 ... (default) |
| \`a\` | a, b, c, d ... |
| \`A\` | A, B, C, D ... |
| \`i\` | i, ii, iii, iv ... |
| \`I\` | I, II, III, IV ... |

- **start** — Starting point (decimal number regardless of type). Default: 1.

Example: \`<ol type=i start=5>\` starts from v, vi, vii...

**2. Unordered List (Bulleted List) — \`<ul>\`...\`</ul>\`**
Items are prefixed with bullet symbols. Each item uses the \`<li>\` tag.

Attributes of \`<ul>\`:
- **type** — Bullet style:

| Type | Symbol |
|------|--------|
| \`disc\` | Solid circle (default) |
| \`square\` | Solid square |
| \`circle\` | Unfilled circle |

**3. Definition List — \`<dl>\`...\`</dl>\`**
No bullets or numbers. Each item has two parts:
- \`<dt>\`...\`</dt>\` — Definition Term (left-aligned)
- \`<dd>\`...\`</dd>\` — Definition Description (indented below the term)

**Nested Lists:** A list block defined inside another list.
Example: An ordered list with an unordered list inside each item.`,
      nav: { back: "tables", next: "links", nextLabel: "Links in HTML →" }
    },
    {
      id: "links",
      title: "Links in HTML",
      content: `A **link (hyperlink)** connects web resources — HTML documents, external webpages, or multimedia content (images, video, audio).

Two things needed to create a link:
1. The file path or URL to link to.
2. The clickable text (anchor text).

**The Anchor Tag \`<a>\`:** Used with the **href** attribute (Hypertext Reference).

Syntax: \`<a href="URL or path"> Clickable Text </a>\`

---

**Internal Links:** Link to a particular section of the same document.

Steps:
1. Create a named anchor at the target section: \`<a name="sectionID"> Section Heading </a>\`
2. Create the link pointing to it: \`<a href="#sectionID"> Go to Section </a>\`

The \`#\` symbol indicates an internal target.

---

**External Links:** Link to an external webpage.

Syntax: \`<a href="http://www.tnscert.org"> SCERT </a>\`

When clicked, the browser opens that URL.

---

**Linking Multiple Pages:** Create a master page with links to other HTML files.

\`<a href="writer.htm"> OpenOffice Writer </a>\`

On the linked page, provide a back link: \`<a href="master.htm"> Back to Home </a>\`

---

**HTML Link Colours (default):**
- Unvisited link: underlined and blue
- Visited link: underlined and purple
- Active link (being clicked): underlined and red

These defaults can be changed using CSS.`,
      nav: { back: "lists", practice: true }
    }
  ]
}
