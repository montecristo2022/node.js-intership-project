"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoteDto = exports.IsNotPresentConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsNotPresentConstraint = exports.IsNotPresentConstraint = class IsNotPresentConstraint {
    validate(propertyValue) {
        return propertyValue === undefined;
    }
    defaultMessage(args) {
        return `${args.property} should not be provided.`;
    }
};
exports.IsNotPresentConstraint = IsNotPresentConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsNotPresentConstraint);
class CreateNoteDto {
}
exports.CreateNoteDto = CreateNoteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNoteDto.prototype, "archived", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['Task', 'Random Thought', 'Idea']),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.Validate)(IsNotPresentConstraint, { message: 'ID will be generated automatically.' }),
    __metadata("design:type", void 0)
], CreateNoteDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.Validate)(IsNotPresentConstraint, { message: 'Creation time will be set automatically.' }),
    __metadata("design:type", void 0)
], CreateNoteDto.prototype, "createdTime", void 0);
//# sourceMappingURL=create-note.dto.js.map