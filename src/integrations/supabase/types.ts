export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          id: string
          nome: string
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          asaas_customer: string | null
          asaas_id: string | null
          asaas_link: string | null
          boleto_url: string | null
          campaign: string | null
          created_at: string
          donor_cpf: string
          donor_email: string
          donor_name: string
          donor_phone: string | null
          id: string
          invoice_url: string | null
          payment_method: string
          pix_payload: string | null
          pix_qrcode: string | null
          project_id: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          asaas_customer?: string | null
          asaas_id?: string | null
          asaas_link?: string | null
          boleto_url?: string | null
          campaign?: string | null
          created_at?: string
          donor_cpf: string
          donor_email: string
          donor_name: string
          donor_phone?: string | null
          id?: string
          invoice_url?: string | null
          payment_method: string
          pix_payload?: string | null
          pix_qrcode?: string | null
          project_id?: string | null
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          asaas_customer?: string | null
          asaas_id?: string | null
          asaas_link?: string | null
          boleto_url?: string | null
          campaign?: string | null
          created_at?: string
          donor_cpf?: string
          donor_email?: string
          donor_name?: string
          donor_phone?: string | null
          id?: string
          invoice_url?: string | null
          payment_method?: string
          pix_payload?: string | null
          pix_qrcode?: string | null
          project_id?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      eventos: {
        Row: {
          created_at: string
          data_evento: string
          descricao: string | null
          galeria: string[] | null
          id: string
          imagem_destaque: string | null
          local: string | null
          slug: string
          status: string
          titulo: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          data_evento: string
          descricao?: string | null
          galeria?: string[] | null
          id?: string
          imagem_destaque?: string | null
          local?: string | null
          slug: string
          status?: string
          titulo: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          data_evento?: string
          descricao?: string | null
          galeria?: string[] | null
          id?: string
          imagem_destaque?: string | null
          local?: string | null
          slug?: string
          status?: string
          titulo?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          autor: string | null
          categoria: string | null
          conteudo: string | null
          created_at: string
          data_publicacao: string
          id: string
          imagem_destaque: string | null
          resumo: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          titulo: string
          updated_at: string
        }
        Insert: {
          autor?: string | null
          categoria?: string | null
          conteudo?: string | null
          created_at?: string
          data_publicacao?: string
          id?: string
          imagem_destaque?: string | null
          resumo?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          titulo: string
          updated_at?: string
        }
        Update: {
          autor?: string | null
          categoria?: string | null
          conteudo?: string | null
          created_at?: string
          data_publicacao?: string
          id?: string
          imagem_destaque?: string | null
          resumo?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      projetos: {
        Row: {
          categoria: string | null
          conteudo: string | null
          created_at: string
          featured: boolean
          galeria: string[] | null
          id: string
          imagem_destaque: string | null
          impacto: string | null
          ordem: number
          resumo: string | null
          slug: string
          status: string
          titulo: string
          updated_at: string
        }
        Insert: {
          categoria?: string | null
          conteudo?: string | null
          created_at?: string
          featured?: boolean
          galeria?: string[] | null
          id?: string
          imagem_destaque?: string | null
          impacto?: string | null
          ordem?: number
          resumo?: string | null
          slug: string
          status?: string
          titulo: string
          updated_at?: string
        }
        Update: {
          categoria?: string | null
          conteudo?: string | null
          created_at?: string
          featured?: boolean
          galeria?: string[] | null
          id?: string
          imagem_destaque?: string | null
          impacto?: string | null
          ordem?: number
          resumo?: string | null
          slug?: string
          status?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      projects: {
        Row: {
          cover_image: string | null
          id: string | null
          name: string | null
          short_description: string | null
          slug: string | null
          status: string | null
        }
        Insert: {
          cover_image?: string | null
          id?: string | null
          name?: string | null
          short_description?: string | null
          slug?: string | null
          status?: string | null
        }
        Update: {
          cover_image?: string | null
          id?: string | null
          name?: string | null
          short_description?: string | null
          slug?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
