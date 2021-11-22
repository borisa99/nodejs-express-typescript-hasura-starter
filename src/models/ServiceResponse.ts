export class ServiceResponse<T> {
  public status = 200
  public payload: T | null = null
  public error: any = null
}
