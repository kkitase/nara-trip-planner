# 奈良 観光プランナー (Nara Trip Planner)

このプロジェクトは、奈良の観光計画を立てるためのインタラクティブな Web アプリケーションです。
[Create React App](https://github.com/facebook/create-react-app) をベースに構築されています。

## 主な機能

- **観光地リスト表示:** 奈良の主要な観光地を写真付きのカードで表示します。
- **インタラクティブマップ:** 
    - Google Maps 上に観光地の場所をマーカーで表示します。
    - 地図上をクリックして、自由に出発点を設定できます。
- **旅程作成と順序変更:** 
    - 気になる観光地を旅程リストに追加できます。
    - 「▲」「▼」ボタンで訪問順序を自由に入れ替えることができます。
- **ルート表示:** 設定した出発点と旅程リストを基に、最適な移動ルートを計算して地図上に描画します。

## セットアップ方法

プロジェクトをローカル環境で実行するための手順です。

### 1. 依存関係のインストール

プロジェクトのルートディレクトリで、以下のコマンドを実行して必要なライブラリをインストールします。

```sh
npm install
```

### 2. Google Maps API キーの設定

このアプリケーションは地図機能のために Google Maps Platform API を利用します。

1.  プロジェクトのルートディレクトリに `.env` という名前のファイルを作成します。
2.  ファイル内に以下の内容を記述し、`'あなたのAPIキー'` の部分をご自身の有効な Google Maps API キーに置き換えてください。

    ```
    REACT_APP_GOOGLE_MAPS_API_KEY='あなたのAPIキー'
    ```

    API キーは [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview) から取得できます。

## 利用可能なスクリプト

プロジェクトディレクトリで、以下のコマンドが利用できます。

### `npm start`

開発モードでアプリケーションを起動します。
ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。

ソースコードを編集すると、ページは自動的にリロードされます。
文法エラーなどはコンソールに表示されます。

### `npm run build`

本番環境向けのアプリケーションを `build` フォルダにビルドします。
React が本番モードでバンドルされ、最高のパフォーマンスが出るようにビルドが最適化されます。

ビルドされたファイルは圧縮され、ファイル名にはハッシュが含まれます。
これでアプリケーションをデプロイする準備が整いました。

詳細は [deployment](https://facebook.github.io/create-react-app/docs/deployment) に関するセクションを参照してください。

### `npm test`

対話的なウォッチモードでテストランナーを起動します。
詳細は [running tests](https://facebook.github.io/create-react-app/docs/running-tests) に関するセクションを参照してください。

## さらに詳しく

より詳細は [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) を参照してください。

React について学ぶには、[React documentation](https://reactjs.org/) を確認してください。