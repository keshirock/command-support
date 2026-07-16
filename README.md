# command-support

## あみだくじ班分け（PWA）

少人数ミーティング向けの「あみだくじ班分け」アプリです。GitHub Pages で公開し、スマホのホーム画面に追加するとオフラインでも使えます。

- 公開URL: https://keshirock.github.io/command-support/

### スマホでオフラインで使う手順

1. スマホのブラウザで上記の公開URLを開く（初回はネット接続が必要）
2. ホーム画面に追加する
   - **iPhone (Safari)**: 共有ボタン（□に↑）→「ホーム画面に追加」
   - **Android (Chrome)**: メニュー（︙）→「ホーム画面に追加」または「アプリをインストール」
3. 以降はホーム画面のアイコンから起動でき、機内モードなどオフラインでも動作します

### 構成

| ファイル | 役割 |
| --- | --- |
| `index.html` | アプリ本体（単一ファイル） |
| `manifest.webmanifest` | PWA マニフェスト（ホーム画面追加用） |
| `sw.js` | Service Worker（オフラインキャッシュ） |
| `icon-192.png` / `icon-512.png` / `apple-touch-icon.png` | アプリアイコン |
| `.github/workflows/deploy-pages.yml` | GitHub Pages への自動デプロイ |
