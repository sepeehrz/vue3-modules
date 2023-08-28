import {useCookies} from 'vue3-cookies';

export class Cookie<T> {
  private key?: string;
  private db?: T;
  private cookie?: any;

  invoke(key: string, defaultValue: T) {
    if (key.length === 0) {
      throw new Error('Cookie key cannot empty!');
    }

    this.key = key;
    this.cookie = useCookies().cookies.set(key, JSON.stringify(defaultValue));
    this.db = this.cookie.value ? this.unref(this.cookie.value) : defaultValue;
  }

  update(callback: (state: T) => T) {
    if (!this.key) {
      throw new Error('Please first initial your cookie!');
    }

    const data = callback(this.unref(this.db!));
    this.db = data;
    this.cookie!.value = data;
  }

  private unref(data: T): T {
    return JSON.parse(JSON.stringify(data));
  }

  get data() {
    if (!this.key) {
      throw new Error('Please first initial your cookie!');
    }

    return this.db!;
  }
}
