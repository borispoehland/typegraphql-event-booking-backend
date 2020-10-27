import { AuthChecker } from 'type-graphql';
import { ApolloContext } from '../../@types/custom';

interface AuthCheckerProps {
  context: ApolloContext;
}

const customAuthChecker: AuthChecker<ApolloContext> = ({ context }: AuthCheckerProps): boolean => {
  const { isAuth } = context;
  return isAuth;
};

export default customAuthChecker;
