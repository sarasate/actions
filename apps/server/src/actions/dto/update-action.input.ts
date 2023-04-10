import { InputType, PartialType } from '@nestjs/graphql';
import { ActionObject } from './action.object';

@InputType()
export class UpdateActionInput extends PartialType(ActionObject, InputType) {}
