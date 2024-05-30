
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
const Rerender = () => {
  const Route = useRouter()
  const searchParams = useSearchParams()

  if (!searchParams.get('item')) {
    Route.refresh()

  }


}

export default Rerender