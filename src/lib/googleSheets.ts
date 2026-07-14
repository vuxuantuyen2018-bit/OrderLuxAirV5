import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, type User } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";
import { GOOGLE_SHEETS_CONFIG } from "./config";

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Request Google Sheets scope
provider.addScope("https://www.googleapis.com/auth/spreadsheets");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get access token from Firebase Auth");
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const setAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

interface OrderData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  quantity: number;
}

export const appendOrderToSheet = async (order: OrderData, token: string): Promise<boolean> => {
  try {
    const range = `${GOOGLE_SHEETS_CONFIG.sheetName}!A:F`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;
    
    const row = [
      order.fullName,
      order.phone,
      order.email,
      order.address,
      order.notes || "",
      order.quantity
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        values: [row]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Sheets API error:", errorData);
      throw new Error(errorData.error?.message || "Failed to append row to sheet");
    }

    return true;
  } catch (error) {
    console.error("Error appending order to Google Sheet:", error);
    throw error;
  }
};

export const appendOrderViaAppsScript = async (order: OrderData, appsScriptUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      mode: "no-cors", // Required because of GAS redirect behavior and CORS header omission
      headers: {
        "Content-Type": "text/plain;charset=utf-8" // Avoid preflight request trigger
      },
      body: JSON.stringify(order)
    });

    // In no-cors mode, we won't get a readable response body, but the browser successfully issues the request.
    return true;
  } catch (error) {
    console.error("Error sending order to Apps Script:", error);
    throw error;
  }
};
