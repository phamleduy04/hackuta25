import { ConvexReactClient } from "convex/react";
import Background from "./components/Background";
import "./index.css";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  useRoutes,
} from 'react-router-dom';
import routes from '~react-pages';

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(routes)}
    </Suspense>
  )
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
createRoot(document.getElementById("root")!).render(
  <>
    <Background />
    <StrictMode>
      <Auth0Provider
        domain="dev-ozpuumiml3s2ke0s.us.auth0.com"
        clientId="P484i9OvzkjVV1hwXKSkhOmHsjuhSITm"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <ConvexProviderWithAuth0 client={convex}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </ConvexProviderWithAuth0>
      </Auth0Provider>
    </StrictMode>
  </>
);
