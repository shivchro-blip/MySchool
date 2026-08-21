export default {
  eyebrow: "பாடம் 14 · வகுப்பு 12 கணினி பயன்பாடுகள்",
  title: "திறந்த மூல கருத்துருக்கள்",
  author: "",
  pills: ["கோட்பாடு"],

  tabs: [
    {
      id: "open-source",
      label: "திறந்த மூல மென்பொருள்",
      blocks: [
        { type: "section-head", text: "14.1 அறிமுகம்" },
        { type: "teacher-voice", html: "<p>திறந்த மூல மென்பொருள் (Open Source Software) என்பது அதன் மூல குறியீட்டை (Source Code) பொதுவில் அணுகவும், படிக்கவும், மாற்றியமைக்கவும், மறுபகிர்வு செய்யவும் அனுமதிக்கும் மென்பொருளாகும். இது தனி உரிமை மென்பொருளிலிருந்து (Proprietary Software) வேறுபடுகிறது — தனி உரிமை மென்பொருளின் மூல குறியீடு பொதுவில் கிடைக்காது, மாற்ற அனுமதி இருக்காது.</p>" },
        { type: "gloss-row", word: "திறந்த மூல மென்பொருளின் எடுத்துக்காட்டுகள்", def: "Linux, Ubuntu, MySQL, PDF Creator, Open Office, Trac, GNU/Cash, GIMP, Blender, Audacity, VLC, Mozilla Firefox, Magento, PHP, மற்றும் Android — இவை அனைத்தும் திறந்த மூல மென்பொருளுக்கு எடுத்துக்காட்டுகள்." },
        { type: "gloss-row", word: "திறந்த மூல மென்பொருளை ஆதரிக்கும் நிறுவனங்கள்", def: "GNU (Free Software Foundation), Apache Software Foundation, Linux Foundation, Open Source Initiative, BOSS (Bharat Operating System Solutions), C-DAC (Centre for Development of Advanced Computing) ஆகிய நிறுவனங்கள் திறந்த மூல மென்பொருள் இயக்கத்தை ஆதரிக்கின்றன." },
        { type: "section-head", text: "14.2 திறந்த மூல அனுமதிகள் (Open Source Licenses)" },
        { type: "gloss-row", word: "முக்கிய அனுமதி வகைகள் (Licenses)", def: "Apache License 2.0 — பயன்பாட்டு, மாற்றியமைப்பு, மறுபகிர்வு உரிமைகளை வழங்குகிறது. BSD 3-Clause ('New' or 'Revised') License — குறைந்த கட்டுப்பாடுகளுடன் மறுபகிர்வை அனுமதிக்கிறது. BSD 2-Clause ('Simplified' or 'FreeBSD') License — இன்னும் எளிமையான வடிவம். GNU General Public License (GPL) — மாற்றியமைக்கப்பட்ட பதிப்புகளும் திறந்த மூலமாகவே இருக்க வேண்டும் என வலியுறுத்தும் அனுமதி." },
        { type: "think-box", label: "Owner, Contributor & User", text: "திறந்த மூல திட்டங்களில் (OSS Project) மூன்று முக்கியப் பங்குதாரர்கள்: Owner (உரிமையாளர் — மூல திட்டத்தை உருவாக்கியவர்), Contributor (பங்களிப்பாளர் — குறியீட்டை மேம்படுத்துபவர்), User (பயனர் — மென்பொருளைப் பயன்படுத்துபவர்). அனுமதி வகையைப் பொறுத்து, இவர்களுக்கிடையேயான உரிமைகள் மற்றும் கடமைகள் வேறுபடும்." }
      ]
    },
    {
      id: "simulation-tools",
      label: "NS2 & OpenNMS",
      blocks: [
        { type: "section-head", text: "14.2 Network Simulation Tool (NS2)" },
        { type: "teacher-voice", html: "<p>Network Simulator என்பது கணினி வலையமைப்பின் செயல்பாட்டை மாதிரியாகக் காட்டும் மென்பொருள் ஆகும் — Router, Node, Switch, Access Point, Link போன்ற வலையமைப்புக் கூறுகளின் நடத்தையை உண்மையாக செயல்படுத்தாமலேயே ஆய்வு செய்ய உதவுகிறது.</p>" },
        { type: "gloss-row", word: "NS2 (Network Simulator Version 2)", def: "NS2 என்பது ஒரு திறந்த மூல வலையமைப்பு உருவகப்படுத்தல் (Simulation) கருவி — OTCL மற்றும் C++ ஆகிய இரு நிரலாக்க மொழிகளைப் பயன்படுத்தி உருவாக்கப்பட்டது." },
        { type: "gloss-row", word: "Trace File", def: "Network Simulator-ல், உருவகப்படுத்தலின் போது நடைபெறும் நிகழ்வுகளை தொடர்ந்து பதிவு செய்யும் கோப்பு — பின்னர் இதன் மூலம் வலையமைப்பின் செயல்திறனை பகுப்பாய்வு செய்யலாம்." },
        { type: "section-head", text: "14.3 Open NMS (Open Network Management System)" },
        { type: "teacher-voice", html: "<p>Open NMS என்பது ஒரு திறந்த மூல வலையமைப்பு நிர்வாக அமைப்பாகும் — FCAPS (Fault, Configuration, Accounting, Performance and Security) அளவுகோள்களின்படி வலையமைப்பு நிர்வாகச் செயல்பாடுகளை வழங்குகிறது.</p>" },
        { type: "gloss-row", word: "FCAPS", def: "Fault (பிழை நிர்வாகம்), Configuration (அமைவடிவ நிர்வாகம்), Accounting (கணக்கியல்), Performance (செயல்திறன்), Security (பாதுகாப்பு) — இந்த ஐந்து அளவுகோள்களின் அடிப்படையில் OpenNMS வலையமைப்பை நிர்வகிக்கிறது." },
        { type: "gloss-row", word: "Discovery Engine", def: "OpenNMS-ல் உள்ள Discovery Engine, வலையமைப்பில் இணைக்கப்பட்டுள்ள சாதனங்களை தானாகவே கண்டறிந்து, தொடர்ந்து கண்காணிப்பதற்கான பட்டியலில் சேர்க்கிறது." },
        { type: "section-head", text: "14.4 திறந்த மூல மென்பொருள் நன்மைகள்" },
        { type: "teacher-voice", html: "<p>திறந்த மூல மென்பொருள் (எ.கா. OpenNMS போன்றவை) IT சூழல் அமைப்புகளின் கண்காணிப்பு (Monitoring), அறிவிப்பு (Notification), மற்றும் மேலாண்மை (Management) பணிகளுக்கு பரவலாகப் பயன்படுத்தப்படுகின்றன — நிகழ்வு மேலாண்மை அறிவிப்புகள் (Event Management Notifications) மூலம் நிர்வாகிகள் உடனுக்குடன் பிரச்சினைகளை அறிந்துகொள்ள முடிகிறது.</p>" },
        { type: "think-box", label: "நினைவில் கொள்க", text: "திறந்த மூல மென்பொருள் மூல குறியீட்டை பொதுவில் அணுகவும், மாற்றவும் அனுமதிக்கும். OpenNMS முதன்மையாக வலையமைப்பு கண்காணிப்புக்குப் பயன்படும். Trace File என்பது Network Simulator-ல் பதிவு செய்யப்பட்ட நிகழ்வுகளின் கோப்பு. FCAPS = Fault, Configuration, Accounting, Performance, Security. GNU/GPL = GNU General Public License. API = Application Program Interface." }
      ]
    }
  ]
}
