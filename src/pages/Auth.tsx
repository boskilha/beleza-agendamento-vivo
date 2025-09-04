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
    try {
      // First, register the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) {
        toast.error(authError.message);
        return;
      }

      if (authData.user) {
        // Create the company
        const cnpjNumbers = data.cnpj.replace(/[^\d]/g, '');
        const { data: company, error: companyError } = await supabase
          .from("companies")
          .insert({
            name: data.companyName,
            cnpj: cnpjNumbers,
            email: data.email,
            phone: data.phone,
          })
          .select()
          .single();

        if (companyError) {
          toast.error("Erro ao criar empresa");
          return;
        }

        // Link user to company as owner
        const { error: linkError } = await supabase
          .from("company_users")
          .insert({
            user_id: authData.user.id,
            company_id: company.id,
            role: "owner",
          });

        if (linkError) {
          toast.error("Erro ao vincular usuário à empresa");
          return;
        }

        toast.success("Cadastro realizado com sucesso!");
        navigate("/admin");
      }
    } catch (error) {
      toast.error("Erro ao criar conta");
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