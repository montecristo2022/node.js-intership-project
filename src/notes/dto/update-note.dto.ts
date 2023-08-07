import {
  IsBoolean,
  IsString,
  IsOptional,
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

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsIn(['Task', 'Random Thought', 'Idea'])
  category?: string;

  @Validate(IsNotPresentConstraint, { message: 'ID cannot be modified.' })
  id?: undefined;

  @Validate(IsNotPresentConstraint, { message: 'Creation time cannot be modified.' })
  createdTime?: undefined;
}
