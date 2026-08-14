export default {
  chapterNumber: 6,
  title: "Introduction to Word Processor",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction to Word Processor",
      content: `A **word processor** is computer software used to create, edit, manipulate, transmit, store, and retrieve text documents. This activity is called **Word Processing**.

**Popular Word Processing Software:**

*Proprietary:* Microsoft Word (Microsoft), WPS Word (Kingsoft), WordPro (Lotus)

*Open Source:* OpenOffice Writer (Apache), LibreOffice Writer (The Document Foundation), AbiWord

**OpenOffice** is the leading open-source office suite for word processing, spreadsheets, presentations, graphics, and databases. Available in many languages; stores data in an international open standard format.

OpenOffice components:
- **Writer** — Word Processor
- **Calc** — Spreadsheet
- **Base** — Database
- **Impress** — Presentation
- **Draw** — Drawing
- **Formula** — Mathematical equations

**OpenOffice Writer** additional features: Templates and styles, page layout (frames, columns, tables), embedded graphics, built-in drawing tools, master documents, change tracking, database integration, PDF export.`,
      nav: { next: "writer-window", nextLabel: "Writer Window →" }
    },
    {
      id: "writer-window",
      title: "Parts of the Writer Window",
      content: `**Creating a New Document:** Start → All Programs → OpenOffice → OpenOffice Writer. Or from Star Center (welcome screen): double-click OpenOffice icon → click "Text Document". Or File → New → Text Document (Ctrl+N).

**Parts of the Writer Window:**

**Title Bar:** Top of window; displays document name and application name. Default name is "Untitled1". Contains control buttons (Minimize, Maximize/Restore, Close).

**Control Buttons:**
- **Minimize:** Shrinks window to taskbar button.
- **Maximize:** Full screen; changes to Restore button.
- **Restore:** Returns to original size.
- **Close (X):** Closes the application. The X on the Menu bar closes only the document (not the application).

**Menu Bar:** Below the title bar. Menus include:
- **File** — New, Open, Close, Save, Save As, Print, Export
- **Edit** — Cut, Copy, Paste, Undo, Redo, Find & Replace
- **View** — Toolbars, web/print layout, navigator
- **Insert** — Pictures, tables, charts, headers, footers, special characters
- **Format** — Font, paragraph, page, bullets, numbering
- **Table** — Create/manage tables (insert rows/columns, merge/split cells)
- **Tools** — Spell check, macros, mail merge, AutoCorrect
- **Window** — New Window, Split, Freeze
- **Help** — Built-in help

**Standard Toolbar:** Below menu bar; shortcut icons for Cut, Copy, Paste, Undo, etc.

**Formatting Toolbar:** Below Standard toolbar; formatting icons (Bold, Italic, Underline, Font type, Font size, Font color, alignment).

**Ruler:** Scale below Formatting toolbar showing margins. Horizontal ruler: left/right margins. Vertical ruler: top/bottom margins.

**Work Space:** Blank area for typing. Contains a flashing vertical bar — the **Insertion Pointer**.

**Status Bar:** Bottom of window; shows page count, current page, language, etc.`,
      nav: { back: "intro", next: "editing", nextLabel: "Editing a Document →" }
    },
    {
      id: "editing",
      title: "Entering and Editing Text",
      content: `**Entering Text:** Click in the workspace and start typing. Text appears at the insertion pointer. **Word Wrap** automatically moves text to the next line — do NOT press Enter at the end of each line. Press Enter only at the end of a paragraph or to insert a blank line.

**Moving within a Document (Keyboard Shortcuts):**

| Key | Action |
|-----|--------|
| Arrow keys | Move one character/line |
| Ctrl + →/← | One word right/left |
| Home / End | Beginning/end of line |
| Ctrl + Home/End | Beginning/end of document |
| Page Up/Down | Scroll one screen |
| Tab / Shift+Tab | Move one cell right/left (in tables) |

**Editing:**
- **Backspace:** Deletes character to the LEFT of insertion pointer.
- **Delete:** Deletes character to the RIGHT of insertion pointer.
- **Insert Mode:** Newly typed text inserts; existing text moves right. Press Insert key to toggle.
- **Type Over Mode:** Newly typed text overwrites existing text.

**Tamil Typing Interface:** Two methods — using Tamil fonts (drawbacks: needs specific font, not portable, Unicode incompatible) or using a Tamil interface like **Murasu** (http://anjal.net/download) or **NHM Writer** (http://software.nhm.in) which use Unicode, so knowledge of Tamil typing is not required.

**Selecting Text:**
- **Continuous text:** Move pointer to start → hold Shift → drag across text.
- **Non-continuous text:** Move to start → hold Ctrl → drag across text.
- **With mouse:** Click and drag.
- **With keyboard:** Move to start → hold Shift → use arrow keys.
- **Select a word:** Double-click.
- **Select all:** Ctrl + A.

**Moving Text (Cut and Paste):** Select → Ctrl+X (Cut) → move pointer → Ctrl+V (Paste).

**Copying Text:** Select → Ctrl+C (Copy) → move pointer → Ctrl+V (Paste).

**Paste Special (Ctrl+Shift+V):** Pastes only specific aspects (e.g., formatting only, or value only). Supports DDE (Dynamic Data Exchange) — pasted data stays linked to source; changes in source reflect in destination.

| Operation | Icon | Shortcut |
|-----------|------|----------|
| Cut | Scissors | Ctrl+X |
| Copy | Pages | Ctrl+C |
| Paste | Clipboard | Ctrl+V |
| Undo | Arrow | Ctrl+Z |`,
      nav: { back: "writer-window", next: "formatting", nextLabel: "Text Formatting →" }
    },
    {
      id: "formatting",
      title: "Text and Paragraph Formatting",
      content: `**Text Formatting Shortcuts:**

| Format | Shortcut | Effect |
|--------|----------|--------|
| Bold | Ctrl+B | Makes text bold |
| Italic | Ctrl+I | Italicises text |
| Underline | Ctrl+U | Underlines text |

**Changing Font:** Click Font Type icon → select font. Default: Times New Roman.
**Changing Size:** Click Font Size icon. Default: 12 points.
**Changing Color:** Click Font Color icon → select from palette. Default: black.
**More options:** Format → Character → Character dialog box (preview available).

**Changing Case:** Select text → Format → Change Case → choose: Uppercase, Lowercase, Sentence Case, Capitalize Every Word, Toggle Case.

**Highlighting:** Select text → click Highlighting icon → select colour. Remove: select text → click No Fill.

**Clear Formatting:** Ctrl+A (select all) → Ctrl+M (clear formatting).

---

**Paragraph Formatting:**

**Alignment (4 types):**
- **Left (Ctrl+L):** Even left margin, uneven right. Default.
- **Right (Ctrl+R):** Even right margin, uneven left.
- **Centre (Ctrl+E):** All lines centred.
- **Justify (Ctrl+J):** Even on both margins; extra space inserted between words automatically.

**Line Spacing:** Right-click → Line Spacing → choose Single, 1.5, or Double. Or Format → Paragraph → Indents & Spacing tab. Seven types available.

**Indentation (4 types):**
- **Left Indent:** Space between paragraph and left margin (default).
- **Right Indent:** Space between paragraph and right margin.
- **First Line Indent:** Indents only the first line (most common for new paragraphs).
- **Hanging Indent:** First line hangs outside; rest of text is indented (negative first-line value).

Apply via Format → Paragraph → Indents & Spacing tab.

**Bullets and Numbering:**
- **Bullets:** For unordered lists (no sequence). Click Bullet icon or Format → Bullets and Numbering → Bullets Tab.
- **Numbering:** For ordered/sequential lists. Click Numbering icon or Format → Bullets and Numbering → Numbering Type Tab. Numbers update automatically.
- **Remove:** Click the Bullet/Numbering icon again to turn off.`,
      nav: { back: "editing", next: "page-formatting", nextLabel: "Page Formatting →" }
    },
    {
      id: "page-formatting",
      title: "Page Formatting and Printing",
      content: `**Page Size:** Default is 8.5 × 11" (A4). Change via Format → Page → Page Tab → select format (A4, Legal, etc.) or enter width/height.

**Page Margins:** White space around the document.
- *Using Ruler:* Drag gray/white boundary on ruler.
- *Using Dialog Box:* Right-click → Page → Page Style dialog → Margins group → enter Left, Right, Top, Bottom values.

**Page Orientation:**
- **Portrait:** Height > Width. Default. Used for books, newspapers.
- **Landscape:** Width > Height. Used for photos, invitations, tables.
Change via Format → Page → Orientation group → Portrait or Landscape.

**Page Colour and Borders:** Format → Page → Background tab (colour or graphic). Borders tab: define border area, line style, and colour.

**Headers and Footers:**
- **Header:** Section at the top margin; displays title, chapter name, author.
- **Footer:** Section at the bottom margin; displays page number, date, time.
- Insert Header: Insert → Header → Default → type text in header area.
- Insert Footer: Insert → Footer → Default → Insert → Fields → Date.
- Once set on the first page, the same header/footer appears on all pages.

**Page Numbers:** Place insertion pointer in header/footer → Insert → Fields → Page Number. Change style: Format → Page → Page Tab → Layout Settings → Format dropdown.

**Find & Replace (Ctrl+F):** Edit → Find & Replace → type search word in "Search for" box → type replacement in "Replace with" → Find (highlights first match) → Replace (replaces current) → Replace All (replaces all). Options: Match Case, Whole Words Only.

**Spell Check:**
- *Auto SpellCheck:* Checks as you type; red wavy underline marks errors. Right-click the word for suggestions.
- *Manual:* Click Spelling icon or press F7. Dialog shows: Not in Dictionary, Suggestions, Ignore Once, Ignore All, Change, Change All, Add to dictionary.
- *AutoCorrect (Tools → AutoCorrect):* Automatically corrects common misspellings (e.g., "hte" → "the"). Add custom entries: Replace tab → enter misspelt word → correct word → click New.

**Tables:**
- *Method 1 (Icon):* Click Table icon dropdown → select grid (rows × columns).
- *Method 2 (Dialog):* Table → Insert → Table (Ctrl+F12) → set rows, columns, name, heading, border.
- **Insert rows/columns:** Right-click inside table → Row → Insert / Column → Insert.
- **Delete rows/columns:** Right-click → Row → Delete / Column → Delete.
- **Merge cells:** Select cells → right-click → Cell → Merge.
- **Split cell:** Click inside cell → right-click → Cell → Split → choose direction and number.

**Printing:**
- Preview: File → Page Preview → Multiple Pages icon to see multiple pages.
- Print: File → Print (Ctrl+P) → General Tab → select printer → set page range and copies → click Print.

**Inserting Objects:**
- *Pictures:* Insert → Picture → From File → browse → Open.
- *Special Characters:* Insert → Special Characters → select symbol → OK.
- *Shapes:* View → Toolbars → Drawing → select tool → click and drag in document.
- *AutoText:* Assign frequently used text to a shortcut. Edit → AutoText (Ctrl+F3) → name it → New. Insert by typing shortcut → Ctrl+F3.`,
      nav: { back: "formatting", practice: true }
    }
  ]
}
