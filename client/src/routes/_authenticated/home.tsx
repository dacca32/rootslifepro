import { createFileRoute } from '@tanstack/react-router'
import HomeComponent from '../../components/home/home'

export const Route = createFileRoute('/_authenticated/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return HomeComponent
}
