(function() {

class PolymerComponent extends Polymer.Element {
  static get is() { return 'polymer-component' }

  static get config() {
    return {
      properties: {
        data: Object,

        isStrong: {
          type: Boolean,
          value: false,
        }
      }
    }
  }
}

customElements.define(PolymerComponent.is, PolymerComponent);

})();
