import { jwtDecode } from "jwt-decode"; // For decoding the JWT token

/**
 * Retrieves the user object from the token stored in local storage.
 * @returns {Object|null} The decoded user object, or null if no token is found or the token is invalid.
 */
export default function getUser() {
  // Step 1: Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Step 2: Check if the token exists
  if (!token) {
    console.log("No token found in local storage.");
    return null;
  }

  try {
    // Step 3: Decode the token
    const decodedUser = jwtDecode(token);

    // Step 4: Return the decoded user object
    return decodedUser;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
