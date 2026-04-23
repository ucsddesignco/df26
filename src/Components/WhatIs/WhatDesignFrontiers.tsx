import './WhatDesignFrontiers.scss'
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TransitionEvent,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  themeIllustrationCrossfadeTransition,
  useSiteTheme,
} from '../../context/SiteThemeContext'
import CalendarIcon from '../../SVGS/CalendarIcon'
import RegisterNow from './registerNow'
import { WhatIsFlowers } from './flowers'
import { WhatIsLeaves } from './leaves'
import { WhatIsStars } from './stars'
import slide1 from './wdf-carousel/slide-1.png'
import slide2 from './wdf-carousel/slide-2.png'
import slide3 from './wdf-carousel/slide-3.png'
import slide4 from './wdf-carousel/slide-4.png'

//Carousel timing
const AUTO_ADVANCE_MS = 6000

//Static slide list (order = carousel order)
const slides = [
  {
    src: slide1,
    alt: 'Three students',
  },
  {
    src: slide2,
    alt: 'Attendees at a workshop',
  },
  {
    src: slide3,
    alt: 'Teams working on laptops',
  },
  {
    src: slide4,
    alt: 'Students presenting',
  },
] as const

export default function WhatDesignFrontiers() {
  const [index, setIndex] = useState(0)
  const [noTransition, setNoTransition] = useState(false)
  const indexRef = useRef(0)
  const { theme: timeTheme } = useSiteTheme()
  const reduceMotion = useReducedMotion()
  const themeDecorTransition = themeIllustrationCrossfadeTransition(reduceMotion)

  const nSlides = slides.length
  const lastReal = nSlides - 1
  const activeUi = index === nSlides ? 0 : index

  indexRef.current = index

  //Autoplay
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    const id = window.setInterval(() => {
      setIndex((i) => {
        if (i === nSlides) return i
        if (i === lastReal) return nSlides
        return i + 1
      })
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(id)
  }, [nSlides, lastReal])

  //Reduced motion
  useEffect(() => {
    if (index !== nSlides) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mq.matches) return
    setNoTransition(true)
    setIndex(0)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setNoTransition(false))
    })
  }, [index, nSlides])

  // fixed carousel sliding (slide 4 to 1)
  const snapCloneToStart = () => {
    setNoTransition(true)
    setIndex(0)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setNoTransition(false))
    })
  }

  const onTrackTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'transform') return
    if (indexRef.current !== nSlides) return
    snapCloneToStart()
  }

  //dots
  const goToSlide = (targetUi: number) => {
    const t = ((targetUi % nSlides) + nSlides) % nSlides
    if (index === nSlides) {
      setNoTransition(true)
      setIndex(t)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false))
      })
      return
    }
    if (t === 0 && index === lastReal) {
      setIndex(nSlides)
      return
    }
    if (t === lastReal && index === 0) {
      setNoTransition(true)
      setIndex(lastReal)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false))
      })
      return
    }
    setIndex(t)
  }

  const goNext = () => {
    if (index === nSlides) {
      snapCloneToStart()
      return
    }
    if (index === lastReal) {
      setIndex(nSlides)
      return
    }
    setIndex((i) => i + 1)
  }

  const goPrev = () => {
    if (index === nSlides) {
      setIndex(lastReal)
      return
    }
    if (index === 0) {
      setNoTransition(true)
      setIndex(lastReal)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false))
      })
      return
    }
    setIndex((i) => i - 1)
  }

  const onCarouselKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    } else if (e.key === 'Home') {
      e.preventDefault()
      goToSlide(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      goToSlide(lastReal)
    }
  }

  return (
    <section className='wdf'>
      {/* --- Heading */}
      <div className='wdf__copyTop'>
        <h1 className='wdf__title'>What is Design Frontiers?</h1>
      </div>

      {/* --- Meta, blurb, register */}
      <div className='wdf__copyBody'>
        <div className='wdf__meta'>
          <p className='wdf__meta-line'>
            <a
              href='https://www.google.com/calendar/render?action=TEMPLATE&text=Design%20Frontiers%202026%20%7C%20Day%201&dates=20260509T140000/20260509T170000&details=Solve%20real%20world%20problems%20at%20Design%20Co%27s%20annual%20design-a-thon!&location=Design%20and%20Innovation%20Building%2C%209510%20Innovation%20Ln%2C%20La%20Jolla%2C%20CA%2092093%2C%20USA&sf=true&output=xml'
              className='wdf__meta-link'
              target='_blank'
              rel='noreferrer'
            >
              <span className='wdf__meta-icon' aria-hidden>
                <CalendarIcon />
              </span>
              <u>Day 1 | Sat, May 9 | 2 PM - 5 PM</u>
            </a>
          </p>
          <p className='wdf__meta-line'>
            <a
              href='https://www.google.com/calendar/render?action=TEMPLATE&text=Design%20Frontiers%202026%20%7C%20Day%202&dates=20260510T100000/20260510T150000&details=Solve%20real%20world%20problems%20at%20Design%20Co%27s%20annual%20design-a-thon!&location=9510%20Innovation%20Ln%2C%20La%20Jolla%2C%20CA%2092093%2C%20USA&sf=true&output=xml'
              className='wdf__meta-link'
              target='_blank'
              rel='noreferrer'
            >
              <span className='wdf__meta-icon' aria-hidden>
                <CalendarIcon />
              </span>
              <u>Day 2 | Sun, May 10 | 10 AM - 3 PM</u>
            </a>
          </p>
        </div>

        <p className='wdf__body'>
        Design Frontiers is Design Co’s annual design-a-thon. 
        Across two days, teams collaborate and innovate in response to real-world problems. 
        Finalists present their projects to a panel of industry professionals who mentor and 
        judge throughout the event.
        </p>

        <a
          href='https://forms.gle/fxEregeHAABCUy6x8'
          className='wdf__button'
          target='_blank'
          rel='noreferrer'
        >
          <span className='wdf__button-icon' aria-hidden>
            <RegisterNow />
          </span>
          <span className='wdf__button-label'>Register Now</span>
        </a>
      </div>

      {/* --- Carousel + dots */}
      <div className='wdf__media'>
        <div
          className='wdf__carousel'
          role='region'
          aria-roledescription='carousel'
          aria-label='Design Frontiers gallery. Use arrow keys or the dots below to change slides.'
          tabIndex={0}
          onKeyDown={onCarouselKeyDown}
        >
          <div
            className={
              noTransition
                ? 'wdf__carousel-track wdf__carousel-track--no-transition'
                : 'wdf__carousel-track'
            }
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTransitionEnd={onTrackTransitionEnd}
          >
            {slides.map((slide, i) => (
              <div
                key={slide.src}
                className='wdf__carousel-slide'
                aria-hidden={activeUi !== i}
              >
                <img
                  className='wdf__carousel-slide-img'
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                />
              </div>
            ))}
            <div
              key='wdf-carousel-clone'
              className='wdf__carousel-slide'
              aria-hidden={index !== nSlides}
            >
              <img
                className='wdf__carousel-slide-img'
                src={slides[0].src}
                alt={slides[0].alt}
                draggable={false}
              />
            </div>
          </div>
        </div>
        <div className='wdf__dots' role='group' aria-label='Carousel slide indicators'>
          {slides.map((_, i) => (
            <button
              key={i}
              type='button'
              className={
                i === activeUi ? 'wdf__dot wdf__dot--active' : 'wdf__dot'
              }
              aria-label={`Show slide ${i + 1} of ${nSlides}`}
              aria-pressed={i === activeUi}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>

      {/* --- Background SVG by time of day (crossfade on theme change) */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={timeTheme}
          className="wdf__timeThemeMotion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={themeDecorTransition}
        >
          {timeTheme === 'morning' ? (
            <WhatIsFlowers className="wdf__timeTheme" aria-hidden />
          ) : timeTheme === 'afternoon' ? (
            <WhatIsLeaves className="wdf__timeTheme" aria-hidden />
          ) : (
            <WhatIsStars className="wdf__timeTheme" aria-hidden />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
