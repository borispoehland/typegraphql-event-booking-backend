import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ApolloContext } from '../../@types/custom';
import { Event } from '../models/Event';
import { CreateEventInput } from '../types/CreateEventInput';
import { User } from '../models/User';

/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */
@Resolver()
export class EventResolver {
  @Query(() => [Event])
  events() {
    return Event.find({ relations: ['creator'] });
  }

  @Authorized()
  @Mutation(() => Event)
  async createEvent(@Arg('data') data: CreateEventInput, @Ctx() ctx: ApolloContext) {
    const event = Event.create(data);

    const { userId } = ctx;
    const creator = await User.findOne({ where: { id: userId } });
    if (!creator) throw new Error('User does not exist!');

    event.creator = creator;
    await event.save();

    return event;
  }
}
/* eslint-enable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */
