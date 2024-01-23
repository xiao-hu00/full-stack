// import api from './index'
import { faker } from "@faker-js/faker"
import { Task } from '@/components/dataTable/data'
const chunk = (input: Array<any>, size: number) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

faker.seed(110)
const tasks = Array.from({ length: 100 }, () => ({
  id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
  paymentStatus: faker.helpers.arrayElement(['Paid', 'Pending', 'Unpaid']),
  paymentMethod: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer']),
  totalAmount: `$${faker.number.int({ min: 100, max: 9999 })}`,
}))

interface paramsType {
  currentPage: number
  pageSize: number
}
interface dataType {
  data: Task[]
  total: number
}
export function getData({ currentPage, pageSize }: paramsType) {
  const data = chunk(tasks, pageSize)
  return new Promise<dataType>((resolve) => {
    setTimeout(() => {
      resolve({
        data: data[currentPage-1],
        total: 100,
      })
    }, 1000)
  })
}
