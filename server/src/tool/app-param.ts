export function read() {
    let args = process.argv
    args.shift()
    args.shift()

    return args
}