import './globals.css';

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME ?? 'LinkPost Studio',
  description: 'Generate polished LinkedIn posts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 font-sans antialiased">
        {/* Full width wrapper */}
        <div className="flex flex-col min-h-screen">
          {/* Main content */}
          <main className="flex-1 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
