/** @type {import('tailwindcss/plugin')} */
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss/colors')} */
const colors = require('tailwindcss/colors')

const deprecatedTailwindColors = [
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray'
]
const X_OFFSET_VAR = '--tw-ss-x-offset'
const Y_OFFSET_VAR = '--tw-ss-y-offset'
const COLOR_VAR = '--tw-ss-color'

const defaultStyle = {
  [X_OFFSET_VAR]: '0px',
  [Y_OFFSET_VAR]: '0px',
  // [COLOR_VAR]: 'white',
  '--tw-drop-shadow': `drop-shadow(var(${X_OFFSET_VAR}) var(${Y_OFFSET_VAR}) 0px var(${COLOR_VAR}))`,
  filter:
    'var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)'
}

function direction2vector(direction) {
  let x = 0
  let y = 0
  if (direction.includes('t')) y = -4
  if (direction.includes('b')) y = 4
  if (direction.includes('l')) x = -4
  if (direction.includes('r')) x = 4
  return { x, y }
}

function generateDirections() {
  const directions = ['t', 'tr', 'tl', 'b', 'bl', 'br', 'r', 'l']
  const offsets = [0, 1, 2, 3, 4, 5]
  const result = {}
  for (const dir of directions) {
    const { x, y } = direction2vector(dir)
    for (const offset of offsets) {
      const newVariant = {
        [X_OFFSET_VAR]: x * offset + 'px',
        [Y_OFFSET_VAR]: y * offset + 'px'
      }
      if (x === 0) delete newVariant[X_OFFSET_VAR]
      if (y === 0) delete newVariant[Y_OFFSET_VAR]
      result[`.ss-${dir}-${offset}`] = newVariant
    }
  }
  return result
}

function generateColors(themeColors) {
  const result = {}
  const filteredTailwindColors = {}
  for (const colorKey in colors) {
    if (!deprecatedTailwindColors.includes(colorKey)) {
      filteredTailwindColors[colorKey] = colors[colorKey]
    }
  }
  const localColors = {
    ...filteredTailwindColors,
    ...themeColors
  }
  for (const colorKey in localColors) {
    if (
      [
        'inherit',
        'current',
        'transparent',
        'warmGray',
        'trueGray',
        'coolGray',
        'blueGray',
        'lightBlue'
      ].includes(colorKey)
    ) {
      continue
    }
    if (typeof localColors[colorKey] === 'string') {
      result[`.ss-${colorKey}`] = {
        [COLOR_VAR]: localColors[colorKey]
      }
    } else if (typeof localColors[colorKey] === 'object') {
      for (const colorVariantKey in localColors[colorKey]) {
        result[`.ss-${colorKey}-${colorVariantKey}`] = {
          [COLOR_VAR]: localColors[colorKey][colorVariantKey]
        }
      }
    }
  }
  return result
}

module.exports = plugin(function ({ addUtilities, config }) {
  addUtilities({
    '.sharp-shadow': defaultStyle,
    ...generateDirections(),
    ...generateColors(config().theme.colors)
  })
})
