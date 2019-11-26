import { IRow } from './row.interface'

export class Row implements IRow {
  private _id: string
  private _name: string
  private _status: string
  private _description: string
  private _delta: number
  private _createdOn: any

  constructor(data: Row) {
    Object.assign(this, data)
  }

  get id(): string {
    return this._id
  }
  set id(id: string) {
    this._id = id
  }

  get name(): string {
    return this._name
  }
  set name(name: string) {
    this._name = name
  }

  get status(): string {
    return this._status
  }
  set status(status: string) {
    this._status = status
  }

  get delta(): number {
    return this._delta
  }
  set delta(delta: number) {
    this._delta = delta
  }

  get createdOn(): any {
    return this._createdOn
  }

  set createdOn(createdOn: any) {
    this._createdOn = createdOn
  }

  get description(): string {
    return this._description
  }
  set description(description: string) {
    this._description = description
  }
}
