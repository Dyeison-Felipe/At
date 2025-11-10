import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/usecase/create-user.usecase';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserPresenter } from '../presenter/create-user.presenter';

@Controller('v1/user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('create-user')
  async createUser(@Body() dto: CreateUserDto): Promise<CreateUserPresenter> {
    const execute = await this.createUserUseCase.execute(dto);

    return new CreateUserPresenter(execute);
  }
}
