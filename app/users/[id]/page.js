
import prisma from "@/Lib/prisma";
import DeleteButton from "./deleteButton";
import UserForm from "@/app/components/Userform";
import MoodState from "@/app/components/Moodstate";
import Hexbutton from '@/app/hexbutton';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default async function Users({ params }) {

  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { moods: true },
  });

  const latestMood = await prisma.mood.findFirst({
    where: { userId: user.id },
    orderBy: { created: 'desc' },
  });

  return (
    <main className="user-layout">
      <Hexbutton link="/" text="Terug" Icon={ArrowLeftIcon}>
            </Hexbutton>
      <div className="user-image">
        <h1>
          {user?.name || 'User not found'}
        </h1>
        {latestMood &&
            <MoodState moodstate={latestMood} />
        }
      </div>
      <UserForm user={user} />



      {user && <DeleteButton userId={id} />}
    </main>
  );
}
