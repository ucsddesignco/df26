
import useEmblaCarousel from 'embla-carousel-react'
import "./Caraousel.scss"
import judge1 from "./../../assets/judges/Sunset1.png"
import judge2 from "./../../assets/judges/Sunset2.png"
import judge3 from "./../../assets/judges/Sunset3.png"
import judge4 from "./../../assets/judges/Sunset4.png"
import judge5 from "./../../assets/judges/Sunset5.png"
import judge6 from "./../../assets/judges/Sunset6.png"

export const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide"><img src={judge1} alt="judge1" /></div>
          <div className="embla__slide"><img src={judge2} alt="judge2" /></div>
          <div className="embla__slide"><img src={judge3} alt="judge3" /></div>
          <div className="embla__slide"><img src={judge4} alt="judge4" /></div>
          <div className="embla__slide"><img src={judge5} alt="judge5" /></div>
          <div className="embla__slide"><img src={judge6} alt="judge6" /></div>
          {/* <div className="embla__slide">Slide 3</div> */}
        </div>
      </div>
    </div>
  )
}