/* eslint-disable no-cond-assign */
/* eslint-disable no-console */
const got = require('got');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

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

const sortByAlphabetic = (words) =>
    Object.keys(words)
        .sort()
        .reduce(function (acc, key) {
            acc[key] = words[key];
            return acc;
        }, {});

const sortByFrequency = (words) =>
    Object.entries(words)
        .sort(([, a], [, b]) => a - b)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

const urlController = async (req, res, next) => {
    const { body, query } = req;

    console.log('params', query);

    try {
        const gotRes = await got(body.url);
        const dom = new JSDOM(gotRes.body);
        const textCalc = treeWalker(dom);

        if (query.sort === 'alphabetic') {
            const sortedRes = sortByAlphabetic(textCalc);
            res.json({ urlWordCount: sortedRes });
        } else if (query.sort === 'frequency') {
            const sortedRes = sortByFrequency(textCalc);
            res.json({ urlWordCount: sortedRes });
        } else {
            res.json({ urlWordCount: textCalc });
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { urlController };
