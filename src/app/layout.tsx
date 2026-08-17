// Root layout, used only for the top-level not-found page — every real
// route lives under [locale], which renders its own <html lang="..."> via
// its own root layout (see the comment in [locale]/layout.tsx). This one
// exists solely because Next.js requires a root layout wherever a custom
// not-found.tsx is defined.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
