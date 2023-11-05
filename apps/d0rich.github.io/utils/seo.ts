export function addTrailingSlash(path?: string) {
  if (!path) {
    return '/'
  }
  if (path.endsWith('/')) {
    return path
  }
  return `${path}/`
}
