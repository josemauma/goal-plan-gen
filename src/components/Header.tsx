import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/AuthModal'
import { UserMenu } from '@/components/UserMenu'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export function Header() {
  const { user } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-xl items-center justify-between">
          <div className="flex items-center">
            <a 
              href="/" 
              className="text-xl font-display font-bold text-primary"
              aria-label="NutritionAI Home"
            >
              NutritionAI
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowLoginModal(true)}
                  className="hidden sm:inline-flex"
                >
                  Log in
                </Button>
                <Button 
                  onClick={() => setShowSignupModal(true)}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        type="login"
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onSwitchToSignup={() => {
          setShowLoginModal(false)
          setShowSignupModal(true)
        }}
      />

      <AuthModal
        type="signup"
        open={showSignupModal}
        onOpenChange={setShowSignupModal}
        onSwitchToLogin={() => {
          setShowSignupModal(false)
          setShowLoginModal(true)
        }}
      />
    </>
  )
}