// Configuration for Google Sheets Integration
export const GOOGLE_SHEETS_CONFIG = {
  // The Spreadsheet ID from your Google Sheet URL
  spreadsheetId: "1THWURCQO6nfik52NaCnkFdj8plwdJsL9If084Tai_1I",
  
  // The name of the specific sheet/tab where orders are saved
  sheetName: "LUX AIR V5",

  // --- GOOGLE APPS SCRIPT CONFIGURATION (RECOMMENDED FOR PRODUCTION) ---
  // If you use Google Apps Script, customers do NOT need to log in to Google.
  // Set to true to enable Apps Script mode, false to use standard Google Login.
  useAppsScript: true,

  // Paste your deployed Google Apps Script Web App URL here after publishing.
  // Example: "https://script.google.com/macros/s/AKfycby.../exec"
  appsScriptUrl: (import.meta as any).env?.VITE_APPS_SCRIPT_URL || ""
};
