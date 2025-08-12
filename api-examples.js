// Example 1: TVmaze API search

document.getElementById('tvmaze-search-btn').addEventListener('click', async () => {
    const query = document.getElementById('tvmaze-search').value.trim();
    const resultsDiv = document.getElementById('tvmaze-results');
    resultsDiv.innerHTML = '';
    if (!query) {
        resultsDiv.textContent = 'Please enter a show name.';
        return;
    }
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.length === 0) {
            resultsDiv.textContent = 'No shows found.';
            return;
        }
        // Display results
            // Using a normal for loop to display results:
            for (let i = 0; i < data.length; i++) {
                const show = data[i].show;
                const showDiv = document.createElement('div');
                showDiv.className = 'show-result';
                showDiv.innerHTML = `
                    <h3>${show.name}</h3>
                    ${show.image ? `<img src="${show.image.medium}" alt="${show.name}">` : ''}
                    <p>${show.summary ? show.summary : 'No summary available.'}</p>
                    <a href="${show.url}" target="_blank">More Info</a>
                `;
                resultsDiv.appendChild(showDiv);
            }

            // The following forEach version is commented out as a good example for students:
            /*
            data.forEach(item => {
                const show = item.show;
                const showDiv = document.createElement('div');
                showDiv.className = 'show-result';
                showDiv.innerHTML = `
                    <h3>${show.name}</h3>
                    ${show.image ? `<img src="${show.image.medium}" alt="${show.name}">` : ''}
                    <p>${show.summary ? show.summary : 'No summary available.'}</p>
                    <a href="${show.url}" target="_blank">More Info</a>
                `;
                resultsDiv.appendChild(showDiv);
            });
            */
    } catch (error) {
        resultsDiv.textContent = 'Error fetching data: ' + error.message;
    }
});

// Example 2: Text-to-Speech (SpeechSynthesis API)
document.getElementById('tts-btn').addEventListener('click', () => {
    const input = document.getElementById('tts-input').value.trim();
    const statusDiv = document.getElementById('tts-status');
    statusDiv.textContent = '';
    if (!input) {
        statusDiv.textContent = 'Please enter some text to speak.';
        return;
    }
    // Create utterance and speak
    const utterance = new SpeechSynthesisUtterance(input);
    window.speechSynthesis.speak(utterance);
    statusDiv.textContent = 'Speaking...';
    utterance.onend = () => {
        statusDiv.textContent = 'Done speaking.';
    };
    utterance.onerror = () => {
        statusDiv.textContent = 'Error: Could not speak the text.';
    };
});
