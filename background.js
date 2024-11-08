chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
        // Filter out CSP-related headers
        const headers = details.responseHeaders.filter(
            header => ![
                "content-security-policy",
                "content-security-policy-report-only",
                "x-webkit-csp",
                "x-content-security-policy"
            ].includes(header.name.toLowerCase())
        );

        return { responseHeaders: headers };
    },
    { urls: ["https://chatgpt.com/*"] },
    ["blocking", "responseHeaders"]
);
