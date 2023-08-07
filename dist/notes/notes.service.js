"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const notes_validation_1 = require("./notes.validation");
const notes_repository_1 = require("./notes.repository");
let NotesService = exports.NotesService = class NotesService {
    getNoteById(id) {
        return (0, notes_repository_1.findNoteById)(id);
    }
    async createNote(note) {
        this.ensureNoteHasNoId(note);
        this.ensureNoteHasNoCreationTime(note);
        await this.validateNoteWithSchema(note);
        return this.addNote(note);
    }
    async updateNote(id, updatedFields) {
        const noteIndex = (0, notes_repository_1.findNoteIndexById)(id);
        await this.validateUpdatedNote((0, notes_repository_1.getAllNotesFromRepository)()[noteIndex], updatedFields);
        return this.applyNoteUpdate(noteIndex, updatedFields);
    }
    deleteNote(id) {
        const noteIndex = (0, notes_repository_1.findNoteIndexById)(id);
        return this.removeNoteByIndex(noteIndex);
    }
    getAllNotes() {
        return (0, notes_repository_1.getAllNotesFromRepository)();
    }
    getStats() {
        const notes = (0, notes_repository_1.getAllNotesFromRepository)();
        return {
            total: notes.length,
            active: this.countByArchivedStatus(false),
            archived: this.countByArchivedStatus(true),
            categories: {
                Task: this.countByCategory('Task'),
                'Random Thought': this.countByCategory('Random Thought'),
                Idea: this.countByCategory('Idea'),
            },
        };
    }
    ensureNoteHasNoId(note) {
        if (note.id) {
            throw new common_1.BadRequestException('ID will be generated automatically.');
        }
    }
    ensureNoteHasNoCreationTime(note) {
        if (note.createdTime) {
            throw new common_1.BadRequestException('Creation time will be set automatically.');
        }
    }
    validateNoteWithSchema(note) {
        return notes_validation_1.noteSchema.validate(note);
    }
    addNote(note) {
        const newNote = {
            text: note.text,
            archived: note.archived,
            category: note.category,
            id: (0, nanoid_1.nanoid)(),
            createdTime: new Date().toISOString().split('T')[0],
        };
        return (0, notes_repository_1.addNoteToRepository)(newNote);
    }
    validateUpdatedNote(originalNote, updatedFields) {
        return notes_validation_1.noteSchema.validate({ ...originalNote, ...updatedFields });
    }
    applyNoteUpdate(noteIndex, updatedFields) {
        const updatedNote = { ...(0, notes_repository_1.getAllNotesFromRepository)()[noteIndex], ...updatedFields };
        return (0, notes_repository_1.updateNoteInRepository)(noteIndex, updatedNote);
    }
    removeNoteByIndex(noteIndex) {
        return (0, notes_repository_1.deleteNoteFromRepository)(noteIndex);
    }
    countByArchivedStatus(archived) {
        return (0, notes_repository_1.getAllNotesFromRepository)().filter((note) => note.archived === archived).length;
    }
    countByCategory(category) {
        return (0, notes_repository_1.getAllNotesFromRepository)().filter((note) => note.category === category).length;
    }
};
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)()
], NotesService);
//# sourceMappingURL=notes.service.js.map