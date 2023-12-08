export {};

declare module 'pinia' {
  interface DefineStoreOptions {
    unistorage?: boolean;
  }
}
