import express, { Express, Request, Response } from "express";
import { nanoid } from "nanoid";
import { notes as initialNotes } from "../repositories/notesRepository";

let notes = [...initialNotes];

export const notesRoutes = (app: Express) => {
  app.get("/notes/stats", (req: Request, res: Response) => {
    const totalNotes = notes.length;
    const totalArchived = notes.filter((note) => note.archived).length;
    const totalActive = totalNotes - totalArchived;

    const categories = Array.from(new Set(notes.map((note) => note.category)));
    const statsByCategory = categories.map((category) => {
      const notesByCategory = notes.filter(
        (note) => note.category === category
      );
      const totalByCategory = notesByCategory.length;
      const archivedByCategory = notesByCategory.filter(
        (note) => note.archived
      ).length;
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

  //example for post method
  //     {
  //   "id": "",
  //   "text": "Your Note",
  //   "archived": false,
  //   "createdTime": "2023-07-28",
  //   "category": "Idea"
  // }

  app.post("/notes", (req, res) => {
    const { text, archived, createdTime, category } = req.body;

    const note = {
      id: nanoid(),
      text,
      archived,
      createdTime,
      category,
    };

    notes.push(note);
    res.send(note);
  });

  app.delete("/notes/:id", (req: Request, res: Response) => {
    notes = notes.filter((note) => note.id !== req.params.id);
    res.send({ message: `Deleted note with ID: ${req.params.id}` });
  });

  app.patch("/notes/:id", (req: Request, res: Response) => {
    const noteIndex = notes.findIndex((note) => note.id === req.params.id);
    if (noteIndex === -1) {
      res.status(404).send({ message: `No note with ID: ${req.params.id}` });
    } else {
      notes[noteIndex] = { ...notes[noteIndex], ...req.body };
      res.send(notes[noteIndex]);
    }
  });

  app.get("/notes/:id", (req: Request, res: Response) => {
    const note = notes.find((note) => note.id === req.params.id);
    if (note) {
      res.send(note);
    } else {
      res.status(404).send({ message: `No note with ID: ${req.params.id}` });
    }
  });

  app.get("/notes", (req: Request, res: Response) => {
    res.send(notes);
  });
};
