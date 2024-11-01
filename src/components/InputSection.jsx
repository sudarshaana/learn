import PropTypes from 'prop-types'
import { Input } from "@chakra-ui/react"
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
            <Input
                ref={inputRef}
                placeholder="Type the correct spelling"
                value={userInput}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                aria-label="Enter correct spelling"
                bg="gray.800"
                borderWidth={2}
                borderColor={
                    isCorrect === true ? "green.500" :
                        isCorrect === false ? "red.500" :
                            "gray.600"
                }
                color="gray.100"
                textAlign="center"
                _placeholder={{ color: "gray.400" }}
                _focus={{
                    borderColor: isCorrect === true ? "green.500" :
                        isCorrect === false ? "red.500" :
                            "gray.800"
                }}
                _hover={{
                    borderColor: isCorrect === true ? "green.500" :
                        isCorrect === false ? "red.500" :
                            "gray.800"
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                size="lg"
            />
        </motion.div>
    )
}

InputSection.propTypes = {
    userInput: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    isCorrect: PropTypes.bool
}