<template>
  <v-app>
    <AppBar />
    <Drawer />

    <v-main class="bg-indigo-lighten-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from "./AppBar.vue"
import Drawer from "./Drawer.vue"
import { useProfileStore } from "@/store/profile/profile"
import { useArtizanGetBookingStore } from "@/store/booking/getBookings"
import { useArtizanGetJobsStore } from "@/store/booking/getJobs"
import { useHistoryStore } from '@/store/overview/history'
import { useStatusStore } from '@/store/overview/status'
import { computed, onMounted, ref } from "vue"
import { arrayUnion, doc, updateDoc } from "@firebase/firestore"
import { useAppStore } from "@/store/app"
import { db } from "@/plugins/firebase"

const profile = useProfileStore()
const booking = useArtizanGetBookingStore()
const job = useArtizanGetJobsStore()
const history = useHistoryStore()
const status = useStatusStore()
const speciality = ref('')
const app = useAppStore()

onMounted(() => {
  profile.getProfile()
  booking.getBookings()
  job.getJobs()
  history.getHistory()
  status.getPending()
  status.getApproved()
  status.getCompleted()
  status.getDeclined()
  app.getCategories()
  app.getLocation()
  profile.getAllProfiles()
  profile.getAllArtizan()
})
</script>
