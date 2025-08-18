import { createContext, useContext, useState } from 'react'

interface MockUser {
  id: string
  email: string
  user_metadata: {
    full_name?: string
  }
}

interface AuthContextType {
  user: MockUser | null
  loading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(false)

  const signUp = async (email: string, password: string, name?: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: MockUser = {
      id: 'mock-user-id',
      email,
      user_metadata: {
        full_name: name,
      },
    }
    setUser(mockUser)
  }

  const signIn = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: MockUser = {
      id: 'mock-user-id',
      email,
      user_metadata: {
        full_name: 'John Doe',
      },
    }
    setUser(mockUser)
  }

  const signInWithGoogle = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: MockUser = {
      id: 'mock-user-id',
      email: 'john.doe@gmail.com',
      user_metadata: {
        full_name: 'John Doe',
      },
    }
    setUser(mockUser)
  }

  const signOut = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser(null)
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}