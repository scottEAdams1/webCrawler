import { crawlPage } from "./crawl.js";

async function main() {
    if (process.argv.length < 3) {
        console.log("Error: Does not include BaseURL")
        process.exit(1)
    } else if (process.argv.length > 3) {
        console.log("Error: Too many arguments")
        process.exit(1)
    } else {
        const baseURL = process.argv[2]
        console.log(`Starting at: ${baseURL}`)
        const pages = await crawlPage(baseURL)
        console.log(pages)
    }
}

main()