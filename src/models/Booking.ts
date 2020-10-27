import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Event } from './Event';
import { User } from './User';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
@Entity()
@ObjectType()
export class Booking extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.bookings, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => Event)
  @ManyToOne(() => Event, (event: Event) => event.bookings, { onDelete: 'CASCADE' })
  event: Event;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
/* eslint-enable @typescript-eslint/explicit-function-return-type */
