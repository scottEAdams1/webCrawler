import { normalizeURL } from "./crawl.js";
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