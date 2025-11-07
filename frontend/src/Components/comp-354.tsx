import { CloudUploadIcon } from "lucide-react"
import { Button } from "../Components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Components/ui/tooltip"
import { ShimmerButton } from "./ui/shimmer-button"

export default function Component({
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* <Button className="text-while bg-gray-800 border-2 border-gray-600 " variant="outline" size="lg">
            <CloudUploadIcon />
            Save
          </Button> */}
          <ShimmerButton {...props} className="shadow-xl p-2 px-3  text-gray-200 ">
            <CloudUploadIcon size={20}/> 
            <span className="ml-2 text-center mt-0 mb-0 text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-whitedark:from-white dark:to-slate-900/50">
            Save</span></ShimmerButton>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs ">
          Login to save 
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
