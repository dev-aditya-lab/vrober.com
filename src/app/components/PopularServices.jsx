import Image from "next/image";
import { FaStar } from "react-icons/fa6";

export default function PopularServices() {
    const popularServices = [
        {
            id: 1,
            title: "AC Repair & Service",
            desc: "Professional AC repair and maintenance services to keep your cooling system running efficiently.",
            img: "https://images.pexels.com/photos/33671149/pexels-photo-33671149.jpeg",
            rating: "4.5(95k)",
            price: "₹499",
            discountPrice: "₹299",
        },
        {
            id: 2,
            title: "Electrical Services",
            desc: "Expert electrical installation and repair services for your home and office needs.",
            img: "https://images.pexels.com/photos/9679179/pexels-photo-9679179.jpeg",
            rating: "4.7(87k)",
            price: "₹399",
            discountPrice: "₹249",
        },
        {
            id: 3,
            title: "Plumbing Services",
            desc: "Professional plumbing solutions for all your water and drainage requirements.",
            img: "https://images.pexels.com/photos/12142829/pexels-photo-12142829.jpeg",
            rating: "4.6(92k)",
            price: "₹599",
            discountPrice: "₹399",
        }
    ];

    return (
        <div className="my-9">
            <h2 className="Seaction-heading">Popular Services</h2>
            <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar">
                {/* Popular services card */}
                {
                    popularServices.map(m => {
                        return (
                            <div key={m.id} className="min-w-[300px] max-w-[340px] bg-[#F2F2F2] rounded-lg p-4 flex-shrink-0">
                                <div className="flex gap-3 ">
                                    <div className="w-25 h-25 rounded-md overflow-hidden border-2 border-white bg-red-200 shrink-0">
                                        <Image className="h-full shrink-0 object-cover w-full " src={m.img} alt="vj" height={1000} width={1000} />
                                    </div>
                                    <div>
                                        <h1 className="font-semibold text-xl leading-6 text-zinc-700">{m.title}</h1>
                                        <p className="line-clamp-2 leading-5 text-zinc-500">{m.desc}</p>
                                        <p className="flex items-center gap-2"><FaStar className="text-yellow-400 w-4 h-4" />{m.rating}</p>
                                        <p className="">₹ {m.price} <span className="line-through text-gray-500">{m.discountPrice}</span></p>
                                    </div>
                                </div>
                                <button className="bg-blue-600/80 border border-gray-400 font-bold text-white w-full rounded-md py-1">Book now</button>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
