import { cn } from '@/lib/utils'
import React from 'react'
export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
  loading: boolean
}

const LoadingSpinner = ({
  size = 24,
  className,
  loading,
  ...props
}: ISVGProps) => {
  const { children } = props
  const isNestedPattern = React.useMemo<boolean>(
    () => typeof children !== 'undefined',
    [children]
  )
  const svgDom = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      {...props}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn({ hidden: !loading }, 'animate-spin', className)}
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  )
  if (!isNestedPattern) {
    return <>{svgDom}</>
  }
  return (
    <div className='relative'>
      <div
        className={cn(
          'absolute w-[100%] h-[100%] bg-slate-100 z-10 bg-opacity-40 flex justify-center pt-10',
          { hidden: !loading }
        )}
      >
        {svgDom}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default LoadingSpinner
