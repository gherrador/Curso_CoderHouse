const autocannon = require('autocannon')
const { PassThrough } = require('stream')

function run(url) {
    const buffers = []
    const outputStream = new PassThrough()

    const inst = autocannon({
        url,
        connections: 100,
        duration: 20
    })

    autocannon.track(inst, { outputStream })

    outputStream.on('data', data => buffers.push(data))
    inst.on('done', function() {
        process.stdout.write(Buffer.concat(buffers))
    })
}

console.log('Running all benchmarks in parallel ...')

run('http://localhost:8080/info')