"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const validator_1 = require("../validator");
const router = express_1.default.Router();
router
    .route('/')
    .get((0, validator_1.checkGetAllForm)(), middleware_1.handleValidationError, controllers_1.getForms)
    .post((0, validator_1.checkCreateForm)(), middleware_1.handleValidationError, controllers_1.postForm);
router
    .route('/:id')
    .get((0, validator_1.checkIdParam)(), middleware_1.handleValidationError, controllers_1.getForm)
    .delete((0, validator_1.checkIdParam)(), middleware_1.handleValidationError, controllers_1.deleteForm);
exports.default = router;
