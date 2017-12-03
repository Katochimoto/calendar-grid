export default function mixin (mixins = []) {
  return function (component) {
    const proto = component.prototype;
    mixins.forEach(item => Object.assign(proto, item));
  };
}
