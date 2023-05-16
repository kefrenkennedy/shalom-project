export function generateImageUrl(filename: string) {
  const API_URL = String(process.env.NEXT_PUBLIC_API);
  return `${API_URL}/files/${filename}`;
}
