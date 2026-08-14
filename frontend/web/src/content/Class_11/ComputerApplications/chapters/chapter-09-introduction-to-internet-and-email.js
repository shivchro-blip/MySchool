export default {
  chapterNumber: 9,
  title: "Introduction to Internet and Email",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "networks",
      title: "Networks and the Internet",
      content: `A **network** is a connection of two or more computers that enables them to share resources and data. Networks are classified by coverage area:

| Type | Full Name | Range |
|------|-----------|-------|
| LAN | Local Area Network | Within a building |
| MAN | Metropolitan Area Network | Within a city |
| WAN | Wide Area Network | Country/global |
| PAN | Personal Area Network | Personal devices |
| CAN | Campus Area Network | ~5 km |
| WLAN | Wireless Local Area Network | Wireless LAN |

**The Internet** is a global network formed by connecting several small and large networks worldwide. Each computer on the network is called a **host**.

**Two important protocols for the Internet:**
- **TCP (Transmission Control Protocol):** Ensures reliable transmission of data by dividing messages into packets and reassembling them at the destination.
- **IP (Internet Protocol):** Handles addressing — each host has a unique IP address (e.g., 165.113.245.2).

**Intranet:** A private network within an organisation; employees access company information.
**Extranet:** A private network using internet technology to share business information with suppliers, partners, and customers.`,
      nav: { next: "domains-url", nextLabel: "Domains and URL →" }
    },
    {
      id: "domains-url",
      title: "Domain Names, URL and Internet Governance",
      content: `**Domain Name:** An online identity (name) that can be accessed by a web browser when connected to the Internet.

**Generic Domain Names:**

| Domain | Description |
|--------|-------------|
| .com | Commercial Organisation |
| .gov | Government institution |
| .org | Non-profit Organisation |
| .net | Network Support Group |
| .edu | Educational Institution |

**Country Level Domains:** .in (India), .au (Australia), .us (USA), .jp (Japan), .ru (Russia), .sg (Singapore)

**URL (Uniform Resource Locator):** Every server on the Internet has a unique IP number (four parts separated by dots). Since numbers are hard to remember, servers are given word-based addresses called URLs. A URL shows where a particular page can be found on the World Wide Web. The URL and IP number refer to the same server.

**Who Governs the Internet?**
No single entity controls the Internet. The **Internet Society** promotes global information exchange. **ICANN (Internet Corporation for Assigned Names and Numbers)** administers domain name registration to avoid duplicate names. ICANN was created on September 18, 1998 and is headquartered in Los Angeles, California.

**W3C (World Wide Web Consortium):** An international community that develops standards for the World Wide Web. Founded in 1994 by **Tim Berners-Lee** (creator of the WWW). W3C sets standards to facilitate better communication among all web stakeholders.`,
      nav: { back: "networks", next: "internet-services", nextLabel: "Internet Services →" }
    },
    {
      id: "internet-services",
      title: "Types of Internet Services and Access Methods",
      content: `**Types of Internet Services:**

**Wireless:** Uses radio frequency bands instead of telephone/cable networks. "Always-on" connection accessible from anywhere within network coverage via a modem.

**Mobile:** Cell phone/smartphone providers offer voice plans with internet access.

**Hotspot:** A physical location with internet access over a WLAN (Wireless Local Area Network) via a router. Uses Wi-Fi technology. Can be phone-based or free-standing.

**Broadband:** High-speed internet via cable or telephone companies. Uses multiple data channels for large data quantities. Includes DSL and cable connections.

**DSL (Digital Subscriber Line):** Uses existing 2-wire copper telephone lines. Customers can make calls while surfing the internet simultaneously.

**Cable:** Broadband access via cable TV lines using a cable modem. Can provide extremely fast internet access.

**Satellite:** Available where broadband is not yet offered. Uses a modem similar to wireless.

**ISDN (Integrated Services Digital Network):** Sends data, voice, and video over digital telephone lines. Requires an ISDN adapter at both ends.

**Dongles/Data Cards:**

| Dongle | Data Card |
|--------|-----------|
| Removable component for extra security or wireless (WiFi, Bluetooth, Memory dongles) | Removable electronic card for storing data (Expansion Card, Memory Card, ID Card) |

USB Wi-Fi adapters are often called dongles. 3G and 4G dongles allow internet even without Wi-Fi.

**Access Methods:**
- **Indirect Access:** Device connects via Ethernet/WiFi to a local network, which connects to the Internet via ADSL, cable, or fibre. Most common for home/office networks.
- **Direct Access:** Device connects directly to Internet via 3G/4G mobile networks or public Wi-Fi. Used when travelling.

**Search Engines vs Browsers:**
- A **browser** (Internet Explorer, Chrome, Firefox, Safari) is used to access websites and view web pages.
- A **search engine** (Google, Yahoo, Lycos) is a software system to search for information on the WWW.
- To open a search engine you need a browser; a browser can access any website directly.
- Search results are shown on a **SERP (Search Engine Results Page)**.`,
      nav: { back: "domains-url", next: "applications", nextLabel: "Internet Applications →" }
    },
    {
      id: "applications",
      title: "Internet Applications",
      content: `Key internet applications:

**1. VoIP (Voice over Internet Protocol):** Internet telephony — make voice calls over the internet. Example: Skype.

**2. Job Search:** Search for jobs online using sites like naukri.com, monster.com.

**3. Online Shopping:** Virtual shops — purchase products online. Example: Amazon.com.

**4. Stock Market Updates:** Buy/sell shares online via sites like ndtvprofit.com.

**5. Travel:** Book holidays and tours online. Examples: goibibo.com, makemytrip.com.

**6. Research:** Access research papers online for literature reviews.

**7. Video Conferencing:** Face-to-face communication across networks using web cameras and microphones.

**8. E-Commerce:** Buying and selling goods/services or transmitting funds over the internet. Examples in India: Flipkart, Snapdeal, Amazon India, Paytm.

**9. Online Payments:** Digital wallet-driven payments. Example: Paytm.

**10. Social Networking:** Using internet-based social media to connect with friends, family. Example: Facebook.

**11. Voicemail:** System of sending messages over the phone.

**12. Chatting:** Real-time text communication with other internet users.

**13. E-Banking (Online Banking):** Electronic payment system for financial transactions via a bank's website without visiting a branch.

**14. E-Learning:** Courses delivered via the internet to locations outside the classroom. Interactive — communicate with teachers and other students. Assignments and tests conducted online.

**15. E-Governance:** Application of ICT (Information and Communication Technology) for delivering government services. Benefits: reduced corruption, high transparency, increased convenience, reduced overall cost, expanded reach of government.`,
      nav: { back: "internet-services", next: "email-browsers", nextLabel: "Email and Browsers →" }
    },
    {
      id: "email-browsers",
      title: "Email, Browsers and Web Pages",
      content: `**Email (Electronic Mail):** Information stored on a computer exchanged between two users over telecommunications. A message may contain text, files, or images. The first email was sent by Ray Tomlinson in 1971, containing the text "QWERTYUIOP".

**Structure of an Email:**
- **To:** Email address of the recipient.
- **From:** Sender's email address.
- **Subject:** Brief description of the email's content (optional but recommended).
- **CC (Carbon Copy):** Additional recipients who are not direct addressees (visible to all).
- **BCC (Blind Carbon Copy):** Secret recipients — each BCC recipient gets the email but no one else can see who received a copy.
- **Message Body:** The main content; usually ends with a signature.

**Advantages of Email:** Free delivery, global delivery, instant delivery, file attachments, long-term storage, environment-friendly (paperless).

**Internet Threats:**
- **Virus:** Small software that spreads from computer to computer; can corrupt, steal, or delete data.
- **Malware:** "Malicious software" — umbrella term for viruses, worms, Trojan horses, spyware, rootkits.
- **Trojan Horse:** Malicious application disguised as legitimate software.
- **Spyware:** Trojan application that spies on victims.
- **Worm:** Software that copies itself from computer to computer without human interaction.
- **Botnet:** Group of internet-connected computers compromised by a hacker; individual computer = "zombie."
- **Spam:** Unwanted email (junk mail) that clutters inboxes.
- **Phishing:** Fraudulent emails designed to look legitimate, tricking users into revealing personal information (passwords, bank details).
- **Rootkit:** Collection of tools that obtain administrator-level access to a computer.

**Browsers:** Software used to access the Internet and view web pages. Browsers translate HTML documents for display.
- **Google Chrome:** Developed by Google Inc.; best known for speed, simplicity, and security.
- **Mozilla Firefox:** Free and open-source; developed by Mozilla Foundation; default browser in Ubuntu.
- **Internet Explorer:** Default browser for Windows PCs; developed by Microsoft.
- **Safari:** Developed by Apple Inc.; comes with macOS and iOS.

**Website vs Webpage:**
- A **website** is a collection of webpages sharing a unique domain name (e.g., sricompany.com with Home, About, Contact pages). The first page is the **Home Page**.
- A **webpage** is a single page of a website. Every page has a unique URL.

**Static vs Dynamic Web Pages:**
- **Static:** Content and layout are fixed; same whenever visited. No database. Runs directly in browser. Examples: small business, school websites.
- **Dynamic:** Content and layout may change at runtime. Uses databases. Runs on server-side programs. Examples: government exam result websites.

**Safe Surfing Rules:**
1. Never give out personal information online.
2. Use privacy settings — what goes online stays online.
3. Check security and privacy settings regularly.
4. Use strong passwords; don't share with friends.
5. Always protect your mobile device with a PIN.
6. Never meet strangers you met online.
7. Listen to trusted adults.
8. Use only reputable websites for online shopping.
9. Be careful what links you click.`,
      nav: { back: "applications", practice: true }
    }
  ]
}
