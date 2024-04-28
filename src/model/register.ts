export interface MissedPerson {
  name: string
  age: number
  email: string
  id: number
  sex: string
  address: string
  phone: string
  birth: string
  LastAddress: string
  img: string
  thumbnail: string
  etc: string
  height: string
  weight: string
  foot: string
  createdAt?: string
  MissedDate: string
  connectedPerson?: {
    name?: string
    phone?: string
    email?: string
    id?: string
    age?: number
    img?: string
  }
}
