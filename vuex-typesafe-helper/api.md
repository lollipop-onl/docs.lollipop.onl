# API Reference

## DefineActionContext

`Type`

```ts
type DefineActionContext<
  S extends Record<string, any>,
  G extends Record<string, (...args: any[]) => any>,
  M extends Record<string, (...args: any[]) => void>,
>;
```

Vuex モジュールで使用する Action Context の型を定義します。  
`rootStore` および `rootGetters` とモジュール外の Mutation への `commit` 、Action への `dispatch` の型は推論されません。

**Example**

```ts
import { DefineActionContext } from '@lollipop-onl/vuex-typesafe-helper';

type Store = { ... };

export const state = (): State => ({ ... });

export const getters = { ... };

export const mutations = {
  bar(state: State, payload: number): void { ... },
};

type Ctx = DefineActionContext<State, typeof getters, typeof mutations>;

export const actions = {
  foo(ctx: Ctx, payload: number): void {
    // 名前とペイロードは型安全になる
    ctx.commit('bar', payload);

    // dispatchでは名前・ペイロードともに型安全にはならない
    ctx.dispatch('baz', payload * 2);
  },
  baz(ctx: Ctx, payload: number): void { ... },
};
```

## DefineStoreModule

`Type`

```ts
type DefineStoreModule<
  NS extends string,
  S extends Record<string, any>,
  G extends Record<string, (...args: any[]) => any>,
  M extends Record<string, (...args: any[]) => void>,
  A extends Record<string, (...args: any[]) => any>,
>;
```

`NS` として指定したネームスペースと State・Getters・Mutations・Actions を紐付けます。  
たとえば、`foo` という名前のアクションに `bar/baz`　というネームスペースを与えると `bar/baz/foo` というアクション名で呼び出せるようになります。

**Example**

```ts
// ネームスペース foo/bar となるストアモジュール
import { DefineActionContext, DefineStoreModule } from '@lollipop-onl/vuex-typesafe-helper';

type Store = {
  baz: number;
};

export const state = (): State => ({ ... });

export const getters = { ... };

export const mutations = {
  setBaz(state: State, payload: number): void { ... },
};

type Ctx = DefineActionContext<State, typeof getters, typeof mutations>;

export const actions = { ... };

export type FooBarStore = DefineStoreModule<
  'foo/bar',
  State,
  typeof getters,
  typeof mutations,
  typeof actions,
>;

// コンポーネントでは次のように型安全になる
import { defineComponent } from 'vue';
import { useStore } from '@/helpers';

export default defineComponent({
  setup() {
    const store = useStore();

    store.state.foo.bar.baz;
    // number

    store.commit('foo/bar/setBaz', '100');
    // Type error
  },
});
```

## DefineRootStore

`Type`

```ts
type DefineRootStore<
  RS extends DefineStoreModule<...>,
>;
```

定義したストアモジュールの型を変換して RootStore として Vuex ストア全体の型を定義します。  
複数のストアモジュールをまとめる場合は、ストアモジュールの型を結合したものを渡します。

**Example**

```ts
import { DefineRootStore } from '@lollipop-onl/vuex-typesafe-helper';
import { FooStore} from '@/store/foo';
import { BarBazStore } from '@/store/bar/baz';

export type RootStore = DefineRootStore<FooStore & BarBazStore>;
```

## defineTypedStore

`Function` (Composition helper)

```ts
function defineTypedStore<T extends RootStore>(): () => RootStore;
```

VueのInstanceに登録されたVuexストアを型安全に参照できる Composition Helper を返す関数です。  
Vue・Nuxtいずれでも利用できます。

**Example**

```ts
// Define helper
import { defineTypedStore } from '@lollipop-onl/vuex-typesafe-helper';
import { RootStore } from '@/types/vuex';

export const useStore = defineTypedStore<RootStore>();

// Use in component
import { defineComponent } from 'vue';
import { useStore } from '@/helpers';

export default defineComponent({
  setup() {
    const store = useStore();
    // `store` as RootStore
  },
});
```
