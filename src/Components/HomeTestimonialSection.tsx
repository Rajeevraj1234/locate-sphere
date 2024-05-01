import axios from "axios";
import { useEffect, useState } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";

const HomeTestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function pullTestimonials() {
      const res = await axios.get(
        `  https://locate-sphere-backend.rajeevraj9308.workers.dev/api/testimonials/getTestimonials`
      );
      setTestimonials(res.data);
    }
    pullTestimonials();
  }, []);

  return (
    <div className="my-20 mx-3 sm:mx-[80px] ">
      <h1 className="text-center text-[2.7rem] sm:text-[4rem] tracking-tighter mb-20">
        Testimonials
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-5">
        {testimonials.map((t: any, index: number) => (
          <TestinimonialsCards
            key={index}
            content={t.content}
            name={t.user.name}
            imageUrl={t.user.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

function TestinimonialsCards({
  content,
  name,
  imageUrl,
}: {
  content: string;
  name: string;
  imageUrl: string;
}) {
  return (
    <div className="w-full sm:w-[400px] border border-gray-500 rounded-md p-4 ">
      <div className="text-3xl mb-3 text-gray-500">
        <RiDoubleQuotesL />
      </div>
      <p className="text-sm  font-light mb-5 ml-3">{content}</p>
      <h3 className="flex items-center gap-2 font-medium ml-3">
        {" "}
        <img src={imageUrl} className="w-[25px] rounded-full" alt="X" /> {name}
      </h3>
    </div>
  );
}

export default HomeTestimonialSection;
