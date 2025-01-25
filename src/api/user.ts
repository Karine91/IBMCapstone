import { API_URL } from "../config";
import { User } from "../types";

export const fetchProfile = async (email: string, token: string) => {
  const response = await fetch(`${API_URL}/api/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Email: email, // Add the email to the headers
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch user profile");
  }
};

export const updateProfile = async ({
  email,
  token,
  data,
}: {
  email: string;
  token: string;
  data: User;
}) => {
  const response = await fetch(`${API_URL}/api/auth/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Email: email, // Add the email to the headers
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch user profile");
  }
};
