import * as MobileDetect from 'mobile-detect'

export function isMobile(): boolean {
  const md = new MobileDetect(window.navigator.userAgent)
  return !!md.mobile()
}
