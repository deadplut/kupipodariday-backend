import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
/*
TODO
В DTO
1) указать минимальную длину DTO для username
2) указать ссылочный тип для avatar
3) для почты указать валидатор
4) 

*/
