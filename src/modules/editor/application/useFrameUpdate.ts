import { useParseHtml } from '@/modules/parser'
import { useRenderElement } from '@/modules/renderer'
import { frameId, useElementsHash } from '@/modules/editor'

export const useFrameUpdate = () => {
    const { parseHtml } = useParseHtml()
    const { renderElement } = useRenderElement()
    const { buildElementsHashByRoot } = useElementsHash()

    const updateFrame = (html: string) => {
        const root = parseHtml(html)
        buildElementsHashByRoot(root)
        renderElement(root, frameId)

        return { root }
    }

    return {
        updateFrame,
    }
}
