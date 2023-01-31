import { Logger } from "ng2-logger";

export default function measure(
  _target: Object,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any) {
    let log = (this as any).log as Logger;
    const start = Date.now();
    log.data(`$Method $${originalMethod.name}, IN`);
    const result = originalMethod.apply(this, args);
    const finish = Date.now();
    log.data(
      `$Method $${originalMethod.name}, EXEC TIME: ${finish - start
      }ms`
    );
    log.data(`$Method $${originalMethod.name}, OUT`);
    return result;
  };
};

/*
function first() {
  console.log("first(): factory evaluated");
  return function (
    _target: any,
    _propertyKey: string,
    _descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}
function second() {
  console.log("second(): factory evaluated");
  return function (
    _target: any,
    _propertyKey: string,
    _descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  };
}
*/
