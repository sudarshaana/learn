import { useState, useEffect } from 'react'

export const useWordDetails = (word) => {
  const [wordDetails, setWordDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWordDetails = async () => {
      if (!word) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        if (!response.ok) throw new Error('Word details not found')

        const data = await response.json()
        setWordDetails(data)
      } catch (err) {
        setError(err.message)
        setWordDetails(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWordDetails()
  }, [word])

  return { wordDetails, isLoading, error }
}