// PLACEHOLDER DATA — replace with real 2025 paper content

import '../../models/exam_paper_model.dart';

const eng11English2025Annual = ExamPaperData(
  paperId: 'eng11-annual-2025',
  title: '2025 Annual Exam Paper',
  classLabel: 'Class 11',
  subject: 'English',
  duration: '3 Hours',
  maximumMarks: 90,
  totalPages: 8,
  pages: [

    // ── Page 1 ────────────────────────────────────────────────────────────────
    ExamPage(pageNumber: 1, blocks: [
      ExamBlock(
        type: 'paper_header',
        content: 'Annual Examination 2025',
        subContent: 'Class 11 — English | Tamil Nadu State Board',
      ),
      ExamBlock(
        type: 'metadata_row',
        items: [
          MetadataItem(label: 'Time Allowed', value: '3 Hours'),
          MetadataItem(label: 'Maximum Marks', value: '90'),
          MetadataItem(label: 'Total Pages', value: '8'),
        ],
      ),
      ExamBlock(
        type: 'instructions',
        content:
            'Answer all questions. Read the instructions given at the beginning of each Part carefully. '
            'Marks are indicated against each question. Write clearly and legibly.',
      ),
      ExamBlock(
        type: 'part_heading',
        content: 'PART I — READING COMPREHENSION',
        marks: 20,
      ),
      ExamBlock(
        type: 'section_heading',
        content: 'Section A — Unseen Passage',
      ),
      ExamBlock(
        type: 'paragraph_text',
        content:
            '[PLACEHOLDER PASSAGE]\n\n'
            'The relationship between human beings and the natural world has undergone a profound '
            'transformation over the past two centuries. Where once people lived in close harmony with '
            'the rhythms of seasons and the cycles of nature, the industrial age introduced a new dynamic '
            '— one in which the environment came to be regarded primarily as a resource to be exploited '
            'for economic gain.\n\n'
            'Today, environmental scientists warn that this attitude has led to consequences of a magnitude '
            'scarcely imagined by earlier generations. Rising sea levels, erratic monsoons, and the '
            'disappearance of countless species are among the visible signs of an ecological crisis.\n\n'
            'Some thinkers argue that the solution lies not merely in technological innovation, but in a '
            'fundamental shift in values — a rediscovery of the ancient understanding that human beings '
            'are part of nature, not apart from it.\n\n'
            '[End of Placeholder Passage]',
      ),
      ExamBlock(
        type: 'question',
        questionId: 'q1',
        marks: 5,
        content:
            'Based on the passage above, answer the following questions in one or two sentences each:\n\n'
            '(i) What change did the industrial age bring about in the relationship between human beings and nature?\n'
            '(ii) Name any two visible signs of the ecological crisis mentioned in the passage.\n'
            '(iii) What do some thinkers believe is the true solution to the environmental crisis?\n'
            '(iv) What does the author mean by "part of nature, not apart from it"?\n'
            '(v) What, according to the passage, makes sustainable choices difficult to adopt?',
      ),
      ExamBlock(
        type: 'mcq_question',
        questionId: 'q2',
        marks: 1,
        content: "The author's primary purpose in the passage is to:",
        options: [
          '(A) Celebrate the achievements of the industrial age',
          '(B) Persuade readers to adopt an environmentally responsible worldview',
          '(C) Describe the economic benefits of natural resource extraction',
          '(D) Explain how technology can solve all environmental problems',
        ],
      ),
    ]),

    // ── Page 2 ────────────────────────────────────────────────────────────────
    ExamPage(pageNumber: 2, blocks: [
      ExamBlock(
        type: 'section_heading',
        content: 'Section B — Seen Passage (Textbook)',
      ),
      ExamBlock(
        type: 'paragraph_text',
        content:
            '[PLACEHOLDER TEXTBOOK EXTRACT]\n\n'
            '"The portrait of a perfect friend," wrote the author, "is drawn not in words but in deeds. '
            'True friendship asks nothing in return except the freedom to be yourself — flawed, uncertain, '
            'and very much a work in progress. It is in this unconditional acceptance that the deepest '
            'bonds are formed, bonds that time and distance cannot break."\n\n'
            '[End of Placeholder Extract — replace with actual textbook passage]',
      ),
      ExamBlock(
        type: 'multi_subquestion',
        questionId: 'q3',
        marks: 6,
        content: 'Read the extract carefully and answer the questions below:',
        subQuestions: [
          ExamSubQuestion(
            id: 'q3a',
            label: '(a)',
            content: 'What, according to the author, is the true portrait of a perfect friend? (2 marks)',
            marks: 2,
          ),
          ExamSubQuestion(
            id: 'q3b',
            label: '(b)',
            content: 'Explain the phrase "a work in progress" as used in the extract. (2 marks)',
            marks: 2,
          ),
          ExamSubQuestion(
            id: 'q3c',
            label: '(c)',
            content:
                'What does "unconditional acceptance" mean, and why does the author consider it essential '
                'to deep friendship? (2 marks)',
            marks: 2,
          ),
        ],
      ),
      ExamBlock(
        type: 'or_question',
        questionId: 'q4',
        marks: 8,
        optionA: ExamBlockOption(
          content:
              'Write a summary of the unseen passage in Section A in about 80–100 words. '
              'Give it a suitable title.',
        ),
        optionB: ExamBlockOption(
          content:
              'Make a set of notes from the unseen passage in Section A using appropriate '
              'abbreviations and a logical structure. Provide a title for your notes.',
        ),
      ),
    ]),

    // ── Page 3 ────────────────────────────────────────────────────────────────
    ExamPage(pageNumber: 3, blocks: [
      ExamBlock(
        type: 'part_heading',
        content: 'PART II — WRITING SKILLS AND GRAMMAR',
        marks: 30,
      ),
      ExamBlock(
        type: 'section_heading',
        content: 'Section C — Writing',
      ),
      ExamBlock(
        type: 'instructions',
        content: 'Attempt any ONE of the following writing tasks.',
      ),
      ExamBlock(
        type: 'or_question',
        questionId: 'q5',
        marks: 10,
        optionA: ExamBlockOption(
          content:
              'Write an essay in 200–250 words on the topic:\n\n'
              '"The Role of Technology in Modern Education — Opportunity or Obstacle?"\n\n'
              'Your essay should have a clear introduction, well-developed body paragraphs, and a conclusion.',
        ),
        optionB: ExamBlockOption(
          content:
              'Write an essay in 200–250 words on the topic:\n\n'
              '"City Life vs. Village Life — A Comparative Study"\n\n'
              'Your essay should present a balanced perspective with relevant examples.',
        ),
      ),
      ExamBlock(
        type: 'or_question',
        questionId: 'q6',
        marks: 5,
        optionA: ExamBlockOption(
          content:
              'You are Aravind Kumar, studying in Class XI at Government Higher Secondary School, Madurai. '
              'Write a formal letter to the District Educational Officer requesting permission to conduct '
              'an inter-school science exhibition at your school.',
        ),
        optionB: ExamBlockOption(
          content:
              'Write a short story in about 150 words based on the following opening:\n\n'
              '"The old lighthouse had been abandoned for twenty years. Nobody visited it — until the '
              'night Priya noticed a light flickering at its summit."',
        ),
      ),
    ]),

    // ── Page 4 ────────────────────────────────────────────────────────────────
    ExamPage(pageNumber: 4, blocks: [
      ExamBlock(
        type: 'section_heading',
        content: 'Section D — Grammar',
      ),
      ExamBlock(
        type: 'instructions',
        content: 'Do as directed. Each question carries 5 marks.',
      ),
      ExamBlock(
        type: 'question',
        questionId: 'q7',
        marks: 5,
        content:
            'Fill in the blanks with appropriate articles (a / an / the) or prepositions '
            '(in / on / at / by / with / for / of / to):\n\n'
            '(i) She has been working ______ this project ______ three weeks.\n'
            '(ii) ______ Eiffel Tower is one ______ ______ most visited monuments in the world.\n'
            '(iii) He arrived ______ the station just ______ time to catch ______ last train.\n'
            '(iv) The book was written ______ a renowned author who was known ______ his wit.\n'
            '(v) They sat ______ silence, gazing ______ the stars above them.',
      ),
      ExamBlock(
        type: 'question',
        questionId: 'q8',
        marks: 5,
        content:
            'Transform the following sentences as directed in brackets:\n\n'
            '(i) She sings beautifully. (Change to Passive Voice)\n'
            '(ii) "I will finish the task by tomorrow," said Meena. (Change to Indirect Speech)\n'
            '(iii) The students worked hard. They passed the exam. (Combine using "so… that")\n'
            '(iv) No other mountain in the world is as high as Everest. (Change to Superlative Degree)\n'
            '(v) The teacher praised Ravi for his honesty. (Change to a Complex Sentence)',
      ),
      ExamBlock(
        type: 'question',
        questionId: 'q9',
        marks: 5,
        content:
            'Each sentence below contains ONE error. Identify the error and rewrite the corrected sentence:\n\n'
            '(i) He is one of the best student in the class.\n'
            '(ii) Neither the manager nor the employees was informed about the decision.\n'
            '(iii) The committee have reached its decision unanimously.\n'
            '(iv) She looked forward to meet her old friend after many years.\n'
            '(v) The news are alarming and requires immediate attention.',
      ),
    ]),

    // ── Page 5 ────────────────────────────────────────────────────────────────
    ExamPage(pageNumber: 5, blocks: [
      ExamBlock(
        type: 'part_heading',
        content: 'PART III — LITERATURE',
        marks: 40,
      ),
      ExamBlock(
        type: 'section_heading',
        content: 'Section E — Prose',
      ),
      ExamBlock(
        type: 'paragraph_text',
        content:
            '[PLACEHOLDER PROSE EXTRACT — replace with actual textbook prose]\n\n'
            'The old man sat by the window watching the rain trace silver lines down the glass. '
            'Fifty years had passed since he last stood on that hill, yet he could recall every detail '
            '— the smell of wet earth, the laughter of his childhood companions, and the particular '
            'quality of light on an afternoon in late monsoon. Memory, he had come to understand, is '
            'not a record of what was, but a story we tell ourselves about what mattered.\n\n'
            '[End of Placeholder Prose Extract]',
      ),
      ExamBlock(
        type: 'multi_subquestion',
        questionId: 'q10',
        marks: 6,
        content: 'Read the prose extract above and answer the questions that follow:',
        subQuestions: [
          ExamSubQuestion(
            id: 'q10a',
            label: '(a)',
            content:
                'What is the old man doing at the beginning of the extract, and what does this '
                'setting suggest about his state of mind? (2 marks)',
            marks: 2,
          ),
          ExamSubQuestion(
            id: 'q10b',
            label: '(b)',
            content:
                'How does the author define memory in this extract? Do you agree with this '
                'definition? Give reasons. (2 marks)',
            marks: 2,
          ),
          ExamSubQuestion(
            id: 'q10c',
            label: '(c)',
            content:
                "What, according to the old man, truly makes a life whole? How does this contrast "
                "with the world's definition of achievement? (2 marks)",
            marks: 2,
          ),
        ],
      ),
    ]),

    // ── Page 6 ────────────────────────────────────────────────────────────────
    ExamPage(pageNumber: 6, blocks: [
      ExamBlock(
        type: 'instructions',
        content: 'Answer any ONE of the following questions. (8 marks)',
      ),
      ExamBlock(
        type: 'or_question',
        questionId: 'q11',
        marks: 8,
        optionA: ExamBlockOption(
          content:
              'Analyse the major themes explored in the prose text studied in your textbook. '
              'How do these themes connect to contemporary life? (Write in about 200 words.)\n\n'
              '[PLACEHOLDER — refers to the prose piece studied in Class 11 English textbook]',
        ),
        optionB: ExamBlockOption(
          content:
              'Sketch the character of the protagonist from the prose text studied in your textbook. '
              'What qualities make this character memorable? (Write in about 200 words.)\n\n'
              '[PLACEHOLDER — refers to the prose piece studied in Class 11 English textbook]',
        ),
      ),
      ExamBlock(
        type: 'section_heading',
        content: 'Section F — Poetry',
      ),
      ExamBlock(
        type: 'paragraph_text',
        content:
            '[PLACEHOLDER POEM EXTRACT — replace with actual textbook poem]\n\n'
            'I have stood here before, in a similar dusk,\n'
            'Where the road bends away through the gathering husk\n'
            'Of a summer spent running, a childhood grown still —\n'
            'And I chose then, as now, to walk on, as I will.\n\n'
            'For the road asks no questions of those who must go,\n'
            'And the sky makes no promises — only the glow\n'
            'Of a last light on water, a note left unsaid,\n'
            'Is all that remains of the life that I led.\n\n'
            '[End of Placeholder Poem Extract]',
      ),
    ]),

    // ── Page 7 ────────────────────────────────────────────────────────────────
    ExamPage(pageNumber: 7, blocks: [
      ExamBlock(
        type: 'multi_subquestion',
        questionId: 'q12',
        marks: 6,
        content: 'Read the poem extract on Page 6 and answer the following questions:',
        subQuestions: [
          ExamSubQuestion(
            id: 'q12a',
            label: '(a)',
            content:
                'What mood or atmosphere is created in the poem? Identify any two poetic devices '
                'used to create this effect. (2 marks)',
            marks: 2,
          ),
          ExamSubQuestion(
            id: 'q12b',
            label: '(b)',
            content:
                '"The road asks no questions of those who must go" — what does this suggest about '
                "the speaker's attitude toward life's journey? (2 marks)",
            marks: 2,
          ),
          ExamSubQuestion(
            id: 'q12c',
            label: '(c)',
            content:
                'Identify the rhyme scheme of the first stanza. How does it contribute to the '
                'overall tone of the poem? (2 marks)',
            marks: 2,
          ),
        ],
      ),
      ExamBlock(
        type: 'or_question',
        questionId: 'q13',
        marks: 6,
        optionA: ExamBlockOption(
          content:
              'Write a critical appreciation of the poem studied in your textbook. Include: '
              'a brief summary, central theme, poetic devices used, and your personal response. '
              '(Write in about 150–200 words.)\n\n'
              '[PLACEHOLDER — refers to the poem studied in Class 11 English textbook]',
        ),
        optionB: ExamBlockOption(
          content:
              'Compare and contrast the central themes of any two poems studied in your Class 11 '
              'English textbook. How do the poets use imagery and tone differently? '
              '(Write in about 150–200 words.)\n\n'
              '[PLACEHOLDER — refers to poems studied in Class 11 English textbook]',
        ),
      ),
      ExamBlock(
        type: 'section_heading',
        content: 'Section G — Supplementary Reader',
      ),
      ExamBlock(
        type: 'instructions',
        content:
            '[PLACEHOLDER — Section G questions refer to the Class 11 Supplementary Reader. '
            'Replace with questions based on the actual supplementary texts studied.]',
      ),
    ]),

    // ── Page 8 ────────────────────────────────────────────────────────────────
    ExamPage(pageNumber: 8, blocks: [
      ExamBlock(
        type: 'or_question',
        questionId: 'q14',
        marks: 8,
        optionA: ExamBlockOption(
          content:
              "Describe the role of the central character in the supplementary story studied in "
              "your textbook. How do the events shape this character's personality and decisions? "
              '(Write in about 200 words.)\n\n'
              '[PLACEHOLDER — refers to the supplementary story in Class 11 English]',
        ),
        optionB: ExamBlockOption(
          content:
              'What is the central conflict in the supplementary story studied in your textbook? '
              'How is it resolved, and what message does the resolution convey? '
              '(Write in about 200 words.)\n\n'
              '[PLACEHOLDER — refers to the supplementary story in Class 11 English]',
        ),
      ),
      ExamBlock(
        type: 'or_question',
        questionId: 'q15',
        marks: 6,
        optionA: ExamBlockOption(
          content:
              'Identify and discuss any two important themes in the supplementary text studied '
              'in your textbook. Support your answer with evidence from the text. '
              '(Write in about 150 words.)\n\n'
              '[PLACEHOLDER — refers to the supplementary text in Class 11 English]',
        ),
        optionB: ExamBlockOption(
          content:
              'Write a character sketch of any supporting character from the supplementary text. '
              'Explain how this character contributes to the development of the story or theme. '
              '(Write in about 150 words.)\n\n'
              '[PLACEHOLDER — refers to the supplementary text in Class 11 English]',
        ),
      ),
      ExamBlock(
        type: 'footer_note',
        content: '—— End of Question Paper ——',
      ),
    ]),

  ],
);
