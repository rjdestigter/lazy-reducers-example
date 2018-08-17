
// A thunk, a lazy value, a plain function, no arguments
export type Lazy<T> = () => T

// IO, just a wrapper around lazy values for easy composition
interface IO<T> {
  readonly run: Lazy<T>
  map<U>(f: (t: T) => U): IO<U>
  flatMap<U>(f: (t: T) => IO<U>): IO<U>
  // combine<A, B>(a: AppIO<A>, b: AppIO<B>): IO<[A, B]>
}

// Implementation of IO<T>
export class AppIO<T> implements IO<T> {
  public static create <U>(run: Lazy<U>) {
    return new AppIO(run)
  }

  public static combine<A, B>(a: AppIO<A>, b: AppIO<B>) {
    return AppIO.create(
      () => [a.run(), b.run()]
    )
  }

  public run: Lazy<T>

  constructor(run: Lazy<T>) {
    this.run = run
  }

  public map<U>(f: (t: T) => U): AppIO<U> {
    return AppIO.create(() => f(this.run()));
  }

  public flatMap<U>(f: (t: T) => IO<U>) {
    return AppIO.create(
      () => {
        const value = this.run()
        return f(value).run()
      }
    )
  }

  // Other fun helpers
  public once() {
    let didRun = false
    let output: T | undefined

    return AppIO.create(
      () => {
        if (didRun) {
          return output!
        }

        didRun = true
        output = this.run()
        return output
      }
    )
  }

  public andThen<U>(io: AppIO<U>) {
    return AppIO.create(
      () => {
        this.run()
        return io.run()
      }
    )
  }
}

