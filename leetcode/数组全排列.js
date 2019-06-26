class Permutation {
    constructor (str) {
        this.arr = str.split('')
        this.res = []
        this.run(0)
    }
    run (index) {
        if (index === this.arr.length - 1) {
            this.res.push(Array.from(this.arr))
            return
        }
        for (let i = index; i < this.arr.length; i++) {
            ;[this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]]
            this.run(index + 1)
            ;[this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]]
        }
    }
}

const res = new Permutation('526')
console.log(res.res)