import { table2json } from "./table2json.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

const baseurl = "https://www.bunka.go.jp/seisaku/bunkazai/shokai/hozonchiku/";

const html = await Deno.readTextFile("judenken_ichiran.html");
const json = table2json(html, (td) => {
  if (!td) {
    return null;
  }
  const a = td.querySelector("a");
  if (!a) {
    return td.text.trim();
  }
  const url = a.getAttribute("href");
  return baseurl + url + "," + a.text.trim();
});
json.length--;

json.forEach(i => {
  const s = i["地区名称等"].split(",");
  i["地区名称等"] = s[1];
  i.pdfurl = s[0];
  try {
  i.選定年月日 = new Day(i.選定年月日).toString();
  } catch (e) {
    console.log(e, i.選定年月日)
  }
});

await Deno.writeTextFile("denkenchiku.csv", CSV.stringify(json));

// 番号,都道府県,地区名称等,種別,選定年月日,選定基準,面積（ha）,pdfurl
const types = new Set();
for (const d of json) {
  const tt = d.種別.split("・");
  tt.forEach(i => types.add(i));
}

const map = {
  "宿場町": "syukubamachi",
};

for (const type of types) {
  const d = json.filter(i=> i.種別.indexOf(type) >= 0);
  console.log(type + " " + d.length);
  const fn = map[type];
  if (fn) {
    await Deno.writeTextFile(`denkenchiku-${fn}.csv`, CSV.stringify(d));
  }
  //console.log(d);
}

//console.log(Array.from(types).join("\n"));
