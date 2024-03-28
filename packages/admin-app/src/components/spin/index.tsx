import { cn } from '@/lib/utils'
import React from 'react'
import './index.css'
import { LoadingSpinner } from './loading'
export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
  loading: boolean
}

const Spinner = ({
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
    return <LoadingSpinner size={size} {...props} />
  }
  return (
    <div className='relative'>
      <div
        className={cn(
          'absolute w-[100%] h-[100%] bg-white/70 dark:bg-black/70 z-10 flex justify-center pt-16',
          { hidden: !loading }
        )}
      >
        <LoadingSpinner size={size} {...props} />
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Spinner
