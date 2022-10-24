"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class FormValidator {
    checkCreateForm() {
        return [(0, express_validator_1.body)()];
    }
}
