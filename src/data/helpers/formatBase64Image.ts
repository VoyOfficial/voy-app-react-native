export const formatBase64Image = (base64String: string): string => {
  if (!base64String) return '';
  if (base64String.startsWith('data:')) return base64String;
  return `data:image/png;base64,${base64String}`;
};
