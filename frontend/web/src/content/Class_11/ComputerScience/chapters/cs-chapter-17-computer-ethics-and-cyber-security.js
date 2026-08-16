export default {
  chapterNumber: 17,
  title: "Computer Ethics and Cyber Security",
  subject: "Computer Science",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-ethics",
      title: "Introduction & Computer Ethics",
      content: `**17.1 Introduction**

The Internet is an easily accessible communication medium, open to all. Information Technology is widespread through computers, mobile phones, and the internet — creating a lot of scope for misuse. Computer systems play an important role in daily lives, so special care must be taken to ensure valuable data doesn't fall into the wrong hands.

A **cyber-crime** is a crime involving computers and networks — a growing threat caused by criminals or irresponsible individuals exploiting widespread internet use. It presents a major challenge to the ethical use of IT, threatening the integrity, safety, and survival of business systems. Common types of cyber-crimes include: Hacking, Phishing, Viruses, Piracy, Identity Thefts, Pharming, and Online Financial Transaction fraud.

**Ethics**

Ethics means "what is wrong and what is right" — a set of moral principles ruling the behaviour of individuals who use computers. **Morals** refer to generally accepted standards of right and wrong in society. In the cyber-world, certain standards apply: do not use pirated software; do not use unauthorized user accounts; do not steal others' passwords; do not hack.

The core issues in computer ethics arise from internet use — privacy, publication of copyrighted content, unauthorized distribution of digital content, and user interaction with websites/software/services.

**Computer Ethics**

The internet has made the world a "global village," proving a boon to individuals, organizations, and businesses (e.g., e-Commerce reaching customers faster than other means). **Computer ethics** deals with the procedures, values, and practices that govern the consumption of computer technology and related disciplines, without damaging or violating the moral values/beliefs of any individual, organization, or entity.

**Guidelines of Ethics** — generally observed by computer users:
1. **Honesty:** Users should be truthful while using the internet.
2. **Confidentiality:** Users should not share important information with unauthorized people.
3. **Respect:** Each user should respect the privacy of other users.
4. **Professionalism:** Each user should maintain professional conduct.
5. **Obey the Law:** Users should strictly obey cyber law in computer usage.
6. **Responsibility:** Each user should take ownership and responsibility for their actions.

**Note:** Ethics is a set of moral principles that govern an individual's behaviour in society; Computer ethics is a set of moral principles that regulate the use of computers by users.`,
      nav: { next: "ethical-issues-crime", nextLabel: "Next: Ethical Issues & Cyber Crime →" }
    },
    {
      id: "ethical-issues-crime",
      title: "Ethical Issues, Cyber Crime & Software Piracy",
      content: `**17.2 Ethical Issues**

An **ethical issue** is a problem/issue requiring a person or organization to choose between alternatives evaluated as right (ethical) or wrong (unethical) — these must be addressed to have a positive influence on society. Common ethical issues: Cyber crime, Software Piracy, Unauthorized Access, Hacking, Use of computers to commit fraud, Sabotage (via viruses), Making false claims using computers.

**Cyber Crime**

Cybercrime is an intellectual, white-collar crime — perpetrators manipulate computer systems in an intelligent manner (e.g., illegal money transfer via internet). Examples of computer crimes:

| Crime | Function |
|---|---|
| Cyber Terrorism | Hacking, threats, blackmailing towards a business/person |
| Cyber Stalking | Harassing through online means |
| Malware | Malicious programs that steal, encrypt, delete data, hijack functions, or monitor activity without permission |
| Denial of Service Attack | Overloading a system with fake requests so it cannot serve legitimate requests |
| Fraud | Manipulating data — e.g., changing banking records to transfer money illegally |
| Harvesting | Collecting login/password info to illegally access others' accounts |
| Identity Theft | Impersonating individuals, usually for financial gain |
| Intellectual Property Theft | Stealing practical/conceptual information developed by another |
| Salami Slicing | Stealing tiny amounts of money from each transaction |
| Scam | Tricking people into believing something untrue |
| Spam | Distributing unwanted e-mail to a large number of internet users |
| Spoofing | Sending communication from an unknown source disguised as a known one |

**Software Piracy**

The copyright violation of software created by an individual/institution — stealing codes/programs, creating unauthorized duplicate copies, and using them for personal or commercial benefit. In simple words: "unauthorized copying of software." Prevented using Firewalls, Intrusion Detection Systems (IDS), Virus and Content Scanners, Patches, and Hot fixes.

**Shareware** takes a different approach — acknowledging the futility of stopping copying, and instead relying on honesty: publishers encourage sharing but ask regular users to pay a registration fee directly to the author. Illegally distributed commercial programs are often called **Warez**.`,
      nav: { back: "intro-ethics", next: "hacking-cracking", nextLabel: "Next: Unauthorized Access, Hacking & Cracking →" }
    },
    {
      id: "hacking-cracking",
      title: "Unauthorized Access, Hacking & Cracking",
      content: `**Unauthorized Access**

Occurs when someone gains access to a website, program, server, service, or system by breaking into a legitimate user account — e.g., guessing a password/username for an account that wasn't theirs.

**Hacking**

Intruding into a computer system to steal personal data without the owner's permission/knowledge (like a password) — also gaining unauthorized access and altering contents. May be done in pursuit of criminal activity, or as a hobby. Hacking can be harmless if the hacker only enjoys the challenge of breaking defenses, but such **ethical hacking** should only be practiced as controlled experiments. Hacking leads to identity theft or loss of personal information; it's protected against using firewalls, passwords, user IDs, and anti-hacking software.

**Cracking**

Editing a program's source so its code can be exploited or modified. A **cracker** (also called a black hat or dark side hacker) is a malicious/criminal hacker — "cracking" means trying to get into computer systems to steal, corrupt, or illegitimately view data. A cracker breaks into someone else's system, often on a network, bypassing passwords or software licenses. Crackers may send official-looking e-mails requesting sensitive information, appearing to be from a bank or official institution.`,
      nav: { back: "ethical-issues-crime", next: "cyber-threats", nextLabel: "Next: Cyber Security Threats →" }
    },
    {
      id: "cyber-threats",
      title: "Cyber Security & Types of Threats",
      content: `**17.3 Cyber Security and Threats**

Cyber attacks are launched primarily to cause significant damage to a computer system or steal important information. **Cyber security** is a collection of technologies, processes, and measures that reduce the risk of cyber attacks and protect organizations/individuals from computer-based threats.

**Malware** is software designed to let criminals gain illegal access to systems and cause damage.

**Phishing:** A computer crime used to attack and steal user data (login names, passwords, credit card numbers). Occurs when an attacker targets a victim into opening an e-mail or instant message, distributing malicious links/attachments that extract sensitive login credentials. Can lead to fraud or identity theft — users should always be cautious when opening emails or attachments.

**Pharming:** A scamming practice where malicious code is installed on a personal computer or server, misdirecting users to fraudulent websites without their knowledge — called "phishing without a trap." A cyber-attack intended to redirect a website's traffic to a fake site. Users should always be cautious when redirected to a fake site.

**Man-In-The-Middle (MITM):** An attack where the attacker secretly relays and possibly alters communication between two parties who believe they're communicating directly with each other (also called a Janus attack). Example: Alice communicates with Bob, while Mallory intercepts to overhear and optionally deliver a false message to Bob.

**Cookies**

A cookie (HTTP cookie, web cookie, browser cookie) is a small piece of data sent from a website and stored on the user's computer by their browser while browsing. Designed to reliably remember stateful information (like shopping cart items) or record browsing activity (button clicks, logins). Websites use cookies to: collect demographic visitor information; track visit frequency and duration; personalize the user's experience; store personal info for personalized return visits.

Cookies do NOT act maliciously — they are merely text files that can be deleted anytime, and cannot spread viruses or access your hard drive. However, any personal information (like credit card details) you provide to a website will likely be stored in a cookie unless disabled in your browser — this is how cookies can threaten privacy, since unencrypted cookie data can be accessed and misused by an anonymous hacker.`,
      nav: { back: "hacking-cracking", next: "firewall-encryption", nextLabel: "Next: Firewall, Proxy Server & Encryption →" }
    },
    {
      id: "firewall-encryption",
      title: "Firewall, Proxy Server, Encryption & IT Act",
      content: `**Firewall and Proxy Servers**

A **firewall** is a computer network security system that monitors and controls incoming/outgoing network traffic based on predefined security rules — establishing a block between a trusted internal network and an untrusted outside network.

A **proxy server** acts as an intermediary between end users and a web server. A client connects to the proxy server, requesting a service (file, connection, webpage, etc.); the proxy examines the request, checks authenticity, and grants it accordingly. Proxy servers keep frequently visited site addresses in cache, improving response time.

**Encryption and Decryption**

Ensure confidentiality — only authorized persons can access information. **Encryption** translates plain text data (plaintext) into random, mangled data (**cipher-text**). **Decryption** is the reverse process, converting cipher-text back to plaintext. Both are done via **cryptography**; a **key** is a piece of information (parameter) that determines a cryptographic algorithm's functional output.

Encryption has historically been used by militaries/governments for secret communication, and is now common in civilian systems — protecting data transferred via networks (Internet, e-commerce), mobile phones, wireless microphones, intercom systems, Bluetooth devices, and bank ATMs. Data should be encrypted during transmission to protect against interception by unauthorized users.

**17.4 Introduction to Information Technology Act**

In the 21st century, computers, internet, and ICT (the "e-revolution") have changed lifestyles — paper-based communication is now substituted by e-communication, giving rise to terms like cyber world, e-transaction, e-banking, e-return, e-contracts. The negative side is the internet/ICT becoming a "weapon of offence" in criminal hands — leading to **Cyber Law** (also called Cyber Space Law, Information Technology Law, or Internet Law).

In India, **Cyber law and the IT Act 2000** (modified 2008) prevent computer crimes. IT Act 2000 provides legal recognition for transactions carried out via **Electronic Data Interchange (EDI)** and other electronic communication — it is India's primary law dealing with cybercrime and e-Commerce (electronic data exchange/filing of information).

**Prevention** — 25% of cyber crime remains unsolved. To protect information: use complex passwords; disconnect the internet when not in use; do NOT open spam mail or emails from unfamiliar senders; keep anti-virus software up-to-date; stay aware, since "awareness is the key to security."`,
      nav: { back: "cyber-threats", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- A cyber-crime is a crime involving computers and networks, posing threats to the integrity, safety, and survival of business systems.
- Ethics means "what is wrong and what is right"; Computer ethics is a set of moral principles that regulate computer use — guided by Honesty, Confidentiality, Respect, Professionalism, Obeying the Law, and Responsibility.
- Ethical issues include Cyber crime, Software Piracy, Unauthorized Access, Hacking, computer-based fraud, and sabotage via viruses.
- Software Piracy is unauthorized copying of software; Hacking is unauthorized system access; Cracking involves exploiting/modifying program code, often criminally.
- Cyber security threats include Phishing (stealing login/credit data via deceptive emails), Pharming (redirecting to fake websites), and Man-In-The-Middle attacks (secretly relaying/altering communication).
- Cookies are small data files stored by browsers to remember stateful info — not inherently malicious, but can threaten privacy if they store unencrypted personal data.
- A firewall monitors/controls network traffic based on security rules; a proxy server acts as an intermediary between users and a web server, improving performance via caching.
- Encryption converts plaintext into cipher-text; decryption reverses this — both done via cryptography, using a key.
- India's IT Act 2000 (modified 2008) provides legal recognition for Electronic Data Interchange (EDI) transactions and is the primary law dealing with cybercrime and e-Commerce.`,
      nav: { back: "firewall-encryption", practice: true }
    }
  ]
}
