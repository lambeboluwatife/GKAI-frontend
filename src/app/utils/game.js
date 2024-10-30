import axios from "axios";
import { getToken, isTokenValid } from "./tokenUtils";

export async function startGame({ data }) {
  try {
    const token = getToken();

    if (!token || !isTokenValid()) {
      console.error("Invalid or expired token.");
      return { error: "Session expired. Please log in again." };
    }

    const response = await axios.post(
      "https://gkai-fullstack.onrender.com/api/game/start",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    console.error(
      "Error starting game:",
      error.response?.data || error.message
    );
    return { error: "Failed to start game." };
  }
}
