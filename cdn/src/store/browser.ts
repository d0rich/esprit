import { launch, type Browser } from "puppeteer";

export class BrowserStore {
  private static browser: Browser | Promise<Browser> = launch();

  private constructor() {}

  static async getBrowser(): Promise<Browser> {
    if (BrowserStore.browser instanceof Promise) {
      BrowserStore.browser = await BrowserStore.browser;
    }
    return BrowserStore.browser;
  }
}
