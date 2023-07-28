import { notes } from "../repositories/notesRepository";
import { nanoid } from "nanoid";
import * as yup from "yup";

const noteSchema = yup.object().shape({
  text: yup.string().required(),
  archived: yup.boolean().required(),
  createdTime: yup.string().required(),
  category: yup.string().required(),
});

export const getNoteById = (id: string) => {
  const note = notes.find((note) => note.id === id);
  if (!note) throw new Error(`Note with ID: ${id} not found`);
  return note;
};

export const createNote = async (note: any) => {
  await noteSchema.validate(note);

  const newNote = {
    ...note,
    id: nanoid(),
  };

  notes.push(newNote);

  return newNote;
};

export const updateNote = async (id: string, updatedFields: any) => {
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex === -1) throw new Error(`Note with ID: ${id} not found`);

  await noteSchema.validate({ ...notes[noteIndex], ...updatedFields });

  const updatedNote = { ...notes[noteIndex], ...updatedFields };
  notes[noteIndex] = updatedNote;

  return updatedNote;
};

export const deleteNote = (id: string) => {
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex === -1) throw new Error(`Note with ID: ${id} not found`);

  const deletedNote = notes.splice(noteIndex, 1)[0];

  return deletedNote;
};

export const getAllNotes = () => {
  return notes;
};

export const getStats = () => {
  const stats = {
    total: notes.length,
    active: notes.filter((note) => !note.archived).length,
    archived: notes.filter((note) => note.archived).length,
    categories: {
      Task: notes.filter((note) => note.category === "Task").length,
      "Random Thought": notes.filter(
        (note) => note.category === "Random Thought"
      ).length,
      Idea: notes.filter((note) => note.category === "Idea").length,
    },
  };

  return stats;
};
