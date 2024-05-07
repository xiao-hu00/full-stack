import { useState } from 'react'
import { Checkbox } from './ui/checkbox'
export default function CheckboxGroup(props: any) {
  const abc = ['A', 'B', 'C', 'D', 'E']
  const [value, setValue] = useState<any>([])
  const checkboxChange = (e: any, index: number) => {
    let list = value
    if (e) {
      list.push(abc[index])
    } else {
      list = value.filter((m: any) => m !== abc[index])
    }
    setValue(list)
    if (list.length === 0) {
      list = null
    }
    props?.onChange(list)
  }
  return (
    <>
      {props.items?.options?.map((item: any, index: number) => (
        <div key={index} className='flex space-x-2 mt-2'>
          <Checkbox
            id={props.items?.id + '-' + index}
            onCheckedChange={e => checkboxChange(e, index)}
          />
          <label
            htmlFor={props.items?.id + '-' + index}
            className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {item}
          </label>
        </div>
      ))}
    </>
  )
}
