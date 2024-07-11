function escapeHtmlWithMarkers(unsafe) {
    const markerStart = '[text]';
    const markerEnd = '[/text]';
    let escaped = '';
    let startIndex = 0;
    let endIndex = 0;
    let insideText = false;

    while ((startIndex = unsafe.indexOf(markerStart, endIndex)) !== -1) {
        // Add content outside [text] markers without escaping
        escaped += unsafe.slice(endIndex, startIndex);

        endIndex = unsafe.indexOf(markerEnd, startIndex);
        if (endIndex === -1) {
            // No closing marker found, add the rest
            escaped += unsafe.slice(startIndex);
            return escaped;
        }

        // Escape content within [text] markers
        escaped += escapeHtmlForText(unsafe.slice(startIndex + markerStart.length, endIndex));
        insideText = true;
        endIndex += markerEnd.length;
    }

    if (!insideText) {
        // Escape the remaining content if not inside [text] markers
        escaped += escapeHtml(unsafe.slice(endIndex));
    } else {
        // Add the remaining content without further escaping if inside [text] markers
        escaped += unsafe.slice(endIndex);
    }

    return escaped;
}

function escapeHtmlForText(unsafe) {
    return unsafe
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHtml(unsafe) {
    return unsafe
}


module.exports = {
    escapeHtmlWithMarkers,
};
