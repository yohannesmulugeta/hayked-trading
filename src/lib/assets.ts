export function assetUrl(path: string): string {
  if (!path || /^(?:https?:|data:|blob:)/i.test(path)) {
    return path;
  }

  const cleanPath = path.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
