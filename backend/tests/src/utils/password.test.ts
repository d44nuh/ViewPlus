import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword } from '../../../src/utils/password.util';

describe('Pruebas unitarias para password.util.ts', () => {
  const password1 = "ClaveUno123!";
  const password2 = "ClaveDos456!";

  let hash1: string;
  let hash2: string;

  it('Generación de hashes: cada uno es una cadena no vacía y diferente de su contraseña original', async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);

    expect(hash1).toBeTypeOf('string');
    expect(hash1.length).toBeGreaterThan(0);
    expect(hash1).not.toBe(password1);

    expect(hash2).toBeTypeOf('string');
    expect(hash2.length).toBeGreaterThan(0);
    expect(hash2).not.toBe(password2);
  });

  it('Contraseña correcta: comparePassword devuelve true para las credenciales correctas', async () => {
    if (!hash1) hash1 = await hashPassword(password1);
    if (!hash2) hash2 = await hashPassword(password2);

    const isMatch1 = await comparePassword(password1, hash1);
    const isMatch2 = await comparePassword(password2, hash2);

    expect(isMatch1).toBe(true);
    expect(isMatch2).toBe(true);
  });

  it('Contraseña incorrecta: comparePassword devuelve false para credenciales erróneas', async () => {
    if (!hash1) hash1 = await hashPassword(password1);
    if (!hash2) hash2 = await hashPassword(password2);

    const isMatch1 = await comparePassword(password2, hash1);
    const isMatch2 = await comparePassword(password1, hash2);

    expect(isMatch1).toBe(false);
    expect(isMatch2).toBe(false);
  });
});