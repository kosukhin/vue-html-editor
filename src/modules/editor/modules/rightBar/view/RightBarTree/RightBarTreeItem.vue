<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { Element } from '@/modules/parser'
import { useEditor, useEventElementSelect } from '@/modules/editor'
import { getElementLabel } from '@/shared/utils/getElementLabel'
import { useElementRemove } from '@/modules/editor/application/useElementRemove'
import BaseButton from '@/shared/view/ui/BaseButton/BaseButton.vue'
import TrashIcon from '@/shared/view/icons/TrashIcon.vue'
import BaseIcon from '@/shared/view/ui/BaseIcon/BaseIcon.vue'
import { isElementSignificant } from '@/shared/utils/isElementSignificant'
import { blockAttrTreeName } from '@/modules/renderer'

defineEmits(['click'])
const props = defineProps({
    node: {
        type: Object as PropType<Element>,
        required: true,
    },
})

const { emitSelectElement } = useEventElementSelect()
const { currentBlockId } = useEditor()
const { removeElement } = useElementRemove()

const isSelected = computed(() => currentBlockId.value === props.node.editorId)
blockAttrTreeName
const selectBlock = (blockId: string) => {
    emitSelectElement(blockId)
}
</script>

<template>
    <div class="right-bar-tree-item">
        <template v-if="isElementSignificant(node)">
            <div
                class="right-bar-tree-item__title"
                @click.stop="$emit('click')"
            >
                <BaseButton title="Удалить" @click.stop="removeElement(node)">
                    <BaseIcon>
                        <TrashIcon />
                    </BaseIcon>
                </BaseButton>
                <span
                    v-bind="{ [blockAttrTreeName]: node.editorId }"
                    :class="{
                        'right-bar-tree-item__title-text--selected': isSelected,
                    }"
                    class="right-bar-tree-item__title-text"
                >
                    {{ getElementLabel(node) }}
                </span>
            </div>
            <div class="right-bar-tree-item__children">
                <RightBarTreeItem
                    v-for="childNode in node.childNodes"
                    :key="childNode.editorId"
                    :node="childNode"
                    @click="selectBlock(childNode.editorId)"
                />
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
@import 'styles/right-bar-tree-item';
</style>
