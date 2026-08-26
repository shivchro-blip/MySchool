export default {
  chapterNumber: 13,
  title: "பைத்தான் மற்றும் CSV கோப்புகள்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-csv-excel",
      title: "CSV அறிமுகம் & Excel ஒப்பீடு",
      content: `**13.1 அறிமுகம்**

CSV (Comma Separated Values) என்பது தரவை காற்புள்ளியால் பிரித்து சேமிக்கும் ஒரு எளிய, உரை (Plain Text) அடிப்படையிலான கோப்பு வடிவமாகும்.

**13.2 CSV மற்றும் XLS கோப்புகளுக்கிடையேயான வேறுபாடு**

| CSV | Excel (XLS) |
|---|---|
| காற்புள்ளியால் பிரிக்கப்பட்ட, Plain Text வடிவம் | வடிவூட்டல்கள் (Formatting), வண்ணங்கள் கொண்டிருக்கலாம் |
| Notepad, MS Excel, OpenOffice உள்ளிட்ட பலவகையான செயலிகளில் திறக்கலாம் | Windows இயங்குதளச் செயலிகளில் மட்டும் திறக்கக்கூடியது |
| சிறிய கோப்பு அளவு | ஒப்பீட்டளவில் பெரிய கோப்பு அளவு |

CSV கோப்புகள் தரவைப் பரிமாறிக்கொள்ளவும், வெவ்வேறு மென்பொருள்களுக்கிடையே எளிதாக இறக்குமதி/ஏற்றுமதி செய்யவும் பரவலாகப் பயன்படுத்தப்படுகின்றன.`,
      nav: { next: "creating-csv-textformat", nextLabel: "அடுத்து: CSV கோப்பு உருவாக்கம் & வடிவமைப்பு விதிகள் →" }
    },
    {
      id: "creating-csv-textformat",
      title: "CSV கோப்பு உருவாக்கம் & வடிவமைப்பு விதிகள்",
      content: `**13.3 CSV கோப்பினை உருவாக்குதல்**

**13.3.1 Notepad மூலம் உருவாக்குதல்:**

\`\`\`
Topic1,Topic2,Topic3
one,two,three
Example1,Example2,Example3
\`\`\`

.csv என்ற நீட்சிப் பெயருடன் சேமிக்க வேண்டும்.

**13.3.2 MS Excel மூலம் உருவாக்குதல்:**

| RollNo | Name | Address |
|---|---|---|
| 12101 | Nivetha | Mylapore, Chennai |
| 12102 | Lavanya | Adyar, Chennai |

File → Save As → CSV (Comma delimited) (*.csv) என தேர்ந்தெடுக்க வேண்டும்.

**13.3.3 வடிவமைப்பு விதிகள் (Formatting Rules)**

- ஒவ்வொரு தரவு மதிப்பும் காற்புள்ளியால் (,) பிரிக்கப்படும்.
- ஒவ்வொரு புதிய வரியும் (\\n) புதிய பதிவைக் (row) குறிக்கும்.
- ஒரு தரவு மதிப்பினுள்ளேயே காற்புள்ளி இருந்தால், அந்த மதிப்பு இரட்டை மேற்கோள்களுக்குள் (" ") அடைக்கப்பட வேண்டும்.
  \`\`\`
  "Red","Blue","Green"
  \`\`\`
- ஒரு மதிப்பினுள் இரட்டை மேற்கோள் குறி இருந்தால், அதை இரட்டிப்பாக்கி (escape) எழுத வேண்டும்: \`""\`
- வரி முறிவுகள் (Line breaks) கொண்ட மதிப்புகளும் மேற்கோள்களுக்குள் அடைக்கப்பட வேண்டும்.`,
      nav: { back: "intro-csv-excel", next: "file-basics-reading", nextLabel: "அடுத்து: கோப்பு கையாளுதல் அடிப்படை & CSV படித்தல் →" }
    },
    {
      id: "file-basics-reading",
      title: "கோப்பு கையாளுதல் அடிப்படை & CSV படித்தல்",
      content: `**13.5 கோப்பு பயன்முறைகள் (File Modes)**

| முறை | விளக்கம் |
|---|---|
| r | Read — படித்தல் (இயல்பு முறை) |
| w | Write — எழுதுதல் (ஏற்கனவே உள்ளதை அழிக்கும்) |
| a | Append — இறுதியில் சேர்த்தல் |

\`\`\`
file_object = open(filename, mode)
\`\`\`

**13.6 CSV கோப்புகளைப் பைத்தான் மூலம் படித்தல்**

\`\`\`
import csv
f = open('sample.csv')
csv_reader = csv.reader(f)
for row in csv_reader:
    print(row)
f.close()
\`\`\`

வெளியீடு:
\`\`\`
['SNO', 'NAME', 'CITY']
['1', 'RAM', 'CHENNAI']
['2', 'LAVANYA', 'TIRUCHY']
['3', 'LAKSHYA', 'MADURAI']
\`\`\`

**13.6.1.1 delimiter அளபுருவைப் பயன்படுத்துதல்**

இயல்பாக csv.reader() காற்புள்ளியை (,) delimiter ஆகக் கருதும்; வேறு குறியீட்டையும் delimiter ஆகக் குறிப்பிடலாம்:

\`\`\`
csv_reader = csv.reader(f, delimiter=';')
\`\`\`

**with கூற்றுடன் கோப்பைத் திறத்தல் (பரிந்துரைக்கப்படும் முறை):**

\`\`\`
with open('sample.csv', newline='') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
# கோப்பு தானாகவே மூடிவிடும்
\`\`\`

**csv.DictReader() — ஒவ்வொரு வரிசையையும் Dictionary-ஆக படித்தல்:**

\`\`\`
with open('sample.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)
\`\`\``,
      nav: { back: "creating-csv-textformat", next: "reading-columns-lists-dict", nextLabel: "அடுத்து: குறிப்பிட்ட நெடுவரிசைகளைப் படித்தல் →" }
    },
    {
      id: "reading-columns-lists-dict",
      title: "குறிப்பிட்ட நெடுவரிசைகளைப் படித்தல்",
      content: `**13.6.2 குறிப்பிட்ட நெடுவரிசைகளை மட்டும் படித்தல்**

\`\`\`
import csv
with open('sample.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)   # தலைப்பு வரியைத் தவிர்க்க
    for row in reader:
        print(row[0], row[2])   # முதல் & மூன்றாவது நெடுவரிசைகள் மட்டும்
\`\`\`

**List ஆக CSV தரவை சேமித்தல்:**

\`\`\`
import csv
data_list = []
with open('sample.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        data_list.append(row)
print(data_list)
\`\`\`

**Dictionary ஆக CSV தரவை சேமித்தல் (DictReader):**

\`\`\`
import csv
with open('sample.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['Name'], row['City'])
\`\`\`

**QUOTE_ALL, quoting விருப்பங்கள்:** csv.writer() பயன்படுத்தும்போது, quoting=csv.QUOTE_ALL என்ற அளபுரு அனைத்து மதிப்புகளையும் மேற்கோள்களுக்குள் வைக்கும்.`,
      nav: { back: "file-basics-reading", next: "writing-csv-files", nextLabel: "அடுத்து: CSV கோப்பில் தரவு எழுதுதல் →" }
    },
    {
      id: "writing-csv-files",
      title: "CSV கோப்பில் தரவு எழுதுதல்",
      content: `**13.6.3 CSV கோப்பில் தரவு எழுதுதல் (Writing Data to CSV)**

\`\`\`
import csv
list = []
list.append(row_1)
list.append(row_2)

with open('sample1.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    # declaring array
    arrayValue = []
    # displaying the content of the list
    for row in list:
        arrayValue.append(row)
        writer.writerow(row)
\`\`\`

**csv.writer() மூலம் ஒரு புதிய CSV கோப்பை உருவாக்குதல்:**

\`\`\`
import csv
with open('sample.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Item Name', 'Cost-Rs', 'Quantity', 'Profit'])
    writer.writerow(['Keyboard', 400, 12, 1152])
    writer.writerow(['Monitor', 5200, 10, 10400])
    writer.writerow(['Mouse', 100, 90, 2000])
\`\`\`

இதன் விளைவாக sample.csv கோப்பில் பின்வரும் தரவு உருவாகும்:

| Item Name | Cost-Rs | Quantity | Profit |
|---|---|---|---|
| Keyboard | 400 | 12 | 1152 |
| Monitor | 5200 | 10 | 10400 |
| Mouse | 100 | 90 | 2000 |

**writerows() மூலம் பல வரிசைகளை ஒரே முறையில் எழுதுதல்:**

\`\`\`
writer.writerows([['a',1],['b',2],['c',3]])
\`\`\``,
      nav: { back: "reading-columns-lists-dict", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- CSV (Comma Separated Values) தரவை காற்புள்ளியால் பிரித்து சேமிக்கும் Plain Text கோப்பு வடிவம்.
- CSV, Excel-ஐ விட எளிமையானது, பல செயலிகளிலும் திறக்கக்கூடியது.
- csv.reader() CSV கோப்பிலிருந்து ஒவ்வொரு வரிசையையும் பட்டியலாகப் படிக்கும்.
- csv.DictReader() ஒவ்வொரு வரிசையையும் Dictionary வடிவில் படிக்கும்.
- csv.writer() ஒரு புதிய CSV கோப்பில் தரவை எழுத உதவும்; writerow() ஒரு வரிசையை, writerows() பல வரிசைகளை எழுதும்.
- with கூற்று கோப்பைத் தானாகவே மூடுவதை உறுதி செய்யும்.
- delimiter அளபுரு வேறு பிரிப்புக் குறியீட்டைப் பயன்படுத்த அனுமதிக்கும்.`,
      nav: { back: "writing-csv-files", practice: true }
    },
  ],
}
