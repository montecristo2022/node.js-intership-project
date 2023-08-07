import {
  IsBoolean,
  IsString,
  IsIn,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsNotPresentConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: any): boolean {
    return propertyValue === undefined;
  }

  defaultMessage(args): string {
    return `${args.property} should not be provided.`;
  }
}

export class CreateNoteDto {
  @IsString()
  text: string;

  @IsBoolean()
  archived: boolean;

  @IsIn(['Task', 'Random Thought', 'Idea'])
  category: string;

  @Validate(IsNotPresentConstraint, { message: 'ID will be generated automatically.' })
  id?: undefined;

  @Validate(IsNotPresentConstraint, { message: 'Creation time will be set automatically.' })
  createdTime?: undefined;
}
