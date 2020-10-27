import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Float } from 'type-graphql';
import { User } from './User';
import { Booking } from './Booking';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
@Entity()
@ObjectType()
export class Event extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field()
  @Column()
  date: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.createdEvents, { onDelete: 'CASCADE' })
  creator: User;

  @Field(() => [Booking])
  @OneToMany(() => Booking, (booking: Booking) => booking.event)
  bookings: Booking[];
}
/* eslint-enable @typescript-eslint/explicit-function-return-type */
