export class Post {
  private id = this.getId();
  private name = '';
  private weight = 0;
  private age = 0;
  private access = 0;
  private user_id = 0;
  private user_username = '';

  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getWeight(): number {
    return this.weight;
  }
  getAge(): number {
    return this.age;
  }
  getAccess(): number {
    return this.access;
  }
  getUser_id(): number {
    return this.user_id;
  }
  getUser_username(): string {
    return this.user_username;
  }

  settId(id: number) {
    this.id = id;
  }
  setName(name: string) {
    this.name = name;
  }
  setWeight(weight: number) {
    this.weight = weight;
  }
  setAge(age: number) {
    this.age = age;
  }
  setAccess(access: number): any {
    this.age = access;
  }
  setUser_id(user_id: number) {
    this.user_id = user_id;
  }
  setUser_username(user_username: string) {
    this.user_username = user_username;
  }
}
