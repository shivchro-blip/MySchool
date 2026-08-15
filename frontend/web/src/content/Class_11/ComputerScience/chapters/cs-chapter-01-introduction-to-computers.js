export default {
  chapterNumber: 1,
  title: "Introduction to Computers",
  subject: "Computer Science",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction to Computers",
      content: `Computers are seen everywhere around us — in education, research, travel and tourism, weather forecasting, social networking, e-commerce, and more. Computers have become an indispensable part of our lives, revolutionising accuracy and speed of performing tasks. Today no organisation can function without a computer, and many organisations have become completely paperless.

The growth of the computer industry started with the need for performing fast calculations. The manual method of computing was slow and prone to errors, so attempts were made to develop fast calculating devices — the journey started from the first known calculating device (the **Abacus**), leading to today's extremely high-speed computing devices.

**A computer** is an electronic device that takes raw data (unprocessed) as input from the user and processes it under the control of a set of instructions (called a **program**), produces a result (output), and saves it for future use.

**Father of Computer:** Charles Babbage is considered to be the father of the computer, for his invention and the concept of the Analytical Engine in 1837. The Analytical Engine contained an Arithmetic Logic Unit (ALU), basic flow control, and integrated memory — which led to the development of the first general-purpose computer concept.`,
      nav: { next: "generations", nextLabel: "Next: Generations of Computers →" }
    },
    {
      id: "generations",
      title: "Generations of Computers",
      content: `Growth in the computer industry is determined by the development in technology. Based on various stages of development, computers can be categorised into different generations.

**First Generation (1940–1956)**
- Main component: Vacuum tubes
- Examples: ENIAC, EDVAC, UNIVAC 1
- Big in size, consumed more power, prone to malfunction due to overheating; Machine Language was used
- ENIAC weighed about 27 tons, was 8 feet × 100 feet × 3 feet in size, and consumed around 150 watts of power

**Second Generation (1956–1964)**
- Main component: Transistors
- Examples: IBM 1401, IBM 1620, UNIVAC 1108
- Smaller compared to first generation, generated less heat, consumed less power; Punched cards were used
- First operating system was developed — Batch Processing and Multiprogramming Operating System
- Machine language as well as Assembly language was used

**Third Generation (1964–1971)**
- Main component: Integrated Circuits (IC)
- Examples: IBM 360 series, Honeywell 6000 series
- Computers were smaller, faster, and more reliable; consumed less power; High Level Languages were used

**Fourth Generation (1971–1980)**
- Main component: Microprocessor / Very Large Scale Integrated Circuits (VLSI)
- Examples: IBM and Apple microcomputer series
- Smaller and faster; portable computers were introduced

**Fifth Generation (1980–present)**
- Main component: Ultra Large Scale Integration (ULSI)
- Parallel processing and superconductors; computer size drastically reduced
- Can recognise images and graphics; introduction of Artificial Intelligence and Expert Systems
- Able to solve highly complex problems including decision making and logical reasoning

**Sixth Generation (Future)**
- Parallel and distributed computing; computers become smarter, faster, and smaller
- Development of robotics; Natural Language Processing (NLP); development of Voice Recognition Software

**Did You Know?** The ENIAC (Electronic Numerical Integrator And Calculator) was invented by J. Presper Eckert and John Mauchly at the University of Pennsylvania. Construction began in 1943 and was not completed until 1946. It occupied about 1,800 square feet and used about 18,000 vacuum tubes, weighing almost 50 tons. ENIAC is considered the first digital computer because it was fully functional.

Natural Language Processing (NLP) is a component of Artificial Intelligence (AI) that provides the ability to develop computer programs to understand human language — a key feature of Sixth Generation computing.`,
      nav: { back: "intro", next: "data-information", nextLabel: "Next: Data and Information →" }
    },
    {
      id: "data-information",
      title: "Data and Information",
      content: `**Data** is defined as an unprocessed collection of raw facts, suitable for communication, interpretation, or processing. For example, 134, 16, 'Kavitha', 'C' are data — these alone give no meaningful message.

**Information** is a collection of facts from which conclusions may be drawn. In simple words, data that has been processed to give meaningful, ordered, or structured output is called information. For example, "Kavitha is 16 years old" conveys meaning about Kavitha. This conversion of data into information is called **data processing**.

"A Computer is an electronic device that takes raw data (unprocessed) as an input from the user and processes it under the control of a set of instructions (called program), produces a result (output), and saves it for future use."

Every task given to a computer follows an **Input → Process → Output** cycle (IPO Cycle). It needs certain input, processes that input, and produces the desired output. The input unit takes the input, the Central Processing Unit does the processing of data, and the output unit produces the output. The memory unit holds the data and instructions during the processing.`,
      nav: { back: "generations", next: "components", nextLabel: "Next: Components of a Computer →" }
    },
    {
      id: "components",
      title: "Components of a Computer",
      content: `The computer is a combination of **hardware** and **software**. Hardware is the physical component of a computer like motherboard, memory devices, monitor, keyboard, etc., while software is the set of programs or instructions.

**1.5.1 Input Unit**
Input unit is used to feed any form of data to the computer, which can be stored in the memory unit for further processing. Example: Keyboard, mouse, etc.

**1.5.2 Central Processing Unit (CPU)**
CPU is the major component which interprets and executes software instructions. It also controls the operation of all other components such as memory, input, and output units. It accepts binary data as input, processes the data according to the instructions, and provides the result as output. The CPU has three components: **Control Unit**, **Arithmetic and Logic Unit (ALU)**, and **Memory Unit**.

*1.5.2.1 Arithmetic and Logic Unit (ALU):* The ALU is a part of the CPU where various computing functions are performed on data. The ALU performs arithmetic operations such as addition, subtraction, multiplication, and division, and logical operations. The result of an operation is stored in the internal memory of the CPU. The logical operations of ALU promote the decision-making ability of a computer.

*1.5.2.2 Control Unit:* The control unit controls the flow of data between the CPU, memory, and I/O devices. It also controls the entire operation of a computer.

**1.5.3 Output Unit**
An Output Unit is any hardware component that conveys information to users in an understandable form. Example: Monitor, Printer, etc.

**1.5.4 Memory Unit**
The Memory Unit is of two types — primary memory and secondary memory.
- **Primary memory** is used to temporarily store the programs and data when the instructions are ready to execute. The Primary Memory is volatile — the content is lost when the power supply is switched off. Random Access Memory (RAM) is an example of main memory.
- **Secondary memory** is used to store the data permanently. It is non-volatile — the content is available even after the power supply is switched off. Hard disk, CD-ROM, and DVD ROM are examples of secondary memory.`,
      nav: { back: "data-information", next: "input-devices", nextLabel: "Next: Input Devices →" }
    },
    {
      id: "input-devices",
      title: "Input Devices",
      content: `**Keyboard:** The most common input device used today. The individual keys for letters, numbers, and special characters are collectively known as character keys — the layout is derived from the original typewriter keyboard. Apart from alphabet and numeric keys, it also has Function keys, character keys, modifier keys, system and GUI keys, enter and editing keys, navigation keys, numeric keypad, and lock keys.

**Mouse:** A pointing device used to control the movement of the cursor on the display screen — used to select icons, menus, command buttons, or activate something on a computer. Some mouse actions are move, click, double click, right click, drag and drop. Types include Mechanical, Optical, Laser, Air, 3D, Tactile, Ergonomic, and Gaming Mouse. The mouse was invented and developed by Douglas Engelbart, with the assistance of Bill English, during the 1960's, and was patented on November 17, 1970.

**Scanner:** Used to enter information directly into the computer's memory. It works like a Xerox machine and converts any type of printed or written information, including photographs, into a digital format that can be manipulated by the computer.

**Fingerprint Scanner:** A fingerprint recognition device used for computer security, using biometric technology — a safe and convenient alternative to passwords, which are vulnerable to fraud and hard to remember.

**Track Ball:** Similar to the upside-down design of the mouse. The user spins the ball directly in various directions to navigate screen movements, while the device itself remains stationary.

**Retinal Scanner:** Performs a retinal scan — a biometric technique that uses unique patterns on a person's retinal blood vessels.

**Light Pen:** A pointing device shaped like a pen and connected to a monitor. The tip contains a light-sensitive element which detects light from the screen, enabling the computer to identify the location of the pen on the screen. Light pens allow "drawing" directly onto the screen, but are hard to use and not very accurate.

**Optical Character Reader (OCR):** A device which detects characters printed or written on paper. A user can scan a page from a book, and the computer recognises the characters as letters and punctuation marks. The scanned document can be edited using a word processor.

**Bar Code / QR Code Reader:** A bar code is a pattern printed in lines of different thickness. The bar code reader scans this information and transmits it to the computer for further processing, giving fast and error-free entry of information. QR (Quick Response) Code is a two-dimensional bar code which can be read by a camera and processed to interpret the image.

**Voice Input Systems:** A microphone serves as a voice input device — it captures voice data and sends it to the computer. Combined with speech recognition software, it offers a completely new approach to input information into the computer.

**Digital Camera:** Captures images/videos directly in digital form. It uses a CCD (Charge Coupled Device) electronic chip — when light falls on the chip through the lens, it converts light rays into digital format.

**Touch Screen:** A display device that allows the user to interact with a computer using their finger — a useful alternative to a mouse or keyboard for navigating a Graphical User Interface (GUI). Used on computers, laptops, monitors, smart phones, tablets, cash registers, and information kiosks. Some touch screens use a grid of infrared beams to sense the presence of a finger instead of touch-sensitive input.

**Keyer:** A device for signalling by hand, by pressing one or more switches. Modern keyers have a large number of switches, typically between 4 and 50 — fewer than a full-size keyboard. A keyer differs from a keyboard (which has "no board") as the keys are arranged in a cluster.`,
      nav: { back: "components", next: "output-devices", nextLabel: "Next: Output Devices →" }
    },
    {
      id: "output-devices",
      title: "Output Devices",
      content: `**Monitor:** The most commonly used output device to display information — it looks like a TV. Pictures on a monitor are formed with picture elements called **PIXELS**. Monitors may be Monochrome (Black and White) or Color (multiple colours). Types include CRT (Cathode Ray Tube), LCD (Liquid Crystal Display), and LED (Light Emitting Diodes). The monitor works with the VGA (Video Graphics Array) card, which acts as an interface between the computer and display monitor. The first computer monitor was part of the Xerox Alto computer system, released on March 1, 1973.

**Plotter:** An output device used to produce graphical output on paper. It uses single-colour or multi-colour pens to draw pictures — commonly used for architectural drawings and large-format graphics.

**Printers:** Used to print information on paper. Printers are divided into two main categories:

*Impact Printers* — print by striking hammers or pins on ribbon, and can print multi-part forms (using carbon paper) using mechanical pressure.
- **Dot Matrix Printer:** Prints using a fixed number of pins or wires, each dot produced by a tiny metal rod (a "wire" or "pin"). Generally prints one line of text at a time. Speed varies from 30 to 1550 CPS (Characters Per Second).
- **Line Matrix Printer:** Uses a fixed print head and prints a page-wide line of dots at once, building up a line of text. Capable of printing much more than 1000 Lines Per Minute, resulting in thousands of pages per hour.

*Non-Impact Printers* — do not use a striking mechanism; use electrostatic or laser technology. Quality and speed are better than Impact printers.
- **Laser Printer:** Works with similar technology to photocopiers — a laser beam scans back and forth across a drum inside the printer, building up a pattern. Produces very good quality graphic images. Resolution is measured in Dots Per Inch (DPI), typically around 1200 DPI, and can print approximately 100 Pages Per Minute (PPM).
- **Inkjet Printer:** Uses colour cartridges combining Magenta, Yellow, and Cyan inks (plus a black cartridge for monochrome output) to create colour tones. Works by spraying ionised ink onto paper — either by heating the ink so it explodes towards the paper in bubbles, or by using piezoelectricity. Speed generally ranges from 1–20 PPM.

**Speakers:** Produce voice output (audio). Combined with speech synthesis software, the computer can provide voice output — very common in places like airlines, schools, banks, and railway stations.

**Multimedia Projectors:** Used to produce computer output on a big screen, commonly used to display presentations in meeting halls or classrooms.`,
      nav: { back: "input-devices", next: "booting", nextLabel: "Next: Booting of a Computer →" }
    },
    {
      id: "booting",
      title: "Booting of a Computer",
      content: `An **Operating System (OS)** is basic software that makes the computer work. When a computer is switched on, there is no information in its RAM. At the same time, in ROM, a pre-written program called **POST (Power On Self Test)** is executed first. This program checks if devices like RAM and keyboard are properly connected and ready to operate.

If these devices are ready, the **BIOS (Basic Input Output System)** gets executed. This process is called **Booting**. Thereafter, a program called "**Bootstrap Loader**" transfers the OS from the hard disk into main memory. The OS (Windows/Linux, etc.) then gets loaded and executed.

Booting is of two types:

**1. Cold Booting (Hard Booting):** When the system starts from its initial state — that is, it is switched on — we call it cold booting. When the user presses the Power button, the instructions are read from the ROM to initiate the booting process.

**2. Warm Booting (Soft Booting):** When the system restarts, or when the Reset button is pressed, we call it warm booting. The system does not start from its initial state, so all diagnostic tests need not be carried out. There is a risk of data loss and system damage, as data might not have been stored properly before the restart.`,
      nav: { back: "output-devices", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Computers are seen everywhere around us, in all spheres of life.
- A computer is an electronic device that processes input according to a set of instructions and gives the desired output at a very fast rate.
- Based on various stages of development, computers can be divided into six different generations.
- The computer is the combination of hardware and software.
- Hardware is the physical component of a computer.
- Input unit is used to feed any form of data to the computer.
- CPU interprets and executes software instructions.
- The ALU is a part of the CPU where various computing functions are performed on data.
- The control unit controls the flow of data between the CPU, memory, and I/O devices.
- An Output Unit is any hardware component that conveys information to the user in an understandable form.
- The Memory Unit is of two kinds — primary memory (volatile) and secondary memory (non-volatile).
- Booting is the process of loading the OS into memory. Cold Booting starts from the initial power-on state; Warm Booting restarts the system without full diagnostics.`,
      nav: { back: "booting", practice: true }
    }
  ]
}
