import { cn } from '@/lib/utils'
import React from 'react'
import './index.css'
export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
  loading: boolean
}

const LoadingSpinner = ({
  size = 30,
  loading,
  ...props
}: ISVGProps) => {
  const { children } = props
  const isNestedPattern = React.useMemo<boolean>(
    () => typeof children !== 'undefined',
    [children]
  )
  if (!isNestedPattern) {
    return <div className='loader' style={{ width: size, height: size }}></div>
  }
  return (
    <div className='relative'>
      <div
        className={cn(
          'absolute w-[100%] h-[100%] bg-slate-100 z-10 bg-opacity-70 flex justify-center pt-16',
          { hidden: !loading }
        )}
      >
        <div className='loader' style={{ width: size, height: size }}></div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default LoadingSpinner
