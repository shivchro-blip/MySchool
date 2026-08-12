// frontend/web/src/content/Class_12/ComputerApplications/chapters/chapter-13-network-cabling.js

export default {
  eyebrow: "Chapter 13 · Class 12 Computer Applications",
  title: "Network Cabling",
  author: "",
  pills: ["Theory", "Networks", "Board Exam Important"],

  tabs: [
    {
      id: "cable-types",
      label: "Types of Cables",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Every computer network needs a physical connection — either wired or wireless. In this chapter, we learn about the different types of cables used to connect computers in a network. Network cabling knowledge is tested in Part I and Part III questions.</p>",
        },
        {
          type: "section-head",
          text: "13.1 Introduction",
        },
        {
          type: "gloss-row",
          word: "WWW Inventor",
          def: "Tim Berners Lee invented the World Wide Web (WWW). The Internet is a global network connecting billions of computers across the world.",
        },
        {
          type: "gloss-row",
          word: "Wired vs Wireless",
          def: "Wired networks: faster, more secure, more expensive for large areas. Wireless networks: enable more devices to share resources remotely. Wired networks still widely used in offices needing high speed and secure connections.",
        },
        {
          type: "section-head",
          text: "13.2 Types of Network Cables (6 Types)",
        },
        {
          type: "gloss-row",
          word: "1. Coaxial Cable",
          def: "Used to connect television sets to home antennas. Has a copper wire inside with insulation on top. Data transfer speed: 10 Mbps. Classified into Thinnet and Thicknet. Difficult to install and maintain.",
        },
        {
          type: "gloss-row",
          word: "2. Twisted Pair Cable",
          def: "Has 8 wires twisted together to ignore electromagnetic interference. Two types: UTP (Unshielded Twisted Pair) — modern, lower cost, easy installation. STP (Shielded Twisted Pair) — covered by additional jacket to protect from external interference.",
        },
        {
          type: "gloss-row",
          word: "3. Fiber Optic Cable",
          def: "Made of strands of glass. Uses pulses of LIGHT to transmit data. Mainly used in WAN (Wide Area Network). Placed deep underground. Two types: Single-mode (long distance, high cost), Multimode (short distance, low cost). Easy to maintain.",
        },
        {
          type: "gloss-row",
          word: "4. USB Cables",
          def: "Universal Serial Bus. Used to connect keyboard, mouse, and peripheral devices. Micro USB for mobile phones, GPS, cameras. Latest version: USB 3.0 — data transfer rate 4.85 Gbps.",
        },
        {
          type: "gloss-row",
          word: "5. Serial and Parallel Cables",
          def: "Used before Ethernet. Serial cable: sends 1 bit at a time. Parallel cable: sends 8 bits at a time. Example: RS232 cable. Parallel cables used for printers and disk drivers.",
        },
        {
          type: "gloss-row",
          word: "6. Ethernet Cable",
          def: "A type of twisted pair cable. Most common type for home/office LAN (Local Area Network). Connects wired devices for sharing resources and accessing Internet. Standards: Cat 3, Cat 5, Cat 6, Cat 6e, Cat 7.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Which cable uses light? Fiber Optic. Which cable is used for TV? Coaxial. Which cable is most common for LAN? Ethernet (twisted pair). Serial = 1 bit at a time, Parallel = 8 bits at a time. These are common MCQ questions.",
        },
        {
          type: "nav",
          next: "ethernet-rj45",
          nextLabel: "Next: Ethernet & RJ45 →",
        },
      ],
    },
    {
      id: "ethernet-rj45",
      label: "Ethernet & RJ45",
      blocks: [
        {
          type: "section-head",
          text: "13.3 Ethernet Cabling Components (4 Main Components)",
        },
        {
          type: "gloss-row",
          word: "1. Patch Cable (Twisted Pair)",
          def: "Made of 8 wires in different colours. 4 solid colours, 4 striped. Standards: Cat 3, Cat 5, Cat 6, Cat 6e, Cat 7. Cat = Category. Higher version = faster and higher frequencies.",
        },
        {
          type: "gloss-row",
          word: "2. RJ45 Connector",
          def: "A small plastic cube with 8 pins. Connected to each end of the Ethernet cable. Also called 8P8C connector. Plugged into Ethernet port of network card. RJ = Registered Jack, 45 = interface standard.",
        },
        {
          type: "gloss-row",
          word: "3. Ethernet Port",
          def: "An opening on an Ethernet card that accepts the RJ45 connector. Found on PCs, laptops, routers, switches, hubs, and modems. When plugged in: green LED = connected, orange LED blinking = Internet connected.",
        },
        {
          type: "gloss-row",
          word: "4. Crimping Tool",
          def: "A physical tool used to connect the patch wire and RJ45 connector. Used to lock the connector onto the cable during the crimping process.",
        },
        {
          type: "section-head",
          text: "Wiring Schemes (T568A and T568B)",
        },
        {
          type: "gloss-row",
          word: "T568A and T568B",
          def: "Two wiring schemes/colour codes for connecting wires to the RJ45 connector. Ethernet uses only 2 pairs (orange and green) out of 4. TX = transmit data, RX = receive data. Pin 1 = TX+, Pin 2 = TX-, Pin 3 = RX+, Pin 6 = RX-. Pins 4, 5, 7, 8 = reserved.",
        },
        {
          type: "section-head",
          text: "13.4 Other Types of Jacks",
        },
        {
          type: "gloss-row",
          word: "Registered Jack (RJ)",
          def: "A network interface for network cabling, wiring, and jack construction. Connects data equipment and telecommunication devices. Common types: RJ-11, RJ-45, RJ-21, RJ-14, RJ-61.",
        },
        {
          type: "gloss-row",
          word: "RJ-11",
          def: "Most popular modern registered jack. Used in home and office for landline phones. Has 6 pins (2 for transmit, 2 for receive, 2 reserved).",
        },
        {
          type: "gloss-row",
          word: "RJ-21 (Champ Connector / Amphenol Connector)",
          def: "Has 50 pins (25 at each end). Used for data communication trunking applications.",
        },
        {
          type: "section-head",
          text: "13.5 Ethernet Cable Colour Coding / Wiring Techniques (3 Types)",
        },
        {
          type: "gloss-row",
          word: "1. Straight-Through Wiring",
          def: "Wires are in the SAME sequence at both ends. Pin 1 at one end connects to Pin 1 at the other end. Used for connecting PC/NIC card to a hub. Most common.",
        },
        {
          type: "gloss-row",
          word: "2. Cross-Over Wiring",
          def: "Used to connect TWO computers directly without a hub. TX and RX lines are crossed. Pin 1 & 2 of one end → Pin 3 & 6 of other end. One end = T568A, other end = T568B. Also called Null modem cable.",
        },
        {
          type: "gloss-row",
          word: "3. Roll-Over Wiring",
          def: "Wires are in OPPOSITE sequence at either end. Pin 1 connects to Pin 8, Pin 2 to Pin 7, etc. Used to connect a device console port for programming changes. Also called Console cable. Usually flat and light blue colour.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Straight-through = same sequence both ends = PC to Hub. Cross-over = crossed TX/RX = PC to PC directly (also called Null modem). Roll-over = opposite/reversed sequence = Console cable. These three are asked in Part III every year.",
        },
        {
          type: "nav",
          back: "cable-types",
          practice: true,
        },
      ],
    },
  ],
}
