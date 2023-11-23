import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";

export const table2json = (html, filter) => {
  const dom = HTMLParser.parse(html);
  const tbl = dom.querySelector("table");
  const trs = tbl.querySelectorAll("tr");
  const ths = trs[0].querySelectorAll("th");
  const res = [];
  for (let i = 1; i < trs.length; i++) {
    const tds = trs[i].querySelectorAll("td");
    const o = {};
    for (let j = 0; j < ths.length; j++) {
      o[ths[j].text] = filter ? filter(tds[j]) : tds[j]?.text.trim();
    }
    res.push(o);
  }
  return res;
};
