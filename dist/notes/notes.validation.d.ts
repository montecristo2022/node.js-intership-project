import * as yup from 'yup';
export declare const noteSchema: yup.ObjectSchema<{
    text: string;
    archived: boolean;
    category: NonNullable<"Task" | "Random Thought" | "Idea">;
}, yup.AnyObject, {
    text: undefined;
    archived: undefined;
    category: undefined;
}, "">;
