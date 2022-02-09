import { getLocalStorage } from './localstorage';

export default function Auth() {
  const email = getLocalStorage('user', false);
  const tkmeals = parseInt(getLocalStorage('mealsToken', false), 10);
  const tkdrinks = parseInt(getLocalStorage('cocktailsToken', false), 10);

  if (!email && !tkmeals && !tkdrinks) return true;
  return false;
}
