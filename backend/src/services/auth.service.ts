import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import type { LoginDto } from '../dtos/login.dto.js';

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export const authenticateUser = async ({ email, password }: LoginDto) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user) throw { status: 401, message: 'Email or password are incorrect' };
  if (!user.isActive) throw { status: 403, message: 'Deactivated account' };
  
  if (user.lockUntil && new Date(user.lockUntil) > new Date()) {
    throw { status: 423, message: 'Account locked temporarly' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    const attempts = (user.failedAttempts || 0) + 1;
    if (attempts >= MAX_ATTEMPTS) {
      const lockTime = new Date(Date.now() + LOCK_MINUTES * 60000);
      await user.update({ failedAttempts: attempts, lockUntil: lockTime });
      throw { status: 423, message: 'Attempts limit reached. Your account is blocked by 15 minutes.' };
    }
    await user.update({ failedAttempts: attempts });
    throw { status: 401, message: 'Email or password are incorrect' };
  }

  if (user.failedAttempts > 0) await user.update({ failedAttempts: 0, lockUntil: null });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as NonNullable<jwt.SignOptions['expiresIn']> }
  );

  return { token, user: { id: user.id, email: user.email } };
};