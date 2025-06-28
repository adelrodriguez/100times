import { Plus } from "lucide-react"
import { Button } from "~/shared/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/shared/components/ui/sheet"
import { TypographyH1 } from "~/shared/components/ui/typography"

export default function CreateNewTaskSheet() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="h-16 w-16 rounded-3xl shadow hover:shadow-2xl hover:scale-105" asChild>
            <Plus className="size-9" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle className="text-center flex flex-col items-center gap-2">
              <p className="text-7xl">🎯</p>
              <p className="text-2xl font-bold">Create a new task</p>
            </SheetTitle>
            <SheetDescription className="text-center">Set a new task to help you achieve your goals.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <TypographyH1>Test Content</TypographyH1>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
