import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield, Check, X } from "lucide-react";
import logo from "@/assets/boboblox-logo.png";

const OAuthConsent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  const responseType = searchParams.get("response_type");
  const state = searchParams.get("state");
  const scope = searchParams.get("scope") || "openid profile email";
  const codeChallenge = searchParams.get("code_challenge");
  const codeChallengeMethod = searchParams.get("code_challenge_method");

  const scopes = scope.split(" ").filter(Boolean);

  const scopeDescriptions: Record<string, string> = {
    openid: "Verify your identity",
    profile: "Access your profile information (username)",
    email: "Access your email address",
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        // Redirect to login, then back here
        const currentUrl = window.location.href;
        navigate(`/auth?redirect=${encodeURIComponent(currentUrl)}`);
      } else {
        setUser(session.user);
      }
      setCheckingAuth(false);
    });
  }, [navigate]);

  const handleApprove = async () => {
    if (!redirectUri) return;
    setLoading(true);

    try {
      // Build the authorization URL and let Supabase handle the OAuth flow
      const params = new URLSearchParams();
      if (responseType) params.set("response_type", responseType);
      if (clientId) params.set("client_id", clientId);
      if (redirectUri) params.set("redirect_uri", redirectUri);
      if (state) params.set("state", state);
      if (scope) params.set("scope", scope);
      if (codeChallenge) params.set("code_challenge", codeChallenge);
      if (codeChallengeMethod) params.set("code_challenge_method", codeChallengeMethod);
      params.set("consent", "approved");

      // Redirect to Supabase OAuth authorize endpoint with consent approved
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://girurweqftroscythxje.supabase.co";
      window.location.href = `${supabaseUrl}/auth/v1/authorize?${params.toString()}`;
    } catch {
      setLoading(false);
    }
  };

  const handleDeny = () => {
    if (redirectUri) {
      const url = new URL(redirectUri);
      url.searchParams.set("error", "access_denied");
      url.searchParams.set("error_description", "The user denied the authorization request");
      if (state) url.searchParams.set("state", state);
      window.location.href = url.toString();
    } else {
      navigate("/");
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!clientId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
          <X className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Invalid Request</h1>
          <p className="text-muted-foreground">Missing required OAuth parameters.</p>
          <Button variant="outline" className="mt-6" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Boboblox" className="h-14 w-auto" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-display font-bold text-foreground">
              Authorization Request
            </h1>
          </div>

          <p className="text-muted-foreground text-center text-sm mb-6">
            An application is requesting access to your Boboblox account
          </p>

          {user && (
            <div className="bg-muted/50 rounded-lg p-3 mb-6 text-center">
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <p className="text-sm font-medium text-foreground">{user.email}</p>
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3">
              This application will be able to:
            </p>
            <ul className="space-y-2">
              {scopes.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  {scopeDescriptions[s] || s}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleApprove}
              className="w-full"
              variant="hero"
              disabled={loading}
            >
              {loading ? "Authorizing..." : "Approve"}
            </Button>
            <Button
              onClick={handleDeny}
              className="w-full"
              variant="outline"
              disabled={loading}
            >
              Deny
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            You can revoke access at any time from your account settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OAuthConsent;
