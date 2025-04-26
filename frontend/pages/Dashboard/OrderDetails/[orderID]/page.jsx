import OrderDetails from '../../../components/OrderDetails/OrderDetails';
import NavbarBasic from '../../../components/NavbarBasic/NavbarBasic';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <NavbarBasic />
      <OrderDetails />
    </>
  );
}
