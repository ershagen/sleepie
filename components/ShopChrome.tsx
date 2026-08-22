import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyCta } from "./StickyCta";

export function ShopChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
      <StickyCta />
    </>
  );
}
