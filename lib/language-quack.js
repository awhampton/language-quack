'use babel';

import LanguageQuackView from './language-quack-view';
import { CompositeDisposable } from 'atom';

export default {

  languageQuackView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageQuackView = new LanguageQuackView(state.languageQuackViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageQuackView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-quack:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageQuackView.destroy();
  },

  serialize() {
    return {
      languageQuackViewState: this.languageQuackView.serialize()
    };
  },

  toggle() {
    console.log('LanguageQuack was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
