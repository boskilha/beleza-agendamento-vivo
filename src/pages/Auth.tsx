import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

// Helper function to validate CNPJ
const validateCNPJ = (cnpj: string): boolean => {
  const numbers = cnpj.replace(/[^\d]/g, '');
  
  if (numbers.length !== 14) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(numbers)) return false;
  
  // Validate first check digit
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(numbers[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(numbers[12]) !== digit1) return false;
  
  // Validate second check digit
  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(numbers[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(numbers[13]) === digit2;
};

// Helper function to format CNPJ
const formatCNPJ = (value: string): string => {
  const numbers = value.replace(/[^\d]/g, '');
  return numbers
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

const registerSchema = z.object({
  companyName: z.string().min(2, "Nome da empresa é obrigatório"),
  cnpj: z.string()
    .min(1, "CNPJ é obrigatório")
    .refine((cnpj) => validateCNPJ(cnpj), "CNPJ inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cnpjValue, setCnpjValue] = useState("");
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/admin");
      }
    };
    checkUser();
  }, [navigate]);

  const onLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login realizado com sucesso!");
      navigate("/admin");
    } catch (error) {
      toast.error("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormValues) => {
    setIsLoading(true);
    console.log("🔵 Iniciando processo de cadastro:", { email: data.email, companyName: data.companyName });
    
    try {
      // First, register the user
      console.log("🔵 Criando usuário no Supabase Auth...");
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) {
        console.error("❌ Erro na criação do usuário:", authError);
        
        // Handle specific auth errors
        if (authError.message.includes("rate_limit") || authError.message.includes("429")) {
          toast.error("Muitas tentativas de cadastro. Aguarde alguns minutos e tente novamente.");
        } else if (authError.message.includes("User already registered")) {
          toast.error("Este email já está cadastrado. Tente fazer login.");
        } else {
          toast.error(`Erro de autenticação: ${authError.message}`);
        }
        return;
      }

      if (!authData.user) {
        console.error("❌ Usuário não foi criado corretamente");
        toast.error("Erro: usuário não foi criado. Tente novamente.");
        return;
      }

      console.log("✅ Usuário criado com sucesso:", authData.user.id);

      // Create the company
      console.log("🔵 Criando empresa...");
      const cnpjNumbers = data.cnpj.replace(/[^\d]/g, '');
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .insert({
          name: data.companyName,
          cnpj: cnpjNumbers,
          email: data.email,
          phone: data.phone || null,
        })
        .select()
        .single();

      if (companyError) {
        console.error("❌ Erro ao criar empresa:", companyError);
        
        // Handle specific company creation errors
        if (companyError.message.includes("row-level security")) {
          toast.error("Erro de permissão ao criar empresa. Contate o suporte.");
        } else if (companyError.message.includes("unique")) {
          toast.error("CNPJ ou email já cadastrado. Verifique os dados.");
        } else {
          toast.error(`Erro ao criar empresa: ${companyError.message}`);
        }
        return;
      }

      if (!company) {
        console.error("❌ Empresa não foi criada corretamente");
        toast.error("Erro: empresa não foi criada. Tente novamente.");
        return;
      }

      console.log("✅ Empresa criada com sucesso:", company.id);

      // Link user to company as owner
      console.log("🔵 Vinculando usuário à empresa...");
      const { error: linkError } = await supabase
        .from("company_users")
        .insert({
          user_id: authData.user.id,
          company_id: company.id,
          role: "owner",
        });

      if (linkError) {
        console.error("❌ Erro ao vincular usuário à empresa:", linkError);
        
        if (linkError.message.includes("row-level security")) {
          toast.error("Erro de permissão ao vincular usuário. Contate o suporte.");
        } else {
          toast.error(`Erro ao vincular usuário: ${linkError.message}`);
        }
        return;
      }

      console.log("✅ Usuário vinculado à empresa com sucesso");
      console.log("✅ Cadastro completo realizado com sucesso!");
      
      toast.success("Cadastro realizado com sucesso! Verifique seu email para confirmação.");
      
      // Wait a bit for auth state to update, then redirect
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
      
    } catch (error) {
      console.error("❌ Erro geral no cadastro:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Erro ao criar conta: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Cadastrar Empresa</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Entrar na sua conta</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...loginForm.register("email")}
                      />
                      {loginForm.formState.errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        {...loginForm.register("password")}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive mt-1">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Cadastrar Empresa</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input
                        id="companyName"
                        {...registerForm.register("companyName")}
                      />
                      {registerForm.formState.errors.companyName && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.companyName.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        placeholder="00.000.000/0000-00"
                        value={cnpjValue}
                        onChange={(e) => {
                          const formatted = formatCNPJ(e.target.value);
                          setCnpjValue(formatted);
                          registerForm.setValue("cnpj", formatted, { shouldValidate: true });
                        }}
                        maxLength={18}
                      />
                      {registerForm.formState.errors.cnpj && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.cnpj.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="registerEmail">Email</Label>
                      <Input
                        id="registerEmail"
                        type="email"
                        {...registerForm.register("email")}
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Telefone (opcional)</Label>
                      <Input
                        id="phone"
                        {...registerForm.register("phone")}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="registerPassword">Senha</Label>
                      <Input
                        id="registerPassword"
                        type="password"
                        {...registerForm.register("password")}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...registerForm.register("confirmPassword")}
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Cadastrando..." : "Cadastrar Empresa"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;