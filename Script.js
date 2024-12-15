document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input");
    const searchButton = document.querySelector(".search-button");

    if (!input) {
        console.error("Input element not found");
        return;
    }

    const blocked = ["badword1", "badword2"]; // Replace with actual blocked keywords

    // Event listener for "Enter" key
    input.addEventListener("keydown", handleInput);

    // Event listener for button click
    searchButton.addEventListener("click", () => handleInput({ key: "Enter" }));

    function handleInput(e) {
        if (e.key !== "Enter") return;
        if (containsBlockedKeyword(input.value, blocked)) {
            window.location.replace("/blocked.html");
        } else {
            const query = formatSearch(input.value);
            localStorage.setItem("url", "/u/liftoff/" + __uv$config.encodeUrl(query));
            window.location.href = "/q/";
        }
    }

    function containsBlockedKeyword(input, blockedList) {
        for (let i = 0; i < blockedList.length; i++) {
            if (input.includes(blockedList[i])) {
                return true;
            }
        }
        return false;
    }

    function formatSearch(query) {
        const engine = localStorage.getItem("engine") || "https://www.google.com/search?q=";
        localStorage.setItem("engine", engine); // Ensure it’s saved if not set

        // Check if query is a valid URL
        try {
            return new URL(query).toString();
        } catch (e) {}

        // Attempt to prepend https://
        try {
            const url = new URL(`https://${query}`);
            if (url.hostname.includes(".")) return url.toString();
        } catch (e) {}

        // Fallback: Use search engine
        return engine + encodeURIComponent(query);
    }
});

