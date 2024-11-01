import Papa from 'papaparse';

// Function to fetch and parse CSV
async function loadWords() {
  try {
    const response = await fetch('/src/data/word_list.csv');
    const csvText = await response.text();

    const { data } = Papa.parse(csvText, {
      skipEmptyLines: true
    });

    // Transform the data into our required format
    // Skip header if exists and filter out any rows with empty values
    return data
      .filter(row => row[0] && row[1]) // Ensure both columns have values
      .map(row => ({
        correct: row[0].trim(),
        incorrect: row[1].trim()
      }));
  } catch (error) {
    console.error('Error loading words:', error);
    // Fallback to default words if loading fails
    return [
      { correct: "nuclear", incorrect: "নিউক্লিয়ার" },
      { correct: "espresso", incorrect: "এস্প্রেসো" },
      { correct: "ask", incorrect: "আস্ক" },
      { correct: "et cetera", incorrect: "এট সেটেরা" },
      { correct: "library", incorrect: "লাইব্রেরি" }
    ];
  }
}

// Export the words promise
export const wordsPromise = loadWords();

// For compatibility with existing code, also export a default array
export const words = [
  { correct: "nuclear", incorrect: "নিউক্লিয়ার" },
  { correct: "espresso", incorrect: "এস্প্রেসো" },
  { correct: "ask", incorrect: "আস্ক" },
  { correct: "et cetera", incorrect: "এট সেটেরা" },
  { correct: "library", incorrect: "লাইব্রেরি" }
];