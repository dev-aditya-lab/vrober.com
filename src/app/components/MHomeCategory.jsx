
export default function MHomeCategory() {
    const categories = [
        { icon: "/assets/ac.png", title: "Repair" },
        { icon: "/assets/grooming.png", title: "Grooming" },
        { icon: "/assets/cleaning.png", title: "Cleaning" },
        { icon: "/assets/painting.png", title: "Painting" },
        { icon: "/assets/grooming.png", title: "Grooming" },
        { icon: "/assets/cleaning.png", title: "Cleaning" },
        { icon: "/assets/painting.png", title: "Painting" },
        { icon: "/assets/plumbing.png", title: "Plumbing" },
        { icon: "/assets/plumbing.png", title: "Plumbing" },
        { icon: "/assets/plumbing.png", title: "Plumbing" },
        { icon: "/assets/plumbing.png", title: "Plumbing" },
        { icon: "/assets/electrician.png", title: "Electrician" },
    ];
    const limitedCategories = categories.slice(0, 7);

    return (
        <>
            <h1 className="mb-2 font-bold text-2xl">What are you looking for?</h1>
            <div className="flex flex-wrap justify-between gap-y-3">
                {limitedCategories.map((cat, index) => (
                    <CategoryCard key={index} icon={cat.icon} title={cat.title} />
                ))}
                <CategoryCard icon="/assets/more.png" title="More" />
            </div>
        </>
    );
}


const CategoryCard = ({ icon, title }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 w-20 h-20 rounded-xl overflow-hidden shadow-md bg-zinc-50">
            <img src={icon} alt={title} className="w-full h-full object-cover mb-2" />
            <p className="text-xs text-center">{title}</p>
        </div>
    );
};


