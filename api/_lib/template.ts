
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string) {
    let background = 'white';
    let foreground = 'black';
    let accent = '#c5516c';
    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        accent = '#57dfd2';
    }

    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        height: 100vh;
        display: flex;
        padding: 0 5rem;
        border-top: 1rem solid ${accent};
        position: relative;
    }

    img, .content {
        position: absolute;
        top: 45%;
        transform: translateY(-50%);
    }

    .content {
        width: 60%;
    }

    .overline {
        font-family: 'Inter', sans-serif;
        text-transform: uppercase;
        font-size: 32px;
        font-weight: normal;
        color: ${accent};
        margin-bottom: 0;
        margin-top: 5rem;
        text-align: left;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }

    .heading {
        font-family: 'Inter', sans-serif;
        font-size: 100px;
        font-weight: bold;
        color: ${foreground};
        letter-spacing: -.64px;
        line-height: 1.2;
        margin-top: 0;
    }
    
    .subtitle {
        font-family: 'Inter', sans-serif;
        font-size: 66px;
        color: ${foreground};
        line-height: 1.2;
        font-weight: normal;
    }
    
    img {
        max-width: 25%;
        border-radius: 50%;
        right: 5rem;
        box-shadow: 2px 2px 20px rgba(0, 0, 0, .2);
    }`
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, subtitle, theme, md, hasImage } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme)}
    </style>
    <body>
        <img src=${hasImage ? 'https://og-image-eight-eta.vercel.app/me.jpg' : ''} />
        <div class='content'>
            <div class="heading">${emojify(
            md ? marked(text) : sanitizeHtml(text)
    )}
            </div>
            <div class="subtitle">${emojify(
                md ? marked(subtitle) : sanitizeHtml(subtitle)
                )}
            </div>
            <div class="overline">connorrothschild.com</div>
        </div>
    </body>
</html>`;
}