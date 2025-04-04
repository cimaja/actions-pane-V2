// Import icon definitions from our centralized icon library
import { CommonIcons, IconDefinition } from '../config/iconLibraries';

export interface ActionSource {
  name: string;
  icon: IconDefinition;
  color: string;
  categories: ActionCategory[];
}

export interface ActionCategory {
  name: string;
  icon: IconDefinition;
  color: string;
  modules: ActionModule[];
}

export interface ActionModule {
  name: string;
  icon: IconDefinition;
  color: string;
  description?: string;
  submodules: ActionSubmodule[];
  documentationUrl?: string;
  publisher?: string;
  category?: string;
  lastUpdated?: string;
}

export interface ActionSubmodule {
  name: string;
  actions: string[];
}

export const actionSources: ActionSource[] = [
  {
    name: 'PAD Action',
    icon: CommonIcons.web,
    color: 'bg-blue-100 text-blue-600',
    categories: [
      {
        name: 'Files',
        icon: CommonIcons.file,
        color: 'bg-yellow-100 text-yellow-600',
        modules: [
          {
            name: 'Date time',
            icon: CommonIcons.clock,
            color: 'bg-blue-100 text-blue-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Add to datetime',
                  'Get current date and time',
                  'Subtract dates'
                ]
              }
            ]
          },
          {
            name: 'Files',
            icon: CommonIcons.fileText,
            color: 'bg-yellow-100 text-yellow-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Convert Base64 to file',
                  'Convert binary data to file',
                  'Convert file to Base64',
                  'Convert file to binary data',
                  'Copy file(s)',
                  'Delete file(s)',
                  'Get file path part',
                  'Get temporary file',
                  'If file exists',
                  'Move file(s)',
                  'Read from CSV file',
                  'Read text from file',
                  'Rename file(s)',
                  'Wait for file',
                  'Write text to file',
                  'Write to CSV file'
                ]
              }
            ]
          },
          {
            name: 'Folders',
            icon: CommonIcons.folder,
            color: 'bg-blue-100 text-blue-600',
            submodules: [
              {
                name: '',
                actions: [
                  'If folder exists',
                  'Get files in folder',
                  'Get subfolders in folder',
                  'Create folder',
                  'Delete folder',
                  'Empty folder',
                  'Copy folder',
                  'Move folder',
                  'Rename folder',
                  'Get special folder'
                ]
              }
            ]
          },
          {
            name: 'PDF',
            icon: CommonIcons.filePdf,
            color: 'bg-red-100 text-red-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Extract images from PDF',
                  'Extract PDF file pages to new PDF file',
                  'Extract tables from PDF',
                  'Extract text from PDF',
                  'Merge PDF files'
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Interaction',
        icon: CommonIcons.deviceDesktop,
        color: 'bg-rose-100 text-rose-600',
        modules: [
          {
            name: 'Browser Automation',
            icon: CommonIcons.globe,
            color: 'bg-blue-100 text-blue-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Click download link on web page',
                  'Click link on web page',
                  'Close web browser',
                  'Create new tab',
                  'Go to web page',
                  'Hover mouse over element on web page',
                  'If web page contains',
                  'Launch new Chrome',
                  'Launch new Firefox',
                  'Launch new Internet Explorer',
                  'Launch new Microsoft Edge',
                  'Run JavaScript function on web page',
                  'Wait for web page content',
                  'Web data extraction',
                  'Web form filling'
                ]
              }
            ]
          },
          {
            name: 'UI Automation',
            icon: CommonIcons.monitorSmartphone,
            color: 'bg-rose-100 text-rose-600',
            submodules: [
              {
                name: 'Data extraction',
                actions: [
                  'Get details of window',
                  'Get details of the UI element in window',
                  'Get selected checkboxes in window',
                  'Get selected radio button in window',
                  'Extract data from window',
                  'Extract data from table',
                  'Take screenshot of UI element'
                ]
              },
              {
                name: 'Form filling',
                actions: [
                  'Focus text field in window',
                  'Populate text field in window',
                  'Press button in window',
                  'Select radio button in window',
                  'Set checkbox state in window',
                  'Set drop-down list value in window'
                ]
              },
              {
                name: 'Window management',
                actions: [
                  'Get window',
                  'Focus window',
                  'Set window state',
                  'Set window visibility',
                  'Move window',
                  'Resize window',
                  'Close window'
                ]
              }
            ]
          },
          {
            name: 'Message boxes',
            icon: CommonIcons.messageSquare,
            color: 'bg-indigo-100 text-indigo-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Display message',
                  'Display input dialog',
                  'Display select date dialog',
                  'Display select from list dialog',
                  'Display select file dialog',
                  'Display select folder dialog',
                  'Display custom form'
                ]
              }
            ]
          },
          {
            name: 'Mouse and keyboard',
            icon: CommonIcons.keyboard,
            color: 'bg-slate-100 text-slate-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Block input',
                  'Get mouse position',
                  'Move mouse',
                  'Move mouse to image',
                  'Move mouse to text on screen (OCR)',
                  'Send mouse click',
                  'Send keys',
                  'Press/release key',
                  'Set key state',
                  'Wait for mouse',
                  'Get keyboard identifier',
                  'Wait for shortcut key'
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'System',
        icon: CommonIcons.settings,
        color: 'bg-slate-100 text-slate-600',
        modules: [
          {
            name: 'Clipboard',
            icon: CommonIcons.clipboard,
            color: 'bg-amber-100 text-amber-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Get clipboard text',
                  'Set clipboard text',
                  'Clear clipboard contents'
                ]
              }
            ]
          },
          {
            name: 'Workstation Control',
            icon: CommonIcons.monitor,
            color: 'bg-slate-100 text-slate-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Print document',
                  'Get default printer',
                  'Set default printer',
                  'Show desktop',
                  'Lock workstation',
                  'Play sound',
                  'Empty recycle bin',
                  'Take screenshot',
                  'Control screen saver',
                  'Get screen resolution',
                  'Set screen resolution',
                  'Log off user',
                  'Shutdown computer'
                ]
              }
            ]
          },
          {
            name: 'Environment Settings',
            icon: CommonIcons.settings,
            color: 'bg-emerald-100 text-emerald-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Set Windows environment variable',
                  'Get Windows environment variable',
                  'Delete Windows environment variable'
                ]
              }
            ]
          },
          {
            name: 'Process Management',
            icon: CommonIcons.terminal,
            color: 'bg-violet-100 text-violet-600',
            submodules: [
              {
                name: '',
                actions: [
                  'If process',
                  'Wait for process',
                  'Run application',
                  'Terminate process',
                  'Ping'
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Logic',
        icon: CommonIcons.network,
        color: 'bg-blue-100 text-blue-600',
        modules: [
          {
            name: 'Conditionals',
            icon: CommonIcons.network,
            color: 'bg-blue-100 text-blue-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Case',
                  'Default case',
                  'Else',
                  'Else if',
                  'If',
                  'Switch'
                ]
              }
            ]
          },
          {
            name: 'Flow control',
            icon: CommonIcons.messageSquareCode,
            color: 'bg-purple-100 text-purple-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Comment',
                  'End',
                  'Region',
                  'End region',
                  'Get last error',
                  'Go to',
                  'Label',
                  'On block error',
                  'Run desktop flow',
                  'Run subflow',
                  'Exit subflow',
                  'Stop flow',
                  'Wait'
                ]
              }
            ]
          },
          {
            name: 'Loops',
            icon: CommonIcons.repeat,
            color: 'bg-green-100 text-green-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Exit loop',
                  'For each',
                  'Loop',
                  'Loop condition',
                  'Next loop'
                ]
              }
            ]
          },
          {
            name: 'Variables',
            icon: CommonIcons.variable,
            color: 'bg-indigo-100 text-indigo-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Increase variable',
                  'Decrease variable',
                  'Set variable'
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Advanced',
        icon: CommonIcons.wrench,
        color: 'bg-slate-100 text-slate-600',
        modules: [
          {
            name: 'Scripting',
            icon: CommonIcons.code,
            color: 'bg-purple-100 text-purple-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Run DOS command',
                  'Run VBScript',
                  'Run JavaScript',
                  'Run PowerShell script',
                  'Run Python script',
                  'Run .NET script'
                ]
              }
            ]
          },
          {
            name: 'Cryptography',
            icon: CommonIcons.lock,
            color: 'bg-green-100 text-green-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Encrypt text with AES',
                  'Decrypt text with AES',
                  'Encrypt from file with AES',
                  'Decrypt to file with AES',
                  'Hash text',
                  'Hash from file',
                  'Hash text with key',
                  'Hash from file with key'
                ]
              }
            ]
          },
          {
            name: 'Windows services',
            icon: CommonIcons.command,
            color: 'bg-blue-100 text-blue-600',
            submodules: [
              {
                name: '',
                actions: [
                  'If service',
                  'Wait for service',
                  'Start service',
                  'Stop service',
                  'Pause service',
                  'Resume service'
                ]
              }
            ]
          },
          {
            name: 'XML',
            icon: CommonIcons.xml,
            color: 'bg-orange-100 text-orange-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Read XML from file',
                  'Write XML to file',
                  'Execute XPath expression',
                  'Get XML element attribute',
                  'Set XML element attribute',
                  'Remove XML element attribute',
                  'Get XML element value',
                  'Set XML element value',
                  'Insert XML element',
                  'Remove XML element'
                ]
              }
            ]
          },
          {
            name: 'CMD session',
            icon: CommonIcons.terminal,
            color: 'bg-gray-100 text-gray-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Open CMD session',
                  'Read from CMD session',
                  'Write to CMD session',
                  'Wait for text on CMD session',
                  'Close CMD session'
                ]
              }
            ]
          },
          {
            name: 'Terminal emulation',
            icon: CommonIcons.terminal,
            color: 'bg-slate-100 text-slate-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Open terminal session',
                  'Close terminal session',
                  'Move cursor on terminal session',
                  'Get text from terminal session',
                  'Set text on terminal session',
                  'Send key to terminal session',
                  'Wait for text on terminal session',
                  'Search for text on terminal session'
                ]
              }
            ]
          },
          {
            name: 'FTP',
            icon: CommonIcons.ftp,
            color: 'bg-indigo-100 text-indigo-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Open FTP connection',
                  'List FTP directory',
                  'Open secure FTP connection',
                  'Close connection',
                  'Change working directory',
                  'Download file(s) from FTP',
                  'Download folder(s) from FTP',
                  'Upload file(s) to FTP',
                  'Upload folder(s) to FTP',
                  'Delete FTP file',
                  'Rename FTP file',
                  'Create FTP directory',
                  'Delete FTP directory',
                  'Invoke FTP command',
                  'Synchronize directories'
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Integration',
        icon: CommonIcons.share,
        color: 'bg-purple-100 text-purple-600',
        modules: [
          {
            name: 'Access',
            icon: CommonIcons.database,
            color: 'bg-blue-100 text-blue-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Close Access',
                  'Launch Access',
                  'Read Access table',
                  'Run Access macro',
                  'Run Access query'
                ]
              }
            ]
          },
          {
            name: 'Active Directory',
            icon: CommonIcons.users,
            color: 'bg-green-100 text-green-600',
            submodules: [
              {
                name: 'Group',
                actions: [
                  'Create group',
                  'Get group info',
                  'Get group members',
                  'Modify group'
                ]
              },
              {
                name: 'Object',
                actions: [
                  'Create object',
                  'Delete object',
                  'Move object',
                  'Rename object'
                ]
              },
              {
                name: 'User',
                actions: [
                  'Connect to server',
                  'Close connection',
                  'Create user',
                  'Get user info',
                  'Modify user',
                  'Unlock user',
                  'Update user info'
                ]
              }
            ]
          },
          {
            name: 'AI Builder',
            icon: CommonIcons.brainCircuit,
            color: 'bg-indigo-100 text-indigo-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Create text with GPT (Preview)'
                ]
              }
            ]
          },
          {
            name: 'Azure',
            icon: CommonIcons.cloud,
            color: 'bg-blue-100 text-blue-600',
            submodules: [
              {
                name: 'Resource groups',
                actions: [
                  'Create resource group',
                  'Delete resource group',
                  'Get resource groups'
                ]
              },
              {
                name: 'Virtual machines',
                actions: [
                  'Describe virtual machine',
                  'Get virtual machines',
                  'Restart virtual machine',
                  'Shut down virtual machine',
                  'Start virtual machine',
                  'Stop virtual machine'
                ]
              }
            ]
          },
          {
            name: 'CyberArk',
            icon: CommonIcons.key,
            color: 'bg-red-100 text-red-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Get password from CyberArk'
                ]
              }
            ]
          },
          {
            name: 'Email',
            icon: CommonIcons.mail,
            color: 'bg-amber-100 text-amber-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Process email messages',
                  'Retrieve email messages',
                  'Send email'
                ]
              }
            ]
          },
          {
            name: 'Excel',
            icon: CommonIcons.spreadsheet,
            color: 'bg-green-100 text-green-600',
            submodules: [
              {
                name: 'General Actions',
                actions: [
                  'Add new worksheet',
                  'Attach to running Excel',
                  'Clear cells in Excel worksheet',
                  'Clear filters in Excel worksheet',
                  'Close Excel',
                  'Filter cells in Excel worksheet',
                  'Get active cell on Excel worksheet',
                  'Get column name on Excel worksheet',
                  'Get empty cell',
                  'Get first free column/row from Excel worksheet',
                  'Launch Excel',
                  'Read from Excel worksheet',
                  'Save Excel',
                  'Set active Excel worksheet',
                  'Sort cells in Excel worksheet',
                  'Write to Excel worksheet'
                ]
              },
              {
                name: 'Advanced',
                actions: [
                  'Activate cell in Excel worksheet',
                  'Append cells in Excel worksheet',
                  'Auto fill cells in Excel worksheet',
                  'Copy cells from Excel worksheet',
                  'Copy Excel worksheet',
                  'Delete column from Excel worksheet',
                  'Delete Excel worksheet',
                  'Delete from Excel worksheet',
                  'Delete row from Excel worksheet',
                  'Find and replace cells in Excel worksheet',
                  'Get active Excel worksheet',
                  'Get all Excel worksheets',
                  'Get first free row on column from Excel worksheet',
                  'Get table range from Excel worksheet',
                  'Insert column to Excel worksheet',
                  'Insert row to Excel worksheet',
                  'Lookup range in Excel worksheet',
                  'Paste cells to Excel worksheet',
                  'Read formula from Excel',
                  'Resize columns/rows in Excel worksheet',
                  'Run Excel macro',
                  'Select cells in Excel worksheet',
                  'Set color of cells in Excel worksheet'
                ]
              }
            ]
          },
          {
            name: 'Exchange Server',
            icon: CommonIcons.mailbox,
            color: 'bg-blue-100 text-blue-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Connect to Exchange server',
                  'Process Exchange email messages',
                  'Retrieve Exchange email messages',
                  'Send Exchange email message'
                ]
              }
            ]
          },
          {
            name: 'Google Cognitive',
            icon: CommonIcons.eye,
            color: 'bg-red-100 text-red-600',
            submodules: [
              {
                name: 'Natural Language',
                actions: [
                  'Analyze sentiment',
                  'Analyze entities',
                  'Analyze syntax'
                ]
              },
              {
                name: 'Vision',
                actions: [
                  'Label detection',
                  'Landmark detection',
                  'Text detection',
                  'Logo detection',
                  'Image properties detection',
                  'Safe search detection'
                ]
              }
            ]
          },
          {
            name: 'Microsoft Cognitive',
            icon: CommonIcons.brainCircuit,
            color: 'bg-purple-100 text-purple-600',
            submodules: [
              {
                name: 'Computer Vision',
                actions: [
                  'Analyze image',
                  'Describe image',
                  'OCR',
                  'Tag image'
                ]
              },
              {
                name: 'Bing Spell Check',
                actions: [
                  'Spell check'
                ]
              },
              {
                name: 'Logging',
                actions: [
                  'Log message'
                ]
              }
            ]
          },
          {
            name: 'Outlook',
            icon: CommonIcons.mail,
            color: 'bg-blue-100 text-blue-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Close Outlook',
                  'Launch Outlook',
                  'Process email messages in Outlook',
                  'Respond to Outlook message',
                  'Retrieve email messages from Outlook',
                  'Save Outlook email messages',
                  'Send email message through Outlook'
                ]
              }
            ]
          },
          {
            name: 'SQL',
            icon: CommonIcons.database,
            color: 'bg-amber-100 text-amber-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Close SQL connection',
                  'Execute SQL statement',
                  'Open SQL connection'
                ]
              }
            ]
          },
          {
            name: 'Work queues',
            icon: CommonIcons.clipboard,
            color: 'bg-indigo-100 text-indigo-600',
            submodules: [
              {
                name: '',
                actions: [
                  'Add multiple work queue items',
                  'Add work queue item',
                  'Get work queue items by filter',
                  'Process work queue items',
                  'Requeue item with delay',
                  'Update work queue item',
                  'Update work queue item processing notes'
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Connector',
    icon: CommonIcons.server,
    color: 'bg-purple-100 text-purple-600',
    categories: [
      {
        name: 'Azure',
        icon: CommonIcons.cloud,
        color: 'bg-blue-100 text-blue-600',
        modules: [
          {
            name: 'Azure Blob Storage',
            icon: CommonIcons.database,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Azure Blob Storage to manage your blobs and containers',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/azureblob/',
            publisher: 'Microsoft',
            category: 'Cloud Storage',
            lastUpdated: '2025-02-20',
            submodules: [
              {
                name: 'Blobs',
                actions: [
                  'Create blob',
                  'Get blob content',
                  'Get blob metadata',
                  'Update blob',
                  'Delete blob',
                  'Copy blob',
                  'List blobs',
                  'Extract archive to folder'
                ]
              },
              {
                name: 'Containers',
                actions: [
                  'Create container',
                  'Delete container',
                  'List containers',
                  'Get container metadata',
                  'Set container metadata'
                ]
              }
            ]
          },
          {
            name: 'SQL Server',
            icon: CommonIcons.database,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to SQL Server to manage your databases and execute queries',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/sql/',
            publisher: 'Microsoft',
            category: 'Database',
            lastUpdated: '2025-03-05',
            submodules: [
              {
                name: 'Data',
                actions: [
                  'Execute query',
                  'Get tables',
                  'Get rows',
                  'Insert row',
                  'Update row',
                  'Delete row',
                  'Execute stored procedure'
                ]
              }
            ]
          },
          {
            name: 'Azure Key Vault',
            icon: CommonIcons.lock,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Azure Key Vault to manage your secrets, keys, and certificates',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/keyvault/',
            publisher: 'Microsoft',
            category: 'Security',
            lastUpdated: '2025-02-10',
            submodules: [
              {
                name: 'Secrets',
                actions: [
                  'Get secret',
                  'Set secret',
                  'Delete secret',
                  'List secrets'
                ]
              },
              {
                name: 'Keys',
                actions: [
                  'Get key',
                  'Create key',
                  'Delete key',
                  'List keys',
                  'Encrypt with key',
                  'Decrypt with key',
                  'Sign with key',
                  'Verify with key'
                ]
              },
              {
                name: 'Certificates',
                actions: [
                  'Get certificate',
                  'Create certificate',
                  'Delete certificate',
                  'List certificates'
                ]
              }
            ]
          },
          {
            name: 'Azure OpenAI',
            icon: CommonIcons.brainCircuit,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Azure OpenAI to generate text, images, and embeddings',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/azureopenai/',
            publisher: 'Microsoft',
            category: 'AI',
            lastUpdated: '2025-03-10',
            submodules: [
              {
                name: 'Text',
                actions: [
                  'Generate text with GPT',
                  'Generate chat completions',
                  'Create embeddings'
                ]
              },
              {
                name: 'Images',
                actions: [
                  'Generate image',
                  'Edit image',
                  'Create image variation'
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Microsoft 365',
        icon: CommonIcons.cloud,
        color: 'bg-blue-100 text-blue-600',
        modules: [
          {
            name: 'SharePoint',
            icon: CommonIcons.fileText,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to SharePoint Online to manage files, lists, and libraries',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/sharepointonline/',
            publisher: 'Microsoft',
            category: 'Content Management',
            lastUpdated: '2025-02-15',
            submodules: [
              {
                name: 'Files and Folders',
                actions: [
                  'Create file',
                  'Get file content',
                  'Get file metadata',
                  'Update file',
                  'Delete file',
                  'Copy file',
                  'Move file',
                  'Check in file',
                  'Check out file',
                  'Discard check out',
                  'Create new folder',
                  'Copy folder',
                  'Move folder',
                  'Extract folder',
                  'List folder',
                  'List root folder',
                  'Get folder metadata'
                ]
              },
              {
                name: 'Lists and Items',
                actions: [
                  'Get all lists and libraries',
                  'Get lists',
                  'Get list views',
                  'Create item',
                  'Get item',
                  'Get items',
                  'Update item',
                  'Delete item',
                  'Add attachment',
                  'Get attachments',
                  'Get attachment content',
                  'Delete attachment'
                ]
              },
              {
                name: 'Sharing and Permissions',
                actions: [
                  'Create sharing link for a file or folder',
                  'Stop sharing an item or a file',
                  'Grant access to an item or a folder',
                  'Set content approval status'
                ]
              },
              {
                name: 'Hub Sites',
                actions: [
                  'Join hub site',
                  'Approve hub site join request',
                  'Cancel hub site join request',
                  'Set hub site join status to pending'
                ]
              },
              {
                name: 'Advanced',
                actions: [
                  'Send an HTTP request to SharePoint',
                  'Resolve person',
                  'Generate document using Microsoft Syntex (preview)'
                ]
              }
            ]
          },
          {
            name: 'Office 365 Outlook',
            icon: CommonIcons.mail,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Office 365 Outlook for email, calendar, and contact management',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/office365/',
            publisher: 'Microsoft',
            category: 'Communication',
            lastUpdated: '2025-01-20',
            submodules: [
              {
                name: 'Email',
                actions: [
                  'Send an email',
                  'Send email from shared mailbox',
                  'Send email with options',
                  'Reply to email',
                  'Get emails',
                  'Get email',
                  'Move email',
                  'Delete email',
                  'Mark as read or unread',
                  'Get attachment',
                  'Export email'
                ]
              },
              {
                name: 'Calendar',
                actions: [
                  'Create event',
                  'Get event',
                  'Get events',
                  'Update event',
                  'Delete event',
                  'Get calendar view of events',
                  'Get calendars',
                  'Find meeting times',
                  'Respond to an event invite'
                ]
              },
              {
                name: 'Contacts',
                actions: [
                  'Create contact',
                  'Get contact',
                  'Get contacts',
                  'Update contact',
                  'Delete contact',
                  'Get contact folders',
                  'Update contact photo'
                ]
              },
              {
                name: 'Advanced',
                actions: [
                  'Send HTTP request',
                  'Get mail tips',
                  'Set automatic replies',
                  'Get room lists',
                  'Get rooms',
                  'Get rooms in room list'
                ]
              }
            ]
          },
          {
            name: 'Excel Online (Business)',
            icon: CommonIcons.spreadsheet,
            color: 'bg-green-100 text-green-600',
            description: 'Connect to Excel Online (Business) to manage workbooks, tables, and worksheets',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/excelonlinebusiness/',
            publisher: 'Microsoft',
            category: 'Productivity',
            lastUpdated: '2025-03-05',
            submodules: [
              {
                name: 'Tables',
                actions: [
                  'Create table',
                  'Get tables',
                  'Add a key column to a table',
                  'Add a row into a table',
                  'Update a row',
                  'Delete a row',
                  'Get a row',
                  'List rows present in a table'
                ]
              },
              {
                name: 'Worksheets',
                actions: [
                  'Create worksheet',
                  'Get worksheets'
                ]
              },
              {
                name: 'Scripts',
                actions: [
                  'Run script',
                  'Run script from SharePoint library'
                ]
              }
            ]
          },
          {
            name: 'OneDrive for Business',
            icon: CommonIcons.hardDrive,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to OneDrive for Business to manage files and folders',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/onedriveforbusiness/',
            publisher: 'Microsoft',
            category: 'Storage',
            lastUpdated: '2025-02-28',
            submodules: [
              {
                name: 'Files',
                actions: [
                  'Create file',
                  'Get file content',
                  'Get file content using path',
                  'Get file metadata',
                  'Get file metadata using path',
                  'Update file',
                  'Delete file',
                  'Copy file',
                  'Copy file using path',
                  'Move or rename a file',
                  'Move or rename a file using path',
                  'Upload file from URL',
                  'Get file thumbnail',
                  'Convert file',
                  'Convert file using path'
                ]
              },
              {
                name: 'Folders',
                actions: [
                  'List files in folder',
                  'List files in root folder',
                  'Extract archive to folder'
                ]
              },
              {
                name: 'Search',
                actions: [
                  'Find files in folder',
                  'Find files in folder by path'
                ]
              },
              {
                name: 'Sharing',
                actions: [
                  'Create share link',
                  'Create share link by path'
                ]
              }
            ]
          },
          {
            name: 'Microsoft Teams',
            icon: CommonIcons.teams,
            color: 'bg-purple-100 text-purple-600',
            description: 'Connect to Microsoft Teams to manage teams, channels, chats, and messages',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/teams/',
            publisher: 'Microsoft',
            category: 'Communication',
            lastUpdated: '2025-03-01',
            submodules: [
              {
                name: 'Teams',
                actions: [
                  'Create a team',
                  'Get a team',
                  'List teams',
                  'Add a member to a team'
                ]
              },
              {
                name: 'Channels',
                actions: [
                  'Create a channel',
                  'List channels',
                  'Get messages',
                  'Post message in a chat or channel',
                  'Post card in a chat or channel',
                  'Reply with a message in a channel',
                  'Reply with an adaptive card in a channel',
                  'Update an adaptive card in a chat or channel'
                ]
              },
              {
                name: 'Chats',
                actions: [
                  'Create a chat',
                  'List chats',
                  'List members',
                  'Get message details'
                ]
              },
              {
                name: 'Tags',
                actions: [
                  'Create a tag for a team',
                  'List all tags for a team',
                  'Get an @mention token for a tag',
                  'Get an @mention token for a user',
                  'Add a member to a tag',
                  'Delete a member from a tag',
                  'List the members of a tag',
                  'Delete a tag'
                ]
              },
              {
                name: 'Meetings',
                actions: [
                  'Create a Teams meeting'
                ]
              },
              {
                name: 'Advanced',
                actions: [
                  'Post a feed notification',
                  'Post adaptive card and wait for a response',
                  'Send a Microsoft Graph HTTP request'
                ]
              }
            ]
          },
          {
            name: 'Word Online (Business)',
            icon: CommonIcons.word,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Word Online (Business) to work with Word documents',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/wordonlinebusiness/',
            publisher: 'Microsoft',
            category: 'Productivity',
            lastUpdated: '2025-01-15',
            submodules: [
              {
                name: 'Documents',
                actions: [
                  'Populate a Microsoft Word template',
                  'Convert Word Document to PDF'
                ]
              }
            ]
          },
          {
            name: 'Microsoft Forms',
            icon: CommonIcons.form,
            color: 'bg-purple-100 text-purple-600',
            description: 'Connect to Microsoft Forms to manage form responses',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/microsoftforms/',
            publisher: 'Microsoft',
            category: 'Productivity',
            lastUpdated: '2025-02-10',
            submodules: [
              {
                name: 'Responses',
                actions: [
                  'Get response details'
                ]
              }
            ]
          },
          {
            name: 'Planner',
            icon: CommonIcons.clipboard,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Microsoft Planner to create and manage tasks and plans',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/planner/',
            publisher: 'Microsoft',
            category: 'Productivity',
            lastUpdated: '2025-02-10',
            submodules: [
              {
                name: 'Tasks',
                actions: [
                  'Create a task',
                  'Get task details',
                  'List tasks',
                  'Update task',
                  'Delete task',
                  'Complete task',
                  'Get task details with format',
                  'List all tasks'
                ]
              },
              {
                name: 'Plans',
                actions: [
                  'Create a plan',
                  'Get plan details',
                  'List plans',
                  'Update plan',
                  'Delete plan',
                  'List buckets',
                  'Create bucket'
                ]
              }
            ]
          },
          {
            name: 'Power BI',
            icon: CommonIcons.chart,
            color: 'bg-yellow-100 text-yellow-600',
            description: 'Connect to Power BI to manage and interact with your reports and dashboards',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/powerbi/',
            publisher: 'Microsoft',
            category: 'Analytics',
            lastUpdated: '2025-03-01',
            submodules: [
              {
                name: 'Reports',
                actions: [
                  'Get reports',
                  'Get report',
                  'Export report',
                  'Refresh report',
                  'Clone report'
                ]
              },
              {
                name: 'Dashboards',
                actions: [
                  'Get dashboards',
                  'Get dashboard',
                  'Get tiles',
                  'Get tile'
                ]
              },
              {
                name: 'Datasets',
                actions: [
                  'Get datasets',
                  'Get dataset',
                  'Refresh dataset',
                  'Add rows to dataset'
                ]
              }
            ]
          },
          {
            name: 'Microsoft To Do',
            icon: CommonIcons.clipboard,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Microsoft To Do to create and manage your tasks and lists',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/todo/',
            publisher: 'Microsoft',
            category: 'Productivity',
            lastUpdated: '2025-01-05',
            submodules: [
              {
                name: 'Tasks',
                actions: [
                  'Create a task',
                  'Get task',
                  'List tasks',
                  'Update task',
                  'Delete task',
                  'Complete task'
                ]
              },
              {
                name: 'Lists',
                actions: [
                  'Create a list',
                  'Get list',
                  'List lists',
                  'Update list',
                  'Delete list'
                ]
              }
            ]
          },
          {
            name: 'OneNote',
            icon: CommonIcons.fileText,
            color: 'bg-purple-100 text-purple-600',
            description: 'Connect to OneNote to create and manage your notebooks, sections, and pages',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/onenote/',
            publisher: 'Microsoft',
            category: 'Productivity',
            lastUpdated: '2025-01-15',
            submodules: [
              {
                name: 'Pages',
                actions: [
                  'Create page',
                  'Get pages',
                  'Get page',
                  'Get page content',
                  'Update page',
                  'Delete page'
                ]
              },
              {
                name: 'Sections',
                actions: [
                  'Create section',
                  'Get sections',
                  'Get section',
                  'Update section',
                  'Delete section'
                ]
              },
              {
                name: 'Notebooks',
                actions: [
                  'Create notebook',
                  'Get notebooks',
                  'Get notebook',
                  'Update notebook',
                  'Delete notebook'
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Third-Party Services',
        icon: CommonIcons.server,
        color: 'bg-purple-100 text-purple-600',
        modules: [
          {
            name: 'Adobe Sign',
            icon: CommonIcons.fileText,
            color: 'bg-red-100 text-red-600',
            description: 'Connect to Adobe Sign to create, send, and manage agreements for e-signatures',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/adobesign/',
            publisher: 'Adobe',
            category: 'Document Management',
            lastUpdated: '2025-02-15',
            submodules: [
              {
                name: 'Agreements',
                actions: [
                  'Create an agreement',
                  'Send an agreement',
                  'Get agreement details',
                  'Get all agreements',
                  'Cancel an agreement',
                  'Delete an agreement',
                  'Download signed agreement'
                ]
              },
              {
                name: 'Recipients',
                actions: [
                  'Add recipients to agreement',
                  'Remove recipients from agreement',
                  'Get recipients of agreement'
                ]
              },
              {
                name: 'Documents',
                actions: [
                  'Upload document',
                  'Get document',
                  'Get all documents',
                  'Delete document'
                ]
              }
            ]
          },
          {
            name: 'Adobe PDF Tools',
            icon: CommonIcons.filePdf,
            color: 'bg-red-100 text-red-600',
            description: 'Connect to Adobe PDF Tools to create, manipulate, and extract content from PDF documents',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/adobepdftools/',
            publisher: 'Adobe',
            category: 'Document Management',
            lastUpdated: '2025-03-01',
            submodules: [
              {
                name: 'Document Operations',
                actions: [
                  'Create PDF from file',
                  'Create PDF from HTML',
                  'Combine PDF files',
                  'Split PDF',
                  'Compress PDF',
                  'Convert PDF to image',
                  'Convert PDF to document format',
                  'Protect PDF with password',
                  'Remove password from PDF'
                ]
              },
              {
                name: 'Content Operations',
                actions: [
                  'Extract text from PDF',
                  'Extract tables from PDF',
                  'Extract images from PDF',
                  'OCR PDF document'
                ]
              }
            ]
          },
          {
            name: 'Azure DevOps',
            icon: CommonIcons.code,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Azure DevOps to manage work items, builds, and repositories',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/visualstudioteamservices/',
            publisher: 'Microsoft',
            category: 'Development',
            lastUpdated: '2025-02-20',
            submodules: [
              {
                name: 'Work Items',
                actions: [
                  'Create work item',
                  'Get work item',
                  'Update work item',
                  'Get work items',
                  'Query work items',
                  'Add comment to work item',
                  'Get work item comments'
                ]
              },
              {
                name: 'Builds',
                actions: [
                  'Queue a build',
                  'Get builds',
                  'Get build',
                  'Update build',
                  'Get build logs'
                ]
              },
              {
                name: 'Git',
                actions: [
                  'Get repositories',
                  'Get repository',
                  'Get commits',
                  'Get pull requests',
                  'Create pull request',
                  'Update pull request'
                ]
              }
            ]
          },
          {
            name: 'Bing Maps',
            icon: CommonIcons.globe,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Bing Maps to get location information, calculate routes, and find points of interest',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/bingmaps/',
            publisher: 'Microsoft',
            category: 'Geolocation',
            lastUpdated: '2025-01-15',
            submodules: [
              {
                name: 'Location',
                actions: [
                  'Get location by address',
                  'Get address by location',
                  'Get location by query',
                  'Get time zone'
                ]
              },
              {
                name: 'Routes',
                actions: [
                  'Calculate route',
                  'Calculate distance matrix',
                  'Calculate isochrone',
                  'Get traffic incidents'
                ]
              },
              {
                name: 'Search',
                actions: [
                  'Find nearby points of interest',
                  'Search by category',
                  'Search by query'
                ]
              }
            ]
          },
          {
            name: 'Bitly',
            icon: CommonIcons.linkIcon,
            color: 'bg-orange-100 text-orange-600',
            description: 'Connect to Bitly to create and manage shortened URLs',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/bitly/',
            publisher: 'Bitly',
            category: 'Marketing',
            lastUpdated: '2025-01-10',
            submodules: [
              {
                name: 'Links',
                actions: [
                  'Create a Bitlink',
                  'Get a Bitlink',
                  'Update a Bitlink',
                  'Get clicks for a Bitlink',
                  'Get clicks summary for a Bitlink',
                  'Get metrics by countries',
                  'Get metrics by referrers'
                ]
              },
              {
                name: 'Groups',
                actions: [
                  'Get groups',
                  'Get group',
                  'Get Bitlinks by group',
                  'Get clicks for a group',
                  'Get metrics by cities'
                ]
              }
            ]
          },
          {
            name: 'Box',
            icon: CommonIcons.folder,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Box to manage files and folders in your Box account',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/box/',
            publisher: 'Box',
            category: 'Storage',
            lastUpdated: '2025-02-05',
            submodules: [
              {
                name: 'Files',
                actions: [
                  'Create file',
                  'Get file content',
                  'Get file information',
                  'Update file',
                  'Delete file',
                  'Copy file',
                  'Move file',
                  'Download file',
                  'Upload file'
                ]
              },
              {
                name: 'Folders',
                actions: [
                  'Create folder',
                  'Get folder items',
                  'Get folder information',
                  'Update folder',
                  'Delete folder',
                  'Copy folder',
                  'Move folder'
                ]
              },
              {
                name: 'Comments',
                actions: [
                  'Add comment to file',
                  'Get comments on file',
                  'Reply to comment',
                  'Delete comment'
                ]
              }
            ]
          },
          {
            name: 'Dropbox',
            icon: CommonIcons.hardDrive,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Dropbox to manage files and folders in your Dropbox account',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/dropbox/',
            publisher: 'Dropbox',
            category: 'Storage',
            lastUpdated: '2025-01-25',
            submodules: [
              {
                name: 'Files',
                actions: [
                  'Create file',
                  'Get file content',
                  'Get file metadata',
                  'Update file',
                  'Delete file',
                  'Copy file',
                  'Move file',
                  'Search for files and folders',
                  'Upload file'
                ]
              },
              {
                name: 'Folders',
                actions: [
                  'Create folder',
                  'List folder contents',
                  'Delete folder',
                  'Copy folder',
                  'Move folder'
                ]
              },
              {
                name: 'Sharing',
                actions: [
                  'Create shared link',
                  'List shared links',
                  'Get shared link metadata',
                  'Remove shared link'
                ]
              }
            ]
          },
          {
            name: 'GitHub',
            icon: CommonIcons.git,
            color: 'bg-gray-100 text-gray-600',
            description: 'Connect to GitHub to manage repositories, issues, and pull requests',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/github/',
            publisher: 'GitHub',
            category: 'Development',
            lastUpdated: '2025-02-10',
            submodules: [
              {
                name: 'Repositories',
                actions: [
                  'Create repository',
                  'Get repository',
                  'List repositories',
                  'Get repository content',
                  'Create or update file content',
                  'Delete file'
                ]
              },
              {
                name: 'Issues',
                actions: [
                  'Create issue',
                  'Get issue',
                  'List issues',
                  'Update issue',
                  'Add comment to issue',
                  'List comments on issue',
                  'Add assignees to issue',
                  'Add labels to issue'
                ]
              },
              {
                name: 'Pull Requests',
                actions: [
                  'Create pull request',
                  'Get pull request',
                  'List pull requests',
                  'Update pull request',
                  'Merge pull request',
                  'List pull request reviews',
                  'Create pull request review'
                ]
              },
              {
                name: 'Branches',
                actions: [
                  'Get branch',
                  'List branches',
                  'Create reference',
                  'Get reference',
                  'List references'
                ]
              }
            ]
          },
          {
            name: 'Jira',
            icon: CommonIcons.clipboard,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Jira to manage issues, projects, and workflows',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/jira/',
            publisher: 'Atlassian',
            category: 'Project Management',
            lastUpdated: '2025-02-15',
            submodules: [
              {
                name: 'Issues',
                actions: [
                  'Create issue',
                  'Get issue',
                  'Update issue',
                  'Delete issue',
                  'Search issues',
                  'Assign issue',
                  'Add comment to issue',
                  'Get comments on issue',
                  'Add attachment to issue',
                  'Get issue attachments'
                ]
              },
              {
                name: 'Projects',
                actions: [
                  'Get project',
                  'List projects',
                  'Get project components',
                  'Get project versions',
                  'Get project issues'
                ]
              },
              {
                name: 'Workflows',
                actions: [
                  'Get workflow',
                  'List workflows',
                  'Get workflow transitions',
                  'Transition issue'
                ]
              },
              {
                name: 'Users',
                actions: [
                  'Get user',
                  'Search users',
                  'Get current user'
                ]
              }
            ]
          },
          {
            name: 'Salesforce',
            icon: CommonIcons.cloud,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to Salesforce to manage customer data, leads, opportunities, and more',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/salesforce/',
            publisher: 'Salesforce',
            category: 'CRM',
            lastUpdated: '2025-02-25',
            submodules: [
              {
                name: 'Accounts',
                actions: [
                  'Create account',
                  'Get account',
                  'Update account',
                  'Delete account',
                  'Search accounts',
                  'Get account contacts'
                ]
              },
              {
                name: 'Contacts',
                actions: [
                  'Create contact',
                  'Get contact',
                  'Update contact',
                  'Delete contact',
                  'Search contacts'
                ]
              },
              {
                name: 'Leads',
                actions: [
                  'Create lead',
                  'Get lead',
                  'Update lead',
                  'Delete lead',
                  'Search leads',
                  'Convert lead'
                ]
              },
              {
                name: 'Opportunities',
                actions: [
                  'Create opportunity',
                  'Get opportunity',
                  'Update opportunity',
                  'Delete opportunity',
                  'Search opportunities',
                  'Get opportunity contacts'
                ]
              },
              {
                name: 'Cases',
                actions: [
                  'Create case',
                  'Get case',
                  'Update case',
                  'Delete case',
                  'Search cases',
                  'Add comment to case'
                ]
              }
            ]
          },
          {
            name: 'Google Calendar',
            icon: CommonIcons.calendar,
            color: 'bg-red-100 text-red-600',
            description: 'Connect to Google Calendar to manage events, calendars, and attendees',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/googlecalendar/',
            publisher: 'Google',
            category: 'Productivity',
            lastUpdated: '2025-01-20',
            submodules: [
              {
                name: 'Events',
                actions: [
                  'Create event',
                  'Get event',
                  'Update event',
                  'Delete event',
                  'List events',
                  'Quick add event',
                  'Accept event',
                  'Decline event',
                  'Tentatively accept event'
                ]
              },
              {
                name: 'Calendars',
                actions: [
                  'Create calendar',
                  'Get calendar',
                  'Update calendar',
                  'Delete calendar',
                  'List calendars',
                  'Clear calendar'
                ]
              },
              {
                name: 'Attendees',
                actions: [
                  'Add attendee to event',
                  'Remove attendee from event',
                  'Get event attendees'
                ]
              },
              {
                name: 'Free/Busy',
                actions: [
                  'Get free/busy schedule',
                  'Find available time'
                ]
              }
            ]
          },
          {
            name: 'Google Drive',
            icon: CommonIcons.hardDrive,
            color: 'bg-green-100 text-green-600',
            description: 'Connect to Google Drive to manage files and folders in your Google Drive account',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/googledrive/',
            publisher: 'Google',
            category: 'Storage',
            lastUpdated: '2025-01-18',
            submodules: [
              {
                name: 'Files',
                actions: [
                  'Create file',
                  'Get file content',
                  'Get file metadata',
                  'Update file',
                  'Delete file',
                  'Copy file',
                  'Download file',
                  'Upload file',
                  'Export file',
                  'Search files'
                ]
              },
              {
                name: 'Folders',
                actions: [
                  'Create folder',
                  'Get folder contents',
                  'Get folder metadata',
                  'Update folder',
                  'Delete folder',
                  'Copy folder',
                  'Move folder',
                  'Search folders'
                ]
              },
              {
                name: 'Permissions',
                actions: [
                  'Add permission',
                  'Get permissions',
                  'Update permission',
                  'Delete permission',
                  'Share file'
                ]
              },
              {
                name: 'Comments',
                actions: [
                  'Add comment',
                  'Get comments',
                  'Update comment',
                  'Delete comment',
                  'Reply to comment'
                ]
              }
            ]
          },
          {
            name: 'Google Sheets',
            icon: CommonIcons.spreadsheet,
            color: 'bg-green-100 text-green-600',
            description: 'Connect to Google Sheets to manage spreadsheets, worksheets, and data',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/googlesheets/',
            publisher: 'Google',
            category: 'Productivity',
            lastUpdated: '2025-01-15',
            submodules: [
              {
                name: 'Spreadsheets',
                actions: [
                  'Create spreadsheet',
                  'Get spreadsheet',
                  'Update spreadsheet properties',
                  'Delete spreadsheet',
                  'List spreadsheets'
                ]
              },
              {
                name: 'Worksheets',
                actions: [
                  'Add worksheet',
                  'Get worksheet',
                  'Update worksheet properties',
                  'Delete worksheet',
                  'List worksheets',
                  'Clear worksheet'
                ]
              },
              {
                name: 'Data',
                actions: [
                  'Get values',
                  'Update values',
                  'Append values',
                  'Clear values',
                  'Get row',
                  'Add row',
                  'Update row',
                  'Delete row'
                ]
              },
              {
                name: 'Formatting',
                actions: [
                  'Format range',
                  'Set conditional formatting',
                  'Create chart',
                  'Create filter view'
                ]
              }
            ]
          },
          {
            name: 'Google Tasks',
            icon: CommonIcons.clipboard,
            color: 'bg-green-100 text-green-600',
            description: 'Connect to Google Tasks to manage tasks and task lists',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/googletasks/',
            publisher: 'Google',
            category: 'Productivity',
            lastUpdated: '2025-01-12',
            submodules: [
              {
                name: 'Tasks',
                actions: [
                  'Create task',
                  'Get task',
                  'Update task',
                  'Delete task',
                  'List tasks',
                  'Complete task',
                  'Move task',
                  'Clear completed tasks'
                ]
              },
              {
                name: 'Task Lists',
                actions: [
                  'Create task list',
                  'Get task list',
                  'Update task list',
                  'Delete task list',
                  'List task lists'
                ]
              }
            ]
          },
          {
            name: 'LinkedIn',
            icon: CommonIcons.linkedinIcon,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to LinkedIn to manage your professional network, share content, and engage with your audience',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/linkedinv2/',
            publisher: 'LinkedIn',
            category: 'Social Media',
            lastUpdated: '2025-02-08',
            submodules: [
              {
                name: 'Profile',
                actions: [
                  'Get profile',
                  'Get profile picture',
                  'Update profile',
                  'Get profile statistics'
                ]
              },
              {
                name: 'Connections',
                actions: [
                  'Get connections',
                  'Get connection by ID',
                  'Send connection invitation',
                  'Get pending invitations',
                  'Accept invitation',
                  'Ignore invitation'
                ]
              },
              {
                name: 'Posts',
                actions: [
                  'Share post',
                  'Get post',
                  'Delete post',
                  'Get post statistics',
                  'Get post comments',
                  'Comment on post',
                  'Like post'
                ]
              },
              {
                name: 'Companies',
                actions: [
                  'Get company',
                  'Get company followers',
                  'Get company updates',
                  'Share company update',
                  'Get company statistics'
                ]
              }
            ]
          },
          {
            name: 'SAP',
            icon: CommonIcons.database,
            color: 'bg-blue-100 text-blue-600',
            description: 'Connect to SAP to manage business processes, data, and integrations',
            documentationUrl: 'https://learn.microsoft.com/en-us/connectors/sap/',
            publisher: 'SAP',
            category: 'Enterprise',
            lastUpdated: '2025-02-18',
            submodules: [
              {
                name: 'Business Objects',
                actions: [
                  'Create business object',
                  'Get business object',
                  'Update business object',
                  'Delete business object',
                  'Query business objects'
                ]
              },
              {
                name: 'OData',
                actions: [
                  'Get entities',
                  'Get entity',
                  'Create entity',
                  'Update entity',
                  'Delete entity',
                  'Call function import'
                ]
              },
              {
                name: 'BAPI',
                actions: [
                  'Execute BAPI',
                  'Get BAPI metadata',
                  'Get available BAPIs'
                ]
              },
              {
                name: 'RFC',
                actions: [
                  'Execute RFC',
                  'Get RFC metadata',
                  'Get available RFCs'
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];