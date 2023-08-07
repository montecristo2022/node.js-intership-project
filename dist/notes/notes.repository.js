"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotesFromRepository = exports.deleteNoteFromRepository = exports.updateNoteInRepository = exports.findNoteIndexById = exports.addNoteToRepository = exports.findNoteById = void 0;
const notesRepository_1 = require("../repositories/notesRepository");
function findNoteById(id) {
    return notesRepository_1.notes.find((note) => note.id === id);
}
exports.findNoteById = findNoteById;
function addNoteToRepository(note) {
    notesRepository_1.notes.push(note);
    return note;
}
exports.addNoteToRepository = addNoteToRepository;
function findNoteIndexById(id) {
    return notesRepository_1.notes.findIndex((note) => note.id === id);
}
exports.findNoteIndexById = findNoteIndexById;
function updateNoteInRepository(index, updatedNote) {
    notesRepository_1.notes[index] = updatedNote;
    return updatedNote;
}
exports.updateNoteInRepository = updateNoteInRepository;
function deleteNoteFromRepository(index) {
    return notesRepository_1.notes.splice(index, 1)[0];
}
exports.deleteNoteFromRepository = deleteNoteFromRepository;
function getAllNotesFromRepository() {
    return notesRepository_1.notes;
}
exports.getAllNotesFromRepository = getAllNotesFromRepository;
//# sourceMappingURL=notes.repository.js.map