export interface CrudInterface<T> {

  // Return count of <T> documents
  count(): number;
  getAll(limit?: number, offset?: number): Array<T>;
  loadById(id: any): T;
  insert(t: T): T;
  update(t: T): boolean;
  delete(id: any): boolean;
}
