import { ValidatorConstraintInterface } from 'class-validator';
export declare class IsNotPresentConstraint implements ValidatorConstraintInterface {
    validate(propertyValue: any): boolean;
    defaultMessage(args: any): string;
}
export declare class CreateNoteDto {
    text: string;
    archived: boolean;
    category: string;
    id?: undefined;
    createdTime?: undefined;
}
