# denkenchiku

このリポジトリは、日本の重要伝統的建造物群保存地区（伝統的建造物群保存地区）に関するオープンデータとリソースを提供します。

## デモ

- **[保存地区一覧](https://code4fukui.github.io/denkenchiku/)**
  日本全国の指定地区を網羅した、検索可能なリストです。

- **[宿場町マップ](https://code4fukui.github.io/denkenchiku/syukubamachi.html)**
  歴史的な宿場町である保存地区を表示するインタラクティブなマップです。

## 特徴

- **最新のデータ:** 文化庁の最新情報をスクレイピングして生成されたデータセットです。
- **ジオコード済み:** 各地点に `geo3x3` コードが含まれており、マッピングや空間分析が容易に行えます。
- **AR対応:** 熊川宿のUSDZ 3Dモデルへのリンクが含まれており、AR（拡張現実）で表示可能です。
- **自動処理:** ソースデータをダウンロードして解析し、クリーンなCSVファイルに変換するDenoスクリプトを提供しています。

## データ

データはCSV形式で提供されており、[文化庁](https://www.bunka.go.jp/seisaku/bunkazai/shokai/hozonchiku/)の情報を元にしています。

- `denkenchiku.csv`: すべての保存地区を網羅したリスト。
- `denkenchiku-syukubamachi.csv`: 種別が「宿場町」の地区のみを抽出したサブセット。

主要なデータフィールドには、地区名称等、都道府県、種別、選定年月日、面積（ha）、公式PDFへのリンク（`pdfurl`）、`geo3x3` コード、および3Dモデルが存在する場合の `usdzurl` が含まれます。

## データの更新方法

Denoを使用してデータファイルを再生成できます。

1.  **最新のソースHTMLをダウンロード:**
    ```sh
    deno run -A download.js
    ```

2.  **HTMLを解析してCSVファイルを作成:**
    ```sh
    deno run -A make.js
    ```

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
