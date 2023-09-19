# Entities in TypeORM and NestJS

In the context of TypeORM and NestJS, an "entity" is a TypeScript class that represents a database table or a document in a NoSQL database. Entities define the structure and properties of the data that will be stored in the database.

## Creating an Entity

To create an entity in TypeORM and NestJS, you define a TypeScript class and use decorators provided by TypeORM to specify the mapping between the class and the database table or document.

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}

```