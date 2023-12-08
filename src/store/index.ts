import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createUnistorage } from 'pinia-plugin-unistorage';

const store = createPinia();
store.use(createUnistorage());

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
