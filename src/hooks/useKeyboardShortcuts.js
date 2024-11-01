import { useEffect } from 'react'

export const useKeyboardShortcuts = ({
  showHistory,
  setShowHistory,
  nextWord,
  prevWord,
  setShowCorrectWord,
  speakWord,
  currentWord
}) => {
  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      // Handle ESC key for history window first
      if (e.key === 'Escape' && showHistory) {
        e.preventDefault()
        setShowHistory(false)
        return
      }

      // If history is open, don't process other shortcuts
      if (showHistory) {
        return
      }

      const isModifierKey = e.metaKey || e.ctrlKey

      // Skip (Next Word) - Cmd/Ctrl + S or Space
      if ((isModifierKey && e.key === 's') || (e.key === ' ' && !e.target.matches('input'))) {
        e.preventDefault()
        nextWord()
      }
      // Show/Hide Answer - Cmd/Ctrl + A
      if (isModifierKey && e.key === 'a') {
        e.preventDefault()
        setShowCorrectWord(prev => !prev)
      }
      // History - Cmd/Ctrl + H
      if (isModifierKey && e.key === 'h') {
        e.preventDefault()
        setShowHistory(prev => !prev)
      }
      // Listen shortcut - Cmd/Ctrl + L
      if (isModifierKey && e.key === 'l') {
        e.preventDefault()
        speakWord(currentWord.correct)
      }
      // Previous Word - Cmd/Ctrl + P
      if (isModifierKey && e.key === 'p') {
        e.preventDefault()
        prevWord()
      }
    }

    window.addEventListener('keydown', handleKeyboardShortcuts)
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts)
  }, [showHistory, currentWord, nextWord, prevWord, setShowCorrectWord, setShowHistory, speakWord])
}