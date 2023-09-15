// The code  defines a custom NestJS guard called RolesGuard. This guard is used to restrict access to certain routes or endpoints based on user roles.

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// The @Injectable() decorator in NestJS is used to declare a class as an injectable provider.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  //CanActivate is an interface that this class implements to create a custom guard, and ExecutionContext is used to access the execution context of a request.
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    // req.user is simulated data, representing user information after login.
    // It can be stored in the session or elsewhere. 'roles' in user info represents user roles.
    // In this example, Ted has a role of 'general' and can access endpoints with the '@Roles('general')' decorator.
    context.switchToHttp().getRequest().user = {
      account: 'Ted',
      roles: ['general'],
    };
    const user = context.switchToHttp().getRequest().user;

    const hasRole = () =>
      !!user.roles.find((role) => !!roles.find((item) => item === role));

    return user && user.roles && hasRole();
  }
}
