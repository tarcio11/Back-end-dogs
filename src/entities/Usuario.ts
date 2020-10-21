export class Usuario {
  private id = this.getId();
  private username = '';
  private email = '';
  private password = '';
  private passwordResetToken = '';

  setUsername(username: string) {
    this.username = username;
  }
  setEmail(email: string) {
    this.email = email;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setPasswordResetToken(PasswordResetToken: string) {
    this.passwordResetToken = PasswordResetToken;
  }

  getUsername(): string {
    return this.username;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
  getId(): number {
    return this.id;
  }
  getPasswordResetToken(): string {
    return this.passwordResetToken;
  }
}
