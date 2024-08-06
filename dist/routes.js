"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = __importDefault(require("./controllers/categories.controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware")); // Perbaiki penulisan path dan nama file
const acl_middleware_1 = __importDefault(require("./middlewares/acl.middleware"));
const router = express_1.default.Router();
router.get("/auth/me", [auth_middleware_1.default, (0, acl_middleware_1.default)(["admin"])], auth_controller_1.default.me);
router.post("/auth/login", auth_controller_1.default.login);
router.post("/auth/register", auth_controller_1.default.register);
router.get("/auth/me", auth_middleware_1.default, auth_controller_1.default.me);
router.put("/auth/profile", auth_middleware_1.default, auth_controller_1.default.profile);
// CRUD Categories
router.get("/categories", categories_controller_1.default.findAll);
router.post("/categories", categories_controller_1.default.create);
router.get("/categories/:id", categories_controller_1.default.findOne);
router.put("/categories/:id", categories_controller_1.default.update);
router.delete("/categories/:id", categories_controller_1.default.delete);
exports.default = router;
