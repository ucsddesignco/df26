import './WhatDesignFrontiers.scss'
import { useEffect, useState, type KeyboardEvent } from 'react'
import CalendarIcon from '../../SVGS/CalendarIcon'
import DCoArrow from '../../SVGS/DCoArrow'
import flowersUrl from './flowers.svg?url'
import slide1 from './wdf-carousel/slide-1.png'
import slide2 from './wdf-carousel/slide-2.png'
import slide3 from './wdf-carousel/slide-3.png'
import slide4 from './wdf-carousel/slide-4.png'

const AUTO_ADVANCE_MS = 2000

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
  const [active, setActive] = useState(0)

  const nSlides = slides.length

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % nSlides)
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(id)
  }, [nSlides])

  const go = (next: number) => {
    setActive(((next % nSlides) + nSlides) % nSlides)
  }

  const onCarouselKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(active - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(active + 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      go(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      go(nSlides - 1)
    }
  }

  return (
    <section className='wdf'>
      <div className='wdf__copyTop'>
        <h1 className='wdf__title'>What is Design Frontiers?</h1>
      </div>

      <div className='wdf__copyBody'>
        <div className='wdf__meta'>
          <p className='wdf__meta-line'>
            <a
              href='FILL'
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
              href='FILL'
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
          Design Frontiers is Design Co's annual designathon—a two-day sprint
          where teams tackle real-world challenges with creative design solutions.
          Final projects are presented to a panel of industry professionals who
          offer feedback and select standout work.
        </p>

        <a href='FILL' className='wdf__button' target='_blank' rel='noreferrer'>
          <span className='wdf__button-icon' aria-hidden>
            <DCoArrow />
          </span>
          Register Now
        </a>
      </div>

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
            className='wdf__carousel-track'
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={slide.src}
                className='wdf__carousel-slide'
                aria-hidden={i !== active}
              >
                <img
                  className='wdf__carousel-slide-img'
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='wdf__dots' role='group' aria-label='Carousel slide indicators'>
          {slides.map((_, i) => (
            <button
              key={i}
              type='button'
              className={
                i === active ? 'wdf__dot wdf__dot--active' : 'wdf__dot'
              }
              aria-label={`Show slide ${i + 1} of ${nSlides}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      <img
        className='wdf__flowers'
        src={flowersUrl}
        alt=''
        width={395}
        height={167}
        draggable={false}
        aria-hidden
      />
    </section>
  )
}
