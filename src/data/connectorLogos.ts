/**
 * This file provides mappings between connector names and their official Microsoft logo URLs
 * from the Microsoft Connector Reference: https://learn.microsoft.com/en-us/connectors/connector-reference/
 */

// Base URL for local connector icons
// Include the base path for development and production
const BASE_PATH = import.meta.env.BASE_URL || '/';
const MS_CONNECTOR_ICON_BASE = `${BASE_PATH}images/connectors`;

// Map of connector names to their icon paths
// Format: 'connector-name': '/path/to/icon.png'
export const connectorLogoMap: Record<string, string> = {
  // Microsoft 365 connectors
  'SharePoint': '/SharePoint.png',
  'OneDrive for Business': '/OneDrive for Business.png',
  'Office 365 Outlook': '/Office 365 Outlook.png',
  'Excel Online (Business)': '/Excel Online (Business).png',
  'Microsoft Teams': '/Microsoft Teams.png',
  'Word Online (Business)': '/Word Online (Business).png',
  'OneNote': '/OneNote (Business).png',
  'Planner': '/Planner.png',
  'Power BI': '/Power BI.png',
  'Microsoft Forms': '/Microsoft Forms.png',
  'Microsoft To Do': '/Microsoft To-Do (Business).png',
  
  // Azure connectors
  'Azure Blob Storage': '/Azure Blob Storage.png',
  'SQL Server': '/SQL Server.png',
  'Azure Key Vault': '/Azure Key Vault.png',
  'Azure OpenAI': '/Azure OpenAI.png',
  'Azure DevOps': '/Azure DevOps.png',
  
  // Third-party connectors
  'Adobe Sign': '/Adobe Acrobat Sign.png',
  'Adobe PDF Tools': '/Adobe PDF Services.png',
  'Bing Maps': '/Bing Maps.png',
  'Bitly': '/Bitly.png',
  'Box': '/Box.png',
  'Dropbox': '/Dropbox.png',
  'GitHub': '/GitHub.png',
  'Google Calendar': '/Google Calendar.png',
  'Google Drive': '/Google Drive.png',
  'Google Sheets': '/Google Sheets.png',
  'Google Tasks': '/Google Tasks.png',
  'Jira': '/Jira.png',
  'LinkedIn': '/LinkedIn V2.png',
  'Salesforce': '/Salesforce.png',
  'SAP': '/SAP.png',
  'SAP ERP': '/SAP ERP.png',
  'SurveyMonkey': '/SurveyMonkey.png',
  
  // Dynamics 365 connectors
  'Dynamics 365 Business Central': '/Dynamics 365 Business Central.png',
  'Dynamics 365 Customer Voice': '/Dynamics 365 Customer Voice.png',
  'Dynamics 365 Fraud Protection': '/Dynamics 365 Fraud Protection (Preview).png',
  
  // Default for any connector without a specific logo
  'Default': '/Default connector.png',
};

/**
 * Get the full URL for a connector logo
 * @param connectorName The name of the connector
 * @returns The full URL to the connector logo, or a default logo if not found
 */
export function getConnectorLogoUrl(connectorName: string): string {
  const logoPath = connectorLogoMap[connectorName];
  if (!logoPath) {
    // Return default placeholder if no specific logo is found
    return `${MS_CONNECTOR_ICON_BASE}/Placeholder.png`;
  }
  
  return `${MS_CONNECTOR_ICON_BASE}${logoPath}`;
}

/**
 * Check if a connector has an official Microsoft logo
 * @param connectorName The name of the connector
 * @returns True if the connector has an official logo, false otherwise
 */
export function hasConnectorLogo(connectorName: string): boolean {
  return connectorName in connectorLogoMap;
}
