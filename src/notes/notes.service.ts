import { Injectable, BadRequestException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { noteSchema } from './notes.validation';
import {
  findNoteById,
  addNoteToRepository,
  findNoteIndexById,
  updateNoteInRepository,
  deleteNoteFromRepository,
  getAllNotesFromRepository
} from './notes.repository';

@Injectable()
export class NotesService {

  getNoteById(id: string) {
    return findNoteById(id);
  }

  async createNote(note: any) {
    this.ensureNoteHasNoId(note);
    this.ensureNoteHasNoCreationTime(note);
    await this.validateNoteWithSchema(note);
    return this.addNote(note);
  }

  async updateNote(id: string, updatedFields: any) {
    const noteIndex = findNoteIndexById(id);
    await this.validateUpdatedNote(getAllNotesFromRepository()[noteIndex], updatedFields);
    return this.applyNoteUpdate(noteIndex, updatedFields);
  }

  deleteNote(id: string) {
    const noteIndex = findNoteIndexById(id);
    return this.removeNoteByIndex(noteIndex);
  }

  getAllNotes() {
    return getAllNotesFromRepository();
  }

  getStats() {
    const notes = getAllNotesFromRepository();
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

  private ensureNoteHasNoId(note: any) {
    if (note.id) {
      throw new BadRequestException('ID will be generated automatically.');
    }
  }

  private ensureNoteHasNoCreationTime(note: any) {
    if (note.createdTime) {
      throw new BadRequestException('Creation time will be set automatically.');
    }
  }

  private validateNoteWithSchema(note: any) {
    return noteSchema.validate(note);
  }

  private addNote(note: any) {
    const newNote = {
      text: note.text,
      archived: note.archived,
      category: note.category,
      id: nanoid(),
      createdTime: new Date().toISOString().split('T')[0],
    };
    return addNoteToRepository(newNote);
  }

  private validateUpdatedNote(originalNote: any, updatedFields: any) {
    return noteSchema.validate({ ...originalNote, ...updatedFields });
  }

  private applyNoteUpdate(noteIndex: number, updatedFields: any) {
    const updatedNote = { ...getAllNotesFromRepository()[noteIndex], ...updatedFields };
    return updateNoteInRepository(noteIndex, updatedNote);
  }

  private removeNoteByIndex(noteIndex: number) {
    return deleteNoteFromRepository(noteIndex);
  }

  private countByArchivedStatus(archived: boolean) {
    return getAllNotesFromRepository().filter((note) => note.archived === archived).length;
  }

  private countByCategory(category: string) {
    return getAllNotesFromRepository().filter((note) => note.category === category).length;
  }
}






// import { Injectable, BadRequestException } from '@nestjs/common';
// import { notes } from '../repositories/notesRepository';
// import { nanoid } from 'nanoid';
// import * as yup from 'yup';

// const noteSchema = yup.object().shape({
//   text: yup.string().required(),
//   archived: yup.boolean().required(),
//   category: yup.string().oneOf(['Task', 'Random Thought', 'Idea']).required(),
// });

// @Injectable()
// export class NotesService {

//   getNoteById(id: string) {
//     return this.findNoteById(id);
//   }

//   async createNote(note: any) {
//     this.ensureNoteHasNoId(note);
//     this.ensureNoteHasNoCreationTime(note);
//     await this.validateNoteWithSchema(note);
//     return this.addNote(note);
//   }

//   async updateNote(id: string, updatedFields: any) {
//     const noteIndex = this.findNoteIndexById(id);
//     await this.validateUpdatedNote(notes[noteIndex], updatedFields);
//     return this.applyNoteUpdate(noteIndex, updatedFields);
//   }

//   deleteNote(id: string) {
//     const noteIndex = this.findNoteIndexById(id);
//     return this.removeNoteByIndex(noteIndex);
//   }

//   getAllNotes() {
//     return notes;
//   }

//   getStats() {
//     return {
//       total: notes.length,
//       active: this.countByArchivedStatus(false),
//       archived: this.countByArchivedStatus(true),
//       categories: {
//         Task: this.countByCategory('Task'),
//         'Random Thought': this.countByCategory('Random Thought'),
//         Idea: this.countByCategory('Idea'),
//       },
//     };
//   }

//   private findNoteById(id: string) {
//     const note = notes.find((note) => note.id === id);
//     if (!note) throw new BadRequestException(`Note with ID: ${id} not found`);
//     return note;
//   }

//   private ensureNoteHasNoId(note: any) {
//     if (note.id) {
//       throw new BadRequestException('ID will be generated automatically.');
//     }
//   }

//   private ensureNoteHasNoCreationTime(note: any) {
//     if (note.createdTime) {
//       throw new BadRequestException('Creation time will be set automatically.');
//     }
//   }

//   private validateNoteWithSchema(note: any) {
//     return noteSchema.validate(note);
//   }

//   private addNote(note: any) {
//     const newNote = {
//       text: note.text,
//       archived: note.archived,
//       category: note.category,
//       id: nanoid(),
//       createdTime: new Date().toISOString().split('T')[0],
//     };
//     notes.push(newNote);
//     return newNote;
//   }

//   private findNoteIndexById(id: string) {
//     const noteIndex = notes.findIndex((note) => note.id === id);
//     if (noteIndex === -1) throw new BadRequestException(`Note with ID: ${id} not found`);
//     return noteIndex;
//   }

//   private validateUpdatedNote(originalNote: any, updatedFields: any) {
//     return noteSchema.validate({ ...originalNote, ...updatedFields });
//   }

//   private applyNoteUpdate(noteIndex: number, updatedFields: any) {
//     const updatedNote = { ...notes[noteIndex], ...updatedFields };
//     notes[noteIndex] = updatedNote;
//     return updatedNote;
//   }

//   private removeNoteByIndex(noteIndex: number) {
//     const deletedNote = notes.splice(noteIndex, 1)[0];
//     return deletedNote;
//   }

//   private countByArchivedStatus(archived: boolean) {
//     return notes.filter((note) => note.archived === archived).length;
//   }

//   private countByCategory(category: string) {
//     return notes.filter((note) => note.category === category).length;
//   }
// }
