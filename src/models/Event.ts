import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Float } from 'type-graphql';
import { User } from './User';
import { Booking } from './Booking';

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
  @ManyToOne(() => User, (user) => user.createdEvents, { onDelete: 'CASCADE' })
  creator: User;

  @Field(() => [Booking])
  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}
