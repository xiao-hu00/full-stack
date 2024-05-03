
import { OpenTabs } from '@/components'
import { TopTools } from '@/components'

const Header = () => {
  
  return (
    <div className='border-b border-b-gray-100 shadow-sm shadow-gray-300 dark:border-b-gray-800 dark:shadow-gray-500'>
      <div className='h-10 flex items-center justify-between space-x-8 bg-gray-50 dark:bg-gray-900'>
        <OpenTabs />
      </div>
      <TopTools />
    </div>
  )
}

export default Header
