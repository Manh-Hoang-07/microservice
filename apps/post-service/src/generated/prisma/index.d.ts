
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PostCategory
 * 
 */
export type PostCategory = $Result.DefaultSelection<Prisma.$PostCategoryPayload>
/**
 * Model PostTag
 * 
 */
export type PostTag = $Result.DefaultSelection<Prisma.$PostTagPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model PostStats
 * 
 */
export type PostStats = $Result.DefaultSelection<Prisma.$PostStatsPayload>
/**
 * Model PostDailyStats
 * 
 */
export type PostDailyStats = $Result.DefaultSelection<Prisma.$PostDailyStatsPayload>
/**
 * Model PostPostcategory
 * 
 */
export type PostPostcategory = $Result.DefaultSelection<Prisma.$PostPostcategoryPayload>
/**
 * Model PostPosttag
 * 
 */
export type PostPosttag = $Result.DefaultSelection<Prisma.$PostPosttagPayload>
/**
 * Model PostComment
 * 
 */
export type PostComment = $Result.DefaultSelection<Prisma.$PostCommentPayload>
/**
 * Model PostOutbox
 * 
 */
export type PostOutbox = $Result.DefaultSelection<Prisma.$PostOutboxPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more PostCategories
 * const postCategories = await prisma.postCategory.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more PostCategories
   * const postCategories = await prisma.postCategory.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.postCategory`: Exposes CRUD operations for the **PostCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostCategories
    * const postCategories = await prisma.postCategory.findMany()
    * ```
    */
  get postCategory(): Prisma.PostCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postTag`: Exposes CRUD operations for the **PostTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostTags
    * const postTags = await prisma.postTag.findMany()
    * ```
    */
  get postTag(): Prisma.PostTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postStats`: Exposes CRUD operations for the **PostStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostStats
    * const postStats = await prisma.postStats.findMany()
    * ```
    */
  get postStats(): Prisma.PostStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postDailyStats`: Exposes CRUD operations for the **PostDailyStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostDailyStats
    * const postDailyStats = await prisma.postDailyStats.findMany()
    * ```
    */
  get postDailyStats(): Prisma.PostDailyStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postPostcategory`: Exposes CRUD operations for the **PostPostcategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostPostcategories
    * const postPostcategories = await prisma.postPostcategory.findMany()
    * ```
    */
  get postPostcategory(): Prisma.PostPostcategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postPosttag`: Exposes CRUD operations for the **PostPosttag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostPosttags
    * const postPosttags = await prisma.postPosttag.findMany()
    * ```
    */
  get postPosttag(): Prisma.PostPosttagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postComment`: Exposes CRUD operations for the **PostComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostComments
    * const postComments = await prisma.postComment.findMany()
    * ```
    */
  get postComment(): Prisma.PostCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postOutbox`: Exposes CRUD operations for the **PostOutbox** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostOutboxes
    * const postOutboxes = await prisma.postOutbox.findMany()
    * ```
    */
  get postOutbox(): Prisma.PostOutboxDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PostCategory: 'PostCategory',
    PostTag: 'PostTag',
    Post: 'Post',
    PostStats: 'PostStats',
    PostDailyStats: 'PostDailyStats',
    PostPostcategory: 'PostPostcategory',
    PostPosttag: 'PostPosttag',
    PostComment: 'PostComment',
    PostOutbox: 'PostOutbox'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "postCategory" | "postTag" | "post" | "postStats" | "postDailyStats" | "postPostcategory" | "postPosttag" | "postComment" | "postOutbox"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PostCategory: {
        payload: Prisma.$PostCategoryPayload<ExtArgs>
        fields: Prisma.PostCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload>
          }
          findFirst: {
            args: Prisma.PostCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload>
          }
          findMany: {
            args: Prisma.PostCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload>[]
          }
          create: {
            args: Prisma.PostCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload>
          }
          createMany: {
            args: Prisma.PostCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload>[]
          }
          delete: {
            args: Prisma.PostCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload>
          }
          update: {
            args: Prisma.PostCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload>
          }
          deleteMany: {
            args: Prisma.PostCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload>[]
          }
          upsert: {
            args: Prisma.PostCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCategoryPayload>
          }
          aggregate: {
            args: Prisma.PostCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostCategory>
          }
          groupBy: {
            args: Prisma.PostCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<PostCategoryCountAggregateOutputType> | number
          }
        }
      }
      PostTag: {
        payload: Prisma.$PostTagPayload<ExtArgs>
        fields: Prisma.PostTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          findFirst: {
            args: Prisma.PostTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          findMany: {
            args: Prisma.PostTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>[]
          }
          create: {
            args: Prisma.PostTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          createMany: {
            args: Prisma.PostTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>[]
          }
          delete: {
            args: Prisma.PostTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          update: {
            args: Prisma.PostTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          deleteMany: {
            args: Prisma.PostTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>[]
          }
          upsert: {
            args: Prisma.PostTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          aggregate: {
            args: Prisma.PostTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostTag>
          }
          groupBy: {
            args: Prisma.PostTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostTagCountArgs<ExtArgs>
            result: $Utils.Optional<PostTagCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      PostStats: {
        payload: Prisma.$PostStatsPayload<ExtArgs>
        fields: Prisma.PostStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload>
          }
          findFirst: {
            args: Prisma.PostStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload>
          }
          findMany: {
            args: Prisma.PostStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload>[]
          }
          create: {
            args: Prisma.PostStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload>
          }
          createMany: {
            args: Prisma.PostStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload>[]
          }
          delete: {
            args: Prisma.PostStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload>
          }
          update: {
            args: Prisma.PostStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload>
          }
          deleteMany: {
            args: Prisma.PostStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload>[]
          }
          upsert: {
            args: Prisma.PostStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostStatsPayload>
          }
          aggregate: {
            args: Prisma.PostStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostStats>
          }
          groupBy: {
            args: Prisma.PostStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostStatsCountArgs<ExtArgs>
            result: $Utils.Optional<PostStatsCountAggregateOutputType> | number
          }
        }
      }
      PostDailyStats: {
        payload: Prisma.$PostDailyStatsPayload<ExtArgs>
        fields: Prisma.PostDailyStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostDailyStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostDailyStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload>
          }
          findFirst: {
            args: Prisma.PostDailyStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostDailyStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload>
          }
          findMany: {
            args: Prisma.PostDailyStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload>[]
          }
          create: {
            args: Prisma.PostDailyStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload>
          }
          createMany: {
            args: Prisma.PostDailyStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostDailyStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload>[]
          }
          delete: {
            args: Prisma.PostDailyStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload>
          }
          update: {
            args: Prisma.PostDailyStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload>
          }
          deleteMany: {
            args: Prisma.PostDailyStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostDailyStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostDailyStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload>[]
          }
          upsert: {
            args: Prisma.PostDailyStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDailyStatsPayload>
          }
          aggregate: {
            args: Prisma.PostDailyStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostDailyStats>
          }
          groupBy: {
            args: Prisma.PostDailyStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostDailyStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostDailyStatsCountArgs<ExtArgs>
            result: $Utils.Optional<PostDailyStatsCountAggregateOutputType> | number
          }
        }
      }
      PostPostcategory: {
        payload: Prisma.$PostPostcategoryPayload<ExtArgs>
        fields: Prisma.PostPostcategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostPostcategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostPostcategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload>
          }
          findFirst: {
            args: Prisma.PostPostcategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostPostcategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload>
          }
          findMany: {
            args: Prisma.PostPostcategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload>[]
          }
          create: {
            args: Prisma.PostPostcategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload>
          }
          createMany: {
            args: Prisma.PostPostcategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostPostcategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload>[]
          }
          delete: {
            args: Prisma.PostPostcategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload>
          }
          update: {
            args: Prisma.PostPostcategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload>
          }
          deleteMany: {
            args: Prisma.PostPostcategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostPostcategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostPostcategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload>[]
          }
          upsert: {
            args: Prisma.PostPostcategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPostcategoryPayload>
          }
          aggregate: {
            args: Prisma.PostPostcategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostPostcategory>
          }
          groupBy: {
            args: Prisma.PostPostcategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostPostcategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostPostcategoryCountArgs<ExtArgs>
            result: $Utils.Optional<PostPostcategoryCountAggregateOutputType> | number
          }
        }
      }
      PostPosttag: {
        payload: Prisma.$PostPosttagPayload<ExtArgs>
        fields: Prisma.PostPosttagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostPosttagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostPosttagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload>
          }
          findFirst: {
            args: Prisma.PostPosttagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostPosttagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload>
          }
          findMany: {
            args: Prisma.PostPosttagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload>[]
          }
          create: {
            args: Prisma.PostPosttagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload>
          }
          createMany: {
            args: Prisma.PostPosttagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostPosttagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload>[]
          }
          delete: {
            args: Prisma.PostPosttagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload>
          }
          update: {
            args: Prisma.PostPosttagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload>
          }
          deleteMany: {
            args: Prisma.PostPosttagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostPosttagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostPosttagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload>[]
          }
          upsert: {
            args: Prisma.PostPosttagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPosttagPayload>
          }
          aggregate: {
            args: Prisma.PostPosttagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostPosttag>
          }
          groupBy: {
            args: Prisma.PostPosttagGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostPosttagGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostPosttagCountArgs<ExtArgs>
            result: $Utils.Optional<PostPosttagCountAggregateOutputType> | number
          }
        }
      }
      PostComment: {
        payload: Prisma.$PostCommentPayload<ExtArgs>
        fields: Prisma.PostCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          findFirst: {
            args: Prisma.PostCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          findMany: {
            args: Prisma.PostCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>[]
          }
          create: {
            args: Prisma.PostCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          createMany: {
            args: Prisma.PostCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>[]
          }
          delete: {
            args: Prisma.PostCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          update: {
            args: Prisma.PostCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          deleteMany: {
            args: Prisma.PostCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>[]
          }
          upsert: {
            args: Prisma.PostCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          aggregate: {
            args: Prisma.PostCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostComment>
          }
          groupBy: {
            args: Prisma.PostCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCommentCountArgs<ExtArgs>
            result: $Utils.Optional<PostCommentCountAggregateOutputType> | number
          }
        }
      }
      PostOutbox: {
        payload: Prisma.$PostOutboxPayload<ExtArgs>
        fields: Prisma.PostOutboxFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostOutboxFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostOutboxFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload>
          }
          findFirst: {
            args: Prisma.PostOutboxFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostOutboxFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload>
          }
          findMany: {
            args: Prisma.PostOutboxFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload>[]
          }
          create: {
            args: Prisma.PostOutboxCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload>
          }
          createMany: {
            args: Prisma.PostOutboxCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostOutboxCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload>[]
          }
          delete: {
            args: Prisma.PostOutboxDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload>
          }
          update: {
            args: Prisma.PostOutboxUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload>
          }
          deleteMany: {
            args: Prisma.PostOutboxDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostOutboxUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostOutboxUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload>[]
          }
          upsert: {
            args: Prisma.PostOutboxUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostOutboxPayload>
          }
          aggregate: {
            args: Prisma.PostOutboxAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostOutbox>
          }
          groupBy: {
            args: Prisma.PostOutboxGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostOutboxGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostOutboxCountArgs<ExtArgs>
            result: $Utils.Optional<PostOutboxCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    postCategory?: PostCategoryOmit
    postTag?: PostTagOmit
    post?: PostOmit
    postStats?: PostStatsOmit
    postDailyStats?: PostDailyStatsOmit
    postPostcategory?: PostPostcategoryOmit
    postPosttag?: PostPosttagOmit
    postComment?: PostCommentOmit
    postOutbox?: PostOutboxOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PostCategoryCountOutputType
   */

  export type PostCategoryCountOutputType = {
    children: number
    posts: number
  }

  export type PostCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | PostCategoryCountOutputTypeCountChildrenArgs
    posts?: boolean | PostCategoryCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * PostCategoryCountOutputType without action
   */
  export type PostCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategoryCountOutputType
     */
    select?: PostCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCategoryCountOutputType without action
   */
  export type PostCategoryCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostCategoryWhereInput
  }

  /**
   * PostCategoryCountOutputType without action
   */
  export type PostCategoryCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostPostcategoryWhereInput
  }


  /**
   * Count Type PostTagCountOutputType
   */

  export type PostTagCountOutputType = {
    posts: number
  }

  export type PostTagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | PostTagCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * PostTagCountOutputType without action
   */
  export type PostTagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTagCountOutputType
     */
    select?: PostTagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostTagCountOutputType without action
   */
  export type PostTagCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostPosttagWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    daily_stats: number
    categoryLinks: number
    tagLinks: number
    comments: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    daily_stats?: boolean | PostCountOutputTypeCountDaily_statsArgs
    categoryLinks?: boolean | PostCountOutputTypeCountCategoryLinksArgs
    tagLinks?: boolean | PostCountOutputTypeCountTagLinksArgs
    comments?: boolean | PostCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountDaily_statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostDailyStatsWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCategoryLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostPostcategoryWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountTagLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostPosttagWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostCommentWhereInput
  }


  /**
   * Count Type PostCommentCountOutputType
   */

  export type PostCommentCountOutputType = {
    replies: number
  }

  export type PostCommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | PostCommentCountOutputTypeCountRepliesArgs
  }

  // Custom InputTypes
  /**
   * PostCommentCountOutputType without action
   */
  export type PostCommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCommentCountOutputType
     */
    select?: PostCommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCommentCountOutputType without action
   */
  export type PostCommentCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostCommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PostCategory
   */

  export type AggregatePostCategory = {
    _count: PostCategoryCountAggregateOutputType | null
    _avg: PostCategoryAvgAggregateOutputType | null
    _sum: PostCategorySumAggregateOutputType | null
    _min: PostCategoryMinAggregateOutputType | null
    _max: PostCategoryMaxAggregateOutputType | null
  }

  export type PostCategoryAvgAggregateOutputType = {
    id: number | null
    parent_id: number | null
    sort_order: number | null
    created_user_id: number | null
    updated_user_id: number | null
    group_id: number | null
  }

  export type PostCategorySumAggregateOutputType = {
    id: bigint | null
    parent_id: bigint | null
    sort_order: number | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    group_id: bigint | null
  }

  export type PostCategoryMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    slug: string | null
    description: string | null
    parent_id: bigint | null
    is_active: boolean | null
    sort_order: number | null
    seo_title: string | null
    seo_description: string | null
    seo_keywords: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
    group_id: bigint | null
  }

  export type PostCategoryMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    slug: string | null
    description: string | null
    parent_id: bigint | null
    is_active: boolean | null
    sort_order: number | null
    seo_title: string | null
    seo_description: string | null
    seo_keywords: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
    group_id: bigint | null
  }

  export type PostCategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    parent_id: number
    is_active: number
    sort_order: number
    seo_title: number
    seo_description: number
    seo_keywords: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    group_id: number
    _all: number
  }


  export type PostCategoryAvgAggregateInputType = {
    id?: true
    parent_id?: true
    sort_order?: true
    created_user_id?: true
    updated_user_id?: true
    group_id?: true
  }

  export type PostCategorySumAggregateInputType = {
    id?: true
    parent_id?: true
    sort_order?: true
    created_user_id?: true
    updated_user_id?: true
    group_id?: true
  }

  export type PostCategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    parent_id?: true
    is_active?: true
    sort_order?: true
    seo_title?: true
    seo_description?: true
    seo_keywords?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    group_id?: true
  }

  export type PostCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    parent_id?: true
    is_active?: true
    sort_order?: true
    seo_title?: true
    seo_description?: true
    seo_keywords?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    group_id?: true
  }

  export type PostCategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    parent_id?: true
    is_active?: true
    sort_order?: true
    seo_title?: true
    seo_description?: true
    seo_keywords?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    group_id?: true
    _all?: true
  }

  export type PostCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostCategory to aggregate.
     */
    where?: PostCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostCategories to fetch.
     */
    orderBy?: PostCategoryOrderByWithRelationInput | PostCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostCategories
    **/
    _count?: true | PostCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostCategoryMaxAggregateInputType
  }

  export type GetPostCategoryAggregateType<T extends PostCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePostCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostCategory[P]>
      : GetScalarType<T[P], AggregatePostCategory[P]>
  }




  export type PostCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostCategoryWhereInput
    orderBy?: PostCategoryOrderByWithAggregationInput | PostCategoryOrderByWithAggregationInput[]
    by: PostCategoryScalarFieldEnum[] | PostCategoryScalarFieldEnum
    having?: PostCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCategoryCountAggregateInputType | true
    _avg?: PostCategoryAvgAggregateInputType
    _sum?: PostCategorySumAggregateInputType
    _min?: PostCategoryMinAggregateInputType
    _max?: PostCategoryMaxAggregateInputType
  }

  export type PostCategoryGroupByOutputType = {
    id: bigint
    name: string
    slug: string
    description: string | null
    parent_id: bigint | null
    is_active: boolean
    sort_order: number
    seo_title: string | null
    seo_description: string | null
    seo_keywords: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    group_id: bigint | null
    _count: PostCategoryCountAggregateOutputType | null
    _avg: PostCategoryAvgAggregateOutputType | null
    _sum: PostCategorySumAggregateOutputType | null
    _min: PostCategoryMinAggregateOutputType | null
    _max: PostCategoryMaxAggregateOutputType | null
  }

  type GetPostCategoryGroupByPayload<T extends PostCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], PostCategoryGroupByOutputType[P]>
        }
      >
    >


  export type PostCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parent_id?: boolean
    is_active?: boolean
    sort_order?: boolean
    seo_title?: boolean
    seo_description?: boolean
    seo_keywords?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
    parent?: boolean | PostCategory$parentArgs<ExtArgs>
    children?: boolean | PostCategory$childrenArgs<ExtArgs>
    posts?: boolean | PostCategory$postsArgs<ExtArgs>
    _count?: boolean | PostCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postCategory"]>

  export type PostCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parent_id?: boolean
    is_active?: boolean
    sort_order?: boolean
    seo_title?: boolean
    seo_description?: boolean
    seo_keywords?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
    parent?: boolean | PostCategory$parentArgs<ExtArgs>
  }, ExtArgs["result"]["postCategory"]>

  export type PostCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parent_id?: boolean
    is_active?: boolean
    sort_order?: boolean
    seo_title?: boolean
    seo_description?: boolean
    seo_keywords?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
    parent?: boolean | PostCategory$parentArgs<ExtArgs>
  }, ExtArgs["result"]["postCategory"]>

  export type PostCategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parent_id?: boolean
    is_active?: boolean
    sort_order?: boolean
    seo_title?: boolean
    seo_description?: boolean
    seo_keywords?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
  }

  export type PostCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "parent_id" | "is_active" | "sort_order" | "seo_title" | "seo_description" | "seo_keywords" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at" | "group_id", ExtArgs["result"]["postCategory"]>
  export type PostCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | PostCategory$parentArgs<ExtArgs>
    children?: boolean | PostCategory$childrenArgs<ExtArgs>
    posts?: boolean | PostCategory$postsArgs<ExtArgs>
    _count?: boolean | PostCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | PostCategory$parentArgs<ExtArgs>
  }
  export type PostCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | PostCategory$parentArgs<ExtArgs>
  }

  export type $PostCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostCategory"
    objects: {
      parent: Prisma.$PostCategoryPayload<ExtArgs> | null
      children: Prisma.$PostCategoryPayload<ExtArgs>[]
      posts: Prisma.$PostPostcategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      slug: string
      description: string | null
      parent_id: bigint | null
      is_active: boolean
      sort_order: number
      seo_title: string | null
      seo_description: string | null
      seo_keywords: string | null
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
      group_id: bigint | null
    }, ExtArgs["result"]["postCategory"]>
    composites: {}
  }

  type PostCategoryGetPayload<S extends boolean | null | undefined | PostCategoryDefaultArgs> = $Result.GetResult<Prisma.$PostCategoryPayload, S>

  type PostCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCategoryCountAggregateInputType | true
    }

  export interface PostCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostCategory'], meta: { name: 'PostCategory' } }
    /**
     * Find zero or one PostCategory that matches the filter.
     * @param {PostCategoryFindUniqueArgs} args - Arguments to find a PostCategory
     * @example
     * // Get one PostCategory
     * const postCategory = await prisma.postCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostCategoryFindUniqueArgs>(args: SelectSubset<T, PostCategoryFindUniqueArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostCategoryFindUniqueOrThrowArgs} args - Arguments to find a PostCategory
     * @example
     * // Get one PostCategory
     * const postCategory = await prisma.postCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PostCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryFindFirstArgs} args - Arguments to find a PostCategory
     * @example
     * // Get one PostCategory
     * const postCategory = await prisma.postCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostCategoryFindFirstArgs>(args?: SelectSubset<T, PostCategoryFindFirstArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryFindFirstOrThrowArgs} args - Arguments to find a PostCategory
     * @example
     * // Get one PostCategory
     * const postCategory = await prisma.postCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PostCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostCategories
     * const postCategories = await prisma.postCategory.findMany()
     * 
     * // Get first 10 PostCategories
     * const postCategories = await prisma.postCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postCategoryWithIdOnly = await prisma.postCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostCategoryFindManyArgs>(args?: SelectSubset<T, PostCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostCategory.
     * @param {PostCategoryCreateArgs} args - Arguments to create a PostCategory.
     * @example
     * // Create one PostCategory
     * const PostCategory = await prisma.postCategory.create({
     *   data: {
     *     // ... data to create a PostCategory
     *   }
     * })
     * 
     */
    create<T extends PostCategoryCreateArgs>(args: SelectSubset<T, PostCategoryCreateArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostCategories.
     * @param {PostCategoryCreateManyArgs} args - Arguments to create many PostCategories.
     * @example
     * // Create many PostCategories
     * const postCategory = await prisma.postCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCategoryCreateManyArgs>(args?: SelectSubset<T, PostCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostCategories and returns the data saved in the database.
     * @param {PostCategoryCreateManyAndReturnArgs} args - Arguments to create many PostCategories.
     * @example
     * // Create many PostCategories
     * const postCategory = await prisma.postCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostCategories and only return the `id`
     * const postCategoryWithIdOnly = await prisma.postCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostCategory.
     * @param {PostCategoryDeleteArgs} args - Arguments to delete one PostCategory.
     * @example
     * // Delete one PostCategory
     * const PostCategory = await prisma.postCategory.delete({
     *   where: {
     *     // ... filter to delete one PostCategory
     *   }
     * })
     * 
     */
    delete<T extends PostCategoryDeleteArgs>(args: SelectSubset<T, PostCategoryDeleteArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostCategory.
     * @param {PostCategoryUpdateArgs} args - Arguments to update one PostCategory.
     * @example
     * // Update one PostCategory
     * const postCategory = await prisma.postCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostCategoryUpdateArgs>(args: SelectSubset<T, PostCategoryUpdateArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostCategories.
     * @param {PostCategoryDeleteManyArgs} args - Arguments to filter PostCategories to delete.
     * @example
     * // Delete a few PostCategories
     * const { count } = await prisma.postCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostCategoryDeleteManyArgs>(args?: SelectSubset<T, PostCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostCategories
     * const postCategory = await prisma.postCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostCategoryUpdateManyArgs>(args: SelectSubset<T, PostCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostCategories and returns the data updated in the database.
     * @param {PostCategoryUpdateManyAndReturnArgs} args - Arguments to update many PostCategories.
     * @example
     * // Update many PostCategories
     * const postCategory = await prisma.postCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostCategories and only return the `id`
     * const postCategoryWithIdOnly = await prisma.postCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, PostCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostCategory.
     * @param {PostCategoryUpsertArgs} args - Arguments to update or create a PostCategory.
     * @example
     * // Update or create a PostCategory
     * const postCategory = await prisma.postCategory.upsert({
     *   create: {
     *     // ... data to create a PostCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostCategory we want to update
     *   }
     * })
     */
    upsert<T extends PostCategoryUpsertArgs>(args: SelectSubset<T, PostCategoryUpsertArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryCountArgs} args - Arguments to filter PostCategories to count.
     * @example
     * // Count the number of PostCategories
     * const count = await prisma.postCategory.count({
     *   where: {
     *     // ... the filter for the PostCategories we want to count
     *   }
     * })
    **/
    count<T extends PostCategoryCountArgs>(
      args?: Subset<T, PostCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostCategoryAggregateArgs>(args: Subset<T, PostCategoryAggregateArgs>): Prisma.PrismaPromise<GetPostCategoryAggregateType<T>>

    /**
     * Group by PostCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostCategoryGroupByArgs['orderBy'] }
        : { orderBy?: PostCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostCategory model
   */
  readonly fields: PostCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends PostCategory$parentArgs<ExtArgs> = {}>(args?: Subset<T, PostCategory$parentArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends PostCategory$childrenArgs<ExtArgs> = {}>(args?: Subset<T, PostCategory$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends PostCategory$postsArgs<ExtArgs> = {}>(args?: Subset<T, PostCategory$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostCategory model
   */
  interface PostCategoryFieldRefs {
    readonly id: FieldRef<"PostCategory", 'BigInt'>
    readonly name: FieldRef<"PostCategory", 'String'>
    readonly slug: FieldRef<"PostCategory", 'String'>
    readonly description: FieldRef<"PostCategory", 'String'>
    readonly parent_id: FieldRef<"PostCategory", 'BigInt'>
    readonly is_active: FieldRef<"PostCategory", 'Boolean'>
    readonly sort_order: FieldRef<"PostCategory", 'Int'>
    readonly seo_title: FieldRef<"PostCategory", 'String'>
    readonly seo_description: FieldRef<"PostCategory", 'String'>
    readonly seo_keywords: FieldRef<"PostCategory", 'String'>
    readonly created_user_id: FieldRef<"PostCategory", 'BigInt'>
    readonly updated_user_id: FieldRef<"PostCategory", 'BigInt'>
    readonly created_at: FieldRef<"PostCategory", 'DateTime'>
    readonly updated_at: FieldRef<"PostCategory", 'DateTime'>
    readonly group_id: FieldRef<"PostCategory", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * PostCategory findUnique
   */
  export type PostCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostCategory to fetch.
     */
    where: PostCategoryWhereUniqueInput
  }

  /**
   * PostCategory findUniqueOrThrow
   */
  export type PostCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostCategory to fetch.
     */
    where: PostCategoryWhereUniqueInput
  }

  /**
   * PostCategory findFirst
   */
  export type PostCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostCategory to fetch.
     */
    where?: PostCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostCategories to fetch.
     */
    orderBy?: PostCategoryOrderByWithRelationInput | PostCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostCategories.
     */
    cursor?: PostCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostCategories.
     */
    distinct?: PostCategoryScalarFieldEnum | PostCategoryScalarFieldEnum[]
  }

  /**
   * PostCategory findFirstOrThrow
   */
  export type PostCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostCategory to fetch.
     */
    where?: PostCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostCategories to fetch.
     */
    orderBy?: PostCategoryOrderByWithRelationInput | PostCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostCategories.
     */
    cursor?: PostCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostCategories.
     */
    distinct?: PostCategoryScalarFieldEnum | PostCategoryScalarFieldEnum[]
  }

  /**
   * PostCategory findMany
   */
  export type PostCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostCategories to fetch.
     */
    where?: PostCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostCategories to fetch.
     */
    orderBy?: PostCategoryOrderByWithRelationInput | PostCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostCategories.
     */
    cursor?: PostCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostCategories.
     */
    distinct?: PostCategoryScalarFieldEnum | PostCategoryScalarFieldEnum[]
  }

  /**
   * PostCategory create
   */
  export type PostCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PostCategory.
     */
    data: XOR<PostCategoryCreateInput, PostCategoryUncheckedCreateInput>
  }

  /**
   * PostCategory createMany
   */
  export type PostCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostCategories.
     */
    data: PostCategoryCreateManyInput | PostCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostCategory createManyAndReturn
   */
  export type PostCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many PostCategories.
     */
    data: PostCategoryCreateManyInput | PostCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostCategory update
   */
  export type PostCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PostCategory.
     */
    data: XOR<PostCategoryUpdateInput, PostCategoryUncheckedUpdateInput>
    /**
     * Choose, which PostCategory to update.
     */
    where: PostCategoryWhereUniqueInput
  }

  /**
   * PostCategory updateMany
   */
  export type PostCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostCategories.
     */
    data: XOR<PostCategoryUpdateManyMutationInput, PostCategoryUncheckedUpdateManyInput>
    /**
     * Filter which PostCategories to update
     */
    where?: PostCategoryWhereInput
    /**
     * Limit how many PostCategories to update.
     */
    limit?: number
  }

  /**
   * PostCategory updateManyAndReturn
   */
  export type PostCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * The data used to update PostCategories.
     */
    data: XOR<PostCategoryUpdateManyMutationInput, PostCategoryUncheckedUpdateManyInput>
    /**
     * Filter which PostCategories to update
     */
    where?: PostCategoryWhereInput
    /**
     * Limit how many PostCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostCategory upsert
   */
  export type PostCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PostCategory to update in case it exists.
     */
    where: PostCategoryWhereUniqueInput
    /**
     * In case the PostCategory found by the `where` argument doesn't exist, create a new PostCategory with this data.
     */
    create: XOR<PostCategoryCreateInput, PostCategoryUncheckedCreateInput>
    /**
     * In case the PostCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostCategoryUpdateInput, PostCategoryUncheckedUpdateInput>
  }

  /**
   * PostCategory delete
   */
  export type PostCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    /**
     * Filter which PostCategory to delete.
     */
    where: PostCategoryWhereUniqueInput
  }

  /**
   * PostCategory deleteMany
   */
  export type PostCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostCategories to delete
     */
    where?: PostCategoryWhereInput
    /**
     * Limit how many PostCategories to delete.
     */
    limit?: number
  }

  /**
   * PostCategory.parent
   */
  export type PostCategory$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    where?: PostCategoryWhereInput
  }

  /**
   * PostCategory.children
   */
  export type PostCategory$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
    where?: PostCategoryWhereInput
    orderBy?: PostCategoryOrderByWithRelationInput | PostCategoryOrderByWithRelationInput[]
    cursor?: PostCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostCategoryScalarFieldEnum | PostCategoryScalarFieldEnum[]
  }

  /**
   * PostCategory.posts
   */
  export type PostCategory$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    where?: PostPostcategoryWhereInput
    orderBy?: PostPostcategoryOrderByWithRelationInput | PostPostcategoryOrderByWithRelationInput[]
    cursor?: PostPostcategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostPostcategoryScalarFieldEnum | PostPostcategoryScalarFieldEnum[]
  }

  /**
   * PostCategory without action
   */
  export type PostCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCategory
     */
    select?: PostCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostCategory
     */
    omit?: PostCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCategoryInclude<ExtArgs> | null
  }


  /**
   * Model PostTag
   */

  export type AggregatePostTag = {
    _count: PostTagCountAggregateOutputType | null
    _avg: PostTagAvgAggregateOutputType | null
    _sum: PostTagSumAggregateOutputType | null
    _min: PostTagMinAggregateOutputType | null
    _max: PostTagMaxAggregateOutputType | null
  }

  export type PostTagAvgAggregateOutputType = {
    id: number | null
    created_user_id: number | null
    updated_user_id: number | null
    group_id: number | null
  }

  export type PostTagSumAggregateOutputType = {
    id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    group_id: bigint | null
  }

  export type PostTagMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    slug: string | null
    description: string | null
    is_active: boolean | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
    group_id: bigint | null
  }

  export type PostTagMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    slug: string | null
    description: string | null
    is_active: boolean | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
    group_id: bigint | null
  }

  export type PostTagCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    is_active: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    group_id: number
    _all: number
  }


  export type PostTagAvgAggregateInputType = {
    id?: true
    created_user_id?: true
    updated_user_id?: true
    group_id?: true
  }

  export type PostTagSumAggregateInputType = {
    id?: true
    created_user_id?: true
    updated_user_id?: true
    group_id?: true
  }

  export type PostTagMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    is_active?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    group_id?: true
  }

  export type PostTagMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    is_active?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    group_id?: true
  }

  export type PostTagCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    is_active?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    group_id?: true
    _all?: true
  }

  export type PostTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostTag to aggregate.
     */
    where?: PostTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostTags
    **/
    _count?: true | PostTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostTagMaxAggregateInputType
  }

  export type GetPostTagAggregateType<T extends PostTagAggregateArgs> = {
        [P in keyof T & keyof AggregatePostTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostTag[P]>
      : GetScalarType<T[P], AggregatePostTag[P]>
  }




  export type PostTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostTagWhereInput
    orderBy?: PostTagOrderByWithAggregationInput | PostTagOrderByWithAggregationInput[]
    by: PostTagScalarFieldEnum[] | PostTagScalarFieldEnum
    having?: PostTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostTagCountAggregateInputType | true
    _avg?: PostTagAvgAggregateInputType
    _sum?: PostTagSumAggregateInputType
    _min?: PostTagMinAggregateInputType
    _max?: PostTagMaxAggregateInputType
  }

  export type PostTagGroupByOutputType = {
    id: bigint
    name: string
    slug: string
    description: string | null
    is_active: boolean
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    group_id: bigint | null
    _count: PostTagCountAggregateOutputType | null
    _avg: PostTagAvgAggregateOutputType | null
    _sum: PostTagSumAggregateOutputType | null
    _min: PostTagMinAggregateOutputType | null
    _max: PostTagMaxAggregateOutputType | null
  }

  type GetPostTagGroupByPayload<T extends PostTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostTagGroupByOutputType[P]>
            : GetScalarType<T[P], PostTagGroupByOutputType[P]>
        }
      >
    >


  export type PostTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    is_active?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
    posts?: boolean | PostTag$postsArgs<ExtArgs>
    _count?: boolean | PostTagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postTag"]>

  export type PostTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    is_active?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
  }, ExtArgs["result"]["postTag"]>

  export type PostTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    is_active?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
  }, ExtArgs["result"]["postTag"]>

  export type PostTagSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    is_active?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
  }

  export type PostTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "is_active" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at" | "group_id", ExtArgs["result"]["postTag"]>
  export type PostTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | PostTag$postsArgs<ExtArgs>
    _count?: boolean | PostTagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PostTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PostTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostTag"
    objects: {
      posts: Prisma.$PostPosttagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      slug: string
      description: string | null
      is_active: boolean
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
      group_id: bigint | null
    }, ExtArgs["result"]["postTag"]>
    composites: {}
  }

  type PostTagGetPayload<S extends boolean | null | undefined | PostTagDefaultArgs> = $Result.GetResult<Prisma.$PostTagPayload, S>

  type PostTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostTagCountAggregateInputType | true
    }

  export interface PostTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostTag'], meta: { name: 'PostTag' } }
    /**
     * Find zero or one PostTag that matches the filter.
     * @param {PostTagFindUniqueArgs} args - Arguments to find a PostTag
     * @example
     * // Get one PostTag
     * const postTag = await prisma.postTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostTagFindUniqueArgs>(args: SelectSubset<T, PostTagFindUniqueArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostTagFindUniqueOrThrowArgs} args - Arguments to find a PostTag
     * @example
     * // Get one PostTag
     * const postTag = await prisma.postTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostTagFindUniqueOrThrowArgs>(args: SelectSubset<T, PostTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagFindFirstArgs} args - Arguments to find a PostTag
     * @example
     * // Get one PostTag
     * const postTag = await prisma.postTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostTagFindFirstArgs>(args?: SelectSubset<T, PostTagFindFirstArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagFindFirstOrThrowArgs} args - Arguments to find a PostTag
     * @example
     * // Get one PostTag
     * const postTag = await prisma.postTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostTagFindFirstOrThrowArgs>(args?: SelectSubset<T, PostTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostTags
     * const postTags = await prisma.postTag.findMany()
     * 
     * // Get first 10 PostTags
     * const postTags = await prisma.postTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postTagWithIdOnly = await prisma.postTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostTagFindManyArgs>(args?: SelectSubset<T, PostTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostTag.
     * @param {PostTagCreateArgs} args - Arguments to create a PostTag.
     * @example
     * // Create one PostTag
     * const PostTag = await prisma.postTag.create({
     *   data: {
     *     // ... data to create a PostTag
     *   }
     * })
     * 
     */
    create<T extends PostTagCreateArgs>(args: SelectSubset<T, PostTagCreateArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostTags.
     * @param {PostTagCreateManyArgs} args - Arguments to create many PostTags.
     * @example
     * // Create many PostTags
     * const postTag = await prisma.postTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostTagCreateManyArgs>(args?: SelectSubset<T, PostTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostTags and returns the data saved in the database.
     * @param {PostTagCreateManyAndReturnArgs} args - Arguments to create many PostTags.
     * @example
     * // Create many PostTags
     * const postTag = await prisma.postTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostTags and only return the `id`
     * const postTagWithIdOnly = await prisma.postTag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostTagCreateManyAndReturnArgs>(args?: SelectSubset<T, PostTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostTag.
     * @param {PostTagDeleteArgs} args - Arguments to delete one PostTag.
     * @example
     * // Delete one PostTag
     * const PostTag = await prisma.postTag.delete({
     *   where: {
     *     // ... filter to delete one PostTag
     *   }
     * })
     * 
     */
    delete<T extends PostTagDeleteArgs>(args: SelectSubset<T, PostTagDeleteArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostTag.
     * @param {PostTagUpdateArgs} args - Arguments to update one PostTag.
     * @example
     * // Update one PostTag
     * const postTag = await prisma.postTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostTagUpdateArgs>(args: SelectSubset<T, PostTagUpdateArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostTags.
     * @param {PostTagDeleteManyArgs} args - Arguments to filter PostTags to delete.
     * @example
     * // Delete a few PostTags
     * const { count } = await prisma.postTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostTagDeleteManyArgs>(args?: SelectSubset<T, PostTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostTags
     * const postTag = await prisma.postTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostTagUpdateManyArgs>(args: SelectSubset<T, PostTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostTags and returns the data updated in the database.
     * @param {PostTagUpdateManyAndReturnArgs} args - Arguments to update many PostTags.
     * @example
     * // Update many PostTags
     * const postTag = await prisma.postTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostTags and only return the `id`
     * const postTagWithIdOnly = await prisma.postTag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostTagUpdateManyAndReturnArgs>(args: SelectSubset<T, PostTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostTag.
     * @param {PostTagUpsertArgs} args - Arguments to update or create a PostTag.
     * @example
     * // Update or create a PostTag
     * const postTag = await prisma.postTag.upsert({
     *   create: {
     *     // ... data to create a PostTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostTag we want to update
     *   }
     * })
     */
    upsert<T extends PostTagUpsertArgs>(args: SelectSubset<T, PostTagUpsertArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagCountArgs} args - Arguments to filter PostTags to count.
     * @example
     * // Count the number of PostTags
     * const count = await prisma.postTag.count({
     *   where: {
     *     // ... the filter for the PostTags we want to count
     *   }
     * })
    **/
    count<T extends PostTagCountArgs>(
      args?: Subset<T, PostTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostTagAggregateArgs>(args: Subset<T, PostTagAggregateArgs>): Prisma.PrismaPromise<GetPostTagAggregateType<T>>

    /**
     * Group by PostTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostTagGroupByArgs['orderBy'] }
        : { orderBy?: PostTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostTag model
   */
  readonly fields: PostTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends PostTag$postsArgs<ExtArgs> = {}>(args?: Subset<T, PostTag$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostTag model
   */
  interface PostTagFieldRefs {
    readonly id: FieldRef<"PostTag", 'BigInt'>
    readonly name: FieldRef<"PostTag", 'String'>
    readonly slug: FieldRef<"PostTag", 'String'>
    readonly description: FieldRef<"PostTag", 'String'>
    readonly is_active: FieldRef<"PostTag", 'Boolean'>
    readonly created_user_id: FieldRef<"PostTag", 'BigInt'>
    readonly updated_user_id: FieldRef<"PostTag", 'BigInt'>
    readonly created_at: FieldRef<"PostTag", 'DateTime'>
    readonly updated_at: FieldRef<"PostTag", 'DateTime'>
    readonly group_id: FieldRef<"PostTag", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * PostTag findUnique
   */
  export type PostTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTag to fetch.
     */
    where: PostTagWhereUniqueInput
  }

  /**
   * PostTag findUniqueOrThrow
   */
  export type PostTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTag to fetch.
     */
    where: PostTagWhereUniqueInput
  }

  /**
   * PostTag findFirst
   */
  export type PostTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTag to fetch.
     */
    where?: PostTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostTags.
     */
    cursor?: PostTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostTags.
     */
    distinct?: PostTagScalarFieldEnum | PostTagScalarFieldEnum[]
  }

  /**
   * PostTag findFirstOrThrow
   */
  export type PostTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTag to fetch.
     */
    where?: PostTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostTags.
     */
    cursor?: PostTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostTags.
     */
    distinct?: PostTagScalarFieldEnum | PostTagScalarFieldEnum[]
  }

  /**
   * PostTag findMany
   */
  export type PostTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTags to fetch.
     */
    where?: PostTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostTags.
     */
    cursor?: PostTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostTags.
     */
    distinct?: PostTagScalarFieldEnum | PostTagScalarFieldEnum[]
  }

  /**
   * PostTag create
   */
  export type PostTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * The data needed to create a PostTag.
     */
    data: XOR<PostTagCreateInput, PostTagUncheckedCreateInput>
  }

  /**
   * PostTag createMany
   */
  export type PostTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostTags.
     */
    data: PostTagCreateManyInput | PostTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostTag createManyAndReturn
   */
  export type PostTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * The data used to create many PostTags.
     */
    data: PostTagCreateManyInput | PostTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostTag update
   */
  export type PostTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * The data needed to update a PostTag.
     */
    data: XOR<PostTagUpdateInput, PostTagUncheckedUpdateInput>
    /**
     * Choose, which PostTag to update.
     */
    where: PostTagWhereUniqueInput
  }

  /**
   * PostTag updateMany
   */
  export type PostTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostTags.
     */
    data: XOR<PostTagUpdateManyMutationInput, PostTagUncheckedUpdateManyInput>
    /**
     * Filter which PostTags to update
     */
    where?: PostTagWhereInput
    /**
     * Limit how many PostTags to update.
     */
    limit?: number
  }

  /**
   * PostTag updateManyAndReturn
   */
  export type PostTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * The data used to update PostTags.
     */
    data: XOR<PostTagUpdateManyMutationInput, PostTagUncheckedUpdateManyInput>
    /**
     * Filter which PostTags to update
     */
    where?: PostTagWhereInput
    /**
     * Limit how many PostTags to update.
     */
    limit?: number
  }

  /**
   * PostTag upsert
   */
  export type PostTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * The filter to search for the PostTag to update in case it exists.
     */
    where: PostTagWhereUniqueInput
    /**
     * In case the PostTag found by the `where` argument doesn't exist, create a new PostTag with this data.
     */
    create: XOR<PostTagCreateInput, PostTagUncheckedCreateInput>
    /**
     * In case the PostTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostTagUpdateInput, PostTagUncheckedUpdateInput>
  }

  /**
   * PostTag delete
   */
  export type PostTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter which PostTag to delete.
     */
    where: PostTagWhereUniqueInput
  }

  /**
   * PostTag deleteMany
   */
  export type PostTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostTags to delete
     */
    where?: PostTagWhereInput
    /**
     * Limit how many PostTags to delete.
     */
    limit?: number
  }

  /**
   * PostTag.posts
   */
  export type PostTag$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    where?: PostPosttagWhereInput
    orderBy?: PostPosttagOrderByWithRelationInput | PostPosttagOrderByWithRelationInput[]
    cursor?: PostPosttagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostPosttagScalarFieldEnum | PostPosttagScalarFieldEnum[]
  }

  /**
   * PostTag without action
   */
  export type PostTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
    created_user_id: number | null
    updated_user_id: number | null
    group_id: number | null
  }

  export type PostSumAggregateOutputType = {
    id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    group_id: bigint | null
  }

  export type PostMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    slug: string | null
    excerpt: string | null
    content: string | null
    image: string | null
    cover_image: string | null
    status: string | null
    post_type: string | null
    video_url: string | null
    audio_url: string | null
    is_featured: boolean | null
    is_pinned: boolean | null
    published_at: Date | null
    seo_title: string | null
    seo_description: string | null
    seo_keywords: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
    group_id: bigint | null
  }

  export type PostMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    slug: string | null
    excerpt: string | null
    content: string | null
    image: string | null
    cover_image: string | null
    status: string | null
    post_type: string | null
    video_url: string | null
    audio_url: string | null
    is_featured: boolean | null
    is_pinned: boolean | null
    published_at: Date | null
    seo_title: string | null
    seo_description: string | null
    seo_keywords: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
    group_id: bigint | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    excerpt: number
    content: number
    image: number
    cover_image: number
    status: number
    post_type: number
    video_url: number
    audio_url: number
    is_featured: number
    is_pinned: number
    published_at: number
    seo_title: number
    seo_description: number
    seo_keywords: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    group_id: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
    created_user_id?: true
    updated_user_id?: true
    group_id?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
    created_user_id?: true
    updated_user_id?: true
    group_id?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    excerpt?: true
    content?: true
    image?: true
    cover_image?: true
    status?: true
    post_type?: true
    video_url?: true
    audio_url?: true
    is_featured?: true
    is_pinned?: true
    published_at?: true
    seo_title?: true
    seo_description?: true
    seo_keywords?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    group_id?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    excerpt?: true
    content?: true
    image?: true
    cover_image?: true
    status?: true
    post_type?: true
    video_url?: true
    audio_url?: true
    is_featured?: true
    is_pinned?: true
    published_at?: true
    seo_title?: true
    seo_description?: true
    seo_keywords?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    group_id?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    excerpt?: true
    content?: true
    image?: true
    cover_image?: true
    status?: true
    post_type?: true
    video_url?: true
    audio_url?: true
    is_featured?: true
    is_pinned?: true
    published_at?: true
    seo_title?: true
    seo_description?: true
    seo_keywords?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    group_id?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: bigint
    name: string
    slug: string
    excerpt: string | null
    content: string | null
    image: string | null
    cover_image: string | null
    status: string
    post_type: string
    video_url: string | null
    audio_url: string | null
    is_featured: boolean
    is_pinned: boolean
    published_at: Date | null
    seo_title: string | null
    seo_description: string | null
    seo_keywords: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    group_id: bigint | null
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    image?: boolean
    cover_image?: boolean
    status?: boolean
    post_type?: boolean
    video_url?: boolean
    audio_url?: boolean
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: boolean
    seo_title?: boolean
    seo_description?: boolean
    seo_keywords?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
    stats?: boolean | Post$statsArgs<ExtArgs>
    daily_stats?: boolean | Post$daily_statsArgs<ExtArgs>
    categoryLinks?: boolean | Post$categoryLinksArgs<ExtArgs>
    tagLinks?: boolean | Post$tagLinksArgs<ExtArgs>
    comments?: boolean | Post$commentsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    image?: boolean
    cover_image?: boolean
    status?: boolean
    post_type?: boolean
    video_url?: boolean
    audio_url?: boolean
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: boolean
    seo_title?: boolean
    seo_description?: boolean
    seo_keywords?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    image?: boolean
    cover_image?: boolean
    status?: boolean
    post_type?: boolean
    video_url?: boolean
    audio_url?: boolean
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: boolean
    seo_title?: boolean
    seo_description?: boolean
    seo_keywords?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    image?: boolean
    cover_image?: boolean
    status?: boolean
    post_type?: boolean
    video_url?: boolean
    audio_url?: boolean
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: boolean
    seo_title?: boolean
    seo_description?: boolean
    seo_keywords?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group_id?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "excerpt" | "content" | "image" | "cover_image" | "status" | "post_type" | "video_url" | "audio_url" | "is_featured" | "is_pinned" | "published_at" | "seo_title" | "seo_description" | "seo_keywords" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at" | "group_id", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | Post$statsArgs<ExtArgs>
    daily_stats?: boolean | Post$daily_statsArgs<ExtArgs>
    categoryLinks?: boolean | Post$categoryLinksArgs<ExtArgs>
    tagLinks?: boolean | Post$tagLinksArgs<ExtArgs>
    comments?: boolean | Post$commentsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      stats: Prisma.$PostStatsPayload<ExtArgs> | null
      daily_stats: Prisma.$PostDailyStatsPayload<ExtArgs>[]
      categoryLinks: Prisma.$PostPostcategoryPayload<ExtArgs>[]
      tagLinks: Prisma.$PostPosttagPayload<ExtArgs>[]
      comments: Prisma.$PostCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      slug: string
      excerpt: string | null
      content: string | null
      image: string | null
      cover_image: string | null
      status: string
      post_type: string
      video_url: string | null
      audio_url: string | null
      is_featured: boolean
      is_pinned: boolean
      published_at: Date | null
      seo_title: string | null
      seo_description: string | null
      seo_keywords: string | null
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
      group_id: bigint | null
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stats<T extends Post$statsArgs<ExtArgs> = {}>(args?: Subset<T, Post$statsArgs<ExtArgs>>): Prisma__PostStatsClient<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    daily_stats<T extends Post$daily_statsArgs<ExtArgs> = {}>(args?: Subset<T, Post$daily_statsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categoryLinks<T extends Post$categoryLinksArgs<ExtArgs> = {}>(args?: Subset<T, Post$categoryLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tagLinks<T extends Post$tagLinksArgs<ExtArgs> = {}>(args?: Subset<T, Post$tagLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Post$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Post$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'BigInt'>
    readonly name: FieldRef<"Post", 'String'>
    readonly slug: FieldRef<"Post", 'String'>
    readonly excerpt: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly image: FieldRef<"Post", 'String'>
    readonly cover_image: FieldRef<"Post", 'String'>
    readonly status: FieldRef<"Post", 'String'>
    readonly post_type: FieldRef<"Post", 'String'>
    readonly video_url: FieldRef<"Post", 'String'>
    readonly audio_url: FieldRef<"Post", 'String'>
    readonly is_featured: FieldRef<"Post", 'Boolean'>
    readonly is_pinned: FieldRef<"Post", 'Boolean'>
    readonly published_at: FieldRef<"Post", 'DateTime'>
    readonly seo_title: FieldRef<"Post", 'String'>
    readonly seo_description: FieldRef<"Post", 'String'>
    readonly seo_keywords: FieldRef<"Post", 'String'>
    readonly created_user_id: FieldRef<"Post", 'BigInt'>
    readonly updated_user_id: FieldRef<"Post", 'BigInt'>
    readonly created_at: FieldRef<"Post", 'DateTime'>
    readonly updated_at: FieldRef<"Post", 'DateTime'>
    readonly group_id: FieldRef<"Post", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.stats
   */
  export type Post$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    where?: PostStatsWhereInput
  }

  /**
   * Post.daily_stats
   */
  export type Post$daily_statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    where?: PostDailyStatsWhereInput
    orderBy?: PostDailyStatsOrderByWithRelationInput | PostDailyStatsOrderByWithRelationInput[]
    cursor?: PostDailyStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostDailyStatsScalarFieldEnum | PostDailyStatsScalarFieldEnum[]
  }

  /**
   * Post.categoryLinks
   */
  export type Post$categoryLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    where?: PostPostcategoryWhereInput
    orderBy?: PostPostcategoryOrderByWithRelationInput | PostPostcategoryOrderByWithRelationInput[]
    cursor?: PostPostcategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostPostcategoryScalarFieldEnum | PostPostcategoryScalarFieldEnum[]
  }

  /**
   * Post.tagLinks
   */
  export type Post$tagLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    where?: PostPosttagWhereInput
    orderBy?: PostPosttagOrderByWithRelationInput | PostPosttagOrderByWithRelationInput[]
    cursor?: PostPosttagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostPosttagScalarFieldEnum | PostPosttagScalarFieldEnum[]
  }

  /**
   * Post.comments
   */
  export type Post$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    where?: PostCommentWhereInput
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    cursor?: PostCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostCommentScalarFieldEnum | PostCommentScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model PostStats
   */

  export type AggregatePostStats = {
    _count: PostStatsCountAggregateOutputType | null
    _avg: PostStatsAvgAggregateOutputType | null
    _sum: PostStatsSumAggregateOutputType | null
    _min: PostStatsMinAggregateOutputType | null
    _max: PostStatsMaxAggregateOutputType | null
  }

  export type PostStatsAvgAggregateOutputType = {
    post_id: number | null
    view_count: number | null
  }

  export type PostStatsSumAggregateOutputType = {
    post_id: bigint | null
    view_count: bigint | null
  }

  export type PostStatsMinAggregateOutputType = {
    post_id: bigint | null
    view_count: bigint | null
    updated_at: Date | null
  }

  export type PostStatsMaxAggregateOutputType = {
    post_id: bigint | null
    view_count: bigint | null
    updated_at: Date | null
  }

  export type PostStatsCountAggregateOutputType = {
    post_id: number
    view_count: number
    updated_at: number
    _all: number
  }


  export type PostStatsAvgAggregateInputType = {
    post_id?: true
    view_count?: true
  }

  export type PostStatsSumAggregateInputType = {
    post_id?: true
    view_count?: true
  }

  export type PostStatsMinAggregateInputType = {
    post_id?: true
    view_count?: true
    updated_at?: true
  }

  export type PostStatsMaxAggregateInputType = {
    post_id?: true
    view_count?: true
    updated_at?: true
  }

  export type PostStatsCountAggregateInputType = {
    post_id?: true
    view_count?: true
    updated_at?: true
    _all?: true
  }

  export type PostStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostStats to aggregate.
     */
    where?: PostStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostStats to fetch.
     */
    orderBy?: PostStatsOrderByWithRelationInput | PostStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostStats
    **/
    _count?: true | PostStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostStatsMaxAggregateInputType
  }

  export type GetPostStatsAggregateType<T extends PostStatsAggregateArgs> = {
        [P in keyof T & keyof AggregatePostStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostStats[P]>
      : GetScalarType<T[P], AggregatePostStats[P]>
  }




  export type PostStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostStatsWhereInput
    orderBy?: PostStatsOrderByWithAggregationInput | PostStatsOrderByWithAggregationInput[]
    by: PostStatsScalarFieldEnum[] | PostStatsScalarFieldEnum
    having?: PostStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostStatsCountAggregateInputType | true
    _avg?: PostStatsAvgAggregateInputType
    _sum?: PostStatsSumAggregateInputType
    _min?: PostStatsMinAggregateInputType
    _max?: PostStatsMaxAggregateInputType
  }

  export type PostStatsGroupByOutputType = {
    post_id: bigint
    view_count: bigint
    updated_at: Date
    _count: PostStatsCountAggregateOutputType | null
    _avg: PostStatsAvgAggregateOutputType | null
    _sum: PostStatsSumAggregateOutputType | null
    _min: PostStatsMinAggregateOutputType | null
    _max: PostStatsMaxAggregateOutputType | null
  }

  type GetPostStatsGroupByPayload<T extends PostStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostStatsGroupByOutputType[P]>
            : GetScalarType<T[P], PostStatsGroupByOutputType[P]>
        }
      >
    >


  export type PostStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    view_count?: boolean
    updated_at?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postStats"]>

  export type PostStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    view_count?: boolean
    updated_at?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postStats"]>

  export type PostStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    view_count?: boolean
    updated_at?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postStats"]>

  export type PostStatsSelectScalar = {
    post_id?: boolean
    view_count?: boolean
    updated_at?: boolean
  }

  export type PostStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"post_id" | "view_count" | "updated_at", ExtArgs["result"]["postStats"]>
  export type PostStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }

  export type $PostStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostStats"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      post_id: bigint
      view_count: bigint
      updated_at: Date
    }, ExtArgs["result"]["postStats"]>
    composites: {}
  }

  type PostStatsGetPayload<S extends boolean | null | undefined | PostStatsDefaultArgs> = $Result.GetResult<Prisma.$PostStatsPayload, S>

  type PostStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostStatsCountAggregateInputType | true
    }

  export interface PostStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostStats'], meta: { name: 'PostStats' } }
    /**
     * Find zero or one PostStats that matches the filter.
     * @param {PostStatsFindUniqueArgs} args - Arguments to find a PostStats
     * @example
     * // Get one PostStats
     * const postStats = await prisma.postStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostStatsFindUniqueArgs>(args: SelectSubset<T, PostStatsFindUniqueArgs<ExtArgs>>): Prisma__PostStatsClient<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostStatsFindUniqueOrThrowArgs} args - Arguments to find a PostStats
     * @example
     * // Get one PostStats
     * const postStats = await prisma.postStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, PostStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostStatsClient<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostStatsFindFirstArgs} args - Arguments to find a PostStats
     * @example
     * // Get one PostStats
     * const postStats = await prisma.postStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostStatsFindFirstArgs>(args?: SelectSubset<T, PostStatsFindFirstArgs<ExtArgs>>): Prisma__PostStatsClient<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostStatsFindFirstOrThrowArgs} args - Arguments to find a PostStats
     * @example
     * // Get one PostStats
     * const postStats = await prisma.postStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, PostStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostStatsClient<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostStats
     * const postStats = await prisma.postStats.findMany()
     * 
     * // Get first 10 PostStats
     * const postStats = await prisma.postStats.findMany({ take: 10 })
     * 
     * // Only select the `post_id`
     * const postStatsWithPost_idOnly = await prisma.postStats.findMany({ select: { post_id: true } })
     * 
     */
    findMany<T extends PostStatsFindManyArgs>(args?: SelectSubset<T, PostStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostStats.
     * @param {PostStatsCreateArgs} args - Arguments to create a PostStats.
     * @example
     * // Create one PostStats
     * const PostStats = await prisma.postStats.create({
     *   data: {
     *     // ... data to create a PostStats
     *   }
     * })
     * 
     */
    create<T extends PostStatsCreateArgs>(args: SelectSubset<T, PostStatsCreateArgs<ExtArgs>>): Prisma__PostStatsClient<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostStats.
     * @param {PostStatsCreateManyArgs} args - Arguments to create many PostStats.
     * @example
     * // Create many PostStats
     * const postStats = await prisma.postStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostStatsCreateManyArgs>(args?: SelectSubset<T, PostStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostStats and returns the data saved in the database.
     * @param {PostStatsCreateManyAndReturnArgs} args - Arguments to create many PostStats.
     * @example
     * // Create many PostStats
     * const postStats = await prisma.postStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostStats and only return the `post_id`
     * const postStatsWithPost_idOnly = await prisma.postStats.createManyAndReturn({
     *   select: { post_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, PostStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostStats.
     * @param {PostStatsDeleteArgs} args - Arguments to delete one PostStats.
     * @example
     * // Delete one PostStats
     * const PostStats = await prisma.postStats.delete({
     *   where: {
     *     // ... filter to delete one PostStats
     *   }
     * })
     * 
     */
    delete<T extends PostStatsDeleteArgs>(args: SelectSubset<T, PostStatsDeleteArgs<ExtArgs>>): Prisma__PostStatsClient<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostStats.
     * @param {PostStatsUpdateArgs} args - Arguments to update one PostStats.
     * @example
     * // Update one PostStats
     * const postStats = await prisma.postStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostStatsUpdateArgs>(args: SelectSubset<T, PostStatsUpdateArgs<ExtArgs>>): Prisma__PostStatsClient<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostStats.
     * @param {PostStatsDeleteManyArgs} args - Arguments to filter PostStats to delete.
     * @example
     * // Delete a few PostStats
     * const { count } = await prisma.postStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostStatsDeleteManyArgs>(args?: SelectSubset<T, PostStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostStats
     * const postStats = await prisma.postStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostStatsUpdateManyArgs>(args: SelectSubset<T, PostStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostStats and returns the data updated in the database.
     * @param {PostStatsUpdateManyAndReturnArgs} args - Arguments to update many PostStats.
     * @example
     * // Update many PostStats
     * const postStats = await prisma.postStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostStats and only return the `post_id`
     * const postStatsWithPost_idOnly = await prisma.postStats.updateManyAndReturn({
     *   select: { post_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, PostStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostStats.
     * @param {PostStatsUpsertArgs} args - Arguments to update or create a PostStats.
     * @example
     * // Update or create a PostStats
     * const postStats = await prisma.postStats.upsert({
     *   create: {
     *     // ... data to create a PostStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostStats we want to update
     *   }
     * })
     */
    upsert<T extends PostStatsUpsertArgs>(args: SelectSubset<T, PostStatsUpsertArgs<ExtArgs>>): Prisma__PostStatsClient<$Result.GetResult<Prisma.$PostStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostStatsCountArgs} args - Arguments to filter PostStats to count.
     * @example
     * // Count the number of PostStats
     * const count = await prisma.postStats.count({
     *   where: {
     *     // ... the filter for the PostStats we want to count
     *   }
     * })
    **/
    count<T extends PostStatsCountArgs>(
      args?: Subset<T, PostStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostStatsAggregateArgs>(args: Subset<T, PostStatsAggregateArgs>): Prisma.PrismaPromise<GetPostStatsAggregateType<T>>

    /**
     * Group by PostStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostStatsGroupByArgs['orderBy'] }
        : { orderBy?: PostStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostStats model
   */
  readonly fields: PostStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostStats model
   */
  interface PostStatsFieldRefs {
    readonly post_id: FieldRef<"PostStats", 'BigInt'>
    readonly view_count: FieldRef<"PostStats", 'BigInt'>
    readonly updated_at: FieldRef<"PostStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostStats findUnique
   */
  export type PostStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostStats to fetch.
     */
    where: PostStatsWhereUniqueInput
  }

  /**
   * PostStats findUniqueOrThrow
   */
  export type PostStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostStats to fetch.
     */
    where: PostStatsWhereUniqueInput
  }

  /**
   * PostStats findFirst
   */
  export type PostStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostStats to fetch.
     */
    where?: PostStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostStats to fetch.
     */
    orderBy?: PostStatsOrderByWithRelationInput | PostStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostStats.
     */
    cursor?: PostStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostStats.
     */
    distinct?: PostStatsScalarFieldEnum | PostStatsScalarFieldEnum[]
  }

  /**
   * PostStats findFirstOrThrow
   */
  export type PostStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostStats to fetch.
     */
    where?: PostStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostStats to fetch.
     */
    orderBy?: PostStatsOrderByWithRelationInput | PostStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostStats.
     */
    cursor?: PostStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostStats.
     */
    distinct?: PostStatsScalarFieldEnum | PostStatsScalarFieldEnum[]
  }

  /**
   * PostStats findMany
   */
  export type PostStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostStats to fetch.
     */
    where?: PostStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostStats to fetch.
     */
    orderBy?: PostStatsOrderByWithRelationInput | PostStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostStats.
     */
    cursor?: PostStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostStats.
     */
    distinct?: PostStatsScalarFieldEnum | PostStatsScalarFieldEnum[]
  }

  /**
   * PostStats create
   */
  export type PostStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a PostStats.
     */
    data: XOR<PostStatsCreateInput, PostStatsUncheckedCreateInput>
  }

  /**
   * PostStats createMany
   */
  export type PostStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostStats.
     */
    data: PostStatsCreateManyInput | PostStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostStats createManyAndReturn
   */
  export type PostStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * The data used to create many PostStats.
     */
    data: PostStatsCreateManyInput | PostStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostStats update
   */
  export type PostStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a PostStats.
     */
    data: XOR<PostStatsUpdateInput, PostStatsUncheckedUpdateInput>
    /**
     * Choose, which PostStats to update.
     */
    where: PostStatsWhereUniqueInput
  }

  /**
   * PostStats updateMany
   */
  export type PostStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostStats.
     */
    data: XOR<PostStatsUpdateManyMutationInput, PostStatsUncheckedUpdateManyInput>
    /**
     * Filter which PostStats to update
     */
    where?: PostStatsWhereInput
    /**
     * Limit how many PostStats to update.
     */
    limit?: number
  }

  /**
   * PostStats updateManyAndReturn
   */
  export type PostStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * The data used to update PostStats.
     */
    data: XOR<PostStatsUpdateManyMutationInput, PostStatsUncheckedUpdateManyInput>
    /**
     * Filter which PostStats to update
     */
    where?: PostStatsWhereInput
    /**
     * Limit how many PostStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostStats upsert
   */
  export type PostStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the PostStats to update in case it exists.
     */
    where: PostStatsWhereUniqueInput
    /**
     * In case the PostStats found by the `where` argument doesn't exist, create a new PostStats with this data.
     */
    create: XOR<PostStatsCreateInput, PostStatsUncheckedCreateInput>
    /**
     * In case the PostStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostStatsUpdateInput, PostStatsUncheckedUpdateInput>
  }

  /**
   * PostStats delete
   */
  export type PostStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
    /**
     * Filter which PostStats to delete.
     */
    where: PostStatsWhereUniqueInput
  }

  /**
   * PostStats deleteMany
   */
  export type PostStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostStats to delete
     */
    where?: PostStatsWhereInput
    /**
     * Limit how many PostStats to delete.
     */
    limit?: number
  }

  /**
   * PostStats without action
   */
  export type PostStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostStats
     */
    select?: PostStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostStats
     */
    omit?: PostStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostStatsInclude<ExtArgs> | null
  }


  /**
   * Model PostDailyStats
   */

  export type AggregatePostDailyStats = {
    _count: PostDailyStatsCountAggregateOutputType | null
    _avg: PostDailyStatsAvgAggregateOutputType | null
    _sum: PostDailyStatsSumAggregateOutputType | null
    _min: PostDailyStatsMinAggregateOutputType | null
    _max: PostDailyStatsMaxAggregateOutputType | null
  }

  export type PostDailyStatsAvgAggregateOutputType = {
    post_id: number | null
    view_count: number | null
  }

  export type PostDailyStatsSumAggregateOutputType = {
    post_id: bigint | null
    view_count: bigint | null
  }

  export type PostDailyStatsMinAggregateOutputType = {
    post_id: bigint | null
    stat_date: Date | null
    view_count: bigint | null
    updated_at: Date | null
  }

  export type PostDailyStatsMaxAggregateOutputType = {
    post_id: bigint | null
    stat_date: Date | null
    view_count: bigint | null
    updated_at: Date | null
  }

  export type PostDailyStatsCountAggregateOutputType = {
    post_id: number
    stat_date: number
    view_count: number
    updated_at: number
    _all: number
  }


  export type PostDailyStatsAvgAggregateInputType = {
    post_id?: true
    view_count?: true
  }

  export type PostDailyStatsSumAggregateInputType = {
    post_id?: true
    view_count?: true
  }

  export type PostDailyStatsMinAggregateInputType = {
    post_id?: true
    stat_date?: true
    view_count?: true
    updated_at?: true
  }

  export type PostDailyStatsMaxAggregateInputType = {
    post_id?: true
    stat_date?: true
    view_count?: true
    updated_at?: true
  }

  export type PostDailyStatsCountAggregateInputType = {
    post_id?: true
    stat_date?: true
    view_count?: true
    updated_at?: true
    _all?: true
  }

  export type PostDailyStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostDailyStats to aggregate.
     */
    where?: PostDailyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostDailyStats to fetch.
     */
    orderBy?: PostDailyStatsOrderByWithRelationInput | PostDailyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostDailyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostDailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostDailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostDailyStats
    **/
    _count?: true | PostDailyStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostDailyStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostDailyStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostDailyStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostDailyStatsMaxAggregateInputType
  }

  export type GetPostDailyStatsAggregateType<T extends PostDailyStatsAggregateArgs> = {
        [P in keyof T & keyof AggregatePostDailyStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostDailyStats[P]>
      : GetScalarType<T[P], AggregatePostDailyStats[P]>
  }




  export type PostDailyStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostDailyStatsWhereInput
    orderBy?: PostDailyStatsOrderByWithAggregationInput | PostDailyStatsOrderByWithAggregationInput[]
    by: PostDailyStatsScalarFieldEnum[] | PostDailyStatsScalarFieldEnum
    having?: PostDailyStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostDailyStatsCountAggregateInputType | true
    _avg?: PostDailyStatsAvgAggregateInputType
    _sum?: PostDailyStatsSumAggregateInputType
    _min?: PostDailyStatsMinAggregateInputType
    _max?: PostDailyStatsMaxAggregateInputType
  }

  export type PostDailyStatsGroupByOutputType = {
    post_id: bigint
    stat_date: Date
    view_count: bigint
    updated_at: Date
    _count: PostDailyStatsCountAggregateOutputType | null
    _avg: PostDailyStatsAvgAggregateOutputType | null
    _sum: PostDailyStatsSumAggregateOutputType | null
    _min: PostDailyStatsMinAggregateOutputType | null
    _max: PostDailyStatsMaxAggregateOutputType | null
  }

  type GetPostDailyStatsGroupByPayload<T extends PostDailyStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostDailyStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostDailyStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostDailyStatsGroupByOutputType[P]>
            : GetScalarType<T[P], PostDailyStatsGroupByOutputType[P]>
        }
      >
    >


  export type PostDailyStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    stat_date?: boolean
    view_count?: boolean
    updated_at?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postDailyStats"]>

  export type PostDailyStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    stat_date?: boolean
    view_count?: boolean
    updated_at?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postDailyStats"]>

  export type PostDailyStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    stat_date?: boolean
    view_count?: boolean
    updated_at?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postDailyStats"]>

  export type PostDailyStatsSelectScalar = {
    post_id?: boolean
    stat_date?: boolean
    view_count?: boolean
    updated_at?: boolean
  }

  export type PostDailyStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"post_id" | "stat_date" | "view_count" | "updated_at", ExtArgs["result"]["postDailyStats"]>
  export type PostDailyStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostDailyStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostDailyStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }

  export type $PostDailyStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostDailyStats"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      post_id: bigint
      stat_date: Date
      view_count: bigint
      updated_at: Date
    }, ExtArgs["result"]["postDailyStats"]>
    composites: {}
  }

  type PostDailyStatsGetPayload<S extends boolean | null | undefined | PostDailyStatsDefaultArgs> = $Result.GetResult<Prisma.$PostDailyStatsPayload, S>

  type PostDailyStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostDailyStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostDailyStatsCountAggregateInputType | true
    }

  export interface PostDailyStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostDailyStats'], meta: { name: 'PostDailyStats' } }
    /**
     * Find zero or one PostDailyStats that matches the filter.
     * @param {PostDailyStatsFindUniqueArgs} args - Arguments to find a PostDailyStats
     * @example
     * // Get one PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostDailyStatsFindUniqueArgs>(args: SelectSubset<T, PostDailyStatsFindUniqueArgs<ExtArgs>>): Prisma__PostDailyStatsClient<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostDailyStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostDailyStatsFindUniqueOrThrowArgs} args - Arguments to find a PostDailyStats
     * @example
     * // Get one PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostDailyStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, PostDailyStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostDailyStatsClient<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostDailyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDailyStatsFindFirstArgs} args - Arguments to find a PostDailyStats
     * @example
     * // Get one PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostDailyStatsFindFirstArgs>(args?: SelectSubset<T, PostDailyStatsFindFirstArgs<ExtArgs>>): Prisma__PostDailyStatsClient<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostDailyStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDailyStatsFindFirstOrThrowArgs} args - Arguments to find a PostDailyStats
     * @example
     * // Get one PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostDailyStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, PostDailyStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostDailyStatsClient<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostDailyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDailyStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.findMany()
     * 
     * // Get first 10 PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.findMany({ take: 10 })
     * 
     * // Only select the `post_id`
     * const postDailyStatsWithPost_idOnly = await prisma.postDailyStats.findMany({ select: { post_id: true } })
     * 
     */
    findMany<T extends PostDailyStatsFindManyArgs>(args?: SelectSubset<T, PostDailyStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostDailyStats.
     * @param {PostDailyStatsCreateArgs} args - Arguments to create a PostDailyStats.
     * @example
     * // Create one PostDailyStats
     * const PostDailyStats = await prisma.postDailyStats.create({
     *   data: {
     *     // ... data to create a PostDailyStats
     *   }
     * })
     * 
     */
    create<T extends PostDailyStatsCreateArgs>(args: SelectSubset<T, PostDailyStatsCreateArgs<ExtArgs>>): Prisma__PostDailyStatsClient<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostDailyStats.
     * @param {PostDailyStatsCreateManyArgs} args - Arguments to create many PostDailyStats.
     * @example
     * // Create many PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostDailyStatsCreateManyArgs>(args?: SelectSubset<T, PostDailyStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostDailyStats and returns the data saved in the database.
     * @param {PostDailyStatsCreateManyAndReturnArgs} args - Arguments to create many PostDailyStats.
     * @example
     * // Create many PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostDailyStats and only return the `post_id`
     * const postDailyStatsWithPost_idOnly = await prisma.postDailyStats.createManyAndReturn({
     *   select: { post_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostDailyStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, PostDailyStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostDailyStats.
     * @param {PostDailyStatsDeleteArgs} args - Arguments to delete one PostDailyStats.
     * @example
     * // Delete one PostDailyStats
     * const PostDailyStats = await prisma.postDailyStats.delete({
     *   where: {
     *     // ... filter to delete one PostDailyStats
     *   }
     * })
     * 
     */
    delete<T extends PostDailyStatsDeleteArgs>(args: SelectSubset<T, PostDailyStatsDeleteArgs<ExtArgs>>): Prisma__PostDailyStatsClient<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostDailyStats.
     * @param {PostDailyStatsUpdateArgs} args - Arguments to update one PostDailyStats.
     * @example
     * // Update one PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostDailyStatsUpdateArgs>(args: SelectSubset<T, PostDailyStatsUpdateArgs<ExtArgs>>): Prisma__PostDailyStatsClient<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostDailyStats.
     * @param {PostDailyStatsDeleteManyArgs} args - Arguments to filter PostDailyStats to delete.
     * @example
     * // Delete a few PostDailyStats
     * const { count } = await prisma.postDailyStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDailyStatsDeleteManyArgs>(args?: SelectSubset<T, PostDailyStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostDailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDailyStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostDailyStatsUpdateManyArgs>(args: SelectSubset<T, PostDailyStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostDailyStats and returns the data updated in the database.
     * @param {PostDailyStatsUpdateManyAndReturnArgs} args - Arguments to update many PostDailyStats.
     * @example
     * // Update many PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostDailyStats and only return the `post_id`
     * const postDailyStatsWithPost_idOnly = await prisma.postDailyStats.updateManyAndReturn({
     *   select: { post_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostDailyStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, PostDailyStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostDailyStats.
     * @param {PostDailyStatsUpsertArgs} args - Arguments to update or create a PostDailyStats.
     * @example
     * // Update or create a PostDailyStats
     * const postDailyStats = await prisma.postDailyStats.upsert({
     *   create: {
     *     // ... data to create a PostDailyStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostDailyStats we want to update
     *   }
     * })
     */
    upsert<T extends PostDailyStatsUpsertArgs>(args: SelectSubset<T, PostDailyStatsUpsertArgs<ExtArgs>>): Prisma__PostDailyStatsClient<$Result.GetResult<Prisma.$PostDailyStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostDailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDailyStatsCountArgs} args - Arguments to filter PostDailyStats to count.
     * @example
     * // Count the number of PostDailyStats
     * const count = await prisma.postDailyStats.count({
     *   where: {
     *     // ... the filter for the PostDailyStats we want to count
     *   }
     * })
    **/
    count<T extends PostDailyStatsCountArgs>(
      args?: Subset<T, PostDailyStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostDailyStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostDailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDailyStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostDailyStatsAggregateArgs>(args: Subset<T, PostDailyStatsAggregateArgs>): Prisma.PrismaPromise<GetPostDailyStatsAggregateType<T>>

    /**
     * Group by PostDailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDailyStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostDailyStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostDailyStatsGroupByArgs['orderBy'] }
        : { orderBy?: PostDailyStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostDailyStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostDailyStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostDailyStats model
   */
  readonly fields: PostDailyStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostDailyStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostDailyStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostDailyStats model
   */
  interface PostDailyStatsFieldRefs {
    readonly post_id: FieldRef<"PostDailyStats", 'BigInt'>
    readonly stat_date: FieldRef<"PostDailyStats", 'DateTime'>
    readonly view_count: FieldRef<"PostDailyStats", 'BigInt'>
    readonly updated_at: FieldRef<"PostDailyStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostDailyStats findUnique
   */
  export type PostDailyStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostDailyStats to fetch.
     */
    where: PostDailyStatsWhereUniqueInput
  }

  /**
   * PostDailyStats findUniqueOrThrow
   */
  export type PostDailyStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostDailyStats to fetch.
     */
    where: PostDailyStatsWhereUniqueInput
  }

  /**
   * PostDailyStats findFirst
   */
  export type PostDailyStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostDailyStats to fetch.
     */
    where?: PostDailyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostDailyStats to fetch.
     */
    orderBy?: PostDailyStatsOrderByWithRelationInput | PostDailyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostDailyStats.
     */
    cursor?: PostDailyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostDailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostDailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostDailyStats.
     */
    distinct?: PostDailyStatsScalarFieldEnum | PostDailyStatsScalarFieldEnum[]
  }

  /**
   * PostDailyStats findFirstOrThrow
   */
  export type PostDailyStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostDailyStats to fetch.
     */
    where?: PostDailyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostDailyStats to fetch.
     */
    orderBy?: PostDailyStatsOrderByWithRelationInput | PostDailyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostDailyStats.
     */
    cursor?: PostDailyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostDailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostDailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostDailyStats.
     */
    distinct?: PostDailyStatsScalarFieldEnum | PostDailyStatsScalarFieldEnum[]
  }

  /**
   * PostDailyStats findMany
   */
  export type PostDailyStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PostDailyStats to fetch.
     */
    where?: PostDailyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostDailyStats to fetch.
     */
    orderBy?: PostDailyStatsOrderByWithRelationInput | PostDailyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostDailyStats.
     */
    cursor?: PostDailyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostDailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostDailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostDailyStats.
     */
    distinct?: PostDailyStatsScalarFieldEnum | PostDailyStatsScalarFieldEnum[]
  }

  /**
   * PostDailyStats create
   */
  export type PostDailyStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a PostDailyStats.
     */
    data: XOR<PostDailyStatsCreateInput, PostDailyStatsUncheckedCreateInput>
  }

  /**
   * PostDailyStats createMany
   */
  export type PostDailyStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostDailyStats.
     */
    data: PostDailyStatsCreateManyInput | PostDailyStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostDailyStats createManyAndReturn
   */
  export type PostDailyStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * The data used to create many PostDailyStats.
     */
    data: PostDailyStatsCreateManyInput | PostDailyStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostDailyStats update
   */
  export type PostDailyStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a PostDailyStats.
     */
    data: XOR<PostDailyStatsUpdateInput, PostDailyStatsUncheckedUpdateInput>
    /**
     * Choose, which PostDailyStats to update.
     */
    where: PostDailyStatsWhereUniqueInput
  }

  /**
   * PostDailyStats updateMany
   */
  export type PostDailyStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostDailyStats.
     */
    data: XOR<PostDailyStatsUpdateManyMutationInput, PostDailyStatsUncheckedUpdateManyInput>
    /**
     * Filter which PostDailyStats to update
     */
    where?: PostDailyStatsWhereInput
    /**
     * Limit how many PostDailyStats to update.
     */
    limit?: number
  }

  /**
   * PostDailyStats updateManyAndReturn
   */
  export type PostDailyStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * The data used to update PostDailyStats.
     */
    data: XOR<PostDailyStatsUpdateManyMutationInput, PostDailyStatsUncheckedUpdateManyInput>
    /**
     * Filter which PostDailyStats to update
     */
    where?: PostDailyStatsWhereInput
    /**
     * Limit how many PostDailyStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostDailyStats upsert
   */
  export type PostDailyStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the PostDailyStats to update in case it exists.
     */
    where: PostDailyStatsWhereUniqueInput
    /**
     * In case the PostDailyStats found by the `where` argument doesn't exist, create a new PostDailyStats with this data.
     */
    create: XOR<PostDailyStatsCreateInput, PostDailyStatsUncheckedCreateInput>
    /**
     * In case the PostDailyStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostDailyStatsUpdateInput, PostDailyStatsUncheckedUpdateInput>
  }

  /**
   * PostDailyStats delete
   */
  export type PostDailyStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
    /**
     * Filter which PostDailyStats to delete.
     */
    where: PostDailyStatsWhereUniqueInput
  }

  /**
   * PostDailyStats deleteMany
   */
  export type PostDailyStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostDailyStats to delete
     */
    where?: PostDailyStatsWhereInput
    /**
     * Limit how many PostDailyStats to delete.
     */
    limit?: number
  }

  /**
   * PostDailyStats without action
   */
  export type PostDailyStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDailyStats
     */
    select?: PostDailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostDailyStats
     */
    omit?: PostDailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDailyStatsInclude<ExtArgs> | null
  }


  /**
   * Model PostPostcategory
   */

  export type AggregatePostPostcategory = {
    _count: PostPostcategoryCountAggregateOutputType | null
    _avg: PostPostcategoryAvgAggregateOutputType | null
    _sum: PostPostcategorySumAggregateOutputType | null
    _min: PostPostcategoryMinAggregateOutputType | null
    _max: PostPostcategoryMaxAggregateOutputType | null
  }

  export type PostPostcategoryAvgAggregateOutputType = {
    post_id: number | null
    post_category_id: number | null
  }

  export type PostPostcategorySumAggregateOutputType = {
    post_id: bigint | null
    post_category_id: bigint | null
  }

  export type PostPostcategoryMinAggregateOutputType = {
    post_id: bigint | null
    post_category_id: bigint | null
  }

  export type PostPostcategoryMaxAggregateOutputType = {
    post_id: bigint | null
    post_category_id: bigint | null
  }

  export type PostPostcategoryCountAggregateOutputType = {
    post_id: number
    post_category_id: number
    _all: number
  }


  export type PostPostcategoryAvgAggregateInputType = {
    post_id?: true
    post_category_id?: true
  }

  export type PostPostcategorySumAggregateInputType = {
    post_id?: true
    post_category_id?: true
  }

  export type PostPostcategoryMinAggregateInputType = {
    post_id?: true
    post_category_id?: true
  }

  export type PostPostcategoryMaxAggregateInputType = {
    post_id?: true
    post_category_id?: true
  }

  export type PostPostcategoryCountAggregateInputType = {
    post_id?: true
    post_category_id?: true
    _all?: true
  }

  export type PostPostcategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostPostcategory to aggregate.
     */
    where?: PostPostcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPostcategories to fetch.
     */
    orderBy?: PostPostcategoryOrderByWithRelationInput | PostPostcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostPostcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPostcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPostcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostPostcategories
    **/
    _count?: true | PostPostcategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostPostcategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostPostcategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostPostcategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostPostcategoryMaxAggregateInputType
  }

  export type GetPostPostcategoryAggregateType<T extends PostPostcategoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePostPostcategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostPostcategory[P]>
      : GetScalarType<T[P], AggregatePostPostcategory[P]>
  }




  export type PostPostcategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostPostcategoryWhereInput
    orderBy?: PostPostcategoryOrderByWithAggregationInput | PostPostcategoryOrderByWithAggregationInput[]
    by: PostPostcategoryScalarFieldEnum[] | PostPostcategoryScalarFieldEnum
    having?: PostPostcategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostPostcategoryCountAggregateInputType | true
    _avg?: PostPostcategoryAvgAggregateInputType
    _sum?: PostPostcategorySumAggregateInputType
    _min?: PostPostcategoryMinAggregateInputType
    _max?: PostPostcategoryMaxAggregateInputType
  }

  export type PostPostcategoryGroupByOutputType = {
    post_id: bigint
    post_category_id: bigint
    _count: PostPostcategoryCountAggregateOutputType | null
    _avg: PostPostcategoryAvgAggregateOutputType | null
    _sum: PostPostcategorySumAggregateOutputType | null
    _min: PostPostcategoryMinAggregateOutputType | null
    _max: PostPostcategoryMaxAggregateOutputType | null
  }

  type GetPostPostcategoryGroupByPayload<T extends PostPostcategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostPostcategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostPostcategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostPostcategoryGroupByOutputType[P]>
            : GetScalarType<T[P], PostPostcategoryGroupByOutputType[P]>
        }
      >
    >


  export type PostPostcategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    post_category_id?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    category?: boolean | PostCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postPostcategory"]>

  export type PostPostcategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    post_category_id?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    category?: boolean | PostCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postPostcategory"]>

  export type PostPostcategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    post_category_id?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    category?: boolean | PostCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postPostcategory"]>

  export type PostPostcategorySelectScalar = {
    post_id?: boolean
    post_category_id?: boolean
  }

  export type PostPostcategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"post_id" | "post_category_id", ExtArgs["result"]["postPostcategory"]>
  export type PostPostcategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    category?: boolean | PostCategoryDefaultArgs<ExtArgs>
  }
  export type PostPostcategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    category?: boolean | PostCategoryDefaultArgs<ExtArgs>
  }
  export type PostPostcategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    category?: boolean | PostCategoryDefaultArgs<ExtArgs>
  }

  export type $PostPostcategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostPostcategory"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      category: Prisma.$PostCategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      post_id: bigint
      post_category_id: bigint
    }, ExtArgs["result"]["postPostcategory"]>
    composites: {}
  }

  type PostPostcategoryGetPayload<S extends boolean | null | undefined | PostPostcategoryDefaultArgs> = $Result.GetResult<Prisma.$PostPostcategoryPayload, S>

  type PostPostcategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostPostcategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostPostcategoryCountAggregateInputType | true
    }

  export interface PostPostcategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostPostcategory'], meta: { name: 'PostPostcategory' } }
    /**
     * Find zero or one PostPostcategory that matches the filter.
     * @param {PostPostcategoryFindUniqueArgs} args - Arguments to find a PostPostcategory
     * @example
     * // Get one PostPostcategory
     * const postPostcategory = await prisma.postPostcategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostPostcategoryFindUniqueArgs>(args: SelectSubset<T, PostPostcategoryFindUniqueArgs<ExtArgs>>): Prisma__PostPostcategoryClient<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostPostcategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostPostcategoryFindUniqueOrThrowArgs} args - Arguments to find a PostPostcategory
     * @example
     * // Get one PostPostcategory
     * const postPostcategory = await prisma.postPostcategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostPostcategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PostPostcategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostPostcategoryClient<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostPostcategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPostcategoryFindFirstArgs} args - Arguments to find a PostPostcategory
     * @example
     * // Get one PostPostcategory
     * const postPostcategory = await prisma.postPostcategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostPostcategoryFindFirstArgs>(args?: SelectSubset<T, PostPostcategoryFindFirstArgs<ExtArgs>>): Prisma__PostPostcategoryClient<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostPostcategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPostcategoryFindFirstOrThrowArgs} args - Arguments to find a PostPostcategory
     * @example
     * // Get one PostPostcategory
     * const postPostcategory = await prisma.postPostcategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostPostcategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PostPostcategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostPostcategoryClient<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostPostcategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPostcategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostPostcategories
     * const postPostcategories = await prisma.postPostcategory.findMany()
     * 
     * // Get first 10 PostPostcategories
     * const postPostcategories = await prisma.postPostcategory.findMany({ take: 10 })
     * 
     * // Only select the `post_id`
     * const postPostcategoryWithPost_idOnly = await prisma.postPostcategory.findMany({ select: { post_id: true } })
     * 
     */
    findMany<T extends PostPostcategoryFindManyArgs>(args?: SelectSubset<T, PostPostcategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostPostcategory.
     * @param {PostPostcategoryCreateArgs} args - Arguments to create a PostPostcategory.
     * @example
     * // Create one PostPostcategory
     * const PostPostcategory = await prisma.postPostcategory.create({
     *   data: {
     *     // ... data to create a PostPostcategory
     *   }
     * })
     * 
     */
    create<T extends PostPostcategoryCreateArgs>(args: SelectSubset<T, PostPostcategoryCreateArgs<ExtArgs>>): Prisma__PostPostcategoryClient<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostPostcategories.
     * @param {PostPostcategoryCreateManyArgs} args - Arguments to create many PostPostcategories.
     * @example
     * // Create many PostPostcategories
     * const postPostcategory = await prisma.postPostcategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostPostcategoryCreateManyArgs>(args?: SelectSubset<T, PostPostcategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostPostcategories and returns the data saved in the database.
     * @param {PostPostcategoryCreateManyAndReturnArgs} args - Arguments to create many PostPostcategories.
     * @example
     * // Create many PostPostcategories
     * const postPostcategory = await prisma.postPostcategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostPostcategories and only return the `post_id`
     * const postPostcategoryWithPost_idOnly = await prisma.postPostcategory.createManyAndReturn({
     *   select: { post_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostPostcategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PostPostcategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostPostcategory.
     * @param {PostPostcategoryDeleteArgs} args - Arguments to delete one PostPostcategory.
     * @example
     * // Delete one PostPostcategory
     * const PostPostcategory = await prisma.postPostcategory.delete({
     *   where: {
     *     // ... filter to delete one PostPostcategory
     *   }
     * })
     * 
     */
    delete<T extends PostPostcategoryDeleteArgs>(args: SelectSubset<T, PostPostcategoryDeleteArgs<ExtArgs>>): Prisma__PostPostcategoryClient<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostPostcategory.
     * @param {PostPostcategoryUpdateArgs} args - Arguments to update one PostPostcategory.
     * @example
     * // Update one PostPostcategory
     * const postPostcategory = await prisma.postPostcategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostPostcategoryUpdateArgs>(args: SelectSubset<T, PostPostcategoryUpdateArgs<ExtArgs>>): Prisma__PostPostcategoryClient<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostPostcategories.
     * @param {PostPostcategoryDeleteManyArgs} args - Arguments to filter PostPostcategories to delete.
     * @example
     * // Delete a few PostPostcategories
     * const { count } = await prisma.postPostcategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostPostcategoryDeleteManyArgs>(args?: SelectSubset<T, PostPostcategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostPostcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPostcategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostPostcategories
     * const postPostcategory = await prisma.postPostcategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostPostcategoryUpdateManyArgs>(args: SelectSubset<T, PostPostcategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostPostcategories and returns the data updated in the database.
     * @param {PostPostcategoryUpdateManyAndReturnArgs} args - Arguments to update many PostPostcategories.
     * @example
     * // Update many PostPostcategories
     * const postPostcategory = await prisma.postPostcategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostPostcategories and only return the `post_id`
     * const postPostcategoryWithPost_idOnly = await prisma.postPostcategory.updateManyAndReturn({
     *   select: { post_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostPostcategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, PostPostcategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostPostcategory.
     * @param {PostPostcategoryUpsertArgs} args - Arguments to update or create a PostPostcategory.
     * @example
     * // Update or create a PostPostcategory
     * const postPostcategory = await prisma.postPostcategory.upsert({
     *   create: {
     *     // ... data to create a PostPostcategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostPostcategory we want to update
     *   }
     * })
     */
    upsert<T extends PostPostcategoryUpsertArgs>(args: SelectSubset<T, PostPostcategoryUpsertArgs<ExtArgs>>): Prisma__PostPostcategoryClient<$Result.GetResult<Prisma.$PostPostcategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostPostcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPostcategoryCountArgs} args - Arguments to filter PostPostcategories to count.
     * @example
     * // Count the number of PostPostcategories
     * const count = await prisma.postPostcategory.count({
     *   where: {
     *     // ... the filter for the PostPostcategories we want to count
     *   }
     * })
    **/
    count<T extends PostPostcategoryCountArgs>(
      args?: Subset<T, PostPostcategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostPostcategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostPostcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPostcategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostPostcategoryAggregateArgs>(args: Subset<T, PostPostcategoryAggregateArgs>): Prisma.PrismaPromise<GetPostPostcategoryAggregateType<T>>

    /**
     * Group by PostPostcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPostcategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostPostcategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostPostcategoryGroupByArgs['orderBy'] }
        : { orderBy?: PostPostcategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostPostcategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostPostcategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostPostcategory model
   */
  readonly fields: PostPostcategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostPostcategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostPostcategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends PostCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostCategoryDefaultArgs<ExtArgs>>): Prisma__PostCategoryClient<$Result.GetResult<Prisma.$PostCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostPostcategory model
   */
  interface PostPostcategoryFieldRefs {
    readonly post_id: FieldRef<"PostPostcategory", 'BigInt'>
    readonly post_category_id: FieldRef<"PostPostcategory", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * PostPostcategory findUnique
   */
  export type PostPostcategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostPostcategory to fetch.
     */
    where: PostPostcategoryWhereUniqueInput
  }

  /**
   * PostPostcategory findUniqueOrThrow
   */
  export type PostPostcategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostPostcategory to fetch.
     */
    where: PostPostcategoryWhereUniqueInput
  }

  /**
   * PostPostcategory findFirst
   */
  export type PostPostcategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostPostcategory to fetch.
     */
    where?: PostPostcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPostcategories to fetch.
     */
    orderBy?: PostPostcategoryOrderByWithRelationInput | PostPostcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostPostcategories.
     */
    cursor?: PostPostcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPostcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPostcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostPostcategories.
     */
    distinct?: PostPostcategoryScalarFieldEnum | PostPostcategoryScalarFieldEnum[]
  }

  /**
   * PostPostcategory findFirstOrThrow
   */
  export type PostPostcategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostPostcategory to fetch.
     */
    where?: PostPostcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPostcategories to fetch.
     */
    orderBy?: PostPostcategoryOrderByWithRelationInput | PostPostcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostPostcategories.
     */
    cursor?: PostPostcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPostcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPostcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostPostcategories.
     */
    distinct?: PostPostcategoryScalarFieldEnum | PostPostcategoryScalarFieldEnum[]
  }

  /**
   * PostPostcategory findMany
   */
  export type PostPostcategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    /**
     * Filter, which PostPostcategories to fetch.
     */
    where?: PostPostcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPostcategories to fetch.
     */
    orderBy?: PostPostcategoryOrderByWithRelationInput | PostPostcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostPostcategories.
     */
    cursor?: PostPostcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPostcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPostcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostPostcategories.
     */
    distinct?: PostPostcategoryScalarFieldEnum | PostPostcategoryScalarFieldEnum[]
  }

  /**
   * PostPostcategory create
   */
  export type PostPostcategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PostPostcategory.
     */
    data: XOR<PostPostcategoryCreateInput, PostPostcategoryUncheckedCreateInput>
  }

  /**
   * PostPostcategory createMany
   */
  export type PostPostcategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostPostcategories.
     */
    data: PostPostcategoryCreateManyInput | PostPostcategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostPostcategory createManyAndReturn
   */
  export type PostPostcategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * The data used to create many PostPostcategories.
     */
    data: PostPostcategoryCreateManyInput | PostPostcategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostPostcategory update
   */
  export type PostPostcategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PostPostcategory.
     */
    data: XOR<PostPostcategoryUpdateInput, PostPostcategoryUncheckedUpdateInput>
    /**
     * Choose, which PostPostcategory to update.
     */
    where: PostPostcategoryWhereUniqueInput
  }

  /**
   * PostPostcategory updateMany
   */
  export type PostPostcategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostPostcategories.
     */
    data: XOR<PostPostcategoryUpdateManyMutationInput, PostPostcategoryUncheckedUpdateManyInput>
    /**
     * Filter which PostPostcategories to update
     */
    where?: PostPostcategoryWhereInput
    /**
     * Limit how many PostPostcategories to update.
     */
    limit?: number
  }

  /**
   * PostPostcategory updateManyAndReturn
   */
  export type PostPostcategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * The data used to update PostPostcategories.
     */
    data: XOR<PostPostcategoryUpdateManyMutationInput, PostPostcategoryUncheckedUpdateManyInput>
    /**
     * Filter which PostPostcategories to update
     */
    where?: PostPostcategoryWhereInput
    /**
     * Limit how many PostPostcategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostPostcategory upsert
   */
  export type PostPostcategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PostPostcategory to update in case it exists.
     */
    where: PostPostcategoryWhereUniqueInput
    /**
     * In case the PostPostcategory found by the `where` argument doesn't exist, create a new PostPostcategory with this data.
     */
    create: XOR<PostPostcategoryCreateInput, PostPostcategoryUncheckedCreateInput>
    /**
     * In case the PostPostcategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostPostcategoryUpdateInput, PostPostcategoryUncheckedUpdateInput>
  }

  /**
   * PostPostcategory delete
   */
  export type PostPostcategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
    /**
     * Filter which PostPostcategory to delete.
     */
    where: PostPostcategoryWhereUniqueInput
  }

  /**
   * PostPostcategory deleteMany
   */
  export type PostPostcategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostPostcategories to delete
     */
    where?: PostPostcategoryWhereInput
    /**
     * Limit how many PostPostcategories to delete.
     */
    limit?: number
  }

  /**
   * PostPostcategory without action
   */
  export type PostPostcategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPostcategory
     */
    select?: PostPostcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPostcategory
     */
    omit?: PostPostcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPostcategoryInclude<ExtArgs> | null
  }


  /**
   * Model PostPosttag
   */

  export type AggregatePostPosttag = {
    _count: PostPosttagCountAggregateOutputType | null
    _avg: PostPosttagAvgAggregateOutputType | null
    _sum: PostPosttagSumAggregateOutputType | null
    _min: PostPosttagMinAggregateOutputType | null
    _max: PostPosttagMaxAggregateOutputType | null
  }

  export type PostPosttagAvgAggregateOutputType = {
    post_id: number | null
    post_tag_id: number | null
  }

  export type PostPosttagSumAggregateOutputType = {
    post_id: bigint | null
    post_tag_id: bigint | null
  }

  export type PostPosttagMinAggregateOutputType = {
    post_id: bigint | null
    post_tag_id: bigint | null
  }

  export type PostPosttagMaxAggregateOutputType = {
    post_id: bigint | null
    post_tag_id: bigint | null
  }

  export type PostPosttagCountAggregateOutputType = {
    post_id: number
    post_tag_id: number
    _all: number
  }


  export type PostPosttagAvgAggregateInputType = {
    post_id?: true
    post_tag_id?: true
  }

  export type PostPosttagSumAggregateInputType = {
    post_id?: true
    post_tag_id?: true
  }

  export type PostPosttagMinAggregateInputType = {
    post_id?: true
    post_tag_id?: true
  }

  export type PostPosttagMaxAggregateInputType = {
    post_id?: true
    post_tag_id?: true
  }

  export type PostPosttagCountAggregateInputType = {
    post_id?: true
    post_tag_id?: true
    _all?: true
  }

  export type PostPosttagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostPosttag to aggregate.
     */
    where?: PostPosttagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPosttags to fetch.
     */
    orderBy?: PostPosttagOrderByWithRelationInput | PostPosttagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostPosttagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPosttags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPosttags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostPosttags
    **/
    _count?: true | PostPosttagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostPosttagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostPosttagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostPosttagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostPosttagMaxAggregateInputType
  }

  export type GetPostPosttagAggregateType<T extends PostPosttagAggregateArgs> = {
        [P in keyof T & keyof AggregatePostPosttag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostPosttag[P]>
      : GetScalarType<T[P], AggregatePostPosttag[P]>
  }




  export type PostPosttagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostPosttagWhereInput
    orderBy?: PostPosttagOrderByWithAggregationInput | PostPosttagOrderByWithAggregationInput[]
    by: PostPosttagScalarFieldEnum[] | PostPosttagScalarFieldEnum
    having?: PostPosttagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostPosttagCountAggregateInputType | true
    _avg?: PostPosttagAvgAggregateInputType
    _sum?: PostPosttagSumAggregateInputType
    _min?: PostPosttagMinAggregateInputType
    _max?: PostPosttagMaxAggregateInputType
  }

  export type PostPosttagGroupByOutputType = {
    post_id: bigint
    post_tag_id: bigint
    _count: PostPosttagCountAggregateOutputType | null
    _avg: PostPosttagAvgAggregateOutputType | null
    _sum: PostPosttagSumAggregateOutputType | null
    _min: PostPosttagMinAggregateOutputType | null
    _max: PostPosttagMaxAggregateOutputType | null
  }

  type GetPostPosttagGroupByPayload<T extends PostPosttagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostPosttagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostPosttagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostPosttagGroupByOutputType[P]>
            : GetScalarType<T[P], PostPosttagGroupByOutputType[P]>
        }
      >
    >


  export type PostPosttagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    post_tag_id?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    tag?: boolean | PostTagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postPosttag"]>

  export type PostPosttagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    post_tag_id?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    tag?: boolean | PostTagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postPosttag"]>

  export type PostPosttagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    post_tag_id?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    tag?: boolean | PostTagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postPosttag"]>

  export type PostPosttagSelectScalar = {
    post_id?: boolean
    post_tag_id?: boolean
  }

  export type PostPosttagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"post_id" | "post_tag_id", ExtArgs["result"]["postPosttag"]>
  export type PostPosttagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    tag?: boolean | PostTagDefaultArgs<ExtArgs>
  }
  export type PostPosttagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    tag?: boolean | PostTagDefaultArgs<ExtArgs>
  }
  export type PostPosttagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    tag?: boolean | PostTagDefaultArgs<ExtArgs>
  }

  export type $PostPosttagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostPosttag"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      tag: Prisma.$PostTagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      post_id: bigint
      post_tag_id: bigint
    }, ExtArgs["result"]["postPosttag"]>
    composites: {}
  }

  type PostPosttagGetPayload<S extends boolean | null | undefined | PostPosttagDefaultArgs> = $Result.GetResult<Prisma.$PostPosttagPayload, S>

  type PostPosttagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostPosttagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostPosttagCountAggregateInputType | true
    }

  export interface PostPosttagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostPosttag'], meta: { name: 'PostPosttag' } }
    /**
     * Find zero or one PostPosttag that matches the filter.
     * @param {PostPosttagFindUniqueArgs} args - Arguments to find a PostPosttag
     * @example
     * // Get one PostPosttag
     * const postPosttag = await prisma.postPosttag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostPosttagFindUniqueArgs>(args: SelectSubset<T, PostPosttagFindUniqueArgs<ExtArgs>>): Prisma__PostPosttagClient<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostPosttag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostPosttagFindUniqueOrThrowArgs} args - Arguments to find a PostPosttag
     * @example
     * // Get one PostPosttag
     * const postPosttag = await prisma.postPosttag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostPosttagFindUniqueOrThrowArgs>(args: SelectSubset<T, PostPosttagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostPosttagClient<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostPosttag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPosttagFindFirstArgs} args - Arguments to find a PostPosttag
     * @example
     * // Get one PostPosttag
     * const postPosttag = await prisma.postPosttag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostPosttagFindFirstArgs>(args?: SelectSubset<T, PostPosttagFindFirstArgs<ExtArgs>>): Prisma__PostPosttagClient<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostPosttag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPosttagFindFirstOrThrowArgs} args - Arguments to find a PostPosttag
     * @example
     * // Get one PostPosttag
     * const postPosttag = await prisma.postPosttag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostPosttagFindFirstOrThrowArgs>(args?: SelectSubset<T, PostPosttagFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostPosttagClient<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostPosttags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPosttagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostPosttags
     * const postPosttags = await prisma.postPosttag.findMany()
     * 
     * // Get first 10 PostPosttags
     * const postPosttags = await prisma.postPosttag.findMany({ take: 10 })
     * 
     * // Only select the `post_id`
     * const postPosttagWithPost_idOnly = await prisma.postPosttag.findMany({ select: { post_id: true } })
     * 
     */
    findMany<T extends PostPosttagFindManyArgs>(args?: SelectSubset<T, PostPosttagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostPosttag.
     * @param {PostPosttagCreateArgs} args - Arguments to create a PostPosttag.
     * @example
     * // Create one PostPosttag
     * const PostPosttag = await prisma.postPosttag.create({
     *   data: {
     *     // ... data to create a PostPosttag
     *   }
     * })
     * 
     */
    create<T extends PostPosttagCreateArgs>(args: SelectSubset<T, PostPosttagCreateArgs<ExtArgs>>): Prisma__PostPosttagClient<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostPosttags.
     * @param {PostPosttagCreateManyArgs} args - Arguments to create many PostPosttags.
     * @example
     * // Create many PostPosttags
     * const postPosttag = await prisma.postPosttag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostPosttagCreateManyArgs>(args?: SelectSubset<T, PostPosttagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostPosttags and returns the data saved in the database.
     * @param {PostPosttagCreateManyAndReturnArgs} args - Arguments to create many PostPosttags.
     * @example
     * // Create many PostPosttags
     * const postPosttag = await prisma.postPosttag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostPosttags and only return the `post_id`
     * const postPosttagWithPost_idOnly = await prisma.postPosttag.createManyAndReturn({
     *   select: { post_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostPosttagCreateManyAndReturnArgs>(args?: SelectSubset<T, PostPosttagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostPosttag.
     * @param {PostPosttagDeleteArgs} args - Arguments to delete one PostPosttag.
     * @example
     * // Delete one PostPosttag
     * const PostPosttag = await prisma.postPosttag.delete({
     *   where: {
     *     // ... filter to delete one PostPosttag
     *   }
     * })
     * 
     */
    delete<T extends PostPosttagDeleteArgs>(args: SelectSubset<T, PostPosttagDeleteArgs<ExtArgs>>): Prisma__PostPosttagClient<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostPosttag.
     * @param {PostPosttagUpdateArgs} args - Arguments to update one PostPosttag.
     * @example
     * // Update one PostPosttag
     * const postPosttag = await prisma.postPosttag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostPosttagUpdateArgs>(args: SelectSubset<T, PostPosttagUpdateArgs<ExtArgs>>): Prisma__PostPosttagClient<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostPosttags.
     * @param {PostPosttagDeleteManyArgs} args - Arguments to filter PostPosttags to delete.
     * @example
     * // Delete a few PostPosttags
     * const { count } = await prisma.postPosttag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostPosttagDeleteManyArgs>(args?: SelectSubset<T, PostPosttagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostPosttags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPosttagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostPosttags
     * const postPosttag = await prisma.postPosttag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostPosttagUpdateManyArgs>(args: SelectSubset<T, PostPosttagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostPosttags and returns the data updated in the database.
     * @param {PostPosttagUpdateManyAndReturnArgs} args - Arguments to update many PostPosttags.
     * @example
     * // Update many PostPosttags
     * const postPosttag = await prisma.postPosttag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostPosttags and only return the `post_id`
     * const postPosttagWithPost_idOnly = await prisma.postPosttag.updateManyAndReturn({
     *   select: { post_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostPosttagUpdateManyAndReturnArgs>(args: SelectSubset<T, PostPosttagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostPosttag.
     * @param {PostPosttagUpsertArgs} args - Arguments to update or create a PostPosttag.
     * @example
     * // Update or create a PostPosttag
     * const postPosttag = await prisma.postPosttag.upsert({
     *   create: {
     *     // ... data to create a PostPosttag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostPosttag we want to update
     *   }
     * })
     */
    upsert<T extends PostPosttagUpsertArgs>(args: SelectSubset<T, PostPosttagUpsertArgs<ExtArgs>>): Prisma__PostPosttagClient<$Result.GetResult<Prisma.$PostPosttagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostPosttags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPosttagCountArgs} args - Arguments to filter PostPosttags to count.
     * @example
     * // Count the number of PostPosttags
     * const count = await prisma.postPosttag.count({
     *   where: {
     *     // ... the filter for the PostPosttags we want to count
     *   }
     * })
    **/
    count<T extends PostPosttagCountArgs>(
      args?: Subset<T, PostPosttagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostPosttagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostPosttag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPosttagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostPosttagAggregateArgs>(args: Subset<T, PostPosttagAggregateArgs>): Prisma.PrismaPromise<GetPostPosttagAggregateType<T>>

    /**
     * Group by PostPosttag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPosttagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostPosttagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostPosttagGroupByArgs['orderBy'] }
        : { orderBy?: PostPosttagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostPosttagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostPosttagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostPosttag model
   */
  readonly fields: PostPosttagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostPosttag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostPosttagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends PostTagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostTagDefaultArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostPosttag model
   */
  interface PostPosttagFieldRefs {
    readonly post_id: FieldRef<"PostPosttag", 'BigInt'>
    readonly post_tag_id: FieldRef<"PostPosttag", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * PostPosttag findUnique
   */
  export type PostPosttagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    /**
     * Filter, which PostPosttag to fetch.
     */
    where: PostPosttagWhereUniqueInput
  }

  /**
   * PostPosttag findUniqueOrThrow
   */
  export type PostPosttagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    /**
     * Filter, which PostPosttag to fetch.
     */
    where: PostPosttagWhereUniqueInput
  }

  /**
   * PostPosttag findFirst
   */
  export type PostPosttagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    /**
     * Filter, which PostPosttag to fetch.
     */
    where?: PostPosttagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPosttags to fetch.
     */
    orderBy?: PostPosttagOrderByWithRelationInput | PostPosttagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostPosttags.
     */
    cursor?: PostPosttagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPosttags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPosttags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostPosttags.
     */
    distinct?: PostPosttagScalarFieldEnum | PostPosttagScalarFieldEnum[]
  }

  /**
   * PostPosttag findFirstOrThrow
   */
  export type PostPosttagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    /**
     * Filter, which PostPosttag to fetch.
     */
    where?: PostPosttagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPosttags to fetch.
     */
    orderBy?: PostPosttagOrderByWithRelationInput | PostPosttagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostPosttags.
     */
    cursor?: PostPosttagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPosttags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPosttags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostPosttags.
     */
    distinct?: PostPosttagScalarFieldEnum | PostPosttagScalarFieldEnum[]
  }

  /**
   * PostPosttag findMany
   */
  export type PostPosttagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    /**
     * Filter, which PostPosttags to fetch.
     */
    where?: PostPosttagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPosttags to fetch.
     */
    orderBy?: PostPosttagOrderByWithRelationInput | PostPosttagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostPosttags.
     */
    cursor?: PostPosttagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPosttags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPosttags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostPosttags.
     */
    distinct?: PostPosttagScalarFieldEnum | PostPosttagScalarFieldEnum[]
  }

  /**
   * PostPosttag create
   */
  export type PostPosttagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    /**
     * The data needed to create a PostPosttag.
     */
    data: XOR<PostPosttagCreateInput, PostPosttagUncheckedCreateInput>
  }

  /**
   * PostPosttag createMany
   */
  export type PostPosttagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostPosttags.
     */
    data: PostPosttagCreateManyInput | PostPosttagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostPosttag createManyAndReturn
   */
  export type PostPosttagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * The data used to create many PostPosttags.
     */
    data: PostPosttagCreateManyInput | PostPosttagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostPosttag update
   */
  export type PostPosttagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    /**
     * The data needed to update a PostPosttag.
     */
    data: XOR<PostPosttagUpdateInput, PostPosttagUncheckedUpdateInput>
    /**
     * Choose, which PostPosttag to update.
     */
    where: PostPosttagWhereUniqueInput
  }

  /**
   * PostPosttag updateMany
   */
  export type PostPosttagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostPosttags.
     */
    data: XOR<PostPosttagUpdateManyMutationInput, PostPosttagUncheckedUpdateManyInput>
    /**
     * Filter which PostPosttags to update
     */
    where?: PostPosttagWhereInput
    /**
     * Limit how many PostPosttags to update.
     */
    limit?: number
  }

  /**
   * PostPosttag updateManyAndReturn
   */
  export type PostPosttagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * The data used to update PostPosttags.
     */
    data: XOR<PostPosttagUpdateManyMutationInput, PostPosttagUncheckedUpdateManyInput>
    /**
     * Filter which PostPosttags to update
     */
    where?: PostPosttagWhereInput
    /**
     * Limit how many PostPosttags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostPosttag upsert
   */
  export type PostPosttagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    /**
     * The filter to search for the PostPosttag to update in case it exists.
     */
    where: PostPosttagWhereUniqueInput
    /**
     * In case the PostPosttag found by the `where` argument doesn't exist, create a new PostPosttag with this data.
     */
    create: XOR<PostPosttagCreateInput, PostPosttagUncheckedCreateInput>
    /**
     * In case the PostPosttag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostPosttagUpdateInput, PostPosttagUncheckedUpdateInput>
  }

  /**
   * PostPosttag delete
   */
  export type PostPosttagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
    /**
     * Filter which PostPosttag to delete.
     */
    where: PostPosttagWhereUniqueInput
  }

  /**
   * PostPosttag deleteMany
   */
  export type PostPosttagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostPosttags to delete
     */
    where?: PostPosttagWhereInput
    /**
     * Limit how many PostPosttags to delete.
     */
    limit?: number
  }

  /**
   * PostPosttag without action
   */
  export type PostPosttagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPosttag
     */
    select?: PostPosttagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPosttag
     */
    omit?: PostPosttagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPosttagInclude<ExtArgs> | null
  }


  /**
   * Model PostComment
   */

  export type AggregatePostComment = {
    _count: PostCommentCountAggregateOutputType | null
    _avg: PostCommentAvgAggregateOutputType | null
    _sum: PostCommentSumAggregateOutputType | null
    _min: PostCommentMinAggregateOutputType | null
    _max: PostCommentMaxAggregateOutputType | null
  }

  export type PostCommentAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    post_id: number | null
    parent_id: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type PostCommentSumAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    post_id: bigint | null
    parent_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type PostCommentMinAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    post_id: bigint | null
    parent_id: bigint | null
    guest_name: string | null
    guest_email: string | null
    content: string | null
    status: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PostCommentMaxAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    post_id: bigint | null
    parent_id: bigint | null
    guest_name: string | null
    guest_email: string | null
    content: string | null
    status: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PostCommentCountAggregateOutputType = {
    id: number
    user_id: number
    post_id: number
    parent_id: number
    guest_name: number
    guest_email: number
    content: number
    status: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PostCommentAvgAggregateInputType = {
    id?: true
    user_id?: true
    post_id?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type PostCommentSumAggregateInputType = {
    id?: true
    user_id?: true
    post_id?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type PostCommentMinAggregateInputType = {
    id?: true
    user_id?: true
    post_id?: true
    parent_id?: true
    guest_name?: true
    guest_email?: true
    content?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type PostCommentMaxAggregateInputType = {
    id?: true
    user_id?: true
    post_id?: true
    parent_id?: true
    guest_name?: true
    guest_email?: true
    content?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type PostCommentCountAggregateInputType = {
    id?: true
    user_id?: true
    post_id?: true
    parent_id?: true
    guest_name?: true
    guest_email?: true
    content?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PostCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostComment to aggregate.
     */
    where?: PostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostComments to fetch.
     */
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostComments
    **/
    _count?: true | PostCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostCommentMaxAggregateInputType
  }

  export type GetPostCommentAggregateType<T extends PostCommentAggregateArgs> = {
        [P in keyof T & keyof AggregatePostComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostComment[P]>
      : GetScalarType<T[P], AggregatePostComment[P]>
  }




  export type PostCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostCommentWhereInput
    orderBy?: PostCommentOrderByWithAggregationInput | PostCommentOrderByWithAggregationInput[]
    by: PostCommentScalarFieldEnum[] | PostCommentScalarFieldEnum
    having?: PostCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCommentCountAggregateInputType | true
    _avg?: PostCommentAvgAggregateInputType
    _sum?: PostCommentSumAggregateInputType
    _min?: PostCommentMinAggregateInputType
    _max?: PostCommentMaxAggregateInputType
  }

  export type PostCommentGroupByOutputType = {
    id: bigint
    user_id: bigint | null
    post_id: bigint
    parent_id: bigint | null
    guest_name: string | null
    guest_email: string | null
    content: string
    status: string
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: PostCommentCountAggregateOutputType | null
    _avg: PostCommentAvgAggregateOutputType | null
    _sum: PostCommentSumAggregateOutputType | null
    _min: PostCommentMinAggregateOutputType | null
    _max: PostCommentMaxAggregateOutputType | null
  }

  type GetPostCommentGroupByPayload<T extends PostCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostCommentGroupByOutputType[P]>
            : GetScalarType<T[P], PostCommentGroupByOutputType[P]>
        }
      >
    >


  export type PostCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    post_id?: boolean
    parent_id?: boolean
    guest_name?: boolean
    guest_email?: boolean
    content?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    parent?: boolean | PostComment$parentArgs<ExtArgs>
    replies?: boolean | PostComment$repliesArgs<ExtArgs>
    _count?: boolean | PostCommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postComment"]>

  export type PostCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    post_id?: boolean
    parent_id?: boolean
    guest_name?: boolean
    guest_email?: boolean
    content?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    parent?: boolean | PostComment$parentArgs<ExtArgs>
  }, ExtArgs["result"]["postComment"]>

  export type PostCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    post_id?: boolean
    parent_id?: boolean
    guest_name?: boolean
    guest_email?: boolean
    content?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    parent?: boolean | PostComment$parentArgs<ExtArgs>
  }, ExtArgs["result"]["postComment"]>

  export type PostCommentSelectScalar = {
    id?: boolean
    user_id?: boolean
    post_id?: boolean
    parent_id?: boolean
    guest_name?: boolean
    guest_email?: boolean
    content?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PostCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "post_id" | "parent_id" | "guest_name" | "guest_email" | "content" | "status" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["postComment"]>
  export type PostCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    parent?: boolean | PostComment$parentArgs<ExtArgs>
    replies?: boolean | PostComment$repliesArgs<ExtArgs>
    _count?: boolean | PostCommentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    parent?: boolean | PostComment$parentArgs<ExtArgs>
  }
  export type PostCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    parent?: boolean | PostComment$parentArgs<ExtArgs>
  }

  export type $PostCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostComment"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      parent: Prisma.$PostCommentPayload<ExtArgs> | null
      replies: Prisma.$PostCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      user_id: bigint | null
      post_id: bigint
      parent_id: bigint | null
      guest_name: string | null
      guest_email: string | null
      content: string
      status: string
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["postComment"]>
    composites: {}
  }

  type PostCommentGetPayload<S extends boolean | null | undefined | PostCommentDefaultArgs> = $Result.GetResult<Prisma.$PostCommentPayload, S>

  type PostCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCommentCountAggregateInputType | true
    }

  export interface PostCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostComment'], meta: { name: 'PostComment' } }
    /**
     * Find zero or one PostComment that matches the filter.
     * @param {PostCommentFindUniqueArgs} args - Arguments to find a PostComment
     * @example
     * // Get one PostComment
     * const postComment = await prisma.postComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostCommentFindUniqueArgs>(args: SelectSubset<T, PostCommentFindUniqueArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostCommentFindUniqueOrThrowArgs} args - Arguments to find a PostComment
     * @example
     * // Get one PostComment
     * const postComment = await prisma.postComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, PostCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentFindFirstArgs} args - Arguments to find a PostComment
     * @example
     * // Get one PostComment
     * const postComment = await prisma.postComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostCommentFindFirstArgs>(args?: SelectSubset<T, PostCommentFindFirstArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentFindFirstOrThrowArgs} args - Arguments to find a PostComment
     * @example
     * // Get one PostComment
     * const postComment = await prisma.postComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, PostCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostComments
     * const postComments = await prisma.postComment.findMany()
     * 
     * // Get first 10 PostComments
     * const postComments = await prisma.postComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postCommentWithIdOnly = await prisma.postComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostCommentFindManyArgs>(args?: SelectSubset<T, PostCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostComment.
     * @param {PostCommentCreateArgs} args - Arguments to create a PostComment.
     * @example
     * // Create one PostComment
     * const PostComment = await prisma.postComment.create({
     *   data: {
     *     // ... data to create a PostComment
     *   }
     * })
     * 
     */
    create<T extends PostCommentCreateArgs>(args: SelectSubset<T, PostCommentCreateArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostComments.
     * @param {PostCommentCreateManyArgs} args - Arguments to create many PostComments.
     * @example
     * // Create many PostComments
     * const postComment = await prisma.postComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCommentCreateManyArgs>(args?: SelectSubset<T, PostCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostComments and returns the data saved in the database.
     * @param {PostCommentCreateManyAndReturnArgs} args - Arguments to create many PostComments.
     * @example
     * // Create many PostComments
     * const postComment = await prisma.postComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostComments and only return the `id`
     * const postCommentWithIdOnly = await prisma.postComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostComment.
     * @param {PostCommentDeleteArgs} args - Arguments to delete one PostComment.
     * @example
     * // Delete one PostComment
     * const PostComment = await prisma.postComment.delete({
     *   where: {
     *     // ... filter to delete one PostComment
     *   }
     * })
     * 
     */
    delete<T extends PostCommentDeleteArgs>(args: SelectSubset<T, PostCommentDeleteArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostComment.
     * @param {PostCommentUpdateArgs} args - Arguments to update one PostComment.
     * @example
     * // Update one PostComment
     * const postComment = await prisma.postComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostCommentUpdateArgs>(args: SelectSubset<T, PostCommentUpdateArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostComments.
     * @param {PostCommentDeleteManyArgs} args - Arguments to filter PostComments to delete.
     * @example
     * // Delete a few PostComments
     * const { count } = await prisma.postComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostCommentDeleteManyArgs>(args?: SelectSubset<T, PostCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostComments
     * const postComment = await prisma.postComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostCommentUpdateManyArgs>(args: SelectSubset<T, PostCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostComments and returns the data updated in the database.
     * @param {PostCommentUpdateManyAndReturnArgs} args - Arguments to update many PostComments.
     * @example
     * // Update many PostComments
     * const postComment = await prisma.postComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostComments and only return the `id`
     * const postCommentWithIdOnly = await prisma.postComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, PostCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostComment.
     * @param {PostCommentUpsertArgs} args - Arguments to update or create a PostComment.
     * @example
     * // Update or create a PostComment
     * const postComment = await prisma.postComment.upsert({
     *   create: {
     *     // ... data to create a PostComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostComment we want to update
     *   }
     * })
     */
    upsert<T extends PostCommentUpsertArgs>(args: SelectSubset<T, PostCommentUpsertArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentCountArgs} args - Arguments to filter PostComments to count.
     * @example
     * // Count the number of PostComments
     * const count = await prisma.postComment.count({
     *   where: {
     *     // ... the filter for the PostComments we want to count
     *   }
     * })
    **/
    count<T extends PostCommentCountArgs>(
      args?: Subset<T, PostCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostCommentAggregateArgs>(args: Subset<T, PostCommentAggregateArgs>): Prisma.PrismaPromise<GetPostCommentAggregateType<T>>

    /**
     * Group by PostComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostCommentGroupByArgs['orderBy'] }
        : { orderBy?: PostCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostComment model
   */
  readonly fields: PostCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends PostComment$parentArgs<ExtArgs> = {}>(args?: Subset<T, PostComment$parentArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    replies<T extends PostComment$repliesArgs<ExtArgs> = {}>(args?: Subset<T, PostComment$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostComment model
   */
  interface PostCommentFieldRefs {
    readonly id: FieldRef<"PostComment", 'BigInt'>
    readonly user_id: FieldRef<"PostComment", 'BigInt'>
    readonly post_id: FieldRef<"PostComment", 'BigInt'>
    readonly parent_id: FieldRef<"PostComment", 'BigInt'>
    readonly guest_name: FieldRef<"PostComment", 'String'>
    readonly guest_email: FieldRef<"PostComment", 'String'>
    readonly content: FieldRef<"PostComment", 'String'>
    readonly status: FieldRef<"PostComment", 'String'>
    readonly created_user_id: FieldRef<"PostComment", 'BigInt'>
    readonly updated_user_id: FieldRef<"PostComment", 'BigInt'>
    readonly created_at: FieldRef<"PostComment", 'DateTime'>
    readonly updated_at: FieldRef<"PostComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostComment findUnique
   */
  export type PostCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComment to fetch.
     */
    where: PostCommentWhereUniqueInput
  }

  /**
   * PostComment findUniqueOrThrow
   */
  export type PostCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComment to fetch.
     */
    where: PostCommentWhereUniqueInput
  }

  /**
   * PostComment findFirst
   */
  export type PostCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComment to fetch.
     */
    where?: PostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostComments to fetch.
     */
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostComments.
     */
    cursor?: PostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostComments.
     */
    distinct?: PostCommentScalarFieldEnum | PostCommentScalarFieldEnum[]
  }

  /**
   * PostComment findFirstOrThrow
   */
  export type PostCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComment to fetch.
     */
    where?: PostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostComments to fetch.
     */
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostComments.
     */
    cursor?: PostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostComments.
     */
    distinct?: PostCommentScalarFieldEnum | PostCommentScalarFieldEnum[]
  }

  /**
   * PostComment findMany
   */
  export type PostCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComments to fetch.
     */
    where?: PostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostComments to fetch.
     */
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostComments.
     */
    cursor?: PostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostComments.
     */
    distinct?: PostCommentScalarFieldEnum | PostCommentScalarFieldEnum[]
  }

  /**
   * PostComment create
   */
  export type PostCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a PostComment.
     */
    data: XOR<PostCommentCreateInput, PostCommentUncheckedCreateInput>
  }

  /**
   * PostComment createMany
   */
  export type PostCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostComments.
     */
    data: PostCommentCreateManyInput | PostCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostComment createManyAndReturn
   */
  export type PostCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * The data used to create many PostComments.
     */
    data: PostCommentCreateManyInput | PostCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostComment update
   */
  export type PostCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a PostComment.
     */
    data: XOR<PostCommentUpdateInput, PostCommentUncheckedUpdateInput>
    /**
     * Choose, which PostComment to update.
     */
    where: PostCommentWhereUniqueInput
  }

  /**
   * PostComment updateMany
   */
  export type PostCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostComments.
     */
    data: XOR<PostCommentUpdateManyMutationInput, PostCommentUncheckedUpdateManyInput>
    /**
     * Filter which PostComments to update
     */
    where?: PostCommentWhereInput
    /**
     * Limit how many PostComments to update.
     */
    limit?: number
  }

  /**
   * PostComment updateManyAndReturn
   */
  export type PostCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * The data used to update PostComments.
     */
    data: XOR<PostCommentUpdateManyMutationInput, PostCommentUncheckedUpdateManyInput>
    /**
     * Filter which PostComments to update
     */
    where?: PostCommentWhereInput
    /**
     * Limit how many PostComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostComment upsert
   */
  export type PostCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the PostComment to update in case it exists.
     */
    where: PostCommentWhereUniqueInput
    /**
     * In case the PostComment found by the `where` argument doesn't exist, create a new PostComment with this data.
     */
    create: XOR<PostCommentCreateInput, PostCommentUncheckedCreateInput>
    /**
     * In case the PostComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostCommentUpdateInput, PostCommentUncheckedUpdateInput>
  }

  /**
   * PostComment delete
   */
  export type PostCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter which PostComment to delete.
     */
    where: PostCommentWhereUniqueInput
  }

  /**
   * PostComment deleteMany
   */
  export type PostCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostComments to delete
     */
    where?: PostCommentWhereInput
    /**
     * Limit how many PostComments to delete.
     */
    limit?: number
  }

  /**
   * PostComment.parent
   */
  export type PostComment$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    where?: PostCommentWhereInput
  }

  /**
   * PostComment.replies
   */
  export type PostComment$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    where?: PostCommentWhereInput
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    cursor?: PostCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostCommentScalarFieldEnum | PostCommentScalarFieldEnum[]
  }

  /**
   * PostComment without action
   */
  export type PostCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
  }


  /**
   * Model PostOutbox
   */

  export type AggregatePostOutbox = {
    _count: PostOutboxCountAggregateOutputType | null
    _avg: PostOutboxAvgAggregateOutputType | null
    _sum: PostOutboxSumAggregateOutputType | null
    _min: PostOutboxMinAggregateOutputType | null
    _max: PostOutboxMaxAggregateOutputType | null
  }

  export type PostOutboxAvgAggregateOutputType = {
    id: number | null
  }

  export type PostOutboxSumAggregateOutputType = {
    id: bigint | null
  }

  export type PostOutboxMinAggregateOutputType = {
    id: bigint | null
    event_type: string | null
    published: boolean | null
    created_at: Date | null
  }

  export type PostOutboxMaxAggregateOutputType = {
    id: bigint | null
    event_type: string | null
    published: boolean | null
    created_at: Date | null
  }

  export type PostOutboxCountAggregateOutputType = {
    id: number
    event_type: number
    payload: number
    published: number
    created_at: number
    _all: number
  }


  export type PostOutboxAvgAggregateInputType = {
    id?: true
  }

  export type PostOutboxSumAggregateInputType = {
    id?: true
  }

  export type PostOutboxMinAggregateInputType = {
    id?: true
    event_type?: true
    published?: true
    created_at?: true
  }

  export type PostOutboxMaxAggregateInputType = {
    id?: true
    event_type?: true
    published?: true
    created_at?: true
  }

  export type PostOutboxCountAggregateInputType = {
    id?: true
    event_type?: true
    payload?: true
    published?: true
    created_at?: true
    _all?: true
  }

  export type PostOutboxAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostOutbox to aggregate.
     */
    where?: PostOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostOutboxes to fetch.
     */
    orderBy?: PostOutboxOrderByWithRelationInput | PostOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostOutboxes
    **/
    _count?: true | PostOutboxCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostOutboxAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostOutboxSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostOutboxMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostOutboxMaxAggregateInputType
  }

  export type GetPostOutboxAggregateType<T extends PostOutboxAggregateArgs> = {
        [P in keyof T & keyof AggregatePostOutbox]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostOutbox[P]>
      : GetScalarType<T[P], AggregatePostOutbox[P]>
  }




  export type PostOutboxGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostOutboxWhereInput
    orderBy?: PostOutboxOrderByWithAggregationInput | PostOutboxOrderByWithAggregationInput[]
    by: PostOutboxScalarFieldEnum[] | PostOutboxScalarFieldEnum
    having?: PostOutboxScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostOutboxCountAggregateInputType | true
    _avg?: PostOutboxAvgAggregateInputType
    _sum?: PostOutboxSumAggregateInputType
    _min?: PostOutboxMinAggregateInputType
    _max?: PostOutboxMaxAggregateInputType
  }

  export type PostOutboxGroupByOutputType = {
    id: bigint
    event_type: string
    payload: JsonValue
    published: boolean
    created_at: Date
    _count: PostOutboxCountAggregateOutputType | null
    _avg: PostOutboxAvgAggregateOutputType | null
    _sum: PostOutboxSumAggregateOutputType | null
    _min: PostOutboxMinAggregateOutputType | null
    _max: PostOutboxMaxAggregateOutputType | null
  }

  type GetPostOutboxGroupByPayload<T extends PostOutboxGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostOutboxGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostOutboxGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostOutboxGroupByOutputType[P]>
            : GetScalarType<T[P], PostOutboxGroupByOutputType[P]>
        }
      >
    >


  export type PostOutboxSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_type?: boolean
    payload?: boolean
    published?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["postOutbox"]>

  export type PostOutboxSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_type?: boolean
    payload?: boolean
    published?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["postOutbox"]>

  export type PostOutboxSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_type?: boolean
    payload?: boolean
    published?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["postOutbox"]>

  export type PostOutboxSelectScalar = {
    id?: boolean
    event_type?: boolean
    payload?: boolean
    published?: boolean
    created_at?: boolean
  }

  export type PostOutboxOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "event_type" | "payload" | "published" | "created_at", ExtArgs["result"]["postOutbox"]>

  export type $PostOutboxPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostOutbox"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      event_type: string
      payload: Prisma.JsonValue
      published: boolean
      created_at: Date
    }, ExtArgs["result"]["postOutbox"]>
    composites: {}
  }

  type PostOutboxGetPayload<S extends boolean | null | undefined | PostOutboxDefaultArgs> = $Result.GetResult<Prisma.$PostOutboxPayload, S>

  type PostOutboxCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostOutboxFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostOutboxCountAggregateInputType | true
    }

  export interface PostOutboxDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostOutbox'], meta: { name: 'PostOutbox' } }
    /**
     * Find zero or one PostOutbox that matches the filter.
     * @param {PostOutboxFindUniqueArgs} args - Arguments to find a PostOutbox
     * @example
     * // Get one PostOutbox
     * const postOutbox = await prisma.postOutbox.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostOutboxFindUniqueArgs>(args: SelectSubset<T, PostOutboxFindUniqueArgs<ExtArgs>>): Prisma__PostOutboxClient<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostOutbox that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostOutboxFindUniqueOrThrowArgs} args - Arguments to find a PostOutbox
     * @example
     * // Get one PostOutbox
     * const postOutbox = await prisma.postOutbox.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostOutboxFindUniqueOrThrowArgs>(args: SelectSubset<T, PostOutboxFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostOutboxClient<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostOutbox that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostOutboxFindFirstArgs} args - Arguments to find a PostOutbox
     * @example
     * // Get one PostOutbox
     * const postOutbox = await prisma.postOutbox.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostOutboxFindFirstArgs>(args?: SelectSubset<T, PostOutboxFindFirstArgs<ExtArgs>>): Prisma__PostOutboxClient<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostOutbox that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostOutboxFindFirstOrThrowArgs} args - Arguments to find a PostOutbox
     * @example
     * // Get one PostOutbox
     * const postOutbox = await prisma.postOutbox.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostOutboxFindFirstOrThrowArgs>(args?: SelectSubset<T, PostOutboxFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostOutboxClient<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostOutboxes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostOutboxFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostOutboxes
     * const postOutboxes = await prisma.postOutbox.findMany()
     * 
     * // Get first 10 PostOutboxes
     * const postOutboxes = await prisma.postOutbox.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postOutboxWithIdOnly = await prisma.postOutbox.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostOutboxFindManyArgs>(args?: SelectSubset<T, PostOutboxFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostOutbox.
     * @param {PostOutboxCreateArgs} args - Arguments to create a PostOutbox.
     * @example
     * // Create one PostOutbox
     * const PostOutbox = await prisma.postOutbox.create({
     *   data: {
     *     // ... data to create a PostOutbox
     *   }
     * })
     * 
     */
    create<T extends PostOutboxCreateArgs>(args: SelectSubset<T, PostOutboxCreateArgs<ExtArgs>>): Prisma__PostOutboxClient<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostOutboxes.
     * @param {PostOutboxCreateManyArgs} args - Arguments to create many PostOutboxes.
     * @example
     * // Create many PostOutboxes
     * const postOutbox = await prisma.postOutbox.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostOutboxCreateManyArgs>(args?: SelectSubset<T, PostOutboxCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostOutboxes and returns the data saved in the database.
     * @param {PostOutboxCreateManyAndReturnArgs} args - Arguments to create many PostOutboxes.
     * @example
     * // Create many PostOutboxes
     * const postOutbox = await prisma.postOutbox.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostOutboxes and only return the `id`
     * const postOutboxWithIdOnly = await prisma.postOutbox.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostOutboxCreateManyAndReturnArgs>(args?: SelectSubset<T, PostOutboxCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostOutbox.
     * @param {PostOutboxDeleteArgs} args - Arguments to delete one PostOutbox.
     * @example
     * // Delete one PostOutbox
     * const PostOutbox = await prisma.postOutbox.delete({
     *   where: {
     *     // ... filter to delete one PostOutbox
     *   }
     * })
     * 
     */
    delete<T extends PostOutboxDeleteArgs>(args: SelectSubset<T, PostOutboxDeleteArgs<ExtArgs>>): Prisma__PostOutboxClient<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostOutbox.
     * @param {PostOutboxUpdateArgs} args - Arguments to update one PostOutbox.
     * @example
     * // Update one PostOutbox
     * const postOutbox = await prisma.postOutbox.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostOutboxUpdateArgs>(args: SelectSubset<T, PostOutboxUpdateArgs<ExtArgs>>): Prisma__PostOutboxClient<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostOutboxes.
     * @param {PostOutboxDeleteManyArgs} args - Arguments to filter PostOutboxes to delete.
     * @example
     * // Delete a few PostOutboxes
     * const { count } = await prisma.postOutbox.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostOutboxDeleteManyArgs>(args?: SelectSubset<T, PostOutboxDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostOutboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostOutboxUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostOutboxes
     * const postOutbox = await prisma.postOutbox.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostOutboxUpdateManyArgs>(args: SelectSubset<T, PostOutboxUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostOutboxes and returns the data updated in the database.
     * @param {PostOutboxUpdateManyAndReturnArgs} args - Arguments to update many PostOutboxes.
     * @example
     * // Update many PostOutboxes
     * const postOutbox = await prisma.postOutbox.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostOutboxes and only return the `id`
     * const postOutboxWithIdOnly = await prisma.postOutbox.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostOutboxUpdateManyAndReturnArgs>(args: SelectSubset<T, PostOutboxUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostOutbox.
     * @param {PostOutboxUpsertArgs} args - Arguments to update or create a PostOutbox.
     * @example
     * // Update or create a PostOutbox
     * const postOutbox = await prisma.postOutbox.upsert({
     *   create: {
     *     // ... data to create a PostOutbox
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostOutbox we want to update
     *   }
     * })
     */
    upsert<T extends PostOutboxUpsertArgs>(args: SelectSubset<T, PostOutboxUpsertArgs<ExtArgs>>): Prisma__PostOutboxClient<$Result.GetResult<Prisma.$PostOutboxPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostOutboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostOutboxCountArgs} args - Arguments to filter PostOutboxes to count.
     * @example
     * // Count the number of PostOutboxes
     * const count = await prisma.postOutbox.count({
     *   where: {
     *     // ... the filter for the PostOutboxes we want to count
     *   }
     * })
    **/
    count<T extends PostOutboxCountArgs>(
      args?: Subset<T, PostOutboxCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostOutboxCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostOutbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostOutboxAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostOutboxAggregateArgs>(args: Subset<T, PostOutboxAggregateArgs>): Prisma.PrismaPromise<GetPostOutboxAggregateType<T>>

    /**
     * Group by PostOutbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostOutboxGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostOutboxGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostOutboxGroupByArgs['orderBy'] }
        : { orderBy?: PostOutboxGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostOutboxGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostOutboxGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostOutbox model
   */
  readonly fields: PostOutboxFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostOutbox.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostOutboxClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostOutbox model
   */
  interface PostOutboxFieldRefs {
    readonly id: FieldRef<"PostOutbox", 'BigInt'>
    readonly event_type: FieldRef<"PostOutbox", 'String'>
    readonly payload: FieldRef<"PostOutbox", 'Json'>
    readonly published: FieldRef<"PostOutbox", 'Boolean'>
    readonly created_at: FieldRef<"PostOutbox", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostOutbox findUnique
   */
  export type PostOutboxFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * Filter, which PostOutbox to fetch.
     */
    where: PostOutboxWhereUniqueInput
  }

  /**
   * PostOutbox findUniqueOrThrow
   */
  export type PostOutboxFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * Filter, which PostOutbox to fetch.
     */
    where: PostOutboxWhereUniqueInput
  }

  /**
   * PostOutbox findFirst
   */
  export type PostOutboxFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * Filter, which PostOutbox to fetch.
     */
    where?: PostOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostOutboxes to fetch.
     */
    orderBy?: PostOutboxOrderByWithRelationInput | PostOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostOutboxes.
     */
    cursor?: PostOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostOutboxes.
     */
    distinct?: PostOutboxScalarFieldEnum | PostOutboxScalarFieldEnum[]
  }

  /**
   * PostOutbox findFirstOrThrow
   */
  export type PostOutboxFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * Filter, which PostOutbox to fetch.
     */
    where?: PostOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostOutboxes to fetch.
     */
    orderBy?: PostOutboxOrderByWithRelationInput | PostOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostOutboxes.
     */
    cursor?: PostOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostOutboxes.
     */
    distinct?: PostOutboxScalarFieldEnum | PostOutboxScalarFieldEnum[]
  }

  /**
   * PostOutbox findMany
   */
  export type PostOutboxFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * Filter, which PostOutboxes to fetch.
     */
    where?: PostOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostOutboxes to fetch.
     */
    orderBy?: PostOutboxOrderByWithRelationInput | PostOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostOutboxes.
     */
    cursor?: PostOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostOutboxes.
     */
    distinct?: PostOutboxScalarFieldEnum | PostOutboxScalarFieldEnum[]
  }

  /**
   * PostOutbox create
   */
  export type PostOutboxCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * The data needed to create a PostOutbox.
     */
    data: XOR<PostOutboxCreateInput, PostOutboxUncheckedCreateInput>
  }

  /**
   * PostOutbox createMany
   */
  export type PostOutboxCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostOutboxes.
     */
    data: PostOutboxCreateManyInput | PostOutboxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostOutbox createManyAndReturn
   */
  export type PostOutboxCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * The data used to create many PostOutboxes.
     */
    data: PostOutboxCreateManyInput | PostOutboxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostOutbox update
   */
  export type PostOutboxUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * The data needed to update a PostOutbox.
     */
    data: XOR<PostOutboxUpdateInput, PostOutboxUncheckedUpdateInput>
    /**
     * Choose, which PostOutbox to update.
     */
    where: PostOutboxWhereUniqueInput
  }

  /**
   * PostOutbox updateMany
   */
  export type PostOutboxUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostOutboxes.
     */
    data: XOR<PostOutboxUpdateManyMutationInput, PostOutboxUncheckedUpdateManyInput>
    /**
     * Filter which PostOutboxes to update
     */
    where?: PostOutboxWhereInput
    /**
     * Limit how many PostOutboxes to update.
     */
    limit?: number
  }

  /**
   * PostOutbox updateManyAndReturn
   */
  export type PostOutboxUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * The data used to update PostOutboxes.
     */
    data: XOR<PostOutboxUpdateManyMutationInput, PostOutboxUncheckedUpdateManyInput>
    /**
     * Filter which PostOutboxes to update
     */
    where?: PostOutboxWhereInput
    /**
     * Limit how many PostOutboxes to update.
     */
    limit?: number
  }

  /**
   * PostOutbox upsert
   */
  export type PostOutboxUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * The filter to search for the PostOutbox to update in case it exists.
     */
    where: PostOutboxWhereUniqueInput
    /**
     * In case the PostOutbox found by the `where` argument doesn't exist, create a new PostOutbox with this data.
     */
    create: XOR<PostOutboxCreateInput, PostOutboxUncheckedCreateInput>
    /**
     * In case the PostOutbox was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostOutboxUpdateInput, PostOutboxUncheckedUpdateInput>
  }

  /**
   * PostOutbox delete
   */
  export type PostOutboxDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
    /**
     * Filter which PostOutbox to delete.
     */
    where: PostOutboxWhereUniqueInput
  }

  /**
   * PostOutbox deleteMany
   */
  export type PostOutboxDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostOutboxes to delete
     */
    where?: PostOutboxWhereInput
    /**
     * Limit how many PostOutboxes to delete.
     */
    limit?: number
  }

  /**
   * PostOutbox without action
   */
  export type PostOutboxDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostOutbox
     */
    select?: PostOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostOutbox
     */
    omit?: PostOutboxOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PostCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    parent_id: 'parent_id',
    is_active: 'is_active',
    sort_order: 'sort_order',
    seo_title: 'seo_title',
    seo_description: 'seo_description',
    seo_keywords: 'seo_keywords',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    group_id: 'group_id'
  };

  export type PostCategoryScalarFieldEnum = (typeof PostCategoryScalarFieldEnum)[keyof typeof PostCategoryScalarFieldEnum]


  export const PostTagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    is_active: 'is_active',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    group_id: 'group_id'
  };

  export type PostTagScalarFieldEnum = (typeof PostTagScalarFieldEnum)[keyof typeof PostTagScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    excerpt: 'excerpt',
    content: 'content',
    image: 'image',
    cover_image: 'cover_image',
    status: 'status',
    post_type: 'post_type',
    video_url: 'video_url',
    audio_url: 'audio_url',
    is_featured: 'is_featured',
    is_pinned: 'is_pinned',
    published_at: 'published_at',
    seo_title: 'seo_title',
    seo_description: 'seo_description',
    seo_keywords: 'seo_keywords',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    group_id: 'group_id'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const PostStatsScalarFieldEnum: {
    post_id: 'post_id',
    view_count: 'view_count',
    updated_at: 'updated_at'
  };

  export type PostStatsScalarFieldEnum = (typeof PostStatsScalarFieldEnum)[keyof typeof PostStatsScalarFieldEnum]


  export const PostDailyStatsScalarFieldEnum: {
    post_id: 'post_id',
    stat_date: 'stat_date',
    view_count: 'view_count',
    updated_at: 'updated_at'
  };

  export type PostDailyStatsScalarFieldEnum = (typeof PostDailyStatsScalarFieldEnum)[keyof typeof PostDailyStatsScalarFieldEnum]


  export const PostPostcategoryScalarFieldEnum: {
    post_id: 'post_id',
    post_category_id: 'post_category_id'
  };

  export type PostPostcategoryScalarFieldEnum = (typeof PostPostcategoryScalarFieldEnum)[keyof typeof PostPostcategoryScalarFieldEnum]


  export const PostPosttagScalarFieldEnum: {
    post_id: 'post_id',
    post_tag_id: 'post_tag_id'
  };

  export type PostPosttagScalarFieldEnum = (typeof PostPosttagScalarFieldEnum)[keyof typeof PostPosttagScalarFieldEnum]


  export const PostCommentScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    post_id: 'post_id',
    parent_id: 'parent_id',
    guest_name: 'guest_name',
    guest_email: 'guest_email',
    content: 'content',
    status: 'status',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PostCommentScalarFieldEnum = (typeof PostCommentScalarFieldEnum)[keyof typeof PostCommentScalarFieldEnum]


  export const PostOutboxScalarFieldEnum: {
    id: 'id',
    event_type: 'event_type',
    payload: 'payload',
    published: 'published',
    created_at: 'created_at'
  };

  export type PostOutboxScalarFieldEnum = (typeof PostOutboxScalarFieldEnum)[keyof typeof PostOutboxScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PostCategoryWhereInput = {
    AND?: PostCategoryWhereInput | PostCategoryWhereInput[]
    OR?: PostCategoryWhereInput[]
    NOT?: PostCategoryWhereInput | PostCategoryWhereInput[]
    id?: BigIntFilter<"PostCategory"> | bigint | number
    name?: StringFilter<"PostCategory"> | string
    slug?: StringFilter<"PostCategory"> | string
    description?: StringNullableFilter<"PostCategory"> | string | null
    parent_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    is_active?: BoolFilter<"PostCategory"> | boolean
    sort_order?: IntFilter<"PostCategory"> | number
    seo_title?: StringNullableFilter<"PostCategory"> | string | null
    seo_description?: StringNullableFilter<"PostCategory"> | string | null
    seo_keywords?: StringNullableFilter<"PostCategory"> | string | null
    created_user_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    created_at?: DateTimeFilter<"PostCategory"> | Date | string
    updated_at?: DateTimeFilter<"PostCategory"> | Date | string
    group_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    parent?: XOR<PostCategoryNullableScalarRelationFilter, PostCategoryWhereInput> | null
    children?: PostCategoryListRelationFilter
    posts?: PostPostcategoryListRelationFilter
  }

  export type PostCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    parent_id?: SortOrderInput | SortOrder
    is_active?: SortOrder
    sort_order?: SortOrder
    seo_title?: SortOrderInput | SortOrder
    seo_description?: SortOrderInput | SortOrder
    seo_keywords?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrderInput | SortOrder
    parent?: PostCategoryOrderByWithRelationInput
    children?: PostCategoryOrderByRelationAggregateInput
    posts?: PostPostcategoryOrderByRelationAggregateInput
  }

  export type PostCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    slug?: string
    AND?: PostCategoryWhereInput | PostCategoryWhereInput[]
    OR?: PostCategoryWhereInput[]
    NOT?: PostCategoryWhereInput | PostCategoryWhereInput[]
    name?: StringFilter<"PostCategory"> | string
    description?: StringNullableFilter<"PostCategory"> | string | null
    parent_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    is_active?: BoolFilter<"PostCategory"> | boolean
    sort_order?: IntFilter<"PostCategory"> | number
    seo_title?: StringNullableFilter<"PostCategory"> | string | null
    seo_description?: StringNullableFilter<"PostCategory"> | string | null
    seo_keywords?: StringNullableFilter<"PostCategory"> | string | null
    created_user_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    created_at?: DateTimeFilter<"PostCategory"> | Date | string
    updated_at?: DateTimeFilter<"PostCategory"> | Date | string
    group_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    parent?: XOR<PostCategoryNullableScalarRelationFilter, PostCategoryWhereInput> | null
    children?: PostCategoryListRelationFilter
    posts?: PostPostcategoryListRelationFilter
  }, "id" | "slug">

  export type PostCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    parent_id?: SortOrderInput | SortOrder
    is_active?: SortOrder
    sort_order?: SortOrder
    seo_title?: SortOrderInput | SortOrder
    seo_description?: SortOrderInput | SortOrder
    seo_keywords?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrderInput | SortOrder
    _count?: PostCategoryCountOrderByAggregateInput
    _avg?: PostCategoryAvgOrderByAggregateInput
    _max?: PostCategoryMaxOrderByAggregateInput
    _min?: PostCategoryMinOrderByAggregateInput
    _sum?: PostCategorySumOrderByAggregateInput
  }

  export type PostCategoryScalarWhereWithAggregatesInput = {
    AND?: PostCategoryScalarWhereWithAggregatesInput | PostCategoryScalarWhereWithAggregatesInput[]
    OR?: PostCategoryScalarWhereWithAggregatesInput[]
    NOT?: PostCategoryScalarWhereWithAggregatesInput | PostCategoryScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"PostCategory"> | bigint | number
    name?: StringWithAggregatesFilter<"PostCategory"> | string
    slug?: StringWithAggregatesFilter<"PostCategory"> | string
    description?: StringNullableWithAggregatesFilter<"PostCategory"> | string | null
    parent_id?: BigIntNullableWithAggregatesFilter<"PostCategory"> | bigint | number | null
    is_active?: BoolWithAggregatesFilter<"PostCategory"> | boolean
    sort_order?: IntWithAggregatesFilter<"PostCategory"> | number
    seo_title?: StringNullableWithAggregatesFilter<"PostCategory"> | string | null
    seo_description?: StringNullableWithAggregatesFilter<"PostCategory"> | string | null
    seo_keywords?: StringNullableWithAggregatesFilter<"PostCategory"> | string | null
    created_user_id?: BigIntNullableWithAggregatesFilter<"PostCategory"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"PostCategory"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"PostCategory"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PostCategory"> | Date | string
    group_id?: BigIntNullableWithAggregatesFilter<"PostCategory"> | bigint | number | null
  }

  export type PostTagWhereInput = {
    AND?: PostTagWhereInput | PostTagWhereInput[]
    OR?: PostTagWhereInput[]
    NOT?: PostTagWhereInput | PostTagWhereInput[]
    id?: BigIntFilter<"PostTag"> | bigint | number
    name?: StringFilter<"PostTag"> | string
    slug?: StringFilter<"PostTag"> | string
    description?: StringNullableFilter<"PostTag"> | string | null
    is_active?: BoolFilter<"PostTag"> | boolean
    created_user_id?: BigIntNullableFilter<"PostTag"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"PostTag"> | bigint | number | null
    created_at?: DateTimeFilter<"PostTag"> | Date | string
    updated_at?: DateTimeFilter<"PostTag"> | Date | string
    group_id?: BigIntNullableFilter<"PostTag"> | bigint | number | null
    posts?: PostPosttagListRelationFilter
  }

  export type PostTagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrderInput | SortOrder
    posts?: PostPosttagOrderByRelationAggregateInput
  }

  export type PostTagWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    slug?: string
    AND?: PostTagWhereInput | PostTagWhereInput[]
    OR?: PostTagWhereInput[]
    NOT?: PostTagWhereInput | PostTagWhereInput[]
    name?: StringFilter<"PostTag"> | string
    description?: StringNullableFilter<"PostTag"> | string | null
    is_active?: BoolFilter<"PostTag"> | boolean
    created_user_id?: BigIntNullableFilter<"PostTag"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"PostTag"> | bigint | number | null
    created_at?: DateTimeFilter<"PostTag"> | Date | string
    updated_at?: DateTimeFilter<"PostTag"> | Date | string
    group_id?: BigIntNullableFilter<"PostTag"> | bigint | number | null
    posts?: PostPosttagListRelationFilter
  }, "id" | "slug">

  export type PostTagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrderInput | SortOrder
    _count?: PostTagCountOrderByAggregateInput
    _avg?: PostTagAvgOrderByAggregateInput
    _max?: PostTagMaxOrderByAggregateInput
    _min?: PostTagMinOrderByAggregateInput
    _sum?: PostTagSumOrderByAggregateInput
  }

  export type PostTagScalarWhereWithAggregatesInput = {
    AND?: PostTagScalarWhereWithAggregatesInput | PostTagScalarWhereWithAggregatesInput[]
    OR?: PostTagScalarWhereWithAggregatesInput[]
    NOT?: PostTagScalarWhereWithAggregatesInput | PostTagScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"PostTag"> | bigint | number
    name?: StringWithAggregatesFilter<"PostTag"> | string
    slug?: StringWithAggregatesFilter<"PostTag"> | string
    description?: StringNullableWithAggregatesFilter<"PostTag"> | string | null
    is_active?: BoolWithAggregatesFilter<"PostTag"> | boolean
    created_user_id?: BigIntNullableWithAggregatesFilter<"PostTag"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"PostTag"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"PostTag"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PostTag"> | Date | string
    group_id?: BigIntNullableWithAggregatesFilter<"PostTag"> | bigint | number | null
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: BigIntFilter<"Post"> | bigint | number
    name?: StringFilter<"Post"> | string
    slug?: StringFilter<"Post"> | string
    excerpt?: StringNullableFilter<"Post"> | string | null
    content?: StringNullableFilter<"Post"> | string | null
    image?: StringNullableFilter<"Post"> | string | null
    cover_image?: StringNullableFilter<"Post"> | string | null
    status?: StringFilter<"Post"> | string
    post_type?: StringFilter<"Post"> | string
    video_url?: StringNullableFilter<"Post"> | string | null
    audio_url?: StringNullableFilter<"Post"> | string | null
    is_featured?: BoolFilter<"Post"> | boolean
    is_pinned?: BoolFilter<"Post"> | boolean
    published_at?: DateTimeNullableFilter<"Post"> | Date | string | null
    seo_title?: StringNullableFilter<"Post"> | string | null
    seo_description?: StringNullableFilter<"Post"> | string | null
    seo_keywords?: StringNullableFilter<"Post"> | string | null
    created_user_id?: BigIntNullableFilter<"Post"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Post"> | bigint | number | null
    created_at?: DateTimeFilter<"Post"> | Date | string
    updated_at?: DateTimeFilter<"Post"> | Date | string
    group_id?: BigIntNullableFilter<"Post"> | bigint | number | null
    stats?: XOR<PostStatsNullableScalarRelationFilter, PostStatsWhereInput> | null
    daily_stats?: PostDailyStatsListRelationFilter
    categoryLinks?: PostPostcategoryListRelationFilter
    tagLinks?: PostPosttagListRelationFilter
    comments?: PostCommentListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    cover_image?: SortOrderInput | SortOrder
    status?: SortOrder
    post_type?: SortOrder
    video_url?: SortOrderInput | SortOrder
    audio_url?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    is_pinned?: SortOrder
    published_at?: SortOrderInput | SortOrder
    seo_title?: SortOrderInput | SortOrder
    seo_description?: SortOrderInput | SortOrder
    seo_keywords?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrderInput | SortOrder
    stats?: PostStatsOrderByWithRelationInput
    daily_stats?: PostDailyStatsOrderByRelationAggregateInput
    categoryLinks?: PostPostcategoryOrderByRelationAggregateInput
    tagLinks?: PostPosttagOrderByRelationAggregateInput
    comments?: PostCommentOrderByRelationAggregateInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    slug?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    name?: StringFilter<"Post"> | string
    excerpt?: StringNullableFilter<"Post"> | string | null
    content?: StringNullableFilter<"Post"> | string | null
    image?: StringNullableFilter<"Post"> | string | null
    cover_image?: StringNullableFilter<"Post"> | string | null
    status?: StringFilter<"Post"> | string
    post_type?: StringFilter<"Post"> | string
    video_url?: StringNullableFilter<"Post"> | string | null
    audio_url?: StringNullableFilter<"Post"> | string | null
    is_featured?: BoolFilter<"Post"> | boolean
    is_pinned?: BoolFilter<"Post"> | boolean
    published_at?: DateTimeNullableFilter<"Post"> | Date | string | null
    seo_title?: StringNullableFilter<"Post"> | string | null
    seo_description?: StringNullableFilter<"Post"> | string | null
    seo_keywords?: StringNullableFilter<"Post"> | string | null
    created_user_id?: BigIntNullableFilter<"Post"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Post"> | bigint | number | null
    created_at?: DateTimeFilter<"Post"> | Date | string
    updated_at?: DateTimeFilter<"Post"> | Date | string
    group_id?: BigIntNullableFilter<"Post"> | bigint | number | null
    stats?: XOR<PostStatsNullableScalarRelationFilter, PostStatsWhereInput> | null
    daily_stats?: PostDailyStatsListRelationFilter
    categoryLinks?: PostPostcategoryListRelationFilter
    tagLinks?: PostPosttagListRelationFilter
    comments?: PostCommentListRelationFilter
  }, "id" | "slug">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    cover_image?: SortOrderInput | SortOrder
    status?: SortOrder
    post_type?: SortOrder
    video_url?: SortOrderInput | SortOrder
    audio_url?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    is_pinned?: SortOrder
    published_at?: SortOrderInput | SortOrder
    seo_title?: SortOrderInput | SortOrder
    seo_description?: SortOrderInput | SortOrder
    seo_keywords?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrderInput | SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Post"> | bigint | number
    name?: StringWithAggregatesFilter<"Post"> | string
    slug?: StringWithAggregatesFilter<"Post"> | string
    excerpt?: StringNullableWithAggregatesFilter<"Post"> | string | null
    content?: StringNullableWithAggregatesFilter<"Post"> | string | null
    image?: StringNullableWithAggregatesFilter<"Post"> | string | null
    cover_image?: StringNullableWithAggregatesFilter<"Post"> | string | null
    status?: StringWithAggregatesFilter<"Post"> | string
    post_type?: StringWithAggregatesFilter<"Post"> | string
    video_url?: StringNullableWithAggregatesFilter<"Post"> | string | null
    audio_url?: StringNullableWithAggregatesFilter<"Post"> | string | null
    is_featured?: BoolWithAggregatesFilter<"Post"> | boolean
    is_pinned?: BoolWithAggregatesFilter<"Post"> | boolean
    published_at?: DateTimeNullableWithAggregatesFilter<"Post"> | Date | string | null
    seo_title?: StringNullableWithAggregatesFilter<"Post"> | string | null
    seo_description?: StringNullableWithAggregatesFilter<"Post"> | string | null
    seo_keywords?: StringNullableWithAggregatesFilter<"Post"> | string | null
    created_user_id?: BigIntNullableWithAggregatesFilter<"Post"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"Post"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    group_id?: BigIntNullableWithAggregatesFilter<"Post"> | bigint | number | null
  }

  export type PostStatsWhereInput = {
    AND?: PostStatsWhereInput | PostStatsWhereInput[]
    OR?: PostStatsWhereInput[]
    NOT?: PostStatsWhereInput | PostStatsWhereInput[]
    post_id?: BigIntFilter<"PostStats"> | bigint | number
    view_count?: BigIntFilter<"PostStats"> | bigint | number
    updated_at?: DateTimeFilter<"PostStats"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }

  export type PostStatsOrderByWithRelationInput = {
    post_id?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
    post?: PostOrderByWithRelationInput
  }

  export type PostStatsWhereUniqueInput = Prisma.AtLeast<{
    post_id?: bigint | number
    AND?: PostStatsWhereInput | PostStatsWhereInput[]
    OR?: PostStatsWhereInput[]
    NOT?: PostStatsWhereInput | PostStatsWhereInput[]
    view_count?: BigIntFilter<"PostStats"> | bigint | number
    updated_at?: DateTimeFilter<"PostStats"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }, "post_id">

  export type PostStatsOrderByWithAggregationInput = {
    post_id?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
    _count?: PostStatsCountOrderByAggregateInput
    _avg?: PostStatsAvgOrderByAggregateInput
    _max?: PostStatsMaxOrderByAggregateInput
    _min?: PostStatsMinOrderByAggregateInput
    _sum?: PostStatsSumOrderByAggregateInput
  }

  export type PostStatsScalarWhereWithAggregatesInput = {
    AND?: PostStatsScalarWhereWithAggregatesInput | PostStatsScalarWhereWithAggregatesInput[]
    OR?: PostStatsScalarWhereWithAggregatesInput[]
    NOT?: PostStatsScalarWhereWithAggregatesInput | PostStatsScalarWhereWithAggregatesInput[]
    post_id?: BigIntWithAggregatesFilter<"PostStats"> | bigint | number
    view_count?: BigIntWithAggregatesFilter<"PostStats"> | bigint | number
    updated_at?: DateTimeWithAggregatesFilter<"PostStats"> | Date | string
  }

  export type PostDailyStatsWhereInput = {
    AND?: PostDailyStatsWhereInput | PostDailyStatsWhereInput[]
    OR?: PostDailyStatsWhereInput[]
    NOT?: PostDailyStatsWhereInput | PostDailyStatsWhereInput[]
    post_id?: BigIntFilter<"PostDailyStats"> | bigint | number
    stat_date?: DateTimeFilter<"PostDailyStats"> | Date | string
    view_count?: BigIntFilter<"PostDailyStats"> | bigint | number
    updated_at?: DateTimeFilter<"PostDailyStats"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }

  export type PostDailyStatsOrderByWithRelationInput = {
    post_id?: SortOrder
    stat_date?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
    post?: PostOrderByWithRelationInput
  }

  export type PostDailyStatsWhereUniqueInput = Prisma.AtLeast<{
    post_id_stat_date?: PostDailyStatsPost_idStat_dateCompoundUniqueInput
    AND?: PostDailyStatsWhereInput | PostDailyStatsWhereInput[]
    OR?: PostDailyStatsWhereInput[]
    NOT?: PostDailyStatsWhereInput | PostDailyStatsWhereInput[]
    post_id?: BigIntFilter<"PostDailyStats"> | bigint | number
    stat_date?: DateTimeFilter<"PostDailyStats"> | Date | string
    view_count?: BigIntFilter<"PostDailyStats"> | bigint | number
    updated_at?: DateTimeFilter<"PostDailyStats"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }, "post_id_stat_date">

  export type PostDailyStatsOrderByWithAggregationInput = {
    post_id?: SortOrder
    stat_date?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
    _count?: PostDailyStatsCountOrderByAggregateInput
    _avg?: PostDailyStatsAvgOrderByAggregateInput
    _max?: PostDailyStatsMaxOrderByAggregateInput
    _min?: PostDailyStatsMinOrderByAggregateInput
    _sum?: PostDailyStatsSumOrderByAggregateInput
  }

  export type PostDailyStatsScalarWhereWithAggregatesInput = {
    AND?: PostDailyStatsScalarWhereWithAggregatesInput | PostDailyStatsScalarWhereWithAggregatesInput[]
    OR?: PostDailyStatsScalarWhereWithAggregatesInput[]
    NOT?: PostDailyStatsScalarWhereWithAggregatesInput | PostDailyStatsScalarWhereWithAggregatesInput[]
    post_id?: BigIntWithAggregatesFilter<"PostDailyStats"> | bigint | number
    stat_date?: DateTimeWithAggregatesFilter<"PostDailyStats"> | Date | string
    view_count?: BigIntWithAggregatesFilter<"PostDailyStats"> | bigint | number
    updated_at?: DateTimeWithAggregatesFilter<"PostDailyStats"> | Date | string
  }

  export type PostPostcategoryWhereInput = {
    AND?: PostPostcategoryWhereInput | PostPostcategoryWhereInput[]
    OR?: PostPostcategoryWhereInput[]
    NOT?: PostPostcategoryWhereInput | PostPostcategoryWhereInput[]
    post_id?: BigIntFilter<"PostPostcategory"> | bigint | number
    post_category_id?: BigIntFilter<"PostPostcategory"> | bigint | number
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    category?: XOR<PostCategoryScalarRelationFilter, PostCategoryWhereInput>
  }

  export type PostPostcategoryOrderByWithRelationInput = {
    post_id?: SortOrder
    post_category_id?: SortOrder
    post?: PostOrderByWithRelationInput
    category?: PostCategoryOrderByWithRelationInput
  }

  export type PostPostcategoryWhereUniqueInput = Prisma.AtLeast<{
    post_id_post_category_id?: PostPostcategoryPost_idPost_category_idCompoundUniqueInput
    AND?: PostPostcategoryWhereInput | PostPostcategoryWhereInput[]
    OR?: PostPostcategoryWhereInput[]
    NOT?: PostPostcategoryWhereInput | PostPostcategoryWhereInput[]
    post_id?: BigIntFilter<"PostPostcategory"> | bigint | number
    post_category_id?: BigIntFilter<"PostPostcategory"> | bigint | number
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    category?: XOR<PostCategoryScalarRelationFilter, PostCategoryWhereInput>
  }, "post_id_post_category_id">

  export type PostPostcategoryOrderByWithAggregationInput = {
    post_id?: SortOrder
    post_category_id?: SortOrder
    _count?: PostPostcategoryCountOrderByAggregateInput
    _avg?: PostPostcategoryAvgOrderByAggregateInput
    _max?: PostPostcategoryMaxOrderByAggregateInput
    _min?: PostPostcategoryMinOrderByAggregateInput
    _sum?: PostPostcategorySumOrderByAggregateInput
  }

  export type PostPostcategoryScalarWhereWithAggregatesInput = {
    AND?: PostPostcategoryScalarWhereWithAggregatesInput | PostPostcategoryScalarWhereWithAggregatesInput[]
    OR?: PostPostcategoryScalarWhereWithAggregatesInput[]
    NOT?: PostPostcategoryScalarWhereWithAggregatesInput | PostPostcategoryScalarWhereWithAggregatesInput[]
    post_id?: BigIntWithAggregatesFilter<"PostPostcategory"> | bigint | number
    post_category_id?: BigIntWithAggregatesFilter<"PostPostcategory"> | bigint | number
  }

  export type PostPosttagWhereInput = {
    AND?: PostPosttagWhereInput | PostPosttagWhereInput[]
    OR?: PostPosttagWhereInput[]
    NOT?: PostPosttagWhereInput | PostPosttagWhereInput[]
    post_id?: BigIntFilter<"PostPosttag"> | bigint | number
    post_tag_id?: BigIntFilter<"PostPosttag"> | bigint | number
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    tag?: XOR<PostTagScalarRelationFilter, PostTagWhereInput>
  }

  export type PostPosttagOrderByWithRelationInput = {
    post_id?: SortOrder
    post_tag_id?: SortOrder
    post?: PostOrderByWithRelationInput
    tag?: PostTagOrderByWithRelationInput
  }

  export type PostPosttagWhereUniqueInput = Prisma.AtLeast<{
    post_id_post_tag_id?: PostPosttagPost_idPost_tag_idCompoundUniqueInput
    AND?: PostPosttagWhereInput | PostPosttagWhereInput[]
    OR?: PostPosttagWhereInput[]
    NOT?: PostPosttagWhereInput | PostPosttagWhereInput[]
    post_id?: BigIntFilter<"PostPosttag"> | bigint | number
    post_tag_id?: BigIntFilter<"PostPosttag"> | bigint | number
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    tag?: XOR<PostTagScalarRelationFilter, PostTagWhereInput>
  }, "post_id_post_tag_id">

  export type PostPosttagOrderByWithAggregationInput = {
    post_id?: SortOrder
    post_tag_id?: SortOrder
    _count?: PostPosttagCountOrderByAggregateInput
    _avg?: PostPosttagAvgOrderByAggregateInput
    _max?: PostPosttagMaxOrderByAggregateInput
    _min?: PostPosttagMinOrderByAggregateInput
    _sum?: PostPosttagSumOrderByAggregateInput
  }

  export type PostPosttagScalarWhereWithAggregatesInput = {
    AND?: PostPosttagScalarWhereWithAggregatesInput | PostPosttagScalarWhereWithAggregatesInput[]
    OR?: PostPosttagScalarWhereWithAggregatesInput[]
    NOT?: PostPosttagScalarWhereWithAggregatesInput | PostPosttagScalarWhereWithAggregatesInput[]
    post_id?: BigIntWithAggregatesFilter<"PostPosttag"> | bigint | number
    post_tag_id?: BigIntWithAggregatesFilter<"PostPosttag"> | bigint | number
  }

  export type PostCommentWhereInput = {
    AND?: PostCommentWhereInput | PostCommentWhereInput[]
    OR?: PostCommentWhereInput[]
    NOT?: PostCommentWhereInput | PostCommentWhereInput[]
    id?: BigIntFilter<"PostComment"> | bigint | number
    user_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    post_id?: BigIntFilter<"PostComment"> | bigint | number
    parent_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    guest_name?: StringNullableFilter<"PostComment"> | string | null
    guest_email?: StringNullableFilter<"PostComment"> | string | null
    content?: StringFilter<"PostComment"> | string
    status?: StringFilter<"PostComment"> | string
    created_user_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    created_at?: DateTimeFilter<"PostComment"> | Date | string
    updated_at?: DateTimeFilter<"PostComment"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    parent?: XOR<PostCommentNullableScalarRelationFilter, PostCommentWhereInput> | null
    replies?: PostCommentListRelationFilter
  }

  export type PostCommentOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    post_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    guest_name?: SortOrderInput | SortOrder
    guest_email?: SortOrderInput | SortOrder
    content?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    post?: PostOrderByWithRelationInput
    parent?: PostCommentOrderByWithRelationInput
    replies?: PostCommentOrderByRelationAggregateInput
  }

  export type PostCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: PostCommentWhereInput | PostCommentWhereInput[]
    OR?: PostCommentWhereInput[]
    NOT?: PostCommentWhereInput | PostCommentWhereInput[]
    user_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    post_id?: BigIntFilter<"PostComment"> | bigint | number
    parent_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    guest_name?: StringNullableFilter<"PostComment"> | string | null
    guest_email?: StringNullableFilter<"PostComment"> | string | null
    content?: StringFilter<"PostComment"> | string
    status?: StringFilter<"PostComment"> | string
    created_user_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    created_at?: DateTimeFilter<"PostComment"> | Date | string
    updated_at?: DateTimeFilter<"PostComment"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    parent?: XOR<PostCommentNullableScalarRelationFilter, PostCommentWhereInput> | null
    replies?: PostCommentListRelationFilter
  }, "id">

  export type PostCommentOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    post_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    guest_name?: SortOrderInput | SortOrder
    guest_email?: SortOrderInput | SortOrder
    content?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PostCommentCountOrderByAggregateInput
    _avg?: PostCommentAvgOrderByAggregateInput
    _max?: PostCommentMaxOrderByAggregateInput
    _min?: PostCommentMinOrderByAggregateInput
    _sum?: PostCommentSumOrderByAggregateInput
  }

  export type PostCommentScalarWhereWithAggregatesInput = {
    AND?: PostCommentScalarWhereWithAggregatesInput | PostCommentScalarWhereWithAggregatesInput[]
    OR?: PostCommentScalarWhereWithAggregatesInput[]
    NOT?: PostCommentScalarWhereWithAggregatesInput | PostCommentScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"PostComment"> | bigint | number
    user_id?: BigIntNullableWithAggregatesFilter<"PostComment"> | bigint | number | null
    post_id?: BigIntWithAggregatesFilter<"PostComment"> | bigint | number
    parent_id?: BigIntNullableWithAggregatesFilter<"PostComment"> | bigint | number | null
    guest_name?: StringNullableWithAggregatesFilter<"PostComment"> | string | null
    guest_email?: StringNullableWithAggregatesFilter<"PostComment"> | string | null
    content?: StringWithAggregatesFilter<"PostComment"> | string
    status?: StringWithAggregatesFilter<"PostComment"> | string
    created_user_id?: BigIntNullableWithAggregatesFilter<"PostComment"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"PostComment"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"PostComment"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PostComment"> | Date | string
  }

  export type PostOutboxWhereInput = {
    AND?: PostOutboxWhereInput | PostOutboxWhereInput[]
    OR?: PostOutboxWhereInput[]
    NOT?: PostOutboxWhereInput | PostOutboxWhereInput[]
    id?: BigIntFilter<"PostOutbox"> | bigint | number
    event_type?: StringFilter<"PostOutbox"> | string
    payload?: JsonFilter<"PostOutbox">
    published?: BoolFilter<"PostOutbox"> | boolean
    created_at?: DateTimeFilter<"PostOutbox"> | Date | string
  }

  export type PostOutboxOrderByWithRelationInput = {
    id?: SortOrder
    event_type?: SortOrder
    payload?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
  }

  export type PostOutboxWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: PostOutboxWhereInput | PostOutboxWhereInput[]
    OR?: PostOutboxWhereInput[]
    NOT?: PostOutboxWhereInput | PostOutboxWhereInput[]
    event_type?: StringFilter<"PostOutbox"> | string
    payload?: JsonFilter<"PostOutbox">
    published?: BoolFilter<"PostOutbox"> | boolean
    created_at?: DateTimeFilter<"PostOutbox"> | Date | string
  }, "id">

  export type PostOutboxOrderByWithAggregationInput = {
    id?: SortOrder
    event_type?: SortOrder
    payload?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
    _count?: PostOutboxCountOrderByAggregateInput
    _avg?: PostOutboxAvgOrderByAggregateInput
    _max?: PostOutboxMaxOrderByAggregateInput
    _min?: PostOutboxMinOrderByAggregateInput
    _sum?: PostOutboxSumOrderByAggregateInput
  }

  export type PostOutboxScalarWhereWithAggregatesInput = {
    AND?: PostOutboxScalarWhereWithAggregatesInput | PostOutboxScalarWhereWithAggregatesInput[]
    OR?: PostOutboxScalarWhereWithAggregatesInput[]
    NOT?: PostOutboxScalarWhereWithAggregatesInput | PostOutboxScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"PostOutbox"> | bigint | number
    event_type?: StringWithAggregatesFilter<"PostOutbox"> | string
    payload?: JsonWithAggregatesFilter<"PostOutbox">
    published?: BoolWithAggregatesFilter<"PostOutbox"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"PostOutbox"> | Date | string
  }

  export type PostCategoryCreateInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    parent?: PostCategoryCreateNestedOneWithoutChildrenInput
    children?: PostCategoryCreateNestedManyWithoutParentInput
    posts?: PostPostcategoryCreateNestedManyWithoutCategoryInput
  }

  export type PostCategoryUncheckedCreateInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    parent_id?: bigint | number | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    children?: PostCategoryUncheckedCreateNestedManyWithoutParentInput
    posts?: PostPostcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type PostCategoryUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    parent?: PostCategoryUpdateOneWithoutChildrenNestedInput
    children?: PostCategoryUpdateManyWithoutParentNestedInput
    posts?: PostPostcategoryUpdateManyWithoutCategoryNestedInput
  }

  export type PostCategoryUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    children?: PostCategoryUncheckedUpdateManyWithoutParentNestedInput
    posts?: PostPostcategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type PostCategoryCreateManyInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    parent_id?: bigint | number | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
  }

  export type PostCategoryUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type PostCategoryUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type PostTagCreateInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    posts?: PostPosttagCreateNestedManyWithoutTagInput
  }

  export type PostTagUncheckedCreateInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    posts?: PostPosttagUncheckedCreateNestedManyWithoutTagInput
  }

  export type PostTagUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    posts?: PostPosttagUpdateManyWithoutTagNestedInput
  }

  export type PostTagUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    posts?: PostPosttagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type PostTagCreateManyInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
  }

  export type PostTagUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type PostTagUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type PostCreateInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsCreateNestedOneWithoutPostInput
    daily_stats?: PostDailyStatsCreateNestedManyWithoutPostInput
    categoryLinks?: PostPostcategoryCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagCreateNestedManyWithoutPostInput
    comments?: PostCommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsUncheckedCreateNestedOneWithoutPostInput
    daily_stats?: PostDailyStatsUncheckedCreateNestedManyWithoutPostInput
    categoryLinks?: PostPostcategoryUncheckedCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagUncheckedCreateNestedManyWithoutPostInput
    comments?: PostCommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUpdateOneWithoutPostNestedInput
    daily_stats?: PostDailyStatsUpdateManyWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUpdateManyWithoutPostNestedInput
    comments?: PostCommentUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUncheckedUpdateOneWithoutPostNestedInput
    daily_stats?: PostDailyStatsUncheckedUpdateManyWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUncheckedUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUncheckedUpdateManyWithoutPostNestedInput
    comments?: PostCommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
  }

  export type PostUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type PostUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type PostStatsCreateInput = {
    view_count?: bigint | number
    updated_at?: Date | string
    post: PostCreateNestedOneWithoutStatsInput
  }

  export type PostStatsUncheckedCreateInput = {
    post_id: bigint | number
    view_count?: bigint | number
    updated_at?: Date | string
  }

  export type PostStatsUpdateInput = {
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutStatsNestedInput
  }

  export type PostStatsUncheckedUpdateInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostStatsCreateManyInput = {
    post_id: bigint | number
    view_count?: bigint | number
    updated_at?: Date | string
  }

  export type PostStatsUpdateManyMutationInput = {
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostStatsUncheckedUpdateManyInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostDailyStatsCreateInput = {
    stat_date: Date | string
    view_count?: bigint | number
    updated_at?: Date | string
    post: PostCreateNestedOneWithoutDaily_statsInput
  }

  export type PostDailyStatsUncheckedCreateInput = {
    post_id: bigint | number
    stat_date: Date | string
    view_count?: bigint | number
    updated_at?: Date | string
  }

  export type PostDailyStatsUpdateInput = {
    stat_date?: DateTimeFieldUpdateOperationsInput | Date | string
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutDaily_statsNestedInput
  }

  export type PostDailyStatsUncheckedUpdateInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    stat_date?: DateTimeFieldUpdateOperationsInput | Date | string
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostDailyStatsCreateManyInput = {
    post_id: bigint | number
    stat_date: Date | string
    view_count?: bigint | number
    updated_at?: Date | string
  }

  export type PostDailyStatsUpdateManyMutationInput = {
    stat_date?: DateTimeFieldUpdateOperationsInput | Date | string
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostDailyStatsUncheckedUpdateManyInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    stat_date?: DateTimeFieldUpdateOperationsInput | Date | string
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPostcategoryCreateInput = {
    post: PostCreateNestedOneWithoutCategoryLinksInput
    category: PostCategoryCreateNestedOneWithoutPostsInput
  }

  export type PostPostcategoryUncheckedCreateInput = {
    post_id: bigint | number
    post_category_id: bigint | number
  }

  export type PostPostcategoryUpdateInput = {
    post?: PostUpdateOneRequiredWithoutCategoryLinksNestedInput
    category?: PostCategoryUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostPostcategoryUncheckedUpdateInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    post_category_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostPostcategoryCreateManyInput = {
    post_id: bigint | number
    post_category_id: bigint | number
  }

  export type PostPostcategoryUpdateManyMutationInput = {

  }

  export type PostPostcategoryUncheckedUpdateManyInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    post_category_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostPosttagCreateInput = {
    post: PostCreateNestedOneWithoutTagLinksInput
    tag: PostTagCreateNestedOneWithoutPostsInput
  }

  export type PostPosttagUncheckedCreateInput = {
    post_id: bigint | number
    post_tag_id: bigint | number
  }

  export type PostPosttagUpdateInput = {
    post?: PostUpdateOneRequiredWithoutTagLinksNestedInput
    tag?: PostTagUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostPosttagUncheckedUpdateInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    post_tag_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostPosttagCreateManyInput = {
    post_id: bigint | number
    post_tag_id: bigint | number
  }

  export type PostPosttagUpdateManyMutationInput = {

  }

  export type PostPosttagUncheckedUpdateManyInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    post_tag_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostCommentCreateInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
    parent?: PostCommentCreateNestedOneWithoutRepliesInput
    replies?: PostCommentCreateNestedManyWithoutParentInput
  }

  export type PostCommentUncheckedCreateInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    post_id: bigint | number
    parent_id?: bigint | number | null
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    replies?: PostCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type PostCommentUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
    parent?: PostCommentUpdateOneWithoutRepliesNestedInput
    replies?: PostCommentUpdateManyWithoutParentNestedInput
  }

  export type PostCommentUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: PostCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type PostCommentCreateManyInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    post_id: bigint | number
    parent_id?: bigint | number | null
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PostCommentUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCommentUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostOutboxCreateInput = {
    id?: bigint | number
    event_type: string
    payload: JsonNullValueInput | InputJsonValue
    published?: boolean
    created_at?: Date | string
  }

  export type PostOutboxUncheckedCreateInput = {
    id?: bigint | number
    event_type: string
    payload: JsonNullValueInput | InputJsonValue
    published?: boolean
    created_at?: Date | string
  }

  export type PostOutboxUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostOutboxUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostOutboxCreateManyInput = {
    id?: bigint | number
    event_type: string
    payload: JsonNullValueInput | InputJsonValue
    published?: boolean
    created_at?: Date | string
  }

  export type PostOutboxUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostOutboxUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PostCategoryNullableScalarRelationFilter = {
    is?: PostCategoryWhereInput | null
    isNot?: PostCategoryWhereInput | null
  }

  export type PostCategoryListRelationFilter = {
    every?: PostCategoryWhereInput
    some?: PostCategoryWhereInput
    none?: PostCategoryWhereInput
  }

  export type PostPostcategoryListRelationFilter = {
    every?: PostPostcategoryWhereInput
    some?: PostPostcategoryWhereInput
    none?: PostPostcategoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostPostcategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    parent_id?: SortOrder
    is_active?: SortOrder
    sort_order?: SortOrder
    seo_title?: SortOrder
    seo_description?: SortOrder
    seo_keywords?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrder
  }

  export type PostCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
    sort_order?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    group_id?: SortOrder
  }

  export type PostCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    parent_id?: SortOrder
    is_active?: SortOrder
    sort_order?: SortOrder
    seo_title?: SortOrder
    seo_description?: SortOrder
    seo_keywords?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrder
  }

  export type PostCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    parent_id?: SortOrder
    is_active?: SortOrder
    sort_order?: SortOrder
    seo_title?: SortOrder
    seo_description?: SortOrder
    seo_keywords?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrder
  }

  export type PostCategorySumOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
    sort_order?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    group_id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PostPosttagListRelationFilter = {
    every?: PostPosttagWhereInput
    some?: PostPosttagWhereInput
    none?: PostPosttagWhereInput
  }

  export type PostPosttagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostTagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    is_active?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrder
  }

  export type PostTagAvgOrderByAggregateInput = {
    id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    group_id?: SortOrder
  }

  export type PostTagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    is_active?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrder
  }

  export type PostTagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    is_active?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrder
  }

  export type PostTagSumOrderByAggregateInput = {
    id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    group_id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PostStatsNullableScalarRelationFilter = {
    is?: PostStatsWhereInput | null
    isNot?: PostStatsWhereInput | null
  }

  export type PostDailyStatsListRelationFilter = {
    every?: PostDailyStatsWhereInput
    some?: PostDailyStatsWhereInput
    none?: PostDailyStatsWhereInput
  }

  export type PostCommentListRelationFilter = {
    every?: PostCommentWhereInput
    some?: PostCommentWhereInput
    none?: PostCommentWhereInput
  }

  export type PostDailyStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    image?: SortOrder
    cover_image?: SortOrder
    status?: SortOrder
    post_type?: SortOrder
    video_url?: SortOrder
    audio_url?: SortOrder
    is_featured?: SortOrder
    is_pinned?: SortOrder
    published_at?: SortOrder
    seo_title?: SortOrder
    seo_description?: SortOrder
    seo_keywords?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    group_id?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    image?: SortOrder
    cover_image?: SortOrder
    status?: SortOrder
    post_type?: SortOrder
    video_url?: SortOrder
    audio_url?: SortOrder
    is_featured?: SortOrder
    is_pinned?: SortOrder
    published_at?: SortOrder
    seo_title?: SortOrder
    seo_description?: SortOrder
    seo_keywords?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    image?: SortOrder
    cover_image?: SortOrder
    status?: SortOrder
    post_type?: SortOrder
    video_url?: SortOrder
    audio_url?: SortOrder
    is_featured?: SortOrder
    is_pinned?: SortOrder
    published_at?: SortOrder
    seo_title?: SortOrder
    seo_description?: SortOrder
    seo_keywords?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group_id?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    group_id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type PostStatsCountOrderByAggregateInput = {
    post_id?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
  }

  export type PostStatsAvgOrderByAggregateInput = {
    post_id?: SortOrder
    view_count?: SortOrder
  }

  export type PostStatsMaxOrderByAggregateInput = {
    post_id?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
  }

  export type PostStatsMinOrderByAggregateInput = {
    post_id?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
  }

  export type PostStatsSumOrderByAggregateInput = {
    post_id?: SortOrder
    view_count?: SortOrder
  }

  export type PostDailyStatsPost_idStat_dateCompoundUniqueInput = {
    post_id: bigint | number
    stat_date: Date | string
  }

  export type PostDailyStatsCountOrderByAggregateInput = {
    post_id?: SortOrder
    stat_date?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
  }

  export type PostDailyStatsAvgOrderByAggregateInput = {
    post_id?: SortOrder
    view_count?: SortOrder
  }

  export type PostDailyStatsMaxOrderByAggregateInput = {
    post_id?: SortOrder
    stat_date?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
  }

  export type PostDailyStatsMinOrderByAggregateInput = {
    post_id?: SortOrder
    stat_date?: SortOrder
    view_count?: SortOrder
    updated_at?: SortOrder
  }

  export type PostDailyStatsSumOrderByAggregateInput = {
    post_id?: SortOrder
    view_count?: SortOrder
  }

  export type PostCategoryScalarRelationFilter = {
    is?: PostCategoryWhereInput
    isNot?: PostCategoryWhereInput
  }

  export type PostPostcategoryPost_idPost_category_idCompoundUniqueInput = {
    post_id: bigint | number
    post_category_id: bigint | number
  }

  export type PostPostcategoryCountOrderByAggregateInput = {
    post_id?: SortOrder
    post_category_id?: SortOrder
  }

  export type PostPostcategoryAvgOrderByAggregateInput = {
    post_id?: SortOrder
    post_category_id?: SortOrder
  }

  export type PostPostcategoryMaxOrderByAggregateInput = {
    post_id?: SortOrder
    post_category_id?: SortOrder
  }

  export type PostPostcategoryMinOrderByAggregateInput = {
    post_id?: SortOrder
    post_category_id?: SortOrder
  }

  export type PostPostcategorySumOrderByAggregateInput = {
    post_id?: SortOrder
    post_category_id?: SortOrder
  }

  export type PostTagScalarRelationFilter = {
    is?: PostTagWhereInput
    isNot?: PostTagWhereInput
  }

  export type PostPosttagPost_idPost_tag_idCompoundUniqueInput = {
    post_id: bigint | number
    post_tag_id: bigint | number
  }

  export type PostPosttagCountOrderByAggregateInput = {
    post_id?: SortOrder
    post_tag_id?: SortOrder
  }

  export type PostPosttagAvgOrderByAggregateInput = {
    post_id?: SortOrder
    post_tag_id?: SortOrder
  }

  export type PostPosttagMaxOrderByAggregateInput = {
    post_id?: SortOrder
    post_tag_id?: SortOrder
  }

  export type PostPosttagMinOrderByAggregateInput = {
    post_id?: SortOrder
    post_tag_id?: SortOrder
  }

  export type PostPosttagSumOrderByAggregateInput = {
    post_id?: SortOrder
    post_tag_id?: SortOrder
  }

  export type PostCommentNullableScalarRelationFilter = {
    is?: PostCommentWhereInput | null
    isNot?: PostCommentWhereInput | null
  }

  export type PostCommentCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    post_id?: SortOrder
    parent_id?: SortOrder
    guest_name?: SortOrder
    guest_email?: SortOrder
    content?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PostCommentAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    post_id?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type PostCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    post_id?: SortOrder
    parent_id?: SortOrder
    guest_name?: SortOrder
    guest_email?: SortOrder
    content?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PostCommentMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    post_id?: SortOrder
    parent_id?: SortOrder
    guest_name?: SortOrder
    guest_email?: SortOrder
    content?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PostCommentSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    post_id?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PostOutboxCountOrderByAggregateInput = {
    id?: SortOrder
    event_type?: SortOrder
    payload?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
  }

  export type PostOutboxAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PostOutboxMaxOrderByAggregateInput = {
    id?: SortOrder
    event_type?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
  }

  export type PostOutboxMinOrderByAggregateInput = {
    id?: SortOrder
    event_type?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
  }

  export type PostOutboxSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type PostCategoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<PostCategoryCreateWithoutChildrenInput, PostCategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: PostCategoryCreateOrConnectWithoutChildrenInput
    connect?: PostCategoryWhereUniqueInput
  }

  export type PostCategoryCreateNestedManyWithoutParentInput = {
    create?: XOR<PostCategoryCreateWithoutParentInput, PostCategoryUncheckedCreateWithoutParentInput> | PostCategoryCreateWithoutParentInput[] | PostCategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PostCategoryCreateOrConnectWithoutParentInput | PostCategoryCreateOrConnectWithoutParentInput[]
    createMany?: PostCategoryCreateManyParentInputEnvelope
    connect?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
  }

  export type PostPostcategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<PostPostcategoryCreateWithoutCategoryInput, PostPostcategoryUncheckedCreateWithoutCategoryInput> | PostPostcategoryCreateWithoutCategoryInput[] | PostPostcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PostPostcategoryCreateOrConnectWithoutCategoryInput | PostPostcategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: PostPostcategoryCreateManyCategoryInputEnvelope
    connect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
  }

  export type PostCategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<PostCategoryCreateWithoutParentInput, PostCategoryUncheckedCreateWithoutParentInput> | PostCategoryCreateWithoutParentInput[] | PostCategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PostCategoryCreateOrConnectWithoutParentInput | PostCategoryCreateOrConnectWithoutParentInput[]
    createMany?: PostCategoryCreateManyParentInputEnvelope
    connect?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
  }

  export type PostPostcategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<PostPostcategoryCreateWithoutCategoryInput, PostPostcategoryUncheckedCreateWithoutCategoryInput> | PostPostcategoryCreateWithoutCategoryInput[] | PostPostcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PostPostcategoryCreateOrConnectWithoutCategoryInput | PostPostcategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: PostPostcategoryCreateManyCategoryInputEnvelope
    connect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PostCategoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<PostCategoryCreateWithoutChildrenInput, PostCategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: PostCategoryCreateOrConnectWithoutChildrenInput
    upsert?: PostCategoryUpsertWithoutChildrenInput
    disconnect?: PostCategoryWhereInput | boolean
    delete?: PostCategoryWhereInput | boolean
    connect?: PostCategoryWhereUniqueInput
    update?: XOR<XOR<PostCategoryUpdateToOneWithWhereWithoutChildrenInput, PostCategoryUpdateWithoutChildrenInput>, PostCategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type PostCategoryUpdateManyWithoutParentNestedInput = {
    create?: XOR<PostCategoryCreateWithoutParentInput, PostCategoryUncheckedCreateWithoutParentInput> | PostCategoryCreateWithoutParentInput[] | PostCategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PostCategoryCreateOrConnectWithoutParentInput | PostCategoryCreateOrConnectWithoutParentInput[]
    upsert?: PostCategoryUpsertWithWhereUniqueWithoutParentInput | PostCategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PostCategoryCreateManyParentInputEnvelope
    set?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
    disconnect?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
    delete?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
    connect?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
    update?: PostCategoryUpdateWithWhereUniqueWithoutParentInput | PostCategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PostCategoryUpdateManyWithWhereWithoutParentInput | PostCategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PostCategoryScalarWhereInput | PostCategoryScalarWhereInput[]
  }

  export type PostPostcategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<PostPostcategoryCreateWithoutCategoryInput, PostPostcategoryUncheckedCreateWithoutCategoryInput> | PostPostcategoryCreateWithoutCategoryInput[] | PostPostcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PostPostcategoryCreateOrConnectWithoutCategoryInput | PostPostcategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: PostPostcategoryUpsertWithWhereUniqueWithoutCategoryInput | PostPostcategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: PostPostcategoryCreateManyCategoryInputEnvelope
    set?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    disconnect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    delete?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    connect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    update?: PostPostcategoryUpdateWithWhereUniqueWithoutCategoryInput | PostPostcategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: PostPostcategoryUpdateManyWithWhereWithoutCategoryInput | PostPostcategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: PostPostcategoryScalarWhereInput | PostPostcategoryScalarWhereInput[]
  }

  export type PostCategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<PostCategoryCreateWithoutParentInput, PostCategoryUncheckedCreateWithoutParentInput> | PostCategoryCreateWithoutParentInput[] | PostCategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PostCategoryCreateOrConnectWithoutParentInput | PostCategoryCreateOrConnectWithoutParentInput[]
    upsert?: PostCategoryUpsertWithWhereUniqueWithoutParentInput | PostCategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PostCategoryCreateManyParentInputEnvelope
    set?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
    disconnect?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
    delete?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
    connect?: PostCategoryWhereUniqueInput | PostCategoryWhereUniqueInput[]
    update?: PostCategoryUpdateWithWhereUniqueWithoutParentInput | PostCategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PostCategoryUpdateManyWithWhereWithoutParentInput | PostCategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PostCategoryScalarWhereInput | PostCategoryScalarWhereInput[]
  }

  export type PostPostcategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<PostPostcategoryCreateWithoutCategoryInput, PostPostcategoryUncheckedCreateWithoutCategoryInput> | PostPostcategoryCreateWithoutCategoryInput[] | PostPostcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PostPostcategoryCreateOrConnectWithoutCategoryInput | PostPostcategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: PostPostcategoryUpsertWithWhereUniqueWithoutCategoryInput | PostPostcategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: PostPostcategoryCreateManyCategoryInputEnvelope
    set?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    disconnect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    delete?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    connect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    update?: PostPostcategoryUpdateWithWhereUniqueWithoutCategoryInput | PostPostcategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: PostPostcategoryUpdateManyWithWhereWithoutCategoryInput | PostPostcategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: PostPostcategoryScalarWhereInput | PostPostcategoryScalarWhereInput[]
  }

  export type PostPosttagCreateNestedManyWithoutTagInput = {
    create?: XOR<PostPosttagCreateWithoutTagInput, PostPosttagUncheckedCreateWithoutTagInput> | PostPosttagCreateWithoutTagInput[] | PostPosttagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostPosttagCreateOrConnectWithoutTagInput | PostPosttagCreateOrConnectWithoutTagInput[]
    createMany?: PostPosttagCreateManyTagInputEnvelope
    connect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
  }

  export type PostPosttagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<PostPosttagCreateWithoutTagInput, PostPosttagUncheckedCreateWithoutTagInput> | PostPosttagCreateWithoutTagInput[] | PostPosttagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostPosttagCreateOrConnectWithoutTagInput | PostPosttagCreateOrConnectWithoutTagInput[]
    createMany?: PostPosttagCreateManyTagInputEnvelope
    connect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
  }

  export type PostPosttagUpdateManyWithoutTagNestedInput = {
    create?: XOR<PostPosttagCreateWithoutTagInput, PostPosttagUncheckedCreateWithoutTagInput> | PostPosttagCreateWithoutTagInput[] | PostPosttagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostPosttagCreateOrConnectWithoutTagInput | PostPosttagCreateOrConnectWithoutTagInput[]
    upsert?: PostPosttagUpsertWithWhereUniqueWithoutTagInput | PostPosttagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: PostPosttagCreateManyTagInputEnvelope
    set?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    disconnect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    delete?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    connect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    update?: PostPosttagUpdateWithWhereUniqueWithoutTagInput | PostPosttagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: PostPosttagUpdateManyWithWhereWithoutTagInput | PostPosttagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: PostPosttagScalarWhereInput | PostPosttagScalarWhereInput[]
  }

  export type PostPosttagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<PostPosttagCreateWithoutTagInput, PostPosttagUncheckedCreateWithoutTagInput> | PostPosttagCreateWithoutTagInput[] | PostPosttagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostPosttagCreateOrConnectWithoutTagInput | PostPosttagCreateOrConnectWithoutTagInput[]
    upsert?: PostPosttagUpsertWithWhereUniqueWithoutTagInput | PostPosttagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: PostPosttagCreateManyTagInputEnvelope
    set?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    disconnect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    delete?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    connect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    update?: PostPosttagUpdateWithWhereUniqueWithoutTagInput | PostPosttagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: PostPosttagUpdateManyWithWhereWithoutTagInput | PostPosttagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: PostPosttagScalarWhereInput | PostPosttagScalarWhereInput[]
  }

  export type PostStatsCreateNestedOneWithoutPostInput = {
    create?: XOR<PostStatsCreateWithoutPostInput, PostStatsUncheckedCreateWithoutPostInput>
    connectOrCreate?: PostStatsCreateOrConnectWithoutPostInput
    connect?: PostStatsWhereUniqueInput
  }

  export type PostDailyStatsCreateNestedManyWithoutPostInput = {
    create?: XOR<PostDailyStatsCreateWithoutPostInput, PostDailyStatsUncheckedCreateWithoutPostInput> | PostDailyStatsCreateWithoutPostInput[] | PostDailyStatsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostDailyStatsCreateOrConnectWithoutPostInput | PostDailyStatsCreateOrConnectWithoutPostInput[]
    createMany?: PostDailyStatsCreateManyPostInputEnvelope
    connect?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
  }

  export type PostPostcategoryCreateNestedManyWithoutPostInput = {
    create?: XOR<PostPostcategoryCreateWithoutPostInput, PostPostcategoryUncheckedCreateWithoutPostInput> | PostPostcategoryCreateWithoutPostInput[] | PostPostcategoryUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPostcategoryCreateOrConnectWithoutPostInput | PostPostcategoryCreateOrConnectWithoutPostInput[]
    createMany?: PostPostcategoryCreateManyPostInputEnvelope
    connect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
  }

  export type PostPosttagCreateNestedManyWithoutPostInput = {
    create?: XOR<PostPosttagCreateWithoutPostInput, PostPosttagUncheckedCreateWithoutPostInput> | PostPosttagCreateWithoutPostInput[] | PostPosttagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPosttagCreateOrConnectWithoutPostInput | PostPosttagCreateOrConnectWithoutPostInput[]
    createMany?: PostPosttagCreateManyPostInputEnvelope
    connect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
  }

  export type PostCommentCreateNestedManyWithoutPostInput = {
    create?: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput> | PostCommentCreateWithoutPostInput[] | PostCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutPostInput | PostCommentCreateOrConnectWithoutPostInput[]
    createMany?: PostCommentCreateManyPostInputEnvelope
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
  }

  export type PostStatsUncheckedCreateNestedOneWithoutPostInput = {
    create?: XOR<PostStatsCreateWithoutPostInput, PostStatsUncheckedCreateWithoutPostInput>
    connectOrCreate?: PostStatsCreateOrConnectWithoutPostInput
    connect?: PostStatsWhereUniqueInput
  }

  export type PostDailyStatsUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostDailyStatsCreateWithoutPostInput, PostDailyStatsUncheckedCreateWithoutPostInput> | PostDailyStatsCreateWithoutPostInput[] | PostDailyStatsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostDailyStatsCreateOrConnectWithoutPostInput | PostDailyStatsCreateOrConnectWithoutPostInput[]
    createMany?: PostDailyStatsCreateManyPostInputEnvelope
    connect?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
  }

  export type PostPostcategoryUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostPostcategoryCreateWithoutPostInput, PostPostcategoryUncheckedCreateWithoutPostInput> | PostPostcategoryCreateWithoutPostInput[] | PostPostcategoryUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPostcategoryCreateOrConnectWithoutPostInput | PostPostcategoryCreateOrConnectWithoutPostInput[]
    createMany?: PostPostcategoryCreateManyPostInputEnvelope
    connect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
  }

  export type PostPosttagUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostPosttagCreateWithoutPostInput, PostPosttagUncheckedCreateWithoutPostInput> | PostPosttagCreateWithoutPostInput[] | PostPosttagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPosttagCreateOrConnectWithoutPostInput | PostPosttagCreateOrConnectWithoutPostInput[]
    createMany?: PostPosttagCreateManyPostInputEnvelope
    connect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
  }

  export type PostCommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput> | PostCommentCreateWithoutPostInput[] | PostCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutPostInput | PostCommentCreateOrConnectWithoutPostInput[]
    createMany?: PostCommentCreateManyPostInputEnvelope
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PostStatsUpdateOneWithoutPostNestedInput = {
    create?: XOR<PostStatsCreateWithoutPostInput, PostStatsUncheckedCreateWithoutPostInput>
    connectOrCreate?: PostStatsCreateOrConnectWithoutPostInput
    upsert?: PostStatsUpsertWithoutPostInput
    disconnect?: PostStatsWhereInput | boolean
    delete?: PostStatsWhereInput | boolean
    connect?: PostStatsWhereUniqueInput
    update?: XOR<XOR<PostStatsUpdateToOneWithWhereWithoutPostInput, PostStatsUpdateWithoutPostInput>, PostStatsUncheckedUpdateWithoutPostInput>
  }

  export type PostDailyStatsUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostDailyStatsCreateWithoutPostInput, PostDailyStatsUncheckedCreateWithoutPostInput> | PostDailyStatsCreateWithoutPostInput[] | PostDailyStatsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostDailyStatsCreateOrConnectWithoutPostInput | PostDailyStatsCreateOrConnectWithoutPostInput[]
    upsert?: PostDailyStatsUpsertWithWhereUniqueWithoutPostInput | PostDailyStatsUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostDailyStatsCreateManyPostInputEnvelope
    set?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
    disconnect?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
    delete?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
    connect?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
    update?: PostDailyStatsUpdateWithWhereUniqueWithoutPostInput | PostDailyStatsUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostDailyStatsUpdateManyWithWhereWithoutPostInput | PostDailyStatsUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostDailyStatsScalarWhereInput | PostDailyStatsScalarWhereInput[]
  }

  export type PostPostcategoryUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostPostcategoryCreateWithoutPostInput, PostPostcategoryUncheckedCreateWithoutPostInput> | PostPostcategoryCreateWithoutPostInput[] | PostPostcategoryUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPostcategoryCreateOrConnectWithoutPostInput | PostPostcategoryCreateOrConnectWithoutPostInput[]
    upsert?: PostPostcategoryUpsertWithWhereUniqueWithoutPostInput | PostPostcategoryUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostPostcategoryCreateManyPostInputEnvelope
    set?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    disconnect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    delete?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    connect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    update?: PostPostcategoryUpdateWithWhereUniqueWithoutPostInput | PostPostcategoryUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostPostcategoryUpdateManyWithWhereWithoutPostInput | PostPostcategoryUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostPostcategoryScalarWhereInput | PostPostcategoryScalarWhereInput[]
  }

  export type PostPosttagUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostPosttagCreateWithoutPostInput, PostPosttagUncheckedCreateWithoutPostInput> | PostPosttagCreateWithoutPostInput[] | PostPosttagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPosttagCreateOrConnectWithoutPostInput | PostPosttagCreateOrConnectWithoutPostInput[]
    upsert?: PostPosttagUpsertWithWhereUniqueWithoutPostInput | PostPosttagUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostPosttagCreateManyPostInputEnvelope
    set?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    disconnect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    delete?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    connect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    update?: PostPosttagUpdateWithWhereUniqueWithoutPostInput | PostPosttagUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostPosttagUpdateManyWithWhereWithoutPostInput | PostPosttagUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostPosttagScalarWhereInput | PostPosttagScalarWhereInput[]
  }

  export type PostCommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput> | PostCommentCreateWithoutPostInput[] | PostCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutPostInput | PostCommentCreateOrConnectWithoutPostInput[]
    upsert?: PostCommentUpsertWithWhereUniqueWithoutPostInput | PostCommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostCommentCreateManyPostInputEnvelope
    set?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    disconnect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    delete?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    update?: PostCommentUpdateWithWhereUniqueWithoutPostInput | PostCommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostCommentUpdateManyWithWhereWithoutPostInput | PostCommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
  }

  export type PostStatsUncheckedUpdateOneWithoutPostNestedInput = {
    create?: XOR<PostStatsCreateWithoutPostInput, PostStatsUncheckedCreateWithoutPostInput>
    connectOrCreate?: PostStatsCreateOrConnectWithoutPostInput
    upsert?: PostStatsUpsertWithoutPostInput
    disconnect?: PostStatsWhereInput | boolean
    delete?: PostStatsWhereInput | boolean
    connect?: PostStatsWhereUniqueInput
    update?: XOR<XOR<PostStatsUpdateToOneWithWhereWithoutPostInput, PostStatsUpdateWithoutPostInput>, PostStatsUncheckedUpdateWithoutPostInput>
  }

  export type PostDailyStatsUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostDailyStatsCreateWithoutPostInput, PostDailyStatsUncheckedCreateWithoutPostInput> | PostDailyStatsCreateWithoutPostInput[] | PostDailyStatsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostDailyStatsCreateOrConnectWithoutPostInput | PostDailyStatsCreateOrConnectWithoutPostInput[]
    upsert?: PostDailyStatsUpsertWithWhereUniqueWithoutPostInput | PostDailyStatsUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostDailyStatsCreateManyPostInputEnvelope
    set?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
    disconnect?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
    delete?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
    connect?: PostDailyStatsWhereUniqueInput | PostDailyStatsWhereUniqueInput[]
    update?: PostDailyStatsUpdateWithWhereUniqueWithoutPostInput | PostDailyStatsUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostDailyStatsUpdateManyWithWhereWithoutPostInput | PostDailyStatsUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostDailyStatsScalarWhereInput | PostDailyStatsScalarWhereInput[]
  }

  export type PostPostcategoryUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostPostcategoryCreateWithoutPostInput, PostPostcategoryUncheckedCreateWithoutPostInput> | PostPostcategoryCreateWithoutPostInput[] | PostPostcategoryUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPostcategoryCreateOrConnectWithoutPostInput | PostPostcategoryCreateOrConnectWithoutPostInput[]
    upsert?: PostPostcategoryUpsertWithWhereUniqueWithoutPostInput | PostPostcategoryUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostPostcategoryCreateManyPostInputEnvelope
    set?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    disconnect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    delete?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    connect?: PostPostcategoryWhereUniqueInput | PostPostcategoryWhereUniqueInput[]
    update?: PostPostcategoryUpdateWithWhereUniqueWithoutPostInput | PostPostcategoryUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostPostcategoryUpdateManyWithWhereWithoutPostInput | PostPostcategoryUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostPostcategoryScalarWhereInput | PostPostcategoryScalarWhereInput[]
  }

  export type PostPosttagUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostPosttagCreateWithoutPostInput, PostPosttagUncheckedCreateWithoutPostInput> | PostPosttagCreateWithoutPostInput[] | PostPosttagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPosttagCreateOrConnectWithoutPostInput | PostPosttagCreateOrConnectWithoutPostInput[]
    upsert?: PostPosttagUpsertWithWhereUniqueWithoutPostInput | PostPosttagUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostPosttagCreateManyPostInputEnvelope
    set?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    disconnect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    delete?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    connect?: PostPosttagWhereUniqueInput | PostPosttagWhereUniqueInput[]
    update?: PostPosttagUpdateWithWhereUniqueWithoutPostInput | PostPosttagUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostPosttagUpdateManyWithWhereWithoutPostInput | PostPosttagUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostPosttagScalarWhereInput | PostPosttagScalarWhereInput[]
  }

  export type PostCommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput> | PostCommentCreateWithoutPostInput[] | PostCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutPostInput | PostCommentCreateOrConnectWithoutPostInput[]
    upsert?: PostCommentUpsertWithWhereUniqueWithoutPostInput | PostCommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostCommentCreateManyPostInputEnvelope
    set?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    disconnect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    delete?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    update?: PostCommentUpdateWithWhereUniqueWithoutPostInput | PostCommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostCommentUpdateManyWithWhereWithoutPostInput | PostCommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutStatsInput = {
    create?: XOR<PostCreateWithoutStatsInput, PostUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PostCreateOrConnectWithoutStatsInput
    connect?: PostWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<PostCreateWithoutStatsInput, PostUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PostCreateOrConnectWithoutStatsInput
    upsert?: PostUpsertWithoutStatsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutStatsInput, PostUpdateWithoutStatsInput>, PostUncheckedUpdateWithoutStatsInput>
  }

  export type PostCreateNestedOneWithoutDaily_statsInput = {
    create?: XOR<PostCreateWithoutDaily_statsInput, PostUncheckedCreateWithoutDaily_statsInput>
    connectOrCreate?: PostCreateOrConnectWithoutDaily_statsInput
    connect?: PostWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutDaily_statsNestedInput = {
    create?: XOR<PostCreateWithoutDaily_statsInput, PostUncheckedCreateWithoutDaily_statsInput>
    connectOrCreate?: PostCreateOrConnectWithoutDaily_statsInput
    upsert?: PostUpsertWithoutDaily_statsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutDaily_statsInput, PostUpdateWithoutDaily_statsInput>, PostUncheckedUpdateWithoutDaily_statsInput>
  }

  export type PostCreateNestedOneWithoutCategoryLinksInput = {
    create?: XOR<PostCreateWithoutCategoryLinksInput, PostUncheckedCreateWithoutCategoryLinksInput>
    connectOrCreate?: PostCreateOrConnectWithoutCategoryLinksInput
    connect?: PostWhereUniqueInput
  }

  export type PostCategoryCreateNestedOneWithoutPostsInput = {
    create?: XOR<PostCategoryCreateWithoutPostsInput, PostCategoryUncheckedCreateWithoutPostsInput>
    connectOrCreate?: PostCategoryCreateOrConnectWithoutPostsInput
    connect?: PostCategoryWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutCategoryLinksNestedInput = {
    create?: XOR<PostCreateWithoutCategoryLinksInput, PostUncheckedCreateWithoutCategoryLinksInput>
    connectOrCreate?: PostCreateOrConnectWithoutCategoryLinksInput
    upsert?: PostUpsertWithoutCategoryLinksInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutCategoryLinksInput, PostUpdateWithoutCategoryLinksInput>, PostUncheckedUpdateWithoutCategoryLinksInput>
  }

  export type PostCategoryUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<PostCategoryCreateWithoutPostsInput, PostCategoryUncheckedCreateWithoutPostsInput>
    connectOrCreate?: PostCategoryCreateOrConnectWithoutPostsInput
    upsert?: PostCategoryUpsertWithoutPostsInput
    connect?: PostCategoryWhereUniqueInput
    update?: XOR<XOR<PostCategoryUpdateToOneWithWhereWithoutPostsInput, PostCategoryUpdateWithoutPostsInput>, PostCategoryUncheckedUpdateWithoutPostsInput>
  }

  export type PostCreateNestedOneWithoutTagLinksInput = {
    create?: XOR<PostCreateWithoutTagLinksInput, PostUncheckedCreateWithoutTagLinksInput>
    connectOrCreate?: PostCreateOrConnectWithoutTagLinksInput
    connect?: PostWhereUniqueInput
  }

  export type PostTagCreateNestedOneWithoutPostsInput = {
    create?: XOR<PostTagCreateWithoutPostsInput, PostTagUncheckedCreateWithoutPostsInput>
    connectOrCreate?: PostTagCreateOrConnectWithoutPostsInput
    connect?: PostTagWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutTagLinksNestedInput = {
    create?: XOR<PostCreateWithoutTagLinksInput, PostUncheckedCreateWithoutTagLinksInput>
    connectOrCreate?: PostCreateOrConnectWithoutTagLinksInput
    upsert?: PostUpsertWithoutTagLinksInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutTagLinksInput, PostUpdateWithoutTagLinksInput>, PostUncheckedUpdateWithoutTagLinksInput>
  }

  export type PostTagUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<PostTagCreateWithoutPostsInput, PostTagUncheckedCreateWithoutPostsInput>
    connectOrCreate?: PostTagCreateOrConnectWithoutPostsInput
    upsert?: PostTagUpsertWithoutPostsInput
    connect?: PostTagWhereUniqueInput
    update?: XOR<XOR<PostTagUpdateToOneWithWhereWithoutPostsInput, PostTagUpdateWithoutPostsInput>, PostTagUncheckedUpdateWithoutPostsInput>
  }

  export type PostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    connect?: PostWhereUniqueInput
  }

  export type PostCommentCreateNestedOneWithoutRepliesInput = {
    create?: XOR<PostCommentCreateWithoutRepliesInput, PostCommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: PostCommentCreateOrConnectWithoutRepliesInput
    connect?: PostCommentWhereUniqueInput
  }

  export type PostCommentCreateNestedManyWithoutParentInput = {
    create?: XOR<PostCommentCreateWithoutParentInput, PostCommentUncheckedCreateWithoutParentInput> | PostCommentCreateWithoutParentInput[] | PostCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutParentInput | PostCommentCreateOrConnectWithoutParentInput[]
    createMany?: PostCommentCreateManyParentInputEnvelope
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
  }

  export type PostCommentUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<PostCommentCreateWithoutParentInput, PostCommentUncheckedCreateWithoutParentInput> | PostCommentCreateWithoutParentInput[] | PostCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutParentInput | PostCommentCreateOrConnectWithoutParentInput[]
    createMany?: PostCommentCreateManyParentInputEnvelope
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
  }

  export type PostUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    upsert?: PostUpsertWithoutCommentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutCommentsInput, PostUpdateWithoutCommentsInput>, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type PostCommentUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<PostCommentCreateWithoutRepliesInput, PostCommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: PostCommentCreateOrConnectWithoutRepliesInput
    upsert?: PostCommentUpsertWithoutRepliesInput
    disconnect?: PostCommentWhereInput | boolean
    delete?: PostCommentWhereInput | boolean
    connect?: PostCommentWhereUniqueInput
    update?: XOR<XOR<PostCommentUpdateToOneWithWhereWithoutRepliesInput, PostCommentUpdateWithoutRepliesInput>, PostCommentUncheckedUpdateWithoutRepliesInput>
  }

  export type PostCommentUpdateManyWithoutParentNestedInput = {
    create?: XOR<PostCommentCreateWithoutParentInput, PostCommentUncheckedCreateWithoutParentInput> | PostCommentCreateWithoutParentInput[] | PostCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutParentInput | PostCommentCreateOrConnectWithoutParentInput[]
    upsert?: PostCommentUpsertWithWhereUniqueWithoutParentInput | PostCommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PostCommentCreateManyParentInputEnvelope
    set?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    disconnect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    delete?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    update?: PostCommentUpdateWithWhereUniqueWithoutParentInput | PostCommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PostCommentUpdateManyWithWhereWithoutParentInput | PostCommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
  }

  export type PostCommentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<PostCommentCreateWithoutParentInput, PostCommentUncheckedCreateWithoutParentInput> | PostCommentCreateWithoutParentInput[] | PostCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutParentInput | PostCommentCreateOrConnectWithoutParentInput[]
    upsert?: PostCommentUpsertWithWhereUniqueWithoutParentInput | PostCommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PostCommentCreateManyParentInputEnvelope
    set?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    disconnect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    delete?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    update?: PostCommentUpdateWithWhereUniqueWithoutParentInput | PostCommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PostCommentUpdateManyWithWhereWithoutParentInput | PostCommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PostCategoryCreateWithoutChildrenInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    parent?: PostCategoryCreateNestedOneWithoutChildrenInput
    posts?: PostPostcategoryCreateNestedManyWithoutCategoryInput
  }

  export type PostCategoryUncheckedCreateWithoutChildrenInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    parent_id?: bigint | number | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    posts?: PostPostcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type PostCategoryCreateOrConnectWithoutChildrenInput = {
    where: PostCategoryWhereUniqueInput
    create: XOR<PostCategoryCreateWithoutChildrenInput, PostCategoryUncheckedCreateWithoutChildrenInput>
  }

  export type PostCategoryCreateWithoutParentInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    children?: PostCategoryCreateNestedManyWithoutParentInput
    posts?: PostPostcategoryCreateNestedManyWithoutCategoryInput
  }

  export type PostCategoryUncheckedCreateWithoutParentInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    children?: PostCategoryUncheckedCreateNestedManyWithoutParentInput
    posts?: PostPostcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type PostCategoryCreateOrConnectWithoutParentInput = {
    where: PostCategoryWhereUniqueInput
    create: XOR<PostCategoryCreateWithoutParentInput, PostCategoryUncheckedCreateWithoutParentInput>
  }

  export type PostCategoryCreateManyParentInputEnvelope = {
    data: PostCategoryCreateManyParentInput | PostCategoryCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type PostPostcategoryCreateWithoutCategoryInput = {
    post: PostCreateNestedOneWithoutCategoryLinksInput
  }

  export type PostPostcategoryUncheckedCreateWithoutCategoryInput = {
    post_id: bigint | number
  }

  export type PostPostcategoryCreateOrConnectWithoutCategoryInput = {
    where: PostPostcategoryWhereUniqueInput
    create: XOR<PostPostcategoryCreateWithoutCategoryInput, PostPostcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type PostPostcategoryCreateManyCategoryInputEnvelope = {
    data: PostPostcategoryCreateManyCategoryInput | PostPostcategoryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type PostCategoryUpsertWithoutChildrenInput = {
    update: XOR<PostCategoryUpdateWithoutChildrenInput, PostCategoryUncheckedUpdateWithoutChildrenInput>
    create: XOR<PostCategoryCreateWithoutChildrenInput, PostCategoryUncheckedCreateWithoutChildrenInput>
    where?: PostCategoryWhereInput
  }

  export type PostCategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: PostCategoryWhereInput
    data: XOR<PostCategoryUpdateWithoutChildrenInput, PostCategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type PostCategoryUpdateWithoutChildrenInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    parent?: PostCategoryUpdateOneWithoutChildrenNestedInput
    posts?: PostPostcategoryUpdateManyWithoutCategoryNestedInput
  }

  export type PostCategoryUncheckedUpdateWithoutChildrenInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    posts?: PostPostcategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type PostCategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: PostCategoryWhereUniqueInput
    update: XOR<PostCategoryUpdateWithoutParentInput, PostCategoryUncheckedUpdateWithoutParentInput>
    create: XOR<PostCategoryCreateWithoutParentInput, PostCategoryUncheckedCreateWithoutParentInput>
  }

  export type PostCategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: PostCategoryWhereUniqueInput
    data: XOR<PostCategoryUpdateWithoutParentInput, PostCategoryUncheckedUpdateWithoutParentInput>
  }

  export type PostCategoryUpdateManyWithWhereWithoutParentInput = {
    where: PostCategoryScalarWhereInput
    data: XOR<PostCategoryUpdateManyMutationInput, PostCategoryUncheckedUpdateManyWithoutParentInput>
  }

  export type PostCategoryScalarWhereInput = {
    AND?: PostCategoryScalarWhereInput | PostCategoryScalarWhereInput[]
    OR?: PostCategoryScalarWhereInput[]
    NOT?: PostCategoryScalarWhereInput | PostCategoryScalarWhereInput[]
    id?: BigIntFilter<"PostCategory"> | bigint | number
    name?: StringFilter<"PostCategory"> | string
    slug?: StringFilter<"PostCategory"> | string
    description?: StringNullableFilter<"PostCategory"> | string | null
    parent_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    is_active?: BoolFilter<"PostCategory"> | boolean
    sort_order?: IntFilter<"PostCategory"> | number
    seo_title?: StringNullableFilter<"PostCategory"> | string | null
    seo_description?: StringNullableFilter<"PostCategory"> | string | null
    seo_keywords?: StringNullableFilter<"PostCategory"> | string | null
    created_user_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
    created_at?: DateTimeFilter<"PostCategory"> | Date | string
    updated_at?: DateTimeFilter<"PostCategory"> | Date | string
    group_id?: BigIntNullableFilter<"PostCategory"> | bigint | number | null
  }

  export type PostPostcategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: PostPostcategoryWhereUniqueInput
    update: XOR<PostPostcategoryUpdateWithoutCategoryInput, PostPostcategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<PostPostcategoryCreateWithoutCategoryInput, PostPostcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type PostPostcategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: PostPostcategoryWhereUniqueInput
    data: XOR<PostPostcategoryUpdateWithoutCategoryInput, PostPostcategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type PostPostcategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: PostPostcategoryScalarWhereInput
    data: XOR<PostPostcategoryUpdateManyMutationInput, PostPostcategoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type PostPostcategoryScalarWhereInput = {
    AND?: PostPostcategoryScalarWhereInput | PostPostcategoryScalarWhereInput[]
    OR?: PostPostcategoryScalarWhereInput[]
    NOT?: PostPostcategoryScalarWhereInput | PostPostcategoryScalarWhereInput[]
    post_id?: BigIntFilter<"PostPostcategory"> | bigint | number
    post_category_id?: BigIntFilter<"PostPostcategory"> | bigint | number
  }

  export type PostPosttagCreateWithoutTagInput = {
    post: PostCreateNestedOneWithoutTagLinksInput
  }

  export type PostPosttagUncheckedCreateWithoutTagInput = {
    post_id: bigint | number
  }

  export type PostPosttagCreateOrConnectWithoutTagInput = {
    where: PostPosttagWhereUniqueInput
    create: XOR<PostPosttagCreateWithoutTagInput, PostPosttagUncheckedCreateWithoutTagInput>
  }

  export type PostPosttagCreateManyTagInputEnvelope = {
    data: PostPosttagCreateManyTagInput | PostPosttagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type PostPosttagUpsertWithWhereUniqueWithoutTagInput = {
    where: PostPosttagWhereUniqueInput
    update: XOR<PostPosttagUpdateWithoutTagInput, PostPosttagUncheckedUpdateWithoutTagInput>
    create: XOR<PostPosttagCreateWithoutTagInput, PostPosttagUncheckedCreateWithoutTagInput>
  }

  export type PostPosttagUpdateWithWhereUniqueWithoutTagInput = {
    where: PostPosttagWhereUniqueInput
    data: XOR<PostPosttagUpdateWithoutTagInput, PostPosttagUncheckedUpdateWithoutTagInput>
  }

  export type PostPosttagUpdateManyWithWhereWithoutTagInput = {
    where: PostPosttagScalarWhereInput
    data: XOR<PostPosttagUpdateManyMutationInput, PostPosttagUncheckedUpdateManyWithoutTagInput>
  }

  export type PostPosttagScalarWhereInput = {
    AND?: PostPosttagScalarWhereInput | PostPosttagScalarWhereInput[]
    OR?: PostPosttagScalarWhereInput[]
    NOT?: PostPosttagScalarWhereInput | PostPosttagScalarWhereInput[]
    post_id?: BigIntFilter<"PostPosttag"> | bigint | number
    post_tag_id?: BigIntFilter<"PostPosttag"> | bigint | number
  }

  export type PostStatsCreateWithoutPostInput = {
    view_count?: bigint | number
    updated_at?: Date | string
  }

  export type PostStatsUncheckedCreateWithoutPostInput = {
    view_count?: bigint | number
    updated_at?: Date | string
  }

  export type PostStatsCreateOrConnectWithoutPostInput = {
    where: PostStatsWhereUniqueInput
    create: XOR<PostStatsCreateWithoutPostInput, PostStatsUncheckedCreateWithoutPostInput>
  }

  export type PostDailyStatsCreateWithoutPostInput = {
    stat_date: Date | string
    view_count?: bigint | number
    updated_at?: Date | string
  }

  export type PostDailyStatsUncheckedCreateWithoutPostInput = {
    stat_date: Date | string
    view_count?: bigint | number
    updated_at?: Date | string
  }

  export type PostDailyStatsCreateOrConnectWithoutPostInput = {
    where: PostDailyStatsWhereUniqueInput
    create: XOR<PostDailyStatsCreateWithoutPostInput, PostDailyStatsUncheckedCreateWithoutPostInput>
  }

  export type PostDailyStatsCreateManyPostInputEnvelope = {
    data: PostDailyStatsCreateManyPostInput | PostDailyStatsCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type PostPostcategoryCreateWithoutPostInput = {
    category: PostCategoryCreateNestedOneWithoutPostsInput
  }

  export type PostPostcategoryUncheckedCreateWithoutPostInput = {
    post_category_id: bigint | number
  }

  export type PostPostcategoryCreateOrConnectWithoutPostInput = {
    where: PostPostcategoryWhereUniqueInput
    create: XOR<PostPostcategoryCreateWithoutPostInput, PostPostcategoryUncheckedCreateWithoutPostInput>
  }

  export type PostPostcategoryCreateManyPostInputEnvelope = {
    data: PostPostcategoryCreateManyPostInput | PostPostcategoryCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type PostPosttagCreateWithoutPostInput = {
    tag: PostTagCreateNestedOneWithoutPostsInput
  }

  export type PostPosttagUncheckedCreateWithoutPostInput = {
    post_tag_id: bigint | number
  }

  export type PostPosttagCreateOrConnectWithoutPostInput = {
    where: PostPosttagWhereUniqueInput
    create: XOR<PostPosttagCreateWithoutPostInput, PostPosttagUncheckedCreateWithoutPostInput>
  }

  export type PostPosttagCreateManyPostInputEnvelope = {
    data: PostPosttagCreateManyPostInput | PostPosttagCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type PostCommentCreateWithoutPostInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: PostCommentCreateNestedOneWithoutRepliesInput
    replies?: PostCommentCreateNestedManyWithoutParentInput
  }

  export type PostCommentUncheckedCreateWithoutPostInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    parent_id?: bigint | number | null
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    replies?: PostCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type PostCommentCreateOrConnectWithoutPostInput = {
    where: PostCommentWhereUniqueInput
    create: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput>
  }

  export type PostCommentCreateManyPostInputEnvelope = {
    data: PostCommentCreateManyPostInput | PostCommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type PostStatsUpsertWithoutPostInput = {
    update: XOR<PostStatsUpdateWithoutPostInput, PostStatsUncheckedUpdateWithoutPostInput>
    create: XOR<PostStatsCreateWithoutPostInput, PostStatsUncheckedCreateWithoutPostInput>
    where?: PostStatsWhereInput
  }

  export type PostStatsUpdateToOneWithWhereWithoutPostInput = {
    where?: PostStatsWhereInput
    data: XOR<PostStatsUpdateWithoutPostInput, PostStatsUncheckedUpdateWithoutPostInput>
  }

  export type PostStatsUpdateWithoutPostInput = {
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostStatsUncheckedUpdateWithoutPostInput = {
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostDailyStatsUpsertWithWhereUniqueWithoutPostInput = {
    where: PostDailyStatsWhereUniqueInput
    update: XOR<PostDailyStatsUpdateWithoutPostInput, PostDailyStatsUncheckedUpdateWithoutPostInput>
    create: XOR<PostDailyStatsCreateWithoutPostInput, PostDailyStatsUncheckedCreateWithoutPostInput>
  }

  export type PostDailyStatsUpdateWithWhereUniqueWithoutPostInput = {
    where: PostDailyStatsWhereUniqueInput
    data: XOR<PostDailyStatsUpdateWithoutPostInput, PostDailyStatsUncheckedUpdateWithoutPostInput>
  }

  export type PostDailyStatsUpdateManyWithWhereWithoutPostInput = {
    where: PostDailyStatsScalarWhereInput
    data: XOR<PostDailyStatsUpdateManyMutationInput, PostDailyStatsUncheckedUpdateManyWithoutPostInput>
  }

  export type PostDailyStatsScalarWhereInput = {
    AND?: PostDailyStatsScalarWhereInput | PostDailyStatsScalarWhereInput[]
    OR?: PostDailyStatsScalarWhereInput[]
    NOT?: PostDailyStatsScalarWhereInput | PostDailyStatsScalarWhereInput[]
    post_id?: BigIntFilter<"PostDailyStats"> | bigint | number
    stat_date?: DateTimeFilter<"PostDailyStats"> | Date | string
    view_count?: BigIntFilter<"PostDailyStats"> | bigint | number
    updated_at?: DateTimeFilter<"PostDailyStats"> | Date | string
  }

  export type PostPostcategoryUpsertWithWhereUniqueWithoutPostInput = {
    where: PostPostcategoryWhereUniqueInput
    update: XOR<PostPostcategoryUpdateWithoutPostInput, PostPostcategoryUncheckedUpdateWithoutPostInput>
    create: XOR<PostPostcategoryCreateWithoutPostInput, PostPostcategoryUncheckedCreateWithoutPostInput>
  }

  export type PostPostcategoryUpdateWithWhereUniqueWithoutPostInput = {
    where: PostPostcategoryWhereUniqueInput
    data: XOR<PostPostcategoryUpdateWithoutPostInput, PostPostcategoryUncheckedUpdateWithoutPostInput>
  }

  export type PostPostcategoryUpdateManyWithWhereWithoutPostInput = {
    where: PostPostcategoryScalarWhereInput
    data: XOR<PostPostcategoryUpdateManyMutationInput, PostPostcategoryUncheckedUpdateManyWithoutPostInput>
  }

  export type PostPosttagUpsertWithWhereUniqueWithoutPostInput = {
    where: PostPosttagWhereUniqueInput
    update: XOR<PostPosttagUpdateWithoutPostInput, PostPosttagUncheckedUpdateWithoutPostInput>
    create: XOR<PostPosttagCreateWithoutPostInput, PostPosttagUncheckedCreateWithoutPostInput>
  }

  export type PostPosttagUpdateWithWhereUniqueWithoutPostInput = {
    where: PostPosttagWhereUniqueInput
    data: XOR<PostPosttagUpdateWithoutPostInput, PostPosttagUncheckedUpdateWithoutPostInput>
  }

  export type PostPosttagUpdateManyWithWhereWithoutPostInput = {
    where: PostPosttagScalarWhereInput
    data: XOR<PostPosttagUpdateManyMutationInput, PostPosttagUncheckedUpdateManyWithoutPostInput>
  }

  export type PostCommentUpsertWithWhereUniqueWithoutPostInput = {
    where: PostCommentWhereUniqueInput
    update: XOR<PostCommentUpdateWithoutPostInput, PostCommentUncheckedUpdateWithoutPostInput>
    create: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput>
  }

  export type PostCommentUpdateWithWhereUniqueWithoutPostInput = {
    where: PostCommentWhereUniqueInput
    data: XOR<PostCommentUpdateWithoutPostInput, PostCommentUncheckedUpdateWithoutPostInput>
  }

  export type PostCommentUpdateManyWithWhereWithoutPostInput = {
    where: PostCommentScalarWhereInput
    data: XOR<PostCommentUpdateManyMutationInput, PostCommentUncheckedUpdateManyWithoutPostInput>
  }

  export type PostCommentScalarWhereInput = {
    AND?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
    OR?: PostCommentScalarWhereInput[]
    NOT?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
    id?: BigIntFilter<"PostComment"> | bigint | number
    user_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    post_id?: BigIntFilter<"PostComment"> | bigint | number
    parent_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    guest_name?: StringNullableFilter<"PostComment"> | string | null
    guest_email?: StringNullableFilter<"PostComment"> | string | null
    content?: StringFilter<"PostComment"> | string
    status?: StringFilter<"PostComment"> | string
    created_user_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"PostComment"> | bigint | number | null
    created_at?: DateTimeFilter<"PostComment"> | Date | string
    updated_at?: DateTimeFilter<"PostComment"> | Date | string
  }

  export type PostCreateWithoutStatsInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    daily_stats?: PostDailyStatsCreateNestedManyWithoutPostInput
    categoryLinks?: PostPostcategoryCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagCreateNestedManyWithoutPostInput
    comments?: PostCommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutStatsInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    daily_stats?: PostDailyStatsUncheckedCreateNestedManyWithoutPostInput
    categoryLinks?: PostPostcategoryUncheckedCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagUncheckedCreateNestedManyWithoutPostInput
    comments?: PostCommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutStatsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutStatsInput, PostUncheckedCreateWithoutStatsInput>
  }

  export type PostUpsertWithoutStatsInput = {
    update: XOR<PostUpdateWithoutStatsInput, PostUncheckedUpdateWithoutStatsInput>
    create: XOR<PostCreateWithoutStatsInput, PostUncheckedCreateWithoutStatsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutStatsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutStatsInput, PostUncheckedUpdateWithoutStatsInput>
  }

  export type PostUpdateWithoutStatsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    daily_stats?: PostDailyStatsUpdateManyWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUpdateManyWithoutPostNestedInput
    comments?: PostCommentUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutStatsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    daily_stats?: PostDailyStatsUncheckedUpdateManyWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUncheckedUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUncheckedUpdateManyWithoutPostNestedInput
    comments?: PostCommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateWithoutDaily_statsInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsCreateNestedOneWithoutPostInput
    categoryLinks?: PostPostcategoryCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagCreateNestedManyWithoutPostInput
    comments?: PostCommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutDaily_statsInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsUncheckedCreateNestedOneWithoutPostInput
    categoryLinks?: PostPostcategoryUncheckedCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagUncheckedCreateNestedManyWithoutPostInput
    comments?: PostCommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutDaily_statsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutDaily_statsInput, PostUncheckedCreateWithoutDaily_statsInput>
  }

  export type PostUpsertWithoutDaily_statsInput = {
    update: XOR<PostUpdateWithoutDaily_statsInput, PostUncheckedUpdateWithoutDaily_statsInput>
    create: XOR<PostCreateWithoutDaily_statsInput, PostUncheckedCreateWithoutDaily_statsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutDaily_statsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutDaily_statsInput, PostUncheckedUpdateWithoutDaily_statsInput>
  }

  export type PostUpdateWithoutDaily_statsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUpdateOneWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUpdateManyWithoutPostNestedInput
    comments?: PostCommentUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutDaily_statsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUncheckedUpdateOneWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUncheckedUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUncheckedUpdateManyWithoutPostNestedInput
    comments?: PostCommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateWithoutCategoryLinksInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsCreateNestedOneWithoutPostInput
    daily_stats?: PostDailyStatsCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagCreateNestedManyWithoutPostInput
    comments?: PostCommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutCategoryLinksInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsUncheckedCreateNestedOneWithoutPostInput
    daily_stats?: PostDailyStatsUncheckedCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagUncheckedCreateNestedManyWithoutPostInput
    comments?: PostCommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutCategoryLinksInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCategoryLinksInput, PostUncheckedCreateWithoutCategoryLinksInput>
  }

  export type PostCategoryCreateWithoutPostsInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    parent?: PostCategoryCreateNestedOneWithoutChildrenInput
    children?: PostCategoryCreateNestedManyWithoutParentInput
  }

  export type PostCategoryUncheckedCreateWithoutPostsInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    parent_id?: bigint | number | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    children?: PostCategoryUncheckedCreateNestedManyWithoutParentInput
  }

  export type PostCategoryCreateOrConnectWithoutPostsInput = {
    where: PostCategoryWhereUniqueInput
    create: XOR<PostCategoryCreateWithoutPostsInput, PostCategoryUncheckedCreateWithoutPostsInput>
  }

  export type PostUpsertWithoutCategoryLinksInput = {
    update: XOR<PostUpdateWithoutCategoryLinksInput, PostUncheckedUpdateWithoutCategoryLinksInput>
    create: XOR<PostCreateWithoutCategoryLinksInput, PostUncheckedCreateWithoutCategoryLinksInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutCategoryLinksInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutCategoryLinksInput, PostUncheckedUpdateWithoutCategoryLinksInput>
  }

  export type PostUpdateWithoutCategoryLinksInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUpdateOneWithoutPostNestedInput
    daily_stats?: PostDailyStatsUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUpdateManyWithoutPostNestedInput
    comments?: PostCommentUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutCategoryLinksInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUncheckedUpdateOneWithoutPostNestedInput
    daily_stats?: PostDailyStatsUncheckedUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUncheckedUpdateManyWithoutPostNestedInput
    comments?: PostCommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCategoryUpsertWithoutPostsInput = {
    update: XOR<PostCategoryUpdateWithoutPostsInput, PostCategoryUncheckedUpdateWithoutPostsInput>
    create: XOR<PostCategoryCreateWithoutPostsInput, PostCategoryUncheckedCreateWithoutPostsInput>
    where?: PostCategoryWhereInput
  }

  export type PostCategoryUpdateToOneWithWhereWithoutPostsInput = {
    where?: PostCategoryWhereInput
    data: XOR<PostCategoryUpdateWithoutPostsInput, PostCategoryUncheckedUpdateWithoutPostsInput>
  }

  export type PostCategoryUpdateWithoutPostsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    parent?: PostCategoryUpdateOneWithoutChildrenNestedInput
    children?: PostCategoryUpdateManyWithoutParentNestedInput
  }

  export type PostCategoryUncheckedUpdateWithoutPostsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    children?: PostCategoryUncheckedUpdateManyWithoutParentNestedInput
  }

  export type PostCreateWithoutTagLinksInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsCreateNestedOneWithoutPostInput
    daily_stats?: PostDailyStatsCreateNestedManyWithoutPostInput
    categoryLinks?: PostPostcategoryCreateNestedManyWithoutPostInput
    comments?: PostCommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutTagLinksInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsUncheckedCreateNestedOneWithoutPostInput
    daily_stats?: PostDailyStatsUncheckedCreateNestedManyWithoutPostInput
    categoryLinks?: PostPostcategoryUncheckedCreateNestedManyWithoutPostInput
    comments?: PostCommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutTagLinksInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutTagLinksInput, PostUncheckedCreateWithoutTagLinksInput>
  }

  export type PostTagCreateWithoutPostsInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
  }

  export type PostTagUncheckedCreateWithoutPostsInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
  }

  export type PostTagCreateOrConnectWithoutPostsInput = {
    where: PostTagWhereUniqueInput
    create: XOR<PostTagCreateWithoutPostsInput, PostTagUncheckedCreateWithoutPostsInput>
  }

  export type PostUpsertWithoutTagLinksInput = {
    update: XOR<PostUpdateWithoutTagLinksInput, PostUncheckedUpdateWithoutTagLinksInput>
    create: XOR<PostCreateWithoutTagLinksInput, PostUncheckedCreateWithoutTagLinksInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutTagLinksInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutTagLinksInput, PostUncheckedUpdateWithoutTagLinksInput>
  }

  export type PostUpdateWithoutTagLinksInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUpdateOneWithoutPostNestedInput
    daily_stats?: PostDailyStatsUpdateManyWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUpdateManyWithoutPostNestedInput
    comments?: PostCommentUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutTagLinksInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUncheckedUpdateOneWithoutPostNestedInput
    daily_stats?: PostDailyStatsUncheckedUpdateManyWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUncheckedUpdateManyWithoutPostNestedInput
    comments?: PostCommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostTagUpsertWithoutPostsInput = {
    update: XOR<PostTagUpdateWithoutPostsInput, PostTagUncheckedUpdateWithoutPostsInput>
    create: XOR<PostTagCreateWithoutPostsInput, PostTagUncheckedCreateWithoutPostsInput>
    where?: PostTagWhereInput
  }

  export type PostTagUpdateToOneWithWhereWithoutPostsInput = {
    where?: PostTagWhereInput
    data: XOR<PostTagUpdateWithoutPostsInput, PostTagUncheckedUpdateWithoutPostsInput>
  }

  export type PostTagUpdateWithoutPostsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type PostTagUncheckedUpdateWithoutPostsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type PostCreateWithoutCommentsInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsCreateNestedOneWithoutPostInput
    daily_stats?: PostDailyStatsCreateNestedManyWithoutPostInput
    categoryLinks?: PostPostcategoryCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutCommentsInput = {
    id?: bigint | number
    name: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image?: string | null
    cover_image?: string | null
    status?: string
    post_type?: string
    video_url?: string | null
    audio_url?: string | null
    is_featured?: boolean
    is_pinned?: boolean
    published_at?: Date | string | null
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
    stats?: PostStatsUncheckedCreateNestedOneWithoutPostInput
    daily_stats?: PostDailyStatsUncheckedCreateNestedManyWithoutPostInput
    categoryLinks?: PostPostcategoryUncheckedCreateNestedManyWithoutPostInput
    tagLinks?: PostPosttagUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutCommentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
  }

  export type PostCommentCreateWithoutRepliesInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
    parent?: PostCommentCreateNestedOneWithoutRepliesInput
  }

  export type PostCommentUncheckedCreateWithoutRepliesInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    post_id: bigint | number
    parent_id?: bigint | number | null
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PostCommentCreateOrConnectWithoutRepliesInput = {
    where: PostCommentWhereUniqueInput
    create: XOR<PostCommentCreateWithoutRepliesInput, PostCommentUncheckedCreateWithoutRepliesInput>
  }

  export type PostCommentCreateWithoutParentInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
    replies?: PostCommentCreateNestedManyWithoutParentInput
  }

  export type PostCommentUncheckedCreateWithoutParentInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    post_id: bigint | number
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    replies?: PostCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type PostCommentCreateOrConnectWithoutParentInput = {
    where: PostCommentWhereUniqueInput
    create: XOR<PostCommentCreateWithoutParentInput, PostCommentUncheckedCreateWithoutParentInput>
  }

  export type PostCommentCreateManyParentInputEnvelope = {
    data: PostCommentCreateManyParentInput | PostCommentCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type PostUpsertWithoutCommentsInput = {
    update: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutCommentsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type PostUpdateWithoutCommentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUpdateOneWithoutPostNestedInput
    daily_stats?: PostDailyStatsUpdateManyWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutCommentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cover_image?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    post_type?: StringFieldUpdateOperationsInput | string
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    audio_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    is_pinned?: BoolFieldUpdateOperationsInput | boolean
    published_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    stats?: PostStatsUncheckedUpdateOneWithoutPostNestedInput
    daily_stats?: PostDailyStatsUncheckedUpdateManyWithoutPostNestedInput
    categoryLinks?: PostPostcategoryUncheckedUpdateManyWithoutPostNestedInput
    tagLinks?: PostPosttagUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCommentUpsertWithoutRepliesInput = {
    update: XOR<PostCommentUpdateWithoutRepliesInput, PostCommentUncheckedUpdateWithoutRepliesInput>
    create: XOR<PostCommentCreateWithoutRepliesInput, PostCommentUncheckedCreateWithoutRepliesInput>
    where?: PostCommentWhereInput
  }

  export type PostCommentUpdateToOneWithWhereWithoutRepliesInput = {
    where?: PostCommentWhereInput
    data: XOR<PostCommentUpdateWithoutRepliesInput, PostCommentUncheckedUpdateWithoutRepliesInput>
  }

  export type PostCommentUpdateWithoutRepliesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
    parent?: PostCommentUpdateOneWithoutRepliesNestedInput
  }

  export type PostCommentUncheckedUpdateWithoutRepliesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCommentUpsertWithWhereUniqueWithoutParentInput = {
    where: PostCommentWhereUniqueInput
    update: XOR<PostCommentUpdateWithoutParentInput, PostCommentUncheckedUpdateWithoutParentInput>
    create: XOR<PostCommentCreateWithoutParentInput, PostCommentUncheckedCreateWithoutParentInput>
  }

  export type PostCommentUpdateWithWhereUniqueWithoutParentInput = {
    where: PostCommentWhereUniqueInput
    data: XOR<PostCommentUpdateWithoutParentInput, PostCommentUncheckedUpdateWithoutParentInput>
  }

  export type PostCommentUpdateManyWithWhereWithoutParentInput = {
    where: PostCommentScalarWhereInput
    data: XOR<PostCommentUpdateManyMutationInput, PostCommentUncheckedUpdateManyWithoutParentInput>
  }

  export type PostCategoryCreateManyParentInput = {
    id?: bigint | number
    name: string
    slug: string
    description?: string | null
    is_active?: boolean
    sort_order?: number
    seo_title?: string | null
    seo_description?: string | null
    seo_keywords?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    group_id?: bigint | number | null
  }

  export type PostPostcategoryCreateManyCategoryInput = {
    post_id: bigint | number
  }

  export type PostCategoryUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    children?: PostCategoryUpdateManyWithoutParentNestedInput
    posts?: PostPostcategoryUpdateManyWithoutCategoryNestedInput
  }

  export type PostCategoryUncheckedUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    children?: PostCategoryUncheckedUpdateManyWithoutParentNestedInput
    posts?: PostPostcategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type PostCategoryUncheckedUpdateManyWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    sort_order?: IntFieldUpdateOperationsInput | number
    seo_title?: NullableStringFieldUpdateOperationsInput | string | null
    seo_description?: NullableStringFieldUpdateOperationsInput | string | null
    seo_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type PostPostcategoryUpdateWithoutCategoryInput = {
    post?: PostUpdateOneRequiredWithoutCategoryLinksNestedInput
  }

  export type PostPostcategoryUncheckedUpdateWithoutCategoryInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostPostcategoryUncheckedUpdateManyWithoutCategoryInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostPosttagCreateManyTagInput = {
    post_id: bigint | number
  }

  export type PostPosttagUpdateWithoutTagInput = {
    post?: PostUpdateOneRequiredWithoutTagLinksNestedInput
  }

  export type PostPosttagUncheckedUpdateWithoutTagInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostPosttagUncheckedUpdateManyWithoutTagInput = {
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostDailyStatsCreateManyPostInput = {
    stat_date: Date | string
    view_count?: bigint | number
    updated_at?: Date | string
  }

  export type PostPostcategoryCreateManyPostInput = {
    post_category_id: bigint | number
  }

  export type PostPosttagCreateManyPostInput = {
    post_tag_id: bigint | number
  }

  export type PostCommentCreateManyPostInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    parent_id?: bigint | number | null
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PostDailyStatsUpdateWithoutPostInput = {
    stat_date?: DateTimeFieldUpdateOperationsInput | Date | string
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostDailyStatsUncheckedUpdateWithoutPostInput = {
    stat_date?: DateTimeFieldUpdateOperationsInput | Date | string
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostDailyStatsUncheckedUpdateManyWithoutPostInput = {
    stat_date?: DateTimeFieldUpdateOperationsInput | Date | string
    view_count?: BigIntFieldUpdateOperationsInput | bigint | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPostcategoryUpdateWithoutPostInput = {
    category?: PostCategoryUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostPostcategoryUncheckedUpdateWithoutPostInput = {
    post_category_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostPostcategoryUncheckedUpdateManyWithoutPostInput = {
    post_category_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostPosttagUpdateWithoutPostInput = {
    tag?: PostTagUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostPosttagUncheckedUpdateWithoutPostInput = {
    post_tag_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostPosttagUncheckedUpdateManyWithoutPostInput = {
    post_tag_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PostCommentUpdateWithoutPostInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: PostCommentUpdateOneWithoutRepliesNestedInput
    replies?: PostCommentUpdateManyWithoutParentNestedInput
  }

  export type PostCommentUncheckedUpdateWithoutPostInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: PostCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type PostCommentUncheckedUpdateManyWithoutPostInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCommentCreateManyParentInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    post_id: bigint | number
    guest_name?: string | null
    guest_email?: string | null
    content: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PostCommentUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
    replies?: PostCommentUpdateManyWithoutParentNestedInput
  }

  export type PostCommentUncheckedUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: PostCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type PostCommentUncheckedUpdateManyWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    post_id?: BigIntFieldUpdateOperationsInput | bigint | number
    guest_name?: NullableStringFieldUpdateOperationsInput | string | null
    guest_email?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}