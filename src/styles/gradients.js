export const darkGradientPalettes = [
  // Deep Blues
  ["blue.800", "blue.900", "gray.900"],
  ["cyan.800", "blue.900", "gray.900"],
  ["teal.800", "blue.900", "gray.900"],

  // Purple Hues
  ["purple.800", "purple.900", "gray.900"],
  ["pink.800", "purple.900", "gray.900"],
  ["violet.800", "purple.900", "gray.900"],

  // Warm Darks
  ["yellow.800", "orange.900", "gray.900"],

  // Cool Darks
  ["teal.800", "cyan.900", "gray.900"],
  ["cyan.800", "teal.900", "gray.900"],
  ["blue.800", "teal.900", "gray.900"],

  // Neutral Darks
  ["gray.700", "gray.800", "gray.900"],
  ["gray.800", "blue.900", "gray.900"],
  ["gray.800", "purple.900", "gray.900"]
]

export const lightGradientPalettes = [
  // Blues
  ["blue.100", "blue.200", "gray.100"],
  ["cyan.100", "blue.200", "gray.100"],
  ["teal.100", "blue.200", "gray.100"],

  // Purples
  ["purple.100", "purple.200", "gray.100"],
  ["pink.100", "purple.200", "gray.100"],
  ["violet.100", "purple.200", "gray.100"],

  // Warm Lights
  ["yellow.100", "orange.200", "gray.100"],

  // Cool Lights
  ["teal.100", "cyan.200", "gray.100"],
  ["cyan.100", "teal.200", "gray.100"],
  ["blue.100", "teal.200", "gray.100"],

  // Neutral Lights
//   ["gray.100", "gray.200", "white"],
//   ["gray.100", "blue.200", "white"],
//   ["gray.100", "purple.200", "white"]
]

export const getRandomGradient = (colorMode) => {
  const palettes = darkGradientPalettes
  return darkGradientPalettes[Math.floor(Math.random() * palettes.length)]
}