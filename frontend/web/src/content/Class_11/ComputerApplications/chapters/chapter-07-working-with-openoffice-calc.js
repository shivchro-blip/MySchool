export default {
  chapterNumber: 7,
  title: "Working with OpenOffice Calc",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction to Spreadsheets",
      content: `A **spreadsheet** is a software application used to organize, store, and manipulate data in rows and columns. It is widely used for financial calculations, data analysis, charts, and reports.

**OpenOffice Calc** is the open-source spreadsheet component of OpenOffice. It is similar to Microsoft Excel. The default file extension for Calc files is **.ods** (OpenDocument Spreadsheet).

**Starting Calc:** Start → All Programs → OpenOffice → OpenOffice Calc. Or from Star Center: click the "Spreadsheet" icon.

**Data Types in Calc:**
- **Alphabetic:** Alphabets only (text/labels)
- **Numeric:** Numbers only (whole or fractional)
- **Alphanumeric:** Combination of alphabets and numbers
- **Date:** Date values
- **Time:** Time values`,
      nav: { next: "calc-window", nextLabel: "Calc Window →" }
    },
    {
      id: "calc-window",
      title: "Parts of the OpenOffice Calc Window",
      content: `**1. Title Bar:** Top of window; shows filename and application. Default: "Untitled1".

**2. Control Buttons:** Minimize, Maximize/Restore, Close (same as Writer).

**3. Menu Bar:** File, Edit, View, Insert, Format, Tools, Data, Window, Help.
- **Data menu** (unique to Calc): Sort, Filter, Subtotal, Validity.

**4. Toolbars (3 by default):**
- **Standard Toolbar:** File/Edit/Data commands as icons.
- **Formatting Toolbar:** Font, size, colour, alignment, cell formatting.
- **Formula Bar:** Most important element in Calc. Contains:
  - **Name Box (Address Box):** Displays the current cell address.
  - **Function Wizard:** Used to insert functions.
  - **Sum Button:** Quickly inserts the SUM function.
  - **Function Button:** Inserts a function.
  - **Input Line:** Shows the contents of the active cell; used to edit.

**5. Scroll Bars:** Vertical (move up/down) and Horizontal (move left/right).

**6. Rows, Columns, and Cells:**
- **Columns:** Labelled A, B, C, ... AA, AB, ... AMJ (1024 columns in Calc 4.1.5; 16,384 in Excel 2016).
- **Rows:** Numbered 1, 2, 3, ... (1,048,576 rows).
- **Cell:** Intersection of a row and column. Each cell has a unique **Cell Address** (column letter + row number). Example: Column B, Row 4 → **B4**.
- **Cell Pointer:** Rectangle that moves around the worksheet. The cell it occupies is the **Active Cell**.
- **Home Cell:** Cell A1 — where the cell pointer starts in a new spreadsheet.

**7. Worksheet Tabs:** At the bottom of the grid. Default: Sheet1, Sheet2, Sheet3 (Sheet1 is active, shown in white). 
- Navigate between sheets using 4 navigation buttons (First, Previous, Next, Last).
- To rename: Double-click sheet tab → type new name → OK.
- Status bar shows: Sheet 3/12 (current sheet number / total sheets).

**8. Status Bar:** Below sheet tabs. Shows:
- **Sheets count:** Current/total (e.g., 3/12).
- **Page Style:** Double-click to change margins, orientation, etc.
- **Selection Mode:** STD (Standard), EXT (Extend), ADD (Add).
- **Unsaved Changes:** Asterisk (*) appears when there are unsaved changes.
- **Zoom:** Zoom level of the spreadsheet.`,
      nav: { back: "intro", next: "working-data", nextLabel: "Working with Data →" }
    },
    {
      id: "working-data",
      title: "Working with Data and Formulas",
      content: `**Moving the Cell Pointer:**
- Arrow keys: Move one cell in any direction.
- **Tab:** Move right; **Shift+Tab:** Move left.
- **Enter:** Move down to next row.
- **Ctrl+Home:** Go to cell A1.
- **Ctrl+End:** Go to last used cell.
- **Ctrl+Arrow:** Jump to last cell with data in that direction.

**Entering Data:** Click a cell → type data → press Enter or Tab. The data appears in the cell and the Input Line.

**Editing Data:** Click the cell → edit in Input Line, or press F2 to edit directly in the cell.

**Selecting Cells:**
- Single cell: Click on it.
- Range: Click first cell → drag to last cell (e.g., A1:C5).
- Non-adjacent: Ctrl+Click each cell/range.
- Entire row/column: Click row number or column letter.
- Entire sheet: Ctrl+A.

**Cell Reference Types:**
- **Relative Reference (A1):** Adjusts automatically when formula is copied.
- **Absolute Reference ($A$1):** Stays fixed when copied (press F4 to toggle).
- **Mixed Reference ($A1 or A$1):** Column or row is fixed.

**Formulas:** Always begin with **=** (equal sign).
Examples:
- =A1+B1 (addition)
- =A1-B1 (subtraction)
- =A1*B1 (multiplication)
- =A1/B1 (division)

**Common Functions:**
- **=SUM(A1:A10)** — Sum of a range
- **=AVERAGE(A1:A10)** — Average of a range
- **=MAX(A1:A10)** — Largest value
- **=MIN(A1:A10)** — Smallest value
- **=COUNT(A1:A10)** — Count of numeric cells
- **=IF(condition, value_if_true, value_if_false)** — Conditional logic

**AutoSum:** Click the cell below a column of numbers → click the Sum (Σ) button → press Enter.`,
      nav: { back: "calc-window", next: "formatting", nextLabel: "Formatting in Calc →" }
    },
    {
      id: "formatting",
      title: "Formatting Cells and Data",
      content: `**Formatting Cells:** Select cells → Format → Cells (Ctrl+1). The Format Cells dialog has tabs:

- **Numbers:** Set number format (number, currency, percentage, date, time, scientific, fraction).
- **Font:** Font type, size, colour, bold, italic, underline.
- **Font Effects:** Strikethrough, outline, shadow, relief, font colour.
- **Alignment:** Horizontal (left, right, centre, justify), Vertical, Wrap text, Merge cells, Text orientation.
- **Borders:** Line style and colour for cell borders.
- **Background:** Cell background colour.
- **Cell Protection:** Lock or hide cells.

**Merging Cells:** Select cells → Format → Merge Cells → Merge Cells. Or use Merge Cells button in toolbar.

**Wrapping Text:** Format → Cells → Alignment → check "Wrap Text Automatically".

**Row and Column Operations:**
- **Insert row:** Right-click row number → Insert Rows Above/Below.
- **Insert column:** Right-click column letter → Insert Columns Before/After.
- **Delete row/column:** Right-click → Delete Rows/Columns.
- **Resize row height:** Drag the row border in the row number area, or Format → Rows → Height.
- **Resize column width:** Drag the column border in the column header, or Format → Columns → Optimal Width.
- **Hide/Show rows/columns:** Format → Rows/Columns → Hide/Show.

**AutoFill:** Enter data in first cell → drag the Fill Handle (small square at bottom-right of cell) to auto-fill series (numbers, dates, months, etc.).

**Sorting Data:** Select data range → Data → Sort → choose column and ascending/descending order.

**Filtering Data:** Data → AutoFilter → click dropdown arrows on column headers to filter.`,
      nav: { back: "working-data", next: "charts", nextLabel: "Charts →" }
    },
    {
      id: "charts",
      title: "Charts, Printing and Saving",
      content: `**Creating Charts:** Select the data range → Insert → Chart → Chart Wizard opens:
1. **Step 1:** Choose chart type (Bar, Column, Line, Pie, Area, etc.) and shape.
2. **Step 2:** Set data range and series.
3. **Step 3:** Set data series details.
4. **Step 4:** Add title, subtitle, axis labels, legend → Finish.

Double-click the chart to edit it. Click outside to return to the spreadsheet.

**Common Chart Types:**
- **Column/Bar:** Compare values across categories.
- **Line:** Show trends over time.
- **Pie:** Show proportions of a whole.
- **Area:** Show cumulative totals over time.

**Saving the File:**
- First save: File → Save As (Ctrl+S) → choose location → enter filename → select format (.ods for Calc, .xlsx for Excel-compatible) → Save.
- Save with password: Check "Save with Password" → enter and confirm password.

**Page Setup for Printing:**
- Format → Page → set margins, orientation, paper size.
- Insert headers/footers: Insert → Headers and Footers.
- Set print area: Select range → Format → Print Ranges → Define.
- Preview: File → Page Preview.
- Print: File → Print (Ctrl+P) → set printer, pages, copies → Print.

**Freeze Rows/Columns:** Click the cell below and to the right of the rows/columns to freeze → View → Freeze Rows and Columns. Useful for keeping headers visible while scrolling.

**Sorting and Data Tools:**
- Sort: Data → Sort → select key column → ascending or descending.
- Subtotal: Data → Subtotals → add subtotals by group.
- Validity: Data → Validity → restrict what can be entered in a cell (e.g., numbers only, within a range).`,
      nav: { back: "formatting", practice: true }
    }
  ]
}
