export interface User {
  uid?: string
  email: string
  photoURL: string
  displayName: string
}

export interface FormValue {
  name?: string
  phone?: string
  email: string
  password: string
  passwordConfirm?: string
}
