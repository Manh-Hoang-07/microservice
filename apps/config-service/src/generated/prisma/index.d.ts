
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
 * Model GeneralConfig
 * 
 */
export type GeneralConfig = $Result.DefaultSelection<Prisma.$GeneralConfigPayload>
/**
 * Model EmailConfig
 * 
 */
export type EmailConfig = $Result.DefaultSelection<Prisma.$EmailConfigPayload>
/**
 * Model Menu
 * 
 */
export type Menu = $Result.DefaultSelection<Prisma.$MenuPayload>
/**
 * Model Country
 * 
 */
export type Country = $Result.DefaultSelection<Prisma.$CountryPayload>
/**
 * Model Province
 * 
 */
export type Province = $Result.DefaultSelection<Prisma.$ProvincePayload>
/**
 * Model Ward
 * 
 */
export type Ward = $Result.DefaultSelection<Prisma.$WardPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more GeneralConfigs
 * const generalConfigs = await prisma.generalConfig.findMany()
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
   * // Fetch zero or more GeneralConfigs
   * const generalConfigs = await prisma.generalConfig.findMany()
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
   * `prisma.generalConfig`: Exposes CRUD operations for the **GeneralConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeneralConfigs
    * const generalConfigs = await prisma.generalConfig.findMany()
    * ```
    */
  get generalConfig(): Prisma.GeneralConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailConfig`: Exposes CRUD operations for the **EmailConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailConfigs
    * const emailConfigs = await prisma.emailConfig.findMany()
    * ```
    */
  get emailConfig(): Prisma.EmailConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.menu`: Exposes CRUD operations for the **Menu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Menus
    * const menus = await prisma.menu.findMany()
    * ```
    */
  get menu(): Prisma.MenuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.country`: Exposes CRUD operations for the **Country** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countries
    * const countries = await prisma.country.findMany()
    * ```
    */
  get country(): Prisma.CountryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.province`: Exposes CRUD operations for the **Province** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Provinces
    * const provinces = await prisma.province.findMany()
    * ```
    */
  get province(): Prisma.ProvinceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ward`: Exposes CRUD operations for the **Ward** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wards
    * const wards = await prisma.ward.findMany()
    * ```
    */
  get ward(): Prisma.WardDelegate<ExtArgs, ClientOptions>;
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
    GeneralConfig: 'GeneralConfig',
    EmailConfig: 'EmailConfig',
    Menu: 'Menu',
    Country: 'Country',
    Province: 'Province',
    Ward: 'Ward'
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
      modelProps: "generalConfig" | "emailConfig" | "menu" | "country" | "province" | "ward"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      GeneralConfig: {
        payload: Prisma.$GeneralConfigPayload<ExtArgs>
        fields: Prisma.GeneralConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeneralConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeneralConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload>
          }
          findFirst: {
            args: Prisma.GeneralConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeneralConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload>
          }
          findMany: {
            args: Prisma.GeneralConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload>[]
          }
          create: {
            args: Prisma.GeneralConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload>
          }
          createMany: {
            args: Prisma.GeneralConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeneralConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload>[]
          }
          delete: {
            args: Prisma.GeneralConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload>
          }
          update: {
            args: Prisma.GeneralConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload>
          }
          deleteMany: {
            args: Prisma.GeneralConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeneralConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GeneralConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload>[]
          }
          upsert: {
            args: Prisma.GeneralConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralConfigPayload>
          }
          aggregate: {
            args: Prisma.GeneralConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeneralConfig>
          }
          groupBy: {
            args: Prisma.GeneralConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeneralConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeneralConfigCountArgs<ExtArgs>
            result: $Utils.Optional<GeneralConfigCountAggregateOutputType> | number
          }
        }
      }
      EmailConfig: {
        payload: Prisma.$EmailConfigPayload<ExtArgs>
        fields: Prisma.EmailConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          findFirst: {
            args: Prisma.EmailConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          findMany: {
            args: Prisma.EmailConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>[]
          }
          create: {
            args: Prisma.EmailConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          createMany: {
            args: Prisma.EmailConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>[]
          }
          delete: {
            args: Prisma.EmailConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          update: {
            args: Prisma.EmailConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          deleteMany: {
            args: Prisma.EmailConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>[]
          }
          upsert: {
            args: Prisma.EmailConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          aggregate: {
            args: Prisma.EmailConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailConfig>
          }
          groupBy: {
            args: Prisma.EmailConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailConfigCountArgs<ExtArgs>
            result: $Utils.Optional<EmailConfigCountAggregateOutputType> | number
          }
        }
      }
      Menu: {
        payload: Prisma.$MenuPayload<ExtArgs>
        fields: Prisma.MenuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findFirst: {
            args: Prisma.MenuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findMany: {
            args: Prisma.MenuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          create: {
            args: Prisma.MenuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          createMany: {
            args: Prisma.MenuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          delete: {
            args: Prisma.MenuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          update: {
            args: Prisma.MenuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          deleteMany: {
            args: Prisma.MenuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MenuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          upsert: {
            args: Prisma.MenuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          aggregate: {
            args: Prisma.MenuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenu>
          }
          groupBy: {
            args: Prisma.MenuGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuCountArgs<ExtArgs>
            result: $Utils.Optional<MenuCountAggregateOutputType> | number
          }
        }
      }
      Country: {
        payload: Prisma.$CountryPayload<ExtArgs>
        fields: Prisma.CountryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CountryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CountryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          findFirst: {
            args: Prisma.CountryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CountryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          findMany: {
            args: Prisma.CountryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          create: {
            args: Prisma.CountryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          createMany: {
            args: Prisma.CountryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CountryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          delete: {
            args: Prisma.CountryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          update: {
            args: Prisma.CountryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          deleteMany: {
            args: Prisma.CountryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CountryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CountryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          upsert: {
            args: Prisma.CountryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          aggregate: {
            args: Prisma.CountryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountry>
          }
          groupBy: {
            args: Prisma.CountryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CountryCountArgs<ExtArgs>
            result: $Utils.Optional<CountryCountAggregateOutputType> | number
          }
        }
      }
      Province: {
        payload: Prisma.$ProvincePayload<ExtArgs>
        fields: Prisma.ProvinceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProvinceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProvinceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload>
          }
          findFirst: {
            args: Prisma.ProvinceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProvinceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload>
          }
          findMany: {
            args: Prisma.ProvinceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload>[]
          }
          create: {
            args: Prisma.ProvinceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload>
          }
          createMany: {
            args: Prisma.ProvinceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProvinceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload>[]
          }
          delete: {
            args: Prisma.ProvinceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload>
          }
          update: {
            args: Prisma.ProvinceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload>
          }
          deleteMany: {
            args: Prisma.ProvinceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProvinceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProvinceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload>[]
          }
          upsert: {
            args: Prisma.ProvinceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProvincePayload>
          }
          aggregate: {
            args: Prisma.ProvinceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProvince>
          }
          groupBy: {
            args: Prisma.ProvinceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProvinceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProvinceCountArgs<ExtArgs>
            result: $Utils.Optional<ProvinceCountAggregateOutputType> | number
          }
        }
      }
      Ward: {
        payload: Prisma.$WardPayload<ExtArgs>
        fields: Prisma.WardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload>
          }
          findFirst: {
            args: Prisma.WardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload>
          }
          findMany: {
            args: Prisma.WardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload>[]
          }
          create: {
            args: Prisma.WardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload>
          }
          createMany: {
            args: Prisma.WardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload>[]
          }
          delete: {
            args: Prisma.WardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload>
          }
          update: {
            args: Prisma.WardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload>
          }
          deleteMany: {
            args: Prisma.WardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload>[]
          }
          upsert: {
            args: Prisma.WardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WardPayload>
          }
          aggregate: {
            args: Prisma.WardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWard>
          }
          groupBy: {
            args: Prisma.WardGroupByArgs<ExtArgs>
            result: $Utils.Optional<WardGroupByOutputType>[]
          }
          count: {
            args: Prisma.WardCountArgs<ExtArgs>
            result: $Utils.Optional<WardCountAggregateOutputType> | number
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
    generalConfig?: GeneralConfigOmit
    emailConfig?: EmailConfigOmit
    menu?: MenuOmit
    country?: CountryOmit
    province?: ProvinceOmit
    ward?: WardOmit
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
   * Count Type MenuCountOutputType
   */

  export type MenuCountOutputType = {
    children: number
  }

  export type MenuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | MenuCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * MenuCountOutputType without action
   */
  export type MenuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCountOutputType
     */
    select?: MenuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MenuCountOutputType without action
   */
  export type MenuCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuWhereInput
  }


  /**
   * Count Type CountryCountOutputType
   */

  export type CountryCountOutputType = {
    provinces: number
  }

  export type CountryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provinces?: boolean | CountryCountOutputTypeCountProvincesArgs
  }

  // Custom InputTypes
  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountryCountOutputType
     */
    select?: CountryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountProvincesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProvinceWhereInput
  }


  /**
   * Count Type ProvinceCountOutputType
   */

  export type ProvinceCountOutputType = {
    wards: number
  }

  export type ProvinceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wards?: boolean | ProvinceCountOutputTypeCountWardsArgs
  }

  // Custom InputTypes
  /**
   * ProvinceCountOutputType without action
   */
  export type ProvinceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProvinceCountOutputType
     */
    select?: ProvinceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProvinceCountOutputType without action
   */
  export type ProvinceCountOutputTypeCountWardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WardWhereInput
  }


  /**
   * Models
   */

  /**
   * Model GeneralConfig
   */

  export type AggregateGeneralConfig = {
    _count: GeneralConfigCountAggregateOutputType | null
    _avg: GeneralConfigAvgAggregateOutputType | null
    _sum: GeneralConfigSumAggregateOutputType | null
    _min: GeneralConfigMinAggregateOutputType | null
    _max: GeneralConfigMaxAggregateOutputType | null
  }

  export type GeneralConfigAvgAggregateOutputType = {
    id: number | null
    site_country_id: number | null
    site_province_id: number | null
    site_ward_id: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type GeneralConfigSumAggregateOutputType = {
    id: bigint | null
    site_country_id: bigint | null
    site_province_id: bigint | null
    site_ward_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type GeneralConfigMinAggregateOutputType = {
    id: bigint | null
    site_name: string | null
    site_description: string | null
    site_logo: string | null
    site_favicon: string | null
    site_email: string | null
    site_phone: string | null
    site_address: string | null
    site_country_id: bigint | null
    site_province_id: bigint | null
    site_ward_id: bigint | null
    site_copyright: string | null
    timezone: string | null
    locale: string | null
    currency: string | null
    meta_title: string | null
    meta_keywords: string | null
    og_title: string | null
    og_description: string | null
    og_image: string | null
    canonical_url: string | null
    google_analytics_id: string | null
    google_search_console: string | null
    facebook_pixel_id: string | null
    twitter_site: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GeneralConfigMaxAggregateOutputType = {
    id: bigint | null
    site_name: string | null
    site_description: string | null
    site_logo: string | null
    site_favicon: string | null
    site_email: string | null
    site_phone: string | null
    site_address: string | null
    site_country_id: bigint | null
    site_province_id: bigint | null
    site_ward_id: bigint | null
    site_copyright: string | null
    timezone: string | null
    locale: string | null
    currency: string | null
    meta_title: string | null
    meta_keywords: string | null
    og_title: string | null
    og_description: string | null
    og_image: string | null
    canonical_url: string | null
    google_analytics_id: string | null
    google_search_console: string | null
    facebook_pixel_id: string | null
    twitter_site: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GeneralConfigCountAggregateOutputType = {
    id: number
    site_name: number
    site_description: number
    site_logo: number
    site_favicon: number
    site_email: number
    site_phone: number
    site_address: number
    site_country_id: number
    site_province_id: number
    site_ward_id: number
    site_copyright: number
    timezone: number
    locale: number
    currency: number
    contact_channels: number
    meta_title: number
    meta_keywords: number
    og_title: number
    og_description: number
    og_image: number
    canonical_url: number
    google_analytics_id: number
    google_search_console: number
    facebook_pixel_id: number
    twitter_site: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type GeneralConfigAvgAggregateInputType = {
    id?: true
    site_country_id?: true
    site_province_id?: true
    site_ward_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type GeneralConfigSumAggregateInputType = {
    id?: true
    site_country_id?: true
    site_province_id?: true
    site_ward_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type GeneralConfigMinAggregateInputType = {
    id?: true
    site_name?: true
    site_description?: true
    site_logo?: true
    site_favicon?: true
    site_email?: true
    site_phone?: true
    site_address?: true
    site_country_id?: true
    site_province_id?: true
    site_ward_id?: true
    site_copyright?: true
    timezone?: true
    locale?: true
    currency?: true
    meta_title?: true
    meta_keywords?: true
    og_title?: true
    og_description?: true
    og_image?: true
    canonical_url?: true
    google_analytics_id?: true
    google_search_console?: true
    facebook_pixel_id?: true
    twitter_site?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type GeneralConfigMaxAggregateInputType = {
    id?: true
    site_name?: true
    site_description?: true
    site_logo?: true
    site_favicon?: true
    site_email?: true
    site_phone?: true
    site_address?: true
    site_country_id?: true
    site_province_id?: true
    site_ward_id?: true
    site_copyright?: true
    timezone?: true
    locale?: true
    currency?: true
    meta_title?: true
    meta_keywords?: true
    og_title?: true
    og_description?: true
    og_image?: true
    canonical_url?: true
    google_analytics_id?: true
    google_search_console?: true
    facebook_pixel_id?: true
    twitter_site?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type GeneralConfigCountAggregateInputType = {
    id?: true
    site_name?: true
    site_description?: true
    site_logo?: true
    site_favicon?: true
    site_email?: true
    site_phone?: true
    site_address?: true
    site_country_id?: true
    site_province_id?: true
    site_ward_id?: true
    site_copyright?: true
    timezone?: true
    locale?: true
    currency?: true
    contact_channels?: true
    meta_title?: true
    meta_keywords?: true
    og_title?: true
    og_description?: true
    og_image?: true
    canonical_url?: true
    google_analytics_id?: true
    google_search_console?: true
    facebook_pixel_id?: true
    twitter_site?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type GeneralConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneralConfig to aggregate.
     */
    where?: GeneralConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralConfigs to fetch.
     */
    orderBy?: GeneralConfigOrderByWithRelationInput | GeneralConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeneralConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeneralConfigs
    **/
    _count?: true | GeneralConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GeneralConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GeneralConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeneralConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeneralConfigMaxAggregateInputType
  }

  export type GetGeneralConfigAggregateType<T extends GeneralConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateGeneralConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeneralConfig[P]>
      : GetScalarType<T[P], AggregateGeneralConfig[P]>
  }




  export type GeneralConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneralConfigWhereInput
    orderBy?: GeneralConfigOrderByWithAggregationInput | GeneralConfigOrderByWithAggregationInput[]
    by: GeneralConfigScalarFieldEnum[] | GeneralConfigScalarFieldEnum
    having?: GeneralConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeneralConfigCountAggregateInputType | true
    _avg?: GeneralConfigAvgAggregateInputType
    _sum?: GeneralConfigSumAggregateInputType
    _min?: GeneralConfigMinAggregateInputType
    _max?: GeneralConfigMaxAggregateInputType
  }

  export type GeneralConfigGroupByOutputType = {
    id: bigint
    site_name: string
    site_description: string | null
    site_logo: string | null
    site_favicon: string | null
    site_email: string | null
    site_phone: string | null
    site_address: string | null
    site_country_id: bigint | null
    site_province_id: bigint | null
    site_ward_id: bigint | null
    site_copyright: string | null
    timezone: string
    locale: string
    currency: string
    contact_channels: JsonValue | null
    meta_title: string | null
    meta_keywords: string | null
    og_title: string | null
    og_description: string | null
    og_image: string | null
    canonical_url: string | null
    google_analytics_id: string | null
    google_search_console: string | null
    facebook_pixel_id: string | null
    twitter_site: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: GeneralConfigCountAggregateOutputType | null
    _avg: GeneralConfigAvgAggregateOutputType | null
    _sum: GeneralConfigSumAggregateOutputType | null
    _min: GeneralConfigMinAggregateOutputType | null
    _max: GeneralConfigMaxAggregateOutputType | null
  }

  type GetGeneralConfigGroupByPayload<T extends GeneralConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeneralConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeneralConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeneralConfigGroupByOutputType[P]>
            : GetScalarType<T[P], GeneralConfigGroupByOutputType[P]>
        }
      >
    >


  export type GeneralConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site_name?: boolean
    site_description?: boolean
    site_logo?: boolean
    site_favicon?: boolean
    site_email?: boolean
    site_phone?: boolean
    site_address?: boolean
    site_country_id?: boolean
    site_province_id?: boolean
    site_ward_id?: boolean
    site_copyright?: boolean
    timezone?: boolean
    locale?: boolean
    currency?: boolean
    contact_channels?: boolean
    meta_title?: boolean
    meta_keywords?: boolean
    og_title?: boolean
    og_description?: boolean
    og_image?: boolean
    canonical_url?: boolean
    google_analytics_id?: boolean
    google_search_console?: boolean
    facebook_pixel_id?: boolean
    twitter_site?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["generalConfig"]>

  export type GeneralConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site_name?: boolean
    site_description?: boolean
    site_logo?: boolean
    site_favicon?: boolean
    site_email?: boolean
    site_phone?: boolean
    site_address?: boolean
    site_country_id?: boolean
    site_province_id?: boolean
    site_ward_id?: boolean
    site_copyright?: boolean
    timezone?: boolean
    locale?: boolean
    currency?: boolean
    contact_channels?: boolean
    meta_title?: boolean
    meta_keywords?: boolean
    og_title?: boolean
    og_description?: boolean
    og_image?: boolean
    canonical_url?: boolean
    google_analytics_id?: boolean
    google_search_console?: boolean
    facebook_pixel_id?: boolean
    twitter_site?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["generalConfig"]>

  export type GeneralConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site_name?: boolean
    site_description?: boolean
    site_logo?: boolean
    site_favicon?: boolean
    site_email?: boolean
    site_phone?: boolean
    site_address?: boolean
    site_country_id?: boolean
    site_province_id?: boolean
    site_ward_id?: boolean
    site_copyright?: boolean
    timezone?: boolean
    locale?: boolean
    currency?: boolean
    contact_channels?: boolean
    meta_title?: boolean
    meta_keywords?: boolean
    og_title?: boolean
    og_description?: boolean
    og_image?: boolean
    canonical_url?: boolean
    google_analytics_id?: boolean
    google_search_console?: boolean
    facebook_pixel_id?: boolean
    twitter_site?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["generalConfig"]>

  export type GeneralConfigSelectScalar = {
    id?: boolean
    site_name?: boolean
    site_description?: boolean
    site_logo?: boolean
    site_favicon?: boolean
    site_email?: boolean
    site_phone?: boolean
    site_address?: boolean
    site_country_id?: boolean
    site_province_id?: boolean
    site_ward_id?: boolean
    site_copyright?: boolean
    timezone?: boolean
    locale?: boolean
    currency?: boolean
    contact_channels?: boolean
    meta_title?: boolean
    meta_keywords?: boolean
    og_title?: boolean
    og_description?: boolean
    og_image?: boolean
    canonical_url?: boolean
    google_analytics_id?: boolean
    google_search_console?: boolean
    facebook_pixel_id?: boolean
    twitter_site?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type GeneralConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "site_name" | "site_description" | "site_logo" | "site_favicon" | "site_email" | "site_phone" | "site_address" | "site_country_id" | "site_province_id" | "site_ward_id" | "site_copyright" | "timezone" | "locale" | "currency" | "contact_channels" | "meta_title" | "meta_keywords" | "og_title" | "og_description" | "og_image" | "canonical_url" | "google_analytics_id" | "google_search_console" | "facebook_pixel_id" | "twitter_site" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["generalConfig"]>

  export type $GeneralConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeneralConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      site_name: string
      site_description: string | null
      site_logo: string | null
      site_favicon: string | null
      site_email: string | null
      site_phone: string | null
      site_address: string | null
      site_country_id: bigint | null
      site_province_id: bigint | null
      site_ward_id: bigint | null
      site_copyright: string | null
      timezone: string
      locale: string
      currency: string
      contact_channels: Prisma.JsonValue | null
      meta_title: string | null
      meta_keywords: string | null
      og_title: string | null
      og_description: string | null
      og_image: string | null
      canonical_url: string | null
      google_analytics_id: string | null
      google_search_console: string | null
      facebook_pixel_id: string | null
      twitter_site: string | null
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["generalConfig"]>
    composites: {}
  }

  type GeneralConfigGetPayload<S extends boolean | null | undefined | GeneralConfigDefaultArgs> = $Result.GetResult<Prisma.$GeneralConfigPayload, S>

  type GeneralConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GeneralConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeneralConfigCountAggregateInputType | true
    }

  export interface GeneralConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeneralConfig'], meta: { name: 'GeneralConfig' } }
    /**
     * Find zero or one GeneralConfig that matches the filter.
     * @param {GeneralConfigFindUniqueArgs} args - Arguments to find a GeneralConfig
     * @example
     * // Get one GeneralConfig
     * const generalConfig = await prisma.generalConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeneralConfigFindUniqueArgs>(args: SelectSubset<T, GeneralConfigFindUniqueArgs<ExtArgs>>): Prisma__GeneralConfigClient<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GeneralConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GeneralConfigFindUniqueOrThrowArgs} args - Arguments to find a GeneralConfig
     * @example
     * // Get one GeneralConfig
     * const generalConfig = await prisma.generalConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeneralConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, GeneralConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeneralConfigClient<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneralConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralConfigFindFirstArgs} args - Arguments to find a GeneralConfig
     * @example
     * // Get one GeneralConfig
     * const generalConfig = await prisma.generalConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeneralConfigFindFirstArgs>(args?: SelectSubset<T, GeneralConfigFindFirstArgs<ExtArgs>>): Prisma__GeneralConfigClient<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneralConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralConfigFindFirstOrThrowArgs} args - Arguments to find a GeneralConfig
     * @example
     * // Get one GeneralConfig
     * const generalConfig = await prisma.generalConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeneralConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, GeneralConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeneralConfigClient<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GeneralConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeneralConfigs
     * const generalConfigs = await prisma.generalConfig.findMany()
     * 
     * // Get first 10 GeneralConfigs
     * const generalConfigs = await prisma.generalConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const generalConfigWithIdOnly = await prisma.generalConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeneralConfigFindManyArgs>(args?: SelectSubset<T, GeneralConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GeneralConfig.
     * @param {GeneralConfigCreateArgs} args - Arguments to create a GeneralConfig.
     * @example
     * // Create one GeneralConfig
     * const GeneralConfig = await prisma.generalConfig.create({
     *   data: {
     *     // ... data to create a GeneralConfig
     *   }
     * })
     * 
     */
    create<T extends GeneralConfigCreateArgs>(args: SelectSubset<T, GeneralConfigCreateArgs<ExtArgs>>): Prisma__GeneralConfigClient<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GeneralConfigs.
     * @param {GeneralConfigCreateManyArgs} args - Arguments to create many GeneralConfigs.
     * @example
     * // Create many GeneralConfigs
     * const generalConfig = await prisma.generalConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeneralConfigCreateManyArgs>(args?: SelectSubset<T, GeneralConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeneralConfigs and returns the data saved in the database.
     * @param {GeneralConfigCreateManyAndReturnArgs} args - Arguments to create many GeneralConfigs.
     * @example
     * // Create many GeneralConfigs
     * const generalConfig = await prisma.generalConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeneralConfigs and only return the `id`
     * const generalConfigWithIdOnly = await prisma.generalConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeneralConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, GeneralConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GeneralConfig.
     * @param {GeneralConfigDeleteArgs} args - Arguments to delete one GeneralConfig.
     * @example
     * // Delete one GeneralConfig
     * const GeneralConfig = await prisma.generalConfig.delete({
     *   where: {
     *     // ... filter to delete one GeneralConfig
     *   }
     * })
     * 
     */
    delete<T extends GeneralConfigDeleteArgs>(args: SelectSubset<T, GeneralConfigDeleteArgs<ExtArgs>>): Prisma__GeneralConfigClient<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GeneralConfig.
     * @param {GeneralConfigUpdateArgs} args - Arguments to update one GeneralConfig.
     * @example
     * // Update one GeneralConfig
     * const generalConfig = await prisma.generalConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeneralConfigUpdateArgs>(args: SelectSubset<T, GeneralConfigUpdateArgs<ExtArgs>>): Prisma__GeneralConfigClient<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GeneralConfigs.
     * @param {GeneralConfigDeleteManyArgs} args - Arguments to filter GeneralConfigs to delete.
     * @example
     * // Delete a few GeneralConfigs
     * const { count } = await prisma.generalConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeneralConfigDeleteManyArgs>(args?: SelectSubset<T, GeneralConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneralConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeneralConfigs
     * const generalConfig = await prisma.generalConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeneralConfigUpdateManyArgs>(args: SelectSubset<T, GeneralConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneralConfigs and returns the data updated in the database.
     * @param {GeneralConfigUpdateManyAndReturnArgs} args - Arguments to update many GeneralConfigs.
     * @example
     * // Update many GeneralConfigs
     * const generalConfig = await prisma.generalConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GeneralConfigs and only return the `id`
     * const generalConfigWithIdOnly = await prisma.generalConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends GeneralConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, GeneralConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GeneralConfig.
     * @param {GeneralConfigUpsertArgs} args - Arguments to update or create a GeneralConfig.
     * @example
     * // Update or create a GeneralConfig
     * const generalConfig = await prisma.generalConfig.upsert({
     *   create: {
     *     // ... data to create a GeneralConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeneralConfig we want to update
     *   }
     * })
     */
    upsert<T extends GeneralConfigUpsertArgs>(args: SelectSubset<T, GeneralConfigUpsertArgs<ExtArgs>>): Prisma__GeneralConfigClient<$Result.GetResult<Prisma.$GeneralConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GeneralConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralConfigCountArgs} args - Arguments to filter GeneralConfigs to count.
     * @example
     * // Count the number of GeneralConfigs
     * const count = await prisma.generalConfig.count({
     *   where: {
     *     // ... the filter for the GeneralConfigs we want to count
     *   }
     * })
    **/
    count<T extends GeneralConfigCountArgs>(
      args?: Subset<T, GeneralConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeneralConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeneralConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GeneralConfigAggregateArgs>(args: Subset<T, GeneralConfigAggregateArgs>): Prisma.PrismaPromise<GetGeneralConfigAggregateType<T>>

    /**
     * Group by GeneralConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralConfigGroupByArgs} args - Group by arguments.
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
      T extends GeneralConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeneralConfigGroupByArgs['orderBy'] }
        : { orderBy?: GeneralConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GeneralConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeneralConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeneralConfig model
   */
  readonly fields: GeneralConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeneralConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeneralConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the GeneralConfig model
   */
  interface GeneralConfigFieldRefs {
    readonly id: FieldRef<"GeneralConfig", 'BigInt'>
    readonly site_name: FieldRef<"GeneralConfig", 'String'>
    readonly site_description: FieldRef<"GeneralConfig", 'String'>
    readonly site_logo: FieldRef<"GeneralConfig", 'String'>
    readonly site_favicon: FieldRef<"GeneralConfig", 'String'>
    readonly site_email: FieldRef<"GeneralConfig", 'String'>
    readonly site_phone: FieldRef<"GeneralConfig", 'String'>
    readonly site_address: FieldRef<"GeneralConfig", 'String'>
    readonly site_country_id: FieldRef<"GeneralConfig", 'BigInt'>
    readonly site_province_id: FieldRef<"GeneralConfig", 'BigInt'>
    readonly site_ward_id: FieldRef<"GeneralConfig", 'BigInt'>
    readonly site_copyright: FieldRef<"GeneralConfig", 'String'>
    readonly timezone: FieldRef<"GeneralConfig", 'String'>
    readonly locale: FieldRef<"GeneralConfig", 'String'>
    readonly currency: FieldRef<"GeneralConfig", 'String'>
    readonly contact_channels: FieldRef<"GeneralConfig", 'Json'>
    readonly meta_title: FieldRef<"GeneralConfig", 'String'>
    readonly meta_keywords: FieldRef<"GeneralConfig", 'String'>
    readonly og_title: FieldRef<"GeneralConfig", 'String'>
    readonly og_description: FieldRef<"GeneralConfig", 'String'>
    readonly og_image: FieldRef<"GeneralConfig", 'String'>
    readonly canonical_url: FieldRef<"GeneralConfig", 'String'>
    readonly google_analytics_id: FieldRef<"GeneralConfig", 'String'>
    readonly google_search_console: FieldRef<"GeneralConfig", 'String'>
    readonly facebook_pixel_id: FieldRef<"GeneralConfig", 'String'>
    readonly twitter_site: FieldRef<"GeneralConfig", 'String'>
    readonly created_user_id: FieldRef<"GeneralConfig", 'BigInt'>
    readonly updated_user_id: FieldRef<"GeneralConfig", 'BigInt'>
    readonly created_at: FieldRef<"GeneralConfig", 'DateTime'>
    readonly updated_at: FieldRef<"GeneralConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GeneralConfig findUnique
   */
  export type GeneralConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * Filter, which GeneralConfig to fetch.
     */
    where: GeneralConfigWhereUniqueInput
  }

  /**
   * GeneralConfig findUniqueOrThrow
   */
  export type GeneralConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * Filter, which GeneralConfig to fetch.
     */
    where: GeneralConfigWhereUniqueInput
  }

  /**
   * GeneralConfig findFirst
   */
  export type GeneralConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * Filter, which GeneralConfig to fetch.
     */
    where?: GeneralConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralConfigs to fetch.
     */
    orderBy?: GeneralConfigOrderByWithRelationInput | GeneralConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneralConfigs.
     */
    cursor?: GeneralConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneralConfigs.
     */
    distinct?: GeneralConfigScalarFieldEnum | GeneralConfigScalarFieldEnum[]
  }

  /**
   * GeneralConfig findFirstOrThrow
   */
  export type GeneralConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * Filter, which GeneralConfig to fetch.
     */
    where?: GeneralConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralConfigs to fetch.
     */
    orderBy?: GeneralConfigOrderByWithRelationInput | GeneralConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneralConfigs.
     */
    cursor?: GeneralConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneralConfigs.
     */
    distinct?: GeneralConfigScalarFieldEnum | GeneralConfigScalarFieldEnum[]
  }

  /**
   * GeneralConfig findMany
   */
  export type GeneralConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * Filter, which GeneralConfigs to fetch.
     */
    where?: GeneralConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralConfigs to fetch.
     */
    orderBy?: GeneralConfigOrderByWithRelationInput | GeneralConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeneralConfigs.
     */
    cursor?: GeneralConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneralConfigs.
     */
    distinct?: GeneralConfigScalarFieldEnum | GeneralConfigScalarFieldEnum[]
  }

  /**
   * GeneralConfig create
   */
  export type GeneralConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a GeneralConfig.
     */
    data: XOR<GeneralConfigCreateInput, GeneralConfigUncheckedCreateInput>
  }

  /**
   * GeneralConfig createMany
   */
  export type GeneralConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeneralConfigs.
     */
    data: GeneralConfigCreateManyInput | GeneralConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneralConfig createManyAndReturn
   */
  export type GeneralConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * The data used to create many GeneralConfigs.
     */
    data: GeneralConfigCreateManyInput | GeneralConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneralConfig update
   */
  export type GeneralConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a GeneralConfig.
     */
    data: XOR<GeneralConfigUpdateInput, GeneralConfigUncheckedUpdateInput>
    /**
     * Choose, which GeneralConfig to update.
     */
    where: GeneralConfigWhereUniqueInput
  }

  /**
   * GeneralConfig updateMany
   */
  export type GeneralConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeneralConfigs.
     */
    data: XOR<GeneralConfigUpdateManyMutationInput, GeneralConfigUncheckedUpdateManyInput>
    /**
     * Filter which GeneralConfigs to update
     */
    where?: GeneralConfigWhereInput
    /**
     * Limit how many GeneralConfigs to update.
     */
    limit?: number
  }

  /**
   * GeneralConfig updateManyAndReturn
   */
  export type GeneralConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * The data used to update GeneralConfigs.
     */
    data: XOR<GeneralConfigUpdateManyMutationInput, GeneralConfigUncheckedUpdateManyInput>
    /**
     * Filter which GeneralConfigs to update
     */
    where?: GeneralConfigWhereInput
    /**
     * Limit how many GeneralConfigs to update.
     */
    limit?: number
  }

  /**
   * GeneralConfig upsert
   */
  export type GeneralConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the GeneralConfig to update in case it exists.
     */
    where: GeneralConfigWhereUniqueInput
    /**
     * In case the GeneralConfig found by the `where` argument doesn't exist, create a new GeneralConfig with this data.
     */
    create: XOR<GeneralConfigCreateInput, GeneralConfigUncheckedCreateInput>
    /**
     * In case the GeneralConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeneralConfigUpdateInput, GeneralConfigUncheckedUpdateInput>
  }

  /**
   * GeneralConfig delete
   */
  export type GeneralConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
    /**
     * Filter which GeneralConfig to delete.
     */
    where: GeneralConfigWhereUniqueInput
  }

  /**
   * GeneralConfig deleteMany
   */
  export type GeneralConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneralConfigs to delete
     */
    where?: GeneralConfigWhereInput
    /**
     * Limit how many GeneralConfigs to delete.
     */
    limit?: number
  }

  /**
   * GeneralConfig without action
   */
  export type GeneralConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralConfig
     */
    select?: GeneralConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralConfig
     */
    omit?: GeneralConfigOmit<ExtArgs> | null
  }


  /**
   * Model EmailConfig
   */

  export type AggregateEmailConfig = {
    _count: EmailConfigCountAggregateOutputType | null
    _avg: EmailConfigAvgAggregateOutputType | null
    _sum: EmailConfigSumAggregateOutputType | null
    _min: EmailConfigMinAggregateOutputType | null
    _max: EmailConfigMaxAggregateOutputType | null
  }

  export type EmailConfigAvgAggregateOutputType = {
    id: number | null
    smtp_port: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type EmailConfigSumAggregateOutputType = {
    id: bigint | null
    smtp_port: number | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type EmailConfigMinAggregateOutputType = {
    id: bigint | null
    smtp_host: string | null
    smtp_port: number | null
    smtp_secure: boolean | null
    smtp_username: string | null
    smtp_password: string | null
    from_email: string | null
    from_name: string | null
    reply_to_email: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmailConfigMaxAggregateOutputType = {
    id: bigint | null
    smtp_host: string | null
    smtp_port: number | null
    smtp_secure: boolean | null
    smtp_username: string | null
    smtp_password: string | null
    from_email: string | null
    from_name: string | null
    reply_to_email: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmailConfigCountAggregateOutputType = {
    id: number
    smtp_host: number
    smtp_port: number
    smtp_secure: number
    smtp_username: number
    smtp_password: number
    from_email: number
    from_name: number
    reply_to_email: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EmailConfigAvgAggregateInputType = {
    id?: true
    smtp_port?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type EmailConfigSumAggregateInputType = {
    id?: true
    smtp_port?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type EmailConfigMinAggregateInputType = {
    id?: true
    smtp_host?: true
    smtp_port?: true
    smtp_secure?: true
    smtp_username?: true
    smtp_password?: true
    from_email?: true
    from_name?: true
    reply_to_email?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type EmailConfigMaxAggregateInputType = {
    id?: true
    smtp_host?: true
    smtp_port?: true
    smtp_secure?: true
    smtp_username?: true
    smtp_password?: true
    from_email?: true
    from_name?: true
    reply_to_email?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type EmailConfigCountAggregateInputType = {
    id?: true
    smtp_host?: true
    smtp_port?: true
    smtp_secure?: true
    smtp_username?: true
    smtp_password?: true
    from_email?: true
    from_name?: true
    reply_to_email?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EmailConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailConfig to aggregate.
     */
    where?: EmailConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailConfigs to fetch.
     */
    orderBy?: EmailConfigOrderByWithRelationInput | EmailConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailConfigs
    **/
    _count?: true | EmailConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailConfigMaxAggregateInputType
  }

  export type GetEmailConfigAggregateType<T extends EmailConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailConfig[P]>
      : GetScalarType<T[P], AggregateEmailConfig[P]>
  }




  export type EmailConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailConfigWhereInput
    orderBy?: EmailConfigOrderByWithAggregationInput | EmailConfigOrderByWithAggregationInput[]
    by: EmailConfigScalarFieldEnum[] | EmailConfigScalarFieldEnum
    having?: EmailConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailConfigCountAggregateInputType | true
    _avg?: EmailConfigAvgAggregateInputType
    _sum?: EmailConfigSumAggregateInputType
    _min?: EmailConfigMinAggregateInputType
    _max?: EmailConfigMaxAggregateInputType
  }

  export type EmailConfigGroupByOutputType = {
    id: bigint
    smtp_host: string
    smtp_port: number
    smtp_secure: boolean
    smtp_username: string
    smtp_password: string
    from_email: string
    from_name: string
    reply_to_email: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: EmailConfigCountAggregateOutputType | null
    _avg: EmailConfigAvgAggregateOutputType | null
    _sum: EmailConfigSumAggregateOutputType | null
    _min: EmailConfigMinAggregateOutputType | null
    _max: EmailConfigMaxAggregateOutputType | null
  }

  type GetEmailConfigGroupByPayload<T extends EmailConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailConfigGroupByOutputType[P]>
            : GetScalarType<T[P], EmailConfigGroupByOutputType[P]>
        }
      >
    >


  export type EmailConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    smtp_host?: boolean
    smtp_port?: boolean
    smtp_secure?: boolean
    smtp_username?: boolean
    smtp_password?: boolean
    from_email?: boolean
    from_name?: boolean
    reply_to_email?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["emailConfig"]>

  export type EmailConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    smtp_host?: boolean
    smtp_port?: boolean
    smtp_secure?: boolean
    smtp_username?: boolean
    smtp_password?: boolean
    from_email?: boolean
    from_name?: boolean
    reply_to_email?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["emailConfig"]>

  export type EmailConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    smtp_host?: boolean
    smtp_port?: boolean
    smtp_secure?: boolean
    smtp_username?: boolean
    smtp_password?: boolean
    from_email?: boolean
    from_name?: boolean
    reply_to_email?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["emailConfig"]>

  export type EmailConfigSelectScalar = {
    id?: boolean
    smtp_host?: boolean
    smtp_port?: boolean
    smtp_secure?: boolean
    smtp_username?: boolean
    smtp_password?: boolean
    from_email?: boolean
    from_name?: boolean
    reply_to_email?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type EmailConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "smtp_host" | "smtp_port" | "smtp_secure" | "smtp_username" | "smtp_password" | "from_email" | "from_name" | "reply_to_email" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["emailConfig"]>

  export type $EmailConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      smtp_host: string
      smtp_port: number
      smtp_secure: boolean
      smtp_username: string
      smtp_password: string
      from_email: string
      from_name: string
      reply_to_email: string | null
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["emailConfig"]>
    composites: {}
  }

  type EmailConfigGetPayload<S extends boolean | null | undefined | EmailConfigDefaultArgs> = $Result.GetResult<Prisma.$EmailConfigPayload, S>

  type EmailConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailConfigCountAggregateInputType | true
    }

  export interface EmailConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailConfig'], meta: { name: 'EmailConfig' } }
    /**
     * Find zero or one EmailConfig that matches the filter.
     * @param {EmailConfigFindUniqueArgs} args - Arguments to find a EmailConfig
     * @example
     * // Get one EmailConfig
     * const emailConfig = await prisma.emailConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailConfigFindUniqueArgs>(args: SelectSubset<T, EmailConfigFindUniqueArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailConfigFindUniqueOrThrowArgs} args - Arguments to find a EmailConfig
     * @example
     * // Get one EmailConfig
     * const emailConfig = await prisma.emailConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigFindFirstArgs} args - Arguments to find a EmailConfig
     * @example
     * // Get one EmailConfig
     * const emailConfig = await prisma.emailConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailConfigFindFirstArgs>(args?: SelectSubset<T, EmailConfigFindFirstArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigFindFirstOrThrowArgs} args - Arguments to find a EmailConfig
     * @example
     * // Get one EmailConfig
     * const emailConfig = await prisma.emailConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailConfigs
     * const emailConfigs = await prisma.emailConfig.findMany()
     * 
     * // Get first 10 EmailConfigs
     * const emailConfigs = await prisma.emailConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailConfigWithIdOnly = await prisma.emailConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailConfigFindManyArgs>(args?: SelectSubset<T, EmailConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailConfig.
     * @param {EmailConfigCreateArgs} args - Arguments to create a EmailConfig.
     * @example
     * // Create one EmailConfig
     * const EmailConfig = await prisma.emailConfig.create({
     *   data: {
     *     // ... data to create a EmailConfig
     *   }
     * })
     * 
     */
    create<T extends EmailConfigCreateArgs>(args: SelectSubset<T, EmailConfigCreateArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailConfigs.
     * @param {EmailConfigCreateManyArgs} args - Arguments to create many EmailConfigs.
     * @example
     * // Create many EmailConfigs
     * const emailConfig = await prisma.emailConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailConfigCreateManyArgs>(args?: SelectSubset<T, EmailConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailConfigs and returns the data saved in the database.
     * @param {EmailConfigCreateManyAndReturnArgs} args - Arguments to create many EmailConfigs.
     * @example
     * // Create many EmailConfigs
     * const emailConfig = await prisma.emailConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailConfigs and only return the `id`
     * const emailConfigWithIdOnly = await prisma.emailConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailConfig.
     * @param {EmailConfigDeleteArgs} args - Arguments to delete one EmailConfig.
     * @example
     * // Delete one EmailConfig
     * const EmailConfig = await prisma.emailConfig.delete({
     *   where: {
     *     // ... filter to delete one EmailConfig
     *   }
     * })
     * 
     */
    delete<T extends EmailConfigDeleteArgs>(args: SelectSubset<T, EmailConfigDeleteArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailConfig.
     * @param {EmailConfigUpdateArgs} args - Arguments to update one EmailConfig.
     * @example
     * // Update one EmailConfig
     * const emailConfig = await prisma.emailConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailConfigUpdateArgs>(args: SelectSubset<T, EmailConfigUpdateArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailConfigs.
     * @param {EmailConfigDeleteManyArgs} args - Arguments to filter EmailConfigs to delete.
     * @example
     * // Delete a few EmailConfigs
     * const { count } = await prisma.emailConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailConfigDeleteManyArgs>(args?: SelectSubset<T, EmailConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailConfigs
     * const emailConfig = await prisma.emailConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailConfigUpdateManyArgs>(args: SelectSubset<T, EmailConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailConfigs and returns the data updated in the database.
     * @param {EmailConfigUpdateManyAndReturnArgs} args - Arguments to update many EmailConfigs.
     * @example
     * // Update many EmailConfigs
     * const emailConfig = await prisma.emailConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailConfigs and only return the `id`
     * const emailConfigWithIdOnly = await prisma.emailConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmailConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailConfig.
     * @param {EmailConfigUpsertArgs} args - Arguments to update or create a EmailConfig.
     * @example
     * // Update or create a EmailConfig
     * const emailConfig = await prisma.emailConfig.upsert({
     *   create: {
     *     // ... data to create a EmailConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailConfig we want to update
     *   }
     * })
     */
    upsert<T extends EmailConfigUpsertArgs>(args: SelectSubset<T, EmailConfigUpsertArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigCountArgs} args - Arguments to filter EmailConfigs to count.
     * @example
     * // Count the number of EmailConfigs
     * const count = await prisma.emailConfig.count({
     *   where: {
     *     // ... the filter for the EmailConfigs we want to count
     *   }
     * })
    **/
    count<T extends EmailConfigCountArgs>(
      args?: Subset<T, EmailConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmailConfigAggregateArgs>(args: Subset<T, EmailConfigAggregateArgs>): Prisma.PrismaPromise<GetEmailConfigAggregateType<T>>

    /**
     * Group by EmailConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigGroupByArgs} args - Group by arguments.
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
      T extends EmailConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailConfigGroupByArgs['orderBy'] }
        : { orderBy?: EmailConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmailConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailConfig model
   */
  readonly fields: EmailConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the EmailConfig model
   */
  interface EmailConfigFieldRefs {
    readonly id: FieldRef<"EmailConfig", 'BigInt'>
    readonly smtp_host: FieldRef<"EmailConfig", 'String'>
    readonly smtp_port: FieldRef<"EmailConfig", 'Int'>
    readonly smtp_secure: FieldRef<"EmailConfig", 'Boolean'>
    readonly smtp_username: FieldRef<"EmailConfig", 'String'>
    readonly smtp_password: FieldRef<"EmailConfig", 'String'>
    readonly from_email: FieldRef<"EmailConfig", 'String'>
    readonly from_name: FieldRef<"EmailConfig", 'String'>
    readonly reply_to_email: FieldRef<"EmailConfig", 'String'>
    readonly created_user_id: FieldRef<"EmailConfig", 'BigInt'>
    readonly updated_user_id: FieldRef<"EmailConfig", 'BigInt'>
    readonly created_at: FieldRef<"EmailConfig", 'DateTime'>
    readonly updated_at: FieldRef<"EmailConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailConfig findUnique
   */
  export type EmailConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailConfig to fetch.
     */
    where: EmailConfigWhereUniqueInput
  }

  /**
   * EmailConfig findUniqueOrThrow
   */
  export type EmailConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailConfig to fetch.
     */
    where: EmailConfigWhereUniqueInput
  }

  /**
   * EmailConfig findFirst
   */
  export type EmailConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailConfig to fetch.
     */
    where?: EmailConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailConfigs to fetch.
     */
    orderBy?: EmailConfigOrderByWithRelationInput | EmailConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailConfigs.
     */
    cursor?: EmailConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailConfigs.
     */
    distinct?: EmailConfigScalarFieldEnum | EmailConfigScalarFieldEnum[]
  }

  /**
   * EmailConfig findFirstOrThrow
   */
  export type EmailConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailConfig to fetch.
     */
    where?: EmailConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailConfigs to fetch.
     */
    orderBy?: EmailConfigOrderByWithRelationInput | EmailConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailConfigs.
     */
    cursor?: EmailConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailConfigs.
     */
    distinct?: EmailConfigScalarFieldEnum | EmailConfigScalarFieldEnum[]
  }

  /**
   * EmailConfig findMany
   */
  export type EmailConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * Filter, which EmailConfigs to fetch.
     */
    where?: EmailConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailConfigs to fetch.
     */
    orderBy?: EmailConfigOrderByWithRelationInput | EmailConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailConfigs.
     */
    cursor?: EmailConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailConfigs.
     */
    distinct?: EmailConfigScalarFieldEnum | EmailConfigScalarFieldEnum[]
  }

  /**
   * EmailConfig create
   */
  export type EmailConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a EmailConfig.
     */
    data: XOR<EmailConfigCreateInput, EmailConfigUncheckedCreateInput>
  }

  /**
   * EmailConfig createMany
   */
  export type EmailConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailConfigs.
     */
    data: EmailConfigCreateManyInput | EmailConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailConfig createManyAndReturn
   */
  export type EmailConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * The data used to create many EmailConfigs.
     */
    data: EmailConfigCreateManyInput | EmailConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailConfig update
   */
  export type EmailConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a EmailConfig.
     */
    data: XOR<EmailConfigUpdateInput, EmailConfigUncheckedUpdateInput>
    /**
     * Choose, which EmailConfig to update.
     */
    where: EmailConfigWhereUniqueInput
  }

  /**
   * EmailConfig updateMany
   */
  export type EmailConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailConfigs.
     */
    data: XOR<EmailConfigUpdateManyMutationInput, EmailConfigUncheckedUpdateManyInput>
    /**
     * Filter which EmailConfigs to update
     */
    where?: EmailConfigWhereInput
    /**
     * Limit how many EmailConfigs to update.
     */
    limit?: number
  }

  /**
   * EmailConfig updateManyAndReturn
   */
  export type EmailConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * The data used to update EmailConfigs.
     */
    data: XOR<EmailConfigUpdateManyMutationInput, EmailConfigUncheckedUpdateManyInput>
    /**
     * Filter which EmailConfigs to update
     */
    where?: EmailConfigWhereInput
    /**
     * Limit how many EmailConfigs to update.
     */
    limit?: number
  }

  /**
   * EmailConfig upsert
   */
  export type EmailConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the EmailConfig to update in case it exists.
     */
    where: EmailConfigWhereUniqueInput
    /**
     * In case the EmailConfig found by the `where` argument doesn't exist, create a new EmailConfig with this data.
     */
    create: XOR<EmailConfigCreateInput, EmailConfigUncheckedCreateInput>
    /**
     * In case the EmailConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailConfigUpdateInput, EmailConfigUncheckedUpdateInput>
  }

  /**
   * EmailConfig delete
   */
  export type EmailConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
    /**
     * Filter which EmailConfig to delete.
     */
    where: EmailConfigWhereUniqueInput
  }

  /**
   * EmailConfig deleteMany
   */
  export type EmailConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailConfigs to delete
     */
    where?: EmailConfigWhereInput
    /**
     * Limit how many EmailConfigs to delete.
     */
    limit?: number
  }

  /**
   * EmailConfig without action
   */
  export type EmailConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailConfig
     */
    omit?: EmailConfigOmit<ExtArgs> | null
  }


  /**
   * Model Menu
   */

  export type AggregateMenu = {
    _count: MenuCountAggregateOutputType | null
    _avg: MenuAvgAggregateOutputType | null
    _sum: MenuSumAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  export type MenuAvgAggregateOutputType = {
    id: number | null
    parent_id: number | null
    sort_order: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type MenuSumAggregateOutputType = {
    id: bigint | null
    parent_id: bigint | null
    sort_order: number | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type MenuMinAggregateOutputType = {
    id: bigint | null
    code: string | null
    name: string | null
    path: string | null
    api_path: string | null
    icon: string | null
    type: string | null
    status: string | null
    parent_id: bigint | null
    sort_order: number | null
    is_public: boolean | null
    show_in_menu: boolean | null
    group: string | null
    required_permission_code: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MenuMaxAggregateOutputType = {
    id: bigint | null
    code: string | null
    name: string | null
    path: string | null
    api_path: string | null
    icon: string | null
    type: string | null
    status: string | null
    parent_id: bigint | null
    sort_order: number | null
    is_public: boolean | null
    show_in_menu: boolean | null
    group: string | null
    required_permission_code: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MenuCountAggregateOutputType = {
    id: number
    code: number
    name: number
    path: number
    api_path: number
    icon: number
    type: number
    status: number
    parent_id: number
    sort_order: number
    is_public: number
    show_in_menu: number
    group: number
    required_permission_code: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type MenuAvgAggregateInputType = {
    id?: true
    parent_id?: true
    sort_order?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type MenuSumAggregateInputType = {
    id?: true
    parent_id?: true
    sort_order?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type MenuMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    path?: true
    api_path?: true
    icon?: true
    type?: true
    status?: true
    parent_id?: true
    sort_order?: true
    is_public?: true
    show_in_menu?: true
    group?: true
    required_permission_code?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type MenuMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    path?: true
    api_path?: true
    icon?: true
    type?: true
    status?: true
    parent_id?: true
    sort_order?: true
    is_public?: true
    show_in_menu?: true
    group?: true
    required_permission_code?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type MenuCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    path?: true
    api_path?: true
    icon?: true
    type?: true
    status?: true
    parent_id?: true
    sort_order?: true
    is_public?: true
    show_in_menu?: true
    group?: true
    required_permission_code?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type MenuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menu to aggregate.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Menus
    **/
    _count?: true | MenuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuMaxAggregateInputType
  }

  export type GetMenuAggregateType<T extends MenuAggregateArgs> = {
        [P in keyof T & keyof AggregateMenu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenu[P]>
      : GetScalarType<T[P], AggregateMenu[P]>
  }




  export type MenuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuWhereInput
    orderBy?: MenuOrderByWithAggregationInput | MenuOrderByWithAggregationInput[]
    by: MenuScalarFieldEnum[] | MenuScalarFieldEnum
    having?: MenuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuCountAggregateInputType | true
    _avg?: MenuAvgAggregateInputType
    _sum?: MenuSumAggregateInputType
    _min?: MenuMinAggregateInputType
    _max?: MenuMaxAggregateInputType
  }

  export type MenuGroupByOutputType = {
    id: bigint
    code: string
    name: string
    path: string | null
    api_path: string | null
    icon: string | null
    type: string
    status: string
    parent_id: bigint | null
    sort_order: number
    is_public: boolean
    show_in_menu: boolean
    group: string
    required_permission_code: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: MenuCountAggregateOutputType | null
    _avg: MenuAvgAggregateOutputType | null
    _sum: MenuSumAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  type GetMenuGroupByPayload<T extends MenuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuGroupByOutputType[P]>
            : GetScalarType<T[P], MenuGroupByOutputType[P]>
        }
      >
    >


  export type MenuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    path?: boolean
    api_path?: boolean
    icon?: boolean
    type?: boolean
    status?: boolean
    parent_id?: boolean
    sort_order?: boolean
    is_public?: boolean
    show_in_menu?: boolean
    group?: boolean
    required_permission_code?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Menu$parentArgs<ExtArgs>
    children?: boolean | Menu$childrenArgs<ExtArgs>
    _count?: boolean | MenuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menu"]>

  export type MenuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    path?: boolean
    api_path?: boolean
    icon?: boolean
    type?: boolean
    status?: boolean
    parent_id?: boolean
    sort_order?: boolean
    is_public?: boolean
    show_in_menu?: boolean
    group?: boolean
    required_permission_code?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Menu$parentArgs<ExtArgs>
  }, ExtArgs["result"]["menu"]>

  export type MenuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    path?: boolean
    api_path?: boolean
    icon?: boolean
    type?: boolean
    status?: boolean
    parent_id?: boolean
    sort_order?: boolean
    is_public?: boolean
    show_in_menu?: boolean
    group?: boolean
    required_permission_code?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Menu$parentArgs<ExtArgs>
  }, ExtArgs["result"]["menu"]>

  export type MenuSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    path?: boolean
    api_path?: boolean
    icon?: boolean
    type?: boolean
    status?: boolean
    parent_id?: boolean
    sort_order?: boolean
    is_public?: boolean
    show_in_menu?: boolean
    group?: boolean
    required_permission_code?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type MenuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "path" | "api_path" | "icon" | "type" | "status" | "parent_id" | "sort_order" | "is_public" | "show_in_menu" | "group" | "required_permission_code" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["menu"]>
  export type MenuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Menu$parentArgs<ExtArgs>
    children?: boolean | Menu$childrenArgs<ExtArgs>
    _count?: boolean | MenuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MenuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Menu$parentArgs<ExtArgs>
  }
  export type MenuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Menu$parentArgs<ExtArgs>
  }

  export type $MenuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Menu"
    objects: {
      parent: Prisma.$MenuPayload<ExtArgs> | null
      children: Prisma.$MenuPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      code: string
      name: string
      path: string | null
      api_path: string | null
      icon: string | null
      type: string
      status: string
      parent_id: bigint | null
      sort_order: number
      is_public: boolean
      show_in_menu: boolean
      group: string
      required_permission_code: string | null
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["menu"]>
    composites: {}
  }

  type MenuGetPayload<S extends boolean | null | undefined | MenuDefaultArgs> = $Result.GetResult<Prisma.$MenuPayload, S>

  type MenuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenuCountAggregateInputType | true
    }

  export interface MenuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Menu'], meta: { name: 'Menu' } }
    /**
     * Find zero or one Menu that matches the filter.
     * @param {MenuFindUniqueArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuFindUniqueArgs>(args: SelectSubset<T, MenuFindUniqueArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Menu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuFindUniqueOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Menu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuFindFirstArgs>(args?: SelectSubset<T, MenuFindFirstArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Menu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Menus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Menus
     * const menus = await prisma.menu.findMany()
     * 
     * // Get first 10 Menus
     * const menus = await prisma.menu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuWithIdOnly = await prisma.menu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuFindManyArgs>(args?: SelectSubset<T, MenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Menu.
     * @param {MenuCreateArgs} args - Arguments to create a Menu.
     * @example
     * // Create one Menu
     * const Menu = await prisma.menu.create({
     *   data: {
     *     // ... data to create a Menu
     *   }
     * })
     * 
     */
    create<T extends MenuCreateArgs>(args: SelectSubset<T, MenuCreateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Menus.
     * @param {MenuCreateManyArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuCreateManyArgs>(args?: SelectSubset<T, MenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Menus and returns the data saved in the database.
     * @param {MenuCreateManyAndReturnArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Menus and only return the `id`
     * const menuWithIdOnly = await prisma.menu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Menu.
     * @param {MenuDeleteArgs} args - Arguments to delete one Menu.
     * @example
     * // Delete one Menu
     * const Menu = await prisma.menu.delete({
     *   where: {
     *     // ... filter to delete one Menu
     *   }
     * })
     * 
     */
    delete<T extends MenuDeleteArgs>(args: SelectSubset<T, MenuDeleteArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Menu.
     * @param {MenuUpdateArgs} args - Arguments to update one Menu.
     * @example
     * // Update one Menu
     * const menu = await prisma.menu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuUpdateArgs>(args: SelectSubset<T, MenuUpdateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Menus.
     * @param {MenuDeleteManyArgs} args - Arguments to filter Menus to delete.
     * @example
     * // Delete a few Menus
     * const { count } = await prisma.menu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuDeleteManyArgs>(args?: SelectSubset<T, MenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Menus
     * const menu = await prisma.menu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuUpdateManyArgs>(args: SelectSubset<T, MenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Menus and returns the data updated in the database.
     * @param {MenuUpdateManyAndReturnArgs} args - Arguments to update many Menus.
     * @example
     * // Update many Menus
     * const menu = await prisma.menu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Menus and only return the `id`
     * const menuWithIdOnly = await prisma.menu.updateManyAndReturn({
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
    updateManyAndReturn<T extends MenuUpdateManyAndReturnArgs>(args: SelectSubset<T, MenuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Menu.
     * @param {MenuUpsertArgs} args - Arguments to update or create a Menu.
     * @example
     * // Update or create a Menu
     * const menu = await prisma.menu.upsert({
     *   create: {
     *     // ... data to create a Menu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Menu we want to update
     *   }
     * })
     */
    upsert<T extends MenuUpsertArgs>(args: SelectSubset<T, MenuUpsertArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCountArgs} args - Arguments to filter Menus to count.
     * @example
     * // Count the number of Menus
     * const count = await prisma.menu.count({
     *   where: {
     *     // ... the filter for the Menus we want to count
     *   }
     * })
    **/
    count<T extends MenuCountArgs>(
      args?: Subset<T, MenuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MenuAggregateArgs>(args: Subset<T, MenuAggregateArgs>): Prisma.PrismaPromise<GetMenuAggregateType<T>>

    /**
     * Group by Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuGroupByArgs} args - Group by arguments.
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
      T extends MenuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuGroupByArgs['orderBy'] }
        : { orderBy?: MenuGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Menu model
   */
  readonly fields: MenuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Menu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Menu$parentArgs<ExtArgs> = {}>(args?: Subset<T, Menu$parentArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Menu$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Menu$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Menu model
   */
  interface MenuFieldRefs {
    readonly id: FieldRef<"Menu", 'BigInt'>
    readonly code: FieldRef<"Menu", 'String'>
    readonly name: FieldRef<"Menu", 'String'>
    readonly path: FieldRef<"Menu", 'String'>
    readonly api_path: FieldRef<"Menu", 'String'>
    readonly icon: FieldRef<"Menu", 'String'>
    readonly type: FieldRef<"Menu", 'String'>
    readonly status: FieldRef<"Menu", 'String'>
    readonly parent_id: FieldRef<"Menu", 'BigInt'>
    readonly sort_order: FieldRef<"Menu", 'Int'>
    readonly is_public: FieldRef<"Menu", 'Boolean'>
    readonly show_in_menu: FieldRef<"Menu", 'Boolean'>
    readonly group: FieldRef<"Menu", 'String'>
    readonly required_permission_code: FieldRef<"Menu", 'String'>
    readonly created_user_id: FieldRef<"Menu", 'BigInt'>
    readonly updated_user_id: FieldRef<"Menu", 'BigInt'>
    readonly created_at: FieldRef<"Menu", 'DateTime'>
    readonly updated_at: FieldRef<"Menu", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Menu findUnique
   */
  export type MenuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findUniqueOrThrow
   */
  export type MenuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findFirst
   */
  export type MenuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findFirstOrThrow
   */
  export type MenuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findMany
   */
  export type MenuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter, which Menus to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu create
   */
  export type MenuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * The data needed to create a Menu.
     */
    data: XOR<MenuCreateInput, MenuUncheckedCreateInput>
  }

  /**
   * Menu createMany
   */
  export type MenuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Menus.
     */
    data: MenuCreateManyInput | MenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Menu createManyAndReturn
   */
  export type MenuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * The data used to create many Menus.
     */
    data: MenuCreateManyInput | MenuCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Menu update
   */
  export type MenuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * The data needed to update a Menu.
     */
    data: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
    /**
     * Choose, which Menu to update.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu updateMany
   */
  export type MenuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Menus.
     */
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyInput>
    /**
     * Filter which Menus to update
     */
    where?: MenuWhereInput
    /**
     * Limit how many Menus to update.
     */
    limit?: number
  }

  /**
   * Menu updateManyAndReturn
   */
  export type MenuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * The data used to update Menus.
     */
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyInput>
    /**
     * Filter which Menus to update
     */
    where?: MenuWhereInput
    /**
     * Limit how many Menus to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Menu upsert
   */
  export type MenuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * The filter to search for the Menu to update in case it exists.
     */
    where: MenuWhereUniqueInput
    /**
     * In case the Menu found by the `where` argument doesn't exist, create a new Menu with this data.
     */
    create: XOR<MenuCreateInput, MenuUncheckedCreateInput>
    /**
     * In case the Menu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
  }

  /**
   * Menu delete
   */
  export type MenuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    /**
     * Filter which Menu to delete.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu deleteMany
   */
  export type MenuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menus to delete
     */
    where?: MenuWhereInput
    /**
     * Limit how many Menus to delete.
     */
    limit?: number
  }

  /**
   * Menu.parent
   */
  export type Menu$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    where?: MenuWhereInput
  }

  /**
   * Menu.children
   */
  export type Menu$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
    where?: MenuWhereInput
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    cursor?: MenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu without action
   */
  export type MenuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuInclude<ExtArgs> | null
  }


  /**
   * Model Country
   */

  export type AggregateCountry = {
    _count: CountryCountAggregateOutputType | null
    _avg: CountryAvgAggregateOutputType | null
    _sum: CountrySumAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  export type CountryAvgAggregateOutputType = {
    id: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type CountrySumAggregateOutputType = {
    id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type CountryMinAggregateOutputType = {
    id: bigint | null
    code: string | null
    code_alpha3: string | null
    name: string | null
    official_name: string | null
    phone_code: string | null
    currency_code: string | null
    flag_emoji: string | null
    status: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CountryMaxAggregateOutputType = {
    id: bigint | null
    code: string | null
    code_alpha3: string | null
    name: string | null
    official_name: string | null
    phone_code: string | null
    currency_code: string | null
    flag_emoji: string | null
    status: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CountryCountAggregateOutputType = {
    id: number
    code: number
    code_alpha3: number
    name: number
    official_name: number
    phone_code: number
    currency_code: number
    flag_emoji: number
    status: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CountryAvgAggregateInputType = {
    id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type CountrySumAggregateInputType = {
    id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type CountryMinAggregateInputType = {
    id?: true
    code?: true
    code_alpha3?: true
    name?: true
    official_name?: true
    phone_code?: true
    currency_code?: true
    flag_emoji?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CountryMaxAggregateInputType = {
    id?: true
    code?: true
    code_alpha3?: true
    name?: true
    official_name?: true
    phone_code?: true
    currency_code?: true
    flag_emoji?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CountryCountAggregateInputType = {
    id?: true
    code?: true
    code_alpha3?: true
    name?: true
    official_name?: true
    phone_code?: true
    currency_code?: true
    flag_emoji?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CountryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Country to aggregate.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Countries
    **/
    _count?: true | CountryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CountryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CountrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountryMaxAggregateInputType
  }

  export type GetCountryAggregateType<T extends CountryAggregateArgs> = {
        [P in keyof T & keyof AggregateCountry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountry[P]>
      : GetScalarType<T[P], AggregateCountry[P]>
  }




  export type CountryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountryWhereInput
    orderBy?: CountryOrderByWithAggregationInput | CountryOrderByWithAggregationInput[]
    by: CountryScalarFieldEnum[] | CountryScalarFieldEnum
    having?: CountryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountryCountAggregateInputType | true
    _avg?: CountryAvgAggregateInputType
    _sum?: CountrySumAggregateInputType
    _min?: CountryMinAggregateInputType
    _max?: CountryMaxAggregateInputType
  }

  export type CountryGroupByOutputType = {
    id: bigint
    code: string
    code_alpha3: string | null
    name: string
    official_name: string | null
    phone_code: string | null
    currency_code: string | null
    flag_emoji: string | null
    status: string
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: CountryCountAggregateOutputType | null
    _avg: CountryAvgAggregateOutputType | null
    _sum: CountrySumAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  type GetCountryGroupByPayload<T extends CountryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountryGroupByOutputType[P]>
            : GetScalarType<T[P], CountryGroupByOutputType[P]>
        }
      >
    >


  export type CountrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    code_alpha3?: boolean
    name?: boolean
    official_name?: boolean
    phone_code?: boolean
    currency_code?: boolean
    flag_emoji?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    provinces?: boolean | Country$provincesArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["country"]>

  export type CountrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    code_alpha3?: boolean
    name?: boolean
    official_name?: boolean
    phone_code?: boolean
    currency_code?: boolean
    flag_emoji?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["country"]>

  export type CountrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    code_alpha3?: boolean
    name?: boolean
    official_name?: boolean
    phone_code?: boolean
    currency_code?: boolean
    flag_emoji?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["country"]>

  export type CountrySelectScalar = {
    id?: boolean
    code?: boolean
    code_alpha3?: boolean
    name?: boolean
    official_name?: boolean
    phone_code?: boolean
    currency_code?: boolean
    flag_emoji?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CountryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "code_alpha3" | "name" | "official_name" | "phone_code" | "currency_code" | "flag_emoji" | "status" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["country"]>
  export type CountryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provinces?: boolean | Country$provincesArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CountryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CountryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CountryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Country"
    objects: {
      provinces: Prisma.$ProvincePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      code: string
      code_alpha3: string | null
      name: string
      official_name: string | null
      phone_code: string | null
      currency_code: string | null
      flag_emoji: string | null
      status: string
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["country"]>
    composites: {}
  }

  type CountryGetPayload<S extends boolean | null | undefined | CountryDefaultArgs> = $Result.GetResult<Prisma.$CountryPayload, S>

  type CountryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CountryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountryCountAggregateInputType | true
    }

  export interface CountryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Country'], meta: { name: 'Country' } }
    /**
     * Find zero or one Country that matches the filter.
     * @param {CountryFindUniqueArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CountryFindUniqueArgs>(args: SelectSubset<T, CountryFindUniqueArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Country that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CountryFindUniqueOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CountryFindUniqueOrThrowArgs>(args: SelectSubset<T, CountryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Country that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CountryFindFirstArgs>(args?: SelectSubset<T, CountryFindFirstArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Country that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CountryFindFirstOrThrowArgs>(args?: SelectSubset<T, CountryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Countries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countries
     * const countries = await prisma.country.findMany()
     * 
     * // Get first 10 Countries
     * const countries = await prisma.country.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const countryWithIdOnly = await prisma.country.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CountryFindManyArgs>(args?: SelectSubset<T, CountryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Country.
     * @param {CountryCreateArgs} args - Arguments to create a Country.
     * @example
     * // Create one Country
     * const Country = await prisma.country.create({
     *   data: {
     *     // ... data to create a Country
     *   }
     * })
     * 
     */
    create<T extends CountryCreateArgs>(args: SelectSubset<T, CountryCreateArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Countries.
     * @param {CountryCreateManyArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CountryCreateManyArgs>(args?: SelectSubset<T, CountryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Countries and returns the data saved in the database.
     * @param {CountryCreateManyAndReturnArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Countries and only return the `id`
     * const countryWithIdOnly = await prisma.country.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CountryCreateManyAndReturnArgs>(args?: SelectSubset<T, CountryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Country.
     * @param {CountryDeleteArgs} args - Arguments to delete one Country.
     * @example
     * // Delete one Country
     * const Country = await prisma.country.delete({
     *   where: {
     *     // ... filter to delete one Country
     *   }
     * })
     * 
     */
    delete<T extends CountryDeleteArgs>(args: SelectSubset<T, CountryDeleteArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Country.
     * @param {CountryUpdateArgs} args - Arguments to update one Country.
     * @example
     * // Update one Country
     * const country = await prisma.country.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CountryUpdateArgs>(args: SelectSubset<T, CountryUpdateArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Countries.
     * @param {CountryDeleteManyArgs} args - Arguments to filter Countries to delete.
     * @example
     * // Delete a few Countries
     * const { count } = await prisma.country.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CountryDeleteManyArgs>(args?: SelectSubset<T, CountryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CountryUpdateManyArgs>(args: SelectSubset<T, CountryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries and returns the data updated in the database.
     * @param {CountryUpdateManyAndReturnArgs} args - Arguments to update many Countries.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Countries and only return the `id`
     * const countryWithIdOnly = await prisma.country.updateManyAndReturn({
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
    updateManyAndReturn<T extends CountryUpdateManyAndReturnArgs>(args: SelectSubset<T, CountryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Country.
     * @param {CountryUpsertArgs} args - Arguments to update or create a Country.
     * @example
     * // Update or create a Country
     * const country = await prisma.country.upsert({
     *   create: {
     *     // ... data to create a Country
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Country we want to update
     *   }
     * })
     */
    upsert<T extends CountryUpsertArgs>(args: SelectSubset<T, CountryUpsertArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryCountArgs} args - Arguments to filter Countries to count.
     * @example
     * // Count the number of Countries
     * const count = await prisma.country.count({
     *   where: {
     *     // ... the filter for the Countries we want to count
     *   }
     * })
    **/
    count<T extends CountryCountArgs>(
      args?: Subset<T, CountryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CountryAggregateArgs>(args: Subset<T, CountryAggregateArgs>): Prisma.PrismaPromise<GetCountryAggregateType<T>>

    /**
     * Group by Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryGroupByArgs} args - Group by arguments.
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
      T extends CountryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountryGroupByArgs['orderBy'] }
        : { orderBy?: CountryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CountryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Country model
   */
  readonly fields: CountryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Country.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CountryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provinces<T extends Country$provincesArgs<ExtArgs> = {}>(args?: Subset<T, Country$provincesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Country model
   */
  interface CountryFieldRefs {
    readonly id: FieldRef<"Country", 'BigInt'>
    readonly code: FieldRef<"Country", 'String'>
    readonly code_alpha3: FieldRef<"Country", 'String'>
    readonly name: FieldRef<"Country", 'String'>
    readonly official_name: FieldRef<"Country", 'String'>
    readonly phone_code: FieldRef<"Country", 'String'>
    readonly currency_code: FieldRef<"Country", 'String'>
    readonly flag_emoji: FieldRef<"Country", 'String'>
    readonly status: FieldRef<"Country", 'String'>
    readonly created_user_id: FieldRef<"Country", 'BigInt'>
    readonly updated_user_id: FieldRef<"Country", 'BigInt'>
    readonly created_at: FieldRef<"Country", 'DateTime'>
    readonly updated_at: FieldRef<"Country", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Country findUnique
   */
  export type CountryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country findUniqueOrThrow
   */
  export type CountryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country findFirst
   */
  export type CountryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country findFirstOrThrow
   */
  export type CountryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country findMany
   */
  export type CountryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Countries to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country create
   */
  export type CountryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The data needed to create a Country.
     */
    data: XOR<CountryCreateInput, CountryUncheckedCreateInput>
  }

  /**
   * Country createMany
   */
  export type CountryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Countries.
     */
    data: CountryCreateManyInput | CountryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Country createManyAndReturn
   */
  export type CountryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * The data used to create many Countries.
     */
    data: CountryCreateManyInput | CountryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Country update
   */
  export type CountryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The data needed to update a Country.
     */
    data: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
    /**
     * Choose, which Country to update.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country updateMany
   */
  export type CountryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Countries.
     */
    data: XOR<CountryUpdateManyMutationInput, CountryUncheckedUpdateManyInput>
    /**
     * Filter which Countries to update
     */
    where?: CountryWhereInput
    /**
     * Limit how many Countries to update.
     */
    limit?: number
  }

  /**
   * Country updateManyAndReturn
   */
  export type CountryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * The data used to update Countries.
     */
    data: XOR<CountryUpdateManyMutationInput, CountryUncheckedUpdateManyInput>
    /**
     * Filter which Countries to update
     */
    where?: CountryWhereInput
    /**
     * Limit how many Countries to update.
     */
    limit?: number
  }

  /**
   * Country upsert
   */
  export type CountryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The filter to search for the Country to update in case it exists.
     */
    where: CountryWhereUniqueInput
    /**
     * In case the Country found by the `where` argument doesn't exist, create a new Country with this data.
     */
    create: XOR<CountryCreateInput, CountryUncheckedCreateInput>
    /**
     * In case the Country was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
  }

  /**
   * Country delete
   */
  export type CountryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter which Country to delete.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country deleteMany
   */
  export type CountryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Countries to delete
     */
    where?: CountryWhereInput
    /**
     * Limit how many Countries to delete.
     */
    limit?: number
  }

  /**
   * Country.provinces
   */
  export type Country$provincesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    where?: ProvinceWhereInput
    orderBy?: ProvinceOrderByWithRelationInput | ProvinceOrderByWithRelationInput[]
    cursor?: ProvinceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProvinceScalarFieldEnum | ProvinceScalarFieldEnum[]
  }

  /**
   * Country without action
   */
  export type CountryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
  }


  /**
   * Model Province
   */

  export type AggregateProvince = {
    _count: ProvinceCountAggregateOutputType | null
    _avg: ProvinceAvgAggregateOutputType | null
    _sum: ProvinceSumAggregateOutputType | null
    _min: ProvinceMinAggregateOutputType | null
    _max: ProvinceMaxAggregateOutputType | null
  }

  export type ProvinceAvgAggregateOutputType = {
    id: number | null
    country_id: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type ProvinceSumAggregateOutputType = {
    id: bigint | null
    country_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type ProvinceMinAggregateOutputType = {
    id: bigint | null
    code: string | null
    name: string | null
    type: string | null
    phone_code: string | null
    country_id: bigint | null
    status: string | null
    note: string | null
    code_bnv: string | null
    code_tms: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProvinceMaxAggregateOutputType = {
    id: bigint | null
    code: string | null
    name: string | null
    type: string | null
    phone_code: string | null
    country_id: bigint | null
    status: string | null
    note: string | null
    code_bnv: string | null
    code_tms: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProvinceCountAggregateOutputType = {
    id: number
    code: number
    name: number
    type: number
    phone_code: number
    country_id: number
    status: number
    note: number
    code_bnv: number
    code_tms: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProvinceAvgAggregateInputType = {
    id?: true
    country_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type ProvinceSumAggregateInputType = {
    id?: true
    country_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type ProvinceMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    type?: true
    phone_code?: true
    country_id?: true
    status?: true
    note?: true
    code_bnv?: true
    code_tms?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ProvinceMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    type?: true
    phone_code?: true
    country_id?: true
    status?: true
    note?: true
    code_bnv?: true
    code_tms?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ProvinceCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    type?: true
    phone_code?: true
    country_id?: true
    status?: true
    note?: true
    code_bnv?: true
    code_tms?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProvinceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Province to aggregate.
     */
    where?: ProvinceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Provinces to fetch.
     */
    orderBy?: ProvinceOrderByWithRelationInput | ProvinceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProvinceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Provinces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Provinces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Provinces
    **/
    _count?: true | ProvinceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProvinceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProvinceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProvinceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProvinceMaxAggregateInputType
  }

  export type GetProvinceAggregateType<T extends ProvinceAggregateArgs> = {
        [P in keyof T & keyof AggregateProvince]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProvince[P]>
      : GetScalarType<T[P], AggregateProvince[P]>
  }




  export type ProvinceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProvinceWhereInput
    orderBy?: ProvinceOrderByWithAggregationInput | ProvinceOrderByWithAggregationInput[]
    by: ProvinceScalarFieldEnum[] | ProvinceScalarFieldEnum
    having?: ProvinceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProvinceCountAggregateInputType | true
    _avg?: ProvinceAvgAggregateInputType
    _sum?: ProvinceSumAggregateInputType
    _min?: ProvinceMinAggregateInputType
    _max?: ProvinceMaxAggregateInputType
  }

  export type ProvinceGroupByOutputType = {
    id: bigint
    code: string
    name: string
    type: string
    phone_code: string | null
    country_id: bigint
    status: string
    note: string | null
    code_bnv: string | null
    code_tms: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: ProvinceCountAggregateOutputType | null
    _avg: ProvinceAvgAggregateOutputType | null
    _sum: ProvinceSumAggregateOutputType | null
    _min: ProvinceMinAggregateOutputType | null
    _max: ProvinceMaxAggregateOutputType | null
  }

  type GetProvinceGroupByPayload<T extends ProvinceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProvinceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProvinceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProvinceGroupByOutputType[P]>
            : GetScalarType<T[P], ProvinceGroupByOutputType[P]>
        }
      >
    >


  export type ProvinceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    phone_code?: boolean
    country_id?: boolean
    status?: boolean
    note?: boolean
    code_bnv?: boolean
    code_tms?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    country?: boolean | CountryDefaultArgs<ExtArgs>
    wards?: boolean | Province$wardsArgs<ExtArgs>
    _count?: boolean | ProvinceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["province"]>

  export type ProvinceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    phone_code?: boolean
    country_id?: boolean
    status?: boolean
    note?: boolean
    code_bnv?: boolean
    code_tms?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["province"]>

  export type ProvinceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    phone_code?: boolean
    country_id?: boolean
    status?: boolean
    note?: boolean
    code_bnv?: boolean
    code_tms?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["province"]>

  export type ProvinceSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    phone_code?: boolean
    country_id?: boolean
    status?: boolean
    note?: boolean
    code_bnv?: boolean
    code_tms?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProvinceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "type" | "phone_code" | "country_id" | "status" | "note" | "code_bnv" | "code_tms" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["province"]>
  export type ProvinceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | CountryDefaultArgs<ExtArgs>
    wards?: boolean | Province$wardsArgs<ExtArgs>
    _count?: boolean | ProvinceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProvinceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }
  export type ProvinceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }

  export type $ProvincePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Province"
    objects: {
      country: Prisma.$CountryPayload<ExtArgs>
      wards: Prisma.$WardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      code: string
      name: string
      type: string
      phone_code: string | null
      country_id: bigint
      status: string
      note: string | null
      code_bnv: string | null
      code_tms: string | null
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["province"]>
    composites: {}
  }

  type ProvinceGetPayload<S extends boolean | null | undefined | ProvinceDefaultArgs> = $Result.GetResult<Prisma.$ProvincePayload, S>

  type ProvinceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProvinceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProvinceCountAggregateInputType | true
    }

  export interface ProvinceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Province'], meta: { name: 'Province' } }
    /**
     * Find zero or one Province that matches the filter.
     * @param {ProvinceFindUniqueArgs} args - Arguments to find a Province
     * @example
     * // Get one Province
     * const province = await prisma.province.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProvinceFindUniqueArgs>(args: SelectSubset<T, ProvinceFindUniqueArgs<ExtArgs>>): Prisma__ProvinceClient<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Province that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProvinceFindUniqueOrThrowArgs} args - Arguments to find a Province
     * @example
     * // Get one Province
     * const province = await prisma.province.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProvinceFindUniqueOrThrowArgs>(args: SelectSubset<T, ProvinceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProvinceClient<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Province that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProvinceFindFirstArgs} args - Arguments to find a Province
     * @example
     * // Get one Province
     * const province = await prisma.province.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProvinceFindFirstArgs>(args?: SelectSubset<T, ProvinceFindFirstArgs<ExtArgs>>): Prisma__ProvinceClient<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Province that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProvinceFindFirstOrThrowArgs} args - Arguments to find a Province
     * @example
     * // Get one Province
     * const province = await prisma.province.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProvinceFindFirstOrThrowArgs>(args?: SelectSubset<T, ProvinceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProvinceClient<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Provinces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProvinceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Provinces
     * const provinces = await prisma.province.findMany()
     * 
     * // Get first 10 Provinces
     * const provinces = await prisma.province.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const provinceWithIdOnly = await prisma.province.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProvinceFindManyArgs>(args?: SelectSubset<T, ProvinceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Province.
     * @param {ProvinceCreateArgs} args - Arguments to create a Province.
     * @example
     * // Create one Province
     * const Province = await prisma.province.create({
     *   data: {
     *     // ... data to create a Province
     *   }
     * })
     * 
     */
    create<T extends ProvinceCreateArgs>(args: SelectSubset<T, ProvinceCreateArgs<ExtArgs>>): Prisma__ProvinceClient<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Provinces.
     * @param {ProvinceCreateManyArgs} args - Arguments to create many Provinces.
     * @example
     * // Create many Provinces
     * const province = await prisma.province.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProvinceCreateManyArgs>(args?: SelectSubset<T, ProvinceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Provinces and returns the data saved in the database.
     * @param {ProvinceCreateManyAndReturnArgs} args - Arguments to create many Provinces.
     * @example
     * // Create many Provinces
     * const province = await prisma.province.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Provinces and only return the `id`
     * const provinceWithIdOnly = await prisma.province.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProvinceCreateManyAndReturnArgs>(args?: SelectSubset<T, ProvinceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Province.
     * @param {ProvinceDeleteArgs} args - Arguments to delete one Province.
     * @example
     * // Delete one Province
     * const Province = await prisma.province.delete({
     *   where: {
     *     // ... filter to delete one Province
     *   }
     * })
     * 
     */
    delete<T extends ProvinceDeleteArgs>(args: SelectSubset<T, ProvinceDeleteArgs<ExtArgs>>): Prisma__ProvinceClient<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Province.
     * @param {ProvinceUpdateArgs} args - Arguments to update one Province.
     * @example
     * // Update one Province
     * const province = await prisma.province.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProvinceUpdateArgs>(args: SelectSubset<T, ProvinceUpdateArgs<ExtArgs>>): Prisma__ProvinceClient<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Provinces.
     * @param {ProvinceDeleteManyArgs} args - Arguments to filter Provinces to delete.
     * @example
     * // Delete a few Provinces
     * const { count } = await prisma.province.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProvinceDeleteManyArgs>(args?: SelectSubset<T, ProvinceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Provinces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProvinceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Provinces
     * const province = await prisma.province.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProvinceUpdateManyArgs>(args: SelectSubset<T, ProvinceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Provinces and returns the data updated in the database.
     * @param {ProvinceUpdateManyAndReturnArgs} args - Arguments to update many Provinces.
     * @example
     * // Update many Provinces
     * const province = await prisma.province.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Provinces and only return the `id`
     * const provinceWithIdOnly = await prisma.province.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProvinceUpdateManyAndReturnArgs>(args: SelectSubset<T, ProvinceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Province.
     * @param {ProvinceUpsertArgs} args - Arguments to update or create a Province.
     * @example
     * // Update or create a Province
     * const province = await prisma.province.upsert({
     *   create: {
     *     // ... data to create a Province
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Province we want to update
     *   }
     * })
     */
    upsert<T extends ProvinceUpsertArgs>(args: SelectSubset<T, ProvinceUpsertArgs<ExtArgs>>): Prisma__ProvinceClient<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Provinces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProvinceCountArgs} args - Arguments to filter Provinces to count.
     * @example
     * // Count the number of Provinces
     * const count = await prisma.province.count({
     *   where: {
     *     // ... the filter for the Provinces we want to count
     *   }
     * })
    **/
    count<T extends ProvinceCountArgs>(
      args?: Subset<T, ProvinceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProvinceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Province.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProvinceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProvinceAggregateArgs>(args: Subset<T, ProvinceAggregateArgs>): Prisma.PrismaPromise<GetProvinceAggregateType<T>>

    /**
     * Group by Province.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProvinceGroupByArgs} args - Group by arguments.
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
      T extends ProvinceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProvinceGroupByArgs['orderBy'] }
        : { orderBy?: ProvinceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProvinceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProvinceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Province model
   */
  readonly fields: ProvinceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Province.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProvinceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    country<T extends CountryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CountryDefaultArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    wards<T extends Province$wardsArgs<ExtArgs> = {}>(args?: Subset<T, Province$wardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Province model
   */
  interface ProvinceFieldRefs {
    readonly id: FieldRef<"Province", 'BigInt'>
    readonly code: FieldRef<"Province", 'String'>
    readonly name: FieldRef<"Province", 'String'>
    readonly type: FieldRef<"Province", 'String'>
    readonly phone_code: FieldRef<"Province", 'String'>
    readonly country_id: FieldRef<"Province", 'BigInt'>
    readonly status: FieldRef<"Province", 'String'>
    readonly note: FieldRef<"Province", 'String'>
    readonly code_bnv: FieldRef<"Province", 'String'>
    readonly code_tms: FieldRef<"Province", 'String'>
    readonly created_user_id: FieldRef<"Province", 'BigInt'>
    readonly updated_user_id: FieldRef<"Province", 'BigInt'>
    readonly created_at: FieldRef<"Province", 'DateTime'>
    readonly updated_at: FieldRef<"Province", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Province findUnique
   */
  export type ProvinceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    /**
     * Filter, which Province to fetch.
     */
    where: ProvinceWhereUniqueInput
  }

  /**
   * Province findUniqueOrThrow
   */
  export type ProvinceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    /**
     * Filter, which Province to fetch.
     */
    where: ProvinceWhereUniqueInput
  }

  /**
   * Province findFirst
   */
  export type ProvinceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    /**
     * Filter, which Province to fetch.
     */
    where?: ProvinceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Provinces to fetch.
     */
    orderBy?: ProvinceOrderByWithRelationInput | ProvinceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Provinces.
     */
    cursor?: ProvinceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Provinces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Provinces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Provinces.
     */
    distinct?: ProvinceScalarFieldEnum | ProvinceScalarFieldEnum[]
  }

  /**
   * Province findFirstOrThrow
   */
  export type ProvinceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    /**
     * Filter, which Province to fetch.
     */
    where?: ProvinceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Provinces to fetch.
     */
    orderBy?: ProvinceOrderByWithRelationInput | ProvinceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Provinces.
     */
    cursor?: ProvinceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Provinces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Provinces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Provinces.
     */
    distinct?: ProvinceScalarFieldEnum | ProvinceScalarFieldEnum[]
  }

  /**
   * Province findMany
   */
  export type ProvinceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    /**
     * Filter, which Provinces to fetch.
     */
    where?: ProvinceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Provinces to fetch.
     */
    orderBy?: ProvinceOrderByWithRelationInput | ProvinceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Provinces.
     */
    cursor?: ProvinceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Provinces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Provinces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Provinces.
     */
    distinct?: ProvinceScalarFieldEnum | ProvinceScalarFieldEnum[]
  }

  /**
   * Province create
   */
  export type ProvinceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    /**
     * The data needed to create a Province.
     */
    data: XOR<ProvinceCreateInput, ProvinceUncheckedCreateInput>
  }

  /**
   * Province createMany
   */
  export type ProvinceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Provinces.
     */
    data: ProvinceCreateManyInput | ProvinceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Province createManyAndReturn
   */
  export type ProvinceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * The data used to create many Provinces.
     */
    data: ProvinceCreateManyInput | ProvinceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Province update
   */
  export type ProvinceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    /**
     * The data needed to update a Province.
     */
    data: XOR<ProvinceUpdateInput, ProvinceUncheckedUpdateInput>
    /**
     * Choose, which Province to update.
     */
    where: ProvinceWhereUniqueInput
  }

  /**
   * Province updateMany
   */
  export type ProvinceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Provinces.
     */
    data: XOR<ProvinceUpdateManyMutationInput, ProvinceUncheckedUpdateManyInput>
    /**
     * Filter which Provinces to update
     */
    where?: ProvinceWhereInput
    /**
     * Limit how many Provinces to update.
     */
    limit?: number
  }

  /**
   * Province updateManyAndReturn
   */
  export type ProvinceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * The data used to update Provinces.
     */
    data: XOR<ProvinceUpdateManyMutationInput, ProvinceUncheckedUpdateManyInput>
    /**
     * Filter which Provinces to update
     */
    where?: ProvinceWhereInput
    /**
     * Limit how many Provinces to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Province upsert
   */
  export type ProvinceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    /**
     * The filter to search for the Province to update in case it exists.
     */
    where: ProvinceWhereUniqueInput
    /**
     * In case the Province found by the `where` argument doesn't exist, create a new Province with this data.
     */
    create: XOR<ProvinceCreateInput, ProvinceUncheckedCreateInput>
    /**
     * In case the Province was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProvinceUpdateInput, ProvinceUncheckedUpdateInput>
  }

  /**
   * Province delete
   */
  export type ProvinceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
    /**
     * Filter which Province to delete.
     */
    where: ProvinceWhereUniqueInput
  }

  /**
   * Province deleteMany
   */
  export type ProvinceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Provinces to delete
     */
    where?: ProvinceWhereInput
    /**
     * Limit how many Provinces to delete.
     */
    limit?: number
  }

  /**
   * Province.wards
   */
  export type Province$wardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    where?: WardWhereInput
    orderBy?: WardOrderByWithRelationInput | WardOrderByWithRelationInput[]
    cursor?: WardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WardScalarFieldEnum | WardScalarFieldEnum[]
  }

  /**
   * Province without action
   */
  export type ProvinceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Province
     */
    select?: ProvinceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Province
     */
    omit?: ProvinceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProvinceInclude<ExtArgs> | null
  }


  /**
   * Model Ward
   */

  export type AggregateWard = {
    _count: WardCountAggregateOutputType | null
    _avg: WardAvgAggregateOutputType | null
    _sum: WardSumAggregateOutputType | null
    _min: WardMinAggregateOutputType | null
    _max: WardMaxAggregateOutputType | null
  }

  export type WardAvgAggregateOutputType = {
    id: number | null
    province_id: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type WardSumAggregateOutputType = {
    id: bigint | null
    province_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type WardMinAggregateOutputType = {
    id: bigint | null
    province_id: bigint | null
    name: string | null
    type: string | null
    code: string | null
    status: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WardMaxAggregateOutputType = {
    id: bigint | null
    province_id: bigint | null
    name: string | null
    type: string | null
    code: string | null
    status: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WardCountAggregateOutputType = {
    id: number
    province_id: number
    name: number
    type: number
    code: number
    status: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type WardAvgAggregateInputType = {
    id?: true
    province_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type WardSumAggregateInputType = {
    id?: true
    province_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type WardMinAggregateInputType = {
    id?: true
    province_id?: true
    name?: true
    type?: true
    code?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type WardMaxAggregateInputType = {
    id?: true
    province_id?: true
    name?: true
    type?: true
    code?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type WardCountAggregateInputType = {
    id?: true
    province_id?: true
    name?: true
    type?: true
    code?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type WardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ward to aggregate.
     */
    where?: WardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wards to fetch.
     */
    orderBy?: WardOrderByWithRelationInput | WardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wards
    **/
    _count?: true | WardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WardMaxAggregateInputType
  }

  export type GetWardAggregateType<T extends WardAggregateArgs> = {
        [P in keyof T & keyof AggregateWard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWard[P]>
      : GetScalarType<T[P], AggregateWard[P]>
  }




  export type WardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WardWhereInput
    orderBy?: WardOrderByWithAggregationInput | WardOrderByWithAggregationInput[]
    by: WardScalarFieldEnum[] | WardScalarFieldEnum
    having?: WardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WardCountAggregateInputType | true
    _avg?: WardAvgAggregateInputType
    _sum?: WardSumAggregateInputType
    _min?: WardMinAggregateInputType
    _max?: WardMaxAggregateInputType
  }

  export type WardGroupByOutputType = {
    id: bigint
    province_id: bigint
    name: string
    type: string
    code: string
    status: string
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: WardCountAggregateOutputType | null
    _avg: WardAvgAggregateOutputType | null
    _sum: WardSumAggregateOutputType | null
    _min: WardMinAggregateOutputType | null
    _max: WardMaxAggregateOutputType | null
  }

  type GetWardGroupByPayload<T extends WardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WardGroupByOutputType[P]>
            : GetScalarType<T[P], WardGroupByOutputType[P]>
        }
      >
    >


  export type WardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    province_id?: boolean
    name?: boolean
    type?: boolean
    code?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    province?: boolean | ProvinceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ward"]>

  export type WardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    province_id?: boolean
    name?: boolean
    type?: boolean
    code?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    province?: boolean | ProvinceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ward"]>

  export type WardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    province_id?: boolean
    name?: boolean
    type?: boolean
    code?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    province?: boolean | ProvinceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ward"]>

  export type WardSelectScalar = {
    id?: boolean
    province_id?: boolean
    name?: boolean
    type?: boolean
    code?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type WardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "province_id" | "name" | "type" | "code" | "status" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["ward"]>
  export type WardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    province?: boolean | ProvinceDefaultArgs<ExtArgs>
  }
  export type WardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    province?: boolean | ProvinceDefaultArgs<ExtArgs>
  }
  export type WardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    province?: boolean | ProvinceDefaultArgs<ExtArgs>
  }

  export type $WardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ward"
    objects: {
      province: Prisma.$ProvincePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      province_id: bigint
      name: string
      type: string
      code: string
      status: string
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["ward"]>
    composites: {}
  }

  type WardGetPayload<S extends boolean | null | undefined | WardDefaultArgs> = $Result.GetResult<Prisma.$WardPayload, S>

  type WardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WardCountAggregateInputType | true
    }

  export interface WardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ward'], meta: { name: 'Ward' } }
    /**
     * Find zero or one Ward that matches the filter.
     * @param {WardFindUniqueArgs} args - Arguments to find a Ward
     * @example
     * // Get one Ward
     * const ward = await prisma.ward.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WardFindUniqueArgs>(args: SelectSubset<T, WardFindUniqueArgs<ExtArgs>>): Prisma__WardClient<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ward that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WardFindUniqueOrThrowArgs} args - Arguments to find a Ward
     * @example
     * // Get one Ward
     * const ward = await prisma.ward.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WardFindUniqueOrThrowArgs>(args: SelectSubset<T, WardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WardClient<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ward that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WardFindFirstArgs} args - Arguments to find a Ward
     * @example
     * // Get one Ward
     * const ward = await prisma.ward.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WardFindFirstArgs>(args?: SelectSubset<T, WardFindFirstArgs<ExtArgs>>): Prisma__WardClient<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ward that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WardFindFirstOrThrowArgs} args - Arguments to find a Ward
     * @example
     * // Get one Ward
     * const ward = await prisma.ward.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WardFindFirstOrThrowArgs>(args?: SelectSubset<T, WardFindFirstOrThrowArgs<ExtArgs>>): Prisma__WardClient<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wards
     * const wards = await prisma.ward.findMany()
     * 
     * // Get first 10 Wards
     * const wards = await prisma.ward.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wardWithIdOnly = await prisma.ward.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WardFindManyArgs>(args?: SelectSubset<T, WardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ward.
     * @param {WardCreateArgs} args - Arguments to create a Ward.
     * @example
     * // Create one Ward
     * const Ward = await prisma.ward.create({
     *   data: {
     *     // ... data to create a Ward
     *   }
     * })
     * 
     */
    create<T extends WardCreateArgs>(args: SelectSubset<T, WardCreateArgs<ExtArgs>>): Prisma__WardClient<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wards.
     * @param {WardCreateManyArgs} args - Arguments to create many Wards.
     * @example
     * // Create many Wards
     * const ward = await prisma.ward.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WardCreateManyArgs>(args?: SelectSubset<T, WardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wards and returns the data saved in the database.
     * @param {WardCreateManyAndReturnArgs} args - Arguments to create many Wards.
     * @example
     * // Create many Wards
     * const ward = await prisma.ward.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wards and only return the `id`
     * const wardWithIdOnly = await prisma.ward.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WardCreateManyAndReturnArgs>(args?: SelectSubset<T, WardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ward.
     * @param {WardDeleteArgs} args - Arguments to delete one Ward.
     * @example
     * // Delete one Ward
     * const Ward = await prisma.ward.delete({
     *   where: {
     *     // ... filter to delete one Ward
     *   }
     * })
     * 
     */
    delete<T extends WardDeleteArgs>(args: SelectSubset<T, WardDeleteArgs<ExtArgs>>): Prisma__WardClient<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ward.
     * @param {WardUpdateArgs} args - Arguments to update one Ward.
     * @example
     * // Update one Ward
     * const ward = await prisma.ward.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WardUpdateArgs>(args: SelectSubset<T, WardUpdateArgs<ExtArgs>>): Prisma__WardClient<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wards.
     * @param {WardDeleteManyArgs} args - Arguments to filter Wards to delete.
     * @example
     * // Delete a few Wards
     * const { count } = await prisma.ward.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WardDeleteManyArgs>(args?: SelectSubset<T, WardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wards
     * const ward = await prisma.ward.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WardUpdateManyArgs>(args: SelectSubset<T, WardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wards and returns the data updated in the database.
     * @param {WardUpdateManyAndReturnArgs} args - Arguments to update many Wards.
     * @example
     * // Update many Wards
     * const ward = await prisma.ward.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wards and only return the `id`
     * const wardWithIdOnly = await prisma.ward.updateManyAndReturn({
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
    updateManyAndReturn<T extends WardUpdateManyAndReturnArgs>(args: SelectSubset<T, WardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ward.
     * @param {WardUpsertArgs} args - Arguments to update or create a Ward.
     * @example
     * // Update or create a Ward
     * const ward = await prisma.ward.upsert({
     *   create: {
     *     // ... data to create a Ward
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ward we want to update
     *   }
     * })
     */
    upsert<T extends WardUpsertArgs>(args: SelectSubset<T, WardUpsertArgs<ExtArgs>>): Prisma__WardClient<$Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WardCountArgs} args - Arguments to filter Wards to count.
     * @example
     * // Count the number of Wards
     * const count = await prisma.ward.count({
     *   where: {
     *     // ... the filter for the Wards we want to count
     *   }
     * })
    **/
    count<T extends WardCountArgs>(
      args?: Subset<T, WardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ward.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WardAggregateArgs>(args: Subset<T, WardAggregateArgs>): Prisma.PrismaPromise<GetWardAggregateType<T>>

    /**
     * Group by Ward.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WardGroupByArgs} args - Group by arguments.
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
      T extends WardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WardGroupByArgs['orderBy'] }
        : { orderBy?: WardGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ward model
   */
  readonly fields: WardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ward.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    province<T extends ProvinceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProvinceDefaultArgs<ExtArgs>>): Prisma__ProvinceClient<$Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Ward model
   */
  interface WardFieldRefs {
    readonly id: FieldRef<"Ward", 'BigInt'>
    readonly province_id: FieldRef<"Ward", 'BigInt'>
    readonly name: FieldRef<"Ward", 'String'>
    readonly type: FieldRef<"Ward", 'String'>
    readonly code: FieldRef<"Ward", 'String'>
    readonly status: FieldRef<"Ward", 'String'>
    readonly created_user_id: FieldRef<"Ward", 'BigInt'>
    readonly updated_user_id: FieldRef<"Ward", 'BigInt'>
    readonly created_at: FieldRef<"Ward", 'DateTime'>
    readonly updated_at: FieldRef<"Ward", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ward findUnique
   */
  export type WardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    /**
     * Filter, which Ward to fetch.
     */
    where: WardWhereUniqueInput
  }

  /**
   * Ward findUniqueOrThrow
   */
  export type WardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    /**
     * Filter, which Ward to fetch.
     */
    where: WardWhereUniqueInput
  }

  /**
   * Ward findFirst
   */
  export type WardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    /**
     * Filter, which Ward to fetch.
     */
    where?: WardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wards to fetch.
     */
    orderBy?: WardOrderByWithRelationInput | WardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wards.
     */
    cursor?: WardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wards.
     */
    distinct?: WardScalarFieldEnum | WardScalarFieldEnum[]
  }

  /**
   * Ward findFirstOrThrow
   */
  export type WardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    /**
     * Filter, which Ward to fetch.
     */
    where?: WardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wards to fetch.
     */
    orderBy?: WardOrderByWithRelationInput | WardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wards.
     */
    cursor?: WardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wards.
     */
    distinct?: WardScalarFieldEnum | WardScalarFieldEnum[]
  }

  /**
   * Ward findMany
   */
  export type WardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    /**
     * Filter, which Wards to fetch.
     */
    where?: WardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wards to fetch.
     */
    orderBy?: WardOrderByWithRelationInput | WardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wards.
     */
    cursor?: WardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wards.
     */
    distinct?: WardScalarFieldEnum | WardScalarFieldEnum[]
  }

  /**
   * Ward create
   */
  export type WardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    /**
     * The data needed to create a Ward.
     */
    data: XOR<WardCreateInput, WardUncheckedCreateInput>
  }

  /**
   * Ward createMany
   */
  export type WardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wards.
     */
    data: WardCreateManyInput | WardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ward createManyAndReturn
   */
  export type WardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * The data used to create many Wards.
     */
    data: WardCreateManyInput | WardCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ward update
   */
  export type WardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    /**
     * The data needed to update a Ward.
     */
    data: XOR<WardUpdateInput, WardUncheckedUpdateInput>
    /**
     * Choose, which Ward to update.
     */
    where: WardWhereUniqueInput
  }

  /**
   * Ward updateMany
   */
  export type WardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wards.
     */
    data: XOR<WardUpdateManyMutationInput, WardUncheckedUpdateManyInput>
    /**
     * Filter which Wards to update
     */
    where?: WardWhereInput
    /**
     * Limit how many Wards to update.
     */
    limit?: number
  }

  /**
   * Ward updateManyAndReturn
   */
  export type WardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * The data used to update Wards.
     */
    data: XOR<WardUpdateManyMutationInput, WardUncheckedUpdateManyInput>
    /**
     * Filter which Wards to update
     */
    where?: WardWhereInput
    /**
     * Limit how many Wards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ward upsert
   */
  export type WardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    /**
     * The filter to search for the Ward to update in case it exists.
     */
    where: WardWhereUniqueInput
    /**
     * In case the Ward found by the `where` argument doesn't exist, create a new Ward with this data.
     */
    create: XOR<WardCreateInput, WardUncheckedCreateInput>
    /**
     * In case the Ward was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WardUpdateInput, WardUncheckedUpdateInput>
  }

  /**
   * Ward delete
   */
  export type WardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
    /**
     * Filter which Ward to delete.
     */
    where: WardWhereUniqueInput
  }

  /**
   * Ward deleteMany
   */
  export type WardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wards to delete
     */
    where?: WardWhereInput
    /**
     * Limit how many Wards to delete.
     */
    limit?: number
  }

  /**
   * Ward without action
   */
  export type WardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ward
     */
    select?: WardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ward
     */
    omit?: WardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WardInclude<ExtArgs> | null
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


  export const GeneralConfigScalarFieldEnum: {
    id: 'id',
    site_name: 'site_name',
    site_description: 'site_description',
    site_logo: 'site_logo',
    site_favicon: 'site_favicon',
    site_email: 'site_email',
    site_phone: 'site_phone',
    site_address: 'site_address',
    site_country_id: 'site_country_id',
    site_province_id: 'site_province_id',
    site_ward_id: 'site_ward_id',
    site_copyright: 'site_copyright',
    timezone: 'timezone',
    locale: 'locale',
    currency: 'currency',
    contact_channels: 'contact_channels',
    meta_title: 'meta_title',
    meta_keywords: 'meta_keywords',
    og_title: 'og_title',
    og_description: 'og_description',
    og_image: 'og_image',
    canonical_url: 'canonical_url',
    google_analytics_id: 'google_analytics_id',
    google_search_console: 'google_search_console',
    facebook_pixel_id: 'facebook_pixel_id',
    twitter_site: 'twitter_site',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type GeneralConfigScalarFieldEnum = (typeof GeneralConfigScalarFieldEnum)[keyof typeof GeneralConfigScalarFieldEnum]


  export const EmailConfigScalarFieldEnum: {
    id: 'id',
    smtp_host: 'smtp_host',
    smtp_port: 'smtp_port',
    smtp_secure: 'smtp_secure',
    smtp_username: 'smtp_username',
    smtp_password: 'smtp_password',
    from_email: 'from_email',
    from_name: 'from_name',
    reply_to_email: 'reply_to_email',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EmailConfigScalarFieldEnum = (typeof EmailConfigScalarFieldEnum)[keyof typeof EmailConfigScalarFieldEnum]


  export const MenuScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    path: 'path',
    api_path: 'api_path',
    icon: 'icon',
    type: 'type',
    status: 'status',
    parent_id: 'parent_id',
    sort_order: 'sort_order',
    is_public: 'is_public',
    show_in_menu: 'show_in_menu',
    group: 'group',
    required_permission_code: 'required_permission_code',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MenuScalarFieldEnum = (typeof MenuScalarFieldEnum)[keyof typeof MenuScalarFieldEnum]


  export const CountryScalarFieldEnum: {
    id: 'id',
    code: 'code',
    code_alpha3: 'code_alpha3',
    name: 'name',
    official_name: 'official_name',
    phone_code: 'phone_code',
    currency_code: 'currency_code',
    flag_emoji: 'flag_emoji',
    status: 'status',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CountryScalarFieldEnum = (typeof CountryScalarFieldEnum)[keyof typeof CountryScalarFieldEnum]


  export const ProvinceScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    type: 'type',
    phone_code: 'phone_code',
    country_id: 'country_id',
    status: 'status',
    note: 'note',
    code_bnv: 'code_bnv',
    code_tms: 'code_tms',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProvinceScalarFieldEnum = (typeof ProvinceScalarFieldEnum)[keyof typeof ProvinceScalarFieldEnum]


  export const WardScalarFieldEnum: {
    id: 'id',
    province_id: 'province_id',
    name: 'name',
    type: 'type',
    code: 'code',
    status: 'status',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type WardScalarFieldEnum = (typeof WardScalarFieldEnum)[keyof typeof WardScalarFieldEnum]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type GeneralConfigWhereInput = {
    AND?: GeneralConfigWhereInput | GeneralConfigWhereInput[]
    OR?: GeneralConfigWhereInput[]
    NOT?: GeneralConfigWhereInput | GeneralConfigWhereInput[]
    id?: BigIntFilter<"GeneralConfig"> | bigint | number
    site_name?: StringFilter<"GeneralConfig"> | string
    site_description?: StringNullableFilter<"GeneralConfig"> | string | null
    site_logo?: StringNullableFilter<"GeneralConfig"> | string | null
    site_favicon?: StringNullableFilter<"GeneralConfig"> | string | null
    site_email?: StringNullableFilter<"GeneralConfig"> | string | null
    site_phone?: StringNullableFilter<"GeneralConfig"> | string | null
    site_address?: StringNullableFilter<"GeneralConfig"> | string | null
    site_country_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    site_province_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    site_ward_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    site_copyright?: StringNullableFilter<"GeneralConfig"> | string | null
    timezone?: StringFilter<"GeneralConfig"> | string
    locale?: StringFilter<"GeneralConfig"> | string
    currency?: StringFilter<"GeneralConfig"> | string
    contact_channels?: JsonNullableFilter<"GeneralConfig">
    meta_title?: StringNullableFilter<"GeneralConfig"> | string | null
    meta_keywords?: StringNullableFilter<"GeneralConfig"> | string | null
    og_title?: StringNullableFilter<"GeneralConfig"> | string | null
    og_description?: StringNullableFilter<"GeneralConfig"> | string | null
    og_image?: StringNullableFilter<"GeneralConfig"> | string | null
    canonical_url?: StringNullableFilter<"GeneralConfig"> | string | null
    google_analytics_id?: StringNullableFilter<"GeneralConfig"> | string | null
    google_search_console?: StringNullableFilter<"GeneralConfig"> | string | null
    facebook_pixel_id?: StringNullableFilter<"GeneralConfig"> | string | null
    twitter_site?: StringNullableFilter<"GeneralConfig"> | string | null
    created_user_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    created_at?: DateTimeFilter<"GeneralConfig"> | Date | string
    updated_at?: DateTimeFilter<"GeneralConfig"> | Date | string
  }

  export type GeneralConfigOrderByWithRelationInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_description?: SortOrderInput | SortOrder
    site_logo?: SortOrderInput | SortOrder
    site_favicon?: SortOrderInput | SortOrder
    site_email?: SortOrderInput | SortOrder
    site_phone?: SortOrderInput | SortOrder
    site_address?: SortOrderInput | SortOrder
    site_country_id?: SortOrderInput | SortOrder
    site_province_id?: SortOrderInput | SortOrder
    site_ward_id?: SortOrderInput | SortOrder
    site_copyright?: SortOrderInput | SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    contact_channels?: SortOrderInput | SortOrder
    meta_title?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    og_title?: SortOrderInput | SortOrder
    og_description?: SortOrderInput | SortOrder
    og_image?: SortOrderInput | SortOrder
    canonical_url?: SortOrderInput | SortOrder
    google_analytics_id?: SortOrderInput | SortOrder
    google_search_console?: SortOrderInput | SortOrder
    facebook_pixel_id?: SortOrderInput | SortOrder
    twitter_site?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GeneralConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: GeneralConfigWhereInput | GeneralConfigWhereInput[]
    OR?: GeneralConfigWhereInput[]
    NOT?: GeneralConfigWhereInput | GeneralConfigWhereInput[]
    site_name?: StringFilter<"GeneralConfig"> | string
    site_description?: StringNullableFilter<"GeneralConfig"> | string | null
    site_logo?: StringNullableFilter<"GeneralConfig"> | string | null
    site_favicon?: StringNullableFilter<"GeneralConfig"> | string | null
    site_email?: StringNullableFilter<"GeneralConfig"> | string | null
    site_phone?: StringNullableFilter<"GeneralConfig"> | string | null
    site_address?: StringNullableFilter<"GeneralConfig"> | string | null
    site_country_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    site_province_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    site_ward_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    site_copyright?: StringNullableFilter<"GeneralConfig"> | string | null
    timezone?: StringFilter<"GeneralConfig"> | string
    locale?: StringFilter<"GeneralConfig"> | string
    currency?: StringFilter<"GeneralConfig"> | string
    contact_channels?: JsonNullableFilter<"GeneralConfig">
    meta_title?: StringNullableFilter<"GeneralConfig"> | string | null
    meta_keywords?: StringNullableFilter<"GeneralConfig"> | string | null
    og_title?: StringNullableFilter<"GeneralConfig"> | string | null
    og_description?: StringNullableFilter<"GeneralConfig"> | string | null
    og_image?: StringNullableFilter<"GeneralConfig"> | string | null
    canonical_url?: StringNullableFilter<"GeneralConfig"> | string | null
    google_analytics_id?: StringNullableFilter<"GeneralConfig"> | string | null
    google_search_console?: StringNullableFilter<"GeneralConfig"> | string | null
    facebook_pixel_id?: StringNullableFilter<"GeneralConfig"> | string | null
    twitter_site?: StringNullableFilter<"GeneralConfig"> | string | null
    created_user_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"GeneralConfig"> | bigint | number | null
    created_at?: DateTimeFilter<"GeneralConfig"> | Date | string
    updated_at?: DateTimeFilter<"GeneralConfig"> | Date | string
  }, "id">

  export type GeneralConfigOrderByWithAggregationInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_description?: SortOrderInput | SortOrder
    site_logo?: SortOrderInput | SortOrder
    site_favicon?: SortOrderInput | SortOrder
    site_email?: SortOrderInput | SortOrder
    site_phone?: SortOrderInput | SortOrder
    site_address?: SortOrderInput | SortOrder
    site_country_id?: SortOrderInput | SortOrder
    site_province_id?: SortOrderInput | SortOrder
    site_ward_id?: SortOrderInput | SortOrder
    site_copyright?: SortOrderInput | SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    contact_channels?: SortOrderInput | SortOrder
    meta_title?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    og_title?: SortOrderInput | SortOrder
    og_description?: SortOrderInput | SortOrder
    og_image?: SortOrderInput | SortOrder
    canonical_url?: SortOrderInput | SortOrder
    google_analytics_id?: SortOrderInput | SortOrder
    google_search_console?: SortOrderInput | SortOrder
    facebook_pixel_id?: SortOrderInput | SortOrder
    twitter_site?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: GeneralConfigCountOrderByAggregateInput
    _avg?: GeneralConfigAvgOrderByAggregateInput
    _max?: GeneralConfigMaxOrderByAggregateInput
    _min?: GeneralConfigMinOrderByAggregateInput
    _sum?: GeneralConfigSumOrderByAggregateInput
  }

  export type GeneralConfigScalarWhereWithAggregatesInput = {
    AND?: GeneralConfigScalarWhereWithAggregatesInput | GeneralConfigScalarWhereWithAggregatesInput[]
    OR?: GeneralConfigScalarWhereWithAggregatesInput[]
    NOT?: GeneralConfigScalarWhereWithAggregatesInput | GeneralConfigScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"GeneralConfig"> | bigint | number
    site_name?: StringWithAggregatesFilter<"GeneralConfig"> | string
    site_description?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    site_logo?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    site_favicon?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    site_email?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    site_phone?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    site_address?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    site_country_id?: BigIntNullableWithAggregatesFilter<"GeneralConfig"> | bigint | number | null
    site_province_id?: BigIntNullableWithAggregatesFilter<"GeneralConfig"> | bigint | number | null
    site_ward_id?: BigIntNullableWithAggregatesFilter<"GeneralConfig"> | bigint | number | null
    site_copyright?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    timezone?: StringWithAggregatesFilter<"GeneralConfig"> | string
    locale?: StringWithAggregatesFilter<"GeneralConfig"> | string
    currency?: StringWithAggregatesFilter<"GeneralConfig"> | string
    contact_channels?: JsonNullableWithAggregatesFilter<"GeneralConfig">
    meta_title?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    meta_keywords?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    og_title?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    og_description?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    og_image?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    canonical_url?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    google_analytics_id?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    google_search_console?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    facebook_pixel_id?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    twitter_site?: StringNullableWithAggregatesFilter<"GeneralConfig"> | string | null
    created_user_id?: BigIntNullableWithAggregatesFilter<"GeneralConfig"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"GeneralConfig"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"GeneralConfig"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"GeneralConfig"> | Date | string
  }

  export type EmailConfigWhereInput = {
    AND?: EmailConfigWhereInput | EmailConfigWhereInput[]
    OR?: EmailConfigWhereInput[]
    NOT?: EmailConfigWhereInput | EmailConfigWhereInput[]
    id?: BigIntFilter<"EmailConfig"> | bigint | number
    smtp_host?: StringFilter<"EmailConfig"> | string
    smtp_port?: IntFilter<"EmailConfig"> | number
    smtp_secure?: BoolFilter<"EmailConfig"> | boolean
    smtp_username?: StringFilter<"EmailConfig"> | string
    smtp_password?: StringFilter<"EmailConfig"> | string
    from_email?: StringFilter<"EmailConfig"> | string
    from_name?: StringFilter<"EmailConfig"> | string
    reply_to_email?: StringNullableFilter<"EmailConfig"> | string | null
    created_user_id?: BigIntNullableFilter<"EmailConfig"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"EmailConfig"> | bigint | number | null
    created_at?: DateTimeFilter<"EmailConfig"> | Date | string
    updated_at?: DateTimeFilter<"EmailConfig"> | Date | string
  }

  export type EmailConfigOrderByWithRelationInput = {
    id?: SortOrder
    smtp_host?: SortOrder
    smtp_port?: SortOrder
    smtp_secure?: SortOrder
    smtp_username?: SortOrder
    smtp_password?: SortOrder
    from_email?: SortOrder
    from_name?: SortOrder
    reply_to_email?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmailConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: EmailConfigWhereInput | EmailConfigWhereInput[]
    OR?: EmailConfigWhereInput[]
    NOT?: EmailConfigWhereInput | EmailConfigWhereInput[]
    smtp_host?: StringFilter<"EmailConfig"> | string
    smtp_port?: IntFilter<"EmailConfig"> | number
    smtp_secure?: BoolFilter<"EmailConfig"> | boolean
    smtp_username?: StringFilter<"EmailConfig"> | string
    smtp_password?: StringFilter<"EmailConfig"> | string
    from_email?: StringFilter<"EmailConfig"> | string
    from_name?: StringFilter<"EmailConfig"> | string
    reply_to_email?: StringNullableFilter<"EmailConfig"> | string | null
    created_user_id?: BigIntNullableFilter<"EmailConfig"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"EmailConfig"> | bigint | number | null
    created_at?: DateTimeFilter<"EmailConfig"> | Date | string
    updated_at?: DateTimeFilter<"EmailConfig"> | Date | string
  }, "id">

  export type EmailConfigOrderByWithAggregationInput = {
    id?: SortOrder
    smtp_host?: SortOrder
    smtp_port?: SortOrder
    smtp_secure?: SortOrder
    smtp_username?: SortOrder
    smtp_password?: SortOrder
    from_email?: SortOrder
    from_name?: SortOrder
    reply_to_email?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: EmailConfigCountOrderByAggregateInput
    _avg?: EmailConfigAvgOrderByAggregateInput
    _max?: EmailConfigMaxOrderByAggregateInput
    _min?: EmailConfigMinOrderByAggregateInput
    _sum?: EmailConfigSumOrderByAggregateInput
  }

  export type EmailConfigScalarWhereWithAggregatesInput = {
    AND?: EmailConfigScalarWhereWithAggregatesInput | EmailConfigScalarWhereWithAggregatesInput[]
    OR?: EmailConfigScalarWhereWithAggregatesInput[]
    NOT?: EmailConfigScalarWhereWithAggregatesInput | EmailConfigScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"EmailConfig"> | bigint | number
    smtp_host?: StringWithAggregatesFilter<"EmailConfig"> | string
    smtp_port?: IntWithAggregatesFilter<"EmailConfig"> | number
    smtp_secure?: BoolWithAggregatesFilter<"EmailConfig"> | boolean
    smtp_username?: StringWithAggregatesFilter<"EmailConfig"> | string
    smtp_password?: StringWithAggregatesFilter<"EmailConfig"> | string
    from_email?: StringWithAggregatesFilter<"EmailConfig"> | string
    from_name?: StringWithAggregatesFilter<"EmailConfig"> | string
    reply_to_email?: StringNullableWithAggregatesFilter<"EmailConfig"> | string | null
    created_user_id?: BigIntNullableWithAggregatesFilter<"EmailConfig"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"EmailConfig"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"EmailConfig"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"EmailConfig"> | Date | string
  }

  export type MenuWhereInput = {
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    id?: BigIntFilter<"Menu"> | bigint | number
    code?: StringFilter<"Menu"> | string
    name?: StringFilter<"Menu"> | string
    path?: StringNullableFilter<"Menu"> | string | null
    api_path?: StringNullableFilter<"Menu"> | string | null
    icon?: StringNullableFilter<"Menu"> | string | null
    type?: StringFilter<"Menu"> | string
    status?: StringFilter<"Menu"> | string
    parent_id?: BigIntNullableFilter<"Menu"> | bigint | number | null
    sort_order?: IntFilter<"Menu"> | number
    is_public?: BoolFilter<"Menu"> | boolean
    show_in_menu?: BoolFilter<"Menu"> | boolean
    group?: StringFilter<"Menu"> | string
    required_permission_code?: StringNullableFilter<"Menu"> | string | null
    created_user_id?: BigIntNullableFilter<"Menu"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Menu"> | bigint | number | null
    created_at?: DateTimeFilter<"Menu"> | Date | string
    updated_at?: DateTimeFilter<"Menu"> | Date | string
    parent?: XOR<MenuNullableScalarRelationFilter, MenuWhereInput> | null
    children?: MenuListRelationFilter
  }

  export type MenuOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    path?: SortOrderInput | SortOrder
    api_path?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    sort_order?: SortOrder
    is_public?: SortOrder
    show_in_menu?: SortOrder
    group?: SortOrder
    required_permission_code?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    parent?: MenuOrderByWithRelationInput
    children?: MenuOrderByRelationAggregateInput
  }

  export type MenuWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    code?: string
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    name?: StringFilter<"Menu"> | string
    path?: StringNullableFilter<"Menu"> | string | null
    api_path?: StringNullableFilter<"Menu"> | string | null
    icon?: StringNullableFilter<"Menu"> | string | null
    type?: StringFilter<"Menu"> | string
    status?: StringFilter<"Menu"> | string
    parent_id?: BigIntNullableFilter<"Menu"> | bigint | number | null
    sort_order?: IntFilter<"Menu"> | number
    is_public?: BoolFilter<"Menu"> | boolean
    show_in_menu?: BoolFilter<"Menu"> | boolean
    group?: StringFilter<"Menu"> | string
    required_permission_code?: StringNullableFilter<"Menu"> | string | null
    created_user_id?: BigIntNullableFilter<"Menu"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Menu"> | bigint | number | null
    created_at?: DateTimeFilter<"Menu"> | Date | string
    updated_at?: DateTimeFilter<"Menu"> | Date | string
    parent?: XOR<MenuNullableScalarRelationFilter, MenuWhereInput> | null
    children?: MenuListRelationFilter
  }, "id" | "code">

  export type MenuOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    path?: SortOrderInput | SortOrder
    api_path?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    sort_order?: SortOrder
    is_public?: SortOrder
    show_in_menu?: SortOrder
    group?: SortOrder
    required_permission_code?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: MenuCountOrderByAggregateInput
    _avg?: MenuAvgOrderByAggregateInput
    _max?: MenuMaxOrderByAggregateInput
    _min?: MenuMinOrderByAggregateInput
    _sum?: MenuSumOrderByAggregateInput
  }

  export type MenuScalarWhereWithAggregatesInput = {
    AND?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    OR?: MenuScalarWhereWithAggregatesInput[]
    NOT?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Menu"> | bigint | number
    code?: StringWithAggregatesFilter<"Menu"> | string
    name?: StringWithAggregatesFilter<"Menu"> | string
    path?: StringNullableWithAggregatesFilter<"Menu"> | string | null
    api_path?: StringNullableWithAggregatesFilter<"Menu"> | string | null
    icon?: StringNullableWithAggregatesFilter<"Menu"> | string | null
    type?: StringWithAggregatesFilter<"Menu"> | string
    status?: StringWithAggregatesFilter<"Menu"> | string
    parent_id?: BigIntNullableWithAggregatesFilter<"Menu"> | bigint | number | null
    sort_order?: IntWithAggregatesFilter<"Menu"> | number
    is_public?: BoolWithAggregatesFilter<"Menu"> | boolean
    show_in_menu?: BoolWithAggregatesFilter<"Menu"> | boolean
    group?: StringWithAggregatesFilter<"Menu"> | string
    required_permission_code?: StringNullableWithAggregatesFilter<"Menu"> | string | null
    created_user_id?: BigIntNullableWithAggregatesFilter<"Menu"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"Menu"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Menu"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Menu"> | Date | string
  }

  export type CountryWhereInput = {
    AND?: CountryWhereInput | CountryWhereInput[]
    OR?: CountryWhereInput[]
    NOT?: CountryWhereInput | CountryWhereInput[]
    id?: BigIntFilter<"Country"> | bigint | number
    code?: StringFilter<"Country"> | string
    code_alpha3?: StringNullableFilter<"Country"> | string | null
    name?: StringFilter<"Country"> | string
    official_name?: StringNullableFilter<"Country"> | string | null
    phone_code?: StringNullableFilter<"Country"> | string | null
    currency_code?: StringNullableFilter<"Country"> | string | null
    flag_emoji?: StringNullableFilter<"Country"> | string | null
    status?: StringFilter<"Country"> | string
    created_user_id?: BigIntNullableFilter<"Country"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Country"> | bigint | number | null
    created_at?: DateTimeFilter<"Country"> | Date | string
    updated_at?: DateTimeFilter<"Country"> | Date | string
    provinces?: ProvinceListRelationFilter
  }

  export type CountryOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    code_alpha3?: SortOrderInput | SortOrder
    name?: SortOrder
    official_name?: SortOrderInput | SortOrder
    phone_code?: SortOrderInput | SortOrder
    currency_code?: SortOrderInput | SortOrder
    flag_emoji?: SortOrderInput | SortOrder
    status?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    provinces?: ProvinceOrderByRelationAggregateInput
  }

  export type CountryWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    code?: string
    AND?: CountryWhereInput | CountryWhereInput[]
    OR?: CountryWhereInput[]
    NOT?: CountryWhereInput | CountryWhereInput[]
    code_alpha3?: StringNullableFilter<"Country"> | string | null
    name?: StringFilter<"Country"> | string
    official_name?: StringNullableFilter<"Country"> | string | null
    phone_code?: StringNullableFilter<"Country"> | string | null
    currency_code?: StringNullableFilter<"Country"> | string | null
    flag_emoji?: StringNullableFilter<"Country"> | string | null
    status?: StringFilter<"Country"> | string
    created_user_id?: BigIntNullableFilter<"Country"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Country"> | bigint | number | null
    created_at?: DateTimeFilter<"Country"> | Date | string
    updated_at?: DateTimeFilter<"Country"> | Date | string
    provinces?: ProvinceListRelationFilter
  }, "id" | "code">

  export type CountryOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    code_alpha3?: SortOrderInput | SortOrder
    name?: SortOrder
    official_name?: SortOrderInput | SortOrder
    phone_code?: SortOrderInput | SortOrder
    currency_code?: SortOrderInput | SortOrder
    flag_emoji?: SortOrderInput | SortOrder
    status?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CountryCountOrderByAggregateInput
    _avg?: CountryAvgOrderByAggregateInput
    _max?: CountryMaxOrderByAggregateInput
    _min?: CountryMinOrderByAggregateInput
    _sum?: CountrySumOrderByAggregateInput
  }

  export type CountryScalarWhereWithAggregatesInput = {
    AND?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[]
    OR?: CountryScalarWhereWithAggregatesInput[]
    NOT?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Country"> | bigint | number
    code?: StringWithAggregatesFilter<"Country"> | string
    code_alpha3?: StringNullableWithAggregatesFilter<"Country"> | string | null
    name?: StringWithAggregatesFilter<"Country"> | string
    official_name?: StringNullableWithAggregatesFilter<"Country"> | string | null
    phone_code?: StringNullableWithAggregatesFilter<"Country"> | string | null
    currency_code?: StringNullableWithAggregatesFilter<"Country"> | string | null
    flag_emoji?: StringNullableWithAggregatesFilter<"Country"> | string | null
    status?: StringWithAggregatesFilter<"Country"> | string
    created_user_id?: BigIntNullableWithAggregatesFilter<"Country"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"Country"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Country"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Country"> | Date | string
  }

  export type ProvinceWhereInput = {
    AND?: ProvinceWhereInput | ProvinceWhereInput[]
    OR?: ProvinceWhereInput[]
    NOT?: ProvinceWhereInput | ProvinceWhereInput[]
    id?: BigIntFilter<"Province"> | bigint | number
    code?: StringFilter<"Province"> | string
    name?: StringFilter<"Province"> | string
    type?: StringFilter<"Province"> | string
    phone_code?: StringNullableFilter<"Province"> | string | null
    country_id?: BigIntFilter<"Province"> | bigint | number
    status?: StringFilter<"Province"> | string
    note?: StringNullableFilter<"Province"> | string | null
    code_bnv?: StringNullableFilter<"Province"> | string | null
    code_tms?: StringNullableFilter<"Province"> | string | null
    created_user_id?: BigIntNullableFilter<"Province"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Province"> | bigint | number | null
    created_at?: DateTimeFilter<"Province"> | Date | string
    updated_at?: DateTimeFilter<"Province"> | Date | string
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    wards?: WardListRelationFilter
  }

  export type ProvinceOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    phone_code?: SortOrderInput | SortOrder
    country_id?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    code_bnv?: SortOrderInput | SortOrder
    code_tms?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    country?: CountryOrderByWithRelationInput
    wards?: WardOrderByRelationAggregateInput
  }

  export type ProvinceWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    code?: string
    AND?: ProvinceWhereInput | ProvinceWhereInput[]
    OR?: ProvinceWhereInput[]
    NOT?: ProvinceWhereInput | ProvinceWhereInput[]
    name?: StringFilter<"Province"> | string
    type?: StringFilter<"Province"> | string
    phone_code?: StringNullableFilter<"Province"> | string | null
    country_id?: BigIntFilter<"Province"> | bigint | number
    status?: StringFilter<"Province"> | string
    note?: StringNullableFilter<"Province"> | string | null
    code_bnv?: StringNullableFilter<"Province"> | string | null
    code_tms?: StringNullableFilter<"Province"> | string | null
    created_user_id?: BigIntNullableFilter<"Province"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Province"> | bigint | number | null
    created_at?: DateTimeFilter<"Province"> | Date | string
    updated_at?: DateTimeFilter<"Province"> | Date | string
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    wards?: WardListRelationFilter
  }, "id" | "code">

  export type ProvinceOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    phone_code?: SortOrderInput | SortOrder
    country_id?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    code_bnv?: SortOrderInput | SortOrder
    code_tms?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProvinceCountOrderByAggregateInput
    _avg?: ProvinceAvgOrderByAggregateInput
    _max?: ProvinceMaxOrderByAggregateInput
    _min?: ProvinceMinOrderByAggregateInput
    _sum?: ProvinceSumOrderByAggregateInput
  }

  export type ProvinceScalarWhereWithAggregatesInput = {
    AND?: ProvinceScalarWhereWithAggregatesInput | ProvinceScalarWhereWithAggregatesInput[]
    OR?: ProvinceScalarWhereWithAggregatesInput[]
    NOT?: ProvinceScalarWhereWithAggregatesInput | ProvinceScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Province"> | bigint | number
    code?: StringWithAggregatesFilter<"Province"> | string
    name?: StringWithAggregatesFilter<"Province"> | string
    type?: StringWithAggregatesFilter<"Province"> | string
    phone_code?: StringNullableWithAggregatesFilter<"Province"> | string | null
    country_id?: BigIntWithAggregatesFilter<"Province"> | bigint | number
    status?: StringWithAggregatesFilter<"Province"> | string
    note?: StringNullableWithAggregatesFilter<"Province"> | string | null
    code_bnv?: StringNullableWithAggregatesFilter<"Province"> | string | null
    code_tms?: StringNullableWithAggregatesFilter<"Province"> | string | null
    created_user_id?: BigIntNullableWithAggregatesFilter<"Province"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"Province"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Province"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Province"> | Date | string
  }

  export type WardWhereInput = {
    AND?: WardWhereInput | WardWhereInput[]
    OR?: WardWhereInput[]
    NOT?: WardWhereInput | WardWhereInput[]
    id?: BigIntFilter<"Ward"> | bigint | number
    province_id?: BigIntFilter<"Ward"> | bigint | number
    name?: StringFilter<"Ward"> | string
    type?: StringFilter<"Ward"> | string
    code?: StringFilter<"Ward"> | string
    status?: StringFilter<"Ward"> | string
    created_user_id?: BigIntNullableFilter<"Ward"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Ward"> | bigint | number | null
    created_at?: DateTimeFilter<"Ward"> | Date | string
    updated_at?: DateTimeFilter<"Ward"> | Date | string
    province?: XOR<ProvinceScalarRelationFilter, ProvinceWhereInput>
  }

  export type WardOrderByWithRelationInput = {
    id?: SortOrder
    province_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    province?: ProvinceOrderByWithRelationInput
  }

  export type WardWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: WardWhereInput | WardWhereInput[]
    OR?: WardWhereInput[]
    NOT?: WardWhereInput | WardWhereInput[]
    province_id?: BigIntFilter<"Ward"> | bigint | number
    name?: StringFilter<"Ward"> | string
    type?: StringFilter<"Ward"> | string
    code?: StringFilter<"Ward"> | string
    status?: StringFilter<"Ward"> | string
    created_user_id?: BigIntNullableFilter<"Ward"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Ward"> | bigint | number | null
    created_at?: DateTimeFilter<"Ward"> | Date | string
    updated_at?: DateTimeFilter<"Ward"> | Date | string
    province?: XOR<ProvinceScalarRelationFilter, ProvinceWhereInput>
  }, "id">

  export type WardOrderByWithAggregationInput = {
    id?: SortOrder
    province_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: WardCountOrderByAggregateInput
    _avg?: WardAvgOrderByAggregateInput
    _max?: WardMaxOrderByAggregateInput
    _min?: WardMinOrderByAggregateInput
    _sum?: WardSumOrderByAggregateInput
  }

  export type WardScalarWhereWithAggregatesInput = {
    AND?: WardScalarWhereWithAggregatesInput | WardScalarWhereWithAggregatesInput[]
    OR?: WardScalarWhereWithAggregatesInput[]
    NOT?: WardScalarWhereWithAggregatesInput | WardScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Ward"> | bigint | number
    province_id?: BigIntWithAggregatesFilter<"Ward"> | bigint | number
    name?: StringWithAggregatesFilter<"Ward"> | string
    type?: StringWithAggregatesFilter<"Ward"> | string
    code?: StringWithAggregatesFilter<"Ward"> | string
    status?: StringWithAggregatesFilter<"Ward"> | string
    created_user_id?: BigIntNullableWithAggregatesFilter<"Ward"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"Ward"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Ward"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Ward"> | Date | string
  }

  export type GeneralConfigCreateInput = {
    id?: bigint | number
    site_name: string
    site_description?: string | null
    site_logo?: string | null
    site_favicon?: string | null
    site_email?: string | null
    site_phone?: string | null
    site_address?: string | null
    site_country_id?: bigint | number | null
    site_province_id?: bigint | number | null
    site_ward_id?: bigint | number | null
    site_copyright?: string | null
    timezone?: string
    locale?: string
    currency?: string
    contact_channels?: NullableJsonNullValueInput | InputJsonValue
    meta_title?: string | null
    meta_keywords?: string | null
    og_title?: string | null
    og_description?: string | null
    og_image?: string | null
    canonical_url?: string | null
    google_analytics_id?: string | null
    google_search_console?: string | null
    facebook_pixel_id?: string | null
    twitter_site?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GeneralConfigUncheckedCreateInput = {
    id?: bigint | number
    site_name: string
    site_description?: string | null
    site_logo?: string | null
    site_favicon?: string | null
    site_email?: string | null
    site_phone?: string | null
    site_address?: string | null
    site_country_id?: bigint | number | null
    site_province_id?: bigint | number | null
    site_ward_id?: bigint | number | null
    site_copyright?: string | null
    timezone?: string
    locale?: string
    currency?: string
    contact_channels?: NullableJsonNullValueInput | InputJsonValue
    meta_title?: string | null
    meta_keywords?: string | null
    og_title?: string | null
    og_description?: string | null
    og_image?: string | null
    canonical_url?: string | null
    google_analytics_id?: string | null
    google_search_console?: string | null
    facebook_pixel_id?: string | null
    twitter_site?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GeneralConfigUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    site_name?: StringFieldUpdateOperationsInput | string
    site_description?: NullableStringFieldUpdateOperationsInput | string | null
    site_logo?: NullableStringFieldUpdateOperationsInput | string | null
    site_favicon?: NullableStringFieldUpdateOperationsInput | string | null
    site_email?: NullableStringFieldUpdateOperationsInput | string | null
    site_phone?: NullableStringFieldUpdateOperationsInput | string | null
    site_address?: NullableStringFieldUpdateOperationsInput | string | null
    site_country_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_province_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_ward_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_copyright?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    contact_channels?: NullableJsonNullValueInput | InputJsonValue
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    og_title?: NullableStringFieldUpdateOperationsInput | string | null
    og_description?: NullableStringFieldUpdateOperationsInput | string | null
    og_image?: NullableStringFieldUpdateOperationsInput | string | null
    canonical_url?: NullableStringFieldUpdateOperationsInput | string | null
    google_analytics_id?: NullableStringFieldUpdateOperationsInput | string | null
    google_search_console?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_pixel_id?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_site?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneralConfigUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    site_name?: StringFieldUpdateOperationsInput | string
    site_description?: NullableStringFieldUpdateOperationsInput | string | null
    site_logo?: NullableStringFieldUpdateOperationsInput | string | null
    site_favicon?: NullableStringFieldUpdateOperationsInput | string | null
    site_email?: NullableStringFieldUpdateOperationsInput | string | null
    site_phone?: NullableStringFieldUpdateOperationsInput | string | null
    site_address?: NullableStringFieldUpdateOperationsInput | string | null
    site_country_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_province_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_ward_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_copyright?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    contact_channels?: NullableJsonNullValueInput | InputJsonValue
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    og_title?: NullableStringFieldUpdateOperationsInput | string | null
    og_description?: NullableStringFieldUpdateOperationsInput | string | null
    og_image?: NullableStringFieldUpdateOperationsInput | string | null
    canonical_url?: NullableStringFieldUpdateOperationsInput | string | null
    google_analytics_id?: NullableStringFieldUpdateOperationsInput | string | null
    google_search_console?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_pixel_id?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_site?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneralConfigCreateManyInput = {
    id?: bigint | number
    site_name: string
    site_description?: string | null
    site_logo?: string | null
    site_favicon?: string | null
    site_email?: string | null
    site_phone?: string | null
    site_address?: string | null
    site_country_id?: bigint | number | null
    site_province_id?: bigint | number | null
    site_ward_id?: bigint | number | null
    site_copyright?: string | null
    timezone?: string
    locale?: string
    currency?: string
    contact_channels?: NullableJsonNullValueInput | InputJsonValue
    meta_title?: string | null
    meta_keywords?: string | null
    og_title?: string | null
    og_description?: string | null
    og_image?: string | null
    canonical_url?: string | null
    google_analytics_id?: string | null
    google_search_console?: string | null
    facebook_pixel_id?: string | null
    twitter_site?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GeneralConfigUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    site_name?: StringFieldUpdateOperationsInput | string
    site_description?: NullableStringFieldUpdateOperationsInput | string | null
    site_logo?: NullableStringFieldUpdateOperationsInput | string | null
    site_favicon?: NullableStringFieldUpdateOperationsInput | string | null
    site_email?: NullableStringFieldUpdateOperationsInput | string | null
    site_phone?: NullableStringFieldUpdateOperationsInput | string | null
    site_address?: NullableStringFieldUpdateOperationsInput | string | null
    site_country_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_province_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_ward_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_copyright?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    contact_channels?: NullableJsonNullValueInput | InputJsonValue
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    og_title?: NullableStringFieldUpdateOperationsInput | string | null
    og_description?: NullableStringFieldUpdateOperationsInput | string | null
    og_image?: NullableStringFieldUpdateOperationsInput | string | null
    canonical_url?: NullableStringFieldUpdateOperationsInput | string | null
    google_analytics_id?: NullableStringFieldUpdateOperationsInput | string | null
    google_search_console?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_pixel_id?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_site?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneralConfigUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    site_name?: StringFieldUpdateOperationsInput | string
    site_description?: NullableStringFieldUpdateOperationsInput | string | null
    site_logo?: NullableStringFieldUpdateOperationsInput | string | null
    site_favicon?: NullableStringFieldUpdateOperationsInput | string | null
    site_email?: NullableStringFieldUpdateOperationsInput | string | null
    site_phone?: NullableStringFieldUpdateOperationsInput | string | null
    site_address?: NullableStringFieldUpdateOperationsInput | string | null
    site_country_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_province_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_ward_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    site_copyright?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    contact_channels?: NullableJsonNullValueInput | InputJsonValue
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    og_title?: NullableStringFieldUpdateOperationsInput | string | null
    og_description?: NullableStringFieldUpdateOperationsInput | string | null
    og_image?: NullableStringFieldUpdateOperationsInput | string | null
    canonical_url?: NullableStringFieldUpdateOperationsInput | string | null
    google_analytics_id?: NullableStringFieldUpdateOperationsInput | string | null
    google_search_console?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_pixel_id?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_site?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailConfigCreateInput = {
    id?: bigint | number
    smtp_host: string
    smtp_port?: number
    smtp_secure?: boolean
    smtp_username: string
    smtp_password: string
    from_email: string
    from_name: string
    reply_to_email?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmailConfigUncheckedCreateInput = {
    id?: bigint | number
    smtp_host: string
    smtp_port?: number
    smtp_secure?: boolean
    smtp_username: string
    smtp_password: string
    from_email: string
    from_name: string
    reply_to_email?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmailConfigUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    smtp_host?: StringFieldUpdateOperationsInput | string
    smtp_port?: IntFieldUpdateOperationsInput | number
    smtp_secure?: BoolFieldUpdateOperationsInput | boolean
    smtp_username?: StringFieldUpdateOperationsInput | string
    smtp_password?: StringFieldUpdateOperationsInput | string
    from_email?: StringFieldUpdateOperationsInput | string
    from_name?: StringFieldUpdateOperationsInput | string
    reply_to_email?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailConfigUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    smtp_host?: StringFieldUpdateOperationsInput | string
    smtp_port?: IntFieldUpdateOperationsInput | number
    smtp_secure?: BoolFieldUpdateOperationsInput | boolean
    smtp_username?: StringFieldUpdateOperationsInput | string
    smtp_password?: StringFieldUpdateOperationsInput | string
    from_email?: StringFieldUpdateOperationsInput | string
    from_name?: StringFieldUpdateOperationsInput | string
    reply_to_email?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailConfigCreateManyInput = {
    id?: bigint | number
    smtp_host: string
    smtp_port?: number
    smtp_secure?: boolean
    smtp_username: string
    smtp_password: string
    from_email: string
    from_name: string
    reply_to_email?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type EmailConfigUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    smtp_host?: StringFieldUpdateOperationsInput | string
    smtp_port?: IntFieldUpdateOperationsInput | number
    smtp_secure?: BoolFieldUpdateOperationsInput | boolean
    smtp_username?: StringFieldUpdateOperationsInput | string
    smtp_password?: StringFieldUpdateOperationsInput | string
    from_email?: StringFieldUpdateOperationsInput | string
    from_name?: StringFieldUpdateOperationsInput | string
    reply_to_email?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailConfigUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    smtp_host?: StringFieldUpdateOperationsInput | string
    smtp_port?: IntFieldUpdateOperationsInput | number
    smtp_secure?: BoolFieldUpdateOperationsInput | boolean
    smtp_username?: StringFieldUpdateOperationsInput | string
    smtp_password?: StringFieldUpdateOperationsInput | string
    from_email?: StringFieldUpdateOperationsInput | string
    from_name?: StringFieldUpdateOperationsInput | string
    reply_to_email?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuCreateInput = {
    id?: bigint | number
    code: string
    name: string
    path?: string | null
    api_path?: string | null
    icon?: string | null
    type?: string
    status?: string
    sort_order?: number
    is_public?: boolean
    show_in_menu?: boolean
    group?: string
    required_permission_code?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: MenuCreateNestedOneWithoutChildrenInput
    children?: MenuCreateNestedManyWithoutParentInput
  }

  export type MenuUncheckedCreateInput = {
    id?: bigint | number
    code: string
    name: string
    path?: string | null
    api_path?: string | null
    icon?: string | null
    type?: string
    status?: string
    parent_id?: bigint | number | null
    sort_order?: number
    is_public?: boolean
    show_in_menu?: boolean
    group?: string
    required_permission_code?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: MenuUncheckedCreateNestedManyWithoutParentInput
  }

  export type MenuUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    api_path?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sort_order?: IntFieldUpdateOperationsInput | number
    is_public?: BoolFieldUpdateOperationsInput | boolean
    show_in_menu?: BoolFieldUpdateOperationsInput | boolean
    group?: StringFieldUpdateOperationsInput | string
    required_permission_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: MenuUpdateOneWithoutChildrenNestedInput
    children?: MenuUpdateManyWithoutParentNestedInput
  }

  export type MenuUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    api_path?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sort_order?: IntFieldUpdateOperationsInput | number
    is_public?: BoolFieldUpdateOperationsInput | boolean
    show_in_menu?: BoolFieldUpdateOperationsInput | boolean
    group?: StringFieldUpdateOperationsInput | string
    required_permission_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: MenuUncheckedUpdateManyWithoutParentNestedInput
  }

  export type MenuCreateManyInput = {
    id?: bigint | number
    code: string
    name: string
    path?: string | null
    api_path?: string | null
    icon?: string | null
    type?: string
    status?: string
    parent_id?: bigint | number | null
    sort_order?: number
    is_public?: boolean
    show_in_menu?: boolean
    group?: string
    required_permission_code?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MenuUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    api_path?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sort_order?: IntFieldUpdateOperationsInput | number
    is_public?: BoolFieldUpdateOperationsInput | boolean
    show_in_menu?: BoolFieldUpdateOperationsInput | boolean
    group?: StringFieldUpdateOperationsInput | string
    required_permission_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    api_path?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sort_order?: IntFieldUpdateOperationsInput | number
    is_public?: BoolFieldUpdateOperationsInput | boolean
    show_in_menu?: BoolFieldUpdateOperationsInput | boolean
    group?: StringFieldUpdateOperationsInput | string
    required_permission_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountryCreateInput = {
    id?: bigint | number
    code: string
    code_alpha3?: string | null
    name: string
    official_name?: string | null
    phone_code?: string | null
    currency_code?: string | null
    flag_emoji?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    provinces?: ProvinceCreateNestedManyWithoutCountryInput
  }

  export type CountryUncheckedCreateInput = {
    id?: bigint | number
    code: string
    code_alpha3?: string | null
    name: string
    official_name?: string | null
    phone_code?: string | null
    currency_code?: string | null
    flag_emoji?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    provinces?: ProvinceUncheckedCreateNestedManyWithoutCountryInput
  }

  export type CountryUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    code_alpha3?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    official_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    currency_code?: NullableStringFieldUpdateOperationsInput | string | null
    flag_emoji?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    provinces?: ProvinceUpdateManyWithoutCountryNestedInput
  }

  export type CountryUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    code_alpha3?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    official_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    currency_code?: NullableStringFieldUpdateOperationsInput | string | null
    flag_emoji?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    provinces?: ProvinceUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type CountryCreateManyInput = {
    id?: bigint | number
    code: string
    code_alpha3?: string | null
    name: string
    official_name?: string | null
    phone_code?: string | null
    currency_code?: string | null
    flag_emoji?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CountryUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    code_alpha3?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    official_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    currency_code?: NullableStringFieldUpdateOperationsInput | string | null
    flag_emoji?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountryUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    code_alpha3?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    official_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    currency_code?: NullableStringFieldUpdateOperationsInput | string | null
    flag_emoji?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProvinceCreateInput = {
    id?: bigint | number
    code: string
    name: string
    type: string
    phone_code?: string | null
    status?: string
    note?: string | null
    code_bnv?: string | null
    code_tms?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    country: CountryCreateNestedOneWithoutProvincesInput
    wards?: WardCreateNestedManyWithoutProvinceInput
  }

  export type ProvinceUncheckedCreateInput = {
    id?: bigint | number
    code: string
    name: string
    type: string
    phone_code?: string | null
    country_id: bigint | number
    status?: string
    note?: string | null
    code_bnv?: string | null
    code_tms?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    wards?: WardUncheckedCreateNestedManyWithoutProvinceInput
  }

  export type ProvinceUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    code_bnv?: NullableStringFieldUpdateOperationsInput | string | null
    code_tms?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: CountryUpdateOneRequiredWithoutProvincesNestedInput
    wards?: WardUpdateManyWithoutProvinceNestedInput
  }

  export type ProvinceUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    country_id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    code_bnv?: NullableStringFieldUpdateOperationsInput | string | null
    code_tms?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    wards?: WardUncheckedUpdateManyWithoutProvinceNestedInput
  }

  export type ProvinceCreateManyInput = {
    id?: bigint | number
    code: string
    name: string
    type: string
    phone_code?: string | null
    country_id: bigint | number
    status?: string
    note?: string | null
    code_bnv?: string | null
    code_tms?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProvinceUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    code_bnv?: NullableStringFieldUpdateOperationsInput | string | null
    code_tms?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProvinceUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    country_id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    code_bnv?: NullableStringFieldUpdateOperationsInput | string | null
    code_tms?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WardCreateInput = {
    id?: bigint | number
    name: string
    type: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    province: ProvinceCreateNestedOneWithoutWardsInput
  }

  export type WardUncheckedCreateInput = {
    id?: bigint | number
    province_id: bigint | number
    name: string
    type: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WardUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    province?: ProvinceUpdateOneRequiredWithoutWardsNestedInput
  }

  export type WardUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    province_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WardCreateManyInput = {
    id?: bigint | number
    province_id: bigint | number
    name: string
    type: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WardUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WardUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    province_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type GeneralConfigCountOrderByAggregateInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_description?: SortOrder
    site_logo?: SortOrder
    site_favicon?: SortOrder
    site_email?: SortOrder
    site_phone?: SortOrder
    site_address?: SortOrder
    site_country_id?: SortOrder
    site_province_id?: SortOrder
    site_ward_id?: SortOrder
    site_copyright?: SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    contact_channels?: SortOrder
    meta_title?: SortOrder
    meta_keywords?: SortOrder
    og_title?: SortOrder
    og_description?: SortOrder
    og_image?: SortOrder
    canonical_url?: SortOrder
    google_analytics_id?: SortOrder
    google_search_console?: SortOrder
    facebook_pixel_id?: SortOrder
    twitter_site?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GeneralConfigAvgOrderByAggregateInput = {
    id?: SortOrder
    site_country_id?: SortOrder
    site_province_id?: SortOrder
    site_ward_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type GeneralConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_description?: SortOrder
    site_logo?: SortOrder
    site_favicon?: SortOrder
    site_email?: SortOrder
    site_phone?: SortOrder
    site_address?: SortOrder
    site_country_id?: SortOrder
    site_province_id?: SortOrder
    site_ward_id?: SortOrder
    site_copyright?: SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    meta_title?: SortOrder
    meta_keywords?: SortOrder
    og_title?: SortOrder
    og_description?: SortOrder
    og_image?: SortOrder
    canonical_url?: SortOrder
    google_analytics_id?: SortOrder
    google_search_console?: SortOrder
    facebook_pixel_id?: SortOrder
    twitter_site?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GeneralConfigMinOrderByAggregateInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_description?: SortOrder
    site_logo?: SortOrder
    site_favicon?: SortOrder
    site_email?: SortOrder
    site_phone?: SortOrder
    site_address?: SortOrder
    site_country_id?: SortOrder
    site_province_id?: SortOrder
    site_ward_id?: SortOrder
    site_copyright?: SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    currency?: SortOrder
    meta_title?: SortOrder
    meta_keywords?: SortOrder
    og_title?: SortOrder
    og_description?: SortOrder
    og_image?: SortOrder
    canonical_url?: SortOrder
    google_analytics_id?: SortOrder
    google_search_console?: SortOrder
    facebook_pixel_id?: SortOrder
    twitter_site?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GeneralConfigSumOrderByAggregateInput = {
    id?: SortOrder
    site_country_id?: SortOrder
    site_province_id?: SortOrder
    site_ward_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EmailConfigCountOrderByAggregateInput = {
    id?: SortOrder
    smtp_host?: SortOrder
    smtp_port?: SortOrder
    smtp_secure?: SortOrder
    smtp_username?: SortOrder
    smtp_password?: SortOrder
    from_email?: SortOrder
    from_name?: SortOrder
    reply_to_email?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmailConfigAvgOrderByAggregateInput = {
    id?: SortOrder
    smtp_port?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type EmailConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    smtp_host?: SortOrder
    smtp_port?: SortOrder
    smtp_secure?: SortOrder
    smtp_username?: SortOrder
    smtp_password?: SortOrder
    from_email?: SortOrder
    from_name?: SortOrder
    reply_to_email?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmailConfigMinOrderByAggregateInput = {
    id?: SortOrder
    smtp_host?: SortOrder
    smtp_port?: SortOrder
    smtp_secure?: SortOrder
    smtp_username?: SortOrder
    smtp_password?: SortOrder
    from_email?: SortOrder
    from_name?: SortOrder
    reply_to_email?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EmailConfigSumOrderByAggregateInput = {
    id?: SortOrder
    smtp_port?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MenuNullableScalarRelationFilter = {
    is?: MenuWhereInput | null
    isNot?: MenuWhereInput | null
  }

  export type MenuListRelationFilter = {
    every?: MenuWhereInput
    some?: MenuWhereInput
    none?: MenuWhereInput
  }

  export type MenuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenuCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    path?: SortOrder
    api_path?: SortOrder
    icon?: SortOrder
    type?: SortOrder
    status?: SortOrder
    parent_id?: SortOrder
    sort_order?: SortOrder
    is_public?: SortOrder
    show_in_menu?: SortOrder
    group?: SortOrder
    required_permission_code?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MenuAvgOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
    sort_order?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type MenuMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    path?: SortOrder
    api_path?: SortOrder
    icon?: SortOrder
    type?: SortOrder
    status?: SortOrder
    parent_id?: SortOrder
    sort_order?: SortOrder
    is_public?: SortOrder
    show_in_menu?: SortOrder
    group?: SortOrder
    required_permission_code?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MenuMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    path?: SortOrder
    api_path?: SortOrder
    icon?: SortOrder
    type?: SortOrder
    status?: SortOrder
    parent_id?: SortOrder
    sort_order?: SortOrder
    is_public?: SortOrder
    show_in_menu?: SortOrder
    group?: SortOrder
    required_permission_code?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MenuSumOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
    sort_order?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type ProvinceListRelationFilter = {
    every?: ProvinceWhereInput
    some?: ProvinceWhereInput
    none?: ProvinceWhereInput
  }

  export type ProvinceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CountryCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    code_alpha3?: SortOrder
    name?: SortOrder
    official_name?: SortOrder
    phone_code?: SortOrder
    currency_code?: SortOrder
    flag_emoji?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CountryAvgOrderByAggregateInput = {
    id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type CountryMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    code_alpha3?: SortOrder
    name?: SortOrder
    official_name?: SortOrder
    phone_code?: SortOrder
    currency_code?: SortOrder
    flag_emoji?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CountryMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    code_alpha3?: SortOrder
    name?: SortOrder
    official_name?: SortOrder
    phone_code?: SortOrder
    currency_code?: SortOrder
    flag_emoji?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CountrySumOrderByAggregateInput = {
    id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type CountryScalarRelationFilter = {
    is?: CountryWhereInput
    isNot?: CountryWhereInput
  }

  export type WardListRelationFilter = {
    every?: WardWhereInput
    some?: WardWhereInput
    none?: WardWhereInput
  }

  export type WardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProvinceCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    phone_code?: SortOrder
    country_id?: SortOrder
    status?: SortOrder
    note?: SortOrder
    code_bnv?: SortOrder
    code_tms?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProvinceAvgOrderByAggregateInput = {
    id?: SortOrder
    country_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type ProvinceMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    phone_code?: SortOrder
    country_id?: SortOrder
    status?: SortOrder
    note?: SortOrder
    code_bnv?: SortOrder
    code_tms?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProvinceMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    phone_code?: SortOrder
    country_id?: SortOrder
    status?: SortOrder
    note?: SortOrder
    code_bnv?: SortOrder
    code_tms?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProvinceSumOrderByAggregateInput = {
    id?: SortOrder
    country_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type ProvinceScalarRelationFilter = {
    is?: ProvinceWhereInput
    isNot?: ProvinceWhereInput
  }

  export type WardCountOrderByAggregateInput = {
    id?: SortOrder
    province_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WardAvgOrderByAggregateInput = {
    id?: SortOrder
    province_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type WardMaxOrderByAggregateInput = {
    id?: SortOrder
    province_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WardMinOrderByAggregateInput = {
    id?: SortOrder
    province_id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WardSumOrderByAggregateInput = {
    id?: SortOrder
    province_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
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

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MenuCreateNestedOneWithoutChildrenInput = {
    create?: XOR<MenuCreateWithoutChildrenInput, MenuUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: MenuCreateOrConnectWithoutChildrenInput
    connect?: MenuWhereUniqueInput
  }

  export type MenuCreateNestedManyWithoutParentInput = {
    create?: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput> | MenuCreateWithoutParentInput[] | MenuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutParentInput | MenuCreateOrConnectWithoutParentInput[]
    createMany?: MenuCreateManyParentInputEnvelope
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
  }

  export type MenuUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput> | MenuCreateWithoutParentInput[] | MenuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutParentInput | MenuCreateOrConnectWithoutParentInput[]
    createMany?: MenuCreateManyParentInputEnvelope
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
  }

  export type MenuUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<MenuCreateWithoutChildrenInput, MenuUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: MenuCreateOrConnectWithoutChildrenInput
    upsert?: MenuUpsertWithoutChildrenInput
    disconnect?: MenuWhereInput | boolean
    delete?: MenuWhereInput | boolean
    connect?: MenuWhereUniqueInput
    update?: XOR<XOR<MenuUpdateToOneWithWhereWithoutChildrenInput, MenuUpdateWithoutChildrenInput>, MenuUncheckedUpdateWithoutChildrenInput>
  }

  export type MenuUpdateManyWithoutParentNestedInput = {
    create?: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput> | MenuCreateWithoutParentInput[] | MenuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutParentInput | MenuCreateOrConnectWithoutParentInput[]
    upsert?: MenuUpsertWithWhereUniqueWithoutParentInput | MenuUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: MenuCreateManyParentInputEnvelope
    set?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    disconnect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    delete?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    update?: MenuUpdateWithWhereUniqueWithoutParentInput | MenuUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: MenuUpdateManyWithWhereWithoutParentInput | MenuUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: MenuScalarWhereInput | MenuScalarWhereInput[]
  }

  export type MenuUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput> | MenuCreateWithoutParentInput[] | MenuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: MenuCreateOrConnectWithoutParentInput | MenuCreateOrConnectWithoutParentInput[]
    upsert?: MenuUpsertWithWhereUniqueWithoutParentInput | MenuUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: MenuCreateManyParentInputEnvelope
    set?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    disconnect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    delete?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    connect?: MenuWhereUniqueInput | MenuWhereUniqueInput[]
    update?: MenuUpdateWithWhereUniqueWithoutParentInput | MenuUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: MenuUpdateManyWithWhereWithoutParentInput | MenuUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: MenuScalarWhereInput | MenuScalarWhereInput[]
  }

  export type ProvinceCreateNestedManyWithoutCountryInput = {
    create?: XOR<ProvinceCreateWithoutCountryInput, ProvinceUncheckedCreateWithoutCountryInput> | ProvinceCreateWithoutCountryInput[] | ProvinceUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: ProvinceCreateOrConnectWithoutCountryInput | ProvinceCreateOrConnectWithoutCountryInput[]
    createMany?: ProvinceCreateManyCountryInputEnvelope
    connect?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
  }

  export type ProvinceUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<ProvinceCreateWithoutCountryInput, ProvinceUncheckedCreateWithoutCountryInput> | ProvinceCreateWithoutCountryInput[] | ProvinceUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: ProvinceCreateOrConnectWithoutCountryInput | ProvinceCreateOrConnectWithoutCountryInput[]
    createMany?: ProvinceCreateManyCountryInputEnvelope
    connect?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
  }

  export type ProvinceUpdateManyWithoutCountryNestedInput = {
    create?: XOR<ProvinceCreateWithoutCountryInput, ProvinceUncheckedCreateWithoutCountryInput> | ProvinceCreateWithoutCountryInput[] | ProvinceUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: ProvinceCreateOrConnectWithoutCountryInput | ProvinceCreateOrConnectWithoutCountryInput[]
    upsert?: ProvinceUpsertWithWhereUniqueWithoutCountryInput | ProvinceUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: ProvinceCreateManyCountryInputEnvelope
    set?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
    disconnect?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
    delete?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
    connect?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
    update?: ProvinceUpdateWithWhereUniqueWithoutCountryInput | ProvinceUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: ProvinceUpdateManyWithWhereWithoutCountryInput | ProvinceUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: ProvinceScalarWhereInput | ProvinceScalarWhereInput[]
  }

  export type ProvinceUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<ProvinceCreateWithoutCountryInput, ProvinceUncheckedCreateWithoutCountryInput> | ProvinceCreateWithoutCountryInput[] | ProvinceUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: ProvinceCreateOrConnectWithoutCountryInput | ProvinceCreateOrConnectWithoutCountryInput[]
    upsert?: ProvinceUpsertWithWhereUniqueWithoutCountryInput | ProvinceUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: ProvinceCreateManyCountryInputEnvelope
    set?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
    disconnect?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
    delete?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
    connect?: ProvinceWhereUniqueInput | ProvinceWhereUniqueInput[]
    update?: ProvinceUpdateWithWhereUniqueWithoutCountryInput | ProvinceUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: ProvinceUpdateManyWithWhereWithoutCountryInput | ProvinceUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: ProvinceScalarWhereInput | ProvinceScalarWhereInput[]
  }

  export type CountryCreateNestedOneWithoutProvincesInput = {
    create?: XOR<CountryCreateWithoutProvincesInput, CountryUncheckedCreateWithoutProvincesInput>
    connectOrCreate?: CountryCreateOrConnectWithoutProvincesInput
    connect?: CountryWhereUniqueInput
  }

  export type WardCreateNestedManyWithoutProvinceInput = {
    create?: XOR<WardCreateWithoutProvinceInput, WardUncheckedCreateWithoutProvinceInput> | WardCreateWithoutProvinceInput[] | WardUncheckedCreateWithoutProvinceInput[]
    connectOrCreate?: WardCreateOrConnectWithoutProvinceInput | WardCreateOrConnectWithoutProvinceInput[]
    createMany?: WardCreateManyProvinceInputEnvelope
    connect?: WardWhereUniqueInput | WardWhereUniqueInput[]
  }

  export type WardUncheckedCreateNestedManyWithoutProvinceInput = {
    create?: XOR<WardCreateWithoutProvinceInput, WardUncheckedCreateWithoutProvinceInput> | WardCreateWithoutProvinceInput[] | WardUncheckedCreateWithoutProvinceInput[]
    connectOrCreate?: WardCreateOrConnectWithoutProvinceInput | WardCreateOrConnectWithoutProvinceInput[]
    createMany?: WardCreateManyProvinceInputEnvelope
    connect?: WardWhereUniqueInput | WardWhereUniqueInput[]
  }

  export type CountryUpdateOneRequiredWithoutProvincesNestedInput = {
    create?: XOR<CountryCreateWithoutProvincesInput, CountryUncheckedCreateWithoutProvincesInput>
    connectOrCreate?: CountryCreateOrConnectWithoutProvincesInput
    upsert?: CountryUpsertWithoutProvincesInput
    connect?: CountryWhereUniqueInput
    update?: XOR<XOR<CountryUpdateToOneWithWhereWithoutProvincesInput, CountryUpdateWithoutProvincesInput>, CountryUncheckedUpdateWithoutProvincesInput>
  }

  export type WardUpdateManyWithoutProvinceNestedInput = {
    create?: XOR<WardCreateWithoutProvinceInput, WardUncheckedCreateWithoutProvinceInput> | WardCreateWithoutProvinceInput[] | WardUncheckedCreateWithoutProvinceInput[]
    connectOrCreate?: WardCreateOrConnectWithoutProvinceInput | WardCreateOrConnectWithoutProvinceInput[]
    upsert?: WardUpsertWithWhereUniqueWithoutProvinceInput | WardUpsertWithWhereUniqueWithoutProvinceInput[]
    createMany?: WardCreateManyProvinceInputEnvelope
    set?: WardWhereUniqueInput | WardWhereUniqueInput[]
    disconnect?: WardWhereUniqueInput | WardWhereUniqueInput[]
    delete?: WardWhereUniqueInput | WardWhereUniqueInput[]
    connect?: WardWhereUniqueInput | WardWhereUniqueInput[]
    update?: WardUpdateWithWhereUniqueWithoutProvinceInput | WardUpdateWithWhereUniqueWithoutProvinceInput[]
    updateMany?: WardUpdateManyWithWhereWithoutProvinceInput | WardUpdateManyWithWhereWithoutProvinceInput[]
    deleteMany?: WardScalarWhereInput | WardScalarWhereInput[]
  }

  export type WardUncheckedUpdateManyWithoutProvinceNestedInput = {
    create?: XOR<WardCreateWithoutProvinceInput, WardUncheckedCreateWithoutProvinceInput> | WardCreateWithoutProvinceInput[] | WardUncheckedCreateWithoutProvinceInput[]
    connectOrCreate?: WardCreateOrConnectWithoutProvinceInput | WardCreateOrConnectWithoutProvinceInput[]
    upsert?: WardUpsertWithWhereUniqueWithoutProvinceInput | WardUpsertWithWhereUniqueWithoutProvinceInput[]
    createMany?: WardCreateManyProvinceInputEnvelope
    set?: WardWhereUniqueInput | WardWhereUniqueInput[]
    disconnect?: WardWhereUniqueInput | WardWhereUniqueInput[]
    delete?: WardWhereUniqueInput | WardWhereUniqueInput[]
    connect?: WardWhereUniqueInput | WardWhereUniqueInput[]
    update?: WardUpdateWithWhereUniqueWithoutProvinceInput | WardUpdateWithWhereUniqueWithoutProvinceInput[]
    updateMany?: WardUpdateManyWithWhereWithoutProvinceInput | WardUpdateManyWithWhereWithoutProvinceInput[]
    deleteMany?: WardScalarWhereInput | WardScalarWhereInput[]
  }

  export type ProvinceCreateNestedOneWithoutWardsInput = {
    create?: XOR<ProvinceCreateWithoutWardsInput, ProvinceUncheckedCreateWithoutWardsInput>
    connectOrCreate?: ProvinceCreateOrConnectWithoutWardsInput
    connect?: ProvinceWhereUniqueInput
  }

  export type ProvinceUpdateOneRequiredWithoutWardsNestedInput = {
    create?: XOR<ProvinceCreateWithoutWardsInput, ProvinceUncheckedCreateWithoutWardsInput>
    connectOrCreate?: ProvinceCreateOrConnectWithoutWardsInput
    upsert?: ProvinceUpsertWithoutWardsInput
    connect?: ProvinceWhereUniqueInput
    update?: XOR<XOR<ProvinceUpdateToOneWithWhereWithoutWardsInput, ProvinceUpdateWithoutWardsInput>, ProvinceUncheckedUpdateWithoutWardsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MenuCreateWithoutChildrenInput = {
    id?: bigint | number
    code: string
    name: string
    path?: string | null
    api_path?: string | null
    icon?: string | null
    type?: string
    status?: string
    sort_order?: number
    is_public?: boolean
    show_in_menu?: boolean
    group?: string
    required_permission_code?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: MenuCreateNestedOneWithoutChildrenInput
  }

  export type MenuUncheckedCreateWithoutChildrenInput = {
    id?: bigint | number
    code: string
    name: string
    path?: string | null
    api_path?: string | null
    icon?: string | null
    type?: string
    status?: string
    parent_id?: bigint | number | null
    sort_order?: number
    is_public?: boolean
    show_in_menu?: boolean
    group?: string
    required_permission_code?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MenuCreateOrConnectWithoutChildrenInput = {
    where: MenuWhereUniqueInput
    create: XOR<MenuCreateWithoutChildrenInput, MenuUncheckedCreateWithoutChildrenInput>
  }

  export type MenuCreateWithoutParentInput = {
    id?: bigint | number
    code: string
    name: string
    path?: string | null
    api_path?: string | null
    icon?: string | null
    type?: string
    status?: string
    sort_order?: number
    is_public?: boolean
    show_in_menu?: boolean
    group?: string
    required_permission_code?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: MenuCreateNestedManyWithoutParentInput
  }

  export type MenuUncheckedCreateWithoutParentInput = {
    id?: bigint | number
    code: string
    name: string
    path?: string | null
    api_path?: string | null
    icon?: string | null
    type?: string
    status?: string
    sort_order?: number
    is_public?: boolean
    show_in_menu?: boolean
    group?: string
    required_permission_code?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: MenuUncheckedCreateNestedManyWithoutParentInput
  }

  export type MenuCreateOrConnectWithoutParentInput = {
    where: MenuWhereUniqueInput
    create: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput>
  }

  export type MenuCreateManyParentInputEnvelope = {
    data: MenuCreateManyParentInput | MenuCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type MenuUpsertWithoutChildrenInput = {
    update: XOR<MenuUpdateWithoutChildrenInput, MenuUncheckedUpdateWithoutChildrenInput>
    create: XOR<MenuCreateWithoutChildrenInput, MenuUncheckedCreateWithoutChildrenInput>
    where?: MenuWhereInput
  }

  export type MenuUpdateToOneWithWhereWithoutChildrenInput = {
    where?: MenuWhereInput
    data: XOR<MenuUpdateWithoutChildrenInput, MenuUncheckedUpdateWithoutChildrenInput>
  }

  export type MenuUpdateWithoutChildrenInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    api_path?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sort_order?: IntFieldUpdateOperationsInput | number
    is_public?: BoolFieldUpdateOperationsInput | boolean
    show_in_menu?: BoolFieldUpdateOperationsInput | boolean
    group?: StringFieldUpdateOperationsInput | string
    required_permission_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: MenuUpdateOneWithoutChildrenNestedInput
  }

  export type MenuUncheckedUpdateWithoutChildrenInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    api_path?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sort_order?: IntFieldUpdateOperationsInput | number
    is_public?: BoolFieldUpdateOperationsInput | boolean
    show_in_menu?: BoolFieldUpdateOperationsInput | boolean
    group?: StringFieldUpdateOperationsInput | string
    required_permission_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuUpsertWithWhereUniqueWithoutParentInput = {
    where: MenuWhereUniqueInput
    update: XOR<MenuUpdateWithoutParentInput, MenuUncheckedUpdateWithoutParentInput>
    create: XOR<MenuCreateWithoutParentInput, MenuUncheckedCreateWithoutParentInput>
  }

  export type MenuUpdateWithWhereUniqueWithoutParentInput = {
    where: MenuWhereUniqueInput
    data: XOR<MenuUpdateWithoutParentInput, MenuUncheckedUpdateWithoutParentInput>
  }

  export type MenuUpdateManyWithWhereWithoutParentInput = {
    where: MenuScalarWhereInput
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyWithoutParentInput>
  }

  export type MenuScalarWhereInput = {
    AND?: MenuScalarWhereInput | MenuScalarWhereInput[]
    OR?: MenuScalarWhereInput[]
    NOT?: MenuScalarWhereInput | MenuScalarWhereInput[]
    id?: BigIntFilter<"Menu"> | bigint | number
    code?: StringFilter<"Menu"> | string
    name?: StringFilter<"Menu"> | string
    path?: StringNullableFilter<"Menu"> | string | null
    api_path?: StringNullableFilter<"Menu"> | string | null
    icon?: StringNullableFilter<"Menu"> | string | null
    type?: StringFilter<"Menu"> | string
    status?: StringFilter<"Menu"> | string
    parent_id?: BigIntNullableFilter<"Menu"> | bigint | number | null
    sort_order?: IntFilter<"Menu"> | number
    is_public?: BoolFilter<"Menu"> | boolean
    show_in_menu?: BoolFilter<"Menu"> | boolean
    group?: StringFilter<"Menu"> | string
    required_permission_code?: StringNullableFilter<"Menu"> | string | null
    created_user_id?: BigIntNullableFilter<"Menu"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Menu"> | bigint | number | null
    created_at?: DateTimeFilter<"Menu"> | Date | string
    updated_at?: DateTimeFilter<"Menu"> | Date | string
  }

  export type ProvinceCreateWithoutCountryInput = {
    id?: bigint | number
    code: string
    name: string
    type: string
    phone_code?: string | null
    status?: string
    note?: string | null
    code_bnv?: string | null
    code_tms?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    wards?: WardCreateNestedManyWithoutProvinceInput
  }

  export type ProvinceUncheckedCreateWithoutCountryInput = {
    id?: bigint | number
    code: string
    name: string
    type: string
    phone_code?: string | null
    status?: string
    note?: string | null
    code_bnv?: string | null
    code_tms?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    wards?: WardUncheckedCreateNestedManyWithoutProvinceInput
  }

  export type ProvinceCreateOrConnectWithoutCountryInput = {
    where: ProvinceWhereUniqueInput
    create: XOR<ProvinceCreateWithoutCountryInput, ProvinceUncheckedCreateWithoutCountryInput>
  }

  export type ProvinceCreateManyCountryInputEnvelope = {
    data: ProvinceCreateManyCountryInput | ProvinceCreateManyCountryInput[]
    skipDuplicates?: boolean
  }

  export type ProvinceUpsertWithWhereUniqueWithoutCountryInput = {
    where: ProvinceWhereUniqueInput
    update: XOR<ProvinceUpdateWithoutCountryInput, ProvinceUncheckedUpdateWithoutCountryInput>
    create: XOR<ProvinceCreateWithoutCountryInput, ProvinceUncheckedCreateWithoutCountryInput>
  }

  export type ProvinceUpdateWithWhereUniqueWithoutCountryInput = {
    where: ProvinceWhereUniqueInput
    data: XOR<ProvinceUpdateWithoutCountryInput, ProvinceUncheckedUpdateWithoutCountryInput>
  }

  export type ProvinceUpdateManyWithWhereWithoutCountryInput = {
    where: ProvinceScalarWhereInput
    data: XOR<ProvinceUpdateManyMutationInput, ProvinceUncheckedUpdateManyWithoutCountryInput>
  }

  export type ProvinceScalarWhereInput = {
    AND?: ProvinceScalarWhereInput | ProvinceScalarWhereInput[]
    OR?: ProvinceScalarWhereInput[]
    NOT?: ProvinceScalarWhereInput | ProvinceScalarWhereInput[]
    id?: BigIntFilter<"Province"> | bigint | number
    code?: StringFilter<"Province"> | string
    name?: StringFilter<"Province"> | string
    type?: StringFilter<"Province"> | string
    phone_code?: StringNullableFilter<"Province"> | string | null
    country_id?: BigIntFilter<"Province"> | bigint | number
    status?: StringFilter<"Province"> | string
    note?: StringNullableFilter<"Province"> | string | null
    code_bnv?: StringNullableFilter<"Province"> | string | null
    code_tms?: StringNullableFilter<"Province"> | string | null
    created_user_id?: BigIntNullableFilter<"Province"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Province"> | bigint | number | null
    created_at?: DateTimeFilter<"Province"> | Date | string
    updated_at?: DateTimeFilter<"Province"> | Date | string
  }

  export type CountryCreateWithoutProvincesInput = {
    id?: bigint | number
    code: string
    code_alpha3?: string | null
    name: string
    official_name?: string | null
    phone_code?: string | null
    currency_code?: string | null
    flag_emoji?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CountryUncheckedCreateWithoutProvincesInput = {
    id?: bigint | number
    code: string
    code_alpha3?: string | null
    name: string
    official_name?: string | null
    phone_code?: string | null
    currency_code?: string | null
    flag_emoji?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CountryCreateOrConnectWithoutProvincesInput = {
    where: CountryWhereUniqueInput
    create: XOR<CountryCreateWithoutProvincesInput, CountryUncheckedCreateWithoutProvincesInput>
  }

  export type WardCreateWithoutProvinceInput = {
    id?: bigint | number
    name: string
    type: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WardUncheckedCreateWithoutProvinceInput = {
    id?: bigint | number
    name: string
    type: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WardCreateOrConnectWithoutProvinceInput = {
    where: WardWhereUniqueInput
    create: XOR<WardCreateWithoutProvinceInput, WardUncheckedCreateWithoutProvinceInput>
  }

  export type WardCreateManyProvinceInputEnvelope = {
    data: WardCreateManyProvinceInput | WardCreateManyProvinceInput[]
    skipDuplicates?: boolean
  }

  export type CountryUpsertWithoutProvincesInput = {
    update: XOR<CountryUpdateWithoutProvincesInput, CountryUncheckedUpdateWithoutProvincesInput>
    create: XOR<CountryCreateWithoutProvincesInput, CountryUncheckedCreateWithoutProvincesInput>
    where?: CountryWhereInput
  }

  export type CountryUpdateToOneWithWhereWithoutProvincesInput = {
    where?: CountryWhereInput
    data: XOR<CountryUpdateWithoutProvincesInput, CountryUncheckedUpdateWithoutProvincesInput>
  }

  export type CountryUpdateWithoutProvincesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    code_alpha3?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    official_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    currency_code?: NullableStringFieldUpdateOperationsInput | string | null
    flag_emoji?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountryUncheckedUpdateWithoutProvincesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    code_alpha3?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    official_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    currency_code?: NullableStringFieldUpdateOperationsInput | string | null
    flag_emoji?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WardUpsertWithWhereUniqueWithoutProvinceInput = {
    where: WardWhereUniqueInput
    update: XOR<WardUpdateWithoutProvinceInput, WardUncheckedUpdateWithoutProvinceInput>
    create: XOR<WardCreateWithoutProvinceInput, WardUncheckedCreateWithoutProvinceInput>
  }

  export type WardUpdateWithWhereUniqueWithoutProvinceInput = {
    where: WardWhereUniqueInput
    data: XOR<WardUpdateWithoutProvinceInput, WardUncheckedUpdateWithoutProvinceInput>
  }

  export type WardUpdateManyWithWhereWithoutProvinceInput = {
    where: WardScalarWhereInput
    data: XOR<WardUpdateManyMutationInput, WardUncheckedUpdateManyWithoutProvinceInput>
  }

  export type WardScalarWhereInput = {
    AND?: WardScalarWhereInput | WardScalarWhereInput[]
    OR?: WardScalarWhereInput[]
    NOT?: WardScalarWhereInput | WardScalarWhereInput[]
    id?: BigIntFilter<"Ward"> | bigint | number
    province_id?: BigIntFilter<"Ward"> | bigint | number
    name?: StringFilter<"Ward"> | string
    type?: StringFilter<"Ward"> | string
    code?: StringFilter<"Ward"> | string
    status?: StringFilter<"Ward"> | string
    created_user_id?: BigIntNullableFilter<"Ward"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Ward"> | bigint | number | null
    created_at?: DateTimeFilter<"Ward"> | Date | string
    updated_at?: DateTimeFilter<"Ward"> | Date | string
  }

  export type ProvinceCreateWithoutWardsInput = {
    id?: bigint | number
    code: string
    name: string
    type: string
    phone_code?: string | null
    status?: string
    note?: string | null
    code_bnv?: string | null
    code_tms?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    country: CountryCreateNestedOneWithoutProvincesInput
  }

  export type ProvinceUncheckedCreateWithoutWardsInput = {
    id?: bigint | number
    code: string
    name: string
    type: string
    phone_code?: string | null
    country_id: bigint | number
    status?: string
    note?: string | null
    code_bnv?: string | null
    code_tms?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProvinceCreateOrConnectWithoutWardsInput = {
    where: ProvinceWhereUniqueInput
    create: XOR<ProvinceCreateWithoutWardsInput, ProvinceUncheckedCreateWithoutWardsInput>
  }

  export type ProvinceUpsertWithoutWardsInput = {
    update: XOR<ProvinceUpdateWithoutWardsInput, ProvinceUncheckedUpdateWithoutWardsInput>
    create: XOR<ProvinceCreateWithoutWardsInput, ProvinceUncheckedCreateWithoutWardsInput>
    where?: ProvinceWhereInput
  }

  export type ProvinceUpdateToOneWithWhereWithoutWardsInput = {
    where?: ProvinceWhereInput
    data: XOR<ProvinceUpdateWithoutWardsInput, ProvinceUncheckedUpdateWithoutWardsInput>
  }

  export type ProvinceUpdateWithoutWardsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    code_bnv?: NullableStringFieldUpdateOperationsInput | string | null
    code_tms?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: CountryUpdateOneRequiredWithoutProvincesNestedInput
  }

  export type ProvinceUncheckedUpdateWithoutWardsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    country_id?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    code_bnv?: NullableStringFieldUpdateOperationsInput | string | null
    code_tms?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuCreateManyParentInput = {
    id?: bigint | number
    code: string
    name: string
    path?: string | null
    api_path?: string | null
    icon?: string | null
    type?: string
    status?: string
    sort_order?: number
    is_public?: boolean
    show_in_menu?: boolean
    group?: string
    required_permission_code?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MenuUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    api_path?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sort_order?: IntFieldUpdateOperationsInput | number
    is_public?: BoolFieldUpdateOperationsInput | boolean
    show_in_menu?: BoolFieldUpdateOperationsInput | boolean
    group?: StringFieldUpdateOperationsInput | string
    required_permission_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: MenuUpdateManyWithoutParentNestedInput
  }

  export type MenuUncheckedUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    api_path?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sort_order?: IntFieldUpdateOperationsInput | number
    is_public?: BoolFieldUpdateOperationsInput | boolean
    show_in_menu?: BoolFieldUpdateOperationsInput | boolean
    group?: StringFieldUpdateOperationsInput | string
    required_permission_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: MenuUncheckedUpdateManyWithoutParentNestedInput
  }

  export type MenuUncheckedUpdateManyWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    api_path?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sort_order?: IntFieldUpdateOperationsInput | number
    is_public?: BoolFieldUpdateOperationsInput | boolean
    show_in_menu?: BoolFieldUpdateOperationsInput | boolean
    group?: StringFieldUpdateOperationsInput | string
    required_permission_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProvinceCreateManyCountryInput = {
    id?: bigint | number
    code: string
    name: string
    type: string
    phone_code?: string | null
    status?: string
    note?: string | null
    code_bnv?: string | null
    code_tms?: string | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProvinceUpdateWithoutCountryInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    code_bnv?: NullableStringFieldUpdateOperationsInput | string | null
    code_tms?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    wards?: WardUpdateManyWithoutProvinceNestedInput
  }

  export type ProvinceUncheckedUpdateWithoutCountryInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    code_bnv?: NullableStringFieldUpdateOperationsInput | string | null
    code_tms?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    wards?: WardUncheckedUpdateManyWithoutProvinceNestedInput
  }

  export type ProvinceUncheckedUpdateManyWithoutCountryInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    phone_code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    code_bnv?: NullableStringFieldUpdateOperationsInput | string | null
    code_tms?: NullableStringFieldUpdateOperationsInput | string | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WardCreateManyProvinceInput = {
    id?: bigint | number
    name: string
    type: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WardUpdateWithoutProvinceInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WardUncheckedUpdateWithoutProvinceInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WardUncheckedUpdateManyWithoutProvinceInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
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