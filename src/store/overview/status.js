// Utilities
import { db } from '@/plugins/firebase'
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('artizanStatus', {
    state: () => ({
        pending: 0,
        approved: 0,
        completed: 0,
        declined: 0,
    }),

    actions: {
        async getPending() {
            const unsub = onSnapshot(query(collection(db, "booking"), where('status', '==', 'pending')), snapshot => {
                this.pending = snapshot.docs.length
            })

            return unsub
        },

        async getApproved() {
            const unsub = onSnapshot(query(collection(db, "approved"), where('status', '==', 'pending')), snapshot => {
                this.approved = snapshot.docs.length
            })

            return unsub
        },

        async getCompleted() {
            const unsub = onSnapshot(query(collection(db, "completed"), where('status', '==', 'pending')), snapshot => {
                this.completed = snapshot.docs.length
            })

            return unsub
        },

        async getDeclined() {
            const unsub = onSnapshot(query(collection(db, "declined"), where('status', '==', 'pending')), snapshot => {
                this.declined = snapshot.docs.length
            })

            return unsub
        },
    }
})
