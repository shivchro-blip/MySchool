export default {
  chapterNumber: 5,
  title: "Working with Windows Operating System",
  subject: "Computer Applications",
  classLabel: "Class 11",
  curriculum: "Samacheer Kalvi",

  sections: [
    {
      id: "intro",
      title: "Introduction to Windows OS",
      content: `An **Operating System (OS)** is system software that enables hardware to communicate and operate with other software. It acts as an interface between the user and the hardware and controls overall execution of the computer.

Key functions of an OS: Memory Management, Process Management, Device Management, File Management, Security Management, and controlling overall system performance.

**Microsoft Windows** is one of the most popular Graphical User Interface (GUI)-based operating systems. Multiple applications can execute simultaneously — this is called **Multitasking**. Windows uses both keyboard and mouse as input devices.

Functions of Windows OS:
- Access and run application programs (word processing, games, spreadsheets)
- Load new programs onto the computer
- Manage hardware (printers, scanners, cameras)
- File management (create, modify, save, delete files and folders)
- Change computer settings (colour scheme, screen savers)`,
      nav: { next: "versions", nextLabel: "Versions of Windows →" }
    },
    {
      id: "versions",
      title: "Versions of Windows",
      content: `Windows has evolved through many versions:

| Version | Year | Key Features |
|---------|------|-------------|
| Windows 1.x | 1985 | GUI in 16-bit processor; mouse introduced as input device |
| Windows 2.x | 1987 | Minimize/maximize windows; Control Panel introduced |
| Windows 3.x | 1992 | Multitasking introduced; supported 256 colours |
| Windows 95 | 1995 | Start button, taskbar, Windows Explorer; 32-bit processor |
| Windows 98 | 1998 | Web browser (Internet Explorer) integration; Plug and Play |
| Windows NT/Me | 2000 | Network server capabilities; automated system diagnostics |`,
      nav: { back: "intro", next: "mouse", nextLabel: "Handling the Mouse →" }
    },
    {
      id: "mouse",
      title: "Handling the Mouse",
      content: `The mouse is a pointing device used to interact with Windows. Common mouse actions:

| Action | Description |
|--------|-------------|
| Point | Move the pointer to an item |
| Click | Press and release the left mouse button once |
| Double-click | Press and release the left mouse button twice quickly |
| Right-click | Press and release the right mouse button |
| Drag and Drop | Hold the left button, move to destination, release |

**Keyboard shortcut:** Press **Win + D** or use **Aero Peek** to go to the Desktop at any time.`,
      nav: { back: "versions", next: "desktop", nextLabel: "Windows Desktop →" }
    },
    {
      id: "desktop",
      title: "Windows Desktop and Icons",
      content: `The opening screen of Windows is called the **Desktop**. It shows the Start button, Taskbar, Notification Area, date and time, and Icons.

**Icons** are graphic symbols representing window elements like files, folders, and shortcuts. Types of icons:

**Standard Icons:** Available on the desktop by default when Windows is installed. Examples: My Computer, Documents, Recycle Bin.

**Shortcut Icons:** Created for any application, file, or folder. Double-clicking opens the related item.

**Disk Drive Icons:** Represent five disk drive options:
1. Hard disk
2. CD-ROM/DVD Drive
3. Pen drive
4. Other removable storage (mobile, tablet)
5. Network drives (if connected)

**The Window:** A rectangular area displaying information for a specific program. Windows can be resized, maximised, minimised, placed side by side, or overlapped.

**Application Window:** Contains an open application (e.g., Word or Paint). When multiple windows are open, only one is active.

**Document Window:** A section within the application window displaying the document content. Used for typing, editing, drawing, and formatting.

**Elements of a Window:**
- **Title Bar:** Displays the application and document name; contains Minimize, Maximize, and Close buttons.
- **Menu Bar:** Below the title bar; contains menus (File, Edit, View, etc.).
- **Workspace:** The blank area for typing/editing document content.
- **Scroll Bars:** Used to scroll horizontally or vertically through the document.
- **Corners and Borders:** Used to drag and resize the window (pointer becomes a double-headed arrow).

**Control Buttons:**
- **Minimize:** Shrinks window to taskbar; click taskbar button to restore.
- **Maximize:** Displays window in full screen; button changes to Restore.
- **Restore:** Returns window to original size.
- **Close:** Closes the application; red X button.`,
      nav: { back: "mouse", next: "start-taskbar", nextLabel: "Start Menu & Taskbar →" }
    },
    {
      id: "start-taskbar",
      title: "Start Menu and Taskbar",
      content: `**Start Menu:** Accessed by clicking the Start button (lower-left corner). Used to launch any application installed on the computer. Contains: Program list, Search box, Settings, Log Off/Restart/Shutdown options.

**Taskbar:** Horizontal bar at the bottom of the screen containing (left to right): Start button → Quick Launch toolbar → Minimised programs → System tray (volume, network, date/time).

**Computer Icon:** Clicking this shows all disk drives mounted in the system. Called "My Computer" in Windows XP/Vista and "This PC" in Windows 8/10.

**Starting an Application:**
1. Click Start → All Programs → select the application group → click the application name.
2. Or click Start → Run → type the application name → click OK.

**Closing an Application:**
- Click the Close button (X) in the upper-right corner of the window.
- Or click File → Exit.`,
      nav: { back: "desktop", next: "file-management", nextLabel: "Managing Files & Folders →" }
    },
    {
      id: "file-management",
      title: "Managing Files and Folders",
      content: `**Creating Folders:**

*Method 1 (File Menu):* Open Computer Icon → Open drive → Click File → New → Folder → Type name → Press Enter.

*Method 2 (Desktop):* Right-click on Desktop → New → Folder → Type name → Press Enter.

**Creating Files (Wordpad):** Start → All Programs → Accessories → Wordpad → Type content → File → Save (Ctrl+S) → Select location → Type filename → Click Save.

**Finding Files/Folders:**
- Using Start Menu: Click Start → type name in search box → results appear.
- Using Computer Icon: Click Computer Icon → type name in top-right search box → click to open.

**Opening Files:** Double-click on the file or folder.

**Renaming Files/Folders:**
- *Method 1 (File Menu):* Select → File → Rename → type new name → Enter.
- *Method 2 (Right-click):* Right-click → Rename → type new name → Enter.
- *Method 3 (Left-click):* Select → press F2 → type new name → Enter. (Shortcut: **F2**)

**Moving Files (Cut and Paste):** Select → Ctrl+X (Cut) → navigate to destination → Ctrl+V (Paste).

**Moving Files (Drag and Drop):** In the disk drive window, drag selected file from right pane to destination folder in left pane → release mouse.

**Copying Files (Copy and Paste):** Select → Ctrl+C (Copy) → navigate to destination → Ctrl+V (Paste).

**Copying to Removable Disk:**
- *Copy & Paste:* Plug in USB → open removable disk → copy file → paste in USB window.
- *Send To:* Right-click file → Send To → select the Removable Disk.

**Deleting Files:** Select → press Delete key (moves to Recycle Bin) or Shift+Delete (permanently deletes, bypassing Recycle Bin).

**Recycle Bin:** A special folder that holds deleted files. Files can be restored from it. To restore: Open Recycle Bin → right-click file → Restore. To empty: Select "Empty the Recycle Bin".

**Creating Shortcuts:** Right-click file/folder → Send to → Desktop (create shortcut). The shortcut appears on the desktop.

**Shutting Down:**
- Click Start → Shutdown arrow → choose option:
  - **Switch User:** Switch accounts without closing programs.
  - **Log Off:** Close all programs, switch accounts.
  - **Lock:** Lock computer while away.
  - **Restart:** Reboot (required after installing software).
  - **Sleep:** Low-power mode retaining programs in memory.
  - **Hibernate** (laptops only): Saves all programs to hard drive; slower restart than Sleep.`,
      nav: { back: "start-taskbar", practice: true }
    }
  ]
}
