(function() {

const useShady = 'ShadyDOM' in window;


function createTemplate(ctor) {
  const template = document.createElement('template');
  const style = document.createElement('style');

  style.appendChild(document.createTextNode(ctor.styleText));
  template.content.appendChild(style);
  useShady && ShadyCSS.prepareTemplate(template, ctor.is);

  return template;
}


function BaseMixin(BaseClass) {
  let styleTemplate;

  function getStyles(ctx) {
    styleTemplate = styleTemplate || createTemplate(ctx.constructor);
    return document.importNode(styleTemplate.content, true);
  }

  return class BaseElement extends BaseClass {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(getStyles(this));

      useShady && ShadyCSS.applyStyle(this);
    }
  };
};

window.BaseMixin = BaseMixin;
window.BaseElement = BaseMixin(HTMLElement);

})();
