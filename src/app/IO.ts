
// See StoreIO.ts for usage

// A thunk, a lazy value, a plain function, no arguments
export type Lazy<T> = () => T

// IO, just a wrapper around lazy values for easy composition
// This is how we turn effects into descriptions of effects
interface IO<T> {
  // The function that we'll run later.
  readonly run: Lazy<T>
  // Map, because mapping is awesome
  map<U>(f: (t: T) => U): IO<U>
  // Flat map, because why not make it a monad
  flatMap<U>(f: (t: T) => IO<U>): IO<U>
  // combine<A, B>(a: AppIO<A>, b: AppIO<B>): IO<[A, B]>
}

// Implementation of IO<T>
export class AppIO<T> implements IO<T> {
  /**
   * Creates an IO
   * @param {Lazy<T>} run A thunk, a function taking no arguments and returning T
   * @return {IO<T>} The IO instance on T
   */
  public static create <U>(run: Lazy<U>) {
    return new AppIO(run)
  }

  /**
   * Combines 2 IOs into 1. The IO output becomes a tuple of both
   * @param  {IO<A>} a An IO 
   * @param  {IO<B>} b Another IO
   * @return {IO<[A, B]>} The IO with results of A and B combined
   */
  public static combine<A, B>(a: AppIO<A>, b: AppIO<B>) {
    return AppIO.create(
      () => [a.run(), b.run()]
    )
  }

  // The thunk, the function taking no arguments and returning T
  public run: Lazy<T>

  constructor(run: Lazy<T>) {
    this.run = run
  }

  /**
   * Maps an IO of one type/value to an IO of different type/value
   * @param {T => U} f - The mapper, turning T into a U
   * @return {IO<U>} An IO of U
   */
  public map<U>(f: (t: T) => U): AppIO<U> {
    return AppIO.create(() => f(this.run()));
  }

  /**
   * Turn IO<IO<U> into IO<U>
   * @param {T => IO<U>} f - Function taking T and returning IO<U>
   * @return {IO<U>} An IO of U
   */
  public flatMap<U>(f: (t: T) => IO<U>) {
    return AppIO.create(
      () => {
        const value = this.run()
        return f(value).run()
      }
    )
  }

  // Other fun helpers
  /**
   * Returns an IO of the same type (T) but it's run function will only
   * execute once.
   */
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

  /**
   * 
   * @param {IO<U>} io - The IO to run after this one
   * @return {IO<U>} An IO of U, run after IO<T>
   */
  public andThen<U>(io: AppIO<U>) {
    return AppIO.create(
      () => {
        // Run this IO, the IO of T
        this.run()
        // Then return the result of running IO of U
        return io.run()
      }
    )
  }
}

