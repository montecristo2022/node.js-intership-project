export declare function findNoteById(id: string): {
    id: string;
    text: string;
    archived: boolean;
    createdTime: string;
    category: string;
};
export declare function addNoteToRepository(note: any): any;
export declare function findNoteIndexById(id: string): number;
export declare function updateNoteInRepository(index: number, updatedNote: any): any;
export declare function deleteNoteFromRepository(index: number): {
    id: string;
    text: string;
    archived: boolean;
    createdTime: string;
    category: string;
};
export declare function getAllNotesFromRepository(): {
    id: string;
    text: string;
    archived: boolean;
    createdTime: string;
    category: string;
}[];
