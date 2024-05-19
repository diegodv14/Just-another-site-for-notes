import { useForm } from "react-hook-form"
import { Categories } from "../constants/Categories"

export const NewNote = ({ AddNote, dataCategory }) => {


    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <>
            <form onSubmit={handleSubmit(AddNote)} className="w-full ml-2 mr-2 p-4 bg-black flex flex-row gap-6 bg-transparent items-center rounded-lg">
                <div className="flex flex-col gap-2 h-fit">
                    <input placeholder="Title..." type="text" className="bg-white border-b-2 p-2 border-black focus:outline-0" {...register("title", {
                        required: true
                    })} />
                    {errors?.title?.type === "required" && <span className="text-[10px] text-red-700 ">The Title is required</span>}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <textarea placeholder="Content..." className="bg-white border-2 border-black max-h-[150px] p-4 w-full" {...register("content", {
                        required: true
                    })} />
                    {errors?.content?.type === "required" && <span className="text-[10px] text-red-700 ">The Content is required</span>}
                </div>
                <div className="flex gap-6 h-fit">
                    <select className="border-2 border-black" {...register("important")}>
                        <option value={false}>No Important</option>
                        <option value={true}>Important</option>
                    </select>
                    {dataCategory.category === "All" ? (<>
                        <select className="border-2 border-black" {...register("category")}>
                            {Categories.filter(category => category.category !== "All").map((category, i) => <option key={i} value={category.category}>{category.category}</option>)}
                        </select></>) : (<h1 className="flex gap-2"><span className="font-semibold">Category:</span>{dataCategory.category}</h1>)}
                </div>
                <button className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                </button>
            </form>
        </>
    )
}