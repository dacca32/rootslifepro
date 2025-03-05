import { createFileRoute } from '@tanstack/react-router'
import ImageUploader from '../../components/utilities/file-uploader/file-uploader'

export const Route = createFileRoute('/_authenticated/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>
        <h2>Settings page</h2>
        <p>This is a temporary page for testing the image uploader to S3 bucket</p>

        <div className='mt-5'>
          <ImageUploader></ImageUploader>
        </div>
      </div></>
  )
}
