import { Tasks } from "../entities/Tasks";
import { TaskRepositories } from "../repositories/TaskRepositories";

interface ITasks {
    title: string;
    description?: string;
    status?: string;
    work_id?: string;
}

export const getAllTasks = async (work_id: string) => {
    const tasks = TaskRepositories;

    const find_tasks = await tasks.createQueryBuilder()
                                .select(["tasks.id", "tasks.title", "tasks.status"])
                                .from(Tasks, "tasks")
                                .where("tasks.work_id = :work", { work: work_id })
                                .getMany();

    if(!find_tasks){
        return { "message": "Tarefa Não Encontrada", "data": {}, "status": 400 }
    }
                            
    return { "message": "Tarefa Encontrada", "data": find_tasks, "status": 200 }
}


export const create = async({title, description, work_id}: ITasks) => {
    const task = TaskRepositories;

    const new_tesk = task.create({title, description, work_id});
    await task.save(new_tesk);
    return new_tesk;
}

export const updateStatusTask = async(id: string, status: boolean) => {
    const task = TaskRepositories;

    const update_task = await task.createQueryBuilder()
    .update()
    .set({ status: status})
    .where("id = :id", {id})
    .execute()

    if(update_task instanceof Error) {
        return { "message": "Não foi possível atualizar a Tarefa", "status": 400 }
    }

    return { "message": "Status da Tarefa Atualizada!!" , "data": update_task, "status": 200}
}


export const remove = async(id: string) => {
    const task = TaskRepositories;
    
    const remove_task = await task.createQueryBuilder()
    .delete()
    .from(Tasks)
    .where("id = :id", { id })
    .execute();

    if(remove_task instanceof Error) {
        return { "message": "Tarefa removida com sucesso", "status": 400 }
    }
    
    return { "message": "Tarefa removida com sucesso", "status": 200 }
}
