import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ApolloContext } from '../../@types/custom';
import { AuthData, User } from '../models/User';
import { LoginUserInput } from '../inputs/LoginUserInput';
import { CreateUserInput } from '../inputs/CreateUserInput';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find({ relations: ['createdEvents'] });
  }

  @Query(() => User)
  user(@Ctx() ctx: ApolloContext, @Arg('userId', { nullable: true }) userId?: number) {
    const id = userId || ctx.userId;
    return User.findOne({ where: { id }, relations: ['createdEvents'] });
  }

  @Query(() => AuthData)
  async login(@Arg('data') { email, password }: LoginUserInput) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User does not exist!');

    const correctPassword: boolean = await bcrypt.compare(password, user.password);
    if (!correctPassword) throw new Error('Password is incorrect!');

    const token: string = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { userId: user.id, token, tokenExpiration: 1 };
  }

  @Mutation(() => User)
  async createUser(@Arg('data') { email, password }: CreateUserInput) {
    if (await User.findOne({ email })) throw new Error('User exists already.');

    const user = User.create({ email, password: bcrypt.hashSync(password, 12) });
    await user.save();

    return user;
  }
}
