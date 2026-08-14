export default {
  "meta": {
    "subject": "Computer Applications -- Class XI",
    "unit": "Chapter 12 -- HTML: Adding Multimedia Elements and Forms",
    "time": "2.30 hrs",
    "totalMarks": 47,
    "instructions": "Samacheer Kalvi -- Answer all questions"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "Part I -- MCQ (7 x 1)",
      "title": "Part I -- Choose the Correct Answer",
      "type": "mcq",
      "scoreMax": 7,
      "marksPer": 1,
      "sections": [
        {
          "label": "HTML Multimedia and Forms",
          "questions": [
            {
              "id": "q1",
              "html": "Which tag is used to insert an image in an HTML document?",
              "options": [
                "a) &lt;image&gt;",
                "b) &lt;img&gt;",
                "c) &lt;pic&gt;",
                "d) &lt;photo&gt;"
              ],
              "answer": 1,
              "hint": "<img> is the HTML tag used to insert images. It is an empty tag and uses the src attribute to specify the image file."
            },
            {
              "id": "q2",
              "html": "Which image format is most popular and supported by all web browsers for photographic images?",
              "options": [
                "a) GIF",
                "b) PNG",
                "c) JPEG",
                "d) SVG"
              ],
              "answer": 2,
              "hint": "JPEG (Joint Photographic Experts Group) is the most popular image format, supported by all browsers. It supports unlimited colours and is best for photographs."
            },
            {
              "id": "q3",
              "html": "Which image format is one of the most popular for animated images and was developed by CompuServe?",
              "options": [
                "a) JPEG",
                "b) SVG",
                "c) PNG",
                "d) GIF"
              ],
              "answer": 3,
              "hint": "GIF (Graphical Interchange Format) was developed by CompuServe and is popular for animated images, logos, and icons. Max 256 colours."
            },
            {
              "id": "q4",
              "html": "Which tag is used to create scrolling text or images in HTML?",
              "options": [
                "a) &lt;scroll&gt;",
                "b) &lt;move&gt;",
                "c) &lt;marquee&gt;",
                "d) &lt;slide&gt;"
              ],
              "answer": 2,
              "hint": "<marquee> is the HTML tag used to make text or images scroll horizontally or vertically on a web page."
            },
            {
              "id": "q5",
              "html": "Which tag is used to embed audio/video files in an HTML document?",
              "options": [
                "a) &lt;audio&gt;",
                "b) &lt;video&gt;",
                "c) &lt;embed&gt;",
                "d) &lt;media&gt;"
              ],
              "answer": 2,
              "hint": "<embed> is the tag used to attach audio or video files in an HTML document. It includes playback controls automatically."
            },
            {
              "id": "q6",
              "html": "Which tag is used to create a form in HTML?",
              "options": [
                "a) &lt;input&gt;",
                "b) &lt;form&gt;",
                "c) &lt;table&gt;",
                "d) &lt;select&gt;"
              ],
              "answer": 1,
              "hint": "The <form> tag creates an HTML form. It starts with <form> and ends with </form>, containing various input controls."
            },
            {
              "id": "q7",
              "html": "Which form input type creates a password field where characters are hidden?",
              "options": [
                "a) type=text",
                "b) type=hidden",
                "c) type=password",
                "d) type=secret"
              ],
              "answer": 2,
              "hint": "type=password creates a text box where entered characters appear as dots or asterisks to hide the password."
            }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "Part II -- Very Short (7 x 2)",
      "title": "Part II -- Very Short Answers",
      "type": "short_answer",
      "scoreMax": 14,
      "marksPer": 2,
      "sections": [
        {
          "label": "Very Short Answers",
          "questions": [
            {
              "id": "q8",
              "html": "What are the familiar image formats supported by web browsers?",
              "answer": "The familiar image formats supported by web browsers are: (1) GIF (Graphical Interchange Format) — popular for animated images, logos, icons, and line art. Maximum 256 colours. Developed by CompuServe. (2) JPEG (Joint Photographic Experts Group) — most popular format for photographic images. Supports unlimited colours. Supported by all browsers. (3) PNG (Portable Network Graphics) — designed as a replacement for GIF. Supported by all browsers. (4) SVG (Scalable Vector Graphics) — web-specific graphics format standardised by W3C in 2001. Supported by current browsers. HTML5 also introduces SVG images.",
              "hint": "Four formats: GIF (animated, 256 colours, CompuServe), JPEG (photos, unlimited colours, most popular), PNG (GIF replacement), SVG (W3C standard, 2001)."
            },
            {
              "id": "q9",
              "html": "Write the general format to insert an image in HTML and name its primary attribute.",
              "answer": "The <img> tag is used to insert images in an HTML document. It is an empty tag (no closing tag).\n\nGeneral format:\n<img src=\"image_name.gif\">\nor\n<img src=\"URL\">\n\nThe primary attribute is src (Source) — it specifies the file name and location of the image to be inserted. If the image is not in the current working folder, the full path must be specified:\n<img src=\"D:\\images\\animals\\cat.jpeg\">",
              "hint": "<img src='filename'>. Primary attribute = src (source of image file). Empty tag. If image is elsewhere, specify full path."
            },
            {
              "id": "q10",
              "html": "What are the attributes of the &lt;img&gt; tag?",
              "answer": "Attributes of the <img> tag: (1) src — specifies the file name/path/URL of the image (required). (2) alt — provides alternative text displayed if the image cannot be loaded. (3) height — sets the height of the image in pixels or percentage. (4) width — sets the width of the image in pixels or percentage. (5) align — aligns the image relative to surrounding text. Values: bottom (default — aligns bottom of image with text baseline), middle (middle of image with baseline), top (top of image with baseline), left (image floats left, text wraps right), right (image floats right, text wraps left).",
              "hint": "Five attributes: src (source), alt (alternative text), height, width, align (bottom/middle/top/left/right)."
            },
            {
              "id": "q11",
              "html": "Write the general format of the &lt;marquee&gt; tag and name any three of its attributes.",
              "answer": "The <marquee> tag makes text or images scroll/move on a web page.\n\nGeneral format: <marquee> Text or image content </marquee>\n\nThree attributes:\n(1) direction — specifies the direction of movement: left (default), right, up, down. Example: <marquee direction=right>\n(2) behavior — type of scrolling: scroll (default — moves across and disappears), slide (stops at the end), alternate (bounces back and forth).\n(3) loop — number of times the marquee repeats. Default value is 'infinite' (scrolls endlessly).\n\nOther attributes: height, width, scrolldelay, scrollamount, bgcolor, hspace, vspace.",
              "hint": "Format: <marquee>content</marquee>. Three attributes: direction (left/right/up/down), behavior (scroll/slide/alternate), loop (infinite by default)."
            },
            {
              "id": "q12",
              "html": "What is the difference between &lt;embed&gt; and &lt;bgsound&gt; in HTML?",
              "answer": "<embed>: Used to embed audio or video files within a webpage. Media plays either inline (as part of the page, with visible controls) or externally (linked URL). The browser automatically includes playback controls. Used for both audio and video. Syntax: <embed src='video.mp4' width=50% height=50%>\n\n<bgsound>: Used specifically to play audio as background music while the page is being viewed. The audio plays in the background without user interaction — no visible controls are shown. Attributes: src (file location), volume (volume level), loop (how long to play; 'infinite' plays continuously). Syntax: <bgsound src='music.mp3' loop=infinite>",
              "hint": "<embed> = embed audio/video with visible controls. <bgsound> = background music only, no controls, auto-plays. Both use src attribute."
            },
            {
              "id": "q13",
              "html": "What are the attributes of the &lt;form&gt; tag?",
              "answer": "The important attributes of the <form> tag are:\n\n1. method: Specifies how form data is sent to the server. Two values: 'get' — appends form element names and values to the URL (visible in address bar); 'post' — sends names and values as packets (not visible in URL, more secure for sensitive data).\n\n2. action: Identifies the server-side program (script) that will process the form data. The action is the name of a CGI program written in languages like Perl, JavaScript, PHP, or ASP. Example: <form method=post action='process.php'>",
              "hint": "Two attributes: method (get = appends to URL, post = sends as packets) and action (server-side script that processes the form)."
            },
            {
              "id": "q14",
              "html": "What is the purpose of the Submit and Reset buttons in an HTML form?",
              "answer": "Submit Button: Created with <input type=submit value='Submit'>. When clicked, it sends all the form data (element names and their values) to the server application specified in the form's action attribute for processing.\n\nReset Button: Created with <input type=reset value='Clear'>. When clicked, it clears all form fields and returns them to their default values, allowing the user to start filling the form again.\n\nThese are special form controls — Submit sends the data, Reset wipes the data. Both use the <input> tag with the appropriate type value.",
              "hint": "Submit: sends all form data to server (action URL). Reset: clears all fields back to defaults. Both use <input type=submit/reset value='label'>."
            }
          ]
        }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Short (3 x 3)",
      "title": "Part III -- Short Answers",
      "type": "brief_answer",
      "scoreMax": 9,
      "marksPer": 3,
      "sections": [
        {
          "label": "Short Answers",
          "questions": [
            {
              "id": "q15",
              "html": "Write an HTML code to insert an image with appropriate attributes.",
              "answer": "HTML code to insert an image with attributes:\n\n<html>\n<head>\n  <title> Inserting Images </title>\n</head>\n<body>\n  <h1 align=center> Bharathiyar </h1>\n  <img src=\"bharathiyar.jpg\" alt=\"Mahakavi Bharathi\" height=200 width=150 align=left>\n  <p> Subramania Bharati, popularly known as Bharathiyar, was a Tamil poet,\n  journalist, and a social reformer. He is considered one of the greatest\n  Tamil literary figures of the modern era. </p>\n</body>\n</html>\n\nExplanation: src specifies the image file; alt provides alternative text if the image doesn't load; height and width set the dimensions; align=left makes the image float to the left with text wrapping on the right.",
              "hint": "Use <img src='file.jpg' alt='description' height=200 width=150 align=left>. Include alt for accessibility, height/width for size, align for position."
            },
            {
              "id": "q16",
              "html": "Write an HTML code to demonstrate the use of the &lt;marquee&gt; tag with attributes.",
              "answer": "HTML code demonstrating <marquee> with attributes:\n\n<html>\n<head>\n  <title> Marquee Demo </title>\n</head>\n<body>\n  <h2 align=center> Marquee Examples </h2>\n\n  <marquee>\n    Welcome to Samacheer Kalvi Class 11 Computer Applications!\n  </marquee>\n\n  <br>\n\n  <marquee direction=right bgcolor=yellow scrollamount=5>\n    <b> The Government of Tamil Nadu </b>\n  </marquee>\n\n  <br>\n\n  <marquee direction=up height=100 behavior=alternate>\n    Scroll Up!\n  </marquee>\n</body>\n</html>\n\nThe first marquee scrolls left to right (default). The second scrolls from left, has yellow background, speed 5. The third scrolls up and bounces (alternate behavior).",
              "hint": "Show at least two <marquee> examples: one with default settings, one with direction=right/bgcolor/scrollamount. Explain each attribute used."
            },
            {
              "id": "q17",
              "html": "Write an HTML code to create a basic student registration form with Name, Email, Gender, and a Submit button.",
              "answer": "HTML code for student registration form:\n\n<html>\n<head>\n  <title> Student Registration Form </title>\n</head>\n<body>\n  <h2 align=center> Student Registration Form </h2>\n  <form method=post action='register.php'>\n\n    Name: <br>\n    <input type=text name='studentname' size=30> <br><br>\n\n    Email: <br>\n    <input type=text name='email' size=30> <br><br>\n\n    Gender: <br>\n    <input type=radio name='gender' value='boy'> Boy\n    <input type=radio name='gender' value='girl'> Girl <br><br>\n\n    <input type=submit value='Register'>\n    <input type=reset value='Clear'>\n\n  </form>\n</body>\n</html>\n\nThe form uses method=post for security. The text inputs collect Name and Email. Radio buttons let the student select their gender (only one can be selected as they share the same name attribute). Submit sends data; Reset clears it.",
              "hint": "Form with: <input type=text> for Name and Email, <input type=radio name='gender'> for Boy/Girl, <input type=submit> and <input type=reset>. Use <form method=post action='...'>."
            }
          ]
        }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Long (2 x 8)",
      "title": "Part IV -- Explain in Detail",
      "type": "long_essay",
      "scoreMax": 17,
      "marksPer": 8,
      "sections": [
        {
          "label": "Long Answers",
          "questions": [
            {
              "id": "q18",
              "html": "Explain the different image formats used in web pages and the attributes of the &lt;img&gt; tag.",
              "answer": "Image Formats for Web Pages:\n\n1. GIF (Graphical Interchange Format): Developed by CompuServe. Popular for animated images, logos, icons, and line art. Supports a maximum of 256 colours — not suitable for photographic work. Animated GIF does not support sound or playback control.\n\n2. JPEG (Joint Photographic Experts Group): Most popular image format supported by all web browsers. Suitable for photographic images as it supports unlimited colours (unlike GIF). Best choice for real-world photos.\n\n3. PNG (Portable Network Graphics): Designed as a replacement for GIF. Also supported by all browsers. Supports transparency.\n\n4. SVG (Scalable Vector Graphics): A graphics format developed for the web. Standardised by W3C in 2001. Scales without losing quality. All current web browsers support basic SVG features.\n\nImages can be converted between formats using applications like Photoshop, Picasa, or GIMP.\n\nAttributes of the <img> tag:\n\n1. src (required): Specifies the file name, path, or URL of the image. Example: <img src='photo.jpg'> or <img src='D:\\Images\\photo.jpg'>\n\n2. alt: Alternative text displayed if the image fails to load. Also used by screen readers for accessibility. Example: <img src='cat.jpg' alt='A cat image'>\n\n3. height: Sets the height of the image in pixels or percentage. Example: <img src='logo.png' height=100>\n\n4. width: Sets the width of the image in pixels or percentage. Example: <img src='logo.png' width=150>\n\n5. align: Aligns the image with respect to surrounding text. Values: bottom (default — bottom of image aligns with text baseline), middle (centre aligns with baseline), top (top aligns with baseline), left (image floats left, text wraps right), right (image floats right, text wraps left).",
              "hint": "Cover 4 image formats: GIF (256 colours, animated, CompuServe), JPEG (photos, unlimited colours), PNG (GIF replacement), SVG (W3C 2001, scalable). Then 5 img attributes: src, alt, height, width, align (5 values)."
            },
            {
              "id": "q19",
              "html": "Explain HTML forms with the different types of form controls. Write HTML code for a Student Data Entry Form.",
              "answer": "HTML Forms:\nForms are used to receive information from users — for registration, login, orders, and feedback. The <form> tag creates a form with method and action attributes.\n\nForm Controls (using <input> tag, an empty tag):\n\n1. Text Box (type=text): For single-line text input (name, address). Attributes: name, size, maxlength.\n2. Password Box (type=password): Text input where characters appear hidden as dots/asterisks.\n3. Radio Button (type=radio): Select one option from a group. All buttons in the same group must share the same name attribute.\n4. Checkbox (type=checkbox): Select one or more options independently.\n5. Submit Button (type=submit): Sends all form data to the server script in action.\n6. Reset Button (type=reset): Clears all form fields to their defaults.\n7. Text Area (<textarea>): Multi-line text input for comments. Attributes: rows, cols.\n8. Select Box (<select> + <option>): Dropdown list for selecting one option.\n\nStudent Data Entry Form:\n<html>\n<head>\n  <title> Students Data Entry Form </title>\n</head>\n<body>\n  <h2 align=center> Students Data Entry Form </h2>\n  <form method=post action='process.php'>\n    Student Name: <input type=text name='name' size=30> <br><br>\n    Email: <input type=text name='email' size=30> <br><br>\n    Gender:\n    <input type=radio name='gender' value='boy'> Boy\n    <input type=radio name='gender' value='girl'> Girl <br><br>\n    Subjects:\n    <input type=checkbox name='sub1' value='Tamil'> Tamil\n    <input type=checkbox name='sub2' value='English'> English\n    <input type=checkbox name='sub3' value='Physics'> Physics <br><br>\n    City/Town:\n    <select name='city'>\n      <option> Chennai </option>\n      <option> Madurai </option>\n      <option> Coimbatore </option>\n    </select> <br><br>\n    Comments: <br>\n    <textarea name='comments' rows=4 cols=40> </textarea> <br><br>\n    <input type=submit value='Submit'>\n    <input type=reset value='Clear'>\n  </form>\n</body>\n</html>",
              "hint": "Explain forms (purpose, <form method action>). List 8 controls: text, password, radio, checkbox, submit, reset, textarea, select. Write full form code with all control types."
            }
          ]
        }
      ]
    }
  ]
}
