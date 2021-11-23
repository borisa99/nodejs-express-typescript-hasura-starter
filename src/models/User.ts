import Model from '../shared/Model'

export class User extends Model {
  avatar_url: string | undefined
  created_at: Date | undefined
  first_name: string | undefined
  id: string | undefined
  last_name: string | undefined
  updated_at: Date | undefined

  constructor() {
    super()
  }
}
