import { createFileRoute } from '@tanstack/react-router'
import LoginComponent from '../../components/auth/login'

export const Route = createFileRoute('/login/')({
  component: LoginComponent,
})
