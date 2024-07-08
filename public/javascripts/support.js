function calculateReadingTime(text) {
    // Count words
    const words = text.trim().split(/\s+/).length;
    
    // Estimate reading time (average reading speed: 200 words per minute)
    const readingTime = Math.ceil(words / 200); // Round up to the nearest minute
    
    return readingTime;
}

function getReadingTime() {
    // Get text input from user
    const text = document.getElementById('content').value;
    
    // Calculate reading time
    const minutesToRead = calculateReadingTime(text);
    
    // Display or use the reading time
    console.log(`Estimated reading time: ${minutesToRead} minute(s)`);
}
