# Core Actions Documentation

## Files Category

### Date Time
- Add to datetime
- Get current date and time
- Subtract dates

### Files
- Convert Base64 to file
- Convert binary data to file
- Convert file to Base64
- Convert file to binary data
- Copy file(s)
- Delete file(s)
- Get file path part
- Get temporary file
- If file exists
- Move file(s)
- Read from CSV file
- Read text from file
- Rename file(s)
- Wait for file
- Write text to file
- Write to CSV file

### Folders
- If folder exists
- Get files in folder
- Get subfolders in folder
- Create folder
- Delete folder
- Empty folder
- Copy folder
- Move folder
- Rename folder
- Get special folder

### PDF
- Extract images from PDF
- Extract PDF file pages to new PDF file
- Extract tables from PDF
- Extract text from PDF
- Merge PDF files

## Interaction Category

### Browser Automation
- Click download link on web page
- Click link on web page
- Close web browser
- Create new tab
- Go to web page
- Hover mouse over element on web page
- If web page contains
- Launch new Chrome
- Launch new Firefox
- Launch new Internet Explorer
- Launch new Microsoft Edge
- Run JavaScript function on web page
- Wait for web page content
- Web data extraction
- Web form filling

### UI Automation

#### Data Extraction
- Get details of window
- Get details of the UI element in window
- Get selected checkboxes in window
- Get selected radio button in window
- Extract data from window
- Extract data from table
- Take screenshot of UI element

#### Form Filling
- Focus text field in window
- Populate text field in window
- Press button in window
- Select radio button in window
- Set checkbox state in window
- Set drop-down list value in window

#### Window Management
- Get window
- Focus window
- Set window state
- Set window visibility
- Move window
- Resize window
- Close window

### Message Boxes
- Display message
- Display input dialog
- Display select date dialog
- Display select from list dialog
- Display select file dialog
- Display select folder dialog
- Display custom form

### Mouse and Keyboard
- Block input
- Get mouse position
- Move mouse
- Move mouse to image
- Move mouse to text on screen (OCR)
- Send mouse click
- Send keys
- Press/release key
- Set key state
- Wait for mouse
- Get keyboard identifier
- Wait for shortcut key

## System Category

### Clipboard
- Get clipboard text
- Set clipboard text
- Clear clipboard contents

### Workstation Control
- Print document
- Get default printer
- Set default printer
- Show desktop
- Lock workstation
- Play sound
- Empty recycle bin
- Take screenshot
- Control screen saver
- Get screen resolution
- Set screen resolution
- Log off user
- Shutdown computer

### Environment Settings
- Set Windows environment variable
- Get Windows environment variable
- Delete Windows environment variable

### Process Management
- If process
- Wait for process
- Run application
- Terminate process
- Ping

## Logic Category

### Conditionals
- Case
- Default case
- Else
- Else if
- If
- Switch

### Flow Control
- Comment
- End
- Region
- End region
- Get last error
- Go to
- Label
- On block error
- Run desktop flow
- Run subflow
- Exit subflow
- Stop flow
- Wait

### Loops
- Exit loop
- For each
- Loop
- Loop condition
- Next loop

### Variables
- Increase variable
- Decrease variable
- Set variable

## Advanced Category

### Scripting
- Run DOS command
- Run VBScript
- Run JavaScript
- Run PowerShell script
- Run Python script
- Run .NET script

### Cryptography
- Encrypt text with AES
- Decrypt text with AES
- Encrypt from file with AES
- Decrypt to file with AES
- Hash text
- Hash from file
- Hash text with key
- Hash from file with key

### Windows Services
- If service
- Wait for service
- Start service
- Stop service
- Pause service
- Resume service

### XML
- Read XML from file
- Write XML to file
- Execute XPath expression
- Get XML element attribute
- Set XML element attribute
- Remove XML element attribute
- Get XML element value
- Set XML element value
- Insert XML element
- Remove XML element

### CMD Session
- Open CMD session
- Read from CMD session
- Write to CMD session
- Wait for text on CMD session
- Close CMD session

### Terminal Emulation
- Open terminal session
- Close terminal session
- Move cursor on terminal session
- Get text from terminal session
- Set text on terminal session
- Send key to terminal session
- Wait for text on terminal session
- Search for text on terminal session

### FTP
- Open FTP connection
- List FTP directory
- Open secure FTP connection
- Close connection
- Change working directory
- Download file(s) from FTP
- Download folder(s) from FTP
- Upload file(s) to FTP
- Upload folder(s) to FTP
- Delete FTP file
- Rename FTP file
- Create FTP directory
- Delete FTP directory
- Invoke FTP command
- Synchronize directories

## Integration Category

### Access

* Close Access
* Launch Access
* Read Access table
* Run Access macro
* Run Access query

### Active Directory

* **Group**
    * Create group
    * Get group info
    * Get group members
    * Modify group
* **Object**
    * Create object
    * Delete object
    * Move object
    * Rename object
* **User**
    * Connect to server
    * Close connection
    * Create user
    * Get user info
    * Modify user
    * Unlock user
    * Update user info

### AI Builder (Preview)

* Create text with GPT (Preview)

### Azure

* **Resource groups**
    * Create resource group
    * Delete resource group
    * Get resource groups
* **Virtual machines**
    * **Disks**
        * Attach disk
        * Create managed disk
        * Delete disk
        * Detach disk
        * Get disks
    * **Sessions**
        * Create session
        * End session
        * Get subscriptions
    * **Snapshots**
        * Create snapshot
        * Delete snapshot
        * Get snapshots
    * **Virtual Machine Actions**
        * Describe virtual machine
        * Get virtual machines
        * Restart virtual machine
        * Shut down virtual machine
        * Start virtual machine
        * Stop virtual machine

### CyberArk

* Get password from CyberArk

### Email

* Process email messages
* Retrieve email messages
* Send email

### Excel

* **Advanced**
    * Activate cell in Excel worksheet
    * Append cells in Excel worksheet
    * Auto fill cells in Excel worksheet
    * Copy cells from Excel worksheet
    * Copy Excel worksheet
    * Delete column from Excel worksheet
    * Delete Excel worksheet
    * Delete from Excel worksheet
    * Delete row from Excel worksheet
    * Find and replace cells in Excel worksheet
    * Get active Excel worksheet
    * Get all Excel worksheets
    * Get first free row on column from Excel worksheet
    * Get table range from Excel worksheet
    * Insert column to Excel worksheet
    * Insert row to Excel worksheet
    * Lookup range in Excel worksheet
    * Paste cells to Excel worksheet
    * Read formula from Excel
    * Resize columns/rows in Excel worksheet
    * Run Excel macro
    * Select cells in Excel worksheet
    * Set color of cells in Excel worksheet
* **General Actions**
    * Add new worksheet
    * Attach to running Excel
    * Clear cells in Excel worksheet
    * Clear filters in Excel worksheet
    * Close Excel
    * Filter cells in Excel worksheet
    * Get active cell on Excel worksheet
    * Get column name on Excel worksheet
    * Get empty cell
    * Get first free column/row from Excel worksheet
    * Launch Excel
    * Read from Excel worksheet
    * Save Excel
    * Set active Excel worksheet
    * Sort cells in Excel worksheet
    * Write to Excel worksheet

### Exchange Server

* Connect to Exchange server
* Process Exchange email messages
* Retrieve Exchange email messages
* Send Exchange email message

### Google Cognitive
* Natural Language
  * Analyze sentiment
  * Analyze entities
  * Analyze syntax
* Vision
  * Label detection
  * Landmark detection
  * Text detection
  * Logo detection
  * Image properties detection
  * Safe search detection

### IBM Cognitive
* Document Conversion
  * Convert document
* Language Translator
  * Translate
  * Identify language
* Tone Analyzer
  * Analyze tone
* Visual Recognition
  * Classify image

### Microsoft Cognitive
* Bing Spell Check
  * Spell check
* Computer Vision
  * Analyze image
  * Describe image
  * OCR
  * Tag image
* Logging
  * Log message

### Outlook

* Close Outlook
* Launch Outlook
* Process email messages in Outlook
* Respond to Outlook message
* Retrieve email messages from Outlook
* Save Outlook email messages
* Send email message through Outlook

### SQL

* Close SQL connection
* Execute SQL statement
* Open SQL connection

### Work queues

* Add multiple work queue items
* Add work queue item
* Get work queue items by filter
* Process work queue items
* Requeue item with delay
* Update work queue item
* Update work queue item processing notes