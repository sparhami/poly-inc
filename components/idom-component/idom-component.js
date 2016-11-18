(function() {

const {
  elementOpen,
  elementClose,
  text,
} = IncrementalDOM;

class IdomComponent extends IdomMixin(BaseMixin(HTMLElement)) {
  static get is() { return 'idom-component' }

  static get styleText() {
    return `
      :host {
        display: block;
        color: #e65100;
      }

      strong {
        color: #0b8043;
      }
    `;
  }

  constructor() {
    super();
    this._data = { message: null };
    this._isStrong = false;
    this.runUpdate();
  }

  set data(data) {
    this._data = data;
    this.runUpdate();
  }

  set isStrong(isStrong) {
    this._isStrong = isStrong;
    this.runUpdate();
  }

  render() {
    if (this._isStrong) {
      elementOpen('strong');
        text(this._data.message);
      elementClose('strong');
    } else {
      text(this._data.message);
    }
  }
}

customElements.define(IdomComponent.is, IdomComponent);

})();
