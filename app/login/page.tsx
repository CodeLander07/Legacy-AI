import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">
          <AuthForm type="login" />
        </div>
      </div>
    </main>
  );
}
