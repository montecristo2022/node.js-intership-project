"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getStats = exports.getAllNotes = exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = void 0;
const notesRepository_1 = require("../repositories/notesRepository");
const nanoid_1 = require("nanoid");
const yup = __importStar(require("yup"));
const noteSchema = yup.object().shape({
    text: yup.string().required(),
    archived: yup.boolean().required(),
    createdTime: yup.string().required(),
    category: yup.string().required(),
});
const getNoteById = (id) => {
    const note = notesRepository_1.notes.find((note) => note.id === id);
    if (!note)
        throw new Error(`Note with ID: ${id} not found`);
    return note;
};
exports.getNoteById = getNoteById;
const createNote = (note) => __awaiter(void 0, void 0, void 0, function* () {
    yield noteSchema.validate(note);
    const newNote = Object.assign(Object.assign({}, note), { id: (0, nanoid_1.nanoid)() });
    notesRepository_1.notes.push(newNote);
    return newNote;
});
exports.createNote = createNote;
const updateNote = (id, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
    const noteIndex = notesRepository_1.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1)
        throw new Error(`Note with ID: ${id} not found`);
    yield noteSchema.validate(Object.assign(Object.assign({}, notesRepository_1.notes[noteIndex]), updatedFields));
    const updatedNote = Object.assign(Object.assign({}, notesRepository_1.notes[noteIndex]), updatedFields);
    notesRepository_1.notes[noteIndex] = updatedNote;
    return updatedNote;
});
exports.updateNote = updateNote;
const deleteNote = (id) => {
    const noteIndex = notesRepository_1.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1)
        throw new Error(`Note with ID: ${id} not found`);
    const deletedNote = notesRepository_1.notes.splice(noteIndex, 1)[0];
    return deletedNote;
};
exports.deleteNote = deleteNote;
const getAllNotes = () => {
    return notesRepository_1.notes;
};
exports.getAllNotes = getAllNotes;
const getStats = () => {
    const stats = {
        total: notesRepository_1.notes.length,
        active: notesRepository_1.notes.filter((note) => !note.archived).length,
        archived: notesRepository_1.notes.filter((note) => note.archived).length,
        categories: {
            Task: notesRepository_1.notes.filter((note) => note.category === "Task").length,
            "Random Thought": notesRepository_1.notes.filter((note) => note.category === "Random Thought").length,
            Idea: notesRepository_1.notes.filter((note) => note.category === "Idea").length,
        },
    };
    return stats;
};
exports.getStats = getStats;
