export const Fetcher = (url: string) => fetch(url, {mode: 'cors'}).then(res => res.json())
