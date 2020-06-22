import Config from "../Config";

export class HttpClient {
    public async post<T>(url: string, body: any): Promise<T> {
        return this.request(url, body);
    }

    public async patch<T>(url: string, body: any): Promise<T> {
        return this.request(url, body, 'PATCH');
    }

    private async request<T>(url: string, body: any, method = 'POST'): Promise<T> {
        const absoluteUrl = this.getAbsoluteUrl(url);

        const request = fetch(absoluteUrl, {
            credentials: "include",
            method: method,
            redirect: "manual",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return this.runThroughMiddleware(request);
    }

    public async get<T>(url: string): Promise<T> {
        const absoluteUrl = this.getAbsoluteUrl(url);
        const request = fetch(absoluteUrl, {
            credentials: "include",
            redirect: "manual",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        });

        return this.runThroughMiddleware(request);
    }

    private async runThroughMiddleware<T>(request: Promise<Response>): Promise<T>{
        const response = await request;

        if(response.status === 0 || response.status === 401){
            console.log(response)
            window.location.href = `${Config.API_URL}account/login`
        }

        return response.json();
    }

    private getAbsoluteUrl(url: string): string{
        const isAbsoluteUrl = url.includes('http');

        return isAbsoluteUrl
            ? url
            : `${Config.API_URL}${url}`;
    }
}