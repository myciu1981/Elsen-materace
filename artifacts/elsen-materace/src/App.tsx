import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Thanks from '@/pages/Thanks';
import Privacy from '@/pages/Privacy';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-serif text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Nie znaleziono takiej strony.</p>
      <a href="/" className="text-primary hover:underline">Wróć na stronę główną</a>
    </div>
  );
}

interface AppProps {
  /** Ustawiane wyłącznie przy prerenderowaniu — w przeglądarce trasę czyta wouter z adresu. */
  ssrPath?: string;
}

function App({ ssrPath }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')} ssrPath={ssrPath}>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/dziekujemy" component={Thanks} />
            <Route path="/polityka-prywatnosci" component={Privacy} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </WouterRouter>
      <Toaster position="bottom-center" richColors />
    </QueryClientProvider>
  );
}

export default App;
