import GlobalNavigation from '@/components/Layout/GlobalNavigation';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalNavigation />
      {children}
    </>
  );
}