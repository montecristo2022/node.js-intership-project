export declare class NotesService {
    getNoteById(id: string): {
        id: string;
        text: string;
        archived: boolean;
        createdTime: string;
        category: string;
    };
    createNote(note: any): Promise<any>;
    updateNote(id: string, updatedFields: any): Promise<any>;
    deleteNote(id: string): {
        id: string;
        text: string;
        archived: boolean;
        createdTime: string;
        category: string;
    };
    getAllNotes(): {
        id: string;
        text: string;
        archived: boolean;
        createdTime: string;
        category: string;
    }[];
    getStats(): {
        total: number;
        active: number;
        archived: number;
        categories: {
            Task: number;
            'Random Thought': number;
            Idea: number;
        };
    };
    private ensureNoteHasNoId;
    private ensureNoteHasNoCreationTime;
    private validateNoteWithSchema;
    private addNote;
    private validateUpdatedNote;
    private applyNoteUpdate;
    private removeNoteByIndex;
    private countByArchivedStatus;
    private countByCategory;
}
