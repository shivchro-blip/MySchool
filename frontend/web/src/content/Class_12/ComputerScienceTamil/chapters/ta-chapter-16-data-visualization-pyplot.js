export default {
  chapterNumber: 16,
  title: "தரவு காட்சிப்படுத்துதல் – PYPLOT",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-data-visualization",
      title: "தரவு காட்சிப்படுத்துதல் அறிமுகம்",
      content: `**16.1 தரவு காட்சிப்படுத்துதல் அறிமுகம்**

தரவு காட்சிப்படுத்துதல் (Data Visualization) என்பது தரவு மற்றும் தகவல்களைக் காட்சிப்படுத்தி விவரிக்கும் ஒரு நடைமுறையாகும்.

**தரவு காட்சிப்படுத்தலின் வகைகள்:**

- விளக்கப்படங்கள் (Charts)
- பட்டியல்கள் (Tables)
- வரைபடங்கள் (Graphs)
- நிலப்படங்கள் (Maps)
- இன்போகிராஃபிக்ஸ் (Infographics)
- வழிமுறைப் பலகைகள் (Dashboards)

**தரவு காட்சிப்படுத்தலின் பயன்கள்:**

- ஒரு தரவு பட்டியலின் அடிப்படை மேலோட்ட விவரங்களைப் புரிந்துகொள்ள உதவும்.
- சிக்கலான, புரிந்துகொள்வதற்குக் கடினமான தரவுகளை உடனுக்குடன் புரிந்துகொள்ள உதவும்.
- தரவுத் தொகுப்புகளுக்கிடையேயான தொடர்பைக் காண்பிக்கும்.

**Matplotlib அறிமுகம்**

Matplotlib என்பது Python-ல் தரவு காட்சிப்படுத்தலுடன் தொடர்புடைய அனைத்து செயற்பாடுகளையும் கொண்ட ஒரு தொகுதி (Library) ஆகும்.

**Matplotlib-ன் கூறுகள் (பல்வேறு வகையான வரைபடங்கள்):**

- கோட்டு வரைபடம் (Line Plot)
- சிதறல் வரைபடம் (Scatter Plot)
- பட்டை வரைபடம் (Bar Chart)
- வரிசை பட்டை வரைபடம் (Row Chart)
- பை/வட்ட வரைபடம் (Pie Chart)`,
      nav: { next: "getting-started", nextLabel: "அடுத்து: Matplotlib தொடங்குதல் →" }
    },
    {
      id: "getting-started",
      title: "Matplotlib தொடங்குதல்",
      content: `**16.2 தொடங்குதல்**

**Matplotlib நிறுவுதல்:** \`pip install matplotlib\` மூலம் நிறுவலாம்.

\`\`\`python
import matplotlib
import matplotlib.pyplot as plt
plt.plot([1, 2, 3, 4])
plt.show()
\`\`\`

**கருவிப்பட்டையின் (Toolbar) பொத்தான்கள்:**

- **முகப்புப் பொத்தான் (Home Button):** ஆரம்ப நிலைக்குத் திரும்பும்.
- **முன்னோக்கி/பின்னோக்கி (Forward/Backward):** முந்தைய/அடுத்த காட்சிக்குச் செல்லும்.
- **பான் ஆக்சிஸ் பொத்தான் (Pan Axis Button):** வரைபடத்தை நகர்த்தும்.
- **Zoom-in Button:** குறிப்பிட்ட பகுதியை பெரிதாக்கும்.
- **Configure Subplots Button:** பல subplots-களை அமைக்கும்.
- **Save Figure Button:** படத்தை சேமிக்கும்.

**பல கோடுகள் கொண்ட வரைபடம் (உதாரணம்):**

\`\`\`python
import matplotlib.pyplot as plt
x = [1, 2, 3]
y = [5, 7, 4]
x2 = [1, 2, 3]
y2 = [10, 14, 12]
plt.plot(x, y, label='Line 1')
plt.plot(x2, y2, label='Line 2')
plt.xlabel('X-Axis')
plt.ylabel('Y-Axis')
plt.title('LINE GRAPH')
plt.legend()
plt.show()
\`\`\``,
      nav: { back: "intro-data-visualization", next: "line-chart", nextLabel: "அடுத்து: கோட்டு வரைபடம் →" }
    },
    {
      id: "line-chart",
      title: "கோட்டு வரைபடம் (Line Chart)",
      content: `**16.3 கோட்டு வரைபடம் (Line Chart)**

Matplotlib-ல் ஒரு எளிய தரவை கோட்டு வரைபடமாக வரைய \`plot()\` செயற்கூறு பயன்படுத்தப்படுகிறது.

**எடுத்துக்காட்டு — இந்தியாவின் ஆண்டுவாரி மக்கள்தொகைப் போக்கு:**

\`\`\`python
import matplotlib.pyplot as plt
years = [2004, 2015, 2016, 2017, 2018]
total_population = [899000, 8951010, 8968387, 8956711, 8943721]
plt.plot(years, total_population)
plt.title("Year vs Population in India")
plt.xlabel("Year")
plt.ylabel("Total Population")
plt.show()
\`\`\`

இந்த நிரல் ஆண்டுகளுக்கும் மக்கள்தொகைக்கும் இடையேயான போக்கை ஒரு தொடர் கோட்டு வரிசையாகக் காட்சிப்படுத்துகிறது — ஒரு அளவின் காலப்போக்கிலான மாற்றத்தைக் காட்ட கோட்டு வரைபடம் மிகவும் பொருத்தமானது.`,
      nav: { back: "getting-started", next: "bar-chart", nextLabel: "அடுத்து: பட்டை வரைபடம் & Histogram →" }
    },
    {
      id: "bar-chart",
      title: "பட்டை வரைபடம் (Bar Chart) & Histogram vs Bar Graph",
      content: `**16.5 பட்டை வரைபடம் (Bar Chart)**

Matplotlib-ல் \`bar()\` செயற்கூறு பயன்படுத்தி தனித்தனியான வகைகளுக்கிடையேயான ஒப்பீட்டைக் காட்சிப்படுத்தலாம்.

**எடுத்துக்காட்டு — பாட வாரியான மதிப்பெண்கள்:**

\`\`\`python
import matplotlib.pyplot as plt
labels = ["TAMIL", "ENGLISH", "MATHS", "PHYSICS", "CHEMISTRY", "CS"]
usage = [79.6, 67.5, 77.5, 68.4, 70.2, 89.5]
y_positions = range(len(labels))
plt.bar(y_positions, usage)
plt.xticks(y_positions, labels)
plt.ylabel("MARKS")
plt.title("MARKS")
plt.show()
\`\`\`

**பல வரிசைகள் கொண்ட பட்டை வரைபடம் (Multiple bars):**

\`\`\`python
plt.bar([1,3,5,7,9], [5,2,7,8,2], label="example one")
plt.bar([2,4,6,8,10], [8,6,2,5,6], label="example two", color='g')
plt.legend()
plt.xlabel('bar number')
plt.ylabel('bar height')
plt.title('Graph\\nAnother Line! Whoa')
plt.show()
\`\`\`

**Histogram மற்றும் Bar Graph — வேறுபாடு:**

| Histogram | Bar Graph |
|---|---|
| தொடர்ச்சியான தரவினை (Continuous Data), ஒற்றை மாறியின் அளவீட்டைக் காட்டும் | தனித்தனியான வகைகளுக்கிடையேயான (Categorical) ஒப்பீட்டைக் காட்டும் |
| பட்டைகளுக்கிடையே இடைவெளி இருக்காது | பட்டைகளுக்கிடையே இடைவெளி இருக்கும் |
| அளவீட்டு வரம்புகளை (Bins) குறிக்கும் | தனித்த வகைகளைக் குறிக்கும் |`,
      nav: { back: "line-chart", next: "pie-chart", nextLabel: "அடுத்து: வட்ட வரைபடம் →" }
    },
    {
      id: "pie-chart",
      title: "வட்ட வரைபடம் (Pie Chart)",
      content: `**16.7 வட்ட வரைபடம் (Pie Chart)**

Matplotlib-ல் \`pie()\` செயற்கூறு பயன்படுத்தி ஒரு மொத்தத்தில் ஒவ்வொரு பகுதியின் விகிதாசாரத்தைக் (Proportion) காட்சிப்படுத்தலாம்.

**எடுத்துக்காட்டு — பாட வாரியான மதிப்பெண் விகிதாசாரம்:**

\`\`\`python
import matplotlib.pyplot as plt
sizes = [49, 90, 90, 106, 71]
labels = ["Tamil", "English", "Maths", "Science", "Social"]
plt.pie(sizes, labels=labels, autopct="%.1f")
plt.show()
\`\`\`

இங்கு \`autopct="%.1f"\` ஒவ்வொரு பகுதியின் சதவீதத்தையும் ஒரு தசம இடத்துடன் வட்டப் பகுதிக்குள் காண்பிக்கும்.

வட்ட வரைபடம், ஒரு மொத்தத்தில் ஒவ்வொரு பகுதியின் விகிதாசார பங்களிப்பை (எ.கா. மொத்த மதிப்பெண்களில் ஒவ்வொரு பாடத்தின் பங்கு) காட்சிப்படுத்த மிகவும் ஏற்றது — ஆனால் அதிக எண்ணிக்கையிலான பிரிவுகள் இருந்தால் பயனுள்ளதாக இருக்காது.`,
      nav: { back: "bar-chart", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- தரவு காட்சிப்படுத்துதல் தரவு/தகவல்களைக் காட்சிப்படுத்தி விவரிக்கும் நடைமுறை — விளக்கப்படங்கள், அட்டவணைகள், வரைபடங்கள் ஆகியவை இதன் வகைகள்.
- Matplotlib Python-ல் தரவு காட்சிப்படுத்த பயன்படும் முதன்மை தொகுதி — \`import matplotlib.pyplot as plt\` மூலம் பயன்படுத்தப்படும்.
- \`plt.plot()\` கோட்டு வரைபடம்; \`plt.bar()\` பட்டை வரைபடம்; \`plt.pie()\` வட்ட வரைபடம் உருவாக்கும்.
- \`plt.xlabel()\`, \`plt.ylabel()\`, \`plt.title()\`, \`plt.legend()\` ஆகியவை வரைபடத்தை வடிவமைக்கப் பயன்படும்.
- Histogram தொடர்ச்சியான தரவை, Bar Graph தனித்தனி வகைகளுக்கிடையேயான ஒப்பீட்டை காட்டும்.
- Pie Chart ஒரு மொத்தத்தில் ஒவ்வொரு பகுதியின் விகிதாசார பங்களிப்பைக் காட்டும்.

**மேற்பார்வை நூல்கள்:**
1. towardsdatascience.com — Data Science with Python: Intro to Data Visualization and Matplotlib.
2. heartbeat.fritz.ai — Introduction to Data Visualization in Python with Matplotlib.
3. python-programming.net — Legends, Titles, Labels: Matplotlib Tutorial.
4. keydifferences.com — Difference between Histogram and Bar Graph.`,
      nav: { back: "pie-chart", practice: true }
    },
  ],
}
