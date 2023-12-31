import Head from "next/head";
import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {useState, useEffect} from 'react'
import { api } from "@/utils/api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogDemo } from "@/components/edit/edit";
import { Button } from "@/components/ui/button";

interface FromData{
  title:string,
  desc:string
}

export default function Home() {

  const ctx = api.useContext()

  const addNote = api.noteActions.Addnote.useMutation({
    onSuccess:() =>{
      void ctx.noteActions.Shownote.invalidate()
    }
  })

  const showNotes = api.noteActions.Shownote.useQuery()

  const [dati,setDati] =useState<FromData>({
    title:"",
    desc:""
  })
  const [status,setStatus] = useState(true)

  const {mutate} = api.noteActions.delateTodo.useMutation({
    onSuccess: ()=>{
      void ctx.noteActions.Shownote.invalidate()
    }
  })

  function show(){
    console.log({dati})

    addNote.mutate({
      title: dati.title,
      desc: dati.desc
    })

    setDati({
      title:"",
      desc:""
    })
  }

  useEffect(()=>{
    if(dati.title !== ""  && dati.desc !== ""){
      return setStatus(false)
    }else{
      return setStatus(true)
    }
  },[dati])


  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-20 px-11 flex flex-col gap-12"  >
        <div className="flex justify-between items-center">
          <h1 className="text-6xl font-bold">Note App</h1>

          <AlertDialog>
            <AlertDialogTrigger className="py-2 px-8 bg-slate-900 text-white font-semibold">
              Add
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add Your Task</AlertDialogTitle>
                <AlertDialogDescription>
                    <label htmlFor="title">Title</label>
                    <Input placeholder="Title" name="title" id="title" onChange={e=>setDati({...dati,title:e.target.value})} />

                    <label htmlFor="desc">Desc</label>
                    <Textarea name="desc" id="desc" onChange={e => setDati({...dati,desc:e.target.value})} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={()=> setStatus(true)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={show} disabled={status}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>


          <div>
            <hr />
            <div className="mt-3 flex flex-col ">
            {showNotes.isLoading? (<div>Loading...</div>): (showNotes.data?.map((e)=>(
              <div key={e.id} className="mt-4 py-2 px-3  hover:shadow-lg">
                <div className="flex justify-between ">
                  <div>{e.title}</div>
                  <div>
                    <DialogDemo Icon={Pencil1Icon} id={e.id} desc={e.desc} title={e.title}/>
                    <Button variant="icons" onClick={()=>{mutate({id:e.id})}}><TrashIcon /></Button>
                  </div>
                </div>
              </div>
            )))}
            </div>
          </div>

      </main>
    </>
  );
}
