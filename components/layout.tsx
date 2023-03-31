import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import Container from "./container";
import Link from "next/link";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <header className="">
          <Container>
            <div className="flex justify-end items-center h-14 lg:h-20">
              <Link href="/articles" className="hover:underline">
                Articles
              </Link>
            </div>
          </Container>
        </header>
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
