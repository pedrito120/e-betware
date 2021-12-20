import { Exclude, Expose } from 'class-transformer';
import { Book } from 'src/books/entities/books.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderBook } from './order-book.entity';
import { User } from './users.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
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
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
  @OneToMany(() => OrderBook, (item) => item.order)
  @Exclude()
  books: OrderBook[];

  @Expose()
  get Books() {
    if (this.books) {
      return this.books
        .filter((item) => !!item)
        .map((item) => ({
          ...item.book,
          quantity: item.quantity,
        }));
    }
    return [];
  }
  @Expose()
  get total() {
    if (this.books) {
      return this.books
        .filter((item) => !!item)
        .reduce((total, item) => {
          const preTotal = item.quantity;
          return total + preTotal;
        }, 0);
    }
    return [];
  }
}
