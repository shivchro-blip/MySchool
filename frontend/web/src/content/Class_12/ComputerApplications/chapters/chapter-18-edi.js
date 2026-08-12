// frontend/web/src/content/Class_12/ComputerApplications/chapters/chapter-18-edi.js

export default {
  eyebrow: "Chapter 18 · Class 12 Computer Applications",
  title: "Electronic Data Interchange (EDI)",
  author: "",
  pills: ["Theory", "Board Exam Important"],

  tabs: [
    {
      id: "edi-intro",
      label: "EDI Introduction",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>When a supermarket's computer automatically orders stock from a supplier's computer without any human typing — that is EDI at work. EDI allows businesses to exchange standard business documents electronically, directly from computer to computer. This is the final chapter — learn it well!</p>",
        },
        {
          type: "section-head",
          text: "18.1 Introduction to EDI",
        },
        {
          type: "gloss-row",
          word: "EDI — Electronic Data Interchange",
          def: "The exchange of business documents between one trade partner and another electronically. Transferred through a dedicated channel or Internet in a predefined format without much human intervention. EDI is 'Paperless Trade'. EFT (Electronic Transfer) is 'Paperless Payment'.",
        },
        {
          type: "gloss-row",
          word: "Business Documents Transferred via EDI",
          def: "Delivery notes, invoices, purchase orders, advance ship notice, functional acknowledgements. Transferred directly from computer of issuing company to receiving company — saving time and avoiding errors of paper communications.",
        },
        {
          type: "gloss-row",
          word: "International EDI Standards",
          def: "EDIFACT, XML, ANSI ASC X12.",
        },
        {
          type: "section-head",
          text: "18.2 History of EDI",
        },
        {
          type: "gloss-row",
          word: "Father of EDI",
          def: "Ed Guilbert — developed first standardized format for business documents during the 1948 Berlin Airlift. His team developed the first standardized system for business documents, influencing how documents pass from computer to computer.",
        },
        {
          type: "gloss-row",
          word: "TDCC",
          def: "Transportation Data Coordinating Committee — formed in 1968 by US shipping, rail, airline, and truck companies to develop EDI standard formats. Published first EDI standards in 1975. Renamed to EDIA (Electronic Data Interchange Association) in 1978. Then taken by ANSI as the ANSI X12 committee.",
        },
        {
          type: "gloss-row",
          word: "First EDI Message",
          def: "Sent in 1965 from Holland-American steamship line to Trans-Atlantic shipping company using telex messages. A full page of information transmitted in roughly 2 minutes.",
        },
        {
          type: "gloss-row",
          word: "EDIFACT",
          def: "Created by the UN in 1985. The most widely used EDI standard. Full name: United Nations / Electronic Data Interchange for Administration, Commerce and Transport. Syntax rules approved as ISO standard (ISO 9735) in 1987.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Father of EDI = Ed Guilbert. First EDI message = 1965. TDCC formed = 1968. First standards = 1975. EDIA renamed = 1978. ANSI X12 = 1978. EDIFACT = UN created 1985. EDI = Paperless Trade. EFT = Paperless Payment.",
        },
        {
          type: "nav",
          next: "edi-types",
          nextLabel: "Next: EDI Types & Advantages →",
        },
      ],
    },
    {
      id: "edi-types",
      label: "Types & Advantages",
      blocks: [
        {
          type: "section-head",
          text: "18.3 EDI Types (5 Types)",
        },
        {
          type: "gloss-row",
          word: "1. Direct EDI (Point-to-Point)",
          def: "Establishes a direct connection between business stakeholders/partners individually. Suits larger businesses with many day-to-day transactions.",
        },
        {
          type: "gloss-row",
          word: "2. EDI via VAN (Value Added Network)",
          def: "EDI documents transferred with support of third-party network service providers. VAN = a company that offers EDI services based on its own network. Acts as intermediary between trading partners. Handles access rights and data security.",
        },
        {
          type: "gloss-row",
          word: "3. EDI via FTP/VPN, SFTP, FTPS",
          def: "EDI documents exchanged through Internet or Intranet using protocols like FTP/VPN, SFTP, and FTPS.",
        },
        {
          type: "gloss-row",
          word: "4. Web EDI",
          def: "Uses a web browser via the Internet. Easy and convenient for small and medium organizations. Any browser can be used.",
        },
        {
          type: "gloss-row",
          word: "5. Mobile EDI",
          def: "Uses smartphones or other handheld devices to transfer EDI documents. Considerably increases speed of EDI transactions.",
        },
        {
          type: "section-head",
          text: "18.4 Advantages of EDI",
        },
        {
          type: "gloss-row",
          word: "8 Advantages",
          def: "1. Improving service to end users. 2. Increasing productivity. 3. Minimizing errors. 4. Slashing response times. 5. Automation of operations. 6. Cutting costs. 7. Integrating all business and trading partners. 8. Providing information on process status. 9. Optimizing financial ratios.",
        },
        {
          type: "section-head",
          text: "18.5 EDI Layers (4 Layers)",
        },
        {
          type: "gloss-row",
          word: "1. Semantic Layer",
          def: "Application level services — the highest level.",
        },
        {
          type: "gloss-row",
          word: "2. Standard Translation Layer",
          def: "EDIFACT business form standards, ANSI X12 business form standards.",
        },
        {
          type: "gloss-row",
          word: "3. Transport Layer",
          def: "Electronic mail (X.435, MIME), Point-to-point (FTP, TELNET), World Wide Web (HTTP).",
        },
        {
          type: "gloss-row",
          word: "4. Physical Layer",
          def: "Dial-up line, Internet, I-way — the lowest level.",
        },
        {
          type: "section-head",
          text: "18.6 EDI Standards",
        },
        {
          type: "gloss-row",
          word: "First industry-specific EDI standard",
          def: "TDCC (Transportation Data Coordinating Committee) published in 1975.",
        },
        {
          type: "gloss-row",
          word: "UN/EDIFACT",
          def: "United Nations / Electronic Data Interchange for Administration, Commerce and Transport. International EDI standard developed under the supervision of the United Nations. Syntax rules approved as ISO 9735 in 1987. Cross-industry standard data format for commercial transactions. Maintained by UN/CEFACT (affiliated to UNECE).",
        },
        {
          type: "gloss-row",
          word: "ANSI X12",
          def: "The other most widely used EDI message standard. Developed by the American National Standards Institute.",
        },
        {
          type: "think-box",
          label: "⭐ Master Checklist",
          text: "EDI = Electronic Data Interchange = Paperless Trade. Father = Ed Guilbert. First EDI = 1965. EDIFACT = 1985 by UN. ISO 9735 = 1987. Direct EDI = Point-to-Point. VAN = Value Added Network. 4 EDI Layers: Semantic, Standard Translation, Transport, Physical. Advantages: productivity, automation, cost-cutting, minimizing errors.",
        },
        {
          type: "nav",
          back: "edi-intro",
          practice: true,
        },
      ],
    },
  ],
}
