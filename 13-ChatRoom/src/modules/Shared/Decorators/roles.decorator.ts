//This code defines a custom decorator called Roles in NestJS.

import { SetMetadata } from '@nestjs/common';
//SetMetadata is a utility decorator provided by NestJS for attaching metadata to classes, methods, or properties.

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
