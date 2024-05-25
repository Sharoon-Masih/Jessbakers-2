import { Skeleton } from "@/components/ui/skeleton"

export function CarouselSkeleton() {
  return (
     
    <div className="flex items-center flex-col justify-center gap-5 w-[600px]  space-x-4 h-[370px]  ">
        <Skeleton className="h-4 w-[250px] md:w-[500px]" />
        <Skeleton className="h-4 w-[150px] md:w-[400px]" />
      </div>
  )
}
