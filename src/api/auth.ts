import { API_URL } from "../config";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response.json();
};

type SignUpProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export const signup = async ({ name, email, phone, password }: SignUpProps) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      phone,
    }),
  });

  return response.json();
};

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
