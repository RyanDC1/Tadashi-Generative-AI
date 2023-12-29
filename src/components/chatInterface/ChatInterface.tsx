import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { notification } from 'antd'
import { useStore } from 'react-redux'
import PromptEditor, { PromptEditorRef } from './PromptEditor'
import { ChatService } from '../../services/ChatService'
import { ChatActorType, ChatRequest, DialogType } from '../../models'
import DialogFlow from './dialog/DialogFlow'
import { defaultAPIFailedDialog, defaultResponseFallback } from '../../utils'
import { StoreReducerType } from '../../store'
import PromptSamples from './PromptSamples'

type Props = {}

export type ChatInterfaceRef = {
  prompt: (value: string) => void,
  clearHistory: () => Promise<void>
}

const ChatInterface = forwardRef<ChatInterfaceRef, Props>((_props, ref) => {

  const store = useStore<StoreReducerType>()

  const [dialog, setDialog] = useState<DialogType[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const promptEditorRef = useRef<PromptEditorRef>()

  useImperativeHandle(ref, () => (
    {
      clearHistory: () => !isFetching ? Promise.resolve(setDialog([])) : Promise.reject(),
      prompt: (value) => promptAssistant(value)
    }
  ), [isFetching])

  return (
    <div className='chat-interface'>
      <div className='intro'>
        <PromptSamples
          onSelect={(prompt) => promptEditorRef.current.setValue(prompt)}
        />
      </div>
      <div className='dialog-container'>
        <DialogFlow
          dialog={dialog}
          loading={isFetching}
        />
      </div>
      <div className='prompt-container sticky-footer'>
        <PromptEditor
          ref={promptEditorRef}
          onSend={promptAssistant}
          disabled={isFetching}
        />
      </div>
    </div>
  )

  function promptAssistant(prompt: string) {
    setDialog((dialog) => (
      [
        ...dialog,
        {
          id: dialog.length + 1,
          author: ChatActorType.USER,
          content: prompt,
          date: new Date()
        }
      ]
    ))

    const history: ChatRequest['history'] = dialog.map(s => (
      {
        parts: [{
          text: s.content
        }],
        role: s.author
      }
    ))

    const { configReducer: config } = store.getState()

    setIsFetching(true)
    ChatService.getPromptResponse({ prompt, history, temperature: config.chatMode })
      .then((response) => {

        const generatedResponse = response?.candidates?.[0]?.content?.parts?.[0]?.text ?? defaultResponseFallback
        setDialog((dialog) => (
          [
            ...dialog,
            {
              id: dialog.length + 1,
              author: ChatActorType.AI,
              content: typeof (generatedResponse) === 'string' ? generatedResponse : defaultResponseFallback,
              date: new Date()
            }
          ]
        ))
      })
      .catch(() => {
        setDialog((dialog) => (
          [
            ...dialog,
            {
              id: dialog.length + 1,
              author: ChatActorType.AI,
              content: defaultAPIFailedDialog,
              date: new Date()
            }
          ]
        ))
        notification.error({
          message: 'API Failed',
          description: 'An error occurred while fetching response, network error / Token exhausted / Invalid API key'
        })
      })
      .finally(() => {
        setIsFetching(false)

        // allow time for editor to be enabled
        setTimeout(() => {
          promptEditorRef.current.focus()
        }, 20);
      })
  }
})

export default ChatInterface