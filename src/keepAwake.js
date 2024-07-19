// Function to request a wake lock
async function requestWakeLock() {
    try {
        const wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active.');

        // Releasing the wake lock on visibility change
        document.addEventListener('visibilitychange', async () => {
            if (document.visibilityState === 'visible') {
                await wakeLock.release();
                console.log('Wake Lock released.');
                requestWakeLock();
            }
        });

    } catch (err) {
        console.error(`Failed to acquire wake lock: ${err}`);
    }
}

export function keepAwake() {
    // Check if the Wake Lock API is supported
    if ('wakeLock' in navigator) {
        requestWakeLock();
    } else {
        console.warn('Wake Lock API is not supported in this browser.');
    }
}