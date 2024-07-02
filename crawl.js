import { JSDOM } from 'jsdom';

function normalizeURL(url) {
    const urlObject = new URL(url)
    if (`${urlObject.hostname}${urlObject.pathname}`.slice(-1) === '/') {
        return `${urlObject.hostname}${urlObject.pathname}`.slice(0, -1)
    }
    return `${urlObject.hostname}${urlObject.pathname}`
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a')
    const links = []
    for (let anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let link = (anchor.getAttribute('href'))
            try {
                link = new URL(link, baseURL).href
                links.push(link)
            } catch (err) {
                console.log(err.message)
            }
        }
    }
    return links
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }
    const normalisedCurrent = normalizeURL(currentURL)
    if (normalisedCurrent in pages) {
        pages[normalisedCurrent]++
        return pages
    } else {
        pages[normalisedCurrent] = 1
    }
    let html
    try {
        html = await fetchPage(currentURL)
    } catch(err) {
        console.log(err.message)
        return pages
    }
    const urlsFromHTML = getURLsFromHTML(html, baseURL)
    for (let url of urlsFromHTML) {
        pages = await crawlPage(baseURL, url, pages)
    }
    return pages
    
}

async function fetchPage(currentURL) {
    let response
    try {
        response = await fetch(currentURL)
    } catch(err) {
        throw new Error(err.message)
    }
    if (response.status >= 400) {
        throw new Error(`Error: ${response.status}`)
    }
    const contentType = response.headers.get('content-type')
    if (contentType.includes('text/html') === false) {
        throw new Error("Error: Not text/html")
    } else {
        return await response.text()
    }
}

export { normalizeURL, getURLsFromHTML, crawlPage };