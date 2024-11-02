import PropTypes from 'prop-types'
import { Input, Box } from "@chakra-ui/react"
import { useEffect, useRef } from 'react'
import { motion } from "framer-motion"

export const InputSection = ({
    userInput,
    onInputChange,
    onKeyDown,
    isCorrect
}) => {
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [userInput])

    return (
        <motion.div
            style={{ width: '100%' }}
            animate={isCorrect === false ? {
                x: [-10, 10, -10, 10, 0],
                transition: { duration: 0.4 }
            } : {}}
        >
            <Box
                position="relative"
                width="full"
            >
                <Input
                    ref={inputRef}
                    placeholder="Type the correct spelling"
                    value={userInput}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    aria-label="Enter correct spelling"
                    bg="whiteAlpha.50"
                    borderWidth={0}
                    borderColor={
                        isCorrect === true ? "green.500" :
                            isCorrect === false ? "red.500" :
                                "whiteAlpha.200"
                    }
                    color="white"
                    textAlign="center"
                    fontSize={{ base: "lg", md: "xl" }}
                    height={{ base: "50px", md: "60px" }}
                    _placeholder={{
                        color: "whiteAlpha.400",
                        fontSize: { base: "md", md: "lg" }
                    }}
                    _focus={{
                        borderColor: isCorrect === true ? "green.500" :
                            isCorrect === false ? "red.500" :
                                "whiteAlpha.400",
                        bg: "whiteAlpha.100",
                        boxShadow: isCorrect === true ? "0 0 0 1px var(--chakra-colors-green-500)" :
                            isCorrect === false ? "0 0 0 1px var(--chakra-colors-red-500)" :
                                "none"
                    }}
                    _hover={{
                        borderColor: "whiteAlpha.400",
                        bg: "whiteAlpha.100"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    letterSpacing="0.5px"
                    fontWeight="medium"
                    sx={{
                        '&::selection': {
                            bg: 'whiteAlpha.200'
                        }
                    }}
                />
            </Box>
        </motion.div>
    )
}

InputSection.propTypes = {
    userInput: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    isCorrect: PropTypes.bool
}