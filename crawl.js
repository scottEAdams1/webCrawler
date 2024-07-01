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

async function crawlPage(currenturl) {
    let response
    try {
        response = await fetch(currenturl)
    } catch(err) {
        throw new Error(err.message)
    }
    if (response.status >= 400) {
        console.log(`Error: ${response.status}`)
        process.exit(1)
    }
    const contentType = response.headers.get('content-type')
    if (contentType.includes('text/html') === false) {
        console.log("Error: Not text/html")
        process.exit(1)
    } else {
        console.log(await response.text())
    }
}

export { normalizeURL, getURLsFromHTML, crawlPage };