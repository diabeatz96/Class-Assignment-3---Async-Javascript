document.getElementById('animate-bg-btn').addEventListener('click', () => {
// This script animates the background color of the page to red when the button is clicked.

// Get the button by its ID and add a click event listener
document.getElementById('animate-bg-btn').addEventListener('click', () => {
    // Get the <body> element, which is what we'll animate
    const body = document.body;

    // step: keeps track of the current animation frame
    let step = 0;
    // steps: total number of animation frames (higher = smoother and slower animation)
    const steps = 60;

    // setInterval runs the function every 30 milliseconds
    const interval = setInterval(() => {
        step++; // Move to the next frame

        // Calculate the new color for this frame
        // We want to go from white (rgb(255,255,255)) to red (rgb(229,57,53))
        // For each color channel, we subtract a fraction of the difference each step
        const r = Math.round(255 - (26 * step / steps)); // Red channel: 255 to 229
        const g = Math.round(255 - (198 * step / steps)); // Green channel: 255 to 57
        const b = Math.round(255 - (202 * step / steps)); // Blue channel: 255 to 53

        // Set the new background color using the calculated RGB values
        body.style.background = `rgb(${r},${g},${b})`;

        // If we've reached the last step, stop the animation
        if (step >= steps) clearInterval(interval);
    }, 30); // 30ms per frame = about 1.8 seconds total
});

/*
How it works in depth:
1. When the button is clicked, the event listener runs.
2. The animation starts using setInterval, which repeatedly runs the function every 30ms.
3. For each frame, we calculate the new color by linearly interpolating between white and red for each RGB channel.
4. The background color of the body is updated to the new color.
5. After the set number of steps, the interval is cleared and the animation stops, leaving the background red.
This is a simple way to animate colors in JavaScript without any libraries.
*/
