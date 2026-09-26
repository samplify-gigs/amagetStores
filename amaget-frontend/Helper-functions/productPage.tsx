export function formatCategoryLabel(cat: string | null | undefined): string {
  if (!cat) return "Category";

  return cat
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}