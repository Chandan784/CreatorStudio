// src/utils/decodeToken.js
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token); // Decode the token
    return decoded; // Return the decoded payload (user details)
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null if the token is invalid
  }
};
