// Supabase is currently disabled while the project is configured for future use.

type MockAuthError = { message: string } | null;

type ProjectRow = {
  id?: string;
  slug?: string;
  title?: string;
  client?: string;
  description?: string;
  challenge?: string;
  idea?: string;
  execution?: string;
  outcome?: string;
  category_slug?: string;
  thumbnail?: string;
  video_url?: string;
  featured?: boolean;
  published?: boolean;
  year?: number;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
};

type WritingRow = {
  id?: string;
  slug?: string;
  title?: string;
  category_slug?: string;
  summary?: string;
  thumbnail?: string;
  external_url?: string;
  content?: string;
  featured?: boolean;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
};

type MessageRow = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  is_archived?: boolean;
  created_at?: string;
  [key: string]: unknown;
};

type AwardRow = {
  id?: string;
  title?: string;
  organization?: string;
  year?: number;
  project_title?: string;
  description?: string;
  [key: string]: unknown;
};

type TestimonialRow = {
  id?: string;
  quote?: string;
  author?: string;
  title?: string;
  company?: string;
  avatar_url?: string;
  created_at?: string;
  [key: string]: unknown;
};

type SettingRow = {
  id?: number;
  site_title?: string;
  site_description?: string;
  social_links?: Record<string, unknown>;
  featured_content?: Record<string, unknown>;
  updated_at?: string;
  [key: string]: unknown;
};

type MediaRow = {
  path: string;
};

type TableRowMap = {
  projects: ProjectRow;
  writing: WritingRow;
  messages: MessageRow;
  awards: AwardRow;
  testimonials: TestimonialRow;
  settings: SettingRow;
  project_media: MediaRow;
};

type TableName = keyof TableRowMap;

type QueryResult<T = Record<string, unknown>> = {
  data: T[] | T | null;
  error: MockAuthError;
};

type QueryBuilder<T = Record<string, unknown>> = QueryResult<T> & {
  select: (column?: string) => QueryBuilder<T>;
  order: (column: string, options?: { ascending?: boolean }) => QueryBuilder<T>;
  eq: (column: string, value: unknown) => QueryBuilder<T>;
  insert: (records: T[] | T) => QueryBuilder<T>;
  upsert: (records: T[] | T) => QueryBuilder<T>;
  update: (values: Partial<T>) => QueryBuilder<T>;
  delete: () => QueryBuilder<T>;
  single: () => Promise<{ data: T | null; error: MockAuthError }>;
  then: Promise<QueryResult<T>>["then"];
};

type MockSupabaseClient = {
  auth: {
    getUser: () => Promise<{ data: { user: null }; error: MockAuthError }>;
    getSession: () => Promise<{ data: { session: null }; error: MockAuthError }>;
    signInWithPassword: (credentials: { email: string; password: string }) => Promise<{ data: { user: null }; error: MockAuthError }>;
    signOut: () => Promise<{ error: MockAuthError }>;
  };
  from: <T extends string>(tableName?: T) => QueryBuilder<T extends TableName ? TableRowMap[T] : Record<string, unknown>>;
  storage: {
    from: (bucketName?: string) => {
      upload: (path: string, file: File, options?: Record<string, unknown>) => Promise<{ data: { path: string }; error: MockAuthError }>;
      remove: (paths: string[]) => Promise<{ error: MockAuthError }>;
      getPublicUrl: (path: string) => { data: { publicUrl: string } };
    };
  };
};

export async function createClient(): Promise<MockSupabaseClient> {
  const createQueryBuilder = <T>(): QueryBuilder<T> => {
    const builder: QueryBuilder<T> = {
      data: [],
      error: null,
      select: () => builder,
      order: () => builder,
      eq: () => builder,
      insert: () => builder,
      upsert: () => builder,
      update: () => builder,
      delete: () => builder,
      single: async () => ({ data: null, error: null }),
      then: (onFulfilled, onRejected) =>
        Promise.resolve({ data: builder.data, error: builder.error }).then(onFulfilled, onRejected),
    };
    return builder;
  };

  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async (credentials: { email: string; password: string }) => {
        void credentials;
        return { data: { user: null }, error: null };
      },
      signOut: async () => ({ error: null }),
    },
    from: () => createQueryBuilder(),
    storage: {
      from: () => ({
        upload: async (...args: [string, File, Record<string, unknown>?]) => {
          void args;
          return { data: { path: args[0] }, error: null };
        },
        remove: async (...args: [string[]]) => {
          void args;
          return { error: null };
        },
        getPublicUrl: (path: string) => ({ data: { publicUrl: `https://example.com/${path}` } }),
      }),
    },
  } as unknown as MockSupabaseClient;
}
