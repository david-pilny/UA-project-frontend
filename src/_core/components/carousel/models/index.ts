export interface CarouselProps {
  slides: any
  controls?: boolean
  indicators?: boolean
  interval?: number
}

export interface CarouselItemProps {
  slide: string
  currentSlide: number
  index: number
  direction: DirectionTypes
}

export type DirectionTypes = 'left' | 'right'

export type TransitionEffect = 'slide-out' | 'slide-in'

export interface IndicatorsProps {
  total: number
  currentIndex: number
}
