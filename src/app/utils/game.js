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
    console.error(
      "Error starting game:",
      error.response?.data || error.message
    );
    return {
      error: `Error starting game:,
      ${error.response?.data || error.message}`,
    };
  }
}

export async function gameMove({ guess, id }) {
  try {
    const token = getToken();

    if (!token || !isTokenValid()) {
      console.error("Invalid or expired token.");

      return { error: "Session expired. Please log in again." };
    }

    const response = await axios.post(
      `https://gkai-fullstack.onrender.com/api/game/${id}/move`,
      { guess },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    return {
      error: `Error starting game:,
      ${error.response?.data || error.message}`,
    };
  }
}

export async function getOngoingGames() {
  try {
    const token = getToken();

    if (!token || !isTokenValid()) {
      console.error("Invalid or expired token.");

      return { error: "Session expired. Please log in again." };
    }

    const response = await axios.get(
      "https://gkai-fullstack.onrender.com/api/game/ongoing-game",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );

    return response.data.games;
  } catch (error) {
    console.log(error);
    console.error(
      "Error fetching game:",
      error.response?.data || error.message
    );
    return {
      error: `Error fetching game:,
      ${error.response?.data || error.message}`,
    };
  }
}
