export default {
  eyebrow: "பாடம் 9 · வகுப்பு 12 கணினி பயன்பாடுகள்",
  title: "PHP-உடன் MySQL-ஐ இணைத்தல்",
  author: "",
  pills: ["கோட்பாடு", "செய்முறை"],

  tabs: [

    // ─────────────────────────────────────────────────────────
    // TAB 1 — MySQLi செயற்கூறுகள்
    // ─────────────────────────────────────────────────────────
    {
      id: "mysqli-functions",
      label: "MySQLi செயற்கூறுகள்",
      blocks: [
        {
          type: "section-head",
          text: "9.1 PHP-இல் MySQL செயல்படுதல்",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP-ஐ MySQLᅳஉடன் இணைத்து ஒரு தரவுதளத்துடன் தொடர்பு கொள்ள MySQLi (MySQL Improved) செயற்கூறுகள் பயன்படுத்தப்படுகின்றன. MySQLi PHP-ன் பதிப்பு 5.0-ல் அறிமுகப்படுத்தப்பட்டது.</p>",
        },
        {
          type: "section-head",
          text: "9.1.1 mysqli_connect() Function",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP-ஐ MySQL தரவுதளத்துடன் இணைக்க mysqli_connect() செயற்கூறு பயன்படுத்தப்படுகிறது. இதற்கு நான்கு அளபுருக்கள் தேவை: சேவையக பெயர், பயனர் பெயர், கடவுச்சொல், தரவுதள பெயர்.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "mysqli_connect('Server Name', 'User Name', 'Pass Word', 'DB Name');",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "<?php $servername = 'localhost'; $username = 'username'; $password = 'password'; $DB_Name = 'school_DB'; $conn = mysqli_connect($servername, $username, $password, $DB_Name); if (!$conn) { die('Connection failed: ' . mysqli_connect_error()); } echo 'Connected successfully'; ?>",
        },
        {
          type: "section-head",
          text: "9.1.2 தரவுதள இணைப்பை மூடுதல்",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP மற்றும் MySQL இணைப்பை மூடி, ஒதுக்கப்பட்ட வளங்களை (resources) விடுவிக்க mysqli_close() செயற்கூறு பயன்படுத்தப்படுகிறது. இதற்கு ஒரே ஒரு அளபுரு மட்டும் — இணைப்புப் பொருள் (Connection Object) — தேவை.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "mysqli_close('Connection Object');",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "<?php mysqli_close($conn); ?>",
        },
        {
          type: "section-head",
          text: "9.1.3 வினவல்களை இயக்குதல் (Executing Queries)",
        },
        {
          type: "teacher-voice",
          html: "<p>MySQL தரவுதளத்தில் SQL வினவலை (Query) இயக்க mysqli_query() செயற்கூறு பயன்படுத்தப்படுகிறது. இதற்கு இரண்டு அளபுருக்கள் தேவை: இணைப்புப் பொருள் மற்றும் SQL வினவல்.</p>",
        },
        {
          type: "gloss-row",
          word: "கட்டளை அமைப்பு (Syntax)",
          def: "mysqli_query('Connection Object', 'SQL query.');",
        },
        {
          type: "gloss-row",
          word: "எடுத்துக்காட்டு",
          def: "$conn=mysqli_connect('localhost','my_user','my_password','Student_DB'); $sq='SELECT student_name,student_age FROM student'; mysqli_query($conn,$sq);",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // TAB 2 — முழுமையான எடுத்துக்காட்டு
    // ─────────────────────────────────────────────────────────
    {
      id: "full-example",
      label: "முழுமையான எடுத்துக்காட்டு",
      blocks: [
        {
          type: "section-head",
          text: "9.1.4 இணைப்பை மூடுதல்",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP மற்றும் MySQL தரவுதள இணைப்பை மூட மீண்டும் mysqli_close() பயன்படுத்தப்படுகிறது.</p>",
        },
        {
          type: "gloss-row",
          word: "முழுமையான PHP MySQL எடுத்துக்காட்டு",
          def: "<?php $servername='localhost'; $username='username'; $password='password'; $dbname='school_DB'; $connection = mysqli_connect($servername,$username,$password,$dbname); if(mysqli_connect_errno()) { echo 'Failed to connect to MySQL: ' . mysqli_connect_error(); } $sql_stmt='SELECT * FROM my_contacts'; //SQL select query $result=mysqli_query($connection,$sql_stmt); //Execute the SQL statement $rows=mysqli_num_rows($result); // get number of rows returned if($rows){ while($row=mysqli_fetch_array($result)){ echo 'ID: '.$row['id'].'<br>'; echo 'Email: '.$row['email'].'<br>'; echo 'City: '.$row['city'].'<br>'; echo 'Country: '.$row['country'].'<br>'; } } mysqli_close($connection); //close the database connection ?>",
        },
        {
          type: "think-box",
          label: "⭐ முக்கியச் செயற்கூறுகள் சுருக்கம்",
          text: "mysqli_connect() — MySQL தரவுதளத்துடன் இணைக்க (4 அளபுருக்கள்). mysqli_query() — SQL வினவலை இயக்க (2 அளபுருக்கள்). mysqli_close() — இணைப்பை மூட (1 அளபுரு). mysqli_fetch_array() — வினவலின் முடிவுகளை ஒரு வரிசையாகப் பெற. mysqli_num_rows() — திரும்பக் கிடைத்த வரிசைகளின் எண்ணிக்கையைப் பெற.",
        },
        {
          type: "teacher-voice",
          html: "<p>PHP மற்றும் MySQL பயன்படுத்தி Facebook Technology செய்யப்படும் பயன்பாடுகள்: பயனர் நுழைவு பட்டன்கள் (Login Forms), தேடல் பட்டைகள் (Search bars), தரவுத்தளங்களை நிர்வகிக்கும் நிர்வாக பேனல்கள் (Admin Panels), பயனர் பதிவு மற்றும் நுழைவு அமைப்புகள் (Registration & Login Systems) போன்றவை.</p>",
        },
        {
          type: "think-box",
          label: "நினைவில் கொள்க",
          text: "PHP மற்றும் MySQL — வலைப் பயன்பாட்டுத் தரவுத்தளத்தை நிர்வகிக்கும் இணைப்பு. mysqli_connect() — தரவுதளத்துடன் இணைப்பை நிறுவும் செயற்கூறு (Login Form அமைப்புகளில் பயன்படும் — Server-side validation). mysqli_query() — SQL வினவலை இயக்கும் செயற்கூறு (பயனர் பெயர் மற்றும் கடவுச்சொல் போன்ற தரவை தரவுதளத்திலிருந்து சரிபார்க்க பயன்படும்).",
        },
      ],
    },
  ],
}
