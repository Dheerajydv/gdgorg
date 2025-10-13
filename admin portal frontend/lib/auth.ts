export interface User {
  username: string
  role: "Super Admin" | "Event Manager" | "Sponsor Manager" | "Team Manager"
  name: string
}

export interface Credentials {
  username: string
  password: string
  role: User["role"]
  name: string
}

// Hardcoded credentials
export const VALID_CREDENTIALS: Credentials[] = [
  {
    username: "member@gdg@2025",
    password: "name_surname_12345678900987654321",
    role: "Super Admin",
    name: "Admin User",
  },
  {
    username: "event@gdg.com",
    password: "event_manager_2025",
    role: "Event Manager",
    name: "Event Manager",
  },
  {
    username: "sponsor@gdg.com",
    password: "sponsor_manager_2025",
    role: "Sponsor Manager",
    name: "Sponsor Manager",
  },
  {
    username: "team@gdg.com",
    password: "team_manager_2025",
    role: "Team Manager",
    name: "Team Manager",
  },
]

export function validateCredentials(username: string, password: string): User | null {
  const credential = VALID_CREDENTIALS.find((cred) => cred.username === username && cred.password === password)

  if (credential) {
    return {
      username: credential.username,
      role: credential.role,
      name: credential.name,
    }
  }

  return null
}
