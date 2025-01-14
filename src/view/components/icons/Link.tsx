import { SVGProps } from 'react'

export function Link(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width='1em' height='1em' viewBox='0 0 256 256' {...props}>
      <path
        fill='currentColor'
        d='M166.2 89.8a6.1 6.1 0 0 1 0 8.5l-67.9 67.9a6.2 6.2 0 0 1-8.5 0a6.1 6.1 0 0 1 0-8.5l67.9-67.9a6.1 6.1 0 0 1 8.5 0Zm-25.5 84.9L112.4 203A42 42 0 0 1 53 143.6l28.3-28.3a6 6 0 0 0-8.5-8.5l-28.2 28.3a53.9 53.9 0 0 0 0 76.3a54 54 0 0 0 76.3 0l28.3-28.2a6.1 6.1 0 0 0 0-8.5a5.9 5.9 0 0 0-8.5 0Zm70.7-130.1a53.9 53.9 0 0 0-76.3 0l-28.3 28.2a6 6 0 0 0 8.5 8.5L143.6 53a42 42 0 1 1 59.4 59.4l-28.3 28.3a5.9 5.9 0 0 0 0 8.5a5.8 5.8 0 0 0 4.2 1.8a6.1 6.1 0 0 0 4.3-1.8l28.2-28.3a53.9 53.9 0 0 0 0-76.3Z'
      ></path>
    </svg>
  )
}
