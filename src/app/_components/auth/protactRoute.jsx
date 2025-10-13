import { redirect, RedirectType } from 'next/navigation';

export default function protactRoute({ children, user, rediract = '/login' }) {
  if (!user) {
    redirect(rediract, RedirectType.replace);
  }
  return children;
}
