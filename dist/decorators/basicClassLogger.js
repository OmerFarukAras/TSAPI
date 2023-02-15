"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function measure(_target, _propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let log = this.log;
        const start = Date.now();
        log.data(`$Method $${originalMethod.name}, IN`);
        try {
            const result = originalMethod.apply(this, args);
            const finish = Date.now();
            log.data(`$Method $${originalMethod.name}, EXEC TIME: ${finish - start}ms`);
            log.data(`$Method $${originalMethod.name}, OUT`);
            return result;
        }
        catch (error) {
            log.error(`$Method $${originalMethod.name}, ERROR: ${error}`);
            throw error;
        }
    };
}
exports.default = measure;
;
