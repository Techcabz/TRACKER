<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from 'radix-vue'


// Props
defineProps({
    title: {
        type: String,
        default: 'Dialog Title',
    },
    description: {
        type: String,
        default: '',
    },
    closeText: {
        type: String,
        default: 'Close',
    },
    saveText: {
        type: String,
        default: 'Save changes',
    },
})

</script>

<template>
    <DialogRoot>
        <DialogTrigger>
            <!-- Insert Button  -->
            <slot name="trigger" />
        </DialogTrigger>

        <DialogPortal>
            <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
            <DialogContent
                class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
                <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
                    {{ title || 'Dialog' }}
                </DialogTitle>
                <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                    {{ description || 'Description' }}
                </DialogDescription>

                <!-- content form -->
                <slot />
                <!-- content form end -->
                
                <DialogClose
                    class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close">

                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>