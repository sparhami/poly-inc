(function() {

const {
  currentPointer,
  skipNode,
  patch,
} = IncrementalDOM;

function skipStyleNodes() {
  let node;
  while((node = currentPointer()) && node.nodeName === 'STYLE') {
    skipNode();
  }
}

function IdomMixin(BaseClass) {
  return class IdomElement extends BaseClass {
    constructor() {
      super();
      this.dirty = false;
    }

    update() {
      if (this.dirty) {
        return;
      }

      this.dirty = true;
      Polymer.Async.run(() => {
        this.dirty = false;
        this.runUpdate();
      });
    }

    runUpdate() {
      patch(this.shadowRoot || this.root, () =>{
        skipStyleNodes();
        this.render();
      });
    }
  };
};

window.IdomMixin = IdomMixin;
window.IdomElement = IdomMixin(HTMLElement);

})();
