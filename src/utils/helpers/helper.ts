import { Options, TypewriterClass } from 'typewriter-effect';
import Typewriter from 'typewriter-effect/dist/core';

type GenerateDyanmicPlaceholderProps = {
    id: string,
    options: string[]
}

export function generateDyanmicPlaceholder(props: GenerateDyanmicPlaceholderProps): TypewriterClass {
    const { id, options } = props

    const placeholderElement: HTMLInputElement = document.getElementById(id) as HTMLInputElement

    if (placeholderElement?.placeholder == null) {
        console.error("generateDyanmicPlaceholder: Element not found / Invlaid element")
        return
    }

    return new Typewriter(null, {
        loop: true,
        delay: 80,
        deleteSpeed: 50,
        strings: options,
        autoStart: true,
        onCreateTextNode: (character: string) => {
            placeholderElement.placeholder += character
            return null
        },
        onRemoveNode: () => {
            placeholderElement.placeholder = placeholderElement.placeholder.slice(0, -1)
        },
    } as Options)

}

type ScrollIntoViewProps = {
    id: string,
    options?: ScrollIntoViewOptions
}

export function scrollIntoView(props: ScrollIntoViewProps) {
    const { id, options = {} } = props
    const element = document.getElementById(id)

    if(!element)
    {
        console.error("Invalid Element / Element does not exist")
        return
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center', ...options })
}