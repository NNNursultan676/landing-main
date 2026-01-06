// modalService.js

class ModalService {
  constructor() {
    this.listeners = [];
    this.dataListeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  subscribeData(listener) {
    this.dataListeners.push(listener);
  }

  unsubscribeData(listener) {
    this.dataListeners = this.dataListeners.filter((l) => l !== listener);
  }

  openModal(data) {
    this.listeners.forEach((listener) => listener(true));
    this.dataListeners.forEach((listener) => listener(data));
  }

  closeModal() {
    this.listeners.forEach((listener) => listener(false));
  }
}

const modalService = new ModalService();
export default modalService;
