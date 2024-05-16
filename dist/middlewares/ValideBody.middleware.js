"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidBody = void 0;
class ValidBody {
    static execute(schema) {
        return (req, res, next) => {
            req.body = schema.parse(req.body);
            return next();
        };
    }
}
exports.ValidBody = ValidBody;
