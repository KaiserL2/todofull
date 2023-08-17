import {  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogTrigger  } from '@/components/ui/alert-dialog'
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { api } from "@/utils/api"


interface Dati {
    Icon : React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>,
    title: string,
    desc: string,
    id: string
}

export function DialogDemo({Icon,title,desc,id}:Dati) {

    const ctx = api.useContext()

    const {mutate, isLoading} = api.noteActions.UpdateNote.useMutation({
        onSuccess:() =>{
          void ctx.noteActions.Shownote.invalidate()
        }
      })

  return (
    <AlertDialog>
            <AlertDialogTrigger className="py-2 px-2 border-slate-900 border  font-semibold">
              <Icon />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add Your Task</AlertDialogTitle>
                <AlertDialogDescription>
                    <label htmlFor="title">Title</label>
                    <Input placeholder="Title" name="title" id="title" defaultValue={title} onChange={e=>title=e.target.value}  />

                    <label htmlFor="desc">Desc</label>
                    <Textarea name="desc" id="desc" defaultValue={desc} onChange={e=>desc=e.target.value}/>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel >Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>{mutate({title: title,desc:desc,id: id})}} disabled={isLoading}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
  )
}
