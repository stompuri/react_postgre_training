import { EventEmitter } from "events";

class NavigationStore extends EventEmitter {
  constructor() {
    super();
    this.page = "about";
  }

  updatePage(page) {
    this.page = page;
    this.emit("change");
  }

  getPage() {
    return this.page;
  }
}

const navigationStore = new NavigationStore();

export default navigationStore;
