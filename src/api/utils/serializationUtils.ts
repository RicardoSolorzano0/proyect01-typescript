type ParamsType = { [k: string]: boolean | number | number[] | string | string[] | undefined; };

export type PagedFilters<T> = {
    filters?: T;
    page: number;
    perPage?: number;
};

export const serializeObjectToQueryParams = (obj: ParamsType, prependAmpersand = true) => {
    const str = [];
    for (const p in obj)
        if (p in obj) {
            const element = obj[p];

            if (element !== undefined) {
                if (Array.isArray(element)) {
                    element.forEach((value: number | string) => str.push(encodeURIComponent(p) +
                        '[]=' +
                        encodeURIComponent(value)));
                } else {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(element));
                }
            }
        }
    const prefix = prependAmpersand ? '&' : '';
    return str.length > 0 ? prefix + str.join('&') : '';
};

export const serializeUriWithFilters = (uri: string, filters: ParamsType | void): string =>
    filters === undefined ? uri :
        `${ uri }?${ serializeObjectToQueryParams(filters, false) }`;

export const serializeUriWithPageAndFilters = <T extends ParamsType>(uri: string, {
    filters,
    page
}: PagedFilters<T>): string =>
    `${ uri }?page=${ page }${ filters !== undefined ? serializeObjectToQueryParams(filters) : '' }`;