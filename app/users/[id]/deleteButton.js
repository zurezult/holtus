'use client';
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';

export default function DeleteButton({ userId }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm('Weet je zeker dat je deze user wilt verwijderen?')
    if (!confirmed) return

    const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('user verwijderd');
      router.push('/')
    } else {
      toast.error('Verwijderen mislukt');
    }

  }

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}
