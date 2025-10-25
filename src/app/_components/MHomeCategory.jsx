'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MHomeCategory() {
  const categories = [
    { id: 1, icon: '/assets/acRepair.png', title: 'Repair' },
    { id: 2, icon: '/assets/grooming.png', title: 'Grooming' },
    { id: 3, icon: '/assets/plumbing.png', title: 'Plumbing' },
    { id: 4, icon: '/assets/Makeup.png', title: 'Makeup' },
    { id: 5, icon: '/assets/Electrician.png', title: 'Electrician' },
    { id: 6, icon: '/assets/cleaning.png', title: 'Cleaning' },
    { id: 7, icon: '/assets/painting.png', title: 'Painting' },
    { id: 8, icon: '/assets/Catering.png', title: 'Catering,' },
    { id: 9, icon: '/assets/BabyCare.png', title: 'Baby Care' },
    { id: 10, icon: '/assets/Washing.png', title: 'Washing' },
    { id: 11, icon: '/assets/pet.png', title: 'Pet' },
    { id: 12, icon: '/assets/Tutors.png', title: 'Tutors' },
  ];
  const limitedCategories = categories.slice(0, 7);

  return (
    <>
      <h1 className="Seaction-heading">What are you looking for?</h1>
      <div className="flex flex-wrap justify-between gap-y-3">
        {limitedCategories.map((cat, index) => (
          <CategoryCard
            key={cat.id}
            icon={cat.icon}
            title={cat.title}
            id={cat.id}
          />
        ))}
        <CategoryCard icon="/assets/more.png" title="More" id={'allServices'} />
      </div>
    </>
  );
}

const CategoryCard = ({ icon, title, id }) => {
  const router = useRouter();

  const handleClick = () => {
    console.log('Category clicked:', id, title);
    if (id) {
      router.push(`/category/${id}`);
    } else {
      // For "More" button or categories without ID
      console.log('Show all services');
      // You can redirect to a services page here
      // router.push('/services');
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-50 p-4 shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
    >
      <Image
        src={icon}
        alt={title}
        width={48}
        height={48}
        className="mb-2 h-full w-full object-cover"
      />
      <p className="text-center text-xs">{title}</p>
    </div>
  );
};
