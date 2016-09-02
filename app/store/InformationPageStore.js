import Store from 'fluxible/addons/BaseStore';

class InformationPageStore extends Store {
  static handlers = {
    openInformationPage: 'open',
    closeInformationPage: 'close',
  };

  constructor(args) {
    super(args);
    this.isOpen = false;
  }

  static storeName = 'InformationPageStore';

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
