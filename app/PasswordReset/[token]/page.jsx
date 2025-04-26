import NavbarBasic from "../../../frontend/pages/components/NavbarBasic/NavbarBasic";
import PasswordResetForm from "../../../frontend/pages/components/PasswordResetForm/PasswordResetForm";

export const dynamic = 'force-dynamic'; // Enable SSR

export default function PasswordResetPage({ params }) {
  const { token } = params;

  return (
    <>
      <NavbarBasic />
      <PasswordResetForm token={token} />
    </>
  );
}
