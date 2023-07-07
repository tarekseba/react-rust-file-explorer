export class HistoryBuffer {
  private readonly history: string[]
  private head: number
  private tail: number
  private readonly size: number

  constructor (history: string[], head: number, tail: number, size: number) {
    this.history = history
    this.head = head
    this.tail = tail
    this.size = size
  }

  public static from (history: HistoryBuffer) {
    return new HistoryBuffer(history.history, history.head, history.tail, history.size)
  }

  push (path: string): HistoryBuffer {
    if (++this.head === this.tail) {
      this.tail++
    }
    this.history[this.head] = path
    return HistoryBuffer.from(this)
  }

  next (): HistoryBuffer {
    if (this.canNext()) {
      this.head = (this.head + 1) % this.size
      return HistoryBuffer.from(this)
    }
    return this
  }

  prev (): HistoryBuffer {
    if (this.canPrev()) {
      if (this.head === this.tail) {
        return this
      }
      this.head = (this.head - 1 + 50) % 50
      return HistoryBuffer.from(this)
    }
    return this
  }

  peek (): string {
    return this.history[this.head]
  }

  canPrev (): boolean {
    return this.head !== this.tail
  }

  canNext (): boolean {
    return this.head !== ((this.tail + 50 - 1) % 50) && this.head < this.history.length - 1
  }
}
