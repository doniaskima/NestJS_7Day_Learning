// Import necessary modules from TypeORM and NestJS
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Item } from './entities/item.entity';
import { Logger } from '@nestjs/common';

// Decorate the class as an EventSubscriber
@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);

  // Constructor: Takes a DataSource and subscribes the instance to it
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  // Specifies the entity to listen for events
  listenTo() {
    return Item;
  }

  // Event handler for beforeInsert: executed before an item is inserted
  beforeInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log(`beforeInsert`, JSON.stringify(event.entity));
  }

  // Event handler for afterInsert: executed after an item is inserted
  afterInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log(`afterInsert`, JSON.stringify(event.entity));
  }
}
