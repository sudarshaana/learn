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
  ["gray.800", "purple.900", "gray.900"],

  // Mixed Combinations
  ["purple.800", "blue.900", "gray.900"],
  ["teal.800", "purple.900", "gray.900"],
  ["blue.800", "purple.900", "gray.900"],
  ["cyan.800", "purple.900", "gray.900"],
  ["violet.800", "blue.900", "gray.900"]
]

export const getRandomGradient = () =>
  darkGradientPalettes[Math.floor(Math.random() * darkGradientPalettes.length)]