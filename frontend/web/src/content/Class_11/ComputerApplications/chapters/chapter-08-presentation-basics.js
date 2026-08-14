export default {
  chapterNumber: 8,
  title: "Presentation Basics",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction to Presentations",
      content: `A **presentation** is a collection of slides displayed in sequence to communicate information visually. Presentations are used in meetings, classrooms, conferences, and training sessions.

**OpenOffice Impress** is the open-source presentation software in the OpenOffice suite. It is equivalent to Microsoft PowerPoint. The default file format is **.odp** (OpenDocument Presentation).

**Starting Impress:**
1. Start → All Programs → OpenOffice → OpenOffice Impress.
2. Click the triangle next to the New icon on the main toolbar → select Presentation.
3. File → New → Presentation.

When Impress opens, the **Presentation Wizard** appears to help create a new presentation.

**Tip:** Leave the Preview checkbox selected so templates, slide designs, and slide transitions appear in the preview box as you choose them. If you do not want the wizard every time, select "Do not show this wizard again."`,
      nav: { next: "creating", nextLabel: "Creating a Presentation →" }
    },
    {
      id: "creating",
      title: "Creating a Presentation",
      content: `**Presentation Wizard (3 steps):**

**Step 1 — Choose type:**
- **Blank Presentation:** Start from scratch.
- **From Template:** Use a pre-designed template (e.g., "Introducing a New Product", "Recommendation of a Strategy").
- **Open existing presentation:** Continue working on a previously saved file.

**Step 2 — Choose slide design:**
- Select from Presentation Backgrounds (pre-packaged designs).
- `<Original>` is an empty background.
- Select output medium: **Screen** (for computer display — most common), Projector, Paper.

**Step 3 — Choose slide transition:**
- **Effect:** Type of transition between slides.
- **Speed:** Slow, Medium (recommended), Fast.
- Click **Create** to generate the new presentation.

**Using a Template:** Wizard shows a list of available templates. Choose one → it opens with pre-designed slides and formatting.

**Opening Existing Presentation:** Wizard shows previously saved files → select → Open.`,
      nav: { back: "intro", next: "impress-window", nextLabel: "Impress Window →" }
    },
    {
      id: "impress-window",
      title: "Parts of the Impress Window",
      content: `The main Impress window has **three main parts**: Slides pane, Workspace, and Task pane.

---

**1. Slides Pane (left panel)**
Contains thumbnail pictures of all slides in order of insertion. Operations available:
- Click a slide to select it and display it in the Workspace.
- Change the sequence (rearrange) slides.
- Add new slides.
- Mark a slide as hidden (won't appear in slide show).
- Delete a slide.
- Rename a slide.
- Copy or move slide contents.
- Change slide transition, design, or layout for selected slides.

To hide/show: View → Slide Pane.

---

**2. Task Pane (right panel)**
Has five sections:

**a) Master Pages:** Define the page/background style for your presentation. Impress has pre-packaged master pages (slide masters) — one blank, others with specific backgrounds.

**b) Layout:** Pre-packaged layouts for slide content arrangement. Choose and apply to current slide. Custom layouts cannot be created.

**c) Table Design:** Standard table styles for tables inserted in slides.

**d) Custom Animation:** Add, modify, or remove animations for individual elements on a slide.

**e) Slide Transition:** Set transitions between slides. Options: transition type, speed (slow/medium/fast), automatic or manual transition, duration.

To hide/show Task Pane: View → Task Pane/Side bar.

---

**3. Workspace (centre)**
The main editing area. Has five **View Buttons** (tabs):

| View | Purpose |
|------|---------|
| **Normal** | Main view for creating/editing individual slides. Add text, graphics, animations. |
| **Outline** | Shows slide titles and bullet points in outline format. Rearrange slides, edit headings. |
| **Notes** | Add speaker notes to each slide (not visible during slide show). |
| **Slide Sorter** | Thumbnail view of all slides. Rearrange order, set timings, add transitions. |
| **Handout** | Layout for printing slides as handouts (1, 2, 3, 4, or 6 slides per page). |

---

**Window Elements (same as Writer):**
- **Title Bar:** File name and application.
- **Menu Bar:** File, Edit, View, Insert, Format, Tools, Slide Show, Window, Help.
- **Toolbar:** Standard and Formatting toolbars.
- **Ruler Bar:** Horizontal and vertical rulers.
- **Scroll Bar:** Scroll through slides.
- **Status Bar:** Information about the current file (view with View → Status Bar).
- **Navigator (Ctrl+Shift+F5):** Lists all objects in the presentation; helps navigate and rename objects.`,
      nav: { back: "creating", next: "working-slides", nextLabel: "Working with Slides →" }
    },
    {
      id: "working-slides",
      title: "Working with Slides",
      content: `**Creating the First Slide:**
1. In Normal view, click "Click to add title" → type the title.
2. Press F11 to adjust title formatting (right-click → Modify).
3. If using Title Slide layout, click "Click to add text" to add a subtitle.

**Inserting Additional Slides:**
- Insert → Slide.
- Right-click on current slide → Slide → New Slide.
- Right-click in empty space after the last slide → New Slide.
- Click the Slide icon in the Presentation toolbar.

After inserting: select a layout from the Task Pane → modify elements (remove unneeded items, add pictures, insert text).

**Best Practice:** Insert all slides first, then add special effects (animation, transitions).

**Deleting a Slide:**
- Select the slide → Edit → Delete Slide.
- Or right-click the slide → Delete Slide.
- Can also be done in Slide Sorter view (delete multiple slides at once).

**Rearranging Slides:**
- Select slide → drag to desired position → release.
- Can also be done in Slide Sorter view.

**Running the Slide Show:**
- Slide Show → Slide Show from menu bar.
- Click the Slide Show button on the Presentation toolbar.
- Press **F5** (from beginning) or **F9**.
- If transition is "Automatically after x seconds" — the show runs automatically.
- If transition is "On mouse click" — click to advance each slide.
- Press **Esc** to exit the slide show.`,
      nav: { back: "impress-window", practice: true }
    }
  ]
}
