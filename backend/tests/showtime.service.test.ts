import { describe, it, expect } from 'vitest';
import { calculateEndTime, CLEANING_BUFFER_MINUTES } from '../src/services/showtime.service.ts';

describe('Showtime Service Unit Tests', () => {
  it('Debe calcular correctamente el endTime sumando la duración y el tiempo de limpieza', () => {
    const startTime = new Date('2026-12-01T18:00:00.000Z');
    const durationMinutes = 120; // 2 horas
    const endTime = calculateEndTime(startTime, durationMinutes);
    
    const expectedMinutes = durationMinutes + CLEANING_BUFFER_MINUTES;
    const expectedEndTime = new Date(startTime.getTime() + expectedMinutes * 60000);
    
    expect(endTime).toEqual(expectedEndTime);
  });
});