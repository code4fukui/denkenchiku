const url = "https://www.bunka.go.jp/seisaku/bunkazai/shokai/hozonchiku/judenken_ichiran.html";
const text = await (await fetch(url)).text();
await Deno.writeTextFile("judenken_ichiran.html", text);
