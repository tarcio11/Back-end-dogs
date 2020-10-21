export class DateUtil {
  now() {
    return Math.floor(Date.now() / 1000);
  }
  tokenExp() {
    return this.now() + 60 * 60 * 2 * 1; // token válido por 2hrs
  }
}
