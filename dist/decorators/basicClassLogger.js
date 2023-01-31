"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (_target, _propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let log = this.log;
        const start = Date.now();
        log.data(`$Method $${originalMethod.name}, IN`);
        const result = originalMethod.apply(this, args);
        const finish = Date.now();
        log.data(`$Method $${originalMethod.name}, EXEC TIME: ${finish - start}ms`);
        log.data(`$Method $${originalMethod.name}, OUT`);
        return result;
    };
};
