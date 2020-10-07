class LocalStorage {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  static getItemLocalStorage(key) {
    return localStorage.getItem(key);
  }

  saveItemLocalStorage() {
    localStorage.setItem(this.key, this.value);
  }

  static removeItemLocalStorage(key) {
    if (this.key === key) localStorage.removeItem(key);
  }

  // eslint-disable-next-line class-methods-use-this
  static clearLocalStorage() {
    localStorage.clear();
  }
}

export default LocalStorage;
