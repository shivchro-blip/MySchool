export default {
  "meta": {
    "subject": "Computer Science -- Class XII",
    "unit": "Chapter 16 -- Data Visualization using pyplot",
    "time": "3.00 hrs",
    "totalMarks": 49,
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
          "label": "Data Visualization using pyplot",
          "questions": [
            { "id": "q1", "html": "Which is a python package used for 2D charts?", "options": ["a) matplotlib.pyplot", "b) matplotlib.pip", "c) matplotlib.numpy", "d) matplotlib.plt"], "answer": 0, "hint": "matplotlib.pyplot is the module used to create 2D charts in Python." },
            { "id": "q2", "html": "Identify the package manager for installing Python packages, or modules.", "options": ["a) Matplotlib", "b) PIP", "c) plt.show()", "d) python package"], "answer": 1, "hint": "PIP is the package manager used to install Python packages, including Matplotlib." },
            { "id": "q3", "html": "Which of the following feature is used to represent data and information graphically?", "options": ["a) Data List", "b) Data Tuple", "c) Classes and Objects", "d) Data Visualization"], "answer": 3, "hint": "Data Visualization is the graphical representation of data and information." },
            { "id": "q4", "html": ".......... is a collection of resources assembled to create a single unified visual display.", "options": ["a) Interface", "b) Dashboard", "c) Objects", "d) Graphics"], "answer": 1, "hint": "A Dashboard combines multiple resources into one unified visual display." },
            { "id": "q5", "html": "Which of the following module should be imported to visualize data and information in Python?", "options": ["a) csv", "b) getopt", "c) mysql", "d) matplotlib"], "answer": 3, "hint": "matplotlib is the module imported for data visualization." },
            { "id": "q6", "html": "Which of the following functions is used to create a bar chart in Matplotlib?", "options": ["a) plt.pie()", "b) plt.bar()", "c) plt.plot()", "d) plt.line()"], "answer": 1, "hint": "plt.bar() creates a bar chart in Matplotlib." },
            { "id": "q7", "html": "A type of plot that shows data as a collection of points, where each point's position depends on its two-dimensional value, is called a", "options": ["a) Scatter plot", "b) Bar chart", "c) Line chart", "d) Pie chart"], "answer": 0, "hint": "A Scatter plot shows data as individual points positioned by their two-dimensional values." },
            { "id": "q8", "html": "Identify the right type of chart using the following hints: (1) often used to visualize a trend in data over intervals of time; (2) the line is often drawn chronologically.", "options": ["a) Line chart", "b) Bar chart", "c) Pie chart", "d) Scatter plot"], "answer": 0, "hint": "These are defining characteristics of a Line chart." },
            { "id": "q9", "html": "Statement A: To make a pie chart with Matplotlib, we use the plt.pie() function. Statement B: The autopct parameter displays the percentage value using Python string formatting. Which is correct?", "options": ["a) Statement A is correct", "b) Statement B is correct", "c) Both the statements are correct", "d) Both the statements are wrong"], "answer": 2, "hint": "Both statements accurately describe plt.pie() and the autopct parameter." },
            { "id": "q10", "html": "A standardized way of displaying the distribution of data based on the five-number summary (minimum, first quartile, median, third quartile, maximum) is called a", "options": ["a) Bar chart", "b) Box plot", "c) Pie chart", "d) Line chart"], "answer": 1, "hint": "A Box plot displays data distribution using the five-number summary." }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "Part II -- Short Answers (5 x 2)",
      "title": "Part II -- Short Answer Questions",
      "type": "short-essay",
      "scoreMax": 10,
      "marksPer": 2,
      "instruction": "Answer in 2-3 sentences.",
      "questions": [
        { "q": "What is Data Visualization?", "ans": "Data Visualization is the graphical representation of information and data. Its objective is to communicate information visually to users, using statistical graphics -- numerical data may be encoded using dots, lines, or bars to convey a quantitative message." },
        { "q": "List the general types of data visualization.", "ans": "The general types of data visualization are: Charts, Tables, Graphs, Maps, Infographics, and Dashboards." },
        { "q": "List the types of Visualizations in Matplotlib.", "ans": "The types of visualizations available in Matplotlib include: Line plot, Scatter plot, Histogram, Box plot, Bar chart, and Pie chart." },
        { "q": "How will you install Matplotlib?", "ans": "Matplotlib can be installed using pip, which is a package manager software for installing Python packages. The typical command used is 'pip install matplotlib' at the command prompt." },
        { "q": "Write the difference between the following functions: plt.plot([1,2,3,4]), plt.plot([1,2,3,4], [1,4,9,16]).", "ans": "plt.plot([1,2,3,4]) treats the single list as Y-values only -- matplotlib automatically generates X-values starting from 0 (so X = [0,1,2,3]). plt.plot([1,2,3,4], [1,4,9,16]) explicitly provides BOTH X and Y coordinates, plotting the exact points (1,1), (2,4), (3,9), (4,16) rather than auto-generating the X-axis values." }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Brief Answers (3 x 3)",
      "title": "Part III -- Brief Answer Questions",
      "type": "short-essay",
      "scoreMax": 9,
      "marksPer": 3,
      "instruction": "Answer in 4-6 sentences.",
      "questions": [
        { "q": "Describe the output for the following data visualization plot: plt.bar([1,3,5,7,9],[5,2,7,8,2], label='Example one'); plt.bar([2,4,6,8,10],[8,6,2,5,6], label='Example two', color='g'); plt.legend(); plt.xlabel('bar number'); plt.ylabel('bar height'); plt.title('Epic Graph\\nAnother Line! Whoa'); plt.show()", "ans": "The output is a bar chart with TWO sets of bars overlaid on the same axes. The first set ('Example one') has bars at x-positions 1,3,5,7,9 with heights 5,2,7,8,2, in the default colour. The second set ('Example two') has bars at x-positions 2,4,6,8,10 with heights 8,6,2,5,6, shown in GREEN (color='g'). The chart's title reads 'Epic Graph' on one line and 'Another Line! Whoa' on the next (due to the \\n), the x-axis is labeled 'bar number', the y-axis is labeled 'bar height', and a legend box appears (from plt.legend()) distinguishing 'Example one' from 'Example two' by colour." },
        { "q": "Write any three uses of data visualization.", "ans": "Three uses of data visualization are: (1) it helps users analyze and interpret data easily, rather than sifting through raw numbers; (2) it makes complex data understandable and usable, by presenting it in a simplified visual form; (3) various charts help show relationships in data across one or more variables, revealing patterns or trends that would be hard to spot in a plain table of numbers." },
        { "q": "Write the Python code to plot a pie chart for marks scored in 4 subjects: Tamil=85, English=78, Maths=92, Science=88.", "ans": "import matplotlib.pyplot as plt\nsizes = [85, 78, 92, 88]\nlabels = ['Tamil', 'English', 'Maths', 'Science']\nplt.pie(sizes, labels=labels, autopct='%.2f')\nplt.show()\n\nThis code creates a pie chart with four slices, one per subject, sized proportionally to the marks scored, with each slice labeled by subject name and displaying its percentage share (to 2 decimal places, via autopct)." }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Explain in Detail (4 x 5)",
      "title": "Part IV -- Long Answer Questions",
      "type": "long-essay",
      "scoreMax": 20,
      "marksPer": 5,
      "instruction": "Answer in detail.",
      "questions": [
        {
          "q": "Explain in detail the types of pyplots using Matplotlib.",
          "ans": "Matplotlib supports several types of visualizations:\n\n1. Line plot: Displays data as points connected by straight line segments, typically used to show trends over time (a time series). Created with plt.plot().\n\n2. Scatter plot: Shows data as a collection of individual points, where each point's position depends on its two-dimensional value (x and y). Useful for observing correlation or clustering between two variables.\n\n3. Histogram: Displays the frequency distribution of continuous numerical data using bars with NO gaps between them, since the data represents continuous ranges rather than distinct categories.\n\n4. Box plot: A standardized way of displaying data distribution based on the five-number summary -- minimum, first quartile, median, third quartile, and maximum -- useful for spotting outliers and comparing distributions.\n\n5. Bar chart: Represents categorical data using rectangular bars, with each bar's height corresponding to its value, and proper SPACING between bars (unlike a histogram). Created with plt.bar().\n\n6. Pie chart: A circular graphic divided into slices showing numerical proportions, illustrating the relationship of parts to a whole. Created with plt.pie().\n\nEach type suits different data and communication goals -- line/scatter for trends and relationships, histogram/box plot for distributions, and bar/pie for categorical comparisons and proportions."
        },
        {
          "q": "Explain the various buttons in a matplotlib window.",
          "ans": "The matplotlib plot window includes several navigation buttons at the bottom-left corner:\n\n1. Home Button: Returns the view to its original state, useful after you've navigated (panned/zoomed) away from the initial view.\n\n2. Forward/Back Buttons: Function like a web browser's forward and back buttons, letting you move between previously viewed states of the chart.\n\n3. Pan Axis Button: A cross-shaped icon that, once clicked, lets you click-and-drag the graph around, shifting the visible area.\n\n4. Zoom Button: Lets you click-and-drag a rectangle around the area you want to zoom into (left-click and drag); you can zoom back OUT with a right-click and drag instead.\n\n5. Configure Subplots Button: Allows adjusting various spacing options between subplots within the figure.\n\n6. Save Figure Button: Lets you save the currently displayed figure to a file, in various supported formats (like PNG or PDF).\n\nTogether, these buttons make the matplotlib output window interactive, letting users explore, adjust, and export their visualizations without needing to rewrite the underlying Python code."
        },
        {
          "q": "Explain the purpose of the following functions: (a) plt.xlabel (b) plt.ylabel (c) plt.title (d) plt.legend() (e) plt.show()",
          "ans": "(a) plt.xlabel(): Assigns a text label to the X-axis of the plot, describing what that axis represents (e.g., plt.xlabel('Year')).\n\n(b) plt.ylabel(): Assigns a text label to the Y-axis of the plot, describing what that axis represents (e.g., plt.ylabel('Total Population')).\n\n(c) plt.title(): Sets the overall title displayed at the top of the plot/figure, summarising what the chart represents (e.g., plt.title('Year vs Population in India')).\n\n(d) plt.legend(): Displays a legend box on the plot, showing which colour/style corresponds to which data series -- it uses the 'label=' argument given to each individual plot/bar/line call to build this legend automatically.\n\n(e) plt.show(): Renders and displays the completed plot in a window (or inline, in some environments) -- without this call, a plot built with matplotlib commands would not actually be shown to the user.\n\nTogether, these functions let a programmer fully label, title, annotate, and finally display a chart, making it clear, informative, and ready to present to viewers."
        },
        {
          "q": "Compare Line chart, Bar chart, and Pie chart with suitable examples of when each should be used.",
          "ans": "Line Chart: Displays data points connected by straight line segments, best suited for visualizing TRENDS over continuous intervals (especially time). Example: plotting a country's population over several years (years on x-axis, population on y-axis) -- plt.plot(years, total_populations); plt.show().\n\nBar Chart: Displays categorical data using rectangular bars with clear spacing between them, best suited for COMPARING numeric values across distinct categories. Example: comparing average marks scored across different school subjects -- plt.bar(y_positions, usage); plt.xticks(y_positions, labels); plt.show().\n\nPie Chart: A circular graphic divided into proportional slices, best suited for showing how INDIVIDUAL PARTS contribute to a WHOLE (percentage/proportion breakdown), rather than comparing raw values or trends. Example: showing what percentage of total marks came from each of 5 subjects -- plt.pie(sizes, labels=labels, autopct='%.2f'); plt.show().\n\nIn short: choose a Line chart for trends over time, a Bar chart for comparing distinct categories side-by-side, and a Pie chart for showing proportional composition of a whole."
        }
      ]
    }
  ]
}
