import { Layout } from '@/components/Layout';
import { ScrollToTop } from '@/components/ScrollToTop';
import '@/index.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ScrollToTop />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
