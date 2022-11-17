import * as bcrypt from 'bcryptjs';
import { ValueTransformer } from 'typeorm';

export class PasswordTransformer implements ValueTransformer {
  public to(value: string): string {
    if (value) {
      return bcrypt.hashSync(value, 10);
    }
    return value;
  }

  public from(value: string): string {
    return value;
  }
}
