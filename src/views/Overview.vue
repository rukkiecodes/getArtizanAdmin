<template>
  <v-container>
    <v-card-subtitle>Booking staus</v-card-subtitle>
    <v-card class="mt-5 rounded-xl" flat>
      <v-card-text>
        <v-row justify="space-between">
          <v-col cols="12" sm="3">
            <v-card class="d-flex justify-center" color="transparent" flat>
              <v-progress-circular :model-value="status.pending" size="150" width="15" color="amber">
                <div class="d-flex flex-column align-center">
                  <p class="text-body-1 text-center text-amber-darken-3">Pending</p>
                  <span class="font-weight-bold text-h5 text-amber-darken-3">{{ status.pending }}</span>
                </div>
              </v-progress-circular>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-card class="d-flex justify-center" color="transparent" flat>
              <v-progress-circular :model-value="status.approved" size="150" width="15" color="indigo">
                <div class="d-flex flex-column align-center">
                  <p class="text-body-1 text-center text-indigo-darken-3">Approved</p>
                  <span class="font-weight-bold text-h5 text-indigo-darken-3">{{ status.approved }}</span>
                </div>
              </v-progress-circular>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-card class="d-flex justify-center" color="transparent" flat>
              <v-progress-circular :model-value="status.completed" size="150" width="15" color="green">
                <div class="d-flex flex-column align-center">
                  <p class="text-body-1 text-center text-green-darken-3">Completed</p>
                  <span class="font-weight-bold text-h5 text-green-darken-3">{{ status.completed }}</span>
                </div>
              </v-progress-circular>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-card class="d-flex justify-center" color="transparent" flat>
              <v-progress-circular :model-value="status.declined" size="150" width="15" color="red">
                <div class="d-flex flex-column align-center">
                  <p class="text-body-1 text-center text-red-darken-3">Declined</p>
                  <span class="font-weight-bold text-h5 text-red-darken-3">{{ status.declined }}</span>
                </div>
              </v-progress-circular>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card-subtitle class="mt-10 mb-5">Profiles</v-card-subtitle>
    <v-row>
      <v-col v-for="(user, i) in profile.users.slice(0, 3)" :key="i" cols="12" sm="4">
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
              <v-list-item-title><a :href="`mailto:${user?.email}`" class="text-grey-darken-3">{{ user?.email
              }}</a></v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user?.phone" density="compact">
              <template v-slot:prepend>
                <v-icon icon="mdi-phone"></v-icon>
              </template>
              <v-list-item-title><a :href="`tel:${user?.phone}`" class="text-grey-darken-3">{{ user?.phone
              }}</a></v-list-item-title>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-btn :to="`/dashboard/profile/${user.uid}`" block class="bg-indigo-lighten-5 text-indigo text-capitalize" rounded="xl">View
              User</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-card-subtitle class="mt-10 mb-5">Bookings</v-card-subtitle>
    <v-sheet height="100%" color="transparent" class="d-flex mb-16"
      :class="bookings.bookings.length <= 0 ? 'd-flex align-center' : ''">
      <v-container :class="bookings.bookings.length <= 0 ? 'd-flex justify-center' : ''" fluid class="pa-0">
        <v-row v-if="bookings.bookings.length > 0">
          <v-col v-for="booking in bookings.bookings.slice(0, 4)" :key="booking.id" cols="12" sm="4" md="3">
            <v-card rounded="xl">
              <v-card-text class="text-center">
                <v-avatar size="150">
                  <v-img
                    :src="booking?.photo != null ? booking?.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                    cover />
                </v-avatar>
              </v-card-text>
              <v-card-title>{{ booking?.title }}</v-card-title>
              <v-card-text class="d-flex justify-space-between">
                <v-chip size="small"
                  :color="booking?.status == 'pending' ? 'amber' : booking?.status == 'approved' ? 'indigo' : booking?.status == 'declined' ? 'red' : ''">
                  <span class="font-weight-bold"
                    :class="booking?.status == 'pending' ? 'text-amber-darken-2' : booking?.status == 'approved' ? 'text-indigo-darken-2' : booking?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                      booking?.status }}</span>
                </v-chip>
                <v-chip size="small"
                  :color="booking?.status == 'pending' ? 'amber' : booking?.status == 'approved' ? 'indigo' : booking?.status == 'declined' ? 'red' : ''">
                  <v-icon
                    :color="booking?.status == 'pending' ? 'amber-darken-2' : booking?.status == 'approved' ? 'indigo-darken-2' : booking?.status == 'declined' ? 'red-darken-2' : ''"
                    class="mr-1">mdi-hand-coin</v-icon>
                  <span class="font-weight-bold"
                    :class="booking?.status == 'pending' ? 'text-amber-darken-2' : booking?.status == 'approved' ? 'text-indigo-darken-2' : booking?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                      (booking?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                </v-chip>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="() => setCurrnetBooking(booking)"
                  class="bg-indigo-lighten-5 text-body-2 text-indigo-accent-4" block rounded="xl">View details</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>


        <div v-if="bookings.bookings.length <= 0" class="d-flex flex-column align-center">
          <v-icon color="grey-darken-3" size="100">mdi-dropbox</v-icon>
          <p class="text-grey-darken-3 font-weight-bold">
            You dont have any bookings yet
          </p>
        </div>
      </v-container>
    </v-sheet>

    <!-- for active booking description -->
    <v-dialog v-model="currentBooking.dialog" width="1000" scrollable :fullscreen="fullscreen">
      <v-card rounded="xl">
        <v-toolbar density="compact" color="transparent">
          <v-spacer />
          <v-btn @click="currentBooking.dialog = false" icon size="small">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="max-height: 800px">
          <v-row>
            <v-col cols="12" md="7" order="1" order-md="0">
              <v-card flat>
                <v-card-text class="text-center">
                  <v-avatar size="150">
                    <v-img
                      :src="currentBooking?.photo != null ? currentBooking?.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                      cover />
                    <v-dialog v-model="photoDialog" activator="parent" width="700">
                      <v-card>
                        <v-toolbar floating density="compact" color="transparent">
                          <v-spacer />
                          <v-btn color="grey-darken-3" @click="photoDialog = false" icon size="small">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-img :src="currentBooking?.photo" cover />
                      </v-card>
                    </v-dialog>
                  </v-avatar>
                </v-card-text>
                <v-card-title>{{ currentBooking?.title }}</v-card-title>
                <v-card-text class="d-flex justify-space-between">
                  <v-chip size="small"
                    :color="currentBooking?.status == 'pending' ? 'amber' : currentBooking?.status == 'approved' ? 'indigo' : currentBooking?.status == 'declined' ? 'red' : ''">
                    <span class="font-weight-bold"
                      :class="currentBooking?.status == 'pending' ? 'text-amber-darken-2' : currentBooking?.status == 'approved' ? 'text-indigo-darken-2' : currentBooking?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                        currentBooking?.status }}</span>
                  </v-chip>
                  <v-chip size="small"
                    :color="currentBooking?.status == 'pending' ? 'amber' : currentBooking?.status == 'approved' ? 'indigo' : currentBooking?.status == 'declined' ? 'red' : ''">
                    <v-icon
                      :color="currentBooking?.status == 'pending' ? 'amber-darken-2' : currentBooking?.status == 'approved' ? 'indigo-darken-2' : currentBooking?.status == 'declined' ? 'red-darken-2' : ''"
                      class="mr-1">mdi-hand-coin</v-icon>
                    <span class="font-weight-bold"
                      :class="currentBooking?.status == 'pending' ? 'text-amber-darken-2' : currentBooking?.status == 'approved' ? 'text-indigo-darken-2' : currentBooking?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                        (currentBooking?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                  </v-chip>
                </v-card-text>
                <v-card-text class="px-1">
                  <v-list-item density="compact">
                    <v-list-item-subtitle class="text-caption">Category</v-list-item-subtitle>
                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ currentBooking?.category
                    }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item density="compact">
                    <v-list-item-subtitle class="text-caption">Location</v-list-item-subtitle>
                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ currentBooking?.location
                    }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item density="compact">
                    <v-list-item-subtitle class="text-caption">Date</v-list-item-subtitle>
                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ currentBooking?.date
                    }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item density="compact">
                    <v-list-item-subtitle class="text-caption">Time</v-list-item-subtitle>
                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ currentBooking?.time
                    }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item density="compact">
                    <v-list-item-subtitle class="text-caption">Created on</v-list-item-subtitle>
                    <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
                      currentBooking?.createdAt?.toDate().toDateString()
                    }}</v-list-item-title>
                  </v-list-item>
                </v-card-text>

                <v-card-subtitle class="text-caption">Description</v-card-subtitle>
                <v-card-text class="text-body-1 text-grey-darken-3">{{ currentBooking?.description }}</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="5">
              <CurrentUserVue :user="currentBooking" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>

  <v-dialog v-model="activeDialog.dialog" width="350" scrollable>
    <v-card>
      <v-toolbar density="compact" color="transparent">
        <v-spacer />
        <v-btn @click="activeDialog.dialog = false" icon size="small">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text style="max-height: 600px;" class="pa-0 ma-0">
        <v-card-text class="text-center">
          <v-avatar size="150">
            <v-img
              :src="activeDialog.photo != null ? activeDialog.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
              cover />
          </v-avatar>
        </v-card-text>
        <v-card-title>{{ activeDialog?.title }}</v-card-title>
        <v-card-text class="d-flex justify-space-between">
          <v-chip
            :color="activeDialog?.status == 'pending' ? 'amber' : activeDialog?.status == 'approved' ? 'indigo' : 'green'">
            <span class="font-weight-bold"
              :class="activeDialog?.status == 'pending' ? 'text-amber-darken-2' : activeDialog?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                activeDialog?.status }}</span>
          </v-chip>
          <v-chip
            :color="activeDialog?.status == 'pending' ? 'amber' : activeDialog?.status == 'approved' ? 'indigo' : 'green'">
            <v-icon
              :color="activeDialog?.status == 'pending' ? 'amber-darken-2' : activeDialog?.status == 'approved' ? 'indigo-darken-2' : 'green-darken-2'"
              class="mr-1">mdi-hand-coin</v-icon>
            <span class="font-weight-bold"
              :class="activeDialog?.status == 'pending' ? 'text-amber-darken-2' : activeDialog?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                activeDialog?.budget }}</span>
          </v-chip>
        </v-card-text>
        <v-card-text class="px-1">
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Category</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ activeDialog?.category
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Location</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ activeDialog?.location
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Date</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ activeDialog?.date
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Time</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ activeDialog?.time
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Created on</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
              activeDialog?.createdAt?.toDate().toDateString()
            }}</v-list-item-title>
          </v-list-item>
        </v-card-text>

        <v-card-subtitle class="text-caption">Description</v-card-subtitle>
        <v-card-text>
          <span class="text-grey-darken-4 text-body-1">
            {{ activeDialog?.description }}
          </span>
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
  
<script setup>
import { ref, computed } from "vue";
import { useHistoryStore } from '@/store/overview/history'
import { useStatusStore } from '@/store/overview/status'
import { useProfileStore } from "@/store/profile/profile";
import { useArtizanGetBookingStore } from "@/store/booking/getBookings";
import { useDisplay } from 'vuetify'
import CurrentUserVue from "./CurrentUser.vue"

const history = ref(useHistoryStore())
const status = ref(useStatusStore())
const profile = ref(useProfileStore())
const bookings = ref(useArtizanGetBookingStore())
const { name } = useDisplay()

const activeDialog = ref({
  dialog: false
})

const currentBooking = ref({
  dialog: false
})

const photoDialog = ref(false)

const setActiveDialog = (dialog) => {
  activeDialog.value = {
    dialog: true,
    ...dialog
  }
}

const setCurrnetBooking = (prop) => {
  currentBooking.value = {
    dialog: true,
    ...prop
  }
}

const fullscreen = computed(() => {
  switch (name.value) {
    case 'xs': return true
    case 'sm': return false
  }

  return undefined
})
</script>
  