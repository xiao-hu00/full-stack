// import api from './index'
import { faker } from "@faker-js/faker"
import { Task } from '@/pages/dataTable/schema'
faker.seed(110)
const tasks = Array.from({ length: 30 }, () => ({
  id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
  paymentStatus: faker.helpers.arrayElement(['Paid', 'Pending', 'Unpaid']),
  paymentMethod: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer']),
  totalAmount: `$${faker.number.int({ min: 100, max: 9999 })}`,
}))
export function getData() {
  return new Promise<Task[]>((resolve) => {
    setTimeout(() => {
      resolve(tasks)
    }, 1000)
  })
}
