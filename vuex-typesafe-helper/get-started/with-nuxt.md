# プロジェクトへ導入する

## 1. パッケージインストール

```bash
$ yarn add -D @lollipop-onl/vuex-typesafe-helper
# or
$ npm install -D @lollipop-onl/vuex-typesafe-helper
```

## 2. Vuexストアを定義する

通常のVuexストアの定義と変わりませんが、Stateの型付けと引数・返り値の型付けが必要になります。  
ここでは、`modules/test`というストアモジュールを定義するときのサンプルコードを例示します。

### State

Stateでは`State`の取りうる型を定義します。

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

### Getters

Gettersでは、引数の`state`と返り値の型を定義します。

!> **Note:** getters およびモジュール外のストアの型定義には対応していません。

```ts
// store/modules/test.ts
type State = {
  count: number;
};

// 省略

export const getters = {
  double(state: State): number {
    return state.count * 2;
  },
  multiple: (state: State) => (value: number): number => {
    return state.count * value;
  },
};
```

### Mutations

Mutationsでは、引数の`state`とペイロードの型を定義します。

```ts
// store/modules/test.ts
type State = {
  count: number;
};

// 省略

export const mutations = {
  // 返り値の型は常に void
  setCount(state: State, count: number): void {
    state.count = count;
  },
  // ペイロードも省略可
  resetCount(state: State): void {
    state.count = 0;
  }
};
```

### Actions

Actionsでは、ActionContextの型とペイロード、返り値の型を定義します。

!> **Note:** モジュール外のストアの型定義には対応していません。

```ts
// store/modules/test.ts
import { DefineActionContext } from '@lollipop-onl/vuex-typesafe-helper';

// 省略

// 定義されていない型には never を当てる
export type Ctx = DefineActionContext<State, never, typeof mutations>;

export const actions = {
  async fetchUserCount({ commit }: Ctx): Promise<void> {
    const response = await fetch('/api/v1/user/count');
    const { count } = await response.json();

    commit('setCount', count);
  },
  async updateUserCount({ commit }: Ctx, count: number): Promise<void> {
    await fetch('/api/v1/user/count', {
      method: 'POST',
      body: JSON.stringify({ count }),
    });

    commit('setCount', count);
  }
};
```

`DefineActionContext`でActionContextの型が推論されるため、モジュール内の`state`、`getters`、`mutations`への参照が型安全になります。

### StoreModule

StoreModuleの型を定義します。

```ts
// store/modules/test.ts
import { DefineStoreModule } from '@lollipop-onl/vuex-typesafe-helper';

// 省略

export type ModulesTestStore = DefineStoreModule<'modules/test', State, never, typeof mutations, typeof actions>;
```

## 3. RootStore型を定義する

各 StoreModule で定義した StoreModule 型をまとめたRootStore型を定義します。

```ts
// types/vuex.d.ts
import { DefineRootStore } from '@lollipop-onl/vuex-typesafe-helper';
import { AccountStore }  from '@/store/account.ts';
import { ModulesExampleStore } from '@/store/modules/example.ts';
import { ModulesTestStore } from '@/store/modules/test.ts';

export type RootStore = DefineRootStore<[
  AccountStore,
  ModulesExampleStore,
  ModulesTestStore,
]>;
```

## 4. コンポーネントでストアに型を当てる

### nuxt-property-decorator で使用する

```ts
import { Component, Vue } from 'nuxt-property-decorator';
import { RootStore } from '@/types/vuex';

@Component
export default class SampleComponent extends Vue {
  $store!: RootStore;
}
```

### composition-api で使用する

まず、型安全な Store を参照する

```ts

```