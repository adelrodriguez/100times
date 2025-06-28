// import CreateNewTaskSheet from "~/features/tasks/components/create-new-task-sheet"
import CurrentUser from "~/features/auth/components/current-user"
import CreateNewTaskSheet from "~/features/tasks/components/create-new-task-sheet"
import { TypographyH1 } from "~/shared/components/ui/typography"

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-end w-full">
        <CurrentUser />
      </div>
      <div>
        <TypographyH1>100times</TypographyH1>
      </div>
      <div className="flex-1">
        <div className="text-center text-muted-foreground">No tasks yet</div>
      </div>

      <div className="absolute bottom-12 right-0 flex justify-center w-full">
        <CreateNewTaskSheet />
      </div>
    </div>
  )
}
