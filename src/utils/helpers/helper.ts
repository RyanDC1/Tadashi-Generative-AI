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

type ElementScrollProps = {
    id: string,
    delay?: number
    behavior?: ScrollBehavior,
    /**
     * @default window
     */
    scrollContainer?: HTMLElement,
    padding?: number,
    /**
     * @default top
     */
    position?: 'top' | 'bottom'
}

export function scrollToElement(props: ElementScrollProps) {
    const { id, behavior = 'smooth', delay, scrollContainer = window, padding = 0, position = 'top' } = props

    const element = document.getElementById(id)

    if(!element)
    {
        console.error("Invalid Element / Element does not exist")
        return
    }

    const calculatedPosition = {
        top: element.offsetTop - padding,
        bottom: (element.offsetTop + element.offsetHeight) - padding
    }[position]

    setTimeout(() => {
        scrollContainer.scroll({
            top: calculatedPosition,
            behavior: behavior,
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