import { Categories as NoteCategories } from "../constants/Categories"
import { useNoteContext } from "../context/notesContext"

export const Categories = ({ setType }) => {

    const { notes } = useNoteContext()

    const HandleCategory = (category) => {
        if (category === "All") setType({
            category: "All",
            array: notes
        })
        else {
            const filteredNotes = notes.filter(note => note.category === category)
            setType(
                {
                    category: category,
                    array: filteredNotes
                })
        }
    }


    return (
        <div className="w-full h-[500px] p-4 categories">
            {NoteCategories.map((category, i) => {
                const filteredNotes = notes.filter(note => note.category === category.category)

                return (
                    <button
                        key={i}
                        onClick={() => HandleCategory(category.category)}
                        className={`${category.style} ${category.class} shadow-md flex justify-center items-center p-4 relative`}
                    >
                        <span className="flex flex-row gap-4">
                            {category.category}
                            <category.icon />
                        </span>
                        <span className="text-white absolute bottom-4 right-4">
                            {category.category === "All" ? notes.length : filteredNotes.length}
                        </span>
                    </button>
                );
            })}
        </div >
    )
}