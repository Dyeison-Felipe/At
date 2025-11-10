import { IsString } from 'class-validator';
import { CreateUserOutput } from '../../application/outputs/create-user.output';

export class CreateUserPresenter {
  @IsString()
  id: string;

  constructor(output: CreateUserOutput) {
    this.id = output.id;
  }
}
