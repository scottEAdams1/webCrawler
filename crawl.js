function normalizeURL(url) {
    const urlObject = new URL(url)
    if (`${urlObject.hostname}${urlObject.pathname}`.slice(-1) === '/') {
        return `${urlObject.hostname}${urlObject.pathname}`.slice(0, -1)
    }
    return `${urlObject.hostname}${urlObject.pathname}`
}

export { normalizeURL };