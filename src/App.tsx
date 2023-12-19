import MainLayout from "./components/Layouts/MainLayout"
import ChatInterface from "./components/chatInterface/ChatInterface"
import Header from "./components/header/Header"
import ThemeContext, { Theme } from "./contexts/ThemeContext"
import { Provider } from 'react-redux'
import { store } from "./store"
import './css/main.scss'

function App() {

  return (
    <Provider store={store}>
      <ThemeContext value={Theme.DARK}>
        <MainLayout
          header={<Header/>}
        >
          <div className="chat-container">
            <ChatInterface/>
          </div>
        </MainLayout>
      </ThemeContext>
    </Provider>
  )
}

export default App
