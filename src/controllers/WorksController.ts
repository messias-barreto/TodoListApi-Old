import { Request, Response } from "express";
import { createWorks as createWorksService } from "../services/WorksService"

export class WorkController { 
    async create(request: Request, response: Response){
        const { title, description, user_id } = request.body

        const work = await createWorksService({ title, description, user_id });
        if(work instanceof Error){
            return response.status(400).json(work.message);
        }

        return response.status(200).json(work);
    }

}