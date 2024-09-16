import '../styles/globals.css';
import Nav from '../components/Nav';
import Provider from '../components/Provider';

export const metadata = {
    title: "Chat App",
    decription: "Let's connect and chat"
}

const RootLayout = ({ children }) => (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
  
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );

export default RootLayout