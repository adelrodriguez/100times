import ProgressGrid from "~/features/check-in/components/progress-grid"
import { TypographyH1 } from "~/shared/components/ui/typography"

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <TypographyH1>100times</TypographyH1>
      <div className="flex flex-col items-center justify-center max-w-xl w-full p-4">
        <ProgressGrid progress={Math.floor(Math.random() * 101)} highlightNext />
      </div>
    </main>
  )
}
