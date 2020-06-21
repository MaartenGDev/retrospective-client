import config from '../Config'

export class HttpClient {
    public async post<T>(url: string, body: any): Promise<T> {
        return this.request(url, body);
    }

    public async patch<T>(url: string, body: any): Promise<T> {
        return this.request(url, body, 'PATCH');
    }

    private async request<T>(url: string, body: any, method = 'POST'): Promise<T> {
        const absoluteUrl = this.getAbsoluteUrl(url);

        const response = await fetch(absoluteUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }

    public async get<T>(url: string): Promise<T> {
        const absoluteUrl = this.getAbsoluteUrl(url);
        const response = await fetch(absoluteUrl);

        return response.json();
    }

    private getAbsoluteUrl(url: string): string{
        const isAbsoluteUrl = url.includes('http');

        return isAbsoluteUrl
            ? url
            : `${config.API_URL}${url}`;
    }
}