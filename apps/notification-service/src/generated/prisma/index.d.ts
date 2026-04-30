
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
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model ContentTemplate
 * 
 */
export type ContentTemplate = $Result.DefaultSelection<Prisma.$ContentTemplatePayload>
/**
 * Model ComicFollowersProjection
 * 
 */
export type ComicFollowersProjection = $Result.DefaultSelection<Prisma.$ComicFollowersProjectionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Notifications
 * const notifications = await prisma.notification.findMany()
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
   * // Fetch zero or more Notifications
   * const notifications = await prisma.notification.findMany()
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
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contentTemplate`: Exposes CRUD operations for the **ContentTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContentTemplates
    * const contentTemplates = await prisma.contentTemplate.findMany()
    * ```
    */
  get contentTemplate(): Prisma.ContentTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comicFollowersProjection`: Exposes CRUD operations for the **ComicFollowersProjection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComicFollowersProjections
    * const comicFollowersProjections = await prisma.comicFollowersProjection.findMany()
    * ```
    */
  get comicFollowersProjection(): Prisma.ComicFollowersProjectionDelegate<ExtArgs, ClientOptions>;
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
    Notification: 'Notification',
    ContentTemplate: 'ContentTemplate',
    ComicFollowersProjection: 'ComicFollowersProjection'
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
      modelProps: "notification" | "contentTemplate" | "comicFollowersProjection"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      ContentTemplate: {
        payload: Prisma.$ContentTemplatePayload<ExtArgs>
        fields: Prisma.ContentTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContentTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContentTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload>
          }
          findFirst: {
            args: Prisma.ContentTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContentTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload>
          }
          findMany: {
            args: Prisma.ContentTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload>[]
          }
          create: {
            args: Prisma.ContentTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload>
          }
          createMany: {
            args: Prisma.ContentTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContentTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload>[]
          }
          delete: {
            args: Prisma.ContentTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload>
          }
          update: {
            args: Prisma.ContentTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload>
          }
          deleteMany: {
            args: Prisma.ContentTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContentTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContentTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload>[]
          }
          upsert: {
            args: Prisma.ContentTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentTemplatePayload>
          }
          aggregate: {
            args: Prisma.ContentTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContentTemplate>
          }
          groupBy: {
            args: Prisma.ContentTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContentTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContentTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<ContentTemplateCountAggregateOutputType> | number
          }
        }
      }
      ComicFollowersProjection: {
        payload: Prisma.$ComicFollowersProjectionPayload<ExtArgs>
        fields: Prisma.ComicFollowersProjectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComicFollowersProjectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComicFollowersProjectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload>
          }
          findFirst: {
            args: Prisma.ComicFollowersProjectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComicFollowersProjectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload>
          }
          findMany: {
            args: Prisma.ComicFollowersProjectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload>[]
          }
          create: {
            args: Prisma.ComicFollowersProjectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload>
          }
          createMany: {
            args: Prisma.ComicFollowersProjectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComicFollowersProjectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload>[]
          }
          delete: {
            args: Prisma.ComicFollowersProjectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload>
          }
          update: {
            args: Prisma.ComicFollowersProjectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload>
          }
          deleteMany: {
            args: Prisma.ComicFollowersProjectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComicFollowersProjectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComicFollowersProjectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload>[]
          }
          upsert: {
            args: Prisma.ComicFollowersProjectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComicFollowersProjectionPayload>
          }
          aggregate: {
            args: Prisma.ComicFollowersProjectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComicFollowersProjection>
          }
          groupBy: {
            args: Prisma.ComicFollowersProjectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComicFollowersProjectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComicFollowersProjectionCountArgs<ExtArgs>
            result: $Utils.Optional<ComicFollowersProjectionCountAggregateOutputType> | number
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
    notification?: NotificationOmit
    contentTemplate?: ContentTemplateOmit
    comicFollowersProjection?: ComicFollowersProjectionOmit
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
   * Models
   */

  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
  }

  export type NotificationMinAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    title: string | null
    message: string | null
    type: string | null
    is_read: boolean | null
    read_at: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    title: string | null
    message: string | null
    type: string | null
    is_read: boolean | null
    read_at: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    user_id: number
    title: number
    message: number
    type: number
    data: number
    is_read: number
    read_at: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    message?: true
    type?: true
    is_read?: true
    read_at?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    message?: true
    type?: true
    is_read?: true
    read_at?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    message?: true
    type?: true
    data?: true
    is_read?: true
    read_at?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: bigint
    user_id: bigint
    title: string
    message: string
    type: string
    data: JsonValue | null
    is_read: boolean
    read_at: Date | null
    status: string
    created_at: Date
    updated_at: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    data?: boolean
    is_read?: boolean
    read_at?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    data?: boolean
    is_read?: boolean
    read_at?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    data?: boolean
    is_read?: boolean
    read_at?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    user_id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    data?: boolean
    is_read?: boolean
    read_at?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "title" | "message" | "type" | "data" | "is_read" | "read_at" | "status" | "created_at" | "updated_at", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      user_id: bigint
      title: string
      message: string
      type: string
      data: Prisma.JsonValue | null
      is_read: boolean
      read_at: Date | null
      status: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'BigInt'>
    readonly user_id: FieldRef<"Notification", 'BigInt'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly data: FieldRef<"Notification", 'Json'>
    readonly is_read: FieldRef<"Notification", 'Boolean'>
    readonly read_at: FieldRef<"Notification", 'DateTime'>
    readonly status: FieldRef<"Notification", 'String'>
    readonly created_at: FieldRef<"Notification", 'DateTime'>
    readonly updated_at: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
  }


  /**
   * Model ContentTemplate
   */

  export type AggregateContentTemplate = {
    _count: ContentTemplateCountAggregateOutputType | null
    _avg: ContentTemplateAvgAggregateOutputType | null
    _sum: ContentTemplateSumAggregateOutputType | null
    _min: ContentTemplateMinAggregateOutputType | null
    _max: ContentTemplateMaxAggregateOutputType | null
  }

  export type ContentTemplateAvgAggregateOutputType = {
    id: number | null
  }

  export type ContentTemplateSumAggregateOutputType = {
    id: bigint | null
  }

  export type ContentTemplateMinAggregateOutputType = {
    id: bigint | null
    code: string | null
    name: string | null
    category: string | null
    type: string | null
    content: string | null
    file_path: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ContentTemplateMaxAggregateOutputType = {
    id: bigint | null
    code: string | null
    name: string | null
    category: string | null
    type: string | null
    content: string | null
    file_path: string | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ContentTemplateCountAggregateOutputType = {
    id: number
    code: number
    name: number
    category: number
    type: number
    content: number
    file_path: number
    metadata: number
    variables: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ContentTemplateAvgAggregateInputType = {
    id?: true
  }

  export type ContentTemplateSumAggregateInputType = {
    id?: true
  }

  export type ContentTemplateMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    category?: true
    type?: true
    content?: true
    file_path?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ContentTemplateMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    category?: true
    type?: true
    content?: true
    file_path?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ContentTemplateCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    category?: true
    type?: true
    content?: true
    file_path?: true
    metadata?: true
    variables?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ContentTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContentTemplate to aggregate.
     */
    where?: ContentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContentTemplates to fetch.
     */
    orderBy?: ContentTemplateOrderByWithRelationInput | ContentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContentTemplates
    **/
    _count?: true | ContentTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContentTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContentTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContentTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContentTemplateMaxAggregateInputType
  }

  export type GetContentTemplateAggregateType<T extends ContentTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateContentTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContentTemplate[P]>
      : GetScalarType<T[P], AggregateContentTemplate[P]>
  }




  export type ContentTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentTemplateWhereInput
    orderBy?: ContentTemplateOrderByWithAggregationInput | ContentTemplateOrderByWithAggregationInput[]
    by: ContentTemplateScalarFieldEnum[] | ContentTemplateScalarFieldEnum
    having?: ContentTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContentTemplateCountAggregateInputType | true
    _avg?: ContentTemplateAvgAggregateInputType
    _sum?: ContentTemplateSumAggregateInputType
    _min?: ContentTemplateMinAggregateInputType
    _max?: ContentTemplateMaxAggregateInputType
  }

  export type ContentTemplateGroupByOutputType = {
    id: bigint
    code: string
    name: string
    category: string
    type: string
    content: string | null
    file_path: string | null
    metadata: JsonValue | null
    variables: JsonValue | null
    status: string
    created_at: Date
    updated_at: Date
    _count: ContentTemplateCountAggregateOutputType | null
    _avg: ContentTemplateAvgAggregateOutputType | null
    _sum: ContentTemplateSumAggregateOutputType | null
    _min: ContentTemplateMinAggregateOutputType | null
    _max: ContentTemplateMaxAggregateOutputType | null
  }

  type GetContentTemplateGroupByPayload<T extends ContentTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContentTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContentTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContentTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], ContentTemplateGroupByOutputType[P]>
        }
      >
    >


  export type ContentTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    category?: boolean
    type?: boolean
    content?: boolean
    file_path?: boolean
    metadata?: boolean
    variables?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["contentTemplate"]>

  export type ContentTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    category?: boolean
    type?: boolean
    content?: boolean
    file_path?: boolean
    metadata?: boolean
    variables?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["contentTemplate"]>

  export type ContentTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    category?: boolean
    type?: boolean
    content?: boolean
    file_path?: boolean
    metadata?: boolean
    variables?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["contentTemplate"]>

  export type ContentTemplateSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    category?: boolean
    type?: boolean
    content?: boolean
    file_path?: boolean
    metadata?: boolean
    variables?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ContentTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "category" | "type" | "content" | "file_path" | "metadata" | "variables" | "status" | "created_at" | "updated_at", ExtArgs["result"]["contentTemplate"]>

  export type $ContentTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContentTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      code: string
      name: string
      category: string
      type: string
      content: string | null
      file_path: string | null
      metadata: Prisma.JsonValue | null
      variables: Prisma.JsonValue | null
      status: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["contentTemplate"]>
    composites: {}
  }

  type ContentTemplateGetPayload<S extends boolean | null | undefined | ContentTemplateDefaultArgs> = $Result.GetResult<Prisma.$ContentTemplatePayload, S>

  type ContentTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContentTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContentTemplateCountAggregateInputType | true
    }

  export interface ContentTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContentTemplate'], meta: { name: 'ContentTemplate' } }
    /**
     * Find zero or one ContentTemplate that matches the filter.
     * @param {ContentTemplateFindUniqueArgs} args - Arguments to find a ContentTemplate
     * @example
     * // Get one ContentTemplate
     * const contentTemplate = await prisma.contentTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContentTemplateFindUniqueArgs>(args: SelectSubset<T, ContentTemplateFindUniqueArgs<ExtArgs>>): Prisma__ContentTemplateClient<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContentTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContentTemplateFindUniqueOrThrowArgs} args - Arguments to find a ContentTemplate
     * @example
     * // Get one ContentTemplate
     * const contentTemplate = await prisma.contentTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContentTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, ContentTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContentTemplateClient<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContentTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentTemplateFindFirstArgs} args - Arguments to find a ContentTemplate
     * @example
     * // Get one ContentTemplate
     * const contentTemplate = await prisma.contentTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContentTemplateFindFirstArgs>(args?: SelectSubset<T, ContentTemplateFindFirstArgs<ExtArgs>>): Prisma__ContentTemplateClient<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContentTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentTemplateFindFirstOrThrowArgs} args - Arguments to find a ContentTemplate
     * @example
     * // Get one ContentTemplate
     * const contentTemplate = await prisma.contentTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContentTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, ContentTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContentTemplateClient<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContentTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContentTemplates
     * const contentTemplates = await prisma.contentTemplate.findMany()
     * 
     * // Get first 10 ContentTemplates
     * const contentTemplates = await prisma.contentTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contentTemplateWithIdOnly = await prisma.contentTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContentTemplateFindManyArgs>(args?: SelectSubset<T, ContentTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContentTemplate.
     * @param {ContentTemplateCreateArgs} args - Arguments to create a ContentTemplate.
     * @example
     * // Create one ContentTemplate
     * const ContentTemplate = await prisma.contentTemplate.create({
     *   data: {
     *     // ... data to create a ContentTemplate
     *   }
     * })
     * 
     */
    create<T extends ContentTemplateCreateArgs>(args: SelectSubset<T, ContentTemplateCreateArgs<ExtArgs>>): Prisma__ContentTemplateClient<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContentTemplates.
     * @param {ContentTemplateCreateManyArgs} args - Arguments to create many ContentTemplates.
     * @example
     * // Create many ContentTemplates
     * const contentTemplate = await prisma.contentTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContentTemplateCreateManyArgs>(args?: SelectSubset<T, ContentTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContentTemplates and returns the data saved in the database.
     * @param {ContentTemplateCreateManyAndReturnArgs} args - Arguments to create many ContentTemplates.
     * @example
     * // Create many ContentTemplates
     * const contentTemplate = await prisma.contentTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContentTemplates and only return the `id`
     * const contentTemplateWithIdOnly = await prisma.contentTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContentTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, ContentTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContentTemplate.
     * @param {ContentTemplateDeleteArgs} args - Arguments to delete one ContentTemplate.
     * @example
     * // Delete one ContentTemplate
     * const ContentTemplate = await prisma.contentTemplate.delete({
     *   where: {
     *     // ... filter to delete one ContentTemplate
     *   }
     * })
     * 
     */
    delete<T extends ContentTemplateDeleteArgs>(args: SelectSubset<T, ContentTemplateDeleteArgs<ExtArgs>>): Prisma__ContentTemplateClient<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContentTemplate.
     * @param {ContentTemplateUpdateArgs} args - Arguments to update one ContentTemplate.
     * @example
     * // Update one ContentTemplate
     * const contentTemplate = await prisma.contentTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContentTemplateUpdateArgs>(args: SelectSubset<T, ContentTemplateUpdateArgs<ExtArgs>>): Prisma__ContentTemplateClient<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContentTemplates.
     * @param {ContentTemplateDeleteManyArgs} args - Arguments to filter ContentTemplates to delete.
     * @example
     * // Delete a few ContentTemplates
     * const { count } = await prisma.contentTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContentTemplateDeleteManyArgs>(args?: SelectSubset<T, ContentTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContentTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContentTemplates
     * const contentTemplate = await prisma.contentTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContentTemplateUpdateManyArgs>(args: SelectSubset<T, ContentTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContentTemplates and returns the data updated in the database.
     * @param {ContentTemplateUpdateManyAndReturnArgs} args - Arguments to update many ContentTemplates.
     * @example
     * // Update many ContentTemplates
     * const contentTemplate = await prisma.contentTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContentTemplates and only return the `id`
     * const contentTemplateWithIdOnly = await prisma.contentTemplate.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContentTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, ContentTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContentTemplate.
     * @param {ContentTemplateUpsertArgs} args - Arguments to update or create a ContentTemplate.
     * @example
     * // Update or create a ContentTemplate
     * const contentTemplate = await prisma.contentTemplate.upsert({
     *   create: {
     *     // ... data to create a ContentTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContentTemplate we want to update
     *   }
     * })
     */
    upsert<T extends ContentTemplateUpsertArgs>(args: SelectSubset<T, ContentTemplateUpsertArgs<ExtArgs>>): Prisma__ContentTemplateClient<$Result.GetResult<Prisma.$ContentTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContentTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentTemplateCountArgs} args - Arguments to filter ContentTemplates to count.
     * @example
     * // Count the number of ContentTemplates
     * const count = await prisma.contentTemplate.count({
     *   where: {
     *     // ... the filter for the ContentTemplates we want to count
     *   }
     * })
    **/
    count<T extends ContentTemplateCountArgs>(
      args?: Subset<T, ContentTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContentTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContentTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContentTemplateAggregateArgs>(args: Subset<T, ContentTemplateAggregateArgs>): Prisma.PrismaPromise<GetContentTemplateAggregateType<T>>

    /**
     * Group by ContentTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentTemplateGroupByArgs} args - Group by arguments.
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
      T extends ContentTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContentTemplateGroupByArgs['orderBy'] }
        : { orderBy?: ContentTemplateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContentTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContentTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContentTemplate model
   */
  readonly fields: ContentTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContentTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContentTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ContentTemplate model
   */
  interface ContentTemplateFieldRefs {
    readonly id: FieldRef<"ContentTemplate", 'BigInt'>
    readonly code: FieldRef<"ContentTemplate", 'String'>
    readonly name: FieldRef<"ContentTemplate", 'String'>
    readonly category: FieldRef<"ContentTemplate", 'String'>
    readonly type: FieldRef<"ContentTemplate", 'String'>
    readonly content: FieldRef<"ContentTemplate", 'String'>
    readonly file_path: FieldRef<"ContentTemplate", 'String'>
    readonly metadata: FieldRef<"ContentTemplate", 'Json'>
    readonly variables: FieldRef<"ContentTemplate", 'Json'>
    readonly status: FieldRef<"ContentTemplate", 'String'>
    readonly created_at: FieldRef<"ContentTemplate", 'DateTime'>
    readonly updated_at: FieldRef<"ContentTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContentTemplate findUnique
   */
  export type ContentTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which ContentTemplate to fetch.
     */
    where: ContentTemplateWhereUniqueInput
  }

  /**
   * ContentTemplate findUniqueOrThrow
   */
  export type ContentTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which ContentTemplate to fetch.
     */
    where: ContentTemplateWhereUniqueInput
  }

  /**
   * ContentTemplate findFirst
   */
  export type ContentTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which ContentTemplate to fetch.
     */
    where?: ContentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContentTemplates to fetch.
     */
    orderBy?: ContentTemplateOrderByWithRelationInput | ContentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContentTemplates.
     */
    cursor?: ContentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContentTemplates.
     */
    distinct?: ContentTemplateScalarFieldEnum | ContentTemplateScalarFieldEnum[]
  }

  /**
   * ContentTemplate findFirstOrThrow
   */
  export type ContentTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which ContentTemplate to fetch.
     */
    where?: ContentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContentTemplates to fetch.
     */
    orderBy?: ContentTemplateOrderByWithRelationInput | ContentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContentTemplates.
     */
    cursor?: ContentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContentTemplates.
     */
    distinct?: ContentTemplateScalarFieldEnum | ContentTemplateScalarFieldEnum[]
  }

  /**
   * ContentTemplate findMany
   */
  export type ContentTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * Filter, which ContentTemplates to fetch.
     */
    where?: ContentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContentTemplates to fetch.
     */
    orderBy?: ContentTemplateOrderByWithRelationInput | ContentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContentTemplates.
     */
    cursor?: ContentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContentTemplates.
     */
    distinct?: ContentTemplateScalarFieldEnum | ContentTemplateScalarFieldEnum[]
  }

  /**
   * ContentTemplate create
   */
  export type ContentTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * The data needed to create a ContentTemplate.
     */
    data: XOR<ContentTemplateCreateInput, ContentTemplateUncheckedCreateInput>
  }

  /**
   * ContentTemplate createMany
   */
  export type ContentTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContentTemplates.
     */
    data: ContentTemplateCreateManyInput | ContentTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContentTemplate createManyAndReturn
   */
  export type ContentTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many ContentTemplates.
     */
    data: ContentTemplateCreateManyInput | ContentTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContentTemplate update
   */
  export type ContentTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * The data needed to update a ContentTemplate.
     */
    data: XOR<ContentTemplateUpdateInput, ContentTemplateUncheckedUpdateInput>
    /**
     * Choose, which ContentTemplate to update.
     */
    where: ContentTemplateWhereUniqueInput
  }

  /**
   * ContentTemplate updateMany
   */
  export type ContentTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContentTemplates.
     */
    data: XOR<ContentTemplateUpdateManyMutationInput, ContentTemplateUncheckedUpdateManyInput>
    /**
     * Filter which ContentTemplates to update
     */
    where?: ContentTemplateWhereInput
    /**
     * Limit how many ContentTemplates to update.
     */
    limit?: number
  }

  /**
   * ContentTemplate updateManyAndReturn
   */
  export type ContentTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * The data used to update ContentTemplates.
     */
    data: XOR<ContentTemplateUpdateManyMutationInput, ContentTemplateUncheckedUpdateManyInput>
    /**
     * Filter which ContentTemplates to update
     */
    where?: ContentTemplateWhereInput
    /**
     * Limit how many ContentTemplates to update.
     */
    limit?: number
  }

  /**
   * ContentTemplate upsert
   */
  export type ContentTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * The filter to search for the ContentTemplate to update in case it exists.
     */
    where: ContentTemplateWhereUniqueInput
    /**
     * In case the ContentTemplate found by the `where` argument doesn't exist, create a new ContentTemplate with this data.
     */
    create: XOR<ContentTemplateCreateInput, ContentTemplateUncheckedCreateInput>
    /**
     * In case the ContentTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContentTemplateUpdateInput, ContentTemplateUncheckedUpdateInput>
  }

  /**
   * ContentTemplate delete
   */
  export type ContentTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
    /**
     * Filter which ContentTemplate to delete.
     */
    where: ContentTemplateWhereUniqueInput
  }

  /**
   * ContentTemplate deleteMany
   */
  export type ContentTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContentTemplates to delete
     */
    where?: ContentTemplateWhereInput
    /**
     * Limit how many ContentTemplates to delete.
     */
    limit?: number
  }

  /**
   * ContentTemplate without action
   */
  export type ContentTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentTemplate
     */
    select?: ContentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContentTemplate
     */
    omit?: ContentTemplateOmit<ExtArgs> | null
  }


  /**
   * Model ComicFollowersProjection
   */

  export type AggregateComicFollowersProjection = {
    _count: ComicFollowersProjectionCountAggregateOutputType | null
    _avg: ComicFollowersProjectionAvgAggregateOutputType | null
    _sum: ComicFollowersProjectionSumAggregateOutputType | null
    _min: ComicFollowersProjectionMinAggregateOutputType | null
    _max: ComicFollowersProjectionMaxAggregateOutputType | null
  }

  export type ComicFollowersProjectionAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    comic_id: number | null
  }

  export type ComicFollowersProjectionSumAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    comic_id: bigint | null
  }

  export type ComicFollowersProjectionMinAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    comic_id: bigint | null
    followed_at: Date | null
  }

  export type ComicFollowersProjectionMaxAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    comic_id: bigint | null
    followed_at: Date | null
  }

  export type ComicFollowersProjectionCountAggregateOutputType = {
    id: number
    user_id: number
    comic_id: number
    followed_at: number
    _all: number
  }


  export type ComicFollowersProjectionAvgAggregateInputType = {
    id?: true
    user_id?: true
    comic_id?: true
  }

  export type ComicFollowersProjectionSumAggregateInputType = {
    id?: true
    user_id?: true
    comic_id?: true
  }

  export type ComicFollowersProjectionMinAggregateInputType = {
    id?: true
    user_id?: true
    comic_id?: true
    followed_at?: true
  }

  export type ComicFollowersProjectionMaxAggregateInputType = {
    id?: true
    user_id?: true
    comic_id?: true
    followed_at?: true
  }

  export type ComicFollowersProjectionCountAggregateInputType = {
    id?: true
    user_id?: true
    comic_id?: true
    followed_at?: true
    _all?: true
  }

  export type ComicFollowersProjectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComicFollowersProjection to aggregate.
     */
    where?: ComicFollowersProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComicFollowersProjections to fetch.
     */
    orderBy?: ComicFollowersProjectionOrderByWithRelationInput | ComicFollowersProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComicFollowersProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComicFollowersProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComicFollowersProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComicFollowersProjections
    **/
    _count?: true | ComicFollowersProjectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComicFollowersProjectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComicFollowersProjectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComicFollowersProjectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComicFollowersProjectionMaxAggregateInputType
  }

  export type GetComicFollowersProjectionAggregateType<T extends ComicFollowersProjectionAggregateArgs> = {
        [P in keyof T & keyof AggregateComicFollowersProjection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComicFollowersProjection[P]>
      : GetScalarType<T[P], AggregateComicFollowersProjection[P]>
  }




  export type ComicFollowersProjectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComicFollowersProjectionWhereInput
    orderBy?: ComicFollowersProjectionOrderByWithAggregationInput | ComicFollowersProjectionOrderByWithAggregationInput[]
    by: ComicFollowersProjectionScalarFieldEnum[] | ComicFollowersProjectionScalarFieldEnum
    having?: ComicFollowersProjectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComicFollowersProjectionCountAggregateInputType | true
    _avg?: ComicFollowersProjectionAvgAggregateInputType
    _sum?: ComicFollowersProjectionSumAggregateInputType
    _min?: ComicFollowersProjectionMinAggregateInputType
    _max?: ComicFollowersProjectionMaxAggregateInputType
  }

  export type ComicFollowersProjectionGroupByOutputType = {
    id: bigint
    user_id: bigint
    comic_id: bigint
    followed_at: Date
    _count: ComicFollowersProjectionCountAggregateOutputType | null
    _avg: ComicFollowersProjectionAvgAggregateOutputType | null
    _sum: ComicFollowersProjectionSumAggregateOutputType | null
    _min: ComicFollowersProjectionMinAggregateOutputType | null
    _max: ComicFollowersProjectionMaxAggregateOutputType | null
  }

  type GetComicFollowersProjectionGroupByPayload<T extends ComicFollowersProjectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComicFollowersProjectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComicFollowersProjectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComicFollowersProjectionGroupByOutputType[P]>
            : GetScalarType<T[P], ComicFollowersProjectionGroupByOutputType[P]>
        }
      >
    >


  export type ComicFollowersProjectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    comic_id?: boolean
    followed_at?: boolean
  }, ExtArgs["result"]["comicFollowersProjection"]>

  export type ComicFollowersProjectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    comic_id?: boolean
    followed_at?: boolean
  }, ExtArgs["result"]["comicFollowersProjection"]>

  export type ComicFollowersProjectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    comic_id?: boolean
    followed_at?: boolean
  }, ExtArgs["result"]["comicFollowersProjection"]>

  export type ComicFollowersProjectionSelectScalar = {
    id?: boolean
    user_id?: boolean
    comic_id?: boolean
    followed_at?: boolean
  }

  export type ComicFollowersProjectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "comic_id" | "followed_at", ExtArgs["result"]["comicFollowersProjection"]>

  export type $ComicFollowersProjectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComicFollowersProjection"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      user_id: bigint
      comic_id: bigint
      followed_at: Date
    }, ExtArgs["result"]["comicFollowersProjection"]>
    composites: {}
  }

  type ComicFollowersProjectionGetPayload<S extends boolean | null | undefined | ComicFollowersProjectionDefaultArgs> = $Result.GetResult<Prisma.$ComicFollowersProjectionPayload, S>

  type ComicFollowersProjectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComicFollowersProjectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComicFollowersProjectionCountAggregateInputType | true
    }

  export interface ComicFollowersProjectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComicFollowersProjection'], meta: { name: 'ComicFollowersProjection' } }
    /**
     * Find zero or one ComicFollowersProjection that matches the filter.
     * @param {ComicFollowersProjectionFindUniqueArgs} args - Arguments to find a ComicFollowersProjection
     * @example
     * // Get one ComicFollowersProjection
     * const comicFollowersProjection = await prisma.comicFollowersProjection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComicFollowersProjectionFindUniqueArgs>(args: SelectSubset<T, ComicFollowersProjectionFindUniqueArgs<ExtArgs>>): Prisma__ComicFollowersProjectionClient<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComicFollowersProjection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComicFollowersProjectionFindUniqueOrThrowArgs} args - Arguments to find a ComicFollowersProjection
     * @example
     * // Get one ComicFollowersProjection
     * const comicFollowersProjection = await prisma.comicFollowersProjection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComicFollowersProjectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ComicFollowersProjectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComicFollowersProjectionClient<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComicFollowersProjection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComicFollowersProjectionFindFirstArgs} args - Arguments to find a ComicFollowersProjection
     * @example
     * // Get one ComicFollowersProjection
     * const comicFollowersProjection = await prisma.comicFollowersProjection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComicFollowersProjectionFindFirstArgs>(args?: SelectSubset<T, ComicFollowersProjectionFindFirstArgs<ExtArgs>>): Prisma__ComicFollowersProjectionClient<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComicFollowersProjection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComicFollowersProjectionFindFirstOrThrowArgs} args - Arguments to find a ComicFollowersProjection
     * @example
     * // Get one ComicFollowersProjection
     * const comicFollowersProjection = await prisma.comicFollowersProjection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComicFollowersProjectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ComicFollowersProjectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComicFollowersProjectionClient<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComicFollowersProjections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComicFollowersProjectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComicFollowersProjections
     * const comicFollowersProjections = await prisma.comicFollowersProjection.findMany()
     * 
     * // Get first 10 ComicFollowersProjections
     * const comicFollowersProjections = await prisma.comicFollowersProjection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const comicFollowersProjectionWithIdOnly = await prisma.comicFollowersProjection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComicFollowersProjectionFindManyArgs>(args?: SelectSubset<T, ComicFollowersProjectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComicFollowersProjection.
     * @param {ComicFollowersProjectionCreateArgs} args - Arguments to create a ComicFollowersProjection.
     * @example
     * // Create one ComicFollowersProjection
     * const ComicFollowersProjection = await prisma.comicFollowersProjection.create({
     *   data: {
     *     // ... data to create a ComicFollowersProjection
     *   }
     * })
     * 
     */
    create<T extends ComicFollowersProjectionCreateArgs>(args: SelectSubset<T, ComicFollowersProjectionCreateArgs<ExtArgs>>): Prisma__ComicFollowersProjectionClient<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComicFollowersProjections.
     * @param {ComicFollowersProjectionCreateManyArgs} args - Arguments to create many ComicFollowersProjections.
     * @example
     * // Create many ComicFollowersProjections
     * const comicFollowersProjection = await prisma.comicFollowersProjection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComicFollowersProjectionCreateManyArgs>(args?: SelectSubset<T, ComicFollowersProjectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComicFollowersProjections and returns the data saved in the database.
     * @param {ComicFollowersProjectionCreateManyAndReturnArgs} args - Arguments to create many ComicFollowersProjections.
     * @example
     * // Create many ComicFollowersProjections
     * const comicFollowersProjection = await prisma.comicFollowersProjection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComicFollowersProjections and only return the `id`
     * const comicFollowersProjectionWithIdOnly = await prisma.comicFollowersProjection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComicFollowersProjectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ComicFollowersProjectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComicFollowersProjection.
     * @param {ComicFollowersProjectionDeleteArgs} args - Arguments to delete one ComicFollowersProjection.
     * @example
     * // Delete one ComicFollowersProjection
     * const ComicFollowersProjection = await prisma.comicFollowersProjection.delete({
     *   where: {
     *     // ... filter to delete one ComicFollowersProjection
     *   }
     * })
     * 
     */
    delete<T extends ComicFollowersProjectionDeleteArgs>(args: SelectSubset<T, ComicFollowersProjectionDeleteArgs<ExtArgs>>): Prisma__ComicFollowersProjectionClient<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComicFollowersProjection.
     * @param {ComicFollowersProjectionUpdateArgs} args - Arguments to update one ComicFollowersProjection.
     * @example
     * // Update one ComicFollowersProjection
     * const comicFollowersProjection = await prisma.comicFollowersProjection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComicFollowersProjectionUpdateArgs>(args: SelectSubset<T, ComicFollowersProjectionUpdateArgs<ExtArgs>>): Prisma__ComicFollowersProjectionClient<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComicFollowersProjections.
     * @param {ComicFollowersProjectionDeleteManyArgs} args - Arguments to filter ComicFollowersProjections to delete.
     * @example
     * // Delete a few ComicFollowersProjections
     * const { count } = await prisma.comicFollowersProjection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComicFollowersProjectionDeleteManyArgs>(args?: SelectSubset<T, ComicFollowersProjectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComicFollowersProjections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComicFollowersProjectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComicFollowersProjections
     * const comicFollowersProjection = await prisma.comicFollowersProjection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComicFollowersProjectionUpdateManyArgs>(args: SelectSubset<T, ComicFollowersProjectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComicFollowersProjections and returns the data updated in the database.
     * @param {ComicFollowersProjectionUpdateManyAndReturnArgs} args - Arguments to update many ComicFollowersProjections.
     * @example
     * // Update many ComicFollowersProjections
     * const comicFollowersProjection = await prisma.comicFollowersProjection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComicFollowersProjections and only return the `id`
     * const comicFollowersProjectionWithIdOnly = await prisma.comicFollowersProjection.updateManyAndReturn({
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
    updateManyAndReturn<T extends ComicFollowersProjectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ComicFollowersProjectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComicFollowersProjection.
     * @param {ComicFollowersProjectionUpsertArgs} args - Arguments to update or create a ComicFollowersProjection.
     * @example
     * // Update or create a ComicFollowersProjection
     * const comicFollowersProjection = await prisma.comicFollowersProjection.upsert({
     *   create: {
     *     // ... data to create a ComicFollowersProjection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComicFollowersProjection we want to update
     *   }
     * })
     */
    upsert<T extends ComicFollowersProjectionUpsertArgs>(args: SelectSubset<T, ComicFollowersProjectionUpsertArgs<ExtArgs>>): Prisma__ComicFollowersProjectionClient<$Result.GetResult<Prisma.$ComicFollowersProjectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComicFollowersProjections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComicFollowersProjectionCountArgs} args - Arguments to filter ComicFollowersProjections to count.
     * @example
     * // Count the number of ComicFollowersProjections
     * const count = await prisma.comicFollowersProjection.count({
     *   where: {
     *     // ... the filter for the ComicFollowersProjections we want to count
     *   }
     * })
    **/
    count<T extends ComicFollowersProjectionCountArgs>(
      args?: Subset<T, ComicFollowersProjectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComicFollowersProjectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComicFollowersProjection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComicFollowersProjectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComicFollowersProjectionAggregateArgs>(args: Subset<T, ComicFollowersProjectionAggregateArgs>): Prisma.PrismaPromise<GetComicFollowersProjectionAggregateType<T>>

    /**
     * Group by ComicFollowersProjection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComicFollowersProjectionGroupByArgs} args - Group by arguments.
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
      T extends ComicFollowersProjectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComicFollowersProjectionGroupByArgs['orderBy'] }
        : { orderBy?: ComicFollowersProjectionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComicFollowersProjectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComicFollowersProjectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComicFollowersProjection model
   */
  readonly fields: ComicFollowersProjectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComicFollowersProjection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComicFollowersProjectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ComicFollowersProjection model
   */
  interface ComicFollowersProjectionFieldRefs {
    readonly id: FieldRef<"ComicFollowersProjection", 'BigInt'>
    readonly user_id: FieldRef<"ComicFollowersProjection", 'BigInt'>
    readonly comic_id: FieldRef<"ComicFollowersProjection", 'BigInt'>
    readonly followed_at: FieldRef<"ComicFollowersProjection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComicFollowersProjection findUnique
   */
  export type ComicFollowersProjectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ComicFollowersProjection to fetch.
     */
    where: ComicFollowersProjectionWhereUniqueInput
  }

  /**
   * ComicFollowersProjection findUniqueOrThrow
   */
  export type ComicFollowersProjectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ComicFollowersProjection to fetch.
     */
    where: ComicFollowersProjectionWhereUniqueInput
  }

  /**
   * ComicFollowersProjection findFirst
   */
  export type ComicFollowersProjectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ComicFollowersProjection to fetch.
     */
    where?: ComicFollowersProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComicFollowersProjections to fetch.
     */
    orderBy?: ComicFollowersProjectionOrderByWithRelationInput | ComicFollowersProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComicFollowersProjections.
     */
    cursor?: ComicFollowersProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComicFollowersProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComicFollowersProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComicFollowersProjections.
     */
    distinct?: ComicFollowersProjectionScalarFieldEnum | ComicFollowersProjectionScalarFieldEnum[]
  }

  /**
   * ComicFollowersProjection findFirstOrThrow
   */
  export type ComicFollowersProjectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ComicFollowersProjection to fetch.
     */
    where?: ComicFollowersProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComicFollowersProjections to fetch.
     */
    orderBy?: ComicFollowersProjectionOrderByWithRelationInput | ComicFollowersProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComicFollowersProjections.
     */
    cursor?: ComicFollowersProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComicFollowersProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComicFollowersProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComicFollowersProjections.
     */
    distinct?: ComicFollowersProjectionScalarFieldEnum | ComicFollowersProjectionScalarFieldEnum[]
  }

  /**
   * ComicFollowersProjection findMany
   */
  export type ComicFollowersProjectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ComicFollowersProjections to fetch.
     */
    where?: ComicFollowersProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComicFollowersProjections to fetch.
     */
    orderBy?: ComicFollowersProjectionOrderByWithRelationInput | ComicFollowersProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComicFollowersProjections.
     */
    cursor?: ComicFollowersProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComicFollowersProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComicFollowersProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComicFollowersProjections.
     */
    distinct?: ComicFollowersProjectionScalarFieldEnum | ComicFollowersProjectionScalarFieldEnum[]
  }

  /**
   * ComicFollowersProjection create
   */
  export type ComicFollowersProjectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * The data needed to create a ComicFollowersProjection.
     */
    data: XOR<ComicFollowersProjectionCreateInput, ComicFollowersProjectionUncheckedCreateInput>
  }

  /**
   * ComicFollowersProjection createMany
   */
  export type ComicFollowersProjectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComicFollowersProjections.
     */
    data: ComicFollowersProjectionCreateManyInput | ComicFollowersProjectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComicFollowersProjection createManyAndReturn
   */
  export type ComicFollowersProjectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * The data used to create many ComicFollowersProjections.
     */
    data: ComicFollowersProjectionCreateManyInput | ComicFollowersProjectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComicFollowersProjection update
   */
  export type ComicFollowersProjectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * The data needed to update a ComicFollowersProjection.
     */
    data: XOR<ComicFollowersProjectionUpdateInput, ComicFollowersProjectionUncheckedUpdateInput>
    /**
     * Choose, which ComicFollowersProjection to update.
     */
    where: ComicFollowersProjectionWhereUniqueInput
  }

  /**
   * ComicFollowersProjection updateMany
   */
  export type ComicFollowersProjectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComicFollowersProjections.
     */
    data: XOR<ComicFollowersProjectionUpdateManyMutationInput, ComicFollowersProjectionUncheckedUpdateManyInput>
    /**
     * Filter which ComicFollowersProjections to update
     */
    where?: ComicFollowersProjectionWhereInput
    /**
     * Limit how many ComicFollowersProjections to update.
     */
    limit?: number
  }

  /**
   * ComicFollowersProjection updateManyAndReturn
   */
  export type ComicFollowersProjectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * The data used to update ComicFollowersProjections.
     */
    data: XOR<ComicFollowersProjectionUpdateManyMutationInput, ComicFollowersProjectionUncheckedUpdateManyInput>
    /**
     * Filter which ComicFollowersProjections to update
     */
    where?: ComicFollowersProjectionWhereInput
    /**
     * Limit how many ComicFollowersProjections to update.
     */
    limit?: number
  }

  /**
   * ComicFollowersProjection upsert
   */
  export type ComicFollowersProjectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * The filter to search for the ComicFollowersProjection to update in case it exists.
     */
    where: ComicFollowersProjectionWhereUniqueInput
    /**
     * In case the ComicFollowersProjection found by the `where` argument doesn't exist, create a new ComicFollowersProjection with this data.
     */
    create: XOR<ComicFollowersProjectionCreateInput, ComicFollowersProjectionUncheckedCreateInput>
    /**
     * In case the ComicFollowersProjection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComicFollowersProjectionUpdateInput, ComicFollowersProjectionUncheckedUpdateInput>
  }

  /**
   * ComicFollowersProjection delete
   */
  export type ComicFollowersProjectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
    /**
     * Filter which ComicFollowersProjection to delete.
     */
    where: ComicFollowersProjectionWhereUniqueInput
  }

  /**
   * ComicFollowersProjection deleteMany
   */
  export type ComicFollowersProjectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComicFollowersProjections to delete
     */
    where?: ComicFollowersProjectionWhereInput
    /**
     * Limit how many ComicFollowersProjections to delete.
     */
    limit?: number
  }

  /**
   * ComicFollowersProjection without action
   */
  export type ComicFollowersProjectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComicFollowersProjection
     */
    select?: ComicFollowersProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComicFollowersProjection
     */
    omit?: ComicFollowersProjectionOmit<ExtArgs> | null
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


  export const NotificationScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    title: 'title',
    message: 'message',
    type: 'type',
    data: 'data',
    is_read: 'is_read',
    read_at: 'read_at',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const ContentTemplateScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    category: 'category',
    type: 'type',
    content: 'content',
    file_path: 'file_path',
    metadata: 'metadata',
    variables: 'variables',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ContentTemplateScalarFieldEnum = (typeof ContentTemplateScalarFieldEnum)[keyof typeof ContentTemplateScalarFieldEnum]


  export const ComicFollowersProjectionScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    comic_id: 'comic_id',
    followed_at: 'followed_at'
  };

  export type ComicFollowersProjectionScalarFieldEnum = (typeof ComicFollowersProjectionScalarFieldEnum)[keyof typeof ComicFollowersProjectionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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


  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: BigIntFilter<"Notification"> | bigint | number
    user_id?: BigIntFilter<"Notification"> | bigint | number
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    data?: JsonNullableFilter<"Notification">
    is_read?: BoolFilter<"Notification"> | boolean
    read_at?: DateTimeNullableFilter<"Notification"> | Date | string | null
    status?: StringFilter<"Notification"> | string
    created_at?: DateTimeFilter<"Notification"> | Date | string
    updated_at?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    data?: SortOrderInput | SortOrder
    is_read?: SortOrder
    read_at?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    user_id?: BigIntFilter<"Notification"> | bigint | number
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    data?: JsonNullableFilter<"Notification">
    is_read?: BoolFilter<"Notification"> | boolean
    read_at?: DateTimeNullableFilter<"Notification"> | Date | string | null
    status?: StringFilter<"Notification"> | string
    created_at?: DateTimeFilter<"Notification"> | Date | string
    updated_at?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    data?: SortOrderInput | SortOrder
    is_read?: SortOrder
    read_at?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Notification"> | bigint | number
    user_id?: BigIntWithAggregatesFilter<"Notification"> | bigint | number
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    data?: JsonNullableWithAggregatesFilter<"Notification">
    is_read?: BoolWithAggregatesFilter<"Notification"> | boolean
    read_at?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    status?: StringWithAggregatesFilter<"Notification"> | string
    created_at?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type ContentTemplateWhereInput = {
    AND?: ContentTemplateWhereInput | ContentTemplateWhereInput[]
    OR?: ContentTemplateWhereInput[]
    NOT?: ContentTemplateWhereInput | ContentTemplateWhereInput[]
    id?: BigIntFilter<"ContentTemplate"> | bigint | number
    code?: StringFilter<"ContentTemplate"> | string
    name?: StringFilter<"ContentTemplate"> | string
    category?: StringFilter<"ContentTemplate"> | string
    type?: StringFilter<"ContentTemplate"> | string
    content?: StringNullableFilter<"ContentTemplate"> | string | null
    file_path?: StringNullableFilter<"ContentTemplate"> | string | null
    metadata?: JsonNullableFilter<"ContentTemplate">
    variables?: JsonNullableFilter<"ContentTemplate">
    status?: StringFilter<"ContentTemplate"> | string
    created_at?: DateTimeFilter<"ContentTemplate"> | Date | string
    updated_at?: DateTimeFilter<"ContentTemplate"> | Date | string
  }

  export type ContentTemplateOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    type?: SortOrder
    content?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    variables?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContentTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    code?: string
    AND?: ContentTemplateWhereInput | ContentTemplateWhereInput[]
    OR?: ContentTemplateWhereInput[]
    NOT?: ContentTemplateWhereInput | ContentTemplateWhereInput[]
    name?: StringFilter<"ContentTemplate"> | string
    category?: StringFilter<"ContentTemplate"> | string
    type?: StringFilter<"ContentTemplate"> | string
    content?: StringNullableFilter<"ContentTemplate"> | string | null
    file_path?: StringNullableFilter<"ContentTemplate"> | string | null
    metadata?: JsonNullableFilter<"ContentTemplate">
    variables?: JsonNullableFilter<"ContentTemplate">
    status?: StringFilter<"ContentTemplate"> | string
    created_at?: DateTimeFilter<"ContentTemplate"> | Date | string
    updated_at?: DateTimeFilter<"ContentTemplate"> | Date | string
  }, "id" | "code">

  export type ContentTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    type?: SortOrder
    content?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    variables?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ContentTemplateCountOrderByAggregateInput
    _avg?: ContentTemplateAvgOrderByAggregateInput
    _max?: ContentTemplateMaxOrderByAggregateInput
    _min?: ContentTemplateMinOrderByAggregateInput
    _sum?: ContentTemplateSumOrderByAggregateInput
  }

  export type ContentTemplateScalarWhereWithAggregatesInput = {
    AND?: ContentTemplateScalarWhereWithAggregatesInput | ContentTemplateScalarWhereWithAggregatesInput[]
    OR?: ContentTemplateScalarWhereWithAggregatesInput[]
    NOT?: ContentTemplateScalarWhereWithAggregatesInput | ContentTemplateScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"ContentTemplate"> | bigint | number
    code?: StringWithAggregatesFilter<"ContentTemplate"> | string
    name?: StringWithAggregatesFilter<"ContentTemplate"> | string
    category?: StringWithAggregatesFilter<"ContentTemplate"> | string
    type?: StringWithAggregatesFilter<"ContentTemplate"> | string
    content?: StringNullableWithAggregatesFilter<"ContentTemplate"> | string | null
    file_path?: StringNullableWithAggregatesFilter<"ContentTemplate"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"ContentTemplate">
    variables?: JsonNullableWithAggregatesFilter<"ContentTemplate">
    status?: StringWithAggregatesFilter<"ContentTemplate"> | string
    created_at?: DateTimeWithAggregatesFilter<"ContentTemplate"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ContentTemplate"> | Date | string
  }

  export type ComicFollowersProjectionWhereInput = {
    AND?: ComicFollowersProjectionWhereInput | ComicFollowersProjectionWhereInput[]
    OR?: ComicFollowersProjectionWhereInput[]
    NOT?: ComicFollowersProjectionWhereInput | ComicFollowersProjectionWhereInput[]
    id?: BigIntFilter<"ComicFollowersProjection"> | bigint | number
    user_id?: BigIntFilter<"ComicFollowersProjection"> | bigint | number
    comic_id?: BigIntFilter<"ComicFollowersProjection"> | bigint | number
    followed_at?: DateTimeFilter<"ComicFollowersProjection"> | Date | string
  }

  export type ComicFollowersProjectionOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    comic_id?: SortOrder
    followed_at?: SortOrder
  }

  export type ComicFollowersProjectionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    user_id_comic_id?: ComicFollowersProjectionUser_idComic_idCompoundUniqueInput
    AND?: ComicFollowersProjectionWhereInput | ComicFollowersProjectionWhereInput[]
    OR?: ComicFollowersProjectionWhereInput[]
    NOT?: ComicFollowersProjectionWhereInput | ComicFollowersProjectionWhereInput[]
    user_id?: BigIntFilter<"ComicFollowersProjection"> | bigint | number
    comic_id?: BigIntFilter<"ComicFollowersProjection"> | bigint | number
    followed_at?: DateTimeFilter<"ComicFollowersProjection"> | Date | string
  }, "id" | "user_id_comic_id">

  export type ComicFollowersProjectionOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    comic_id?: SortOrder
    followed_at?: SortOrder
    _count?: ComicFollowersProjectionCountOrderByAggregateInput
    _avg?: ComicFollowersProjectionAvgOrderByAggregateInput
    _max?: ComicFollowersProjectionMaxOrderByAggregateInput
    _min?: ComicFollowersProjectionMinOrderByAggregateInput
    _sum?: ComicFollowersProjectionSumOrderByAggregateInput
  }

  export type ComicFollowersProjectionScalarWhereWithAggregatesInput = {
    AND?: ComicFollowersProjectionScalarWhereWithAggregatesInput | ComicFollowersProjectionScalarWhereWithAggregatesInput[]
    OR?: ComicFollowersProjectionScalarWhereWithAggregatesInput[]
    NOT?: ComicFollowersProjectionScalarWhereWithAggregatesInput | ComicFollowersProjectionScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"ComicFollowersProjection"> | bigint | number
    user_id?: BigIntWithAggregatesFilter<"ComicFollowersProjection"> | bigint | number
    comic_id?: BigIntWithAggregatesFilter<"ComicFollowersProjection"> | bigint | number
    followed_at?: DateTimeWithAggregatesFilter<"ComicFollowersProjection"> | Date | string
  }

  export type NotificationCreateInput = {
    id?: bigint | number
    user_id: bigint | number
    title: string
    message: string
    type?: string
    data?: NullableJsonNullValueInput | InputJsonValue
    is_read?: boolean
    read_at?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: bigint | number
    user_id: bigint | number
    title: string
    message: string
    type?: string
    data?: NullableJsonNullValueInput | InputJsonValue
    is_read?: boolean
    read_at?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    is_read?: BoolFieldUpdateOperationsInput | boolean
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    is_read?: BoolFieldUpdateOperationsInput | boolean
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: bigint | number
    user_id: bigint | number
    title: string
    message: string
    type?: string
    data?: NullableJsonNullValueInput | InputJsonValue
    is_read?: boolean
    read_at?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    is_read?: BoolFieldUpdateOperationsInput | boolean
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    is_read?: BoolFieldUpdateOperationsInput | boolean
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentTemplateCreateInput = {
    id?: bigint | number
    code: string
    name: string
    category?: string
    type: string
    content?: string | null
    file_path?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    variables?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContentTemplateUncheckedCreateInput = {
    id?: bigint | number
    code: string
    name: string
    category?: string
    type: string
    content?: string | null
    file_path?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    variables?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContentTemplateUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    variables?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentTemplateUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    variables?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentTemplateCreateManyInput = {
    id?: bigint | number
    code: string
    name: string
    category?: string
    type: string
    content?: string | null
    file_path?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    variables?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContentTemplateUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    variables?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentTemplateUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    variables?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComicFollowersProjectionCreateInput = {
    id?: bigint | number
    user_id: bigint | number
    comic_id: bigint | number
    followed_at?: Date | string
  }

  export type ComicFollowersProjectionUncheckedCreateInput = {
    id?: bigint | number
    user_id: bigint | number
    comic_id: bigint | number
    followed_at?: Date | string
  }

  export type ComicFollowersProjectionUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    comic_id?: BigIntFieldUpdateOperationsInput | bigint | number
    followed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComicFollowersProjectionUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    comic_id?: BigIntFieldUpdateOperationsInput | bigint | number
    followed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComicFollowersProjectionCreateManyInput = {
    id?: bigint | number
    user_id: bigint | number
    comic_id: bigint | number
    followed_at?: Date | string
  }

  export type ComicFollowersProjectionUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    comic_id?: BigIntFieldUpdateOperationsInput | bigint | number
    followed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComicFollowersProjectionUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    comic_id?: BigIntFieldUpdateOperationsInput | bigint | number
    followed_at?: DateTimeFieldUpdateOperationsInput | Date | string
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
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    data?: SortOrder
    is_read?: SortOrder
    read_at?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    is_read?: SortOrder
    read_at?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    is_read?: SortOrder
    read_at?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type ContentTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    type?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    metadata?: SortOrder
    variables?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContentTemplateAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ContentTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    type?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContentTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    type?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContentTemplateSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type ComicFollowersProjectionUser_idComic_idCompoundUniqueInput = {
    user_id: bigint | number
    comic_id: bigint | number
  }

  export type ComicFollowersProjectionCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    comic_id?: SortOrder
    followed_at?: SortOrder
  }

  export type ComicFollowersProjectionAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    comic_id?: SortOrder
  }

  export type ComicFollowersProjectionMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    comic_id?: SortOrder
    followed_at?: SortOrder
  }

  export type ComicFollowersProjectionMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    comic_id?: SortOrder
    followed_at?: SortOrder
  }

  export type ComicFollowersProjectionSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    comic_id?: SortOrder
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

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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