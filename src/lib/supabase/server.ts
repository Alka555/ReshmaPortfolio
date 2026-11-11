// Supabase is currently disabled while the project is configured for future use.

type MockSupabaseClient = {
  auth: {
    getUser: () => Promise<{ data: { user: null }; error: null }>;
    getSession: () => Promise<{ data: { session: null }; error: null }>;
    signInWithPassword: () => Promise<{ data: null; error: null }>;
    signOut: () => Promise<{ error: null }>;
  };
  from: () => {
    select: () => { order: () => Promise<{ data: never[]; error: null }> };
    insert: () => Promise<{ data: null; error: null }>;
    update: () => Promise<{ data: null; error: null }>;
    delete: () => Promise<{ error: null }>;
  };
  storage: {
    from: () => {
      upload: () => Promise<{ data: null; error: null }>;
      remove: () => Promise<{ error: null }>;
      getPublicUrl: () => { data: { publicUrl: string } };
    };
  };
};

export async function createClient(): Promise<MockSupabaseClient> {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({ order: async () => ({ data: [], error: null }) }),
      insert: async () => ({ data: null, error: null }),
      update: async () => ({ data: null, error: null }),
      delete: async () => ({ error: null }),
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        remove: async () => ({ error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
  };
}
