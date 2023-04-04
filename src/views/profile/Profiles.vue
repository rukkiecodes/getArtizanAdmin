<template>
    <v-container>
      <v-row>
        <v-col v-for="(user, i) in profile.users" :key="i" cols="12" sm="4">
          <v-card rounded="xl">
            <v-card-text class="text-center">
              <v-avatar size="150">
                <v-img
                  :src="user?.avatar != undefined ? user?.avatar : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                  cover />
              </v-avatar>
            </v-card-text>
  
            <v-card-title class="pb-0">{{ user?.name }}</v-card-title>
  
            <v-list density="compact">
              <v-list-item density="compact">
                <template v-slot:prepend>
                  <v-icon icon="mdi-at"></v-icon>
                </template>
                <v-list-item-title><a :href="`mailto:${user?.email}`" class="text-grey-darken-3">{{ user?.email }}</a></v-list-item-title>
              </v-list-item>
              <v-list-item v-if="user?.phone" density="compact">
                <template v-slot:prepend>
                  <v-icon icon="mdi-phone"></v-icon>
                </template>
                <v-list-item-title><a :href="`tel:${user?.phone}`" class="text-grey-darken-3">{{ user?.phone }}</a></v-list-item-title>
              </v-list-item>
            </v-list>
  
            <v-card-actions>
              <v-btn :to="`/dashboard/profile/${user.uid}`" block class="bg-indigo-lighten-5 text-indigo text-capitalize" rounded="xl">View User</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { useProfileStore } from '@/store/profile/profile';
  import { ref } from 'vue'
  
  const profile = ref(useProfileStore())
  </script>
  