import { useRef } from "react"
import MainLayout from "./components/Layouts/MainLayout"
import ChatInterface, { ChatInterfaceRef } from "./components/chatInterface/ChatInterface"
import Header from "./components/header/Header"
import { ChatContext } from "./contexts"
import { Provider } from 'react-redux'
import { store } from "./store"
import './css/main.scss'

function App() {

  const chatInterfaceRef = useRef<ChatInterfaceRef>(null!)

  return (
    <Provider store={store}>
      <ChatContext
        value={{
          prompt: (value) => chatInterfaceRef.current?.prompt(value),
          clearChatHistory: async () => await chatInterfaceRef.current?.clearHistory()
        }}
      >
        <MainLayout
          header={<Header />}
        >
          <div className="chat-container">
            <ChatInterface
              ref={chatInterfaceRef}
            />
          </div>
        </MainLayout>
      </ChatContext>
    </Provider>
  )
}

export default App
