export function formatFineness(fineness: string | null | undefined): string {
  if (!fineness) return "-";
  return `${fineness}‰`;
}
