export default {
  chapterNumber: 14,
  title: "பைத்தானில் C++ நிரல்களை தருவித்தல்",
  subject: "கணினி அறிவியல்",
  classLabel: "வகுப்பு 12",
  curriculum: "சமச்சீர் கல்வி",

  sections: [
    {
      id: "intro-python-vs-cpp",
      title: "Scripting மொழிகள் & Python vs C++",
      content: `**14.2 Scripting மொழி**

Scripting மொழி என்பது ஒரு இயங்குதளத்தால் நேரடியாக இயக்கப்படும், விளக்கம் (Interpreted) வடிவில் இயங்கும் மொழியாகும் — நிரலாக்கத் தொகுப்பு (Compile) படி தேவைப்படாமல் நேரடியாக இயக்கப்படும்.

**14.2.1 Scripting மொழிகளின் பயன்பாடுகள்**

1. திரும்பத் திரும்ப நடைபெறும் பணிகளை தானியங்கியாக்குதல்.
2. சிக்கலான பணிகளை எளிதாக்குதல்.
3. வெவ்வேறு பயன்பாடுகளை ஒன்றிணைத்தல்.
4. விரைவான முன்மாதிரி (Prototyping) உருவாக்கம்.

**14.3 C++ மற்றும் Python — ஒப்பீடு**

- C++ நிலையான தரவு வகைப்படுத்தல் (Statically Typed) கொண்டது — மாறியின் தரவு வகை நிரல் தொகுக்கும்போதே (Compile time) தீர்மானிக்கப்படும்.
- C++ நினைவகச் சார்ந்த நிரலாக்கத்தை நேரடியாகக் கையாளும்; Python தானியங்கி நினைவகச் சேமிப்பு நீக்கத்தை (Garbage Collection) தானாகவே செய்யும்.
- Python-ன் மையக் கருத்தியல் நிரலாக்க எளிமை; C++-ன் மையக் கருத்தியல் செயல்திறன் மற்றும் நினைவக கட்டுப்பாடு.

**14.3.1 C++ மற்றும் Python இணைக்கும் கருவிகள்**

- **Python C API (Application Programming Interface):** C அல்லது C++ கருவிகளுடன் இணைக்கும்.
- **Ctypes:** C-நூலகங்களைப் பயன்படுத்த உதவும்.
- **SWIG (Simplified Wrapper Interface Generator):** C/C++ இணைப்புகளை உருவாக்கும் கருவி.
- **Cython:** C-அடிப்படையிலான வேகமான Python குறியீட்டை உருவாக்கும்.
- **Boost.Python:** C++-க்கும் Python-க்கும் இடையேயான இணைப்பை வழங்கும் நூலகம் (GNU).`,
      nav: { next: "wrapping-mingw", nextLabel: "அடுத்து: MinGW & C++ கோப்பினை Compile செய்தல் →" }
    },
    {
      id: "wrapping-mingw",
      title: "MinGW & C++ கோப்பினை Compile செய்தல்",
      content: `**14.3.1 MinGW**

MinGW-W64 (MinGW-ன் புதிய பதிப்பு) Windows-க்கு C++ கம்பைலரையும் தொடர்புடைய கருவிகளையும் வழங்குகிறது — இதைப் பயன்படுத்தி C++ நிரல்களை Python-ல் இணைக்கலாம்.

**g++ கம்பைலர்:** GCC (GNU Compiler Collection)-ன் ஒரு பகுதியான g++ கருவியைப் பயன்படுத்தி C++ கோப்பை .exe கோப்பாக Compile செய்யலாம்.

**14.3.2 நிரலை இயக்கத் தயார் செய்தல்**

1. Command Prompt-ஐ திறக்க வேண்டும்.
2. cd கட்டளையைப் பயன்படுத்தி directory-ஐ மாற்ற வேண்டும்.
3. C++ கோப்பினை Compile செய்ய வேண்டும் (python.exe C++ கோப்பினை Wrap செய்யும்).

\`\`\`
C:\\calculator path> g++ pali.cpp -o pali.exe
\`\`\`

இதன் மூலம் pali.cpp கோப்பு pali.exe என்ற இயங்கக்கூடிய கோப்பாக மாற்றப்படுகிறது.`,
      nav: { back: "intro-python-vs-cpp", next: "modules-sys-os-getopt", nextLabel: "அடுத்து: sys, os, getopt தொகுதிகள் →" }
    },
    {
      id: "modules-sys-os-getopt",
      title: "sys, os, getopt தொகுதிகள்",
      content: `**14.4 தொகுதிகள் (Modules)**

Python-ன் sys, os, getopt போன்ற உள்ளமைந்த தொகுதிகள் C++ நிரலை Python-டன் இணைக்க உதவுகின்றன.

**14.4.1 sys தொகுதி**

sys தொகுதி கட்டளை வரி அளபுருக்களை (command-line arguments) கையாள உதவும்.

\`\`\`
import sys
if __name__ == '__main__':
    main(sys.argv[1:])
\`\`\`

- \`sys.argv[0]\` — Script-ன் பெயர்.
- \`sys.argv[1]\` — முதல் அளபுரு (argument).

**14.4.2 os தொகுதி**

\`\`\`
os.getcwd()   # நடப்பு directory-ஐ திருப்பித் தரும்
os.chdir()    # directory-ஐ மாற்றும்
os.system()   # OS கட்டளையை நேரடியாக இயக்கும்
\`\`\`

\`\`\`
os.system('g++ ' + inp_file + ' -o ' + exe_file)
os.system(exe_file)
\`\`\`

**14.5 getopt தொகுதி**

getopt தொகுதி, கட்டளை வரியில் கொடுக்கப்படும் அளபுருக்களைப் பாகுபடுத்த (Parse) பயன்படும்.

\`\`\`
getopt.getopt(args, options, [long_options])
\`\`\`

- \`args\` — கட்டளை வரியில் கொடுக்கப்படும் அளபுருக்களின் பட்டியல்.
- \`options\` — single character options (எ.கா. 'i:').
- \`long_options\` — full name options.

\`\`\`
opts, args = getopt.getopt(sys.argv[1:], "hi:o:", ["ifile=", "ofile="])
\`\`\``,
      nav: { back: "wrapping-mingw", next: "executing-cpp-errors", nextLabel: "அடுத்து: முழுமையான எடுத்துக்காட்டு →" }
    },
    {
      id: "executing-cpp-errors",
      title: "C++ நிரலை Python மூலம் இயக்குதல் — முழுமையான எடுத்துக்காட்டு",
      content: `**14.7 பாலிண்ட்ரோம் (Palindrome) சரிபார்ப்பு — C++ & Python இணைப்பு**

**C++ நிரல் (pali.cpp):**

\`\`\`cpp
#include<iostream.h>
using namespace std;
int main()
{
    int n, sum, digit, rev = 0;
    cout << "Enter a positive number: ";
    cin >> n;
    int num = n;
    while(num) {
        digit = num % 10;
        rev = (rev * 10) + digit;
        num = num / 10;
    }
    cout << "The reverse of the number is: " << rev << endl;
    if(n == rev)
        cout << "The number is a palindrome";
    else
        cout << "The number is not a palindrome";
    return 0;
}
\`\`\`

**Python Wrapper நிரல் (pyg.py):**

\`\`\`python
import sys, os, getopt

def main(argv):
    opts, args = getopt.getopt(argv, "i:")
    for o, a in opts:
        if o == '-i':
            run(a)

def run(a):
    inp_file = a + '.cpp'
    exe_file = a + '.exe'
    os.system('g++ ' + inp_file + ' -o ' + exe_file)
    os.system(exe_file)

if __name__ == '__main__':
    main(sys.argv[1:])
\`\`\`

**இயக்குதல்:**
\`\`\`
C:\\Users\\DellX>python pyg.py -i pali
Enter a positive number: 56763
The reverse of the number is: 36765
The number is a palindrome
\`\`\`

**இயக்குதல் (இரண்டாம் எடுத்துக்காட்டு):**
\`\`\`
C:\\Users\\DellX>python pyg.py -i pali
Enter a positive number: 56758
The reverse of the number is: 85765
The number is not a palindrome
\`\`\`

Python getopt() மூலம் \`-i\` அளபுருவைப் பெற்று, அந்த பெயருடைய .cpp கோப்பை g++ கம்பைலர் மூலம் compile செய்து, பிறகு உருவான .exe கோப்பை os.system() மூலம் இயக்குகிறது — இதுவே C++ நிரலை Python மூலம் "wrap" செய்து இயக்கும் அடிப்படை நுட்பமாகும்.`,
      nav: { back: "modules-sys-os-getopt", next: "summary", nextLabel: "அடுத்து: நினைவில் கொள்க →" }
    },
    {
      id: "summary",
      title: "நினைவில் கொள்க",
      content: `- Scripting மொழி நேரடியாக இயக்கப்படும், Interpreted வடிவில் செயல்படும் மொழி.
- C++ Statically Typed மொழி; Python Garbage Collection மூலம் நினைவகத்தை தானாக நிர்வகிக்கும்.
- Python C API, Ctypes, SWIG, Cython, Boost.Python ஆகியவை C++-ஐ Python-டன் இணைக்கும் கருவிகள்.
- MinGW/g++ மூலம் C++ கோப்பை .exe ஆக Compile செய்யலாம்.
- sys தொகுதி கட்டளை வரி அளபுருக்களைக் கையாளும்; os தொகுதி இயங்குதள கட்டளைகளை இயக்கும்; getopt தொகுதி கட்டளை வரி அளபுருக்களைப் பாகுபடுத்தும்.
- os.system() மூலம் ஒரு .exe கோப்பை Python நிரலிலிருந்தே இயக்கலாம்.`,
      nav: { back: "executing-cpp-errors", practice: true }
    },
  ],
}
