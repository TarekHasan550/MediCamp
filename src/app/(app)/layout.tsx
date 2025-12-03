import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/navbar/Navbar';
import { Fragment } from 'react/jsx-runtime';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}
