<script setup lang="ts">
// import { useAuthStore } from "@/stores/auth";
// import { storeToRefs } from "pinia";
import {  h, ref } from "vue";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
  StepperTitle,
  StepperDescription,
} from "@/components/ui/stepper";
import { toTypedSchema } from "@vee-validate/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckIcon, CircleIcon, DotIcon } from "@radix-icons/vue";
import * as z from "zod";

// const { errors } = storeToRefs(useAuthStore());
// const authStore = useAuthStore();
const { toast } = useToast();

// const register = async () => {
//   try {
//     const res = await authStore.register(formData);

//     if (res.success) {
//       toast({
//         description: "Registration successful. Please wait for admin approval.",
//         class: "bg-green-500 text-white",
//       });
//       formData.username = "";
//       formData.email = "";
//       formData.fname = "";
//       formData.lname = "";
//       formData.position = "";
//       formData.password = "";
//       formData.password_confirmation = "";
//     } else {
//       toast({
//         description: "Registration failed. Please check the errors.",
//         class: "bg-red-500 text-white",
//       });
//     }
//   } catch (error) {
//     console.error("Registration failed:", error);
//   }
// };

// const formData = reactive({
//   username: "",
//   email: "",
//   fname: "",
//   lname: "",
//   position: "",
//   password: "",
//   password_confirmation: "",
// });

const formSchema = [
  z.object({
    fullName: z.string(),
    email: z.string().email(),
  }),
  z
    .object({
      password: z.string().min(2).max(50),
      confirmPassword: z.string(),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      {
        message: "Passwords must match!",
        path: ["confirmPassword"],
      }
    ),
  z.object({
    favoriteDrink: z.union([
      z.literal("coffee"),
      z.literal("tea"),
      z.literal("soda"),
    ]),
  }),
];

const stepIndex = ref(1);
const steps = [
  {
    step: 1,
    title: "Your details",
    description: "Provide your username and name",
  },
  {
    step: 2,
    title: "Your details",
    description: "Provide your email and position",
  },
  {
    step: 3,
    title: "Your password",
    description: "Choose a password",
  },
  {
    step: 4,
    title: "Your Favorite Drink",
    description: "Choose a drink",
  },
];

function onSubmit(values: any) {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
}
</script>

<template>
  <Card class="mx-auto max-w-3xl mt-12 mb-12">
    <CardHeader>
      <CardTitle class="text-xl">Sign Up</CardTitle>
      <CardDescription
        >Enter your information to create an account</CardDescription
      >
    </CardHeader>
    <CardContent>
      <Form
        v-slot="{ meta, values, validate }"
        as=""
        keep-values
        :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
      >
        <Stepper
          v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
          v-model="stepIndex"
          class="block w-full"
        >
          <form
            @submit="
              (e) => {
                e.preventDefault();
                validate();

                if (stepIndex === steps.length && meta.valid) {
                  onSubmit(values);
                }
              }
            "
          >
            <div class="flex w-full flex-start gap-2">
              <StepperItem
                v-for="step in steps"
                :key="step.step"
                v-slot="{ state }"
                class="relative flex w-full flex-col items-center justify-center"
                :step="step.step"
              >
                <StepperSeparator
                  v-if="step.step !== steps[steps.length - 1].step"
                  class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                />

                <StepperTrigger as-child>
                  <Button
                    :variant="
                      state === 'completed' || state === 'active'
                        ? 'default'
                        : 'outline'
                    "
                    size="icon"
                    class="z-10 rounded-full shrink-0"
                    :class="[
                      state === 'active' &&
                        'ring-2 ring-ring ring-offset-2 ring-offset-background',
                    ]"
                    :disabled="state !== 'completed' && !meta.valid"
                  >
                    <CheckIcon v-if="state === 'completed'" class="size-5" />
                    <CircleIcon v-if="state === 'active'" />
                    <DotIcon v-if="state === 'inactive'" />
                  </Button>
                </StepperTrigger>

                <div class="mt-5 flex flex-col items-center text-center">
                  <StepperTitle
                    :class="[state === 'active' && 'text-primary']"
                    class="text-sm font-semibold transition lg:text-base"
                  >
                    {{ step.title }}
                  </StepperTitle>
                  <StepperDescription
                    :class="[state === 'active' && 'text-primary']"
                    class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                  >
                    {{ step.description }}
                  </StepperDescription>
                </div>
              </StepperItem>
            </div>

            <div class="flex flex-col gap-4 mt-4">
              <template v-if="stepIndex === 1">
                <div class="grid gap-4">
                  <div class="grid gap-2">
                    <FormField v-slot="{ componentField }" name="fullName">
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                      <FormField v-slot="{ componentField }" name="fullName">
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input type="text" v-bind="componentField" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormField>
                    </div>
                    <div class="grid gap-2">
                      <FormField v-slot="{ componentField }" name="fullName">
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input type="text" v-bind="componentField" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormField>
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="stepIndex === 2">
                <FormField v-slot="{ componentField }" name="password">
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="confirmPassword">
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>

              <template v-if="stepIndex === 3">
                <FormField v-slot="{ componentField }" name="favoriteDrink">
                  <FormItem>
                    <FormLabel>Drink</FormLabel>

                    <Select v-bind="componentField">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a drink" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="coffee"> Coffe </SelectItem>
                          <SelectItem value="tea"> Tea </SelectItem>
                          <SelectItem value="soda"> Soda </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>
            </div>

            <div class="flex items-center justify-between mt-4">
              <Button
                :disabled="isPrevDisabled"
                variant="outline"
                size="sm"
                @click="prevStep()"
              >
                Back
              </Button>
              <div class="flex items-center gap-3">
                <Button
                  v-if="stepIndex !== 3"
                  :type="meta.valid ? 'button' : 'submit'"
                  :disabled="isNextDisabled"
                  size="sm"
                  @click="meta.valid && nextStep()"
                >
                  Next
                </Button>
                <Button v-if="stepIndex === 3" size="sm" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Stepper>
      </Form>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <router-link :to="{ name: 'login' }" class="underline">
          Sign in
        </router-link>
      </div>
    </CardContent>
  </Card>
</template>
