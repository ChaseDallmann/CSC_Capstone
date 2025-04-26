import NavbarBasic from "../../components/NavbarBasic/NavbarBasic";
import PasswordResetForm from "../../components/PasswordResetForm/PasswordResetForm";
import { useRouter } from 'next/router';

export const dynamic = 'force-dynamic';

export default function PasswordResetPage() {
  // In Pages Router, we use useRouter to get the token
  const router = useRouter();
  const { token } = router.query;

  return (
    <>
      <NavbarBasic />
      <PasswordResetForm token={token} />
    </>
  );
}
