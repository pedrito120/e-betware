import { Exclude } from 'class-transformer';
import { Book } from 'src/books/entities/books.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderBook {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updateAt: Date;
  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => Order, (order) => order.books)
  order: Order;
}
