import { UAParser } from 'ua-parser-js';

export const parseUserAgent = (userAgent: string | undefined) => {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const browser = `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim();
    const os = `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim();
    const device = result.device.type || 'desktop';

    return { browser, os, device };
};
