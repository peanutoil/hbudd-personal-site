export function checkAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  return password === adminPassword;
}

export function getAdminPasswordHash(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}
