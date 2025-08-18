import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { Chrome } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

const signupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-zA-Z])/, 'Password must contain at least one letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val, 'You must accept the terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type LoginForm = z.infer<typeof loginSchema>
type SignupForm = z.infer<typeof signupSchema>

interface AuthModalProps {
  type: 'login' | 'signup'
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToSignup?: () => void
  onSwitchToLogin?: () => void
}

export function AuthModal({ 
  type, 
  open, 
  onOpenChange, 
  onSwitchToSignup, 
  onSwitchToLogin 
}: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const isLogin = type === 'login'
  const schema = isLogin ? loginSchema : signupSchema

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: isLogin 
      ? { email: '', password: '', rememberMe: false }
      : { name: '', email: '', password: '', confirmPassword: '', acceptTerms: false }
  })

  const onSubmit = async (data: LoginForm | SignupForm) => {
    setLoading(true)
    try {
      if (isLogin) {
        const loginData = data as LoginForm
        await signIn(loginData.email, loginData.password)
        toast({
          title: "Welcome back!",
          description: "You're in! Welcome to NutritionAI.",
        })
      } else {
        const signupData = data as SignupForm
        await signUp(signupData.email, signupData.password, signupData.name)
        toast({
          title: "Account created!",
          description: "You're in! Welcome to NutritionAI.",
        })
      }
      onOpenChange(false)
      form.reset()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error.message || "Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error.message || "Please try again.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isLogin ? 'Log in to NutritionAI' : 'Create your NutritionAI account'}
          </DialogTitle>
          <DialogDescription>
            {isLogin 
              ? 'Welcome back! Choose Google or use your email.' 
              : 'Start in seconds — Google or email + password.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleAuth}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  placeholder="Enter your name"
                  autoComplete="name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...form.register('email')}
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...form.register('password')}
                type="password"
                placeholder="Enter your password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  {...form.register('confirmPassword')}
                  type="password"
                  placeholder="Confirm your password"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe" 
                  {...form.register('rememberMe')}
                />
                <Label htmlFor="rememberMe" className="text-sm">
                  Remember me
                </Label>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptTerms" 
                  {...form.register('acceptTerms')}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  I accept the Terms and Privacy Policy
                </Label>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Log in' : 'Create account')}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={isLogin ? onSwitchToSignup : onSwitchToLogin}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}