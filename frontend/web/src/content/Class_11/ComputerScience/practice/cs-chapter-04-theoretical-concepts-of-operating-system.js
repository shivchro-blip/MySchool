export default {
  "meta": {
    "subject": "Computer Science -- Class XI",
    "unit": "Chapter 4 -- Theoretical Concepts of Operating System",
    "time": "2.30 hrs",
    "totalMarks": 47,
    "instructions": "Samacheer Kalvi -- Answer all questions"
  },
  "parts": [
    {
      "id": "p1",
      "navLabel": "Part I -- MCQ (8 x 1)",
      "title": "Part I -- Choose the Correct Answer",
      "type": "mcq",
      "scoreMax": 8,
      "marksPer": 1,
      "sections": [
        {
          "label": "Theoretical Concepts of Operating System",
          "questions": [
            {
              "id": "q1",
              "html": "Operating System is a ______.",
              "options": ["a) Application Software", "b) Hardware", "c) System Software", "d) Component"],
              "answer": 2,
              "hint": "The OS is system software that runs the computer's hardware and application programs."
            },
            {
              "id": "q2",
              "html": "Identify the usage of Operating Systems.",
              "options": ["a) Easy interaction between the human and computer", "b) Controlling input & output devices", "c) Managing use of main memory", "d) All the above"],
              "answer": 3,
              "hint": "All three listed points are genuine uses of an Operating System."
            },
            {
              "id": "q3",
              "html": "Which of the following is NOT a function of an Operating System?",
              "options": ["a) Process Management", "b) Memory Management", "c) Security management", "d) Compiler Environment"],
              "answer": 3,
              "hint": "A compiler is separate system software — not itself an OS function."
            },
            {
              "id": "q4",
              "html": "Which of the following OS is a commercially licensed Operating System?",
              "options": ["a) Windows", "b) UBUNTU", "c) FEDORA", "d) REDHAT"],
              "answer": 0,
              "hint": "Windows is commercially licensed by Microsoft, unlike the listed Linux distributions."
            },
            {
              "id": "q5",
              "html": "Which of the following Operating Systems support Mobile Devices?",
              "options": ["a) Windows 7", "b) Linux", "c) BOSS", "d) iOS"],
              "answer": 3,
              "hint": "iOS is Apple's mobile operating system, used on iPhones."
            },
            {
              "id": "q6",
              "html": "File Management manages:",
              "options": ["a) Files", "b) Folders", "c) Directory systems", "d) All the Above"],
              "answer": 3,
              "hint": "File Management in an OS handles files, folders, and directory structures together."
            },
            {
              "id": "q7",
              "html": "An Interactive Operating System provides:",
              "options": ["a) Graphics User Interface (GUI)", "b) Data Distribution", "c) Security Management", "d) Real Time Processing"],
              "answer": 0,
              "hint": "Interactive OS lets the user work through a Graphical User Interface."
            },
            {
              "id": "q8",
              "html": "An example of a single-task Operating System is:",
              "options": ["a) Linux", "b) Windows", "c) MS-DOS", "d) Unix"],
              "answer": 2,
              "hint": "MS-DOS is the classic example of a single-user, single-task Operating System."
            }
          ]
        }
      ]
    },
    {
      "id": "p2",
      "navLabel": "Part II -- Very Short Answers (5 x 2)",
      "title": "Part II -- Very Short Answers",
      "type": "short_answer",
      "scoreMax": 10,
      "marksPer": 2,
      "sections": [
        {
          "label": "Very Short Answers",
          "questions": [
            {
              "id": "q9",
              "html": "List out any two uses of Operating System.",
              "answer": "Two uses of an Operating System are: (1) it enables easy interaction between users and the computer; and (2) it starts computer operation automatically when power is turned on (Booting). It also controls input/output devices and manages the use of main memory.",
              "hint": "Pick any two: easy interaction, booting, controlling I/O devices, managing memory, providing security."
            },
            {
              "id": "q10",
              "html": "What is a multi-user Operating System?",
              "answer": "A multi-user Operating System is used in computers and laptops that allow the same data and applications to be accessed by multiple users at the same time, with the users also able to communicate with each other. Windows, Linux, and UNIX are examples.",
              "hint": "Allows the same data/applications to be accessed by multiple users at once."
            },
            {
              "id": "q11",
              "html": "What is a GUI?",
              "answer": "A GUI (Graphical User Interface) is a window-based system with a pointing device to direct input/output, choose from menus, make selections, and a keyboard to enter text. It lets users click icons, buttons, and menus, displayed using a combination of graphics and text elements, making it easy to interact with the computer.",
              "hint": "Window-based interface with icons, menus, and a pointing device."
            },
            {
              "id": "q12",
              "html": "What is multi-processing?",
              "answer": "Multi-processing is a feature of an Operating System where two or more processors work together on a single running process (job). Since execution happens in parallel, this is called parallel processing, and is used for high-speed execution that increases the power of computing.",
              "hint": "Two or more processors working on a single job — parallel processing."
            },
            {
              "id": "q13",
              "html": "What are the different Operating Systems used in a computer?",
              "answer": "Some prominent Operating Systems used are UNIX, Microsoft Windows, and Linux for personal computers/laptops, and Android and iOS for mobile devices.",
              "hint": "Windows, Linux, UNIX (desktops); Android, iOS (mobile)."
            }
          ]
        }
      ]
    },
    {
      "id": "p3",
      "navLabel": "Part III -- Short Answers (3 x 3)",
      "title": "Part III -- Short Answers",
      "type": "brief_answer",
      "scoreMax": 9,
      "marksPer": 3,
      "sections": [
        {
          "label": "Short Answers",
          "questions": [
            {
              "id": "q14",
              "html": "What are the advantages and disadvantages of the Time-sharing feature?",
              "answer": "Time-sharing allows multiple tasks or processes to execute concurrently, with the processor allocating a fixed time to each task and switching rapidly between them once that time elapses or the process completes.\n\nAdvantage: It allows many users/processes to share the CPU efficiently, giving the impression that multiple programs run at once, and improves overall system responsiveness.\n\nDisadvantage: If time slices are too short, the processor spends excessive time switching between processes (overhead); if a process needs more time than allocated, it gets paused mid-task and must wait its turn again, which can delay completion of longer jobs.",
              "hint": "Advantage: shares CPU among many processes fairly. Disadvantage: switching overhead and possible delay for longer jobs."
            },
            {
              "id": "q15",
              "html": "List out the key features of an Operating System.",
              "answer": "The key features of an Operating System are: User Interface (UI), Memory Management, Process Management, Security Management, Fault Tolerance, File Management, Multi-Processing, Time-sharing, and support for Distributed Operating Systems.",
              "hint": "UI, Memory Mgmt, Process Mgmt, Security Mgmt, Fault Tolerance, File Mgmt, Multi-Processing, Time-sharing, Distributed OS."
            },
            {
              "id": "q16",
              "html": "Write a short note on Multi-Processing.",
              "answer": "Multi-Processing is a feature of an Operating System in which two or more processors work simultaneously on a single running process (job). Because the execution takes place in parallel across multiple processors, this is called parallel processing. This feature is used to achieve high-speed execution and increases the overall computing power of a system compared to a single-processor setup.",
              "hint": "Two+ processors, one job, parallel execution, higher computing power."
            }
          ]
        }
      ]
    },
    {
      "id": "p4",
      "navLabel": "Part IV -- Explain in Detail (4 x 5)",
      "title": "Part IV -- Explain in Detail",
      "type": "long_essay",
      "scoreMax": 20,
      "marksPer": 5,
      "sections": [
        {
          "label": "Long Answers",
          "questions": [
            {
              "id": "q17",
              "html": "Explain the concept of a Distributed Operating System along with its advantages.",
              "answer": "A Distributed Operating System is used to access shared data and files that reside on any machine around the world, using the internet or an intranet. Users can access remote resources as if they were available on their own computer, making resource sharing seamless across a network.\n\nAdvantages of a Distributed Operating System:\n1. A user at one location can make use of all the resources available at another location over the network.\n2. Many computer resources can be added easily to the network, allowing the system to scale.\n3. It improves interaction with customers and clients, since resources and data can be accessed remotely without delay.\n4. It reduces the load on the host computer, since processing and resources are distributed across multiple machines rather than concentrated on one.\n\nOverall, a Distributed OS enables efficient sharing of computing resources, storage, and data across geographically dispersed systems.",
              "hint": "Definition (shared access over internet/intranet) + all 4 advantages: resource sharing, easy scaling, better client interaction, reduced host load."
            },
            {
              "id": "q18",
              "html": "List out the points to be noted while creating a user interface for an Operating system.",
              "answer": "The following points should be considered when designing a User Interface for an application/Operating System:\n\n1. The user interface should enable the user to retain their expertise with the system for a longer time — it should not require constant relearning.\n2. It should satisfy the customer based on their specific needs.\n3. It should save the user's precious time by making tasks quick and efficient.\n4. The ultimate aim of any product is to satisfy the customer, so the interface design must be centred on customer satisfaction.\n5. The user interface should reduce the number of errors committed by the user, through clear layout, feedback, and intuitive controls.",
              "hint": "Retain user expertise, satisfy customer needs, save time, aim for customer satisfaction, reduce user errors."
            },
            {
              "id": "q19",
              "html": "Explain the process management algorithms in an Operating System.",
              "answer": "Process management includes creating and deleting processes and providing mechanisms for them to communicate and synchronize. The following algorithms are used to allocate jobs (processes) to the processor:\n\n1. FIFO (First In First Out): Based on a queuing technique — the process that enters the queue first is executed first by the CPU, followed by the next, and so on, in the exact order of arrival (like a queue for a grade sheet).\n\n2. SJF (Shortest Job First): Based on the size of the job being executed. Between two jobs, the smaller job is assigned to the processor first. For example, if Job A is 6KB and Job B is 9KB, Job A is executed before Job B.\n\n3. Round Robin (RR): Designed for time-sharing systems. Jobs are assigned processor time in a circular manner. For three jobs A, B, C, the processor executes A, then B, then C, then cycles back to A, B, C again, and so on, giving each job a fair, repeated share of processing time.\n\n4. Priority-Based Scheduling: The job is assigned based on its priority value — the job with the higher priority is considered more important and is processed first. For example, between Job A (priority 5) and Job B (priority 7), Job B is assigned to the processor before Job A.",
              "hint": "FIFO (arrival order), SJF (smallest job first), Round Robin (circular time-slices), Priority (highest priority first) — explain each with the book's examples."
            },
            {
              "id": "q20",
              "html": "Explain the key features of an Operating System in detail.",
              "answer": "The key features of an Operating System are:\n\n1. User Interface (UI): The main way users interact with the computer, most successfully through a GUI (Graphical User Interface) using icons, menus, and a pointing device.\n\n2. Memory Management: Controls and coordinates the computer's main memory, allocating memory blocks to running programs to optimize CPU utilization and response speed, including tracking used memory and freeing unused blocks (garbage collection).\n\n3. Process Management: Creates and deletes processes, and provides mechanisms for processes to communicate and synchronize, using scheduling algorithms like FIFO, SJF, Round Robin, and Priority-based scheduling.\n\n4. Security Management: Protects user data at three levels — File access level (creator/administrator-granted permissions), System level (password protection), and Network level (network security).\n\n5. Fault Tolerance: The OS should be robust — when a fault occurs, it should not crash but retain the system's existing state.\n\n6. File Management: Handles data storage using systems like FAT, NTFS, and ext2, managing files, folders, and directories.\n\n7. Multi-Processing: Uses two or more processors on a single job for high-speed parallel execution.\n\n8. Time-sharing: Allocates fixed time slots to multiple processes so they execute concurrently, switching rapidly between them.\n\n9. Distributed OS support: Allows shared access to data and resources over a network from anywhere.\n\nTogether these features allow the OS to manage hardware, run applications reliably, and provide a smooth, secure experience for the user.",
              "hint": "Cover all nine features: UI, Memory Mgmt, Process Mgmt, Security Mgmt, Fault Tolerance, File Mgmt, Multi-Processing, Time-sharing, Distributed OS."
            }
          ]
        }
      ]
    }
  ]
}
