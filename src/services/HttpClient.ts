import Config from "../Config";

export class HttpClient {
    private readonly anonymousLaunchUrlParts = ['/teams/invites/', '/account/login'];
    private readonly HTTP_METHODS_WITH_BODY = ['POST', 'PATCH'];

    public async get<T>(url: string): Promise<T> {
        return this.request(url);
    }

    public async post<T>(url: string, body: any): Promise<T> {
        return this.request(url, body, 'POST');
    }

    public async patch<T>(url: string, body: any): Promise<T> {
        return this.request(url, body, 'PATCH');
    }

    public async delete<T>(url: string): Promise<T> {
        return this.request(url, undefined, 'DELETE');
    }

    private async request<T>(url: string, body?: any, method = 'GET'): Promise<T> {
        const absoluteUrl = this.getAbsoluteUrl(url);

        const token = localStorage.getItem(Config.AUTH_TOKEN_NAME);

        const requestConfig: any = {
            credentials: "include",
            method: method,
            redirect: "manual",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body ? JSON.stringify(body) : undefined
        };

        if(!this.HTTP_METHODS_WITH_BODY.includes(method)){
            delete requestConfig.body;
        }

        const request = fetch(absoluteUrl, requestConfig);
        return this.runThroughMiddleware(request);
    }

    private async runThroughMiddleware<T>(request: Promise<Response>): Promise<T>{
        const response = await request;

        const launchUrlPath  = window.location.pathname;
        const hasLaunchedFromAnonymousPath = this.anonymousLaunchUrlParts.some(path => launchUrlPath.startsWith(path))

        const isUnauthenticatedResponse = response.status === 0 || response.status === 401;
        const isErrorResponse = response.status < 200 || response.status >= 300;

        if(isErrorResponse){
            return Promise.reject(response.statusText);
        }

        if(!isUnauthenticatedResponse){
            return response.json();
        }

        if(!hasLaunchedFromAnonymousPath){
            window.location.href = Config.LOGIN_URL;
        }

        return Promise.reject('Unauthorized');
    }

    private getAbsoluteUrl(url: string): string{
        const isAbsoluteUrl = url.includes('http');

        return isAbsoluteUrl
            ? url
            : `${Config.API_URL}${url}`;
    }
}