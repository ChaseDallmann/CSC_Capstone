import NavbarBasic from "../../components/NavbarBasic/NavbarBasic";
import PasswordResetForm from "../../components/PasswordResetForm/PasswordResetForm";

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
