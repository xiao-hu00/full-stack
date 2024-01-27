import { Breadcrumb } from "@/components"

const Role = () => {

  return (
    <>
      <Breadcrumb
        items={[
          { key: '1', label: '首页' },
          { key: '2', label: '角色设置' },
        ]}
      />
      <span>role</span>
    </>
  )
}

export default Role