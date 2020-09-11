![@lollipop-onl/vuex-typesafe-helper](./assets/logo.svg)

[![npm version](https://badge.fury.io/js/%40lollipop-onl%2Fvuex-typesafe-helper.svg)](https://badge.fury.io/js/%40lollipop-onl%2Fvuex-typesafe-helper)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/38eb7615c6b644cf9504674bab46ac87)](https://www.codacy.com/manual/lollipop-onl/vuex-typesafe-helper?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=lollipop-onl/vuex-typesafe-helper&amp;utm_campaign=Badge_Grade)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[@takepepe](https://twitter.com/takepepe) 氏の著書「[実践 TypeScript](https://www.amazon.co.jp/dp/483996937X/ref=cm_sw_r_tw_dp_x_6tbwFbF4K4M05)」にて例示されているサンプルプロジェクト [takefumi-yoshii/ts-nuxtjs-express](https://github.com/takefumi-yoshii/ts-nuxtjs-express) を抽象化しライブラリ化しました。

## 特徴

* 必要な型定義は State と引数・返り値の型のみ
* コンポーネントから State / Getters / Mutations / Actions を型安全に参照・サジェッションできます
* Store の修正時に既存使用箇所で型エラーが通知されます
* TypeScript の型情報のみ提供するためバンドルサイズが変わりません

## 必要要件

`@lollipop-onl/vuex-typesafe-helper` v2.0 より、以下の要件が必須となりました。

* `vuex` v3.0.0 +
* `typescript` v4.1.0 +
* `@nuxtjs/typescript-build` v2.3.0 + (Nuxt.jsで使用する場合)

v2.0以前のバージョンと要件は [過去バージョン](https://vuex-typesafe-helper.lollipop.onl/versions) からご確認ください。

## インストール

**yarnを使用する：**

```bash
yarn add -D @lollipop-onl/vuex-typesafe-helper
```

**npmを使用する：**

```bash
npm install -D @lollipop-onl/vuex-typesafe-helper
```

## License

[MIT](https://github.com/lollipop-onl/vuex-typesafe-helper/blob/main/LICENSE)