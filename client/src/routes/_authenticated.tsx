import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async () => {
        if (!localStorage.getItem('token')) {
            throw redirect({
                to: '/login'
            })
        }
    },
})