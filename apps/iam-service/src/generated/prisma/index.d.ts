
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
 * Model Context
 * 
 */
export type Context = $Result.DefaultSelection<Prisma.$ContextPayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model UserGroup
 * 
 */
export type UserGroup = $Result.DefaultSelection<Prisma.$UserGroupPayload>
/**
 * Model Permission
 * 
 */
export type Permission = $Result.DefaultSelection<Prisma.$PermissionPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model RoleHasPermission
 * 
 */
export type RoleHasPermission = $Result.DefaultSelection<Prisma.$RoleHasPermissionPayload>
/**
 * Model RoleContext
 * 
 */
export type RoleContext = $Result.DefaultSelection<Prisma.$RoleContextPayload>
/**
 * Model UserRoleAssignment
 * 
 */
export type UserRoleAssignment = $Result.DefaultSelection<Prisma.$UserRoleAssignmentPayload>
/**
 * Model IamOutbox
 * 
 */
export type IamOutbox = $Result.DefaultSelection<Prisma.$IamOutboxPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Contexts
 * const contexts = await prisma.context.findMany()
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
   * // Fetch zero or more Contexts
   * const contexts = await prisma.context.findMany()
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
   * `prisma.context`: Exposes CRUD operations for the **Context** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contexts
    * const contexts = await prisma.context.findMany()
    * ```
    */
  get context(): Prisma.ContextDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGroup`: Exposes CRUD operations for the **UserGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGroups
    * const userGroups = await prisma.userGroup.findMany()
    * ```
    */
  get userGroup(): Prisma.UserGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): Prisma.PermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roleHasPermission`: Exposes CRUD operations for the **RoleHasPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoleHasPermissions
    * const roleHasPermissions = await prisma.roleHasPermission.findMany()
    * ```
    */
  get roleHasPermission(): Prisma.RoleHasPermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roleContext`: Exposes CRUD operations for the **RoleContext** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoleContexts
    * const roleContexts = await prisma.roleContext.findMany()
    * ```
    */
  get roleContext(): Prisma.RoleContextDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRoleAssignment`: Exposes CRUD operations for the **UserRoleAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoleAssignments
    * const userRoleAssignments = await prisma.userRoleAssignment.findMany()
    * ```
    */
  get userRoleAssignment(): Prisma.UserRoleAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.iamOutbox`: Exposes CRUD operations for the **IamOutbox** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IamOutboxes
    * const iamOutboxes = await prisma.iamOutbox.findMany()
    * ```
    */
  get iamOutbox(): Prisma.IamOutboxDelegate<ExtArgs, ClientOptions>;
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
    Context: 'Context',
    Group: 'Group',
    UserGroup: 'UserGroup',
    Permission: 'Permission',
    Role: 'Role',
    RoleHasPermission: 'RoleHasPermission',
    RoleContext: 'RoleContext',
    UserRoleAssignment: 'UserRoleAssignment',
    IamOutbox: 'IamOutbox'
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
      modelProps: "context" | "group" | "userGroup" | "permission" | "role" | "roleHasPermission" | "roleContext" | "userRoleAssignment" | "iamOutbox"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Context: {
        payload: Prisma.$ContextPayload<ExtArgs>
        fields: Prisma.ContextFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContextFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContextFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload>
          }
          findFirst: {
            args: Prisma.ContextFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContextFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload>
          }
          findMany: {
            args: Prisma.ContextFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload>[]
          }
          create: {
            args: Prisma.ContextCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload>
          }
          createMany: {
            args: Prisma.ContextCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContextCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload>[]
          }
          delete: {
            args: Prisma.ContextDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload>
          }
          update: {
            args: Prisma.ContextUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload>
          }
          deleteMany: {
            args: Prisma.ContextDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContextUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContextUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload>[]
          }
          upsert: {
            args: Prisma.ContextUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContextPayload>
          }
          aggregate: {
            args: Prisma.ContextAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContext>
          }
          groupBy: {
            args: Prisma.ContextGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContextGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContextCountArgs<ExtArgs>
            result: $Utils.Optional<ContextCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      UserGroup: {
        payload: Prisma.$UserGroupPayload<ExtArgs>
        fields: Prisma.UserGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          findFirst: {
            args: Prisma.UserGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          findMany: {
            args: Prisma.UserGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>[]
          }
          create: {
            args: Prisma.UserGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          createMany: {
            args: Prisma.UserGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>[]
          }
          delete: {
            args: Prisma.UserGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          update: {
            args: Prisma.UserGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          deleteMany: {
            args: Prisma.UserGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>[]
          }
          upsert: {
            args: Prisma.UserGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          aggregate: {
            args: Prisma.UserGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGroup>
          }
          groupBy: {
            args: Prisma.UserGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGroupCountArgs<ExtArgs>
            result: $Utils.Optional<UserGroupCountAggregateOutputType> | number
          }
        }
      }
      Permission: {
        payload: Prisma.$PermissionPayload<ExtArgs>
        fields: Prisma.PermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findFirst: {
            args: Prisma.PermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findMany: {
            args: Prisma.PermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          create: {
            args: Prisma.PermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          createMany: {
            args: Prisma.PermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          delete: {
            args: Prisma.PermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          update: {
            args: Prisma.PermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          deleteMany: {
            args: Prisma.PermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          upsert: {
            args: Prisma.PermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          aggregate: {
            args: Prisma.PermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermission>
          }
          groupBy: {
            args: Prisma.PermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      RoleHasPermission: {
        payload: Prisma.$RoleHasPermissionPayload<ExtArgs>
        fields: Prisma.RoleHasPermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleHasPermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleHasPermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          findFirst: {
            args: Prisma.RoleHasPermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleHasPermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          findMany: {
            args: Prisma.RoleHasPermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>[]
          }
          create: {
            args: Prisma.RoleHasPermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          createMany: {
            args: Prisma.RoleHasPermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleHasPermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>[]
          }
          delete: {
            args: Prisma.RoleHasPermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          update: {
            args: Prisma.RoleHasPermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          deleteMany: {
            args: Prisma.RoleHasPermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleHasPermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleHasPermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>[]
          }
          upsert: {
            args: Prisma.RoleHasPermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          aggregate: {
            args: Prisma.RoleHasPermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoleHasPermission>
          }
          groupBy: {
            args: Prisma.RoleHasPermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleHasPermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleHasPermissionCountArgs<ExtArgs>
            result: $Utils.Optional<RoleHasPermissionCountAggregateOutputType> | number
          }
        }
      }
      RoleContext: {
        payload: Prisma.$RoleContextPayload<ExtArgs>
        fields: Prisma.RoleContextFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleContextFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleContextFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload>
          }
          findFirst: {
            args: Prisma.RoleContextFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleContextFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload>
          }
          findMany: {
            args: Prisma.RoleContextFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload>[]
          }
          create: {
            args: Prisma.RoleContextCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload>
          }
          createMany: {
            args: Prisma.RoleContextCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleContextCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload>[]
          }
          delete: {
            args: Prisma.RoleContextDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload>
          }
          update: {
            args: Prisma.RoleContextUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload>
          }
          deleteMany: {
            args: Prisma.RoleContextDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleContextUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleContextUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload>[]
          }
          upsert: {
            args: Prisma.RoleContextUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleContextPayload>
          }
          aggregate: {
            args: Prisma.RoleContextAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoleContext>
          }
          groupBy: {
            args: Prisma.RoleContextGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleContextGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleContextCountArgs<ExtArgs>
            result: $Utils.Optional<RoleContextCountAggregateOutputType> | number
          }
        }
      }
      UserRoleAssignment: {
        payload: Prisma.$UserRoleAssignmentPayload<ExtArgs>
        fields: Prisma.UserRoleAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRoleAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRoleAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload>
          }
          findFirst: {
            args: Prisma.UserRoleAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRoleAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload>
          }
          findMany: {
            args: Prisma.UserRoleAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload>[]
          }
          create: {
            args: Prisma.UserRoleAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload>
          }
          createMany: {
            args: Prisma.UserRoleAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRoleAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload>[]
          }
          delete: {
            args: Prisma.UserRoleAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload>
          }
          update: {
            args: Prisma.UserRoleAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.UserRoleAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRoleAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRoleAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.UserRoleAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRoleAssignmentPayload>
          }
          aggregate: {
            args: Prisma.UserRoleAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRoleAssignment>
          }
          groupBy: {
            args: Prisma.UserRoleAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRoleAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRoleAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<UserRoleAssignmentCountAggregateOutputType> | number
          }
        }
      }
      IamOutbox: {
        payload: Prisma.$IamOutboxPayload<ExtArgs>
        fields: Prisma.IamOutboxFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IamOutboxFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IamOutboxFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload>
          }
          findFirst: {
            args: Prisma.IamOutboxFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IamOutboxFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload>
          }
          findMany: {
            args: Prisma.IamOutboxFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload>[]
          }
          create: {
            args: Prisma.IamOutboxCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload>
          }
          createMany: {
            args: Prisma.IamOutboxCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IamOutboxCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload>[]
          }
          delete: {
            args: Prisma.IamOutboxDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload>
          }
          update: {
            args: Prisma.IamOutboxUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload>
          }
          deleteMany: {
            args: Prisma.IamOutboxDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IamOutboxUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IamOutboxUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload>[]
          }
          upsert: {
            args: Prisma.IamOutboxUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IamOutboxPayload>
          }
          aggregate: {
            args: Prisma.IamOutboxAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIamOutbox>
          }
          groupBy: {
            args: Prisma.IamOutboxGroupByArgs<ExtArgs>
            result: $Utils.Optional<IamOutboxGroupByOutputType>[]
          }
          count: {
            args: Prisma.IamOutboxCountArgs<ExtArgs>
            result: $Utils.Optional<IamOutboxCountAggregateOutputType> | number
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
    context?: ContextOmit
    group?: GroupOmit
    userGroup?: UserGroupOmit
    permission?: PermissionOmit
    role?: RoleOmit
    roleHasPermission?: RoleHasPermissionOmit
    roleContext?: RoleContextOmit
    userRoleAssignment?: UserRoleAssignmentOmit
    iamOutbox?: IamOutboxOmit
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
   * Count Type ContextCountOutputType
   */

  export type ContextCountOutputType = {
    groups: number
    role_contexts: number
  }

  export type ContextCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groups?: boolean | ContextCountOutputTypeCountGroupsArgs
    role_contexts?: boolean | ContextCountOutputTypeCountRole_contextsArgs
  }

  // Custom InputTypes
  /**
   * ContextCountOutputType without action
   */
  export type ContextCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContextCountOutputType
     */
    select?: ContextCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContextCountOutputType without action
   */
  export type ContextCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
  }

  /**
   * ContextCountOutputType without action
   */
  export type ContextCountOutputTypeCountRole_contextsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleContextWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    user_groups: number
    user_role_assignments: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_groups?: boolean | GroupCountOutputTypeCountUser_groupsArgs
    user_role_assignments?: boolean | GroupCountOutputTypeCountUser_role_assignmentsArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountUser_groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountUser_role_assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleAssignmentWhereInput
  }


  /**
   * Count Type PermissionCountOutputType
   */

  export type PermissionCountOutputType = {
    children: number
    role_links: number
  }

  export type PermissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | PermissionCountOutputTypeCountChildrenArgs
    role_links?: boolean | PermissionCountOutputTypeCountRole_linksArgs
  }

  // Custom InputTypes
  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionCountOutputType
     */
    select?: PermissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
  }

  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeCountRole_linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleHasPermissionWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    children: number
    permissions: number
    role_contexts: number
    user_role_assignments: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | RoleCountOutputTypeCountChildrenArgs
    permissions?: boolean | RoleCountOutputTypeCountPermissionsArgs
    role_contexts?: boolean | RoleCountOutputTypeCountRole_contextsArgs
    user_role_assignments?: boolean | RoleCountOutputTypeCountUser_role_assignmentsArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleHasPermissionWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountRole_contextsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleContextWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUser_role_assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleAssignmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Context
   */

  export type AggregateContext = {
    _count: ContextCountAggregateOutputType | null
    _avg: ContextAvgAggregateOutputType | null
    _sum: ContextSumAggregateOutputType | null
    _min: ContextMinAggregateOutputType | null
    _max: ContextMaxAggregateOutputType | null
  }

  export type ContextAvgAggregateOutputType = {
    id: number | null
    ref_id: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type ContextSumAggregateOutputType = {
    id: bigint | null
    ref_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type ContextMinAggregateOutputType = {
    id: bigint | null
    type: string | null
    ref_id: bigint | null
    name: string | null
    code: string | null
    status: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ContextMaxAggregateOutputType = {
    id: bigint | null
    type: string | null
    ref_id: bigint | null
    name: string | null
    code: string | null
    status: string | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ContextCountAggregateOutputType = {
    id: number
    type: number
    ref_id: number
    name: number
    code: number
    status: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ContextAvgAggregateInputType = {
    id?: true
    ref_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type ContextSumAggregateInputType = {
    id?: true
    ref_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type ContextMinAggregateInputType = {
    id?: true
    type?: true
    ref_id?: true
    name?: true
    code?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ContextMaxAggregateInputType = {
    id?: true
    type?: true
    ref_id?: true
    name?: true
    code?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ContextCountAggregateInputType = {
    id?: true
    type?: true
    ref_id?: true
    name?: true
    code?: true
    status?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ContextAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Context to aggregate.
     */
    where?: ContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contexts to fetch.
     */
    orderBy?: ContextOrderByWithRelationInput | ContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contexts
    **/
    _count?: true | ContextCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContextAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContextSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContextMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContextMaxAggregateInputType
  }

  export type GetContextAggregateType<T extends ContextAggregateArgs> = {
        [P in keyof T & keyof AggregateContext]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContext[P]>
      : GetScalarType<T[P], AggregateContext[P]>
  }




  export type ContextGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContextWhereInput
    orderBy?: ContextOrderByWithAggregationInput | ContextOrderByWithAggregationInput[]
    by: ContextScalarFieldEnum[] | ContextScalarFieldEnum
    having?: ContextScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContextCountAggregateInputType | true
    _avg?: ContextAvgAggregateInputType
    _sum?: ContextSumAggregateInputType
    _min?: ContextMinAggregateInputType
    _max?: ContextMaxAggregateInputType
  }

  export type ContextGroupByOutputType = {
    id: bigint
    type: string
    ref_id: bigint | null
    name: string
    code: string
    status: string
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: ContextCountAggregateOutputType | null
    _avg: ContextAvgAggregateOutputType | null
    _sum: ContextSumAggregateOutputType | null
    _min: ContextMinAggregateOutputType | null
    _max: ContextMaxAggregateOutputType | null
  }

  type GetContextGroupByPayload<T extends ContextGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContextGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContextGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContextGroupByOutputType[P]>
            : GetScalarType<T[P], ContextGroupByOutputType[P]>
        }
      >
    >


  export type ContextSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    ref_id?: boolean
    name?: boolean
    code?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    groups?: boolean | Context$groupsArgs<ExtArgs>
    role_contexts?: boolean | Context$role_contextsArgs<ExtArgs>
    _count?: boolean | ContextCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["context"]>

  export type ContextSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    ref_id?: boolean
    name?: boolean
    code?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["context"]>

  export type ContextSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    ref_id?: boolean
    name?: boolean
    code?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["context"]>

  export type ContextSelectScalar = {
    id?: boolean
    type?: boolean
    ref_id?: boolean
    name?: boolean
    code?: boolean
    status?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ContextOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "ref_id" | "name" | "code" | "status" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["context"]>
  export type ContextInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groups?: boolean | Context$groupsArgs<ExtArgs>
    role_contexts?: boolean | Context$role_contextsArgs<ExtArgs>
    _count?: boolean | ContextCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContextIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ContextIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContextPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Context"
    objects: {
      groups: Prisma.$GroupPayload<ExtArgs>[]
      role_contexts: Prisma.$RoleContextPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      type: string
      ref_id: bigint | null
      name: string
      code: string
      status: string
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["context"]>
    composites: {}
  }

  type ContextGetPayload<S extends boolean | null | undefined | ContextDefaultArgs> = $Result.GetResult<Prisma.$ContextPayload, S>

  type ContextCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContextFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContextCountAggregateInputType | true
    }

  export interface ContextDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Context'], meta: { name: 'Context' } }
    /**
     * Find zero or one Context that matches the filter.
     * @param {ContextFindUniqueArgs} args - Arguments to find a Context
     * @example
     * // Get one Context
     * const context = await prisma.context.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContextFindUniqueArgs>(args: SelectSubset<T, ContextFindUniqueArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Context that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContextFindUniqueOrThrowArgs} args - Arguments to find a Context
     * @example
     * // Get one Context
     * const context = await prisma.context.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContextFindUniqueOrThrowArgs>(args: SelectSubset<T, ContextFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Context that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContextFindFirstArgs} args - Arguments to find a Context
     * @example
     * // Get one Context
     * const context = await prisma.context.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContextFindFirstArgs>(args?: SelectSubset<T, ContextFindFirstArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Context that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContextFindFirstOrThrowArgs} args - Arguments to find a Context
     * @example
     * // Get one Context
     * const context = await prisma.context.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContextFindFirstOrThrowArgs>(args?: SelectSubset<T, ContextFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contexts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContextFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contexts
     * const contexts = await prisma.context.findMany()
     * 
     * // Get first 10 Contexts
     * const contexts = await prisma.context.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contextWithIdOnly = await prisma.context.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContextFindManyArgs>(args?: SelectSubset<T, ContextFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Context.
     * @param {ContextCreateArgs} args - Arguments to create a Context.
     * @example
     * // Create one Context
     * const Context = await prisma.context.create({
     *   data: {
     *     // ... data to create a Context
     *   }
     * })
     * 
     */
    create<T extends ContextCreateArgs>(args: SelectSubset<T, ContextCreateArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contexts.
     * @param {ContextCreateManyArgs} args - Arguments to create many Contexts.
     * @example
     * // Create many Contexts
     * const context = await prisma.context.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContextCreateManyArgs>(args?: SelectSubset<T, ContextCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contexts and returns the data saved in the database.
     * @param {ContextCreateManyAndReturnArgs} args - Arguments to create many Contexts.
     * @example
     * // Create many Contexts
     * const context = await prisma.context.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contexts and only return the `id`
     * const contextWithIdOnly = await prisma.context.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContextCreateManyAndReturnArgs>(args?: SelectSubset<T, ContextCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Context.
     * @param {ContextDeleteArgs} args - Arguments to delete one Context.
     * @example
     * // Delete one Context
     * const Context = await prisma.context.delete({
     *   where: {
     *     // ... filter to delete one Context
     *   }
     * })
     * 
     */
    delete<T extends ContextDeleteArgs>(args: SelectSubset<T, ContextDeleteArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Context.
     * @param {ContextUpdateArgs} args - Arguments to update one Context.
     * @example
     * // Update one Context
     * const context = await prisma.context.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContextUpdateArgs>(args: SelectSubset<T, ContextUpdateArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contexts.
     * @param {ContextDeleteManyArgs} args - Arguments to filter Contexts to delete.
     * @example
     * // Delete a few Contexts
     * const { count } = await prisma.context.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContextDeleteManyArgs>(args?: SelectSubset<T, ContextDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContextUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contexts
     * const context = await prisma.context.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContextUpdateManyArgs>(args: SelectSubset<T, ContextUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contexts and returns the data updated in the database.
     * @param {ContextUpdateManyAndReturnArgs} args - Arguments to update many Contexts.
     * @example
     * // Update many Contexts
     * const context = await prisma.context.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contexts and only return the `id`
     * const contextWithIdOnly = await prisma.context.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContextUpdateManyAndReturnArgs>(args: SelectSubset<T, ContextUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Context.
     * @param {ContextUpsertArgs} args - Arguments to update or create a Context.
     * @example
     * // Update or create a Context
     * const context = await prisma.context.upsert({
     *   create: {
     *     // ... data to create a Context
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Context we want to update
     *   }
     * })
     */
    upsert<T extends ContextUpsertArgs>(args: SelectSubset<T, ContextUpsertArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContextCountArgs} args - Arguments to filter Contexts to count.
     * @example
     * // Count the number of Contexts
     * const count = await prisma.context.count({
     *   where: {
     *     // ... the filter for the Contexts we want to count
     *   }
     * })
    **/
    count<T extends ContextCountArgs>(
      args?: Subset<T, ContextCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContextCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Context.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContextAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContextAggregateArgs>(args: Subset<T, ContextAggregateArgs>): Prisma.PrismaPromise<GetContextAggregateType<T>>

    /**
     * Group by Context.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContextGroupByArgs} args - Group by arguments.
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
      T extends ContextGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContextGroupByArgs['orderBy'] }
        : { orderBy?: ContextGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContextGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContextGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Context model
   */
  readonly fields: ContextFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Context.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContextClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    groups<T extends Context$groupsArgs<ExtArgs> = {}>(args?: Subset<T, Context$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    role_contexts<T extends Context$role_contextsArgs<ExtArgs> = {}>(args?: Subset<T, Context$role_contextsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Context model
   */
  interface ContextFieldRefs {
    readonly id: FieldRef<"Context", 'BigInt'>
    readonly type: FieldRef<"Context", 'String'>
    readonly ref_id: FieldRef<"Context", 'BigInt'>
    readonly name: FieldRef<"Context", 'String'>
    readonly code: FieldRef<"Context", 'String'>
    readonly status: FieldRef<"Context", 'String'>
    readonly created_user_id: FieldRef<"Context", 'BigInt'>
    readonly updated_user_id: FieldRef<"Context", 'BigInt'>
    readonly created_at: FieldRef<"Context", 'DateTime'>
    readonly updated_at: FieldRef<"Context", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Context findUnique
   */
  export type ContextFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
    /**
     * Filter, which Context to fetch.
     */
    where: ContextWhereUniqueInput
  }

  /**
   * Context findUniqueOrThrow
   */
  export type ContextFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
    /**
     * Filter, which Context to fetch.
     */
    where: ContextWhereUniqueInput
  }

  /**
   * Context findFirst
   */
  export type ContextFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
    /**
     * Filter, which Context to fetch.
     */
    where?: ContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contexts to fetch.
     */
    orderBy?: ContextOrderByWithRelationInput | ContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contexts.
     */
    cursor?: ContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contexts.
     */
    distinct?: ContextScalarFieldEnum | ContextScalarFieldEnum[]
  }

  /**
   * Context findFirstOrThrow
   */
  export type ContextFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
    /**
     * Filter, which Context to fetch.
     */
    where?: ContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contexts to fetch.
     */
    orderBy?: ContextOrderByWithRelationInput | ContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contexts.
     */
    cursor?: ContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contexts.
     */
    distinct?: ContextScalarFieldEnum | ContextScalarFieldEnum[]
  }

  /**
   * Context findMany
   */
  export type ContextFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
    /**
     * Filter, which Contexts to fetch.
     */
    where?: ContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contexts to fetch.
     */
    orderBy?: ContextOrderByWithRelationInput | ContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contexts.
     */
    cursor?: ContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contexts.
     */
    distinct?: ContextScalarFieldEnum | ContextScalarFieldEnum[]
  }

  /**
   * Context create
   */
  export type ContextCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
    /**
     * The data needed to create a Context.
     */
    data: XOR<ContextCreateInput, ContextUncheckedCreateInput>
  }

  /**
   * Context createMany
   */
  export type ContextCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contexts.
     */
    data: ContextCreateManyInput | ContextCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Context createManyAndReturn
   */
  export type ContextCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * The data used to create many Contexts.
     */
    data: ContextCreateManyInput | ContextCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Context update
   */
  export type ContextUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
    /**
     * The data needed to update a Context.
     */
    data: XOR<ContextUpdateInput, ContextUncheckedUpdateInput>
    /**
     * Choose, which Context to update.
     */
    where: ContextWhereUniqueInput
  }

  /**
   * Context updateMany
   */
  export type ContextUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contexts.
     */
    data: XOR<ContextUpdateManyMutationInput, ContextUncheckedUpdateManyInput>
    /**
     * Filter which Contexts to update
     */
    where?: ContextWhereInput
    /**
     * Limit how many Contexts to update.
     */
    limit?: number
  }

  /**
   * Context updateManyAndReturn
   */
  export type ContextUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * The data used to update Contexts.
     */
    data: XOR<ContextUpdateManyMutationInput, ContextUncheckedUpdateManyInput>
    /**
     * Filter which Contexts to update
     */
    where?: ContextWhereInput
    /**
     * Limit how many Contexts to update.
     */
    limit?: number
  }

  /**
   * Context upsert
   */
  export type ContextUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
    /**
     * The filter to search for the Context to update in case it exists.
     */
    where: ContextWhereUniqueInput
    /**
     * In case the Context found by the `where` argument doesn't exist, create a new Context with this data.
     */
    create: XOR<ContextCreateInput, ContextUncheckedCreateInput>
    /**
     * In case the Context was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContextUpdateInput, ContextUncheckedUpdateInput>
  }

  /**
   * Context delete
   */
  export type ContextDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
    /**
     * Filter which Context to delete.
     */
    where: ContextWhereUniqueInput
  }

  /**
   * Context deleteMany
   */
  export type ContextDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contexts to delete
     */
    where?: ContextWhereInput
    /**
     * Limit how many Contexts to delete.
     */
    limit?: number
  }

  /**
   * Context.groups
   */
  export type Context$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    cursor?: GroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Context.role_contexts
   */
  export type Context$role_contextsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    where?: RoleContextWhereInput
    orderBy?: RoleContextOrderByWithRelationInput | RoleContextOrderByWithRelationInput[]
    cursor?: RoleContextWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleContextScalarFieldEnum | RoleContextScalarFieldEnum[]
  }

  /**
   * Context without action
   */
  export type ContextDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Context
     */
    select?: ContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Context
     */
    omit?: ContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContextInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _avg: GroupAvgAggregateOutputType | null
    _sum: GroupSumAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupAvgAggregateOutputType = {
    id: number | null
    owner_id: number | null
    context_id: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type GroupSumAggregateOutputType = {
    id: bigint | null
    owner_id: bigint | null
    context_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type GroupMinAggregateOutputType = {
    id: bigint | null
    type: string | null
    code: string | null
    name: string | null
    description: string | null
    status: string | null
    owner_id: bigint | null
    context_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: bigint | null
    type: string | null
    code: string | null
    name: string | null
    description: string | null
    status: string | null
    owner_id: bigint | null
    context_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    type: number
    code: number
    name: number
    description: number
    status: number
    owner_id: number
    context_id: number
    metadata: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type GroupAvgAggregateInputType = {
    id?: true
    owner_id?: true
    context_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type GroupSumAggregateInputType = {
    id?: true
    owner_id?: true
    context_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type GroupMinAggregateInputType = {
    id?: true
    type?: true
    code?: true
    name?: true
    description?: true
    status?: true
    owner_id?: true
    context_id?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    type?: true
    code?: true
    name?: true
    description?: true
    status?: true
    owner_id?: true
    context_id?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    type?: true
    code?: true
    name?: true
    description?: true
    status?: true
    owner_id?: true
    context_id?: true
    metadata?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _avg?: GroupAvgAggregateInputType
    _sum?: GroupSumAggregateInputType
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: bigint
    type: string
    code: string
    name: string
    description: string | null
    status: string
    owner_id: bigint | null
    context_id: bigint
    metadata: JsonValue | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: GroupCountAggregateOutputType | null
    _avg: GroupAvgAggregateOutputType | null
    _sum: GroupSumAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    owner_id?: boolean
    context_id?: boolean
    metadata?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    context?: boolean | ContextDefaultArgs<ExtArgs>
    user_groups?: boolean | Group$user_groupsArgs<ExtArgs>
    user_role_assignments?: boolean | Group$user_role_assignmentsArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    owner_id?: boolean
    context_id?: boolean
    metadata?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    owner_id?: boolean
    context_id?: boolean
    metadata?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    id?: boolean
    type?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    owner_id?: boolean
    context_id?: boolean
    metadata?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type GroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "code" | "name" | "description" | "status" | "owner_id" | "context_id" | "metadata" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["group"]>
  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    context?: boolean | ContextDefaultArgs<ExtArgs>
    user_groups?: boolean | Group$user_groupsArgs<ExtArgs>
    user_role_assignments?: boolean | Group$user_role_assignmentsArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }
  export type GroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      context: Prisma.$ContextPayload<ExtArgs>
      user_groups: Prisma.$UserGroupPayload<ExtArgs>[]
      user_role_assignments: Prisma.$UserRoleAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      type: string
      code: string
      name: string
      description: string | null
      status: string
      owner_id: bigint | null
      context_id: bigint
      metadata: Prisma.JsonValue | null
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {GroupUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
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
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    context<T extends ContextDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContextDefaultArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user_groups<T extends Group$user_groupsArgs<ExtArgs> = {}>(args?: Subset<T, Group$user_groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_role_assignments<T extends Group$user_role_assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Group$user_role_assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Group model
   */
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'BigInt'>
    readonly type: FieldRef<"Group", 'String'>
    readonly code: FieldRef<"Group", 'String'>
    readonly name: FieldRef<"Group", 'String'>
    readonly description: FieldRef<"Group", 'String'>
    readonly status: FieldRef<"Group", 'String'>
    readonly owner_id: FieldRef<"Group", 'BigInt'>
    readonly context_id: FieldRef<"Group", 'BigInt'>
    readonly metadata: FieldRef<"Group", 'Json'>
    readonly created_user_id: FieldRef<"Group", 'BigInt'>
    readonly updated_user_id: FieldRef<"Group", 'BigInt'>
    readonly created_at: FieldRef<"Group", 'DateTime'>
    readonly updated_at: FieldRef<"Group", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group createManyAndReturn
   */
  export type GroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group updateManyAndReturn
   */
  export type GroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Group.user_groups
   */
  export type Group$user_groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    where?: UserGroupWhereInput
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    cursor?: UserGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * Group.user_role_assignments
   */
  export type Group$user_role_assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    where?: UserRoleAssignmentWhereInput
    orderBy?: UserRoleAssignmentOrderByWithRelationInput | UserRoleAssignmentOrderByWithRelationInput[]
    cursor?: UserRoleAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleAssignmentScalarFieldEnum | UserRoleAssignmentScalarFieldEnum[]
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model UserGroup
   */

  export type AggregateUserGroup = {
    _count: UserGroupCountAggregateOutputType | null
    _avg: UserGroupAvgAggregateOutputType | null
    _sum: UserGroupSumAggregateOutputType | null
    _min: UserGroupMinAggregateOutputType | null
    _max: UserGroupMaxAggregateOutputType | null
  }

  export type UserGroupAvgAggregateOutputType = {
    user_id: number | null
    group_id: number | null
  }

  export type UserGroupSumAggregateOutputType = {
    user_id: bigint | null
    group_id: bigint | null
  }

  export type UserGroupMinAggregateOutputType = {
    user_id: bigint | null
    group_id: bigint | null
    joined_at: Date | null
  }

  export type UserGroupMaxAggregateOutputType = {
    user_id: bigint | null
    group_id: bigint | null
    joined_at: Date | null
  }

  export type UserGroupCountAggregateOutputType = {
    user_id: number
    group_id: number
    joined_at: number
    _all: number
  }


  export type UserGroupAvgAggregateInputType = {
    user_id?: true
    group_id?: true
  }

  export type UserGroupSumAggregateInputType = {
    user_id?: true
    group_id?: true
  }

  export type UserGroupMinAggregateInputType = {
    user_id?: true
    group_id?: true
    joined_at?: true
  }

  export type UserGroupMaxAggregateInputType = {
    user_id?: true
    group_id?: true
    joined_at?: true
  }

  export type UserGroupCountAggregateInputType = {
    user_id?: true
    group_id?: true
    joined_at?: true
    _all?: true
  }

  export type UserGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroup to aggregate.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGroups
    **/
    _count?: true | UserGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGroupMaxAggregateInputType
  }

  export type GetUserGroupAggregateType<T extends UserGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGroup[P]>
      : GetScalarType<T[P], AggregateUserGroup[P]>
  }




  export type UserGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupWhereInput
    orderBy?: UserGroupOrderByWithAggregationInput | UserGroupOrderByWithAggregationInput[]
    by: UserGroupScalarFieldEnum[] | UserGroupScalarFieldEnum
    having?: UserGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGroupCountAggregateInputType | true
    _avg?: UserGroupAvgAggregateInputType
    _sum?: UserGroupSumAggregateInputType
    _min?: UserGroupMinAggregateInputType
    _max?: UserGroupMaxAggregateInputType
  }

  export type UserGroupGroupByOutputType = {
    user_id: bigint
    group_id: bigint
    joined_at: Date
    _count: UserGroupCountAggregateOutputType | null
    _avg: UserGroupAvgAggregateOutputType | null
    _sum: UserGroupSumAggregateOutputType | null
    _min: UserGroupMinAggregateOutputType | null
    _max: UserGroupMaxAggregateOutputType | null
  }

  type GetUserGroupGroupByPayload<T extends UserGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupGroupByOutputType[P]>
        }
      >
    >


  export type UserGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    group_id?: boolean
    joined_at?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroup"]>

  export type UserGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    group_id?: boolean
    joined_at?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroup"]>

  export type UserGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    group_id?: boolean
    joined_at?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroup"]>

  export type UserGroupSelectScalar = {
    user_id?: boolean
    group_id?: boolean
    joined_at?: boolean
  }

  export type UserGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "group_id" | "joined_at", ExtArgs["result"]["userGroup"]>
  export type UserGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type UserGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type UserGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }

  export type $UserGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGroup"
    objects: {
      group: Prisma.$GroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: bigint
      group_id: bigint
      joined_at: Date
    }, ExtArgs["result"]["userGroup"]>
    composites: {}
  }

  type UserGroupGetPayload<S extends boolean | null | undefined | UserGroupDefaultArgs> = $Result.GetResult<Prisma.$UserGroupPayload, S>

  type UserGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGroupCountAggregateInputType | true
    }

  export interface UserGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGroup'], meta: { name: 'UserGroup' } }
    /**
     * Find zero or one UserGroup that matches the filter.
     * @param {UserGroupFindUniqueArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGroupFindUniqueArgs>(args: SelectSubset<T, UserGroupFindUniqueArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGroupFindUniqueOrThrowArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupFindFirstArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGroupFindFirstArgs>(args?: SelectSubset<T, UserGroupFindFirstArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupFindFirstOrThrowArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGroups
     * const userGroups = await prisma.userGroup.findMany()
     * 
     * // Get first 10 UserGroups
     * const userGroups = await prisma.userGroup.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userGroupWithUser_idOnly = await prisma.userGroup.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserGroupFindManyArgs>(args?: SelectSubset<T, UserGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGroup.
     * @param {UserGroupCreateArgs} args - Arguments to create a UserGroup.
     * @example
     * // Create one UserGroup
     * const UserGroup = await prisma.userGroup.create({
     *   data: {
     *     // ... data to create a UserGroup
     *   }
     * })
     * 
     */
    create<T extends UserGroupCreateArgs>(args: SelectSubset<T, UserGroupCreateArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGroups.
     * @param {UserGroupCreateManyArgs} args - Arguments to create many UserGroups.
     * @example
     * // Create many UserGroups
     * const userGroup = await prisma.userGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGroupCreateManyArgs>(args?: SelectSubset<T, UserGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGroups and returns the data saved in the database.
     * @param {UserGroupCreateManyAndReturnArgs} args - Arguments to create many UserGroups.
     * @example
     * // Create many UserGroups
     * const userGroup = await prisma.userGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGroups and only return the `user_id`
     * const userGroupWithUser_idOnly = await prisma.userGroup.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGroup.
     * @param {UserGroupDeleteArgs} args - Arguments to delete one UserGroup.
     * @example
     * // Delete one UserGroup
     * const UserGroup = await prisma.userGroup.delete({
     *   where: {
     *     // ... filter to delete one UserGroup
     *   }
     * })
     * 
     */
    delete<T extends UserGroupDeleteArgs>(args: SelectSubset<T, UserGroupDeleteArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGroup.
     * @param {UserGroupUpdateArgs} args - Arguments to update one UserGroup.
     * @example
     * // Update one UserGroup
     * const userGroup = await prisma.userGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGroupUpdateArgs>(args: SelectSubset<T, UserGroupUpdateArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGroups.
     * @param {UserGroupDeleteManyArgs} args - Arguments to filter UserGroups to delete.
     * @example
     * // Delete a few UserGroups
     * const { count } = await prisma.userGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGroupDeleteManyArgs>(args?: SelectSubset<T, UserGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGroups
     * const userGroup = await prisma.userGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGroupUpdateManyArgs>(args: SelectSubset<T, UserGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroups and returns the data updated in the database.
     * @param {UserGroupUpdateManyAndReturnArgs} args - Arguments to update many UserGroups.
     * @example
     * // Update many UserGroups
     * const userGroup = await prisma.userGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGroups and only return the `user_id`
     * const userGroupWithUser_idOnly = await prisma.userGroup.updateManyAndReturn({
     *   select: { user_id: true },
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
    updateManyAndReturn<T extends UserGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGroup.
     * @param {UserGroupUpsertArgs} args - Arguments to update or create a UserGroup.
     * @example
     * // Update or create a UserGroup
     * const userGroup = await prisma.userGroup.upsert({
     *   create: {
     *     // ... data to create a UserGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGroup we want to update
     *   }
     * })
     */
    upsert<T extends UserGroupUpsertArgs>(args: SelectSubset<T, UserGroupUpsertArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupCountArgs} args - Arguments to filter UserGroups to count.
     * @example
     * // Count the number of UserGroups
     * const count = await prisma.userGroup.count({
     *   where: {
     *     // ... the filter for the UserGroups we want to count
     *   }
     * })
    **/
    count<T extends UserGroupCountArgs>(
      args?: Subset<T, UserGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserGroupAggregateArgs>(args: Subset<T, UserGroupAggregateArgs>): Prisma.PrismaPromise<GetUserGroupAggregateType<T>>

    /**
     * Group by UserGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupGroupByArgs} args - Group by arguments.
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
      T extends UserGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGroup model
   */
  readonly fields: UserGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserGroup model
   */
  interface UserGroupFieldRefs {
    readonly user_id: FieldRef<"UserGroup", 'BigInt'>
    readonly group_id: FieldRef<"UserGroup", 'BigInt'>
    readonly joined_at: FieldRef<"UserGroup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserGroup findUnique
   */
  export type UserGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup findUniqueOrThrow
   */
  export type UserGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup findFirst
   */
  export type UserGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroups.
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroups.
     */
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * UserGroup findFirstOrThrow
   */
  export type UserGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroups.
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroups.
     */
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * UserGroup findMany
   */
  export type UserGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroups to fetch.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGroups.
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroups.
     */
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * UserGroup create
   */
  export type UserGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a UserGroup.
     */
    data: XOR<UserGroupCreateInput, UserGroupUncheckedCreateInput>
  }

  /**
   * UserGroup createMany
   */
  export type UserGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGroups.
     */
    data: UserGroupCreateManyInput | UserGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGroup createManyAndReturn
   */
  export type UserGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * The data used to create many UserGroups.
     */
    data: UserGroupCreateManyInput | UserGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroup update
   */
  export type UserGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a UserGroup.
     */
    data: XOR<UserGroupUpdateInput, UserGroupUncheckedUpdateInput>
    /**
     * Choose, which UserGroup to update.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup updateMany
   */
  export type UserGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGroups.
     */
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyInput>
    /**
     * Filter which UserGroups to update
     */
    where?: UserGroupWhereInput
    /**
     * Limit how many UserGroups to update.
     */
    limit?: number
  }

  /**
   * UserGroup updateManyAndReturn
   */
  export type UserGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * The data used to update UserGroups.
     */
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyInput>
    /**
     * Filter which UserGroups to update
     */
    where?: UserGroupWhereInput
    /**
     * Limit how many UserGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroup upsert
   */
  export type UserGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the UserGroup to update in case it exists.
     */
    where: UserGroupWhereUniqueInput
    /**
     * In case the UserGroup found by the `where` argument doesn't exist, create a new UserGroup with this data.
     */
    create: XOR<UserGroupCreateInput, UserGroupUncheckedCreateInput>
    /**
     * In case the UserGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGroupUpdateInput, UserGroupUncheckedUpdateInput>
  }

  /**
   * UserGroup delete
   */
  export type UserGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter which UserGroup to delete.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup deleteMany
   */
  export type UserGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroups to delete
     */
    where?: UserGroupWhereInput
    /**
     * Limit how many UserGroups to delete.
     */
    limit?: number
  }

  /**
   * UserGroup without action
   */
  export type UserGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
  }


  /**
   * Model Permission
   */

  export type AggregatePermission = {
    _count: PermissionCountAggregateOutputType | null
    _avg: PermissionAvgAggregateOutputType | null
    _sum: PermissionSumAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  export type PermissionAvgAggregateOutputType = {
    id: number | null
    parent_id: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type PermissionSumAggregateOutputType = {
    id: bigint | null
    parent_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type PermissionMinAggregateOutputType = {
    id: bigint | null
    code: string | null
    scope: string | null
    name: string | null
    status: string | null
    parent_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PermissionMaxAggregateOutputType = {
    id: bigint | null
    code: string | null
    scope: string | null
    name: string | null
    status: string | null
    parent_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PermissionCountAggregateOutputType = {
    id: number
    code: number
    scope: number
    name: number
    status: number
    parent_id: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PermissionAvgAggregateInputType = {
    id?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type PermissionSumAggregateInputType = {
    id?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type PermissionMinAggregateInputType = {
    id?: true
    code?: true
    scope?: true
    name?: true
    status?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type PermissionMaxAggregateInputType = {
    id?: true
    code?: true
    scope?: true
    name?: true
    status?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type PermissionCountAggregateInputType = {
    id?: true
    code?: true
    scope?: true
    name?: true
    status?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permission to aggregate.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissions
    **/
    _count?: true | PermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PermissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PermissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionMaxAggregateInputType
  }

  export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermission[P]>
      : GetScalarType<T[P], AggregatePermission[P]>
  }




  export type PermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithAggregationInput | PermissionOrderByWithAggregationInput[]
    by: PermissionScalarFieldEnum[] | PermissionScalarFieldEnum
    having?: PermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionCountAggregateInputType | true
    _avg?: PermissionAvgAggregateInputType
    _sum?: PermissionSumAggregateInputType
    _min?: PermissionMinAggregateInputType
    _max?: PermissionMaxAggregateInputType
  }

  export type PermissionGroupByOutputType = {
    id: bigint
    code: string
    scope: string
    name: string | null
    status: string
    parent_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: PermissionCountAggregateOutputType | null
    _avg: PermissionAvgAggregateOutputType | null
    _sum: PermissionSumAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionGroupByOutputType[P]>
        }
      >
    >


  export type PermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    scope?: boolean
    name?: boolean
    status?: boolean
    parent_id?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Permission$parentArgs<ExtArgs>
    children?: boolean | Permission$childrenArgs<ExtArgs>
    role_links?: boolean | Permission$role_linksArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    scope?: boolean
    name?: boolean
    status?: boolean
    parent_id?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Permission$parentArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    scope?: boolean
    name?: boolean
    status?: boolean
    parent_id?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Permission$parentArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectScalar = {
    id?: boolean
    code?: boolean
    scope?: boolean
    name?: boolean
    status?: boolean
    parent_id?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "scope" | "name" | "status" | "parent_id" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["permission"]>
  export type PermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Permission$parentArgs<ExtArgs>
    children?: boolean | Permission$childrenArgs<ExtArgs>
    role_links?: boolean | Permission$role_linksArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Permission$parentArgs<ExtArgs>
  }
  export type PermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Permission$parentArgs<ExtArgs>
  }

  export type $PermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permission"
    objects: {
      parent: Prisma.$PermissionPayload<ExtArgs> | null
      children: Prisma.$PermissionPayload<ExtArgs>[]
      role_links: Prisma.$RoleHasPermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      code: string
      scope: string
      name: string | null
      status: string
      parent_id: bigint | null
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["permission"]>
    composites: {}
  }

  type PermissionGetPayload<S extends boolean | null | undefined | PermissionDefaultArgs> = $Result.GetResult<Prisma.$PermissionPayload, S>

  type PermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionCountAggregateInputType | true
    }

  export interface PermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permission'], meta: { name: 'Permission' } }
    /**
     * Find zero or one Permission that matches the filter.
     * @param {PermissionFindUniqueArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionFindUniqueArgs>(args: SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionFindUniqueOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionFindFirstArgs>(args?: SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissions
     * const permissions = await prisma.permission.findMany()
     * 
     * // Get first 10 Permissions
     * const permissions = await prisma.permission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionFindManyArgs>(args?: SelectSubset<T, PermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permission.
     * @param {PermissionCreateArgs} args - Arguments to create a Permission.
     * @example
     * // Create one Permission
     * const Permission = await prisma.permission.create({
     *   data: {
     *     // ... data to create a Permission
     *   }
     * })
     * 
     */
    create<T extends PermissionCreateArgs>(args: SelectSubset<T, PermissionCreateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permissions.
     * @param {PermissionCreateManyArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionCreateManyArgs>(args?: SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissions and returns the data saved in the database.
     * @param {PermissionCreateManyAndReturnArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Permission.
     * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
     * @example
     * // Delete one Permission
     * const Permission = await prisma.permission.delete({
     *   where: {
     *     // ... filter to delete one Permission
     *   }
     * })
     * 
     */
    delete<T extends PermissionDeleteArgs>(args: SelectSubset<T, PermissionDeleteArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permission.
     * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
     * @example
     * // Update one Permission
     * const permission = await prisma.permission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionUpdateArgs>(args: SelectSubset<T, PermissionUpdateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permissions.
     * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
     * @example
     * // Delete a few Permissions
     * const { count } = await prisma.permission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionDeleteManyArgs>(args?: SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionUpdateManyArgs>(args: SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions and returns the data updated in the database.
     * @param {PermissionUpdateManyAndReturnArgs} args - Arguments to update many Permissions.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.updateManyAndReturn({
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
    updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Permission.
     * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
     * @example
     * // Update or create a Permission
     * const permission = await prisma.permission.upsert({
     *   create: {
     *     // ... data to create a Permission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permission we want to update
     *   }
     * })
     */
    upsert<T extends PermissionUpsertArgs>(args: SelectSubset<T, PermissionUpsertArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionCountArgs} args - Arguments to filter Permissions to count.
     * @example
     * // Count the number of Permissions
     * const count = await prisma.permission.count({
     *   where: {
     *     // ... the filter for the Permissions we want to count
     *   }
     * })
    **/
    count<T extends PermissionCountArgs>(
      args?: Subset<T, PermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PermissionAggregateArgs>(args: Subset<T, PermissionAggregateArgs>): Prisma.PrismaPromise<GetPermissionAggregateType<T>>

    /**
     * Group by Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupByArgs} args - Group by arguments.
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
      T extends PermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionGroupByArgs['orderBy'] }
        : { orderBy?: PermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permission model
   */
  readonly fields: PermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Permission$parentArgs<ExtArgs> = {}>(args?: Subset<T, Permission$parentArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Permission$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Permission$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    role_links<T extends Permission$role_linksArgs<ExtArgs> = {}>(args?: Subset<T, Permission$role_linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Permission model
   */
  interface PermissionFieldRefs {
    readonly id: FieldRef<"Permission", 'BigInt'>
    readonly code: FieldRef<"Permission", 'String'>
    readonly scope: FieldRef<"Permission", 'String'>
    readonly name: FieldRef<"Permission", 'String'>
    readonly status: FieldRef<"Permission", 'String'>
    readonly parent_id: FieldRef<"Permission", 'BigInt'>
    readonly created_user_id: FieldRef<"Permission", 'BigInt'>
    readonly updated_user_id: FieldRef<"Permission", 'BigInt'>
    readonly created_at: FieldRef<"Permission", 'DateTime'>
    readonly updated_at: FieldRef<"Permission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Permission findUnique
   */
  export type PermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findUniqueOrThrow
   */
  export type PermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findFirst
   */
  export type PermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findFirstOrThrow
   */
  export type PermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findMany
   */
  export type PermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission create
   */
  export type PermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Permission.
     */
    data: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
  }

  /**
   * Permission createMany
   */
  export type PermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission createManyAndReturn
   */
  export type PermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Permission update
   */
  export type PermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Permission.
     */
    data: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
    /**
     * Choose, which Permission to update.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission updateMany
   */
  export type PermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission updateManyAndReturn
   */
  export type PermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Permission upsert
   */
  export type PermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Permission to update in case it exists.
     */
    where: PermissionWhereUniqueInput
    /**
     * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
     */
    create: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
    /**
     * In case the Permission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
  }

  /**
   * Permission delete
   */
  export type PermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter which Permission to delete.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission deleteMany
   */
  export type PermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to delete
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to delete.
     */
    limit?: number
  }

  /**
   * Permission.parent
   */
  export type Permission$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    where?: PermissionWhereInput
  }

  /**
   * Permission.children
   */
  export type Permission$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    cursor?: PermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission.role_links
   */
  export type Permission$role_linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    where?: RoleHasPermissionWhereInput
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    cursor?: RoleHasPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * Permission without action
   */
  export type PermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleAvgAggregateOutputType = {
    id: number | null
    parent_id: number | null
    created_user_id: number | null
    updated_user_id: number | null
  }

  export type RoleSumAggregateOutputType = {
    id: bigint | null
    parent_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
  }

  export type RoleMinAggregateOutputType = {
    id: bigint | null
    code: string | null
    name: string | null
    status: string | null
    parent_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: bigint | null
    code: string | null
    name: string | null
    status: string | null
    parent_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    code: number
    name: number
    status: number
    parent_id: number
    created_user_id: number
    updated_user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type RoleAvgAggregateInputType = {
    id?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type RoleSumAggregateInputType = {
    id?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
  }

  export type RoleMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    status?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    status?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    status?: true
    parent_id?: true
    created_user_id?: true
    updated_user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _avg?: RoleAvgAggregateInputType
    _sum?: RoleSumAggregateInputType
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: bigint
    code: string
    name: string | null
    status: string
    parent_id: bigint | null
    created_user_id: bigint | null
    updated_user_id: bigint | null
    created_at: Date
    updated_at: Date
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    status?: boolean
    parent_id?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Role$parentArgs<ExtArgs>
    children?: boolean | Role$childrenArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    role_contexts?: boolean | Role$role_contextsArgs<ExtArgs>
    user_role_assignments?: boolean | Role$user_role_assignmentsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    status?: boolean
    parent_id?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Role$parentArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    status?: boolean
    parent_id?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    parent?: boolean | Role$parentArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    status?: boolean
    parent_id?: boolean
    created_user_id?: boolean
    updated_user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "status" | "parent_id" | "created_user_id" | "updated_user_id" | "created_at" | "updated_at", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Role$parentArgs<ExtArgs>
    children?: boolean | Role$childrenArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    role_contexts?: boolean | Role$role_contextsArgs<ExtArgs>
    user_role_assignments?: boolean | Role$user_role_assignmentsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Role$parentArgs<ExtArgs>
  }
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Role$parentArgs<ExtArgs>
  }

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      parent: Prisma.$RolePayload<ExtArgs> | null
      children: Prisma.$RolePayload<ExtArgs>[]
      permissions: Prisma.$RoleHasPermissionPayload<ExtArgs>[]
      role_contexts: Prisma.$RoleContextPayload<ExtArgs>[]
      user_role_assignments: Prisma.$UserRoleAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      code: string
      name: string | null
      status: string
      parent_id: bigint | null
      created_user_id: bigint | null
      updated_user_id: bigint | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
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
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Role$parentArgs<ExtArgs> = {}>(args?: Subset<T, Role$parentArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Role$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Role$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends Role$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    role_contexts<T extends Role$role_contextsArgs<ExtArgs> = {}>(args?: Subset<T, Role$role_contextsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_role_assignments<T extends Role$user_role_assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Role$user_role_assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'BigInt'>
    readonly code: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly status: FieldRef<"Role", 'String'>
    readonly parent_id: FieldRef<"Role", 'BigInt'>
    readonly created_user_id: FieldRef<"Role", 'BigInt'>
    readonly updated_user_id: FieldRef<"Role", 'BigInt'>
    readonly created_at: FieldRef<"Role", 'DateTime'>
    readonly updated_at: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.parent
   */
  export type Role$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
  }

  /**
   * Role.children
   */
  export type Role$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    cursor?: RoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role.permissions
   */
  export type Role$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    where?: RoleHasPermissionWhereInput
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    cursor?: RoleHasPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * Role.role_contexts
   */
  export type Role$role_contextsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    where?: RoleContextWhereInput
    orderBy?: RoleContextOrderByWithRelationInput | RoleContextOrderByWithRelationInput[]
    cursor?: RoleContextWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleContextScalarFieldEnum | RoleContextScalarFieldEnum[]
  }

  /**
   * Role.user_role_assignments
   */
  export type Role$user_role_assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    where?: UserRoleAssignmentWhereInput
    orderBy?: UserRoleAssignmentOrderByWithRelationInput | UserRoleAssignmentOrderByWithRelationInput[]
    cursor?: UserRoleAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleAssignmentScalarFieldEnum | UserRoleAssignmentScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model RoleHasPermission
   */

  export type AggregateRoleHasPermission = {
    _count: RoleHasPermissionCountAggregateOutputType | null
    _avg: RoleHasPermissionAvgAggregateOutputType | null
    _sum: RoleHasPermissionSumAggregateOutputType | null
    _min: RoleHasPermissionMinAggregateOutputType | null
    _max: RoleHasPermissionMaxAggregateOutputType | null
  }

  export type RoleHasPermissionAvgAggregateOutputType = {
    role_id: number | null
    permission_id: number | null
  }

  export type RoleHasPermissionSumAggregateOutputType = {
    role_id: bigint | null
    permission_id: bigint | null
  }

  export type RoleHasPermissionMinAggregateOutputType = {
    role_id: bigint | null
    permission_id: bigint | null
  }

  export type RoleHasPermissionMaxAggregateOutputType = {
    role_id: bigint | null
    permission_id: bigint | null
  }

  export type RoleHasPermissionCountAggregateOutputType = {
    role_id: number
    permission_id: number
    _all: number
  }


  export type RoleHasPermissionAvgAggregateInputType = {
    role_id?: true
    permission_id?: true
  }

  export type RoleHasPermissionSumAggregateInputType = {
    role_id?: true
    permission_id?: true
  }

  export type RoleHasPermissionMinAggregateInputType = {
    role_id?: true
    permission_id?: true
  }

  export type RoleHasPermissionMaxAggregateInputType = {
    role_id?: true
    permission_id?: true
  }

  export type RoleHasPermissionCountAggregateInputType = {
    role_id?: true
    permission_id?: true
    _all?: true
  }

  export type RoleHasPermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleHasPermission to aggregate.
     */
    where?: RoleHasPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleHasPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoleHasPermissions
    **/
    _count?: true | RoleHasPermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleHasPermissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleHasPermissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleHasPermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleHasPermissionMaxAggregateInputType
  }

  export type GetRoleHasPermissionAggregateType<T extends RoleHasPermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateRoleHasPermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoleHasPermission[P]>
      : GetScalarType<T[P], AggregateRoleHasPermission[P]>
  }




  export type RoleHasPermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleHasPermissionWhereInput
    orderBy?: RoleHasPermissionOrderByWithAggregationInput | RoleHasPermissionOrderByWithAggregationInput[]
    by: RoleHasPermissionScalarFieldEnum[] | RoleHasPermissionScalarFieldEnum
    having?: RoleHasPermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleHasPermissionCountAggregateInputType | true
    _avg?: RoleHasPermissionAvgAggregateInputType
    _sum?: RoleHasPermissionSumAggregateInputType
    _min?: RoleHasPermissionMinAggregateInputType
    _max?: RoleHasPermissionMaxAggregateInputType
  }

  export type RoleHasPermissionGroupByOutputType = {
    role_id: bigint
    permission_id: bigint
    _count: RoleHasPermissionCountAggregateOutputType | null
    _avg: RoleHasPermissionAvgAggregateOutputType | null
    _sum: RoleHasPermissionSumAggregateOutputType | null
    _min: RoleHasPermissionMinAggregateOutputType | null
    _max: RoleHasPermissionMaxAggregateOutputType | null
  }

  type GetRoleHasPermissionGroupByPayload<T extends RoleHasPermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleHasPermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleHasPermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleHasPermissionGroupByOutputType[P]>
            : GetScalarType<T[P], RoleHasPermissionGroupByOutputType[P]>
        }
      >
    >


  export type RoleHasPermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    permission_id?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleHasPermission"]>

  export type RoleHasPermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    permission_id?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleHasPermission"]>

  export type RoleHasPermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    permission_id?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleHasPermission"]>

  export type RoleHasPermissionSelectScalar = {
    role_id?: boolean
    permission_id?: boolean
  }

  export type RoleHasPermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"role_id" | "permission_id", ExtArgs["result"]["roleHasPermission"]>
  export type RoleHasPermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }
  export type RoleHasPermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }
  export type RoleHasPermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }

  export type $RoleHasPermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoleHasPermission"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      permission: Prisma.$PermissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      role_id: bigint
      permission_id: bigint
    }, ExtArgs["result"]["roleHasPermission"]>
    composites: {}
  }

  type RoleHasPermissionGetPayload<S extends boolean | null | undefined | RoleHasPermissionDefaultArgs> = $Result.GetResult<Prisma.$RoleHasPermissionPayload, S>

  type RoleHasPermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleHasPermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleHasPermissionCountAggregateInputType | true
    }

  export interface RoleHasPermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoleHasPermission'], meta: { name: 'RoleHasPermission' } }
    /**
     * Find zero or one RoleHasPermission that matches the filter.
     * @param {RoleHasPermissionFindUniqueArgs} args - Arguments to find a RoleHasPermission
     * @example
     * // Get one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleHasPermissionFindUniqueArgs>(args: SelectSubset<T, RoleHasPermissionFindUniqueArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoleHasPermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleHasPermissionFindUniqueOrThrowArgs} args - Arguments to find a RoleHasPermission
     * @example
     * // Get one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleHasPermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleHasPermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleHasPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionFindFirstArgs} args - Arguments to find a RoleHasPermission
     * @example
     * // Get one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleHasPermissionFindFirstArgs>(args?: SelectSubset<T, RoleHasPermissionFindFirstArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleHasPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionFindFirstOrThrowArgs} args - Arguments to find a RoleHasPermission
     * @example
     * // Get one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleHasPermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleHasPermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoleHasPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermission.findMany()
     * 
     * // Get first 10 RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermission.findMany({ take: 10 })
     * 
     * // Only select the `role_id`
     * const roleHasPermissionWithRole_idOnly = await prisma.roleHasPermission.findMany({ select: { role_id: true } })
     * 
     */
    findMany<T extends RoleHasPermissionFindManyArgs>(args?: SelectSubset<T, RoleHasPermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoleHasPermission.
     * @param {RoleHasPermissionCreateArgs} args - Arguments to create a RoleHasPermission.
     * @example
     * // Create one RoleHasPermission
     * const RoleHasPermission = await prisma.roleHasPermission.create({
     *   data: {
     *     // ... data to create a RoleHasPermission
     *   }
     * })
     * 
     */
    create<T extends RoleHasPermissionCreateArgs>(args: SelectSubset<T, RoleHasPermissionCreateArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoleHasPermissions.
     * @param {RoleHasPermissionCreateManyArgs} args - Arguments to create many RoleHasPermissions.
     * @example
     * // Create many RoleHasPermissions
     * const roleHasPermission = await prisma.roleHasPermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleHasPermissionCreateManyArgs>(args?: SelectSubset<T, RoleHasPermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoleHasPermissions and returns the data saved in the database.
     * @param {RoleHasPermissionCreateManyAndReturnArgs} args - Arguments to create many RoleHasPermissions.
     * @example
     * // Create many RoleHasPermissions
     * const roleHasPermission = await prisma.roleHasPermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoleHasPermissions and only return the `role_id`
     * const roleHasPermissionWithRole_idOnly = await prisma.roleHasPermission.createManyAndReturn({
     *   select: { role_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleHasPermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleHasPermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoleHasPermission.
     * @param {RoleHasPermissionDeleteArgs} args - Arguments to delete one RoleHasPermission.
     * @example
     * // Delete one RoleHasPermission
     * const RoleHasPermission = await prisma.roleHasPermission.delete({
     *   where: {
     *     // ... filter to delete one RoleHasPermission
     *   }
     * })
     * 
     */
    delete<T extends RoleHasPermissionDeleteArgs>(args: SelectSubset<T, RoleHasPermissionDeleteArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoleHasPermission.
     * @param {RoleHasPermissionUpdateArgs} args - Arguments to update one RoleHasPermission.
     * @example
     * // Update one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleHasPermissionUpdateArgs>(args: SelectSubset<T, RoleHasPermissionUpdateArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoleHasPermissions.
     * @param {RoleHasPermissionDeleteManyArgs} args - Arguments to filter RoleHasPermissions to delete.
     * @example
     * // Delete a few RoleHasPermissions
     * const { count } = await prisma.roleHasPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleHasPermissionDeleteManyArgs>(args?: SelectSubset<T, RoleHasPermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoleHasPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoleHasPermissions
     * const roleHasPermission = await prisma.roleHasPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleHasPermissionUpdateManyArgs>(args: SelectSubset<T, RoleHasPermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoleHasPermissions and returns the data updated in the database.
     * @param {RoleHasPermissionUpdateManyAndReturnArgs} args - Arguments to update many RoleHasPermissions.
     * @example
     * // Update many RoleHasPermissions
     * const roleHasPermission = await prisma.roleHasPermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoleHasPermissions and only return the `role_id`
     * const roleHasPermissionWithRole_idOnly = await prisma.roleHasPermission.updateManyAndReturn({
     *   select: { role_id: true },
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
    updateManyAndReturn<T extends RoleHasPermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleHasPermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoleHasPermission.
     * @param {RoleHasPermissionUpsertArgs} args - Arguments to update or create a RoleHasPermission.
     * @example
     * // Update or create a RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.upsert({
     *   create: {
     *     // ... data to create a RoleHasPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoleHasPermission we want to update
     *   }
     * })
     */
    upsert<T extends RoleHasPermissionUpsertArgs>(args: SelectSubset<T, RoleHasPermissionUpsertArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoleHasPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionCountArgs} args - Arguments to filter RoleHasPermissions to count.
     * @example
     * // Count the number of RoleHasPermissions
     * const count = await prisma.roleHasPermission.count({
     *   where: {
     *     // ... the filter for the RoleHasPermissions we want to count
     *   }
     * })
    **/
    count<T extends RoleHasPermissionCountArgs>(
      args?: Subset<T, RoleHasPermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleHasPermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoleHasPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoleHasPermissionAggregateArgs>(args: Subset<T, RoleHasPermissionAggregateArgs>): Prisma.PrismaPromise<GetRoleHasPermissionAggregateType<T>>

    /**
     * Group by RoleHasPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionGroupByArgs} args - Group by arguments.
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
      T extends RoleHasPermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleHasPermissionGroupByArgs['orderBy'] }
        : { orderBy?: RoleHasPermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoleHasPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleHasPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoleHasPermission model
   */
  readonly fields: RoleHasPermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoleHasPermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleHasPermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    permission<T extends PermissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermissionDefaultArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RoleHasPermission model
   */
  interface RoleHasPermissionFieldRefs {
    readonly role_id: FieldRef<"RoleHasPermission", 'BigInt'>
    readonly permission_id: FieldRef<"RoleHasPermission", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * RoleHasPermission findUnique
   */
  export type RoleHasPermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermission to fetch.
     */
    where: RoleHasPermissionWhereUniqueInput
  }

  /**
   * RoleHasPermission findUniqueOrThrow
   */
  export type RoleHasPermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermission to fetch.
     */
    where: RoleHasPermissionWhereUniqueInput
  }

  /**
   * RoleHasPermission findFirst
   */
  export type RoleHasPermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermission to fetch.
     */
    where?: RoleHasPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleHasPermissions.
     */
    cursor?: RoleHasPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleHasPermissions.
     */
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * RoleHasPermission findFirstOrThrow
   */
  export type RoleHasPermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermission to fetch.
     */
    where?: RoleHasPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleHasPermissions.
     */
    cursor?: RoleHasPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleHasPermissions.
     */
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * RoleHasPermission findMany
   */
  export type RoleHasPermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermissions to fetch.
     */
    where?: RoleHasPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoleHasPermissions.
     */
    cursor?: RoleHasPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleHasPermissions.
     */
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * RoleHasPermission create
   */
  export type RoleHasPermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a RoleHasPermission.
     */
    data: XOR<RoleHasPermissionCreateInput, RoleHasPermissionUncheckedCreateInput>
  }

  /**
   * RoleHasPermission createMany
   */
  export type RoleHasPermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoleHasPermissions.
     */
    data: RoleHasPermissionCreateManyInput | RoleHasPermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoleHasPermission createManyAndReturn
   */
  export type RoleHasPermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * The data used to create many RoleHasPermissions.
     */
    data: RoleHasPermissionCreateManyInput | RoleHasPermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoleHasPermission update
   */
  export type RoleHasPermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a RoleHasPermission.
     */
    data: XOR<RoleHasPermissionUpdateInput, RoleHasPermissionUncheckedUpdateInput>
    /**
     * Choose, which RoleHasPermission to update.
     */
    where: RoleHasPermissionWhereUniqueInput
  }

  /**
   * RoleHasPermission updateMany
   */
  export type RoleHasPermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoleHasPermissions.
     */
    data: XOR<RoleHasPermissionUpdateManyMutationInput, RoleHasPermissionUncheckedUpdateManyInput>
    /**
     * Filter which RoleHasPermissions to update
     */
    where?: RoleHasPermissionWhereInput
    /**
     * Limit how many RoleHasPermissions to update.
     */
    limit?: number
  }

  /**
   * RoleHasPermission updateManyAndReturn
   */
  export type RoleHasPermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * The data used to update RoleHasPermissions.
     */
    data: XOR<RoleHasPermissionUpdateManyMutationInput, RoleHasPermissionUncheckedUpdateManyInput>
    /**
     * Filter which RoleHasPermissions to update
     */
    where?: RoleHasPermissionWhereInput
    /**
     * Limit how many RoleHasPermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoleHasPermission upsert
   */
  export type RoleHasPermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the RoleHasPermission to update in case it exists.
     */
    where: RoleHasPermissionWhereUniqueInput
    /**
     * In case the RoleHasPermission found by the `where` argument doesn't exist, create a new RoleHasPermission with this data.
     */
    create: XOR<RoleHasPermissionCreateInput, RoleHasPermissionUncheckedCreateInput>
    /**
     * In case the RoleHasPermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleHasPermissionUpdateInput, RoleHasPermissionUncheckedUpdateInput>
  }

  /**
   * RoleHasPermission delete
   */
  export type RoleHasPermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter which RoleHasPermission to delete.
     */
    where: RoleHasPermissionWhereUniqueInput
  }

  /**
   * RoleHasPermission deleteMany
   */
  export type RoleHasPermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleHasPermissions to delete
     */
    where?: RoleHasPermissionWhereInput
    /**
     * Limit how many RoleHasPermissions to delete.
     */
    limit?: number
  }

  /**
   * RoleHasPermission without action
   */
  export type RoleHasPermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
  }


  /**
   * Model RoleContext
   */

  export type AggregateRoleContext = {
    _count: RoleContextCountAggregateOutputType | null
    _avg: RoleContextAvgAggregateOutputType | null
    _sum: RoleContextSumAggregateOutputType | null
    _min: RoleContextMinAggregateOutputType | null
    _max: RoleContextMaxAggregateOutputType | null
  }

  export type RoleContextAvgAggregateOutputType = {
    role_id: number | null
    context_id: number | null
  }

  export type RoleContextSumAggregateOutputType = {
    role_id: bigint | null
    context_id: bigint | null
  }

  export type RoleContextMinAggregateOutputType = {
    role_id: bigint | null
    context_id: bigint | null
  }

  export type RoleContextMaxAggregateOutputType = {
    role_id: bigint | null
    context_id: bigint | null
  }

  export type RoleContextCountAggregateOutputType = {
    role_id: number
    context_id: number
    _all: number
  }


  export type RoleContextAvgAggregateInputType = {
    role_id?: true
    context_id?: true
  }

  export type RoleContextSumAggregateInputType = {
    role_id?: true
    context_id?: true
  }

  export type RoleContextMinAggregateInputType = {
    role_id?: true
    context_id?: true
  }

  export type RoleContextMaxAggregateInputType = {
    role_id?: true
    context_id?: true
  }

  export type RoleContextCountAggregateInputType = {
    role_id?: true
    context_id?: true
    _all?: true
  }

  export type RoleContextAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleContext to aggregate.
     */
    where?: RoleContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleContexts to fetch.
     */
    orderBy?: RoleContextOrderByWithRelationInput | RoleContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleContexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleContexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoleContexts
    **/
    _count?: true | RoleContextCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleContextAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleContextSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleContextMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleContextMaxAggregateInputType
  }

  export type GetRoleContextAggregateType<T extends RoleContextAggregateArgs> = {
        [P in keyof T & keyof AggregateRoleContext]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoleContext[P]>
      : GetScalarType<T[P], AggregateRoleContext[P]>
  }




  export type RoleContextGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleContextWhereInput
    orderBy?: RoleContextOrderByWithAggregationInput | RoleContextOrderByWithAggregationInput[]
    by: RoleContextScalarFieldEnum[] | RoleContextScalarFieldEnum
    having?: RoleContextScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleContextCountAggregateInputType | true
    _avg?: RoleContextAvgAggregateInputType
    _sum?: RoleContextSumAggregateInputType
    _min?: RoleContextMinAggregateInputType
    _max?: RoleContextMaxAggregateInputType
  }

  export type RoleContextGroupByOutputType = {
    role_id: bigint
    context_id: bigint
    _count: RoleContextCountAggregateOutputType | null
    _avg: RoleContextAvgAggregateOutputType | null
    _sum: RoleContextSumAggregateOutputType | null
    _min: RoleContextMinAggregateOutputType | null
    _max: RoleContextMaxAggregateOutputType | null
  }

  type GetRoleContextGroupByPayload<T extends RoleContextGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleContextGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleContextGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleContextGroupByOutputType[P]>
            : GetScalarType<T[P], RoleContextGroupByOutputType[P]>
        }
      >
    >


  export type RoleContextSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    context_id?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleContext"]>

  export type RoleContextSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    context_id?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleContext"]>

  export type RoleContextSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    context_id?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleContext"]>

  export type RoleContextSelectScalar = {
    role_id?: boolean
    context_id?: boolean
  }

  export type RoleContextOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"role_id" | "context_id", ExtArgs["result"]["roleContext"]>
  export type RoleContextInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }
  export type RoleContextIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }
  export type RoleContextIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    context?: boolean | ContextDefaultArgs<ExtArgs>
  }

  export type $RoleContextPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoleContext"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      context: Prisma.$ContextPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      role_id: bigint
      context_id: bigint
    }, ExtArgs["result"]["roleContext"]>
    composites: {}
  }

  type RoleContextGetPayload<S extends boolean | null | undefined | RoleContextDefaultArgs> = $Result.GetResult<Prisma.$RoleContextPayload, S>

  type RoleContextCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleContextFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleContextCountAggregateInputType | true
    }

  export interface RoleContextDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoleContext'], meta: { name: 'RoleContext' } }
    /**
     * Find zero or one RoleContext that matches the filter.
     * @param {RoleContextFindUniqueArgs} args - Arguments to find a RoleContext
     * @example
     * // Get one RoleContext
     * const roleContext = await prisma.roleContext.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleContextFindUniqueArgs>(args: SelectSubset<T, RoleContextFindUniqueArgs<ExtArgs>>): Prisma__RoleContextClient<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoleContext that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleContextFindUniqueOrThrowArgs} args - Arguments to find a RoleContext
     * @example
     * // Get one RoleContext
     * const roleContext = await prisma.roleContext.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleContextFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleContextFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleContextClient<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleContext that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleContextFindFirstArgs} args - Arguments to find a RoleContext
     * @example
     * // Get one RoleContext
     * const roleContext = await prisma.roleContext.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleContextFindFirstArgs>(args?: SelectSubset<T, RoleContextFindFirstArgs<ExtArgs>>): Prisma__RoleContextClient<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleContext that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleContextFindFirstOrThrowArgs} args - Arguments to find a RoleContext
     * @example
     * // Get one RoleContext
     * const roleContext = await prisma.roleContext.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleContextFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleContextFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleContextClient<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoleContexts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleContextFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoleContexts
     * const roleContexts = await prisma.roleContext.findMany()
     * 
     * // Get first 10 RoleContexts
     * const roleContexts = await prisma.roleContext.findMany({ take: 10 })
     * 
     * // Only select the `role_id`
     * const roleContextWithRole_idOnly = await prisma.roleContext.findMany({ select: { role_id: true } })
     * 
     */
    findMany<T extends RoleContextFindManyArgs>(args?: SelectSubset<T, RoleContextFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoleContext.
     * @param {RoleContextCreateArgs} args - Arguments to create a RoleContext.
     * @example
     * // Create one RoleContext
     * const RoleContext = await prisma.roleContext.create({
     *   data: {
     *     // ... data to create a RoleContext
     *   }
     * })
     * 
     */
    create<T extends RoleContextCreateArgs>(args: SelectSubset<T, RoleContextCreateArgs<ExtArgs>>): Prisma__RoleContextClient<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoleContexts.
     * @param {RoleContextCreateManyArgs} args - Arguments to create many RoleContexts.
     * @example
     * // Create many RoleContexts
     * const roleContext = await prisma.roleContext.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleContextCreateManyArgs>(args?: SelectSubset<T, RoleContextCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoleContexts and returns the data saved in the database.
     * @param {RoleContextCreateManyAndReturnArgs} args - Arguments to create many RoleContexts.
     * @example
     * // Create many RoleContexts
     * const roleContext = await prisma.roleContext.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoleContexts and only return the `role_id`
     * const roleContextWithRole_idOnly = await prisma.roleContext.createManyAndReturn({
     *   select: { role_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleContextCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleContextCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoleContext.
     * @param {RoleContextDeleteArgs} args - Arguments to delete one RoleContext.
     * @example
     * // Delete one RoleContext
     * const RoleContext = await prisma.roleContext.delete({
     *   where: {
     *     // ... filter to delete one RoleContext
     *   }
     * })
     * 
     */
    delete<T extends RoleContextDeleteArgs>(args: SelectSubset<T, RoleContextDeleteArgs<ExtArgs>>): Prisma__RoleContextClient<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoleContext.
     * @param {RoleContextUpdateArgs} args - Arguments to update one RoleContext.
     * @example
     * // Update one RoleContext
     * const roleContext = await prisma.roleContext.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleContextUpdateArgs>(args: SelectSubset<T, RoleContextUpdateArgs<ExtArgs>>): Prisma__RoleContextClient<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoleContexts.
     * @param {RoleContextDeleteManyArgs} args - Arguments to filter RoleContexts to delete.
     * @example
     * // Delete a few RoleContexts
     * const { count } = await prisma.roleContext.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleContextDeleteManyArgs>(args?: SelectSubset<T, RoleContextDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoleContexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleContextUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoleContexts
     * const roleContext = await prisma.roleContext.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleContextUpdateManyArgs>(args: SelectSubset<T, RoleContextUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoleContexts and returns the data updated in the database.
     * @param {RoleContextUpdateManyAndReturnArgs} args - Arguments to update many RoleContexts.
     * @example
     * // Update many RoleContexts
     * const roleContext = await prisma.roleContext.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoleContexts and only return the `role_id`
     * const roleContextWithRole_idOnly = await prisma.roleContext.updateManyAndReturn({
     *   select: { role_id: true },
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
    updateManyAndReturn<T extends RoleContextUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleContextUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoleContext.
     * @param {RoleContextUpsertArgs} args - Arguments to update or create a RoleContext.
     * @example
     * // Update or create a RoleContext
     * const roleContext = await prisma.roleContext.upsert({
     *   create: {
     *     // ... data to create a RoleContext
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoleContext we want to update
     *   }
     * })
     */
    upsert<T extends RoleContextUpsertArgs>(args: SelectSubset<T, RoleContextUpsertArgs<ExtArgs>>): Prisma__RoleContextClient<$Result.GetResult<Prisma.$RoleContextPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoleContexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleContextCountArgs} args - Arguments to filter RoleContexts to count.
     * @example
     * // Count the number of RoleContexts
     * const count = await prisma.roleContext.count({
     *   where: {
     *     // ... the filter for the RoleContexts we want to count
     *   }
     * })
    **/
    count<T extends RoleContextCountArgs>(
      args?: Subset<T, RoleContextCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleContextCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoleContext.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleContextAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoleContextAggregateArgs>(args: Subset<T, RoleContextAggregateArgs>): Prisma.PrismaPromise<GetRoleContextAggregateType<T>>

    /**
     * Group by RoleContext.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleContextGroupByArgs} args - Group by arguments.
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
      T extends RoleContextGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleContextGroupByArgs['orderBy'] }
        : { orderBy?: RoleContextGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoleContextGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleContextGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoleContext model
   */
  readonly fields: RoleContextFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoleContext.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleContextClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    context<T extends ContextDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContextDefaultArgs<ExtArgs>>): Prisma__ContextClient<$Result.GetResult<Prisma.$ContextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RoleContext model
   */
  interface RoleContextFieldRefs {
    readonly role_id: FieldRef<"RoleContext", 'BigInt'>
    readonly context_id: FieldRef<"RoleContext", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * RoleContext findUnique
   */
  export type RoleContextFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    /**
     * Filter, which RoleContext to fetch.
     */
    where: RoleContextWhereUniqueInput
  }

  /**
   * RoleContext findUniqueOrThrow
   */
  export type RoleContextFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    /**
     * Filter, which RoleContext to fetch.
     */
    where: RoleContextWhereUniqueInput
  }

  /**
   * RoleContext findFirst
   */
  export type RoleContextFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    /**
     * Filter, which RoleContext to fetch.
     */
    where?: RoleContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleContexts to fetch.
     */
    orderBy?: RoleContextOrderByWithRelationInput | RoleContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleContexts.
     */
    cursor?: RoleContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleContexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleContexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleContexts.
     */
    distinct?: RoleContextScalarFieldEnum | RoleContextScalarFieldEnum[]
  }

  /**
   * RoleContext findFirstOrThrow
   */
  export type RoleContextFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    /**
     * Filter, which RoleContext to fetch.
     */
    where?: RoleContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleContexts to fetch.
     */
    orderBy?: RoleContextOrderByWithRelationInput | RoleContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleContexts.
     */
    cursor?: RoleContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleContexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleContexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleContexts.
     */
    distinct?: RoleContextScalarFieldEnum | RoleContextScalarFieldEnum[]
  }

  /**
   * RoleContext findMany
   */
  export type RoleContextFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    /**
     * Filter, which RoleContexts to fetch.
     */
    where?: RoleContextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleContexts to fetch.
     */
    orderBy?: RoleContextOrderByWithRelationInput | RoleContextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoleContexts.
     */
    cursor?: RoleContextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleContexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleContexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleContexts.
     */
    distinct?: RoleContextScalarFieldEnum | RoleContextScalarFieldEnum[]
  }

  /**
   * RoleContext create
   */
  export type RoleContextCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    /**
     * The data needed to create a RoleContext.
     */
    data: XOR<RoleContextCreateInput, RoleContextUncheckedCreateInput>
  }

  /**
   * RoleContext createMany
   */
  export type RoleContextCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoleContexts.
     */
    data: RoleContextCreateManyInput | RoleContextCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoleContext createManyAndReturn
   */
  export type RoleContextCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * The data used to create many RoleContexts.
     */
    data: RoleContextCreateManyInput | RoleContextCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoleContext update
   */
  export type RoleContextUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    /**
     * The data needed to update a RoleContext.
     */
    data: XOR<RoleContextUpdateInput, RoleContextUncheckedUpdateInput>
    /**
     * Choose, which RoleContext to update.
     */
    where: RoleContextWhereUniqueInput
  }

  /**
   * RoleContext updateMany
   */
  export type RoleContextUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoleContexts.
     */
    data: XOR<RoleContextUpdateManyMutationInput, RoleContextUncheckedUpdateManyInput>
    /**
     * Filter which RoleContexts to update
     */
    where?: RoleContextWhereInput
    /**
     * Limit how many RoleContexts to update.
     */
    limit?: number
  }

  /**
   * RoleContext updateManyAndReturn
   */
  export type RoleContextUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * The data used to update RoleContexts.
     */
    data: XOR<RoleContextUpdateManyMutationInput, RoleContextUncheckedUpdateManyInput>
    /**
     * Filter which RoleContexts to update
     */
    where?: RoleContextWhereInput
    /**
     * Limit how many RoleContexts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoleContext upsert
   */
  export type RoleContextUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    /**
     * The filter to search for the RoleContext to update in case it exists.
     */
    where: RoleContextWhereUniqueInput
    /**
     * In case the RoleContext found by the `where` argument doesn't exist, create a new RoleContext with this data.
     */
    create: XOR<RoleContextCreateInput, RoleContextUncheckedCreateInput>
    /**
     * In case the RoleContext was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleContextUpdateInput, RoleContextUncheckedUpdateInput>
  }

  /**
   * RoleContext delete
   */
  export type RoleContextDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
    /**
     * Filter which RoleContext to delete.
     */
    where: RoleContextWhereUniqueInput
  }

  /**
   * RoleContext deleteMany
   */
  export type RoleContextDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleContexts to delete
     */
    where?: RoleContextWhereInput
    /**
     * Limit how many RoleContexts to delete.
     */
    limit?: number
  }

  /**
   * RoleContext without action
   */
  export type RoleContextDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleContext
     */
    select?: RoleContextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleContext
     */
    omit?: RoleContextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleContextInclude<ExtArgs> | null
  }


  /**
   * Model UserRoleAssignment
   */

  export type AggregateUserRoleAssignment = {
    _count: UserRoleAssignmentCountAggregateOutputType | null
    _avg: UserRoleAssignmentAvgAggregateOutputType | null
    _sum: UserRoleAssignmentSumAggregateOutputType | null
    _min: UserRoleAssignmentMinAggregateOutputType | null
    _max: UserRoleAssignmentMaxAggregateOutputType | null
  }

  export type UserRoleAssignmentAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    role_id: number | null
    group_id: number | null
  }

  export type UserRoleAssignmentSumAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    role_id: bigint | null
    group_id: bigint | null
  }

  export type UserRoleAssignmentMinAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    role_id: bigint | null
    group_id: bigint | null
    created_at: Date | null
  }

  export type UserRoleAssignmentMaxAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    role_id: bigint | null
    group_id: bigint | null
    created_at: Date | null
  }

  export type UserRoleAssignmentCountAggregateOutputType = {
    id: number
    user_id: number
    role_id: number
    group_id: number
    created_at: number
    _all: number
  }


  export type UserRoleAssignmentAvgAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    group_id?: true
  }

  export type UserRoleAssignmentSumAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    group_id?: true
  }

  export type UserRoleAssignmentMinAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    group_id?: true
    created_at?: true
  }

  export type UserRoleAssignmentMaxAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    group_id?: true
    created_at?: true
  }

  export type UserRoleAssignmentCountAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    group_id?: true
    created_at?: true
    _all?: true
  }

  export type UserRoleAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoleAssignment to aggregate.
     */
    where?: UserRoleAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoleAssignments to fetch.
     */
    orderBy?: UserRoleAssignmentOrderByWithRelationInput | UserRoleAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoleAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoleAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoleAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoleAssignments
    **/
    _count?: true | UserRoleAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserRoleAssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserRoleAssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoleAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoleAssignmentMaxAggregateInputType
  }

  export type GetUserRoleAssignmentAggregateType<T extends UserRoleAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRoleAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRoleAssignment[P]>
      : GetScalarType<T[P], AggregateUserRoleAssignment[P]>
  }




  export type UserRoleAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleAssignmentWhereInput
    orderBy?: UserRoleAssignmentOrderByWithAggregationInput | UserRoleAssignmentOrderByWithAggregationInput[]
    by: UserRoleAssignmentScalarFieldEnum[] | UserRoleAssignmentScalarFieldEnum
    having?: UserRoleAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRoleAssignmentCountAggregateInputType | true
    _avg?: UserRoleAssignmentAvgAggregateInputType
    _sum?: UserRoleAssignmentSumAggregateInputType
    _min?: UserRoleAssignmentMinAggregateInputType
    _max?: UserRoleAssignmentMaxAggregateInputType
  }

  export type UserRoleAssignmentGroupByOutputType = {
    id: bigint
    user_id: bigint
    role_id: bigint
    group_id: bigint
    created_at: Date
    _count: UserRoleAssignmentCountAggregateOutputType | null
    _avg: UserRoleAssignmentAvgAggregateOutputType | null
    _sum: UserRoleAssignmentSumAggregateOutputType | null
    _min: UserRoleAssignmentMinAggregateOutputType | null
    _max: UserRoleAssignmentMaxAggregateOutputType | null
  }

  type GetUserRoleAssignmentGroupByPayload<T extends UserRoleAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRoleAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoleAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoleAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoleAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type UserRoleAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    role_id?: boolean
    group_id?: boolean
    created_at?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRoleAssignment"]>

  export type UserRoleAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    role_id?: boolean
    group_id?: boolean
    created_at?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRoleAssignment"]>

  export type UserRoleAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    role_id?: boolean
    group_id?: boolean
    created_at?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRoleAssignment"]>

  export type UserRoleAssignmentSelectScalar = {
    id?: boolean
    user_id?: boolean
    role_id?: boolean
    group_id?: boolean
    created_at?: boolean
  }

  export type UserRoleAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "role_id" | "group_id" | "created_at", ExtArgs["result"]["userRoleAssignment"]>
  export type UserRoleAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type UserRoleAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type UserRoleAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }

  export type $UserRoleAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRoleAssignment"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      group: Prisma.$GroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      user_id: bigint
      role_id: bigint
      group_id: bigint
      created_at: Date
    }, ExtArgs["result"]["userRoleAssignment"]>
    composites: {}
  }

  type UserRoleAssignmentGetPayload<S extends boolean | null | undefined | UserRoleAssignmentDefaultArgs> = $Result.GetResult<Prisma.$UserRoleAssignmentPayload, S>

  type UserRoleAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRoleAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRoleAssignmentCountAggregateInputType | true
    }

  export interface UserRoleAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRoleAssignment'], meta: { name: 'UserRoleAssignment' } }
    /**
     * Find zero or one UserRoleAssignment that matches the filter.
     * @param {UserRoleAssignmentFindUniqueArgs} args - Arguments to find a UserRoleAssignment
     * @example
     * // Get one UserRoleAssignment
     * const userRoleAssignment = await prisma.userRoleAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRoleAssignmentFindUniqueArgs>(args: SelectSubset<T, UserRoleAssignmentFindUniqueArgs<ExtArgs>>): Prisma__UserRoleAssignmentClient<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRoleAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRoleAssignmentFindUniqueOrThrowArgs} args - Arguments to find a UserRoleAssignment
     * @example
     * // Get one UserRoleAssignment
     * const userRoleAssignment = await prisma.userRoleAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRoleAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRoleAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRoleAssignmentClient<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRoleAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAssignmentFindFirstArgs} args - Arguments to find a UserRoleAssignment
     * @example
     * // Get one UserRoleAssignment
     * const userRoleAssignment = await prisma.userRoleAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRoleAssignmentFindFirstArgs>(args?: SelectSubset<T, UserRoleAssignmentFindFirstArgs<ExtArgs>>): Prisma__UserRoleAssignmentClient<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRoleAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAssignmentFindFirstOrThrowArgs} args - Arguments to find a UserRoleAssignment
     * @example
     * // Get one UserRoleAssignment
     * const userRoleAssignment = await prisma.userRoleAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRoleAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRoleAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRoleAssignmentClient<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRoleAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoleAssignments
     * const userRoleAssignments = await prisma.userRoleAssignment.findMany()
     * 
     * // Get first 10 UserRoleAssignments
     * const userRoleAssignments = await prisma.userRoleAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRoleAssignmentWithIdOnly = await prisma.userRoleAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRoleAssignmentFindManyArgs>(args?: SelectSubset<T, UserRoleAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRoleAssignment.
     * @param {UserRoleAssignmentCreateArgs} args - Arguments to create a UserRoleAssignment.
     * @example
     * // Create one UserRoleAssignment
     * const UserRoleAssignment = await prisma.userRoleAssignment.create({
     *   data: {
     *     // ... data to create a UserRoleAssignment
     *   }
     * })
     * 
     */
    create<T extends UserRoleAssignmentCreateArgs>(args: SelectSubset<T, UserRoleAssignmentCreateArgs<ExtArgs>>): Prisma__UserRoleAssignmentClient<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRoleAssignments.
     * @param {UserRoleAssignmentCreateManyArgs} args - Arguments to create many UserRoleAssignments.
     * @example
     * // Create many UserRoleAssignments
     * const userRoleAssignment = await prisma.userRoleAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRoleAssignmentCreateManyArgs>(args?: SelectSubset<T, UserRoleAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRoleAssignments and returns the data saved in the database.
     * @param {UserRoleAssignmentCreateManyAndReturnArgs} args - Arguments to create many UserRoleAssignments.
     * @example
     * // Create many UserRoleAssignments
     * const userRoleAssignment = await prisma.userRoleAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRoleAssignments and only return the `id`
     * const userRoleAssignmentWithIdOnly = await prisma.userRoleAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRoleAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRoleAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRoleAssignment.
     * @param {UserRoleAssignmentDeleteArgs} args - Arguments to delete one UserRoleAssignment.
     * @example
     * // Delete one UserRoleAssignment
     * const UserRoleAssignment = await prisma.userRoleAssignment.delete({
     *   where: {
     *     // ... filter to delete one UserRoleAssignment
     *   }
     * })
     * 
     */
    delete<T extends UserRoleAssignmentDeleteArgs>(args: SelectSubset<T, UserRoleAssignmentDeleteArgs<ExtArgs>>): Prisma__UserRoleAssignmentClient<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRoleAssignment.
     * @param {UserRoleAssignmentUpdateArgs} args - Arguments to update one UserRoleAssignment.
     * @example
     * // Update one UserRoleAssignment
     * const userRoleAssignment = await prisma.userRoleAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRoleAssignmentUpdateArgs>(args: SelectSubset<T, UserRoleAssignmentUpdateArgs<ExtArgs>>): Prisma__UserRoleAssignmentClient<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRoleAssignments.
     * @param {UserRoleAssignmentDeleteManyArgs} args - Arguments to filter UserRoleAssignments to delete.
     * @example
     * // Delete a few UserRoleAssignments
     * const { count } = await prisma.userRoleAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRoleAssignmentDeleteManyArgs>(args?: SelectSubset<T, UserRoleAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoleAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoleAssignments
     * const userRoleAssignment = await prisma.userRoleAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRoleAssignmentUpdateManyArgs>(args: SelectSubset<T, UserRoleAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoleAssignments and returns the data updated in the database.
     * @param {UserRoleAssignmentUpdateManyAndReturnArgs} args - Arguments to update many UserRoleAssignments.
     * @example
     * // Update many UserRoleAssignments
     * const userRoleAssignment = await prisma.userRoleAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRoleAssignments and only return the `id`
     * const userRoleAssignmentWithIdOnly = await prisma.userRoleAssignment.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserRoleAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRoleAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRoleAssignment.
     * @param {UserRoleAssignmentUpsertArgs} args - Arguments to update or create a UserRoleAssignment.
     * @example
     * // Update or create a UserRoleAssignment
     * const userRoleAssignment = await prisma.userRoleAssignment.upsert({
     *   create: {
     *     // ... data to create a UserRoleAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRoleAssignment we want to update
     *   }
     * })
     */
    upsert<T extends UserRoleAssignmentUpsertArgs>(args: SelectSubset<T, UserRoleAssignmentUpsertArgs<ExtArgs>>): Prisma__UserRoleAssignmentClient<$Result.GetResult<Prisma.$UserRoleAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRoleAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAssignmentCountArgs} args - Arguments to filter UserRoleAssignments to count.
     * @example
     * // Count the number of UserRoleAssignments
     * const count = await prisma.userRoleAssignment.count({
     *   where: {
     *     // ... the filter for the UserRoleAssignments we want to count
     *   }
     * })
    **/
    count<T extends UserRoleAssignmentCountArgs>(
      args?: Subset<T, UserRoleAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoleAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRoleAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserRoleAssignmentAggregateArgs>(args: Subset<T, UserRoleAssignmentAggregateArgs>): Prisma.PrismaPromise<GetUserRoleAssignmentAggregateType<T>>

    /**
     * Group by UserRoleAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAssignmentGroupByArgs} args - Group by arguments.
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
      T extends UserRoleAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoleAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: UserRoleAssignmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserRoleAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoleAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRoleAssignment model
   */
  readonly fields: UserRoleAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRoleAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRoleAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserRoleAssignment model
   */
  interface UserRoleAssignmentFieldRefs {
    readonly id: FieldRef<"UserRoleAssignment", 'BigInt'>
    readonly user_id: FieldRef<"UserRoleAssignment", 'BigInt'>
    readonly role_id: FieldRef<"UserRoleAssignment", 'BigInt'>
    readonly group_id: FieldRef<"UserRoleAssignment", 'BigInt'>
    readonly created_at: FieldRef<"UserRoleAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserRoleAssignment findUnique
   */
  export type UserRoleAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which UserRoleAssignment to fetch.
     */
    where: UserRoleAssignmentWhereUniqueInput
  }

  /**
   * UserRoleAssignment findUniqueOrThrow
   */
  export type UserRoleAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which UserRoleAssignment to fetch.
     */
    where: UserRoleAssignmentWhereUniqueInput
  }

  /**
   * UserRoleAssignment findFirst
   */
  export type UserRoleAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which UserRoleAssignment to fetch.
     */
    where?: UserRoleAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoleAssignments to fetch.
     */
    orderBy?: UserRoleAssignmentOrderByWithRelationInput | UserRoleAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoleAssignments.
     */
    cursor?: UserRoleAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoleAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoleAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoleAssignments.
     */
    distinct?: UserRoleAssignmentScalarFieldEnum | UserRoleAssignmentScalarFieldEnum[]
  }

  /**
   * UserRoleAssignment findFirstOrThrow
   */
  export type UserRoleAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which UserRoleAssignment to fetch.
     */
    where?: UserRoleAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoleAssignments to fetch.
     */
    orderBy?: UserRoleAssignmentOrderByWithRelationInput | UserRoleAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoleAssignments.
     */
    cursor?: UserRoleAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoleAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoleAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoleAssignments.
     */
    distinct?: UserRoleAssignmentScalarFieldEnum | UserRoleAssignmentScalarFieldEnum[]
  }

  /**
   * UserRoleAssignment findMany
   */
  export type UserRoleAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which UserRoleAssignments to fetch.
     */
    where?: UserRoleAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoleAssignments to fetch.
     */
    orderBy?: UserRoleAssignmentOrderByWithRelationInput | UserRoleAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoleAssignments.
     */
    cursor?: UserRoleAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoleAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoleAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoleAssignments.
     */
    distinct?: UserRoleAssignmentScalarFieldEnum | UserRoleAssignmentScalarFieldEnum[]
  }

  /**
   * UserRoleAssignment create
   */
  export type UserRoleAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRoleAssignment.
     */
    data: XOR<UserRoleAssignmentCreateInput, UserRoleAssignmentUncheckedCreateInput>
  }

  /**
   * UserRoleAssignment createMany
   */
  export type UserRoleAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoleAssignments.
     */
    data: UserRoleAssignmentCreateManyInput | UserRoleAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRoleAssignment createManyAndReturn
   */
  export type UserRoleAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many UserRoleAssignments.
     */
    data: UserRoleAssignmentCreateManyInput | UserRoleAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRoleAssignment update
   */
  export type UserRoleAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRoleAssignment.
     */
    data: XOR<UserRoleAssignmentUpdateInput, UserRoleAssignmentUncheckedUpdateInput>
    /**
     * Choose, which UserRoleAssignment to update.
     */
    where: UserRoleAssignmentWhereUniqueInput
  }

  /**
   * UserRoleAssignment updateMany
   */
  export type UserRoleAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoleAssignments.
     */
    data: XOR<UserRoleAssignmentUpdateManyMutationInput, UserRoleAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which UserRoleAssignments to update
     */
    where?: UserRoleAssignmentWhereInput
    /**
     * Limit how many UserRoleAssignments to update.
     */
    limit?: number
  }

  /**
   * UserRoleAssignment updateManyAndReturn
   */
  export type UserRoleAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update UserRoleAssignments.
     */
    data: XOR<UserRoleAssignmentUpdateManyMutationInput, UserRoleAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which UserRoleAssignments to update
     */
    where?: UserRoleAssignmentWhereInput
    /**
     * Limit how many UserRoleAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRoleAssignment upsert
   */
  export type UserRoleAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRoleAssignment to update in case it exists.
     */
    where: UserRoleAssignmentWhereUniqueInput
    /**
     * In case the UserRoleAssignment found by the `where` argument doesn't exist, create a new UserRoleAssignment with this data.
     */
    create: XOR<UserRoleAssignmentCreateInput, UserRoleAssignmentUncheckedCreateInput>
    /**
     * In case the UserRoleAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoleAssignmentUpdateInput, UserRoleAssignmentUncheckedUpdateInput>
  }

  /**
   * UserRoleAssignment delete
   */
  export type UserRoleAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
    /**
     * Filter which UserRoleAssignment to delete.
     */
    where: UserRoleAssignmentWhereUniqueInput
  }

  /**
   * UserRoleAssignment deleteMany
   */
  export type UserRoleAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoleAssignments to delete
     */
    where?: UserRoleAssignmentWhereInput
    /**
     * Limit how many UserRoleAssignments to delete.
     */
    limit?: number
  }

  /**
   * UserRoleAssignment without action
   */
  export type UserRoleAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRoleAssignment
     */
    select?: UserRoleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRoleAssignment
     */
    omit?: UserRoleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model IamOutbox
   */

  export type AggregateIamOutbox = {
    _count: IamOutboxCountAggregateOutputType | null
    _avg: IamOutboxAvgAggregateOutputType | null
    _sum: IamOutboxSumAggregateOutputType | null
    _min: IamOutboxMinAggregateOutputType | null
    _max: IamOutboxMaxAggregateOutputType | null
  }

  export type IamOutboxAvgAggregateOutputType = {
    id: number | null
  }

  export type IamOutboxSumAggregateOutputType = {
    id: bigint | null
  }

  export type IamOutboxMinAggregateOutputType = {
    id: bigint | null
    event_type: string | null
    published: boolean | null
    created_at: Date | null
  }

  export type IamOutboxMaxAggregateOutputType = {
    id: bigint | null
    event_type: string | null
    published: boolean | null
    created_at: Date | null
  }

  export type IamOutboxCountAggregateOutputType = {
    id: number
    event_type: number
    payload: number
    published: number
    created_at: number
    _all: number
  }


  export type IamOutboxAvgAggregateInputType = {
    id?: true
  }

  export type IamOutboxSumAggregateInputType = {
    id?: true
  }

  export type IamOutboxMinAggregateInputType = {
    id?: true
    event_type?: true
    published?: true
    created_at?: true
  }

  export type IamOutboxMaxAggregateInputType = {
    id?: true
    event_type?: true
    published?: true
    created_at?: true
  }

  export type IamOutboxCountAggregateInputType = {
    id?: true
    event_type?: true
    payload?: true
    published?: true
    created_at?: true
    _all?: true
  }

  export type IamOutboxAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IamOutbox to aggregate.
     */
    where?: IamOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IamOutboxes to fetch.
     */
    orderBy?: IamOutboxOrderByWithRelationInput | IamOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IamOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IamOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IamOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IamOutboxes
    **/
    _count?: true | IamOutboxCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IamOutboxAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IamOutboxSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IamOutboxMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IamOutboxMaxAggregateInputType
  }

  export type GetIamOutboxAggregateType<T extends IamOutboxAggregateArgs> = {
        [P in keyof T & keyof AggregateIamOutbox]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIamOutbox[P]>
      : GetScalarType<T[P], AggregateIamOutbox[P]>
  }




  export type IamOutboxGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IamOutboxWhereInput
    orderBy?: IamOutboxOrderByWithAggregationInput | IamOutboxOrderByWithAggregationInput[]
    by: IamOutboxScalarFieldEnum[] | IamOutboxScalarFieldEnum
    having?: IamOutboxScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IamOutboxCountAggregateInputType | true
    _avg?: IamOutboxAvgAggregateInputType
    _sum?: IamOutboxSumAggregateInputType
    _min?: IamOutboxMinAggregateInputType
    _max?: IamOutboxMaxAggregateInputType
  }

  export type IamOutboxGroupByOutputType = {
    id: bigint
    event_type: string
    payload: JsonValue
    published: boolean
    created_at: Date
    _count: IamOutboxCountAggregateOutputType | null
    _avg: IamOutboxAvgAggregateOutputType | null
    _sum: IamOutboxSumAggregateOutputType | null
    _min: IamOutboxMinAggregateOutputType | null
    _max: IamOutboxMaxAggregateOutputType | null
  }

  type GetIamOutboxGroupByPayload<T extends IamOutboxGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IamOutboxGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IamOutboxGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IamOutboxGroupByOutputType[P]>
            : GetScalarType<T[P], IamOutboxGroupByOutputType[P]>
        }
      >
    >


  export type IamOutboxSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_type?: boolean
    payload?: boolean
    published?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["iamOutbox"]>

  export type IamOutboxSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_type?: boolean
    payload?: boolean
    published?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["iamOutbox"]>

  export type IamOutboxSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_type?: boolean
    payload?: boolean
    published?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["iamOutbox"]>

  export type IamOutboxSelectScalar = {
    id?: boolean
    event_type?: boolean
    payload?: boolean
    published?: boolean
    created_at?: boolean
  }

  export type IamOutboxOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "event_type" | "payload" | "published" | "created_at", ExtArgs["result"]["iamOutbox"]>

  export type $IamOutboxPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IamOutbox"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      event_type: string
      payload: Prisma.JsonValue
      published: boolean
      created_at: Date
    }, ExtArgs["result"]["iamOutbox"]>
    composites: {}
  }

  type IamOutboxGetPayload<S extends boolean | null | undefined | IamOutboxDefaultArgs> = $Result.GetResult<Prisma.$IamOutboxPayload, S>

  type IamOutboxCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IamOutboxFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IamOutboxCountAggregateInputType | true
    }

  export interface IamOutboxDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IamOutbox'], meta: { name: 'IamOutbox' } }
    /**
     * Find zero or one IamOutbox that matches the filter.
     * @param {IamOutboxFindUniqueArgs} args - Arguments to find a IamOutbox
     * @example
     * // Get one IamOutbox
     * const iamOutbox = await prisma.iamOutbox.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IamOutboxFindUniqueArgs>(args: SelectSubset<T, IamOutboxFindUniqueArgs<ExtArgs>>): Prisma__IamOutboxClient<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IamOutbox that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IamOutboxFindUniqueOrThrowArgs} args - Arguments to find a IamOutbox
     * @example
     * // Get one IamOutbox
     * const iamOutbox = await prisma.iamOutbox.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IamOutboxFindUniqueOrThrowArgs>(args: SelectSubset<T, IamOutboxFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IamOutboxClient<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IamOutbox that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IamOutboxFindFirstArgs} args - Arguments to find a IamOutbox
     * @example
     * // Get one IamOutbox
     * const iamOutbox = await prisma.iamOutbox.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IamOutboxFindFirstArgs>(args?: SelectSubset<T, IamOutboxFindFirstArgs<ExtArgs>>): Prisma__IamOutboxClient<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IamOutbox that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IamOutboxFindFirstOrThrowArgs} args - Arguments to find a IamOutbox
     * @example
     * // Get one IamOutbox
     * const iamOutbox = await prisma.iamOutbox.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IamOutboxFindFirstOrThrowArgs>(args?: SelectSubset<T, IamOutboxFindFirstOrThrowArgs<ExtArgs>>): Prisma__IamOutboxClient<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IamOutboxes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IamOutboxFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IamOutboxes
     * const iamOutboxes = await prisma.iamOutbox.findMany()
     * 
     * // Get first 10 IamOutboxes
     * const iamOutboxes = await prisma.iamOutbox.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const iamOutboxWithIdOnly = await prisma.iamOutbox.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IamOutboxFindManyArgs>(args?: SelectSubset<T, IamOutboxFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IamOutbox.
     * @param {IamOutboxCreateArgs} args - Arguments to create a IamOutbox.
     * @example
     * // Create one IamOutbox
     * const IamOutbox = await prisma.iamOutbox.create({
     *   data: {
     *     // ... data to create a IamOutbox
     *   }
     * })
     * 
     */
    create<T extends IamOutboxCreateArgs>(args: SelectSubset<T, IamOutboxCreateArgs<ExtArgs>>): Prisma__IamOutboxClient<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IamOutboxes.
     * @param {IamOutboxCreateManyArgs} args - Arguments to create many IamOutboxes.
     * @example
     * // Create many IamOutboxes
     * const iamOutbox = await prisma.iamOutbox.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IamOutboxCreateManyArgs>(args?: SelectSubset<T, IamOutboxCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IamOutboxes and returns the data saved in the database.
     * @param {IamOutboxCreateManyAndReturnArgs} args - Arguments to create many IamOutboxes.
     * @example
     * // Create many IamOutboxes
     * const iamOutbox = await prisma.iamOutbox.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IamOutboxes and only return the `id`
     * const iamOutboxWithIdOnly = await prisma.iamOutbox.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IamOutboxCreateManyAndReturnArgs>(args?: SelectSubset<T, IamOutboxCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IamOutbox.
     * @param {IamOutboxDeleteArgs} args - Arguments to delete one IamOutbox.
     * @example
     * // Delete one IamOutbox
     * const IamOutbox = await prisma.iamOutbox.delete({
     *   where: {
     *     // ... filter to delete one IamOutbox
     *   }
     * })
     * 
     */
    delete<T extends IamOutboxDeleteArgs>(args: SelectSubset<T, IamOutboxDeleteArgs<ExtArgs>>): Prisma__IamOutboxClient<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IamOutbox.
     * @param {IamOutboxUpdateArgs} args - Arguments to update one IamOutbox.
     * @example
     * // Update one IamOutbox
     * const iamOutbox = await prisma.iamOutbox.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IamOutboxUpdateArgs>(args: SelectSubset<T, IamOutboxUpdateArgs<ExtArgs>>): Prisma__IamOutboxClient<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IamOutboxes.
     * @param {IamOutboxDeleteManyArgs} args - Arguments to filter IamOutboxes to delete.
     * @example
     * // Delete a few IamOutboxes
     * const { count } = await prisma.iamOutbox.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IamOutboxDeleteManyArgs>(args?: SelectSubset<T, IamOutboxDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IamOutboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IamOutboxUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IamOutboxes
     * const iamOutbox = await prisma.iamOutbox.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IamOutboxUpdateManyArgs>(args: SelectSubset<T, IamOutboxUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IamOutboxes and returns the data updated in the database.
     * @param {IamOutboxUpdateManyAndReturnArgs} args - Arguments to update many IamOutboxes.
     * @example
     * // Update many IamOutboxes
     * const iamOutbox = await prisma.iamOutbox.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IamOutboxes and only return the `id`
     * const iamOutboxWithIdOnly = await prisma.iamOutbox.updateManyAndReturn({
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
    updateManyAndReturn<T extends IamOutboxUpdateManyAndReturnArgs>(args: SelectSubset<T, IamOutboxUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IamOutbox.
     * @param {IamOutboxUpsertArgs} args - Arguments to update or create a IamOutbox.
     * @example
     * // Update or create a IamOutbox
     * const iamOutbox = await prisma.iamOutbox.upsert({
     *   create: {
     *     // ... data to create a IamOutbox
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IamOutbox we want to update
     *   }
     * })
     */
    upsert<T extends IamOutboxUpsertArgs>(args: SelectSubset<T, IamOutboxUpsertArgs<ExtArgs>>): Prisma__IamOutboxClient<$Result.GetResult<Prisma.$IamOutboxPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IamOutboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IamOutboxCountArgs} args - Arguments to filter IamOutboxes to count.
     * @example
     * // Count the number of IamOutboxes
     * const count = await prisma.iamOutbox.count({
     *   where: {
     *     // ... the filter for the IamOutboxes we want to count
     *   }
     * })
    **/
    count<T extends IamOutboxCountArgs>(
      args?: Subset<T, IamOutboxCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IamOutboxCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IamOutbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IamOutboxAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IamOutboxAggregateArgs>(args: Subset<T, IamOutboxAggregateArgs>): Prisma.PrismaPromise<GetIamOutboxAggregateType<T>>

    /**
     * Group by IamOutbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IamOutboxGroupByArgs} args - Group by arguments.
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
      T extends IamOutboxGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IamOutboxGroupByArgs['orderBy'] }
        : { orderBy?: IamOutboxGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IamOutboxGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIamOutboxGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IamOutbox model
   */
  readonly fields: IamOutboxFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IamOutbox.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IamOutboxClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the IamOutbox model
   */
  interface IamOutboxFieldRefs {
    readonly id: FieldRef<"IamOutbox", 'BigInt'>
    readonly event_type: FieldRef<"IamOutbox", 'String'>
    readonly payload: FieldRef<"IamOutbox", 'Json'>
    readonly published: FieldRef<"IamOutbox", 'Boolean'>
    readonly created_at: FieldRef<"IamOutbox", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IamOutbox findUnique
   */
  export type IamOutboxFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * Filter, which IamOutbox to fetch.
     */
    where: IamOutboxWhereUniqueInput
  }

  /**
   * IamOutbox findUniqueOrThrow
   */
  export type IamOutboxFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * Filter, which IamOutbox to fetch.
     */
    where: IamOutboxWhereUniqueInput
  }

  /**
   * IamOutbox findFirst
   */
  export type IamOutboxFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * Filter, which IamOutbox to fetch.
     */
    where?: IamOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IamOutboxes to fetch.
     */
    orderBy?: IamOutboxOrderByWithRelationInput | IamOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IamOutboxes.
     */
    cursor?: IamOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IamOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IamOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IamOutboxes.
     */
    distinct?: IamOutboxScalarFieldEnum | IamOutboxScalarFieldEnum[]
  }

  /**
   * IamOutbox findFirstOrThrow
   */
  export type IamOutboxFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * Filter, which IamOutbox to fetch.
     */
    where?: IamOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IamOutboxes to fetch.
     */
    orderBy?: IamOutboxOrderByWithRelationInput | IamOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IamOutboxes.
     */
    cursor?: IamOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IamOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IamOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IamOutboxes.
     */
    distinct?: IamOutboxScalarFieldEnum | IamOutboxScalarFieldEnum[]
  }

  /**
   * IamOutbox findMany
   */
  export type IamOutboxFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * Filter, which IamOutboxes to fetch.
     */
    where?: IamOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IamOutboxes to fetch.
     */
    orderBy?: IamOutboxOrderByWithRelationInput | IamOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IamOutboxes.
     */
    cursor?: IamOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IamOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IamOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IamOutboxes.
     */
    distinct?: IamOutboxScalarFieldEnum | IamOutboxScalarFieldEnum[]
  }

  /**
   * IamOutbox create
   */
  export type IamOutboxCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * The data needed to create a IamOutbox.
     */
    data: XOR<IamOutboxCreateInput, IamOutboxUncheckedCreateInput>
  }

  /**
   * IamOutbox createMany
   */
  export type IamOutboxCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IamOutboxes.
     */
    data: IamOutboxCreateManyInput | IamOutboxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IamOutbox createManyAndReturn
   */
  export type IamOutboxCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * The data used to create many IamOutboxes.
     */
    data: IamOutboxCreateManyInput | IamOutboxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IamOutbox update
   */
  export type IamOutboxUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * The data needed to update a IamOutbox.
     */
    data: XOR<IamOutboxUpdateInput, IamOutboxUncheckedUpdateInput>
    /**
     * Choose, which IamOutbox to update.
     */
    where: IamOutboxWhereUniqueInput
  }

  /**
   * IamOutbox updateMany
   */
  export type IamOutboxUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IamOutboxes.
     */
    data: XOR<IamOutboxUpdateManyMutationInput, IamOutboxUncheckedUpdateManyInput>
    /**
     * Filter which IamOutboxes to update
     */
    where?: IamOutboxWhereInput
    /**
     * Limit how many IamOutboxes to update.
     */
    limit?: number
  }

  /**
   * IamOutbox updateManyAndReturn
   */
  export type IamOutboxUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * The data used to update IamOutboxes.
     */
    data: XOR<IamOutboxUpdateManyMutationInput, IamOutboxUncheckedUpdateManyInput>
    /**
     * Filter which IamOutboxes to update
     */
    where?: IamOutboxWhereInput
    /**
     * Limit how many IamOutboxes to update.
     */
    limit?: number
  }

  /**
   * IamOutbox upsert
   */
  export type IamOutboxUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * The filter to search for the IamOutbox to update in case it exists.
     */
    where: IamOutboxWhereUniqueInput
    /**
     * In case the IamOutbox found by the `where` argument doesn't exist, create a new IamOutbox with this data.
     */
    create: XOR<IamOutboxCreateInput, IamOutboxUncheckedCreateInput>
    /**
     * In case the IamOutbox was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IamOutboxUpdateInput, IamOutboxUncheckedUpdateInput>
  }

  /**
   * IamOutbox delete
   */
  export type IamOutboxDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
    /**
     * Filter which IamOutbox to delete.
     */
    where: IamOutboxWhereUniqueInput
  }

  /**
   * IamOutbox deleteMany
   */
  export type IamOutboxDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IamOutboxes to delete
     */
    where?: IamOutboxWhereInput
    /**
     * Limit how many IamOutboxes to delete.
     */
    limit?: number
  }

  /**
   * IamOutbox without action
   */
  export type IamOutboxDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IamOutbox
     */
    select?: IamOutboxSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IamOutbox
     */
    omit?: IamOutboxOmit<ExtArgs> | null
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


  export const ContextScalarFieldEnum: {
    id: 'id',
    type: 'type',
    ref_id: 'ref_id',
    name: 'name',
    code: 'code',
    status: 'status',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ContextScalarFieldEnum = (typeof ContextScalarFieldEnum)[keyof typeof ContextScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    type: 'type',
    code: 'code',
    name: 'name',
    description: 'description',
    status: 'status',
    owner_id: 'owner_id',
    context_id: 'context_id',
    metadata: 'metadata',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const UserGroupScalarFieldEnum: {
    user_id: 'user_id',
    group_id: 'group_id',
    joined_at: 'joined_at'
  };

  export type UserGroupScalarFieldEnum = (typeof UserGroupScalarFieldEnum)[keyof typeof UserGroupScalarFieldEnum]


  export const PermissionScalarFieldEnum: {
    id: 'id',
    code: 'code',
    scope: 'scope',
    name: 'name',
    status: 'status',
    parent_id: 'parent_id',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    status: 'status',
    parent_id: 'parent_id',
    created_user_id: 'created_user_id',
    updated_user_id: 'updated_user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const RoleHasPermissionScalarFieldEnum: {
    role_id: 'role_id',
    permission_id: 'permission_id'
  };

  export type RoleHasPermissionScalarFieldEnum = (typeof RoleHasPermissionScalarFieldEnum)[keyof typeof RoleHasPermissionScalarFieldEnum]


  export const RoleContextScalarFieldEnum: {
    role_id: 'role_id',
    context_id: 'context_id'
  };

  export type RoleContextScalarFieldEnum = (typeof RoleContextScalarFieldEnum)[keyof typeof RoleContextScalarFieldEnum]


  export const UserRoleAssignmentScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    role_id: 'role_id',
    group_id: 'group_id',
    created_at: 'created_at'
  };

  export type UserRoleAssignmentScalarFieldEnum = (typeof UserRoleAssignmentScalarFieldEnum)[keyof typeof UserRoleAssignmentScalarFieldEnum]


  export const IamOutboxScalarFieldEnum: {
    id: 'id',
    event_type: 'event_type',
    payload: 'payload',
    published: 'published',
    created_at: 'created_at'
  };

  export type IamOutboxScalarFieldEnum = (typeof IamOutboxScalarFieldEnum)[keyof typeof IamOutboxScalarFieldEnum]


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


  export type ContextWhereInput = {
    AND?: ContextWhereInput | ContextWhereInput[]
    OR?: ContextWhereInput[]
    NOT?: ContextWhereInput | ContextWhereInput[]
    id?: BigIntFilter<"Context"> | bigint | number
    type?: StringFilter<"Context"> | string
    ref_id?: BigIntNullableFilter<"Context"> | bigint | number | null
    name?: StringFilter<"Context"> | string
    code?: StringFilter<"Context"> | string
    status?: StringFilter<"Context"> | string
    created_user_id?: BigIntNullableFilter<"Context"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Context"> | bigint | number | null
    created_at?: DateTimeFilter<"Context"> | Date | string
    updated_at?: DateTimeFilter<"Context"> | Date | string
    groups?: GroupListRelationFilter
    role_contexts?: RoleContextListRelationFilter
  }

  export type ContextOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    ref_id?: SortOrderInput | SortOrder
    name?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    groups?: GroupOrderByRelationAggregateInput
    role_contexts?: RoleContextOrderByRelationAggregateInput
  }

  export type ContextWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    code?: string
    type_ref_id?: ContextTypeRef_idCompoundUniqueInput
    AND?: ContextWhereInput | ContextWhereInput[]
    OR?: ContextWhereInput[]
    NOT?: ContextWhereInput | ContextWhereInput[]
    type?: StringFilter<"Context"> | string
    ref_id?: BigIntNullableFilter<"Context"> | bigint | number | null
    name?: StringFilter<"Context"> | string
    status?: StringFilter<"Context"> | string
    created_user_id?: BigIntNullableFilter<"Context"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Context"> | bigint | number | null
    created_at?: DateTimeFilter<"Context"> | Date | string
    updated_at?: DateTimeFilter<"Context"> | Date | string
    groups?: GroupListRelationFilter
    role_contexts?: RoleContextListRelationFilter
  }, "id" | "code" | "type_ref_id">

  export type ContextOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    ref_id?: SortOrderInput | SortOrder
    name?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ContextCountOrderByAggregateInput
    _avg?: ContextAvgOrderByAggregateInput
    _max?: ContextMaxOrderByAggregateInput
    _min?: ContextMinOrderByAggregateInput
    _sum?: ContextSumOrderByAggregateInput
  }

  export type ContextScalarWhereWithAggregatesInput = {
    AND?: ContextScalarWhereWithAggregatesInput | ContextScalarWhereWithAggregatesInput[]
    OR?: ContextScalarWhereWithAggregatesInput[]
    NOT?: ContextScalarWhereWithAggregatesInput | ContextScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Context"> | bigint | number
    type?: StringWithAggregatesFilter<"Context"> | string
    ref_id?: BigIntNullableWithAggregatesFilter<"Context"> | bigint | number | null
    name?: StringWithAggregatesFilter<"Context"> | string
    code?: StringWithAggregatesFilter<"Context"> | string
    status?: StringWithAggregatesFilter<"Context"> | string
    created_user_id?: BigIntNullableWithAggregatesFilter<"Context"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"Context"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Context"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Context"> | Date | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: BigIntFilter<"Group"> | bigint | number
    type?: StringFilter<"Group"> | string
    code?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    description?: StringNullableFilter<"Group"> | string | null
    status?: StringFilter<"Group"> | string
    owner_id?: BigIntNullableFilter<"Group"> | bigint | number | null
    context_id?: BigIntFilter<"Group"> | bigint | number
    metadata?: JsonNullableFilter<"Group">
    created_user_id?: BigIntNullableFilter<"Group"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Group"> | bigint | number | null
    created_at?: DateTimeFilter<"Group"> | Date | string
    updated_at?: DateTimeFilter<"Group"> | Date | string
    context?: XOR<ContextScalarRelationFilter, ContextWhereInput>
    user_groups?: UserGroupListRelationFilter
    user_role_assignments?: UserRoleAssignmentListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    owner_id?: SortOrderInput | SortOrder
    context_id?: SortOrder
    metadata?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    context?: ContextOrderByWithRelationInput
    user_groups?: UserGroupOrderByRelationAggregateInput
    user_role_assignments?: UserRoleAssignmentOrderByRelationAggregateInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    code?: string
    type_code?: GroupTypeCodeCompoundUniqueInput
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    type?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    description?: StringNullableFilter<"Group"> | string | null
    status?: StringFilter<"Group"> | string
    owner_id?: BigIntNullableFilter<"Group"> | bigint | number | null
    context_id?: BigIntFilter<"Group"> | bigint | number
    metadata?: JsonNullableFilter<"Group">
    created_user_id?: BigIntNullableFilter<"Group"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Group"> | bigint | number | null
    created_at?: DateTimeFilter<"Group"> | Date | string
    updated_at?: DateTimeFilter<"Group"> | Date | string
    context?: XOR<ContextScalarRelationFilter, ContextWhereInput>
    user_groups?: UserGroupListRelationFilter
    user_role_assignments?: UserRoleAssignmentListRelationFilter
  }, "id" | "code" | "type_code">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    owner_id?: SortOrderInput | SortOrder
    context_id?: SortOrder
    metadata?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _avg?: GroupAvgOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
    _sum?: GroupSumOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Group"> | bigint | number
    type?: StringWithAggregatesFilter<"Group"> | string
    code?: StringWithAggregatesFilter<"Group"> | string
    name?: StringWithAggregatesFilter<"Group"> | string
    description?: StringNullableWithAggregatesFilter<"Group"> | string | null
    status?: StringWithAggregatesFilter<"Group"> | string
    owner_id?: BigIntNullableWithAggregatesFilter<"Group"> | bigint | number | null
    context_id?: BigIntWithAggregatesFilter<"Group"> | bigint | number
    metadata?: JsonNullableWithAggregatesFilter<"Group">
    created_user_id?: BigIntNullableWithAggregatesFilter<"Group"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"Group"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Group"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Group"> | Date | string
  }

  export type UserGroupWhereInput = {
    AND?: UserGroupWhereInput | UserGroupWhereInput[]
    OR?: UserGroupWhereInput[]
    NOT?: UserGroupWhereInput | UserGroupWhereInput[]
    user_id?: BigIntFilter<"UserGroup"> | bigint | number
    group_id?: BigIntFilter<"UserGroup"> | bigint | number
    joined_at?: DateTimeFilter<"UserGroup"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }

  export type UserGroupOrderByWithRelationInput = {
    user_id?: SortOrder
    group_id?: SortOrder
    joined_at?: SortOrder
    group?: GroupOrderByWithRelationInput
  }

  export type UserGroupWhereUniqueInput = Prisma.AtLeast<{
    user_id_group_id?: UserGroupUser_idGroup_idCompoundUniqueInput
    AND?: UserGroupWhereInput | UserGroupWhereInput[]
    OR?: UserGroupWhereInput[]
    NOT?: UserGroupWhereInput | UserGroupWhereInput[]
    user_id?: BigIntFilter<"UserGroup"> | bigint | number
    group_id?: BigIntFilter<"UserGroup"> | bigint | number
    joined_at?: DateTimeFilter<"UserGroup"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }, "user_id_group_id">

  export type UserGroupOrderByWithAggregationInput = {
    user_id?: SortOrder
    group_id?: SortOrder
    joined_at?: SortOrder
    _count?: UserGroupCountOrderByAggregateInput
    _avg?: UserGroupAvgOrderByAggregateInput
    _max?: UserGroupMaxOrderByAggregateInput
    _min?: UserGroupMinOrderByAggregateInput
    _sum?: UserGroupSumOrderByAggregateInput
  }

  export type UserGroupScalarWhereWithAggregatesInput = {
    AND?: UserGroupScalarWhereWithAggregatesInput | UserGroupScalarWhereWithAggregatesInput[]
    OR?: UserGroupScalarWhereWithAggregatesInput[]
    NOT?: UserGroupScalarWhereWithAggregatesInput | UserGroupScalarWhereWithAggregatesInput[]
    user_id?: BigIntWithAggregatesFilter<"UserGroup"> | bigint | number
    group_id?: BigIntWithAggregatesFilter<"UserGroup"> | bigint | number
    joined_at?: DateTimeWithAggregatesFilter<"UserGroup"> | Date | string
  }

  export type PermissionWhereInput = {
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    id?: BigIntFilter<"Permission"> | bigint | number
    code?: StringFilter<"Permission"> | string
    scope?: StringFilter<"Permission"> | string
    name?: StringNullableFilter<"Permission"> | string | null
    status?: StringFilter<"Permission"> | string
    parent_id?: BigIntNullableFilter<"Permission"> | bigint | number | null
    created_user_id?: BigIntNullableFilter<"Permission"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Permission"> | bigint | number | null
    created_at?: DateTimeFilter<"Permission"> | Date | string
    updated_at?: DateTimeFilter<"Permission"> | Date | string
    parent?: XOR<PermissionNullableScalarRelationFilter, PermissionWhereInput> | null
    children?: PermissionListRelationFilter
    role_links?: RoleHasPermissionListRelationFilter
  }

  export type PermissionOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    scope?: SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    parent?: PermissionOrderByWithRelationInput
    children?: PermissionOrderByRelationAggregateInput
    role_links?: RoleHasPermissionOrderByRelationAggregateInput
  }

  export type PermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    code?: string
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    scope?: StringFilter<"Permission"> | string
    name?: StringNullableFilter<"Permission"> | string | null
    status?: StringFilter<"Permission"> | string
    parent_id?: BigIntNullableFilter<"Permission"> | bigint | number | null
    created_user_id?: BigIntNullableFilter<"Permission"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Permission"> | bigint | number | null
    created_at?: DateTimeFilter<"Permission"> | Date | string
    updated_at?: DateTimeFilter<"Permission"> | Date | string
    parent?: XOR<PermissionNullableScalarRelationFilter, PermissionWhereInput> | null
    children?: PermissionListRelationFilter
    role_links?: RoleHasPermissionListRelationFilter
  }, "id" | "code">

  export type PermissionOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    scope?: SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PermissionCountOrderByAggregateInput
    _avg?: PermissionAvgOrderByAggregateInput
    _max?: PermissionMaxOrderByAggregateInput
    _min?: PermissionMinOrderByAggregateInput
    _sum?: PermissionSumOrderByAggregateInput
  }

  export type PermissionScalarWhereWithAggregatesInput = {
    AND?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    OR?: PermissionScalarWhereWithAggregatesInput[]
    NOT?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Permission"> | bigint | number
    code?: StringWithAggregatesFilter<"Permission"> | string
    scope?: StringWithAggregatesFilter<"Permission"> | string
    name?: StringNullableWithAggregatesFilter<"Permission"> | string | null
    status?: StringWithAggregatesFilter<"Permission"> | string
    parent_id?: BigIntNullableWithAggregatesFilter<"Permission"> | bigint | number | null
    created_user_id?: BigIntNullableWithAggregatesFilter<"Permission"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"Permission"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: BigIntFilter<"Role"> | bigint | number
    code?: StringFilter<"Role"> | string
    name?: StringNullableFilter<"Role"> | string | null
    status?: StringFilter<"Role"> | string
    parent_id?: BigIntNullableFilter<"Role"> | bigint | number | null
    created_user_id?: BigIntNullableFilter<"Role"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Role"> | bigint | number | null
    created_at?: DateTimeFilter<"Role"> | Date | string
    updated_at?: DateTimeFilter<"Role"> | Date | string
    parent?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    children?: RoleListRelationFilter
    permissions?: RoleHasPermissionListRelationFilter
    role_contexts?: RoleContextListRelationFilter
    user_role_assignments?: UserRoleAssignmentListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    parent?: RoleOrderByWithRelationInput
    children?: RoleOrderByRelationAggregateInput
    permissions?: RoleHasPermissionOrderByRelationAggregateInput
    role_contexts?: RoleContextOrderByRelationAggregateInput
    user_role_assignments?: UserRoleAssignmentOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    code?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    name?: StringNullableFilter<"Role"> | string | null
    status?: StringFilter<"Role"> | string
    parent_id?: BigIntNullableFilter<"Role"> | bigint | number | null
    created_user_id?: BigIntNullableFilter<"Role"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Role"> | bigint | number | null
    created_at?: DateTimeFilter<"Role"> | Date | string
    updated_at?: DateTimeFilter<"Role"> | Date | string
    parent?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    children?: RoleListRelationFilter
    permissions?: RoleHasPermissionListRelationFilter
    role_contexts?: RoleContextListRelationFilter
    user_role_assignments?: UserRoleAssignmentListRelationFilter
  }, "id" | "code">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrderInput | SortOrder
    status?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_user_id?: SortOrderInput | SortOrder
    updated_user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _avg?: RoleAvgOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
    _sum?: RoleSumOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Role"> | bigint | number
    code?: StringWithAggregatesFilter<"Role"> | string
    name?: StringNullableWithAggregatesFilter<"Role"> | string | null
    status?: StringWithAggregatesFilter<"Role"> | string
    parent_id?: BigIntNullableWithAggregatesFilter<"Role"> | bigint | number | null
    created_user_id?: BigIntNullableWithAggregatesFilter<"Role"> | bigint | number | null
    updated_user_id?: BigIntNullableWithAggregatesFilter<"Role"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type RoleHasPermissionWhereInput = {
    AND?: RoleHasPermissionWhereInput | RoleHasPermissionWhereInput[]
    OR?: RoleHasPermissionWhereInput[]
    NOT?: RoleHasPermissionWhereInput | RoleHasPermissionWhereInput[]
    role_id?: BigIntFilter<"RoleHasPermission"> | bigint | number
    permission_id?: BigIntFilter<"RoleHasPermission"> | bigint | number
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    permission?: XOR<PermissionScalarRelationFilter, PermissionWhereInput>
  }

  export type RoleHasPermissionOrderByWithRelationInput = {
    role_id?: SortOrder
    permission_id?: SortOrder
    role?: RoleOrderByWithRelationInput
    permission?: PermissionOrderByWithRelationInput
  }

  export type RoleHasPermissionWhereUniqueInput = Prisma.AtLeast<{
    role_id_permission_id?: RoleHasPermissionRole_idPermission_idCompoundUniqueInput
    AND?: RoleHasPermissionWhereInput | RoleHasPermissionWhereInput[]
    OR?: RoleHasPermissionWhereInput[]
    NOT?: RoleHasPermissionWhereInput | RoleHasPermissionWhereInput[]
    role_id?: BigIntFilter<"RoleHasPermission"> | bigint | number
    permission_id?: BigIntFilter<"RoleHasPermission"> | bigint | number
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    permission?: XOR<PermissionScalarRelationFilter, PermissionWhereInput>
  }, "role_id_permission_id">

  export type RoleHasPermissionOrderByWithAggregationInput = {
    role_id?: SortOrder
    permission_id?: SortOrder
    _count?: RoleHasPermissionCountOrderByAggregateInput
    _avg?: RoleHasPermissionAvgOrderByAggregateInput
    _max?: RoleHasPermissionMaxOrderByAggregateInput
    _min?: RoleHasPermissionMinOrderByAggregateInput
    _sum?: RoleHasPermissionSumOrderByAggregateInput
  }

  export type RoleHasPermissionScalarWhereWithAggregatesInput = {
    AND?: RoleHasPermissionScalarWhereWithAggregatesInput | RoleHasPermissionScalarWhereWithAggregatesInput[]
    OR?: RoleHasPermissionScalarWhereWithAggregatesInput[]
    NOT?: RoleHasPermissionScalarWhereWithAggregatesInput | RoleHasPermissionScalarWhereWithAggregatesInput[]
    role_id?: BigIntWithAggregatesFilter<"RoleHasPermission"> | bigint | number
    permission_id?: BigIntWithAggregatesFilter<"RoleHasPermission"> | bigint | number
  }

  export type RoleContextWhereInput = {
    AND?: RoleContextWhereInput | RoleContextWhereInput[]
    OR?: RoleContextWhereInput[]
    NOT?: RoleContextWhereInput | RoleContextWhereInput[]
    role_id?: BigIntFilter<"RoleContext"> | bigint | number
    context_id?: BigIntFilter<"RoleContext"> | bigint | number
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    context?: XOR<ContextScalarRelationFilter, ContextWhereInput>
  }

  export type RoleContextOrderByWithRelationInput = {
    role_id?: SortOrder
    context_id?: SortOrder
    role?: RoleOrderByWithRelationInput
    context?: ContextOrderByWithRelationInput
  }

  export type RoleContextWhereUniqueInput = Prisma.AtLeast<{
    role_id_context_id?: RoleContextRole_idContext_idCompoundUniqueInput
    AND?: RoleContextWhereInput | RoleContextWhereInput[]
    OR?: RoleContextWhereInput[]
    NOT?: RoleContextWhereInput | RoleContextWhereInput[]
    role_id?: BigIntFilter<"RoleContext"> | bigint | number
    context_id?: BigIntFilter<"RoleContext"> | bigint | number
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    context?: XOR<ContextScalarRelationFilter, ContextWhereInput>
  }, "role_id_context_id">

  export type RoleContextOrderByWithAggregationInput = {
    role_id?: SortOrder
    context_id?: SortOrder
    _count?: RoleContextCountOrderByAggregateInput
    _avg?: RoleContextAvgOrderByAggregateInput
    _max?: RoleContextMaxOrderByAggregateInput
    _min?: RoleContextMinOrderByAggregateInput
    _sum?: RoleContextSumOrderByAggregateInput
  }

  export type RoleContextScalarWhereWithAggregatesInput = {
    AND?: RoleContextScalarWhereWithAggregatesInput | RoleContextScalarWhereWithAggregatesInput[]
    OR?: RoleContextScalarWhereWithAggregatesInput[]
    NOT?: RoleContextScalarWhereWithAggregatesInput | RoleContextScalarWhereWithAggregatesInput[]
    role_id?: BigIntWithAggregatesFilter<"RoleContext"> | bigint | number
    context_id?: BigIntWithAggregatesFilter<"RoleContext"> | bigint | number
  }

  export type UserRoleAssignmentWhereInput = {
    AND?: UserRoleAssignmentWhereInput | UserRoleAssignmentWhereInput[]
    OR?: UserRoleAssignmentWhereInput[]
    NOT?: UserRoleAssignmentWhereInput | UserRoleAssignmentWhereInput[]
    id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    user_id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    role_id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    group_id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    created_at?: DateTimeFilter<"UserRoleAssignment"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }

  export type UserRoleAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    group_id?: SortOrder
    created_at?: SortOrder
    role?: RoleOrderByWithRelationInput
    group?: GroupOrderByWithRelationInput
  }

  export type UserRoleAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    user_id_role_id_group_id?: UserRoleAssignmentUser_idRole_idGroup_idCompoundUniqueInput
    AND?: UserRoleAssignmentWhereInput | UserRoleAssignmentWhereInput[]
    OR?: UserRoleAssignmentWhereInput[]
    NOT?: UserRoleAssignmentWhereInput | UserRoleAssignmentWhereInput[]
    user_id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    role_id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    group_id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    created_at?: DateTimeFilter<"UserRoleAssignment"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }, "id" | "user_id_role_id_group_id">

  export type UserRoleAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    group_id?: SortOrder
    created_at?: SortOrder
    _count?: UserRoleAssignmentCountOrderByAggregateInput
    _avg?: UserRoleAssignmentAvgOrderByAggregateInput
    _max?: UserRoleAssignmentMaxOrderByAggregateInput
    _min?: UserRoleAssignmentMinOrderByAggregateInput
    _sum?: UserRoleAssignmentSumOrderByAggregateInput
  }

  export type UserRoleAssignmentScalarWhereWithAggregatesInput = {
    AND?: UserRoleAssignmentScalarWhereWithAggregatesInput | UserRoleAssignmentScalarWhereWithAggregatesInput[]
    OR?: UserRoleAssignmentScalarWhereWithAggregatesInput[]
    NOT?: UserRoleAssignmentScalarWhereWithAggregatesInput | UserRoleAssignmentScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"UserRoleAssignment"> | bigint | number
    user_id?: BigIntWithAggregatesFilter<"UserRoleAssignment"> | bigint | number
    role_id?: BigIntWithAggregatesFilter<"UserRoleAssignment"> | bigint | number
    group_id?: BigIntWithAggregatesFilter<"UserRoleAssignment"> | bigint | number
    created_at?: DateTimeWithAggregatesFilter<"UserRoleAssignment"> | Date | string
  }

  export type IamOutboxWhereInput = {
    AND?: IamOutboxWhereInput | IamOutboxWhereInput[]
    OR?: IamOutboxWhereInput[]
    NOT?: IamOutboxWhereInput | IamOutboxWhereInput[]
    id?: BigIntFilter<"IamOutbox"> | bigint | number
    event_type?: StringFilter<"IamOutbox"> | string
    payload?: JsonFilter<"IamOutbox">
    published?: BoolFilter<"IamOutbox"> | boolean
    created_at?: DateTimeFilter<"IamOutbox"> | Date | string
  }

  export type IamOutboxOrderByWithRelationInput = {
    id?: SortOrder
    event_type?: SortOrder
    payload?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
  }

  export type IamOutboxWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: IamOutboxWhereInput | IamOutboxWhereInput[]
    OR?: IamOutboxWhereInput[]
    NOT?: IamOutboxWhereInput | IamOutboxWhereInput[]
    event_type?: StringFilter<"IamOutbox"> | string
    payload?: JsonFilter<"IamOutbox">
    published?: BoolFilter<"IamOutbox"> | boolean
    created_at?: DateTimeFilter<"IamOutbox"> | Date | string
  }, "id">

  export type IamOutboxOrderByWithAggregationInput = {
    id?: SortOrder
    event_type?: SortOrder
    payload?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
    _count?: IamOutboxCountOrderByAggregateInput
    _avg?: IamOutboxAvgOrderByAggregateInput
    _max?: IamOutboxMaxOrderByAggregateInput
    _min?: IamOutboxMinOrderByAggregateInput
    _sum?: IamOutboxSumOrderByAggregateInput
  }

  export type IamOutboxScalarWhereWithAggregatesInput = {
    AND?: IamOutboxScalarWhereWithAggregatesInput | IamOutboxScalarWhereWithAggregatesInput[]
    OR?: IamOutboxScalarWhereWithAggregatesInput[]
    NOT?: IamOutboxScalarWhereWithAggregatesInput | IamOutboxScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"IamOutbox"> | bigint | number
    event_type?: StringWithAggregatesFilter<"IamOutbox"> | string
    payload?: JsonWithAggregatesFilter<"IamOutbox">
    published?: BoolWithAggregatesFilter<"IamOutbox"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"IamOutbox"> | Date | string
  }

  export type ContextCreateInput = {
    id?: bigint | number
    type: string
    ref_id?: bigint | number | null
    name: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    groups?: GroupCreateNestedManyWithoutContextInput
    role_contexts?: RoleContextCreateNestedManyWithoutContextInput
  }

  export type ContextUncheckedCreateInput = {
    id?: bigint | number
    type: string
    ref_id?: bigint | number | null
    name: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    groups?: GroupUncheckedCreateNestedManyWithoutContextInput
    role_contexts?: RoleContextUncheckedCreateNestedManyWithoutContextInput
  }

  export type ContextUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    ref_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: GroupUpdateManyWithoutContextNestedInput
    role_contexts?: RoleContextUpdateManyWithoutContextNestedInput
  }

  export type ContextUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    ref_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: GroupUncheckedUpdateManyWithoutContextNestedInput
    role_contexts?: RoleContextUncheckedUpdateManyWithoutContextNestedInput
  }

  export type ContextCreateManyInput = {
    id?: bigint | number
    type: string
    ref_id?: bigint | number | null
    name: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContextUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    ref_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContextUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    ref_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupCreateInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    context: ContextCreateNestedOneWithoutGroupsInput
    user_groups?: UserGroupCreateNestedManyWithoutGroupInput
    user_role_assignments?: UserRoleAssignmentCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    context_id: bigint | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    user_groups?: UserGroupUncheckedCreateNestedManyWithoutGroupInput
    user_role_assignments?: UserRoleAssignmentUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    context?: ContextUpdateOneRequiredWithoutGroupsNestedInput
    user_groups?: UserGroupUpdateManyWithoutGroupNestedInput
    user_role_assignments?: UserRoleAssignmentUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    context_id?: BigIntFieldUpdateOperationsInput | bigint | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_groups?: UserGroupUncheckedUpdateManyWithoutGroupNestedInput
    user_role_assignments?: UserRoleAssignmentUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    context_id: bigint | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    context_id?: BigIntFieldUpdateOperationsInput | bigint | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupCreateInput = {
    user_id: bigint | number
    joined_at?: Date | string
    group: GroupCreateNestedOneWithoutUser_groupsInput
  }

  export type UserGroupUncheckedCreateInput = {
    user_id: bigint | number
    group_id: bigint | number
    joined_at?: Date | string
  }

  export type UserGroupUpdateInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutUser_groupsNestedInput
  }

  export type UserGroupUncheckedUpdateInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    group_id?: BigIntFieldUpdateOperationsInput | bigint | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupCreateManyInput = {
    user_id: bigint | number
    group_id: bigint | number
    joined_at?: Date | string
  }

  export type UserGroupUpdateManyMutationInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUncheckedUpdateManyInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    group_id?: BigIntFieldUpdateOperationsInput | bigint | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: PermissionCreateNestedOneWithoutChildrenInput
    children?: PermissionCreateNestedManyWithoutParentInput
    role_links?: RoleHasPermissionCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUncheckedCreateInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: PermissionUncheckedCreateNestedManyWithoutParentInput
    role_links?: RoleHasPermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: PermissionUpdateOneWithoutChildrenNestedInput
    children?: PermissionUpdateManyWithoutParentNestedInput
    role_links?: RoleHasPermissionUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PermissionUncheckedUpdateManyWithoutParentNestedInput
    role_links?: RoleHasPermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionCreateManyInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PermissionUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleCreateInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: RoleCreateNestedOneWithoutChildrenInput
    children?: RoleCreateNestedManyWithoutParentInput
    permissions?: RoleHasPermissionCreateNestedManyWithoutRoleInput
    role_contexts?: RoleContextCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: RoleUncheckedCreateNestedManyWithoutParentInput
    permissions?: RoleHasPermissionUncheckedCreateNestedManyWithoutRoleInput
    role_contexts?: RoleContextUncheckedCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: RoleUpdateOneWithoutChildrenNestedInput
    children?: RoleUpdateManyWithoutParentNestedInput
    permissions?: RoleHasPermissionUpdateManyWithoutRoleNestedInput
    role_contexts?: RoleContextUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: RoleUncheckedUpdateManyWithoutParentNestedInput
    permissions?: RoleHasPermissionUncheckedUpdateManyWithoutRoleNestedInput
    role_contexts?: RoleContextUncheckedUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleHasPermissionCreateInput = {
    role: RoleCreateNestedOneWithoutPermissionsInput
    permission: PermissionCreateNestedOneWithoutRole_linksInput
  }

  export type RoleHasPermissionUncheckedCreateInput = {
    role_id: bigint | number
    permission_id: bigint | number
  }

  export type RoleHasPermissionUpdateInput = {
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput
    permission?: PermissionUpdateOneRequiredWithoutRole_linksNestedInput
  }

  export type RoleHasPermissionUncheckedUpdateInput = {
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    permission_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RoleHasPermissionCreateManyInput = {
    role_id: bigint | number
    permission_id: bigint | number
  }

  export type RoleHasPermissionUpdateManyMutationInput = {

  }

  export type RoleHasPermissionUncheckedUpdateManyInput = {
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    permission_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RoleContextCreateInput = {
    role: RoleCreateNestedOneWithoutRole_contextsInput
    context: ContextCreateNestedOneWithoutRole_contextsInput
  }

  export type RoleContextUncheckedCreateInput = {
    role_id: bigint | number
    context_id: bigint | number
  }

  export type RoleContextUpdateInput = {
    role?: RoleUpdateOneRequiredWithoutRole_contextsNestedInput
    context?: ContextUpdateOneRequiredWithoutRole_contextsNestedInput
  }

  export type RoleContextUncheckedUpdateInput = {
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    context_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RoleContextCreateManyInput = {
    role_id: bigint | number
    context_id: bigint | number
  }

  export type RoleContextUpdateManyMutationInput = {

  }

  export type RoleContextUncheckedUpdateManyInput = {
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    context_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UserRoleAssignmentCreateInput = {
    id?: bigint | number
    user_id: bigint | number
    created_at?: Date | string
    role: RoleCreateNestedOneWithoutUser_role_assignmentsInput
    group: GroupCreateNestedOneWithoutUser_role_assignmentsInput
  }

  export type UserRoleAssignmentUncheckedCreateInput = {
    id?: bigint | number
    user_id: bigint | number
    role_id: bigint | number
    group_id: bigint | number
    created_at?: Date | string
  }

  export type UserRoleAssignmentUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUser_role_assignmentsNestedInput
    group?: GroupUpdateOneRequiredWithoutUser_role_assignmentsNestedInput
  }

  export type UserRoleAssignmentUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    group_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleAssignmentCreateManyInput = {
    id?: bigint | number
    user_id: bigint | number
    role_id: bigint | number
    group_id: bigint | number
    created_at?: Date | string
  }

  export type UserRoleAssignmentUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleAssignmentUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    group_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IamOutboxCreateInput = {
    id?: bigint | number
    event_type: string
    payload: JsonNullValueInput | InputJsonValue
    published?: boolean
    created_at?: Date | string
  }

  export type IamOutboxUncheckedCreateInput = {
    id?: bigint | number
    event_type: string
    payload: JsonNullValueInput | InputJsonValue
    published?: boolean
    created_at?: Date | string
  }

  export type IamOutboxUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IamOutboxUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IamOutboxCreateManyInput = {
    id?: bigint | number
    event_type: string
    payload: JsonNullValueInput | InputJsonValue
    published?: boolean
    created_at?: Date | string
  }

  export type IamOutboxUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    event_type?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IamOutboxUncheckedUpdateManyInput = {
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

  export type GroupListRelationFilter = {
    every?: GroupWhereInput
    some?: GroupWhereInput
    none?: GroupWhereInput
  }

  export type RoleContextListRelationFilter = {
    every?: RoleContextWhereInput
    some?: RoleContextWhereInput
    none?: RoleContextWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleContextOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContextTypeRef_idCompoundUniqueInput = {
    type: string
    ref_id: bigint | number
  }

  export type ContextCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    ref_id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContextAvgOrderByAggregateInput = {
    id?: SortOrder
    ref_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type ContextMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    ref_id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContextMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    ref_id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    status?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContextSumOrderByAggregateInput = {
    id?: SortOrder
    ref_id?: SortOrder
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

  export type ContextScalarRelationFilter = {
    is?: ContextWhereInput
    isNot?: ContextWhereInput
  }

  export type UserGroupListRelationFilter = {
    every?: UserGroupWhereInput
    some?: UserGroupWhereInput
    none?: UserGroupWhereInput
  }

  export type UserRoleAssignmentListRelationFilter = {
    every?: UserRoleAssignmentWhereInput
    some?: UserRoleAssignmentWhereInput
    none?: UserRoleAssignmentWhereInput
  }

  export type UserGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRoleAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupTypeCodeCompoundUniqueInput = {
    type: string
    code: string
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    owner_id?: SortOrder
    context_id?: SortOrder
    metadata?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GroupAvgOrderByAggregateInput = {
    id?: SortOrder
    owner_id?: SortOrder
    context_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    owner_id?: SortOrder
    context_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    owner_id?: SortOrder
    context_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GroupSumOrderByAggregateInput = {
    id?: SortOrder
    owner_id?: SortOrder
    context_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
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

  export type GroupScalarRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type UserGroupUser_idGroup_idCompoundUniqueInput = {
    user_id: bigint | number
    group_id: bigint | number
  }

  export type UserGroupCountOrderByAggregateInput = {
    user_id?: SortOrder
    group_id?: SortOrder
    joined_at?: SortOrder
  }

  export type UserGroupAvgOrderByAggregateInput = {
    user_id?: SortOrder
    group_id?: SortOrder
  }

  export type UserGroupMaxOrderByAggregateInput = {
    user_id?: SortOrder
    group_id?: SortOrder
    joined_at?: SortOrder
  }

  export type UserGroupMinOrderByAggregateInput = {
    user_id?: SortOrder
    group_id?: SortOrder
    joined_at?: SortOrder
  }

  export type UserGroupSumOrderByAggregateInput = {
    user_id?: SortOrder
    group_id?: SortOrder
  }

  export type PermissionNullableScalarRelationFilter = {
    is?: PermissionWhereInput | null
    isNot?: PermissionWhereInput | null
  }

  export type PermissionListRelationFilter = {
    every?: PermissionWhereInput
    some?: PermissionWhereInput
    none?: PermissionWhereInput
  }

  export type RoleHasPermissionListRelationFilter = {
    every?: RoleHasPermissionWhereInput
    some?: RoleHasPermissionWhereInput
    none?: RoleHasPermissionWhereInput
  }

  export type PermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleHasPermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PermissionCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    scope?: SortOrder
    name?: SortOrder
    status?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PermissionAvgOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type PermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    scope?: SortOrder
    name?: SortOrder
    status?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PermissionMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    scope?: SortOrder
    name?: SortOrder
    status?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PermissionSumOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type RoleNullableScalarRelationFilter = {
    is?: RoleWhereInput | null
    isNot?: RoleWhereInput | null
  }

  export type RoleListRelationFilter = {
    every?: RoleWhereInput
    some?: RoleWhereInput
    none?: RoleWhereInput
  }

  export type RoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleAvgOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleSumOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
    created_user_id?: SortOrder
    updated_user_id?: SortOrder
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type PermissionScalarRelationFilter = {
    is?: PermissionWhereInput
    isNot?: PermissionWhereInput
  }

  export type RoleHasPermissionRole_idPermission_idCompoundUniqueInput = {
    role_id: bigint | number
    permission_id: bigint | number
  }

  export type RoleHasPermissionCountOrderByAggregateInput = {
    role_id?: SortOrder
    permission_id?: SortOrder
  }

  export type RoleHasPermissionAvgOrderByAggregateInput = {
    role_id?: SortOrder
    permission_id?: SortOrder
  }

  export type RoleHasPermissionMaxOrderByAggregateInput = {
    role_id?: SortOrder
    permission_id?: SortOrder
  }

  export type RoleHasPermissionMinOrderByAggregateInput = {
    role_id?: SortOrder
    permission_id?: SortOrder
  }

  export type RoleHasPermissionSumOrderByAggregateInput = {
    role_id?: SortOrder
    permission_id?: SortOrder
  }

  export type RoleContextRole_idContext_idCompoundUniqueInput = {
    role_id: bigint | number
    context_id: bigint | number
  }

  export type RoleContextCountOrderByAggregateInput = {
    role_id?: SortOrder
    context_id?: SortOrder
  }

  export type RoleContextAvgOrderByAggregateInput = {
    role_id?: SortOrder
    context_id?: SortOrder
  }

  export type RoleContextMaxOrderByAggregateInput = {
    role_id?: SortOrder
    context_id?: SortOrder
  }

  export type RoleContextMinOrderByAggregateInput = {
    role_id?: SortOrder
    context_id?: SortOrder
  }

  export type RoleContextSumOrderByAggregateInput = {
    role_id?: SortOrder
    context_id?: SortOrder
  }

  export type UserRoleAssignmentUser_idRole_idGroup_idCompoundUniqueInput = {
    user_id: bigint | number
    role_id: bigint | number
    group_id: bigint | number
  }

  export type UserRoleAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    group_id?: SortOrder
    created_at?: SortOrder
  }

  export type UserRoleAssignmentAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    group_id?: SortOrder
  }

  export type UserRoleAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    group_id?: SortOrder
    created_at?: SortOrder
  }

  export type UserRoleAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    group_id?: SortOrder
    created_at?: SortOrder
  }

  export type UserRoleAssignmentSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    group_id?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IamOutboxCountOrderByAggregateInput = {
    id?: SortOrder
    event_type?: SortOrder
    payload?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
  }

  export type IamOutboxAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IamOutboxMaxOrderByAggregateInput = {
    id?: SortOrder
    event_type?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
  }

  export type IamOutboxMinOrderByAggregateInput = {
    id?: SortOrder
    event_type?: SortOrder
    published?: SortOrder
    created_at?: SortOrder
  }

  export type IamOutboxSumOrderByAggregateInput = {
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GroupCreateNestedManyWithoutContextInput = {
    create?: XOR<GroupCreateWithoutContextInput, GroupUncheckedCreateWithoutContextInput> | GroupCreateWithoutContextInput[] | GroupUncheckedCreateWithoutContextInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutContextInput | GroupCreateOrConnectWithoutContextInput[]
    createMany?: GroupCreateManyContextInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type RoleContextCreateNestedManyWithoutContextInput = {
    create?: XOR<RoleContextCreateWithoutContextInput, RoleContextUncheckedCreateWithoutContextInput> | RoleContextCreateWithoutContextInput[] | RoleContextUncheckedCreateWithoutContextInput[]
    connectOrCreate?: RoleContextCreateOrConnectWithoutContextInput | RoleContextCreateOrConnectWithoutContextInput[]
    createMany?: RoleContextCreateManyContextInputEnvelope
    connect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
  }

  export type GroupUncheckedCreateNestedManyWithoutContextInput = {
    create?: XOR<GroupCreateWithoutContextInput, GroupUncheckedCreateWithoutContextInput> | GroupCreateWithoutContextInput[] | GroupUncheckedCreateWithoutContextInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutContextInput | GroupCreateOrConnectWithoutContextInput[]
    createMany?: GroupCreateManyContextInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type RoleContextUncheckedCreateNestedManyWithoutContextInput = {
    create?: XOR<RoleContextCreateWithoutContextInput, RoleContextUncheckedCreateWithoutContextInput> | RoleContextCreateWithoutContextInput[] | RoleContextUncheckedCreateWithoutContextInput[]
    connectOrCreate?: RoleContextCreateOrConnectWithoutContextInput | RoleContextCreateOrConnectWithoutContextInput[]
    createMany?: RoleContextCreateManyContextInputEnvelope
    connect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
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

  export type GroupUpdateManyWithoutContextNestedInput = {
    create?: XOR<GroupCreateWithoutContextInput, GroupUncheckedCreateWithoutContextInput> | GroupCreateWithoutContextInput[] | GroupUncheckedCreateWithoutContextInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutContextInput | GroupCreateOrConnectWithoutContextInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutContextInput | GroupUpsertWithWhereUniqueWithoutContextInput[]
    createMany?: GroupCreateManyContextInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutContextInput | GroupUpdateWithWhereUniqueWithoutContextInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutContextInput | GroupUpdateManyWithWhereWithoutContextInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type RoleContextUpdateManyWithoutContextNestedInput = {
    create?: XOR<RoleContextCreateWithoutContextInput, RoleContextUncheckedCreateWithoutContextInput> | RoleContextCreateWithoutContextInput[] | RoleContextUncheckedCreateWithoutContextInput[]
    connectOrCreate?: RoleContextCreateOrConnectWithoutContextInput | RoleContextCreateOrConnectWithoutContextInput[]
    upsert?: RoleContextUpsertWithWhereUniqueWithoutContextInput | RoleContextUpsertWithWhereUniqueWithoutContextInput[]
    createMany?: RoleContextCreateManyContextInputEnvelope
    set?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    disconnect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    delete?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    connect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    update?: RoleContextUpdateWithWhereUniqueWithoutContextInput | RoleContextUpdateWithWhereUniqueWithoutContextInput[]
    updateMany?: RoleContextUpdateManyWithWhereWithoutContextInput | RoleContextUpdateManyWithWhereWithoutContextInput[]
    deleteMany?: RoleContextScalarWhereInput | RoleContextScalarWhereInput[]
  }

  export type GroupUncheckedUpdateManyWithoutContextNestedInput = {
    create?: XOR<GroupCreateWithoutContextInput, GroupUncheckedCreateWithoutContextInput> | GroupCreateWithoutContextInput[] | GroupUncheckedCreateWithoutContextInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutContextInput | GroupCreateOrConnectWithoutContextInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutContextInput | GroupUpsertWithWhereUniqueWithoutContextInput[]
    createMany?: GroupCreateManyContextInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutContextInput | GroupUpdateWithWhereUniqueWithoutContextInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutContextInput | GroupUpdateManyWithWhereWithoutContextInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type RoleContextUncheckedUpdateManyWithoutContextNestedInput = {
    create?: XOR<RoleContextCreateWithoutContextInput, RoleContextUncheckedCreateWithoutContextInput> | RoleContextCreateWithoutContextInput[] | RoleContextUncheckedCreateWithoutContextInput[]
    connectOrCreate?: RoleContextCreateOrConnectWithoutContextInput | RoleContextCreateOrConnectWithoutContextInput[]
    upsert?: RoleContextUpsertWithWhereUniqueWithoutContextInput | RoleContextUpsertWithWhereUniqueWithoutContextInput[]
    createMany?: RoleContextCreateManyContextInputEnvelope
    set?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    disconnect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    delete?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    connect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    update?: RoleContextUpdateWithWhereUniqueWithoutContextInput | RoleContextUpdateWithWhereUniqueWithoutContextInput[]
    updateMany?: RoleContextUpdateManyWithWhereWithoutContextInput | RoleContextUpdateManyWithWhereWithoutContextInput[]
    deleteMany?: RoleContextScalarWhereInput | RoleContextScalarWhereInput[]
  }

  export type ContextCreateNestedOneWithoutGroupsInput = {
    create?: XOR<ContextCreateWithoutGroupsInput, ContextUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: ContextCreateOrConnectWithoutGroupsInput
    connect?: ContextWhereUniqueInput
  }

  export type UserGroupCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput> | UserGroupCreateWithoutGroupInput[] | UserGroupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutGroupInput | UserGroupCreateOrConnectWithoutGroupInput[]
    createMany?: UserGroupCreateManyGroupInputEnvelope
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
  }

  export type UserRoleAssignmentCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserRoleAssignmentCreateWithoutGroupInput, UserRoleAssignmentUncheckedCreateWithoutGroupInput> | UserRoleAssignmentCreateWithoutGroupInput[] | UserRoleAssignmentUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserRoleAssignmentCreateOrConnectWithoutGroupInput | UserRoleAssignmentCreateOrConnectWithoutGroupInput[]
    createMany?: UserRoleAssignmentCreateManyGroupInputEnvelope
    connect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
  }

  export type UserGroupUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput> | UserGroupCreateWithoutGroupInput[] | UserGroupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutGroupInput | UserGroupCreateOrConnectWithoutGroupInput[]
    createMany?: UserGroupCreateManyGroupInputEnvelope
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
  }

  export type UserRoleAssignmentUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserRoleAssignmentCreateWithoutGroupInput, UserRoleAssignmentUncheckedCreateWithoutGroupInput> | UserRoleAssignmentCreateWithoutGroupInput[] | UserRoleAssignmentUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserRoleAssignmentCreateOrConnectWithoutGroupInput | UserRoleAssignmentCreateOrConnectWithoutGroupInput[]
    createMany?: UserRoleAssignmentCreateManyGroupInputEnvelope
    connect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ContextUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: XOR<ContextCreateWithoutGroupsInput, ContextUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: ContextCreateOrConnectWithoutGroupsInput
    upsert?: ContextUpsertWithoutGroupsInput
    connect?: ContextWhereUniqueInput
    update?: XOR<XOR<ContextUpdateToOneWithWhereWithoutGroupsInput, ContextUpdateWithoutGroupsInput>, ContextUncheckedUpdateWithoutGroupsInput>
  }

  export type UserGroupUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput> | UserGroupCreateWithoutGroupInput[] | UserGroupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutGroupInput | UserGroupCreateOrConnectWithoutGroupInput[]
    upsert?: UserGroupUpsertWithWhereUniqueWithoutGroupInput | UserGroupUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserGroupCreateManyGroupInputEnvelope
    set?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    disconnect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    delete?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    update?: UserGroupUpdateWithWhereUniqueWithoutGroupInput | UserGroupUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserGroupUpdateManyWithWhereWithoutGroupInput | UserGroupUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
  }

  export type UserRoleAssignmentUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserRoleAssignmentCreateWithoutGroupInput, UserRoleAssignmentUncheckedCreateWithoutGroupInput> | UserRoleAssignmentCreateWithoutGroupInput[] | UserRoleAssignmentUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserRoleAssignmentCreateOrConnectWithoutGroupInput | UserRoleAssignmentCreateOrConnectWithoutGroupInput[]
    upsert?: UserRoleAssignmentUpsertWithWhereUniqueWithoutGroupInput | UserRoleAssignmentUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserRoleAssignmentCreateManyGroupInputEnvelope
    set?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    disconnect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    delete?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    connect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    update?: UserRoleAssignmentUpdateWithWhereUniqueWithoutGroupInput | UserRoleAssignmentUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserRoleAssignmentUpdateManyWithWhereWithoutGroupInput | UserRoleAssignmentUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserRoleAssignmentScalarWhereInput | UserRoleAssignmentScalarWhereInput[]
  }

  export type UserGroupUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput> | UserGroupCreateWithoutGroupInput[] | UserGroupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutGroupInput | UserGroupCreateOrConnectWithoutGroupInput[]
    upsert?: UserGroupUpsertWithWhereUniqueWithoutGroupInput | UserGroupUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserGroupCreateManyGroupInputEnvelope
    set?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    disconnect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    delete?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    update?: UserGroupUpdateWithWhereUniqueWithoutGroupInput | UserGroupUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserGroupUpdateManyWithWhereWithoutGroupInput | UserGroupUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
  }

  export type UserRoleAssignmentUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserRoleAssignmentCreateWithoutGroupInput, UserRoleAssignmentUncheckedCreateWithoutGroupInput> | UserRoleAssignmentCreateWithoutGroupInput[] | UserRoleAssignmentUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserRoleAssignmentCreateOrConnectWithoutGroupInput | UserRoleAssignmentCreateOrConnectWithoutGroupInput[]
    upsert?: UserRoleAssignmentUpsertWithWhereUniqueWithoutGroupInput | UserRoleAssignmentUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserRoleAssignmentCreateManyGroupInputEnvelope
    set?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    disconnect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    delete?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    connect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    update?: UserRoleAssignmentUpdateWithWhereUniqueWithoutGroupInput | UserRoleAssignmentUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserRoleAssignmentUpdateManyWithWhereWithoutGroupInput | UserRoleAssignmentUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserRoleAssignmentScalarWhereInput | UserRoleAssignmentScalarWhereInput[]
  }

  export type GroupCreateNestedOneWithoutUser_groupsInput = {
    create?: XOR<GroupCreateWithoutUser_groupsInput, GroupUncheckedCreateWithoutUser_groupsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUser_groupsInput
    connect?: GroupWhereUniqueInput
  }

  export type GroupUpdateOneRequiredWithoutUser_groupsNestedInput = {
    create?: XOR<GroupCreateWithoutUser_groupsInput, GroupUncheckedCreateWithoutUser_groupsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUser_groupsInput
    upsert?: GroupUpsertWithoutUser_groupsInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutUser_groupsInput, GroupUpdateWithoutUser_groupsInput>, GroupUncheckedUpdateWithoutUser_groupsInput>
  }

  export type PermissionCreateNestedOneWithoutChildrenInput = {
    create?: XOR<PermissionCreateWithoutChildrenInput, PermissionUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutChildrenInput
    connect?: PermissionWhereUniqueInput
  }

  export type PermissionCreateNestedManyWithoutParentInput = {
    create?: XOR<PermissionCreateWithoutParentInput, PermissionUncheckedCreateWithoutParentInput> | PermissionCreateWithoutParentInput[] | PermissionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutParentInput | PermissionCreateOrConnectWithoutParentInput[]
    createMany?: PermissionCreateManyParentInputEnvelope
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type RoleHasPermissionCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput> | RoleHasPermissionCreateWithoutPermissionInput[] | RoleHasPermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutPermissionInput | RoleHasPermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RoleHasPermissionCreateManyPermissionInputEnvelope
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
  }

  export type PermissionUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<PermissionCreateWithoutParentInput, PermissionUncheckedCreateWithoutParentInput> | PermissionCreateWithoutParentInput[] | PermissionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutParentInput | PermissionCreateOrConnectWithoutParentInput[]
    createMany?: PermissionCreateManyParentInputEnvelope
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type RoleHasPermissionUncheckedCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput> | RoleHasPermissionCreateWithoutPermissionInput[] | RoleHasPermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutPermissionInput | RoleHasPermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RoleHasPermissionCreateManyPermissionInputEnvelope
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
  }

  export type PermissionUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<PermissionCreateWithoutChildrenInput, PermissionUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutChildrenInput
    upsert?: PermissionUpsertWithoutChildrenInput
    disconnect?: PermissionWhereInput | boolean
    delete?: PermissionWhereInput | boolean
    connect?: PermissionWhereUniqueInput
    update?: XOR<XOR<PermissionUpdateToOneWithWhereWithoutChildrenInput, PermissionUpdateWithoutChildrenInput>, PermissionUncheckedUpdateWithoutChildrenInput>
  }

  export type PermissionUpdateManyWithoutParentNestedInput = {
    create?: XOR<PermissionCreateWithoutParentInput, PermissionUncheckedCreateWithoutParentInput> | PermissionCreateWithoutParentInput[] | PermissionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutParentInput | PermissionCreateOrConnectWithoutParentInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutParentInput | PermissionUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PermissionCreateManyParentInputEnvelope
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutParentInput | PermissionUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutParentInput | PermissionUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type RoleHasPermissionUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput> | RoleHasPermissionCreateWithoutPermissionInput[] | RoleHasPermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutPermissionInput | RoleHasPermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput | RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RoleHasPermissionCreateManyPermissionInputEnvelope
    set?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    disconnect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    delete?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    update?: RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput | RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput | RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
  }

  export type PermissionUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<PermissionCreateWithoutParentInput, PermissionUncheckedCreateWithoutParentInput> | PermissionCreateWithoutParentInput[] | PermissionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutParentInput | PermissionCreateOrConnectWithoutParentInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutParentInput | PermissionUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PermissionCreateManyParentInputEnvelope
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutParentInput | PermissionUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutParentInput | PermissionUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type RoleHasPermissionUncheckedUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput> | RoleHasPermissionCreateWithoutPermissionInput[] | RoleHasPermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutPermissionInput | RoleHasPermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput | RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RoleHasPermissionCreateManyPermissionInputEnvelope
    set?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    disconnect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    delete?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    update?: RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput | RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput | RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutChildrenInput = {
    create?: XOR<RoleCreateWithoutChildrenInput, RoleUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: RoleCreateOrConnectWithoutChildrenInput
    connect?: RoleWhereUniqueInput
  }

  export type RoleCreateNestedManyWithoutParentInput = {
    create?: XOR<RoleCreateWithoutParentInput, RoleUncheckedCreateWithoutParentInput> | RoleCreateWithoutParentInput[] | RoleUncheckedCreateWithoutParentInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutParentInput | RoleCreateOrConnectWithoutParentInput[]
    createMany?: RoleCreateManyParentInputEnvelope
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type RoleHasPermissionCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput> | RoleHasPermissionCreateWithoutRoleInput[] | RoleHasPermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutRoleInput | RoleHasPermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RoleHasPermissionCreateManyRoleInputEnvelope
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
  }

  export type RoleContextCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleContextCreateWithoutRoleInput, RoleContextUncheckedCreateWithoutRoleInput> | RoleContextCreateWithoutRoleInput[] | RoleContextUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleContextCreateOrConnectWithoutRoleInput | RoleContextCreateOrConnectWithoutRoleInput[]
    createMany?: RoleContextCreateManyRoleInputEnvelope
    connect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
  }

  export type UserRoleAssignmentCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleAssignmentCreateWithoutRoleInput, UserRoleAssignmentUncheckedCreateWithoutRoleInput> | UserRoleAssignmentCreateWithoutRoleInput[] | UserRoleAssignmentUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleAssignmentCreateOrConnectWithoutRoleInput | UserRoleAssignmentCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleAssignmentCreateManyRoleInputEnvelope
    connect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
  }

  export type RoleUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<RoleCreateWithoutParentInput, RoleUncheckedCreateWithoutParentInput> | RoleCreateWithoutParentInput[] | RoleUncheckedCreateWithoutParentInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutParentInput | RoleCreateOrConnectWithoutParentInput[]
    createMany?: RoleCreateManyParentInputEnvelope
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type RoleHasPermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput> | RoleHasPermissionCreateWithoutRoleInput[] | RoleHasPermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutRoleInput | RoleHasPermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RoleHasPermissionCreateManyRoleInputEnvelope
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
  }

  export type RoleContextUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleContextCreateWithoutRoleInput, RoleContextUncheckedCreateWithoutRoleInput> | RoleContextCreateWithoutRoleInput[] | RoleContextUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleContextCreateOrConnectWithoutRoleInput | RoleContextCreateOrConnectWithoutRoleInput[]
    createMany?: RoleContextCreateManyRoleInputEnvelope
    connect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
  }

  export type UserRoleAssignmentUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleAssignmentCreateWithoutRoleInput, UserRoleAssignmentUncheckedCreateWithoutRoleInput> | UserRoleAssignmentCreateWithoutRoleInput[] | UserRoleAssignmentUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleAssignmentCreateOrConnectWithoutRoleInput | UserRoleAssignmentCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleAssignmentCreateManyRoleInputEnvelope
    connect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
  }

  export type RoleUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<RoleCreateWithoutChildrenInput, RoleUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: RoleCreateOrConnectWithoutChildrenInput
    upsert?: RoleUpsertWithoutChildrenInput
    disconnect?: RoleWhereInput | boolean
    delete?: RoleWhereInput | boolean
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutChildrenInput, RoleUpdateWithoutChildrenInput>, RoleUncheckedUpdateWithoutChildrenInput>
  }

  export type RoleUpdateManyWithoutParentNestedInput = {
    create?: XOR<RoleCreateWithoutParentInput, RoleUncheckedCreateWithoutParentInput> | RoleCreateWithoutParentInput[] | RoleUncheckedCreateWithoutParentInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutParentInput | RoleCreateOrConnectWithoutParentInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutParentInput | RoleUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: RoleCreateManyParentInputEnvelope
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutParentInput | RoleUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutParentInput | RoleUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type RoleHasPermissionUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput> | RoleHasPermissionCreateWithoutRoleInput[] | RoleHasPermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutRoleInput | RoleHasPermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput | RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleHasPermissionCreateManyRoleInputEnvelope
    set?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    disconnect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    delete?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    update?: RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput | RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleHasPermissionUpdateManyWithWhereWithoutRoleInput | RoleHasPermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
  }

  export type RoleContextUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleContextCreateWithoutRoleInput, RoleContextUncheckedCreateWithoutRoleInput> | RoleContextCreateWithoutRoleInput[] | RoleContextUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleContextCreateOrConnectWithoutRoleInput | RoleContextCreateOrConnectWithoutRoleInput[]
    upsert?: RoleContextUpsertWithWhereUniqueWithoutRoleInput | RoleContextUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleContextCreateManyRoleInputEnvelope
    set?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    disconnect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    delete?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    connect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    update?: RoleContextUpdateWithWhereUniqueWithoutRoleInput | RoleContextUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleContextUpdateManyWithWhereWithoutRoleInput | RoleContextUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleContextScalarWhereInput | RoleContextScalarWhereInput[]
  }

  export type UserRoleAssignmentUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleAssignmentCreateWithoutRoleInput, UserRoleAssignmentUncheckedCreateWithoutRoleInput> | UserRoleAssignmentCreateWithoutRoleInput[] | UserRoleAssignmentUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleAssignmentCreateOrConnectWithoutRoleInput | UserRoleAssignmentCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleAssignmentUpsertWithWhereUniqueWithoutRoleInput | UserRoleAssignmentUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleAssignmentCreateManyRoleInputEnvelope
    set?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    disconnect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    delete?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    connect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    update?: UserRoleAssignmentUpdateWithWhereUniqueWithoutRoleInput | UserRoleAssignmentUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleAssignmentUpdateManyWithWhereWithoutRoleInput | UserRoleAssignmentUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleAssignmentScalarWhereInput | UserRoleAssignmentScalarWhereInput[]
  }

  export type RoleUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<RoleCreateWithoutParentInput, RoleUncheckedCreateWithoutParentInput> | RoleCreateWithoutParentInput[] | RoleUncheckedCreateWithoutParentInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutParentInput | RoleCreateOrConnectWithoutParentInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutParentInput | RoleUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: RoleCreateManyParentInputEnvelope
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutParentInput | RoleUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutParentInput | RoleUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type RoleHasPermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput> | RoleHasPermissionCreateWithoutRoleInput[] | RoleHasPermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutRoleInput | RoleHasPermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput | RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleHasPermissionCreateManyRoleInputEnvelope
    set?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    disconnect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    delete?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    update?: RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput | RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleHasPermissionUpdateManyWithWhereWithoutRoleInput | RoleHasPermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
  }

  export type RoleContextUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleContextCreateWithoutRoleInput, RoleContextUncheckedCreateWithoutRoleInput> | RoleContextCreateWithoutRoleInput[] | RoleContextUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleContextCreateOrConnectWithoutRoleInput | RoleContextCreateOrConnectWithoutRoleInput[]
    upsert?: RoleContextUpsertWithWhereUniqueWithoutRoleInput | RoleContextUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleContextCreateManyRoleInputEnvelope
    set?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    disconnect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    delete?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    connect?: RoleContextWhereUniqueInput | RoleContextWhereUniqueInput[]
    update?: RoleContextUpdateWithWhereUniqueWithoutRoleInput | RoleContextUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleContextUpdateManyWithWhereWithoutRoleInput | RoleContextUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleContextScalarWhereInput | RoleContextScalarWhereInput[]
  }

  export type UserRoleAssignmentUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleAssignmentCreateWithoutRoleInput, UserRoleAssignmentUncheckedCreateWithoutRoleInput> | UserRoleAssignmentCreateWithoutRoleInput[] | UserRoleAssignmentUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleAssignmentCreateOrConnectWithoutRoleInput | UserRoleAssignmentCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleAssignmentUpsertWithWhereUniqueWithoutRoleInput | UserRoleAssignmentUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleAssignmentCreateManyRoleInputEnvelope
    set?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    disconnect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    delete?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    connect?: UserRoleAssignmentWhereUniqueInput | UserRoleAssignmentWhereUniqueInput[]
    update?: UserRoleAssignmentUpdateWithWhereUniqueWithoutRoleInput | UserRoleAssignmentUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleAssignmentUpdateManyWithWhereWithoutRoleInput | UserRoleAssignmentUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleAssignmentScalarWhereInput | UserRoleAssignmentScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput
    connect?: RoleWhereUniqueInput
  }

  export type PermissionCreateNestedOneWithoutRole_linksInput = {
    create?: XOR<PermissionCreateWithoutRole_linksInput, PermissionUncheckedCreateWithoutRole_linksInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutRole_linksInput
    connect?: PermissionWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput
    upsert?: RoleUpsertWithoutPermissionsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutPermissionsInput, RoleUpdateWithoutPermissionsInput>, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type PermissionUpdateOneRequiredWithoutRole_linksNestedInput = {
    create?: XOR<PermissionCreateWithoutRole_linksInput, PermissionUncheckedCreateWithoutRole_linksInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutRole_linksInput
    upsert?: PermissionUpsertWithoutRole_linksInput
    connect?: PermissionWhereUniqueInput
    update?: XOR<XOR<PermissionUpdateToOneWithWhereWithoutRole_linksInput, PermissionUpdateWithoutRole_linksInput>, PermissionUncheckedUpdateWithoutRole_linksInput>
  }

  export type RoleCreateNestedOneWithoutRole_contextsInput = {
    create?: XOR<RoleCreateWithoutRole_contextsInput, RoleUncheckedCreateWithoutRole_contextsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutRole_contextsInput
    connect?: RoleWhereUniqueInput
  }

  export type ContextCreateNestedOneWithoutRole_contextsInput = {
    create?: XOR<ContextCreateWithoutRole_contextsInput, ContextUncheckedCreateWithoutRole_contextsInput>
    connectOrCreate?: ContextCreateOrConnectWithoutRole_contextsInput
    connect?: ContextWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutRole_contextsNestedInput = {
    create?: XOR<RoleCreateWithoutRole_contextsInput, RoleUncheckedCreateWithoutRole_contextsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutRole_contextsInput
    upsert?: RoleUpsertWithoutRole_contextsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutRole_contextsInput, RoleUpdateWithoutRole_contextsInput>, RoleUncheckedUpdateWithoutRole_contextsInput>
  }

  export type ContextUpdateOneRequiredWithoutRole_contextsNestedInput = {
    create?: XOR<ContextCreateWithoutRole_contextsInput, ContextUncheckedCreateWithoutRole_contextsInput>
    connectOrCreate?: ContextCreateOrConnectWithoutRole_contextsInput
    upsert?: ContextUpsertWithoutRole_contextsInput
    connect?: ContextWhereUniqueInput
    update?: XOR<XOR<ContextUpdateToOneWithWhereWithoutRole_contextsInput, ContextUpdateWithoutRole_contextsInput>, ContextUncheckedUpdateWithoutRole_contextsInput>
  }

  export type RoleCreateNestedOneWithoutUser_role_assignmentsInput = {
    create?: XOR<RoleCreateWithoutUser_role_assignmentsInput, RoleUncheckedCreateWithoutUser_role_assignmentsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUser_role_assignmentsInput
    connect?: RoleWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutUser_role_assignmentsInput = {
    create?: XOR<GroupCreateWithoutUser_role_assignmentsInput, GroupUncheckedCreateWithoutUser_role_assignmentsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUser_role_assignmentsInput
    connect?: GroupWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutUser_role_assignmentsNestedInput = {
    create?: XOR<RoleCreateWithoutUser_role_assignmentsInput, RoleUncheckedCreateWithoutUser_role_assignmentsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUser_role_assignmentsInput
    upsert?: RoleUpsertWithoutUser_role_assignmentsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUser_role_assignmentsInput, RoleUpdateWithoutUser_role_assignmentsInput>, RoleUncheckedUpdateWithoutUser_role_assignmentsInput>
  }

  export type GroupUpdateOneRequiredWithoutUser_role_assignmentsNestedInput = {
    create?: XOR<GroupCreateWithoutUser_role_assignmentsInput, GroupUncheckedCreateWithoutUser_role_assignmentsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUser_role_assignmentsInput
    upsert?: GroupUpsertWithoutUser_role_assignmentsInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutUser_role_assignmentsInput, GroupUpdateWithoutUser_role_assignmentsInput>, GroupUncheckedUpdateWithoutUser_role_assignmentsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GroupCreateWithoutContextInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    user_groups?: UserGroupCreateNestedManyWithoutGroupInput
    user_role_assignments?: UserRoleAssignmentCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutContextInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    user_groups?: UserGroupUncheckedCreateNestedManyWithoutGroupInput
    user_role_assignments?: UserRoleAssignmentUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutContextInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutContextInput, GroupUncheckedCreateWithoutContextInput>
  }

  export type GroupCreateManyContextInputEnvelope = {
    data: GroupCreateManyContextInput | GroupCreateManyContextInput[]
    skipDuplicates?: boolean
  }

  export type RoleContextCreateWithoutContextInput = {
    role: RoleCreateNestedOneWithoutRole_contextsInput
  }

  export type RoleContextUncheckedCreateWithoutContextInput = {
    role_id: bigint | number
  }

  export type RoleContextCreateOrConnectWithoutContextInput = {
    where: RoleContextWhereUniqueInput
    create: XOR<RoleContextCreateWithoutContextInput, RoleContextUncheckedCreateWithoutContextInput>
  }

  export type RoleContextCreateManyContextInputEnvelope = {
    data: RoleContextCreateManyContextInput | RoleContextCreateManyContextInput[]
    skipDuplicates?: boolean
  }

  export type GroupUpsertWithWhereUniqueWithoutContextInput = {
    where: GroupWhereUniqueInput
    update: XOR<GroupUpdateWithoutContextInput, GroupUncheckedUpdateWithoutContextInput>
    create: XOR<GroupCreateWithoutContextInput, GroupUncheckedCreateWithoutContextInput>
  }

  export type GroupUpdateWithWhereUniqueWithoutContextInput = {
    where: GroupWhereUniqueInput
    data: XOR<GroupUpdateWithoutContextInput, GroupUncheckedUpdateWithoutContextInput>
  }

  export type GroupUpdateManyWithWhereWithoutContextInput = {
    where: GroupScalarWhereInput
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyWithoutContextInput>
  }

  export type GroupScalarWhereInput = {
    AND?: GroupScalarWhereInput | GroupScalarWhereInput[]
    OR?: GroupScalarWhereInput[]
    NOT?: GroupScalarWhereInput | GroupScalarWhereInput[]
    id?: BigIntFilter<"Group"> | bigint | number
    type?: StringFilter<"Group"> | string
    code?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    description?: StringNullableFilter<"Group"> | string | null
    status?: StringFilter<"Group"> | string
    owner_id?: BigIntNullableFilter<"Group"> | bigint | number | null
    context_id?: BigIntFilter<"Group"> | bigint | number
    metadata?: JsonNullableFilter<"Group">
    created_user_id?: BigIntNullableFilter<"Group"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Group"> | bigint | number | null
    created_at?: DateTimeFilter<"Group"> | Date | string
    updated_at?: DateTimeFilter<"Group"> | Date | string
  }

  export type RoleContextUpsertWithWhereUniqueWithoutContextInput = {
    where: RoleContextWhereUniqueInput
    update: XOR<RoleContextUpdateWithoutContextInput, RoleContextUncheckedUpdateWithoutContextInput>
    create: XOR<RoleContextCreateWithoutContextInput, RoleContextUncheckedCreateWithoutContextInput>
  }

  export type RoleContextUpdateWithWhereUniqueWithoutContextInput = {
    where: RoleContextWhereUniqueInput
    data: XOR<RoleContextUpdateWithoutContextInput, RoleContextUncheckedUpdateWithoutContextInput>
  }

  export type RoleContextUpdateManyWithWhereWithoutContextInput = {
    where: RoleContextScalarWhereInput
    data: XOR<RoleContextUpdateManyMutationInput, RoleContextUncheckedUpdateManyWithoutContextInput>
  }

  export type RoleContextScalarWhereInput = {
    AND?: RoleContextScalarWhereInput | RoleContextScalarWhereInput[]
    OR?: RoleContextScalarWhereInput[]
    NOT?: RoleContextScalarWhereInput | RoleContextScalarWhereInput[]
    role_id?: BigIntFilter<"RoleContext"> | bigint | number
    context_id?: BigIntFilter<"RoleContext"> | bigint | number
  }

  export type ContextCreateWithoutGroupsInput = {
    id?: bigint | number
    type: string
    ref_id?: bigint | number | null
    name: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    role_contexts?: RoleContextCreateNestedManyWithoutContextInput
  }

  export type ContextUncheckedCreateWithoutGroupsInput = {
    id?: bigint | number
    type: string
    ref_id?: bigint | number | null
    name: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    role_contexts?: RoleContextUncheckedCreateNestedManyWithoutContextInput
  }

  export type ContextCreateOrConnectWithoutGroupsInput = {
    where: ContextWhereUniqueInput
    create: XOR<ContextCreateWithoutGroupsInput, ContextUncheckedCreateWithoutGroupsInput>
  }

  export type UserGroupCreateWithoutGroupInput = {
    user_id: bigint | number
    joined_at?: Date | string
  }

  export type UserGroupUncheckedCreateWithoutGroupInput = {
    user_id: bigint | number
    joined_at?: Date | string
  }

  export type UserGroupCreateOrConnectWithoutGroupInput = {
    where: UserGroupWhereUniqueInput
    create: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput>
  }

  export type UserGroupCreateManyGroupInputEnvelope = {
    data: UserGroupCreateManyGroupInput | UserGroupCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleAssignmentCreateWithoutGroupInput = {
    id?: bigint | number
    user_id: bigint | number
    created_at?: Date | string
    role: RoleCreateNestedOneWithoutUser_role_assignmentsInput
  }

  export type UserRoleAssignmentUncheckedCreateWithoutGroupInput = {
    id?: bigint | number
    user_id: bigint | number
    role_id: bigint | number
    created_at?: Date | string
  }

  export type UserRoleAssignmentCreateOrConnectWithoutGroupInput = {
    where: UserRoleAssignmentWhereUniqueInput
    create: XOR<UserRoleAssignmentCreateWithoutGroupInput, UserRoleAssignmentUncheckedCreateWithoutGroupInput>
  }

  export type UserRoleAssignmentCreateManyGroupInputEnvelope = {
    data: UserRoleAssignmentCreateManyGroupInput | UserRoleAssignmentCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type ContextUpsertWithoutGroupsInput = {
    update: XOR<ContextUpdateWithoutGroupsInput, ContextUncheckedUpdateWithoutGroupsInput>
    create: XOR<ContextCreateWithoutGroupsInput, ContextUncheckedCreateWithoutGroupsInput>
    where?: ContextWhereInput
  }

  export type ContextUpdateToOneWithWhereWithoutGroupsInput = {
    where?: ContextWhereInput
    data: XOR<ContextUpdateWithoutGroupsInput, ContextUncheckedUpdateWithoutGroupsInput>
  }

  export type ContextUpdateWithoutGroupsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    ref_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role_contexts?: RoleContextUpdateManyWithoutContextNestedInput
  }

  export type ContextUncheckedUpdateWithoutGroupsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    ref_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role_contexts?: RoleContextUncheckedUpdateManyWithoutContextNestedInput
  }

  export type UserGroupUpsertWithWhereUniqueWithoutGroupInput = {
    where: UserGroupWhereUniqueInput
    update: XOR<UserGroupUpdateWithoutGroupInput, UserGroupUncheckedUpdateWithoutGroupInput>
    create: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput>
  }

  export type UserGroupUpdateWithWhereUniqueWithoutGroupInput = {
    where: UserGroupWhereUniqueInput
    data: XOR<UserGroupUpdateWithoutGroupInput, UserGroupUncheckedUpdateWithoutGroupInput>
  }

  export type UserGroupUpdateManyWithWhereWithoutGroupInput = {
    where: UserGroupScalarWhereInput
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyWithoutGroupInput>
  }

  export type UserGroupScalarWhereInput = {
    AND?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
    OR?: UserGroupScalarWhereInput[]
    NOT?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
    user_id?: BigIntFilter<"UserGroup"> | bigint | number
    group_id?: BigIntFilter<"UserGroup"> | bigint | number
    joined_at?: DateTimeFilter<"UserGroup"> | Date | string
  }

  export type UserRoleAssignmentUpsertWithWhereUniqueWithoutGroupInput = {
    where: UserRoleAssignmentWhereUniqueInput
    update: XOR<UserRoleAssignmentUpdateWithoutGroupInput, UserRoleAssignmentUncheckedUpdateWithoutGroupInput>
    create: XOR<UserRoleAssignmentCreateWithoutGroupInput, UserRoleAssignmentUncheckedCreateWithoutGroupInput>
  }

  export type UserRoleAssignmentUpdateWithWhereUniqueWithoutGroupInput = {
    where: UserRoleAssignmentWhereUniqueInput
    data: XOR<UserRoleAssignmentUpdateWithoutGroupInput, UserRoleAssignmentUncheckedUpdateWithoutGroupInput>
  }

  export type UserRoleAssignmentUpdateManyWithWhereWithoutGroupInput = {
    where: UserRoleAssignmentScalarWhereInput
    data: XOR<UserRoleAssignmentUpdateManyMutationInput, UserRoleAssignmentUncheckedUpdateManyWithoutGroupInput>
  }

  export type UserRoleAssignmentScalarWhereInput = {
    AND?: UserRoleAssignmentScalarWhereInput | UserRoleAssignmentScalarWhereInput[]
    OR?: UserRoleAssignmentScalarWhereInput[]
    NOT?: UserRoleAssignmentScalarWhereInput | UserRoleAssignmentScalarWhereInput[]
    id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    user_id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    role_id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    group_id?: BigIntFilter<"UserRoleAssignment"> | bigint | number
    created_at?: DateTimeFilter<"UserRoleAssignment"> | Date | string
  }

  export type GroupCreateWithoutUser_groupsInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    context: ContextCreateNestedOneWithoutGroupsInput
    user_role_assignments?: UserRoleAssignmentCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutUser_groupsInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    context_id: bigint | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    user_role_assignments?: UserRoleAssignmentUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutUser_groupsInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutUser_groupsInput, GroupUncheckedCreateWithoutUser_groupsInput>
  }

  export type GroupUpsertWithoutUser_groupsInput = {
    update: XOR<GroupUpdateWithoutUser_groupsInput, GroupUncheckedUpdateWithoutUser_groupsInput>
    create: XOR<GroupCreateWithoutUser_groupsInput, GroupUncheckedCreateWithoutUser_groupsInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutUser_groupsInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutUser_groupsInput, GroupUncheckedUpdateWithoutUser_groupsInput>
  }

  export type GroupUpdateWithoutUser_groupsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    context?: ContextUpdateOneRequiredWithoutGroupsNestedInput
    user_role_assignments?: UserRoleAssignmentUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutUser_groupsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    context_id?: BigIntFieldUpdateOperationsInput | bigint | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_role_assignments?: UserRoleAssignmentUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type PermissionCreateWithoutChildrenInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: PermissionCreateNestedOneWithoutChildrenInput
    role_links?: RoleHasPermissionCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUncheckedCreateWithoutChildrenInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    role_links?: RoleHasPermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type PermissionCreateOrConnectWithoutChildrenInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutChildrenInput, PermissionUncheckedCreateWithoutChildrenInput>
  }

  export type PermissionCreateWithoutParentInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: PermissionCreateNestedManyWithoutParentInput
    role_links?: RoleHasPermissionCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUncheckedCreateWithoutParentInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: PermissionUncheckedCreateNestedManyWithoutParentInput
    role_links?: RoleHasPermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type PermissionCreateOrConnectWithoutParentInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutParentInput, PermissionUncheckedCreateWithoutParentInput>
  }

  export type PermissionCreateManyParentInputEnvelope = {
    data: PermissionCreateManyParentInput | PermissionCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type RoleHasPermissionCreateWithoutPermissionInput = {
    role: RoleCreateNestedOneWithoutPermissionsInput
  }

  export type RoleHasPermissionUncheckedCreateWithoutPermissionInput = {
    role_id: bigint | number
  }

  export type RoleHasPermissionCreateOrConnectWithoutPermissionInput = {
    where: RoleHasPermissionWhereUniqueInput
    create: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RoleHasPermissionCreateManyPermissionInputEnvelope = {
    data: RoleHasPermissionCreateManyPermissionInput | RoleHasPermissionCreateManyPermissionInput[]
    skipDuplicates?: boolean
  }

  export type PermissionUpsertWithoutChildrenInput = {
    update: XOR<PermissionUpdateWithoutChildrenInput, PermissionUncheckedUpdateWithoutChildrenInput>
    create: XOR<PermissionCreateWithoutChildrenInput, PermissionUncheckedCreateWithoutChildrenInput>
    where?: PermissionWhereInput
  }

  export type PermissionUpdateToOneWithWhereWithoutChildrenInput = {
    where?: PermissionWhereInput
    data: XOR<PermissionUpdateWithoutChildrenInput, PermissionUncheckedUpdateWithoutChildrenInput>
  }

  export type PermissionUpdateWithoutChildrenInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: PermissionUpdateOneWithoutChildrenNestedInput
    role_links?: RoleHasPermissionUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUncheckedUpdateWithoutChildrenInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role_links?: RoleHasPermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUpsertWithWhereUniqueWithoutParentInput = {
    where: PermissionWhereUniqueInput
    update: XOR<PermissionUpdateWithoutParentInput, PermissionUncheckedUpdateWithoutParentInput>
    create: XOR<PermissionCreateWithoutParentInput, PermissionUncheckedCreateWithoutParentInput>
  }

  export type PermissionUpdateWithWhereUniqueWithoutParentInput = {
    where: PermissionWhereUniqueInput
    data: XOR<PermissionUpdateWithoutParentInput, PermissionUncheckedUpdateWithoutParentInput>
  }

  export type PermissionUpdateManyWithWhereWithoutParentInput = {
    where: PermissionScalarWhereInput
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyWithoutParentInput>
  }

  export type PermissionScalarWhereInput = {
    AND?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    OR?: PermissionScalarWhereInput[]
    NOT?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    id?: BigIntFilter<"Permission"> | bigint | number
    code?: StringFilter<"Permission"> | string
    scope?: StringFilter<"Permission"> | string
    name?: StringNullableFilter<"Permission"> | string | null
    status?: StringFilter<"Permission"> | string
    parent_id?: BigIntNullableFilter<"Permission"> | bigint | number | null
    created_user_id?: BigIntNullableFilter<"Permission"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Permission"> | bigint | number | null
    created_at?: DateTimeFilter<"Permission"> | Date | string
    updated_at?: DateTimeFilter<"Permission"> | Date | string
  }

  export type RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput = {
    where: RoleHasPermissionWhereUniqueInput
    update: XOR<RoleHasPermissionUpdateWithoutPermissionInput, RoleHasPermissionUncheckedUpdateWithoutPermissionInput>
    create: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput = {
    where: RoleHasPermissionWhereUniqueInput
    data: XOR<RoleHasPermissionUpdateWithoutPermissionInput, RoleHasPermissionUncheckedUpdateWithoutPermissionInput>
  }

  export type RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput = {
    where: RoleHasPermissionScalarWhereInput
    data: XOR<RoleHasPermissionUpdateManyMutationInput, RoleHasPermissionUncheckedUpdateManyWithoutPermissionInput>
  }

  export type RoleHasPermissionScalarWhereInput = {
    AND?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
    OR?: RoleHasPermissionScalarWhereInput[]
    NOT?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
    role_id?: BigIntFilter<"RoleHasPermission"> | bigint | number
    permission_id?: BigIntFilter<"RoleHasPermission"> | bigint | number
  }

  export type RoleCreateWithoutChildrenInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: RoleCreateNestedOneWithoutChildrenInput
    permissions?: RoleHasPermissionCreateNestedManyWithoutRoleInput
    role_contexts?: RoleContextCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutChildrenInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    permissions?: RoleHasPermissionUncheckedCreateNestedManyWithoutRoleInput
    role_contexts?: RoleContextUncheckedCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutChildrenInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutChildrenInput, RoleUncheckedCreateWithoutChildrenInput>
  }

  export type RoleCreateWithoutParentInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: RoleCreateNestedManyWithoutParentInput
    permissions?: RoleHasPermissionCreateNestedManyWithoutRoleInput
    role_contexts?: RoleContextCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutParentInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: RoleUncheckedCreateNestedManyWithoutParentInput
    permissions?: RoleHasPermissionUncheckedCreateNestedManyWithoutRoleInput
    role_contexts?: RoleContextUncheckedCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutParentInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutParentInput, RoleUncheckedCreateWithoutParentInput>
  }

  export type RoleCreateManyParentInputEnvelope = {
    data: RoleCreateManyParentInput | RoleCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type RoleHasPermissionCreateWithoutRoleInput = {
    permission: PermissionCreateNestedOneWithoutRole_linksInput
  }

  export type RoleHasPermissionUncheckedCreateWithoutRoleInput = {
    permission_id: bigint | number
  }

  export type RoleHasPermissionCreateOrConnectWithoutRoleInput = {
    where: RoleHasPermissionWhereUniqueInput
    create: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput>
  }

  export type RoleHasPermissionCreateManyRoleInputEnvelope = {
    data: RoleHasPermissionCreateManyRoleInput | RoleHasPermissionCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RoleContextCreateWithoutRoleInput = {
    context: ContextCreateNestedOneWithoutRole_contextsInput
  }

  export type RoleContextUncheckedCreateWithoutRoleInput = {
    context_id: bigint | number
  }

  export type RoleContextCreateOrConnectWithoutRoleInput = {
    where: RoleContextWhereUniqueInput
    create: XOR<RoleContextCreateWithoutRoleInput, RoleContextUncheckedCreateWithoutRoleInput>
  }

  export type RoleContextCreateManyRoleInputEnvelope = {
    data: RoleContextCreateManyRoleInput | RoleContextCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleAssignmentCreateWithoutRoleInput = {
    id?: bigint | number
    user_id: bigint | number
    created_at?: Date | string
    group: GroupCreateNestedOneWithoutUser_role_assignmentsInput
  }

  export type UserRoleAssignmentUncheckedCreateWithoutRoleInput = {
    id?: bigint | number
    user_id: bigint | number
    group_id: bigint | number
    created_at?: Date | string
  }

  export type UserRoleAssignmentCreateOrConnectWithoutRoleInput = {
    where: UserRoleAssignmentWhereUniqueInput
    create: XOR<UserRoleAssignmentCreateWithoutRoleInput, UserRoleAssignmentUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleAssignmentCreateManyRoleInputEnvelope = {
    data: UserRoleAssignmentCreateManyRoleInput | UserRoleAssignmentCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RoleUpsertWithoutChildrenInput = {
    update: XOR<RoleUpdateWithoutChildrenInput, RoleUncheckedUpdateWithoutChildrenInput>
    create: XOR<RoleCreateWithoutChildrenInput, RoleUncheckedCreateWithoutChildrenInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutChildrenInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutChildrenInput, RoleUncheckedUpdateWithoutChildrenInput>
  }

  export type RoleUpdateWithoutChildrenInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: RoleUpdateOneWithoutChildrenNestedInput
    permissions?: RoleHasPermissionUpdateManyWithoutRoleNestedInput
    role_contexts?: RoleContextUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutChildrenInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: RoleHasPermissionUncheckedUpdateManyWithoutRoleNestedInput
    role_contexts?: RoleContextUncheckedUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleUpsertWithWhereUniqueWithoutParentInput = {
    where: RoleWhereUniqueInput
    update: XOR<RoleUpdateWithoutParentInput, RoleUncheckedUpdateWithoutParentInput>
    create: XOR<RoleCreateWithoutParentInput, RoleUncheckedCreateWithoutParentInput>
  }

  export type RoleUpdateWithWhereUniqueWithoutParentInput = {
    where: RoleWhereUniqueInput
    data: XOR<RoleUpdateWithoutParentInput, RoleUncheckedUpdateWithoutParentInput>
  }

  export type RoleUpdateManyWithWhereWithoutParentInput = {
    where: RoleScalarWhereInput
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyWithoutParentInput>
  }

  export type RoleScalarWhereInput = {
    AND?: RoleScalarWhereInput | RoleScalarWhereInput[]
    OR?: RoleScalarWhereInput[]
    NOT?: RoleScalarWhereInput | RoleScalarWhereInput[]
    id?: BigIntFilter<"Role"> | bigint | number
    code?: StringFilter<"Role"> | string
    name?: StringNullableFilter<"Role"> | string | null
    status?: StringFilter<"Role"> | string
    parent_id?: BigIntNullableFilter<"Role"> | bigint | number | null
    created_user_id?: BigIntNullableFilter<"Role"> | bigint | number | null
    updated_user_id?: BigIntNullableFilter<"Role"> | bigint | number | null
    created_at?: DateTimeFilter<"Role"> | Date | string
    updated_at?: DateTimeFilter<"Role"> | Date | string
  }

  export type RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: RoleHasPermissionWhereUniqueInput
    update: XOR<RoleHasPermissionUpdateWithoutRoleInput, RoleHasPermissionUncheckedUpdateWithoutRoleInput>
    create: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput>
  }

  export type RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: RoleHasPermissionWhereUniqueInput
    data: XOR<RoleHasPermissionUpdateWithoutRoleInput, RoleHasPermissionUncheckedUpdateWithoutRoleInput>
  }

  export type RoleHasPermissionUpdateManyWithWhereWithoutRoleInput = {
    where: RoleHasPermissionScalarWhereInput
    data: XOR<RoleHasPermissionUpdateManyMutationInput, RoleHasPermissionUncheckedUpdateManyWithoutRoleInput>
  }

  export type RoleContextUpsertWithWhereUniqueWithoutRoleInput = {
    where: RoleContextWhereUniqueInput
    update: XOR<RoleContextUpdateWithoutRoleInput, RoleContextUncheckedUpdateWithoutRoleInput>
    create: XOR<RoleContextCreateWithoutRoleInput, RoleContextUncheckedCreateWithoutRoleInput>
  }

  export type RoleContextUpdateWithWhereUniqueWithoutRoleInput = {
    where: RoleContextWhereUniqueInput
    data: XOR<RoleContextUpdateWithoutRoleInput, RoleContextUncheckedUpdateWithoutRoleInput>
  }

  export type RoleContextUpdateManyWithWhereWithoutRoleInput = {
    where: RoleContextScalarWhereInput
    data: XOR<RoleContextUpdateManyMutationInput, RoleContextUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserRoleAssignmentUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserRoleAssignmentWhereUniqueInput
    update: XOR<UserRoleAssignmentUpdateWithoutRoleInput, UserRoleAssignmentUncheckedUpdateWithoutRoleInput>
    create: XOR<UserRoleAssignmentCreateWithoutRoleInput, UserRoleAssignmentUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleAssignmentUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserRoleAssignmentWhereUniqueInput
    data: XOR<UserRoleAssignmentUpdateWithoutRoleInput, UserRoleAssignmentUncheckedUpdateWithoutRoleInput>
  }

  export type UserRoleAssignmentUpdateManyWithWhereWithoutRoleInput = {
    where: UserRoleAssignmentScalarWhereInput
    data: XOR<UserRoleAssignmentUpdateManyMutationInput, UserRoleAssignmentUncheckedUpdateManyWithoutRoleInput>
  }

  export type RoleCreateWithoutPermissionsInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: RoleCreateNestedOneWithoutChildrenInput
    children?: RoleCreateNestedManyWithoutParentInput
    role_contexts?: RoleContextCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutPermissionsInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: RoleUncheckedCreateNestedManyWithoutParentInput
    role_contexts?: RoleContextUncheckedCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type PermissionCreateWithoutRole_linksInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: PermissionCreateNestedOneWithoutChildrenInput
    children?: PermissionCreateNestedManyWithoutParentInput
  }

  export type PermissionUncheckedCreateWithoutRole_linksInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: PermissionUncheckedCreateNestedManyWithoutParentInput
  }

  export type PermissionCreateOrConnectWithoutRole_linksInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutRole_linksInput, PermissionUncheckedCreateWithoutRole_linksInput>
  }

  export type RoleUpsertWithoutPermissionsInput = {
    update: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type RoleUpdateWithoutPermissionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: RoleUpdateOneWithoutChildrenNestedInput
    children?: RoleUpdateManyWithoutParentNestedInput
    role_contexts?: RoleContextUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutPermissionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: RoleUncheckedUpdateManyWithoutParentNestedInput
    role_contexts?: RoleContextUncheckedUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type PermissionUpsertWithoutRole_linksInput = {
    update: XOR<PermissionUpdateWithoutRole_linksInput, PermissionUncheckedUpdateWithoutRole_linksInput>
    create: XOR<PermissionCreateWithoutRole_linksInput, PermissionUncheckedCreateWithoutRole_linksInput>
    where?: PermissionWhereInput
  }

  export type PermissionUpdateToOneWithWhereWithoutRole_linksInput = {
    where?: PermissionWhereInput
    data: XOR<PermissionUpdateWithoutRole_linksInput, PermissionUncheckedUpdateWithoutRole_linksInput>
  }

  export type PermissionUpdateWithoutRole_linksInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: PermissionUpdateOneWithoutChildrenNestedInput
    children?: PermissionUpdateManyWithoutParentNestedInput
  }

  export type PermissionUncheckedUpdateWithoutRole_linksInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PermissionUncheckedUpdateManyWithoutParentNestedInput
  }

  export type RoleCreateWithoutRole_contextsInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: RoleCreateNestedOneWithoutChildrenInput
    children?: RoleCreateNestedManyWithoutParentInput
    permissions?: RoleHasPermissionCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutRole_contextsInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: RoleUncheckedCreateNestedManyWithoutParentInput
    permissions?: RoleHasPermissionUncheckedCreateNestedManyWithoutRoleInput
    user_role_assignments?: UserRoleAssignmentUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutRole_contextsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutRole_contextsInput, RoleUncheckedCreateWithoutRole_contextsInput>
  }

  export type ContextCreateWithoutRole_contextsInput = {
    id?: bigint | number
    type: string
    ref_id?: bigint | number | null
    name: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    groups?: GroupCreateNestedManyWithoutContextInput
  }

  export type ContextUncheckedCreateWithoutRole_contextsInput = {
    id?: bigint | number
    type: string
    ref_id?: bigint | number | null
    name: string
    code: string
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    groups?: GroupUncheckedCreateNestedManyWithoutContextInput
  }

  export type ContextCreateOrConnectWithoutRole_contextsInput = {
    where: ContextWhereUniqueInput
    create: XOR<ContextCreateWithoutRole_contextsInput, ContextUncheckedCreateWithoutRole_contextsInput>
  }

  export type RoleUpsertWithoutRole_contextsInput = {
    update: XOR<RoleUpdateWithoutRole_contextsInput, RoleUncheckedUpdateWithoutRole_contextsInput>
    create: XOR<RoleCreateWithoutRole_contextsInput, RoleUncheckedCreateWithoutRole_contextsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutRole_contextsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutRole_contextsInput, RoleUncheckedUpdateWithoutRole_contextsInput>
  }

  export type RoleUpdateWithoutRole_contextsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: RoleUpdateOneWithoutChildrenNestedInput
    children?: RoleUpdateManyWithoutParentNestedInput
    permissions?: RoleHasPermissionUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutRole_contextsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: RoleUncheckedUpdateManyWithoutParentNestedInput
    permissions?: RoleHasPermissionUncheckedUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type ContextUpsertWithoutRole_contextsInput = {
    update: XOR<ContextUpdateWithoutRole_contextsInput, ContextUncheckedUpdateWithoutRole_contextsInput>
    create: XOR<ContextCreateWithoutRole_contextsInput, ContextUncheckedCreateWithoutRole_contextsInput>
    where?: ContextWhereInput
  }

  export type ContextUpdateToOneWithWhereWithoutRole_contextsInput = {
    where?: ContextWhereInput
    data: XOR<ContextUpdateWithoutRole_contextsInput, ContextUncheckedUpdateWithoutRole_contextsInput>
  }

  export type ContextUpdateWithoutRole_contextsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    ref_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: GroupUpdateManyWithoutContextNestedInput
  }

  export type ContextUncheckedUpdateWithoutRole_contextsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    ref_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: GroupUncheckedUpdateManyWithoutContextNestedInput
  }

  export type RoleCreateWithoutUser_role_assignmentsInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    parent?: RoleCreateNestedOneWithoutChildrenInput
    children?: RoleCreateNestedManyWithoutParentInput
    permissions?: RoleHasPermissionCreateNestedManyWithoutRoleInput
    role_contexts?: RoleContextCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutUser_role_assignmentsInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    parent_id?: bigint | number | null
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    children?: RoleUncheckedCreateNestedManyWithoutParentInput
    permissions?: RoleHasPermissionUncheckedCreateNestedManyWithoutRoleInput
    role_contexts?: RoleContextUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutUser_role_assignmentsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUser_role_assignmentsInput, RoleUncheckedCreateWithoutUser_role_assignmentsInput>
  }

  export type GroupCreateWithoutUser_role_assignmentsInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    context: ContextCreateNestedOneWithoutGroupsInput
    user_groups?: UserGroupCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutUser_role_assignmentsInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    context_id: bigint | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
    user_groups?: UserGroupUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutUser_role_assignmentsInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutUser_role_assignmentsInput, GroupUncheckedCreateWithoutUser_role_assignmentsInput>
  }

  export type RoleUpsertWithoutUser_role_assignmentsInput = {
    update: XOR<RoleUpdateWithoutUser_role_assignmentsInput, RoleUncheckedUpdateWithoutUser_role_assignmentsInput>
    create: XOR<RoleCreateWithoutUser_role_assignmentsInput, RoleUncheckedCreateWithoutUser_role_assignmentsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUser_role_assignmentsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUser_role_assignmentsInput, RoleUncheckedUpdateWithoutUser_role_assignmentsInput>
  }

  export type RoleUpdateWithoutUser_role_assignmentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: RoleUpdateOneWithoutChildrenNestedInput
    children?: RoleUpdateManyWithoutParentNestedInput
    permissions?: RoleHasPermissionUpdateManyWithoutRoleNestedInput
    role_contexts?: RoleContextUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutUser_role_assignmentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: RoleUncheckedUpdateManyWithoutParentNestedInput
    permissions?: RoleHasPermissionUncheckedUpdateManyWithoutRoleNestedInput
    role_contexts?: RoleContextUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type GroupUpsertWithoutUser_role_assignmentsInput = {
    update: XOR<GroupUpdateWithoutUser_role_assignmentsInput, GroupUncheckedUpdateWithoutUser_role_assignmentsInput>
    create: XOR<GroupCreateWithoutUser_role_assignmentsInput, GroupUncheckedCreateWithoutUser_role_assignmentsInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutUser_role_assignmentsInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutUser_role_assignmentsInput, GroupUncheckedUpdateWithoutUser_role_assignmentsInput>
  }

  export type GroupUpdateWithoutUser_role_assignmentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    context?: ContextUpdateOneRequiredWithoutGroupsNestedInput
    user_groups?: UserGroupUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutUser_role_assignmentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    context_id?: BigIntFieldUpdateOperationsInput | bigint | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_groups?: UserGroupUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyContextInput = {
    id?: bigint | number
    type: string
    code: string
    name: string
    description?: string | null
    status?: string
    owner_id?: bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoleContextCreateManyContextInput = {
    role_id: bigint | number
  }

  export type GroupUpdateWithoutContextInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_groups?: UserGroupUpdateManyWithoutGroupNestedInput
    user_role_assignments?: UserRoleAssignmentUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutContextInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_groups?: UserGroupUncheckedUpdateManyWithoutGroupNestedInput
    user_role_assignments?: UserRoleAssignmentUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateManyWithoutContextInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    owner_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleContextUpdateWithoutContextInput = {
    role?: RoleUpdateOneRequiredWithoutRole_contextsNestedInput
  }

  export type RoleContextUncheckedUpdateWithoutContextInput = {
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RoleContextUncheckedUpdateManyWithoutContextInput = {
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UserGroupCreateManyGroupInput = {
    user_id: bigint | number
    joined_at?: Date | string
  }

  export type UserRoleAssignmentCreateManyGroupInput = {
    id?: bigint | number
    user_id: bigint | number
    role_id: bigint | number
    created_at?: Date | string
  }

  export type UserGroupUpdateWithoutGroupInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUncheckedUpdateWithoutGroupInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUncheckedUpdateManyWithoutGroupInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleAssignmentUpdateWithoutGroupInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUser_role_assignmentsNestedInput
  }

  export type UserRoleAssignmentUncheckedUpdateWithoutGroupInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleAssignmentUncheckedUpdateManyWithoutGroupInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateManyParentInput = {
    id?: bigint | number
    code: string
    scope?: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoleHasPermissionCreateManyPermissionInput = {
    role_id: bigint | number
  }

  export type PermissionUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PermissionUpdateManyWithoutParentNestedInput
    role_links?: RoleHasPermissionUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUncheckedUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PermissionUncheckedUpdateManyWithoutParentNestedInput
    role_links?: RoleHasPermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUncheckedUpdateManyWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleHasPermissionUpdateWithoutPermissionInput = {
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type RoleHasPermissionUncheckedUpdateWithoutPermissionInput = {
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RoleHasPermissionUncheckedUpdateManyWithoutPermissionInput = {
    role_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RoleCreateManyParentInput = {
    id?: bigint | number
    code: string
    name?: string | null
    status?: string
    created_user_id?: bigint | number | null
    updated_user_id?: bigint | number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoleHasPermissionCreateManyRoleInput = {
    permission_id: bigint | number
  }

  export type RoleContextCreateManyRoleInput = {
    context_id: bigint | number
  }

  export type UserRoleAssignmentCreateManyRoleInput = {
    id?: bigint | number
    user_id: bigint | number
    group_id: bigint | number
    created_at?: Date | string
  }

  export type RoleUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: RoleUpdateManyWithoutParentNestedInput
    permissions?: RoleHasPermissionUpdateManyWithoutRoleNestedInput
    role_contexts?: RoleContextUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: RoleUncheckedUpdateManyWithoutParentNestedInput
    permissions?: RoleHasPermissionUncheckedUpdateManyWithoutRoleNestedInput
    role_contexts?: RoleContextUncheckedUpdateManyWithoutRoleNestedInput
    user_role_assignments?: UserRoleAssignmentUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateManyWithoutParentInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    updated_user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleHasPermissionUpdateWithoutRoleInput = {
    permission?: PermissionUpdateOneRequiredWithoutRole_linksNestedInput
  }

  export type RoleHasPermissionUncheckedUpdateWithoutRoleInput = {
    permission_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RoleHasPermissionUncheckedUpdateManyWithoutRoleInput = {
    permission_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RoleContextUpdateWithoutRoleInput = {
    context?: ContextUpdateOneRequiredWithoutRole_contextsNestedInput
  }

  export type RoleContextUncheckedUpdateWithoutRoleInput = {
    context_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RoleContextUncheckedUpdateManyWithoutRoleInput = {
    context_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UserRoleAssignmentUpdateWithoutRoleInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutUser_role_assignmentsNestedInput
  }

  export type UserRoleAssignmentUncheckedUpdateWithoutRoleInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    group_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleAssignmentUncheckedUpdateManyWithoutRoleInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    group_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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