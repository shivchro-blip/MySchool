// frontend/web/src/content/Class_12/ComputerApplications/chapters/chapter-16-payment-systems.js

export default {
  eyebrow: "Chapter 16 · Class 12 Computer Applications",
  title: "Electronic Payment Systems",
  author: "",
  pills: ["Theory", "Board Exam Important"],

  tabs: [
    {
      id: "payment-types",
      label: "Payment Types",
      blocks: [
        {
          type: "teacher-voice",
          html: "<p>When you pay using Google Pay or a debit card online, you are using an electronic payment system. This chapter covers all the different ways to pay electronically — credit cards, debit cards, UPI, internet banking, and more.</p>",
        },
        {
          type: "section-head",
          text: "16.2 Classification of Electronic Payment Systems",
        },
        {
          type: "gloss-row",
          word: "Electronic Payment",
          def: "A payment made from one bank account to another bank account using electronic methods, without direct intervention of bank employees.",
        },
        {
          type: "gloss-row",
          word: "Micro Electronic Payment Systems",
          def: "Online payment for small amounts. Low communication and computational costs. Light weight cryptography. Used for: online game subscriptions, reading journals, watching movies online. 3 parties: Customer, Service Provider, Payment Processor.",
        },
        {
          type: "gloss-row",
          word: "Macro Electronic Payment Systems",
          def: "Support payments of HIGHER value. More rigorous security (expensive cryptographic operations). Types include: Card-based payments, Electronic account transfer, Electronic cash payments, Mobile payment systems.",
        },
        {
          type: "section-head",
          text: "16.3 Card Based Payment Systems",
        },
        {
          type: "gloss-row",
          word: "Credit Card (Pay Later)",
          def: "Enables bearer to buy goods/services based on promise to pay later with agreed interest. Cardholder gets an extra period to pay. Over 90% of online payments are card-based. Term 'credit card' first mentioned in 1887 in the sci-fi novel 'Looking Backward' by Edward Bellamy. Modern concept: USA 1920s. Diners Club card (1950) — first modern credit card by Frank McNamara and Ralph Schneider.",
        },
        {
          type: "gloss-row",
          word: "Credit Card Anatomy (11 elements)",
          def: "1. Publisher (issuing bank emblem), 2. Card number (16 digits), 3. Cardholder name, 4. EMV chip, 5. RFID symbol (contactless), 6. Expiry date, 7. Card brand logo (Visa/MasterCard/Rupay), 8. Magnetic stripe, 9. Hologram (anti-duplication), 10. Signature, 11. CVC/CVV (3-digit code).",
        },
        {
          type: "gloss-row",
          word: "Key Players in Credit Card Operations",
          def: "1. Bearer (card holder). 2. Merchant (seller). 3. Acquirer (merchant's bank). 4. Credit Card Network (intermediary — Visa, MasterCard, Rupay). 5. Issuer (bearer's bank — sets limits, approves transactions).",
        },
        {
          type: "gloss-row",
          word: "Debit Card (Pay Now)",
          def: "Transaction amount deducted DIRECTLY from card holder's bank account upon authorization. Functions as ATM card. Payments immediately transferred — unlike credit card where payment is deferred.",
        },
        {
          type: "gloss-row",
          word: "Stored Value Card (Pay Before)",
          def: "Pre-loaded with a certain amount (value). Two varieties: Closed loop (single purpose, e.g. Chennai Metro Rail travel card) and Open loop (multipurpose, e.g. Visa gift cards). No need for bank account to get prepaid cards.",
        },
        {
          type: "gloss-row",
          word: "Smart Card",
          def: "Modern card with an EMV chip (similar to SIM card appearance but different functionality). Can provide: identification, authentication, data storage, application processing. Types: Contact smart cards and Contactless smart cards.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "3 Card types: Credit (pay LATER), Debit (pay NOW), Stored Value (pay BEFORE). Credit Card = 16 digits. First digit = MII (Major Industry Identifier). First 6 digits = IIN/BIN (Bank Identification Number). Last digit = check digit (Luhn algorithm). Card size standard: ISO/IEC 7810#ID-1.",
        },
        {
          type: "nav",
          next: "ecs-upi",
          nextLabel: "Next: ECS, RTGS, UPI →",
        },
      ],
    },
    {
      id: "ecs-upi",
      label: "ECS, RTGS & UPI",
      blocks: [
        {
          type: "section-head",
          text: "16.4 Electronic Account Transfer",
        },
        {
          type: "gloss-row",
          word: "ECS — Electronic Clearing Services",
          def: "Repeated transfer of funds from one bank account to multiple bank accounts (or vice versa) using computer and Internet. Payer instructs bank to debit account and credit payee accounts automatically. Advantages: bulk payments, guaranteed payments, no need to remember dates. Used for: salary, pension, dividend, EMI, electricity bills, insurance premium.",
        },
        {
          type: "gloss-row",
          word: "EFT — Electronic Funds Transfer",
          def: "Electronic transfer of money over online network. Amount sent from sender's branch is credited to receiver's branch on the same day in batches. India: called NEFT (National Electronic Fund Transfer), initiated by RBI in November 2005. Maintained by IDRBT. Unlike RTGS, NEFT does NOT occur in real-time.",
        },
        {
          type: "gloss-row",
          word: "RTGS — Real Time Gross Settlement",
          def: "Payment system for settlement of transactions between financial institutions. Transactions processed at REAL-TIME. Used for large-value (high-volume) transactions. Also called push payments (initiated by the payer). Development maintained by central bank (RBI in India).",
        },
        {
          type: "section-head",
          text: "16.5 Electronic Cash Payment Systems",
        },
        {
          type: "gloss-row",
          word: "Cryptocurrency",
          def: "A unique virtual (digital) asset designed to work as a medium of exchange using cryptographic algorithm. Records transactions in blockchain. Based on: Mining, Blockchain, Directed Acyclic Graph, Distributed ledger.",
        },
        {
          type: "gloss-row",
          word: "E-Wallet (Electronic Wallet)",
          def: "Allows users to make electronic transactions quickly and securely via smartphones or computers. Functions like a physical wallet. First recognized as a method for storing money electronically. Examples: PayPal, SBI Buddy.",
        },
        {
          type: "section-head",
          text: "16.6 Mobile Banking & Internet Banking",
        },
        {
          type: "gloss-row",
          word: "Mobile Banking (m-Banking)",
          def: "Banking services via mobile phones. Includes balance checking, account transfers, payments, purchases. Can be done anytime, anywhere. Methods: call center, IVR telephone, SMS, WAP technology, smartphone apps.",
        },
        {
          type: "gloss-row",
          word: "Internet Banking",
          def: "Also called e-banking, online banking, virtual banking. Customers conduct financial transactions on a secure bank website. Like a branch exclusively for one customer. Secured by username and password. Access from anywhere with Internet.",
        },
        {
          type: "section-head",
          text: "16.7 UPI — Unified Payments Interface",
        },
        {
          type: "gloss-row",
          word: "UPI",
          def: "Real-time payment system developed by NPCI (National Payments Corporation of India). Regulated by RBI. Facilitates inter-bank transactions via mobile. Based on IMPS (Immediate Payment Service).",
        },
        {
          type: "gloss-row",
          word: "VPA — Virtual Payment Address",
          def: "Also called UPI-ID. A unique ID similar to email ID (e.g., name@bankname). Used to send and receive money. Replaces bank account details, hiding critical information.",
        },
        {
          type: "gloss-row",
          word: "MPIN",
          def: "Mobile banking Personal Identification Number. Required to confirm each UPI payment.",
        },
        {
          type: "gloss-row",
          word: "Cash on Delivery (COD)",
          def: "Payment made only on receipt of goods. Customer pays when product is delivered. If goods are not paid, they are returned to the retailer.",
        },
        {
          type: "think-box",
          label: "⭐ Exam Tip",
          text: "ECS = repeated/bulk transfers. EFT/NEFT = electronic fund transfer, batches, initiated by RBI Nov 2005. RTGS = real-time, large-value. UPI = NPCI, real-time, VPA. IFSC = 11-digit alpha-numeric code by RBI for domestic e-payments. SWIFT = for international. These are all asked in Part II and Part III.",
        },
        {
          type: "nav",
          back: "payment-types",
          practice: true,
        },
      ],
    },
  ],
}
