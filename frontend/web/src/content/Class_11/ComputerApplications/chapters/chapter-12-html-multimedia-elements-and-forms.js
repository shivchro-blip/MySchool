export default {
  chapterNumber: 12,
  title: "HTML — Adding Multimedia Elements and Forms",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "images",
      title: "Inserting Images",
      content: `Images make web pages more attractive and help depict complex concepts simply. Images displayed on web pages must be in universally supported formats.

**Familiar Image Formats:**

| Format | Full Name | Best For |
|--------|-----------|---------|
| **GIF** | Graphical Interchange Format | Animated images, logos, icons, line art. Max 256 colours. No sound/playback control. Developed by CompuServe. |
| **JPEG** | Joint Photographic Experts Group | Photographic images. Supports unlimited colours. Most popular format. Supported by all browsers. |
| **PNG** | Portable Network Graphics | Replacement for GIF. Supported by all browsers. |
| **SVG** | Scalable Vector Graphics | Web graphics. Standardised by W3C in 2001. Supported by current browsers. |

Images can be converted between formats using applications like Photoshop, Picasa, or GIMP.

**Inserting an Image — \`<img>\` tag:**

The \`<img>\` tag with the **src** (Source) attribute is used to insert images. \`<img>\` is an **empty tag** (no closing tag).

General format:
\`\`\`
<img src="image_name.gif">
\`\`\`

If the image is in a different folder, specify the full path:
\`\`\`
<img src="D:\\images\\animals\\cat.jpeg">
\`\`\`

**Attributes of \`<img>\` tag:**

| Attribute | Description |
|-----------|-------------|
| \`src\` | Source — file name/path/URL of the image (required) |
| \`alt\` | Alternative text — shown if image cannot be loaded |
| \`height\` | Height of image in pixels or percentage |
| \`width\` | Width of image in pixels or percentage |
| \`align\` | Alignment relative to surrounding text |

**Align values:**
- **bottom** — Aligns bottom of image with text baseline (default).
- **middle** — Aligns middle of image with text baseline.
- **top** — Aligns top of image with text baseline.
- **left** — Image floats to the left; text wraps around the right.
- **right** — Image floats to the right; text wraps around the left.`,
      nav: { next: "multimedia", nextLabel: "Multimedia — Marquee, Video, Audio →" }
    },
    {
      id: "multimedia",
      title: "Marquee, Video and Audio",
      content: `**Scrolling Text — \`<marquee>\`:**
Text or images can be made to move horizontally or vertically using \`<marquee>\`. Container tag.

General format: \`<marquee> Text or image </marquee>\`

Attributes of \`<marquee>\`:

| Attribute | Description |
|-----------|-------------|
| \`height\`, \`width\` | Size of the marquee area (pixels or %) |
| \`direction\` | Movement direction: **left** (default), right, up, down |
| \`behavior\` | Scrolling type: **scroll** (default), slide, alternate |
| \`scrolldelay\` | Time delay between each jump (in seconds) |
| \`scrollamount\` | Speed of the scroll |
| \`loop\` | How many times to repeat. Default: infinite |
| \`bgcolor\` | Background colour of the marquee |
| \`hspace\`, \`vspace\` | Horizontal/vertical space around the marquee |

---

**Adding Video — \`<embed>\` tag:**
The \`<embed>\` tag attaches audio or video files to a webpage. Includes playback controls automatically. Empty tag.

- **Inline:** Media file is part of the page — plays when the page is visible.
- **External:** Link to external audio/video URL.

General format: \`<embed src="video_file.mp4" width=50% height=50%> </embed>\`

The \`<noembed>\` tag provides fallback content if the browser does not support \`<embed>\`.

Primary attribute: **src** — specifies the media file name and location.
Other attributes (same as \`<img>\`): alt, height, width, align.

---

**Background Music — \`<bgsound>\`:**
Plays audio in the background while the page is viewed (inline sound).

General format: \`<bgsound src="music.mp3" loop=infinite>\`

- **src:** Location of the audio file.
- **volume:** Adjusts volume control.
- **loop:** Duration of play. \`infinite\` = plays as long as the page is in view.`,
      nav: { back: "images", next: "forms", nextLabel: "HTML Forms →" }
    },
    {
      id: "forms",
      title: "HTML Forms",
      content: `**Forms** are used to receive information from the user — for registration, login, orders, feedback, and search.

The \`<form>\` tag creates a form. Forms contain controls: text boxes, radio buttons, checkboxes, buttons, and drop-down lists.

**General format:**
\`\`\`
<form method=get/post action="server_script">
  form elements
</form>
\`\`\`

**Attributes of \`<form>\`:**

| Attribute | Description |
|-----------|-------------|
| \`method\` | How data is sent: **get** (appends to URL) or **post** (sends as packets) |
| \`action\` | Server-side program (CGI script — Perl, JavaScript, PHP, ASP) that processes the form |

Each form element is assigned a **name** attribute. Users enter/select values; these are sent to the server with the element's name.

---

**Form Controls — \`<input>\` tag:**
Most form controls use \`<input>\`. It is an **empty tag**.

The **type** attribute determines the control type:

| Type value | Control Created |
|------------|----------------|
| \`text\` | Text box — for name, address, etc. |
| \`password\` | Password box — characters appear as dots/asterisks |
| \`radio\` | Radio button — select one from a group |
| \`checkbox\` | Checkbox — select one or more options |
| \`submit\` | Submit button — sends form data to server |
| \`reset\` | Reset button — clears all form fields |
| \`button\` | Custom button |

**Other attributes of \`<input>\`:**
- **name:** Identifies the field; sent to server with its value.
- **value:** Default text in the field or button label.
- **size:** Visible width of text/password box.
- **maxlength:** Maximum characters allowed.
- **checked:** Pre-selects a radio button or checkbox.

**Text Area — \`<textarea>\`:**
Multi-line text input area (for comments, feedback).
\`\`\`
<textarea name="comments" rows=5 cols=40> </textarea>
\`\`\`

**Select Box (Drop-down List) — \`<select>\` + \`<option>\`:**
\`\`\`
<select name="city">
  <option> Chennai </option>
  <option> Madurai </option>
</select>
\`\`\`

**Submit and Reset Buttons:**
\`\`\`
<input type=submit value="Submit">
<input type=reset value="Clear">
\`\`\`
- **Submit:** Sends all form data to the server program specified in \`action\`.
- **Reset:** Clears all form fields to their default values.`,
      nav: { back: "multimedia", practice: true }
    }
  ]
}
