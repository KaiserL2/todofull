import {  z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";



export const note = createTRPCRouter({
  //Aggiungu note
  Addnote: publicProcedure.input(z.object({title:z.string(),desc:z.string()})).mutation(async ({input,ctx}) => {
    try {

      return await ctx.prisma.example.create({data:{
      title: input.title,
      desc : input.desc
     }})

    } catch (e) {
      console.log(e)
    }
  }),
  Shownote: publicProcedure.query(async({ctx})=>{
    return await ctx.prisma.example.findMany({orderBy:{
      createdAt:"desc"
    }})
  }),
  UpdateNote: publicProcedure.input(z.object({id:z.string(),title:z.string(), desc: z.string()}))
  .mutation(async({input,ctx})=>{

    return await ctx.prisma.example.update({where:{id:input.id}, data: {title:input.title,desc:input.desc}})

  }),
  delateTodo: publicProcedure.input(z.object({
    id:z.string()
  })).mutation(async({input,ctx})=>{
    return await ctx.prisma.example.delete({where:{id:input.id}})
  })
})
