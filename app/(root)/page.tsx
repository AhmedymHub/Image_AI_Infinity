import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Home = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in'); // Redirect to sign-in if not authenticated
  }

  return (
    <div>
      <p>Welcome, {user.firstName}!</p>
    </div>
  );
};

export default Home;
