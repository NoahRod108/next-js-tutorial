import '@styles/globals.css';
import Nav from '@components/Nav';
import SideNav from '@components/SideNav';
import Provider from '@components/Provider';

export const metadata = {
    title: "promptopia",
    description: "Discover & Share AI prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body className="flex max-sm:flex-col w-full font-inter bg-[#f3f3f3]">
            <Provider>
              <SideNav />

              <main className="app">
                <Nav />
                {children}
              </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout