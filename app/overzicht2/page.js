import { getCombinedData } from '@/Lib/getCombinedData';
import MoodGraphCombi from '../components/MoodGraphCombi';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Hexbutton from '@/app/hexbutton';

export default async function Page() {
  const data = await getCombinedData();
  return (
    <>
      <Hexbutton link="/" text="Terug" size="sm" Icon={ArrowLeftIcon}>
      </Hexbutton>
      <MoodGraphCombi data={data} />;

    </>)
}