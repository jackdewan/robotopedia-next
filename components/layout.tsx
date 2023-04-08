import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import Container from "./container";
import Link from "next/link";
import Dog from "./Dog";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <header className="mb-10">
          <Container>
            <div className="flex justify-between items-center mb-2 h-14">
              <Link
                href="/"
                className="text-2xl md:text-2xl font-bold tracking-tighter leading-tight md:pr-8"
              >
                Robotopedia
              </Link>
              <Link
                href="/articles"
                className="hover:underline md:text-2xl tracking-tighter leading-tight"
              >
                Articles
              </Link>
            </div>
          </Container>
        </header>
        {/* <Container>
          <div>
            Sharing the world's knowledge on industrial robots and automation.
          </div>
        </Container> */}
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
