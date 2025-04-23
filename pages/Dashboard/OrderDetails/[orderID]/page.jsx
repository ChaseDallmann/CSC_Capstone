import OrderDetails from '../../OrderDetails/OrderDetails';
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
