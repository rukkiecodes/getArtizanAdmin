<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
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
            <v-list-item v-if="user?.gender" density="compact">
              <template v-slot:prepend>
                <v-icon icon="mdi-gender-male-female"></v-icon>
              </template>
              <v-list-item-title>{{ user.gender }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user?.stateOfResidence" density="compact">
              <template v-slot:prepend>
                <v-icon icon="mdi-map-marker-outline"></v-icon>
              </template>
              <v-list-item-title>{{ user.stateOfResidence }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user?.LGA" density="compact">
              <template v-slot:prepend>
                <v-icon icon="mdi-map-marker-outline"></v-icon>
              </template>
              <v-list-item-title>{{ user.LGA }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card rounded="xl">
          <v-toolbar color="transparent">
            <v-toolbar-title>User Bookings</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-table class="rounded-xl" v-if="bookings.length >= 1">
              <thead>
                <tr>
                  <th class="text-left"> Time </th>
                  <th class="text-left"> Date </th>
                  <th class="text-left"> Budget </th>
                  <th class="text-left"> Status </th>
                </tr>
              </thead>
              <tbody>
                <v-hover v-for="booking in bookings?.slice(0, 50)" :key="booking.id">
                  <template v-slot:default="{ isHovering, props }">
                    <tr @click="setActiveDialog(booking)" v-bind="props"
                      :class="isHovering ? 'bg-indigo-lighten-5' : undefined" style="cursor: pointer;">
                      <td class="text-grey-darken-2 text-caption font-weight-bold">{{ booking?.time }}</td>
                      <td class="text-grey-darken-2 text-caption font-weight-bold">{{ booking?.date }}</td>
                      <td class="text-grey-darken-2 text-caption font-weight-bold">{{
                        (booking?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
                      <td>
                        <v-chip
                          :color="booking?.status === 'pending' ? 'amber' : booking?.status === 'approved' ? 'indigo' : booking?.status === 'declined' ? 'red' : 'green'">
                          <span class="font-weight-bold text-caption">{{ booking?.status }}</span>
                        </v-chip>
                      </td>
                    </tr>
                  </template>
                </v-hover>
              </tbody>
            </v-table>
            <v-sheet v-else class="d-flex justify-center align-center" height="200" rounded="xl">
              <span>You do not have a booking yet</span>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="activeDialog.active" width="1000" scrollable>
      <v-card rounded="xl">
        <v-toolbar-title>
          <v-toolbar density="compact" color="transparent">
            <v-spacer />
            <v-btn @click="activeDialog.active = false" icon size="mall">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </v-toolbar-title>
        <v-card-text style="max-height: 800px;">
          <v-row>
            <v-col cols="12" md="7" order="1" order-md="0">
              <v-card flat>
                <v-card-text class="text-center">
                  <v-avatar size="150">
                    <v-img
                      :src="activeDialog?.photo != null ? activeDialog?.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                      cover />
                    <v-dialog v-model="photoDialog" activator="parent" width="700">
                      <v-card>
                        <v-toolbar floating density="compact" color="transparent">
                          <v-spacer />
                          <v-btn color="grey-darken-3" @click="photoDialog = false" icon size="small">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-img :src="activeDialog?.photo" cover />
                      </v-card>
                    </v-dialog>
                  </v-avatar>
                </v-card-text>
                <v-card-title>{{ activeDialog?.title }}</v-card-title>
                <v-card-text class="d-flex justify-space-between">
                  <v-chip size="small"
                    :color="activeDialog?.status == 'pending' ? 'amber' : activeDialog?.status == 'approved' ? 'indigo' : activeDialog?.status == 'declined' ? 'red' : ''">
                    <span class="font-weight-bold"
                      :class="activeDialog?.status == 'pending' ? 'text-amber-darken-2' : activeDialog?.status == 'approved' ? 'text-indigo-darken-2' : activeDialog?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                        activeDialog?.status }}</span>
                  </v-chip>
                  <v-chip size="small"
                    :color="activeDialog?.status == 'pending' ? 'amber' : activeDialog?.status == 'approved' ? 'indigo' : activeDialog?.status == 'declined' ? 'red' : ''">
                    <v-icon
                      :color="activeDialog?.status == 'pending' ? 'amber-darken-2' : activeDialog?.status == 'approved' ? 'indigo-darken-2' : activeDialog?.status == 'declined' ? 'red-darken-2' : ''"
                      class="mr-1">mdi-hand-coin</v-icon>
                    <span class="font-weight-bold"
                      :class="activeDialog?.status == 'pending' ? 'text-amber-darken-2' : activeDialog?.status == 'approved' ? 'text-indigo-darken-2' : activeDialog?.status == 'declined' ? 'text-red-darken-2' : ''">{{
                        (activeDialog?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
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
                <v-card-text class="text-body-1 text-grey-darken-3">{{ activeDialog?.description }}</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="5">
              <CurrentUserVue :user="activeDialog" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { db } from '@/plugins/firebase'
import CurrentUserVue from '@/views/CurrentUser.vue'
import { collection, doc, onSnapshot, orderBy, query, where } from '@firebase/firestore'

export default {
  data: () => ({
    user: null,
    bookings: [],
    activeDialog: {
      active: false
    },
    photoDialog: false
  }),

  components: {
    CurrentUserVue
  },

  mounted() {
    this.getUser()
    this.getBookings()
  },

  methods: {
    getUser() {
      const unsub = onSnapshot(doc(db, 'users', this.$route.params.id), (doc) => {
        this.user = doc.data()
      })
      return unsub
    },

    getBookings() {
      const q = query(collection(db, "booking"), where("customer", "==", this.$route.params.id), orderBy("createdAt", "desc"))


      const unsub = onSnapshot(q, snapshot => {
        this.bookings = []
        snapshot.forEach(doc => {
          this.bookings.push({
            id: doc.id,
            ...doc.data()
          })
        })
      })

      return unsub
    },

    setActiveDialog(prop) {
      this.activeDialog = {
        active: true,
        ...prop
      }
    }
  }
}
</script>