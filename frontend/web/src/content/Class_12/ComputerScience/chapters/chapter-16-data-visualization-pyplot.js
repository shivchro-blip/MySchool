export default {
  chapterNumber: 16,
  title: "Data Visualization using pyplot",
  subject: "Computer Science",
  classLabel: "Class 12",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-data-visualization",
      title: "Introduction to Data Visualization",
      content: `**16.1 Data Visualization — Definition**

**Data Visualization** is the graphical representation of information and data. Its objective is to communicate information visually to users, using statistical graphics. Numerical data may be encoded using dots, lines, or bars to visually communicate a quantitative message.

**General Types of Data Visualization:**
- Charts
- Tables
- Graphs
- Maps
- Infographics
- Dashboards

**Uses of Data Visualization:**
- Helps users analyze and interpret data easily.
- Makes complex data understandable and usable.
- Various charts help show relationships in data for one or more variables.

**Note:** An **infographic** (information graphic) is the representation of information in a graphic format. A **dashboard** is a collection of resources assembled to create a single unified visual display — data visualizations and dashboards translate complex ideas into a simple visual format, making patterns and relationships that are undetectable in text detectable at a glance.

**Introduction to Matplotlib — Data Visualization in Python**

**Matplotlib** is the most popular data visualization library in Python. It allows creating two-dimensional (2D) charts in just a few lines of code.

**Types of Visualizations in Matplotlib:**
- Line plot
- Scatter plot
- Histogram
- Box plot
- Bar chart
- Pie chart

**Scatter plot:** shows data as a collection of points — each point's position depends on its two-dimensional value (horizontal and vertical dimensions).

**Box plot:** a standardized way of displaying data distribution based on the five-number summary: minimum, first quartile, median, third quartile, and maximum.

**Installing Matplotlib:** installed using **pip** — a package manager for installing Python packages.`,
      nav: { next: "getting-started", nextLabel: "Next: Getting Started with Matplotlib →" }
    },
    {
      id: "getting-started",
      title: "Getting Started with Matplotlib",
      content: `**16.2 Getting Started**

Import Matplotlib using:
\`\`\`
import matplotlib.pyplot as plt
\`\`\`
To display a plot within a Python script, use \`plt.show()\`.
\`\`\`
import matplotlib.pyplot as plt
plt.plot([1,2,3,4])
plt.show()
\`\`\`
If you provide a SINGLE list/array to plot(), matplotlib assumes it is a sequence of **y** values, and automatically generates the **x** values for you — starting at 0 (since Python ranges start at 0), matching the length of y. So a list of 4 values gets x = [0, 1, 2, 3].

**Plotting with explicit x and y values:**
\`\`\`
import matplotlib.pyplot as plt
plt.plot([1,2,3,4], [1,4,9,16])
plt.show()
\`\`\`
The first two arguments to plot() are the 'x' and 'y' coordinates — this example plots the points (1,1), (2,4), (3,9), (4,16).

**Plotting Two Lines:**
\`\`\`
import matplotlib.pyplot as plt
x = [1,2,3]
y = [5,7,4]
x2 = [1,2,3]
y2 = [10,14,12]
plt.plot(x, y, label='Line 1')
plt.plot(x2, y2, label='Line 2')
plt.xlabel('X-Axis')
plt.ylabel('Y-Axis')
plt.title('LINE GRAPH')
plt.legend()
plt.show()
\`\`\`
\`plt.xlabel\`/\`plt.ylabel\` assign axis labels; \`plt.title\` sets the plot's title; \`plt.legend()\` displays the default legend (using each plot's \`label=\` values).

**Buttons in the Output Window:**
- **Home Button** — returns to the original view after navigating.
- **Forward/Back Buttons** — like a browser's forward/back, moving between previously viewed states.
- **Pan Axis** — click and drag to move the graph around.
- **Zoom** — click and drag a rectangle to zoom in (left-click) or out (right-click).
- **Configure Subplots** — configure spacing options for the figure/plot.
- **Save Figure** — save the figure in various file formats.`,
      nav: { back: "intro-data-visualization", next: "line-chart", nextLabel: "Next: Line Chart →" }
    },
    {
      id: "line-chart",
      title: "Line Chart",
      content: `**16.3 Special Plot Types**

Matplotlib creates various plot types, from histograms and scatter plots to bar graphs and pie charts.

**Line Chart**

A **Line Chart** (or Line Graph) displays information as a series of data points ("markers") connected by straight line segments. It's often used to visualize a **trend in data over time intervals** (a time series) — the line is usually drawn chronologically.

\`\`\`
import matplotlib.pyplot as plt
years = [2014, 2015, 2016, 2017, 2018]
total_populations = [8939007, 8954518, 8960387, 8956741, 8943721]
plt.plot(years, total_populations)
plt.title("Year vs Population in India")
plt.xlabel("Year")
plt.ylabel("Total Population")
plt.show()
\`\`\`
In this program:
- \`plt.title()\` — specifies the graph's title.
- \`plt.xlabel()\` — specifies the label for the X-axis.
- \`plt.ylabel()\` — specifies the label for the Y-axis.`,
      nav: { back: "getting-started", next: "bar-chart", nextLabel: "Next: Bar Chart →" }
    },
    {
      id: "bar-chart",
      title: "Bar Chart & Histogram vs Bar Graph",
      content: `**Bar Chart**

A **BarPlot** (or BarChart) is a common plot type showing the relationship between numerical data and categorical values. It represents categorical data with rectangular bars — each bar's height corresponds to the value it represents. Bars can be plotted vertically or horizontally, and it's useful for comparing a numeric value across different categories. Created using **plt.bar()**.

\`\`\`
import matplotlib.pyplot as plt
labels = ["TAMIL", "ENGLISH", "MATHS", "PHYSICS", "CHEMISTRY", "CS"]
usage = [79.8, 67.3, 77.8, 68.4, 70.2, 88.5]
y_positions = range(len(labels))
plt.bar(y_positions, usage)
plt.xticks(y_positions, labels)
plt.ylabel("RANGE")
plt.title("MARKS")
plt.show()
\`\`\`
- **labels** — specifies labels for the bars.
- **usage** — assigns values to the labels.
- **xticks** — displays tick marks along the x-axis, labeling each one.
- **range** — creates a sequence of numbers (used here to position the bars).

**Key Differences Between Histogram and Bar Graph**
1. A histogram displays data using bars to show the FREQUENCY of numerical data; a bar graph is a pictorial comparison of different CATEGORIES of data.
2. A histogram represents the frequency distribution of CONTINUOUS variables; a bar graph is a diagrammatic comparison of DISCRETE variables.
3. Histogram presents NUMERICAL data; bar graph shows CATEGORICAL data.
4. In a histogram, there is NO gap between bars; in a bar graph, there IS proper spacing between bars, indicating discontinuity.
5. Histogram items are numbers categorised together to represent RANGES of data; bar graph items are individual entities.
6. In a bar graph, blocks can commonly be rearranged (highest to lowest); in a histogram, this cannot be done, since bars follow the sequence of classes.
7. Histogram bar widths may vary; bar graph bar widths are always the same.`,
      nav: { back: "line-chart", next: "pie-chart", nextLabel: "Next: Pie Chart →" }
    },
    {
      id: "pie-chart",
      title: "Pie Chart",
      content: `**Pie Chart**

A **Pie Chart** is a circular graphic divided into slices, illustrating numerical proportion — showing the relationship of parts to a whole. Created using **plt.pie()**. The **autopct** parameter displays the percentage value using Python string formatting.

\`\`\`
import matplotlib.pyplot as plt
sizes = [89, 80, 90, 100, 75]
labels = ["Tamil", "English", "Maths", "Science", "Social"]
plt.pie(sizes, labels=labels, autopct="%.2f")
plt.show()
\`\`\`
This creates a pie chart with five slices, one for each subject, sized proportionally to the values in \`sizes\`, labeled accordingly, with each slice's percentage displayed to 2 decimal places.`,
      nav: { back: "bar-chart", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Data Visualization is the graphical representation of information and data, aiming to communicate information visually using statistical graphics.
- General types of data visualization: Charts, Tables, Graphs, Maps, Infographics, Dashboards.
- Matplotlib is the most popular Python data visualization library, creating 2D charts in few lines of code — installed using pip.
- Types of visualizations in Matplotlib: Line plot, Scatter plot, Histogram, Box plot, Bar chart, Pie chart.
- Import Matplotlib with 'import matplotlib.pyplot as plt'; display a plot with plt.show().
- A single list passed to plot() is treated as y-values, with x-values auto-generated starting from 0.
- plt.xlabel(), plt.ylabel(), plt.title(), and plt.legend() customize the plot's labels, title, and legend.
- A Line Chart displays data points connected by straight line segments, often used to show trends over time.
- A Bar Chart shows categorical data with rectangular bars, created using plt.bar(); differs from a Histogram, which shows the frequency distribution of continuous numerical data with no gaps between bars.
- A Pie Chart is a circular graphic divided into slices showing numerical proportions, created using plt.pie(), with autopct displaying percentage values.`,
      nav: { back: "pie-chart", practice: true }
    }
  ]
}
