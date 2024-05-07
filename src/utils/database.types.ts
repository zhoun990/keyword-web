export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      decrypted_users: {
        Row: {
          created_at: string
          id: number
          keyword_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          keyword_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          keyword_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_decrypted_users_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_decrypted_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      keywords: {
        Row: {
          checker: string
          encrypted: string
          id: number
          timestamp: string
          user_id: string
        }
        Insert: {
          checker?: string
          encrypted?: string
          id?: number
          timestamp?: string
          user_id?: string
        }
        Update: {
          checker?: string
          encrypted?: string
          id?: number
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_keywords_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string | null
          dependant: number | null
          id: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          dependant?: number | null
          id?: never
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          dependant?: number | null
          id?: never
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_posts_dependant_fkey"
            columns: ["dependant"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reacted_users: {
        Row: {
          created_at: string
          id: number
          reaction_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          reaction_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          reaction_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_reacted_users_reaction_id_fkey"
            columns: ["reaction_id"]
            isOneToOne: false
            referencedRelation: "reactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_reacted_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reactions: {
        Row: {
          content: string
          count: number
          created_at: string
          id: number
          post_id: number
          updated_at: string | null
        }
        Insert: {
          content?: string
          count?: number
          created_at?: string
          id?: number
          post_id: number
          updated_at?: string | null
        }
        Update: {
          content?: string
          count?: number
          created_at?: string
          id?: number
          post_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          created_at: string | null
          id: string
          name: string
          profile_photo_url: string | null
          username: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id?: string
          name: string
          profile_photo_url?: string | null
          username: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: string
          name?: string
          profile_photo_url?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_keyword: {
        Args: {
          keyword: string
        }
        Returns: undefined
      }
      create_post: {
        Args: {
          content: string
          dependant_id: string
          keyword: string
        }
        Returns: Json
      }
      create_user: {
        Args: {
          arg: Json
        }
        Returns: Json
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
      decrypt_keyword: {
        Args: {
          keyword: string
          target_user_id: string
        }
        Returns: boolean
      }
      generate_username: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
