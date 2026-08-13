export default {
  chapterNumber: 4,
  title: "Theoretical Concepts of Operating System",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "software-types",
      title: "Introduction to Software",
      content: `**Software** is a set of instructions that performs a specific task. It interacts with hardware to generate the desired output.

**Types of Software:**

**Application Software:** A set of programs to perform specific tasks for the user. Examples: MS Word (create text documents), VLC Player (play audio/video files).

**System Software:** A type of computer program designed to run the computer's hardware and application programs. Examples: Operating System, Language Processor.`
    },
    {
      id: "os-intro",
      title: "Introduction to Operating System",
      content: `An **Operating System (OS)** is a system software that serves as an interface between the user and the computer. It controls input, output, and other peripheral devices such as disk drives, printers, and electronic gadgets.

**Functions of an OS:** File management, memory management, process management, device management, security management, and more.

Without an OS, a computer cannot effectively manage its resources. When a computer is switched on, the OS is loaded into memory automatically.

**Popular Operating Systems:**
- Personal computers and laptops: **Windows, UNIX, Linux**
- Mobile devices: **Android, iOS**

**Uses of an OS:**
- Ensures a computer can be used to do what the user wants (booting).
- Controls Input and Output devices.
- Manages memory utilisation.
- Provides easy interaction between user and computer.
- Provides security to user programs.`
    },
    {
      id: "types-os",
      title: "Types of Operating System",
      content: `Operating Systems are classified based on their processing capabilities:

**Single-User Operating System:**
Allows only one user to perform one task at a time. Also called a single-user, single-task OS.
Example: **MS-DOS**

**Multi-User Operating System:**
Allows multiple users to access the same data and applications simultaneously. Users can communicate with each other.
Examples: **Windows, Linux, UNIX**`
    },
    {
      id: "key-features",
      title: "Key Features of the Operating System",
      content: `**4.4.1 User Interface (UI)**
The only way users can interact with a computer. The success of **GUI (Graphical User Interface)**-based OSes comes from this feature. A GUI is a window-based system with a pointing device (mouse) to direct I/O, choose menus, and make selections; a keyboard is used to enter text. Vibrant colours attract users.

Points to consider when designing a UI:
1. Should enable users to retain expertise for a longer time.
2. Should satisfy customer needs.
3. Should save user's precious time.
4. Should satisfy the customer (ultimate aim of any product).
5. Should reduce the number of errors committed by the user.

---

**4.4.2 Memory Management**
The process of controlling and coordinating the computer's main memory; assigns memory blocks to running programs to optimise performance.

Responsibilities:
- Tracking which portions of memory are in use and by whom.
- Deciding which processes and data to move in and out of memory.
- Allocating and de-allocating memory blocks as programs need them (**Garbage Collection**).

---

**4.4.3 Process Management**
Includes creating and deleting processes (programs) and providing mechanisms for processes to communicate and synchronise. A system task such as sending output to a printer is also called a **process**.

Processes are classified as:
- **OS Processes:** Executed by system code.
- **User Processes:** Executed by user code.

All processes can potentially execute concurrently on a single CPU.

**Scheduling Algorithms:**

**FIFO (First In First Out):** The process that enters the queue first is executed first, then the next, and so on — like a student queue.

**SJF (Shortest Job First):** The job with the smallest size is executed first.
Example: Job A = 6 KB, Job B = 9 KB → A executes before B.

**Round Robin (RR):** Designed for time-sharing systems. Jobs are assigned processor time in a circular manner (A → B → C → A → B → C …). Each job gets a fixed time slot.

**Priority-Based:** The job with the higher priority number executes first.
Example: Job A priority = 5, Job B priority = 7 → B executes before A.

---

**4.4.4 Security Management**
The OS provides three levels of security:
1. **File access level:** To access files created by others, you need permission granted by the file creator or the administrator.
2. **System level:** Password protection in a multi-user environment (both Windows and Linux provide this).
3. **Network level:** Network security; one of the most challenging areas.

---

**4.4.5 Fault Tolerance**
The OS must be robust. When a fault occurs, it should not crash. Instead, the OS retains the existing system state and continues to operate.

---

**4.4.6 File Management**
The OS manages files, folders, and directory systems. The **FAT (File Allocation Table)** stores general information about files: filename, type (text or binary), size, starting address, and access mode. The file manager creates, edits, copies, allocates memory, and updates the FAT.

Other file management systems:
- **NTFS (New Technology File System):** Used by Windows.
- **ext2:** Used by Linux.

---

**4.4.7 Multi-Processing**
Two or more processors handle a single running process in parallel (**parallel processing**). Increases computing power and execution speed.

---

**4.4.8 Time-Sharing**
Allows execution of multiple tasks concurrently. A fixed time is allocated to each task — called **time-sharing**. The processor switches rapidly between processes after each time slot.

Example: Three processes P1, P2, P3 with 30, 40, 50 minutes each. If P1 completes in 20 minutes, the processor moves to P2. If P2 doesn't complete in 40 minutes, it is paused and P3 starts.

---

**4.4.9 Distributed Operating Systems**
Used to access shared data and files residing on any machine around the world via internet/intranet. Users access remote resources as if they were local.

Advantages:
- A user at one location can use resources at another location over the network.
- Computer resources can be added easily to the network.
- Improves interaction with customers and clients.
- Reduces load on the host computer.`
    },
    {
      id: "prominent-os",
      title: "Prominent Operating Systems",
      content: `**UNIX:** Popular in universities, companies, and large enterprises. One of the original multi-user OS.

**Microsoft Windows:** The most popular GUI OS for personal computers. Available in versions from Windows 1.x (1985) to current releases.

**Linux:** Command-line OS; open-source and free. Also available with a GUI. Popular in servers and developer environments.

**iOS:** Designed for Apple iPhone and Apple devices; works well with cloud computing.

**Android:** Popular mobile OS not linked with Apple; runs on smartphones from many manufacturers.

Modern operating systems use a **GUI (Graphical User Interface)** that lets users click icons, buttons, and menus; content is displayed clearly using graphics and text.`
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- Software is either Application Software (user tasks) or System Software (hardware/OS management).
- An OS is system software that interfaces between the user and hardware.
- Single-user OS (e.g., MS-DOS): one user, one task. Multi-user OS (e.g., Windows, Linux): multiple users simultaneously.
- Key OS features: User Interface, Memory Management, Process Management, Security Management, Fault Tolerance, File Management, Multi-Processing, Time-Sharing, Distributed OS.
- Scheduling algorithms: FIFO, SJF, Round Robin, Priority-Based.
- FAT (File Allocation Table) stores file metadata; NTFS is used in Windows; ext2 in Linux.
- Distributed OS allows users to access resources on any machine over a network as if they were local.`
    }
  ]
}
