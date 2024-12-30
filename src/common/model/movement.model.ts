interface MovementType {
  id: number
  title: string
  description: string
  amount: number
}

export default class MovementClass implements MovementType {
  id: number
  title: string
  description: string
  amount: number

  constructor(id: number, title: string, description: string, amount: number) {
    this.id = id
    this.title = title
    this.description = description
    this.amount = amount
  }
}
