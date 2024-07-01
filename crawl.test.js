import { normalizeURL, getURLsFromHTML } from "./crawl.js";
import { test, expect } from "@jest/globals";


test('Checks if URL gets normalized', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toEqual('blog.boot.dev/path')
});
test('Checks if URL gets normalized', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toEqual('blog.boot.dev/path')
});
test('Checks if URL gets normalized', () => {
    expect(normalizeURL('https://blog.boot.dev')).not.toEqual('blog.boot.dev/path')
});
test('Checks if URL gets normalized', () => {
    expect(normalizeURL('https://BLOG.BOOT.DEV')).not.toEqual('blog.boot.dev/path')
});
test('Checks if URL is returned from a block of html', () => {
    expect(getURLsFromHTML('<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>', 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/'])
});
test('Checks if URLs are returned from a block of html', () => {
    expect(getURLsFromHTML('<a href="https://boot.dev">Boot</a><a href="https://boot.dev/path">Blog</a>', 'https://boot.dev')).toEqual(['https://boot.dev/', 'https://boot.dev/path'])
});
test('Checks if relative URL is returned from a block of html as absolute URL', () => {
    expect(getURLsFromHTML('<a href="/path/">Boot</a>', 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/path/'])
});