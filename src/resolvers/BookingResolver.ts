import { Arg, Authorized, Ctx, Mutation, Query, Resolver, ID } from 'type-graphql';
import { ApolloContext } from '../../@types/custom';
import { Event } from '../models/Event';
import { User } from '../models/User';
import { Booking } from '../models/Booking';

/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */
@Resolver()
export class BookingResolver {
  @Authorized()
  @Query(() => [User])
  async bookersOf(@Arg('eventId', () => ID) eventId: string) {
    const event = await Event.findOne({ where: { id: eventId }, relations: ['bookings'] });
    if (!event) throw new Error('Event does not exist!');

    const bookings = await Booking.find({ where: { event }, relations: ['user'] });
    return bookings.map((booking: Booking) => booking.user);
  }

  @Authorized()
  @Query(() => [Event])
  async bookingsOf(@Ctx() ctx: ApolloContext, @Arg('userId', () => ID, { nullable: true }) userId?: string) {
    const id = userId || ctx.userId;
    const user = await User.findOne({ where: { id }, relations: ['bookings'] });
    if (!user) throw new Error('User does not exist!');

    const bookings = await Booking.find({ where: { user }, relations: ['event'] });
    return bookings.map((booking: Booking) => booking.event);
  }

  @Authorized()
  @Mutation(() => Booking)
  async createBooking(@Arg('eventId', () => ID) eventId: string, @Ctx() ctx: ApolloContext) {
    const event = await Event.findOne({ where: { id: eventId } });
    if (!event) throw new Error('Event does not exist!');

    const { userId } = ctx;
    const user = await User.findOne({ where: { id: userId }, relations: ['bookings', 'bookings.event'] });
    if (!user) throw new Error('User does not exist!');

    if (user.bookings.filter((booking: Booking) => booking.event.id === eventId).length) {
      throw new Error('You already booked this event!');
    }

    const booking = await Booking.create({ user, event });

    await booking.save();

    return booking;
  }

  @Authorized()
  @Mutation(() => Event)
  async cancelBooking(@Arg('bookingId', () => ID) bookingId: string) {
    const booking = await Booking.findOne({ where: { id: bookingId }, relations: ['event'] });
    if (!booking) throw new Error('The booking does not exist!');

    const { event } = booking;

    await Booking.remove(booking);

    return event;
  }
}

/* eslint-enable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */
