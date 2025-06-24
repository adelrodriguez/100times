import ProgressGrid from "~/features/check-in/components/progress-grid"
import { TypographyH1 } from "~/shared/components/ui/typography"

const progress = Math.floor(Math.random() * 101)

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <TypographyH1>100times</TypographyH1>
      <div className="flex flex-col items-center justify-center w-full p-4">
        <ProgressGrid progress={progress} highlightNext />
      </div>
    </div>
  )
}
