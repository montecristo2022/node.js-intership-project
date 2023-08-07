import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    getStats(): Promise<{
        total: number;
        active: number;
        archived: number;
        categories: {
            Task: number;
            'Random Thought': number;
            Idea: number;
        };
    }>;
    createNote(noteData: CreateNoteDto): Promise<any>;
    deleteNote(id: string): Promise<{
        message: string;
    }>;
    updateNote(id: string, updatedData: UpdateNoteDto): Promise<any>;
    getNoteById(id: string): Promise<{
        id: string;
        text: string;
        archived: boolean;
        createdTime: string;
        category: string;
    }>;
    getAllNotes(): Promise<{
        id: string;
        text: string;
        archived: boolean;
        createdTime: string;
        category: string;
    }[]>;
}
