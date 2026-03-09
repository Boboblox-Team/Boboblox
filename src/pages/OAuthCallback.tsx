import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const OAuthCallback = () => {
  useEffect(() => {
    // Extract tokens from URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      // Set session in this window's supabase client
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(() => {
        // Post tokens back to opener (the iframe)
        if (window.opener) {
          window.opener.postMessage(
            { type: "oauth-complete", access_token: accessToken, refresh_token: refreshToken },
            "*"
          );
          window.close();
        }
      });
    } else {
      // Fallback: maybe code flow, just close
      if (window.opener) {
        window.opener.postMessage({ type: "oauth-complete" }, "*");
        window.close();
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Completing sign in...</p>
    </div>
  );
};

export default OAuthCallback;
