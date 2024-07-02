function printReport(pages) {
    console.log('Report starting')
    pages = sortObj(pages)
    for (let page of pages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}

function sortObj(obj) {
    const pages = Object.entries(obj)
    pages.sort(function(page1, page2) {
        return page2[1] - page1[1]
    })
    return pages
}

export { printReport };