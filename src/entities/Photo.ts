export class Photo {
  private id = this.getId();
  private nameImg = '';
  private size = 0;
  private key = '';
  private post_id = 0;

  getId(): number {
    return this.id;
  }
  getNameImg(): string {
    return this.nameImg;
  }
  getSize(): number {
    return this.size;
  }
  getKey(): string {
    return this.key;
  }
  getPost_id(): number {
    return this.post_id;
  }

  settId(id: number) {
    this.id = id;
  }
  setNameImg(name: string) {
    this.nameImg = name;
  }
  setSize(size: number) {
    this.size = size;
  }
  setKey(key: string) {
    this.key = key;
  }
  setPost_id(post_id: number) {
    this.post_id = post_id;
  }
}
