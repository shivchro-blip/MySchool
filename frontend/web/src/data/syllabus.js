/**
 * Mock syllabus data — Samacheer Kalvi
 * Structure mirrors the real TNBSE +1 and +2 English syllabus.
 *
 * When the backend is ready, replace this with API calls
 * from src/api/syllabus.js — the component interfaces stay the same.
 */

export const SYLLABUS = {
  plus1: {
    label: '+1',
    fullLabel: 'Class XI — Higher Secondary First Year',
    subjects: {
      english: {
        label: 'English',
        slug: 'english',
        // units: TN board groups lessons into 6 units, each with Prose + Poem + Supplementary
        units: [
          { id: 1, title: 'Unit 1', color: '#e8824a', light: '#fdf0e8', border: '#f0a97a',
            lessons: [
              { slug: 'the-portrait-of-a-lady',          title: 'The Portrait of a Lady',          type: 'Prose',         tag: 'prose',         category: 'prose'         },
              { slug: 'once-upon-a-time',                title: 'Once Upon a Time',                type: 'Poem',          tag: 'poem',          category: 'poetry'        },
              { slug: 'after-twenty-years',              title: 'After Twenty Years',              type: 'Supplementary', tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 2, title: 'Unit 2', color: '#5c8fd6', light: '#eaf2fd', border: '#8ab4e8',
            lessons: [
              { slug: 'the-queen-of-boxing',             title: 'The Queen of Boxing',             type: 'Prose',         tag: 'prose',         category: 'prose'         },
              { slug: 'confessions-of-a-born-spectator', title: 'Confessions of a Born Spectator', type: 'Poem',          tag: 'poem',          category: 'poetry'        },
              { slug: 'a-shot-in-the-dark',              title: 'A Shot in the Dark',              type: 'Supplementary', tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 3, title: 'Unit 3', color: '#59a87a', light: '#e8f5ee', border: '#84c9a0',
            lessons: [
              { slug: 'forgetting',                      title: 'Forgetting',                      type: 'Prose',         tag: 'prose',         category: 'prose'         },
              { slug: 'lines-written-in-early-spring',   title: 'Lines Written in Early Spring',   type: 'Poem',          tag: 'poem',          category: 'poetry'        },
              { slug: 'the-first-patient',               title: 'The First Patient',               type: 'Supplementary', tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 4, title: 'Unit 4', color: '#a06cd5', light: '#f2ebfc', border: '#c49ee8',
            lessons: [
              { slug: 'tight-corners',                   title: 'Tight Corners',                   type: 'Prose',         tag: 'prose',         category: 'prose'         },
              { slug: 'macavity-the-mystery-cat',        title: 'Macavity – The Mystery Cat',       type: 'Poem',          tag: 'poem',          category: 'poetry'        },
              { slug: 'with-the-photographer',           title: 'With the Photographer',           type: 'Supplementary', tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 5, title: 'Unit 5', color: '#d4873a', light: '#fdf3e7', border: '#e8b070',
            lessons: [
              { slug: 'the-convocation-address',         title: 'The Convocation Address',         type: 'Prose',         tag: 'prose',         category: 'prose'         },
              { slug: 'everest-is-not-the-only-peak',    title: 'Everest is Not the Only Peak',    type: 'Poem',          tag: 'poem',          category: 'poetry'        },
              { slug: 'the-singing-lesson',              title: 'The Singing Lesson',              type: 'Supplementary', tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 6, title: 'Unit 6', color: '#d45c6a', light: '#fdeaec', border: '#e88d97',
            lessons: [
              { slug: 'the-accidental-tourist',          title: 'The Accidental Tourist',          type: 'Prose',         tag: 'prose',         category: 'prose'         },
              { slug: 'the-hollow-crown',                title: 'The Hollow Crown',                type: 'Poem',          tag: 'poem',          category: 'poetry'        },
              { slug: 'the-never-never-nest',            title: 'The Never Never Nest',            type: 'Supplementary', tag: 'supplementary', category: 'supplementary' },
            ]},
        ],
        categories: {
          prose: {
            label: 'Prose', slug: 'prose', icon: '📖',
            lessons: [
              { slug: 'the-portrait-of-a-lady',       title: 'The Portrait of a Lady'       },
              { slug: 'the-queen-of-boxing',           title: 'The Queen of Boxing'           },
              { slug: 'forgetting',                    title: 'Forgetting'                    },
              { slug: 'tight-corners',                 title: 'Tight Corners'                 },
              { slug: 'the-convocation-address',       title: 'The Convocation Address'       },
              { slug: 'the-accidental-tourist',        title: 'The Accidental Tourist'        },
            ],
          },
          poetry: {
            label: 'Poetry', slug: 'poetry', icon: '🎵',
            lessons: [
              { slug: 'once-upon-a-time',                title: 'Once Upon a Time'                },
              { slug: 'confessions-of-a-born-spectator', title: 'Confessions of a Born Spectator' },
              { slug: 'lines-written-in-early-spring',   title: 'Lines Written in Early Spring'   },
              { slug: 'macavity-the-mystery-cat',        title: 'Macavity – The Mystery Cat'       },
              { slug: 'everest-is-not-the-only-peak',    title: 'Everest is Not the Only Peak'    },
              { slug: 'the-hollow-crown',                title: 'The Hollow Crown'                },
            ],
          },
          supplementary: {
            label: 'Supplementary', slug: 'supplementary', icon: '📑',
            lessons: [
              { slug: 'after-twenty-years',   title: 'After Twenty Years'   },
              { slug: 'a-shot-in-the-dark',   title: 'A Shot in the Dark'   },
              { slug: 'the-first-patient',    title: 'The First Patient'    },
              { slug: 'with-the-photographer',title: 'With the Photographer'},
              { slug: 'the-singing-lesson',   title: 'The Singing Lesson'   },
              { slug: 'the-never-never-nest', title: 'The Never Never Nest' },
            ],
          },
        },
      },
      maths: {
        label: 'Mathematics',
        slug: 'maths',
        type: 'chapters',
        chapters: [
          { number: 1,  volume: 1, title: 'Sets, Relations and Functions',                         slug: 'sets-relations-functions'               },
          { number: 2,  volume: 1, title: 'Basic Algebra',                                         slug: 'basic-algebra'                          },
          { number: 3,  volume: 1, title: 'Trigonometry',                                          slug: 'trigonometry'                           },
          { number: 4,  volume: 1, title: 'Combinatorics and Mathematical Induction',              slug: 'combinatorics-mathematical-induction'   },
          { number: 5,  volume: 1, title: 'Binomial Theorem, Sequences and Series',                slug: 'binomial-theorem-sequences-series'      },
          { number: 6,  volume: 1, title: 'Two Dimensional Analytical Geometry',                   slug: 'two-dimensional-analytical-geometry'    },
          { number: 7,  volume: 2, title: 'Matrices and Determinants',                             slug: 'matrices-and-determinants'              },
          { number: 8,  volume: 2, title: 'Vector Algebra',                                        slug: 'vector-algebra'                         },
          { number: 9,  volume: 2, title: 'Differential Calculus – Limits and Continuity',         slug: 'differential-calculus-limits-continuity' },
          { number: 10, volume: 2, title: 'Differential Calculus – Differentiability and Methods', slug: 'differential-calculus-differentiability' },
          { number: 11, volume: 2, title: 'Integral Calculus',                                     slug: 'integral-calculus'                      },
        ],
      },
      science: {
        label: 'Science',
        slug: 'science',
        categories: {
          physics: {
            label: 'Physics',
            slug: 'physics',
            icon: '⚡',
            lessons: [
              { slug: 'nature-of-physical-world', title: 'Nature of Physical World' },
              { slug: 'kinematics',               title: 'Kinematics'               },
              { slug: 'laws-of-motion',           title: 'Laws of Motion'           },
            ],
          },
          chemistry: {
            label: 'Chemistry',
            slug: 'chemistry',
            icon: '🧪',
            lessons: [
              { slug: 'basic-concepts',           title: 'Basic Concepts of Chemistry' },
              { slug: 'quantum-mechanical-model', title: 'Quantum Mechanical Model'    },
            ],
          },
        },
      },
      "computer-applications": {
        label: "Computer Applications",
        slug: "computer-applications",
        chapters: [
          { number: 1,  title: "Introduction to Computers",                        slug: "chapter-01-introduction-to-computers" },
          { number: 2,  title: "Number Systems",                                   slug: "chapter-02-number-systems" },
          { number: 3,  title: "Computer Organisation",                            slug: "chapter-03-computer-organisation" },
          { number: 4,  title: "Theoretical Concepts of Operating System",         slug: "chapter-04-theoretical-concepts-of-operating-system" },
          { number: 5,  title: "Working with Windows Operating System",            slug: "chapter-05-working-with-windows-operating-system" },
          { number: 6,  title: "Introduction to Word Processor",                   slug: "chapter-06-introduction-to-word-processor" },
          { number: 7,  title: "Working with OpenOffice Calc",                     slug: "chapter-07-working-with-openoffice-calc" },
          { number: 8,  title: "Presentation Basics",                              slug: "chapter-08-presentation-basics" },
          { number: 9,  title: "Introduction to Internet and Email",               slug: "chapter-09-introduction-to-internet-and-email" },
          { number: 10, title: "HTML — Structural Tags",                           slug: "chapter-10-html-structural-tags" },
          { number: 11, title: "HTML — Formatting Text, Tables, Lists and Links", slug: "chapter-11-html-formatting-tables-lists-links" },
          { number: 12, title: "HTML — Multimedia Elements and Forms",             slug: "chapter-12-html-multimedia-elements-and-forms" },
          { number: 13, title: "CSS — Cascading Style Sheets",                     slug: "chapter-13-css-cascading-style-sheets" },
          { number: 14, title: "Introduction to JavaScript",                       slug: "chapter-14-introduction-to-javascript" },
          { number: 15, title: "Control Structure in JavaScript",                  slug: "chapter-15-control-structure-in-javascript" },
          { number: 16, title: "JavaScript Functions",                             slug: "chapter-16-javascript-functions" },
          { number: 17, title: "Computer Ethics and Cyber Security",               slug: "chapter-17-computer-ethics-and-cyber-security" },
          { number: 18, title: "Tamil Computing",                                  slug: "chapter-18-tamil-computing" },
        ],
      },
      "computer-science": {
        label: "Computer Science",
        slug: "computer-science",
        chapters: [
          { number: 1,  title: "Introduction to Computers",                    slug: "cs-chapter-01-introduction-to-computers" },
          { number: 2,  title: "Number Systems",                               slug: "cs-chapter-02-number-systems" },
          { number: 3,  title: "Computer Organization",                        slug: "cs-chapter-03-computer-organization" },
          { number: 4,  title: "Theoretical Concepts of Operating System",     slug: "cs-chapter-04-theoretical-concepts-of-operating-system" },
          { number: 5,  title: "Working with Windows Operating System",        slug: "cs-chapter-05-working-with-windows-operating-system" },
          { number: 6,  title: "Specification and Abstraction",                slug: "cs-chapter-06-specification-and-abstraction" },
          { number: 7,  title: "Composition and Decomposition",                slug: "cs-chapter-07-composition-and-decomposition" },
          { number: 8,  title: "Iteration and Recursion",                      slug: "cs-chapter-08-iteration-and-recursion" },
          { number: 9,  title: "Introduction to C++",                         slug: "cs-chapter-09-introduction-to-cpp" },
          { number: 10, title: "Flow of Control",                              slug: "cs-chapter-10-flow-of-control" },
          { number: 11, title: "Functions",                                    slug: "cs-chapter-11-functions" },
          { number: 12, title: "Arrays and Structures",                        slug: "cs-chapter-12-arrays-and-structures" },
          { number: 13, title: "Introduction to Object Oriented Programming Techniques", slug: "cs-chapter-13-introduction-to-oop-techniques" },
          { number: 14, title: "Classes and Objects",                          slug: "cs-chapter-14-classes-and-objects" },
          { number: 15, title: "Polymorphism",                                 slug: "cs-chapter-15-polymorphism" },
          { number: 16, title: "Inheritance",                                  slug: "cs-chapter-16-inheritance" },
          { number: 17, title: "Computer Ethics and Cyber Security",           slug: "cs-chapter-17-computer-ethics-and-cyber-security" },
          { number: 18, title: "Tamil Computing",                              slug: "cs-chapter-18-tamil-computing" },
        ],
      },
    },
  },

  plus2: {
    label: '+2',
    fullLabel: 'Class XII — Higher Secondary Second Year',
    subjects: {
      english: {
        label: 'English',
        slug: 'english',
        units: [
          { id: 1, title: 'Unit 1', color: '#e8824a', light: '#fdf0e8', border: '#f0a97a',
            lessons: [
              { slug: 'two-gentlemen-of-verona',        title: 'Two Gentlemen of Verona',        type: 'Prose',              tag: 'prose',         category: 'prose'         },
              { slug: 'the-castle',                     title: 'The Castle',                     type: 'Poem',               tag: 'poem',          category: 'poetry'        },
              { slug: 'god-sees-the-truth-but-waits',   title: 'God Sees the Truth but Waits',   type: 'Supplementary',      tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 2, title: 'Unit 2', color: '#5c8fd6', light: '#eaf2fd', border: '#8ab4e8',
            lessons: [
              { slug: 'a-nice-cup-of-tea',              title: 'A Nice Cup of Tea',              type: 'Prose',              tag: 'prose',         category: 'prose'         },
              { slug: 'our-casuarina-tree',             title: 'Our Casuarina Tree',             type: 'Poem',               tag: 'poem',          category: 'poetry'        },
              { slug: 'life-of-pi',                     title: 'Life of Pi',                     type: 'Supplementary',      tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 3, title: 'Unit 3', color: '#59a87a', light: '#e8f5ee', border: '#84c9a0',
            lessons: [
              { slug: 'in-celebration-of-being-alive',  title: 'In Celebration of Being Alive',  type: 'Prose',              tag: 'prose',         category: 'prose'         },
              { slug: 'all-the-worlds-a-stage',         title: "All the World's a Stage",         type: 'Poem',               tag: 'poem',          category: 'poetry'        },
              { slug: 'the-hour-of-truth',              title: 'The Hour of Truth',              type: 'Supplementary / Play', tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 4, title: 'Unit 4', color: '#a06cd5', light: '#f2ebfc', border: '#c49ee8',
            lessons: [
              { slug: 'the-summit',                     title: 'The Summit',                     type: 'Prose',              tag: 'prose',         category: 'prose'         },
              { slug: 'ulysses',                        title: 'Ulysses',                        type: 'Poem',               tag: 'poem',          category: 'poetry'        },
              { slug: 'the-midnight-visitor',           title: 'The Midnight Visitor',           type: 'Supplementary',      tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 5, title: 'Unit 5', color: '#d4873a', light: '#fdf3e7', border: '#e8b070',
            lessons: [
              { slug: 'the-chair',                      title: 'The Chair',                      type: 'Prose',              tag: 'prose',         category: 'prose'         },
              { slug: 'a-father-to-his-son',            title: 'A Father to His Son',            type: 'Poem',               tag: 'poem',          category: 'poetry'        },
              { slug: 'all-summer-in-a-day',            title: 'All Summer in a Day',            type: 'Supplementary',      tag: 'supplementary', category: 'supplementary' },
            ]},
          { id: 6, title: 'Unit 6', color: '#d45c6a', light: '#fdeaec', border: '#e88d97',
            lessons: [
              { slug: 'on-the-rule-of-the-road',        title: 'On the Rule of the Road',        type: 'Prose',              tag: 'prose',         category: 'prose'         },
              { slug: 'incident-of-the-french-camp',    title: 'Incident of the French Camp',    type: 'Poem',               tag: 'poem',          category: 'poetry'        },
              { slug: 'remember-caesar',                title: 'Remember Caesar',                type: 'Supplementary / Play', tag: 'supplementary', category: 'supplementary' },
            ]},
        ],
        categories: {
          prose: {
            label: 'Prose',
            slug: 'prose',
            icon: '📖',
            lessons: [
              { slug: 'two-gentlemen-of-verona',        title: 'Two Gentlemen of Verona'        },
              { slug: 'a-nice-cup-of-tea',              title: 'A Nice Cup of Tea'              },
              { slug: 'in-celebration-of-being-alive',  title: 'In Celebration of Being Alive'  },
              { slug: 'the-summit',                     title: 'The Summit'                     },
              { slug: 'the-chair',                      title: 'The Chair'                      },
              { slug: 'on-the-rule-of-the-road',        title: 'On the Rule of the Road'        },
            ],
          },
          poetry: {
            label: 'Poetry',
            slug: 'poetry',
            icon: '🎵',
            lessons: [
              { slug: 'the-castle',                     title: 'The Castle'                     },
              { slug: 'our-casuarina-tree',             title: 'Our Casuarina Tree'             },
              { slug: 'all-the-worlds-a-stage',         title: "All the World's a Stage"         },
              { slug: 'ulysses',                        title: 'Ulysses'                        },
              { slug: 'a-father-to-his-son',            title: 'A Father to His Son'            },
              { slug: 'incident-of-the-french-camp',    title: 'Incident of the French Camp'    },
            ],
          },
          supplementary: {
            label: 'Supplementary',
            slug: 'supplementary',
            icon: '📑',
            lessons: [
              { slug: 'god-sees-the-truth-but-waits',   title: 'God Sees the Truth but Waits'   },
              { slug: 'life-of-pi',                     title: 'Life of Pi'                     },
              { slug: 'the-hour-of-truth',              title: 'The Hour of Truth'              },
              { slug: 'the-midnight-visitor',           title: 'The Midnight Visitor'           },
              { slug: 'all-summer-in-a-day',            title: 'All Summer in a Day'            },
              { slug: 'remember-caesar',                title: 'Remember Caesar'                },
            ],
          },
        },
      },
      "computer-applications": {
        label: "Computer Applications",
        slug: "computer-applications",
        chapters: [
          { number: 1,  title: "Multimedia",                                 slug: "chapter-01-multimedia" },
          { number: 2,  title: "An Introduction to Adobe PageMaker",         slug: "chapter-02-pagemaker" },
          { number: 3,  title: "Introduction to Database Management System", slug: "chapter-03-dbms" },
          { number: 4,  title: "PHP: Hypertext Preprocessor",                slug: "chapter-04-php-intro" },
          { number: 5,  title: "Functions and Arrays in PHP",                slug: "chapter-05-php-functions-arrays" },
          { number: 6,  title: "Conditional Statements in PHP",              slug: "chapter-06-php-conditionals" },
          { number: 7,  title: "Loops in PHP",                               slug: "chapter-07-php-loops" },
          { number: 8,  title: "Forms and Files",                            slug: "chapter-08-forms-files" },
          { number: 9,  title: "Connecting PHP and MySQL",                   slug: "chapter-09-php-mysql" },
          { number: 10, title: "Introduction to Computer Networks",          slug: "chapter-10-networks-intro" },
          { number: 11, title: "Network Examples and Protocols",             slug: "chapter-11-network-protocols" },
          { number: 12, title: "Domain Name System (DNS)",                   slug: "chapter-12-dns" },
          { number: 13, title: "Network Cabling",                            slug: "chapter-13-network-cabling" },
          { number: 14, title: "Open Source Concepts",                       slug: "chapter-14-open-source" },
          { number: 15, title: "E-Commerce",                                 slug: "chapter-15-ecommerce" },
          { number: 16, title: "Electronic Payment Systems",                 slug: "chapter-16-payment-systems" },
          { number: 17, title: "E-Commerce Security Systems",                slug: "chapter-17-ecommerce-security" },
          { number: 18, title: "Electronic Data Interchange (EDI)",          slug: "chapter-18-edi" },
        ],
      },
      "computer-applications-tamil": {
        label: "Computer Applications (தமிழ்)",
        slug: "computer-applications-tamil",
        chapters: [
          { number: 1,  title: "பல்லூடகம்",                                          slug: "ta-chapter-01-multimedia" },
          { number: 2,  title: "அடோப் பேஜ்மேக்கர் – ஓர் அறிமுகம்",                    slug: "ta-chapter-02-pagemaker" },
          { number: 3,  title: "தரவுதள மேலாண்மை அமைப்பு – ஓர் அறிமுகம்",              slug: "ta-chapter-03-dbms" },
          { number: 4,  title: "மீவுரை முன்செயலி (PHP) – ஓர் அறிமுகம்",                slug: "ta-chapter-04-php-intro" },
          { number: 5,  title: "PHP செயற்கூறுகள் மற்றும் அணிகள்",                     slug: "ta-chapter-05-php-functions-arrays" },
          { number: 6,  title: "PHPஇல் உள்ள நிபந்தனைக் கூற்றுகள்",                     slug: "ta-chapter-06-php-conditionals" },
          { number: 7,  title: "PHPஇல் மடக்குகள்",                                    slug: "ta-chapter-07-php-loops" },
          { number: 8,  title: "படிவங்கள் மற்றும் கோப்புகள்",                         slug: "ta-chapter-08-forms-files" },
          { number: 9,  title: "PHP-உடன் MySQL-ஐ இணைத்தல்",                           slug: "ta-chapter-09-php-mysql" },
          { number: 10, title: "கணினி வலையமைப்பு ஓர் அறிமுகம்",                       slug: "ta-chapter-10-networks-intro" },
          { number: 11, title: "வலையமைப்பு எடுத்துக்காட்டுகள் மற்றும் நெறிமுறைகள்",   slug: "ta-chapter-11-network-protocols" },
          { number: 12, title: "களப்பெயர் முறைமை (DNS)",                              slug: "ta-chapter-12-dns" },
          { number: 13, title: "வலையமைப்பு வடமிடல்",                                  slug: "ta-chapter-13-network-cabling" },
          { number: 14, title: "திறந்த மூல கருத்துருக்கள்",                           slug: "ta-chapter-14-open-source" },
          { number: 15, title: "மின்-வணிகம்",                                        slug: "ta-chapter-15-ecommerce" },
          { number: 16, title: "மின்னணு செலுத்தல் முறைகள்",                           slug: "ta-chapter-16-payment-systems" },
          { number: 17, title: "மின்-வணிக பாதுகாப்பு அமைப்புகள்",                     slug: "ta-chapter-17-ecommerce-security" },
          { number: 18, title: "மின்னணு தரவு பரிமாற்றம்",                             slug: "ta-chapter-18-edi" },
        ],
      },
      "computer-science": {
        label: "Computer Science",
        slug: "computer-science",
        chapters: [
          { number: 1,  title: "Function",                                 slug: "chapter-01-functions" },
          { number: 2,  title: "Data Abstraction",                         slug: "chapter-02-data-abstraction" },
          { number: 3,  title: "Scoping",                                  slug: "chapter-03-scoping" },
          { number: 4,  title: "Algorithmic Strategies",                   slug: "chapter-04-algorithmic-strategies" },
          { number: 5,  title: "Python - Variables and Operators",         slug: "chapter-05-python-variables-operators" },
          { number: 6,  title: "Control Structures",                      slug: "chapter-06-control-structures" },
          { number: 7,  title: "Python Functions",                        slug: "chapter-07-python-functions" },
          { number: 8,  title: "Strings and String Manipulation",         slug: "chapter-08-strings-manipulation" },
          { number: 9,  title: "Lists, Tuples, Sets and Dictionary",      slug: "chapter-09-lists-tuples-sets-dictionary" },
          { number: 10, title: "Python Classes and Objects",              slug: "chapter-10-python-classes-objects" },
          { number: 11, title: "Database Concepts",                       slug: "chapter-11-database-concepts" },
          { number: 12, title: "Structured Query Language (SQL)",         slug: "chapter-12-sql" },
          { number: 13, title: "Python and CSV Files",                    slug: "chapter-13-python-csv-files" },
          { number: 14, title: "Importing C++ Programs in Python",        slug: "chapter-14-importing-cpp-in-python" },
          { number: 15, title: "Data Manipulation through SQL",           slug: "chapter-15-data-manipulation-sql" },
          { number: 16, title: "Data Visualization using pyplot",         slug: "chapter-16-data-visualization-pyplot" },
        ],
      },
      "computer-science-tamil": {
        label: "Computer Science (தமிழ்)",
        slug: "computer-science-tamil",
        chapters: [
          { number: 1,  title: "செயற்கூறு",                                                                        slug: "ta-chapter-01-functions" },
          { number: 2,  title: "தரவு அருவமாக்கம்",                                                                  slug: "ta-chapter-02-data-abstraction" },
          { number: 3,  title: "வரையெல்லை",                                                                        slug: "ta-chapter-03-scoping" },
          { number: 4,  title: "நெறிமுறையின் யுக்திகள்",                                                            slug: "ta-chapter-04-algorithmic-strategies" },
          { number: 5,  title: "பைத்தான் அறிமுகம் – மாறிகள் மற்றும் செயற்குறிகள்",                                  slug: "ta-chapter-05-python-variables-operators" },
          { number: 6,  title: "கட்டுப்பாட்டு கட்டமைப்புகள்",                                                       slug: "ta-chapter-06-control-structures" },
          { number: 7,  title: "பைத்தான் செயற்கூறுகள்",                                                             slug: "ta-chapter-07-python-functions" },
          { number: 8,  title: "சரங்கள் மற்றும் சரங்களைக் கையாளுதல்",                                               slug: "ta-chapter-08-strings-manipulation" },
          { number: 9,  title: "தொகுப்பு தரவினங்கள் (List, Tuples, Set மற்றும் Dictionary)",                        slug: "ta-chapter-09-lists-tuples-sets-dictionary" },
          { number: 10, title: "பைத்தான் இனக்குழுக்கள் மற்றும் பொருள்கள்",                                          slug: "ta-chapter-10-python-classes-objects" },
          { number: 11, title: "தரவுதள கருத்துருக்கள்",                                                             slug: "ta-chapter-11-database-concepts" },
          { number: 12, title: "வினவல் அமைப்பு மொழி (SQL)",                                                        slug: "ta-chapter-12-sql" },
          { number: 13, title: "பைத்தான் மற்றும் CSV கோப்புகள்",                                                    slug: "ta-chapter-13-python-csv-files" },
          { number: 14, title: "பைத்தானில் C++ நிரல்களை தருவித்தல்",                                               slug: "ta-chapter-14-importing-cpp-in-python" },
          { number: 15, title: "SQL மூலம் தரவுகளைக் கையாளுதல்",                                                    slug: "ta-chapter-15-data-manipulation-sql" },
          { number: 16, title: "தரவு காட்சிப்படுத்துதல் – PYPLOT (கோட்டு, வட்ட, பட்டை வரைபடங்கள்)",                slug: "ta-chapter-16-data-visualization-pyplot" },
        ],
      },
      maths: {
        label: 'Mathematics',
        slug: 'maths',
        categories: {
          algebra: {
            label: 'Algebra',
            slug: 'algebra',
            icon: '🔢',
            lessons: [
              { slug: 'applications-of-matrices', title: 'Applications of Matrices' },
              { slug: 'complex-numbers',           title: 'Complex Numbers'          },
            ],
          },
        },
      },
    },
  },
}

export function getYear(year) {
  return SYLLABUS[year] || null
}

export function getSubject(year, subject) {
  return SYLLABUS[year]?.subjects?.[subject] || null
}

export function getCategory(year, subject, category) {
  return SYLLABUS[year]?.subjects?.[subject]?.categories?.[category] || null
}

export function getLesson(year, subject, category, lessonSlug) {
  const cat = getCategory(year, subject, category)
  return cat?.lessons?.find(l => l.slug === lessonSlug) || null
}

export function getSubjectList(year) {
  const y = getYear(year)
  if (!y) return []
  return Object.entries(y.subjects).map(([slug, data]) => ({ slug, ...data }))
}

export function getCategoryList(year, subject) {
  const s = getSubject(year, subject)
  if (!s || !s.categories) return []
  return Object.entries(s.categories).map(([slug, data]) => ({ slug, ...data }))
}

export function getSubjectChapters(year, subject) {
  const s = getSubject(year, subject)
  return s?.chapters ?? []
}

export function getLessonList(year, subject, category) {
  const cat = getCategory(year, subject, category)
  return cat?.lessons || []
}

export const LESSON_SECTIONS = [
  { slug: 'about-author',  label: 'About Author',  icon: '👤', description: 'Learn about the writer'    },
  { slug: 'text',          label: 'Text',           icon: '📄', description: 'Read the full lesson'      },
  { slug: 'glossary',      label: 'Glossary',       icon: '🔤', description: 'Key words and meanings'    },
  { slug: 'comprehension', label: 'Comprehension',  icon: '💡', description: 'Check your understanding'  },
  { slug: 'practice',        label: 'Practice',        icon: '✍️', description: 'Answer exam questions'         },
  { slug: 'attempt-history', label: 'Attempt History', icon: '🕐', description: 'Your practice session history' },
  { slug: 'ask-ai',          label: 'Ask AI',          icon: '🤖', description: 'Get instant explanations'      },
]

export function getSection(sectionSlug) {
  return LESSON_SECTIONS.find(s => s.slug === sectionSlug) || null
}
