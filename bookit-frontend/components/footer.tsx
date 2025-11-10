export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-6 bg-[#F7F7F7] text-gray-600 text-sm">
      © {year} BookIt. All rights reserved.
    </footer>
  );
}
