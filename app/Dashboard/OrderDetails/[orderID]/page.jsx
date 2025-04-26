import OrderDetails from '../../../../frontend/pages/components/OrderDetails/OrderDetails';
import NavbarBasic from '../../../../frontend/pages/components/NavbarBasic/NavbarBasic';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <NavbarBasic />
      <OrderDetails />
    </>
  );
}
