import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield, Check, X, ExternalLink } from "lucide-react";
import logo from "@/assets/boboblox-logo.png";

const OAuthConsent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Standard OAuth params
  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  const responseType = searchParams.get("response_type") || "code";
  const state = searchParams.get("state");
  const scope = searchParams.get("scope") || "openid profile email";
  const codeChallenge = searchParams.get("code_challenge");
  const codeChallengeMethod = searchParams.get("code_challenge_method");

  const scopes = scope.split(" ").filter(Boolean);

  const scopeDescriptions: Record<string, { label: string; desc: string }> = {
    openid: { label: "Identity", desc: "Verify your identity" },
    profile: { label: "Profile", desc: "View your username and profile info" },
    email: { label: "Email", desc: "View your email address" },
  };

  // Extract app name from redirect URI for display (mobile-safe)
  const appDomain = (() => {
    if (!redirectUri) return clientId || "An application";

    try {
      const url = new URL(redirectUri);

      // Web URL → use hostname
      if (url.hostname) return url.hostname;

      // Mobile scheme → use protocol (strip ":")
      if (url.protocol && url.protocol.endsWith(":")) {
        return url.protocol.replace(":", "");
      }
    } catch {
      // Bare mobile identifier like "mycoolmobileapp"
      if (!redirectUri.includes("://")) {
        return redirectUri;
      }
    }

    return clientId || "An application";
  })();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        }
        setCheckingAuth(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        const consentUrl = window.location.pathname + window.location.search;
        navigate(`/auth?redirect=${encodeURIComponent(consentUrl)}`);
      } else {
        setUser(session.user);
      }
      setCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleApprove = async () => {
    if (!redirectUri) return;
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (responseType) params.set("response_type", responseType);
      if (clientId) params.set("client_id", clientId);
      if (redirectUri) params.set("redirect_uri", redirectUri);
      if (state) params.set("state", state);
      if (scope) params.set("scope", scope);
      if (codeChallenge) params.set("code_challenge", codeChallenge);
      if (codeChallengeMethod) params.set("code_challenge_method", codeChallengeMethod);
      params.set("consent", "approved");

      window.location.href = `https://girurweqftroscythxje.supabase.co/auth/v1/authorize/oauth?${params.toString()}`;
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
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="Boboblox" className="h-12 w-auto animate-pulse" />
          <p className="text-muted-foreground text-sm">Verifying your identity...</p>
        </div>
      </div>
    );
  }

  if (!clientId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
          <X className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Invalid Request</h1>
          <p className="text-muted-foreground text-sm">
            This authorization request is missing required parameters. Please return to the application and try again.
          </p>
          <Button variant="outline" className="mt-6" onClick={() => navigate("/")}>
            Go to Boboblox
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <img src={logo} alt="Boboblox" className="h-10 w-auto mx-auto mb-4" />
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">
                  {user?.email?.[0]?.toUpperCase() || "?"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">Boboblox Account</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5">
            <div className="flex items-start gap-3 mb-5">
              <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h1 className="text-base font-semibold text-foreground leading-tight">
                  <span className="text-primary">{appDomain}</span> wants to access your Boboblox account
                </h1>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 mb-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                This will allow the app to:
              </p>
              <ul className="space-y-3">
                {scopes.map((s) => {
                  const info = scopeDescriptions[s];
                  return (
                    <li key={s} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {info?.label || s}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {info?.desc || `Access to ${s}`}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-start gap-2 mb-5 text-xs text-muted-foreground">
              <ExternalLink className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <p>
                After approving, you'll be redirected to{" "}
                <span className="text-foreground font-medium">{appDomain}</span>
              </p>
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleApprove}
                className="w-full"
                variant="hero"
                disabled={loading}
              >
                {loading ? "Authorizing..." : "Allow"}
              </Button>
              <Button
                onClick={handleDeny}
                className="w-full"
                variant="ghost"
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>

          <div className="px-6 py-3 bg-muted/20 border-t border-border">
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              By clicking Allow, you let this app access the info listed above.
              You can revoke access anytime in your{" "}
              <span className="text-primary cursor-pointer hover:underline" onClick={() => window.open("/profile", "_blank")}>
                account settings
              </span>.
            </p>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              const consentUrl = window.location.pathname + window.location.search;
              navigate(`/auth?redirect=${encodeURIComponent(consentUrl)}`);
            }}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Sign in with a different account
          </button>
        </div>
      </div>
    </div>
  );
};

export default OAuthConsent;
