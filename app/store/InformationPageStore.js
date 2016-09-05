import Store from 'fluxible/addons/BaseStore';

class InformationPageStore extends Store {
  static storeName = 'InformationPageStore';

  static handlers = {
    openInformationPage: 'open',
    closeInformationPage: 'close',
  };

  constructor(args) {
    super(args);
    this.isOpen = false;
  }

  open = () => {
    this.isOpen = true;
    this.emitChange();
  }

  close = () => {
    this.isOpen = false;
    this.emitChange();
  }
}

export default InformationPageStore;
