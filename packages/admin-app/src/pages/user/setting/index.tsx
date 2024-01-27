import { Breadcrumb } from "@/components"

const Setting = () => {

  return (
    <>
      <Breadcrumb
        items={[
          { key: '1', label: '首页' },
          { key: '2', label: '账号设置' },
        ]}
      />
      <span>setting</span>
    </>
  )
}

export default Setting