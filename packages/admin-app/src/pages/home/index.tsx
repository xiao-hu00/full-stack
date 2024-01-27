import { Breadcrumb } from "@/components"

const Home = () => {

  return (
    <div>
      <Breadcrumb items={[{ key: '1', label: '首页' }]} />
      <span>home</span>
    </div>
  )
}

export default Home