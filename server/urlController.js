/* eslint-disable no-cond-assign */
/* eslint-disable no-console */
const got = require('got');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

/*
@todo
Convert to async await
functional programing
error handling class - standardize
unit tests
prevent bad url in front end and server
https://gist.github.com/Daniel-Hug/1415b4d027e3e9854456f4e812ea2ce1
*/

const treeWalker = (dom) => {
    const body = dom.window.document.getElementsByTagName('BODY')[0];

    const inspect = (nIns) => !['STYLE', 'SCRIPT'].includes(nIns.nodeName);
    const collect = (nCol) => nCol.nodeType === 3;

    let n;
    const a = {};
    const walk = dom.window.document.createTreeWalker(
        body,
        dom.window.NodeFilter.SHOW_ALL,
        {
            acceptNode(node) {
                if (!inspect(node)) {
                    return dom.window.NodeFilter.FILTER_REJECT;
                }
                if (!collect(node)) {
                    return dom.window.NodeFilter.FILTER_SKIP;
                }
                return dom.window.NodeFilter.FILTER_ACCEPT;
            },
        },
        false
    );

    while ((n = walk.nextNode())) {
        // console.log('n', n.textContent);

        const string = n.textContent;
        const strFilt = string.split(' ');

        strFilt.forEach((str) => {
            const strSearch = str.toLowerCase().replace(/[^a-zA-Z ]/g, '');
            if (a[strSearch] && strSearch.length) {
                a[strSearch] += 1;
            } else if (strSearch.length) {
                a[strSearch] = 1;
            }
        });
    }
    return a;
};

const urlController = async (req, res, next) => {
    const { body } = req;

    console.log('req', req.body);

    got(body.url)
        .then((response) => {
            const dom = new JSDOM(response.body);
            const textCalc = treeWalker(dom);
            // console.log('textCalc', textCalc);
            res.json({ urlWordCount: textCalc });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = { urlController };
