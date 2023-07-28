"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRoutes = void 0;
const nanoid_1 = require("nanoid");
const notesRepository_1 = require("../repositories/notesRepository");
let notes = [...notesRepository_1.notes];
const notesRoutes = (app) => {
    app.post("/notes", (req, res) => {
        const note = req.body;
        note.id = (0, nanoid_1.nanoid)();
        notes.push(note);
        res.send(note);
    });

  app.get("/notes/stats", (req, res) => {
        const totalNotes = notes.length;
        const totalArchived = notes.filter((note) => note.archived).length;
        const totalActive = totalNotes - totalArchived;
        const categories = Array.from(new Set(notes.map((note) => note.category)));
        const statsByCategory = categories.map((category) => {
            const notesByCategory = notes.filter((note) => note.category === category);
            const totalByCategory = notesByCategory.length;
            const archivedByCategory = notesByCategory.filter((note) => note.archived).length;
            const activeByCategory = totalByCategory - archivedByCategory;
            return {
                category,
                total: totalByCategory,
                active: activeByCategory,
                archived: archivedByCategory,
            };
        });
        res.send({
            totalNotes,
            totalActive,
            totalArchived,
            statsByCategory,
        });
    });


    app.delete("/notes/:id", (req, res) => {
        notes = notes.filter((note) => note.id !== req.params.id);
        res.send({ message: `Deleted note with ID: ${req.params.id}` });
    });
    app.patch("/notes/:id", (req, res) => {
        const noteIndex = notes.findIndex((note) => note.id === req.params.id);
        if (noteIndex === -1) {
            res.status(404).send({ message: `No note with ID: ${req.params.id}!!!` });
        }
        else {
            notes[noteIndex] = Object.assign(Object.assign({}, notes[noteIndex]), req.body);
            res.send(notes[noteIndex]);
        }
    });
    app.get("/notes/:id", (req, res) => {
        const note = notes.find((note) => note.id === req.params.id);
        if (note) {
            res.send(note);
        }
        else {
            res.status(404).send({ message: `No note with ID: ${req.params.id}!!!` });
        }
    });
    app.get("/notes", (req, res) => {
        res.send(notes);
    });
  
};
exports.notesRoutes = notesRoutes;
