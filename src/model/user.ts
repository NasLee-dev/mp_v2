export interface User {
  uid?: string
  email: string
  photoURL: string
  displayName: string
  kind?: string
  localId?: string
  idToken?: string
  refreshToken?: string
}

export interface FormValue {
  name?: string
  phone?: string
  email: string
  password: string
  passwordConfirm?: string
}
