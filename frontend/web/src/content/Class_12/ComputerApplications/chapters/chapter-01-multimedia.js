export default {
  eyebrow: "Chapter 1 · Class 12 Computer Applications",
  title: "Multimedia",
  author: "",
  pills: ["Theory", "June Syllabus", "Board Exam Important"],

  tabs: [

    // ─────────────────────────────────────────────────────────
    // TAB 1 — Introduction & Definition
    // ─────────────────────────────────────────────────────────
    {
      id: "intro",
      label: "Introduction",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Think about your favourite mobile game. It has colourful pictures, background music, moving characters, text instructions, and maybe even video cut-scenes. That combination — many types of media working together — is exactly what Multimedia means. Don't worry, this chapter is easy once we break it into small steps!</p>",
        },
        {
          type: "section-head",
          text: "1.1 What is Multimedia?",
        },
        {
          type: "teacher-voice",
          html: "<p>Multimedia allows users to combine and change data from various sources — image, text, graphics, video, audio — into a single platform. The fast-growing multimedia technology over the last decade has brought huge changes to computing, entertainment, and education.</p>",
        },
        {
          type: "think-box",
          label: "Tamil Word Help 🔤",
          text: "Multimedia = \"Multi\" (பல வகை) + \"Media\" (ஊடகம்). அதாவது, பல வகையான தகவல் வழிகளை ஒரே இடத்தில் சேர்ப்பது.",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "When you watch a cooking video on YouTube, you see the chef's face (video), hear their voice (audio), read the recipe steps (text), and see moving ingredient graphics (animation). That is multimedia!",
        },
        {
          type: "section-head",
          text: "1.2 Definition of Multimedia",
        },
        {
          type: "quote-block",
          quote: "Multimedia is a computer-based presentation technique that incorporates text, images, sound, video, and animation on a single platform.",
          context: "",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "The definition of Multimedia is asked in almost every board exam. Learn it word for word: \"computer-based presentation technique that incorporates text, images, sound, video and animation.\"",
        },
        {
          type: "section-head",
          text: "1.3 The 5 Components of Multimedia",
        },
        {
          type: "teacher-voice",
          html: "<p>Multimedia has exactly 5 major components. Think of them as the five ingredients needed to cook a full multimedia dish. You must memorise all 5 for exams:</p>",
        },
        {
          type: "gloss-row",
          word: "📝 Text",
          def: "The basic building block. Used to convey information, label images, and give instructions.",
        },
        {
          type: "gloss-row",
          word: "🖼️ Image",
          def: "Visual content — either Raster (pixels) or Vector (shapes).",
        },
        {
          type: "gloss-row",
          word: "🎬 Animation",
          def: "Still images displayed rapidly to give the impression of movement.",
        },
        {
          type: "gloss-row",
          word: "🔊 Sound",
          def: "Speech, music, and special effects — the most serious element in multimedia.",
        },
        {
          type: "gloss-row",
          word: "🎥 Video",
          def: "Display of recorded events or scenes — the most powerful way to convey information.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "\"List the 5 components of Multimedia\" is a 2-mark question in every exam. Answer: Text, Image, Animation, Sound, Video.",
        },
        {
          type: "nav",
          next: "components",
          nextLabel: "Next: Components ->",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 2 — Components in Detail
    // ─────────────────────────────────────────────────────────
    {
      id: "components",
      label: "Components",
      blocks: [

        { type: "section-head", text: "1.3.1 Text" },
        {
          type: "teacher-voice",
          html: "<p>Text is the most basic component. There are two types of text in multimedia — Static Text and Hypertext.</p>",
        },
        {
          type: "gloss-row",
          word: "Static Text",
          def: "Text that stays fixed in one place — a heading, a paragraph, or a label beside an image. It does not move or link anywhere. Example: the chapter title on your textbook page.",
        },
        {
          type: "gloss-row",
          word: "Hypertext",
          def: "Text that is linked to other content. Clicking it takes you to another page or section. Example: any blue underlined link on a website. In hypertext, the user can navigate in non-sequential ways — they can jump to any linked node.",
        },

        { type: "section-head", text: "1.3.2 Image" },
        {
          type: "teacher-voice",
          html: "<p>Computers generate images in two ways. Understanding the difference between Raster and Vector is very important — it is asked in Part I (MCQ) and Part II (short answer) every year.</p>",
        },
        {
          type: "gloss-row",
          word: "Raster Image",
          def: "Made up of tiny dots called pixels. Each pixel has a colour. When you zoom in, it becomes blurry. Examples: BMP, TIFF, GIF, JPEG, PNG, TGA, DIB.",
        },
        {
          type: "gloss-row",
          word: "Vector Image",
          def: "Made up of geometric shapes (lines, curves, polygons). Stays sharp at any size. Uses less memory. Examples: AI, EPS, SVG, CDR.",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "📸 Raster: Your selfie photo — zoom in and it gets blurry (you can see the individual pixel dots).\n🎨 Vector: Your school badge logo — zoom in as much as you want, it stays sharp (it is built from shapes, not dots).",
        },
        {
          type: "think-box",
          label: "⚠️ Common Mistake",
          text: "Don't confuse JPEG (raster) with EPS (vector). JPEG = photo format = pixels = raster. EPS/SVG = design format = shapes = vector. Memory trick: R for Raster = R for Real photos.",
        },
        {
          type: "teacher-voice",
          html: "<p>Color depth tells how many colors a pixel can show: 1 bit = 2 colors (black &amp; white), 4 bits = 16 colors, 8 bits = 256 colors. More bits = better quality image = larger file size.</p>",
        },

        { type: "section-head", text: "1.3.3 Animation" },
        {
          type: "gloss-row",
          word: "Animation",
          def: "The process of displaying many still images very quickly so they appear to move. Like a flipbook — each page has a slightly different drawing, and when you flip fast, the character seems to run!",
        },
        {
          type: "teacher-voice",
          html: "<p>In animation, the screen object is a vector image. The computer calculates how it moves along a path using numerical transformations. Frame rate matters:</p>",
        },
        {
          type: "gloss-row",
          word: "Minimum 16 fps",
          def: "Gives the impression of smooth movement.",
        },
        {
          type: "gloss-row",
          word: "25 fps",
          def: "Looks natural — used in movies and cartoons.",
        },
        {
          type: "think-box",
          label: "Tamil Word Help 🔤",
          text: "fps = Frames Per Second = ஒரு வினாடியில் காண்பிக்கப்படும் படங்களின் எண்ணிக்கை. அதிகமான fps = மிருதுவான இயக்கம்.",
        },
        {
          type: "gloss-row",
          word: "Path Animation",
          def: "An object moves along a path while the background stays the same. Example: a cartoon bird flying across a still sky.",
        },
        {
          type: "gloss-row",
          word: "Frame Animation",
          def: "Both the object AND the background can change in each frame. Example: a cartoon where the character runs and the scenery scrolls and changes.",
        },
        {
          type: "think-box",
          label: "2D vs 3D Animation 🌍",
          text: "2D animation (flat, like old Tom & Jerry cartoons) — objects move on X and Y axes only.\n3D animation (like Toy Story) — objects move on X, Y, and Z axes, giving depth and realism.",
        },

        { type: "section-head", text: "1.3.4 Sound" },
        {
          type: "teacher-voice",
          html: "<p>Sound is called the most \"serious\" element in multimedia because it creates emotion. The same video feels completely different with sad music versus happy music. Sound volume is measured in decibels (dB).</p>",
        },
        {
          type: "gloss-row",
          word: "MIDI (Musical Instrument Digital Interface)",
          def: "A standard communication tool for computers and electronic instruments. MIDI does NOT store actual sound — it stores instructions like \"play piano note A for 2 seconds.\" This makes MIDI files very small. Requires tools for synthesising sound and sequencing software.",
        },
        {
          type: "gloss-row",
          word: "Digital Audio (Sampled Sound)",
          def: "The computer takes tiny \"snapshots\" (samples) of a sound thousands of times per second and stores them as numbers. Sampling rate = how many snapshots per second. Higher sampling rate = better quality = bigger file.",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "Think of digital audio like a cricket match photo album. 1 photo per over (low sampling rate) = you miss most of the action. 100 photos per over (high sampling rate) = you capture every detail. Sound works the same way!",
        },

        { type: "section-head", text: "1.3.5 Video" },
        {
          type: "teacher-voice",
          html: "<p>Video is the display of recorded events or scenes. It is the most powerful way to convey information in multimedia. Video has two types:</p>",
        },
        {
          type: "gloss-row",
          word: "Analog Video",
          def: "Video data stored on non-computer media — tape, laser disc, film. Loses quality over time (generation loss). Two sub-types: Composite (all video components mixed into one signal — causes colour blending and low clarity) and Component (signals kept separate — better quality).",
        },
        {
          type: "gloss-row",
          word: "Digital Video",
          def: "Electronic representation of moving images as encoded digital data. No quality loss when copied. Displayed in rapid succession of frames. Example: MP4 files, YouTube videos.",
        },
        {
          type: "nav",
          back: "intro",
          next: "file-formats",
          nextLabel: "Next: File Formats ->",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 3 — File Formats
    // ─────────────────────────────────────────────────────────
    {
      id: "file-formats",
      label: "File Formats",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Every type of multimedia content is saved in a specific file format. Think of formats like different containers — a tiffin box for rice, a bottle for water. Each format has a specific purpose. Learn the full names — the exam often asks for expansions.</p>",
        },

        { type: "section-head", text: "Text Formats" },
        {
          type: "gloss-row",
          word: "RTF — Rich Text Format",
          def: "Introduced by Microsoft in 1987. Designed for cross-platform document interchange. Primary format for Microsoft's published products.",
        },
        {
          type: "gloss-row",
          word: "Plain Text (.txt)",
          def: "Can be opened by most text editors — Notepad (Windows), Gedit/nano (Linux), TextEdit (Mac). The original and popular way of sending email.",
        },

        { type: "section-head", text: "Image Formats (Raster)" },
        {
          type: "gloss-row",
          word: "BMP — Bitmap",
          def: "Windows format. Large and uncompressed. Used for high-resolution or large images. Windows 3.1 era format.",
        },
        {
          type: "gloss-row",
          word: "DIB — Device Independent Bitmap",
          def: "Contains a colour table. Pixel values correspond to RGB colour values.",
        },
        {
          type: "gloss-row",
          word: "GIF — Graphics Interchange Format",
          def: "Compressed image format. 8-bit colour look-up table. Best for limited-colour graphics and backgrounds. Most popular format for online colour graphics. Widely supported.",
        },
        {
          type: "gloss-row",
          word: "JPEG — Joint Photographic Experts Group",
          def: "Most commonly used method of lossy compression for digital images. Compression level can be adjusted. Best for photographs and naturalistic artwork. Not good for lettering or simple cartoons.",
        },
        {
          type: "gloss-row",
          word: "TIFF — Tagged Image File Format",
          def: "Common in desktop publishing for high-quality output. Supported by almost all software. Recent versions allow compression. Good for moving large files between computers.",
        },
        {
          type: "gloss-row",
          word: "TGA — Targa",
          def: "First popular format for high-resolution images. Common in the animation and video industry.",
        },
        {
          type: "gloss-row",
          word: "PNG — Portable Network Graphics",
          def: "Lossless, portable, well-compressed storage of raster images. Replacement for GIF. Works best for online viewing and the World Wide Web. Fully streamable with the best display option.",
        },

        { type: "section-head", text: "Image Formats (Vector)" },
        {
          type: "teacher-voice",
          html: "<p>Vector image file types: AI, EPS, SVG, CDR. These are made of geometric shapes, not pixels. They stay sharp at any size.</p>",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Raster formats: BMP, TIFF, GIF, JPEG, PNG, TGA, DIB\nVector formats: AI, EPS, SVG, CDR\nThis list is asked in Part III (brief answer) — \"List image file formats.\"",
        },

        { type: "section-head", text: "Audio Formats" },
        {
          type: "gloss-row",
          word: "WAV — Waveform Audio File Format",
          def: "Most popular audio format in Windows for uncompressed sound. Can be converted to MP3 to reduce file size.",
        },
        {
          type: "gloss-row",
          word: "MP3 — MPEG Layer-3 Format",
          def: "Most popular format for storing and downloading music. Compressed to approximately one-tenth the size of an equivalent WAV file.",
        },
        {
          type: "gloss-row",
          word: "OGG — OGG Vorbis",
          def: "Free and open source container format. Designed for streaming and high-quality digital multimedia. Quality comparable to MP3.",
        },
        {
          type: "gloss-row",
          word: "AIFF — Audio Interchange File Format",
          def: "Developed by Apple Inc. Used for storing sound data on personal computers and audio devices.",
        },
        {
          type: "gloss-row",
          word: "WMA — Windows Media Audio",
          def: "Popular audio format owned by Microsoft. Used with Windows Media Player.",
        },
        {
          type: "gloss-row",
          word: "RA — Real Audio Format",
          def: "Designed for streaming audio over the internet.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Two facts asked every year in MCQ:\n• RTF was introduced by Microsoft (1987)\n• AIFF was developed by Apple Inc.\nAlso: MP3 = ~1/10th the size of WAV.",
        },

        { type: "section-head", text: "Video Formats" },
        {
          type: "gloss-row",
          word: "AVI — Audio/Video Interleave",
          def: "Windows video format. Sound and picture elements are stored in alternate interleaved chunks.",
        },
        {
          type: "gloss-row",
          word: "MPEG — Moving Picture Experts Group",
          def: "International Standards Organization (ISO) standard for digital video and audio compression. Versions: MPEG-1 (VCD, MP3), MPEG-2 (DVD, digital TV set-top boxes), MPEG-4 (multimedia and mobile web), MPEG-7 (search of audio/visual content), MPEG-21 (\"Multimedia Framework\", research started 2000).",
        },
        {
          type: "nav",
          back: "components",
          next: "production",
          nextLabel: "Next: Production ->",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 4 — Production
    // ─────────────────────────────────────────────────────────
    {
      id: "production",
      label: "Production",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Making a multimedia project is not just pressing a record button. It needs careful planning — just like making a Tamil movie needs a script, director, editor, and music director. There are 12 steps and 9 team roles. Both are commonly asked in Part IV (detail) questions.</p>",
        },

        { type: "section-head", text: "1.5.1 Steps in Multimedia Production" },
        {
          type: "gloss-row",
          word: "Step 1 — Conceptual Analysis & Planning",
          def: "Identify an appropriate theme, budget, and content availability. Also consider copyright issues.",
        },
        {
          type: "gloss-row",
          word: "Step 2 — Project Design",
          def: "Goals = general statements. Objectives = specific statements. Activities = series of actions to implement an objective.",
        },
        {
          type: "gloss-row",
          word: "Step 3 — Pre-Production",
          def: "Develop the project based on planning and design.",
        },
        {
          type: "gloss-row",
          word: "Step 4 — Budgeting",
          def: "Estimate costs for consultants, hardware, software, travel, communication, and publishing.",
        },
        {
          type: "gloss-row",
          word: "Step 5 — Multimedia Production Team",
          def: "Assemble team members with specific roles (see team section below).",
        },
        {
          type: "gloss-row",
          word: "Step 6 — Hardware/Software Selection",
          def: "Choose the right CPU, RAM, storage, and appropriate software tools and file formats.",
        },
        {
          type: "gloss-row",
          word: "Step 7 — Defining the Content",
          def: "Content specialist prepares narration, bullets, charts, and tables for the multimedia architect.",
        },
        {
          type: "gloss-row",
          word: "Step 8 — Preparing the Structure",
          def: "Create a detailed plan with all steps, timeline, responsible person, and start/end time for each activity.",
        },
        {
          type: "gloss-row",
          word: "Step 9 — Production",
          def: "Background music selected, sound recorded, text added via OCR, photos taken with digital camera, video clips shot and edited. A pilot project is ready at this stage.",
        },
        {
          type: "gloss-row",
          word: "Step 10 — Testing",
          def: "Complete testing of the pilot before mass production. Test with Chrome, Firefox, IE, Netscape Navigator. Incorporate valid suggested changes after testing.",
        },
        {
          type: "gloss-row",
          word: "Step 11 — Documentation",
          def: "User documentation with all valuable information from system requirement to completion of testing. Include contact details, email, and phone numbers for technical support.",
        },
        {
          type: "gloss-row",
          word: "Step 12 — Delivering the Product",
          def: "Best delivered on CD/DVD or website. Internet delivery challenges: bandwidth problems, many plugins needed for audio/video, long download times. Solution: integrate both CD-ROM/DVD and Internet.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "\"List the steps in multimedia production\" is a 5-mark question. Know all 12 steps. Also remember: Goals = general statements, Objectives = specific statements — this distinction is often asked.",
        },

        { type: "section-head", text: "1.5.2 Multimedia Production Team (9 Roles)" },
        {
          type: "gloss-row",
          word: "1. Production Manager",
          def: "Defines and coordinates production in time and with full quality. Needs tech expertise, proposal writing skill, communication skill, budget management, and human resource management experience. Acts as team leader.",
        },
        {
          type: "gloss-row",
          word: "2. Content Specialist",
          def: "Performs all research activities for the application's content — information, graphics, data, and facts.",
        },
        {
          type: "gloss-row",
          word: "3. Script Writer",
          def: "Visualises concepts in a 3D environment. Writes video/film scripts as a linear sequence of events. May use virtual reality integration.",
        },
        {
          type: "gloss-row",
          word: "4. Text Editor",
          def: "Ensures text flows logically, is grammatically correct, and is well structured throughout the multimedia application.",
        },
        {
          type: "gloss-row",
          word: "5. Multimedia Architect",
          def: "Integrates all multimedia building blocks — graphics, text, audio, music, video, photos, animation — using authoring software.",
        },
        {
          type: "gloss-row",
          word: "6. Computer Graphic Artist",
          def: "Handles all graphic elements: backgrounds, bullets, buttons, picture editing, 3D objects, animation, and logos.",
        },
        {
          type: "gloss-row",
          word: "7. Audio & Video Specialist",
          def: "Deals with narration and digitised videos. Responsible for recording, editing sound effects, and digitising video.",
        },
        {
          type: "gloss-row",
          word: "8. Computer Programmer",
          def: "Writes code/scripts for special functions — video window size and shape, controlling peripherals, and other custom software functions.",
        },
        {
          type: "gloss-row",
          word: "9. Web Master",
          def: "Creates and maintains the internet web page. Converts multimedia presentation into a web page. Provides community access through web services.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "\"Explain the role of a Production Manager\" and \"List the Multimedia Production Team members\" are common Part IV questions. Know all 9 roles and their one-line responsibility.",
        },
        {
          type: "nav",
          back: "file-formats",
          next: "applications",
          nextLabel: "Next: Applications ->",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 5 — Applications & Recap
    // ─────────────────────────────────────────────────────────
    {
      id: "applications",
      label: "Applications",
      blocks: [
        { type: "section-head", text: "1.6 Multimedia on Internet" },
        {
          type: "teacher-voice",
          html: "<p>The internet and multimedia have merged powerfully. Major applications include interactive maps, media-rich blogs, internet radio, and streaming video.</p>",
        },
        {
          type: "gloss-row",
          word: "Key Fact",
          def: "An estimated 55 million consumers use internet radio and video services each month in the USA. Image is the most widely used multimedia resource on the internet.",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "When you send a voice note + photo on WhatsApp — that is multimedia delivered over the internet!",
        },

        { type: "section-head", text: "1.7 Applications of Multimedia (6 Areas)" },
        {
          type: "gloss-row",
          word: "1. Education",
          def: "e-learning, distance learning, virtual learning. EDUSAT (Education Satellite) launched by India for virtual classroom experience. MODULO at GMU Germany is a web-based multimedia learning system.",
        },
        {
          type: "gloss-row",
          word: "2. Entertainment",
          def: "Radio, TV, online gaming, video on demand (VOD). VOD stores movies on a central server; a set-top box converts digital to analog for your TV.",
        },
        {
          type: "gloss-row",
          word: "3. Business Systems",
          def: "Presentations, training, marketing animations. High-resolution projectors for boardroom presentations. Mobiles with Bluetooth/Wi-Fi enable business multimedia communication.",
        },
        {
          type: "gloss-row",
          word: "4. Medical Services",
          def: "Students practise surgery via simulation. Tiny digital cameras inserted in the human body allow doctors to see internal organs without dissection.",
        },
        {
          type: "gloss-row",
          word: "5. Public Places",
          def: "Kiosks in trade shows, libraries, railway stations, museums, malls, airports, banks, hotels. ATM machines are a form of multimedia kiosk.",
        },
        {
          type: "gloss-row",
          word: "6. Multimedia Conferencing",
          def: "Video-conferencing — face-to-face interaction among users located far from each other, as if sitting and discussing in the same room.",
        },
        {
          type: "think-box",
          label: "⭐ Remember EDUSAT",
          text: "EDUSAT = Education Satellite. India launched it for serving the educational sector — emulating a virtual classroom. This specific fact is asked in short-answer questions.",
        },

        { type: "section-head", text: "Chapter Recap — Key Points for Board Exam" },
        {
          type: "think-box",
          label: "⭐ Master Checklist",
          text: "Definition: computer-based presentation technique combining text, images, sound, video, animation\n5 Components: Text, Image, Animation, Sound, Video\nText types: Static (fixed) and Hypertext (linked, non-sequential)\nImage types: Raster (pixels — BMP/JPEG/GIF/PNG/TIFF/TGA/DIB) and Vector (shapes — AI/EPS/SVG/CDR)\nAnimation: min 16 fps; natural 25 fps; 2D (X,Y) and 3D (X,Y,Z)\nAnimation types: Path (fixed background) and Frame (background changes)\nMIDI: stores musical instructions, NOT actual sound\nVideo: Analog (tape, generation loss) and Digital (encoded data)\nRTF introduced by Microsoft in 1987\nAIFF developed by Apple Inc.\nMP3 = MPEG Layer-3 = ~1/10th size of WAV\n12 Production Steps (Conceptual Analysis → Delivering Product)\n9 Production Team roles (Production Manager → Web Master)\n6 Applications (Education, Entertainment, Business, Medical, Public Places, Conferencing)\nEDUSAT = India's Education Satellite for virtual classroom",
        },
        {
          type: "think-box",
          label: "⚠️ Common Mistakes to Avoid",
          text: "• JPEG is raster (not vector) — JPEG = photographs = pixels\n• EPS/SVG are vector (not raster) — EPS = design/logos = shapes\n• MIDI does NOT store sound — it stores instructions\n• Analog video has generation loss, digital video does not\n• Goals = general; Objectives = specific (don't swap these)\n• Minimum fps = 16, not 25. 25 fps is for \"natural looking\" animation",
        },
        {
          type: "nav",
          back: "production",
        },
      ],
    },

  ], // end tabs[]
}
