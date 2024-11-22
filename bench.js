// benchmark.js
const iterations = 1000000;

console.log('Starting benchmarks...');
console.log('===================');

// CPU-intensive task
function cpuTest() {
    const start = performance.now();
    let result = 0;
    for (let i = 0; i < iterations; i++) {
        result += Math.sqrt(i) * Math.sin(i);
    }
    const end = performance.now();
    console.log(`CPU Test (${iterations} iterations): ${(end - start).toFixed(2)}ms`);
}

// Memory operations test
function memoryTest() {
    const start = performance.now();
    const array = new Array(iterations);
    for (let i = 0; i < iterations; i++) {
        array[i] = { index: i, value: `item${i}` };
    }
    const end = performance.now();
    console.log(`Memory Test (${iterations} items): ${(end - start).toFixed(2)}ms`);
}

// File operations test
async function fileTest() {
    const fs = await import('fs/promises');
    const start = performance.now();
    
    try {
        // Write test
        await fs.writeFile('test.txt', 'Hello World'.repeat(1000));
        
        // Read test
        await fs.readFile('test.txt', 'utf-8');
        
        // Clean up
        await fs.unlink('test.txt');
        
        const end = performance.now();
        console.log(`File Operations Test: ${(end - start).toFixed(2)}ms`);
    } catch (err) {
        console.error('File operations error:', err);
    }
}

// JSON operations test
function jsonTest() {
    const start = performance.now();
    const data = Array.from({ length: iterations }, (_, i) => ({
        id: i,
        value: `test${i}`,
        nested: { x: i, y: i * 2 }
    }));
    
    const serialized = JSON.stringify(data);
    JSON.parse(serialized);
    
    const end = performance.now();
    console.log(`JSON Operations Test: ${(end - start).toFixed(2)}ms`);
}

// Run all benchmarks
async function runBenchmarks() {
    console.log(`Platform: ${process.version}`);
    console.time('Total Execution Time');
    
    await cpuTest();
    await memoryTest();
    await fileTest();
    await jsonTest();
    
    console.timeEnd('Total Execution Time');
}

runBenchmarks().catch(console.error);