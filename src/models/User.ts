import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Event } from './Event';
import { Booking } from './Booking';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field(() => [Event])
  @OneToMany(() => Event, (event) => event.creator)
  createdEvents: Event[];

  @Field(() => [Booking])
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}

@ObjectType()
export class AuthData {
  @Field(() => ID)
  userId: number;

  @Field()
  token: string;

  @Field(() => Int)
  tokenExpiration: number;
}
