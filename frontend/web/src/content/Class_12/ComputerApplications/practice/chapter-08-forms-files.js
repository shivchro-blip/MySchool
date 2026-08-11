// frontend/web/src/content/Class_12/ComputerApplications/practice/chapter-08-forms-files.js

export default {
  meta: {
    subject: `Computer Applications -- Class XII`,
    unit: `Chapter 8 -- Forms and Files`,
    time: `3.00 hrs`,
    totalMarks: 47,
    instructions: `Samacheer Kalvi -- Answer all questions`,
  },

  parts: [
    {
      id: `p1`,
      navLabel: `Part I -- MCQ (20 x 1)`,
      title: `Part I -- Objective Type`,
      type: `mcq`,
      scoreMax: 20,
      marksPer: 1,
      sections: [
        {
          label: `Forms and Files`,
          questions: [
            {
              id: `q1`,
              html: `What are HTML forms used for?`,
              options: [`a) To collect input from users`, `b) To create server-side programming language`, `c) To create a database`, `d) To send emails`],
              answer: 0,
              hint: `The main objective of HTML forms is to collect input data from users, which is then sent to the server for processing using PHP.`,
            },
            {
              id: `q2`,
              html: `Which of the following is NOT a form control available in HTML forms?`,
              options: [`a) Text inputs`, `b) Buttons`, `c) Checkboxes`, `d) Cropping Tool`],
              answer: 3,
              hint: `Cropping Tool is a PageMaker tool, not an HTML form control. HTML form controls include: Text inputs, Radio box, Buttons, File Select, Checkbox, Form Tag.`,
            },
            {
              id: `q3`,
              html: `Which tag is used to create an HTML form?`,
              options: [`a) form`, `b) input`, `c) textarea`, `d) select`],
              answer: 0,
              hint: `The <form> tag is used to create an HTML form. It contains the action and method attributes that control how data is sent.`,
            },
            {
              id: `q4`,
              html: `What form control allows the user to select multiple values?`,
              options: [`a) text inputs`, `b) buttons`, `c) checkboxes`, `d) radio buttons`],
              answer: 2,
              hint: `Checkboxes allow selection of MORE THAN ONE value. Radio buttons allow only ONE value at a time.`,
            },
            {
              id: `q5`,
              html: `What form control allows the user to select only one value at a time?`,
              options: [`a) text inputs`, `b) buttons`, `c) checkboxes`, `d) radio buttons`],
              answer: 3,
              hint: `Radio buttons allow only ONE value to be selected at a time — like selecting a gender option (Male OR Female, not both).`,
            },
            {
              id: `q6`,
              html: `What is the purpose of validation in PHP?`,
              options: [`a) To check the input data submitted by the user from the client machine`, `b) To display data to users`, `c) To store data on the server`, `d) To send data to the client`],
              answer: 0,
              hint: `Validation checks the input data submitted by the user from the client machine — it ensures data is correct, complete, and secure.`,
            },
            {
              id: `q7`,
              html: `How many types of validation are available in PHP?`,
              options: [`a) One`, `b) Two`, `c) Three`, `d) Four`],
              answer: 1,
              hint: `There are TWO types: Client-Side Validation (browser/JavaScript) and Server-Side Validation (PHP/ASP/JSP on server).`,
            },
            {
              id: `q8`,
              html: `Which PHP function can be used to open a file?`,
              options: [`a) fopen()`, `b) fread()`, `c) fclose()`, `d) fwrite()`],
              answer: 0,
              hint: `fopen() opens a file. fread() reads, fclose() closes, fwrite() writes to a file.`,
            },
            {
              id: `q9`,
              html: `What PHP function can be used to read a file?`,
              options: [`a) fopen()`, `b) fread()`, `c) fclose()`, `d) fwrite()`],
              answer: 1,
              hint: `fread() reads from an open file. It takes the file object (from fopen) and the filesize as parameters.`,
            },
            {
              id: `q10`,
              html: `What PHP function can be used to close a file?`,
              options: [`a) fopen()`, `b) fread()`, `c) fclose()`, `d) fwrite()`],
              answer: 2,
              hint: `fclose() closes an open file. Always close files after use to free server resources.`,
            },
            {
              id: `q11`,
              html: `With the POST method, where is the input data stored?`,
              options: [`a) In the URL`, `b) In the request body of the HTTP request`, `c) In a cookie`, `d) In a session variable`],
              answer: 1,
              hint: `POST method stores data in the REQUEST BODY — it is not visible in the URL. This makes POST more secure than GET.`,
            },
            {
              id: `q12`,
              html: `With the GET method, how is input data sent?`,
              options: [`a) In the request body`, `b) In a cookie`, `c) Via URL as a query string`, `d) In a session`],
              answer: 2,
              hint: `GET sends data via the URL as a query string. It is visible to the user after clicking Submit.`,
            },
            {
              id: `q13`,
              html: `Which PHP variable collects data sent via the POST method?`,
              options: [`a) $_GET`, `b) $_POST`, `c) $_SESSION`, `d) $_FORM`],
              answer: 1,
              hint: `$_POST collects data sent via the POST method. $_GET collects data sent via the GET method.`,
            },
            {
              id: `q14`,
              html: `Client-side validation is performed using:`,
              options: [`a) PHP on the server`, `b) JavaScript in the browser or HTML 'required' attribute`, `c) MySQL database`, `d) Apache web server`],
              answer: 1,
              hint: `Client-side validation uses JavaScript or the HTML 'required' attribute in the browser, BEFORE sending data to the server.`,
            },
            {
              id: `q15`,
              html: `Which PHP function is used to write to a file?`,
              options: [`a) fopen()`, `b) fread()`, `c) fclose()`, `d) fwrite()`],
              answer: 3,
              hint: `fwrite() writes content to a file. The file must be opened in write mode first using fopen().`,
            },
            {
              id: `q16`,
              html: `The 'action' attribute in a form tag specifies:`,
              options: [
                `a) The method (POST or GET) for sending data`,
                `b) The backend PHP script file that processes the form data`,
                `c) The style of the form`,
                `d) The size of the text input`,
              ],
              answer: 1,
              hint: `The 'action' attribute specifies the URL/filename of the PHP script that processes the submitted form data. Example: action="welcome.php"`,
            },
            {
              id: `q17`,
              html: `How many parameters does the fopen() function require?`,
              options: [`a) 1`, `b) 2`, `c) 3`, `d) 4`],
              answer: 1,
              hint: `fopen() requires 2 parameters: the filename and the mode (r = read, w = write, a = append, etc.).`,
            },
            {
              id: `q18`,
              html: `Which HTML attribute is used to add client-side validation to an input field to make it required?`,
              options: [`a) validate`, `b) mandatory`, `c) required`, `d) must-fill`],
              answer: 2,
              hint: `The 'required' attribute in HTML input tags shows "Please fill in this field" if the user tries to submit without filling it.`,
            },
            {
              id: `q19`,
              html: `File Select form control is used to:`,
              options: [
                `a) Select multiple files at once`,
                `b) Select one file from the local machine to upload to the server`,
                `c) Display a file on the web page`,
                `d) Delete a file from the server`,
              ],
              answer: 1,
              hint: `File Select allows selecting ONE file from the local machine to upload to the server machine at a time.`,
            },
            {
              id: `q20`,
              html: `Server-side validation is performed using:`,
              options: [`a) JavaScript in the browser`, `b) HTML required attribute`, `c) PHP, ASP, or JSP on the server`, `d) CSS on the client`],
              answer: 2,
              hint: `Server-side validation is performed AFTER form submission, on the server, using PHP, ASP, or JSP. It is more secure than client-side validation.`,
            },
          ],
        },
      ],
    },

    {
      id: `p2`,
      navLabel: `Part II -- Short Answers (5 x 2)`,
      title: `Part II -- Short Answer Questions`,
      type: `short-essay`,
      scoreMax: 10,
      marksPer: 2,
      questions: [
        {
          q: `What is the main objective of PHP and HTML form controls?`,
          ans: `The main objective of PHP and HTML form controls is to collect data from users. In web development, users access websites from remote client machines and feed data to the server. This data is collected via HTML form controls like textbox, dropdown box, radio button, and checkbox, and sent to the server using server-side programming like PHP. The server then processes this data and sends back a response to the client's browser.`,
        },
        {
          q: `What are the basic HTML form controls available?`,
          ans: `The following 6 controls are available in HTML forms: 1. Text inputs — contains textbox (single line) and textarea (multi-line) controls. 2. Radio box — allows selection of only one value at a time. 3. Buttons — includes Submit (sends data), Reset (clears form), and Cancel buttons. 4. File Select — allows selecting one file from the local machine to upload to the server. 5. Checkbox — allows selection of more than one value. 6. Form Tag — specifies the method (POST/GET) and action (PHP file) for the form.`,
        },
        {
          q: `How are data collected via HTML form controls sent to the server?`,
          ans: `When the user fills in data in HTML form controls and clicks the Submit button, a request is generated and reaches the PHP file mentioned in the form tag's action attribute. All input values are sent to the server via either POST method or GET method. POST method stores data in the request body (not visible in URL). GET method sends data via the URL as a query string (visible to user). Once data reaches the server, PHP variables $_POST and $_GET collect the data and prepare the response.`,
        },
        {
          q: `What is Validation in PHP?`,
          ans: `Validation is a process of checking the input data submitted by the user from the client machine. It is important to protect forms from hackers and spammers, and to ensure that the data received is correct and complete. Validation rules for HTML input fields: Name must contain letters and white-spaces. Email must contain @ and . strings. Website must contain a valid URL. Radio, Checkbox, and Dropdown must have at least one value selected.`,
        },
        {
          q: `What are the two types of validation available in PHP?`,
          ans: `There are two types of validation available in PHP: 1. Client-Side Validation — performed on the client machine's web browser using JavaScript or the HTML 'required' attribute. This is done before sending data to the server. Example: adding 'required' attribute to an input tag. 2. Server-Side Validation — performed on the server AFTER data is submitted using PHP, ASP, or JSP. This is more secure because it cannot be bypassed by disabling JavaScript in the browser.`,
        },
      ],
    },

    {
      id: `p3`,
      navLabel: `Part III -- Brief Answers (3 x 3)`,
      title: `Part III -- Brief Answer Questions`,
      type: `short-essay`,
      scoreMax: 9,
      marksPer: 3,
      questions: [
        {
          q: `Explain the difference between checkbox and radio button in HTML forms.`,
          ans: `Checkbox and Radio button are both form controls in HTML, but they differ in how many values can be selected:\n\nCheckbox: Allows the user to select MORE THAN ONE value at a time. Each checkbox is independent. Example: Selecting hobbies — a user can check Reading, Swimming, AND Gaming all at once.\n\nRadio Button: Similar to checkbox but allows selection of ONLY ONE value at a time within a group. Selecting one radio button automatically deselects the others in the same group. Example: Selecting gender — a user can select either Male OR Female, not both.\n\nKey difference: Checkbox = multiple selection possible. Radio button = only one selection at a time.`,
        },
        {
          q: `Explain the difference between the POST method and GET method of sending data to the server in PHP.`,
          ans: `POST Method:\n- Input data is stored in the REQUEST BODY of the client's HTTP request.\n- Data is NOT visible in the URL.\n- More secure — suitable for sensitive data like passwords.\n- No size limit on data.\n- PHP collects it using $_POST["fieldname"].\n\nGET Method:\n- Input data is sent via the URL address as a query string.\n- Data IS VISIBLE in the URL after the user clicks Submit.\n- Less secure — not suitable for passwords.\n- Has size limitations (URL length limit).\n- PHP collects it using $_GET["fieldname"].\n\nExample: form action="welcome.php" method="post" sends data invisibly. method="get" would show data in the URL like: welcome.php?name=sethuraman&email=abc@gmail.com`,
        },
        {
          q: `What are the different file handling tasks that can be performed using PHP?`,
          ans: `PHP supports the following 6 file handling tasks:\n1. PHP Open a File — fopen() function opens a file on the server. Parameters: filename and mode (r=read, w=write). Syntax: $file = fopen("FileName", "mode") or die("Error!");\n2. PHP Read a File — fread() function reads content from an open file. Syntax: fread($file_Object, filesize("FileName"));\n3. PHP Close a File — fclose() function closes an opened file. Always close after use. Syntax: fclose($file_Object);\n4. PHP Write a File — fwrite() function writes content to a file. Syntax: fwrite($myfile, $txt);\n5. PHP Append a File — adds content to the end of an existing file without deleting existing content.\n6. PHP Upload a File — allows users to upload files from their local machine to the server via an HTML form.`,
        },
      ],
    },

    {
      id: `p4`,
      navLabel: `Part IV -- Long Essays (2 x 4)`,
      title: `Part IV -- Detailed Answer Questions`,
      type: `long-essay`,
      scoreMax: 8,
      marksPer: 4,
      questions: [
        {
          q: `Discuss in detail about HTML form controls.`,
          ans: `HTML form controls are used to collect data from users in web applications. The main objective is to allow users to enter and submit data which is then processed by a server-side program like PHP.\n\nThe following 6 form controls are available:\n\n1. Text Inputs — Contains textbox (single line input) and textarea (multi-line input) controls. Used for entering names, email addresses, messages, etc.\n\n2. Radio Box — Allows the user to select ONLY ONE value at a time from a group. Selecting one automatically deselects the others. Example: selecting Male or Female.\n\n3. Buttons — Three types: Submit button (sends form data to server), Reset button (clears all form entries), and Cancel button (cancels the operation).\n\n4. File Select — Allows the user to select ONE file from their local machine to upload to the server. Best feature for file upload functionality.\n\n5. Checkbox — An important feature that allows selection of MORE THAN ONE value at a time. Example: selecting multiple hobbies or interests.\n\n6. Form Tag — Not visible to the user but very important. Controls the entire form. Contains: action attribute (specifies the PHP file that processes the data), method attribute (POST or GET), and enctype attribute (how data is encoded before sending).\n\nPHP collects form data using: $_POST["fieldname"] for POST method, $_GET["fieldname"] for GET method.`,
        },
        {
          q: `Explain in detail the File handling functions in PHP.`,
          ans: `File handling is an important part of web application development. PHP provides built-in functions to perform all file operations.\n\nThe 6 file handling tasks and their functions:\n\n1. PHP Open a File — fopen() function:\nUsed to open a file on the server. Has TWO parameters: filename and mode.\nSyntax: $file_Object = fopen("FileName", "mode") or die("Error Message!");\nExample: $myfile = fopen("Student.txt", "r") or die("Unable to open file!");\nModes: r (read), w (write, creates if not exists), a (append), r+ (read and write).\n\n2. PHP Read a File — fread() function:\nReads content from an open file. The file object comes from fopen().\nSyntax: fread($file_Object, filesize("FileName"));\nExample: fread($myfile, filesize("Student.txt"));\n\n3. PHP Close a File — fclose() function:\nCloses an opened file. Always close files after use to free server memory.\nSyntax: fclose($file_Object);\nExample: fclose($myfile);\n\n4. PHP Write a File — fwrite() function:\nWrites a string of content to a file.\nSyntax: fwrite($myfile, $txt);\nThe file must be opened in write mode (w or a) first.\n\n5. PHP Append a File:\nAdds content to the END of an existing file without deleting current content.\nOpen with mode "a" (append) in fopen(), then use fwrite().\n\n6. PHP Upload a File:\nA PHP script combined with an HTML form allows users to upload files to the server.\nThe enctype="multipart/form-data" attribute must be added to the form tag for file uploads.`,
        },
      ],
    },
  ],
}
