import writeData from './util/io.js';

export function generateReportData(logFn) {
  const data = 'Some dummy data for this demo app';
  if (logFn) {
    logFn(data);
  }

  return data;
}

export async function storeData(data) {
  if (!data) {
    throw new Error('No data received!');
  }
  await writeData(data, 'data.txt');
}

// in-source test suites
if (import.meta.vitest) {
  const { describe, it, expect, vi } = import.meta.vitest

  describe.concurrent('generateReportData', () => {
      it('In-line test: should execute logFn if provided', () => {
          // Arrange - spys
          const logger = vi.fn()

          logger.mockImplementationOnce(()=> {})
          logger.mockImplementation(()=> {})
       
        // Act
        generateReportData(logger)
        // Assert
        expect(logger).toHaveBeenCalled();
        expect(logger).toHaveBeenCalledTimes(1);
        })

  })
  
}