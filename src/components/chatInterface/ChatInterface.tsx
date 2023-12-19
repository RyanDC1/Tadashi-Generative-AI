import { useRef, useState } from 'react'
import PromptEditor, { PromptEditorRef } from './PromptEditor'
import { ChatService } from '../../services/ChatService'
import { ChatActorType, DialogType } from '../../models'
import { notification } from 'antd'
import DialogFlow from './dialog/DialogFlow'

type Props = {}

export default function ChatInterface({ }: Props) {

  const [dialog, setDialog] = useState<DialogType[]>([])
  const [isFething, setIsFetching] = useState(false)

  const promptEditorRef = useRef<PromptEditorRef>()

  return (
    <div className='chat-interface'>
      <div className='intro'>

      </div>
      <div className='dialog-container'>
        <DialogFlow
          dialog={dialog}
          loading={isFething}
        />
      </div>
      <div className='prompt-container sticky-footer'>
        <PromptEditor
          ref={promptEditorRef}
          onSend={promptAssistant}
          disabled={isFething}
        />
      </div>
    </div>
  )

  function promptAssistant(prompt: string) {
    setIsFetching(true)
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

    ChatService.getPromptResponse({ prompt })
      .then((response) => {
        setDialog((dialog) => (
          [
            ...dialog,
            {
              id: dialog.length + 1,
              author: ChatActorType.AI,
              content: response.candidates?.[0]?.content ?? "Sorry I didn't quite catch that",
              date: new Date()
            }
          ]
        ))
      })
      .catch(() => {
        notification.error({
          message: 'API Failed',
          description: 'An error occurred while fetching response, token exhausted'
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
}