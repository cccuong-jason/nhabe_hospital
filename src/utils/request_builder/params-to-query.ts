import {Params} from "@fortawesome/fontawesome-svg-core";

// @ts-ignore
export default function params2query(params: Record<string, string | number | boolean | Params>): string {
    return Object.entries(params).map(([key, value]) => `${key}=${value.toString()}`).join('&')
}
