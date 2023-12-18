// Type definitions for Mongoose 6.x
// Definitions by ISW Huddo
// TypeScript Version: 4.8

/// <reference types="mongodb" />

declare module "mongoose" {
  import mongodb = require("mongodb");

  export class Schema {
    static Types: {
      ObjectId: mongodb.ObjectId;
      Mixed: any;
    };
    constructor(
      definition: object,
      options?: { timestamps?: object; toJSON?: object }
    );
    index(keys: object, options?: object): void;
    virtual(key: string): {
      get: (func: () => any) => void;
      // set?: (value: any) => void;
    };
    virtual(
      key: string,
      options: {
        ref: string;
        localField: string;
        foreignField: string;
        justOne?: boolean;
        count?: boolean;
        match?: object;
        options?: object;
      }
    ): void;
    methods: {
      [key: string]: (...args: any[]) => any;
    };
    pre(key: string, cb: (next: () => void) => void): void;
  }

  export class Document<T> {
    constructor(data: Partial<T>);
    save(): Promise<this>;
    deleteOne(): Promise<DeletedResult>;
    updateOne(update: object): Promise<this>;
    isSelected(key: string): boolean;
    isModified(key?: string): boolean;
    isNew: boolean;
    toJSON(): Partial<T>;
  }

  export type HydratedDocument<T> = Document<T> & T;

  interface PopulateOptions {
    path: string;
    select: string;
    // do not make this recursive, performance issues
    populate?: object[];
  }

  interface SingleQuery<T> {
    select(key: string): SingleQuery<T>;
    populate<O>(
      path: string,
      select?: string
    ): SingleQuery<Omit<T, keyof O> & O>;
    populate<O>(options: PopulateOptions): SingleQuery<Omit<T, keyof O> & O>;
    lean(): {
      exec(): Promise<T>;
    };
    exec(): Promise<HydratedDocument<T>>;
  }

  interface MultiQuery<T> {
    cursor(): mongodb.Cursor<T>;
    select(key: string): MultiQuery<T>;
    sort(key: string | object): MultiQuery<T>;
    limit(limit: number): MultiQuery<T>;
    populate<O>(
      path: string,
      select?: string
    ): MultiQuery<Omit<T, keyof O> & O>;
    populate<O>(options: PopulateOptions): MultiQuery<Omit<T, keyof O> & O>;
    lean(): {
      exec(): Promise<T[]>;
    };
    exec(): Promise<Array<HydratedDocument<T>>>;
  }

  interface InsertedResult {
    insertedCount: number; // Number of documents inserted
    insertedId: null | mongodb.ObjectId; // null or an id containing a document that had to be upserted.
  }

  interface UpdatedResult {
    matchedCount: number; // Number of documents matched
    modifiedCount: number; // Number of documents modified
    acknowledged: boolean; // Boolean indicating everything went smoothly.
    upsertedId: null | mongodb.ObjectId; // null or an id containing a document that had to be upserted.
    upsertedCount: number; // Number indicating how many documents had to be upserted. Will either be 0 or 1.
  }

  interface DeletedResult {
    deletedCount: number; // Number of documents deleted
  }

  interface BulkWriteOpResult
    extends InsertedResult,
      UpdatedResult,
      DeletedResult {
    result: object;
  }

  interface MutationQuery {
    exec(): Promise<UpdatedResult>;
  }

  interface DeletionQuery {
    exec(): Promise<DeletedResult>;
  }

  export interface Model<T> {
    new (data: object): HydratedDocument<T>;
    syncIndexes(): Promise<void>;
    on(key: string, cb: (error?: object) => void): void;
    find(query: object, select?: string, options?: object): MultiQuery<T>;
    findOne(query: object, select?: string, options?: object): SingleQuery<T>;
    findOneAndDelete(query: object, options?: object): SingleQuery<T>;
    findOneAndUpdate(
      query: object,
      update: object,
      options?: object
    ): SingleQuery<T>;
    findById(id: string | mongodb.ObjectId, options?: object): SingleQuery<T>;
    findByIdAndUpdate(
      id: string | mongodb.ObjectId,
      update: object,
      options?: object
    ): SingleQuery<T>;
    findByIdAndDelete(
      id: string | mongodb.ObjectId,
      options?: object
    ): SingleQuery<T>;
    create(doc: object, options?: object): Promise<HydratedDocument<T>>;
    updateOne(query: object, update: object, options?: object): MutationQuery;
    updateMany(query: object, update: object, options?: object): MutationQuery;
    deleteOne(query: object, options?: object): DeletionQuery;
    deleteMany(query: object, options?: object): DeletionQuery;
    countDocuments(query: object): { exec(): Promise<number> };
    aggregate(pipeline: object[]): Promise<any[]>;

    insertMany(docs: Partial<T>[], options?: object): Promise<T<>>;
    bulkWrite(ops: Array<object>, options?: object): Promise<BulkWriteOpResult>;
    collection: mongodb.Collection;
    // basic patch
    schema: {
      eachPath: (
        fn: (pathname: string, schemaType: { options?: any }) => void
      ) => void;
    };
  }

  namespace mongoose {
    function connect(uri: string, options?: any): Promise<any>;
    function disconnect(): Promise<void>;

    // eslint-disable-next-line no-use-before-define
    const connection: Connection;

    class Connection {
      readyState: number;
      host: string;
      on(eventName: string, cb: (data?: object) => void): void;
      off(eventName: string, cb: (data?: object) => void): void;
      close(force?: boolean): Promise<void>;
    }

    namespace Types {
      export class ObjectId extends mongodb.ObjectId {}
    }

    export function model<T>(
      name: string,
      schema: Schema,
      collection?: string
    ): Model<T>;
  }

  export default mongoose;
}
