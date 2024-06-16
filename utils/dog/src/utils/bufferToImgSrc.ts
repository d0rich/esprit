export function bufferToImgSrc(
  buffer: Buffer,
  ext: 'png' | 'ico' = 'png'
): string {
  const str = `data:image/${ext};base64, ` + buffer.toString('base64')
  return str
}
