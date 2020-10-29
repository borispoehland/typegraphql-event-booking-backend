import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Event } from './Event';
import { Booking } from './Booking';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field(() => [Event])
  @OneToMany(() => Event, (event: Event) => event.creator)
  createdEvents: Event[];

  @Field(() => [Booking])
  @OneToMany(() => Booking, (booking: Booking) => booking.user)
  bookings: Booking[];
}
/* eslint-enable @typescript-eslint/explicit-function-return-type */
