export default {
  chapterNumber: 5,
  title: "Working with Windows Operating System",
  subject: "Computer Science",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro-windows",
      title: "Introduction to Windows Operating System",
      content: `**5.1 Introduction to Operating System**

An Operating System (OS) is a system software that enables the hardware to communicate and operate with other software. It also acts as an interface between the user and the hardware, and controls the overall execution of the computer. Important functions of an OS include Memory Management, Process Management, Device Management, File Management, Security Management, and controlling overall system performance.

**5.2 Introduction to Windows Operating System**

Every computer needs an Operating System to function. Microsoft Windows is one of the most popular Graphical User Interface (GUI) operating systems. Multiple applications can execute simultaneously in Windows — this is known as **Multitasking**. Windows uses both the keyboard and mouse as input devices — the mouse is used to interact with Windows by clicking icons, while the keyboard is used to enter alphabets, numerals, and special characters.

**Functions of the Windows Operating System:**
- Access applications (programs) on the computer (word processing, games, spreadsheets, calculators, and so on).
- Load any new program on the computer.
- Manage hardware such as printers, scanners, mouse, digital cameras, etc.
- File management activities (creating, modifying, saving, deleting files and folders).
- Change computer settings such as colour scheme and screen savers.

**5.3 Various Versions of Windows** (selected milestones)
- **Windows 1.x (1985):** Introduced GUI in a 16-bit processor; mouse introduced as an input device.
- **Windows 2.x (1987):** Supported minimizing/maximizing windows; introduced the Control Panel.
- **Windows 3.x (1992):** Introduced multitasking; supported 256 colours for a more modern look.
- **Windows NT (1993):** Designed to act as a server in a network.
- **Windows 95 (1995):** Introduced the Start button, taskbar, Windows Explorer, and Start menu; used a 32-bit processor with a focus on multitasking.
- **Windows 98 (1998):** Integrated the Web browser (Internet Explorer) with the OS; DOS gaming began disappearing as Windows-based games improved.
- **Windows Me (2000):** Introduced Plug and Play, automated system diagnostics, and recovery tools.
- **Windows 2000:** Served as an OS for business desktops/laptops; released as Professional, Server, Advanced Server, and Data Centre Server editions.
- **Windows XP (2001):** Introduced the 64-bit Processor; improved appearance with themes; offered a stable version.
- **Windows Vista (2006):** Updated the look and feel of Windows.
- **Windows 7 (2009):** Improved booting time; introduced Aero Peek, pinning programs to the taskbar, handwriting recognition, and Internet Explorer 8.
- **Windows 8 (2012):** Faster than previous versions; the Start button was removed; took better advantage of multi-core processing, SSDs, and touch screens; served as a common platform for mobile and computer.
- **Windows 10 (2015):** The Start Button was added back; supports Multiple desktops; introduced the Central Notification Center and Cortana (voice-activated personal assistant).`,
      nav: { next: "mouse-desktop", nextLabel: "Next: Mouse Handling & Windows Desktop →" }
    },
    {
      id: "mouse-desktop",
      title: "Handling the Mouse & Windows Desktop",
      content: `**5.4 Handling the Mouse**

Mouse actions in Windows:
- **Click:** Point to the item on the screen, press and release the left mouse button.
- **Right Click:** Point to the item, press and release the right mouse button — displays a pop-up menu with various options.
- **Double-click:** Point to the item, quickly press the left mouse button twice.
- **Drag and drop:** Point to an item, hold the left mouse button as you move the pointer, and release the button once you reach the desired position.

**5.5 Windows Desktop**

The opening screen of Windows is called the **Desktop**. It typically shows the Start button, Taskbar, Notification Area, and date/time. Windows allows you to change the appearance of the desktop, so it may look different on different systems.

**5.5.1 The Icons**

An icon is a graphic symbol representing window elements like files, folders, shortcuts, etc. — icons play a vital role in GUI-based applications.

- **5.5.1.1 Standard Icons:** Icons available on the desktop by default when Windows OS is installed. Standard icons available in all Windows versions are My Computer, Documents, and Recycle Bin.
- **5.5.1.2 Shortcut Icons:** Can be created for any application, file, or folder. Double-clicking the icon opens the related application, file, or folder.
- **5.5.1.3 Disk Drive Icons:** Graphically represent five disk drive options — (i) Hard disk, (ii) CD-ROM/DVD Drive, (iii) Pen drive, (iv) Other removable storage (mobile, smartphone, tablet, etc.), (v) Network drives, if the system is connected to other systems.

**Note:** You can move to the Desktop any time by pressing the **Winkey + D**, or using **Aero Peek**, while working in any application.

**Application Window vs Document Window:** When you open any application (such as a word processor), you will find two windows on screen. The larger window is called the **Application Window** — it helps the user communicate with the application program. The smaller window, inside the Application Window, is called the **Document Window** — used for typing, editing, drawing, and formatting text and graphics.`,
      nav: { back: "intro-windows", next: "window-elements", nextLabel: "Next: Elements of a Window →" }
    },
    {
      id: "window-elements",
      title: "The Window and Its Elements",
      content: `**5.6 The Window**

A Window is a typical rectangular area in an application or document. It is an area on the screen that displays information for a specific program.

**5.7 Application Window**

An area on the computer screen with defined boundaries, within which information is displayed. Such windows can be resized, maximised, minimised, placed side by side, or overlapped. It contains an open application — the current application, such as a word processor or paint program. When two or more windows are open, only one is active and the rest are inactive.

**5.8 Document Window**

A section of the screen used to display the contents of a document — used for typing, editing, drawing, and formatting text and graphics within an application.

**5.9 Elements of a Window**

- **5.9.1 Title Bar:** Displays the name of the application and the name of the document opened. Also contains the minimize, maximize, and close buttons.
- **5.9.2 Menu Bar:** Seen under the title bar. Menus can be accessed by pressing the Alt key and the underlined letter in the menu title. Pressing Alt or F10 brings focus to the first menu on the menu bar. (In Windows 7, if the menu bar is not visible, click Organise → Layout and select the desired item.)
- **5.9.3 The Workspace:** The area in the document window used to enter or type the text of your document.
- **5.9.4 Scroll Bars:** Used to scroll the workspace horizontally or vertically.
- **5.9.5 Corners and Borders:** Help drag and resize the window. The mouse pointer changes to a double-headed arrow when positioned over a border or corner — the window can be resized by dragging the corner diagonally.`,
      nav: { back: "mouse-desktop", next: "start-menu-taskbar", nextLabel: "Next: Start Menu & Taskbar →" }
    },
    {
      id: "start-menu-taskbar",
      title: "Start Menu, Taskbar & Starting Applications",
      content: `**5.10.1 Start Menu**

In the lower left-hand corner of the Windows screen is the **Start button**. Clicking it opens the Start menu, which allows you to start any application — it typically shows a list of installed programs, a search box, options to modify system settings, add/modify devices and printers, get help, and log off/restart/shutdown.

**Taskbar**

At the bottom of the screen is a horizontal bar called the **Taskbar**. From left to right it contains: the Start button, shortcuts to various programs, minimised programs, and (at the extreme right) the system tray with volume control, network, date, and time. Next to the Start button is the Quick Launch Toolbar for frequently used applications.

**5.10.2 Computer Icon**

Clicking this icon lets the user see the disk drives mounted in the system. In Windows XP/Vista, this icon is called "My Computer"; in Windows 8 and 10, it is called "This PC" — the functionality remains the same across versions.

**5.10.3 Starting and Closing Applications**

To start an application:
1. Click the Start button and point to All Programs — the Program menu appears.
2. Point to the group containing the application you want, then click the application name.
3. You can also open an application by clicking Run on the Start menu and typing the application name.
4. To quit an application, click the Close button in the upper right corner of the application window.
5. You can also quit an application using File → Exit or File → Close (Windows 7).`,
      nav: { back: "window-elements", next: "files-folders", nextLabel: "Next: Managing Files and Folders →" }
    },
    {
      id: "files-folders",
      title: "Managing Files and Folders",
      content: `**5.11 Managing Files and Folders**

In Windows 7, you can organise your documents and programs as files and folders. You can move, copy, rename, delete, and search for files and folders.

**5.11.1.1 Creating Folders — Method I:**
1. Open the Computer icon.
2. Open the drive where you want to create the folder (e.g., select D:).
3. Click File → New → Folder.
4. A new folder is created with the default name "New folder".
5. Type in the folder name and press Enter.

**Method II (on the Desktop):**
1. Right-click on the Desktop → New → Folder.
2. A folder appears with the default name "New folder", highlighted for renaming.
3. Type the desired name and press Enter.

**5.11.1.2 Creating Files (Wordpad):** Wordpad is an in-built word processor in Windows OS.
1. Click Start → All Programs → Accessories → Wordpad (or Run → type Wordpad, click OK).
2. Type contents in the workspace and save the file using File → Save or Ctrl+S.
3. The Save As dialog box opens — select the save location using the "look in" drop-down.
4. Type the file name in the file name text box.
5. Click Save.

**5.11.2 Finding Files and Folders:** Click the Start button — a search box appears. Type the name (or part of the name) of the file/folder, and matching results will appear; click to open, or use "See more results" for a full Search Results dialog. You can also search using the Computer icon's search box in the top-right corner of the disk drive screen.

**5.11.3 Opening Existing Files or Folders:** The most common way is to double-click on it.

**5.11.4 Renaming Files or Folders** — three methods:
- **Using the File Menu:** Select the file/folder → File → Rename → type the new name → press Enter.
- **Using the Right Mouse Button:** Select the file/folder → right-click → Rename from the pop-up menu → type the new name → press Enter.
- **Using the Left Mouse Button:** Select the file/folder → press F2 (or click over it) — a surrounding rectangle appears around the name → type the new name → press Enter.

**5.11.5 Moving/Copying Files and Folders**
- **Moving (Cut and Paste):** Select the file/folder → Edit → Cut (or Ctrl+X, or right-click → Cut) → navigate to the new location → Edit → Paste (or Ctrl+V, or right-click → Paste).
- **Moving (Drag and Drop):** In the disk drive window's left and right panes, drag the selected file/folder from the right pane to the target folder in the left pane's tree structure, and release when the target is highlighted.
- **Copying:** Same as moving but use Edit → Copy (or Ctrl+C) instead of Cut. (Use Ctrl+Click to select multiple files or folders.)

**5.11.6 Copying Files/Folders to a Removable Disk** — two methods:
- **Copy and Paste:** Plug in the USB drive, navigate to the file, right-click → Copy, navigate to the Removable Disk window, right-click → Paste.
- **Send To:** Plug in the USB drive, right-click the file → Send To → select the Removable Disk.

**5.11.7 Deleting Files and Folders:** Select the file/folder → right-click → Delete (or File → Delete, or press the Delete key) — it moves to the Recycle Bin. **Note:** To permanently delete a file (bypassing the Recycle Bin), hold Shift and press Delete.

**Recycle Bin:** A special folder that keeps deleted files/folders, giving you the opportunity to recover them. To restore: open Recycle Bin → right-click the item → Restore (or "Restore all items" for multiple). To permanently remove everything, select "Empty the Recycle Bin".`,
      nav: { back: "start-menu-taskbar", next: "shortcuts-shutdown", nextLabel: "Next: Shortcuts & Shutting Down →" }
    },
    {
      id: "shortcuts-shutdown",
      title: "Creating Shortcuts & Shutting Down",
      content: `**5.12 Creating Shortcuts on the Desktop**

Shortcuts to frequently used folders/files can be created on the Desktop to automate work:
1. Select the file or folder you want a shortcut for.
2. Right-click on it.
3. Select "Send to" from the shortcut menu, then select "Desktop (create shortcut)".
4. A shortcut icon appears on the Desktop and can be opened like any other icon.

**5.13 Shutting Down or Logging Off a Computer**

Once all open applications are closed, you can log off or shut down. Click Start → Shut down (or click the arrow next to Shut down). If you have open, unsaved programs, you'll be asked to close them, or Windows will force a shutdown, losing unsaved information. Options include:

- **Switch User:** Switch to another user account without closing your open programs.
- **Log Off:** Switch to another user account after closing all your open programs.
- **Lock:** Lock the computer while you're away.
- **Restart:** Reboot the computer (often required after installing software or updates).
- **Sleep:** A low-power mode that retains all running programs/open windows in memory for a super-quick restart.
- **Hibernate** (laptops only): A low-power mode that saves all running programs/windows to the hard disk for a quick restart, using less power than Sleep.`,
      nav: { back: "files-folders", next: "summary", nextLabel: "Next: Points to Remember →" }
    },
    {
      id: "summary",
      title: "Points to Remember",
      content: `- An Operating System is system software that enables hardware to communicate with other software, and acts as the interface between the user and hardware.
- Windows is a popular GUI-based OS; running multiple applications at once is called Multitasking.
- Standard icons (My Computer, Documents, Recycle Bin) come pre-installed; Shortcut icons link to any file/folder/app; Disk drive icons represent storage devices.
- The Application Window holds the running program; the Document Window (inside it) is where content is typed/edited.
- A window's key elements are the Title Bar, Menu Bar, Workspace, Scroll Bars, and Corners/Borders.
- Files and folders can be created, found, renamed, moved/copied, and deleted using the File menu, right-click menu, keyboard shortcuts, or drag-and-drop.
- The Recycle Bin holds deleted files for possible recovery; Shift+Delete bypasses it for permanent deletion.
- Shutdown options include Log Off, Lock, Restart, Sleep, and Hibernate (laptops), each behaving differently regarding open programs and power state.`,
      nav: { back: "shortcuts-shutdown", practice: true }
    }
  ]
}
