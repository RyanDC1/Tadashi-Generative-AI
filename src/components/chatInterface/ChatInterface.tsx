import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { notification } from 'antd'
import { useStore } from 'react-redux'
import PromptEditor, { PromptEditorRef } from './editor/PromptEditor'
import { ChatService } from '../../services/ChatService'
import { ChatActorType, ChatRequest, DialogType } from '../../models'
import DialogFlow from './dialog/DialogFlow'
import { defaultAPIFailedDialog, defaultResponseFallback } from '../../utils'
import { StoreReducerType } from '../../store'
import PromptSamples from './PromptSamples'
import Fade from 'react-reveal/Fade';
import { isEmpty } from 'lodash'

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
    <div id='chat-scroll-container' className='chat-interface'>
      <div className='intro'>
        <Fade
          collapse
          opposite
          bottom
          duration={400}
          delay={0}
          when={dialog.length === 0}
        >
          <PromptSamples
            onSelect={(prompt) => promptEditorRef.current.setValue(prompt)}
          />
        </Fade>
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

  function getHistory(limit?: number) {

    const history: ChatRequest['history'] = dialog.slice(0, limit).map(dialogContent => {

      const imageData = dialogContent.images?.map?.(image => {
        const mimeType = image.slice(0, image.indexOf(';')).replace('data:', '')
        return {
          inline_data: {
            mime_type: mimeType,
            data: image.slice(image.indexOf(',') + 1)
          }
        }
      }).filter(image => isEmpty(image))

      return {
        parts: [
          ...(imageData || []),
          {
            text: dialogContent.content
          }
        ].filter(content => !isEmpty(content)),
        role: dialogContent.author
      }
    })

    return history
  }

  function promptAssistant(prompt: string, images: string[] = []) {
    setDialog((dialog) => (
      [
        ...dialog,
        {
          id: dialog.length + 1,
          author: ChatActorType.USER,
          content: prompt,
          date: new Date(),
          images: images
        }
      ]
    ))

    const { configReducer: config } = store.getState()
    const history = getHistory(40)

    setIsFetching(true)

    ChatService.getPromptResponse({ 
      prompt, 
      images, 
      history, 
      temperature: config.chatMode 
    })
      .then((response) => {

        const generatedResponse = response || defaultResponseFallback
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