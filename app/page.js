
import prisma from "@/Lib/prisma";

import Hexbutton from './hexbutton';
import { PlusIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline';
import {PresentationChartBarIcon } from '@heroicons/react/24/outline';

import styles from "./page.module.css";

export default async function Home() {
  'use server';
  const users = await prisma.user.findMany();

  return (

    <main className={styles.main}>

      {users.map(user => (
        <Hexbutton key={user.id} link={"/users/"+ user.id} text={user.name} Icon={UserIcon} />
      ))}
      <Hexbutton link="/overzicht" text="Overzicht" Icon={PresentationChartLineIcon}>
      </Hexbutton>
       <Hexbutton link="/overzicht2" text="Overzicht2" Icon={PresentationChartBarIcon}>
      </Hexbutton>
      <Hexbutton link="/add-user" text="New User" Icon={PlusIcon}>
      </Hexbutton>
    </main>

  );
}
