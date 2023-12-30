import { Options, TypewriterClass } from 'typewriter-effect';
import Typewriter from 'typewriter-effect/dist/core';
import { Crypt } from 'hybrid-crypto-js'

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
    delay?: number
    options?: ScrollIntoViewOptions
}

export function scrollIntoView(props: ScrollIntoViewProps) {
    const { id, options = {}, delay } = props
    const element = document.getElementById(id)

    if(!element)
    {
        console.error("Invalid Element / Element does not exist")
        return
    }

    const scrollContainer = document.getElementById('chat-scroll-container')

    setTimeout(() => {
        //element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center', ...options })
        scrollContainer.scroll({
            top: element.parentElement.offsetTop - 64,
            behavior: 'smooth',
        })
    }, delay);
}

export function encryptJSON (params: Object) {
    var crypt = new Crypt({
        rsaStandard: 'RSA-OAEP',
        entropy: import.meta.env.VITE_RSA_ENTROPHY
    });
    return crypt.encrypt(import.meta.env.VITE_CLIENT_SECRET, JSON.stringify(params));
}