export default {
  chapterNumber: 13,
  title: "Python and CSV Files",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-csv-excel",
      title: "Introduction to CSV & CSV vs Excel",
      content: `**13.1 Introduction**

Python has a vast library of modules included with its distribution. The **CSV module** gives the ability to parse CSV (**Comma Separated Values**) files. A CSV file is a human-readable text file where each line has fields separated by commas or another delimiter — each line can be thought of as a row, and each field as a column.

**13.2 Difference between CSV and XLS Formats**

| Excel | CSV |
|---|---|
| Binary file holding all worksheets, content, and formatting | Plain text format with values separated by commas |
| Can only be read/written by applications specifically built to handle its format | Can be opened with any text editor (Notepad, MS Excel, OpenOffice, etc.) |
| Saves files into its own proprietary format (xls/xlsx) | A format for saving tabular data into a delimited text file (.csv) |
| Consumes more memory while importing data | Importing is faster and uses less memory |

Files saved in Excel cannot be opened or edited by plain text editors.

**13.3 Purpose of CSV File**

CSV is a simple format for storing tabular data (like a spreadsheet or database). Since it's plain text, it's easier to import into a spreadsheet or another storage database, regardless of the software used. CSV files can be opened in a spreadsheet program, a text editor, or through a database.

**Note:** A CSV file cannot store charts or graphs — it stores data, but not formatting, formulas, or macros. A CSV file is also known as a **Flat File**. CSV files can be imported to and exported from programs that store data in tables, like Microsoft Excel or OpenOffice Calc.`,
      nav: { next: "creating-csv-textformat", nextLabel: "Next: Creating CSV Files & Formatting Rules →" }
    },
    {
      id: "creating-csv-textformat",
      title: "Creating CSV Files & Formatting Rules",
      content: `**13.4 Creating a CSV File Using Notepad (or any text editor)**

A CSV file is a text file, so it can be created and edited with any text editor — though it's more often created by exporting from a spreadsheet/database program.

**13.4.1 Creating a Normal CSV File** — open a new file (File→New or Ctrl+N), enter data with each value separated by a comma and each row on a new line:
\`\`\`
Topic1,Topic2,Topic3
one,two,three
Example1,Example2,Example3
\`\`\`
Save with the extension **.csv**.

**13.4.2 CSV File Containing Commas Within Data**

If a field's data itself contains commas, enclose that field in **double-quotes (" ")** so its internal commas aren't mistaken for delimiters:
\`\`\`
RollNo, Name, Address
12101, Nivetha, "Mylapore, Chennai"
12102, Lavanya, "Adyar, Chennai"
\`\`\`
The same applies to **newlines** within field data — any field containing a newline must also be enclosed in double-quotes.

**13.4.3 CSV File Containing Double Quotes Within Data**

If a field itself contains double-quotes as part of its data, the internal quotation marks must be **doubled** so they're interpreted correctly (e.g., \`""Cricket""\`).

**13.4.4 Rules to Format Data in a CSV File**
1. Each record (row) is on a separate line, delimited by a line break.
2. The last record may or may not have an ending line break.
3. An optional header line may appear first, with the same format as normal records — same number of fields.
4. Fields are separated by commas; spaces are considered PART of a field and not ignored. The last field must NOT be followed by a comma.
5. Each field may or may not be enclosed in double quotes; if NOT enclosed, double quotes may not appear inside the field.
6. Fields containing line breaks, double quotes, or commas MUST be enclosed in double quotes.
7. If double quotes enclose a field, any double-quote appearing INSIDE that field must be preceded by another double quote.

**13.5 Create a CSV File Using Microsoft Excel**

Enter data in the Excel worksheet, then File → Save As → choose "CSV (Comma delimited)" as the save type (or type the file name with .csv extension). After saving, you can open the file in a text editor to view/edit it manually.

**13.5.1 Microsoft Excel to Open a CSV File**

By default, double-clicking a CSV file opens it in Excel (if installed). If prompted with "Open With", choose Microsoft Excel. Alternatively, use File → Open in Excel and change the file type filter to Text Files (*.prn, *.txt, *.csv) if the CSV isn't listed. If both MS Excel and OpenOffice Calc are installed, CSV files open in MS Excel by default.`,
      nav: { back: "intro-csv-excel", next: "file-basics-reading", nextLabel: "Next: File Basics & Reading CSV with Python →" }
    },
    {
      id: "file-basics-reading",
      title: "File Handling Basics & Reading CSV Files",
      content: `**13.6 Read and Write a CSV File Using Python**

Python provides the **csv** module for reading, writing, and processing CSV data. File operations follow three steps: **(1) Open a file → (2) Perform read/write → (3) Close the file.**

**Opening a file:** Python's built-in **open()** function returns a **file object** (handle).
\`\`\`
f = open("sample.txt")           # open in current directory
f = open('c:\\pyprg\\sample.csv')  # specify full path
\`\`\`
**File Modes:**

| Mode | Description |
|---|---|
| 'r' | Open for reading (default) |
| 'w' | Open for writing; creates new or truncates existing |
| 'x' | Exclusive creation — fails if the file already exists |
| 'a' | Append at the end without truncating; creates new if not existing |
| 't' | Text mode (default) |
| 'b' | Binary mode (used for non-text files like images) |
| '+' | Open for updating (reading and writing) |

**Closing a file** frees resources — done with **close()**. A safer alternative is the **with** statement, which automatically closes the file when its block exits, even if an exception occurs:
\`\`\`
with open("test.txt", 'r') as f:
    # perform file operations
\`\`\`

**13.6.1 Reading a CSV File** — two ways: (1) csv module's **reader()** function, (2) the **DictReader** class.

**13.6.1.1 csv.reader() Function**

Reads each line and produces a list of columns.
\`\`\`
csv.reader(fileobject, delimiter, fmtparams)
\`\`\`
- fileobject: the file's path/mode
- delimiter: optional (default comma) — e.g., | for pipe-delimited files
- fmtparams: optional overrides (e.g., skipinitialspace, quoting)

**Reading with the default comma delimiter:**
\`\`\`
import csv
with open('c:\\pyprg\\sample1.csv', 'r', newline='') as F:
    reader = csv.reader(F)
    for row in reader:
        print(row)
\`\`\`

**Reading data with leading spaces** — remove whitespace after the delimiter by registering a new **dialect** with **skipinitialspace=True** (default is False):
\`\`\`
import csv
csv.register_dialect('myDialect', delimiter=',', skipinitialspace=True)
F = open('c:\\pyprg\\sample2.csv', 'r')
reader = csv.reader(F, dialect='myDialect')
for row in reader:
    print(row)
\`\`\`
**Note:** A dialect is a csv module class describing a CSV file's format — it lets you create, store, and reuse formatting parameters.

**Reading files with custom delimiters** (e.g., pipe |):
\`\`\`
import csv
csv.register_dialect('myDialect', delimiter='|')
with open('c:\\pyprg\\sample4.csv', 'r', newline='') as f:
    reader = csv.reader(f, dialect='myDialect')
    for row in reader:
        print(row)
\`\`\``,
      nav: { back: "creating-csv-textformat", next: "reading-columns-lists-dict", nextLabel: "Next: Reading Columns, Lists & Dictionaries →" }
    },
    {
      id: "reading-columns-lists-dict",
      title: "Reading Specific Columns, Lists, Sorting & Dictionaries",
      content: `**13.6.2 Reading a Specific Column**
\`\`\`
import csv
f = open("c:\\pyprg\\ch13sample5.csv", 'r')
readFile = csv.reader(f)
for col in readFile:
    print(col[0], col[3])   # print columns 0 and 3 only
f.close()
\`\`\`

**13.6.3 Read a CSV File and Store it in a List**
\`\`\`
import csv
F = open('c:\\pyprg\\sample.csv', 'r')
reader = csv.reader(F)
arrayValue = []
for row in reader:
    arrayValue.append(row)
    print(row)
F.close()
\`\`\`

**13.6.4 Store a Column in a List for Sorting**

Use **next(reader)** to skip the header row before sorting.
\`\`\`
import csv
F = open('c:\\pyprg\\sample6.csv', 'r')
reader = csv.reader(F)
next(reader)                     # skip header
arrayValue = []
a = int(input("Enter the column number: "))
for row in reader:
    arrayValue.append(row[a])
arrayValue.sort(reverse=True)    # descending order
for row in arrayValue:
    print(row)
F.close()
\`\`\`
**Note:** \`list_name.sort()\` arranges ascending; \`list_name.sort(reverse=True)\` arranges descending.

**13.6.5 Sorting a CSV File by a Specified Column**

Use \`operator.itemgetter(col_no)\` with the built-in **sorted()** function.
\`\`\`
import csv, operator
data = csv.reader(open('c:\\pyprg\\sample8.csv'))
next(data)                                          # skip header
sortedlist = sorted(data, key=operator.itemgetter(1))   # sort by 2nd column
for row in sortedlist:
    print(row)
\`\`\`
**Note:** \`sorted()\` returns a NEW sorted list; \`sort()\` modifies the original list in place and returns nothing.

**13.6.6 Reading a CSV File Into a Dictionary**

**DictReader** maps data to a dictionary — keys come from the first (header) row.
\`\`\`
import csv
input_file = csv.DictReader(open('c:\\pyprg\\sample8.csv', 'r'))
for row in input_file:
    print(dict(row))    # dict() converts to plain dictionary format
\`\`\`
Without dict(), each row prints as an **OrderedDict** — a dictionary subclass preserving insertion order.

**13.6.7 Reading with a User-Defined Delimiter Into a Dictionary**

Register a dialect and pass it to DictReader:
\`\`\`
import csv
csv.register_dialect('myDialect', delimiter='|', skipinitialspace=True)
with open('c:\\pyprg\\sample8.csv', 'r', newline='') as csvfile:
    reader = csv.DictReader(csvfile, dialect='myDialect')
    for row in reader:
        print(dict(row))
\`\`\`

**Key difference:** \`csv.reader\`/\`csv.writer\` work with lists/tuples; \`csv.DictReader\`/\`csv.DictWriter\` work with dictionaries and take an additional \`fieldnames\` argument used as dictionary keys.`,
      nav: { back: "file-basics-reading", next: "writing-csv-files", nextLabel: "Next: Writing to CSV Files →" }
    },
    {
      id: "writing-csv-files",
      title: "Writing Data to CSV Files",
      content: `**13.7 Writing Data Into CSV Files**

**13.7.1 Creating a New Normal CSV File**

\`csv.writer()\` returns a writer object converting data into delimited strings. \`writerow()\` writes ONE row; \`writerows()\` writes MULTIPLE rows at once.
\`\`\`
csv.writer(fileobject, delimiter, fmtparams)
\`\`\`
\`\`\`
import csv
csvData = [['Student', 'Age'], ['Dhanush', '17'], ['Kalyani', '18'], ['Ram', '15']]
with open('c:\\pyprg\\Pupil.csv', 'w', newline='') as CF:
    writer = csv.writer(CF)
    writer.writerows(csvData)
\`\`\`

**13.7.2 Modifying an Existing File**

Read the file into a list, modify the desired index, then write the entire list back:
\`\`\`
import csv
row = ['3', 'Meena', 'Bangalore']
with open('student.csv', 'r', newline='') as readFile:
    reader = csv.reader(readFile)
    lines = list(reader)
    lines[3] = row
with open('student.csv', 'w') as writeFile:
    writer = csv.writer(writeFile)
    writer.writerows(lines)
\`\`\`

**13.7.2.1 Adding a New Row (Appending)**

Open the file in **'a'** (append) mode — adds without overwriting existing content:
\`\`\`
import csv
row = ['6', 'Sajini', 'Madurai']
with open('student.csv', 'a', newline='') as CF:
    writer = csv.writer(CF)
    writer.writerow(row)
\`\`\`
**Note:** 'w' mode creates a new file, OVERWRITING an existing one. 'a' mode adds data at the end, creating a new file only if one doesn't already exist. \`writerow()\` writes ONE row (1D data); \`writerows()\` writes MULTIPLE rows (2D data).

**13.7.3 CSV Files with Quotes**

Register a dialect with \`quoting=csv.QUOTE_ALL\`:
\`\`\`
import csv
csv.register_dialect('myDialect', quoting=csv.QUOTE_ALL)
with open('c:\\pyprg\\person.csv', 'w', newline='') as f:
    writer = csv.writer(f, dialect='myDialect')
    for row in info:
        writer.writerow(row)
\`\`\`

**13.7.4 CSV Files with Custom Delimiters** — register a dialect with a custom delimiter (e.g., pipe |).

**13.7.5 CSV File with a Line Terminator** — the default line terminator is \\r or \\n; a custom one can be set via \`lineterminator\` in a dialect. **Note:** Python's csv module only accepts \\r\\n, \\n, or \\r as line terminators.

**13.7.6 CSV File with Quote Characters** — register a dialect with a custom \`quotechar\` (default is double-quote ").

**13.7.7 Writing a CSV File From a Dictionary**

**DictWriter** writes dictionary data, using \`fieldnames\` for column headings:
\`\`\`
import csv
data = [{'MOUNTAIN':'Everest', 'HEIGHT':'8848'}, {'MOUNTAIN':'Anamudi', 'HEIGHT':'2695'}]
with open('c:\\pyprg\\peak.csv', 'w', newline='') as CF:
    fields = ['MOUNTAIN', 'HEIGHT']
    w = csv.DictWriter(CF, fieldnames=fields)
    w.writeheader()
    w.writerows(data)
\`\`\`

**13.7.8 Getting Data at Runtime and Writing to a File**

Data can be accepted via input() and written directly to a CSV:
\`\`\`
import csv
with open('c:\\pyprg\\dynamicfile.csv', 'w', newline='') as f:
    w = csv.writer(f)
    ans = 'y'
    while (ans == 'y'):
        name = input("Name?: ")
        date = input("Date of birth: ")
        place = input("Place: ")
        w.writerow([name, date, place])
        ans = input("Do you want to enter more y/n?: ")
\`\`\``,
      nav: { back: "reading-columns-lists-dict", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- A CSV file is a human-readable text file where each line has fields separated by commas or another delimiter; also called a Flat File.
- Excel is a binary file format; CSV is a plain text format.
- Two ways to read a CSV file: csv.reader() function and the DictReader class.
- The default file mode is text ('t'); binary mode ('b') is used for non-text files like images.
- Python's garbage collector cleans up unreferenced objects, but you should still explicitly close() files to free resources tied to them.
- "skipinitialspace" removes whitespace after the delimiter (default False).
- operator.itemgetter() sorts by a specific column, including multiple columns for multi-level sorting.
- DictReader()/DictWriter() map CSV data to/from dictionaries, using fieldnames as dictionary keys; csv.reader()/csv.writer() work with lists/tuples instead.
- The csv.writer() function returns a writer object converting data into delimited strings — writerow() writes one row at a time; writerows() writes all rows at once.
- Adding a new row at the end of an existing file is called appending a row (using file mode 'a').`,
      nav: { back: "writing-csv-files", practice: true }
    }
  ]
}
