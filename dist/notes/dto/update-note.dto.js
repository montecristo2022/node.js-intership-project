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
exports.UpdateNoteDto = exports.IsNotPresentConstraint = void 0;
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
class UpdateNoteDto {
}
exports.UpdateNoteDto = UpdateNoteDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateNoteDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateNoteDto.prototype, "archived", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['Task', 'Random Thought', 'Idea']),
    __metadata("design:type", String)
], UpdateNoteDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.Validate)(IsNotPresentConstraint, { message: 'ID cannot be modified.' }),
    __metadata("design:type", void 0)
], UpdateNoteDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.Validate)(IsNotPresentConstraint, { message: 'Creation time cannot be modified.' }),
    __metadata("design:type", void 0)
], UpdateNoteDto.prototype, "createdTime", void 0);
//# sourceMappingURL=update-note.dto.js.map