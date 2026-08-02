import axios from "axios";
import { Config }  from './types.js'

interface Options {
    headers?: object;
    method: string;
    body?: null | object;
    params?: object;
}

export default function request(endpoint: string = "", options: Options, config: Config) {

    const {headers = {}, method, body = null, params = {}} = options

    let queryString = serializeQuery(params)
    queryString = queryString ? `?${queryString}` : ''

    return axios({
        method: method,
        url: config.basePath + endpoint + queryString,
        headers: {
            ...headers,
            "Authorization": `Bearer ${config.api_key}`,
            "X-Requested-With": "XMLHttpRequest",
            "Content-type": "application/json",
            "accept-encoding": "null" // needed for axios
        },
        // Must be `undefined`, not `null`, when there is no body: workerd
        // (Cloudflare Workers) rejects a GET/HEAD Request that carries any
        // body property, even a null one. Node's http adapter tolerates it.
        data: body ? JSON.stringify(body) : undefined,
        // Let axios pick the first adapter supported by the current runtime.
        // Node keeps using `http` and browsers keep using `xhr` (no behaviour
        // change), while edge/serverless runtimes (Vercel Edge, Cloudflare
        // Workers, Deno, Next.js edge) that ship neither fall back to `fetch`.
        adapter: ["http", "xhr", "fetch"]
    })
}

function serializeQuery(params: object, prefix?: string): string {

    const queryParamsArray: string[] = Object.keys(params).map((key) => {
        const value = params[key as keyof typeof params];

        if (params.constructor === Array)
            key = `${prefix}[]`;
        else if (params.constructor === Object)
            key = (prefix ? `${prefix}[${key}]` : key);

        if (typeof value === 'object')
            return serializeQuery(value, key);
        else
            return `${key}=${encodeURIComponent(value)}`;
    });

    return queryParamsArray.flat(10).join('&');
}
