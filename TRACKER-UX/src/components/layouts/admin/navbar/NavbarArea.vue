<script setup lang="jsx">
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'radix-vue'

import { Separator } from "@/components/ui/separator";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Bell } from "lucide-vue-next";
import NavbarItems from "./NavbarItems.vue";
import NavbarSearch from "./NavbarSearch.vue";
import { onMounted } from "vue";

const authStore = useAuthStore();


onMounted(() => {
  authStore.getUser();
})

const logout = async () => {
  try {
    await authStore.logout(); 
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


</script>
<template>
  <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">

    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" size="icon" class="shrink-0 rounded md:hidden">
          <Menu class="h-5 w-5 " />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="flex flex-col bg-muted/40 text-white">
        <!-- Link Items -->
        <NavbarItems />
      </SheetContent>
    </Sheet>
    <div class="w-full flex-1">
      <!-- Search Area -->
      <!-- <NavbarSearch /> -->
    </div>
    <div>
      <p v-if="authStore.user" class="text-grass12 font-bold uppercase">{{ authStore.user.username }}</p>
      <p v-else class="text-grass12  font-bold uppercase">Guest</p>

    </div>
    <!-- <Button variant="secondary" size="icon" class="ml-auto h-8 w-8 rounded">
      <Bell class="h-5 w-5" />
      <span class="sr-only">Toggle notifications</span>
    </Button> -->
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" size="icon" class="rounded-full">
          <CircleUser class="h-5 w-5" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="bg-white">
        <DropdownMenuLabel class="text-grass12">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <router-link  :to="{ name: 'settings' }" class=" ml-2 leading-none outline-none flex items-center justify-end">
            Settings
          </router-link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DropdownMenuItem>
            <AlertDialogRoot>
              <AlertDialogTrigger @click.stop
                class=" text-red11 font-semibold leading-none outline-none flex items-center justify-end">Logout
              </AlertDialogTrigger>
              <AlertDialogPortal>
                <AlertDialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
                <AlertDialogContent
                  class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                 
                  <AlertDialogDescription class="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                   <p class="text-red11 font-bold"> Are you sure you want to log out? </p> You will need to sign in again to access your account.

                  </AlertDialogDescription>
                  <div class="flex justify-end gap-[25px]">
                    <AlertDialogCancel
                      class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      class="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
                      @click="logout">
                      Yes, log out
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialogPortal>
            </AlertDialogRoot>
          </DropdownMenuItem>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
