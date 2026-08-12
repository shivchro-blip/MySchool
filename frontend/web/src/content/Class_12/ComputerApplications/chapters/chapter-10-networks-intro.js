// frontend/web/src/content/Class_12/ComputerApplications/chapters/chapter-10-networks-intro.js

export default {
  eyebrow: "Chapter 10 · Class 12 Computer Applications",
  title: "Introduction to Computer Networks",
  author: "",
  pills: ["Theory", "Networks", "Board Exam Important"],

  tabs: [
    {
      id: "basics",
      label: "Basics & Uses",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>Before the internet, people had to physically go to a library, a bank, or a shop for every need. Computer networks changed everything — now you can communicate, share files, and access information from anywhere in the world. This chapter explains how networks work and why they matter.</p>",
        },
        {
          type: "section-head",
          text: "10.1 Introduction to Computer Networks",
        },
        {
          type: "gloss-row",
          word: "Computer Network",
          def: "A set of computers connected together for the purpose of sharing resources. The Internet is the most common resource shared today.",
        },
        {
          type: "gloss-row",
          word: "Node",
          def: "A computer which is connected to a network. Data originates and terminates at nodes. Nodes are identified by their IP addresses. Includes mobile phones, tablets, PCs, servers, and other networking devices.",
        },
        {
          type: "gloss-row",
          word: "Internet",
          def: "Stands for INTERconnected NETwork. The connection of individual networks operated by academic, industry, government, and private parties. A universal source of information for billions of people.",
        },
        {
          type: "gloss-row",
          word: "Vint Cerf",
          def: "Known as the 'father of the Internet'. Designed TCP/IP protocols and Internet architecture with co-designer Robert E. Kahn.",
        },
        {
          type: "think-box",
          label: "Real-Life Example 🌍",
          text: "When you order food on Swiggy or Zomato, your phone (a node) sends a request over the internet (a network) to the restaurant's server (another node) — that is a computer network in action!",
        },
        {
          type: "section-head",
          text: "10.3 Uses of Computer Networks (3 Main Uses)",
        },
        {
          type: "gloss-row",
          word: "Communication",
          def: "Using computer networks, people can interact with each other across the world at very low cost via mobile, social media, telephone, e-mail, chatting, video conferencing, SMS, MMS, groupware, etc.",
        },
        {
          type: "gloss-row",
          word: "Resource Sharing",
          def: "Allows programs, equipment, and data to be accessed by anyone via network irrespective of physical location. Sharing devices like printers, scanners, fax machines, and modems.",
        },
        {
          type: "gloss-row",
          word: "Information Sharing",
          def: "Applications or software stored at a central server can be shared among computers on the network. Provides high reliability — backup can be stored at one location for easy availability in case of crash.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "3 uses of Computer Networks: Communication, Resource Sharing, Information Sharing. This is a 2-mark question asked every year. Know all three with one example each.",
        },
        {
          type: "nav",
          next: "applications",
          nextLabel: "Next: Applications →",
        },
      ],
    },
    {
      id: "applications",
      label: "Applications",
      blocks: [
        {
          type: "section-head",
          text: "10.4 Applications of Computer Networks",
        },
        {
          type: "gloss-row",
          word: "Networks in Business",
          def: "E-banking, cloud computing, faster communication, B2C/B2B/B2G transactions, online marketing, bill payments, stock maintenance — all done without geographical boundaries via Internet.",
        },
        {
          type: "gloss-row",
          word: "Networks at Home",
          def: "Facilitates communication among home devices. Used for: e-banking, e-learning, e-governance, e-health, telemedicine, call centers, video conferencing, digitalization of memories.",
        },
        {
          type: "gloss-row",
          word: "Mobile Networks",
          def: "Network connecting devices without cable (wireless). At land areas, network distributed as cells served by base transceiver stations. Examples: mobiles, tablets, pagers, laptops with mobile broadband.",
        },
        {
          type: "gloss-row",
          word: "Social Applications",
          def: "Applications: WhatsApp, Facebook, Twitter, Blogs, Pinterest, Classmate. Used to share thoughts, ideas, files, and chats. Attributes: Membership, Content contribution, Frequent visits, Relationship building.",
        },
        {
          type: "gloss-row",
          word: "Benefits of Social Networks",
          def: "Group information sharing over long distances, Broadcast announcements (emergencies, events), Fostering diversity of thought. Disadvantages: Wasting time, wrong information, theft and hacking.",
        },
        {
          type: "gloss-row",
          word: "Flame Wars",
          def: "When people of different opinions get together online, many discussions lead to personal attacks. These lengthy exchanges of angry messages are called flame wars.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "Evolution of Internet timeline (asked in Part III): 1945-Memex conceived, 1958-Silicon chip, 1962-First network envisioned, 1964-Packet switching, 1965-Hypertext, 1969-ARPANET, 1972-TCP/IP, 1984-Internet named, 1989-WWW created, 1993-Mosaic, 1995-Age of commerce begins.",
        },
        {
          type: "nav",
          back: "basics",
          practice: true,
        },
      ],
    },
  ],
}
