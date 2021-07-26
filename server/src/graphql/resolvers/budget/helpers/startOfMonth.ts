export function startOfMonth(date?: Date) {
  const d = date || new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
