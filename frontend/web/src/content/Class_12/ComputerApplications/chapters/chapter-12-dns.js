// frontend/web/src/content/Class_12/ComputerApplications/chapters/chapter-12-dns.js

export default {
  eyebrow: "Chapter 12 · Class 12 Computer Applications",
  title: "Domain Name System (DNS)",
  author: "",
  pills: ["Theory", "Networks", "Board Exam Important"],

  tabs: [
    {
      id: "ip-url",
      label: "IP Address & URL",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Every website has a numeric address (IP address) like 35.173.69.207. But it is hard to remember numbers, so we use domain names like www.tnschools.gov.in instead. The Domain Name System (DNS) translates domain names into IP addresses. This chapter has heavy coverage in Part I, II, III, and IV — know it well!</p>",
        },
        {
          type: "section-head",
          text: "12.2 Overview of DNS",
        },
        {
          type: "gloss-row",
          word: "DNS (Domain Name System)",
          def: "Maintains all directories of domain names and helps us access websites using domain names. Translates domain name → IP address. Provides domain name to IP address mapping through Name Servers.",
        },
        {
          type: "gloss-row",
          word: "DNS Inventors",
          def: "Paul V. Mockapetris and Jon Postel invented DNS. Jon Postel was administrator of IANA and known as 'God of the Internet'.",
        },
        {
          type: "section-head",
          text: "12.3 IP Address",
        },
        {
          type: "gloss-row",
          word: "IP Address",
          def: "Internet Protocol address — a logical address in the network layer. Used to uniquely identify a computer on the network. Like a door number for a house, IP address identifies the host system in the whole network.",
        },
        {
          type: "gloss-row",
          word: "IPv4 Address",
          def: "32-bit unique address. Total addresses = 2^32. Represented in TWO ways: Binary notation (32-bit binary) or Dotted-decimal notation (4 bytes separated by dots). Example: 128.143.137.144",
        },
        {
          type: "gloss-row",
          word: "IPv6 Address",
          def: "128-bit unique address. Total addresses = 2^128. 128 bits divided into eight 16-bit blocks. Each block converted to 4-digit Hexadecimal separated by colons. Example: 2001:0000:3231:DFE1:0063:0000:0000:FEFB",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "IPv4 = 32 bits, dotted-decimal notation. IPv6 = 128 bits, hexadecimal notation. Number of IPv4 addresses = 2^32. Number of IPv6 addresses = 2^128. The difference between IPv4 and IPv6 is a Part III question every year.",
        },
        {
          type: "section-head",
          text: "12.4 URL (Uniform Resource Locator)",
        },
        {
          type: "gloss-row",
          word: "URL",
          def: "Uniform Resource Locator. The address of a document on the Internet. Made up of FOUR parts: Protocol, Hostname/Domain Name, Folder Name, File Name.",
        },
        {
          type: "gloss-row",
          word: "URL Example",
          def: "http://cms.tn.gov.in/sites/default/files/press_release/pr070119a.jpg — Protocol: http, Domain: cms.tn.gov.in, Folders: sites/default/files/press_release, File: pr070119a.jpg",
        },
        {
          type: "gloss-row",
          word: "Absolute URL",
          def: "Complete address of a document. Contains ALL FOUR parts (protocol, domain, folder, filename). Like a full postal address — if any part is missing, the browser cannot find the file.",
        },
        {
          type: "gloss-row",
          word: "Relative URL",
          def: "Partial address of a document. Contains only filename, or filename with folder name. Used when the file is on the same server as the current document.",
        },
        {
          type: "nav",
          next: "dns-components",
          nextLabel: "Next: DNS Components →",
        },
      ],
    },
    {
      id: "dns-components",
      label: "DNS Components",
      blocks: [
        {
          type: "section-head",
          text: "12.5 DNS Components (4 Components)",
        },
        {
          type: "gloss-row",
          word: "4 DNS Components",
          def: "1. Namespace, 2. Name Server, 3. Zone, 4. Resolver.",
        },
        {
          type: "section-head",
          text: "12.5.1 Namespace",
        },
        {
          type: "gloss-row",
          word: "Flat Namespace",
          def: "Name assigned to IP address with no specific structure. Disadvantage: cannot be used in large systems — needs central access/control to avoid ambiguity.",
        },
        {
          type: "gloss-row",
          word: "Hierarchical Namespace",
          def: "Name made up of several parts (nature of org, name of org, department, etc.). Power to control namespace is decentralized. Domain Name Space uses hierarchical namespace as a tree structure with root at top. Maximum 128 levels (level 0 to level 127).",
        },
        {
          type: "gloss-row",
          word: "Label",
          def: "Each node in the DNS tree has a name called a label. Label is a string with maximum 63 characters. Each node at the same level must have a different label.",
        },
        {
          type: "gloss-row",
          word: "Domain Name",
          def: "Sequence of labels separated by dot (.). Always read from LOWER level to HIGHER level (leaf node to root node). Root node always represents NULL string.",
        },
        {
          type: "gloss-row",
          word: "Domain Name Rules",
          def: "Can contain alphabets (a-z, A-Z) and digits (0-9). Hyphens allowed but NOT as first character. Spaces NOT allowed. Special symbols (!, $, &, _) NOT permitted. Maximum 253 characters total. NOT case-sensitive.",
        },
        {
          type: "gloss-row",
          word: "Generic TLD (gTLD)",
          def: "Top level domains for generic purpose. .com = commercial, .edu = educational, .gov = government (US), .mil = military, .org = non-profit, .net = networking, .info = information. Maintained by IANA.",
        },
        {
          type: "gloss-row",
          word: "Country TLD (cTLD)",
          def: "2-character country abbreviation. .in = India, .us = USA, .uk = United Kingdom, .fr = France, .ca = Canada, .au = Australia, .jp = Japan, .cn = China.",
        },
        {
          type: "section-head",
          text: "12.5.2 Name Server",
        },
        {
          type: "gloss-row",
          word: "Name Server",
          def: "A software program running on a physical system. Has DNS database of domain names and corresponding IP addresses. Translates domain name to IP address.",
        },
        {
          type: "gloss-row",
          word: "3 Types of Name Servers",
          def: "1. Root Name Server — top level, contains entire DNS tree, maintained by ICANN (13 servers). 2. Primary Name Server — contains zone resource records, updatable by domain name holders. 3. Secondary Name Server — copy of primary, no update authority, reduces workload by sharing queries.",
        },
        {
          type: "section-head",
          text: "12.5.3 Zone & 12.5.4 Resolver",
        },
        {
          type: "gloss-row",
          word: "Zone",
          def: "A group of contiguous domains and sub domains. The entire namespace is divided into many zones. Every zone has a server with a zone file (database). Two copies: Master file and Slave file.",
        },
        {
          type: "gloss-row",
          word: "Resolver",
          def: "A program responsible for initiating the translation of a domain name into an IP address. Stored in the host — no protocol needed between resolver and user program. ICANN (Internet Corporation for Assigned Names and Numbers) is the non-profit that assigns names and numbers for all Internet resources.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "DNS How it Works: Browser enters URL → DNS cache checked → if not found, Resolver queries ISP → ISP queries Root Server → Root directs to TLD Server → TLD directs to Authoritative Name Server → IP address returned → browser connects to website. This sequence is a Part IV question.",
        },
        {
          type: "nav",
          back: "ip-url",
          practice: true,
        },
      ],
    },
  ],
}
