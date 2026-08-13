export default {
  chapterNumber: 1,
  title: "Introduction to Computers",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: `Computers are present in every sphere of life — education, research, travel, weather forecasting, social networking, and e-commerce. No modern organisation can function without a computer, and many have gone completely paperless. The growth of computers started with the need for fast calculations. The first known calculating device, the Abacus, led to the development of today's high-speed portable computers.

A **computer** is an electronic device that takes raw data (unprocessed) as input from the user and processes it under the control of a set of instructions (called a program), produces a result (output), and saves it for future use.`
    },
    {
      id: "generations",
      title: "Generations of Computers",
      content: `Based on the stage of technological development, computers are categorised into generations:

**First Generation (1940–1956)**
- Main component: Vacuum tubes
- Examples: ENIAC, EDVAC, UNIVAC 1
- Big in size, consumed more power, prone to overheating; used Machine Language
- ENIAC weighed 27 tons and occupied about 1,800 sq ft

**Second Generation (1956–1964)**
- Main component: Transistors
- Examples: IBM 1401, IBM 1620, UNIVAC 1108
- Smaller, generated less heat, used Assembly language; first OS developed

**Third Generation (1964–1971)**
- Main component: Integrated Circuits (IC)
- Examples: IBM 360 series, Honeywell 6000 series
- Faster, more reliable, used High Level Languages

**Fourth Generation (1971–1980)**
- Main component: Microprocessor / Very Large Scale Integrated Circuits (VLSI)
- Examples: IBM and Apple microcomputer series
- Smaller, faster; portable computers introduced

**Fifth Generation (1980–present)**
- Main component: Ultra Large Scale Integration (ULSI)
- Uses parallel processing and superconductors; introduction of Artificial Intelligence and Expert Systems; can recognise images and graphics

**Sixth Generation (Future)**
- Parallel and distributed computing; development of robotics; Natural Language Processing (NLP); voice recognition software; computers become smarter, faster, and smaller`
    },
    {
      id: "data-information",
      title: "Data and Information",
      content: `**Data** is an unprocessed collection of raw facts suitable for communication, interpretation, or processing. For example: 134, 16, 'Kavitha', 'C'. These alone convey no meaningful message.

**Information** is a collection of facts from which conclusions may be drawn. It is data that has been processed to give meaningful, ordered, or structured output. For example: "Kavitha is 16 years old." This conversion of data into information is called **data processing**.

The process flow is: **Input → Process → Output** (IPO Cycle). The input unit takes data, the CPU processes it, and the output unit produces the result. Memory holds data and instructions during processing.`
    },
    {
      id: "components",
      title: "Components of a Computer",
      content: `A computer is a combination of **hardware** (physical components — motherboard, memory, monitor, keyboard) and **software** (programs/instructions). Every task follows the IPO Cycle.

**1. Input Unit**
Feeds data into the computer for storage and processing. Examples: keyboard, mouse.

**2. Central Processing Unit (CPU)**
The major component that interprets and executes software instructions and controls all other units. It accepts binary data, processes it, and produces output. The CPU has three sub-components:

- **Arithmetic and Logic Unit (ALU):** Performs arithmetic operations (addition, subtraction, multiplication, division) and logical operations. Results are stored in the CPU's internal memory. Logical operations give the computer its decision-making ability.
- **Control Unit:** Controls the flow of data between the CPU, memory, and I/O devices; controls the entire operation of a computer.
- **Memory Unit (Registers):** Internal memory used during execution.

**3. Output Unit**
Any hardware component that conveys information to users in an understandable form. Examples: monitor, printer.

**4. Memory Unit**
Two types:
- **Primary Memory (RAM):** Volatile; used to temporarily store programs and data during execution. Lost when power is off.
- **Secondary Memory (Hard Disk, CD-ROM, DVD):** Non-volatile; stores data permanently.`
    },
    {
      id: "input-devices",
      title: "Input Devices",
      content: `**Keyboard:** Most common input device. Has character keys, modifier keys, function keys, navigation keys, and a numeric keypad.

**Mouse:** Pointing device to control the cursor. Actions include click, double-click, right-click, and drag-and-drop. Types include Optical, Laser, Air, 3D, and Ergonomic mouse. Invented by Douglas Engelbart, patented in 1970.

**Scanner:** Converts printed or written information (including photographs) into digital format for the computer.

**Fingerprint Scanner:** Biometric device for security; uses fingerprint recognition instead of passwords.

**Track Ball:** Similar to an upside-down mouse; the user spins the ball while the device remains stationary.

**Retinal Scanner:** Biometric device that scans unique patterns on a person's retinal blood vessels.

**Light Pen:** Pen-shaped pointing device connected to a monitor; detects light from the screen to identify its position.

**Optical Character Reader (OCR):** Detects and recognises characters printed or written on paper; scanned text can be edited using a word processor.

**Bar Code / QR Code Reader:** Scans bar codes (lines of different thickness) and QR codes (two-dimensional bar codes) and transmits data to the computer.

**Voice Input (Microphone):** Captures voice data; combined with speech recognition software, provides voice input.

**Digital Camera:** Captures images and videos in digital form using a CCD (Charge Coupled Device) chip.

**Touch Screen:** Display device allowing interaction using fingers; used in smartphones, tablets, kiosks, and cash registers.

**Keyer:** Hand-signalling device with a small number of switches (4–50); differs from a keyboard as keys are arranged in a cluster.`
    },
    {
      id: "output-devices",
      title: "Output Devices",
      content: `**Monitor:** Most common output device. Pictures are formed with picture elements called **PIXELS**. Types include CRT (Cathode Ray Tube), LCD (Liquid Crystal Display), and LED (Light Emitting Diodes). Works with a VGA (Video Graphics Array) card.

**Plotter:** Produces graphical output on paper using single-color or multi-color pens. Used for architectural drawings and large-format graphics.

**Printers:** Print information on paper. Two main categories:

*Impact Printers* — print by striking hammers or pins on ribbon; can print multi-part forms using carbon paper.
- **Dot Matrix Printer:** Uses metal pins; prints one line at a time; speed 30–1550 CPS (Characters Per Second).
- **Line Matrix Printer:** Uses a fixed print head; prints page-wide lines; speed over 1000 Lines Per Minute.

*Non-Impact Printers* — do not use striking mechanisms; use electrostatic or laser technology; better quality and speed.
- **Laser Printer:** Uses a laser beam to build a pattern on a drum; resolution around 1200 DPI; prints approximately 100 PPM.
- **Inkjet Printer:** Fires ink by heating or piezoelectricity; uses CMYK (Cyan, Magenta, Yellow, Black) cartridges; speed 1–20 PPM.

**Speakers:** Produce audio output; combined with speech synthesis software, computers can provide voice output.

**Multimedia Projector:** Projects computer output on a large screen; used in meeting halls and classrooms.`
    },
    {
      id: "booting",
      title: "Booting of a Computer",
      content: `**Booting** is the process of starting a computer. When switched on, the RAM is empty. The ROM contains a pre-written program called **POST (Power On Self Test)**, which checks if devices like RAM and keyboard are properly connected.

If devices are ready, **BIOS (Basic Input Output System)** is executed. Then the **Bootstrap Loader** transfers the OS from the hard disk into main memory, and the OS (Windows/Linux) gets loaded and executed.

**Two types of booting:**

**Cold Booting (Hard Booting):** The system starts from its initial state when the power button is pressed. Instructions are read from ROM to begin the boot process.

**Warm Booting (Soft Booting):** The system restarts (Reset button pressed). Does not start from initial state, so all diagnostic tests are not repeated. There is a risk of data loss if data was not saved properly.`
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Computers are present in all spheres of life and have revolutionised how organisations operate.
- A computer takes raw data as input, processes it according to a program, and produces output.
- Based on technology, computers are divided into six generations.
- A computer is a combination of hardware (physical) and software (instructions).
- The CPU has three parts: ALU (arithmetic and logical operations), Control Unit (controls data flow), and Registers (internal memory).
- Input unit feeds data; Output unit conveys results to users.
- Memory has two types: Primary (volatile, RAM) and Secondary (non-volatile, Hard Disk, CD, DVD).
- Booting loads the OS into memory; Cold Booting starts from power-on; Warm Booting restarts without full diagnostics.`
    }
  ]
}
