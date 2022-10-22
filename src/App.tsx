import { Suspense, useRef, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "./Fallback";
import { auth, AuthData } from "./auth";
import { PageLoader } from "./PageLoader";

type Store = {
  user: Promise<AuthData | null> | AuthData | null;
  status: () => "pending" | "loggedOut" | "loggedIn";
};

export const store = proxy<Store>({
  user: auth.refresh(),
  status() {
    return this.user instanceof Promise
      ? "pending"
      : this.user === null
      ? "loggedOut"
      : "loggedIn";
  }
});

const LoginPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (error) setError(null);
    const formData = event.target.elements;
    store.user = auth
      .login(formData.username.value, formData.password.value)
      .catch(() => {
        setError("Wrong username and password");
        return null;
      });
    formRef.current?.reset();
  };

  return (
    <main
      style={{
        margin: "auto",
        maxWidth: "300px"
      }}
    >
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        style={{
          display: "grid",
          gap: "20px"
        }}
      >
        <input type="text" placeholder="Enter Username" name="username" />
        <small style={{ color: "var(--text-muted)", marginBottom: "-12px" }}>
          Hint: include "happy" in password
        </small>
        <input type="password" placeholder="Enter Password" name="password" />
        {error && <span style={{ color: "goldenrod" }}>{error}</span>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

const App = () => {
  const snap = useSnapshot(store);

  if (snap.status() === "loggedOut") {
    return <LoginPage />;
  }
  return (
    <main>
      <nav
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h3>Hi {snap.user?.name}!</h3>
        <button
          onClick={() => {
            auth.logout();
            store.user = null;
          }}
        >
          Logout
        </button>
      </nav>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Suspense fallback={<PageLoader />}>
          <p>
            Welcome, your role is <strong>{snap.user?.role}</strong>
          </p>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default App;
