# プロジェクトへ導入する

## パッケージインストール

```bash
$ yarn add -D @lollipop-onl/vuex-typesafe-helper
# or
$ npm install -D @lollipop-onl/vuex-typesafe-helper
```

## Vuexストアを定義する

通常のVuexストアの定義と変わりませんが、Stateの型付けと引数・返り値の型付けが必要になります。  
ここでは、`modules/test`というストアモジュールを定義するときのサンプルコードを例示します。

### State

```ts
// store/modules/test.ts
export type State = {
  someFlag: boolean;
  // 初期値がないStateはOptionalに
  age?: number;
};

export const state = (): State => ({
  someFlag: false,
});
```