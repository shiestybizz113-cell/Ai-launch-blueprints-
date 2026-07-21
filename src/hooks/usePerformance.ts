import { useState, useCallback } from 'react';

export function usePerformance() {
  const [latencies, setLatencies] = useState<number[]>([]);

  const trackLatency = useCallback((startTime: number) => {
    const endTime = performance.now();
    setLatencies(prev => [...prev.slice(-9), endTime - startTime]);
  }, []);

  return { latencies, trackLatency };
}
