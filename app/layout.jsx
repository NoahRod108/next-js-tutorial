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
        <body className="flex w-full">
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