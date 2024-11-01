import { IconButton, useColorMode } from "@chakra-ui/react"
import { Sun, Moon } from "lucide-react"

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      position="fixed"
      top={4}
      right={4}
      icon={colorMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      onClick={toggleColorMode}
      variant="ghost"
      color="gray.400"
      _hover={{ color: "gray.100" }}
    />
  )
}