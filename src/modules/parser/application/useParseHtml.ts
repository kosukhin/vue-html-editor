import type { Element } from '@/modules/parser'
import { parse } from 'parse5'
import { initialElement, useCustomizeElement } from '@/modules/parser'

export const useParseHtml = () => {
    const { customizeElement } = useCustomizeElement()

    const parseHtml = (html: string): Element => {
        const root = (parse(html).childNodes[1] as Element) ?? initialElement

        customizeElement(root)

        return root
    }

    return {
        parseHtml,
    }
}
