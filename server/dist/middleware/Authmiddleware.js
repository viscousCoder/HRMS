"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuthentication = handleAuthentication;
exports.handleAuthorization = handleAuthorization;
const token_1 = require("../services/token");
function handleAuthentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.header("x-token") || req.body.token;
        if (!token) {
            return next();
        }
        try {
            const employee = yield (0, token_1.handleCheckingToken)(token);
            req.employee = employee;
        }
        catch (error) {
            console.error("Token verification failed:", error);
        }
        return next();
    });
}
// export function handleAuthorization(roles: string[]) {
//   return function (
//     req: AuthenticatedRequest,
//     res: Response,
//     next: NextFunction
//   ): Response | void {
//     if (!req.employee) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     if (!roles.includes(req.employee.employeeDesignation)) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     next();
//   };
// }
function handleAuthorization(roles) {
    return function (req, res, next) {
        if (!req.employee) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (!roles.includes(req.employee.employeedesignation)) {
            res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            return;
        }
        next();
    };
}
