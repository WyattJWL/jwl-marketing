// Admin auth — JSON file based, no DB needed
export const ADMIN_PASSWORD = '100124'

export function checkPassword(pwd: string): boolean {
  return pwd === ADMIN_PASSWORD
}
