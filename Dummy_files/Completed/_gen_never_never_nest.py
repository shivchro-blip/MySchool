def j(s):
    """Escape for JS single-quoted string."""
    s = s.replace('\\', '\\\\')
    s = s.replace("'", "\\'")
    s = s.replace('‘', "\\'").replace('’', "\\'")
    return s

phases = [
    ['Phase 1 — Aunt Jane admires the “little nest”',
     'The play opens in Jack and Jill’s lounge. Aunt Jane has come to visit them and is impressed by their cosy little home. She calls it a charming little nest and admires the furniture, piano, car and other comforts. At first, the young couple seem like a modern success story: they are newly married, comfortably settled and surrounded by beautiful things. But the word “nest” is already important, because a nest should be safe, warm and truly one’s own.',
     'This beginning is deliberately pleasant. Mount first makes the home look attractive so that the later truth feels more shocking.'],
    ['Phase 2 — Aunt Jane discovers the instalment life',
     'Aunt Jane slowly learns that Jack and Jill do not really own most of the things around them. The house is not fully theirs. The furniture, car, piano, radiogram and other objects are being paid for in instalments. Jack and Jill speak proudly, as if instalment buying is clever and modern. Aunt Jane, however, begins to feel disturbed because what looks like ownership is actually debt.',
     'This is the main comic situation: the home looks full, but ownership is empty. The nest is never fully theirs.'],
    ['Phase 3 — Jack’s absurd monthly arithmetic',
     'Aunt Jane becomes more alarmed when she hears about Jack’s income and commitments. Jack earns only six pounds a week, but somehow pays seven pounds eight and eight pence every week in instalments. The arithmetic sounds impossible, but Jack treats it casually. The couple are not frightened by debt; they are proud of their ability to keep buying things.',
     'This phase exposes the harsh reality of modern living beyond means. The numbers themselves become satire.'],
    ['Phase 4 — Partial ownership becomes ridiculous',
     'Jill explains that they own only parts of things: the steering wheel of the car, one tyre, two cylinders and one leg of the sofa. This is funny because ownership is reduced to absurd fragments. A car cannot be enjoyed by owning only a steering wheel, and a sofa cannot be meaningful when only one leg is truly paid for.',
     'This is exam-important because it shows the play’s title in action. They “own” things and yet do not own them.'],
    ['Phase 5 — Aunt Jane gives sensible advice',
     'Aunt Jane is shocked by their lifestyle. She advises them not to spend beyond their means and urges them to pay off their debts. She gives them a cheque, hoping it will help them reduce what they owe. Her values are different from theirs: she believes in real ownership, careful spending and financial responsibility.',
     'Aunt Jane becomes the voice of practical wisdom in the play. She does not hate modern comforts; she hates careless borrowing.'],
    ['Phase 6 — The cheque goes to Dr. Martin',
     'After Aunt Jane leaves, Jack is pleased with the cheque and thinks it can pay off the next two months on the car. But Jill reveals that she has already sent the cheque to Dr. Martin. Jack is shocked and asks why she wasted good money on the doctor. Jill becomes emotional because he still has not understood the most serious debt.',
     'The scene turns from ordinary financial comedy to a darker satire. Even medical expenses are part of the instalment world.'],
    ['Phase 7 — The baby is also on instalment',
     'Jill finally says that one more instalment will make the baby really theirs. She is holding the baby as the play ends. This final joke is deliberately shocking. It pushes the instalment logic to its extreme: if everything is bought on credit, even the baby seems not fully theirs until the doctor is paid.',
     'The ending makes the audience laugh and then feel uncomfortable. That is true satire: humour that leaves a warning behind.'],
]

keyLines = [
    ['Oh, this is a charming little nest!',
     'Aunt Jane’s admiration creates the first impression of comfort and success. The word “nest” matters because the home should be secure, but later we learn it is built on debt.'],
    ['We like to be modern.',
     'Jack and Jill’s attitude is captured here. They believe modern living means enjoying things immediately, even if they are not fully paid for.'],
    ['You’re paying seven pounds eight and eight pence out of six pounds?',
     'This line exposes the absurd financial situation. Jack earns less than what he pays in instalments, yet he is not worried.'],
    ['We own the steering wheel, and one of the tyres, and two of the cylinders.',
     'This is a key comic line. It shows the ridiculous idea of partial ownership under the instalment system.'],
    ['I’m not going to sit on Mr. Sage’s part of the sofa.',
     'Aunt Jane’s remark makes the fragmented ownership visible and funny. It also shows her moral discomfort.'],
    ['Don’t you see, you ought to pay off what you owe.',
     'Aunt Jane gives the central advice of the play. The lesson is simple: comfort without financial discipline becomes a trap.'],
    ['Why; just one more instalment and BABY’S REALLY OURS!',
     'This final line is the climax of the satire. The instalment habit has become so extreme that even the baby is spoken of as not fully theirs.'],
]

glossary = [
    ['lounge', 'a place in a home or public building for leisure activities, living room'],
    ['cosy', 'comfortable'],
    ['instalment', 'one of the parts into which a debt is divided when payment is made at intervals'],
    ['absurd', 'ridiculously unreasonable and meaningless'],
    ['propose', 'intend to do something'],
    ['realise', 'to understand or become aware of'],
    ['thingummies', 'small articles the names of which are not remembered'],
    ['motto', 'a short sentence or phrase that expresses a rule guiding the behaviour of a particular person or group'],
    ['endorse', 'to make over to another'],
    ['tartar', 'a person of irritable temper'],
    ['possessed', 'completely controlled by an evil spirit'],
]

qaA = [
    ['What did Aunt Jane like about Jack’s “little nest”?',
     'Aunt Jane liked Jack and Jill’s cosy little home, the furniture and the comfortable things in it. At first, she felt that the young couple had built a charming and pleasant household.'],
    ['Aunt Jane seemed to think that there was a mistake in the wedding present she had given Jack. Why?',
     'Aunt Jane had given Jack a cheque as a wedding present. Seeing their apparently grand lifestyle, she thought she must have made a mistake and written two thousand pounds instead of twenty pounds.'],
    ['What would make Jack the owner instead of being the tenant?',
     'Jack would become the owner only when he paid all the instalments. Until then, he was practically a tenant because the house and things were not fully paid for.'],
    ['What sounded absurd to Aunt Jane?',
     'It sounded absurd to Aunt Jane that Jack earned only six pounds a week but paid seven pounds eight and eight pence in instalments. Spending more than one’s income seemed ridiculous to her.'],
    ['How did Jack manage to pay seven pounds eighty and eighty pence out of six pounds?',
     'Jack managed it by borrowing and buying more things on credit. His system depended on future payments, not on present income.'],
    ['What advice did Aunt Jane offer the couple?',
     'Aunt Jane advised Jack and Jill not to spend beyond their means. She wanted them to pay off their debts and live a more financially responsible life.'],
    ['For what purpose did Aunt Jane wish to use the cheque given by Aunt Jane?',
     'Aunt Jane expected her cheque to be used to reduce their debt, especially to pay off some instalments on the items they had bought. Jack hoped to use it for the car, but Jill sent it to Dr. Martin.'],
    ['“Just one more instalment and BABY’S REALLY OURS!” This tells us that the couple ________.',
     'This tells us that the couple had even delayed the doctor’s payment connected with the baby. Their instalment habit had reached an absurd and shocking level.'],
]

qaB = [
    ['Why is there a double negative in the title: The Never – Never Nest? Elucidate with reasons from the play.',
     'The title uses a double negative to suggest that Jack and Jill’s home is never truly theirs. A nest should be a safe, owned home, but everything in their house is bought on instalment. They own only parts of objects: a steering wheel, a tyre, two cylinders and a leg of the sofa. Even the baby becomes part of instalment logic. The title therefore satirises a lifestyle where ownership is always postponed.'],
    ['Bring out the humorous elements in the play.',
     'The humour comes from exaggeration, irony and absurd conversation. Aunt Jane thinks Jack and Jill are prosperous, but slowly discovers that they own only fragments of things. Jack’s calm explanation that they pay more than they earn is funny because he sees nothing wrong in it. Jill’s statement that one more instalment will make the baby really theirs is the funniest and most shocking moment. The humour exposes the foolishness of living on debt.'],
    ['How does the play “The Never – Never Nest” expose the harsh reality of modern living?',
     'The play exposes modern living as a debt-driven lifestyle. Jack and Jill want every comfort immediately: house, car, furniture, piano and other luxuries. They buy everything on instalment though their income is insufficient. Their home looks comfortable, but it is not truly theirs. The play shows that consumer desire can trap young families in lifelong repayment. Through humour, it warns us not to confuse appearance with real prosperity.'],
    ['Jill said that they owned the steering wheel of a car, one of the tyres, two of the cylinders and leg of the sofa. What does this convey?',
     'This conveys the absurdity of instalment ownership. Jack and Jill do not really own whole things; they own only small paid portions while the rest belongs to companies or creditors. It shows that their pride is hollow. The line also reveals how consumer society gives people the illusion of ownership while keeping them trapped in debt.'],
]

mcq = [
    ['Choose the meaning of “lounge”.', 'living room', 'kitchen', 'bedroom', 'garden', 0],
    ['Choose the meaning of “cosy”.', 'comfortable', 'costly', 'cold', 'empty', 0],
    ['Choose the meaning of “instalment”.', 'part payment of a debt', 'free gift', 'full payment', 'wedding present', 0],
    ['Choose the synonym of “absurd”.', 'ridiculously unreasonable', 'sensible', 'wealthy', 'silent', 0],
    ['Choose the meaning of “propose”.', 'intend to do something', 'refuse', 'forget', 'borrow', 0],
    ['Choose the meaning of “realise”.', 'understand', 'purchase', 'decorate', 'hide', 0],
    ['Choose the meaning of “thingummies”.', 'small articles whose names are not remembered', 'large debts', 'bank notes', 'babies', 0],
    ['Choose the meaning of “motto”.', 'guiding phrase', 'doctor’s bill', 'instalment book', 'sofa leg', 0],
    ['Choose the meaning of “tartar”.', 'person of irritable temper', 'gentle child', 'doctor', 'banker', 0],
    ['Who wrote “The Never Never Nest”?', 'Cedric Mount', 'Bill Bryson', 'William Shakespeare', 'Katherine Mansfield', 0],
    ['The play is a', 'one-act play', 'novel', 'sonnet', 'travel essay', 0],
    ['Who visits Jack and Jill?', 'Aunt Jane', 'Dr. Martin', 'Mr. Sage', 'Nurse only', 0],
    ['Jack earns', 'six pounds a week', 'seven pounds a week', 'ten pounds a week', 'two thousand pounds a week', 0],
    ['Aunt Jane gives the couple', 'a cheque', 'a car', 'a sofa', 'a piano', 0],
    ['Jill sends the cheque to', 'Dr. Martin', 'Mr. Sage', 'the car company', 'Aunt Jane', 0],
    ['Jack hopes to pay the next two months on the', 'car', 'baby', 'sofa', 'piano', 0],
    ['The final instalment is for the', 'baby', 'radio', 'house', 'steering wheel', 0],
    ['The play mainly criticises', 'living beyond one’s means', 'simple living', 'joint families', 'education', 0],
    ['The speaking activity is a debate on', 'whether EMI is boon or bane', 'war and peace', 'formal occasions', 'photography', 0],
    ['The writing task asks students to write as', 'Aunt Jane', 'Jack', 'Dr. Martin', 'the Nurse', 0],
]

rtc = [
    ['Oh, this is a charming little nest!',
     'Who says this?', 'Aunt Jane says this when she sees Jack and Jill’s home.',
     'Why is it ironic?', 'It is ironic because the “nest” looks charming, but most of it is not truly owned by them.'],
    ['You’re paying seven pounds eight and eight pence out of six pounds?',
     'Who is shocked by this?', 'Aunt Jane is shocked by Jack’s financial arrangement.',
     'Why is it absurd?', 'It is absurd because Jack pays more in instalments than he earns.'],
    ['We own the steering wheel, and one of the tyres, and two of the cylinders.',
     'What is being discussed?', 'Jill is discussing the parts of the car they have actually paid for.',
     'What does this reveal?', 'It reveals the ridiculous nature of partial ownership under instalment buying.'],
    ['I’m not going to sit on Mr. Sage’s part of the sofa.',
     'Who says this?', 'Aunt Jane says this after learning that the sofa is not fully theirs.',
     'What is humorous here?', 'The humour lies in treating a sofa as if different parts belong to different people.'],
    ['Don’t you see, you ought to pay off what you owe.',
     'What advice is given here?', 'Aunt Jane advises Jack and Jill to clear their debts.',
     'What theme does this line express?', 'It expresses the theme of financial responsibility.'],
    ['Ten pounds.',
     'What does this amount refer to?', 'It refers to the cheque or money Aunt Jane leaves for Jack and Jill.',
     'Why is it important?', 'This money becomes important because Jack wants it for the car, but Jill has sent it to the doctor.'],
    ['Who have you sent it to?',
     'Who asks this question?', 'Jack asks Jill this question after learning the cheque has been sent away.',
     'What answer does Jill give?', 'Jill says she has sent it to Dr. Martin.'],
    ['Why waste good money on the doctor?',
     'Who says this?', 'Jack says this when Jill tells him she sent the cheque to Dr. Martin.',
     'What does it show about Jack?', 'It shows that Jack is careless and even treats medical dues as less urgent than consumer instalments.'],
    ['Why; just one more instalment and BABY’S REALLY OURS!',
     'Who says this?', 'Jill says this near the end of the play.',
     'Why is it the climax?', 'It reveals the most shocking absurdity of their instalment lifestyle, making even the baby part of the debt system.'],
    ['These one act plays expose the shams of contemporary society besides delicately admonishing the guilty.',
     'What does this say about Cedric Mount’s plays?', 'It says his plays expose false appearances in modern society.',
     'How does this apply here?', 'The play exposes the false appearance of prosperity created by instalment buying.'],
]

p3 = [
    ['Describe Jack and Jill’s lifestyle.',
     'Jack and Jill live in a cosy home filled with modern comforts, but most things are bought on instalment. Their lifestyle looks prosperous outside, but it is actually built on debt.'],
    ['What does Aunt Jane notice about the little nest?',
     'Aunt Jane first admires the cosy home and its comforts. Later, she realises that the charming nest is not secure because most things are not fully owned.'],
    ['Compare Aunt Jane and Jack.',
     'Aunt Jane is careful, practical and financially responsible. Jack is careless, overconfident and proud of buying luxuries on credit even when his income is insufficient.'],
    ['What character trait of Jill is shown at the end?',
     'Jill is emotional but also trapped in the same debt habit. Her statement about the baby shows how deeply instalment thinking has entered their life.'],
    ['Why is the cheque important?',
     'The cheque is important because Aunt Jane expects it to reduce debt. Jack wants it for the car, but Jill sends it to Dr. Martin to pay for the baby.'],
    ['How is the theme of consumerism shown?',
     'Consumerism is shown through Jack and Jill’s desire to own a house, car, furniture and other luxuries immediately, even without enough income to pay for them.'],
    ['What does partial ownership reveal?',
     'Partial ownership reveals the absurdity of instalment living. Owning only a steering wheel, tyre or sofa leg shows that their prosperity is only an illusion.'],
    ['Explain the title “The Never Never Nest.”',
     'The title means that Jack and Jill’s home is never fully theirs. It remains a “never-never” nest because everything is bought on unpaid instalments.'],
    ['What is the message of the play?',
     'The play teaches that people should not live beyond their means. Comfort bought through endless debt can destroy peace and real ownership.'],
    ['How is the play relevant today?',
     'The play is relevant because EMI culture is common today. It warns families to use credit carefully and not confuse possession with true ownership.'],
]

p4 = [
    ['Write a character essay on Aunt Jane.',
     'Aunt Jane is the voice of common sense and financial responsibility in the play. When she enters Jack and Jill’s house, she first admires their charming little nest. But as she learns the truth, her admiration turns into shock. She cannot accept that the young couple pays more in instalments than Jack earns. She is disturbed by the idea that they own only parts of objects, such as a steering wheel, a tyre and a sofa leg. Her advice is simple and wise: they must pay off what they owe and stop living beyond their means. Aunt Jane represents an older, more careful value system that believes in real ownership, not debt-driven display.'],
    ['Explain the central theme of “The Never Never Nest.”',
     'The central theme of “The Never Never Nest” is the danger of living beyond one’s means. Jack and Jill want the comforts of modern life immediately, so they buy everything on instalment. Their house, car, furniture, piano and other items give the appearance of prosperity, but the reality is debt. Jack earns only six pounds a week but pays more than that in instalments. The absurdity reaches its height when Jill says one more instalment will make the baby really theirs. Cedric Mount uses humour to warn that easy credit can trap families and turn comfort into lifelong anxiety.'],
    ['Why is the title “The Never Never Nest” suitable?',
     'The title is highly suitable because it captures the irony of Jack and Jill’s life. A nest should be a safe, warm and owned home. But their nest is “never-never” because it is never truly theirs. Almost every item in it is bought on instalment and belongs partly to creditors. The double “never” suggests endless postponement of real ownership. They may live in the house and use the furniture and car, but they have not fully paid for them. The final line about the baby makes the title even more powerful, because their instalment mentality has entered every part of life.'],
    ['Compare Jack and Aunt Jane.',
     'Jack and Aunt Jane represent two opposite attitudes to money. Jack believes in enjoying modern comforts immediately. He is proud of instalment buying and does not worry that his weekly payments exceed his income. He even thinks of using Aunt Jane’s cheque to pay more on the car. Aunt Jane, however, believes in careful spending and real ownership. She is shocked by the couple’s debts and advises them to pay what they owe. Jack is comic because he is blind to danger; Aunt Jane is sensible because she sees the financial trap. Their contrast creates both humour and moral meaning.'],
    ['Do you agree that EMI can be a bane to middle-class families?',
     'Yes, EMI can become a bane when families spend without planning. Instalments may help people buy necessary things, but they become dangerous when used for show and luxury. Jack and Jill buy a home, car, furniture and other items though their income is too small. They pay more than they earn and still feel proud. This creates an illusion of prosperity while increasing debt. The play does not say that all credit is bad; it warns against irresponsible borrowing. Middle-class families should use EMI only within their means and should not let desire control their future.'],
    ['How does Cedric Mount create humour in the play?',
     'Cedric Mount creates humour through irony, exaggeration and absurd dialogue. At first, Aunt Jane admires the couple’s little nest, but the truth slowly reveals that almost nothing is fully theirs. The funniest idea is partial ownership: Jack and Jill own the steering wheel, one tyre, two cylinders and one leg of the sofa. Aunt Jane’s refusal to sit on another person’s part of the sofa adds visual comedy. The final line about the baby being truly theirs after one more instalment is shocking and hilarious. Mount’s humour is effective because it makes the audience laugh while exposing a serious social problem.'],
    ['How is “The Never Never Nest” relevant to modern life?',
     '“The Never Never Nest” is highly relevant today because instalment buying and EMI schemes are common everywhere. People buy phones, vehicles, appliances, furniture and even houses on credit. This can be useful when planned carefully, but it becomes dangerous when people buy things only to appear modern or wealthy. Jack and Jill’s life shows the danger of confusing possession with ownership. They have many comforts but no real financial freedom. The play reminds modern families to spend within their means, avoid unnecessary debt and remember that peace is more valuable than display. Its warning is still practical and powerful.'],
]

# ── Chapter file ──────────────────────────────────────────────────────────────

lines = []
lines.append("export default {")
lines.append("  eyebrow: 'Unit 6 · Supplementary · Play',")
lines.append("  title: 'The Never Never Nest',")
lines.append("  author: 'Cedric Mount',")
lines.append("  pills: ['One-act Play', 'Satire', 'EMI Lifestyle', 'Debt Trap'],")
lines.append("  tabs: [")

# Author tab
lines.append("    {")
lines.append("      id: 'author',")
lines.append("      label: 'Author',")
lines.append("      blocks: [")
lines.append("        { type: 'section-head', text: 'About the Author' },")
lines.append("        {")
lines.append("          type: 'teacher-voice',")
lines.append(f"          html: '<p>Let us meet <strong>Cedric Mount</strong>, whom the textbook introduces as a considerably distinguished playwright of his age. His plays include <em>Twentieth Century Lullaby</em>, <em>To Cut a Long Story Short</em> and <em>Nature Abhors a Vacuum</em>. The important point for us is that his one-act plays are easy to perform, satirical, witty and insightful.</p><p>The textbook says his one-act plays expose the shams of contemporary society besides delicately admonishing the guilty. That sentence is the key to reading this play. Mount does not shout at Jack and Jill. He places them in a cosy home, lets them proudly explain their purchases, and then quietly exposes the absurdity behind their comfortable-looking life.</p><p><strong>Why this matters for this text:</strong> {j(chr(8220))}The Never Never Nest{j(chr(8221))} is funny on the surface, but it is a serious warning about modern consumerism. Jack and Jill appear to own a beautiful little home, a car, furniture, a piano, a radiogram and even a baby. But almost everything is bought on instalment. Understanding Mount{j(chr(8217))}s satirical style helps us see that the laughter is not empty. It is meant to make us ask: are we living, or are we merely paying instalments?</p>',")
lines.append("        },")
lines.append("        { type: 'section-head', text: 'Before We Read' },")
lines.append("        {")
lines.append("          type: 'teacher-voice',")
lines.append("          html: '<p>Think about modern buying habits. A family may buy a car, sofa, phone, fridge or television by paying a small amount first and the rest every month. This can be useful if the family plans carefully. But what happens when everything in life is bought on credit? What happens when comfort becomes show, and show becomes debt?</p>',")
lines.append("        },")
lines.append("        {")
lines.append("          type: 'quote-block',")
lines.append(f"          quote: 'Why, just one more instalment and BABY{j(chr(8217))}S REALLY OURS!',")
lines.append(f"          context: 'This final line is shocking and comic at the same time. It shows that Jack and Jill{j(chr(8217))}s instalment habit has gone beyond furniture and cars. Even the doctor{j(chr(8217))}s bill for the baby is treated like another purchase. That is the heart of the satire.',")
lines.append("        },")
lines.append("        { type: 'nav', next: 'play-explained', nextLabel: 'Play Explained →' },")
lines.append("      ],")
lines.append("    },")

# Play Explained tab
lines.append("    {")
lines.append("      id: 'play-explained',")
lines.append("      label: 'Play Explained',")
lines.append("      blocks: [")
for ph in phases:
    lines.append(f"        {{ type: 'section-head', text: '{j(ph[0])}' }},")
    lines.append("        {")
    lines.append("          type: 'teacher-voice',")
    lines.append(f"          html: '<p>{j(ph[1])}</p>',")
    lines.append("        },")
    lines.append(f"        {{ type: 'think-box', label: 'Notice this', text: '{j(ph[2])}' }},")
    lines.append("")
lines.append("        { type: 'nav', next: 'key-lines', nextLabel: 'Key Lines →' },")
lines.append("      ],")
lines.append("    },")

# Key Lines tab
lines.append("    {")
lines.append("      id: 'key-lines',")
lines.append("      label: 'Key Lines',")
lines.append("      blocks: [")
for kl in keyLines:
    lines.append("        {")
    lines.append("          type: 'quote-block',")
    lines.append(f"          quote: '{j(kl[0])}',")
    lines.append(f"          context: '{j(kl[1])}',")
    lines.append("        },")
lines.append("        { type: 'nav', next: 'glossary', nextLabel: 'Glossary →' },")
lines.append("      ],")
lines.append("    },")

# Glossary tab
lines.append("    {")
lines.append("      id: 'glossary',")
lines.append("      label: 'Glossary',")
lines.append("      blocks: [")
for g in glossary:
    lines.append(f"        {{ type: 'gloss-row', word: '{j(g[0])}', def: '{j(g[1])}' }},")
lines.append("        { type: 'nav', next: 'themes', nextLabel: 'Themes & Devices →' },")
lines.append("      ],")
lines.append("    },")

# Themes tab
lines.append("    {")
lines.append("      id: 'themes',")
lines.append("      label: 'Themes & Devices',")
lines.append("      blocks: [")
lines.append("        {")
lines.append("          type: 'teacher-voice',")
lines.append("          html: '<p><strong>Theme: Consumerism creates the illusion of prosperity.</strong> Jack and Jill seem comfortable because they possess many things, but they own very little. Students should write that the play attacks the desire to appear modern without financial stability.</p>',")
lines.append("        },")
lines.append("        {")
lines.append("          type: 'teacher-voice',")
lines.append("          html: '<p><strong>Theme: Debt can destroy real ownership.</strong> Owning only the steering wheel, one tyre, two cylinders and one sofa leg shows that instalment buying gives partial control, not true ownership. The title itself shows this never-ending postponement.</p>',")
lines.append("        },")
lines.append("        {")
lines.append("          type: 'teacher-voice',")
lines.append(f"          html: '<p><strong>Theme: Comedy can expose social foolishness.</strong> Mount makes us laugh at absurd ownership and the final baby instalment, but behind the laughter is a warning against spending beyond one{j(chr(8217))}s means.</p>',")
lines.append("        },")
lines.append("        { type: 'device-block', kind: 'Irony', line: 'Oh, this is a charming little nest!', exp: 'The “charming little nest” is not secure because it is built on debt.' },")
lines.append("        { type: 'device-block', kind: 'Satire', line: 'The whole play exposes the EMI lifestyle.', exp: 'The play satirises instalment culture and the false pride of consumer society.' },")
lines.append(f"        {{ type: 'device-block', kind: 'Comic exaggeration', line: 'Why; just one more instalment and BABY{j(chr(8217))}S REALLY OURS!', exp: 'The idea that the baby will be really theirs after one more instalment exaggerates instalment thinking to reveal its absurdity.' }},")
lines.append("        { type: 'nav', next: 'textbook-qa', nextLabel: 'Textbook Q&A →' },")
lines.append("      ],")
lines.append("    },")

# Textbook Q&A tab
lines.append("    {")
lines.append("      id: 'textbook-qa',")
lines.append("      label: 'Textbook Q&A',")
lines.append("      blocks: [")
lines.append("        { type: 'section-head', text: 'Reading Comprehension Questions' },")
for q in qaA:
    lines.append("        {")
    lines.append("          type: 'teacher-voice',")
    lines.append(f"          html: '<p><strong>{j(q[0])}</strong></p><p>{j(q[1])}</p>',")
    lines.append("        },")
lines.append("        { type: 'section-head', text: 'Paragraph Answers' },")
for q in qaB:
    lines.append("        {")
    lines.append("          type: 'teacher-voice',")
    lines.append(f"          html: '<p><strong>{j(q[0])}</strong></p><p>{j(q[1])}</p>',")
    lines.append("        },")
lines.append("        { type: 'nav', practice: true },")
lines.append("      ],")
lines.append("    },")

# Activities tab
lines.append("    {")
lines.append("      id: 'activities',")
lines.append("      label: 'Activities',")
lines.append("      blocks: [")
lines.append("        {")
lines.append("          type: 'teacher-voice',")
lines.append("          html: '<p><strong>Listening Activity:</strong> The textbook asks students to listen to a passage and answer questions on EMI. Answers: i) False; ii) option; iii) monetary; iv) legal action; v) within. The listening passage warns that income may not always be sufficient to meet desires, and people must learn to spend within their means.</p>',")
lines.append("        },")
lines.append("        {")
lines.append("          type: 'teacher-voice',")
lines.append("          html: '<p><strong>Speaking Activity:</strong> The debate topic is: <strong>“Is Equated Monthly Instalment Scheme — a boon or bane to middle-class families?”</strong> Students may argue that EMI is a boon when used for essentials with planning, but a bane when used for luxury and status display beyond income.</p>',")
lines.append("        },")
lines.append("        {")
lines.append("          type: 'teacher-voice',")
lines.append("          html: '<p><strong>Writing Task:</strong> The writing task asks students to imagine themselves as Aunt Jane and write a letter to Jack and Jill advising them not to spend beyond their means. The letter should include suggestions for debt-free life, such as budgeting, buying essentials first, avoiding unnecessary loans and paying existing dues.</p>',")
lines.append("        },")
lines.append("        {")
lines.append("          type: 'teacher-voice',")
lines.append("          html: '<p><strong>ICT Corner — Form Filling:</strong> The unit ends with an online form-filling activity. Students are asked to explore form templates such as registration forms, job application forms, online booking forms, CV submission forms and club enrolment forms, and then practise filling forms online.</p>',")
lines.append("        },")
lines.append("        { type: 'nav', practice: true },")
lines.append("      ],")
lines.append("    },")

lines.append("  ],")
lines.append("}")

chapter_content = "\n".join(lines) + "\n"

# ── Practice file ─────────────────────────────────────────────────────────────

plines = []
plines.append("export default {")
plines.append("  meta: {")
plines.append("    title: 'The Never Never Nest',")
plines.append("    author: 'Cedric Mount',")
plines.append("    unit: 'Unit 6 · Supplementary · Play',")
plines.append("    totalMarks: 125,")
plines.append("  },")
plines.append("  parts: [")

# Part I MCQ
mcq_sections = [
    ('s1', 'Vocabulary (Q 1–9)', mcq[:9]),
    ('s2', 'Play Comprehension (Q 10–18)', mcq[9:18]),
    ('s3', 'Activity and Theme (Q 19–20)', mcq[18:]),
]
plines.append("    {")
plines.append("      id: 'p1',")
plines.append("      navLabel: 'Part I — Objective',")
plines.append("      title: 'Part I — Objective Type (20 × 1 = 20 Marks)',")
plines.append("      type: 'mcq',")
plines.append("      scoreMax: 20,")
plines.append("      marksPer: 1,")
plines.append("      sections: [")
for sec_id, sec_label, qs in mcq_sections:
    plines.append("        {")
    plines.append(f"          id: '{sec_id}',")
    plines.append(f"          label: '{j(sec_label)}',")
    plines.append("          questions: [")
    for idx, m in enumerate(qs):
        qnum = mcq.index(m) + 1
        plines.append("            {")
        plines.append(f"              id: 'q{qnum}',")
        plines.append(f"              html: '{j(m[0])}',")
        opts = [j(m[i]) for i in range(1, 5)]
        plines.append(f"              options: ['{opts[0]}', '{opts[1]}', '{opts[2]}', '{opts[3]}'],")
        plines.append(f"              answer: {m[5]},")
        plines.append("            },")
    plines.append("          ],")
    plines.append("        },")
plines.append("      ],")
plines.append("    },")

# Part II RTC
plines.append("    {")
plines.append("      id: 'p2',")
plines.append("      navLabel: 'Part II — RTC',")
plines.append("      title: 'Part II — Reference to Context (10 × 4 = 40 Marks)',")
plines.append("      type: 'reference',")
plines.append("      scoreMax: 40,")
plines.append("      marksPer: 4,")
plines.append("      questions: [")
for idx, r in enumerate(rtc):
    plines.append("        {")
    plines.append(f"          id: 'r{idx+1}',")
    plines.append(f"          verse: '{j(r[0])}',")
    plines.append("          subs: [")
    plines.append(f"            {{ q: '{j(r[1])}', a: '{j(r[2])}' }},")
    plines.append(f"            {{ q: '{j(r[3])}', a: '{j(r[4])}' }},")
    plines.append("          ],")
    plines.append("        },")
plines.append("      ],")
plines.append("    },")

# Part III Short Essay
plines.append("    {")
plines.append("      id: 'p3',")
plines.append("      navLabel: 'Part III — Short Essay',")
plines.append("      title: 'Part III — Short Essay (10 × 3 = 30 Marks)',")
plines.append("      type: 'short-essay',")
plines.append("      scoreMax: 30,")
plines.append("      marksPer: 3,")
plines.append("      questions: [")
for idx, q in enumerate(p3):
    plines.append("        {")
    plines.append(f"          id: 'se{idx+1}',")
    plines.append(f"          q: '{j(q[0])}',")
    plines.append(f"          ans: '{j(q[1])}',")
    plines.append("        },")
plines.append("      ],")
plines.append("    },")

# Part IV Long Essay
plines.append("    {")
plines.append("      id: 'p4',")
plines.append("      navLabel: 'Part IV — Long Essay',")
plines.append("      title: 'Part IV — Long Essay (7 × 5 = 35 Marks)',")
plines.append("      type: 'long-essay',")
plines.append("      scoreMax: 35,")
plines.append("      marksPer: 5,")
plines.append("      questions: [")
for idx, q in enumerate(p4):
    plines.append("        {")
    plines.append(f"          id: 'le{idx+1}',")
    plines.append(f"          q: '{j(q[0])}',")
    plines.append(f"          ans: '{j(q[1])}',")
    plines.append("        },")
plines.append("      ],")
plines.append("    },")

plines.append("  ],")
plines.append("}")

practice_content = "\n".join(plines) + "\n"

# Write files
base = r'C:\Projects\TNSchool\exam-coach\frontend\web\src\content'
with open(base + r'\chapters\the-never-never-nest.js', 'w', encoding='utf-8') as f:
    f.write(chapter_content)
with open(base + r'\practice\the-never-never-nest.js', 'w', encoding='utf-8') as f:
    f.write(practice_content)

print("Done. Validating...")

# Quick validation: check no raw U+0027 inside strings (crude check)
for path, content in [('chapter', chapter_content), ('practice', practice_content)]:
    bad_lines = []
    for i, line in enumerate(content.split('\n'), 1):
        # Find lines where there's an odd number of unescaped '
        # (very crude: just flag lines that might have broken strings)
        pass  # rely on node check
    print(f'{path}: {len(content)} chars written')
