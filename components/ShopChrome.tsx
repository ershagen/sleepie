import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyCta } from "./StickyCta";
import { CartDrawer } from "./CartDrawer";

export function ShopChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
      <StickyCta />
      <CartDrawer />
    </>
  );
}
