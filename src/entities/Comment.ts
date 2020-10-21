export class Comment {
  private id = this.getId();
  private comment = '';
  private user_id = 0;
  private photo_id = 0;

  getId(): number {
    return this.id;
  }
  getComment(): string {
    return this.comment;
  }
  getUser_id(): number {
    return this.user_id;
  }
  getPhoto_id(): number {
    return this.photo_id;
  }

  settId(id: number) {
    this.id = id;
  }
  setComment(comment: string) {
    this.comment = comment;
  }
  setUser_id(user_id: number) {
    this.user_id = user_id;
  }
  setPhoto_id(photo_id: number) {
    this.photo_id = photo_id;
  }
}
