import ChangePassword from '../containers/auth/change-password';
import Dashboard from '../containers/dashboard';
import ForgotPassword from '../containers/auth/forgot-password';
import { Loader } from '../components';
import Login from '../containers/auth/login';
import Signup from '../containers/auth/signup';
import Welcome from '../containers/welcome';

export default {
  ChangePassword: { screen: ChangePassword },
  Dashboard: { screen: Dashboard },
  ForgotPassword: { screen: ForgotPassword },
  Loader: { screen: Loader },
  Login: { screen: Login },
  Signup: { screen: Signup },
  Welcome: { screen: Welcome },
};
