interface MovementType {
  id: number
  title: string
  description: string
  amount: number
  date: Date
}

export default class MovementClass implements MovementType {
  id: number
  title: string
  description: string
  amount: number
  date: Date

  constructor(id: number, title: string, description: string, amount: number, date: Date) {
    this.id = id
    this.title = title
    this.description = description
    this.amount = amount
    this.date = date
  }
}
