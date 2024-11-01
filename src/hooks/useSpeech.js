import { useCallback } from 'react'

export const useSpeech = () => {
  const speakWord = useCallback((word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      const voices = window.speechSynthesis.getVoices()
      const englishVoice = voices.find(voice => voice.lang.includes('en'))
      if (englishVoice) {
        utterance.voice = englishVoice
      }

      window.speechSynthesis.speak(utterance)
    }
  }, [])

  return { speakWord }
}