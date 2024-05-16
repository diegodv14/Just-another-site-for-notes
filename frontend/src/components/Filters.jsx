export const Filters = () => {
    return (
        <><section className="h-[60px] w-full border-l p-4 flex items-center">
            <form action="">
                <select >
                    <option value={true}>Important</option>
                    <option value={false}>Not important</option>
                </select>
            </form>
        </section></>
    )
}