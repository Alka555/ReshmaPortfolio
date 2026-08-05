// Supabase is currently disabled while the project is configured for future use.

export async function createClient() {
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
  } as any;
}
