export default {
  chapterNumber: 17,
  title: "Computer Ethics and Cyber Security",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "ethics",
      title: "Ethics and Ethical Issues",
      content: `**Ethics** is a set of moral principles that govern the behaviour of an individual in a society. **Computer Ethics** is a set of moral principles that regulate the use of computers by users.

**Guidelines of Ethics for computer users:**
1. **Honesty:** Users should be truthful while using the internet.
2. **Confidentiality:** Users should not share any important information with unauthorised people.
3. **Respect:** Each user should respect the privacy of other users.
4. **Responsibility:** Each user should take ownership and responsibility for their actions.

**Ethical Issues** are problems that require a person or organisation to choose between alternatives evaluated as right (ethical) or wrong (unethical). They must be addressed to have a positive influence in society.

**Common Ethical Issues:**
- Cyber crime
- Software Piracy
- Hacking
- Use of computers to commit fraud
- Sabotage in the form of viruses
- Making false claims using computers

---

**Cyber Crime:** An intellectual, white-collar crime. Those who commit such crimes manipulate computer systems in an intelligent manner. Example: illegal money transfer via the internet.

**Computer Crimes Table:**

| Crime | Function |
|-------|----------|
| **Malware** | Malicious programs that monitor user's computer activity without permission. |
| **Harvesting** | A person or program collects login/password information from a legitimate user to illegally access others' accounts. |
| **Spam** | Distributing unwanted email to a large number of internet users. |

---

**Software Piracy:** "Unauthorised copying of software." Duplicating and selling copyrighted programs, or downloading software illegally through a network.

**Shareware:** Publishers encourage users to share copies with friends but ask regular users to pay a registration fee.

**Warez:** Commercial programs made available to the public illegally.

---

**Hacking:** Intruding into a computer system to steal personal data without the owner's permission or knowledge. Also: gaining unauthorised access and altering contents. Can be criminal or a hobby.
- To prevent: Firewalls, Intrusion Detection Systems (IDS), Virus and Content Scanners, Patches and Hot fixes.

**Cracking:** Editing a program source so the code can be exploited or modified. A cracker (black hat / dark side hacker) is a malicious or criminal hacker. Bypasses passwords or licenses in computer programs.`,
      nav: { next: "cyber-security", nextLabel: "Cyber Security and Threats \u2192" }
    },
    {
      id: "cyber-security",
      title: "Cyber Security and Threats",
      content: `**Cyber Security** is a collection of technologies, processes, and measures that reduce the risk of cyber attacks and protect organisations and individuals from computer-based threats.

**Types of Cyber Attacks:**

| Cyber Attack | Function |
|-------------|----------|
| **Virus** | A small piece of computer code that repeats itself and spreads by attaching to another file. A **Trojan virus** appears to perform one function but actually performs malicious activity when executed. |
| **Worms** | Self-repeating; do not require a computer program to attach themselves. Continually look for vulnerabilities and report back to their author. |
| **Spyware** | Installed automatically when attachments are opened, links clicked, or infected software downloaded. |
| **Ransomware** | Demands payment after launching a cyber attack. Costs organisations millions each year. |

**Cyber Security Threats:**

**Phishing:** A type of computer crime that attacks and steals user data (login name, password, credit card numbers) through emails. The email may look like it came from a legitimate bank or official institution.

**Pharming:** Malicious code is installed on a personal computer or server, misdirecting users to fraudulent websites without their knowledge. Called "phishing without a trap." It is a cyber attack intended to redirect a website's traffic to a fake site.

**Cookies:** A small piece of data sent from a website and stored on the user's computer (hard drive) by the web browser while browsing.
- Websites use cookies to: collect demographic information about visitors, and track how often visitors come to the site and how long they stay.

**Firewall:** A computer network security system that monitors and controls incoming and outgoing network traffic based on predefined security rules. Establishes a block between a trusted internal network and untrusted external networks.

**Proxy Server:** Acts as an intermediary between end users and a web server. Examines the request, checks authenticity, and grants the request.

**Encryption and Decryption:**
- **Encryption:** Translating plain text data (plaintext) into random, scrambled data called **cipher-text**. Done by cryptography.
- **Decryption:** The reverse process — converting cipher-text back to plain text.
- A **key** in cryptography is a piece of information (parameter) that determines the functional output of a cryptographic algorithm.
- Used to protect data in: internet communications, e-commerce, mobile phones, wireless systems, Bluetooth devices, ATMs.

**Prevention Tips:**
- Set complex passwords for secured surfing.
- Disconnect internet when not in use.
- Do NOT open spam mail or emails from unfamiliar senders.
- Keep anti-virus software up-to-date.`,
      nav: { back: "ethics", next: "it-act", nextLabel: "IT Act 2000 \u2192" }
    },
    {
      id: "it-act",
      title: "Information Technology Act 2000",
      content: `In the 21st century, the e-revolution has changed the lifestyle of people. Alongside the positive side, there is also a negative side — criminals using ICT for cyber crimes. To tackle cyber crimes, Cyber Laws were introduced.

**In India:** Cyber Law and **IT Act 2000** (modified in 2008) were enacted.

**IT Act 2000** is an act to provide legal recognition for transactions carried out by means of **Electronic Data Interchange (EDI)** and other means of electronic communication.

- It is the **primary law in India** dealing with cybercrime and electronic commerce (e-commerce).
- **e-Commerce** = electronic data exchange or electronic filing of information.
- 25% of cyber crimes remain unsolved.

**Glossary:**

| Term | Meaning |
|------|---------|
| Authenticity | The quality of being real or true. |
| Computer Crime | Intellectual crime to manipulate a computer system. |
| Ethics | Moral principles that govern a person's behaviour. |
| Hacking | Gaining unauthorised access to a computer system. |
| Perpetrator | A person who carries out a harmful, illegal, or immoral act. |
| Software Piracy | Copyright violation of software — illegally used by someone else. |`,
      nav: { back: "cyber-security", practice: true }
    }
  ]
}
