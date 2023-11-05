export function removeTrailingSlash(path: string) {
  if (path === '/' || !path.endsWith('/')) return path
  return path.replace(/\/+$/, '') || '/'
}

export function clearSlug(slug: string[]) {
  return slug.filter((part) => !!part)
}
