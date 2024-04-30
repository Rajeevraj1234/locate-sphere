import HomeFoundSection from "../Components/HomeFoundSection"
import Main from "../Components/Main"
import HomeTestimonialSection from "../Components/HomeTestimonialSection"

const Landing = () => {
  return (
    <div className="mt-[100px] select-none">
      <div>
        <Main />
      </div>
      <div>
        <HomeFoundSection />
      </div>
      <div>
        <HomeTestimonialSection />
      </div>
    </div>
  )
}

export default Landing