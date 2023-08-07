import { notes } from '../repositories/notesRepository';

export function findNoteById(id: string) {
  return notes.find((note) => note.id === id);
}

export function addNoteToRepository(note: any) {
  notes.push(note);
  return note;
}

export function findNoteIndexById(id: string) {
  return notes.findIndex((note) => note.id === id);
}

export function updateNoteInRepository(index: number, updatedNote: any) {
  notes[index] = updatedNote;
  return updatedNote;
}

export function deleteNoteFromRepository(index: number) {
  return notes.splice(index, 1)[0];
}

export function getAllNotesFromRepository() {
  return notes;
}
