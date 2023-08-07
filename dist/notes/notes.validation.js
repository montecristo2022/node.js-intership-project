"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteSchema = void 0;
const yup = require("yup");
exports.noteSchema = yup.object().shape({
    text: yup.string().required(),
    archived: yup.boolean().required(),
    category: yup.string().oneOf(['Task', 'Random Thought', 'Idea']).required(),
});
//# sourceMappingURL=notes.validation.js.map