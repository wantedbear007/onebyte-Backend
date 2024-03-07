import bcrypt from "bcrypt";

const SALT_ROUNDS: number = 10;

class Hashing {
  // hashing user password
  static async hashPassword(password: string): Promise<string | null> {
    try {
      const hashedPassword: string = await bcrypt.hash(password, SALT_ROUNDS);
      return hashedPassword;
    } catch (err: any) {
      console.log("error hashing password ", err.message);
      return null;
    }
  }

  // compare passwords
  static async comparePassword(
    planPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const isMatched: boolean = await bcrypt.compare(
        planPassword,
        hashedPassword,
      );
      return isMatched;
    } catch (err: any) {
      console.log("Error matching password ", err.message);
      return false;
    }
  }
}

export default Hashing;
