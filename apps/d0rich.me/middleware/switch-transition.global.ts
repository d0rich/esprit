import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  // If first page in session
  if (to.fullPath === from.fullPath) return
  // If local navigation
  if (
    to.path === from.path &&
    (to.fullPath.includes('#') || from.fullPath.includes('#'))
  )
    return
  const sectionBefore = from.path.split('/')[1]
  const sectionAfter = to.path.split('/')[1]
  if (sectionBefore === sectionAfter) {
    from.meta.pageTransition = {
      name: 'section',
      leaveActiveClass: '',
      leaveFromClass: '',
      leaveToClass: ''
    }
    to.meta.pageTransition = {
      name: 'section',
      enterActiveClass: '',
      enterFromClass: '',
      enterToClass: ''
    }
  }
})
