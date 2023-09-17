import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Guard()
export class WebSocketRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(data, context: ExecutionContext): boolean {
    const { parent, handler } = context;
    const roles = this.reflector.get<string[]>('roles', handler);
    if (!roles) {
      return true;
    }
    /*
        Unlike Route Guard, we use `data` instead of `req`. 
        Here, `data` refers to the message passed, and for demo purposes, 
        `data` is the message pushed from the frontend containing an array of roles 
        representing the roles of the frontend user.
        */
    const hasRole = () =>
      !!data.roles.find((role) => !!roles.find((item) => item === role));
    return data && data.roles && hasRole();
  }
}
