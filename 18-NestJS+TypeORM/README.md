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

# TypeORM Relationships: One-to-One, One-to-Many, Many-to-One, and Many-to-Many

TypeORM is an Object-Relational Mapper (ORM) for TypeScript and JavaScript. It simplifies the process of working with databases by allowing you to define and manage relationships between entities. This README provides an overview of different types of relationships in TypeORM.

## Installation

To use TypeORM, you need to install it and any required dependencies:

```bash
npm install typeorm reflect-metadata @nestjs/typeorm
```

## Setting up TypeORM in NestJS

Module Configuration: Import TypeOrmModule.forRoot() in your NestJS application's main module to configure the TypeORM connection.

Entity Creation: Create TypeScript classes (entities) that represent the tables in your database.

## Defining Relationships

One-to-One Relationship
In a one-to-one relationship, each record in the first entity can be associated with only one record in the second entity, and vice versa.


```typescript
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: UserProfile;
}

// user-profile.entity.ts
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  // Other profile properties
}

```
## One-to-Many Relationship

In a one-to-many relationship, a record in the first entity can be associated with multiple records in the second entity, but a record in the second entity can be associated with only one record in the first entity.


```typescript
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}

// order.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;
}

```

## Many-to-Many Relationship

A many-to-one relationship is the inverse of a one-to-many relationship. Many records in the first entity can be associated with a single record in the second entity.

Many-to-Many Relationship
In a many-to-many relationship, records in both entities can be associated with multiple records in the other entity.

```typescript
// post.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

// category.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Post, post => post.categories)
  posts: Post[];
}

```


## Using TypeORM Relationships
Creating Records: To create associated records, set the related object in your entities and save them.

Fetching Records: TypeORM automatically fetches related records based on the defined relationships.

Querying: Use TypeORM's repository functions to query and filter based on related entities.

## Conclusion
TypeORM simplifies working with databases by allowing you to define and manage relationships in a more intuitive, object-oriented way. Utilize the examples and patterns provided to effectively work with various types of relationships in your applications.